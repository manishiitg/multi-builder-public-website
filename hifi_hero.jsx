// Hi-fi landing — sections 1 & 2: Nav + Hero
// uses window.h (set in shell)

function Logo({ name = 'AgentForge' }) {
  return h('div', { className: 'logo' },
    h('div', { className: 'logo-mark' }),
    h('span', null, name),
    h('span', {
      style: {
        marginLeft: 8,
        padding: '2px 7px',
        borderRadius: 999,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 10,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        background: 'var(--amber-dim, rgba(245, 158, 11, 0.15))',
        border: '1px solid var(--amber-line, rgba(245, 158, 11, 0.35))',
        color: 'var(--amber, #f59e0b)',
        lineHeight: 1.4
      }
    }, 'alpha')
  );
}

function Nav({ name, current = 'home' }) {
  const links = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'how', label: 'How it works', href: 'how.html' },
  ];
  return h('div', { className: 'nav' },
    h('div', { className: 'nav-inner' },
      h('a', { href: 'index.html', style: { display: 'flex' } }, h(Logo, { name })),
      h('div', { className: 'nav-links' },
        links.map(l =>
          h('a', { key: l.id, className: 'nav-link', href: l.href,
            style: current === l.id ? { color: 'var(--fg)', background: 'var(--bg-2)' } : null }, l.label)
        )
      ),
      h('div', { className: 'nav-spacer' }),
      h('div', { className: 'nav-cta' },
        h('a', { className: 'nav-link', href: 'https://github.com/manishiitg/mcp-agent-builder-go', target: '_blank', rel: 'noreferrer',
          style: { display: 'flex', alignItems: 'center', gap: 6 } },
          h('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'currentColor' },
            h('path', { d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z' })
          ), 'GitHub'),
        h('a', { className: 'btn violet sm', href: 'https://calendly.com/manishiitg/15min', target: '_blank', rel: 'noreferrer' }, 'Book demo', h('span', { className: 'arrow' }, '→'))
      )
    )
  );
}

/* Animated node graph — the hero visual
   Layout: 3 columns in a 960x320 viewBox.
   Models (40..180) · Workflow (320..560) · Artifacts (680..920).
   Each column has its own header at y=24 and rows at fixed y positions.
*/
function HeroGraph() {
  const models = [
    { n: 'claude-code', y: 70,  c: 'var(--violet)' },
    { n: 'gemini-cli',  y: 118, c: 'var(--cyan)' },
    { n: 'codex-cli',   y: 166, c: 'var(--lime)' },
    { n: 'glm',         y: 214, c: 'var(--pink)' },
    { n: 'minimax',     y: 262, c: 'var(--amber)' },
  ];
  const steps = [
    { n: 'fetch',   y: 94,  m: 'gemini-cli',  mc: 'var(--cyan)' },
    { n: 'analyze', y: 166, m: 'claude-code', mc: 'var(--violet)' },
    { n: 'report',  y: 238, m: 'codex-cli',   mc: 'var(--lime)' },
  ];
  const artifacts = [
    { n: 'skills',    v: '+14',       y: 62,  c: 'var(--violet)' },
    { n: 'knowledge', v: '247 facts', y: 112, c: 'var(--cyan)' },
    { n: 'python',    v: '8 scripts', y: 162, c: 'var(--lime)' },
    { n: 'evals',     v: '0.91 ↑',    y: 212, c: 'var(--success)' },
    { n: 'tokens',    v: '4.2k ↓',    y: 262, c: 'var(--amber)' },
  ];

  const COL_W = 140;
  const MODEL_X = 40;
  const STEP_X  = 400 - COL_W / 2; // centered at 400
  const ART_X   = 780;
  const CENTER_Y = 166;

  return h('div', { style: { position: 'relative' } },
    h('svg', { viewBox: '0 0 960 320', width: '100%',
      preserveAspectRatio: 'xMidYMid meet',
      style: { display: 'block', overflow: 'visible' } },
      h('defs', null,
        h('linearGradient', { id: 'flowG', x1: 0, x2: 1 },
          h('stop', { offset: 0, stopColor: 'var(--violet)', stopOpacity: 0 }),
          h('stop', { offset: 0.5, stopColor: 'var(--violet)', stopOpacity: 0.9 }),
          h('stop', { offset: 1, stopColor: 'var(--violet)', stopOpacity: 0 })
        )
      ),

      // column headers
      h('text', { x: MODEL_X, y: 30, fontSize: 11, fill: 'var(--fg-3)',
        style: { fontFamily: 'JetBrains Mono' } }, '// MODEL POOL'),
      h('text', { x: STEP_X,  y: 30, fontSize: 11, fill: 'var(--fg-3)',
        style: { fontFamily: 'JetBrains Mono' } }, '// WORKFLOW'),
      h('text', { x: ART_X,   y: 30, fontSize: 11, fill: 'var(--fg-3)',
        style: { fontFamily: 'JetBrains Mono' } }, '// LEARNS + STORES'),

      // models
      ...models.map((m, i) => h('g', { key: 'm'+i },
        h('rect', { x: MODEL_X, y: m.y - 16, width: COL_W, height: 32, rx: 8,
          fill: 'var(--bg-2)', stroke: 'var(--line-2)', strokeWidth: 1 }),
        h('circle', { cx: MODEL_X + 14, cy: m.y, r: 4, fill: m.c, className: 'anim-pulse',
          style: { animationDelay: `${i * 0.2}s` } }),
        h('text', { x: MODEL_X + 26, y: m.y + 4, fontSize: 12, fill: 'var(--fg)',
          style: { fontFamily: 'JetBrains Mono' } }, m.n)
      )),

      // edges models → workflow center
      ...models.map((m, i) =>
        h('path', { key: 'e'+i,
          d: `M ${MODEL_X + COL_W} ${m.y} C ${MODEL_X + COL_W + 60} ${m.y}, ${STEP_X - 60} ${CENTER_Y}, ${STEP_X} ${CENTER_Y}`,
          stroke: 'var(--line-2)', strokeWidth: 1, fill: 'none', opacity: 0.5 })
      ),
      h('path', {
        d: `M ${MODEL_X + COL_W} 118 C ${MODEL_X + COL_W + 60} 118, ${STEP_X - 60} ${CENTER_Y}, ${STEP_X} ${CENTER_Y}`,
        stroke: 'url(#flowG)', strokeWidth: 2, fill: 'none', strokeDasharray: '4 4', className: 'anim-flow' }),

      // workflow steps
      ...steps.map((s, i) => h('g', { key: 's'+i },
        h('rect', { x: STEP_X, y: s.y - 22, width: COL_W, height: 44, rx: 10,
          fill: 'var(--bg-2)', stroke: 'var(--violet-line)', strokeWidth: 1 }),
        h('text', { x: STEP_X + 14, y: s.y - 4, fontSize: 14, fill: 'var(--fg)', fontWeight: 500 }, s.n),
        h('circle', { cx: STEP_X + 14, cy: s.y + 10, r: 3, fill: s.mc }),
        h('text', { x: STEP_X + 22, y: s.y + 13, fontSize: 10, fill: 'var(--fg-3)',
          style: { fontFamily: 'JetBrains Mono' } }, s.m)
      )),
      // workflow internal spine
      h('path', { d: `M ${STEP_X + COL_W / 2} 116 L ${STEP_X + COL_W / 2} 144`,
        stroke: 'var(--violet)', strokeWidth: 1.5, opacity: 0.7 }),
      h('path', { d: `M ${STEP_X + COL_W / 2} 188 L ${STEP_X + COL_W / 2} 216`,
        stroke: 'var(--violet)', strokeWidth: 1.5, opacity: 0.7 }),

      // edges workflow → artifacts
      ...steps.map((s, i) =>
        h('path', { key: 'r'+i,
          d: `M ${STEP_X + COL_W} ${s.y} C ${STEP_X + COL_W + 60} ${s.y}, ${ART_X - 60} ${CENTER_Y}, ${ART_X} ${CENTER_Y}`,
          stroke: 'var(--violet-line)', strokeWidth: 1.2, fill: 'none', opacity: 0.6 })
      ),
      h('path', {
        d: `M ${STEP_X + COL_W} ${CENTER_Y} C ${STEP_X + COL_W + 60} ${CENTER_Y}, ${ART_X - 60} ${CENTER_Y}, ${ART_X} ${CENTER_Y}`,
        stroke: 'url(#flowG)', strokeWidth: 2, fill: 'none', strokeDasharray: '4 4', className: 'anim-flow' }),

      // artifacts
      ...artifacts.map((a, i) => h('g', { key: 'a'+i },
        h('rect', { x: ART_X, y: a.y - 16, width: COL_W, height: 32, rx: 8,
          fill: 'var(--bg-2)', stroke: 'var(--line-2)', strokeWidth: 1 }),
        h('text', { x: ART_X + 12, y: a.y + 4, fontSize: 12, fill: 'var(--fg)', fontWeight: 500 }, a.n),
        h('text', { x: ART_X + COL_W - 10, y: a.y + 4, fontSize: 11, fill: a.c, textAnchor: 'end',
          style: { fontFamily: 'JetBrains Mono' } }, a.v)
      ))
    )
  );
}

function Hero({ name, variant = 1 }) {
  const headlines = {
    1: ['Workflows that', 'learn your business.'],
    2: ['Design one workflow.', 'Run it a thousand times.', 'Each run teaches the next.'],
    3: ['The last workflow', "you'll ever rewrite."],
  };
  const subs = {
    1: 'Each run teaches the next one. Evals catch the drift, skills capture what worked, the knowledge base remembers. The hundredth run of a workflow is unrecognisable from the first.',
    2: 'Design it visually. Grade it automatically. Watch it absorb the judgment of your team — evals sharpen, skills stick, institutional memory accrues. Runs on any coding CLI, any model, any MCP server you bring.',
    3: 'Most automations rot the moment reality shifts. AgentForge workflows carry their own evals, skills, and knowledge base — so they adapt instead of breaking.',
  };
  const hw = headlines[variant];

  return h('section', { className: 'hero' },
    h('div', { className: 'hero-bg' }),
    h('div', { className: 'shell hero-inner' },
      h('div', { style: { display: 'flex', gap: 8, marginBottom: 32, justifyContent: 'center' } },
        h('span', { className: 'tag violet' },
          h('span', { className: 'dot' }), 'Open source · MIT'),
        h('span', { className: 'tag amber' },
          h('span', { className: 'dot' }), 'Early alpha · building in public')
      ),
      h('h1', { className: 'display', style: { textAlign: 'center', marginBottom: 24 } },
        ...hw.flatMap((line, i) => {
          const last = i === hw.length - 1;
          return [
            last
              ? h('span', { key: i, style: { background: 'linear-gradient(120deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } }, line)
              : h('span', { key: i }, line),
            h('br', { key: 'br'+i })
          ];
        })
      ),
      h('p', { className: 'lead', style: { maxWidth: 680, margin: '0 auto 40px', textAlign: 'center' } },
        subs[variant]
      ),
      h('div', { style: { display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 80 } },
        h('a', { className: 'btn violet', href: 'https://calendly.com/manishiitg/15min', target: '_blank', rel: 'noreferrer' }, 'Book a demo', h('span', { className: 'arrow' }, '→')),
        h('a', { className: 'btn ghost', href: 'https://github.com/manishiitg/mcp-agent-builder-go', target: '_blank', rel: 'noreferrer' },
          h('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'currentColor' },
            h('path', { d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z' })
          ), 'Star on GitHub')
      ),
      // graph card
      h('div', { className: 'card glow-border', style: { padding: 20, position: 'relative' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 } },
          h('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
            h('div', { style: { display: 'flex', gap: 4 } },
              ['#FF5F57', '#FEBC2E', '#28C840'].map(c =>
                h('span', { key: c, style: { width: 10, height: 10, borderRadius: '50%', background: c } }))
            ),
            h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)' } },
              'workflow :: aws-cost-optimizer · iteration-142')
          ),
          h('div', { style: { display: 'flex', gap: 10 } },
            h('span', { className: 'tag' }, h('span', { className: 'dot', style: { background: 'var(--success)' } }), 'running'),
            h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--success)' } }, 'eval 0.91 ↑'),
            h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--amber)' } }, 'tok 4.2k ↓')
          )
        ),
        h(HeroGraph)
      )
    )
  );
}

Object.assign(window, { Nav, Hero, Logo, HeroGraph });
