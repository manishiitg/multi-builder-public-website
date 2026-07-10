#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'assets', 'og');

const cards = [
  {
    file: 'agentworks-home-og.jpg',
    label: 'AGENT FLEET CONTROL PLANE',
    title: 'Run 100+ agents without 100 terminals.',
    copy: 'Plan work, route the right worker, attach evidence, measure with Pulse, and promote reusable skills.',
    image: 'org-dashboard-scale.png',
    chips: ['Claude Code', 'Codex CLI', 'Cursor', 'MCP tools']
  },
  {
    file: 'agentworks-how-og.jpg',
    label: 'OPERATING LOOP',
    title: 'Give every agent run an operating loop.',
    copy: 'Turn agent work into durable records with goals, workers, evidence, Pulse, costs, approvals, and reusable skills.',
    image: 'org-pulse.png',
    chips: ['Plan', 'Run', 'Measure', 'Improve']
  },
  {
    file: 'agentworks-use-cases-og.jpg',
    label: 'USE CASES',
    title: 'Use AgentWorks when agent work becomes operations.',
    copy: 'Manage research, trading, build-in-public, client operations, and browser workflows from one product surface.',
    image: 'trading-plan-laptop.png',
    chips: ['Research', 'Finance', 'Content', 'Operations']
  },
  {
    file: 'agentworks-updates-og.jpg',
    label: 'RELEASE PROOF',
    title: 'Shipping proof for the agent operating loop.',
    copy: 'Follow real product progress across Pulse, auto improve, terminal agents, reporting, and workflow evidence.',
    image: 'workflow-pulse.png',
    chips: ['Pulse', 'Auto Improve', 'Reports', 'Skills']
  },
  {
    file: 'agentworks-docs-og.jpg',
    label: 'DOCS',
    title: 'Start with one operating loop.',
    copy: 'Install AgentWorks, understand the runtime, wire tools and secrets, then scale reusable skills across workflows.',
    image: 'global-skills.png',
    chips: ['Install', 'Architecture', 'MCP', 'Skills']
  },
  {
    file: 'agentworks-404-og.jpg',
    label: 'RUN NOT FOUND',
    title: 'This run does not have a page.',
    copy: 'Go back to the AgentWorks control plane, docs, releases, or the open-source repository.',
    image: 'model-catalog.png',
    chips: ['Home', 'Docs', 'GitHub', 'Install']
  }
];

function assetUrl(relativePath) {
  return pathToFileURL(path.join(root, relativePath)).href;
}

