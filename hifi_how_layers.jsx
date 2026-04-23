// Supporting layers, HITL + Scheduling, Trust checklist

/* ===== SUPPORTING LAYERS ===== */
function SupportLayers() {
  const layers = [
    {
      k: 'Skills', c: 'var(--violet)',
      sub: 'reusable expertise',
      d: 'Shared instructions and patterns attached to a workflow or step. Users see them without reading raw technical content.',
      chip: 'summarize_invoice@v4 · risk_rubric@v3 · slack_digest@v7'
    },
    {
      k: 'Knowledgebase', c: 'var(--cyan)',
      sub: 'workflow memory',
      d: 'Persistent facts a workflow learned. Reads from it, writes back into it, inspectable — not hidden magic.',
      chip: '"prod cluster = us-east-1" · "budget ceiling = $40k/mo"'
    },
    {
      k: 'Learn Code', c: 'var(--lime)',
      sub: 'exploratory → repeatable',
      d: 'Steps gradually turn working AI behavior into reusable python. The UI shows whether a step is still exploratory or has hardened.',
      chip: 'step 3 · hardened to cluster_spikes.py · 42 runs stable'
    },
    {
      k: 'Browser', c: 'var(--amber)',
      sub: 'navigate, log in, operate',
      d: 'For workflows that use real websites — with clearer feedback when navigating, waiting, blocked by login, or asking for approval.',
      chip: '▸ opening https://billing.aws.amazon.com · waiting on 2FA'
    },
    {
      k: 'Reporting', c: 'var(--pink)',
      sub: 'the final deliverable',
      d: 'The artifact the workflow exists to produce — a summary, a doc, a structured output. A destination, not an afterthought.',
      chip: 'weekly-finops-report.pdf · 14 pages · 3 stakeholders'
    },
    {
      k: 'Evaluation', c: 'var(--success)',
      sub: 'quality over time',
      d: 'Not the same as running. It measures whether the workflow performs well, consistently, and affordably across many runs.',
      chip: 'eval set · 32 cases · avg 0.88 · trending ↑'
    },
  ];
  return h('section', { className: 'section' },
    h('div', { className: 'shell' },
      h('div', { style: { textAlign: 'center', marginBottom: 56 } },
        h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Supporting layers'),
        h('h2', { className: 'h2', style: { maxWidth: 760, margin: '0 auto' } },
          'Boxes and arrows ',
          h('span', { style: { color: 'var(--fg-3)' } }, 'aren\'t enough.')
        )
      ),
      h('div', { className: 'grid cols-3' },
        layers.map((l, i) =>
          h('div', { key: i, className: 'card', style: { padding: 24, position: 'relative' } },
            h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                h('span', { style: { width: 10, height: 10, borderRadius: 3, background: l.c } }),
                h('h3', { style: { fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', margin: 0 } }, l.k)
              ),
              h('span', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.08em' } }, l.sub)
            ),
            h('p', { style: { fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.5, margin: '0 0 16px', minHeight: 80 } }, l.d),
            h('div', { className: 'mono', style: {
              fontSize: 10, color: 'var(--fg-3)',
              padding: '10px 12px',
              background: 'var(--bg-3)', borderRadius: 8,
              border: `1px solid var(--line)`,
              borderLeft: `2px solid ${l.c}`
            } }, l.chip)
          )
        )
      )
    )
  );
}

/* ===== HITL + SCHEDULING ===== */
function HitlAndSchedule() {
  return h('section', { className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { className: 'grid cols-2' },
        // HITL
        h('div', { className: 'card', style: { padding: 32 } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 } },
            h('span', { className: 'tag violet' }, h('span', { className: 'dot' }), 'Human-in-the-loop')
          ),
          h('h3', { className: 'h2', style: { margin: '0 0 16px', fontSize: 36 } },
            'A pause is a ',
            h('span', { style: { color: 'var(--violet)' } }, 'handoff'),
            ', not a failure.'
          ),
          h('p', { className: 'body', style: { marginBottom: 24 } },
            'Approve a decision. Answer a question. Drop in an OTP. Pick a route.'
          ),
          h('div', { style: { display: 'flex', flexDirection: 'column', gap: 10 } },
            [
              ['timely', 'You notice without hunting for it.'],
              ['easy to act on', 'The ask is contextual and short.'],
              ['recoverable', 'You can edit the draft before approving.'],
              ['notified', 'Slack, email, or in-app — your choice.'],
            ].map(([k, v], i) =>
              h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14, padding: '10px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
                h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--violet)' } }, k),
                h('span', { style: { fontSize: 13, color: 'var(--fg-2)' } }, v)
              )
            )
          )
        ),
        // Scheduling
        h('div', { className: 'card', style: { padding: 32 } },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 } },
            h('span', { className: 'tag' }, h('span', { className: 'dot', style: { background: 'var(--cyan)' } }), 'Scheduling')
          ),
          h('h3', { className: 'h2', style: { margin: '0 0 16px', fontSize: 36 } },
            'Just another way to ',
            h('span', { style: { color: 'var(--cyan)' } }, 'launch'),
            '. Not a different product.'
          ),
          h('p', { className: 'body', style: { marginBottom: 24 } },
            'Scheduled runs live in the same mental model as manual ones \u2014 same logs, same costs, same evals.'
          ),
          h('div', { style: { padding: 18, background: 'var(--bg-3)', borderRadius: 10, border: '1px solid var(--line)' } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 12 } },
              h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)' } }, 'aws-cost-optimizer · schedule'),
              h('span', { className: 'tag' }, h('span', { className: 'dot', style: { background: 'var(--success)' } }), 'active')
            ),
            h('div', { style: { fontSize: 15, color: 'var(--fg)', marginBottom: 10 } }, 'Daily at 08:00 UTC · 3 groups'),
            h('div', { style: { display: 'flex', gap: 4 } },
              Array.from({ length: 14 }, (_, i) =>
                h('div', { key: i, style: {
                  flex: 1, height: 24, borderRadius: 3,
                  background: i === 13 ? 'var(--violet)' : `rgba(167,139,250,${0.15 + i * 0.04})`
                } })
              )
            ),
            h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', marginTop: 8 } }, 'last 14 runs · all on time')
          )
        )
      )
    )
  );
}


Object.assign(window, { SupportLayers, HitlAndSchedule });
