# AgentWorks Marketing Site Handoff

Last updated: 2026-07-11
Current checkpoint: `agentworks-cloudflare-seo-phase-one`
Repo path: `/Users/mipl/ai-work/multi-builder-public-website`
Production URL: `https://agentworkshq.com/`

## Approved Homepage Candidate — 2026-07-10

The user approved the `workforce.html` design as the new AgentWorks homepage. It has now been promoted to the root `index.html` entry point and is implemented as standalone HTML, CSS, and JavaScript:

- `index.html` (canonical production entry point)
- `workforce.css`
- `workforce.js`

The duplicate `workforce.html` file was removed to keep `index.html` as the single source of truth. The legacy `/workforce.html` URL redirects to `/` in production.

Completed in this checkpoint:

- B2B-first positioning around running 100+ agents across company functions.
- Primary `Book a call` path connected to `https://calendly.com/manishiitg/15min` in the header, hero, closing CTA, and footer.
- Self-serve paths for the Mac installer, docs, use cases, and GitHub.
- Real 2x Electron product captures for organization management, model routing, Pulse questions, shared Learnings, and Bot Connectors.
- Two reversible scroll-driven product stories: model routing and human context becoming reusable learning.
- Full-width Connected Channels section for Slack, WhatsApp, and Gmail.
- Finalized responsive footer with Explore, Get started, X, and LinkedIn navigation.
- Preserved root SEO metadata, structured data, icons, manifest, canonical URL, and OG/Twitter tags.
- Converted the six Retina homepage captures to lossless WebP for deployment while retaining the original PNG files.
- Replaced the broad asset copy with a production asset allowlist; archived screenshots and duplicate Runloop OG images are no longer deployed.
- Desktop and 390px mobile checks with no horizontal overflow, broken images, duplicate IDs, unsafe new-tab links, or page console warnings.
- Local and external link checks returning successful HTTP responses.
- Full `node scripts/verify-dist.js` production gate passing on 2026-07-10.

Secondary route refresh completed in the same checkpoint:

- Product, Use Cases, Docs, Updates, and 404 share the homepage palette, typography, navigation, CTA hierarchy, and footer direction through `secondary.css`.
- Secondary navigation leads with Product and includes a primary `Book a call` action.
- Use Cases now leads with company functions: sales, marketing, support, finance, operations, engineering, and IT.
- Product and route metadata now use AI workflow/operating-loop language instead of the older agent-fleet-first framing.
- Tiny screenshot grids were removed in favor of one readable proof surface or concise text rows per route.
- Docs is a minimal light operator guide organized around Start, Operate, Improve, Connect, Organization, and Reference.
- The public Docs page now leads to a real first-workflow guide and links only to existing repository documentation.
- Repository documentation links were made portable, a task-first `docs/getting-started/` path was added, and `node scripts/check-doc-links.js` now validates public docs links.
- Product Markdown is synchronized into `docs-content/` and rendered inside the AgentWorks website with Marked and DOMPurify. Relative documentation links stay in the reader; source-code references open the corresponding GitHub file.
- The embedded reader includes a persistent documentation sidebar, page-level table of contents, responsive tables/code blocks, loading and failure states, and a secondary `View source` action.
- X and LinkedIn remain available in the shared secondary footer.
- Desktop and 390px mobile render verification passes for every public route.
- Product now leads with the core promise: `Build AI workflows that improve with every run.` Its primary operating story is Run -> Evidence -> Pulse -> Auto Improve -> Next run.
- Pulse is positioned as the evaluation layer for health, goal alignment, risk, cost, and human judgment. Auto Improve is positioned as bounded, evidence-based workflow improvement, with approved learnings promoted into reusable skills.
- The workflow Pulse asset was recaptured from the live AgentWorks Electron app on 2026-07-10. It shows a real trading-workflow verdict, latest result, main risk, pending human decision, next action, and artifact-sync evidence.
- Product has six detailed automation chapters using screenshots not shown on the homepage: workflow plan, live terminal execution, workflow cost analysis, generated workflow reporting, workflow Pulse, and generated global skills.
- The workflow-cost asset was captured from the live AgentWorks Electron app on 2026-07-10. It shows per-run, per-step, per-model, token, cache, builder, and provider cost evidence.
- The generated-report asset was captured from the live AgentWorks Electron app on 2026-07-10 and shows source health, summary metrics, actionable results, and detailed report evidence.
- The production verifier enforces at least six Product detail screenshots and rejects any Product screenshot reused from the homepage.
- The Product page ending was redesigned after full-page review: the legacy three-card comparison is now a titled operating-boundary section, and the nested CTA card is now a full-width B2B closing band led by `Book a call`.
- The Use Cases overview was rebuilt as four open business-function blocks. Legacy screenshot slots, chips, nested `when/proof` cards, and the rounded outer frame were removed in favor of numbered anchors and plain `Use for` / `Evidence` rows.
- The Use Cases category boundary is now a full-width dark stack band. Agent CLI, workflow engine, observability/evals, and AgentWorks are four flat layers; AgentWorks uses a solid lavender highlight instead of the legacy gradient row.
- The generic Deploy marketing page was removed. Deploy is no longer in navigation, the footer, sitemap, `llms.txt`, or the production payload; legacy `/deploy` traffic redirects to the repository's factual deployment documentation.
- The generic Automations marketing page was removed because it duplicated Product and Use Cases. Automations is no longer in navigation, the footer, sitemap, `llms.txt`, or the production payload; legacy `/automations` traffic redirects to Product.

