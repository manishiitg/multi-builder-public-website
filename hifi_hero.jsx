// Hi-fi landing — sections 1 & 2: Nav + Hero
// uses window.h (set in shell)

function Logo({ name = 'Runloop' }) {
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
  const automationLinks = window.RUNLOOP_TEMPLATES || [];
  const pageHref = (page) => {
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '';
    if (page === 'home') return isLocal ? 'index.html' : '/';
    if (page === 'how') return isLocal ? 'how.html' : '/how/';
    return page;
  };
  const automationHref = (slug) => {
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '';
    return isLocal ? `template.html?slug=${slug}` : `/automations/${slug}/`;
  };
  const links = [
    { id: 'home', label: 'Home', href: pageHref('home') },
    { id: 'how', label: 'How it works', href: pageHref('how') },
  ];
  return h('div', { className: 'nav' },
    h('div', { className: 'nav-inner' },
      h('a', { href: pageHref('home'), style: { display: 'flex' } }, h(Logo, { name })),
      h('div', { className: 'nav-links' },
        links.map(l =>
          h('a', { key: l.id, className: 'nav-link', href: l.href,
            style: current === l.id ? { color: 'var(--fg)', background: 'var(--bg-2)' } : null }, l.label)
        ),
        h('div', { className: 'nav-dropdown' },
          h('button', {
            className: 'nav-link nav-dropdown-trigger',
            type: 'button',
            style: current === 'templates' ? { color: 'var(--fg)', background: 'var(--bg-2)' } : null
          },
            'Automations',
            h('span', { className: 'nav-caret' }, '⌄')
          ),
          h('div', { className: 'nav-dropdown-menu' },
            h('div', { className: 'nav-dropdown-head mono' }, 'Automation library'),
            automationLinks.map((item, i) =>
              h('a', { key: item.slug, className: 'nav-dropdown-item', href: automationHref(item.slug) },
                h('span', { className: 'dot', style: { background: item.color || 'var(--violet)' } }),
                h('span', null,
                  h('strong', null, item.t),
                  h('small', null, item.c)
                )
              )
            )
          )
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

function HeroGraph() {
  const metrics = [
    { label: 'support SLA', value: '98%', delta: '+11pp', y: 124, color: 'var(--success)' },
    { label: 'false routes', value: '5', delta: '-58%', y: 176, color: 'var(--cyan)' },
    { label: 'QA coverage', value: '96%', delta: 'goal met', y: 228, color: 'var(--violet)' },
  ];
  const decisions = [
    { label: 'skill saved', value: 'keep', y: 96, color: 'var(--success)' },
    { label: 'goal met', value: 'active', y: 146, color: 'var(--cyan)' },
    { label: 'change failed', value: 'revert', y: 196, color: 'var(--amber)' },
  ];

  return h('div', { style: { position: 'relative' } },
    h('svg', { viewBox: '0 0 960 320', width: '100%',
      preserveAspectRatio: 'xMidYMid meet',
      style: { display: 'block', overflow: 'visible' } },
      h('defs', null,
        h('linearGradient', { id: 'flowG', x1: 0, x2: 1 },
          h('stop', { offset: 0, stopColor: 'var(--violet)', stopOpacity: 0 }),
          h('stop', { offset: 0.5, stopColor: 'var(--violet)', stopOpacity: 0.9 }),
          h('stop', { offset: 1, stopColor: 'var(--violet)', stopOpacity: 0 })
        ),
        h('linearGradient', { id: 'evalG', x1: 0, x2: 1 },
          h('stop', { offset: 0, stopColor: 'var(--violet)' }),
          h('stop', { offset: 1, stopColor: 'var(--cyan)' })
        ),
        h('linearGradient', { id: 'metricFillG', x1: 0, x2: 0, y1: 0, y2: 1 },
          h('stop', { offset: 0, stopColor: 'var(--cyan)', stopOpacity: 0.18 }),
          h('stop', { offset: 1, stopColor: 'var(--cyan)', stopOpacity: 0 })
        ),
        h('marker', { id: 'arrowG', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' },
          h('path', { d: 'M0 0 L10 5 L0 10 z', fill: 'var(--cyan)' })
        )
      ),

      h('text', { x: 40, y: 30, fontSize: 11, fill: 'var(--fg-3)',
        style: { fontFamily: 'JetBrains Mono' } }, '// METRICS'),
      h('text', { x: 288, y: 30, fontSize: 11, fill: 'var(--fg-3)',
        style: { fontFamily: 'JetBrains Mono' } }, '// AUTO-IMPROVEMENT LOOP'),
      h('text', { x: 736, y: 30, fontSize: 11, fill: 'var(--fg-3)',
        style: { fontFamily: 'JetBrains Mono' } }, '// DECISION LOG'),

      h('g', null,
        h('rect', { x: 40, y: 58, width: 208, height: 204, rx: 14,
          fill: 'var(--bg-2)', stroke: 'var(--violet-line)', strokeWidth: 1 }),
        h('text', { x: 62, y: 88, fontSize: 13, fill: 'var(--fg)', fontWeight: 600 }, 'audit metrics'),
        ...metrics.map((m, i) => h('g', { key: m.label },
          h('rect', { x: 60, y: m.y - 22, width: 168, height: 40, rx: 8,
            fill: 'var(--bg-3)', stroke: 'var(--line)', strokeWidth: 1 }),
          h('circle', { cx: 76, cy: m.y - 3, r: 4, fill: m.color, className: i === 0 ? 'anim-pulse' : '' }),
          h('text', { x: 90, y: m.y - 4, fontSize: 11, fill: 'var(--fg)', fontWeight: 500 }, m.label),
          h('text', { x: 90, y: m.y + 12, fontSize: 10, fill: 'var(--fg-3)', style: { fontFamily: 'JetBrains Mono' } }, m.delta),
          h('text', { x: 214, y: m.y + 4, fontSize: 15, fill: m.color, textAnchor: 'end',
            style: { fontFamily: 'JetBrains Mono' } }, m.value)
        ))
      ),

      h('path', { d: 'M 248 160 C 262 160, 268 160, 282 160',
        stroke: 'url(#flowG)', strokeWidth: 2, fill: 'none', strokeDasharray: '4 4', className: 'anim-flow', markerEnd: 'url(#arrowG)' }),

      h('g', null,
        h('rect', { x: 286, y: 58, width: 402, height: 204, rx: 14,
          fill: 'var(--bg-2)', stroke: 'var(--line-2)', strokeWidth: 1 }),
        h('rect', { x: 506, y: 118, width: 86, height: 96, rx: 10,
          fill: 'rgba(167, 139, 250, 0.08)', stroke: 'var(--violet-line)', strokeWidth: 1 }),
        h('text', { x: 521, y: 139, fontSize: 10, fill: 'var(--violet)', style: { fontFamily: 'JetBrains Mono' } }, 'experiment'),
        h('text', { x: 521, y: 155, fontSize: 9, fill: 'var(--fg-3)', style: { fontFamily: 'JetBrains Mono' } }, 'N=4/5'),
        h('path', { d: 'M 316 214 L 370 198 L 424 174 L 478 164 L 532 138 L 586 118 L 640 92',
          stroke: 'url(#evalG)', strokeWidth: 3, fill: 'none' }),
        h('path', { d: 'M 316 214 L 370 198 L 424 174 L 478 164 L 532 138 L 586 118 L 640 92 L 640 232 L 316 232 Z',
          fill: 'url(#metricFillG)' }),
        h('path', { d: 'M 316 214 L 370 198 L 424 174 L 478 164 L 532 138 L 586 118 L 640 92',
          stroke: 'url(#evalG)', strokeWidth: 1.5, fill: 'none', strokeDasharray: '6 8', className: 'anim-flow', opacity: 0.9 }),
        h('circle', { r: 5, fill: 'var(--cyan)' },
          h('animateMotion', {
            dur: '3.8s',
            repeatCount: 'indefinite',
            path: 'M 316 214 L 370 198 L 424 174 L 478 164 L 532 138 L 586 118 L 640 92'
          })
        ),
        [316, 370, 424, 478, 532, 586, 640].map((x, i) => {
          const ys = [214, 198, 174, 164, 138, 118, 92];
          const active = i === 4 || i === 6;
          return h('circle', { key: x, cx: x, cy: ys[i], r: active ? 5 : 3.5,
            fill: active ? 'var(--cyan)' : 'var(--bg)',
            stroke: active ? 'var(--cyan)' : 'var(--violet)', strokeWidth: 2,
            className: active ? 'anim-pulse' : '' });
        }),
        h('line', { x1: 316, y1: 232, x2: 652, y2: 232, stroke: 'var(--line)' }),
        h('line', { x1: 316, y1: 78, x2: 316, y2: 232, stroke: 'var(--line)' }),
        h('text', { x: 316, y: 252, fontSize: 10, fill: 'var(--fg-3)', textAnchor: 'middle', style: { fontFamily: 'JetBrains Mono' } }, 'r1'),
        h('text', { x: 478, y: 252, fontSize: 10, fill: 'var(--fg-3)', textAnchor: 'middle', style: { fontFamily: 'JetBrains Mono' } }, 'r42'),
        h('text', { x: 640, y: 252, fontSize: 10, fill: 'var(--fg-3)', textAnchor: 'middle', style: { fontFamily: 'JetBrains Mono' } }, 'r142'),
        h('text', { x: 334, y: 88, fontSize: 11, fill: 'var(--fg-3)', style: { fontFamily: 'JetBrains Mono' } }, 'goal: fewer escalations'),
        h('text', { x: 650, y: 88, fontSize: 16, fill: 'var(--success)', textAnchor: 'end', style: { fontFamily: 'JetBrains Mono' } }, '98%'),
        h('g', null,
          h('rect', { x: 334, y: 104, width: 102, height: 22, rx: 11, fill: 'var(--bg-3)', stroke: 'var(--line)' }),
          h('circle', { cx: 350, cy: 115, r: 4, fill: 'var(--violet)', className: 'anim-pulse' }),
          h('text', { x: 362, y: 119, fontSize: 9.5, fill: 'var(--fg-2)', style: { fontFamily: 'JetBrains Mono' } }, 'improvement'),
          h('rect', { x: 603, y: 104, width: 54, height: 22, rx: 11, fill: 'rgba(74, 222, 128, 0.12)', stroke: 'rgba(74, 222, 128, 0.35)' }),
          h('text', { x: 630, y: 119, textAnchor: 'middle', fontSize: 9.5, fill: 'var(--success)', style: { fontFamily: 'JetBrains Mono' } }, 'keep')
        )
      ),

      h('path', { d: 'M 688 160 C 704 160, 712 160, 728 160',
        stroke: 'url(#flowG)', strokeWidth: 2, fill: 'none', strokeDasharray: '4 4', className: 'anim-flow', markerEnd: 'url(#arrowG)' }),

      h('g', null,
        h('rect', { x: 728, y: 58, width: 192, height: 204, rx: 14,
          fill: 'var(--bg-2)', stroke: 'var(--line-2)', strokeWidth: 1 }),
        h('text', { x: 750, y: 88, fontSize: 13, fill: 'var(--fg)', fontWeight: 600 }, 'append-only evidence'),
        h('text', { x: 750, y: 108, fontSize: 10, fill: 'var(--fg-3)', style: { fontFamily: 'JetBrains Mono' } }, 'proposer != evaluator'),
        ...decisions.map((d, i) => h('g', { key: d.label },
          h('rect', { x: 748, y: d.y - 20, width: 150, height: 36, rx: 9,
            fill: 'var(--bg-3)', stroke: 'var(--line)', strokeWidth: 1 }),
          h('circle', { cx: 764, cy: d.y - 2, r: 4, fill: d.color, className: i === 1 ? 'anim-pulse' : '' }),
          h('text', { x: 778, y: d.y + 3, fontSize: 11, fill: 'var(--fg)', fontWeight: 500 }, d.label),
          h('text', { x: 888, y: d.y + 3, fontSize: 10, fill: d.color, textAnchor: 'end',
            style: { fontFamily: 'JetBrains Mono' } }, d.value)
        )),
        h('rect', { x: 748, y: 224, width: 150, height: 22, rx: 11,
          fill: 'rgba(103, 232, 249, 0.09)', stroke: 'rgba(103, 232, 249, 0.28)' }),
        h('text', { x: 823, y: 239, textAnchor: 'middle', fontSize: 10, fill: 'var(--cyan)',
          style: { fontFamily: 'JetBrains Mono' } }, 'next improvement queued')
      ),

      h('path', { d: 'M 824 268 C 680 300, 342 300, 144 270',
        stroke: 'url(#evalG)', strokeWidth: 1.4, fill: 'none', strokeDasharray: '5 6', opacity: 0.7, className: 'anim-flow', markerEnd: 'url(#arrowG)' }),
      h('circle', { r: 4, fill: 'var(--violet)' },
        h('animateMotion', {
          dur: '5s',
          repeatCount: 'indefinite',
          path: 'M 824 268 C 680 300, 342 300, 144 270'
        })
      ),
      h('rect', { x: 388, y: 286, width: 212, height: 18, rx: 9, fill: 'var(--bg-2)', opacity: 0.94 }),
      h('text', { x: 494, y: 299, textAnchor: 'middle', fontSize: 11, fill: 'var(--fg-3)',
        style: { fontFamily: 'JetBrains Mono' } }, 'goals and metrics drive the next run')
    )
  );
}

function Hero({ name, variant = 1 }) {
  const headlines = {
    1: ['Custom AI automations', 'for business outcomes.'],
    2: ['Build AI agents for business.', 'Automate the work.', 'Improve the result.'],
    3: ['The AI automation platform', 'for work that keeps changing.'],
  };
  const subs = {
    1: 'Runloop is an open-source AI automation platform for business-specific work. Bring your outcome, process, tools, knowledgebase, skills, evals, and approval rules. AI agents build and run the custom automation, measure the result, then improve it over time.',
    2: 'Design automations visually. Grade them automatically. Watch them absorb your team judgment as evals sharpen, skills stick, and institutional memory accrues. Runs on any coding CLI, any model, any MCP server you bring.',
    3: 'Most automations rot the moment reality shifts. Runloop automations carry their own evals, skills, and knowledgebase so they adapt instead of breaking.',
  };
  const hw = headlines[variant];

  return h('section', { className: 'hero' },
    h('div', { className: 'hero-bg' }),
    h('div', { className: 'shell hero-inner' },
      h('div', { className: 'hero-proof', style: { display: 'flex', gap: 8, marginBottom: 32, justifyContent: 'center' } },
        h('span', { className: 'tag violet' },
          h('span', { className: 'dot' }), 'custom AI automations'),
        h('span', { className: 'tag' },
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
      h('div', { className: 'hero-actions', style: { display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 80 } },
        h('a', { className: 'btn violet', href: 'https://calendly.com/manishiitg/15min', target: '_blank', rel: 'noreferrer' }, 'Build my automation', h('span', { className: 'arrow' }, '→')),
        h('a', { className: 'btn ghost', href: 'https://github.com/manishiitg/mcp-agent-builder-go', target: '_blank', rel: 'noreferrer' },
          h('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'currentColor' },
            h('path', { d: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z' })
          ), 'View OSS on GitHub')
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
              'automation :: support-triage · iteration-142')
          ),
          h('div', { style: { display: 'flex', gap: 10 } },
            h('span', { className: 'tag' }, h('span', { className: 'dot', style: { background: 'var(--success)' } }), 'running'),
            h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--success)' } }, 'metric 98% ↑'),
            h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--violet)' } }, 'improvements N=4/5')
          )
        ),
        h(HeroGraph)
      )
    )
  );
}

Object.assign(window, { Nav, Hero, Logo, HeroGraph });
