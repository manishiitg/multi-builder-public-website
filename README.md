# multi-builder marketing site

Static marketing site for the agent/workflow builder product. Exported from Claude Design as in-browser React + Babel — **no build step**.

- **Live:** https://multi-builder-public.netlify.app
- **Repo:** https://github.com/manishiitg/multi-builder-public-website

## Pages

| URL | File | What it is |
|---|---|---|
| `/` | `index.html` | Hi-fi landing page |
| `/how.html` | `how.html` | "How it works" page |
| `/wireframes.html` | `wireframes.html` | Lo-fi sketch wireframes (internal review) |

## Run locally

Any static server works. Easiest:

```bash
python3 -m http.server 8765
# open http://localhost:8765
```

Or `npx serve .`.

## Deploy

Linked to Netlify project `multi-builder-public`. To ship:

```bash
netlify deploy --prod --dir=.
```

## Stack

- React 18 + ReactDOM via unpkg CDN
- `@babel/standalone` transpiles `.jsx` files in the browser at runtime
- Plain CSS (`hifi.css` for landing/how, `sketch.css` for wireframes)
- Google Fonts: Space Grotesk, JetBrains Mono, Caveat, Architects Daughter

JSX components attach themselves to `window` (e.g. `window.Hero`, `window.Nav`) and are composed inside `<script type="text/babel">` blocks in each HTML entry.

## Future migration

If/when the site needs SEO, faster first paint, or proper component imports: wrap in Vite with a multi-page config. The CSS and most JSX bodies stay; only the `window.X = ...` glue and the inline `<script>` mount blocks need to become ES module imports.
