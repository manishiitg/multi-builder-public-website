// Workflows section — the star of the show
// uses window.h

/* V1 — Workflow canvas / node editor */
function WfV1() {
  return h('div', { className: 'wire', style: { padding: 0, overflow: 'hidden' } },
    // toolbar
    h('div', { style: { padding: '10px 14px', borderBottom: '1.5px dashed var(--ink-4)', display: 'flex', alignItems: 'center', gap: 10 } },
      h('span', { className: 'h-hand', style: { fontSize: 20 } }, 'aws-cost-optimizer-v4'),
      h('span', { className: 'sketch-pill', style: { fontSize: 9 } }, 'cycle 142'),
      h('span', { className: 'sketch-pill accent', style: { fontSize: 9 } }, '● running'),
      h('span', { style: { marginLeft: 'auto' } }, h('span', { className: 'mono', style: { color: 'var(--ink-3)' } }, 'assigned: ada'))
    ),
    // canvas
    h('div', { style: { padding: 20, background: 'var(--paper-2)', minHeight: 380, position: 'relative',
      backgroundImage: 'radial-gradient(circle, var(--ink-4) 1px, transparent 1px)', backgroundSize: '16px 16px' } },
      h('svg', { viewBox: '0 0 500 340', width: '100%', height: 340, style: { display: 'block' } },
        // connections
        h('path', { d: 'M90 50 C 140 50, 140 110, 190 110', stroke: 'var(--accent-2)', strokeWidth: 2, fill: 'none', strokeDasharray: '4 3' }),
        h('path', { d: 'M90 50 C 140 50, 140 200, 190 200', stroke: 'var(--accent-2)', strokeWidth: 2, fill: 'none', strokeDasharray: '4 3' }),
        h('path', { d: 'M290 110 C 340 110, 340 175, 390 175', stroke: 'var(--accent-2)', strokeWidth: 2, fill: 'none', strokeDasharray: '4 3' }),
        h('path', { d: 'M290 200 C 340 200, 340 175, 390 175', stroke: 'var(--accent-2)', strokeWidth: 2, fill: 'none', strokeDasharray: '4 3' }),
        h('path', { d: 'M290 200 C 340 260, 340 270, 390 270', stroke: 'var(--accent-2)', strokeWidth: 2, fill: 'none', strokeDasharray: '4 3' }),
        // nodes
        ...[
          { x: 20, y: 30, w: 70, h: 40, t: 'schedule', s: '0 9 * * *', color: 'var(--accent)' },
          { x: 190, y: 90, w: 100, h: 44, t: 'fetch_bill', s: 'skill' },
          { x: 190, y: 180, w: 100, h: 44, t: 'get_usage', s: 'skill' },
          { x: 390, y: 155, w: 80, h: 40, t: 'detect', s: 'python' },
          { x: 390, y: 250, w: 80, h: 40, t: 'alert', s: 'skill' },
        ].map((n, i) => h('g', { key: i },
          h('rect', { x: n.x, y: n.y, width: n.w, height: n.h, rx: 8,
            fill: 'var(--paper)', stroke: 'var(--ink)', strokeWidth: 1.8 }),
          h('text', { x: n.x + n.w/2, y: n.y + n.h/2 - 2, textAnchor: 'middle',
            fontFamily: 'Caveat', fontSize: 16, fontWeight: 700, fill: 'var(--ink)' }, n.t),
          h('text', { x: n.x + n.w/2, y: n.y + n.h/2 + 12, textAnchor: 'middle',
            fontFamily: 'JetBrains Mono', fontSize: 8, fill: n.color || 'var(--ink-3)' }, n.s)
        ))
      ),
      h('div', { className: 'annot', style: { position: 'absolute', top: 20, right: 20, transform: 'rotate(5deg)' } },
        'drag to connect →')
    ),
    h('div', { style: { padding: '8px 14px', borderTop: '1.5px dashed var(--ink-4)', fontSize: 10, color: 'var(--ink-3)', display: 'flex', gap: 14 } },
      h('span', { className: 'mono' }, '5 nodes'),
      h('span', { className: 'mono' }, '3 skills · 1 python'),
      h('span', { className: 'mono', style: { marginLeft: 'auto', color: 'var(--accent-3)' } }, 'eval: 0.91')
    )
  );
}

