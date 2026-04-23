// "How it works" — the learning loop is the story
// uses window.h

/* V1 — Horizontal learning loop diagram */
function HowV1() {
  const steps = [
    { n: '01', t: 'define', d: 'describe what you want. in plain english.' },
    { n: '02', t: 'run', d: 'workflow executes on schedule.' },
    { n: '03', t: 'eval', d: 'grade the output against your rubric.' },
    { n: '04', t: 'learn', d: 'new skills, code, knowledge stored.' },
    { n: '05', t: 'repeat', d: 'next cycle is better than the last.' },
  ];
  return h('div', { className: 'wire' },
    h('div', { className: 'mono', style: { color: 'var(--ink-3)', marginBottom: 4 } }, 'how workflows improve'),
    h('h2', { className: 'h-hand h-md', style: { margin: '0 0 22px' } },
      'the ', h('span', { className: 'underline-scribble' }, 'learning loop')
    ),
    h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 20 } },
      steps.map((s, i) =>
        h('div', { key: i, className: 'sketch-box thin', style: { padding: 10, minHeight: 120, position: 'relative' } },
          h('div', { className: 'mono', style: { color: 'var(--accent)', fontSize: 9 } }, s.n),
          h('div', { className: 'h-hand', style: { fontSize: 22, margin: '4px 0 6px' } }, s.t),
          h('div', { style: { fontSize: 11, color: 'var(--ink-2)', lineHeight: 1.3 } }, s.d),
          i < steps.length - 1 && h('div', { style: { position: 'absolute', right: -14, top: '50%', transform: 'translateY(-50%)', zIndex: 2 } },
            h(window.Arrow, { w: 24, hh: 14, variant: 3, color: 'var(--accent)' })
          )
        )
      )
    ),
    h('div', { className: 'annot', style: { position: 'absolute', top: 16, right: 22, transform: 'rotate(4deg)' } },
      'cycle N+1 > cycle N'
    ),
    // loop-back arrow
    h('div', { style: { textAlign: 'center', marginTop: 10 } },
      h('svg', { width: '80%', height: 50, viewBox: '0 0 400 50', style: { display: 'block', margin: '0 auto' } },
        h('path', { d: 'M380 10 Q 390 40, 200 40 Q 10 40, 20 10', stroke: 'var(--accent)', strokeWidth: 2, fill: 'none', strokeDasharray: '5 4' }),
        h('path', { d: 'M14 16 L20 10 L26 16', stroke: 'var(--accent)', strokeWidth: 2, fill: 'none' }),
        h('text', { x: 200, y: 25, textAnchor: 'middle', fontFamily: 'Caveat', fontSize: 20, fill: 'var(--accent)' }, 'loop.')
      )
    )
  );
}

/* V2 — Before / after a workflow learns */
function HowV2() {
  return h('div', { className: 'wire' },
    h('h2', { className: 'h-hand h-md', style: { margin: '0 0 6px' } }, 'cycle 1 vs cycle 50'),
    h('div', { className: 'mono', style: { color: 'var(--ink-3)', marginBottom: 18 } }, 'same workflow. 50 cycles apart.'),
    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 } },
      [
        { label: 'cycle 001', score: 0.42, note: 'rough. lots of rework.', rows: ['3 skills', '0 python scripts', 'human edits: 22'] },
        { label: 'cycle 050', score: 0.91, note: 'optimized. hands-off.', rows: ['14 skills', '8 python scripts', 'human edits: 1'] },
      ].map((c, i) =>
        h('div', { key: i, className: 'sketch-box', style: { padding: 14, background: i ? 'var(--paper)' : 'var(--paper-2)' } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 } },
            h('span', { className: 'mono', style: { color: 'var(--ink-3)' } }, c.label),
            h('span', { className: 'h-hand', style: { fontSize: 28, color: i ? 'var(--accent-3)' : 'var(--ink-3)' } }, c.score)
          ),
          h('div', { style: { fontSize: 12, fontStyle: 'italic', color: 'var(--ink-2)', marginBottom: 10 } }, `"${c.note}"`),
          c.rows.map((r, j) =>
            h('div', { key: j, className: 'mono', style: { fontSize: 10, color: 'var(--ink-2)', padding: '4px 0', borderTop: j ? '1px dashed var(--ink-4)' : 'none' } }, '· ' + r)
          )
        )
      )
    ),
    h('div', { style: { marginTop: 18, padding: 10, background: 'var(--paper-2)', border: '1.5px dashed var(--ink-3)', borderRadius: 10 } },
      h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--ink-3)', marginBottom: 4 } }, 'what the workflow built for itself:'),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
        ['fetch_cost_data.py', 'summarize_spikes', 'slack_alert', 'forecast_next_mo', 'gpu_utilization_check', 'spot_recommendation'].map(s =>
          h('span', { key: s, className: 'sketch-pill', style: { fontSize: 10 } }, s)
        )
      )
    )
  );
}

