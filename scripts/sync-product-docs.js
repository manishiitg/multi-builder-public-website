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

// Public allowlist: only these product docs are published. Everything else
// (bugs/, refactor/, design/, audits/, plans, internals) stays out of
// docs-content/, manifest.json, and dist/. Never edit the product repo;
// filter and scrub on the website side only.
const allowed = new Set(
  JSON.parse(fs.readFileSync(path.join(siteRoot, 'public-docs.json'), 'utf8')).documents
);

// Docs that used to be public. References to them are repaired so no link 404s.
const droppedFiles = ['evaluation_system.md', 'pulse_consolidation.md'];

function firstHeading(content, fallback) {
  const match = /^#\s+(.+)$/m.exec(content);
  return match ? match[1].replace(/[`*_]/g, '').trim() : fallback;
}

function scrubIdentifiers(text) {
  // `pulse_llm` is still the on-disk config key, but the product accepts the
  // legacy `auto_improve_llm` spelling on load (NormalizePresetLLMConfig) and
  // normalizes it — so the public docs use the public name with a working key.
  // TODO(product): rename pulse_llm to a public name; then drop this mapping.
  let out = text.split('pulse_llm').join('auto_improve_llm');
  // Keep the migration note consistent with the public key name above.
  out = out.split('old `phase_llm`, `auto_improve_llm`, and `llm_allocation_mode` fields').join('old `phase_llm` and `llm_allocation_mode` fields');
  // Trim the historical tool-name parenthetical (past-tense bug note; the
  // internal tool names add nothing for public readers).
  out = out.split(' (`get_pulse_module_state`, `record_pulse_worklist`, `mark_pulse_module_result`)').join('');
  return out;
}

function scrubPulse(text) {
  // Public name is "Auto-improve", never "Pulse" — including code spans and
  // internal file names (docs are not compiled, so renames are safe here).
  // Only http(s) URLs are left untouched so links keep working.
  return text.split(/(https?:\/\/\S+)/g).map((part, i) => {
    if (i % 2 === 1) return part;
    return part
      .replace(/org-pulse/g, 'org-journal')
      .replace(/pulse-card/g, 'improve-card')
      .replace(/post-Pulse/g, 'post-check')
      .replace(/post-pulse/g, 'post-check')
      .replace(/Pulse-off/g, 'Auto-improve-off')
      .replace(/Pulse-log/g, 'Auto-improve-log')
      .replace(/PulseView/g, 'AutoImproveView')
      .replace(/runPulse/g, 'runAutoImprove')
      .replace(/pulse\//g, 'improve/')
      .replace(/\bPulses\b/g, 'Auto-improves')
      .replace(/\bPulse\b/g, 'Auto-improve')
      .replace(/\bpulse\b/g, 'auto-improve');
  }).join('');
}

const repoBlob = 'https://github.com/manishiitg/coding-agent-loop/blob/main';

function scrubSourcePaths(text) {
  // Repo-escape links keep working by pointing at the public repo, with the
  // file name (not the full source path) as link text.
  let out = text.replace(/\[([^\]]*?)\]\(\.\.\/\.\.\/((?:agent_go|frontend)\/[^)\s]+)\)/g, (match, linkText, repoPath) => {
    const code = linkText.startsWith('`') && linkText.endsWith('`');
    const inner = code ? linkText.slice(1, -1) : linkText;
    const short = inner.includes('/') ? repoPath.split('/').pop().split('#')[0] : inner;
    return `[${code ? `\`${short}\`` : short}](${repoBlob}/${repoPath})`;
  });
  // Displayed source paths shrink to file names. http(s) URLs (including the
  // GitHub links above) are never rewritten.
  out = out.split(/(https?:\/\/\S+)/g).map((part, i) => {
    if (i % 2 === 1) return part;
    return part.replace(/(?:coding-agent-loop\/)?((?:agent_go|frontend|mcpagent)\/[\w.%-]+(?:\/[\w.%-]+)*)\/?/g, (match, repoPath) => {
      const segments = repoPath.split('/').filter(Boolean);
      return segments[segments.length - 1];
    });
  }).join('');
  return out;
}

const goTokenPhrases = [
  ['controller_agent_factory', 'the agent factory'],
  ['controller_learning_detection', 'the learning detection'],
  ['controller_execution', 'the execution controller'],
  ['controller_learning', 'the learning controller'],
  ['controller_progress', 'the progress controller'],
  ['controller_todo_task', 'the todo-task controller'],
  ['interactive_workshop_manager', 'the workshop manager'],
  ['auto_improvement_endpoints', 'the auto-improve endpoints'],
  ['web_simulator_connector', 'the web simulator connector'],
  ['bot_simulator_routes', 'the simulator API routes'],
  ['bot_event_adapter', 'the bot event adapter'],
  ['bot_session_starter', 'the bot session starter'],
  ['bot_event_filter', 'the bot event filter'],
  ['bot_config_routes', 'the bot config routes'],
  ['bot_connector', 'the bot connector'],
  ['bot_routes', 'the bot API routes'],
  ['base_orchestrator_feedback', 'the orchestrator feedback helpers'],
  ['base_orchestrator_tokens', 'the orchestrator token store'],
  ['base_orchestrator_types', 'the orchestrator types'],
  ['context_aware_bridge', 'the context-aware bridge'],
  ['workflow_manifest_routes', 'the manifest routes'],
  ['human_feedback_store', 'the human-feedback store'],
  ['code_execution_tools', 'the code-execution tools'],
  ['coding_agents_bridge', 'the coding-agents bridge'],
  ['toolset_invariant_test', 'the toolset invariant test'],
  ['builtin_browser_skills', 'the built-in browser skills'],
  ['scheduler_config_store', 'the scheduler config store'],
  ['product_schedules', 'the schedule runner'],
  ['builtin_schedules', 'built-in schedules'],
  ['skills_integration', 'the skills integration'],
  ['schedule_runs', 'the schedule runs'],
  ['token_usage_store', 'the token usage store'],
  ['scheduler_routes', 'the scheduler routes'],
  ['runtime_loader', 'the skills runtime loader'],
  ['memory_tools', 'memory tools'],
  ['learning_agent', 'the learning agent'],
  ['tiered_llm', 'the tier-resolution code'],
  ['registry', 'the codeexec registry'],
  ['cost_storage', 'the cost store'],
  ['pre_validation', 'pre-validation'],
  ['tool_filter', 'the tool filter'],
  ['human_tools', 'human tools'],
  ['gmail_service', 'the Gmail service'],
  ['llm_agent', 'the agent wrapper'],
  ['final_output', 'final output'],
  ['workflow_events', 'workflow events'],
  ['controller', 'the controller'],
  ['scheduler', 'the scheduler'],
  ['workflow', 'the workflow runner'],
  ['server', 'the server']
];

function scrubFileNames(text) {
  // File-pointer lines become a single GitHub link, or are dropped.
  let out = text.split('\n').map(line => {
    if (!/^\*\*Files?:?\*\*:?/.test(line) || !/\.go\b/.test(line)) return line;
    const url = /https?:\/\/[^)\s]+/.exec(line)?.[0];
    if (!url) return null;
    const rest = line.slice(line.indexOf(url) + url.length).replace(/^[)\s]+/, '');
    return `Source: [view on GitHub](${url})${rest ? ` — ${rest.replace(/^-\s*/, '')}` : ''}`;
  }).filter(line => line !== null).join('\n');
  // Linked file names become a generic source link (descriptive link text stays).
  out = out.replace(/\[`?([^\]`]*?\.go(?::[\d,-]+)?)`?\]\((https?:\/\/[^)\s]+)\)/g, '[source]($2)');
  // Bare file names become plain phrases. URLs are never rewritten.
  out = out.split(/(https?:\/\/\S+)/g).map((part, i) => {
    if (i % 2 === 1) return part;
    let segment = part.replace(/^([├└│─\s]+)([\w.-]+)\.go(\s+#)/gm, '$1$2$3');
    for (const [token, phrase] of goTokenPhrases) {
      segment = segment.replace(new RegExp(`\`?(?:[\\w.%-]+\\/)*\\b${token}\\.go\\b\`?`, 'g'), phrase);
    }
    segment = segment.replace(/`?((?:[\w.%${}-]+\/)*)([\w.%${}-]+)\.go\b`?/g, '$2');
    return segment;
  }).join('');
  return out;
}

function scrubPublicMarkdown(content, docPath) {
  let out = content;

  // Old product names predate the AgentWorks rename.
  out = out.replace(/Coding Agent Loop/g, 'AgentWorks').replace(/Runloop/g, 'AgentWorks');
  out = out.split('Browser session tracking lives in `agent_go/pkg/browser`.').join('The managed browser tool tracks sessions.');

  // Drop internal Browser sections (failure archaeology, E2E contract notes,
  // and the file:// exploit history below the security caveat).
  if (docPath === 'core/browser') {
    out = out.replace(/## Recent failure findings and fixes[\s\S]*?(?=\n## File uploads and downloads\n)/, '');
    out = out.replace(/SparkQuill's standalone server rejected any[\s\S]*?(?=\n## Debugging and evidence\n)/, '');
  }

  // Repair the prose sentences that linked dropped docs.
  out = out.split('[Evaluation System](../workflow/evaluation_system.md), ').join('');
  out = out.split('[`pulse_consolidation.md`](./pulse_consolidation.md)').join('this document');

  // Drop "see also" / table lines that point at dropped docs.
  out = out.split('\n').filter(line => {
    if (line.includes('org_dashboard_design.md')) return true; // remapped below
    if (docPath === 'README' && line.includes('E2E')) return false; // internal testing refs
    return !droppedFiles.some(file => line.includes(file));
  }).join('\n');

  // Point detailed-doc references at the closest surviving page.
  out = out.split('org_dashboard_design.md').join('workflow_monitoring.md');

  // Links to internal (non-allowlisted) docs become plain text — never 404s.
  const dir = docPath.includes('/') ? docPath.slice(0, docPath.lastIndexOf('/')) : '';
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+\.md)(#[^)]*)?\)/g, (match, text, href) => {
    if (/^(https?:|mailto:|tel:|#|\/)/.test(href)) return match;
    const target = path.posix.normalize(path.posix.join(dir, href)).replace(/^\.\//, '');
    if (allowed.has(target.replace(/\.md$/, ''))) return match;
    return text;
  });

  out = scrubSourcePaths(out);
  out = scrubFileNames(out);
  if (docPath === 'workflow/tiered_llm_allocation') {
    out = out.split('## Key Files').join('## Key components');
  }

  // Align install copy with the site: macOS app or self-hosted Linux.
  if (docPath === 'getting-started/README' && !out.includes('deployment docs')) {
    out = out.split('for manual installation artifacts.').join(
      'for manual installation artifacts. Prefer to self-host on Linux? See the [deployment docs](https://github.com/manishiitg/coding-agent-loop/tree/main/deploy).'
    );
  }

  out = scrubPulse(out);
  // Fix articles orphaned by the rename ("a Pulse turn" -> "an Auto-improve turn").
  out = out.replace(/\ba (Auto-improves|Auto-improve|auto-improve)\b/g, 'an $1');
  return scrubIdentifiers(out);
}

function copyFile(source, target) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
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

function pruneToAllowlist() {
  // Used when the product repo is unavailable: prune the committed snapshot
  // to the allowlist instead of publishing everything.
  const kept = [];
  const walk = directory => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        if (fs.readdirSync(fullPath).length === 0) fs.rmdirSync(fullPath);
        continue;
      }
      if (!entry.name.endsWith('.md')) continue;
      const docPath = path.relative(outputRoot, fullPath).split(path.sep).join('/').replace(/\.md$/, '');
      if (!allowed.has(docPath)) {
        fs.rmSync(fullPath);
        continue;
      }
      const content = scrubPublicMarkdown(fs.readFileSync(fullPath, 'utf8'), docPath);
      fs.writeFileSync(fullPath, content);
      kept.push({
        path: docPath,
        title: firstHeading(content, path.basename(docPath)),
        section: docPath.includes('/') ? docPath.split('/')[0] : 'overview'
      });
    }
  };
  walk(outputRoot);
  kept.sort((a, b) => a.path.localeCompare(b.path));
  fs.writeFileSync(
    path.join(outputRoot, 'manifest.json'),
    `${JSON.stringify({ schemaVersion: 1, documents: kept }, null, 2)}\n`
  );
  return kept.length;
}

if (!sourceRoot) {
  if (optional && fs.existsSync(path.join(outputRoot, 'manifest.json'))) {
    const count = pruneToAllowlist();
    console.log(`sync-product-docs: pruned committed snapshot to ${count} allowlisted files`);
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

walk(sourceRoot);
markdownFiles.sort();

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(outputRoot, { recursive: true });

const missing = [];
const documents = [];
for (const file of markdownFiles) {
  const relative = path.relative(sourceRoot, file).split(path.sep).join('/');
  const docPath = relative.replace(/\.md$/, '');
  if (!allowed.has(docPath)) continue;
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '');
  const content = scrubPublicMarkdown(raw, docPath);
  fs.mkdirSync(path.dirname(path.join(outputRoot, relative)), { recursive: true });
  fs.writeFileSync(path.join(outputRoot, relative), content);
  copyReferencedAssets(raw, file);
  documents.push({
    path: docPath,
    title: firstHeading(content, path.basename(relative, '.md')),
    section: relative.includes('/') ? relative.split('/')[0] : 'overview'
  });
}

for (const docPath of allowed) {
  if (!documents.some(doc => doc.path === docPath)) missing.push(docPath);
}
if (missing.length) {
  console.error(`sync-product-docs: allowlisted docs missing from source: ${missing.join(', ')}`);
  process.exit(1);
}

fs.writeFileSync(
  path.join(outputRoot, 'manifest.json'),
  `${JSON.stringify({ schemaVersion: 1, documents }, null, 2)}\n`
);

console.log(`sync-product-docs: copied ${documents.length} allowlisted Markdown files from ${sourceRoot}`);
