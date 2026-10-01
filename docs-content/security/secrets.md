# Managing secrets

Agents often need passwords, API keys, and tokens to do their work. Secrets
hold these values so they reach the agent that needs them — and nothing else:
never the chat history, never the logs, never another person.

## Three kinds

| | Local: workflow | Local: yours | Global |
|---|---|---|---|
| **Added by** | You, on one workflow | You, for yourself | An admin, for everyone |
| **Lives** | Sealed in that workflow's store | Sealed in your store (+ your browser) | Server memory, from its environment |
| **Used by** | That workflow, when you select it | Runs where you select it | Every run, automatically |
| **Good for** | A database password one flow needs | Your personal API keys | Company-wide keys and configs |

"Local" means yours: sealed with your identity, so nobody else's run can
open them. "Global" means the deployment's: set by an admin, available
platform-wide.

## How a secret travels

<div class="sec-flow">
<div class="sec-box"><b>Sealed at rest</b><span>Encrypted with AES-256-GCM before it is stored. Local secrets are bound to your identity — another person's run can't decrypt them.</span></div>
<div class="sec-arrow">→</div>
<div class="sec-box"><b>Selected, not sprayed</b><span>Local secrets go only where you tick them. Global ones ride every run by design.</span></div>
<div class="sec-arrow">→</div>
<div class="sec-box hi"><b>Injected at runtime</b><span>Decrypted in memory at the moment of use, handed to that run only, never written to history or logs.</span></div>
</div>

The server reads the deployment's master secret once at startup, then drops
it from its own environment — so even a process listing the server's
environment won't find it. Names travel freely (you pick "DB_PASSWORD" from a
list); values only ever move sealed or straight into the run that needs them.

## What each person sees

<div class="sec-lanes">
<div class="sec-lane server"><h4>Server</h4>Seals and opens secrets.<br>Knows every name, guards every value.<br>Global values live in its memory only.</div>
<div class="sec-lane"><h4>Alice</h4><span class="sec-yes">✓</span> Her secrets' names and values<br><span class="sec-yes">✓</span> Her workflows' secrets<br><span class="sec-yes">✓</span> Global names (values masked)<br><span class="sec-no">✗</span> Bob's secrets entirely</div>
<div class="sec-lane"><h4>Bob</h4><span class="sec-yes">✓</span> His secrets' names and values<br><span class="sec-yes">✓</span> His workflows' secrets<br><span class="sec-yes">✓</span> Global names (values masked)<br><span class="sec-no">✗</span> Alice's secrets entirely</div>
</div>

Alice and Bob both see the *name* `DB_PASSWORD` if it's global — but only
the runs it is injected into ever hold the value, and nobody's screen or log
file shows it.

## Rotation

Change the value where it lives — edit your secret, or ask an admin to update
a global one — and new runs pick it up. Runs already in flight keep only the
old value until they end.

<div class="sec-note">Secrets are for values agents <b>use</b>. The AI logins agents run <b>as</b> (Claude, Codex, Cursor) work the same sealed way but are managed separately — see <b>Provider credentials</b>.</div>

Related: [Secrets](../core/secrets.md) (technical reference),
[Provider credentials](provider_credentials.md),
[Security overview](README.md).
