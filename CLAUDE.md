# CLAUDE.md — multi-builder-public-website

Notes for future Claude sessions working in this repo.

## What this is

Static marketing site exported from Claude Design (claude.ai/design). Three HTML pages load React + Babel-standalone from unpkg CDN and transpile `.jsx` in the browser at runtime. **No build step, no `package.json`, no bundler.** Deploy = upload the folder.

## File map

```
index.html          Landing page entry (was "Landing Hi-Fi.html")
how.html            How-it-works entry (was "How It Works.html")
wireframes.html     Lo-fi review wireframes (was "Agent Builder Wireframes.html")

hifi.css            Styles for index.html + how.html (dark/light theme via body class)
sketch.css          Styles for wireframes.html (paper texture, sketch aesthetic)

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

## Component pattern

Every JSX file attaches its components to `window` (e.g. `window.Hero = function Hero(...)`).
The HTML shell composes them inside an inline `<script type="text/babel">`:

```js
ReactDOM.createRoot(document.getElementById('root')).render(
  h(window.Nav, {...}),
  h(window.Hero, {...}),
  ...
);
```

`window.h` is set to `React.createElement` early in the shell. **Do not** convert these to `import` statements — there is no bundler. If you change a component, just edit the file; the browser re-transpiles on reload.

## Cross-page links

Hardcoded relative hrefs in:
- `hifi_hero.jsx:13-18` (Nav)
- `hifi_sections.jsx:644-645` (Footer)

If pages get renamed again, update those.

## Edit-mode artifact

Each HTML shell has a `TWEAKS` block wrapped in `/*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/` and a `postMessage` handshake with `window.parent`. This is dead weight when served standalone — it only does anything inside Claude Design's iframe editor. Safe to leave; safe to remove.

## Deploy

Linked to Netlify site `multi-builder-public` (project ID `c645114c-88f1-4f71-b2a1-19d9c50180bd`).
The `.netlify/` folder in this directory holds the link and is gitignored.

```bash
netlify deploy            # draft preview URL
netlify deploy --prod     # production
```

Production URL: https://multi-builder-public.netlify.app

## Local dev

```bash
python3 -m http.server 8765
```

JSX changes show on page reload (Babel re-transpiles in the browser — slow on first load, fine after).

## Known sharp edges

- **Babel-standalone is ~1.5MB.** Slow first paint, no SEO. Acceptable for a preview/internal site; not great for a production marketing front door — see "future migration" in README.
- **No type checking, no linting, no tests.** Errors surface in the browser console.
- **`page_employees.jsx` and `page_workflows.jsx`** are loaded by `wireframes.html` but their components may not be wired into the visible variations grid — verify before assuming they render.
- **React 18 dev build** is used (not production). Console warnings are normal.

## When the user asks to add a page

1. Create `<name>.html` cloned from an existing entry (copy the script tags, swap component composition).
2. Create `<name>.jsx` exposing components on `window`.
3. Add the page to Nav links in `hifi_hero.jsx:13-14` and Footer links in `hifi_sections.jsx:644-645`.
4. `netlify deploy --prod`.

## When the user asks to migrate to a real build

Recommend Vite multi-page setup. The mechanical work:
- `window.X = function X(...)` → `export function X(...)`
- Per-page inline `<script type="text/babel">` mount block → `src/<page>.jsx` with `import` statements
- HTML shells become Vite entry points with `<script type="module" src="/src/<page>.jsx">`
- CSS unchanged, fonts unchanged, `review/` images move to `public/`

See README "Future migration" section.
