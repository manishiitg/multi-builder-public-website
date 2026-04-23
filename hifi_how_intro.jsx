// "How it works" — redesigned around the workflow lifecycle
// Opening + 4 lifecycle moments + connecting sections

/* ===== NEW HERO ===== */
function HowHero2({ name }) {
  return h('section', { className: 'hero', style: { paddingBottom: 30 } },
    h('div', { className: 'hero-bg' }),
    h('div', { className: 'shell hero-inner' },
      h('div', { style: { display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' } },
        h('span', { className: 'tag violet' }, h('span', { className: 'dot' }), 'How it works'),
        h('span', { className: 'tag amber' }, h('span', { className: 'dot' }), 'Early alpha')
      ),
      h('h1', { className: 'display', style: { textAlign: 'center', marginBottom: 24, maxWidth: 960, margin: '0 auto 24px' } },
        'Design a workflow once. ',
        h('span', { style: { background: 'linear-gradient(120deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'Run it forever.')
      ),
      h('p', { className: 'lead', style: { maxWidth: 640, margin: '0 auto 8px', textAlign: 'center' } },
        'Design once. Run forever. Every run leaves a trail \u2014 and makes the next one better.'
      )
    )
  );
}

/* ===== WHAT A WORKFLOW IS ===== */
function WhatIsWorkflow() {
  const parts = [
    { label: 'Goal', v: 'review incoming PRs, flag risky diffs', color: 'var(--violet)' },
    { label: 'Steps', v: '7 steps · fetch → classify → summarize → post', color: 'var(--cyan)' },
    { label: 'Decisions', v: 'route by risk score · escalate if > 0.8', color: 'var(--lime)' },
    { label: 'Human approvals', v: 'pause before posting a block-comment', color: 'var(--amber)' },
    { label: 'Outputs', v: 'PR summary, risk report, Slack thread', color: 'var(--pink)' },
  ];
  return h('section', { className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// What a workflow is'),
          h('h2', { className: 'h2', style: { marginBottom: 20 } },
            'A repeatable job ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'you can design once and run many times.')
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: 18 } },
            [
              {
                label: 'at work',
                color: 'var(--violet)',
                items: [
                  'triage every inbound support ticket, route the top 3%',
                  'reconcile the month-end close, flag anomalies, file the report',
                  'collect SOC 2 evidence across every repo, every sprint',
                  'qualify inbound leads against ICP, draft the first reply',
                ],
              },
              {
                label: 'at home',
                color: 'var(--fg-3)',
                items: [
                  'watch three listing sites, ping me when something fits',
                  'plan next week\u2019s meals around what\u2019s in the fridge',
                  'read my saved articles Sunday morning, summarize the good ones',
                  'keep a running tab on my parents\u2019 Rx refills',
                ],
              },
            ].map((grp, gi) =>
              h('div', { key: gi },
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 } }, grp.label),
                h('div', { style: { display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--fg-2)' } },
                  grp.items.map((t, i) =>
                    h('div', { key: i, style: { display: 'flex', gap: 10, alignItems: 'center' } },
                      h('span', { style: { width: 4, height: 4, borderRadius: '50%', background: grp.color, flexShrink: 0 } }),
                      h('span', null, t)
                    )
                  )
                )
              )
            )
          )
        ),
        h('div', { className: 'card', style: { padding: 28 } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 18 } },
            h('span', { className: 'mono', style: { fontSize: 12, color: 'var(--fg-3)' } }, 'workflow :: pr-reviewer'),
            h('span', { className: 'tag violet' }, h('span', { className: 'dot' }), 'v12')
          ),
          parts.map((p, i) =>
            h('div', { key: i, style: {
              padding: '14px 0', borderTop: i ? '1px solid var(--line)' : 'none',
              display: 'grid', gridTemplateColumns: '130px 1fr', gap: 16, alignItems: 'center'
            } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
                h('span', { style: { width: 8, height: 8, borderRadius: '50%', background: p.color } }),
                h('span', { className: 'mono', style: { fontSize: 12, color: 'var(--fg-3)' } }, p.label)
              ),
              h('span', { style: { fontSize: 14, color: 'var(--fg)' } }, p.v)
            )
          )
        )
      )
    )
  );
}

