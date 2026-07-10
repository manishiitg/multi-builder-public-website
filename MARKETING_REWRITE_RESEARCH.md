# AgentWorks Marketing Rewrite Research

Date: 2026-07-06

## Positioning Bet

AgentWorks should lead as the operating loop / control room for AI and coding agent fleets, not as a generic AI automation builder.

The sharpest message:

> The control room for an AI-run organization.

Supporting copy:

> AgentWorks turns terminal agents and workflow agents into an operating system: goals, schedules, live runs, Pulse, Auto Improve, shared skills, and org-level reporting for teams scaling toward 100+ agents.

## Why This Direction

The market is moving from isolated chat and single-agent demos toward delegated work. That makes the core buyer problem less about "can an agent do a task?" and more about:

- who assigns work across agents
- who controls tools, identity, and policies
- who measures whether runs worked
- who stores reusable learning
- who decides which proposed changes are safe
- who sees the state of 100+ workflows without reading 100 logs

## Research Signals

- [Multica GitHub](https://github.com/multica-ai/multica) positions around managed coding agents, task assignment, progress tracking, and reusable skills. Runloop should not copy the "agents as teammates" line, but it validates the need for a management layer above Claude Code, Codex, and similar workers.
- [Multica website](https://www.multica.ai/) leads with a category metaphor, "human + agent workforce", a strong "works with" strip, and a first-viewport product screenshot. Takeaway for Runloop: keep the first screen product-led and show supported CLIs/tools immediately.
- [LangSmith](https://www.langchain.com/langsmith-platform) positions trace data, evals, and human judgment as the path to iterative improvement. Takeaway for Runloop: make the evidence-to-Pulse-to-Auto-Improve-to-skills loop explicit, not implied.
- [LangSmith Observability](https://www.langchain.com/langsmith/observability) emphasizes production traces, failures, cost, latency, and monitoring dashboards. Takeaway for Runloop: the site should explain why logs and run evidence become management surfaces.
- [Gumloop](https://www.gumloop.com/) leads with multiplayer AI agents, integrations, model choice, and IT controls. Takeaway for Runloop: "agent fleet operations" needs a governance section, not only workflow-building screenshots.
- [Gumloop Enterprise](https://www.gumloop.com/enterprise) highlights spend caps, approvals, usage monitoring, reporting, RBAC, shared credentials, and secrets. Takeaway for Runloop: show model routing, secrets, cost reporting, and human approval as core product controls.
- [Browserbase Stagehand](https://www.browserbase.com/stagehand) explains reliability by contrasting brittle selectors with AI-assisted browser automation primitives. Takeaway for Runloop: browser automation should be framed as one runtime inside a larger evidence and operations system.
- [Cursor](https://cursor.com/) uses an interactive first-page demo that switches between desktop, CLI, Slack, and other contexts. Takeaway for Runloop: static grids are weaker than a compact product tour that lets visitors inspect concrete surfaces.
- [Braintrust](https://www.braintrust.dev/) leads with quality at scale, production traces, evals, pattern discovery, and customer proof. Takeaway for Runloop: keep tying Pulse and Auto Improve to measurable quality improvement, not generic automation.
- [Vercel's product tour design writeup](https://vercel.com/blog/designing-the-vercel-virtual-product-tour) frames product tours as a way for prospective teams to interactively understand the product. Takeaway for Runloop: add an interactive tour section with tabs and real screenshots.
- [Speakeasy on AI control planes](https://www.speakeasy.com/resources/ai-control-plane/) frames the control plane as the layer for connection, identity, policy, and observability across agents. Runloop's differentiated version is more workflow-operating-loop focused: goals, schedules, Pulse, Auto Improve, skills, and Org Pulse.
- [Model Context Protocol docs](https://modelcontextprotocol.io/docs/getting-started/intro) define MCP as the open standard for connecting AI applications to tools, data, and workflows. Runloop should describe MCP as one connector layer, not the whole product.
- [Anthropic Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) validates reusable procedural knowledge as a durable agent capability. Runloop's angle is that workflow runs can generate and promote skills over time.
- [OpenAI Codex CLI docs](https://developers.openai.com/codex/cli) describe Codex CLI as a local terminal coding agent. Runloop should position these CLIs as worker runtimes that plug into a larger operating loop.
- [GitHub Agent HQ announcement](https://github.blog/news-insights/company-news/pick-your-agent-use-claude-and-codex-on-agent-hq/) validates the trend toward choosing different coding agents for different steps without losing context.

## Design Implications From Comparable Sites

- First viewport should answer: what is this, who is it for, what proof can I see, and what can I try now?
- Use real screenshots more than abstract diagrams. Abstract motion can support the page, but the product screenshot should carry trust.
- Explain the control plane stack in plain language: workers, connectors, control plane, human judgment.
- Add a governance/control section because serious agent usage creates security, cost, identity, and approval questions.
- Replace long static screenshot catalogs with an interactive tour when possible. Modern AI/dev-tool sites increasingly show the actual product in a guided, inspectable demo.
- Keep the app palette aligned with the desktop product: graphite background, dark surfaces, blue/cyan primary action and chrome, muted borders, and status colors only for health/cost/risk states.

## 2026-07-06 Follow-Up Comparison

- [Cursor](https://cursor.com/) now makes the "agent in every tool" story explicit: desktop, CLI, Slack, automations, review, model choice, and recent changelog proof. Runloop should keep showing multiple agent runtimes, but should not position as another coding agent.
- [Multica](https://multica.ai/) validates the "agents as teammates" category with task assignment, runtime monitoring, auto-detected CLIs, and a simple four-step getting-started path. Runloop's stronger angle is agent operations: goals, Pulse, schedules, approvals, evidence, and skill promotion across workflows.
- [Braintrust](https://www.braintrust.dev/) leads with quality at scale: production traces, pattern discovery, evals, and release quality. Runloop should borrow the quality-loop clarity while staying focused on workflow ownership and execution control.
- [LangSmith](https://www.langchain.com/langsmith-platform) frames trace data as fuel for agent improvement and connects observability, evaluation, deployment, and fleet. Runloop should make "evidence becomes Pulse, Auto Improve, and skills" visible near the top of the page.
- [Langfuse](https://langfuse.com/) uses the loop language "launch, observe, improve" and explains traces, evals, prompt management, experiments, human annotation, and cost/latency in one connected workflow. Runloop should make clear that it operates the agent runtime as well as the improvement loop.

Action taken from this comparison: add a near-top "Category fit" section that distinguishes agent workers, durable workflow engines, observability/eval tools, and Runloop's operating layer.

## 2026-07-06 Agentfleet17 Section Update

Fresh comparison still points to the same design pattern:

- Cursor makes the product feel concrete by showing agents across terminal, Slack, reviews, and installs in one compact product story.
- Langfuse owns a simple loop: launch, observe, improve.
- Braintrust owns the production-quality loop: surface patterns, create evals, improve releases.
- Multica owns the teammate/workforce metaphor for coding agents.

Runloop should not lead with another generic comparison grid. The stronger near-top move is to show the product motion:

1. Assign goals.
2. Run workers.
3. Read evidence.
4. Improve safely.

Action taken: replaced the text-heavy category section with a "Control room" operating-system section that shows a Runloop-style operating panel, today's exception queue, metrics, human approval boundary, and a compact market-positioning strip below it.

## 2026-07-06 Agentfleet18 Stack Band

The first scroll still needed one fast buyer-orientation answer: "does this work with the agent/tool stack I already use?"

Competitor pattern:

- Cursor quickly shows that it works across terminal, Slack, and GitHub.
- Multica highlights supported agent workers immediately.
- Langfuse and Braintrust quickly connect product surfaces to the improvement loop.

Action taken: replaced the generic metric strip below the hero with a compact "Works with your stack" band. It groups Runloop into agent workers, tool access, operations, and scale metrics so visitors can understand the compatibility surface before reading the deeper operating-loop section.

## 2026-07-06 Agentfleet20 Use-Case Lanes

After the stack band and control-room section, the homepage repeated the same idea in two separate blocks: "control plane above CLIs" and "operating a fleet is hard." That made the middle of the page feel explanatory instead of sales-ready.

Competitor pattern:

- Cursor shows concrete surfaces for where the agent works.
- Multica quickly maps the product to managed coding-agent work.
- Braintrust and Langfuse move from the big loop into specific production workflows.

Action taken: replaced the repeated "what it is / real problem" blocks with a single "Where Runloop fits" section using real product screenshots. It maps Runloop to three buyer lanes: coding-agent fleets, recurring workflows, and org operations.

## 2026-07-06 Agentfleet21 Workflow Lifecycle

Fresh comparison reinforced that the best AI/devtool pages make the operating loop inspectable:

- Cursor keeps showing concrete surfaces instead of only claims.
- Braintrust connects production signals to automatic improvement and quality gates.
- Langfuse makes the full cycle memorable with "launch, observe, improve."

Runloop had the right idea, but too many adjacent sections repeated "plan, run, pulse, improve." That made the homepage feel longer without adding conviction.

Action taken: collapsed the repeated operating-loop block into one lifecycle section. The new section shows a single workflow ledger on the left and four real product screenshots on the right, making the core claim clearer: a workflow is not done when the agent stops; the next run should inherit the evidence, Pulse verdict, cost signal, and promoted skill.

## 2026-07-06 Agentfleet22 Product Tour

The tour had useful screenshots but still behaved like a generic tabbed gallery. Current AI/devtool pages make the product proof feel inspectable:

- Cursor shows surfaces where the agent actually works: desktop, CLI, Slack, review, and automations.
- Multica frames product surfaces around human/agent task management and status.
- Braintrust and Langfuse make quality improvement legible by tying traces, evals, production data, and improvement together.

Action taken: redesigned the product tour as an operator-question walkthrough. Each surface now answers a concrete question: what needs attention, which worker should run, what is the agent doing, what happened in the browser, which secrets can be used, and what previous runs taught the system. The screenshot remains central, but it is framed by a live operator question, a Runloop answer, and proof signals.

## 2026-07-06 Agentfleet23 Conversion Paths

Comparable AI/devtool sites make the next step unambiguous:

- Cursor repeats a direct download CTA and pairs it with a get-started path.
- Langfuse pairs "Start free" with docs and even gives install prompts for coding agents.
- Multica offers start, desktop download, and sales paths in the first screen.

Runloop's final CTA only pushed the latest release and docs. That was fine for a hobby install, but weaker for a visitor trying to decide whether Runloop is a local desktop app, an open-source runtime, or something a team can evaluate on shared infrastructure.

Action taken: replaced the final CTA with three conversion paths: local Mac app, developer/source route, and team/server evaluation route. The team route links to the real Kubernetes and Azure VM deployment blueprints in the repository, while the command panel still keeps the first local workflow path visible.

## 2026-07-06 Agentfleet24 Docs Front Door

The docs page looked credible but the first screen wasted space: the quickstart command panel stretched into an empty block beside the four-step route. This made the docs feel less deliberate than modern technical docs.

Reference pattern:

- Impeccable docs lead with a short install path, then "choose a command" cards.
- Langfuse docs expose quickstarts by user need, not only a linear article.
- Braintrust docs present start, instrument, observe, annotate, and evaluate as navigable buckets.

Action taken: tightened the docs hero so the command panel no longer stretches into empty space and added four visible entry paths: run locally, operate the loop, add workers/tools, and deploy for a team. The docs page now works better as a front door for different technical readers instead of only a long implementation article.

## 2026-07-07 Agentfleet26 Operating Contract Band

The first post-hero section still read like an integration inventory. Current AI/devtool pages are more convincing when they show the operating model:

- Multica makes workers feel manageable by showing assignment, progress, skills, and runtime state.
- Braintrust connects production signals to automatic improvements and quality gates.
- Langfuse frames observability, evaluation, prompt management, human annotation, cost, and latency as one engineering loop.
- Cursor shows the agent across desktop, CLI, Slack, review, and automation surfaces instead of treating each integration as a separate bullet.

Action taken: redesigned the stack strip as an "operating contract" band. It now states what every worker gets inside Runloop: goal, worker routing, evidence, signal, and reusable skill. The right side still shows supported worker/tool/operations groups and fleet metrics, but the dominant message is now the control-plane contract rather than a generic list of integrations.

## 2026-07-07 Agentfleet28 Governance Surfaces

The lower "Controls" section was still a generic six-card grid. That weakened the product story because governance claims are only credible when buyers can see the control surfaces.

Reference pattern:

- Langfuse shows cost, latency, evals, human annotation, prompts, and traces as concrete product modules instead of abstract assurances.
- Braintrust ties automation to quality gates, online scoring, and pattern discovery.
- Multica shows runtime and skill management with visible product surfaces.
- Cursor keeps moving between concrete product contexts instead of explaining integrations as plain text.

Action taken: replaced the text-only Controls block with a product-backed Governance section. The section now shows real Runloop screenshots for scoped secrets, cost reporting, and browser evidence, plus a policy rail for model routing, schedules/approvals, and reusable skills. This makes the "governance, not just prompts" claim inspectable.

## 2026-07-07 Agentfleet30 Deployment Proof

The trust section still said "built for real execution" but proved it with text-only cards. That was weaker than comparable infrastructure pages:

- Langfuse makes open-source and self-hosting concrete with deployment options, community proof, and docs paths.
- Braintrust puts security, hybrid deployment, observability, and quality gates into the same production-readiness story.
- Multica explains where execution happens, how runtimes are managed, and why self-hosting matters.

Action taken: replaced the generic trust matrix with a deployment proof section. It now shows a local-to-server topology, real screenshots for scoped secrets, reporting/cost evidence, and connectors, plus linked proof cards for public releases, credential docs, server deployment docs, and workflow reporting. Also fixed product asset paths so nested docs pages load screenshots correctly.

## 2026-07-07 Agentfleet32 Runtime Learning Compression

The homepage still had two adjacent sections saying related things: one about choosing the right model/CLI, and one about evidence making future runs smarter. That repeated the loop and made the page feel longer than the best reference sites.

Reference pattern:

- Multica pairs runtimes and skills in one story: run agents, track them, and compound reusable capabilities.
- Langfuse and Braintrust connect model quality, cost, observability, and improvement as one loop instead of separate claims.
- Cursor keeps product surfaces compact and contextual, especially when moving across desktop, terminal, and background agents.

Action taken: merged the old "Multi-agent runtime" and "Evidence compounds" homepage sections into one "Runtime learning" section. The new section says the model plan should get cheaper as the workflow gets smarter, then proves it with three product-backed cards: route model/CLI choice, measure runs with Pulse, and reuse generated skills.

## 2026-07-07 Agentfleet33 Docs System Map

The docs page was readable, but the first product explanation still felt like a markdown article: a text diagram and concept cards before the deeper references. Strong docs front doors make the system visible early.

Reference pattern:

- Impeccable docs start with a short command path, then a command/system map instead of a long essay.
- Langfuse docs put the product areas into a clear overview: observability, prompts, evaluation, and platform.
- Braintrust docs organize the product by workflow stages: start, instrument, observe, annotate, evaluate, deploy.

Action taken: replaced the text-only "Operating Loop" docs section with a product-backed "System Map" and moved it above install. The new docs map shows the Runloop control loop, then anchors it with real product screenshots for goals, model routing, Pulse evidence, and reusable skills.

## 2026-07-07 Agentfleet34 Compact Operating Contract

The homepage first scroll was getting stronger, but the post-hero "Operating contract" band had become too tall and text-heavy. It repeated the next control-room section instead of quickly answering the modern devtool buyer question: "Will this fit my stack and what wrapper does every worker get?"

Fresh comparison:

- Cursor makes multi-surface agent usage concrete across desktop, CLI, automations, and review.
- Inngest keeps durable workflow categories easy to scan: execution, queues, observability, evals, AI workflows, webhooks, background jobs, and crons.
- Braintrust and Langfuse keep the quality loop explicit: observe production behavior, evaluate, improve, and automate repeated learning.

## 2026-07-07 Agentfleet110 Primary Navigation

After adding the dedicated Automations page, the top navigation became too crowded: Home, Use cases, Automations, Deploy, Updates, How it works, Docs, GitHub, and Install all competed in the first viewport.

Reference pattern:

- Multica keeps the first path focused on the product category and supported workers.
- Gumloop foregrounds automation and agent use cases rather than exposing every content surface in the nav.
- Lindy keeps the primary buyer path outcome-led and moves supporting proof deeper.
- Impeccable docs stay narrow: concise navigation, minimal page chrome, and direct reference paths.

Action taken: tightened the primary nav to five routes: Automations, Use cases, Deploy, How it works, and Docs. The logo remains the Home path, GitHub/Install stay as actions, and Updates stays available through footer, sitemap, and direct URL without crowding the buyer path.

Action taken: compressed the post-hero operating contract into a compact system band. The contract now scans horizontally on desktop: Goal, Worker, Evidence, Signal, Skill. Compatibility groups and fleet metrics sit in a tighter lower rail so the page reaches product proof faster.

## 2026-07-07 Agentfleet35 How Page Run Packet

The how page had strong product screenshots, but the middle "Control plane" section was still a generic six-card grid. That made the page explain responsibilities, but not the actual implementation object that makes the operating loop credible.

Reference pattern:

- Inngest makes durable workflow state legible by talking about execution, queues, observability, evals, webhooks, background jobs, and crons as concrete runtime concerns.
- Braintrust and Langfuse make improvement credible by tying traces, evals, costs, annotations, prompts, and production signals to structured records.
- Cursor makes agent work understandable by showing concrete surfaces instead of abstract capability bullets.

Action taken: replaced the how-page control grid with a "run packet" architecture section. It now shows four layers: Worker runtime, Workflow state, Evidence record, and Improvement layer. The side panel shows a concrete `run-packet.json` style record so technical readers understand how the workflow can be resumed, audited, and improved.

## 2026-07-07 Agentfleet36 Asset Path Hardening

The docs page uses `<base href="/">`, but product screenshots were still generated with a docs-specific `../assets/product/` prefix. That worked inconsistently in audits because lazy images were not always resolved before screenshots.

Action taken: simplified the product asset base to `assets/product/` for every page. With the current HTML base behavior this resolves from the site root on home, how, and docs, reducing path-specific fragility before deployment.

## 2026-07-07 Agentfleet37 Mobile Narrative Compression

The desktop homepage can support a full narrative arc, but the mobile homepage had become too long: the same operating-loop idea appeared through multiple deep sections and pushed the page above 24,000px. Current AI/devtool sites such as Cursor and Inngest keep the first mobile path tighter: concrete proof first, then a compact explanation, then product surfaces and conversion.

Action taken: added a mobile-only "Mobile briefing" section after the operating contract. It summarizes the product model as Workers, Run packet, Pulse, and Learning, with two product proof thumbnails. On mobile only, the deeper desktop sections for control room, lifecycle, use cases, runtime learning, governance, and deployment are hidden, leaving a shorter path: hero proof, operating contract, mobile briefing, product tour, and conversion.

## 2026-07-07 Agentfleet38 Docs Mobile Index

The docs page rendered correctly, but the mobile section navigation was ordered after all documentation content. That meant a phone reader could not jump to Install, Reference Map, Agent Fleet, Integrations, Observability, or Security until reaching the bottom.

Action taken: changed the mobile docs layout so the sidebar becomes a compact top index. The brand mark is hidden inside the docs index on mobile, section links render as horizontal chips, and the GitHub docs link remains directly available before the article content.

## 2026-07-07 Agentfleet39 Production Metadata

Comparable devtool sites such as Cursor and Inngest include full production metadata: theme color, Open Graph title/description/image, Twitter Card metadata, canonical URLs, and structured data. Runloop only had title, description, and canonical links, which made it weaker when shared in social feeds or indexed.

Action taken: generated a `1200x630` social preview image from the current Runloop hero and added page-specific Open Graph, Twitter Card, theme-color, and JSON-LD metadata to the home, how, and docs pages.

## 2026-07-07 Agentfleet40 Developer Quickstart Proof

The homepage had strong product narrative, but the installable proof appeared mostly as buttons and a lower CTA. Strong developer-product sites such as Cursor, Inngest, and Trigger.dev make the "start building" path visible early, while still keeping the product demo as the visual anchor.

Action taken: added a compact developer quickstart band directly below the hero. It shows the one-line install command, links to the latest release, source repo, and docs, then summarizes the first three steps: install the Mac app, connect workers, and operate the loop. The section uses the same graphite/cyan desktop-app palette and collapses into the compressed mobile homepage path.

## 2026-07-07 Agentfleet41 Product Motion Proof

Comparable product-led sites such as Linear, Cursor, and modern agent/observability pages use motion to make the product feel alive, but the motion usually proves a real workflow rather than acting as decoration. Runloop had real GIF assets from product walkthroughs, but the homepage still leaned mostly on static screenshots after the hero.

Action taken: added a "Product motion" section after the developer quickstart. It uses the real operating-loop GIF as the primary proof surface and supports it with compact multi-CLI setup and workflow-plan motion cards. The copy connects the animation to the core positioning: workers run, Pulse measures, Auto Improve proposes, and reusable skills compound.

## 2026-07-07 Agentfleet42 How Page Responsibility Split

The how page explained Runloop's loop and run-packet architecture, but it did not explicitly separate Runloop from adjacent categories. Comparable pages in the space make category boundaries clear: LangGraph emphasizes state, memory, and human-in-the-loop orchestration; Inngest emphasizes durable execution, retries, and step observability; Braintrust and Langfuse emphasize traces, evals, prompt management, metrics, and improvement workflows.

Action taken: added a "Where Runloop fits" section after the how-page loop. The new responsibility table separates agent CLIs, workflow engines, observability/eval systems, and Runloop. The Runloop row is highlighted as the operator layer that owns goals, evidence, cost, approvals, and improvement before the next run.

## 2026-07-07 Agentfleet43 Documentation Screenshot Framing

Some docs proof screenshots were rendered inside fixed-ratio frames with `object-fit: cover`, which made taller product surfaces look emptier than the actual source image. Documentation pages should preserve the product evidence, even when it creates letterboxing.

Action taken: changed the shared product shot frame image behavior to `object-fit: contain` with a dark backing color so docs/how screenshots show the full product surface instead of a cropped slice. Docs proof frames now opt into eager loading so full-page captures and first review passes show the actual product evidence.

## 2026-07-07 Agentfleet44 Accessibility Hardening

Production devtool sites need to hold up beyond screenshots. The audit found that the page had good landmarks, alt text, and external-link hygiene, but no skip link and the product tour tabs were missing the complete ARIA tab relationship and roving focus behavior.

Action taken: added a skip-to-content link, stable `main` targets, global focus-visible styling, and upgraded the product tour to use `aria-controls`, `tabpanel`, roving `tabIndex`, and arrow/Home/End keyboard navigation following the WAI-ARIA tabs pattern.

## 2026-07-07 Agentfleet45 Crawl And Sitemap Artifacts

The pages had canonical URLs, social metadata, and structured data, but the deploy root did not include public crawl artifacts. Comparable developer-product sites expose a `robots.txt` file and sitemap discovery so search engines can find the canonical route set without guessing through implementation files.

Action taken: added `robots.txt`, `sitemap.xml`, and sitemap discovery links in the home, how, and docs page heads. The sitemap intentionally lists only public canonical marketing/docs routes: `/`, `/how/`, and `/docs/`.

## 2026-07-07 Agentfleet46 Netlify Headers

The site was relying on Netlify defaults for browser cache and response safety. That is acceptable for a prototype, but public developer-product sites should explicitly document browser security posture and cache intent, especially when HTML, versioned app files, screenshots, GIF demos, robots, and sitemap files have different freshness requirements.

Action taken: added a `_headers` file with conservative static-site security headers, CSP allowances for the current React CDN and Google Fonts setup, explicit no-cache behavior for HTML routes, long cache for query-versioned app files, shorter cache for product screenshots/media, and short cache for crawl artifacts.

## 2026-07-07 Agentfleet47 Local Runtime And Stricter CSP

The marketing site still depended on `unpkg.com` at runtime for React and ReactDOM and used executable inline boot scripts. That kept the site dependent on a third-party CDN for first render and required a broad `script-src 'unsafe-inline'` policy.

Action taken: vendored the pinned React 18.3.1 UMD runtime under `assets/vendor/react-18.3.1/`, moved page boot into `runloop_site.jsx`, removed executable inline scripts from the HTML pages, and tightened CSP to `script-src 'self'`. JSON-LD remains in the document as non-executable structured data, while all executable JavaScript is now local.

## 2026-07-07 Agentfleet50 Local Fonts And Style CSP

The site still fetched Google Fonts at runtime and kept `style-src 'unsafe-inline'` in the Netlify headers. That weakened the "production-ready" posture after the React runtime had already been moved local.

Action taken: vendored the Latin WOFF2 subsets for Space Grotesk and JetBrains Mono under `assets/fonts/`, added local `@font-face` declarations, removed Google Fonts preconnect/stylesheet tags from home, how, and docs, and tightened CSP to `style-src 'self'` with local-only font loading. Font assets now get an immutable cache rule.

## 2026-07-07 Agentfleet51 Buyer Objection FAQ

Comparable agent/devtool pages answer category and deployment questions directly before conversion. Multica uses FAQ to clarify supported coding tools, self-hosting, and agent lifecycle boundaries. Inngest explains how durable workflow infrastructure handles retries, state, scheduling, and production limits. Langfuse answers what the product is, how it differs from generic APM, and why open-source/self-hosting matters.

Action taken: added a homepage FAQ section after deployment/trust proof and before the final install CTA. It answers whether Runloop replaces agent CLIs, which workers/tools are supported, where work runs, how Runloop differs from durable workflow engines and LLM observability platforms, how Pulse/skills/Auto Improve compound workflows, and how secrets/production safety are handled. The homepage now also includes matching FAQPage JSON-LD.

## 2026-07-07 Agentfleet53 Desktop App Palette Correction

The previous pass leaned too far into green/teal, which made the marketing site feel less like the Runloop desktop app. The desktop app visual language is closer to graphite surfaces with blue/cyan primary actions, while teal is best reserved for active or healthy status signals.

Action taken: added a final CSS palette layer that restores graphite backgrounds, steel-blue navigation selection, blue install CTAs, cyan section labels, and neutral panel chrome. Teal remains available for health/status markers instead of becoming the global brand color. Verified home, docs, and mobile with no console errors and no horizontal overflow.

## 2026-07-07 Agentfleet56 Production Motion Media

The product-motion section used real product GIFs, which was useful for proof but weak for production loading. Chrome/Lighthouse guidance recommends using video formats for animated content instead of large GIFs, and web.dev also notes that autoplay video can download immediately when present in the DOM.

Action taken: converted the three product GIF demos into MP4 walkthrough assets with poster frames, replaced rendered GIF usage with a reusable lazy `ProductVideo` component, removed the docs GIF preload, and added reduced-motion handling. The homepage now loads only the hero screenshot on first paint; the MP4s and posters attach when the motion section is near the viewport. Reduced-motion users see posters without MP4 autoplay. The generated MP4s are materially smaller than the original GIFs: operating loop 1.1 MB to 350 KB, multi-CLI 846 KB to 212 KB, and workflow automation 623 KB to 167 KB.

## 2026-07-07 Agentfleet57 Public Proof Strip

Comparable developer-product sites make installability and trust legible early. Cursor keeps product proof beside conversion, Langfuse explicitly frames itself as open source and self-hostable, Inngest gives a clear start-building path around operational primitives, and Multica answers supported coding-agent/runtime questions directly. Runloop had the right raw material but visitors still had to infer too much from buttons and screenshots.

Action taken: added a compact public-proof strip immediately after the homepage hero. It answers four buyer/developer questions before the deeper quickstart: is there a public release channel, can I inspect the runtime, does it work with local/server workspaces, and can I bring my existing agent stack? Copy is tied to durable proof paths: GitHub releases, source repo/docs, local/server workspace workflow, and docs for Claude/Codex/Cursor/MCP/browser integration. Verified desktop and mobile layout, no overflow, no console errors, no GIF/MP4 first-paint media requests, and `agentfleet57` cache keys.

## 2026-07-07 Agentfleet58 Base-Safe Routing

The static pages use `<base href="/">`, which made hash-only links dangerous. A route crawl found that links such as `#install`, `#reference-map`, and the skip link could resolve to the site root instead of the current page. This is especially bad for docs pages because a sidebar click could navigate to `/#install` rather than `/docs/#install`.

Action taken: added a `marketingHash(page, id)` helper, changed skip links and docs-section links to page-qualified hashes, and normalized CTA hash URLs through the helper. Verified home, how, and docs with a browser crawl: no raw hash-only links, no root hash leaks, no empty links, no console errors, no failed requests, and no horizontal overflow. Explicit click testing confirmed `/docs/#install` remains on the docs route and `/how.html#main-content` focuses the correct `main` element.

## 2026-07-07 Agentfleet59 Team/Server Conversion Path

Comparable developer-product sites separate self-serve developer paths from high-intent team paths. Cursor pairs download/get-started with request-demo. Multica pairs desktop download with talk-to-sales. Inngest routes production-scale buyers to sales, and Langfuse has a dedicated enterprise conversation path. Runloop already had install/source/deploy paths, but team/server evaluators still had to infer how to start a conversation.

Action taken: added a restrained architecture-call path to the shared final CTA. The team/server card now leads with "Book architecture call" and keeps deployment docs as the secondary action. The final CTA action row now includes "Book a call" alongside install and docs, while the hero remains developer-first. Verified home and how final CTA surfaces on desktop/mobile: no console errors, no failed requests, no horizontal overflow, Calendly links use `target="_blank"`/`rel="noreferrer"`, and `agentfleet59` cache keys are active.

## 2026-07-07 Agentfleet60 Production JavaScript MIME

The production pages were loading plain JavaScript from `runloop_site.jsx`. Local MIME inspection showed `.jsx` resolving to `application/octet-stream` while `_headers` sets `X-Content-Type-Options: nosniff`. That combination can break script execution in production-like environments because the browser may reject a non-JavaScript MIME response.

Action taken: renamed the runtime to `runloop_site.js`, updated home/how/docs references to `agentfleet60`, changed the immutable cache rule in `_headers`, and updated README/CLAUDE architecture notes so future edits keep production pages off CDN/Babel/JSX runtime scripts. Verified the renamed runtime with `node --check` and a strict local server that sends CSP plus `nosniff`.

## 2026-07-07 Agentfleet61 First Viewport Conversion Clarity

The homepage hero had the right category claim, but the CTA row could clip on desktop and the old tag cloud made visitors infer the operating model from a list of tools. Current adjacent developer-product pages keep the first viewport focused on a sharp claim, immediate product proof, and obvious self-serve/team paths: Cursor pairs download/get-started/demo with an interface demo, Langfuse leads with open-source LLM engineering and lifecycle proof, and Inngest exposes start-building paths around durable workflows and observability.

Action taken: tightened the hero lead to explain Runloop as managed workflows around existing agent tools, changed the hero CTAs to "Install for Mac", "Read docs", and "Book a call", replaced the tag cloud with three desktop proof chips for Workers / Operating loop / Learning layer, and fixed the hero action row so it cannot clip. On mobile, the proof chips are hidden to keep the real product screenshot in the first viewport, and the hero screenshot uses a full-image `contain` treatment instead of a cropped fragment. Verified home/how/docs on desktop and mobile: no console errors, no failed requests, no horizontal overflow, and `agentfleet61` cache keys are active.

## 2026-07-07 Agentfleet62 Docs Quickstart Compression

The docs page had useful content but felt too heavy at entry, especially on mobile where the hero and quickstart path stretched past 3,700px before the next section. Comparable docs surfaces optimize for a fast first action: Cursor frames quickstart as install-to-first-useful-change, Inngest and Temporal expose concrete quickstart paths, and Langfuse starts with a tight platform overview and feature map.

Action taken: added a reusable copyable install-command card, centralized the install command constant, and reused the command component in the docs hero and install section. Compressed the docs mobile layout by stacking the docs grid correctly, containing the horizontal docs nav, turning entry cards into compact path rows, and converting the four-step route into a 2x2 checklist without paragraph blocks. Also fixed a home mobile masked-overflow issue in the operating-contract section by stacking the contract cards instead of squeezing five columns into a phone viewport. Verified home/how/docs on desktop and mobile: no console errors, no failed requests, no document/body/root horizontal overflow, docs copy button works, and `agentfleet62` cache keys are active.

## 2026-07-07 Agentfleet63 How Page Run Packet Story

The How page explained the right category but made visitors read too much before they saw the concrete product object. The hero visual was also too tall because the screenshot height attribute overrode the intended responsive sizing. Comparable explanation pages make the operating abstraction tangible: Temporal frames durable agents around resilience and replayable execution, Inngest explains durable execution through logged/replayable steps and start-building paths, Langfuse emphasizes launch/observe/improve loops, and Cursor explains agents as delegated work with human judgment.

Action taken: reframed the How hero around the "run packet" object: goal, worker, tools, evidence, Pulse, cost, approval state, and next improvement. Added the same self-serve/team CTA hierarchy as the homepage (`Install for Mac`, `Read docs`, `Book a call`), added a compact run-packet proof strip under the hero, and fixed the How hero product image to render at responsive height instead of the raw asset height. On mobile, compressed the visual rail by hiding paragraph detail and the proofbar so the product proof starts earlier. Verified home/how/docs on desktop and mobile: no console errors, no failed requests, no document/body/root horizontal overflow, no offscreen elements, and `agentfleet63` cache keys are active.

## 2026-07-07 Agentfleet64 Remove Legacy GIF Media

The production site had already moved animated product proof to lazy MP4 videos with poster frames, but the old GIF files were still shipping in `assets/product/`. That kept the deploy heavier and weakened the production posture because GIFs were no longer part of the rendered experience.

Action taken: removed the three unreferenced GIF demos: `multi-cli-management-demo.gif`, `operating-loop-demo.gif`, and `workflow-automation-demo.gif`. Product assets dropped from about 5.4 MB to 2.9 MB, and the total assets folder dropped from about 5.9 MB to 3.4 MB. Verified with source search and browser render checks: no `.gif` references remain in the DOM, MP4/poster media still loads when the motion section enters view, lazy videos stay unloaded before they are needed, no failed requests, no console errors, no missing image alt text, and no horizontal overflow.

## 2026-07-07 Agentfleet65 Desktop App Palette Alignment

The latest visual direction still read too much like a separate marketing theme in places because older CSS layers let teal leak into active navigation, brand chrome, highlight cards, and repeated UI tags. The desktop app is closer to graphite surfaces with muted blue/cyan controls; teal should mean live, healthy, or success.

Action taken: added a final CSS palette layer that makes graphite the page shell, uses muted blue for primary CTAs, nav selection, brand mark, highlights, and chrome dots, and reserves teal for the live/healthy Pulse status. Updated home, how, and docs cache keys to `agentfleet65`. Verified home mobile/desktop, how desktop, and docs desktop with no console errors, no failed requests, no page-level horizontal overflow, and generated review screenshots.

## 2026-07-07 Agentfleet66 Early Category Positioning

Current adjacent developer-product sites make their category boundaries legible early. Cursor leads with the coding-agent claim, concrete product surfaces, and download/get-started/demo paths. Multica immediately names human + agent teams, lists supported coding agents, and explains task lifecycle, skills, and runtime panels. Langfuse emphasizes open-source AI engineering, tracing/evals/metrics, self-hosting, and agent-friendly installation. Inngest explains durable AI workflows through retries, state, scheduling, step traces, and human-in-the-loop resumes. Braintrust frames AI observability as trace, eval, and automated improvement.

Action taken: promoted the existing category-positioning component into the homepage directly after the public proof strip, expanded it from three cards to four (`Agent workers`, `Durable engines`, `Observability / evals`, `Runloop`), and removed the duplicate positioning cards from the later control-room section. The new section clarifies that agent workers execute, durable engines keep code running, observability explains traces, and Runloop owns the goal/evidence/cost/approval/improvement loop around recurring agent work. Added dedicated desktop/mobile layout polish and updated home/how/docs cache keys to `agentfleet66`. Verified home desktop/mobile, how desktop, and docs desktop with no console errors, no failed requests, no page-level horizontal overflow, and four category cards rendered on the homepage.

## 2026-07-07 Agentfleet67 Production Route Boundary

The production deploy still had old Claude Design/template routes in the public surface: `/automations/:slug/` rewrote to `template.html`, and direct `template.html` / `wireframes.html` remained crawlable. Those legacy pages depend on CDN React, Google Fonts, Babel, and inline runtime scripts, while the current site intentionally uses local assets and strict CSP. Comparable production developer sites expose their product/docs/changelog surfaces, not stale design artifacts that are blocked by their own security policy.

Action taken: retired the legacy public routes without deleting local reference files. `/automations/:slug/` and `/template.html` now redirect to `/docs/`, `/wireframes.html` redirects to `/`, `robots.txt` disallows legacy design artifacts, `_headers` adds `X-Robots-Tag: noindex, nofollow` on legacy pages, and README/CLAUDE document the boundary. The active production sitemap remains limited to `/`, `/how/`, and `/docs/`.

## 2026-07-07 Agentfleet68 Allowlisted Netlify Publish

The repo root had become a poor production publish directory: the full folder was about 161 MB, while active product assets were about 3.4 MB and internal review screenshots alone were about 127 MB. Direct `netlify deploy --prod --dir=.` would risk uploading review screenshots, local wireframes, legacy JSX/Babel experiments, and other non-site artifacts. Comparable production developer sites keep their public deploy surface scoped to active pages and assets.

Action taken: added a root `netlify.toml` with an explicit build command and `dist/` publish directory, added `scripts/prepare-deploy.sh` to copy only active site files, added `dist/` to `.gitignore`, and updated README/CLAUDE deploy instructions. This keeps `/`, `/how/`, `/docs/`, product media, icons, CSS/JS, metadata, `_headers`, and `_redirects` in the publish payload while excluding review screenshots and legacy local artifacts.

## 2026-07-07 Agentfleet69 AI Discovery Map

Chrome Lighthouse now includes an agentic browsing audit for `llms.txt`, and the proposed `/llms.txt` format is a concise Markdown summary of a site's purpose and key links. This is low-cost for a developer product because Runloop already has a small set of canonical pages and public implementation links.

Action taken: added a root `llms.txt` with the product definition, canonical pages, important GitHub/release/deployment links, key concepts, and suggested citation sources. Added `llms.txt` to the allowlisted deploy script, gave it a short cache rule in `_headers`, and documented the file in README/CLAUDE so future canonical routes update it.

## 2026-07-07 Agentfleet70 Browser Metadata Polish

The pages already had title, description, canonical, Open Graph, Twitter card, favicons, and schema metadata, but they lacked a web manifest and explicit browser color-scheme/application metadata. This is small polish, but it makes the site behave more like a finished developer product when saved, previewed, or inspected by browser tooling.

Action taken: added `site.webmanifest` with Runloop name, description, theme/background colors, start URL, scope, display mode, and icon references. Added `rel="manifest"`, `application-name`, and `color-scheme` tags to Home, How, and Docs; added manifest copying to the allowlisted deploy script; added a cache rule in `_headers`; and documented the metadata file in README/CLAUDE.

## 2026-07-07 Agentfleet71 Production Payload Verifier

After the visual, metadata, route-boundary, and deploy-payload passes, the remaining risk was regression drift: future edits could accidentally reintroduce CDN/Babel scripts, forget a canonical metadata field, miss a copied asset in `dist/`, leak local review files, or break a rendered route. Mature developer-product sites treat this as a quality-gate problem rather than a manual checklist.

Action taken: added `scripts/verify-dist.js`. It runs `node --check`, rebuilds `dist/`, checks required production files, validates metadata/schema prerequisites, verifies local asset references, blocks legacy/review artifacts from the publish payload, enforces a small payload budget, validates `site.webmanifest` and `llms.txt`, and renders Home, How, and Docs in Chrome with Playwright to catch console errors, failed requests, overflow, missing manifest links, and legacy runtime scripts. README/CLAUDE now point future deploys and page additions through this verifier.

## 2026-07-07 Agentfleet72 Branded 404

The active production routes were polished, but a missing URL still fell back to a generic server error or host-level 404. Mature developer-product sites treat bad and old URLs as a recovery path: explain that the route is stale, keep the brand shell, and send visitors to current install/docs/product surfaces.

Action taken: added a branded `404.html` shell and `NotFoundPage` component in the shared runtime. The page uses the same nav/footer, links back to Home, Docs, and the latest release, includes noindex metadata, and has a small Runloop-style route status panel. Added `404.html` to the allowlisted deploy script, `_headers`, README/CLAUDE, and the production verifier. The verifier now renders `/404.html` and a simulated missing route that serves the 404 page with a 404 status.

## 2026-07-07 Agentfleet73 Desktop App Color Tuning

The desktop-app palette was directionally right, but the first viewport still had too much bright marketing-blue energy in primary controls and not enough of the Mac app's quiet graphite window feel. The product screenshot should read as the source of truth, while blue should feel like app chrome and action affordance rather than a separate brand theme.

Action taken: added a final CSS tuning layer that flattens the page lighting, mutes primary CTA gradients, strengthens graphite panel borders, gives the hero screenshot a more desktop-window-like frame, and keeps teal reserved for live/healthy state. Updated all active page cache keys to `agentfleet73`.

## 2026-07-07 Agentfleet74 Use Cases Route

The page set still jumped from homepage to explanation/docs without a dedicated sales-friendly fit guide. Adjacent developer-product sites make this path explicit: Multica names human + agent team management and shows task lifecycle, skills, and runtimes; Cursor exposes product surfaces such as agents, CLI, cloud, mobile, automations, and review from the nav; Inngest frames durable AI code around failures, retries, scheduling, and human-in-the-loop waits; Langfuse and Braintrust make improve loops, traces, evals, quality, and automation obvious. Runloop needed a canonical page that answers "when should I use this?" before asking someone to read docs.

Action taken: added `/use-cases/` as a production route with a real HTML shell, metadata, sitemap entry, redirects, headers, `llms.txt` entry, docs updates, deploy allowlist, verifier coverage, nav/footer links, and page-specific CSS. The page positions Runloop around four scenarios: agent fleet control, recurring workflows, client/server workspaces, and Auto Improve/Pulse/skills. It also adds an adoption path and a category-boundary section explaining how Runloop sits beside raw agent CLIs, workflow engines, and observability/eval tools. Updated active cache keys to `agentfleet74`.

## 2026-07-07 Agentfleet75 Deploy And Trust Route

The next buyer-confidence gap was deployment posture. Comparable open-source developer products do not hide this: Multica explicitly says it is open source, self-hostable, and can run on your own infrastructure; Langfuse has a first-class self-hosting section with low-scale Docker/VM options, production Kubernetes/Terraform options, architecture, security, and operational requirements. Runloop already had deployment and security material in the repo, but the marketing site only surfaced it indirectly through docs links and a lower homepage section.

Action taken: added `/deploy/` as a production route with a local-first/server-capable trust story: Mac app, dedicated VM, Kubernetes, server workspaces, scoped AES-256-GCM secrets, locked provider/MCP config, folder/workspace boundaries, MCP OAuth, human approval gates, and evidence records. The page stays honest about the current release posture, including the unsigned/not-notarized alpha macOS build and the AUTH_SECRET requirement. Wired the route into navigation, footer, metadata, sitemap, redirects, headers, `llms.txt`, README/CLAUDE, deploy allowlist, and verifier coverage. Updated active cache keys to `agentfleet75`.

## 2026-07-07 Agentfleet78 Category Clarity And Mobile Nav

The homepage category section was useful but still read like a generic comparison grid. Fresh reference checks point to three adjacent categories that visitors will already know: Multica-style managed-agent boards, Langfuse/Braintrust/LangSmith-style observability and eval loops, and Temporal/Inngest-style durable workflow engines. The stronger Runloop claim is not "we replace these"; it is "we keep the operating record around recurring agent work: goal, worker, evidence, Pulse, cost, approval, and skill improvement."

Action taken: rewrote the early category section around those adjacent categories and changed each card to a clearer `Owns well` / `Runloop adds` structure. The highlighted Runloop card now says exactly what the product owns: goals, schedules, workers, secrets, evidence, Pulse, reports, costs, approvals, and skills. Also fixed the mobile nav to wrap into a compact two-row/three-column control instead of clipping hidden links. Verified with `node scripts/verify-dist.js`, JS syntax check, and desktop/mobile screenshots at `agentfleet78`.

## 2026-07-07 Agentfleet79 Motion Section Compression

The homepage was becoming too long and repetitive. A rendered section audit showed the Product Motion block alone taking about 1,482px on desktop because video elements were honoring their intrinsic `height="720"` while squeezed into narrow columns. That made the two secondary demos render as tall vertical slivers and weakened the otherwise strong product proof. Comparable developer-product homepages usually keep one primary interactive/media proof visible, then use compact copy or cards to support the claim.

Action taken: fixed motion video sizing with an explicit responsive `.mk-motion-video` rule, kept one main operating-loop demo, and replaced the two secondary autoplay videos with lightweight proof chips for multi-CLI setup, workflow planning, and Pulse/Auto Improve. The Product Motion section dropped to about 872px on desktop, video now renders at the correct wide ratio, and the page does less work without losing the proof. Verified with `node scripts/verify-dist.js`, JS syntax check, measured section geometry, and desktop/mobile screenshots at `agentfleet79`.

## 2026-07-07 Agentfleet80 Product Tour Moved Earlier

The homepage still buried the interactive product tour too far down the page. A section audit after the motion fix showed the Product Tour starting around 9,905px, after several architecture and use-case sections. Comparable developer-product sites such as Cursor and Langfuse put concrete product inspection much earlier: visitors see the working surfaces before they read deep architecture. Runloop already had the right tour component; the issue was flow order.

Action taken: moved the Product Tour directly after the Product Motion proof and before the operating-contract/architecture sections. Reframed the heading from a late "Product tour" section to an early "Product inspection" section: inspect surfaces by the operator question they answer. The tour now starts around 3,271px, so visitors get real screenshots, tabs, proof signals, and operator questions before the deeper control-plane narrative. Verified with `node scripts/verify-dist.js`, JS syntax check, measured section geometry, and desktop/mobile screenshots at `agentfleet80`.

## 2026-07-07 Agentfleet81 Global Image Sizing Fix

A rendered section audit found a site-wide quality bug: product screenshots carried HTML `width` and `height` attributes for performance, but the base image rule did not set `height: auto`. In several width-constrained grids, screenshots rendered with narrow widths and their intrinsic `720px` height. This made the lifecycle proof section 2,011px tall and made some product pages feel heavier than intended. Comparable high-polish sites keep media proportional and let product proof support the flow instead of stretching it.

Action taken: added `height: auto` to the base `img` rule. This fixed the lifecycle proof board, shortened the homepage from about 16,893px to 14,049px, moved the product tour earlier in actual scroll position, and improved screenshot proportions on Home, Use Cases, and Deploy. The lifecycle proof section dropped from about 2,011px to 1,072px while keeping all four real screenshots. Verified with `node scripts/verify-dist.js`, JS syntax check, measured image geometry, and desktop/mobile screenshots at `agentfleet81`.

## 2026-07-07 Agentfleet82 Desktop App Palette Restore

The later route and product passes had reintroduced bright VS Code-blue controls and made the page feel more like a generic developer landing page than the Runloop desktop app. The stronger visual system is the one already present in the product screenshots: graphite app chrome, restrained borders, muted blue/cyan action affordances, and teal only for live/status/kicker details.

Action taken: added a final CSS palette layer that overrides the later bright-button rules, restores graphite page and panel surfaces, mutes primary CTA gradients, keeps nav and cards closer to desktop window chrome, and reserves teal for the logo mark, labels, and status-style metadata. Updated active cache keys to `agentfleet82`. Verified with `node scripts/verify-dist.js`, JS syntax check, and fresh Home, Use Cases, and Deploy screenshots.

## 2026-07-07 Agentfleet83 Homepage Bottom Funnel Compression

Reference scan: Multica leads with a direct agent-team promise, then moves through task lifecycle, reusable skills, runtimes, and open source; Cursor puts concrete product interfaces and surfaces early; Langfuse makes the "launch, observe, improve" loop explicit; Linear uses a numbered product-system narrative and keeps conversion surfaces concise. Against those patterns, Runloop's proof-heavy homepage was improving, but the bottom funnel still repeated too much: FAQ was 1,217px desktop / 2,146px mobile and final CTA was 1,155px desktop / 2,584px mobile.

Action taken: compressed the FAQ from seven verbose cards to five boundary-focused cards, shortened the final CTA copy, removed redundant proof chips from the path cards, reduced the first-workflow checklist from four rows to three, and added responsive CSS that keeps the bottom funnel compact after the desktop palette overrides. Desktop homepage height dropped from about 14,049px to 13,080px; mobile dropped from about 16,222px to 14,412px. FAQ now measures about 647px desktop / 1,139px mobile, and final CTA about 755px desktop / 1,781px mobile. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, and desktop/mobile screenshots at `agentfleet83`.

## 2026-07-07 Agentfleet84 Mobile Flow Compression

After the bottom-funnel compression, mobile still carried a desktop-style argument before product inspection: category comparison was 2,366px, stack contract was 1,247px, and the mobile-only briefing did not appear until around 9,723px. This made the phone experience weaker than reference sites that use a distinct mobile scan path: headline, proof, concise product logic, then the product surface.

Action taken: moved the existing mobile briefing directly after the public proof strip, hid the deep category comparison and stack contract on mobile only, removed the briefing screenshots on mobile, and compacted the product-tour operator tabs into a two-column mobile control so screenshots appear sooner. Desktop layout and section depth are unchanged. Mobile homepage height dropped from about 14,412px to 10,042px; the mobile briefing now starts around 2,087px instead of 9,723px; product tour height dropped from about 1,947px to 1,432px. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, and mobile screenshots at `agentfleet84`.

## 2026-07-07 Agentfleet85 Homepage Deploy Summary

Reference scan: Multica presents runtime/self-host posture as concise homepage trust proof, then sends users to setup/docs; Langfuse keeps "open platform / open source" and self-host options compact on the homepage while deeper deployment detail lives in docs; Cursor keeps install and tool-surface proof short in the main flow. Runloop already has a dedicated `/deploy/` route, so the homepage deployment block did not need to repeat full screenshot evidence.

Action taken: rewrote the homepage deploy/trust section as a compact trust summary: topology rows, artifact chips, assurance cards, and release/deploy-doc links. Removed the large three-screenshot proof stage from the homepage only; the dedicated deploy page still carries the detailed deployment/security story. Desktop deploy section height dropped from about 1,363px to 840px, and desktop homepage height dropped from about 13,080px to 12,557px. Mobile is unchanged because this section is already hidden there. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, and screenshots at `agentfleet85`.

## 2026-07-07 Agentfleet86 Product Tour Compression

After deploy compression, the only desktop homepage section still taller than a viewport was the product tour. The rendered audit showed a 236px intro plus a 710px tour grid on desktop, and a 300px intro plus 1000px tour grid on mobile. The section is important because it carries real product proof, so the goal was to shorten it without hiding screenshots or operator questions.

Action taken: tightened the tour intro, tab rows, current-answer summary, screenshot crop, callout, answer panel, and proof chips. On mobile, hid the secondary Open docs link, kept the two-column operator-question control, reduced tab and answer heights, and kept the product screenshot visible within the tour viewport. Desktop tour height dropped from about 1,168px to 960px; mobile tour dropped from about 1,432px to 1,192px; desktop homepage dropped to about 12,349px and now has no section above the 1.15 viewport threshold. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, and screenshots at `agentfleet86`.

## 2026-07-07 Agentfleet87 Governance Matrix Compression

Fresh reference check: Multica keeps supported workers, task lifecycle, reusable skills, runtimes, and open-source posture in direct product proof; Cursor keeps product surfaces such as desktop, CLI, cloud, automations, and review easy to scan; Langfuse makes proof and trust legible through community stats, integrations, self-hosting, and the launch/observe/improve loop; Inngest keeps its control claims around compact primitives such as durable execution, flow control, observability, and CISO-facing trust. The pattern is that mature developer sites avoid turning control/security material into a long catalog.

Action taken: compressed the homepage Governance section from a large six-feature catalog into a tighter control matrix. Kept the three real screenshot cards for scoped secrets, cost visibility, and browser evidence, then converted model routing, schedules/approvals, and reusable skills into a compact policy row. The section now reads as one control-plane argument rather than two separate feature lists. Desktop governance height dropped from about 1,134px to 884px; desktop homepage height dropped from about 12,349px to 12,099px. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, and screenshots at `agentfleet87`.

## 2026-07-07 Agentfleet88 Mobile First-Screen Compression

After the desktop governance pass, the mobile homepage was still too stacked. A 390px render showed the hero at about 1,240px, the final CTA at about 1,781px, and the full mobile page at about 9,802px. The first screen made visitors read three tall CTA rows before the product proof became visible, and the final CTA repeated long path descriptions that were already explained earlier.

Reference check: Multica exposes category, supported agents, CTAs, and a product screenshot immediately; Cursor keeps product surfaces and start paths explicit; Langfuse puts proof, integrations, and get-started paths early; Inngest keeps the mobile narrative around a compact primitive and start-building action. The shared pattern is not "short at all costs"; it is that the phone version should reveal proof and action quickly.

Action taken: tightened the mobile-only hero typography, changed the first two hero CTAs to a two-column row, kept Book a call as a secondary full-width action, reduced the gap before the product screenshot, and hid the duplicated live-loop overlay in the mobile hero. Also compressed the final Get Started section on mobile: shorter heading spacing, two-column action rows, hidden repeated path descriptions, hidden install command block, and tighter first-workflow steps. Desktop layout is unchanged. Mobile hero height dropped from about 1,240px to 850px; final CTA dropped from about 1,781px to 1,112px; total mobile homepage height dropped from about 9,802px to 8,743px. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, and screenshots at `agentfleet88`.

## 2026-07-07 Agentfleet89 Mobile Motion Proof Compression

After the first-screen pass, the mobile homepage still had a tall Product Motion section at about 1,280px. The video proof mattered, but the surrounding copy had become a second feature catalog: three full run/measure/improve cards, three proof cards, and then the demo. This delayed the product tour and made the phone version feel like a stacked desktop page again.

Reference check: Multica, Cursor, Langfuse, and Inngest all keep motion/product proof near a focused claim and compact supporting points. They do not ask phone visitors to read every proof item before seeing the product surface. For Runloop, the right mobile pattern is: one sentence for the loop, compact Run/Measure/Improve cues, stack proof as chips, then the real demo.

Action taken: added a mobile-only compression layer for Product Motion. The Run/Measure/Improve rows become compact tiles, proof cards become short chips, the caption keeps only the strongest statement, and the operating-loop demo remains visible. Desktop is unchanged. Mobile Product Motion height dropped from about 1,280px to 773px; total mobile homepage height dropped from about 8,743px to 8,236px. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, and screenshots at `agentfleet89`.

## 2026-07-07 Agentfleet90 FAQ Accordion

After the Motion pass, the FAQ was still a tall mobile section at about 1,139px. The content is useful because it answers buyer boundaries before install, but five fully expanded cards made the bottom of the mobile page feel heavy. Objection handling should stay present near conversion without forcing every answer into the default scroll path.

Reference check: Multica answers install/self-host/support questions near the bottom; Cursor keeps get-started and product-surface paths compact; Langfuse groups proof and trust content into scan-friendly surfaces; Inngest keeps buyer/security facts direct. The shared pattern is that objections should be available, but the main conversion path should not be dominated by expanded explanatory text.

Action taken: converted the FAQ rows from static cards to semantic `details` / `summary` rows with the first answer open by default. Added desktop and mobile styling so each objection reads like a compact control row with an explicit expand affordance. FAQ content remains in the DOM and accessible, while the mobile default is much shorter. Mobile FAQ height dropped from about 1,139px to 711px; desktop FAQ dropped from about 647px to 469px; total mobile homepage height dropped from about 8,236px to 7,807px. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, screenshots, and a mobile open-state interaction check at `agentfleet90`.

## 2026-07-07 Agentfleet91 Mobile Product Tour Compression

After the FAQ accordion, Product Tour became the tallest mobile proof section at about 1,192px. The section is critical because it lets visitors inspect real Runloop surfaces, but the phone layout repeated the same idea three times: a long intro paragraph, a full operator-question console with a current-answer summary, then the screenshot with another question/answer/proof block.

Reference check: Cursor keeps product surfaces inspectable in compact demos; Multica keeps task lifecycle proof close to the screenshot; Langfuse uses a connected loop plus proof/integration surfaces; Inngest uses before/after product proof and short primitives instead of long repeated explanations. The pattern for Runloop is to keep the screenshot and active operator question, but make controls and duplicate summaries compact on mobile.

Action taken: added a mobile-only Product Tour compression layer. The intro paragraph is hidden on mobile, operator tabs are shorter, the duplicate current-answer card is removed, the screenshot remains central, and the operator question/Runloop answer/proof chips are tightened under the screenshot. Desktop is unchanged. Mobile Product Tour height dropped from about 1,192px to 764px; total mobile homepage height dropped from about 7,807px to 7,379px. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, mobile/desktop screenshots, and a mobile tab interaction check at `agentfleet91`.

## 2026-07-07 Agentfleet92 Desktop Runtime Learning Compression

After the mobile cleanup, the remaining desktop tall sections were Control Room, Operating Proof, and Runtime Learning. Runtime Learning was the cleanest next target because it repeated the same routing argument in two forms: three route rows on the left and three tall screenshot cards on the right. The section had strong content, but its 1,087px height made it feel like a feature catalog rather than a sharp model-routing point.

Reference check: Cursor keeps model/tool choice tied to compact product surfaces; Multica keeps runtime and skills proof close to the task lifecycle; Langfuse connects model/cost/quality signals into a loop rather than a long feature list; Inngest keeps technical primitives dense and easy to scan. The pattern for Runloop is to keep the real screenshots but make the routing claim feel like one system.

Action taken: added a desktop-only Runtime Learning compression layer. Reduced section padding and header size, tightened the operating-effect card, compressed the route stack, and turned the three screenshot cards into denser proof cards with shorter image crops and tighter copy. Mobile is unchanged because this section is hidden there. Desktop Runtime Learning height dropped from about 1,087px to 892px; desktop homepage height dropped from about 11,921px to 11,727px; the desktop tall-section list now drops from three sections to two. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, and screenshots at `agentfleet92`.

## 2026-07-07 Agentfleet93 Desktop Operating Proof Compression

After Runtime Learning, the remaining desktop tall sections were Control Room and Operating Proof. Operating Proof was the better next target because it already had the right substance but used a heavy layout: five full ledger rows plus four large screenshot cards. The section should feel like proof of a run packet, not a second full product catalog.

Reference check: Linear and Inngest keep system narratives as numbered primitives attached to concrete product proof; Cursor and Multica keep product surfaces close to compact step/lifecycle explanations. The Runloop version should preserve the ledger and screenshots but make the section read as one dense proof artifact.

Action taken: added a desktop-only Operating Proof compression layer. Reduced section padding and heading scale, tightened ledger rows/status pills/footer, shortened screenshot crops, and compacted screenshot captions. Kept all five ledger stages and all four real screenshots. Mobile is unchanged because this section is hidden there. Desktop Operating Proof height dropped from about 1,072px to 874px; desktop homepage height dropped from about 11,727px to 11,528px; the desktop tall-section list now has only Control Room left. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, and screenshots at `agentfleet93`.

## 2026-07-07 Agentfleet94 Desktop Control Room Compression

After Operating Proof compression, Control Room was the last desktop section above the viewport threshold at about 1,084px. The section had the right story but was visually expensive: a large header plus two 622px control panels. This made the middle of the homepage feel heavier than the reference pattern, where operating-system claims are usually tied to compact, inspectable control surfaces.

Reference check: Linear keeps system-of-work claims attached to compact product surfaces; Inngest keeps operational primitives as short scan blocks; Cursor and Multica keep product/workforce surfaces inspectable without over-explaining each row. The Runloop version should keep the loop and exception console but reduce vertical cost.

Action taken: added a desktop-only Control Room compression layer. Reduced section padding and heading scale, tightened the 100+ agents proof card, compacted the Plan/Run/Pulse/Improve loop rows, shortened org-pulse metrics/exception rows, and tightened the human-judgment approval band. Mobile is unchanged because this section is hidden there. Desktop Control Room height dropped from about 1,084px to about 861px; desktop homepage height dropped from about 11,528px to about 11,306px; desktop now has no sections above the 1.05 viewport threshold. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered geometry, and screenshots at `agentfleet94`.

## 2026-07-07 Agentfleet95 Desktop App Palette Alignment

The later design passes had again made the site feel too green because broad brand elements inherited `--teal`. The actual desktop app palette is more specific: near-black shell (`#0d0f12`), graphite panels (`#14171b` / `#1d2025`), subtle borders (`#2a2d33`), primary VS Code blue (`#007acc`), and teal only as a healthy/live status accent.

Action taken: added a final palette layer that aligns the marketing site with the desktop app tokens. Blue now owns CTAs, active nav, brand chrome, metrics, kickers, and highlighted proof surfaces. Teal is reserved for healthy/live states. Updated cache keys to `agentfleet95`; verified the active tokens in Chrome (`--paper #0d0f12`, `--panel #14171b`, `--blue #007acc`, `--blue-bright #38bdf8`, `--teal #4ec9b0`) and captured fresh desktop/mobile screenshots.

## 2026-07-07 Agentfleet96 Use Cases Decision Page Compression

The route audit showed `/use-cases/` was the weakest sales page after the homepage cleanup. It had two oversized desktop sections, a 10,579px mobile page, and a real layout bug in the category-boundary cards where paragraph text was squeezed into the number column. The page needed to read like a buying/fit decision surface rather than a long catalog.

Reference check: Multica keeps use cases tied to task lifecycle and reusable workers; Cursor keeps product surfaces compact and direct; Langfuse frames product value around launch/observe/improve loops; Inngest uses compact primitives to explain operational scale. The common pattern is short decision surfaces with concrete product proof, not long explanatory cards.

Action taken: added a Use Cases-only compression layer. The best-fit scenarios now render as a compact four-up desktop matrix with product thumbnails, short fit/proof rows, and clamped explanatory copy. Mobile cards become compact proof rows instead of tall stacked screenshot cards. Fixed the category-boundary grid so explanatory text stays in the content column. Also compressed the shared Get Started CTA only on the Use Cases route. Desktop route height dropped from about 6,488px to about 3,535px; mobile dropped from about 10,579px to about 5,527px. Desktop now has no tall sections. Verified with `node scripts/verify-dist.js`, JS syntax check, rendered route geometry, full route audit, and screenshots at `agentfleet96`.

## 2026-07-07 Agentfleet97 How Page Explanation Compression

The route audit showed `/how/` was the next weakest page. Desktop still had a 1,478px loop section, and mobile was 10,736px with five tall sections. The issue was not messaging; it was repetition. The page explained the operating loop through the hero visual, run-packet strip, four large loop cards, a fit table, an architecture table, and a CTA that all used tall desktop-style layouts on mobile.

Reference check: Linear and Cursor keep conceptual product pages close to compact product surfaces; Langfuse frames the system as a concise launch/observe/improve loop; Inngest explains scale through dense operational primitives. The stronger pattern for Runloop is to keep the run-packet idea but make each section a scan surface, not a second homepage.

Action taken: added a How-page-only compression layer scoped to `#root[data-page="how"]`. Tightened the hero visual, made the run-packet proof compact on mobile, changed the Plan/Run/Measure/Improve cards to a four-up desktop matrix and compact mobile rows, densified the fit and control-plane tables, and compressed the shared Get Started CTA only on `/how/`. Desktop route height dropped from about 5,755px to about 4,569px; mobile dropped from about 10,736px to about 6,047px. Both desktop and mobile now have zero tall sections. Verified with `node scripts/verify-dist.js`, JS syntax check, focused route geometry, full route audit, and screenshots at `agentfleet97`.

## 2026-07-07 Agentfleet98 Deploy Trust Page Compression

The route audit showed `/deploy/` mobile was still too document-like: 8,701px tall and every content section above the threshold. It also exposed a real overflow from the install command block. The page had the right serious posture, but trust pages should help buyers quickly answer boundary questions: where does it run, what controls exist, what proof exists, and what is still alpha.

Reference check: Langfuse self-hosting and deployment material emphasizes VPC/on-prem and deployment strategy; Inngest self-hosting/security emphasizes running in your own infrastructure with explicit keys and signing boundaries; Supabase self-hosting makes the Docker/self-host posture direct; Temporal security/deployment messaging separates where code runs from service/control boundaries. The Runloop deploy page should use the same shape: boundary first, controls second, product proof third.

Action taken: added a Deploy-page-only compression layer scoped to `#root[data-page="deploy"]`. Tightened the topology hero, changed deployment modes into compact decision cards, turned security controls into a denser checklist, shortened the release posture/proof section, wrapped or hid command blocks where they caused overflow, and compressed the shared Get Started CTA only on `/deploy/`. Desktop route height dropped from about 4,614px to about 3,763px; mobile dropped from about 8,701px to about 4,750px. Deploy now has zero tall sections on desktop and mobile. Verified with `node scripts/verify-dist.js`, JS syntax check, focused deploy geometry, full route audit, and screenshots at `agentfleet98`.

## 2026-07-07 Agentfleet99 Updates Release-Proof Compression

The route audit showed `/updates/` still read like a long landing page instead of a changelog/release-proof page. Desktop had a 1,468px highlights section, and mobile was 6,577px with the hero, highlights, and timeline all above the tall-section threshold. The content was right, but the layout made recent product motion feel slower than it is.

Reference check: Linear and Cursor keep changelogs compact, chronological, and directly tied to what shipped; Langfuse groups product proof around release surfaces; Inngest keeps operational updates in dense scan blocks. The Runloop version should preserve release artifacts and real screenshots, while making the page feel like a product-motion dashboard.

Action taken: added an Updates-page-only compression layer scoped to `#root[data-page="updates"]`. Aligned the route with the desktop app palette, using graphite panels, blue primary actions, and teal only for status/proof tags. Compressed the hero, made the latest release panel denser, changed highlight cards into compact screenshot-proof cards, shortened timeline rows with clamped descriptions, and tightened the CTA. Desktop route height dropped from about 3,980px to about 2,797px; mobile dropped from about 6,577px to about 3,526px. Updates now has zero tall sections on desktop and mobile. Verified with `node scripts/verify-dist.js`, JS syntax check, focused updates geometry, full route audit, and screenshots at `agentfleet99`.

## 2026-07-07 Agentfleet100 Docs Technical Index Compression

The route audit showed `/docs/` was the remaining page that still felt too document-like on mobile: the hero was 1,023px, the System Map was 2,337px, and the Reference Map was 1,294px. The page also had a visual proof issue where below-fold video/image blocks could render as black panels in full-page verification. The content was useful, but the page needed to behave more like a technical docs front door.

Reference check: Cursor, Linear, Langfuse, and Inngest docs/changelog patterns all keep quickstarts, reference maps, and architecture primitives compact and scannable, with deeper details one click away. The Runloop docs should keep the command-first entry path and product architecture map, but avoid forcing mobile readers through oversized cards before they reach the actual references.

Action taken: added a Docs-page-only compression layer scoped to `#root[data-page="docs"]`. Tightened the sidebar, hero, quickstart command, entry cards, route steps, System Map ledger, product proof cards, reference links, install block, integrations, and guardrail sections. Changed lazy product videos to show poster frames before loading, made the docs media proof render concrete product imagery, and swapped the lower observability proof to the clearer generated-skills screenshot. Desktop route height dropped from about 5,996px to about 5,120px; mobile dropped from about 9,001px to about 5,285px. Docs now has zero tall sections on desktop and mobile. Verified with `node scripts/verify-dist.js`, JS syntax check, focused docs geometry, full route audit, media-source checks, and screenshots at `agentfleet100`.

## 2026-07-07 Agentfleet101 Use Cases Mobile Decision Cards

After the docs cleanup, `/use-cases/` still had two tall mobile sections: the Best-Fit Scenarios section was 1,104px and the shared Get Started CTA was 990px. The page had already been moved in the right direction, but mobile still made each use case behave like a mini landing page with an image, headline, and two proof rows.

Reference check: Multica keeps use cases close to lifecycle/product proof, while Cursor, Linear, Langfuse, and Inngest keep decision pages compact and scannable. The better pattern for Runloop is to make mobile use cases act like fit decisions: when to use it, what proof exists, and where to go next.

Action taken: added a Use-Cases mobile-only compression layer scoped to `#root[data-page="usecases"]`. Tightened section padding and headers, changed use-case cards into compact decision rows with small thumbnails, kept only the strongest fit line on mobile, shortened the shared CTA, hid secondary CTA links where they were duplicative, and clamped start steps to one-line proof. Mobile route height dropped from about 5,527px to about 4,818px. Use Cases now has zero tall sections on desktop and mobile. Verified with `node scripts/verify-dist.js`, JS syntax check, focused route geometry, and screenshots at `agentfleet101`.

## 2026-07-07 Agentfleet102 Homepage Final CTA And Route Audit Cleanup

The full route audit after Agentfleet101 showed one remaining tall section across the checked marketing pages: the homepage mobile Get Started CTA was still 1,106px. The same audit also showed a real horizontal overflow from the homepage quickstart install command.

Reference check: the strongest adjacent product pages keep final CTAs as compact decision blocks, not another long feature section. Runloop already has the product proof above; the bottom CTA should help the visitor choose local install, docs/source, or architecture conversation quickly.

Action taken: added a Home-page-only mobile CTA compression layer scoped to `#root[data-page="home"]`. Tightened the CTA header, path cards, primary actions, and first-workflow checklist; hid duplicate secondary links on mobile; clamped checklist proof text; and made the homepage quickstart command wrap inside its card instead of overflowing. Homepage mobile route height dropped from about 7,379px to about 7,107px, and the final CTA dropped from about 1,106px to about 784px. Full route audit now shows zero tall sections across Home, How, Docs, Use Cases, Deploy, and Updates on both desktop and mobile; remaining overflow signals are only decorative logo-mark spans. Verified with `node scripts/verify-dist.js`, JS syntax check, full route audit, and screenshots at `agentfleet102`.

## 2026-07-07 Agentfleet103 Production Mobile Gate And 404 Cleanup

After the visible routes were clean, the production verifier still had a gap: it rendered each route only at desktop size and therefore could not catch the mobile/tall-section problems that had driven the previous cleanup passes. Tightening the verifier immediately exposed a real missed route: the mobile 404 page had a 1,037px not-found section.

Action taken: upgraded `scripts/verify-dist.js` so every expected route is rendered at both desktop and mobile viewports. The gate now fails on wrong title/H1, page-level horizontal overflow, missing manifest, old runtime scripts, console errors, failed requests, and any `header`, `section`, or `footer` taller than 1.15x the viewport. Added a NotFound-page-only compact mobile layer scoped to `#root[data-page="notfound"]`, bringing the mobile 404 section from about 1,037px to about 499px. Verified with the stricter `node scripts/verify-dist.js`, JS syntax check, and 404 screenshots at `agentfleet103`.

## 2026-07-07 Agentfleet104 Desktop App Palette Restoration

The `agentfleet95` pass moved the site toward the desktop app palette, but later route-specific layers still made the public site feel more like a separate dark SaaS theme than the Mac app. The desired direction is the actual Runloop product chrome: graphite shell, graphite panels, blue for primary actions/navigation, and teal only for live/healthy state.

Action taken: added a final palette layer that restores the desktop-app tokens across all routes: `#1e1e1e` paper, `#252526` panels, `#2d2d2d` secondary surfaces, `#333333` raised panels, blue `#3f8fb8` / `#79d6ff` actions, and teal `#4ec9b0` status. Updated route CSS cache keys to `agentfleet104`. Verified via rendered CSS token extraction, fresh desktop/mobile screenshots, JS syntax checks, and `node scripts/verify-dist.js`.

## 2026-07-07 Agentfleet105 Route-Specific Social Preview Cards

The site had reached a better product-page shape, but every route still used the same generic `runloop-og.png` preview. That weakens X, LinkedIn, Substack, Slack, and Discord sharing because the `/how/`, `/deploy/`, `/docs/`, `/updates/`, and `/use-cases/` routes should each communicate a distinct product promise before someone clicks.

Action taken: added `scripts/generate-og-images.js`, a reusable Playwright-based generator that renders 1200x630 social cards with the desktop-app palette, local fonts, and real product screenshots. Generated route-specific JPEG cards for Home, How, Use Cases, Deploy, Updates, Docs, and 404 while keeping the original PNG as a generic/default asset. Updated route `og:image`, `twitter:image`, and JSON-LD image fields where present. Tightened `scripts/verify-dist.js` so it now requires every route-specific card, checks exact `og:image`/`twitter:image` URLs, validates 1200x630 raster dimensions, and serves JPEGs in render verification. Switched cards from PNG to JPEG to keep the deploy payload under the existing 6 MB budget. Verified with `node --check` and `node scripts/verify-dist.js`.

## 2026-07-07 Agentfleet106 Media Stability Production Gate

The site already used real product screenshots and videos heavily, which is the right direction for a product-led marketing page. The remaining risk was regression: a future visual rewrite could accidentally ship media without intrinsic dimensions, missing alt text, broken first-viewport images, or videos without posters. That would hurt layout stability, accessibility, and perceived polish even if the pages looked fine in a quick screenshot.

Action taken: extended `scripts/verify-dist.js` with a rendered media quality gate. Every route is now checked at desktop and mobile for image/video intrinsic dimensions, image alt attributes, first-viewport image load success, video accessible labels, and video poster presence. This turns the current product-proof discipline into an invariant instead of a one-time cleanup. Verified with `node --check scripts/verify-dist.js` and `node scripts/verify-dist.js`.

## 2026-07-07 Agentfleet107 Copyable Developer Quickstart

The homepage quickstart showed the install command, but unlike the docs page it did not behave like a developer-first install surface. Adjacent developer tools make the first install action copyable and immediate; Runloop should do the same because the site is selling to operators and developers who will evaluate by trying the Mac app or reading the repo.

Action taken: upgraded `InstallCommandCard` into a reusable component with class overrides, configurable links, `aria-live` copy feedback, Clipboard API support, and a textarea fallback for older browser contexts. Replaced the homepage quickstart's static command card with the shared copyable install card while preserving the existing release/source/docs actions. Added homepage-specific button styling so the copied state fits the desktop-app palette. Verified with `node scripts/verify-dist.js` and an HTTP browser test that clicked `Copy command`, observed `Copied`, and confirmed the clipboard contained the install command.

## 2026-07-07 Agentfleet111 Homepage Text Density Reduction

The homepage still felt too text-heavy compared with product-led references like Multica: the first viewport had a strong product screenshot, but also repeated the pitch through three hero outcome cards and four proof cards. That made the page feel closer to documentation than a sales page.

Action taken: removed the dense hero outcome cards, replaced them with lightweight agent-surface chips, shortened the hero lead, converted the four proof cards into a compact proof rail, and tightened the immediately visible Category Fit section. The intended rule for future passes is simple: the product screenshot should carry the explanation first; copy should label the idea, not restate every capability. Verified with `node --check runloop_site.js`, `node scripts/verify-dist.js`, and screenshots at `agentfleet111`.

## 2026-07-07 Agentfleet112 Multica Lower-Section Pattern And Automations Compression

After the homepage pass, the reference check needed to include Multica's lower sections, not only the hero. The useful pattern is not merely "short hero." Multica repeats a full-page rhythm: one large section promise, a short explanatory paragraph, one dominant product visual, then small supporting proof points. Details exist, but they are staged after the visual proof instead of becoming dense explanatory grids.

Action taken: compressed the Automations route around that pattern. The hero now uses a shorter claim, a single-line lead, and scan-friendly surface chips; the lifecycle section is a compact operating strip; and the "Where it fits" section was changed from a tall copy/card layout into a concise decision band. Updated the production verifier's expected Automations H1 and cache keys to `agentfleet112`. Verified with `node --check runloop_site.js`, `node --check scripts/verify-dist.js`, `node scripts/verify-dist.js`, and screenshots at `agentfleet112`.

## 2026-07-07 Agentfleet113 Use Cases Product-Proof Compression

The Use Cases route still had the densest first lower section: each card behaved like a mini case study with a screenshot, description, signal tags, a "when it fits" row, and a "product proof" row. Against the Multica lower-section pattern, the page had the right ingredients but too much explanatory weight per viewport.

Action taken: shortened the Use Cases hero, tightened the Best-Fit section headline and helper line, replaced `dl` proof rows with compact `when/proof` meta chips, shortened all use-case descriptions, and added a final route-specific CSS layer that turns the four use cases into a single product-proof band. Updated the production verifier's expected Use Cases H1 and cache keys to `agentfleet113`. Verified with `node --check runloop_site.js`, `node --check scripts/verify-dist.js`, `node scripts/verify-dist.js`, and screenshots at `agentfleet113`.

## 2026-07-07 Agentfleet116 Inspectable Product Screenshots

The product-led pages were using real screenshots, but many of them were shown as small cards. That made full-dashboard captures look blurry and decorative, especially in use-case cards and proof grids. The issue was not only source resolution; it was that dense product surfaces were being shown at thumbnail size without a way to inspect them.

Action taken: added a shared `ExpandableProductImage` component and wired it through product screenshots across Home, Use Cases, Automations, Deploy, Updates, How, Docs, and shared `ShotFrame` sections. Every product screenshot now has an expand affordance, opens a full-screen inspector, closes with `Esc` or the close button, and includes a zoom/fit toggle with centered pan for dense screenshots. Cache keys moved to `agentfleet116`. Verified with `node --check runloop_site.js`, `node --check scripts/verify-dist.js`, `node scripts/verify-dist.js`, and Playwright click tests on Home and Use Cases.

Follow-up rule: lightbox solves inspectability, but the worst full-canvas screenshots should still be replaced with cropped detail assets. A small card should show a crop of the meaningful UI, not a full workspace where the useful detail occupies 10% of the image.

## 2026-07-07 Agentfleet117 Inspectable Motion Proofs

The screenshot inspector did not cover video proof blocks. Dense demos with terminal output and workflow panels were still shown as small embedded media, which made them look blurry and gave visitors no obvious way to inspect the proof.

Action taken: added `ExpandableProductVideo` for motion assets, wired it into the homepage operating-loop video and shared motion shot frame, and made screenshot/video "View full" affordances visible by default. Motion proof now opens in a full-screen video inspector with controls and Escape/backdrop close. Cache keys moved to `agentfleet117`.

## 2026-07-09 AgentWorks Public Rename Pass

The public name moved from Runloop to AgentWorks because `Runloop` conflicts with an existing AI/coding-agent infrastructure company. The planned GitHub repo name is `coding-agent-loop`, but the current source repo and install command still use `mcp-agent-builder-go` until the remote rename is complete.

Action taken: renamed visible website copy, route titles, metadata, manifest, `llms.txt`, and generated social preview cards to AgentWorks. Added `assets/brand/agentworks-logo.svg`, regenerated route-specific `assets/og/agentworks-*.jpg` previews, and changed the How route title to `AgentWorks Architecture - Agent Fleet Operating Loop`. Added a temporary AgentWorks overlay to product screenshots and OG cards because the current product captures still show the old app display name. Verified with syntax checks, `node scripts/generate-og-images.js`, `node scripts/verify-dist.js`, and a Chrome screenshot smoke test at `review-agentworks1-home-smoke.png`.

Deferred intentionally: do not change install URLs or GitHub links to `coding-agent-loop` until the GitHub repo is actually renamed. Do not rename internal website files such as `runloop_site.js` / `runloop.css` in this pass. Recapture product screenshots after the Electron app display name changes, then remove the temporary screenshot overlay.

## 2026-07-09 AgentWorks Homepage Density Cut

The user flagged the homepage as too text-heavy and complicated. The route audit confirmed the problem: the homepage was about 10,948px tall with 16 major sections and repeated the same architecture story across install, operating system, lifecycle, use cases, runtime learning, governance, deployment, FAQ, and final CTA sections.

Action taken: reduced the homepage to the product-page core: hero, proof strip, category fit, one motion proof, one product tour, and a compact CTA. Removed homepage rendering for the developer quickstart, stack strip, operating-system section, lifecycle proof, use-case lanes, runtime-learning section, governance block, deployment/trust block, FAQ, and the large shared CTA. The deeper material still lives on `/how/`, `/docs/`, `/use-cases/`, `/automations/`, and `/deploy/`. Shortened the Product Tour and motion section copy, limited the tour to four surfaces, and added a compact homepage-only CTA. Rendered homepage height dropped from about 10,948px to about 3,626px.

## 2026-07-09 Secondary Route Density Cut

After the homepage cut, the remaining public routes still had too much explanatory copy, especially `/use-cases/`, `/deploy/`, `/how/`, `/docs/`, and `/updates`.

Action taken: shortened the heaviest route copy, replaced the large shared CTA with the compact CTA on `/use-cases/`, `/deploy/`, and `/how/`, reduced `/how/` architecture list prose, made `/docs/` closer to a minimal link map, and shortened `/updates/` changelog summaries. Current route text-size baseline: Home 3,205 chars, How 2,423, Docs 2,400, Use Cases 3,035, Automations 2,505, Deploy 3,565, Updates 2,922. Verified with `node scripts/verify-dist.js` and screenshots at `review-agentworks-density5-*.png`.

## Messaging Rules

- Lead with span of control: 100+ agents, manage by exception, operating loop.
- Show real product screenshots in the first viewport.
- Keep the homepage short. Do not re-add architecture, use-case, deployment, and FAQ essays to the homepage; link to the route that owns the detail.
- Avoid generic "AI automations for business outcomes" as the main headline.
- Explain the data-plane / control-plane split plainly:
  - agent workers: Claude Code, Codex CLI, Cursor, Gemini, MCP tools, browser
  - AgentWorks loop: goals, schedules, Pulse, Auto Improve, skills, Org Pulse
  - human judgment: approve replans, review exceptions, promote skills
- Keep docs connected to product architecture, not a generic help center.