### Production And Rename Status — 2026-07-11

The AgentWorks website is live on Cloudflare Pages project `agentworks` at `https://agentworkshq.com/`. This completes phase one of the broader Runloop-to-AgentWorks migration; it does not complete the repository, installer, desktop bundle, release, updater, or compatibility migration.

Completed in this production checkpoint:

- Deployed the current site to Cloudflare Pages and made `agentworkshq.com` canonical.
- Added a permanent `www.agentworkshq.com` to apex redirect that preserves paths and query strings.
- Added crawlable fallback content to every primary marketing route.
- Generated 27 static technical-documentation routes from the curated `public-docs.json` allowlist.
- Added `llms-full.txt`, expanded `llms.txt`, generated sitemap coverage, JSON-LD, Markdown alternates, and breadcrumb metadata.
- Added responsive 480, 760, and 1440 WebP product screenshots.
- Fixed CSP, caching, contrast, and accessibility defects.
- Verified production at 97 Lighthouse performance and 100 accessibility, best practices, and SEO, with no console or contrast failures.
- Pushed the production changes in commit `2ffab6c`.

Rename status:

1. Completed: renamed the GitHub repository to `coding-agent-loop`; the former URL redirects to it.
2. Completed: migrated installer, updater, release, Go module, package, and public documentation URLs to the new repository.
3. Pending: complete the Electron/macOS product, bundle, DMG, updater, and app-data compatibility plan.
4. Pending: recapture remaining legacy-branded screenshots and remove temporary compatibility overlays.
5. Pending: publish the repository migration as a phased build-in-public story with proof from the new repository and live website.

The Bot Connector screenshot contains a visible WhatsApp identifier and link code. The user explicitly approved showing that exact capture on the website on 2026-07-10; this approval is also recorded in the product screenshot library metadata.

## Current State

This repo is the static marketing website for AgentWorks. It is not a bundled React app. The root homepage is standalone HTML/CSS/JavaScript using `index.html`, `workforce.css`, and `workforce.js`. The secondary production pages remain static HTML shells that load:

- vendored React 18 production UMD files from `assets/vendor/react-18.3.1/`
- shared runtime from `runloop_site.js`
- shared styling from `runloop.css`
- approved secondary-route visual overrides from `secondary.css`
- local fonts from `assets/fonts/fonts.css`

There is intentionally no bundler for normal local development. The deploy preparation step copies an allowlisted production payload into `dist/` and generates static docs, the sitemap, and agent-readable content.

The root homepage and secondary-route visual refresh are complete locally. Secondary routes still use the existing React runtime internally, but their public design and messaging now match the approved AgentWorks direction.

GitHub/install links now point to `coding-agent-loop`. The local source directory remains `mcp-agent-builder-go`, and internal implementation file names such as `runloop_site.js` and `runloop.css` remain unchanged; neither is public branding or a reason to break compatibility.

## Product Positioning To Preserve

AgentWorks should be positioned as:

> The operating loop / control plane for running many AI and coding agents, not another single-agent chat UI.

