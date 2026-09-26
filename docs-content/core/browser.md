# Browser Automation

AgentWorks uses the managed `agent_browser` tool for all browser
automation. The browser can run headlessly in the workspace or attach to a
user-visible Chrome through CDP.

## Modes

| Mode | Behavior | Typical use |
|---|---|---|
| `none` | Browser tools are disabled. | Workflows that do not browse. |
| `auto` | Use a reachable configured CDP browser; otherwise use headless. | Default. |
| `headless` | Use the signed-in user’s managed Chromium. | Background and scheduled runs. |
| `cdp` | Attach to the configured Chrome debugging port. | Existing logins, visual QA, and sites that reject headless browsers. |

The workflow manifest stores the mode under
`capabilities.browser_mode`. Browser steps attach the `agent-browser` skill.

## Starting a CDP browser

On macOS, install the default launcher on port `9222` with:

```bash
curl -fsSL 'https://raw.githubusercontent.com/manishiitg/coding-agent-loop/main/scripts/install-chrome-cdp-macOS.sh' | bash
```

Install another independent launcher/profile by passing a port:

```bash
curl -fsSL 'https://raw.githubusercontent.com/manishiitg/coding-agent-loop/main/scripts/install-chrome-cdp-macOS.sh' | bash -s -- --port 9333
```

Each CDP profile must use its own port and `--user-data-dir`. The usual port is
`9222`; the port-specific installer creates a separate application and profile.

For a specialized workflow that needs multiple login identities, launch more
profiles on different ports, for example `9222` and `9333`, then configure:

```json
{
  "browser_mode": "cdp",
  "cdp_ports": [9222, 9333]
}
```

The runtime accepts at most four configured ports. Ordinary workflow
concurrency does not require multiple profiles: workflows share one CDP browser
and use labeled tabs plus a per-port select-and-act lock.

## Managed tool

Do not run the `agent-browser` CLI through the shell for browser actions. Call
the managed `agent_browser` tool. The runtime injects and validates the CDP
endpoint, applies session limits, serializes shared-tab actions, and keeps file
access inside the workspace.

To check whether CDP is reachable, use the backend status operation:

```text
agent_browser(command="status", args=[], session="default")
```

`status` needs no tab and no `--cdp` argument. `snapshot` is not a connectivity
probe: it reads one specific page, so in shared CDP mode it must name the tab.

Before the first browser action, load the installed CLI's matching command guide:

```text
agent_browser(command="skills", args=["get", "core"])
```

The common flow is:

```text
agent_browser(command="open", args=["https://example.com"])
agent_browser(command="snapshot", args=["-i"])
agent_browser(command="click", args=["@e1"])
agent_browser(command="snapshot", args=["-i"])
```

In CDP mode, list and reuse a suitable tab before asking to create one. Include
the returned real tab ID (`t1`, `t2`, and so on) inline for every page action.
`open` itself remains URL-only. The inline system prompt gives the exact
endpoint and argument form for the active session.

## Shared CDP tab lifecycle

One visible Chrome is shared safely by verifying and acting under a per-port
lock. A workflow must not assume that the tab selected during its previous tool
call is still active: the user, the website, or another workflow may have
changed Chrome in the meantime. The backend therefore reads the real tab state
immediately before every page action while it holds the shared lock. It keeps
using the requested real `tN` when that tab is already active, and switches only
when another tab is active. This avoids repeatedly bringing Chrome to the
foreground on macOS without allowing one workflow to act in another tab.

The normal flow is:

1. Call `agent_browser(command="tab", args=["--cdp", "<endpoint>"])` once to
   inspect real tab IDs and query-free display URLs.
2. Reuse the workflow's already-owned labeled tab when one exists. It may be
   navigated to the requested URL.
3. Otherwise, reuse a pre-existing tab only when its normalized URL exactly
   matches the requested URL.
4. If neither matches, request a stable labeled tab with
   `agent_browser(command="tab", args=["--cdp", "<endpoint>", "new",
   "--label", "<workflow-label>", "https://target.example"])`.
5. Keep the returned real `tN` and provide it inline on subsequent actions.

The backend repeats the list-and-reuse check atomically before executing
`tab new`. It refuses creation if the real tab list is unavailable or invalid,
rather than risking a duplicate. A label collision with a pre-existing tab at a
different URL is also an error. An arbitrary same-origin tab is deliberately
not reused because navigating it could destroy unrelated user state. URL query
parameters are hidden from model-facing tab lists, but the backend retains the
full normalized URL for exact-match decisions.

`tab new` arguments are parsed and rewritten into the canonical
`new --label <label> <absolute-url>` order before reaching agent-browser. This
prevents a misplaced URL or option from being interpreted as the page to open.

### Model-context behavior

Tab management is intentionally compact:

| Operation | Returned to the agent |
|---|---|
| Explicit `tab` list | At most 20 compact lines; labels, titles, and URLs are individually truncated. |
| Select one tab | A short selected-tab message, not the raw tab list. |
| Automatic active-tab verification before a page action | Nothing extra; the internal tab-state/selection response is discarded. |
| Atomic reuse check before `tab new` | Nothing extra; only the reused/created tab summary is returned. |

Consequently, a large Chrome window does not add every tab to context on every
browser action. Repeated explicit list calls can still accumulate in the
conversation history, so agents should list once, retain the returned `tN`, and
list again only when the tab disappears or the target is genuinely unknown.

