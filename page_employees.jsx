// Employees section — 4 variations
// uses window.h

/* V1 — Employee roster grid */
function EmpV1() {
  const emps = [
    { name: 'ada', role: 'cloud cost optimizer', tier: 'senior', on: 'aws-cost, gcp-cost' },
    { name: 'mira', role: 'QA engineer', tier: 'mid', on: 'regression, smoke-e2e' },
    { name: 'leo', role: 'growth analyst', tier: 'junior', on: 'lead-scoring' },
    { name: 'kai', role: 'support triage', tier: 'senior', on: 'ticket-router' },
    { name: 'ren', role: 'data analyst', tier: 'mid', on: 'weekly-metrics' },
    { name: 'zoe', role: 'security auditor', tier: 'senior', on: 'iam-review' },
  ];
  return h('div', { className: 'wire' },
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 } },
      h('div', null,
        h('h2', { className: 'h-hand h-md', style: { margin: 0 } }, 'your AI staff'),
        h('div', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 11 } }, '6 employees · 14 active workflows')
      ),
      h('span', { className: 'btn ghost' }, '+ hire employee')
    ),
    h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
      emps.map((e, i) =>
        h('div', { key: i, className: 'sketch-box thin', style: { padding: 10 } },
          h('div', { style: { display: 'flex', gap: 8, marginBottom: 6 } },
            h('div', { className: 'sketch-circle', style: { width: 36, height: 36, background: 'var(--paper-2)', flexShrink: 0 } }),
            h('div', null,
              h('div', { className: 'h-hand', style: { fontSize: 20, lineHeight: 1 } }, e.name),
              h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, e.role)
            )
          ),
          h('div', { style: { fontSize: 10, color: 'var(--ink-2)', marginBottom: 6 } }, 'tier: ', h('b', null, e.tier)),
          h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'on: ', e.on)
        )
      )
    ),
    h('div', { className: 'annot', style: { position: 'absolute', top: 14, right: 16, transform: 'rotate(3deg)' } },
      'feels like a team page')
  );
}

/* V2 — Detailed employee profile */
function EmpV2() {
  return h('div', { className: 'wire' },
    h('div', { className: 'mono', style: { color: 'var(--ink-3)', marginBottom: 4 } }, 'employee profile'),
    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 18, alignItems: 'start' } },
      h('div', { style: { textAlign: 'center' } },
        h('div', { className: 'sketch-circle', style: { width: 100, height: 100, background: 'var(--paper-2)', margin: '0 auto 10px' } }),
        h('div', { className: 'h-hand', style: { fontSize: 32 } }, 'ada'),
        h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--ink-3)' } }, 'senior · hired 142 cycles ago'),
        h('div', { style: { marginTop: 10 } },
          h('span', { className: 'sketch-pill accent', style: { fontSize: 10 } }, '● on duty')
        )
      ),
      h('div', null,
        h('div', { style: { marginBottom: 10 } },
          h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'bio'),
          h('div', { style: { fontSize: 13, fontStyle: 'italic', color: 'var(--ink-2)' } },
            '"i find savings in aws bills. i summarize in slack. i don\'t wake anyone up unless it\'s urgent."'
          )
        ),
        h('div', { style: { marginBottom: 10 } },
          h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)', marginBottom: 4 } }, 'assigned workflows (3)'),
          ['aws-cost-optimizer-v4', 'gcp-reserved-audit', 'weekly-spend-digest'].map(w =>
            h('div', { key: w, className: 'sketch-box thin', style: { padding: '4px 8px', marginBottom: 4, fontSize: 11, display: 'flex', justifyContent: 'space-between' } },
              h('span', { className: 'mono' }, w),
              h('span', { className: 'mono', style: { color: 'var(--accent-3)' } }, '0.91 ↑')
            )
          )
        ),
        h('div', null,
          h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)', marginBottom: 4 } }, 'skills acquired (14)'),
          h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 4 } },
            ['fetch_cost_data', 'summarize_spikes', 'slack_alert', 'forecast', 'spot_rec', '+9 more'].map(s =>
              h('span', { key: s, className: 'sketch-pill', style: { fontSize: 9 } }, s)
            )
          )
        )
      )
    )
  );
}

