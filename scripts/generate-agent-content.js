#!/usr/bin/env node
// Website docs are user Guides only; developer docs live on GitHub
// (https://github.com/manishiitg/agentworks/tree/main/docs). This script
// renders docs-guides/*.md to /docs/guides/<slug>/, the Guides home to
// /docs/, raw guide Markdown to /docs-guides/*.md, plus sitemap.xml and
// llms-full.txt. Retired developer routes 301 to GitHub via _redirects.
const fs = require('fs');
const path = require('path');
const { Marked } = require('../assets/vendor/marked-18.0.6/marked.umd.js');

const root = path.resolve(__dirname, '..');
const siteHeader = fs.readFileSync(path.join(__dirname, 'launch', 'site-header.fragment.html'), 'utf8');
const siteFooter = fs.readFileSync(path.join(__dirname, 'site-footer.fragment.html'), 'utf8');
const dist = path.join(root, 'dist');
const guidesRoot = path.join(root, 'docs-guides');
const guidesDist = path.join(dist, 'docs-guides');
const siteOrigin = 'https://agentworkshq.com';
const repoUrl = 'https://github.com/manishiitg/agentworks';
const devDocsUrl = `${repoUrl}/tree/main/docs`;
const buildDate = new Date().toISOString().slice(0, 10);
const launchV = /V='([^']+)'/.exec(fs.readFileSync(path.join(__dirname, 'launch', 'partials.py'), 'utf8'))[1];

const guidesNav = [
  { group: 'Start here', pages: [
    { slug: 'first-goal', label: 'Set your first goal', blurb: 'Outcome, metric, target, and rules — your first running goal.' },
    { slug: 'slack', label: 'Talk to your crew in Slack', blurb: 'Mention the crew, follow the thread, approve from Slack.' },
    { slug: 'whatsapp', label: 'Talk to your crew on WhatsApp', blurb: 'Pair once with a QR code, approve from your phone.' },
    { slug: 'share-browser', label: 'Let your agent use a browser', blurb: 'Its own managed window, or tabs from your Chrome or Edge.' },
    { slug: 'approvals-autonomy', label: 'Approvals and autonomy', blurb: 'What asks first, and the four autonomy levels.' }
  ] },
  { group: 'Work together', pages: [
    { slug: 'share-workflow', label: 'Share a workflow', blurb: 'Owners, editors, readers — share a workflow and know what each level can do.' },
    { slug: 'share-secrets', label: 'Share secrets safely', blurb: 'One API key in Vault that your team\'s agents can use, without pasting it around.' }
  ] },
  { group: 'Automate', pages: [
    { slug: 'publish-relay', label: 'Publish your first Relay', blurb: 'Describe a task, test the draft, and publish a versioned API.' },
    { slug: 'incoming-gmail', label: 'Give your project an email address', blurb: 'Email a Crew, workflow, or Code and continue the chat by reply.' },
    { slug: 'gmail', label: 'Connect Gmail and control what it sends', blurb: 'Connect your mailbox, grant read or send, and approve every send.' }
  ] },
  { group: 'Coming soon', soon: true, pages: [
    { slug: 'intro-2-minutes', label: 'What AgentWorks does in 2 minutes', blurb: 'The two-minute tour of goals, crews, and Auto-improve.' },
    { slug: 'premade-agent', label: 'Install a premade agent', blurb: 'Pick an agent, install it, point it at your goal.' },
    { slug: 'progress-report', label: 'Read progress and “Did for you”', blurb: 'Reports, evidence, and what each status asks of you.' },
    { slug: 'invite-teammates', label: 'Invite teammates', blurb: 'Add people, split jobs, share approvals.' },
    { slug: 'ai-plan', label: 'Connect your AI plan', blurb: 'Run on the Claude, ChatGPT, Gemini, or Cursor plan you pay for.' },
    { slug: 'billing', label: 'How billing works', blurb: 'How a custom deployment is billed.' }
  ] }
];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
}

function extractFrontMatter(markdown) {
  if (!markdown.startsWith('---\n')) return { meta: {}, body: markdown };
  const end = markdown.indexOf('\n---', 4);
  if (end === -1) return { meta: {}, body: markdown };
  const meta = {};
  for (const line of markdown.slice(4, end).split('\n')) {
    const match = /^([A-Za-z0-9_-]+):\s*(.+)$/.exec(line.trim());
    if (match) meta[match[1]] = match[2].trim();
  }
  return { meta, body: markdown.slice(end + 4).replace(/^\n+/, '') };
}

