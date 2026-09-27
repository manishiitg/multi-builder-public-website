# SaaS launch checklist (internal, not deployed)

## Decision 2026-09-26: Cloud "by application" with hand-held onboarding

Cloud is sold by self-serve PayPal subscription since 2026-09-27: plan "Cloud monthly" (P-8U224306ST2761520NK4MBQA, $99/month, product AGENTWORKS-CLOUD, owner Excellence Technosoft Pvt Ltd). The pricing page and home Cloud card link to the PayPal subscribe URL (`PAYPAL_SUBSCRIBE` in `scripts/launch/partials.py`); "Book a call first" stays as the second option. PayPal only takes payment: for every new subscription (PayPal email), email the customer within one business day and run the three-step onboarding the Pricing page promises (subscribe, setup session to build the first goal together, check-ins through the first month).

**Payments:** PayPal processes payments; we are the merchant, so any tax/GST treatment is ours to handle with the accountant. The Terms, Privacy and Refund pages now name PayPal. Have a lawyer review them. Refunds for the 7-day guarantee are issued manually from PayPal.

**Website launch gate (2026-09-26):** done. The LICENSE files are pushed for coding-agent-loop and mcpagent, the policy pages are added, and the email-inbox claim is removed. After deploying, update the websiteaeo automation to edit `scripts/launch/*` and rebuild instead of hand-editing the generated HTML.

## Earlier decision 2026-09-25: launch the website with Cloud "coming soon" (superseded above)

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
| Business premade agents | home, `/agents/`, `/solutions/*` | Resolved 2026-09-27: the site now reads the real catalog (`scripts/launch/catalog.json`, synced from coding-agent-loop main by `sync_catalog.py`): 79 Crew agents + 64 Goal playbooks. Re-run the sync when the library changes. | Done |
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