/* V2 — Use-case templates gallery */
function WfV2() {
  const templates = [
    { t: 'aws cost optimizer', d: 'watch billing. flag anomalies. forecast.', tags: ['finops', 'daily'] },
    { t: 'QA regression', d: 'run suite on every main commit. learn flakes.', tags: ['eng', 'on-commit'] },
    { t: 'lead scoring', d: 'grade inbound leads. route to AEs.', tags: ['growth', 'realtime'] },
    { t: 'support triage', d: 'tag + route tickets. escalate edge cases.', tags: ['ops', 'realtime'] },
    { t: 'weekly metrics', d: 'gather, chart, summarize. slack monday 9am.', tags: ['data', 'weekly'] },
    { t: 'security audit', d: 'walk IAM. flag risky grants.', tags: ['sec', 'weekly'] },
  ];
  return h('div', { className: 'wire' },
    h('h2', { className: 'h-hand h-md', style: { margin: '0 0 4px' } }, 'start from a template'),
    h('p', { style: { fontSize: 12, color: 'var(--ink-2)', margin: '0 0 16px' } }, 'fork one of these. rename. tweak. assign an employee.'),
    h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 } },
      templates.map((tpl, i) =>
        h('div', { key: i, className: `sketch-box thin rotate-${(i%3)+1}`, style: { padding: 10 } },
          h('div', { className: 'h-hand', style: { fontSize: 22, marginBottom: 2 } }, tpl.t),
          h('div', { style: { fontSize: 11, color: 'var(--ink-2)', marginBottom: 8 } }, tpl.d),
          h('div', { style: { display: 'flex', gap: 4, flexWrap: 'wrap' } },
            tpl.tags.map(t =>
              h('span', { key: t, className: 'sketch-pill', style: { fontSize: 9 } }, t)
            ),
            h('span', { className: 'mono', style: { marginLeft: 'auto', fontSize: 10, color: 'var(--accent)' } }, 'fork →')
          )
        )
      )
    ),
    h('div', { className: 'annot', style: { position: 'absolute', top: 14, right: 16, transform: 'rotate(3deg)' } },
      'use cases == the pitch')
  );
}

/* V3 — Run history / timeline */
function WfV3() {
  const cycles = [
    { n: 142, date: 'apr 20', score: 0.91, delta: +0.02, event: 'spot rec added', color: 'var(--accent-3)' },
    { n: 141, date: 'apr 19', score: 0.89, delta: +0.00, event: 'clean run', color: 'var(--ink-3)' },
    { n: 140, date: 'apr 18', score: 0.89, delta: -0.03, event: 'flaky fetch · self-healed', color: 'var(--accent)' },
    { n: 139, date: 'apr 17', score: 0.92, delta: +0.01, event: 'new skill: spot_check', color: 'var(--accent-3)' },
    { n: 138, date: 'apr 16', score: 0.91, delta: +0.00, event: 'clean run', color: 'var(--ink-3)' },
  ];
  return h('div', { className: 'wire' },
    h('h2', { className: 'h-hand h-md', style: { margin: '0 0 4px' } }, 'run history'),
    h('div', { className: 'mono', style: { color: 'var(--ink-3)', marginBottom: 14 } }, 'aws-cost-optimizer · last 5 cycles'),
    h('div', { style: { position: 'relative', paddingLeft: 18 } },
      h('div', { style: { position: 'absolute', left: 4, top: 6, bottom: 6, width: 2, background: 'var(--ink-4)', borderRadius: 1 } }),
      cycles.map((c, i) =>
        h('div', { key: c.n, style: { position: 'relative', marginBottom: 10 } },
          h('div', { style: { position: 'absolute', left: -18, top: 8, width: 10, height: 10, borderRadius: '50%', background: c.color, border: '2px solid var(--ink)' } }),
          h('div', { className: 'sketch-box thin', style: { padding: 10 } },
            h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 } },
              h('span', { className: 'h-hand', style: { fontSize: 20 } }, 'cycle ', c.n),
              h('span', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)' } }, c.date),
              h('span', { className: 'mono', style: { marginLeft: 'auto', fontSize: 11, color: 'var(--accent-3)' } }, c.score.toFixed(2)),
              h('span', { className: 'mono', style: { fontSize: 10, color: c.delta >= 0 ? 'var(--accent-3)' : 'var(--accent)' } },
                c.delta > 0 ? `+${c.delta.toFixed(2)}` : c.delta.toFixed(2))
            ),
            h('div', { style: { fontSize: 11, color: 'var(--ink-2)' } }, c.event)
          )
        )
      )
    ),
    h('div', { className: 'annot', style: { position: 'absolute', top: 14, right: 16, transform: 'rotate(4deg)' } },
      'receipts ↑')
  );
}

