// Hi-fi sections: integrations, how it learns, templates, employees, metrics, testimonials, cta

/* ========== SECTION: INTEGRATIONS ========== */
function Integrations() {
  const [channel, setChannel] = React.useState('slack');

  const channels = {
    slack: {
      label: 'Slack',
      handle: '@conductor',
      channel: '#finance-ops',
      user: { name: 'Maya Okafor', initials: 'MO', color: '#EC4899' },
      mentionPill: { bg: 'rgba(167, 139, 250, 0.16)', fg: 'var(--violet)' },
      note: 'threads · plan approvals · human feedback',
    },
    discord: {
      label: 'Discord',
      handle: '@Conductor',
      channel: '#ops',
      user: { name: 'Theo Chen', initials: 'TC', color: '#F59E0B' },
      mentionPill: { bg: 'rgba(88, 101, 242, 0.20)', fg: '#A5B4FC' },
      note: 'servers · channels · threads',
    },
    whatsapp: {
      label: 'WhatsApp',
      handle: 'Conductor',
      channel: 'Finance Ops',
      user: { name: 'Priya Raman', initials: 'PR', color: '#10B981' },
      mentionPill: { bg: 'rgba(16, 185, 129, 0.16)', fg: '#6EE7B7' },
      note: 'personal or group · no threads',
    },
    telegram: {
      label: 'Telegram',
      handle: '@conductor_bot',
      channel: 'Ops Group',
      user: { name: 'Sam Alvarez', initials: 'SA', color: '#38BDF8' },
      mentionPill: { bg: 'rgba(56, 189, 248, 0.18)', fg: 'var(--cyan)' },
      note: '/commands · groups · channels',
    },
  };

  const active = channels[channel];

  // Connected MCP servers surfaced below the thread
  const mcpTools = [
    { n: 'mcp/aws-billing',  d: 'cost explorer · usage reports' },
    { n: 'mcp/postgres',     d: 'finance_ops · read-only' },
    { n: 'mcp/stripe',       d: 'payouts · refunds · subs' },
    { n: 'mcp/gdrive',       d: 'Google Workspace · OAuth' },
    { n: 'mcp/notion',       d: 'playbooks · runbooks' },
    { n: 'mcp/github',       d: 'repos · issues · PRs' },
  ];

  return h('section', { className: 'section tight' },
    h('div', { className: 'shell' },
      // headline
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 40 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Reach'),
          h('h2', { className: 'h2', style: { margin: 0, maxWidth: 560 } },
            'Talk to your workflows from ',
            h('span', { style: { background: 'linear-gradient(90deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'where work happens.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)', maxWidth: 520 } },
          '@mention the bot from Slack, Discord, WhatsApp or Telegram and Conductor spins up a multi-agent session with the MCP servers, skills, and models you\'ve configured — approvals, follow-ups and clarifying questions all happen right there in the thread.'
        )
      ),

      // chat card
      h('div', { className: 'card', style: { padding: 0, overflow: 'hidden', background: 'var(--bg-2)' } },
        // chrome bar — channel tabs
        h('div', { style: {
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 16px', borderBottom: '1px solid var(--line)',
          background: 'var(--bg-3)',
        } },
          h('div', { style: { display: 'flex', gap: 6 } },
            ['#FF5F57', '#FEBC2E', '#28C840'].map(c =>
              h('span', { key: c, style: { width: 11, height: 11, borderRadius: '50%', background: c } }))
          ),
          h('span', { className: 'mono', style: { fontSize: 12, color: 'var(--fg-3)', marginLeft: 8 } },
            active.label.toLowerCase() + ' · ' + active.channel),
          h('span', { style: { marginLeft: 'auto', display: 'flex', gap: 4 } },
            Object.keys(channels).map(k =>
              h('button', { key: k,
                onClick: () => setChannel(k),
                className: 'mono',
                style: {
                  padding: '6px 12px',
                  fontSize: 11,
                  borderRadius: 6,
                  border: '1px solid ' + (channel === k ? 'var(--violet-line)' : 'transparent'),
                  background: channel === k ? 'var(--violet-dim)' : 'transparent',
                  color: channel === k ? 'var(--fg)' : 'var(--fg-3)',
                  cursor: 'pointer',
                  fontFamily: 'JetBrains Mono, monospace',
                  transition: 'all 0.15s',
                } }, channels[k].label.toLowerCase())
            )
          )
        ),

        // body — two columns: thread + MCP panel
        h('div', { style: { display: 'grid', gridTemplateColumns: '1.7fr 1fr', minHeight: 460 } },
          // LEFT — chat thread
          h('div', { style: { padding: '24px 28px', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 18 } },
            // user message w/ @mention
            h('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
              h('div', { style: {
                width: 32, height: 32, borderRadius: '50%',
                background: active.user.color, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 600, color: 'white',
              } }, active.user.initials),
              h('div', { style: { flex: 1, minWidth: 0 } },
                h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4, whiteSpace: 'nowrap' } },
                  h('span', { style: { fontSize: 13, fontWeight: 600 } }, active.user.name),
                  h('span', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)' } }, '9:14 AM')
                ),
                h('div', { style: { fontSize: 14, lineHeight: 1.55, color: 'var(--fg)' } },
                  h('span', { className: 'mono', style: {
                    padding: '2px 6px', borderRadius: 4,
                    background: active.mentionPill.bg, color: active.mentionPill.fg,
                    fontSize: 13, marginRight: 4,
                  } }, active.handle),
                  ' pull last month\'s AWS spend by team and flag anything > 20% over budget. Post a summary here.'
                )
              )
            ),

            // bot reply — starting session
            h('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
              h('div', { style: {
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, var(--violet), var(--cyan))',
                flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: 'white',
              } }, 'C'),
              h('div', { style: { flex: 1, minWidth: 0 } },
                h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4, whiteSpace: 'nowrap' } },
                  h('span', { style: { fontSize: 13, fontWeight: 600 } }, 'Conductor'),
                  h('span', { className: 'mono', style: {
                    fontSize: 9, padding: '1px 6px', borderRadius: 3,
                    background: 'var(--violet-dim)', color: 'var(--violet)',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  } }, 'APP'),
                  h('span', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)' } }, '9:14 AM')
                ),
                h('div', { style: { fontSize: 13, lineHeight: 1.6, color: 'var(--fg-2)' } },
                  h('div', { style: { marginBottom: 10 } },
                    h('span', { className: 'mono', style: { color: 'var(--violet)', fontWeight: 600 } }, 'Starting: '),
                    'aws_spend_report · 4 steps · plan approval required'
                  ),
                  h('div', { style: {
                    padding: '12px 14px',
                    background: 'var(--bg)',
                    border: '1px solid var(--line)',
                    borderLeft: '3px solid var(--violet)',
                    borderRadius: 6,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 11, lineHeight: 1.8, color: 'var(--fg-2)',
                  } },
                    h('div', null, h('span', { style: { color: 'var(--fg-4)' } }, '1.'), ' fetch_usage ', h('span', { style: { color: 'var(--fg-4)' } }, '→ mcp/aws-billing')),
                    h('div', null, h('span', { style: { color: 'var(--fg-4)' } }, '2.'), ' group_by_team ', h('span', { style: { color: 'var(--fg-4)' } }, '→ main.py · 0 tokens')),
                    h('div', null, h('span', { style: { color: 'var(--fg-4)' } }, '3.'), ' flag_overruns ', h('span', { style: { color: 'var(--fg-4)' } }, '→ claude-haiku')),
                    h('div', null, h('span', { style: { color: 'var(--fg-4)' } }, '4.'), ' format_summary ', h('span', { style: { color: 'var(--fg-4)' } }, '→ gemini-2.5-flash')),
                  ),
                  h('div', { style: { marginTop: 10, fontSize: 12, color: 'var(--fg-3)' } },
                    'Reply ',
                    h('span', { className: 'mono', style: { color: 'var(--success)', fontWeight: 600 } }, 'approve'),
                    ' or ',
                    h('span', { className: 'mono', style: { color: 'var(--fg-3)' } }, 'reject'),
                    ' to proceed.'
                  )
                )
              )
            ),

            // user approve
            h('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
              h('div', { style: {
                width: 32, height: 32, borderRadius: '50%',
                background: active.user.color, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 600, color: 'white',
              } }, active.user.initials),
              h('div', { style: { flex: 1, minWidth: 0 } },
                h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4, whiteSpace: 'nowrap' } },
                  h('span', { style: { fontSize: 13, fontWeight: 600 } }, active.user.name),
                  h('span', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)' } }, '9:15 AM')
                ),
                h('div', { style: { fontSize: 14, color: 'var(--fg)' } },
                  h('span', { className: 'mono', style: {
                    padding: '2px 6px', borderRadius: 4,
                    background: active.mentionPill.bg, color: active.mentionPill.fg,
                    fontSize: 13, marginRight: 4,
                  } }, active.handle),
                  ' approve'
                )
              )
            ),

            // running indicator
            h('div', { style: { display: 'flex', gap: 10, alignItems: 'center', paddingLeft: 44, whiteSpace: 'nowrap' } },
              h('span', { style: {
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--success)',
                boxShadow: '0 0 0 0 var(--success)',
                animation: 'pulse 2s infinite',
                flexShrink: 0,
              } }),
              h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', overflow: 'hidden', textOverflow: 'ellipsis' } },
                'running · step 3 of 4 · 47s elapsed'
              )
            )
          ),

          // RIGHT — MCP servers panel
          h('div', { style: { padding: '20px 0', background: 'var(--bg)', display: 'flex', flexDirection: 'column' } },
            h('div', { style: { padding: '0 20px 14px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' } },
              h('div', { className: 'mono', style: {
                fontSize: 10, color: 'var(--fg-4)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              } }, '↳ connected MCP servers'),
              h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--success)' } },
                '● ' + mcpTools.length + ' live')
            ),
            h('div', { style: { flex: 1 } },
              mcpTools.map((t, i) =>
                h('div', { key: t.n, style: {
                  display: 'flex', flexDirection: 'column', gap: 3,
                  padding: '10px 20px',
                  borderLeft: '2px solid ' + (i < 3 ? 'var(--violet)' : 'transparent'),
                } },
                  h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' } },
                    h('span', { style: {
                      width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                      background: i < 3 ? 'var(--violet)' : 'var(--fg-4)',
                    } }),
                    h('span', { className: 'mono', style: {
                      fontSize: 13,
                      color: i < 3 ? 'var(--fg)' : 'var(--fg-2)',
                      fontWeight: i < 3 ? 500 : 400,
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    } }, t.n)
                  ),
                  h('span', { className: 'mono', style: {
                    fontSize: 11, color: 'var(--fg-3)',
                    paddingLeft: 16,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  } }, t.d)
                )
              )
            ),
            h('div', { style: {
              padding: '14px 20px', borderTop: '1px solid var(--line)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            } },
              h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)' } },
                '+ add any MCP server'),
              h('span', { className: 'mono', style: {
                fontSize: 10, color: 'var(--fg-4)',
              } }, 'stdio · sse · http')
            )
          )
        )
      ),

      // bottom strip — scale markers
      h('div', { style: {
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
        marginTop: 20,
      } },
        [
          ['4', 'chat surfaces', 'var(--violet)'],
          ['∞', 'MCP servers', 'var(--cyan)'],
          ['1', 'shared bot config', 'var(--lime)'],
        ].map(([n, l, c], i) =>
          h('div', { key: i, style: {
            padding: '20px 4px',
            borderTop: '1px solid var(--line)',
            display: 'flex', alignItems: 'baseline', gap: 14,
            justifyContent: i === 1 ? 'center' : (i === 2 ? 'flex-end' : 'flex-start'),
          } },
            h('span', { style: {
              fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em',
              color: c, lineHeight: 1,
            } }, n),
            h('span', { className: 'mono', style: {
              fontSize: 12, color: 'var(--fg-3)',
            } }, l)
          )
        )
      )
    )
  );
}

