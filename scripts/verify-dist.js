#!/usr/bin/env node
const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const siteOrigin = 'https://agentworkshq.com';
const requiredFiles = [
  'index.html',
  '404.html',
  'product/index.html',
  'docs/index.html',
  'docs.css',
  'docs-redirect.js',
  'launch.css',
  'launch.js',
  'analytics.js',
  'site-header.css',
  'site-header.js',
  'pricing/index.html',
  'enterprise/index.html',
  'agents/index.html',
  'enterprise/release-quality/index.html',
  'privacy/index.html',
  'terms/index.html',
  'refunds/index.html',
  'solutions/sales/index.html',
  'solutions/shopify/index.html',
  'solutions/support/index.html',
  'solutions/finance/index.html',
  'solutions/marketing/index.html',
  'enterprise/incident-response/index.html',
  'enterprise/security-testing/index.html',
  'enterprise/cloud-cost/index.html',
  'enterprise/growth-analytics/index.html',
  '_headers',
  '_redirects',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  'llms-full.txt',
  'site.webmanifest',
  'favicon.ico',
  'favicon-16.png',
  'favicon-32.png',
  'apple-touch-icon.png',
  'icon-256.png',
  '.well-known/mcp-client.json',
  'assets/brand/agentworks-logo.svg',
  'assets/docs/guides/first-goal.webp',
  'assets/docs/guides/goal-metric-card.webp',
  'assets/docs/guides/slack-thread.webp',
  'assets/docs/guides/slack-setup.webp',
  'assets/docs/guides/whatsapp-pair.webp',
  'assets/docs/guides/autonomy-levels.webp',
  'assets/docs/guides/approval-decision.webp',
  'docs-content/manifest.json',
  'docs-content/getting-started/README.md',
  'docs-content/getting-started/first-workflow.md',
  'docs-content/guides/first-goal.md',
  'docs/overview/index.html',
  'docs/getting-started/index.html',
  'docs/getting-started/first-workflow/index.html',
  'docs/workflow/auto_improvement_framework/index.html',
  'docs/workflow/self_improvement_and_reporting/index.html',
  'docs/guides/index.html',
  'docs/guides/first-goal/index.html',
  'docs/guides/slack/index.html',
  'docs/guides/whatsapp/index.html',
  'docs/guides/approvals-autonomy/index.html',
  'docs/developers/index.html',
  'assets/fonts/fonts.css',
  'assets/og/agentworks-home-og.jpg',
  'assets/og/agentworks-docs-og.jpg',
  'assets/og/agentworks-404-og.jpg'
];
const pageExpectations = [
  {
    name: 'home',
    file: 'index.html',
    route: '/index.html',
    title: 'AgentWorks - Goal-Driven AI Agents for Business',
    h1: 'Give an AI agent a goal and a metric. It keeps working until it hits the target.',
    canonical: 'https://agentworkshq.com/',
    ogImage: 'assets/og/agentworks-home-og.jpg',
    allowTallSections: true
  },
  {
    name: 'pricing',
    file: 'pricing/index.html',
    route: '/pricing/',
    title: 'AgentWorks Pricing - Open Source, $99 Cloud, Enterprise',
    h1: 'One engine. Three ways to run it.',
    canonical: 'https://agentworkshq.com/pricing/',
    ogImage: 'assets/og/agentworks-pricing-og.jpg',
    allowTallSections: true
  },
  {
    name: 'enterprise',
    file: 'enterprise/index.html',
    route: '/enterprise/',
    title: 'AgentWorks Enterprise - Agentic Engineering Operations',
    h1: 'Agentic engineering operations, in your own cloud.',
    canonical: 'https://agentworkshq.com/enterprise/',
    ogImage: 'assets/og/agentworks-enterprise-og.jpg',
    allowTallSections: true
  },
  {
    name: 'agents',
    file: 'agents/index.html',
    route: '/agents/',
    title: 'AgentWorks Premade Agents - Ready-Made AI Teammates and Goals',
    h1: 'Premade agents, ready to start today.',
    canonical: 'https://agentworkshq.com/agents/',
    ogImage: 'assets/og/agentworks-agents-og.jpg',
    allowTallSections: true
  },
  {
    name: 'uc-release-quality',
    file: 'enterprise/release-quality/index.html',
    route: '/enterprise/release-quality/',
    title: 'AgentWorks for Release Quality - AI QA and Self-Healing Tests',
    h1: 'No release ships without a QA decision. AI agents own the tests.',
    canonical: 'https://agentworkshq.com/enterprise/release-quality/',
    ogImage: 'assets/og/agentworks-enterprise-og.jpg',
    allowTallSections: true
  },
  {
    name: 'sol-shopify',
    file: 'solutions/shopify/index.html',
    route: '/solutions/shopify/',
    title: 'AI Agents for Shopify Stores - Orders, Support and Reviews | AgentWorks',
    h1: "No order stuck, no customer left waiting. Even when you're not at the desk.",
    canonical: 'https://agentworkshq.com/solutions/shopify/',
    ogImage: 'assets/og/agentworks-agents-og.jpg',
    allowTallSections: true
  },
  {
    name: 'product',
    file: 'product/index.html',
    route: '/product/',
    title: 'AgentWorks Product - Goals, Auto-improve and Crew',
    h1: "One goal. One metric. An agent that doesn't stop at done.",
    canonical: 'https://agentworkshq.com/product/',
    ogImage: 'assets/og/agentworks-product-og.jpg',
    allowTallSections: true
  },
  {
    name: 'docs',
    file: 'docs/index.html',
    route: '/docs/',
    title: 'AgentWorks Docs - Guides for Users, Docs for Developers',
    h1: 'What brings you to the docs?',
    canonical: 'https://agentworkshq.com/docs/',
    ogImage: 'assets/og/agentworks-docs-og.jpg',
    allowTallSections: true
  },
  {
    name: 'notfound',
    file: '404.html',
    route: '/404.html',
    title: 'Page Not Found - AgentWorks',
    h1: "This page isn't here. Your goals still are.",
    canonical: 'https://agentworkshq.com/404.html',
    ogImage: 'assets/og/agentworks-404-og.jpg'
  }
];
const renderViewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];
const docsReaderViewports = [
  ...renderViewports.slice(0, 1),
  { name: 'compact', width: 1153, height: 822 },
  ...renderViewports.slice(1)
];
const bannedDistPatterns = [
  /^review/i,
  /^template\.html$/,
  /^wireframes\.html$/,
  /^hifi\.css$/,
  /^sketch\.css$/,
  /\.jsx$/,
  /(^|\/)page_[^/]+\.jsx$/,
  /(^|\/)hifi_[^/]+\.jsx$/,
  /(^|\/)scribbles\.js$/
];
const bannedRuntimePatterns = [
  /unpkg\.com/i,
  /googleapis\.com/i,
  /gstatic\.com/i,
  /@babel\/standalone/i,
  /type=["']text\/babel["']/i,
  /\.jsx(?:\?|["'])/i
];

function fail(message) {
  throw new Error(message);
}

function rel(file) {
  return path.relative(root, file);
}

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, encoding: 'utf8' });
  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join('\n').trim();
    fail(`${command} ${args.join(' ')} failed${output ? `\n${output}` : ''}`);
  }
  return result.stdout.trim();
}

