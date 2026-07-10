#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const siteRoot = path.resolve(__dirname, '..');
const outputRoot = path.join(siteRoot, 'docs-content');
const sourceCandidates = [
  process.env.AGENTWORKS_DOCS_SOURCE,
  path.resolve(siteRoot, '..', 'mcp-agent-builder-go', 'docs')
].filter(Boolean);
const sourceRoot = sourceCandidates.find(candidate => fs.existsSync(candidate));
const optional = process.argv.includes('--if-available');

if (!sourceRoot) {
  if (optional && fs.existsSync(path.join(outputRoot, 'manifest.json'))) {
    console.log('sync-product-docs: using committed documentation snapshot');
    process.exit(0);
  }
  console.error(`sync-product-docs: documentation source not found (${sourceCandidates.join(', ')})`);
  process.exit(1);
}

const markdownFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    if (entry.isFile() && entry.name.endsWith('.md') && !entry.name.endsWith('.local.md')) {
      markdownFiles.push(fullPath);
    }
  }
}

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function firstHeading(content, fallback) {
  const match = /^#\s+(.+)$/m.exec(content);
  return match ? match[1].replace(/[`*_]/g, '').trim() : fallback;
}

function copyReferencedAssets(content, markdownFile) {
  const references = [
    ...content.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g),
    ...content.matchAll(/<img\s+[^>]*src=["']([^"']+)["']/gi)
  ];

  for (const match of references) {
    const target = match[1].split('#')[0].split('?')[0];
    if (!target || /^(?:https?:|data:|\/)/i.test(target)) continue;
    const resolved = path.resolve(path.dirname(markdownFile), decodeURIComponent(target));
    if (!resolved.startsWith(sourceRoot + path.sep) || !fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) continue;
    const relative = path.relative(sourceRoot, resolved);
    copyFile(resolved, path.join(outputRoot, relative));
  }
}

walk(sourceRoot);
markdownFiles.sort();

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

const documents = markdownFiles.map(file => {
  const relative = path.relative(sourceRoot, file).split(path.sep).join('/');
  const content = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '');
  fs.mkdirSync(path.dirname(path.join(outputRoot, relative)), { recursive: true });
  fs.writeFileSync(path.join(outputRoot, relative), content);
  copyReferencedAssets(content, file);
  return {
    path: relative.replace(/\.md$/, ''),
    title: firstHeading(content, path.basename(relative, '.md')),
    section: relative.includes('/') ? relative.split('/')[0] : 'overview'
  };
});

fs.writeFileSync(
  path.join(outputRoot, 'manifest.json'),
  `${JSON.stringify({ schemaVersion: 1, documents }, null, 2)}\n`
);

console.log(`sync-product-docs: copied ${documents.length} Markdown files from ${sourceRoot}`);