/* ========== SECTION: HOW IT LEARNS ========== */
function HowItLearns() {
  return h('section', { className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' } },
        // left: copy
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// How it learns'),
          h('h2', { className: 'h2', style: { marginBottom: 20 } },
            'Every run makes it ',
            h('span', { style: { background: 'linear-gradient(90deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'smarter'),
            '. And ',
            h('span', { style: { background: 'linear-gradient(90deg, var(--lime), var(--amber))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'cheaper'),
            '.'
          ),
          h('p', { className: 'lead', style: { marginBottom: 28 } },
            'A scoring agent grades every run 0–10 per step with reasoning and evidence. Domain knowledge accumulates in a shared _global/SKILL.md. Scripted steps compile to a deterministic main.py — a zero-LLM fast path on future runs. Steps auto-lock after three clean runs against the same description.'
          ),
          h('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } },
            [
              { t: 'Global skill', v: '240 KB', s: '_global/SKILL.md' },
              { t: 'Auto-locked', v: '7 / 12', s: '3 clean runs each' },
              { t: 'Fast path', v: '9', s: 'main.py · 0 tokens' },
              { t: 'Eval avg', v: '8.4', s: 'of 10 · +3.1 vs r1' },
            ].map((s, i) =>
              h('div', { key: i, style: { padding: '14px 16px', border: '1px solid var(--line)', borderRadius: 12 } },
                h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', marginBottom: 6 } }, s.t),
                h('div', { style: { fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 } }, s.v),
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)', marginTop: 6 } }, s.s)
              )
            )
          )
        ),
        // right: eval rubric card
        h('div', { className: 'card', style: { padding: 24 } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 16 } },
            h('span', { className: 'mono', style: { fontSize: 12, color: 'var(--fg-3)' } }, 'evaluation_report.json · aws-cost-optimizer'),
            h('span', { className: 'tag violet' }, h('span', { className: 'dot' }), 'iteration-142')
          ),
          [
            { id: 'find_savings', score: 9, reasoning: 'Flagged 3 unused NAT gateways saving $840/mo. Evidence matched billing export.' },
            { id: 'avoid_false_pos', score: 8, reasoning: 'One ambiguous rightsize call. Otherwise conservative and well-justified.' },
            { id: 'report_readable', score: 6, reasoning: 'Summary dense. Per-account totals missing. Tables render narrow on mobile.' },
            { id: 'on_schedule', score: 10, reasoning: 'Completed in 4m12s, well under the 10m SLO.' },
          ].map((r, i) =>
            h('div', { key: i, style: {
              padding: '14px 0', borderTop: i ? '1px solid var(--line)' : 'none'
            } },
              h('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' } },
                h('span', { className: 'mono', style: { fontSize: 13, color: 'var(--fg)' } }, r.id),
                h('span', { className: 'mono', style: { fontSize: 13, color: r.score >= 8 ? 'var(--success)' : (r.score >= 7 ? 'var(--violet)' : 'var(--warn)'), fontWeight: 500 } },
                  r.score + ' / 10'
                )
              ),
              h('div', { style: { fontSize: 12, color: 'var(--fg-2)', lineHeight: 1.5, marginBottom: 8 } }, r.reasoning),
              h('div', { style: { height: 3, background: 'var(--bg-3)', borderRadius: 4, overflow: 'hidden' } },
                h('div', { style: {
                  height: '100%', width: (r.score * 10) + '%',
                  background: r.score >= 8 ? 'linear-gradient(90deg, var(--violet), var(--cyan))' : (r.score >= 7 ? 'var(--violet)' : 'var(--warn)'),
                  borderRadius: 4
                } })
              )
            )
          )
        )
      )
    )
  );
}

