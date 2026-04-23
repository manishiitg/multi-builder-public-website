// Landing page — 4 wireframe variations exploring hero metaphors
// uses window.h

/* ============================================================
   V1 — Workflow canvas hero (multi-model + learning loop + cost ↓)
   ============================================================ */
function LandingV1() {
  return h('div', { className: 'wire', style: { padding: 0 } },
    // top nav
    h('div', { style: { display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: '1.5px dashed var(--ink-4)' } },
      h('span', { className: 'h-hand', style: { fontSize: 22 } }, 'workflow.co ', h('span', { style: { color: 'var(--accent)' } }, '●')),
      h('div', { style: { marginLeft: 'auto', display: 'flex', gap: 10 } },
        ['product', 'workflows', 'employees', 'docs'].map(x =>
          h('span', { key: x, className: 'mono', style: { color: 'var(--ink-3)' } }, x)
        ),
        h('span', { className: 'sketch-pill accent' }, 'BOOK DEMO')
      )
    ),
    // hero
    h('div', { style: { padding: '30px 28px 12px', position: 'relative' } },
      h('div', { style: { display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' } },
        h('span', { className: 'sketch-pill ghost' }, '★ open source · MIT'),
        h('span', { className: 'sketch-pill' }, 'claude · gemini · codex · glm · minimax'),
      ),
      h('h1', { className: 'h-hand h-lg', style: { margin: '0 0 10px', maxWidth: 540, lineHeight: 0.95 } },
        'workflows that ', h('span', { className: 'underline-scribble' }, 'learn'), ' — on ', h('span', { style: { color: 'var(--accent)' } }, 'any model'), '.'
      ),
      h('p', { style: { maxWidth: 480, margin: '0 0 14px', color: 'var(--ink-2)', fontSize: 13 } },
        'plug in claude-code, gemini-cli, codex, glm, minimax — whatever you use. workflows build skills, run evals, store knowledge. every cycle = ', h('b', null, 'higher accuracy, lower tokens'), '.'
      ),
      h('div', { style: { display: 'flex', gap: 10 } },
        h('span', { className: 'btn primary' }, 'book a demo →'),
        h('span', { className: 'btn ghost' }, '⌘ view on github')
      ),
    ),

    // 3-pillar strip
    h('div', { style: { padding: '10px 28px 14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 } },
      [
        { n: '01', t: 'any coding tool', s: 'claude-code · gemini · codex · glm · minimax · aider', c: 'var(--accent)' },
        { n: '02', t: 'skills + evals + kb', s: 'workflows grade themselves, learn, and remember', c: 'var(--accent-2)' },
        { n: '03', t: 'cheaper every cycle', s: 'fewer tokens · better outputs · proven by evals', c: 'var(--accent-3)' },
      ].map((p, i) =>
        h('div', { key: i, className: 'sketch-box thin', style: { padding: 8 } },
          h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 } },
            h('span', { className: 'mono', style: { fontSize: 9, color: p.c } }, p.n),
            h('span', { className: 'h-hand', style: { fontSize: 18, lineHeight: 1 } }, p.t)
          ),
          h('div', { style: { fontSize: 10, color: 'var(--ink-3)', lineHeight: 1.3 } }, p.s)
        )
      )
    ),

    // integrations strip
    h('div', { style: { padding: '4px 28px 14px' } },
      h('div', { className: 'sketch-box thin', style: { padding: 10, background: 'var(--paper-2)' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 } },
          h('div', { className: 'h-hand', style: { fontSize: 18 } }, 'plug into what you already use'),
          h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'MCP · APIs · CLIs')
        ),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 } },
          [
            { label: 'MCP servers', col: 'var(--accent-2)', items: ['filesystem', 'github', 'postgres', 'slack', '+ custom'] },
            { label: 'APIs', col: 'var(--accent-3)', items: ['REST', 'graphql', 'webhooks', 'openapi', 'zapier'] },
            { label: 'CLIs', col: 'var(--accent)', items: ['claude-code', 'gemini-cli', 'codex-cli', 'glm', 'minimax', 'aider'] },
          ].map((g, i) =>
            h('div', { key: i },
              h('div', { className: 'mono', style: { fontSize: 9, color: g.col, marginBottom: 4 } }, g.label),
              h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 3 } },
                g.items.map(x =>
                  h('span', { key: x, className: 'sketch-pill', style: { fontSize: 9, padding: '2px 8px' } }, x)
                )
              )
            )
          )
        )
      )
    ),

    // node graph — rebuilt to show models + learning artifacts + cost/eval
    h('div', { style: { padding: '10px 24px 24px', position: 'relative' } },
      h('div', { className: 'sketch-box', style: { padding: 14, background: 'var(--paper-2)', position: 'relative' } },
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 } },
          h('span', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 10 } }, 'workflow :: aws-cost-optimizer · cycle 142'),
          h('div', { style: { display: 'flex', gap: 8 } },
            h('span', { className: 'mono', style: { fontSize: 9, color: 'var(--accent-3)' } }, 'eval 0.91 ↑'),
            h('span', { className: 'mono', style: { fontSize: 9, color: 'var(--accent)' } }, 'tok/run 4.2k ↓')
          )
        ),
        // custom node graph — models on left, workflow in middle, learning out right
        h('svg', { viewBox: '0 0 560 260', width: '100%', height: 260 },
          // left column: model pool
          h('text', { x: 10, y: 14, fontFamily: 'JetBrains Mono', fontSize: 9, fill: 'var(--ink-3)' }, '// model pool'),
          ...[
            ['claude-code', 22, 'var(--accent)'],
            ['gemini-cli', 52, 'var(--accent-2)'],
            ['codex-cli', 82, 'var(--accent-3)'],
            ['glm', 112, 'var(--accent)'],
            ['minimax', 142, 'var(--accent-2)'],
          ].map(([label, y, col], i) => h('g', { key: i },
            h('rect', { x: 10, y, width: 100, height: 22, rx: 6,
              fill: 'var(--paper)', stroke: 'var(--ink)', strokeWidth: 1.5 }),
            h('circle', { cx: 20, cy: y + 11, r: 3, fill: col }),
            h('text', { x: 30, y: y + 15, fontFamily: 'JetBrains Mono', fontSize: 10, fill: 'var(--ink)' }, label)
          )),
          // edges model pool → workflow
          ...[33, 63, 93, 123, 153].map((y, i) =>
            h('path', { key: 'e'+i, d: `M110 ${y} C 150 ${y}, 170 130, 210 130`,
              stroke: 'var(--ink-4)', strokeWidth: 1, fill: 'none', strokeDasharray: '3 3' })
          ),
          // workflow (center) — 3 nodes
          h('text', { x: 220, y: 14, fontFamily: 'JetBrains Mono', fontSize: 9, fill: 'var(--ink-3)' }, '// workflow'),
          ...[
            { x: 210, y: 60, t: 'fetch bill', m: 'gemini', mc: 'var(--accent-2)' },
            { x: 210, y: 115, t: 'analyze', m: 'claude-code', mc: 'var(--accent)' },
            { x: 210, y: 170, t: 'alert team', m: 'codex', mc: 'var(--accent-3)' },
          ].map((n, i) => h('g', { key: 'w'+i },
            h('rect', { x: n.x, y: n.y, width: 120, height: 40, rx: 8,
              fill: 'var(--paper)', stroke: 'var(--ink)', strokeWidth: 1.8 }),
            h('text', { x: n.x + 60, y: n.y + 17, textAnchor: 'middle',
              fontFamily: 'Caveat', fontSize: 16, fontWeight: 700, fill: 'var(--ink)' }, n.t),
            h('circle', { cx: n.x + 12, cy: n.y + 30, r: 3, fill: n.mc }),
            h('text', { x: n.x + 20, y: n.y + 33, fontFamily: 'JetBrains Mono', fontSize: 8, fill: 'var(--ink-3)' }, n.m)
          )),
          // connect workflow steps
          h('path', { d: 'M270 100 L 270 115', stroke: 'var(--ink-3)', strokeWidth: 1.5 }),
          h('path', { d: 'M270 155 L 270 170', stroke: 'var(--ink-3)', strokeWidth: 1.5 }),
          // edges → right side (learning artifacts)
          ...[80, 135, 190].map((y, i) =>
            h('path', { key: 'r'+i, d: `M330 ${y} C 370 ${y}, 380 130, 420 130`,
              stroke: 'var(--accent-2)', strokeWidth: 1.2, fill: 'none', strokeDasharray: '3 3' })
          ),
          // right column: learning artifacts
          h('text', { x: 420, y: 14, fontFamily: 'JetBrains Mono', fontSize: 9, fill: 'var(--ink-3)' }, '// learns + stores'),
          ...[
            ['skills', '+14', 30, 'var(--accent-2)'],
            ['knowledge', '247', 70, 'var(--accent-3)'],
            ['python', '8', 110, 'var(--accent)'],
            ['evals', '0.91 ↑', 150, 'var(--accent-3)'],
            ['tokens', '4.2k ↓', 190, 'var(--accent)'],
          ].map(([label, val, y, col], i) => h('g', { key: 'l'+i },
            h('rect', { x: 420, y, width: 120, height: 30, rx: 6,
              fill: 'var(--paper)', stroke: 'var(--ink)', strokeWidth: 1.5 }),
            h('text', { x: 430, y: y + 19, fontFamily: 'Caveat', fontSize: 16, fontWeight: 700, fill: 'var(--ink)' }, label),
            h('text', { x: 530, y: y + 19, textAnchor: 'end', fontFamily: 'JetBrains Mono', fontSize: 10, fill: col }, val)
          ))
        ),
        h('div', { className: 'annot', style: { position: 'absolute', top: -20, left: 30, transform: 'rotate(-3deg)' } },
          'live workflow preview'
        ),
        h('div', { className: 'annot', style: { position: 'absolute', bottom: 6, right: 20, transform: 'rotate(2deg)', fontSize: 16 } },
          'cheaper + smarter each cycle'
        )
      )
    )
  );
}

