# multi-builder marketing site

Static marketing site for the AgentWorks agent/workflow control plane. The root homepage uses standalone HTML, CSS, and JavaScript; secondary pages use static HTML shells with vendored React, local fonts, and a shared runtime. There is no application bundler, but the production preparation script generates the deploy payload, static documentation routes, sitemap, and agent-readable content.

- **Live:** https://agentworkshq.com/
- **Cloudflare Pages:** `agentworks`
- **Repo:** https://github.com/manishiitg/multi-builder-public-website
- **Current handoff:** see [`HANDOFF.md`](HANDOFF.md) for the latest checkpoint, resume plan, open design issues, and verification flow.

## Branding Status

Public product name is **AgentWorks**. The public GitHub repository is now **`coding-agent-loop`**. The remaining migration work is limited to compatibility-sensitive app identifiers, release artifact names, and historical content.

Completed in phase one:

- launched `agentworkshq.com` on Cloudflare Pages with AgentWorks as the canonical public brand
- updated current website messaging, metadata, structured data, manifest, social discovery, sitemap, and AI-readable content
- exposed crawlable static versions of the main marketing pages and selected technical documentation
- added responsive real-product screenshots and removed visible Runloop branding from current website surfaces
- configured `www.agentworkshq.com` to redirect permanently to the canonical apex domain
- renamed the upstream GitHub repository from `mcp-agent-builder-go` to `coding-agent-loop`
- migrated installer, updater, release, Go module, package, and public documentation URLs to the new repository
- preserved GitHub redirects from the former repository URL

Still intentionally pending:

- complete the Electron/macOS product-name migration without breaking existing installs, data directories, deep links, or updates
- preserve compatibility for `RUNLOOP_*`, `runloop://`, `.runloop`, package IDs, and local storage identifiers until a migration release exists
- recapture any remaining product screenshots that contain legacy app branding
- publish the repository migration as the next evidence-backed build-in-public update

The canonical source, install, and release URLs now use `https://github.com/manishiitg/coding-agent-loop`. The former GitHub URL redirects for compatibility and must not be reused as a new repository name.

Some internal website file names still use `runloop_site.js` / `runloop.css`. Treat those as implementation filenames, not public branding. Current product screenshots were captured before the app rename, so the site applies a small AgentWorks overlay on screenshots until the app display name is changed and screenshots are recaptured.

## Pages

| URL | File | What it is |
|---|---|---|
| `/` | `index.html` | Approved AgentWorks homepage |
| `/use-cases/` | `use-cases/index.html` | Sales-friendly use-case and fit guide |
| `/how/` | `how.html`, deployed as `how/index.html` | "How it works" page |
| `/docs/` | `docs/index.html` | Docs front door and embedded Markdown reader |
| `/docs/<document>/` | generated from selected `docs-content/**/*.md` files | Crawlable technical documentation |
| `/docs-content/<document>.md` | synchronized Markdown | Raw documentation for people and agents |
| `/llms.txt` and `/llms-full.txt` | generated discovery surfaces | Concise and full AI-readable product context |
| missing routes | `404.html` | Branded not-found page with links back to current surfaces |

Legacy Claude Design pages such as `template.html` and `wireframes.html` remain in the repo for local reference only. Production redirects old `/automations/` and `/automations/:slug/` traffic to Product, while `/template.html` and `/wireframes.html` also redirect to active pages. The removed `/deploy/` marketing route redirects to the repository's factual deployment documentation.

## Run locally

Any static server works. Easiest:

```bash
node scripts/sync-product-docs.js
python3 -m http.server 8765
# open http://localhost:8765
```

Or `npx serve .`.

## Deploy

Production is hosted on Cloudflare Pages project `agentworks`. The deploy is allowlisted through `scripts/prepare-deploy.sh` into `dist/` so review screenshots, legacy Claude Design files, and local-only artifacts are not uploaded.

```bash
bash scripts/prepare-deploy.sh
node scripts/verify-dist.js
npx wrangler@latest pages deploy dist --project-name agentworks --branch main
```

## Verify

Run the production-payload verifier before deploying:

```bash
node scripts/verify-dist.js
```

It rebuilds `dist/`, checks required files, metadata, static agent-readable content, generated documentation, local asset references, legacy-file exclusions, payload size, and renders every active route in Chrome through Playwright.

## Stack

- Root homepage: `index.html`, `workforce.css`, and `workforce.js`
- Secondary pages use vendored React 18 production UMD files from `assets/vendor/react-18.3.1/`
- Docs use vendored Marked and DOMPurify, with `scripts/sync-product-docs.js` snapshotting Markdown from the sibling product repository into `docs-content/`
- Shared runtime: `runloop_site.js` with plain `React.createElement` calls
- Shared production CSS: `runloop.css`
- Approved secondary-route visual layer: `secondary.css`
- Local fonts: `assets/fonts/fonts.css`
- Cloudflare Pages headers: `_headers` sets CSP, no-sniffing, cache policy, and local-first script/style/font loading
- AI discovery: `llms.txt` provides a concise canonical map; generated `llms-full.txt` includes the curated public documentation corpus
- Static documentation: `scripts/generate-agent-content.js` creates crawlable HTML routes, JSON-LD, breadcrumbs, and the generated sitemap from `public-docs.json`
- Web metadata: `site.webmanifest`, icons, theme color, and color-scheme tags support browser install/display polish
- Production build: `scripts/prepare-deploy.sh` creates the Cloudflare Pages payload in `dist/`
- Quality gate: `scripts/verify-dist.js` checks the generated deploy payload and rendered routes

Legacy Claude Design artifacts still exist for old wireframe/template experiments, but they are not public production routes. Secondary routes should stay on the local `runloop_site.js` runtime until they are deliberately migrated to the standalone homepage system. Do not add Babel or CDN runtime scripts back to production pages.

## Future migration

If/when the site needs component imports or compile-time checks: wrap in Vite with a multi-page config. Keep the current static page routes and product assets, move `runloop_site.js` into `src/`, and preserve the existing CSP/local-font posture.