/* ========== SECTION: TEMPLATES GALLERY ========== */
function Templates() {
  const tpls = [
    { c: 'FinOps', t: 'AWS cost optimizer', d: 'Watches billing, flags anomalies, forecasts spend.', pill: 'daily', color: 'var(--violet)' },
    { c: 'Engineering', t: 'QA regression', d: 'Runs suite on every main commit, learns flaky tests.', pill: 'on-commit', color: 'var(--cyan)' },
    { c: 'Growth', t: 'Lead scoring', d: 'Grades inbound leads and routes to AEs in real time.', pill: 'realtime', color: 'var(--lime)' },
    { c: 'Ops', t: 'Support triage', d: 'Tags, routes and escalates tickets automatically.', pill: 'realtime', color: 'var(--pink)' },
    { c: 'Data', t: 'Weekly metrics', d: 'Gathers, charts and summarises for Monday standup.', pill: 'weekly', color: 'var(--amber)' },
    { c: 'Security', t: 'IAM audit', d: 'Walks IAM graph weekly. Flags risky grants.', pill: 'weekly', color: 'var(--success)' },
  ];
  return h('section', { className: 'section' },
    h('div', { className: 'shell' },
      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Templates'),
          h('h2', { className: 'h2' },
            'Specific workflows. ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'For specific jobs.')
          )
        ),
        h('a', { className: 'btn ghost', href: '#' }, 'Browse all 24 templates', h('span', { className: 'arrow' }, '→'))
      ),
      h('div', { className: 'grid cols-3' },
        tpls.map((t, i) =>
          h('div', { key: i, className: 'card', style: { padding: 24, cursor: 'pointer' } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
              h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase' } }, t.c),
              h('span', { className: 'tag' }, h('span', { className: 'dot', style: { background: t.color } }), t.pill)
            ),
            h('h3', { className: 'h3', style: { margin: '0 0 8px' } }, t.t),
            h('p', { className: 'body', style: { margin: '0 0 20px' } }, t.d),
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              h('div', { style: { display: 'flex', gap: 6 } },
                ['🤖', '📊', '🔔'].map((_, j) =>
                  h('span', { key: j, style: { width: 24, height: 24, borderRadius: 6, background: 'var(--bg-3)', border: '1px solid var(--line)', display: 'inline-block' } })
                )
              ),
              h('span', { className: 'mono', style: { fontSize: 12, color: t.color } }, 'Fork →')
            )
          )
        )
      )
    )
  );
}