function listFiles(dir) {
  const found = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...listFiles(full));
    else found.push(full);
  }
  return found;
}

function readDist(file) {
  return fs.readFileSync(path.join(dist, file), 'utf8');
}

function stripUrlSuffix(value) {
  return value.split('#')[0].split('?')[0];
}

function assertFileExists(file) {
  const target = path.join(dist, file);
  if (!fs.existsSync(target)) fail(`missing ${rel(target)}`);
}

function metaContent(html, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`<meta ${escaped} content="([^"]+)"`).exec(html)?.[1] || '';
}

function jpegSize(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) fail('invalid JPEG marker');
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7)
      };
    }
    offset += 2 + length;
  }
  fail('JPEG size marker missing');
}

function assertRasterSize(file, expectedWidth, expectedHeight) {
  const target = path.join(dist, file);
  const buffer = fs.readFileSync(target);
  let width;
  let height;
  if (buffer.toString('ascii', 1, 4) === 'PNG') {
    width = buffer.readUInt32BE(16);
    height = buffer.readUInt32BE(20);
  } else if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    ({ width, height } = jpegSize(buffer));
  } else {
    fail(`${file} is not a supported raster image`);
  }
  if (width !== expectedWidth || height !== expectedHeight) {
    fail(`${file} has wrong dimensions: ${width}x${height}`);
  }
}