/* ===== LIFECYCLE: 4 moments ===== */
function Lifecycle() {
  const moments = [
    { n: '01', t: 'Design',  d: 'Sketch the work on a visual canvas \u2014 steps, branches, approvals. Plan the process, not the prompt.',              k: 'Builder',       color: 'var(--violet)' },
    { n: '02', t: 'Run',     d: 'Kick it off on a schedule or on demand. Watch every step in real time. Approve when it asks.',                       k: 'Execution',     color: 'var(--cyan)' },
    { n: '03', t: 'Eval',    d: 'Every run is graded against the outcomes you care about. Clear score, clear reasoning, clear evidence.',              k: 'Evaluation',    color: 'var(--lime)' },
    { n: '04', t: 'Learn',   d: 'What worked gets written into a shared playbook. Steady steps turn into reusable code \u2014 faster and free to rerun.', k: 'Playbook',     color: 'var(--amber)' },
    { n: '05', t: 'Improve', d: 'Once a step runs clean three times in a row, it locks in. The next run is cheaper, quicker, and more reliable.',     k: 'Lock-in \u2192 Run', color: 'var(--pink)' },
  ];
  return h('section', { className: 'section', style: { background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' } },
    h('div', { className: 'shell' },
      h('div', { style: { textAlign: 'center', marginBottom: 56 } },
        h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// The loop'),
        h('h2', { className: 'h2' },
          'Design. Run. Eval. Learn. Improve. ',
          h('span', { style: { color: 'var(--fg-3)' } }, 'Then run again \u2014 better.')
        )
      ),
      h('div', { style: { position: 'relative' } },
        h('svg', {
          viewBox: '0 0 1000 120', preserveAspectRatio: 'none',
          style: { position: 'absolute', left: 0, right: 0, top: -40, width: '100%', height: 120, pointerEvents: 'none', zIndex: 1 }
        },
          h('defs', null,
            h('linearGradient', { id: 'loopG', x1: 0, x2: 1 },
              h('stop', { offset: 0, stopColor: 'var(--pink)', stopOpacity: 0.9 }),
              h('stop', { offset: 1, stopColor: 'var(--cyan)', stopOpacity: 0.9 })
            ),
            h('marker', { id: 'loopArrow', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' },
              h('path', { d: 'M0 0 L10 5 L0 10 z', fill: 'var(--cyan)' })
            )
          ),
          h('path', {
            d: 'M 900 80 C 900 10, 300 10, 300 80',
            stroke: 'url(#loopG)', strokeWidth: 1.5, fill: 'none',
            strokeDasharray: '5 5', markerEnd: 'url(#loopArrow)',
            className: 'anim-flow'
          }),
          h('text', { x: 600, y: 22, textAnchor: 'middle', fontSize: 11, fill: 'var(--fg-3)', style: { fontFamily: 'JetBrains Mono' } },
            'the loop closes \u2014 every run makes the next one better'
          )
        ),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, position: 'relative', zIndex: 2 } },
          moments.map((m, i) =>
            h('div', { key: i, className: 'card', style: { padding: 22, position: 'relative', minHeight: 240 } },
              h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 } },
                h('span', { className: 'mono', style: { fontSize: 11, color: m.color } }, m.n),
                h('span', { className: 'mono', style: { fontSize: 9, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.1em' } }, m.k)
              ),
              h('h3', { style: { fontSize: 24, fontWeight: 500, letterSpacing: '-0.03em', margin: '0 0 12px' } }, m.t),
              h('p', { style: { fontSize: 12.5, color: 'var(--fg-2)', lineHeight: 1.55, margin: 0 } }, m.d),
              i < moments.length - 1 && h('svg', {
                width: 14, height: 14, viewBox: '0 0 14 14',
                style: { position: 'absolute', top: 26, right: -10, zIndex: 3 }
              },
                h('path', { d: 'M3 2 L9 7 L3 12', stroke: 'var(--fg-4)', strokeWidth: 1.5, fill: 'none' })
              )
            )
          )
        )
      ),
      h('div', { style: { marginTop: 28, textAlign: 'center', fontSize: 13, color: 'var(--fg-3)' } },
        h('span', { className: 'mono' }, 'one workflow. many runs. compounding returns.')
      )
    )
  );
}

/* ===== SECTION INTRO (for the 4 mockups) ===== */
function MockupsIntro() {
  const surfaces = [
    { label: 'Live execution',    sub: 'what\u2019s happening now',       color: 'var(--violet)' },
    { label: 'Costs',              sub: 'tokens \u00b7 USD per run',        color: 'var(--cyan)' },
    { label: 'Evaluation reports', sub: 'score, reasoning, evidence',       color: 'var(--lime)' },
    { label: 'Playbook',           sub: 'what the workflow has learned',    color: 'var(--amber)' },
    { label: 'Scheduled runs',     sub: 'history across every cron',        color: 'var(--pink)' },
  ];
  return h('section', { className: 'section tight', style: { paddingBottom: 40 } },
    h('div', { className: 'shell', style: { textAlign: 'center' } },
      h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// The four screens'),
      h('h2', { className: 'h2', style: { maxWidth: 820, margin: '0 auto 28px' } },
        'One workflow, five views. ',
        h('span', { style: { color: 'var(--fg-3)' } }, 'Built for operators, not demos.')
      ),
      h('div', { style: { display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginTop: 8 } },
        surfaces.map((s, i) =>
          h('span', { key: i, className: 'tag', style: { padding: '8px 14px' } },
            h('span', { className: 'dot', style: { background: s.color } }),
            h('span', { style: { color: 'var(--fg)', fontWeight: 500, marginRight: 8 } }, s.label),
            h('span', { style: { color: 'var(--fg-3)' } }, s.sub)
          )
        )
      )
    )
  );
}

Object.assign(window, { HowHero2, WhatIsWorkflow, Lifecycle, MockupsIntro });
