# multi-builder marketing site

Static marketing site for the AgentWorks agent/workflow control plane. The root homepage uses standalone HTML, CSS, and JavaScript; secondary pages use static HTML shells with vendored React, local fonts, and a shared runtime. There is **no build step**.

- **Live:** https://multi-builder-public.netlify.app
- **Repo:** https://github.com/manishiitg/multi-builder-public-website
- **Current handoff:** see [`HANDOFF.md`](HANDOFF.md) for the latest checkpoint, resume plan, open design issues, and verification flow.

## Branding Status

Public product name is **AgentWorks**. The current install command and GitHub links still point to `mcp-agent-builder-go` until the upstream repo is renamed to the planned `coding-agent-loop` name.

Some internal website file names still use `runloop_site.js` / `runloop.css`. Treat those as implementation filenames, not public branding. Current product screenshots were captured before the app rename, so the site applies a small AgentWorks overlay on screenshots until the app display name is changed and screenshots are recaptured.

## Pages

| URL | File | What it is |
|---|---|---|
| `/` | `index.html` | Approved AgentWorks homepage |
| `/use-cases/` | `use-cases/index.html` | Sales-friendly use-case and fit guide |
| `/how/` | `how.html` via Netlify rewrite | "How it works" page |
| `/docs/` | `docs/index.html` | Docs front door and embedded Markdown reader |
| `/docs/?doc=getting-started/first-workflow` | `docs-content/**/*.md` | Product documentation rendered inside the site |
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

Linked to Netlify project `multi-builder-public`. The production deploy is allowlisted through `scripts/prepare-deploy.sh` into `dist/` so review screenshots, legacy Claude Design files, and local-only artifacts are not uploaded.

```bash
bash scripts/prepare-deploy.sh
netlify deploy --prod --dir=dist
```

## Verify

Run the production-payload verifier before deploying:

```bash
node scripts/verify-dist.js
```

It rebuilds `dist/`, checks required files, metadata, local asset references, legacy-file exclusions, payload size, and renders every active route in Chrome through Playwright.

## Stack

- Root homepage: `index.html`, `workforce.css`, and `workforce.js`
- Secondary pages use vendored React 18 production UMD files from `assets/vendor/react-18.3.1/`
- Docs use vendored Marked and DOMPurify, with `scripts/sync-product-docs.js` snapshotting Markdown from the sibling product repository into `docs-content/`
- Shared runtime: `runloop_site.js` with plain `React.createElement` calls
- Shared production CSS: `runloop.css`
- Approved secondary-route visual layer: `secondary.css`
- Local fonts: `assets/fonts/fonts.css`
- Netlify headers: `_headers` sets CSP, no-sniffing, cache policy, and local-only script/style/font loading
- AI discovery: `llms.txt` provides a concise canonical map for AI readers and coding assistants
- Web metadata: `site.webmanifest`, icons, theme color, and color-scheme tags support browser install/display polish
- Netlify build: `netlify.toml` runs `scripts/prepare-deploy.sh` and publishes `dist/`
- Quality gate: `scripts/verify-dist.js` checks the generated deploy payload and rendered routes

Legacy Claude Design artifacts still exist for old wireframe/template experiments, but they are not public production routes. Secondary routes should stay on the local `runloop_site.js` runtime until they are deliberately migrated to the standalone homepage system. Do not add Babel or CDN runtime scripts back to production pages.

## Future migration

If/when the site needs component imports or compile-time checks: wrap in Vite with a multi-page config. Keep the current static page routes and product assets, move `runloop_site.js` into `src/`, and preserve the existing CSP/local-font posture.