Core message:

- AgentWorks helps run 100+ agent workflows across Claude Code, Codex CLI, Cursor, Gemini, browser workers, MCP tools, and model APIs.
- It gives each workflow a goal, worker routing, tool access, evidence, Pulse, cost tracking, approvals, reusable skills, and improvement history.
- The product is for making agent work improve over time: run, collect evidence, evaluate through Pulse, Auto Improve, and reuse approved learnings.
- Pulse and Auto Improve are the differentiating product loop, not secondary reporting features. Preserve them in the hero, the first Product explanation, and product-detail storytelling.
- Human judgment stays in the loop for approvals, replans, production changes, and promoted skills.

Avoid leading with generic phrases like:

- "AI automations for business outcomes"
- "AI workflow platform"
- "agents for teams"

Those are too broad and do not explain the product's real value.

## What Was Done Recently

### Website Restructure And Production Hardening

The site has been moved from older Claude Design/Babel/CDN experiments toward static production pages using local assets and a stricter deploy payload.

Important outcomes:

- Secondary routes use `runloop_site.js`, `runloop.css`, `secondary.css`, local React, and local fonts.
- Legacy files such as `template.html`, `wireframes.html`, and old JSX experiments remain in the repo for local reference only.
- Production deploy is allowlisted through `scripts/prepare-deploy.sh`.
- `scripts/verify-dist.js` is the main quality gate.
- Route-specific metadata, OG images, sitemap, `llms.txt`, manifest, and headers are in place.

### Active Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `index.html` | Main homepage |
| `/use-cases/` | `use-cases/index.html` | Use-case and fit guide |
| `/how/` | `how.html`, deployed as `how/index.html` | AgentWorks architecture |
| `/docs/` | `docs/index.html` | Minimal docs front door |
| `/docs/<document>/` | generated static HTML | Crawlable public technical documentation |
| `/llms.txt`, `/llms-full.txt` | source plus generated corpus | AI-readable product and documentation context |
| missing routes | `404.html` | Branded not-found page |

### Latest Checkpoint: `agentworks1`

The user chose **AgentWorks** as the public product name and `coding-agent-loop` as the GitHub repository name. The repository rename was completed on 2026-07-13.

Branding changes made:

- Visible website copy, page titles, metadata, manifest, and `llms.txt` now use AgentWorks.
- Route-specific Open Graph images were renamed/regenerated as `assets/og/agentworks-*.jpg`.
- Added `assets/brand/agentworks-logo.svg` while leaving the old logo file in place for cached/legacy references.
- Added a temporary AgentWorks overlay on product screenshots and generated OG cards because the current product screenshots were captured before the app display-name rename.
- Migrated install commands and GitHub links to `coding-agent-loop` after the repository rename, while retaining compatibility-sensitive Runloop app identifiers.
- Verified with `node scripts/verify-dist.js` and a Chrome screenshot smoke test at `review-agentworks1-home-smoke.png`.

Homepage density changes:

- The homepage was cut from about 10,948px / 16 major sections to about 3,626px / 5 visible story sections.
- Current homepage flow: hero, proof strip, category fit, motion proof, product tour, compact CTA.
- Do not re-add the removed homepage essays by default. Use `/how/`, `/docs/`, and `/use-cases/` for detail.
- The newer density review screenshot is `review-agentworks1-density-after-v2.png`.

Secondary route density changes:

- `/how/`, `/use-cases/`, `/docs/`, and `/updates/` were also shortened.
- Large shared CTAs were replaced with the compact CTA on How and Use Cases.
- Current retained-route text baselines were recorded for Home, How, Docs, Use Cases, and Updates; the former Deploy and Automations routes were removed rather than compressed further.
- Review screenshots use the pattern `review-agentworks-density5-*.png`.

Previous media-inspection changes kept in this checkpoint:

- Added `ExpandableProductImage` for real product screenshots.
- Wired screenshot expand behavior across the main product screenshot surfaces.
- Added `ExpandableProductVideo` for motion proof videos.
- The homepage operating-loop demo now has a persistent `View full demo` control.
- Screenshot affordances now say `View full` and are visible by default.
- Video proof opens in a full-screen modal with controls and Escape/backdrop close.
- Cache keys moved to `agentworks1`.

