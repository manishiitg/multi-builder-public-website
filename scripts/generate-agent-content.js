#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Marked } = require('../assets/vendor/marked-18.0.6/marked.umd.js');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const docsRoot = path.join(dist, 'docs-content');
const siteOrigin = 'https://agentworkshq.com';
const buildDate = new Date().toISOString().slice(0, 10);

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function routeFor(docPath) {
  if (docPath === 'README') return '/docs/overview/';
  return `/docs/${docPath.replace(/\/README$/, '')}/`;
}

function plainDescription(markdown, title) {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .find(block => block && !/^(#|```|---|<|\|)/.test(block));
  const plain = (paragraph || `Technical documentation for ${title} in AgentWorks.`)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_>#~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > 170 ? `${plain.slice(0, 167).trim()}...` : plain;
}

function resolveDocLink(href, currentPath, publicRoutes) {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const clean = href.split('#')[0].split('?')[0];
  const suffix = href.slice(clean.length);
  const resolved = path.posix
    .normalize(path.posix.join(path.posix.dirname(currentPath), clean))
    .replace(/^\.\//, '')
    .replace(/\.md$/i, '');
  if (publicRoutes.has(resolved)) return `${publicRoutes.get(resolved)}${suffix}`;
  return `/docs-content/${resolved}.md${suffix}`;
}

function renderMarkdown(markdown, currentPath, publicRoutes) {
  const renderer = {
    link(token) {
      const href = resolveDocLink(token.href, currentPath, publicRoutes);
      const title = token.title ? ` title="${escapeHtml(token.title)}"` : '';
      return `<a href="${escapeHtml(href)}"${title}>${this.parser.parseInline(token.tokens)}</a>`;
    }
  };
  const marked = new Marked({ renderer, gfm: true });
  return marked.parse(markdown.replace(/^#\s+[^\n]+\n+/, ''));
}

function pageTemplate({ title, description, route, rawPath, articleHtml }) {
  const canonical = `${siteOrigin}${route}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: title,
        description,
        url: canonical,
        dateModified: buildDate,
        author: { '@type': 'Person', name: 'Manish Prakash' },
        publisher: { '@type': 'Organization', name: 'AgentWorks', url: `${siteOrigin}/` },
        isPartOf: { '@type': 'WebSite', name: 'AgentWorks', url: `${siteOrigin}/` }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'AgentWorks', item: `${siteOrigin}/` },
          { '@type': 'ListItem', position: 2, name: 'Docs', item: `${siteOrigin}/docs/` },
          { '@type': 'ListItem', position: 3, name: title, item: canonical }
        ]
      }
    ]
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} - AgentWorks Docs</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="theme-color" content="#ffffff">
<meta name="color-scheme" content="light">
<meta name="application-name" content="AgentWorks">
<meta property="og:title" content="${escapeHtml(title)} - AgentWorks Docs">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="AgentWorks">
<meta property="og:type" content="article">
<meta property="og:image" content="${siteOrigin}/assets/og/agentworks-docs-og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)} - AgentWorks Docs">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${siteOrigin}/assets/og/agentworks-docs-og.jpg">
<link rel="canonical" href="${canonical}">
<link rel="alternate" type="text/markdown" href="/docs-content/${rawPath}.md" title="Raw Markdown">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="stylesheet" href="/assets/fonts/fonts.css?v=agentworks2">
<link rel="stylesheet" href="/runloop.css?v=agentworks2">
<link rel="stylesheet" href="/secondary.css?v=agentworks-secondary22">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body class="static-doc-body">
<header class="agent-static-nav">
  <a class="agent-static-brand" href="/"><img src="/assets/brand/agentworks-logo.svg" alt="" width="32" height="32">AgentWorks</a>
  <nav aria-label="Documentation"><a href="/docs/">Docs</a><a href="/how/">Product</a><a href="https://github.com/manishiitg/mcp-agent-builder-go">GitHub</a></nav>
</header>
<main id="main-content" class="static-doc-shell">
  <nav class="static-doc-breadcrumb" aria-label="Breadcrumb"><a href="/">AgentWorks</a><span>/</span><a href="/docs/">Docs</a><span>/</span><span>${escapeHtml(title)}</span></nav>
  <article class="static-doc-article">
    <p class="static-doc-kicker">AgentWorks documentation</p>
    <h1>${escapeHtml(title)}</h1>
    ${articleHtml}
  </article>
  <aside class="static-doc-source"><strong>Machine-readable source</strong><a href="/docs-content/${rawPath}.md">Open raw Markdown</a></aside>
</main>
<footer class="agent-static-footer"><span>AgentWorks</span><a href="https://github.com/manishiitg/mcp-agent-builder-go/releases/latest">Latest release</a></footer>
</body>
</html>`;
}

function sitemapXml(routes) {
  const rows = routes.map(({ route, changefreq, priority }) => `  <url>
    <loc>${siteOrigin}${route}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

const manifest = JSON.parse(fs.readFileSync(path.join(docsRoot, 'manifest.json'), 'utf8'));
const configured = JSON.parse(fs.readFileSync(path.join(root, 'public-docs.json'), 'utf8')).documents;
const manifestByPath = new Map(manifest.documents.map(doc => [doc.path, doc]));
const publicRoutes = new Map(configured.map(docPath => [docPath, routeFor(docPath)]));
const renderedDocs = [];

for (const docPath of configured) {
  const doc = manifestByPath.get(docPath);
  if (!doc) throw new Error(`Public documentation entry missing from manifest: ${docPath}`);
  const markdownFile = path.join(docsRoot, `${docPath}.md`);
  if (!fs.existsSync(markdownFile)) throw new Error(`Public documentation file missing: ${markdownFile}`);
  const markdown = fs.readFileSync(markdownFile, 'utf8');
  const route = publicRoutes.get(docPath);
  const description = plainDescription(markdown, doc.title);
  const articleHtml = renderMarkdown(markdown, docPath, publicRoutes);
  const output = path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, pageTemplate({ title: doc.title, description, route, rawPath: docPath, articleHtml }));
  renderedDocs.push({ ...doc, route, markdown });
}

const llmsFull = [
  '# AgentWorks: Complete Product and Documentation Context',
  '',
  'Canonical website: https://agentworkshq.com/',
  'Open-source repository: https://github.com/manishiitg/mcp-agent-builder-go',
  'Latest release: https://github.com/manishiitg/mcp-agent-builder-go/releases/latest',
  '',
  'AgentWorks is an open-source operating layer for coordinating, observing, and improving AI workflows across a company. It manages goals, schedules, model and CLI routing, browser and MCP tools, secrets, evidence, costs, Pulse, human approvals, reports, reusable skills, and bounded Auto Improve proposals.',
  '',
  ...renderedDocs.flatMap(doc => [
    `## ${doc.title}`,
    '',
    `Canonical HTML: ${siteOrigin}${doc.route}`,
    `Raw Markdown: ${siteOrigin}/docs-content/${doc.path}.md`,
    '',
    doc.markdown.trim(),
    ''
  ])
].join('\n');
fs.writeFileSync(path.join(dist, 'llms-full.txt'), `${llmsFull.trim()}\n`);

const marketingRoutes = [
  { route: '/', changefreq: 'weekly', priority: '1.0' },
  { route: '/how/', changefreq: 'monthly', priority: '0.8' },
  { route: '/use-cases/', changefreq: 'monthly', priority: '0.85' },
  { route: '/updates/', changefreq: 'weekly', priority: '0.75' },
  { route: '/docs/', changefreq: 'weekly', priority: '0.8' }
];
const docRoutes = renderedDocs.map(doc => ({ route: doc.route, changefreq: 'monthly', priority: '0.65' }));
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml([...marketingRoutes, ...docRoutes]));

console.log(`generate-agent-content: rendered ${renderedDocs.length} public documentation pages`);