function assetDataUrl(relativePath) {
  const fullPath = path.join(root, relativePath);
  const ext = path.extname(fullPath).toLowerCase();
  const mime = ext === '.png'
    ? 'image/png'
    : ext === '.jpg' || ext === '.jpeg'
      ? 'image/jpeg'
      : ext === '.svg'
        ? 'image/svg+xml'
        : 'application/octet-stream';
  return `data:${mime};base64,${fs.readFileSync(fullPath).toString('base64')}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function htmlForCard(card) {
  const imageUrl = assetDataUrl(path.join('assets', 'product', card.image));
  const brandLogoUrl = assetDataUrl(path.join('assets', 'brand', 'agentworks-logo.svg'));
  const fontSans = assetUrl(path.join('assets', 'fonts', 'space-grotesk-latin.woff2'));
  const fontMono = assetUrl(path.join('assets', 'fonts', 'jetbrains-mono-latin.woff2'));
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
@font-face {
  font-family: "Space Grotesk";
  src: url("${fontSans}") format("woff2");
  font-weight: 400 700;
}
@font-face {
  font-family: "JetBrains Mono";
  src: url("${fontMono}") format("woff2");
  font-weight: 400 700;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  width: 1200px;
  height: 630px;
  overflow: hidden;
  font-family: "Space Grotesk", system-ui, sans-serif;
  color: #d4d4d4;
  background:
    linear-gradient(rgba(255, 255, 255, 0.026) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
    linear-gradient(180deg, #2a2a2b 0, #232324 44%, #1e1e1e 100%);
  background-size: 42px 42px, 42px 42px, auto;
}
.card {
  position: relative;
  width: 1200px;
  height: 630px;
  padding: 54px 62px;
}
.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(63, 143, 184, 0.16), transparent 36%),
    linear-gradient(315deg, rgba(78, 201, 176, 0.07), transparent 32%);
  pointer-events: none;
}
.brand {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 14px;
  color: #f5f5f5;
  font-size: 20px;
  font-weight: 700;
}
.mark {
  width: 38px;
  height: 38px;
  display: block;
  border-radius: 10px;
}
.layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 478px 1fr;
  gap: 42px;
  align-items: end;
  height: calc(100% - 42px);
}
.copy {
  padding-bottom: 20px;
}
.label {
  margin-bottom: 20px;
  color: #79d6ff;
  font-family: "JetBrains Mono", monospace;
  font-size: 14px;
  letter-spacing: 0;
  text-transform: uppercase;
}
h1 {
  margin: 0;
  color: #f4f4f5;
  font-size: 58px;
  line-height: 0.96;
  letter-spacing: 0;
}
p {
  width: 438px;
  margin: 24px 0 0;
  color: #bdbdbd;
  font-size: 22px;
  line-height: 1.34;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}
.chips span {
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  padding: 0 13px;
  border: 1px solid rgba(121, 214, 255, 0.34);
  border-radius: 8px;
  background: rgba(63, 143, 184, 0.15);
  color: #dff5ff;
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
}
.visual {
  position: relative;
  align-self: center;
  min-height: 384px;
  border: 1px solid rgba(78, 78, 78, 0.9);
  border-radius: 12px;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(45, 45, 45, 0.94), rgba(37, 37, 38, 0.98)),
    #252526;
  box-shadow: 0 28px 82px rgba(0, 0, 0, 0.46);
}
.visual::after {
  content: "AgentWorks";
  position: absolute;
  left: 16px;
  top: 54px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  border: 1px solid rgba(121, 214, 255, 0.32);
  border-radius: 8px;
  background: rgba(20, 20, 21, 0.94);
  color: #e8f7ff;
  font-size: 14px;
  font-weight: 700;
}
.chrome {
  height: 42px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(60, 60, 60, 0.9);
  color: #79d6ff;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background: #f44747; }
.dot.amber { background: #ce9178; }
.dot.blue { background: #3f8fb8; margin-right: 10px; }
.shot {
  width: 100%;
  height: 342px;
  object-fit: cover;
  object-position: top left;
  filter: brightness(1.08) contrast(1.06);
}
</style>
</head>
<body>
  <main class="card">
    <div class="brand"><img class="mark" src="${brandLogoUrl}" alt=""><span>AgentWorks</span></div>
    <section class="layout">
      <div class="copy">
        <div class="label">${escapeHtml(card.label)}</div>
        <h1>${escapeHtml(card.title)}</h1>
        <p>${escapeHtml(card.copy)}</p>
        <div class="chips">${card.chips.map(chip => `<span>${escapeHtml(chip)}</span>`).join('')}</div>
      </div>
      <div class="visual">
        <div class="chrome"><span class="dot red"></span><span class="dot amber"></span><span class="dot blue"></span>agentworks / ${escapeHtml(card.label.toLowerCase())}</div>
        <img class="shot" src="${imageUrl}" alt="">
      </div>
    </section>
  </main>
</body>
</html>`;
}

async function main() {
  let chromium;
  try {
    ({ chromium } = require('playwright'));
  } catch (error) {
    throw new Error('Playwright is required to generate OG images');
  }

  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true
  });
  try {
    for (const card of cards) {
      const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
      await page.setContent(htmlForCard(card), { waitUntil: 'networkidle' });
      const brokenImages = await page.evaluate(() => [...document.images].filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src.slice(0, 80)));
      if (brokenImages.length) {
        throw new Error(`${card.file} has broken images: ${brokenImages.join(', ')}`);
      }
      await page.screenshot({ path: path.join(outDir, card.file), type: 'jpeg', quality: 88, fullPage: false });
      await page.close();
      console.log(`generated assets/og/${card.file}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
