// 4 screen mockups: Builder, Run Setup, Live Execution, Review & History

/* ===== CHROME (reused) ===== */
function WinChrome({ title, right }) {
  return h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--line)', background: 'var(--bg-3)' } },
    h('div', { style: { display: 'flex', alignItems: 'center', gap: 12 } },
      h('div', { style: { display: 'flex', gap: 6 } },
        ['#FF5F57', '#FEBC2E', '#28C840'].map(c =>
          h('span', { key: c, style: { width: 10, height: 10, borderRadius: '50%', background: c } }))
      ),
      h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)' } }, title)
    ),
    right
  );
}

/* ===== 1. BUILDER ===== */
function BuilderScreen() {
  const stepTypes = [
    { k: 'normal', label: 'Fetch open PRs', sub: 'github · list pulls', icon: '→', color: 'var(--violet)' },
    { k: 'normal', label: 'Classify risk', sub: 'claude-code · rubric', icon: '→', color: 'var(--violet)' },
    { k: 'decision', label: 'risk ≥ 0.8?', sub: 'branch · yes / no', icon: '◆', color: 'var(--amber)' },
    { k: 'human', label: 'Ask author for context', sub: 'waits for reply', icon: '◉', color: 'var(--cyan)' },
    { k: 'delegate', label: 'Summarize diff', sub: 'delegates to codex-cli', icon: '⇢', color: 'var(--pink)' },
    { k: 'output', label: 'Post PR summary', sub: 'output · github comment', icon: '▤', color: 'var(--lime)' },
  ];
  return h('section', { className: 'section' },
    h('div', { className: 'shell' },
      h('div', { style: { display: 'grid', gridTemplateColumns: '340px 1fr', gap: 40, alignItems: 'start' } },
        // copy
        h('div', { style: { position: 'sticky', top: 100 } },
          h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--violet)', marginBottom: 10 } }, '01 · BUILDER'),
          h('h2', { className: 'h2', style: { marginBottom: 16 } },
            'A canvas for ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'the whole process.')
          ),
          h('p', { className: 'lead', style: { marginBottom: 22 } },
            'A workflow is a complete operating package \u2014 not just a prompt.'
          ),
          h('div', { style: { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 18px', fontSize: 13, color: 'var(--fg-2)' } },
            [
              ['Plan',         'DAG of steps on the canvas'],
              ['Evals',        'scorecards that grade each run'],
              ['Skills',       'tools, APIs, MCP servers'],
              ['Secrets',      'scoped credentials per step'],
              ['Sub-agents',   'Claude, Codex, Gemini, open models'],
              ['Knowledge',    'docs, repos, past runs'],
              ['Reporting',    'where the final output lands'],
            ].map(([k, v], i) =>
              h(React.Fragment, { key: i },
                h('span', { style: { color: 'var(--fg)', fontWeight: 500 } }, k),
                h('span', { style: { color: 'var(--fg-3)' } }, v)
              )
            )
          )
        ),
        // mockup
        h('div', { className: 'card', style: { padding: 0, overflow: 'hidden' } },
          h(WinChrome, { title: 'forge · pr-reviewer.workflow · builder',
            right: h('div', { style: { display: 'flex', gap: 8 } },
              h('span', { className: 'tag' }, h('span', { className: 'dot' }), 'draft'),
              h('button', { className: 'btn sm violet' }, 'Save v13')
            )
          }),
          h('div', { style: { display: 'grid', gridTemplateColumns: '180px 1fr 220px', minHeight: 420 } },
            // left: palette
            h('div', { style: { borderRight: '1px solid var(--line)', padding: 14 } },
              h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.1em', marginBottom: 10 } }, 'ADD STEP'),
              ['Normal', 'Decision', 'Human input', 'Delegation', 'Output', 'Skill', 'Browser'].map((s, i) =>
                h('div', { key: i, style: { padding: '8px 10px', fontSize: 12, color: 'var(--fg-2)', borderRadius: 6,
                  background: i === 0 ? 'var(--bg-3)' : 'transparent', marginBottom: 2, cursor: 'pointer' } },
                  '+ ' + s)
              )
            ),
            // center: canvas
            h('div', { style: { padding: 20, background:
              'radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0) 0 0 / 20px 20px'
            } },
              h('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
                stepTypes.map((s, i) =>
                  h('div', { key: i },
                    h('div', { style: {
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 14px',
                      background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 10,
                      borderLeft: `3px solid ${s.color}`
                    } },
                      h('span', { style: { fontSize: 14, color: s.color, width: 16, textAlign: 'center' } }, s.icon),
                      h('div', { style: { flex: 1 } },
                        h('div', { style: { fontSize: 13, color: 'var(--fg)', fontWeight: 500 } }, s.label),
                        h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', marginTop: 2 } }, s.sub)
                      ),
                      h('span', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.08em' } }, s.k)
                    ),
                    i < stepTypes.length - 1 && h('div', { style: { height: 12, display: 'flex', justifyContent: 'center' } },
                      h('div', { style: { width: 1, background: 'var(--line-2)' } })
                    )
                  )
                )
              )
            ),
            // right: inspector
            h('div', { style: { borderLeft: '1px solid var(--line)', padding: 16, background: 'var(--bg-3)' } },
              h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.1em', marginBottom: 12 } }, 'INSPECTOR'),
              h('div', { style: { fontSize: 14, color: 'var(--fg)', fontWeight: 500, marginBottom: 2 } }, 'Classify risk'),
              h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', marginBottom: 14 } }, 'step · 02'),
              [
                ['Model', 'claude-code'],
                ['Skill', 'risk_rubric@v3'],
                ['Output', 'risk_score · 0-1'],
                ['Retry', 'on fail · 2x'],
                ['Timeout', '60s'],
              ].map(([k, v], i) =>
                h('div', { key: i, style: { padding: '8px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
                  h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--fg-4)', marginBottom: 3 } }, k.toUpperCase()),
                  h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--fg)' } }, v)
                )
              )
            )
          )
        )
      )
    )
  );
}

/* ===== 2. OBSERVABILITY ===== */
function RunSetupScreen() {
  // sparkline helper
  const spark = (vals, color) => {
    const max = Math.max(...vals), min = Math.min(...vals);
    const W = 160, H = 36, pad = 2;
    const pts = vals.map((v, i) => {
      const x = pad + (i / (vals.length - 1)) * (W - pad * 2);
      const y = H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
      return [x, y];
    });
    const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const area = d + ` L${pts[pts.length-1][0].toFixed(1)},${H} L${pts[0][0].toFixed(1)},${H} Z`;
    return h('svg', { width: W, height: H, style: { display: 'block' } },
      h('path', { d: area, fill: color, fillOpacity: 0.15 }),
      h('path', { d, fill: 'none', stroke: color, strokeWidth: 1.5 })
    );
  };

  const logLines = [
    ['14:22:41', 'step', 'fetch-billing', 'done · 2.1s · $0.004', 'var(--success)'],
    ['14:22:43', 'step', 'classify-spend', 'done · 3.8s · $0.019', 'var(--success)'],
    ['14:22:47', 'eval',  'cost-accuracy',  'PASS · 0.94', 'var(--lime)'],
    ['14:22:47', 'step', 'rank-savings',   'done · 1.2s · $0.008', 'var(--success)'],
    ['14:22:49', 'step', 'draft-report',   'running · streaming…', 'var(--amber)'],
  ];

  const schedules = [
    { n: 'daily cost sweep',   when: 'daily · 08:00 UTC',  next: 'in 4h 12m', a: true },
    { n: 'weekly eval replay', when: 'mon · 06:00 UTC',    next: 'in 2d',     a: false },
    { n: 'on PR merged',       when: 'github webhook',     next: 'event',     a: false },
  ];

  return h('section', { className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { style: { display: 'grid', gridTemplateColumns: '340px 1fr', gap: 40, alignItems: 'start' } },
        // copy (now on the left)
        h('div', { style: { position: 'sticky', top: 100 } },
          h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--cyan)', marginBottom: 10 } }, '02 · OBSERVABILITY'),
          h('h2', { className: 'h2', style: { marginBottom: 16 } },
            'See every run. ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'Down to the token.')
          ),
          h('p', { className: 'lead', style: { marginBottom: 22 } },
            'Once live, the operator view is the product \u2014 the same DAG, now streaming.'
          ),
          h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 } }, 'surfaces'),
          h('div', { style: { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 18px', fontSize: 13 } },
            [
              ['Live logs',    'per-step streams'],
              ['Cost',         'tokens \u00b7 $ \u00b7 trend'],
              ['Evals',        'pass/fail + scores'],
              ['Schedules',    'crons & webhooks'],
            ].map(([k, v], i) =>
              h(React.Fragment, { key: i },
                h('span', { style: { color: 'var(--fg)', fontWeight: 500 } }, k),
                h('span', { style: { color: 'var(--fg-3)' } }, v)
              )
            )
          )
        ),
        // mockup: observability dashboard
        h('div', { className: 'card', style: { padding: 0, overflow: 'hidden' } },
          h(WinChrome, { title: 'forge · aws-cost-optimizer \u00b7 observe',
            right: h('div', { style: { display: 'flex', gap: 8 } },
              h('span', { className: 'tag' }, h('span', { className: 'dot', style: { background: 'var(--success)' } }), 'live'),
              h('button', { className: 'btn sm ghost' }, 'Replay run')
            )
          }),
          h('div', { style: { padding: 20 } },
            // top row: 3 stat cards with sparklines
            h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 } },
              [
                { label: 'RUNS · 24H',       value: '1,284',  delta: '+12%', color: 'var(--violet)',
                  vals: [40, 52, 48, 61, 55, 72, 68, 80, 74, 92, 88, 104] },
                { label: 'COST · 24H',       value: '$48.12', delta: '\u221218%', color: 'var(--lime)',
                  vals: [78, 72, 80, 68, 74, 60, 58, 52, 55, 48, 46, 42] },
                { label: 'EVAL PASS RATE',   value: '94.2%',  delta: '+3.1pt', color: 'var(--cyan)',
                  vals: [82, 85, 84, 88, 87, 90, 89, 92, 91, 93, 94, 94] },
              ].map((s, i) =>
                h('div', { key: i, style: { padding: '12px 14px', background: 'var(--bg-3)', border: '1px solid var(--line)', borderRadius: 10 } },
                  h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.1em', marginBottom: 8 } }, s.label),
                  h('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 } },
                    h('div', { style: { fontSize: 22, fontWeight: 500, color: 'var(--fg)', letterSpacing: '-0.01em' } }, s.value),
                    h('div', { className: 'mono', style: { fontSize: 11, color: s.color } }, s.delta)
                  ),
                  spark(s.vals, s.color)
                )
              )
            ),
            // live log stream
            h('div', { style: { marginBottom: 14 } },
              h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 } },
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em' } }, 'LIVE LOG \u00b7 run_4f92a'),
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)' } }, 'tail \u00b7 5 of 47')
              ),
              h('div', { style: { background: '#0A0A0B', border: '1px solid var(--line)', borderRadius: 10, padding: '10px 14px', fontFamily: 'var(--font-mono, monospace)', fontSize: 11, lineHeight: 1.7 } },
                logLines.map((l, i) =>
                  h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '62px 40px 1fr auto', gap: 10, color: 'var(--fg-2)' } },
                    h('span', { style: { color: 'var(--fg-4)' } }, l[0]),
                    h('span', { style: { color: l[1] === 'eval' ? 'var(--lime)' : 'var(--cyan)' } }, l[1]),
                    h('span', { style: { color: 'var(--fg)' } }, l[2]),
                    h('span', { style: { color: l[4], textAlign: 'right' } }, l[3])
                  )
                )
              )
            ),
            // bottom row: eval scorecard + schedules
            h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
              // evals
              h('div', { style: { border: '1px solid var(--line)', borderRadius: 10, padding: 14 } },
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em', marginBottom: 10 } }, 'EVAL SCORECARD'),
                [
                  { n: 'cost-accuracy',     s: 0.94, p: true },
                  { n: 'recommendation-q',  s: 0.88, p: true },
                  { n: 'regression-vs-v11', s: 0.71, p: false },
                ].map((e, i) =>
                  h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '1fr 70px 44px', gap: 8, alignItems: 'center', padding: '7px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
                    h('span', { className: 'mono', style: { fontSize: 12, color: 'var(--fg)' } }, e.n),
                    h('div', { style: { height: 4, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' } },
                      h('div', { style: { height: '100%', width: (e.s * 100) + '%', background: e.p ? 'var(--lime)' : 'var(--amber)' } })
                    ),
                    h('span', { className: 'mono', style: { fontSize: 11, color: e.p ? 'var(--lime)' : 'var(--amber)', textAlign: 'right' } }, e.p ? 'PASS' : 'WARN')
                  )
                )
              ),
              // schedules
              h('div', { style: { border: '1px solid var(--line)', borderRadius: 10, padding: 14 } },
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em', marginBottom: 10 } }, 'SCHEDULES'),
                schedules.map((s, i) =>
                  h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '10px 1fr auto', gap: 10, alignItems: 'center', padding: '7px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
                    h('span', { style: { width: 8, height: 8, borderRadius: '50%', background: s.a ? 'var(--success)' : 'var(--fg-4)' } }),
                    h('div', null,
                      h('div', { style: { fontSize: 12, color: 'var(--fg)' } }, s.n),
                      h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)' } }, s.when)
                    ),
                    h('span', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)' } }, s.next)
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

/* ===== 3. LIVE EXECUTION ===== */
function LiveExecScreen() {
  const steps = [
    { n: 'Fetch billing data', s: 'done', t: '14s', extra: null, c: 'var(--success)' },
    { n: 'Cluster spikes by service', s: 'done', t: '8s', extra: null, c: 'var(--success)' },
    { n: 'Classify anomalies', s: 'done', t: '22s', extra: null, c: 'var(--success)' },
    { n: 'Summarize for Slack', s: 'running', t: '…', extra: 'claude-code is drafting', c: 'var(--violet)' },
    { n: 'Post to #finops-alerts', s: 'waiting', t: 'needs approval', extra: 'content preview ready', c: 'var(--cyan)' },
    { n: 'Archive to knowledgebase', s: 'queued', t: '—', extra: null, c: 'var(--fg-4)' },
  ];
  return h('section', { className: 'section' },
    h('div', { className: 'shell' },
      h('div', { style: { display: 'grid', gridTemplateColumns: '340px 1fr', gap: 40, alignItems: 'start' } },
        h('div', null,
          h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--lime)', marginBottom: 10 } }, '03 · LIVE EXECUTION'),
          h('h2', { className: 'h2', style: { marginBottom: 16 } },
            'State, ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'always visible.')
          ),
          h('p', { className: 'lead', style: { marginBottom: 20 } },
            'Running, waiting, needs-input, done, failed \u2014 at a glance.'
          ),
          h('div', { style: { padding: 14, background: 'var(--bg-2)', border: '1px solid var(--cyan)', borderLeft: '3px solid var(--cyan)', borderRadius: 10 } },
            h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--cyan)', marginBottom: 6 } }, 'PAUSED · NEEDS YOU'),
            h('div', { style: { fontSize: 13, color: 'var(--fg)', marginBottom: 4 } }, '"Post to #finops-alerts" is waiting for your approval.'),
            h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)' } }, 'handoff \u2014 not a crash')
          )
        ),
        // mockup
        h('div', { className: 'card', style: { padding: 0, overflow: 'hidden' } },
          h(WinChrome, { title: 'forge · run #4287 · acme-prod',
            right: h('div', { style: { display: 'flex', gap: 8 } },
              h('span', { className: 'tag' }, h('span', { className: 'dot', style: { background: 'var(--violet)' } }), 'running · 44s'),
              h('button', { className: 'btn sm ghost' }, 'Pause'),
              h('button', { className: 'btn sm ghost' }, 'Logs')
            )
          }),
          h('div', { style: { padding: 20 } },
            // progress bar
            h('div', { style: { display: 'flex', gap: 4, marginBottom: 20 } },
              steps.map((s, i) =>
                h('div', { key: i, style: {
                  flex: 1, height: 4, borderRadius: 2,
                  background: s.s === 'done' ? 'var(--success)' : s.s === 'running' ? 'var(--violet)' : s.s === 'waiting' ? 'var(--cyan)' : 'var(--bg-3)'
                } })
              )
            ),
            // steps
            steps.map((s, i) =>
              h('div', { key: i, style: {
                display: 'grid', gridTemplateColumns: '28px 1fr 100px',
                alignItems: 'center', gap: 14,
                padding: '14px 14px',
                background: s.s === 'waiting' ? 'rgba(103,232,249,0.06)' : s.s === 'running' ? 'var(--bg-3)' : 'transparent',
                borderRadius: 10,
                borderLeft: s.s === 'waiting' ? '2px solid var(--cyan)' : s.s === 'running' ? '2px solid var(--violet)' : '2px solid transparent'
              } },
                h('div', { style: { textAlign: 'center' } },
                  s.s === 'done' && h('svg', { width: 18, height: 18, viewBox: '0 0 18 18' },
                    h('circle', { cx: 9, cy: 9, r: 8, fill: 'var(--success)' }),
                    h('path', { d: 'M5 9 L8 12 L13 6', stroke: '#0A0A0B', strokeWidth: 1.8, fill: 'none' })),
                  s.s === 'running' && h('div', { style: {
                    width: 14, height: 14, margin: '2px auto', borderRadius: '50%',
                    border: '2px solid var(--violet)', borderTopColor: 'transparent',
                    animation: 'spin 0.9s linear infinite'
                  } }),
                  s.s === 'waiting' && h('div', { style: { width: 14, height: 14, margin: '2px auto', borderRadius: '50%', background: 'var(--cyan)' }, className: 'anim-pulse' }),
                  s.s === 'queued' && h('div', { style: { width: 10, height: 10, margin: '4px auto', borderRadius: '50%', border: '1.5px solid var(--fg-4)' } })
                ),
                h('div', null,
                  h('div', { style: { fontSize: 13, color: 'var(--fg)', fontWeight: 500 } }, s.n),
                  s.extra && h('div', { className: 'mono', style: { fontSize: 10, color: s.c, marginTop: 3 } }, s.extra)
                ),
                h('div', { className: 'mono', style: { fontSize: 11, color: s.c, textAlign: 'right' } }, s.t)
              )
            ),
            // approval action
            h('div', { style: { marginTop: 14, padding: '14px 16px', background: 'var(--bg-3)', border: '1px dashed var(--cyan)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 } },
              h('div', null,
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--cyan)', marginBottom: 4 } }, 'HUMAN HANDOFF'),
                h('div', { style: { fontSize: 13, color: 'var(--fg)' } }, 'Approve Slack post for 3 spikes (+$842 vs forecast)?')
              ),
              h('div', { style: { display: 'flex', gap: 8 } },
                h('button', { className: 'btn sm ghost' }, 'Edit draft'),
                h('button', { className: 'btn sm violet' }, 'Approve & post')
              )
            )
          )
        )
      )
    ),
    h('style', null, '@keyframes spin{to{transform:rotate(360deg)}}')
  );
}