Useful review files from the last checkpoint:

- `review-agentworks1-home-smoke.png`
- `review-agentworks1-density-after-v2.png`
- `review-agentworks-density5-home.png`
- `review-agentworks-density5-usecases.png`
- `review-agentworks-density5-deploy.png`
- `assets/og/agentworks-home-og.jpg`
- `review-agentfleet116-lightbox-usecase-zoom.png`

Implementation locations:

- Search `ExpandableProductImage` in `runloop_site.js`.
- Search `ExpandableProductVideo` in `runloop_site.js`.
- Search `mk-expandable-shot`, `mk-expandable-video`, and `mk-video-lightbox` in `runloop.css`.
- Search `Agentfleet117 Inspectable Motion Proofs` in `MARKETING_REWRITE_RESEARCH.md`.

## How To Run Locally

From the repo root:

```bash
cd /Users/mipl/ai-work/multi-builder-public-website
python3 -m http.server 8765
```

Open:

```text
http://127.0.0.1:8765/index.html?cb=agentworks1
```

Use the cache-busting query when reviewing changes. If you create a new checkpoint, bump cache keys in the HTML shells, for example from `agentworks1` to `agentworks2`.

## How To Verify

Run these before considering the site stable:

```bash
cd /Users/mipl/ai-work/multi-builder-public-website
node --check runloop_site.js
node --check scripts/verify-dist.js
node scripts/verify-dist.js
```

`node scripts/verify-dist.js` rebuilds `dist/` and checks:

- required production files
- route metadata
- local asset references
- legacy-file exclusions
- payload size
- manifest and social image presence
- desktop and mobile rendered routes in Playwright
- console errors and failed requests
- obvious overflow and tall-section regressions
- image/video dimensions, alt text, labels, and poster presence

For visual work, also take focused Playwright screenshots of the changed section and inspect them manually.

## Deployment

Production is hosted by Cloudflare Pages project `agentworks` at `https://agentworkshq.com/`.

Deploy flow:

```bash
cd /Users/mipl/ai-work/multi-builder-public-website
bash scripts/prepare-deploy.sh
node scripts/verify-dist.js
npx wrangler@latest pages deploy dist --project-name agentworks --branch main
```

Do not deploy the repo root directly. The root contains many local-only review screenshots, references, and legacy design files.

## Important Files

| File | Why it matters |
|---|---|
| `runloop_site.js` | All active page/component rendering lives here. |
| `runloop.css` | Shared styling, route compression layers, palette, responsive rules, media inspector styling. |
| `secondary.css` | Approved AgentWorks visual layer for Product, Use Cases, Docs, Updates, and 404. |
| `scripts/verify-dist.js` | Production quality gate. Update this when adding routes/assets that must be verified. |
| `scripts/prepare-deploy.sh` | Production payload allowlist. Update when adding deployable files. |
| `MARKETING_REWRITE_RESEARCH.md` | Chronological design/research/change log. Continue using it for decisions and checkpoints. |
| `README.md` | Short project intro and command reference. Keep it concise. |
| `assets/product/` | Real product screenshots and demo videos used by the site. |
| `assets/og/` | Route-specific Open Graph images. |
| `_headers` | CSP and security headers. Keep scripts/styles/fonts local. |
| `_redirects` | Cloudflare Pages route behavior and legacy redirects. |
| `public-docs.json` | Allowlist of product docs that become public static HTML. |
| `scripts/generate-agent-content.js` | Generates static documentation, `llms-full.txt`, and the production sitemap. |
| `llms.txt` | Concise AI-readable canonical map of the site. |
| `llms-full.txt` | Generated full public documentation context; present in `dist/`, not edited manually. |
| `sitemap.xml` | Generated public route and documentation index in `dist/`. |

## Design Direction

The user wants the site to feel closer to high-quality modern product pages such as Multica, with:

- less text
- more whitespace
- stronger first-glance product proof
- real product screenshots
- minimal docs similar in spirit to Impeccable docs
- colors closer to the AgentWorks desktop app, not bright green
- product visuals that are readable without feeling like tiny thumbnails

The homepage has now been aggressively compressed. Keep that direction: product proof first, one short idea per section, and deeper explanation on secondary routes.

## Known Open Issues

### 1. Dense Full-Canvas Screenshots