/* V4 — Shared knowledge base view */
function WfV4() {
  return h('div', { className: 'wire' },
    h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 } },
      h('div', null,
        h('h2', { className: 'h-hand h-md', style: { margin: 0 } }, 'shared knowledge'),
        h('div', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 11 } }, 'every workflow contributes. every workflow reads.')
      ),
      h('span', { className: 'sketch-pill' }, '247 facts · 89 skills · 41 scripts')
    ),
    h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
      h('div', { className: 'sketch-box thin', style: { padding: 10 } },
        h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)', marginBottom: 6 } }, 'recent facts'),
        [
          'prod runs in us-east-1',
          'cost spikes land on tuesdays',
          'q2 budget = $240k',
          'alerts → #ops-alerts',
          'reserved instances renew mar',
        ].map((f, i) =>
          h('div', { key: i, style: { fontSize: 12, padding: '5px 0', borderTop: i ? '1px dashed var(--ink-4)' : 'none', color: 'var(--ink-2)' } },
            h('span', { className: 'mono', style: { color: 'var(--accent)', marginRight: 6 } }, '#'), f
          )
        )
      ),
      h('div', null,
        h('div', { className: 'sketch-box thin', style: { padding: 10, marginBottom: 10 } },
          h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)', marginBottom: 6 } }, 'top reused skills'),
          [['slack_alert', 14], ['fetch_aws_cost', 9], ['summarize', 22], ['detect_anomaly', 7]].map(([s, n], i) =>
            h('div', { key: i, style: { display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '3px 0' } },
              h('span', { className: 'mono' }, s),
              h('span', { className: 'mono', style: { color: 'var(--ink-3)' } }, `${n} workflows`)
            )
          )
        ),
        h('div', { className: 'sketch-box thin', style: { padding: 10, background: 'var(--paper-2)' } },
          h('div', { className: 'annot' }, 'org-level view'),
          h('div', { style: { fontSize: 11, color: 'var(--ink-2)', marginTop: 4 } },
            'as your team runs more workflows, the kb compounds. new employees start smart.'
          )
        )
      )
    )
  );
}

