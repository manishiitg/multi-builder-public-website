#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Marked } = require('../assets/vendor/marked-18.0.6/marked.umd.js');

const root = path.resolve(__dirname, '..');
const siteHeader = fs.readFileSync(path.join(__dirname, 'launch', 'site-header.fragment.html'), 'utf8');
const siteFooter = fs.readFileSync(path.join(__dirname, 'site-footer.fragment.html'), 'utf8');
const dist = path.join(root, 'dist');
const docsRoot = path.join(dist, 'docs-content');
const guidesRoot = path.join(root, 'docs-guides');
const siteOrigin = 'https://agentworkshq.com';
const repoUrl = 'https://github.com/manishiitg/coding-agent-loop';
const buildDate = new Date().toISOString().slice(0, 10);
const launchV = /V='([^']+)'/.exec(fs.readFileSync(path.join(__dirname, 'launch', 'partials.py'), 'utf8'))[1];

// Developer docs: sidebar groups with short labels. Every allowlisted doc must appear once.
const devNav = [
  { group: 'Get started', pages: [
    { path: 'getting-started/README', label: 'Install' },
    { path: 'getting-started/first-workflow', label: 'Your first workflow' },
    { path: 'core/README', label: 'Core concepts' }
  ] },
  { group: 'Goals & Auto-improve', pages: [
    { path: 'workflow/self_improvement_and_reporting', label: 'Auto-improve and reporting' },
    { path: 'workflow/auto_improvement_framework', label: 'Auto-improve framework' },
    { path: 'workflow/human_feedback_system', label: 'Human approvals & feedback' },
    { path: 'workflow/learning_architecture', label: 'Learning & knowledge' }
  ] },
  { group: 'Crew & memory', pages: [
    { path: 'core/bot_connector_system', label: 'Chat connectors' },
    { path: 'core/skills', label: 'Skills' },
    { path: 'multiagent/agent_memory_system', label: 'Agent memory' },
    { path: 'multiagent/README', label: 'Crews & multi-agent' }
  ] },
  { group: 'Workflows', pages: [
    { path: 'workflow/README', label: 'Workflows overview' },
    { path: 'workflow/workflow_scheduling', label: 'Schedules' },
    { path: 'workflow/workflow_monitoring', label: 'Monitoring' },
    { path: 'workflow/cost_and_log_measurement', label: 'Cost & logs' },
    { path: 'workflow/browser_automation', label: 'Browser automation' },
    { path: 'workflow/tiered_llm_allocation', label: 'Model tiers' }
  ] },
  { group: 'Connect', pages: [
    { path: 'core/llm_configuration_and_resilience', label: 'AI plans & model routing' },
    { path: 'core/mcp_bridge_layer', label: 'MCP bridge' },
    { path: 'core/browser', label: 'Browser' },
    { path: 'core/secrets', label: 'Secrets' }
  ] },
  { group: 'Reference', pages: [
    { path: 'workflow/workflow_manifest_architecture', label: 'Workflow manifest' },
    { path: 'workflow/step_config_format_specification', label: 'Step config format' },
    { path: 'workflow/tool_filtering_system', label: 'Tool filtering' }
  ] },
  { group: 'Overview', pages: [
    { path: 'README', label: 'Documentation overview' }
  ] }
];

// Curated card blurbs where the source's first paragraph is meaningless out of context.
const blurbOverrides = {
  'getting-started/README': 'Install the macOS app or self-host on Linux, then complete first-launch setup.',
  'workflow/auto_improvement_framework': 'Bounded self-improvement: run evidence, maintenance, strategic review, and audit trail.',
  'workflow/human_feedback_system': 'How workflows ask humans for input: approvals, choices, and blocking questions.',
  'workflow/workflow_scheduling': 'Cron and cadence schedules, quiet hours, and per-run timing rules.',
  'workflow/workflow_manifest_architecture': 'The workflow.json format: goals, schedules, steps, and how the backend discovers them.',
  'workflow/learning_architecture': 'How runs turn into reusable skills, learnings, and knowledge for future runs.',
  'workflow/workflow_monitoring': 'Run evidence, status, and health: what to look at when a workflow misbehaves.',
  'workflow/cost_and_log_measurement': 'How token usage, run cost, and logs are measured and stored.'
};