The new lightbox fixes inspectability, but the inline page still sometimes shows full-dashboard captures in small frames.

Better next step:

- create cropped/detail-first assets for dense sections
- show the meaningful UI detail inline
- keep the full image available in the inspector if needed

Do not rely only on modal expansion. A visitor should understand the proof before clicking.

### 2. Motion Demo Composition

The current motion demo is usable because it opens large, but the embedded frame can still look busy.

Better next step:

- record or crop a cleaner demo focused on one visible product story
- avoid combining too much terminal text and right-panel detail in one small frame
- keep overlay text short and readable

### 3. Text Density

Several sections still read more like a technical architecture note than a sales page.

Better next step:

- keep one strong sentence per section
- let the product visual carry proof
- move details to docs or expandable sections

### 4. Route Consistency

Home has received the most attention. Other routes have been compressed and cleaned, but they still need a final design pass after the main direction is approved.

Review routes in this order:

1. Home
2. How it works
3. Docs
4. Use cases
5. Updates

## Recommended Resume Plan

When design work resumes:

1. Start at `http://127.0.0.1:8765/index.html?cb=agentworks1`.
2. Review the homepage top to bottom without editing.
3. Identify sections where the screenshot is unreadable before expansion.
4. Replace those inline assets with cropped/detail-first screenshots.
5. Keep the existing lightbox/video inspector as the inspectable fallback.
6. Reduce copy in each changed section before adding new visual complexity.
7. Run `node scripts/verify-dist.js`.
8. Capture desktop and mobile review screenshots.
9. Add a new checkpoint note to `MARKETING_REWRITE_RESEARCH.md`.
10. Bump cache keys to the next checkpoint.

Suggested next checkpoint name:

```text
agentworks2-detail-first-product-proof
```

## Product Screenshot Rules

Use real screenshots from the AgentWorks product wherever possible.

Good inline screenshot:

- one product idea is obvious in 2 seconds
- text is readable at the rendered size
- crop focuses on the relevant UI area
- does not visibly show old Runloop branding; recapture after the app rename where possible
- no tiny full-canvas terminal text unless the section is specifically about terminal control
- no fake mockups unless explicitly labeled as conceptual

Good expanded screenshot:

- can show full workspace context
- can include dense panels
- should be useful for inspection, not just decoration

## Motion / Video Rules

Good video proof:

- one story per clip
- readable overlay text
- slow enough to follow
- no fast camera movement
- source UI fills most of the frame
- provide poster image
- include accessible label
- provide a full-size view if embedded small

For now, videos should stay MP4 with posters. Avoid bringing GIFs back; previous passes removed GIFs to reduce payload and improve loading.

## Worktree Notes

Expect the repo to have many untracked review screenshots and local artifacts. Do not clean or delete them unless the user explicitly asks.

Do not revert unrelated files. This repo has accumulated a long design history, reference captures, and generated artifacts.

## Things Not To Do Without Discussion

- Do not migrate to Vite/React build tooling just because the runtime is React-like.
- Do not add CDN React, Babel, Google Fonts, or inline executable scripts back to production pages.
- Do not deploy the full repo root.
- Do not remove legacy design files unless the user explicitly wants repo cleanup.
- Do not make a generic SaaS landing page that hides the actual product.
- Do not switch to a green-heavy palette; the user rejected that direction.
- Do not create new fake screenshots to replace real product proof.

## If React Migration Comes Up Again

Current answer:

- HTML shells plus `runloop_site.js` are fine for now.
- The site is already React-rendered in the browser.
- A full React/Vite migration is only worth it when component imports, routing, TypeScript, or compile-time checks become painful enough to justify the tooling.

If migrating later:

- keep the current route URLs
- keep local assets and CSP posture
- keep product screenshots and route metadata
- preserve `scripts/verify-dist.js` as the production gate

## Last Verified Commands

At checkpoint `agentworks-secondary21-embedded-docs-layout`, these passed:

```bash
node --check runloop_site.js
node --check scripts/generate-og-images.js
node --check scripts/verify-dist.js
node scripts/generate-og-images.js
node scripts/verify-dist.js
```

Chrome/Playwright also verified that the homepage renders AgentWorks branding and no visible Runloop page text. The latest smoke screenshot is `review-agentworks1-home-smoke.png`.