/* V3 — What gets generated (knowledge / skills / code) */
function HowV3() {
  return h('div', { className: 'wire' },
    h('h2', { className: 'h-hand h-md', style: { margin: '0 0 6px' } },
      'every cycle generates ', h('span', { className: 'underline-scribble' }, 'artifacts')
    ),
    h('p', { style: { fontSize: 13, color: 'var(--ink-2)', margin: '0 0 18px' } },
      'workflows don\'t just run. they build institutional knowledge you can read, edit, and share.'
    ),
    h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 } },
      [
        { icon: '📘', t: 'knowledge', sub: 'facts learned', items: ['"our prod cluster is us-east-1"', '"cost spikes on tuesdays"', '"budget = $40k/mo"'] },
        { icon: '🧩', t: 'skills', sub: 'reusable steps', items: ['summarize_invoice', 'compare_to_forecast', 'flag_anomaly'] },
        { icon: '⌨️', t: 'python', sub: 'generated code', items: ['fetch_cost.py', 'cluster_spikes.py', 'notify.py'] },
      ].map((col, i) =>
        h('div', { key: i, className: `sketch-box thin rotate-${(i%3)+1}`, style: { padding: 12 } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 } },
            h('div', { className: 'sketch-circle', style: { width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper-2)', fontSize: 16 } },
              h('span', { style: { fontFamily: 'Caveat', fontSize: 18, color: 'var(--accent)', fontWeight: 700 } }, ['K', 'S', 'P'][i])
            ),
            h('div', null,
              h('div', { className: 'h-hand', style: { fontSize: 22 } }, col.t),
              h('div', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 9 } }, col.sub)
            )
          ),
          col.items.map((it, j) =>
            h('div', { key: j, className: 'mono', style: { fontSize: 10, padding: '4px 6px', background: 'var(--paper-2)', borderRadius: 4, marginBottom: 4, color: 'var(--ink-2)' } }, it)
          )
        )
      )
    ),
    h('div', { style: { marginTop: 16, padding: 10, borderTop: '1.5px dashed var(--ink-4)', fontSize: 11, color: 'var(--ink-3)', textAlign: 'center' } },
      h('span', { className: 'mono' }, 'all of it → shared knowledgebase → reusable across workflows + teams')
    ),
    h('div', { className: 'annot', style: { position: 'absolute', top: 12, right: 16, transform: 'rotate(3deg)' } },
      'the payoff'
    )
  );
}

/* V4 — Eval rubric / scoring visualization */
function HowV4() {
  return h('div', { className: 'wire' },
    h('h2', { className: 'h-hand h-md', style: { margin: '0 0 6px' } }, 'evals run the show'),
    h('p', { style: { fontSize: 13, color: 'var(--ink-2)', margin: '0 0 16px' } },
      'you set the rubric. the workflow tunes itself against it — every single cycle.'
    ),
    h('div', { className: 'sketch-box thin', style: { padding: 12, marginBottom: 12, background: 'var(--paper-2)' } },
      h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--ink-3)', marginBottom: 8 } }, 'rubric :: aws-cost-optimizer'),
      [
        ['did it find real savings?', 0.95],
        ['did it avoid false positives?', 0.82],
        ['is the report readable?', 0.90],
        ['was it on schedule?', 1.00],
      ].map(([crit, val], i) =>
        h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '1fr 100px 40px', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: i ? '1px dashed var(--ink-4)' : 'none' } },
          h('span', { style: { fontSize: 12 } }, crit),
          h('div', { style: { height: 8, background: 'var(--paper)', border: '1px solid var(--ink)', borderRadius: 4, overflow: 'hidden' } },
            h('div', { style: { width: `${val * 100}%`, height: '100%', background: val > 0.85 ? 'var(--accent-3)' : 'var(--accent)' } })
          ),
          h('span', { className: 'mono', style: { fontSize: 10, textAlign: 'right' } }, val.toFixed(2))
        )
      )
    ),
    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 } },
      h('div', { className: 'sketch-box thin', style: { padding: 10 } },
        h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'failing? auto-retry.'),
        h('div', { className: 'h-hand', style: { fontSize: 22 } }, 'self-heal'),
        h('div', { style: { fontSize: 11, color: 'var(--ink-2)' } }, 'when evals drop, the workflow regenerates the weak step and tries again.')
      ),
      h('div', { className: 'sketch-box thin', style: { padding: 10 } },
        h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'winning? keep it.'),
        h('div', { className: 'h-hand', style: { fontSize: 22 } }, 'freeze'),
        h('div', { style: { fontSize: 11, color: 'var(--ink-2)' } }, 'high-scoring skills get pinned so future cycles don\'t regress.')
      )
    )
  );
}

window.HowVariations = [
  { id: 'v1', label: 'the loop', caption: '5 steps + loopback', Component: HowV1 },
  { id: 'v2', label: 'before/after', caption: 'cycle 1 vs cycle 50', Component: HowV2 },
  { id: 'v3', label: 'artifacts output', caption: 'knowledge + skills + code', Component: HowV3 },
  { id: 'v4', label: 'eval rubric', caption: 'scoring + self-heal', Component: HowV4 },
];
