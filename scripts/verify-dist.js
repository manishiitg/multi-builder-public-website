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
  'how/index.html',
  'use-cases/index.html',
  'updates/index.html',
  'docs/index.html',
  'runloop.css',
  'runloop_site.js',
  'secondary.css',
  'workforce.css',
  'workforce.js',
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
  'assets/brand/agentworks-logo.svg',
  'assets/vendor/react-18.3.1/react.production.min.js',
  'assets/vendor/react-18.3.1/react-dom.production.min.js',
  'assets/vendor/marked-18.0.6/marked.umd.js',
  'assets/vendor/dompurify-3.4.11/purify.min.js',
  'docs-content/manifest.json',
  'docs-content/getting-started/README.md',
  'docs-content/getting-started/first-workflow.md',
  'docs/overview/index.html',
  'docs/getting-started/first-workflow/index.html',
  'docs/workflow/auto_improvement_framework/index.html',
  'assets/fonts/fonts.css',
  'assets/og/agentworks-home-og.jpg',
  'assets/og/agentworks-how-og.jpg',
  'assets/og/agentworks-use-cases-og.jpg',
  'assets/og/agentworks-updates-og.jpg',
  'assets/og/agentworks-docs-og.jpg',
  'assets/og/agentworks-404-og.jpg'
];
const pageExpectations = [
  {
    name: 'home',
    file: 'index.html',
    route: '/index.html',
    title: 'AgentWorks - Run Your Company with an AI Workforce',
    h1: 'Run your company with an AI workforce.',
    canonical: 'https://agentworkshq.com/',
    ogImage: 'assets/og/agentworks-home-og.jpg'
  },
  {
    name: 'how',
    file: 'how/index.html',
    route: '/how/',
    title: 'AgentWorks Product - Operating Loop for AI Workflows',
    h1: 'The agent stops. The workflow should keep improving.',
    canonical: 'https://agentworkshq.com/how/',
    ogImage: 'assets/og/agentworks-how-og.jpg'
  },
  {
    name: 'usecases',
    file: 'use-cases/index.html',
    route: '/use-cases/',
    title: 'AgentWorks Use Cases - AI Workflows Across Your Company',
    h1: 'One AI workforce. Every function.',
    canonical: 'https://agentworkshq.com/use-cases/',
    ogImage: 'assets/og/agentworks-use-cases-og.jpg'
  },
  {
    name: 'updates',
    file: 'updates/index.html',
    route: '/updates/',
    title: 'AgentWorks Updates - Shipping the Agent Operating Loop',
    h1: 'Shipping proof for the agent operating loop.',
    canonical: 'https://agentworkshq.com/updates/',
    ogImage: 'assets/og/agentworks-updates-og.jpg'
  },
  {
    name: 'docs',
    file: 'docs/index.html',
    route: '/docs/',
    title: 'AgentWorks Docs - Build and Operate AI Workflows',
    h1: 'Build and operate your first workflow.',
    canonical: 'https://agentworkshq.com/docs/',
    ogImage: 'assets/og/agentworks-docs-og.jpg'
  },
  {
    name: 'notfound',
    file: '404.html',
    route: '/404.html',
    title: 'Page Not Found - AgentWorks',
    h1: 'This run does not have a page.',
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
  const siteJs = fs.readFileSync(path.join(root, 'runloop_site.js'), 'utf8');
  for (const match of siteJs.matchAll(/(?:productAsset|videoAsset|posterAsset)\('([^']+)'\)/g)) {
    assertFileExists(`assets/product/${match[1]}`);
  }

  for (const file of ['index.html', '404.html', 'how/index.html', 'use-cases/index.html', 'updates/index.html', 'docs/index.html', 'assets/fonts/fonts.css']) {
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
  if (!redirects.includes('/automations/:slug/ /how/ 301')) fail('legacy automation redirect missing');
  if (!redirects.includes('/deploy/ https://github.com/manishiitg/coding-agent-loop/tree/main/deploy 301')) fail('deployment docs redirect missing');
  if (!redirects.includes('/wireframes.html / 301')) fail('wireframes redirect missing');

  const robots = readDist('robots.txt');
  for (const pathRule of ['/template.html', '/wireframes.html']) {
    if (!robots.includes(`Disallow: ${pathRule}`)) fail(`robots missing ${pathRule}`);
  }

  const llms = readDist('llms.txt');
  if (!llms.includes('# AgentWorks') || !llms.includes('https://agentworkshq.com/docs/') || !llms.includes('https://agentworkshq.com/use-cases/') || !llms.includes('https://agentworkshq.com/updates/') || !llms.includes('https://agentworkshq.com/llms-full.txt')) {
    fail('llms.txt missing canonical AgentWorks content');
  }

  const llmsFull = readDist('llms-full.txt');
  for (const phrase of ['Complete Product and Documentation Context', 'Auto-Improvement Framework', 'Build Your First Workflow']) {
    if (!llmsFull.includes(phrase)) fail(`llms-full.txt missing ${phrase}`);
  }

  const sitemap = readDist('sitemap.xml');
  for (const route of ['/', '/how/', '/docs/', '/docs/getting-started/first-workflow/', '/docs/workflow/auto_improvement_framework/']) {
    if (!sitemap.includes(`<loc>${siteOrigin}${route}</loc>`)) fail(`sitemap missing ${route}`);
  }

  for (const file of ['how/index.html', 'use-cases/index.html', 'updates/index.html', 'docs/index.html']) {
    const html = readDist(file);
    if (!/<div id="root"[^>]*>[\s\S]*<h1>/.test(html)) fail(`${file} lacks initial agent-readable content`);
  }

  for (const file of ['docs/overview/index.html', 'docs/getting-started/first-workflow/index.html', 'docs/workflow/auto_improvement_framework/index.html']) {
    const html = readDist(file);
    if (!html.includes('rel="alternate" type="text/markdown"') || !html.includes('BreadcrumbList') || !/<h1>[^<]+<\/h1>/.test(html)) {
      fail(`${file} lacks static documentation metadata`);
    }
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
        failedRequests.push(`${req.url()} ${req.failure()?.errorText || ''}`);
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
      if (expected.name !== 'home' && metrics.tallSections.length) {
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
    for (const viewport of docsReaderViewports) {
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
        `http://127.0.0.1:${port}/docs/?doc=getting-started%2Ffirst-workflow`,
        { waitUntil: 'networkidle' }
      );
      if (articleResponse?.status() !== 200) fail(`docs article ${viewport.name} returned ${articleResponse?.status()}`);
      const articleMetrics = await articlePage.evaluate(() => ({
        title: document.title,
        h1: document.querySelector('.mk-doc-markdown h1')?.textContent || '',
        overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) > innerWidth + 2,
        internalLinks: [...document.querySelectorAll('.mk-doc-markdown a[href*="?doc="]')].map(link => link.getAttribute('href')),
        markdownPresent: Boolean(document.querySelector('.mk-doc-markdown')),
        loadingPresent: Boolean(document.querySelector('.mk-doc-loading')),
        errorPresent: Boolean(document.querySelector('.mk-doc-error'))
      }));
      await articlePage.close();
      const articleLabel = `docs article ${viewport.name}`;
      if (!articleMetrics.markdownPresent || articleMetrics.loadingPresent || articleMetrics.errorPresent) {
        fail(`${articleLabel} did not render the Markdown document`);
      }
      if (articleMetrics.h1 !== 'Build Your First Workflow') fail(`${articleLabel} rendered h1 mismatch`);
      if (!articleMetrics.title.includes('Build Your First Workflow')) fail(`${articleLabel} rendered title mismatch`);
      if (articleMetrics.overflow) fail(`${articleLabel} has page-level horizontal overflow`);
      if (!articleMetrics.internalLinks.length) fail(`${articleLabel} did not rewrite relative documentation links`);
      if (consoleErrors.length) fail(`${articleLabel} console errors:\n${consoleErrors.join('\n')}`);
      if (failedRequests.length) fail(`${articleLabel} failed requests:\n${failedRequests.join('\n')}`);
    }
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
    if (missingMetrics.h1 !== 'This run does not have a page.') fail('missing route rendered wrong h1');
    if (missingMetrics.manifest !== '/site.webmanifest') fail('missing route manifest link mismatch');
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

async function main() {
  run(process.execPath, ['--check', 'runloop_site.js']);
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