/* ============================================================
   V2 — Employee cards hero (team of AI agents)
   ============================================================ */
function LandingV2() {
  const employees = [
    { name: 'ada', role: 'aws cost optimizer', runs: 142, skills: 8 },
    { name: 'mira', role: 'qa automation', runs: 89, skills: 12 },
    { name: 'leo', role: 'customer acquisition', runs: 31, skills: 5 },
  ];
  return h('div', { className: 'wire', style: { padding: 0 } },
    h('div', { style: { padding: '14px 20px', display: 'flex', borderBottom: '1.5px dashed var(--ink-4)' } },
      h('span', { className: 'h-hand', style: { fontSize: 22 } }, 'workflow.co'),
      h('span', { className: 'sketch-pill ghost', style: { marginLeft: 'auto' } }, 'open source')
    ),
    h('div', { style: { padding: '32px 28px 16px', textAlign: 'center', position: 'relative' } },
      h('h1', { className: 'h-hand h-lg', style: { margin: '0 0 10px' } },
        'hire ', h('span', { className: 'underline-scribble' }, 'employees'), '.'),
      h('h1', { className: 'h-hand h-lg', style: { margin: '0 0 14px', color: 'var(--ink-3)' } },
        'assign them workflows.'),
      h('p', { style: { maxWidth: 400, margin: '0 auto 18px', fontSize: 14, color: 'var(--ink-2)' } },
        'AI employees run your workflows on a schedule. they build knowledge, write their own code, and optimize against evals every cycle.'
      ),
      h('span', { className: 'btn primary' }, 'book a demo →'),
      h('div', { className: 'annot', style: { position: 'absolute', top: 40, left: 20, transform: 'rotate(-8deg)' } },
        'employees as metaphor')
    ),
    // employee cards
    h('div', { style: { padding: '12px 20px 28px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 } },
      employees.map((e, i) =>
        h('div', { key: i, className: `sketch-box thin rotate-${(i%3)+1}`, style: { padding: 12 } },
          h('div', { className: 'sketch-circle', style: { width: 44, height: 44, marginBottom: 10, background: 'var(--paper-2)' } }),
          h('div', { className: 'h-hand', style: { fontSize: 22 } }, e.name),
          h('div', { className: 'mono', style: { color: 'var(--ink-3)', marginBottom: 8 } }, e.role),
          h('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap' } },
            h('span', { className: 'sketch-pill', style: { fontSize: 9 } }, `runs ${e.runs}`),
            h('span', { className: 'sketch-pill', style: { fontSize: 9 } }, `skills ${e.skills}`)
          )
        )
      )
    ),
    h('div', { style: { padding: '0 20px 18px' } },
      h('div', { className: 'mono', style: { color: 'var(--ink-3)', textAlign: 'center', fontSize: 10 } },
        '+ 12 employee templates · or spin up your own'
      )
    )
  );
}

