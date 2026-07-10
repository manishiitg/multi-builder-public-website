# CLAUDE.md — multi-builder-public-website

Notes for future Claude sessions working in this repo.

## What this is

Static marketing site for AgentWorks. The production pages are static HTML that load vendored React, local fonts, `runloop_site.js`, and `runloop.css`. There is **no bundler**. Deploy = prepare the allowlisted `dist/` payload and upload it.

## File map

```
index.html          Landing page entry
404.html            Branded not-found entry
use-cases/index.html Sales-friendly use-case and fit-guide entry
how.html            How-it-works entry
docs/index.html     Docs front door and embedded Markdown reader
docs-content/       Generated snapshot of product Markdown documentation
wireframes.html     Lo-fi review wireframes (legacy/internal, not a public production route)

runloop.css         Shared production styles for index/how/docs
runloop_site.js     Shared production React runtime for index/how/docs
_headers            Netlify security/cache/CSP headers
llms.txt            AI-reader discovery map for canonical pages and implementation links
site.webmanifest    Browser install/display metadata and icon references

hifi.css                Legacy Claude Design styles
sketch.css              Styles for wireframes.html (paper texture, sketch aesthetic)
hifi_hero.jsx           Nav + Hero used by index.html
hifi_sections.jsx       Integrations / Metrics / Templates / CTA / Footer for index.html
hifi_how.jsx            (legacy / unused?)
hifi_how_intro.jsx      How-page intro + lifecycle for how.html
hifi_how_mockups.jsx    Mockup screens for how.html
hifi_how_layers.jsx     Support layers + HITL for how.html

page_landing.jsx        Lo-fi landing variations for wireframes.html
page_how.jsx            Lo-fi how variations for wireframes.html
page_employees.jsx      (referenced from wireframes shell)
page_workflows.jsx      (referenced from wireframes shell)
scribbles.js            Hand-drawn SVG primitives for sketch wireframes

review/*.png            Static reference screenshots
```

## Production component pattern

`runloop_site.js` uses plain `React.createElement` through the local `h` helper. The production HTML pages load:

```html
<script src="assets/vendor/react-18.3.1/react.production.min.js"></script>
<script src="assets/vendor/react-18.3.1/react-dom.production.min.js"></script>
<script src="runloop_site.js?v=agentfleetXX"></script>
```

Do not add `@babel/standalone`, `unpkg`, inline executable mount scripts, or `.jsx` runtime scripts back to `index.html`, `how.html`, or `docs/index.html`. CSP is intentionally strict: `script-src 'self'`, `style-src 'self'`, local fonts, and `X-Content-Type-Options: nosniff`.

## Cross-page links

Use `marketingPath(page)` and `marketingHash(page, id)` inside `runloop_site.js`. The pages include `<base href="/">`, so raw hash-only links like `#install` are unsafe in production pages.

## Legacy public-route boundary

Legacy Claude Design pages such as `template.html`, `wireframes.html`, `hifi_*.jsx`, `page_*.jsx`, and `scribbles.js` may remain for local reference, but they are not production website routes. `_redirects` sends old `/automations/`, `/automations/:slug/`, `/template.html`, and `/wireframes.html` traffic to active pages, while `robots.txt` and `_headers` keep those artifacts out of crawlers. Do not re-expose those pages publicly unless they are migrated to the local production runtime and CSP posture.

## Edit-mode artifact

Legacy Claude Design pages may still have `TWEAKS` blocks and iframe `postMessage` handshakes. The production Runloop pages should not.

## Deploy

Linked to Netlify site `multi-builder-public` (project ID `c645114c-88f1-4f71-b2a1-19d9c50180bd`).
The `.netlify/` folder in this directory holds the link and is gitignored.
Production deploys are allowlisted: `netlify.toml` runs `scripts/prepare-deploy.sh`, which synchronizes product docs and copies active website files into `dist/`. Never deploy the repo root because it contains review screenshots and legacy local artifacts.

```bash
bash scripts/prepare-deploy.sh
netlify deploy --dir=dist         # draft preview URL
netlify deploy --prod --dir=dist  # production
```

Production URL: https://multi-builder-public.netlify.app

## Local dev

```bash
node scripts/sync-product-docs.js
python3 -m http.server 8765
```

Changes to `runloop_site.js` or `runloop.css` show on reload. Bump the query cache key in `404.html`, `use-cases/index.html`, `updates/index.html`, `how.html`, and `docs/index.html` when changing either production asset.
Run `bash scripts/prepare-deploy.sh` when you need to inspect the exact publish payload locally.
Run `node scripts/verify-dist.js` before deploy handoff. It rebuilds `dist/`, checks payload hygiene/metadata/local assets, and renders Home, Use Cases, Updates, Product, Docs, and the embedded Docs reader in Chrome through Playwright.

## Known sharp edges

- **No bundler/type checker.** Use `node scripts/verify-dist.js` for the production payload gate after meaningful edits.
- **`page_employees.jsx` and `page_workflows.jsx`** are loaded by `wireframes.html` but their components may not be wired into the visible variations grid — verify before assuming they render.
- Legacy files may still reference CDN/Babel; keep that out of the production page entries.

## When the user asks to add a page

1. Prefer adding the page to `runloop_site.js` and route from `data-page`.
2. Clone one of the production HTML entries and keep local React/vendor/font/script tags.
3. Add nav/footer links through `MarketingNav` and `MarketingFooter`.
4. Update `_redirects`, `sitemap.xml`, metadata, and `_headers` cache rules when adding public routes.
5. Update `llms.txt` when the new route is canonical product/docs content.
6. Update `scripts/verify-dist.js` with the new route expectation.
7. Run `node scripts/verify-dist.js`.
8. Deploy with `netlify deploy --prod --dir=dist`.

## When the user asks to migrate to a real build

Recommend Vite multi-page setup. The mechanical work:
- Move `runloop_site.js` into `src/`
- Split page components only if it improves maintainability
- HTML shells become Vite entry points with `<script type="module" ...>`
- Preserve local fonts, product media, CSP intent, and static route metadata

See README "Future migration" section.