function assertHtmlMetadata(page) {
  const html = readDist(page.file);
  const title = /<title>(.*?)<\/title>/.exec(html)?.[1];
  const description = /<meta name="description" content="([^"]+)"/.exec(html)?.[1];
  const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  const expectedOgImage = `${siteOrigin}/${page.ogImage}`;
  const ogImage = metaContent(html, 'property="og:image"');
  const twitterImage = metaContent(html, 'name="twitter:image"');
  const ogWidth = metaContent(html, 'property="og:image:width"');
  const ogHeight = metaContent(html, 'property="og:image:height"');

  if (title !== page.title) fail(`${page.file} title mismatch: ${title}`);
  if (!description || description.length < 80) fail(`${page.file} has a weak meta description`);
  if (canonical !== page.canonical) fail(`${page.file} canonical mismatch: ${canonical}`);
  if (ogImage !== expectedOgImage) fail(`${page.file} og:image mismatch: ${ogImage}`);
  if (twitterImage !== expectedOgImage) fail(`${page.file} twitter:image mismatch: ${twitterImage}`);
  if (ogWidth !== '1200' || ogHeight !== '630') fail(`${page.file} OG dimensions mismatch: ${ogWidth}x${ogHeight}`);
  assertRasterSize(page.ogImage, 1200, 630);
  for (const needle of [
    'meta property="og:title"',
    'meta property="og:image"',
    'meta name="twitter:card"',
    'meta name="theme-color"',
    'meta name="color-scheme"',
    'meta name="application-name"',
    'link rel="manifest"',
    'application/ld+json'
  ]) {
    if (!html.includes(needle)) fail(`${page.file} missing ${needle}`);
  }
  for (const pattern of bannedRuntimePatterns) {
    if (pattern.test(html)) fail(`${page.file} contains banned runtime pattern ${pattern}`);
  }
}