/* ============================================================
   V3 — Dashboard / reporting hero
   ============================================================ */
function LandingV3() {
  return h('div', { className: 'wire', style: { padding: 0 } },
    h('div', { style: { padding: '14px 20px', display: 'flex', alignItems: 'center', borderBottom: '1.5px dashed var(--ink-4)' } },
      h('span', { className: 'h-hand', style: { fontSize: 22 } }, 'workflow.co'),
      h('span', { className: 'mono', style: { marginLeft: 'auto', color: 'var(--ink-3)' } }, 'OSS · self-host · cloud')
    ),
    h('div', { style: { padding: '22px 24px 8px' } },
      h('h1', { className: 'h-hand h-md', style: { margin: '0 0 6px' } },
        'an operating system for ', h('span', { style: { color: 'var(--accent)' } }, 'ai workforces')
      ),
      h('p', { style: { margin: '0 0 14px', fontSize: 13, color: 'var(--ink-2)', maxWidth: 480 } },
        'schedule workflows. watch them run. read the reports. the org-level view your AI team has been missing.'
      )
    ),
    // dashboard mock
    h('div', { style: { padding: '0 20px 18px' } },
      h('div', { className: 'sketch-box', style: { padding: 14, background: 'var(--paper-2)' } },
        // stat row
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 12 } },
          [['active wf', '24'], ['evals ↑', '+18%'], ['saved $', '$142k'], ['cycles', '1,204']].map(([l, v], i) =>
            h('div', { key: i, className: 'sketch-box thin', style: { padding: 8, background: 'var(--paper)' } },
              h('div', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 9 } }, l),
              h('div', { className: 'h-hand', style: { fontSize: 24 } }, v)
            )
          )
        ),
        // chart ph
        h('div', { style: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 } },
          h('div', { className: 'sketch-box thin', style: { padding: 8, background: 'var(--paper)', height: 120, position: 'relative' } },
            h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'eval score over time'),
            h('svg', { viewBox: '0 0 200 60', style: { width: '100%', height: 80 } },
              h('path', { d: 'M5 50 Q 30 45, 50 40 T 100 25 T 150 18 T 195 10',
                stroke: 'var(--accent-2)', strokeWidth: 2, fill: 'none' }),
              h('path', { d: 'M5 55 L5 55 M50 55 L50 55 M100 55 L100 55 M195 55 L195 55',
                stroke: 'var(--ink-3)', strokeWidth: 1 })
            )
          ),
          h('div', { className: 'sketch-box thin', style: { padding: 8, background: 'var(--paper)', height: 120 } },
            h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)', marginBottom: 6 } }, 'top workflows'),
            ['aws-cost', 'qa-regress', 'lead-score'].map((w, i) =>
              h('div', { key: i, style: { display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0', borderTop: i ? '1px dashed var(--ink-4)' : 'none' } },
                h('span', null, w),
                h('span', { style: { color: 'var(--accent-3)' } }, '↑')
              )
            )
          )
        )
      )
    ),
    h('div', { style: { padding: '8px 24px 22px', display: 'flex', gap: 10 } },
      h('span', { className: 'btn primary' }, 'book a demo'),
      h('span', { className: 'btn ghost' }, 'see sample report')
    ),
    h('div', { className: 'annot', style: { position: 'absolute', top: 60, right: 30, transform: 'rotate(5deg)' } },
      'data-forward →')
  );
}