/* ========== SECTION: EMPLOYEES ========== */
function Employees() {
  const emps = [
    { name: 'Ada', role: 'Cloud cost optimizer', wf: 'aws-cost, gcp-spend', score: 9.1, runs: 142, color: 'var(--violet)' },
    { name: 'Mira', role: 'QA engineer', wf: 'regression, smoke-e2e', score: 8.7, runs: 89, color: 'var(--cyan)' },
    { name: 'Leo', role: 'Growth analyst', wf: 'lead-scoring', score: 6.8, runs: 31, color: 'var(--lime)' },
    { name: 'Kai', role: 'Support triage', wf: 'ticket-router', score: 9.4, runs: 241, color: 'var(--pink)' },
  ];
  return h('section', { className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { style: { textAlign: 'center', marginBottom: 56 } },
        h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// AI Employees'),
        h('h2', { className: 'h2', style: { maxWidth: 720, margin: '0 auto 16px' } },
          'Hire AI staff. ',
          h('span', { style: { color: 'var(--fg-3)' } }, 'Assign workflows. Set a schedule.')
        ),
        h('p', { className: 'lead', style: { maxWidth: 540, margin: '0 auto' } },
          'Each employee owns one or more workflows. They run on cadence, grade themselves against evals, and compound skills over time.'
        )
      ),
      h('div', { className: 'grid cols-4' },
        emps.map((e, i) =>
          h('div', { key: i, className: 'card', style: { padding: 20, textAlign: 'center' } },
            h('div', { style: {
              width: 64, height: 64, borderRadius: '50%',
              margin: '0 auto 14px',
              background: `radial-gradient(circle at 30% 30%, ${e.color}, var(--bg-3) 80%)`,
              border: '1px solid var(--line-2)'
            } }),
            h('h3', { style: { fontSize: 20, fontWeight: 500, margin: '0 0 4px', letterSpacing: '-0.02em' } }, e.name),
            h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', marginBottom: 16 } }, e.role),
            h('div', { style: { display: 'flex', justifyContent: 'space-around', padding: '12px 0', borderTop: '1px solid var(--line)' } },
              h('div', null,
                h('div', { style: { fontSize: 18, fontWeight: 500 } }, e.score.toFixed(1)),
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)' } }, 'eval / 10')
              ),
              h('div', null,
                h('div', { style: { fontSize: 18, fontWeight: 500 } }, e.runs),
                h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)' } }, 'runs')
              )
            ),
            h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-3)', marginTop: 10, borderTop: '1px solid var(--line)', paddingTop: 10 } }, e.wf)
          )
        )
      )
    )
  );
}