function assertReferencedAssetsExist() {
  const htmlFiles = listFiles(dist)
    .map(file => path.relative(dist, file))
    .filter(file => file.endsWith('.html'));

  for (const file of [...htmlFiles, 'assets/fonts/fonts.css']) {
    const text = readDist(file);
    const resolvesFromRoot = /<base\s+href=["']\/["']/.test(text);
    const matches = [
      ...text.matchAll(/\b(?:href|src)="([^"]+)"/g),
      ...text.matchAll(/url\(["']?([^"')]+)["']?\)/g)
    ];
    const base = path.dirname(file);
    for (const match of matches) {
      const value = match[1];
      if (!value || /^(https?:|mailto:|tel:|#|data:)/.test(value)) continue;
      const clean = stripUrlSuffix(value);
      if (!clean || clean === '/') continue;
      const target = clean.startsWith('/')
        ? clean.slice(1)
        : resolvesFromRoot
          ? clean
        : path.posix.normalize(path.posix.join(base, clean));
      assertFileExists(target);
    }
  }
}

function assertDeployPayload() {
  for (const file of requiredFiles) assertFileExists(file);

  const clientMetadataPath = '.well-known/mcp-client.json';
  const clientMetadataUrl = `${siteOrigin}/${clientMetadataPath}`;
  const clientMetadata = JSON.parse(readDist(clientMetadataPath));
  if (clientMetadata.client_id !== clientMetadataUrl) fail('CIMD client_id must exactly match its public document URL');
  if (clientMetadata.client_name !== 'AgentWorks') fail('CIMD client_name mismatch');
  if (clientMetadata.client_uri !== `${siteOrigin}/`) fail('CIMD client_uri mismatch');
  if (clientMetadata.token_endpoint_auth_method !== 'none') fail('CIMD must describe AgentWorks as a public client');
  if (!clientMetadata.grant_types?.includes('authorization_code')) fail('CIMD authorization_code grant missing');
  if (!clientMetadata.response_types?.includes('code')) fail('CIMD code response type missing');
  for (const redirectUri of [
    'http://127.0.0.1/api/oauth/callback',
    'http://127.0.0.1:45678/api/oauth/callback',
    'https://video.realtrainingsys.com/api/oauth/callback',
    'https://confida.agentworkshq.com/api/oauth/callback',
    'https://trader.tectonicmarkets.com/api/oauth/callback'
  ]) {
    if (!clientMetadata.redirect_uris?.includes(redirectUri)) fail(`CIMD redirect URI missing: ${redirectUri}`);
  }

  const files = listFiles(dist).map(file => path.relative(dist, file));
  for (const file of files) {
    if (bannedDistPatterns.some(pattern => pattern.test(file))) {
      fail(`legacy/local-only file leaked into dist: ${file}`);
    }
  }

  const manifest = JSON.parse(readDist('site.webmanifest'));
  if (manifest.name !== 'AgentWorks') fail('manifest name mismatch');
  if (!Array.isArray(manifest.icons) || manifest.icons.length < 2) fail('manifest icons missing');
  for (const icon of manifest.icons) assertFileExists(stripUrlSuffix(icon.src).replace(/^\//, ''));

  const redirects = readDist('_redirects');
  if (!redirects.includes('/automations/:slug/ /product/ 301')) fail('legacy automation redirect missing');
  if (!redirects.includes('/how/ /product/ 301')) fail('legacy product redirect missing');
  if (!redirects.includes('/deploy/ https://github.com/manishiitg/coding-agent-loop/tree/main/deploy 301')) fail('deployment docs redirect missing');
  if (!redirects.includes('/wireframes.html / 301')) fail('wireframes redirect missing');

  const robots = readDist('robots.txt');
  for (const pathRule of ['/template.html', '/wireframes.html']) {
    if (!robots.includes(`Disallow: ${pathRule}`)) fail(`robots missing ${pathRule}`);
  }

  const llms = readDist('llms.txt');
  if (!llms.includes('# AgentWorks') || !llms.includes('https://agentworkshq.com/docs/') || !llms.includes('https://agentworkshq.com/docs/guides/') || !llms.includes('https://agentworkshq.com/docs/developers/') || !llms.includes('https://agentworkshq.com/product/') || !llms.includes('https://agentworkshq.com/agents/') || !llms.includes('https://agentworkshq.com/llms-full.txt')) {
    fail('llms.txt missing canonical AgentWorks content');
  }

  const llmsFull = readDist('llms-full.txt');
  for (const phrase of ['Complete Product and Documentation Context', 'Auto-Improvement Framework', 'Build Your First Workflow', 'Set your first goal']) {
    if (!llmsFull.includes(phrase)) fail(`llms-full.txt missing ${phrase}`);
  }

  const sitemap = readDist('sitemap.xml');
  for (const route of ['/', '/product/', '/pricing/', '/enterprise/', '/enterprise/release-quality/', '/agents/', '/solutions/shopify/', '/docs/', '/docs/guides/', '/docs/developers/', '/docs/guides/first-goal/', '/docs/getting-started/', '/docs/getting-started/first-workflow/', '/docs/workflow/auto_improvement_framework/']) {
    if (!sitemap.includes(`<loc>${siteOrigin}${route}</loc>`)) fail(`sitemap missing ${route}`);
  }
  for (const route of ['/docs/workflow/evaluation_system/', '/docs/workflow/pulse_consolidation/', '/docs/workflow/org_dashboard_design/']) {
    if (sitemap.includes(`<loc>${siteOrigin}${route}</loc>`)) fail(`sitemap leaks dropped doc ${route}`);
  }

  const docsHome = readDist('docs/index.html');
  if (!/<h1>What brings you to the docs\?<\/h1>/.test(docsHome)) fail('docs/index.html lacks the router headline');
  for (const needle of ['href="/docs/guides/"', 'href="/docs/developers/"', 'src="/docs-redirect.js']) {
    if (!docsHome.includes(needle)) fail(`docs/index.html missing ${needle}`);
  }

  for (const file of ['docs/overview/index.html', 'docs/getting-started/index.html', 'docs/getting-started/first-workflow/index.html', 'docs/workflow/auto_improvement_framework/index.html', 'docs/workflow/self_improvement_and_reporting/index.html', 'docs/guides/first-goal/index.html', 'docs/guides/slack/index.html']) {
    const html = readDist(file);
    if (!html.includes('rel="alternate" type="text/markdown"') || !html.includes('BreadcrumbList') || !/<h1>[^<]+<\/h1>/.test(html) || !html.includes('class="docs-side"') || !html.includes('On this page') || !html.includes('/analytics.js')) {
      fail(`${file} lacks static documentation chrome`);
    }
  }
  for (const file of ['docs/guides/index.html', 'docs/developers/index.html']) {
    const html = readDist(file);
    if (!html.includes('BreadcrumbList') || !/<h1>[^<]+<\/h1>/.test(html) || !html.includes('class="docs-side"')) {
      fail(`${file} lacks section-home chrome`);
    }
  }

  // Internal docs must never ship: manifest ⊆ allowlist, no internal trees.
  const publicDocs = new Set(JSON.parse(fs.readFileSync(path.join(root, 'public-docs.json'), 'utf8')).documents);
  const shippedManifest = JSON.parse(readDist('docs-content/manifest.json'));
  for (const doc of shippedManifest.documents) {
    if (!publicDocs.has(doc.path)) fail(`manifest leaks non-allowlisted doc: ${doc.path}`);
  }
  for (const dir of ['bugs', 'refactor', 'design', 'audits', 'plans']) {
    if (fs.existsSync(path.join(dist, 'docs-content', dir))) fail(`internal docs shipped: docs-content/${dir}/`);
  }

  // The public name is Auto-improve: no "pulse" anywhere in text payloads.
  const textFiles = files.filter(file => /\.(html|css|js|md|txt|xml|json|webmanifest)$/.test(file));
  for (const file of textFiles) {
    const content = fs.readFileSync(path.join(dist, file), 'utf8');
    if (/pulse/i.test(content)) fail(`forbidden term in dist/${file}`);
  }

  // Strict CSP: no inline styles in shipped HTML.
  for (const file of files.filter(file => file.endsWith('.html'))) {
    if (/\sstyle="/.test(fs.readFileSync(path.join(dist, file), 'utf8'))) {
      fail(`inline style in dist/${file}`);
    }
  }

  // No retired product names or displayed source paths in public docs.
  const docsTextFiles = textFiles.filter(file => file.startsWith('docs-content/') || file.startsWith('docs/'));
  for (const file of docsTextFiles) {
    const content = fs.readFileSync(path.join(dist, file), 'utf8');
    if (/runloop/i.test(content)) fail(`retired name in dist/${file}`);
    if (/coding agent loop/i.test(content)) fail(`retired name in dist/${file}`);
    if (/real exploit/i.test(content)) fail(`internal Browser note in dist/${file}`);
  }
  for (const file of textFiles.filter(file => file.startsWith('docs-content/') && file.endsWith('.md'))) {
    const lines = fs.readFileSync(path.join(dist, file), 'utf8').split('\n');
    for (const line of lines) {
      if (line.includes('agent_go/') && !line.includes('blob/main/agent_go/')) {
        fail(`displayed source path in dist/${file}`);
      }
    }
  }

  // No source file names in visible docs text (link targets exempt).
  for (const file of textFiles.filter(file => file.startsWith('docs-content/') && file.endsWith('.md'))) {
    const parts = fs.readFileSync(path.join(dist, file), 'utf8').split(/(https?:\/\/\S+)/g);
    for (let i = 0; i < parts.length; i += 2) {
      if (/\.go\b/.test(parts[i])) fail(`source file name in dist/${file}`);
    }
  }
  for (const file of files.filter(file => file.startsWith('docs/') && file.endsWith('.html'))) {
    const visible = fs.readFileSync(path.join(dist, file), 'utf8').replace(/(href|src)="[^"]*"/g, '');
    if (/\.go\b/.test(visible)) fail(`source file name in dist/${file}`);
  }

  // Coming-soon cards use the badge, not a title suffix.
  const guidesHome = readDist('docs/guides/index.html');
  if (guidesHome.includes('(Coming soon)')) fail('coming-soon suffix duplicated in card titles');
  if (!guidesHome.includes('class="soon"')) fail('coming-soon badges missing');

  // Docs pages share the marketing footer (Privacy/Terms/Refunds included).
  const footerOf = html => (/<footer class="site-footer">[\s\S]*?<\/footer>/.exec(html)?.[0] || '').replace(/\s+/g, ' ');
  const siteFooter = footerOf(readDist('index.html'));
  if (!siteFooter.includes('/privacy/') || !siteFooter.includes('/terms/') || !siteFooter.includes('/refunds/')) {
    fail('marketing footer lost its policy links');
  }
  for (const file of ['docs/index.html', 'docs/guides/index.html', 'docs/developers/index.html', 'docs/guides/first-goal/index.html', 'docs/getting-started/first-workflow/index.html']) {
    if (footerOf(readDist(file)) !== siteFooter) fail(`${file} footer differs from the site footer`);
  }

  const sizeBytes = listFiles(dist).reduce((sum, file) => sum + fs.statSync(file).size, 0);
  const maxBytes = 12 * 1024 * 1024;
  if (sizeBytes > maxBytes) fail(`dist payload too large: ${Math.round(sizeBytes / 1024)} KiB`);
}

function serveDist() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let target = path.join(dist, urlPath);
    if (urlPath.endsWith('/')) target = path.join(target, 'index.html');
    if (!target.startsWith(dist)) {
      res.writeHead(403);
      res.end('forbidden');
      return;
    }
    fs.stat(target, (statErr, stats) => {
      if (statErr || !stats.isFile()) {
        const notFound = path.join(dist, '404.html');
        res.writeHead(404, { 'Content-Type': 'text/html' });
        fs.createReadStream(notFound).pipe(res);
        return;
      }
      const ext = path.extname(target);
      const types = {
        '.css': 'text/css',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.md': 'text/markdown; charset=utf-8',
    '.png': 'image/png',
    '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.mp4': 'video/mp4',
        '.txt': 'text/plain',
        '.webmanifest': 'application/manifest+json',
        '.woff2': 'font/woff2',
        '.ico': 'image/x-icon'
      };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      fs.createReadStream(target).pipe(res);
    });
  });
  return new Promise(resolve => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function assertRenderedPages() {
  let chromium;
  try {
    ({ chromium } = require('playwright'));
  } catch (error) {
    fail('Playwright is required for render verification in this workspace');
  }

  const server = await serveDist();
  const port = server.address().port;
  const homeProductImages = new Set(
    [...readDist('index.html').matchAll(/(?:src|href)="(assets\/product\/[^"?#]+)/g)].map(match => match[1])
  );
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });

  try {
    for (const expected of pageExpectations) {
      for (const viewport of renderViewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      const consoleErrors = [];
      const failedRequests = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('requestfailed', req => {
        const error = req.failure()?.errorText || '';
        // Browsers abort in-flight video range requests when the page closes; that is not a broken asset.
        if (/\.(mp4|webm)(\?|$)/.test(req.url()) && error.includes('ERR_ABORTED')) return;
        failedRequests.push(`${req.url()} ${error}`);
      });
      const response = await page.goto(`http://127.0.0.1:${port}${expected.route}`, { waitUntil: 'networkidle' });
      if (response?.status() !== 200) fail(`${expected.name} returned ${response?.status()}`);
      const metrics = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelector('h1')?.textContent || '',
        overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth + 2,
        manifest: document.querySelector('link[rel="manifest"]')?.getAttribute('href') || '',
        productDetailImages: [...document.querySelectorAll('.mk-product-detail img')]
          .map(image => image.getAttribute('src'))
          .filter(Boolean),
        oldRuntimeScripts: [...document.scripts].map(script => script.src || 'inline').filter(src => /unpkg|babel|googleapis|\.jsx/.test(src)),
        mediaIssues: [...document.querySelectorAll('img, video')].flatMap((el, i) => {
          const tag = el.tagName.toLowerCase();
          const width = el.getAttribute('width');
          const height = el.getAttribute('height');
          const src = el.getAttribute('src') || el.querySelector?.('source')?.getAttribute('src') || '';
          const rect = el.getBoundingClientRect();
          const isInViewport = rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
          const issues = [];
          const label = `${tag}[${i}] ${src || el.getAttribute('poster') || ''}`.trim();
          if (!width || !height) issues.push(`${label} missing intrinsic dimensions`);
          if (tag === 'img') {
            if (!el.hasAttribute('alt')) issues.push(`${label} missing alt attribute`);
            if (isInViewport && (!el.complete || el.naturalWidth === 0)) issues.push(`${label} visible image did not load`);
          }
          if (tag === 'video') {
            if (!el.getAttribute('aria-label')) issues.push(`${label} missing aria-label`);
            if (!el.getAttribute('poster')) issues.push(`${label} missing poster`);
          }
          return issues;
        }),
        tallSections: [...document.querySelectorAll('header, section, footer')]
          .map((el, i) => ({
            i,
            className: String(el.className || ''),
            height: Math.round(el.getBoundingClientRect().height),
            text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 80)
          }))
          .filter(section => section.height > 0 && section.height > innerHeight * 1.15)
      }));
      await page.close();
      const label = `${expected.name} ${viewport.name}`;
      if (metrics.title !== expected.title) fail(`${label} rendered title mismatch`);
      if (metrics.h1 !== expected.h1) fail(`${label} rendered h1 mismatch`);
      if (metrics.overflow) fail(`${label} has page-level horizontal overflow`);
      if (metrics.manifest !== '/site.webmanifest') fail(`${label} manifest link mismatch: ${metrics.manifest}`);
      if (expected.name === 'how') {
        if (metrics.productDetailImages.length < 6) fail(`${label} needs at least six Product detail screenshots`);
        const repeatedHomeImages = metrics.productDetailImages.filter(src => homeProductImages.has(stripUrlSuffix(src)));
        if (repeatedHomeImages.length) {
          fail(`${label} repeats homepage screenshots: ${repeatedHomeImages.join(', ')}`);
        }
      }
      if (metrics.mediaIssues.length) fail(`${label} media issues:\n${metrics.mediaIssues.join('\n')}`);
      if (!expected.allowTallSections && metrics.tallSections.length) {
        const details = metrics.tallSections.map(section =>
          `${section.i}:${section.className}:${section.height}px:${section.text}`
        ).join('\n');
        fail(`${label} has oversized sections:\n${details}`);
      }
      if (metrics.oldRuntimeScripts.length) fail(`${label} loaded legacy runtime scripts: ${metrics.oldRuntimeScripts.join(', ')}`);
      if (consoleErrors.length) fail(`${label} console errors:\n${consoleErrors.join('\n')}`);
      if (failedRequests.length) fail(`${label} failed requests:\n${failedRequests.join('\n')}`);
      }
    }
    const docsArticleRoutes = [
      { route: '/docs/getting-started/first-workflow/', h1: 'Build Your First Workflow', name: 'dev article' },
      { route: '/docs/guides/slack/', h1: 'Talk to your crew in Slack', name: 'guide article' },
      { route: '/docs/developers/', h1: 'Building and self-hosting', name: 'developers home' }
    ];
    for (const viewport of docsReaderViewports) {
      for (const article of docsArticleRoutes) {
        const articlePage = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
        const consoleErrors = [];
        const failedRequests = [];
        articlePage.on('console', msg => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        articlePage.on('requestfailed', req => {
          failedRequests.push(`${req.url()} ${req.failure()?.errorText || ''}`);
        });
        const articleResponse = await articlePage.goto(
          `http://127.0.0.1:${port}${article.route}`,
          { waitUntil: 'networkidle' }
        );
        if (articleResponse?.status() !== 200) fail(`docs ${article.name} ${viewport.name} returned ${articleResponse?.status()}`);
        const articleMetrics = await articlePage.evaluate(() => ({
          title: document.title,
          h1: document.querySelector('.docs-article h1')?.textContent || '',
          overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth + 2,
          sidebar: Boolean(document.querySelector('.docs-side, .docs-nav-drop')),
          sidebarScroll: getComputedStyle(document.querySelector('.docs-side')).overflowY,
          listStyles: [...document.querySelectorAll('.docs-article ol')].map(ol => getComputedStyle(ol).listStyleType),
          footer: document.querySelector('.site-footer a[href="/privacy/"]')?.getAttribute('href') || '',
          mediaIssues: [...document.querySelectorAll('.docs-article img')].flatMap((el, i) => {
            const issues = [];
            const label = `img[${i}] ${el.getAttribute('src') || ''}`.trim();
            if (!el.getAttribute('width') || !el.getAttribute('height')) issues.push(`${label} missing intrinsic dimensions`);
            if (!el.hasAttribute('alt')) issues.push(`${label} missing alt attribute`);
            if (el.getBoundingClientRect().width > 0 && (!el.complete || el.naturalWidth === 0)) issues.push(`${label} image did not load`);
            return issues;
          })
        }));
        await articlePage.close();
        const articleLabel = `docs ${article.name} ${viewport.name}`;
        if (articleMetrics.h1 !== article.h1) fail(`${articleLabel} rendered h1 mismatch: ${articleMetrics.h1}`);
        if (!articleMetrics.title.includes(article.h1)) fail(`${articleLabel} rendered title mismatch`);
        if (articleMetrics.overflow) fail(`${articleLabel} has page-level horizontal overflow`);
        if (!articleMetrics.sidebar) fail(`${articleLabel} lacks docs navigation`);
        if (articleMetrics.sidebarScroll !== 'visible') fail(`${articleLabel} sidebar hides content in internal scroll`);
        if (articleMetrics.listStyles.some(style => style === 'none')) fail(`${articleLabel} hides ordered-list numbering`);
        if (articleMetrics.footer !== '/privacy/') fail(`${articleLabel} lacks the site footer`);
        if (articleMetrics.mediaIssues.length) fail(`${articleLabel} media issues:\n${articleMetrics.mediaIssues.join('\n')}`);
        if (consoleErrors.length) fail(`${articleLabel} console errors:\n${consoleErrors.join('\n')}`);
        if (failedRequests.length) fail(`${articleLabel} failed requests:\n${failedRequests.join('\n')}`);
      }
      // Legacy ?doc= reader URLs redirect to the static article.
      const redirectPage = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      await redirectPage.goto(`http://127.0.0.1:${port}/docs/?doc=getting-started%2Ffirst-workflow`, { waitUntil: 'networkidle' });
      const redirectUrl = new URL(redirectPage.url());
      await redirectPage.close();
      if (redirectUrl.pathname !== '/docs/getting-started/first-workflow/') {
        fail(`docs redirect ${viewport.name} landed on ${redirectUrl.pathname}`);
      }
    }
    // No horizontal scroll at 390px on any docs page.
    const docsDir = path.join(dist, 'docs');
    const docsRoutes = listFiles(docsDir)
      .filter(file => path.basename(file) === 'index.html')
      .map(file => `/${path.relative(dist, path.dirname(file))}/`);
    for (const route of docsRoutes) {
      const narrowPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
      await narrowPage.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'networkidle' });
      const narrowOverflow = await narrowPage.evaluate(
        () => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth + 2
      );
      await narrowPage.close();
      if (narrowOverflow) fail(`docs route ${route} has page-level horizontal overflow at 390px`);
    }
    // Internal docs stay unpublished: the leaked URL from the incident must 404.
    const leakPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const leakResponse = await leakPage.goto(`http://127.0.0.1:${port}/docs-content/bugs/uvx_cache_bloat_latest_versions.md`, { waitUntil: 'networkidle' });
    await leakPage.close();
    if (leakResponse?.status() !== 404) fail(`internal doc returned ${leakResponse?.status()}, want 404`);
    const missingPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const missingResponse = await missingPage.goto(`http://127.0.0.1:${port}/missing-runloop-page`, { waitUntil: 'networkidle' });
    if (missingResponse?.status() !== 404) fail(`missing route returned ${missingResponse?.status()}`);
    const missingMetrics = await missingPage.evaluate(() => ({
      title: document.title,
      h1: document.querySelector('h1')?.textContent || '',
      manifest: document.querySelector('link[rel="manifest"]')?.getAttribute('href') || ''
    }));
    await missingPage.close();
    if (missingMetrics.title !== 'Page Not Found - AgentWorks') fail('missing route rendered wrong title');
    if (missingMetrics.h1 !== "This page isn't here. Your goals still are.") fail('missing route rendered wrong h1');
    if (missingMetrics.manifest !== '/site.webmanifest') fail('missing route manifest link mismatch');
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

async function main() {
  run(process.execPath, ['--check', 'runloop_site.js']);
  run(process.execPath, ['--check', 'docs-redirect.js']);
  run(process.execPath, ['--check', 'scripts/sync-product-docs.js']);
  run(process.execPath, ['--check', 'scripts/generate-agent-content.js']);
  run('bash', ['scripts/prepare-deploy.sh']);
  assertDeployPayload();
  for (const page of pageExpectations) assertHtmlMetadata(page);
  assertReferencedAssetsExist();
  await assertRenderedPages();
  console.log('verify-dist: ok');
}

main().catch(error => {
  console.error(`verify-dist: ${error.message}`);
  process.exit(1);
});
