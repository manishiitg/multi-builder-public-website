// Hi-fi "How it works" page sections
// uses window.h from shell

/* ===== HERO (page-specific) ===== */
function HowHero({ name }) {
  return h('section', { className: 'hero', style: { paddingBottom: 40 } },
    h('div', { className: 'hero-bg' }),
    h('div', { className: 'shell hero-inner' },
      h('div', { style: { display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' } },
        h('span', { className: 'tag violet' }, h('span', { className: 'dot' }), 'How it works')
      ),
      h('h1', { className: 'display', style: { textAlign: 'center', marginBottom: 24, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' } },
        'Workflows that ',
        h('span', { style: { background: 'linear-gradient(120deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'teach themselves.')
      ),
      h('p', { className: 'lead', style: { maxWidth: 680, margin: '0 auto 16px', textAlign: 'center' } },
        'Define the job in plain English. Set a rubric. ', name, ' runs, grades, rewrites, and remembers — then does it all again, better.'
      )
    )
  );
}

/* ===== THE LOOP (5 steps + loopback) ===== */
function TheLoop() {
  const steps = [
    { n: '01', t: 'Define', d: 'Describe the job in plain English. Set a rubric. Pick the CLIs you trust.',
      code: 'workflow "aws-cost-optimizer":\n  goal: flag spend anomalies\n  rubric: evals/cost.yml' },
    { n: '02', t: 'Run', d: 'The workflow executes on schedule or on demand. Steps call models, MCP servers, APIs.',
      code: '▸ gemini-cli   : fetch billing\n▸ claude-code  : analyze spikes\n▸ codex-cli    : generate report' },
    { n: '03', t: 'Eval', d: 'Every output is graded against your rubric — automatically.',
      code: '✓ found savings      0.95\n✓ no false positives 0.82\n△ readable report    0.68' },
    { n: '04', t: 'Learn', d: 'Winning skills get pinned. Weak steps get rewritten. New python + knowledge gets stored.',
      code: '+ pinned: summarize_spikes\n↻ rewrite: format_report\n+ fact: prod cluster = us-east-1' },
    { n: '05', t: 'Repeat', d: 'Next cycle inherits everything. The workflow compounds — forever.',
      code: 'cycle 143 → eval 0.91\ncycle 144 → eval 0.94\ncycle 145 → eval 0.96' },
  ];
  return h('section', { className: 'section' },
    h('div', { className: 'shell' },
      h('div', { style: { textAlign: 'center', marginBottom: 56 } },
        h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// The learning loop'),
        h('h2', { className: 'h2', style: { maxWidth: 720, margin: '0 auto' } },
          'Five steps. ',
          h('span', { style: { color: 'var(--fg-3)' } }, 'One loop. Every workflow.')
        )
      ),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, position: 'relative' } },
        steps.map((s, i) =>
          h('div', { key: i, className: 'card', style: { padding: 20, position: 'relative', minHeight: 240 } },
            h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--violet)', marginBottom: 12 } }, s.n),
            h('h3', { style: { fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 8px' } }, s.t),
            h('p', { style: { fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.45, margin: '0 0 14px' } }, s.d),
            h('pre', { className: 'mono', style: {
              margin: 0, fontSize: 10, color: 'var(--fg-3)',
              background: 'var(--bg-3)', border: '1px solid var(--line)', borderRadius: 8,
              padding: 10, whiteSpace: 'pre-wrap', lineHeight: 1.5
            } }, s.code),
            i < steps.length - 1 && h('svg', {
              width: 18, height: 18, viewBox: '0 0 18 18',
              style: { position: 'absolute', top: '50%', right: -15, transform: 'translateY(-50%)', zIndex: 3 }
            },
              h('circle', { cx: 9, cy: 9, r: 8, fill: 'var(--bg)', stroke: 'var(--violet)' }),
              h('path', { d: 'M6 5 L10 9 L6 13', stroke: 'var(--violet)', strokeWidth: 1.6, fill: 'none' })
            )
          )
        )
      ),
      // loop-back arc
      h('div', { style: { marginTop: 28, position: 'relative' } },
        h('svg', { viewBox: '0 0 1000 80', width: '100%', style: { display: 'block' } },
          h('defs', null,
            h('linearGradient', { id: 'loopG', x1: 0, x2: 1 },
              h('stop', { offset: 0, stopColor: 'var(--violet)' }),
              h('stop', { offset: 1, stopColor: 'var(--cyan)' })
            )
          ),
          h('path', { d: 'M970 10 Q 990 70, 500 70 Q 10 70, 30 10',
            stroke: 'url(#loopG)', strokeWidth: 1.5, fill: 'none', strokeDasharray: '6 6' }),
          h('path', { d: 'M22 18 L30 10 L38 18', stroke: 'var(--violet)', strokeWidth: 1.5, fill: 'none' }),
          h('rect', { x: 440, y: 55, width: 120, height: 26, rx: 13, fill: 'var(--bg-2)', stroke: 'var(--violet-line)' }),
          h('text', { x: 500, y: 72, textAnchor: 'middle', fontSize: 11, fill: 'var(--violet)',
            style: { fontFamily: 'JetBrains Mono' } }, 'loop · forever')
        )
      )
    )
  );
}

/* ===== BEFORE / AFTER ===== */
function BeforeAfter() {
  const cards = [
    { label: 'cycle 001', score: 0.42, tone: 'warn',
      note: 'Rough first draft. Lots of human hand-holding.',
      rows: [['Skills', '3'], ['Python scripts', '0'], ['Human edits', '22'], ['Cost / run', '$0.64'], ['Duration', '14m 22s']] },
    { label: 'cycle 050', score: 0.91, tone: 'success',
      note: 'Optimized. Hands-off. Ships to Slack on its own.',
      rows: [['Skills', '14'], ['Python scripts', '8'], ['Human edits', '1'], ['Cost / run', '$0.18'], ['Duration', '3m 11s']] },
  ];
  return h('section', { className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { style: { textAlign: 'center', marginBottom: 56 } },
        h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Same workflow, 50 cycles apart'),
        h('h2', { className: 'h2' },
          'Cycle 1 vs ',
          h('span', { style: { background: 'linear-gradient(90deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'cycle 50'),
          '.'
        )
      ),
      h('div', { className: 'grid cols-2', style: { marginBottom: 24 } },
        cards.map((c, i) =>
          h('div', { key: i, className: 'card', style: {
            padding: 32,
            background: i ? 'linear-gradient(160deg, var(--bg-2), var(--violet-dim))' : 'var(--bg)',
            borderColor: i ? 'var(--violet-line)' : 'var(--line)'
          } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 } },
              h('div', null,
                h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', marginBottom: 8 } }, c.label),
                h('div', { style: { fontSize: 64, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1,
                  color: i ? 'var(--violet)' : 'var(--fg-3)' } }, c.score.toFixed(2)),
                h('div', { style: { fontSize: 13, color: 'var(--fg-2)', marginTop: 10, fontStyle: 'italic' } }, '"' + c.note + '"')
              ),
              h('span', { className: `tag ${i ? 'violet' : ''}` },
                h('span', { className: 'dot', style: { background: i ? 'var(--success)' : 'var(--warn)' } }),
                i ? 'shipping' : 'draft'
              )
            ),
            h('div', { style: { borderTop: '1px solid var(--line)', paddingTop: 14 } },
              c.rows.map(([k, v], j) =>
                h('div', { key: j, style: {
                  display: 'flex', justifyContent: 'space-between', padding: '8px 0',
                  borderTop: j ? '1px solid var(--line)' : 'none'
                } },
                  h('span', { style: { fontSize: 13, color: 'var(--fg-3)' } }, k),
                  h('span', { className: 'mono', style: { fontSize: 13, color: 'var(--fg)' } }, v)
                )
              )
            )
          )
        )
      ),
      h('div', { className: 'card', style: { padding: 24 } },
        h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', marginBottom: 14 } },
          '// what the workflow built for itself between cycle 1 and cycle 50'),
        h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
          [
            'fetch_cost_data.py', 'summarize_spikes', 'slack_alert', 'forecast_next_mo',
            'gpu_utilization_check', 'spot_recommendation', 'reserved_instance_lint',
            'anomaly_classifier', 'savings_plan_match', 'tag_auditor', 'idle_resource_scan'
          ].map(s =>
            h('span', { key: s, className: 'tag' }, h('span', { className: 'dot' }), s)
          )
        )
      )
    )
  );
}

/* ===== ARTIFACTS (3 cols: knowledge / skills / python) ===== */
function Artifacts() {
  const cols = [
    {
      icon: 'K', label: 'Knowledge', sub: 'facts the workflow learned',
      color: 'var(--violet)',
      items: [
        'our prod cluster is us-east-1',
        'cost spikes on Tuesdays',
        'budget ceiling = $40k / month',
        'Slack alerts only for > $500 delta',
        'GPU team ignores < 60% utilization',
      ]
    },
    {
      icon: 'S', label: 'Skills', sub: 'reusable, versioned steps',
      color: 'var(--cyan)',
      items: [
        'summarize_invoice@v4',
        'compare_to_forecast@v2',
        'flag_anomaly@v7',
        'write_slack_digest@v3',
        'group_by_service@v1',
      ]
    },
    {
      icon: 'P', label: 'Python', sub: 'auto-generated scripts',
      color: 'var(--lime)',
      items: [
        'fetch_cost.py',
        'cluster_spikes.py',
        'notify.py',
        'forecast_regression.py',
        'tag_normalizer.py',
      ]
    },
  ];
  return h('section', { className: 'section' },
    h('div', { className: 'shell' },
      h('div', { style: { textAlign: 'center', marginBottom: 56 } },
        h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Artifacts'),
        h('h2', { className: 'h2', style: { maxWidth: 720, margin: '0 auto 16px' } },
          'Every cycle generates ',
          h('span', { style: { background: 'linear-gradient(90deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'institutional knowledge'),
          '.'
        ),
        h('p', { className: 'lead', style: { maxWidth: 560, margin: '0 auto' } },
          'Workflows don\'t just run. They build a library you can read, edit, search, and share across the whole team.')
      ),
      h('div', { className: 'grid cols-3' },
        cols.map((col, i) =>
          h('div', { key: i, className: 'card', style: { padding: 24, position: 'relative', overflow: 'hidden' } },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 } },
              h('div', { style: {
                width: 44, height: 44, borderRadius: 12,
                background: `linear-gradient(135deg, ${col.color}, var(--bg-3))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 500, color: '#0A0A0B'
              } }, col.icon),
              h('div', null,
                h('div', { style: { fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em' } }, col.label),
                h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', marginTop: 2 } }, col.sub)
              )
            ),
            h('div', { style: { display: 'flex', flexDirection: 'column', gap: 1 } },
              col.items.map((it, j) =>
                h('div', { key: j, style: {
                  padding: '10px 12px',
                  background: 'var(--bg-3)',
                  borderRadius: 8,
                  marginBottom: 6,
                  fontSize: 12, lineHeight: 1.4,
                  color: 'var(--fg-2)',
                  fontFamily: i < 2 ? (i === 0 ? 'inherit' : 'JetBrains Mono') : 'JetBrains Mono',
                  fontStyle: i === 0 ? 'italic' : 'normal'
                } }, i === 0 ? '"' + it + '"' : it)
              )
            )
          )
        )
      ),
      h('div', { style: {
        marginTop: 32, padding: '20px 24px',
        background: 'var(--bg-2)', border: '1px solid var(--violet-line)', borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14
      } },
        h('span', { className: 'mono', style: { fontSize: 12, color: 'var(--violet)' } }, '→'),
        h('span', { style: { fontSize: 14, color: 'var(--fg-2)' } },
          'All of it flows into a ',
          h('span', { style: { color: 'var(--fg)', fontWeight: 500 } }, 'shared knowledgebase'),
          ' that\'s reusable across workflows, teams, and employees.'
        )
      )
    )
  );
}

/* ===== EVAL RUBRIC ===== */
function EvalRubric() {
  const items = [
    { c: 'Did it find real savings?', v: 0.95, keep: true },
    { c: 'Did it avoid false positives?', v: 0.82, keep: true },
    { c: 'Is the report readable?', v: 0.68, keep: false },
    { c: 'Was it on schedule?', v: 1.00, keep: true },
    { c: 'Did Slack digest feel useful?', v: 0.74, keep: true },
  ];
  return h('section', { className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Evals run the show'),
          h('h2', { className: 'h2', style: { marginBottom: 20 } },
            'You set the rubric. ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'The workflow tunes itself against it — every cycle.')
          ),
          h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 28 } },
            h('div', { className: 'card', style: { padding: 18 } },
              h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', marginBottom: 6 } }, 'Failing? auto-retry'),
              h('div', { style: { fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' } }, 'Self-heal'),
              h('div', { style: { fontSize: 12, color: 'var(--fg-2)', marginTop: 8, lineHeight: 1.4 } },
                'Low scores trigger a rewrite of the weak step. Next run tries the new version.')
            ),
            h('div', { className: 'card', style: { padding: 18, borderColor: 'var(--violet-line)' } },
              h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--violet)', marginBottom: 6 } }, 'Winning? keep it'),
              h('div', { style: { fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' } }, 'Freeze'),
              h('div', { style: { fontSize: 12, color: 'var(--fg-2)', marginTop: 8, lineHeight: 1.4 } },
                'High-scoring skills get pinned. Future cycles don\'t regress on them.')
            )
          )
        ),
        h('div', { className: 'card', style: { padding: 28 } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 } },
            h('div', null,
              h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)' } }, 'evals/aws-cost-optimizer.yml'),
              h('div', { style: { fontSize: 22, fontWeight: 500, marginTop: 4 } }, 'Rubric · cycle 142')
            ),
            h('span', { className: 'tag violet' }, h('span', { className: 'dot' }), 'score 0.84 avg')
          ),
          items.map((r, i) =>
            h('div', { key: i, style: {
              padding: '14px 0', borderTop: i ? '1px solid var(--line)' : 'none'
            } },
              h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 } },
                h('span', { style: { fontSize: 14 } }, r.c),
                h('span', { className: 'mono', style: {
                  fontSize: 11, color: r.keep ? 'var(--success)' : 'var(--warn)',
                  padding: '3px 8px', borderRadius: 999,
                  background: r.keep ? 'rgba(74,222,128,0.12)' : 'rgba(251,191,36,0.12)',
                  border: `1px solid ${r.keep ? 'rgba(74,222,128,0.3)' : 'rgba(251,191,36,0.35)'}`
                } }, r.keep ? 'keep ✓' : 'rewrite ↻')
              ),
              h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 48px', gap: 12, alignItems: 'center' } },
                h('div', { style: { height: 6, background: 'var(--bg-3)', borderRadius: 4, overflow: 'hidden' } },
                  h('div', { style: {
                    height: '100%', width: `${r.v * 100}%`,
                    background: r.keep ? 'linear-gradient(90deg, var(--violet), var(--cyan))' : 'var(--warn)'
                  } })
                ),
                h('span', { className: 'mono', style: { fontSize: 12, color: 'var(--fg-2)', textAlign: 'right' } }, r.v.toFixed(2))
              )
            )
          )
        )
      )
    )
  );
}

Object.assign(window, { HowHero, TheLoop, BeforeAfter, Artifacts, EvalRubric });