/* ============================================================
   V4 — Terminal / code-first, OSS hero
   ============================================================ */
function LandingV4() {
  return h('div', { className: 'wire', style: { padding: 0 } },
    h('div', { style: { padding: '14px 20px', display: 'flex', alignItems: 'center', borderBottom: '1.5px dashed var(--ink-4)' } },
      h('span', { className: 'h-hand', style: { fontSize: 22 } }, 'workflow.co'),
      h('div', { style: { marginLeft: 'auto', display: 'flex', gap: 8 } },
        h('span', { className: 'sketch-pill' }, '★ 4.2k'),
        h('span', { className: 'sketch-pill ghost' }, 'MIT')
      )
    ),
    h('div', { style: { padding: '36px 28px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'center' } },
      h('div', null,
        h('div', { className: 'mono', style: { color: 'var(--accent)', marginBottom: 10 } }, '// open source, self-improving workflows'),
        h('h1', { className: 'h-hand h-lg', style: { margin: '0 0 10px', lineHeight: 0.9 } },
          'your workflows,',
          h('br'),
          h('span', { style: { color: 'var(--accent)' } }, 'their own team.')
        ),
        h('p', { style: { fontSize: 13, color: 'var(--ink-2)', margin: '0 0 14px' } },
          'fork it. run it anywhere. your AI employees do the work, build knowledge, and keep getting better.'
        ),
        h('div', { style: { display: 'flex', gap: 8 } },
          h('span', { className: 'btn primary' }, 'book demo'),
          h('span', { className: 'btn ghost' }, 'git clone ↓')
        )
      ),
      // terminal
      h('div', { className: 'sketch-box', style: { padding: 0, background: '#1A1A1A', color: 'var(--paper)' } },
        h('div', { style: { padding: '6px 10px', borderBottom: '1px solid #333', display: 'flex', gap: 4 } },
          ['#FF5F56', '#FFBD2E', '#27C93F'].map(c =>
            h('span', { key: c, style: { width: 8, height: 8, borderRadius: '50%', background: c, display: 'inline-block' } })
          ),
          h('span', { className: 'mono', style: { marginLeft: 8, color: '#888', fontSize: 9 } }, '~/workflows')
        ),
        h('pre', { className: 'mono', style: { margin: 0, padding: 10, fontSize: 10, lineHeight: 1.6, color: '#E5DCC5' } },
          h('span', { style: { color: '#888' } }, '$ '), 'wf create aws-cost-optimizer\n',
          h('span', { style: { color: '#888' } }, '↳ '), h('span', { style: { color: 'var(--accent)' } }, 'learning cycle #1 complete\n'),
          h('span', { style: { color: '#888' } }, '↳ '), 'eval score: 0.42 → 0.71\n',
          h('span', { style: { color: '#888' } }, '↳ '), 'skills discovered: 4 new\n',
          h('span', { style: { color: '#888' } }, '↳ '), 'next run: 0 2 * * *\n\n',
          h('span', { style: { color: '#888' } }, '$ '), h('span', { style: { color: 'var(--accent-2)' } }, 'wf assign ada aws-cost\n'),
          h('span', { style: { color: '#888' } }, '↳ '), 'ada is now on call. ✓'
        )
      )
    )
  );
}

/* ============================================================
   V5 — COMBINED (V2 + V3): employees + use-cases + learning dashboard
   ============================================================ */
function LandingV5() {
  const useCases = [
    { t: 'aws cost optimizer', tag: 'finops', color: 'var(--accent)' },
    { t: 'QA regression', tag: 'eng', color: 'var(--accent-2)' },
    { t: 'lead scoring', tag: 'growth', color: 'var(--accent-3)' },
    { t: 'support triage', tag: 'ops', color: 'var(--accent)' },
    { t: 'weekly metrics', tag: 'data', color: 'var(--accent-2)' },
    { t: 'security audit', tag: 'sec', color: 'var(--accent-3)' },
  ];
  return h('div', { className: 'wire', style: { padding: 0 } },
    // nav
    h('div', { style: { padding: '14px 20px', display: 'flex', alignItems: 'center', borderBottom: '1.5px dashed var(--ink-4)' } },
      h('span', { className: 'h-hand', style: { fontSize: 22 } }, 'workflow.co'),
      h('div', { style: { marginLeft: 'auto', display: 'flex', gap: 8 } },
        h('span', { className: 'sketch-pill ghost' }, '★ open source'),
        h('span', { className: 'sketch-pill accent' }, 'book demo')
      )
    ),

    // HERO — employees metaphor
    h('div', { style: { padding: '28px 28px 14px', textAlign: 'center', position: 'relative' } },
      h('div', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 11, marginBottom: 6 } },
        '// workflows that learn while they work'),
      h('h1', { className: 'h-hand h-lg', style: { margin: '0 0 8px', lineHeight: 0.95 } },
        'hire ', h('span', { className: 'underline-scribble' }, 'employees'), '.'),
      h('h1', { className: 'h-hand h-lg', style: { margin: '0 0 12px', color: 'var(--ink-3)', lineHeight: 0.95 } },
        'assign them workflows.'),
      h('p', { style: { maxWidth: 440, margin: '0 auto 14px', fontSize: 13, color: 'var(--ink-2)' } },
        'long-running workflows for specific jobs. they run on a schedule. evals grade every cycle. your AI staff get better, faster, cheaper — forever.'
      ),
      h('div', { style: { display: 'flex', gap: 10, justifyContent: 'center' } },
        h('span', { className: 'btn primary' }, 'book a demo →'),
        h('span', { className: 'btn ghost' }, '⌘ github')
      ),
      h('div', { className: 'annot', style: { position: 'absolute', top: 30, right: 20, transform: 'rotate(-6deg)' } },
        '← the metaphor')
    ),

    // SECTION 1 — use cases strip
    h('div', { style: { padding: '18px 22px 10px', borderTop: '1.5px dashed var(--ink-4)' } },
      h('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 } },
        h('div', { className: 'h-hand', style: { fontSize: 22 } }, 'workflows for every job'),
        h('div', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 10 } }, '12 templates · fork any →')
      ),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 } },
        useCases.map((u, i) =>
          h('div', { key: i, className: `sketch-box thin rotate-${(i%3)+1}`, style: { padding: '8px 10px' } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 } },
              h('span', { style: { width: 6, height: 6, borderRadius: '50%', background: u.color, display: 'inline-block' } }),
              h('span', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, u.tag)
            ),
            h('div', { className: 'h-hand', style: { fontSize: 18, lineHeight: 1.05 } }, u.t)
          )
        )
      ),
      h('div', { className: 'annot', style: { textAlign: 'right', marginTop: 6, transform: 'rotate(2deg)' } },
        'specific > general'
      )
    ),

    // SECTION 2 — learning dashboard (V3 style, tied to cost + eval)
    h('div', { style: { padding: '14px 22px 10px', borderTop: '1.5px dashed var(--ink-4)' } },
      h('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 } },
        h('div', { className: 'h-hand', style: { fontSize: 22 } },
          'every cycle: ', h('span', { style: { color: 'var(--accent-3)' } }, 'better'), ' · ',
          h('span', { style: { color: 'var(--accent)' } }, 'cheaper')),
        h('div', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 10 } }, 'live · across your org')
      ),
      // stat strip
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 10 } },
        [
          ['eval score', '0.91', '↑ +0.49', 'var(--accent-3)'],
          ['cost / run', '$0.18', '↓ -72%', 'var(--accent-3)'],
          ['cycles', '1,204', 'this mo', 'var(--ink-3)'],
          ['skills built', '89', 'reused 3x', 'var(--accent-2)'],
        ].map(([l, v, d, c], i) =>
          h('div', { key: i, className: 'sketch-box thin', style: { padding: 8, background: 'var(--paper-2)' } },
            h('div', { className: 'mono', style: { fontSize: 8, color: 'var(--ink-3)' } }, l),
            h('div', { className: 'h-hand', style: { fontSize: 22, lineHeight: 1 } }, v),
            h('div', { className: 'mono', style: { fontSize: 9, color: c } }, d)
          )
        )
      ),
      // twin charts
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
        // eval up
        h('div', { className: 'sketch-box thin', style: { padding: 10, background: 'var(--paper)' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } },
            h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'eval score over cycles'),
            h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--accent-3)' } }, '↑ rising')
          ),
          h('svg', { viewBox: '0 0 200 70', style: { width: '100%', height: 76 } },
            h('line', { x1: 0, y1: 60, x2: 200, y2: 60, stroke: 'var(--ink-4)', strokeDasharray: '2 2' }),
            h('path', { d: 'M5 55 Q 25 52, 45 45 T 90 30 T 140 18 T 195 10',
              stroke: 'var(--accent-3)', strokeWidth: 2.2, fill: 'none' }),
            // fills
            h('path', { d: 'M5 55 Q 25 52, 45 45 T 90 30 T 140 18 T 195 10 L195 60 L5 60 Z',
              fill: 'var(--accent-3)', opacity: 0.12 }),
            // dots
            ...[[45,45],[90,30],[140,18],[195,10]].map(([x,y],k) =>
              h('circle', { key: k, cx: x, cy: y, r: 2.2, fill: 'var(--accent-3)' }))
          )
        ),
        // cost down
        h('div', { className: 'sketch-box thin', style: { padding: 10, background: 'var(--paper)' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' } },
            h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'cost per run over cycles'),
            h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--accent-3)' } }, '↓ falling')
          ),
          h('svg', { viewBox: '0 0 200 70', style: { width: '100%', height: 76 } },
            h('line', { x1: 0, y1: 60, x2: 200, y2: 60, stroke: 'var(--ink-4)', strokeDasharray: '2 2' }),
            h('path', { d: 'M5 12 Q 25 18, 45 28 T 90 40 T 140 50 T 195 56',
              stroke: 'var(--accent)', strokeWidth: 2.2, fill: 'none' }),
            h('path', { d: 'M5 12 Q 25 18, 45 28 T 90 40 T 140 50 T 195 56 L195 60 L5 60 Z',
              fill: 'var(--accent)', opacity: 0.12 }),
            ...[[45,28],[90,40],[140,50],[195,56]].map(([x,y],k) =>
              h('circle', { key: k, cx: x, cy: y, r: 2.2, fill: 'var(--accent)' }))
          )
        )
      ),
      // inline explainer
      h('div', { style: { marginTop: 10, padding: 10, background: 'var(--paper-2)', border: '1.5px dashed var(--ink-3)', borderRadius: 10, display: 'flex', gap: 12, alignItems: 'center' } },
        h('span', { className: 'h-hand', style: { fontSize: 28, color: 'var(--accent)', flexShrink: 0 } }, 'how?'),
        h('span', { style: { fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.4 } },
          'evals grade every run against your rubric. the workflow rewrites its weakest step, caches winning skills, and prunes the rest. the longer it runs, the better and cheaper it gets.'
        )
      )
    ),

    // SECTION 3 — cycle 1 vs cycle 50 proof
    h('div', { style: { padding: '14px 22px 20px', borderTop: '1.5px dashed var(--ink-4)' } },
      h('div', { className: 'h-hand', style: { fontSize: 22, marginBottom: 8 } }, 'the compounding effect'),
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: 8, alignItems: 'center' } },
        h('div', { className: 'sketch-box thin', style: { padding: 10, background: 'var(--paper-2)' } },
          h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'cycle 01'),
          h('div', { style: { display: 'flex', gap: 12, marginTop: 4 } },
            h('div', null,
              h('div', { className: 'h-hand', style: { fontSize: 24 } }, '0.42'),
              h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'eval')
            ),
            h('div', null,
              h('div', { className: 'h-hand', style: { fontSize: 24 } }, '$0.64'),
              h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, '/ run')
            )
          )
        ),
        h('div', { style: { textAlign: 'center' } }, h(window.Arrow, { w: 40, hh: 24, variant: 2, color: 'var(--accent)' })),
        h('div', { className: 'sketch-box', style: { padding: 10, background: 'var(--paper)', boxShadow: '3px 3px 0 var(--ink)' } },
          h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--accent-3)' } }, 'cycle 050'),
          h('div', { style: { display: 'flex', gap: 12, marginTop: 4 } },
            h('div', null,
              h('div', { className: 'h-hand', style: { fontSize: 24, color: 'var(--accent-3)' } }, '0.91'),
              h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'eval')
            ),
            h('div', null,
              h('div', { className: 'h-hand', style: { fontSize: 24, color: 'var(--accent-3)' } }, '$0.18'),
              h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, '/ run')
            )
          )
        )
      ),
      h('div', { style: { marginTop: 14, textAlign: 'center' } },
        h('span', { className: 'btn primary' }, 'book a demo — see your numbers →')
      )
    )
  );
}

window.LandingVariations = [
  { id: 'v1', label: 'node-graph hero', caption: 'workflow canvas front & center', Component: LandingV1 },
  { id: 'v2', label: 'employees metaphor', caption: 'AI team as hero', Component: LandingV2 },
  { id: 'v3', label: 'ops dashboard', caption: 'reporting as proof', Component: LandingV3 },
  { id: 'v4', label: 'OSS / terminal', caption: 'for the dev-adjacent buyer', Component: LandingV4 },
];