/* ========== SECTION: LIVE METRICS ========== */
function Metrics() {
  // sample points: eval rising, cost falling
  const evalPts = [0.42, 0.48, 0.53, 0.59, 0.64, 0.70, 0.74, 0.79, 0.83, 0.86, 0.89, 0.91];
  const costPts = [0.64, 0.58, 0.51, 0.45, 0.40, 0.34, 0.29, 0.26, 0.23, 0.21, 0.19, 0.18];

  const mkPath = (pts, invert) => {
    const w = 400, hh = 120, pad = 8;
    const max = Math.max(...pts), min = Math.min(...pts);
    const xStep = (w - pad*2) / (pts.length - 1);
    return pts.map((v, i) => {
      const y = invert
        ? pad + ((v - min) / (max - min)) * (hh - pad*2)
        : hh - pad - ((v - min) / (max - min)) * (hh - pad*2);
      return `${i === 0 ? 'M' : 'L'}${pad + i * xStep},${y}`;
    }).join(' ');
  };

  return h('section', { className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { style: { textAlign: 'center', marginBottom: 48 } },
        h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Compounding'),
        h('h2', { className: 'h2', style: { maxWidth: 720, margin: '0 auto' } },
          'The longer it runs, ',
          h('span', { style: { color: 'var(--fg-3)' } }, 'the better it gets.')
        )
      ),
      h('div', { className: 'grid cols-2' },
        // eval up
        h('div', { className: 'card', style: { padding: 28 } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 } },
            h('div', null,
              h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', marginBottom: 6 } }, 'EVAL / 10'),
              h('div', { style: { fontSize: 40, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 } }, '8.4'),
              h('div', { className: 'mono', style: { fontSize: 12, color: 'var(--success)', marginTop: 6 } }, '↑ +3.1 vs run 1')
            ),
            h('span', { className: 'tag violet' }, h('span', { className: 'dot' }), 'rising')
          ),
          h('svg', { viewBox: '0 0 400 120', width: '100%', style: { display: 'block' } },
            h('defs', null,
              h('linearGradient', { id: 'evalG', x1: 0, y1: 0, x2: 0, y2: 1 },
                h('stop', { offset: 0, stopColor: 'var(--violet)', stopOpacity: 0.3 }),
                h('stop', { offset: 1, stopColor: 'var(--violet)', stopOpacity: 0 })
              )
            ),
            h('path', { d: mkPath(evalPts, false) + ' L 392 120 L 8 120 Z', fill: 'url(#evalG)' }),
            h('path', { d: mkPath(evalPts, false), stroke: 'var(--violet)', strokeWidth: 2, fill: 'none' }),
            ...evalPts.map((v, i) =>
              h('circle', { key: i, cx: 8 + i * ((400 - 16) / (evalPts.length - 1)),
                cy: 8 + (1 - (v - 0.4) / 0.55) * (120 - 16) * 0 + (120 - 8 - ((v - Math.min(...evalPts)) / (Math.max(...evalPts) - Math.min(...evalPts))) * (120 - 16)),
                r: i === evalPts.length - 1 ? 4 : 0, fill: 'var(--violet)' })
            )
          )
        ),
        // cost down
        h('div', { className: 'card', style: { padding: 28 } },
          h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 } },
            h('div', null,
              h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', marginBottom: 6 } }, 'COST / RUN'),
              h('div', { style: { fontSize: 40, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 } }, '$0.18'),
              h('div', { className: 'mono', style: { fontSize: 12, color: 'var(--success)', marginTop: 6 } }, '↓ -72% vs run 1')
            ),
            h('span', { className: 'tag lime' }, h('span', { className: 'dot' }), 'falling')
          ),
          h('svg', { viewBox: '0 0 400 120', width: '100%', style: { display: 'block' } },
            h('defs', null,
              h('linearGradient', { id: 'costG', x1: 0, y1: 0, x2: 0, y2: 1 },
                h('stop', { offset: 0, stopColor: 'var(--lime)', stopOpacity: 0.25 }),
                h('stop', { offset: 1, stopColor: 'var(--lime)', stopOpacity: 0 })
              )
            ),
            h('path', { d: mkPath(costPts, true) + ' L 392 120 L 8 120 Z', fill: 'url(#costG)' }),
            h('path', { d: mkPath(costPts, true), stroke: 'var(--lime)', strokeWidth: 2, fill: 'none' })
          )
        )
      )
    )
  );
}