/* ===== 4. INSPECT ===== */
function ReviewScreen() {
  const trace = [
    { n: 'fetch-billing',    s: 'ok',   t: '2.14s', cost: '$0.004', model: 'tool', tokens: '\u2014',           depth: 0 },
    { n: 'classify-spend',   s: 'ok',   t: '3.82s', cost: '$0.019', model: 'haiku-4.5',    tokens: '4.2k / 1.1k',  depth: 0 },
    { n: 'classify-spend \u00b7 llm call', s: 'ok', t: '3.70s', cost: '$0.018', model: 'haiku-4.5', tokens: '4.2k / 1.1k', depth: 1 },
    { n: 'rank-savings',     s: 'ok',   t: '1.20s', cost: '$0.008', model: 'sonnet-4.5',   tokens: '2.8k / 0.4k',  depth: 0 },
    { n: 'eval \u00b7 cost-accuracy', s: 'pass', t: '0.91s', cost: '$0.003', model: 'opus-4.1',    tokens: '1.9k / 0.2k',  depth: 0 },
    { n: 'draft-report',     s: 'run',  t: '4.12s', cost: '$0.021', model: 'sonnet-4.5',   tokens: '6.4k / 2.1k',  depth: 0 },
  ];
  const kbHits = [
    { t: 'runbook/ec2-reserved-instances.md',  ln: '\u00a724 \u2014 rightsizing heuristic',  score: 0.92 },
    { t: 'past-run/#4261 \u00b7 summary',      ln: 'same spike pattern on acme-eu',          score: 0.81 },
    { t: 'aws-pricing/savings-plans.csv',      ln: 'row 142 \u2014 1yr no-upfront',          score: 0.77 },
  ];
  const learnings = [
    { d: 'today',      t: 'prompt: added "ignore transient spikes < $50"', src: 'run #4287 review' },
    { d: '3d ago',     t: 'routing: send >$2k findings to sonnet-4.5',      src: 'eval regression' },
    { d: '1w ago',     t: 'kb: added ec2-reserved-instances.md',            src: 'human annotation' },
  ];

  return h('section', { className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' } },
        // mockup: inspector
        h('div', { className: 'card', style: { padding: 0, overflow: 'hidden' } },
          h(WinChrome, { title: 'forge \u00b7 run #4287 \u00b7 inspect',
            right: h('div', { style: { display: 'flex', gap: 8 } },
              h('span', { className: 'tag' }, h('span', { className: 'dot', style: { background: 'var(--success)' } }), 'ok \u00b7 0.92'),
              h('button', { className: 'btn sm ghost' }, 'Replay'),
              h('button', { className: 'btn sm ghost' }, 'Diff v11')
            )
          }),
          // tabs
          h('div', { style: { display: 'flex', gap: 0, borderBottom: '1px solid var(--line)', padding: '0 14px' } },
            ['Trace', 'History', 'Evals', 'Knowledge', 'Learnings'].map((t, i) =>
              h('div', { key: t, style: {
                padding: '12px 14px', fontSize: 12, color: i === 0 ? 'var(--fg)' : 'var(--fg-3)',
                borderBottom: i === 0 ? '2px solid var(--pink)' : '2px solid transparent',
                fontWeight: i === 0 ? 500 : 400,
                cursor: 'pointer'
              } }, t)
            )
          ),
          h('div', { style: { padding: 16 } },
            // TRACE
            h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em', marginBottom: 8 } }, 'EXECUTION TRACE \u00b7 12.3s total \u00b7 $0.073'),
            h('div', { style: { border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 } },
              h('div', { style: {
                display: 'grid', gridTemplateColumns: '1fr 90px 70px 130px 70px',
                padding: '9px 14px', background: 'var(--bg-3)',
                fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono'
              } },
                h('span', null, 'Step'),
                h('span', null, 'Model'),
                h('span', null, 'Dur'),
                h('span', null, 'Tokens in / out'),
                h('span', { style: { textAlign: 'right' } }, 'Cost')
              ),
              trace.map((r, i) =>
                h('div', { key: i, style: {
                  display: 'grid', gridTemplateColumns: '1fr 90px 70px 130px 70px',
                  padding: '10px 14px', alignItems: 'center',
                  borderTop: '1px solid var(--line)',
                  background: i === 5 ? 'var(--violet-dim)' : 'transparent',
                  fontSize: 12
                } },
                  h('span', { style: { display: 'flex', alignItems: 'center', gap: 8, paddingLeft: r.depth * 16 } },
                    h('span', { style: {
                      width: 6, height: 6, borderRadius: '50%',
                      background: r.s === 'ok' ? 'var(--success)' : r.s === 'pass' ? 'var(--lime)' : 'var(--violet)',
                      flexShrink: 0
                    } }),
                    h('span', { className: 'mono', style: { color: r.depth ? 'var(--fg-3)' : 'var(--fg)', fontSize: 12 } }, r.n)
                  ),
                  h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)' } }, r.model),
                  h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-2)' } }, r.t),
                  h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)' } }, r.tokens),
                  h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-2)', textAlign: 'right' } }, r.cost)
                )
              )
            ),
            // two-up: KB hits + Learnings
            h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
              // KB
              h('div', { style: { border: '1px solid var(--line)', borderRadius: 10, padding: 14 } },
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em', marginBottom: 10 } }, 'KB RETRIEVAL \u00b7 classify-spend'),
                kbHits.map((k, i) =>
                  h('div', { key: i, style: { padding: '8px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
                    h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 2 } },
                      h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg)' } }, k.t),
                      h('span', { className: 'mono', style: { fontSize: 10, color: 'var(--cyan)' } }, k.score.toFixed(2))
                    ),
                    h('div', { style: { fontSize: 11, color: 'var(--fg-3)' } }, k.ln)
                  )
                )
              ),
              // learnings
              h('div', { style: { border: '1px solid var(--line)', borderRadius: 10, padding: 14 } },
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em', marginBottom: 10 } }, 'LEARNINGS APPLIED'),
                learnings.map((l, i) =>
                  h('div', { key: i, style: { padding: '8px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
                    h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 2 } },
                      h('span', { style: { fontSize: 11, color: 'var(--fg)' } }, l.t),
                      h('span', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)', flexShrink: 0 } }, l.d)
                    ),
                    h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)' } }, '\u2190 ' + l.src)
                  )
                )
              )
            )
          )
        ),
        // copy
        h('div', { style: { position: 'sticky', top: 100 } },
          h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--pink)', marginBottom: 10 } }, '04 \u00b7 INSPECT'),
          h('h2', { className: 'h2', style: { marginBottom: 16 } },
            'Open every run. ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'Read every decision.')
          ),
          h('p', { className: 'lead', style: { marginBottom: 22 } },
            'Every run leaves a full trace. Replay, diff, and promote findings into the next version.'
          ),
          h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 } }, 'what you can inspect'),
          h('div', { style: { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 18px', fontSize: 13 } },
            [
              ['Traces',      'step-by-step with prompts'],
              ['History',     'every past run, replayable'],
              ['Evals',       'scorecards + regressions'],
              ['Knowledge',   'what was retrieved, why'],
              ['Learnings',   'what the workflow updated'],
              ['Diffs',       'v12 vs v11, side by side'],
            ].map(([k, v], i) =>
              h(React.Fragment, { key: i },
                h('span', { style: { color: 'var(--fg)', fontWeight: 500 } }, k),
                h('span', { style: { color: 'var(--fg-3)' } }, v)
              )
            )
          )
        )
      )
    )
  );
}

Object.assign(window, { BuilderScreen, RunSetupScreen, LiveExecScreen, ReviewScreen });
