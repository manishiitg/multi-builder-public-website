# Publish your first Relay

**What you'll do:** describe a task in plain words, watch it become a graph of agents, test it, and publish it as a versioned API your tools can call.

A Relay is a fixed chain: JSON goes in, your agents and scripts do the work, JSON comes out. Unlike a chat, it runs the same way every time — and once published, your later edits never change a version that's already live.

## Steps

1. **Describe what you want.** Open the Relay Builder and say what should go in, what should happen, and what should come out — for example, "take an order, check stock with a script, and reply with a confirmation message." The Builder draws the graph as it saves each piece.
2. **Test the draft.** Ask the Builder to run it with a sample input. It runs right there in chat and shows you the JSON result — or the exact step and reason if something fails. Fix and re-run until it passes.
3. **Publish v1.** Tell the Builder to publish. It freezes the tested graph as version `v1` and reports back the version and its fingerprint. API calls now run `v1`.
4. **Keep improving safely.** Edit the draft any time — new prompts, new steps. Published versions never change. When the draft passes its tests, publish `v2`: new calls use it automatically, and anyone pinned to `v1` keeps getting `v1`.

## FAQs

**How do my tools call it?**
With an API call: function name, input JSON, and a unique key per call (so retries never run twice). Your developer can wire it from the Relay API reference — start the run, then poll the returned URL for the JSON result.

**What if a run fails halfway?**
It stops at the failed step and says why — which step, what input it saw, and what went wrong. Fix the draft and re-run; published versions are untouched.

**Can I run it on a schedule?**
Yes — set a schedule with a fixed input payload and it fires on its own. Note that schedules run your current draft, not a pinned release.

**Who can publish or call?**
Owners and editors of the Relay. Readers can look but not run or publish.

**What can't a Relay do (yet)?**
It handles text only (no image or file payloads), it can't chat over WhatsApp or Slack threads, and a crashed run won't resume mid-chain — it reports honestly as interrupted instead.