/* ========== SECTION: TESTIMONIALS / LOGOS ========== */
function Logos() {
  const logos = ['Vercel', 'Linear', 'Ramp', 'Stripe', 'Figma', 'Notion', 'Plaid', 'Retool', 'Clerk'];
  return h('section', { className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { className: 'eyebrow', style: { textAlign: 'center', marginBottom: 32 } },
        '// Trusted by teams at'),
      h('div', { className: 'marquee' },
        h('div', { className: 'marquee-track' },
          [...logos, ...logos].map((l, i) =>
            h('span', { key: i, style: { fontSize: 24, fontWeight: 500, color: 'var(--fg-3)', letterSpacing: '-0.02em', padding: '0 20px' } }, l)
          )
        )
      )
    )
  );
}

function Testimonials() {
  const t = [
    { q: 'Our AWS bill dropped 34% in the first month. Once the scoring loop stabilised, the workflow literally rewrote its own queries.',
      a: 'Priya R.', r: 'Head of FinOps · Series C fintech' },
    { q: 'We replaced five brittle cron jobs with one workflow that gets smarter. Run 100 is unrecognisable from run 1.',
      a: 'Marcus T.', r: 'Eng Lead · Healthtech' },
    { q: 'Being able to run Claude Code, Codex and Gemini in the same DAG — and keep MCP servers — made this an obvious buy.',
      a: 'Anaïs V.', r: 'CTO · Developer tools' },
  ];
  return h('section', { className: 'section' },
    h('div', { className: 'shell' },
      h('div', { className: 'grid cols-3' },
        t.map((x, i) =>
          h('div', { key: i, className: 'card', style: { padding: 28 } },
            h('svg', { width: 24, height: 24, viewBox: '0 0 24 24', style: { marginBottom: 20, opacity: 0.4 } },
              h('path', { d: 'M6 9 L6 19 L11 19 L11 14 L8 14 L8 9 Z M14 9 L14 19 L19 19 L19 14 L16 14 L16 9 Z',
                fill: 'var(--violet)' })
            ),
            h('p', { style: { fontSize: 16, lineHeight: 1.5, margin: '0 0 24px' } }, '"', x.q, '"'),
            h('div', { style: { paddingTop: 16, borderTop: '1px solid var(--line)' } },
              h('div', { style: { fontSize: 14, fontWeight: 500 } }, x.a),
              h('div', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', marginTop: 4 } }, x.r)
            )
          )
        )
      )
    )
  );
}

/* ========== SECTION: CTA ========== */
function CTA() {
  return h('section', { className: 'section' },
    h('div', { className: 'shell' },
      h('div', { style: {
        background: 'radial-gradient(ellipse at 50% 0%, var(--violet-dim), transparent 70%), var(--bg-2)',
        border: '1px solid var(--line)',
        borderRadius: 24,
        padding: '80px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      } },
        h('div', { style: {
          position: 'absolute', inset: 0, opacity: 0.4,
          backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 70%)'
        } }),
        h('div', { style: { position: 'relative' } },
          h('div', { className: 'eyebrow', style: { marginBottom: 20 } }, '// Get started'),
          h('h2', { className: 'h1', style: { margin: '0 auto 20px', maxWidth: 780 } },
            'Build one workflow. ',
            h('span', { style: { background: 'linear-gradient(90deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'Watch it compound.')
          ),
          h('p', { className: 'lead', style: { maxWidth: 560, margin: '0 auto 36px' } },
            'Design it visually. Run it against a real job. Each cycle the eval score climbs, the token cost falls, and the scripted steps compile to a zero-LLM fast path. 20 minute demo — leave with a workflow you can keep.'
          ),
          h('div', { style: { display: 'flex', gap: 12, justifyContent: 'center' } },
            h('a', { className: 'btn violet', href: 'https://calendly.com/manishiitg/15min', target: '_blank', rel: 'noreferrer' }, 'Book a demo', h('span', { className: 'arrow' }, '→')),
            h('a', { className: 'btn ghost', href: 'https://github.com/manishiitg/mcp-agent-builder-go', target: '_blank', rel: 'noreferrer' }, 'Deploy OSS')
          )
        )
      )
    )
  );
}

/* ========== FOOTER ========== */
function Footer({ name }) {
  return h('footer', { className: 'footer' },
    h('div', { className: 'shell' },
      h('div', { className: 'footer-grid' },
        h('div', { className: 'footer-col' },
          h(Logo, { name }),
          h('p', { style: { fontSize: 14, color: 'var(--fg-3)', margin: '16px 0 0', maxWidth: 280 } },
            'The open-source platform for workflows that learn on the job.')
        ),
        h('div', { className: 'footer-col' },
          h('h5', null, 'Product'),
          h('a', { href: 'index.html' }, 'Home'),
          h('a', { href: 'how.html' }, 'How it works')
        ),
        h('div', { className: 'footer-col' },
          h('h5', null, 'Open source'),
          h('a', { href: 'https://github.com/manishiitg/mcp-agent-builder-go', target: '_blank', rel: 'noreferrer' }, 'GitHub'),
          h('a', { href: 'https://modelcontextprotocol.io', target: '_blank', rel: 'noreferrer' }, 'MCP spec')
        ),
        h('div', { className: 'footer-col' },
          h('h5', null, 'Connect'),
          h('a', { href: 'https://calendly.com/manishiitg/15min', target: '_blank', rel: 'noreferrer' }, 'Book a call'),
          h('a', { href: 'https://in.linkedin.com/in/manishiitg', target: '_blank', rel: 'noreferrer' }, 'LinkedIn'),
          h('a', { href: 'https://x.com/manish_iitg', target: '_blank', rel: 'noreferrer' }, 'X / Twitter'),
          h('a', { href: 'https://github.com/manishiitg', target: '_blank', rel: 'noreferrer' }, 'GitHub (@manishiitg)')
        )
      ),
      h('div', { className: 'footer-bottom' },
        h('span', null, '© 2026 ' + name + ' Inc. · MIT licensed'),
        h('span', { className: 'mono' }, 'built on top of mcp-agent-builder-go')
      )
    )
  );
}

Object.assign(window, { Integrations, HowItLearns, Templates, Employees, Metrics, Logos, Testimonials, CTA, Footer });
