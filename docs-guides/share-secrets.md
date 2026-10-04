# Share API keys and logins without pasting them in chat

**What you'll do:** save a credential once in Vault, and let your teammates' agents use it — without anyone ever seeing the value.

Your API keys and passwords start with you: nobody else's agent can use them. Vault changes that in a controlled way. The value lives in one encrypted place, and you grant *use* of it to a group. Teammates pick it by name in their own projects. Their agents can spend it; they can never read it.

*Vault is in early access. [See what Vault covers](https://agentworkshq.com/vault/).*

## The two halves

| You do this… | …and this happens |
|---|---|
| Store the key in Vault → Secrets | The value is encrypted; from here on only its name travels |
| Grant a group use in Access → Groups → Permissions → Secrets | Everyone in the group may *use* it; nobody can *see* it |
| Teammates pick it under Integrations → Secrets in their project | Their agents receive the value at run time; their screens show only the name |

## Steps

1. **Save the secret once.** In Vault → Secrets, create it and paste the value. From now on only the name is ever shown or saved in projects — never the value.
2. **Grant use to a group.** Open Access, pick a group, go to Permissions → Secrets, and tick the secret. The built-in **Platform** group covers everyone on your team; it starts empty, so tick only what the whole team truly needs.
3. **Tell teammates where to pick it.** In their own project — a Crew, Code, Goal, or workflow — they open Integrations → Secrets and choose it from **Platform secrets**. Their project stores just the name.
4. **Rotate by replacing, not re-sharing.** Paste the new value under the same name in Vault and everyone keeps working — no project needs editing. Rotate the key with its provider first: Vault stores the replacement, it can't disable the old key for you.

## FAQs

**Can teammates see the value?**
No. Grants are use, not reveal. Values never appear in chat, logs, project settings, or shared screens.

**I removed someone — is it instant?**
New uses stop right away. But removal can't recall a value already handed to a running process — if the key may have leaked, rotate it at the provider and save the replacement under the same name.

**Project secrets or Platform secrets — which?**
Project secrets are yours alone. Platform secrets are Vault values shared with you. If two share a name, your project one wins.

**Does this cover MCP tools too?**
Yes — the same Access screen governs which groups may use each MCP server and tool. One door, every call checked and recorded.

*Need help? [Book a call](https://calendly.com/manish-tryagentworks/intro) and we'll set up shared secrets with you.*
