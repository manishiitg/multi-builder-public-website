# Provider credentials

Coding assistants (Claude Code, Codex, Cursor, Muse) need a login to call
their provider. AgentWorks holds these logins encrypted on the server and
hands one to each launch that needs it.

## Two ways to set them up

| | Shared login | Your own login |
|---|---|---|
| Added by | An admin, for the team | You, yourself (unless your admin locked it) |
| Used by | Anyone it's available to | You |
| Good for | A team plan everyone shares | Personal quotas, identity, billing |

Either kind reaches a launch the same way.

## How a login reaches one launch

<div class="sec-flow">
<div class="sec-box"><b>Encrypted store</b><span>All logins, sealed. No agent process can read it.</span></div>
<div class="sec-arrow">→</div>
<div class="sec-box"><b>One launch</b><span>The server resolves the single login this run needs.</span></div>
<div class="sec-arrow">→</div>
<div class="sec-box hi"><b>Handoff</b><span>Login file linked + granted, or key placed in that launch's environment only.</span></div>
</div>

Login files that rotate (OAuth-style) are shared live, so refreshed tokens
keep working. API keys travel inside the launch's own environment — children
never inherit the server's. Bridge tokens and per-launch files live in
per-person folders, so one person's launch never leaves credentials where
another can read them.

## What each person sees

<div class="sec-lanes">
<div class="sec-lane server"><h4>Server</h4>Holds every login, sealed.<br>Hands one per launch.<br>Never exposes the store to any person.</div>
<div class="sec-lane"><h4>Alice's launch</h4><span class="sec-yes">✓</span> The login her run was given<br><span class="sec-yes">✓</span> Her own files<br><span class="sec-no">✗</span> Bob's launches and files<br><span class="sec-no">✗</span> Any login she wasn't given</div>
<div class="sec-lane"><h4>Bob's launch</h4><span class="sec-yes">✓</span> The login his run was given<br><span class="sec-yes">✓</span> His own files<br><span class="sec-no">✗</span> Alice's launches and files<br><span class="sec-no">✗</span> Any login he wasn't given</div>
</div>

<div class="sec-note">Isolation hides people from <b>each other</b> — not a login from the person using it. Alice's run holds the shared login while it works, because her assistant needs it to call the provider. Shared logins usually rotate, so a copied one decays; anything that must never be copyable should be a private login, not a shared one.</div>

## If a login leaks

Rotate it at the provider and update the stored account: new launches pick up
the new value, and in-flight runs keep only the old one until they end.

Related: [Secrets](../core/secrets.md),
[Per-user Linux accounts](per_user_linux_accounts.md),
[Security overview](README.md).