// Friendlier page titles where the source heading is bland or has emoji.
const titleOverrides = {
  README: 'Documentation overview',
  'core/README': 'Core concepts',
  'multiagent/README': 'Crews and multi-agent',
  'workflow/README': 'Workflows overview',
  'getting-started/README': 'Install AgentWorks',
  'core/mcp_bridge_layer': 'MCP bridge',
  'workflow/cost_and_log_measurement': 'Cost and log measurement',
  'workflow/step_config_format_specification': 'Step config format'
};

const guidesNav = [
  { group: 'Start here', pages: [
    { slug: 'first-goal', label: 'Set your first goal', blurb: 'Outcome, metric, target, and rules — your first running goal.' },
    { slug: 'slack', label: 'Talk to your crew in Slack', blurb: 'Mention the crew, follow the thread, approve from Slack.' },
    { slug: 'whatsapp', label: 'Talk to your crew on WhatsApp', blurb: 'Pair once with a QR code, approve from your phone.' },
    { slug: 'approvals-autonomy', label: 'Approvals and autonomy', blurb: 'What asks first, and the four autonomy levels.' }
  ] },
  { group: 'Coming soon', soon: true, pages: [
    { slug: 'intro-2-minutes', label: 'What AgentWorks does in 2 minutes', blurb: 'The two-minute tour of goals, crews, and Auto-improve.' },
    { slug: 'premade-agent', label: 'Install a premade agent', blurb: 'Pick an agent, install it, point it at your goal.' },
    { slug: 'gmail', label: 'Connect Gmail and control what it sends', blurb: 'Mailbox connection plus per-goal sending limits.' },
    { slug: 'progress-report', label: 'Read progress and “Did for you”', blurb: 'Reports, evidence, and what each status asks of you.' },
    { slug: 'invite-teammates', label: 'Invite teammates', blurb: 'Add people, split jobs, share approvals.' },
    { slug: 'ai-plan', label: 'Connect your AI plan', blurb: 'Run on the Claude, ChatGPT, Gemini, or Cursor plan you pay for.' },
    { slug: 'billing', label: 'Billing and cancelling', blurb: 'Cloud billing, the guarantee, and cancelling.' }
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

function sidebarHtml(nav, currentRoute, section) {
  const switchHtml = `<div class="docs-switch"><a href="/docs/guides/"${section === 'guides' ? ' aria-current="page"' : ''}>Guides</a><a href="/docs/developers/"${section === 'developers' ? ' aria-current="page"' : ''}>Developers</a></div>`;
  const groups = nav.map(({ group, soon, pages }) => {
    const items = pages.map(page => {
      const current = page.route === currentRoute ? ' aria-current="page"' : '';
      const cls = soon ? ' class="soon"' : '';
      return `<li${cls}><a href="${page.route}"${current}>${escapeHtml(page.label)}</a></li>`;
    }).join('');
    return `<div class="docs-nav-group"><p>${escapeHtml(group)}</p><ul>${items}</ul></div>`;
  }).join('');
  return `${switchHtml}<nav aria-label="Docs section">${groups}</nav>`;
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
${rawPath ? `<link rel="alternate" type="text/markdown" href="/docs-content/${rawPath}.md" title="Raw Markdown">` : ''}
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/assets/fonts/fonts.css?v=agentworks2">
<link rel="stylesheet" href="/launch.css?v=${launchV}">
<link rel="stylesheet" href="/site-header.css?v=1">
<link rel="stylesheet" href="/docs.css?v=1">
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
      ${rawPath ? `<aside class="docs-source"><strong>Machine-readable source:</strong> <a href="/docs-content/${rawPath}.md">Open raw Markdown</a></aside>` : ''}
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

const manifest = JSON.parse(fs.readFileSync(path.join(docsRoot, 'manifest.json'), 'utf8'));
const configured = JSON.parse(fs.readFileSync(path.join(root, 'public-docs.json'), 'utf8')).documents;
const manifestByPath = new Map(manifest.documents.map(doc => [doc.path, doc]));
const publicRoutes = new Map(configured.map(docPath => [docPath, routeFor(docPath)]));

// Every allowlisted doc must have exactly one nav slot.
const navPaths = devNav.flatMap(entry => entry.pages.map(page => page.path));
const missingNav = configured.filter(docPath => !navPaths.includes(docPath));
const extraNav = navPaths.filter(docPath => !configured.includes(docPath));
if (missingNav.length || extraNav.length) {
  throw new Error(`Developer nav mismatch (missing: ${missingNav.join(', ') || 'none'}; extra: ${extraNav.join(', ') || 'none'})`);
}

const renderedDocs = [];
const devOrder = [];
for (const entry of devNav) {
  for (const page of entry.pages) {
    const doc = manifestByPath.get(page.path);
    if (!doc) throw new Error(`Public documentation entry missing from manifest: ${page.path}`);
    const markdownFile = path.join(docsRoot, `${page.path}.md`);
    if (!fs.existsSync(markdownFile)) throw new Error(`Public documentation file missing: ${markdownFile}`);
    const markdown = fs.readFileSync(markdownFile, 'utf8');
    const route = publicRoutes.get(page.path);
    const title = titleOverrides[page.path] || doc.title;
    devOrder.push({ ...page, route, title, description: plainDescription(markdown, title) });
    renderedDocs.push({ ...doc, route, title, markdown });
  }
}

for (const entry of devNav) {
  for (const page of entry.pages) page.route = publicRoutes.get(page.path);
}
const devSidebarFor = route => sidebarHtml(devNav, route, 'developers');
for (let i = 0; i < devOrder.length; i++) {
  const page = devOrder[i];
  const doc = renderedDocs.find(rendered => rendered.route === page.route);
  const { html, toc } = renderMarkdown(doc.markdown, doc.path, publicRoutes);
  const output = path.join(dist, page.route, 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, pageTemplate({
    title: page.title,
    description: page.description,
    route: page.route,
    rawPath: doc.path,
    kicker: 'Developers',
    crumbs: [
      { name: 'AgentWorks', route: '/' },
      { name: 'Docs', route: '/docs/' },
      { name: 'Developers', route: '/docs/developers/' },
      { name: page.title, route: page.route }
    ],
    sidebar: devSidebarFor(page.route),
    toc: tocHtml(toc),
    articleHtml: withImageDimensions(html),
    prevNext: prevNextHtml(devOrder[i - 1] || null, devOrder[i + 1] || null)
  }));
}

// Guides live in this repo (docs-guides/*.md); raw copies ship under docs-content/guides/.
const guideOrder = [];
for (const entry of guidesNav) {
  for (const page of entry.pages) {
    const source = path.join(guidesRoot, `${page.slug}.md`);
    if (!fs.existsSync(source)) throw new Error(`Guide missing: ${source}`);
    const markdown = fs.readFileSync(source, 'utf8');
    const route = `/docs/guides/${page.slug}/`;
    const rawPath = `guides/${page.slug}`;
    const title = (/^#\s+(.+)$/m.exec(markdown)?.[1] || page.label).replace(/[`*_]/g, '').trim();
    fs.mkdirSync(path.join(docsRoot, 'guides'), { recursive: true });
    fs.writeFileSync(path.join(docsRoot, `${rawPath}.md`), markdown.replace(/\r\n/g, '\n'));
    page.route = route;
    guideOrder.push({ ...page, route, title, description: plainDescription(markdown, title), markdown, soon: !!entry.soon });
  }
}
const guideSidebarFor = route => sidebarHtml(guidesNav, route, 'guides');
const renderedGuides = [];
for (let i = 0; i < guideOrder.length; i++) {
  const page = guideOrder[i];
  const guideRoutes = new Map(guideOrder.map(guide => [guide.slug, guide.route]));
  const { html, toc } = renderMarkdown(page.markdown, page.slug, guideRoutes);
  const output = path.join(dist, page.route, 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, pageTemplate({
    title: page.title,
    description: page.description,
    route: page.route,
    rawPath: `guides/${page.slug}`,
    kicker: 'Guides',
    crumbs: [
      { name: 'AgentWorks', route: '/' },
      { name: 'Docs', route: '/docs/' },
      { name: 'Guides', route: '/docs/guides/' },
      { name: page.title, route: page.route }
    ],
    sidebar: guideSidebarFor(page.route),
    toc: tocHtml(toc),
    articleHtml: withImageDimensions(html),
    prevNext: prevNextHtml(guideOrder[i - 1] || null, guideOrder[i + 1] || null)
  }));
  if (!page.soon) renderedGuides.push(page);
}

function sectionHome({ title, description, route, kicker, intro, nav, crumbs }) {
  const groups = nav.map(({ group, soon, pages }) => {
    const items = pages.map(page => {
      const meta = (route === '/docs/developers/' ? devOrder : guideOrder).find(item => item.route === page.route);
      const blurb = truncateWords(page.blurb || blurbOverrides[page.path] || meta?.description || '', 120);
      return `<li${soon ? ' class="soon"' : ''}><a href="${page.route}"><b>${escapeHtml(page.label)}</b><span>${escapeHtml(blurb)}</span></a></li>`;
    }).join('');
    return `<section class="docs-section-group"><h2 id="${slugify(group)}">${escapeHtml(group)}</h2><ul>${items}</ul></section>`;
  }).join('');
  const toc = nav.map(({ group }) => ({ level: 2, text: group, id: slugify(group) }));
  const articleHtml = `<p class="docs-section-lede">${escapeHtml(intro)}</p><div class="docs-sections">${groups}</div>`;
  const output = path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, pageTemplate({
    title,
    description,
    route,
    rawPath: null,
    kicker,
    crumbs,
    sidebar: route === '/docs/developers/' ? devSidebarFor(route) : guideSidebarFor(route),
    toc: tocHtml(toc),
    articleHtml,
    prevNext: ''
  }));
}

sectionHome({
  title: 'Building and self-hosting',
  description: 'Developer documentation for AgentWorks: install the app or self-host on Linux, build workflows, connect models and tools, and run goals with auto-improve.',
  route: '/docs/developers/',
  kicker: 'Developers',
  intro: 'Install, build, connect, and self-host. Start with Install, or jump to the reference for manifests, step config, and tool filtering.',
  nav: devNav,
  crumbs: [
    { name: 'AgentWorks', route: '/' },
    { name: 'Docs', route: '/docs/' },
    { name: 'Developers', route: '/docs/developers/' }
  ]
});

sectionHome({
  title: 'Using AgentWorks',
  description: 'Plain-language guides for business users: set your first goal, talk to your crew in Slack and WhatsApp, and master approvals and autonomy.',
  route: '/docs/guides/',
  kicker: 'Guides',
  intro: 'Task-based guides for founders, sales leads, store owners, and support leads. No code, no jargon — just outcomes.',
  nav: guidesNav,
  crumbs: [
    { name: 'AgentWorks', route: '/' },
    { name: 'Docs', route: '/docs/' },
    { name: 'Guides', route: '/docs/guides/' }
  ]
});

const llmsFull = [
  '# AgentWorks: Complete Product and Documentation Context',
  '',
  'Canonical website: https://agentworkshq.com/',
  'Open-source repository: https://github.com/manishiitg/coding-agent-loop',
  'Latest release: https://github.com/manishiitg/coding-agent-loop/releases/latest',
  '',
  'AgentWorks gives an AI agent a goal and a metric, and it keeps working until it hits the target. It manages goals and metrics, schedules, model and CLI routing, browser and MCP tools, secrets, evidence, costs, human approvals, reports, reusable skills, and auto-improvement of the workflow.',
  '',
  ...renderedDocs.flatMap(doc => [
    `## ${doc.title}`,
    '',
    `Canonical HTML: ${siteOrigin}${doc.route}`,
    `Raw Markdown: ${siteOrigin}/docs-content/${doc.path}.md`,
    '',
    doc.markdown.trim(),
    ''
  ]),
  ...renderedGuides.flatMap(guide => [
    `## ${guide.title}`,
    '',
    `Canonical HTML: ${siteOrigin}${guide.route}`,
    `Raw Markdown: ${siteOrigin}/docs-content/guides/${guide.slug}.md`,
    '',
    guide.markdown.trim(),
    ''
  ])
].join('\n');
fs.writeFileSync(path.join(dist, 'llms-full.txt'), `${llmsFull.trim()}\n`);

const marketingRoutes = [
  { route: '/', changefreq: 'weekly', priority: '1.0' },
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
  { route: '/product/', changefreq: 'monthly', priority: '0.9' },
  { route: '/docs/', changefreq: 'weekly', priority: '0.8' },
  { route: '/docs/guides/', changefreq: 'weekly', priority: '0.75' },
  { route: '/docs/developers/', changefreq: 'weekly', priority: '0.75' }
];
const docRoutes = [
  ...renderedDocs.map(doc => ({ route: doc.route, changefreq: 'monthly', priority: '0.65' })),
  ...renderedGuides.map(guide => ({ route: guide.route, changefreq: 'monthly', priority: '0.7' }))
];
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml([...marketingRoutes, ...docRoutes]));

console.log(`generate-agent-content: rendered ${renderedDocs.length} developer pages, ${guideOrder.length} guides (${renderedGuides.length} in sitemap)`);