/* V0 — THE CORE STORY: create → optimize → learn → schedule */
function WfCore() {
  return h('div', { className: 'wire', style: { padding: 0 } },
    // header strip
    h('div', { style: { padding: '12px 18px', borderBottom: '1.5px dashed var(--ink-4)', display: 'flex', alignItems: 'baseline', gap: 10 } },
      h('span', { className: 'h-hand', style: { fontSize: 24 } }, 'the core flow'),
      h('span', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 10 } }, '// create → optimize → learn → schedule'),
      h('span', { className: 'sketch-pill accent', style: { marginLeft: 'auto', fontSize: 9 } }, '★ the pitch')
    ),

    // STEP 1 — CREATE
    h('div', { style: { padding: '16px 18px 12px' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
        h('span', { className: 'sketch-pill accent', style: { fontSize: 10 } }, '01'),
        h('span', { className: 'h-hand', style: { fontSize: 22 } }, 'create a workflow'),
        h('span', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 10 } }, 'prose, template, or canvas')
      ),
      h('div', { style: { display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 10 } },
        h('div', { className: 'sketch-box thin', style: { padding: 10 } },
          h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)', marginBottom: 4 } }, 'describe in plain english →'),
          h('div', { style: { padding: 8, background: 'var(--paper-2)', border: '1.5px dashed var(--ink-3)', borderRadius: 6, fontSize: 12, fontStyle: 'italic', color: 'var(--ink-2)' } },
            '"watch our aws bill daily. flag anomalies. summarize in slack each monday."'
          )
        ),
        h('div', { className: 'sketch-box thin', style: { padding: 8, background: 'var(--paper-2)' } },
          h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)', marginBottom: 4 } }, 'or fork a template'),
          ['aws-cost', 'qa-regress', 'lead-score', 'support-triage'].map((t, i) =>
            h('div', { key: t, className: 'mono', style: { fontSize: 10, padding: '3px 6px', background: 'var(--paper)', borderRadius: 4, marginBottom: 3, border: '1px solid var(--ink-4)', display: 'flex', justifyContent: 'space-between' } },
              h('span', null, t),
              h('span', { style: { color: 'var(--accent)' } }, 'fork →')
            )
          )
        )
      )
    ),

    // STEP 2 — OPTIMIZE (evals)
    h('div', { style: { padding: '12px 18px', borderTop: '1.5px dashed var(--ink-4)' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
        h('span', { className: 'sketch-pill accent', style: { fontSize: 10 } }, '02'),
        h('span', { className: 'h-hand', style: { fontSize: 22 } }, 'optimize via evals'),
        h('span', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 10 } }, 'every cycle graded · weakest step rewritten')
      ),
      h('div', { className: 'sketch-box thin', style: { padding: 10, background: 'var(--paper)' } },
        [
          ['did it find real savings?', 0.95, 'var(--accent-3)'],
          ['did it avoid false positives?', 0.82, 'var(--accent-3)'],
          ['is the report readable?', 0.68, 'var(--accent)'],
        ].map(([crit, val, col], i) =>
          h('div', { key: i, style: { display: 'grid', gridTemplateColumns: '1fr 120px 44px 50px', alignItems: 'center', gap: 8, padding: '5px 0', borderTop: i ? '1px dashed var(--ink-4)' : 'none' } },
            h('span', { style: { fontSize: 12 } }, crit),
            h('div', { style: { height: 8, background: 'var(--paper-2)', border: '1px solid var(--ink)', borderRadius: 4, overflow: 'hidden' } },
              h('div', { style: { width: `${val * 100}%`, height: '100%', background: col } })
            ),
            h('span', { className: 'mono', style: { fontSize: 10, textAlign: 'right' } }, val.toFixed(2)),
            h('span', { className: 'mono', style: { fontSize: 9, color: val < 0.8 ? 'var(--accent)' : 'var(--accent-3)' } },
              val < 0.8 ? 'rewrite ↻' : 'keep ✓')
          )
        )
      ),
      h('div', { className: 'annot', style: { transform: 'rotate(-2deg)', marginTop: 4 } },
        'self-healing + self-improving'
      )
    ),

    // STEP 3 — LEARN (skills + knowledge)
    h('div', { style: { padding: '12px 18px', borderTop: '1.5px dashed var(--ink-4)' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
        h('span', { className: 'sketch-pill accent', style: { fontSize: 10 } }, '03'),
        h('span', { className: 'h-hand', style: { fontSize: 22 } }, 'learn & remember'),
        h('span', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 10 } }, 'skills + knowledge compound across your org')
      ),
      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 } },
        [
          { t: 'skills', sub: '+14 this month', items: ['summarize_invoice', 'detect_spike', 'slack_alert'], color: 'var(--accent-2)' },
          { t: 'knowledge', sub: '247 facts', items: ['prod = us-east-1', 'budget = $40k/mo', 'alerts → #ops'], color: 'var(--accent-3)' },
          { t: 'python', sub: '8 scripts', items: ['fetch_cost.py', 'cluster.py', 'notify.py'], color: 'var(--accent)' },
        ].map((col, i) =>
          h('div', { key: i, className: 'sketch-box thin', style: { padding: 8 } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 } },
              h('span', { className: 'h-hand', style: { fontSize: 18 } }, col.t),
              h('span', { className: 'mono', style: { fontSize: 9, color: col.color } }, col.sub)
            ),
            col.items.map((it, j) =>
              h('div', { key: j, className: 'mono', style: { fontSize: 10, padding: '3px 6px', background: 'var(--paper-2)', borderRadius: 4, marginBottom: 3, color: 'var(--ink-2)' } }, it)
            )
          )
        )
      ),
      h('div', { style: { marginTop: 8, fontSize: 11, color: 'var(--ink-3)', textAlign: 'center' } },
        h('span', { className: 'mono' }, '↓ shared knowledgebase · every workflow reads + writes ↓')
      )
    ),

    // STEP 4 — SCHEDULE
    h('div', { style: { padding: '12px 18px', borderTop: '1.5px dashed var(--ink-4)' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
        h('span', { className: 'sketch-pill accent', style: { fontSize: 10 } }, '04'),
        h('span', { className: 'h-hand', style: { fontSize: 22 } }, 'run on a schedule'),
        h('span', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 10 } }, 'assign an employee · set cadence · walk away')
      ),
      h('div', { className: 'sketch-box thin', style: { padding: 10, background: 'var(--paper-2)' } },
        h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 } },
          [
            { l: 'workflow', v: 'aws-cost', s: 'v4 · 14 skills' },
            { l: 'assigned to', v: 'ada', s: 'senior · on duty' },
            { l: 'schedule', v: 'daily · 9am', s: '0 9 * * *' },
            { l: 'next run', v: 'in 4h 22m', s: '▶ run now' },
          ].map((c, i) =>
            h('div', { key: i, style: { padding: 8, background: 'var(--paper)', border: '1px dashed var(--ink-4)', borderRadius: 6 } },
              h('div', { className: 'mono', style: { fontSize: 8, color: 'var(--ink-3)' } }, c.l),
              h('div', { className: 'h-hand', style: { fontSize: 18, lineHeight: 1.1 } }, c.v),
              h('div', { className: 'mono', style: { fontSize: 9, color: i === 3 ? 'var(--accent)' : 'var(--ink-3)' } }, c.s)
            )
          )
        )
      ),
      h('div', { className: 'annot', style: { position: 'absolute', bottom: 12, right: 16, transform: 'rotate(3deg)' } },
        'set it. forget it. it gets better.')
    ),

    // STEP 5 — PLUG INTO ANY CODING TOOL / API
    h('div', { style: { padding: '12px 18px 18px', borderTop: '1.5px dashed var(--ink-4)' } },
      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } },
        h('span', { className: 'sketch-pill accent', style: { fontSize: 10 } }, '05'),
        h('span', { className: 'h-hand', style: { fontSize: 22 } }, 'bring any coding tool'),
        h('span', { className: 'mono', style: { color: 'var(--ink-3)', fontSize: 10 } }, 'model-agnostic · api-agnostic · MCP-native')
      ),
      h('div', { className: 'sketch-box thin', style: { padding: 10, background: 'var(--paper-2)' } },
        h('div', { className: 'mono', style: { fontSize: 9, color: 'var(--ink-3)', marginBottom: 6 } }, 'plug in the CLI your team already uses'),
        h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6 } },
          ['claude-code', 'gemini-cli', 'codex-cli', 'glm', 'minimax', 'qwen-code', 'aider', '+ your own'].map((t, i) =>
            h('span', { key: t, className: 'sketch-pill', style: { fontSize: 10, background: i === 7 ? 'var(--paper-2)' : 'var(--paper)', borderStyle: i === 7 ? 'dashed' : 'solid' } },
              h('span', { style: { width: 5, height: 5, borderRadius: '50%', background: ['var(--accent)','var(--accent-2)','var(--accent-3)'][i%3], display: 'inline-block' } }),
              t
            )
          )
        ),
        h('div', { style: { marginTop: 10, padding: 8, background: 'var(--paper)', border: '1px dashed var(--ink-4)', borderRadius: 6, fontSize: 11, color: 'var(--ink-2)' } },
          h('span', { className: 'mono', style: { color: 'var(--accent)' } }, '→ '),
          'workflows pick the right tool per step — claude-code for python, gemini for long-context review, codex for quick scripts. swap models without rewriting the workflow.'
        )
      ),
      h('div', { className: 'annot', style: { textAlign: 'right', marginTop: 6, transform: 'rotate(-2deg)' } },
        'no vendor lock-in')
    )
  );
}

window.WfVariations = [
  { id: 'v0', label: 'the core story ★', caption: 'create → optimize → learn → schedule', Component: WfCore },
  { id: 'v1', label: 'canvas editor', caption: 'build workflows visually', Component: WfV1 },
  { id: 'v2', label: 'template gallery', caption: 'use-case specific starters', Component: WfV2 },
  { id: 'v3', label: 'run history', caption: 'proof of learning', Component: WfV3 },
  { id: 'v4', label: 'knowledge base', caption: 'the compounding asset', Component: WfV4 },
];
