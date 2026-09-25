# SaaS launch checklist (internal, not deployed)

## Decision 2026-09-25: launch the website with Cloud "coming soon"

Cloud is marked **Coming soon**. Every "Get early access" button opens Calendly (`SIGNUP` in `scripts/launch/partials.py`), and there is no Log in link. Business agents that aren't built yet are tagged "Coming soon". That removes signup, billing and hosting from the *website* launch gate. The tables below now gate the **Cloud** launch. To switch over when the app ships:

1. Set `SIGNUP` to the app signup URL, restore the Log in link, and set `SIGNUP_URL` in `runloop_site.js`.
2. Change the tier badge back from "Coming soon" to "Most popular", and restore the guarantee wording.
3. Remove `tag-soon` from each agent as it ships (see `AVAILABLE` in `scripts/launch/tpl.py`).

**Still gating the website launch:** push the LICENSE files (see Legal); confirm the Enterprise claims (SSO/SCIM, audit export, SLA) are OK to sell as part of a scoped pilot; add a privacy policy page (it can be short while no payments are taken).


The launch pages (`/`, `/pricing/`, `/agents/`, `/enterprise/`) describe AgentWorks as it will be at launch. Each claim below depends on work that is still in flight. Do not deploy to production until every row is done, or its copy is changed or removed.

Status as of 2026-09-24. The code evidence is in `mcp-agent-builder-go`.

## Blocking: the Cloud plan can't be sold without these

| Claim on the site | Where | Today | Needed |
|---|---|---|---|
| "Sign up" / "Start for $99/month" → `https://app.agentworkshq.com/signup` | every page | The domain does not resolve. There is no register handler, and the design doc says "No self-registration". | Hosted app on `app.agentworkshq.com` with a signup flow |
| "Log in" → `https://app.agentworkshq.com/login` | header | same as above | Hosted login |
| $99/month billing, cancel anytime, 7-day money-back guarantee | pricing, FAQ | No Stripe or billing code | Billing, cancellation, refund policy |
| Hosted workspace, unlimited teammates and goals | pricing, tiers | Accounts use a JSON store sized for "tens of users, one server process" | Hosted deployment of AgentWorks with multiple tenants |
| Personal onboarding (first goal set up with you) | Cloud tier | none | An onboarding process, including who does it |

## Product claims that depend on work in flight

| Claim | Where | Today | Needed |
|---|---|---|---|
| Crew answers by **email**; "email inbox for every teammate" | home, pricing | Gmail is send-only (`gmail_feedback_routes.go`: "outbound-only notification channel") | Inbound email per teammate |
| Business premade agents: Invoice Chaser, Failed Payment Recovery, Weekly Business Report, Inbox Triage, Support First Response, Review Responder, Lead Follow-up, Competitor Watch, Order Watchdog, Meeting Notes to Actions | home, `/agents/` | Only the engineering and growth playbooks exist (23). SEO Intelligence and AI Visibility are real. | Build each one as a playbook, or remove its card |
| Integrations strip: Stripe, Shopify, QuickBooks, HubSpot, Notion, Linear, PostHog | home | MCP and browser access can reach these, but they are not packaged | Tested connectors, or reword to "via MCP or browser" |
| Fallback to another plan at a limit | home (bring your own AI) | Capacity waits pause and resume (PLAT-101). Switching between connected plans is designed but not implemented (`docs/design/multiple-provider-accounts.md`). | Connecting several provider accounts, with failover |
| Pulse "morning digest" | home timeline | Pulse reports exist; no daily digest message | A daily digest delivered to Slack or WhatsApp |

## Enterprise claims

| Claim | Today | Needed |
|---|---|---|
| SSO (SAML / OIDC) and SCIM | Google sign-in via Cognito or Supabase for admin-invited users | SAML/OIDC and SCIM |
| Audit log export to SIEM | Run and execution logs exist; no export | An export or streaming endpoint |
| Deploy into AWS/GCP/Azure, private cloud, dedicated hosted | A rootless Linux deployer exists; there is no one-command Docker image | A packaged deployment (Helm/Terraform or an image) plus a runbook |
| Dedicated support + SLA | none | SLA terms |
| Four-week pilot | none | A pilot template covering the SOW and success metrics |

## Legal and brand

| Item | Today | Needed |
|---|---|---|
| "MIT license" (footer, FAQ, tiers) | LICENSE files committed locally in `coding-agent-loop` and `mcpagent` (2026-09-24), not pushed yet | Push both, and keep `mcpagent` and `multi-llm-provider-go` public (the backend needs them to build) |
| Privacy policy and terms of service | none | Required before taking payment |
| "We don't train on your data" | Policy statement | Confirm and publish it in the privacy policy |
| OG images for `/pricing/`, `/agents/`, `/enterprise/` | They reuse the home OG image | A dedicated image for each page (optional) |

## Before deploying

1. Every row above is done, or its copy is changed.
2. `python3 scripts/launch/build.py` (regenerates the four launch pages).
3. `node scripts/verify-dist.js`.
4. Deploy a preview, and review it on desktop and mobile.