### Ownership and cleanup

Only tabs actually created by a workflow are registered for automatic cleanup,
and ownership is recorded against the real `tN` ID returned by agent-browser.
A pre-existing tab reused by exact URL remains user-owned and is never enrolled
in cleanup.

After the final browser-owner lease is released, created tabs remain available
for review for one hour and are then closed by real `tN` ID. Concurrent runs
delay that timer until the final lease ends. Already-missing tabs, including
agent-browser's `No tab with label` response, are retired from the registry
instead of being retried forever. Never call the top-level browser `close` in
CDP mode because it can terminate the user's real Chrome session. Close a
specific workflow-owned tab immediately only when the user requests it or the
workflow must replace it.

## State and isolation

- CDP mode uses the user's real Chrome cookies and login state.
- Managed headless mode uses one persistent browser per workflow. Authorized users, builder sessions, runs and groups for that workflow share it; unrelated workflows are isolated. Tabs are optional; reuse the current tab or create one when useful.
- Shared CDP concurrency is isolated by real tab IDs plus a per-port
  select-and-act lock; labels are aliases, not durable tab identities.
- Delegated agents inherit the workflow browser. Explicit session labels do not create independent browsers. Preserve it at workflow completion. Configured CDP profiles retain their separate specialized login behavior.
- Workflow-created CDP tabs are closed automatically one hour after the final
  run releases its lease; reused user tabs are preserved.

The managed browser tool tracks sessions. MCP subprocess
connection pooling in `mcpagent` is independent of browser state.

### `file://` URLs are not path-restricted (deliberate, not an oversight)

In CDP mode the browser is the user's **own** Chrome — a host process this app
neither owns nor sandboxes — so `agent_browser` can read any file on the
machine via a `file://` URL, including files the shell tool is explicitly
denied. 
## Debugging and evidence

Use agent-browser's managed diagnostic commands so they operate on the same tab
and session as the workflow:

- `network` for requests and HAR capture;
- `console` and `errors` for page diagnostics;
- `screenshot` for visual evidence;
- `record` for video evidence when the user or workflow explicitly requests it;
- `trace` and `profiler` for deeper debugging.

HAR and video artifacts may contain credentials, cookies, page content, or
personal data. Review them before sharing.

### Persistent browser artifact handoff

The agent-browser daemon may outlive the workflow process and therefore cannot
safely rely on that process's current directory or inherited FolderGuard. For a
named screenshot or recording, the managed adapter rewrites the browser output
to a unique file under `/tmp/agentworks-browser-artifacts`. The trusted
workspace server then validates that the staged file is regular, non-empty, of
the expected image/video type, and that the requested destination is covered by
the current request's write paths and is not blocked. It publishes the artifact
atomically into the workflow workspace and removes the staged source.

Screenshots are finalized in the same call. Video recording uses an
owner-and-session-scoped lease: `record start` stores the staged source and
`record stop` finalizes that exact source into the requested workspace path.
This handoff applies to both headless and CDP modes.

In CDP mode, agent-browser recording creates a fresh temporary browser context
and tab. The managed adapter diffs the real tab set, pins the workflow to the
new recording `tN`, rejects interactions until a fresh snapshot succeeds, and
routes stale original-tab arguments to the recorded context. `record stop`
closes the temporary tab and restores the original selection. Abandoned runs
are stopped and cleaned by delayed ownership cleanup so the shared CDP session
cannot remain stuck in an active recording.


## File uploads and downloads

Use workspace-relative paths such as `Downloads/report.pdf` or
`Chats/output.csv`. Upload with the `upload` command. Browser downloads for a
workflow run are routed into its execution `Downloads` directory.

Upload paths are not passed directly to the persistent daemon. The workspace
server resolves each source against the workspace root (with a run working-dir
fallback for a bare filename), checks the current FolderGuard read grants,
rejects blocked paths and symlinks, and copies the file into short-lived managed
staging. The daemon receives that staged path with the original basename, and
the staging slot is removed as soon as the command finishes. This allows a
later workflow step to upload from its own authorized folder even if the daemon
was originally launched under a different step's sandbox.

There are two CDP download paths:

- A normal click in visible Chrome may place a file in the user's system
  Downloads folder. That folder is exposed read-only when explicitly granted;
  copy the required file into the run-scoped workspace before processing it.
- `agent_browser(command="download", args=[..., "<selector>",
  "<workspace-path>"])` is an explicit managed download. Its output is written
  to backend staging and atomically published into the requested authorized
  workspace path, like screenshots. It never writes through the persistent
  daemon directly into an arbitrary workspace folder.

## Operational rules

- Use snapshots and current refs for live actions. Re-snapshot after navigation,
  DOM updates, tab changes, or when ref freshness is uncertain.
- Persist durable selectors or parse fresh refs at runtime; never save a literal
  `@e1`-style ref as reusable configuration in a workflow script. Scoped read-only
  `eval` is a discovery fallback when snapshots are insufficient, not a required
  step. Verify locator uniqueness, intended context, and the action's outcome.
- Poll for page state instead of relying on long fixed sleeps.
- Never connect to the CDP WebSocket directly for normal actions; that bypasses
  tab locking and can race other workflows.
- If a site rejects headless mode, change the workflow to `cdp` and record that
  precondition in its learnings.