/* V3 — Employee comparison table */
function EmpV3() {
  const rows = [
    { name: 'ada', skills: 14, score: '0.91', schedule: 'daily', workflows: 3 },
    { name: 'mira', skills: 22, score: '0.87', schedule: 'on-commit', workflows: 5 },
    { name: 'leo', skills: 5, score: '0.68', schedule: 'weekly', workflows: 1 },
    { name: 'kai', skills: 18, score: '0.94', schedule: 'realtime', workflows: 2 },
  ];
  return h('div', { className: 'wire' },
    h('h2', { className: 'h-hand h-md', style: { margin: '0 0 4px' } }, 'the org view'),
    h('p', { style: { fontSize: 12, color: 'var(--ink-2)', margin: '0 0 16px' } }, 'compare your employees side-by-side.'),
    h('div', { className: 'sketch-box', style: { padding: 0, overflow: 'hidden' } },
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 80px 80px 100px 80px', gap: 1, fontSize: 11, background: 'var(--ink-4)' } },
        // header
        ['employee', 'skills', 'eval', 'schedule', 'workflows'].map((c, i) =>
          h('div', { key: i, className: 'mono', style: { padding: 8, background: 'var(--paper-2)', color: 'var(--ink-3)', fontSize: 9 } }, c)
        ),
        rows.flatMap((r, i) => [
          h('div', { key: `${i}n`, style: { padding: 8, background: 'var(--paper)', display: 'flex', alignItems: 'center', gap: 6 } },
            h('div', { className: 'sketch-circle', style: { width: 20, height: 20, background: 'var(--paper-2)' } }),
            h('span', { className: 'h-hand', style: { fontSize: 18 } }, r.name)
          ),
          h('div', { key: `${i}s`, style: { padding: 8, background: 'var(--paper)', fontSize: 12 } }, r.skills),
          h('div', { key: `${i}e`, style: { padding: 8, background: 'var(--paper)', fontSize: 12, color: 'var(--accent-3)', fontFamily: 'JetBrains Mono' } }, r.score),
          h('div', { key: `${i}sc`, style: { padding: 8, background: 'var(--paper)', fontSize: 11, color: 'var(--ink-2)', fontFamily: 'JetBrains Mono' } }, r.schedule),
          h('div', { key: `${i}w`, style: { padding: 8, background: 'var(--paper)', fontSize: 12 } }, r.workflows),
        ])
      )
    ),
    h('div', { style: { marginTop: 14, padding: 10, background: 'var(--paper-2)', border: '1.5px dashed var(--ink-3)', borderRadius: 10, fontSize: 11 } },
      h('span', { className: 'annot' }, 'org rollup → '),
      h('span', { className: 'mono', style: { color: 'var(--ink-2)' } }, '59 skills · 0.85 avg eval · 11 workflows running')
    )
  );
}

/* V4 — Hire new employee flow */
function EmpV4() {
  return h('div', { className: 'wire' },
    h('div', { className: 'mono', style: { color: 'var(--ink-3)', marginBottom: 4 } }, 'hire a new employee'),
    h('h2', { className: 'h-hand h-md', style: { margin: '0 0 16px' } }, 'describe who you need.'),
    h('div', { className: 'sketch-box', style: { padding: 14, marginBottom: 12 } },
      h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)', marginBottom: 6 } }, 'role & objective'),
      h('div', { style: { padding: 10, background: 'var(--paper-2)', border: '1.5px dashed var(--ink-3)', borderRadius: 6, fontSize: 13, color: 'var(--ink-2)', fontStyle: 'italic' } },
        '"i need someone who watches our aws bill and tells me when something weird happens. they should figure out what\'s weird by learning our patterns over time."'
      )
    ),
    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 } },
      h('div', { className: 'sketch-box thin', style: { padding: 10 } },
        h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'suggested name'),
        h('div', { className: 'h-hand', style: { fontSize: 28 } }, 'ada ✎'),
        h('div', { style: { fontSize: 11, color: 'var(--ink-3)' } }, 'after ada lovelace')
      ),
      h('div', { className: 'sketch-box thin', style: { padding: 10 } },
        h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, 'schedule'),
        h('div', { className: 'h-hand', style: { fontSize: 22 } }, 'daily · 9am'),
        h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, '0 9 * * *')
      )
    ),
    h('div', { className: 'sketch-box thin', style: { padding: 10, marginBottom: 12 } },
      h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)', marginBottom: 6 } }, 'starter skills (editable)'),
      h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 4 } },
        ['read_aws_bill', 'detect_anomaly', 'slack_message', 'forecast_spend'].map(s =>
          h('span', { key: s, className: 'sketch-pill accent', style: { fontSize: 10 } }, s)
        ),
        h('span', { className: 'sketch-pill ghost', style: { fontSize: 10 } }, '+ add')
      )
    ),
    h('div', { style: { display: 'flex', gap: 10 } },
      h('span', { className: 'btn primary' }, 'hire ada →'),
      h('span', { className: 'btn ghost' }, 'tweak more')
    ),
    h('div', { className: 'annot', style: { position: 'absolute', top: 14, right: 16, transform: 'rotate(-4deg)' } },
      'prose in. employee out.')
  );
}

window.EmpVariations = [
  { id: 'v1', label: 'roster grid', caption: 'all employees at a glance', Component: EmpV1 },
  { id: 'v2', label: 'profile view', caption: 'deep on one employee', Component: EmpV2 },
  { id: 'v3', label: 'comparison table', caption: 'org-level rollup', Component: EmpV3 },
  { id: 'v4', label: 'hire flow', caption: 'create from prose', Component: EmpV4 },
];