function plainDescription(markdown, title) {
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .find(block => block && !/^(#|```|---|<|\|)/.test(block));
  const plain = (paragraph || `Technical documentation for ${title} in AgentWorks.`)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*`>]/g, '')
    .replace(/^#+\s+/, '')
    .replace(/^-+\s+/, '')
    .replace(/\s+/g, ' ')
    .trim();
  return truncateWords(plain, 170);
}

function truncateWords(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 3);
  const boundary = cut.lastIndexOf(' ');
  return `${(boundary > max / 2 ? cut.slice(0, boundary) : cut).trim()}...`;
}

function resolveDocLink(href, currentPath, publicRoutes) {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const clean = href.split('#')[0].split('?')[0];
  const suffix = href.slice(clean.length);
  const base = currentPath.includes('/') ? path.posix.dirname(currentPath) : '.';
  const resolved = path.posix.normalize(path.posix.join(base, clean)).replace(/^\.\//, '');
  const docKey = resolved.replace(/\.md$/i, '');
  if (publicRoutes.has(docKey)) return `${publicRoutes.get(docKey)}${suffix}`;
  // Anything we don't publish (source files, internal docs) links to the public repo.
  const repoPath = resolved.replace(/^(\.\.\/)+/, '');
  return `${repoUrl}/blob/main/${repoPath}${suffix}`;
}

function renderMarkdown(markdown, currentPath, publicRoutes) {
  const toc = [];
  const seen = new Map();
  const renderer = {
    link(token) {
      const href = resolveDocLink(token.href, currentPath, publicRoutes);
      const title = token.title ? ` title="${escapeHtml(token.title)}"` : '';
      return `<a href="${escapeHtml(href)}"${title}>${this.parser.parseInline(token.tokens)}</a>`;
    },
    heading(token) {
      const text = this.parser.parseInline(token.tokens);
      const plain = text.replace(/<[^>]*>/g, '');
      let id = slugify(plain);
      const count = (seen.get(id) || 0) + 1;
      seen.set(id, count);
      if (count > 1) id = `${id}-${count}`;
      if (token.depth === 2 || token.depth === 3) toc.push({ level: token.depth, text: plain, id });
      return `<h${token.depth} id="${id}">${text}</h${token.depth}>`;
    }
  };
  const marked = new Marked({ renderer, gfm: true });
  return { html: marked.parse(markdown.replace(/^#\s+[^\n]+\n+/, '')), toc };
}

function imageSize(file) {
  const buffer = fs.readFileSync(file);
  if (buffer.toString('ascii', 1, 4) === 'PNG') {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xc3) {
        return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
      }
      offset += 2 + length;
    }
  }
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buffer.toString('ascii', 12, 16);
    if (chunk === 'VP8X') {
      return { width: 1 + (buffer[24] | (buffer[25] << 8) | (buffer[26] << 16)), height: 1 + (buffer[27] | (buffer[28] << 8) | (buffer[29] << 16)) };
    }
    if (chunk === 'VP8 ') {
      return { width: buffer[26] | ((buffer[27] & 0x3f) << 8), height: buffer[28] | ((buffer[29] & 0x3f) << 8) };
    }
    if (chunk === 'VP8L') {
      const b0 = buffer[21], b1 = buffer[22], b2 = buffer[23], b3 = buffer[24];
      return { width: 1 + (((b1 & 0x3f) << 8) | b0), height: 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)) };
    }
  }
  return null;
}

function withImageDimensions(html) {
  return html.replace(/<img\s+([^>]*?)>/g, (tag, attrs) => {
    if (/width=/.test(attrs)) return tag;
    const src = /src="([^"]+)"/.exec(attrs)?.[1] || '';
    if (!src.startsWith('/')) return tag;
    const file = path.join(dist, src.split('#')[0].split('?')[0].slice(1));
    if (!fs.existsSync(file)) {
      console.warn(`generate-agent-content: image missing: ${src}`);
      return tag;
    }
    const size = imageSize(file);
    if (!size) return tag;
    return `<img ${attrs} width="${size.width}" height="${size.height}" loading="lazy">`;
  });
}

function videoFigure(slug, title) {
  const missing = [`assets/video/guides/${slug}.mp4`, `assets/video/guides/${slug}-poster.jpg`]
    .filter(asset => !fs.existsSync(path.join(root, asset)));
  if (missing.length) {
    console.warn(`generate-agent-content: video missing for ${slug}: ${missing.join(', ')}`);
    return '';
  }
  return `<figure class="guide-video demo-video"><video controls preload="none" playsinline width="1920" height="1080" poster="/assets/video/guides/${slug}-poster.jpg" aria-label="Watch: ${escapeHtml(title)}"><source src="/assets/video/guides/${slug}.mp4" type="video/mp4"></video><figcaption>Watch: ${escapeHtml(title)} (about 1 min)</figcaption></figure>`;
}

function sidebarHtml(nav, currentRoute) {
  const groups = nav.map(entry => {
    const items = entry.pages.map(page => {
      const current = page.route === currentRoute ? ' aria-current="page"' : '';
      const cls = entry.soon ? ' class="soon"' : '';
      return `<li${cls}><a href="${page.route}"${current}>${escapeHtml(page.label)}</a></li>`;
    }).join('');
    return `<div class="docs-nav-group"><p>${escapeHtml(entry.group)}</p><ul>${items}</ul></div>`;
  }).join('');
  return `<nav aria-label="Docs">${groups}<p class="docs-dev-link">Building or self-hosting? <a href="${devDocsUrl}">Developer docs on GitHub</a></p></nav>`;
}

function tocHtml(toc) {
  if (!toc.length) return '';
  const items = toc.map(entry => `<li class="l${entry.level}"><a href="#${entry.id}">${escapeHtml(entry.text)}</a></li>`).join('');
  return `<aside class="docs-toc" aria-label="On this page"><p>On this page</p><ul>${items}</ul></aside>`;
}

function pageTemplate({ title, description, route, rawPath, kicker, crumbs, sidebar, toc, articleHtml, prevNext }) {
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
        itemListElement: crumbs.map((crumb, i) => (
          { '@type': 'ListItem', position: i + 1, name: crumb.name, item: `${siteOrigin}${crumb.route}` }
        ))
      }
    ]
  };
  const crumbHtml = crumbs.map((crumb, i) => (
    i === crumbs.length - 1
      ? `<span>${escapeHtml(crumb.name)}</span>`
      : `<a href="${crumb.route}">${escapeHtml(crumb.name)}</a><span class="sep">/</span>`
  )).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} - AgentWorks Docs</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="theme-color" content="#fbfbf9">
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
${rawPath ? `<link rel="alternate" type="text/markdown" href="/docs-guides/${rawPath}.md" title="Raw Markdown">` : ''}
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/fonts/fonts.css?v=agentworks2">
<link rel="stylesheet" href="/launch.css?v=${launchV}">
<link rel="stylesheet" href="/site-header.css?v=3">
<link rel="stylesheet" href="/docs.css?v=2">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
${siteHeader}
<main class="docs-main"><div class="wrap">
  <nav class="docs-crumb" aria-label="Breadcrumb">${crumbHtml}</nav>
  <div class="docs-cols">
    <aside class="docs-side">${sidebar}</aside>
    <article class="docs-article">
      <details class="docs-nav-drop"><summary>Contents</summary><div class="docs-nav-body">${sidebar}</div></details>
      <p class="docs-kicker">${escapeHtml(kicker)}</p>
      <h1>${escapeHtml(title)}</h1>
      ${articleHtml}
      ${rawPath ? `<aside class="docs-source"><strong>Machine-readable source:</strong> <a href="/docs-guides/${rawPath}.md">Open raw Markdown</a></aside>` : ''}
      ${prevNext}
    </article>
    ${toc}
  </div>
</div></main>
${siteFooter}`;
}

function prevNextHtml(prev, next) {
  if (!prev && !next) return '';
  const prevHtml = prev
    ? `<a class="prev" href="${prev.route}"><small>Previous</small><b>${escapeHtml(prev.label)}</b></a>`
    : '<span></span>';
  const nextHtml = next
    ? `<a class="next" href="${next.route}"><small>Next</small><b>${escapeHtml(next.label)}</b></a>`
    : '<span></span>';
  return `<nav class="docs-prevnext" aria-label="More in this section">${prevHtml}${nextHtml}</nav>`;
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

// Guides live in this repo (docs-guides/*.md); raw copies ship under docs-guides/.
const guideOrder = [];
for (const entry of guidesNav) {
  for (const page of entry.pages) {
    const source = path.join(guidesRoot, `${page.slug}.md`);
    if (!fs.existsSync(source)) throw new Error(`Guide missing: ${source}`);
    const { meta, body } = extractFrontMatter(fs.readFileSync(source, 'utf8'));
    const route = `/docs/guides/${page.slug}/`;
    const title = (/^#\s+(.+)$/m.exec(body)?.[1] || page.label).replace(/[`*_]/g, '').trim();
    fs.mkdirSync(guidesDist, { recursive: true });
    fs.writeFileSync(path.join(guidesDist, `${page.slug}.md`), body.replace(/\r\n/g, '\n'));
    page.route = route;
    guideOrder.push({ ...page, route, title, video: meta.video || null, description: plainDescription(body, title), markdown: body, soon: !!entry.soon });
  }
}
const docsSidebarFor = route => sidebarHtml(guidesNav, route);

const renderedGuides = [];
for (let i = 0; i < guideOrder.length; i++) {
  const page = guideOrder[i];
  const guideRoutes = new Map(guideOrder.map(guide => [guide.slug, guide.route]));
  const { html, toc } = renderMarkdown(page.markdown, page.slug, guideRoutes);
  let articleHtml = withImageDimensions(html);
  if (page.video) {
    const figure = videoFigure(page.video, page.title);
    if (figure) {
      const introEnd = articleHtml.indexOf('</p>');
      articleHtml = introEnd === -1 ? figure + articleHtml : articleHtml.slice(0, introEnd + 4) + figure + articleHtml.slice(introEnd + 4);
    }
  }
  const output = path.join(dist, page.route, 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, pageTemplate({
    title: page.title,
    description: page.description,
    route: page.route,
    rawPath: page.slug,
    kicker: 'Guides',
    crumbs: [
      { name: 'AgentWorks', route: '/' },
      { name: 'Docs', route: '/docs/' },
      { name: page.title, route: page.route }
    ],
    sidebar: docsSidebarFor(page.route),
    toc: tocHtml(toc),
    articleHtml,
    prevNext: prevNextHtml(guideOrder[i - 1] || null, guideOrder[i + 1] || null)
  }));
  if (!page.soon) renderedGuides.push(page);
}

function sectionHome({ title, description, route, kicker, intro, nav, crumbs, devLink }) {
  const groups = nav.map(({ group, soon, pages }) => {
    const items = pages.map(page => {
      const meta = guideOrder.find(item => item.route === page.route);
      const blurb = truncateWords(page.blurb || meta?.description || '', 120);
      return `<li${soon ? ' class="soon"' : ''}><a href="${page.route}"><b>${escapeHtml(page.label)}</b><span>${escapeHtml(blurb)}</span></a></li>`;
    }).join('');
    return `<section class="docs-section-group"><h2 id="${slugify(group)}">${escapeHtml(group)}</h2><ul>${items}</ul></section>`;
  }).join('');
  const toc = nav.map(({ group }) => ({ level: 2, text: group, id: slugify(group) }));
  const articleHtml = `<p class="docs-section-lede">${escapeHtml(intro)}</p><div class="docs-sections">${groups}</div>${devLink ? `<p class="docs-dev-home">Building on or self-hosting AgentWorks? <a href="${devDocsUrl}">Developer docs are on GitHub →</a></p>` : ''}`;
  const output = path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, pageTemplate({
    title,
    description,
    route,
    rawPath: null,
    kicker,
    crumbs,
    sidebar: docsSidebarFor(route),
    toc: tocHtml(toc),
    articleHtml,
    prevNext: ''
  }));
}

sectionHome({
  title: 'AgentWorks guides',
  description: 'Task-based AgentWorks guides for business users: run goals, talk to your crew in Slack and WhatsApp, share work safely, and publish Relays.',
  route: '/docs/',
  kicker: 'Guides',
  intro: 'Task-based guides for founders, sales leads, store owners, and support leads. No code, no jargon — just outcomes.',
  nav: guidesNav,
  devLink: true,
  crumbs: [
    { name: 'AgentWorks', route: '/' },
    { name: 'Docs', route: '/docs/' }
  ]
});

const llmsFull = [
  '# AgentWorks: Complete Product and Documentation Context',
  '',
  'Canonical website: https://agentworkshq.com/',
  'Open-source repository: https://github.com/manishiitg/agentworks',
  'Latest release: https://github.com/manishiitg/agentworks/releases/latest',
  '',
  'Developer docs (install, architecture, workflow manifest, MCP, providers, security, self-hosting): https://github.com/manishiitg/agentworks/tree/main/docs',
  '',
  'AgentWorks gives an AI agent a goal and a metric, and it keeps working until it hits the target. It manages goals and metrics, schedules, model and CLI routing, browser and MCP tools, secrets, evidence, costs, human approvals, reports, reusable skills, and auto-improvement of the workflow.',
  '',
  ...renderedGuides.flatMap(guide => [
    `## ${guide.title}`,
    '',
    `Canonical HTML: ${siteOrigin}${guide.route}`,
    `Raw Markdown: ${siteOrigin}/docs-guides/${guide.slug}.md`,
    '',
    guide.markdown.trim(),
    ''
  ])
].join('\n');
fs.writeFileSync(path.join(dist, 'llms-full.txt'), `${llmsFull.trim()}\n`);

const marketingRoutes = [
  { route: '/', changefreq: 'weekly', priority: '1.0' },
  { route: '/free-tools/', changefreq: 'weekly', priority: '0.7' },
  { route: '/pricing/', changefreq: 'monthly', priority: '0.9' },
  { route: '/privacy/', changefreq: 'yearly', priority: '0.3' },
  { route: '/terms/', changefreq: 'yearly', priority: '0.3' },
  { route: '/refunds/', changefreq: 'yearly', priority: '0.3' },
  { route: '/agents/', changefreq: 'weekly', priority: '0.9' },
  { route: '/solutions/sales/', changefreq: 'monthly', priority: '0.8' },
  { route: '/solutions/shopify/', changefreq: 'monthly', priority: '0.8' },
  { route: '/solutions/support/', changefreq: 'monthly', priority: '0.8' },
  { route: '/solutions/finance/', changefreq: 'monthly', priority: '0.8' },
  { route: '/solutions/marketing/', changefreq: 'monthly', priority: '0.8' },
  { route: '/enterprise/', changefreq: 'monthly', priority: '0.9' },
  { route: '/enterprise/release-quality/', changefreq: 'monthly', priority: '0.8' },
  { route: '/enterprise/incident-response/', changefreq: 'monthly', priority: '0.8' },
  { route: '/enterprise/security-testing/', changefreq: 'monthly', priority: '0.8' },
  { route: '/enterprise/cloud-cost/', changefreq: 'monthly', priority: '0.8' },
  { route: '/enterprise/growth-analytics/', changefreq: 'monthly', priority: '0.8' },
  { route: '/vault/', changefreq: 'monthly', priority: '0.8' },
  { route: '/product/', changefreq: 'monthly', priority: '0.9' },
  { route: '/goals/', changefreq: 'monthly', priority: '0.9' },
  { route: '/crews/', changefreq: 'monthly', priority: '0.9' },
  { route: '/code/', changefreq: 'monthly', priority: '0.8' },
  { route: '/about/', changefreq: 'monthly', priority: '0.6' },
  { route: '/ecommerce/', changefreq: 'monthly', priority: '0.8' },
  { route: '/brain/', changefreq: 'monthly', priority: '0.8' },
  { route: '/download/', changefreq: 'monthly', priority: '0.8' },
  { route: '/relays/', changefreq: 'monthly', priority: '0.6' },
  { route: '/bullpen/', changefreq: 'monthly', priority: '0.6' },
  { route: '/llm-gateway/', changefreq: 'monthly', priority: '0.6' },
  { route: '/docs/', changefreq: 'weekly', priority: '0.8' }
];
const docRoutes = renderedGuides.map(guide => ({ route: guide.route, changefreq: 'monthly', priority: '0.7' }));
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml([...marketingRoutes, ...docRoutes]));

console.log(`generate-agent-content: rendered ${guideOrder.length} guides (${renderedGuides.length} in sitemap)`);
