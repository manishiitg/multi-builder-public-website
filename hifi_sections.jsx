// Hi-fi sections: integrations, how it learns, templates, employees, metrics, testimonials, cta

/* ========== SECTION: WHAT IMPROVES ========== */
function WhatImproves() {
  const rows = [
    {
      k: 'Revenue operations',
      v: 'Lead quality, account fit, enrichment confidence, routing speed',
      proof: 'pipeline impact',
      color: 'var(--success)'
    },
    {
      k: 'Support SLA',
      v: 'Ticket severity, customer context, escalation precision, response time',
      proof: 'SLA protected',
      color: 'var(--cyan)'
    },
    {
      k: 'QA coverage',
      v: 'Critical journeys, edge cases, release blockers, flaky test fixes',
      proof: 'risk caught',
      color: 'var(--violet)'
    },
    {
      k: 'Cloud cost',
      v: 'Waste, anomalies, owner routing, approved savings actions',
      proof: 'cost reduced',
      color: 'var(--amber)'
    },
    {
      k: 'Content throughput',
      v: 'Channel plans, drafts, approvals, asset briefs, performance memory',
      proof: 'output scaled',
      color: 'var(--lime)'
    },
  ];

  return h('section', { className: 'section tight', style: { paddingTop: 40 } },
    h('div', { className: 'shell' },
      h('div', { className: 'improves-layout', style: {
        display: 'grid',
        gridTemplateColumns: '0.85fr 1.6fr',
        gap: 56,
        alignItems: 'start',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        padding: '42px 0'
      } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// What improves'),
          h('h2', { className: 'h2', style: { margin: '0 0 18px', maxWidth: 420 } },
            'The automation improves ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'the business outcome, not just the prompt.')
          ),
          h('p', { className: 'body', style: { margin: 0, maxWidth: 430 } },
            'Runloop ties every change to evidence: the target outcome, run metrics, intervention, measurement window, verdict, and decision log.'
          )
        ),
        h('div', { className: 'improves-rows', style: { display: 'flex', flexDirection: 'column' } },
          rows.map((r, i) =>
            h('div', { key: r.k, className: 'improves-row', style: {
              display: 'grid',
              gridTemplateColumns: '160px 1fr 132px',
              gap: 22,
              alignItems: 'center',
              padding: '18px 0',
              borderTop: i ? '1px solid var(--line)' : 'none'
            } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 10 } },
                h('span', { style: {
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: r.color,
                  boxShadow: `0 0 18px ${r.color}`
                } }),
                h('span', { style: { fontSize: 15, fontWeight: 600 } }, r.k)
              ),
              h('div', { className: 'body', style: { color: 'var(--fg-2)' } }, r.v),
              h('div', { className: 'mono', style: {
                justifySelf: 'end',
                fontSize: 11,
                color: r.color,
                padding: '6px 10px',
                borderRadius: 999,
                border: '1px solid var(--line)',
                background: 'var(--bg-2)',
                whiteSpace: 'nowrap'
              } }, r.proof)
            )
          )
        )
      )
    )
  );
}

/* ========== SECTION: INTEGRATIONS ========== */
function Integrations() {
  const [channel, setChannel] = React.useState('slack');

  const channels = {
    slack: {
      label: 'Slack',
      handle: '@runloop',
      channel: '#finance-ops',
      user: { name: 'Maya Okafor', initials: 'MO', color: '#EC4899' },
      mentionPill: { bg: 'rgba(167, 139, 250, 0.16)', fg: 'var(--violet)' },
      note: 'threads · plan approvals · human feedback',
    },
    discord: {
      label: 'Discord',
      handle: '@Runloop',
      channel: '#ops',
      user: { name: 'Theo Chen', initials: 'TC', color: '#F59E0B' },
      mentionPill: { bg: 'rgba(88, 101, 242, 0.20)', fg: '#A5B4FC' },
      note: 'servers · channels · threads',
    },
    whatsapp: {
      label: 'WhatsApp',
      handle: 'Runloop',
      channel: 'Finance Ops',
      user: { name: 'Priya Raman', initials: 'PR', color: '#10B981' },
      mentionPill: { bg: 'rgba(16, 185, 129, 0.16)', fg: '#6EE7B7' },
      note: 'personal or group · no threads',
    },
    telegram: {
      label: 'Telegram',
      handle: '@runloop_bot',
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
      h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 40 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Reach'),
          h('h2', { className: 'h2', style: { margin: 0, maxWidth: 560 } },
            'Run AI automations from ',
            h('span', { style: { background: 'linear-gradient(90deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'where work happens.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)', maxWidth: 520 } },
          '@mention the bot from Slack, Discord, WhatsApp or Telegram and Runloop starts a multi-agent automation with the MCP servers, skills, and models you\'ve configured. Approvals, follow-ups, and clarifying questions all happen right there in the thread.'
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
        h('div', { className: 'integrations-grid', style: { display: 'grid', gridTemplateColumns: '1.7fr 1fr', minHeight: 460 } },
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
              } }, 'R'),
              h('div', { style: { flex: 1, minWidth: 0 } },
                h('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4, whiteSpace: 'nowrap' } },
                  h('span', { style: { fontSize: 13, fontWeight: 600 } }, 'Runloop'),
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

/* ========== SECTION: AUTOMATION ANATOMY ========== */
function AutomationAnatomy() {
  const parts = [
    { t: 'Goals', d: 'Define the business target: reduce cloud waste, improve SLA, increase QA coverage, or qualify better leads.', tag: 'what good means', color: 'var(--success)' },
    { t: 'Metrics', d: 'Track run quality, cost, speed, acceptance rate, failures, human edits, and outcome movement over time.', tag: 'measured every run', color: 'var(--cyan)' },
    { t: 'AI agents', d: 'Use Claude Code, Codex, Gemini, Kimi, OpenAI, Anthropic, OpenRouter, or compatible providers step by step.', tag: 'model routed', color: 'var(--violet)' },
    { t: 'MCP tools', d: 'Connect CRM, helpdesk, GitHub, cloud billing, docs, Slack, browser, databases, and your internal APIs.', tag: 'tool access', color: 'var(--amber)' },
    { t: 'Knowledgebase', d: 'Store SOPs, examples, policies, customer context, product rules, past decisions, and approved claims.', tag: 'company memory', color: 'var(--lime)' },
    { t: 'Skills', d: 'Promote repeated good behavior into reusable skills, scripts, rubrics, and workflow-level playbooks.', tag: 'improvement saved', color: 'var(--pink)' },
    { t: 'Evals', d: 'Grade whether the result met the goal before the automation changes itself or ships an output.', tag: 'quality gate', color: 'var(--success)' },
    { t: 'Approvals', d: 'Keep risky actions human-reviewed while safe, stable steps can run on a schedule or trigger.', tag: 'controlled autonomy', color: 'var(--cyan)' },
  ];

  return h('section', { className: 'section tight automation-anatomy-section' },
    h('div', { className: 'shell' },
      h('div', { className: 'automation-anatomy-head' },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// What you build'),
          h('h2', { className: 'h2', style: { margin: 0, maxWidth: 620 } },
            'An automation is a goal-driven system, ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'not a static prompt.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, maxWidth: 520 } },
          'You set the goal, metrics, tools, permissions, and review rules. AI agents run the work, evaluate the result, and make measured improvements that can be kept, reverted, or promoted into reusable skills.'
        )
      ),
      h('div', { className: 'automation-anatomy-grid' },
        parts.map((p, i) =>
          h('div', { key: p.t, className: 'automation-anatomy-card' },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start', marginBottom: 18 } },
              h('span', { style: {
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: p.color,
                boxShadow: `0 0 18px ${p.color}`,
                marginTop: 6,
                flexShrink: 0
              } }),
              h('span', { className: 'mono', style: { fontSize: 10, color: p.color, textTransform: 'uppercase', letterSpacing: '0.08em' } }, p.tag)
            ),
            h('h3', { className: 'h3', style: { margin: '0 0 10px', fontSize: 22 } }, p.t),
            h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } }, p.d)
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
      h('div', { className: 'how-learns-grid', style: { display: 'grid', gap: 64, alignItems: 'center' } },
        // left: copy
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// How it learns'),
          h('h2', { className: 'h2', style: { marginBottom: 20 } },
            'AI agents improve the automation ',
            h('span', { style: { background: 'linear-gradient(90deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'against your goals.')
          ),
          h('p', { className: 'lead', style: { marginBottom: 28 } },
            'After each run, an evaluator compares the output to your target metrics. If a change improves support accuracy, QA coverage, cost savings, or lead quality, it can be kept. If it hurts the metric, it is reverted. Stable wins become skills or deterministic scripts for future runs.'
          ),
          h('div', { className: 'how-learns-stats', style: { display: 'grid', gap: 12 } },
            [
              { t: 'Goal metric', v: '+11pp', s: 'SLA accuracy vs r1' },
              { t: 'Skills saved', v: '7', s: 'reused in future runs' },
              { t: 'Fast paths', v: '9', s: 'stable steps with lower cost' },
              { t: 'Rejected changes', v: '3', s: 'failed eval and reverted' },
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
        h('div', { className: 'card how-learns-card', style: { padding: 24 } },
          h('div', { className: 'how-learns-card-head', style: { display: 'flex', justifyContent: 'space-between', marginBottom: 16 } },
            h('span', { className: 'mono', style: { fontSize: 12, color: 'var(--fg-3)' } }, 'evaluation_report.json · aws-cost-optimizer'),
            h('span', { className: 'tag violet' }, h('span', { className: 'dot' }), 'iteration-142')
          ),
          [
            { id: 'goal_match', score: 9, reasoning: 'Ticket routing matched the SLA target and reduced handoff errors.' },
            { id: 'knowledge_used', score: 8, reasoning: 'Pulled the right policy pages and added missing context to the knowledgebase.' },
            { id: 'improvement_quality', score: 6, reasoning: 'One proposed rule increased false escalations, so it was not promoted.' },
            { id: 'cost_to_run', score: 10, reasoning: 'Two stable steps moved to a scripted fast path on the next run.' },
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

const RUNLOOP_TEMPLATES = [
  {
    slug: 'company-workflows',
    c: 'Company',
    t: 'AI company workflow setup',
    d: 'Sets up one company workspace with AI employees, tools, skills, knowledge, and custom automations.',
    pill: 'multi-agent',
    color: 'var(--violet)',
    palette: ['var(--violet)', 'var(--cyan)', 'var(--amber)', 'var(--lime)', 'var(--pink)', 'var(--success)'],
    animation: 'company-setup',
    hero: 'Set up one AI company with employees that run custom automations.',
    intro: 'Runloop can model your company as a workspace with departments, AI employees, MCP access, reusable skills, a shared knowledgebase, approval rules, schedules, evals, and metrics. Each employee can own multiple custom automations that improve over time.',
    problemHeading: 'The bottleneck is not one automation. It is coordinating many repeatable jobs across the company.',
    problemIntro: 'A company setup needs shared context, role boundaries, tool permissions, reusable skills, workflow ownership, evals, schedules, and approval gates before automations can run reliably.',
    painPoints: [
      { t: 'Teams need more than a single bot', d: 'Sales, support, engineering, finance, marketing, and ops each need different permissions, tools, memory, schedules, and review rules.' },
      { t: 'Workflows break when context is scattered', d: 'SOPs, docs, spreadsheets, prompts, tickets, and tribal knowledge need to become a company knowledgebase that employees can reuse.' },
      { t: 'Tool access needs boundaries', d: 'An employee that updates CRM should not automatically get production deploy access. MCPs, approvals, and policies need to be scoped by role.' },
      { t: 'Automation quality must improve over time', d: 'Every run should create evals, metrics, decision logs, reusable skills, and better defaults for the next run.' }
    ],
    proof: [
      { k: 'company', v: 'one workspace with shared policies, tools, knowledge, and audit history' },
      { k: 'employees', v: 'sales ops, support ops, engineering QA, finance, marketing, custom roles' },
      { k: 'automations', v: 'lead enrichment, QA, support triage, cloud costs, content, reports' },
      { k: 'learning loop', v: 'skills, evals, metrics, and decisions improve future runs' }
    ],
    outcomes: ['Create a company workspace with departments, policies, and shared knowledge', 'Define AI employees with scoped tools, skills, permissions, and approval gates', 'Attach multiple custom automations to each employee', 'Track metrics, evals, decisions, and reusable skills so the company gets better over time'],
    steps: ['Map departments, roles, recurring work, and approval boundaries', 'Create AI employees with job descriptions, MCP access, model routing, and skills', 'Structure the company knowledgebase from docs, SOPs, examples, tickets, and decision logs', 'Build custom automations for each employee and schedule them by trigger or calendar', 'Measure run quality and promote repeated patterns into reusable workflow-level skills'],
    stack: ['Company workspace', 'AI employees', 'MCPs', 'Skills', 'Knowledgebase', 'Evals'],
    skills: [
      { t: 'Org and role mapping', d: 'Turn departments, owners, approval paths, and recurring jobs into a clear company operating model for AI employees.', tags: ['org chart', 'roles', 'ownership'] },
      { t: 'Employee configuration', d: 'Define each employee with model choices, tool access, MCP permissions, approval gates, schedules, and reporting destinations.', tags: ['permissions', 'models', 'MCPs'] },
      { t: 'Automation design', d: 'Break repeatable work into triggers, steps, context gathering, decisions, actions, evals, and fallback paths.', tags: ['triggers', 'steps', 'approvals'] },
      { t: 'Skill improvement loop', d: 'Convert repeated successful behavior into reusable skills, scripts, rubrics, and decision rules that future runs can use.', tags: ['skills', 'evals', 'metrics'] }
    ],
    planDetails: [
      'Start with a company map: departments, owners, recurring tasks, sensitive systems, current tools, approval paths, and reporting expectations.',
      'Create AI employee profiles such as sales ops, support ops, engineering QA, cloud cost analyst, content operator, finance analyst, or a custom role.',
      'Assign scoped MCP access for each employee: CRM, helpdesk, GitHub, Slack, cloud billing, calendar, warehouse, docs, browser, image/video tools, or custom APIs.',
      'Build the shared knowledgebase from SOPs, docs, prompts, spreadsheets, tickets, runbooks, product rules, examples, customer context, and decision logs.',
      'Attach multiple automations to each employee with clear triggers, schedules, plan steps, model routing, approval gates, output formats, and escalation rules.',
      'Run evals after every automation: success rate, accuracy, policy violations, human edits, latency, cost, SLA hit rate, and business outcome.',
      'Promote repeated wins into workflow-level skills so the company does less prompting and more reliable execution over time.',
      'Review the company dashboard to see employees, automations, latest runs, failures, approvals, metrics, and what improved.'
    ],
    mcps: [
      { t: 'Company systems', d: 'Google Workspace, Slack, Teams, Notion, Linear, Jira, GitHub, CRM, helpdesk, warehouse, and internal APIs for day-to-day company context.' },
      { t: 'Role-scoped tool access', d: 'Each employee can get only the MCPs it needs, with separate read/write access, approval gates, and audit logs.' },
      { t: 'Browser and web research', d: 'Playwright, agent browser, web search, page reading, screenshots, and evidence capture for workflows that need external context.' },
      { t: 'Creative and multimodal tools', d: 'Image generation, video generation, image reading, file parsing, transcription, and document creation for marketing, support, and ops work.' },
      { t: 'Coding agents', d: 'Claude Code, Codex, Gemini CLI, Kimi, and other model plans for repo-aware implementation, QA, analysis, and workflow maintenance.' },
      { t: 'Metrics and eval store', d: 'A run history that captures outputs, approvals, human edits, failures, costs, decisions, and metric movement over time.' }
    ],
    knowledgebase: [
      { t: 'Company operating manual', d: 'Departments, owners, escalation paths, approval policy, sensitive systems, writing style, customer promises, and internal definitions.' },
      { t: 'Employee memory', d: 'Role-specific instructions, examples, tools, recurring tasks, preferred outputs, escalation rules, and past decisions.' },
      { t: 'Workflow library', d: 'Automation specs, triggers, step plans, expected inputs, expected outputs, schedules, fallbacks, and owners.' },
      { t: 'Skills registry', d: 'Reusable workflow-level skills such as lead scoring, QA recording, cost anomaly detection, support classification, or content adaptation.' },
      { t: 'Eval and metric history', d: 'Pass rates, accuracy, SLA, cost, approval rate, human edit distance, false positives, and business outcome movement.' },
      { t: 'Decision log', d: 'What changed, why it changed, who approved it, which metric it targeted, and whether it should become a default.' }
    ],
    evals: ['automation success rate', 'approval acceptance', 'SLA hit rate', 'human edit distance', 'policy violations', 'skill reuse'],
    customizable: ['departments', 'AI employees', 'employee permissions', 'MCP access', 'model plans', 'workflow-level skills', 'knowledgebase structure', 'approval gates', 'schedules', 'eval metrics', 'reporting destinations', 'custom automations'],
    customWorkflowExample: 'Bring your org chart, SOPs, spreadsheets, prompts, ticket queues, CRM process, support macros, release checklists, finance reviews, or manual operations. Runloop can turn them into AI employees and custom automations that keep improving.',
    faqs: [
      { q: 'Is this one bot or multiple employees?', a: 'It is one company workspace with multiple specialized AI employees. Each employee can own multiple automations, tools, skills, schedules, and approval rules.' },
      { q: 'Can each employee use different tools?', a: 'Yes. MCP access, model plans, permissions, knowledgebase sections, approval gates, and reporting destinations can be scoped per employee.' },
      { q: 'Can we start with one department?', a: 'Yes. You can start with support, sales, QA, finance, or any one team, then add employees and automations as the system proves itself.' },
      { q: 'Can the automations be fully custom?', a: 'Yes. The pages here are examples. Runloop can build custom automations around your workflows, tools, policies, knowledgebase, and metrics.' },
      { q: 'How does it improve over time?', a: 'Every run can store evals, approvals, human edits, decision logs, and reusable skills. Repeated successful patterns become faster and more reliable.' }
    ]
  },
  {
    slug: 'lead-enrichment',
    c: 'Sales',
    t: 'Lead enrichment agent',
    d: 'Captures inbound leads, enriches accounts, scores fit, and routes the next action.',
    pill: 'realtime',
    color: 'var(--lime)',
    palette: ['var(--lime)', 'var(--cyan)', 'var(--violet)', 'var(--amber)', 'var(--success)', 'var(--pink)'],
    animation: 'lead',
    hero: 'Build a lead enrichment automation around your exact GTM process.',
    intro: 'Runloop can use CRM MCPs, enrichment APIs, web search, reusable sales skills, and your knowledgebase to capture leads, enrich accounts, score fit, route owners, and draft evidence-backed follow-up.',
    problemHeading: 'The bottleneck is not getting more leads. It is knowing which ones deserve action now.',
    problemIntro: 'The automation is designed for sales teams that need clean data, explainable scoring, routing rules, and follow-up context before a lead goes cold.',
    painPoints: [
      { t: 'Inbound leads arrive with missing context', d: 'Forms, ads, chats, webinars, and calendars rarely include the account, role, buying signal, routing owner, and next action in one place.' },
      { t: 'Enrichment is inconsistent across tools', d: 'Different providers return different answers. The workflow can run a confidence-aware enrichment waterfall and write only trusted fields.' },
      { t: 'Scoring rules live outside the system', d: 'ICP rules, exclusions, territories, named accounts, and compliance checks often live in spreadsheets or team memory.' },
      { t: 'Sales loses time before the first touch', d: 'The automation can route the lead, explain the score, and draft a first message with cited evidence for review.' }
    ],
    proof: [
      { k: 'MCPs + APIs', v: 'CRM, enrichment, web search, email, Slack, warehouse' },
      { k: 'skills', v: 'ICP scoring, dedupe, data QA, follow-up drafting' },
      { k: 'knowledgebase', v: 'scoring rubric, routing policy, field dictionary' },
      { k: 'evals', v: 'coverage, confidence, duplicates, routing accuracy' }
    ],
    outcomes: ['Capture every lead source with attribution', 'Enrich company, role, intent, and account context using MCPs and APIs', 'Score against ICP, knowledgebase rules, and routing policy', 'Draft the first follow-up with evidence for review'],
    steps: ['Watch forms, ads, chat, and webinar sources', 'Normalize identity and dedupe against CRM', 'Research company context and buying signals', 'Score fit, urgency, and source quality', 'Notify owner and draft follow-up'],
    stack: ['CRM', 'LinkedIn / enrichment API', 'Slack', 'OpenAI / Anthropic', 'Email'],
    skills: [
      { t: 'ICP fit scoring', d: 'Score company size, industry, geography, revenue band, tech stack, role, seniority, and account tier.', tags: ['fit score', 'firmographics', 'persona'] },
      { t: 'Engagement scoring', d: 'Combine source quality, form intent, page visits, event activity, replies, and recency into a separate interest score.', tags: ['engagement', 'intent', 'recency'] },
      { t: 'Data quality review', d: 'Detect missing fields, risky matches, duplicate accounts, personal emails, disposable domains, and low-confidence enrichment.', tags: ['dedupe', 'confidence', 'validation'] },
      { t: 'Personalized follow-up', d: 'Draft a first-touch email or Slack brief using only cited evidence from the CRM, enrichment provider, and web research.', tags: ['evidence', 'email', 'brief'] }
    ],
    planDetails: [
      'Capture lead payload from form, ad, chat, event, calendar, CSV, or CRM trigger with source, campaign, UTM, consent, and timestamp.',
      'Normalize identity: clean email/domain, infer company, map fields, and dedupe against existing contacts, companies, and open opportunities.',
      'Run enrichment waterfall across approved providers, preferring business email/domain matches and tracking confidence for every returned field.',
      'Enrich person and company separately: title, role, seniority, LinkedIn, location, employee range, industry, revenue band, tech stack, and website.',
      'Research buying signals with web search: recent funding, hiring, product launches, pricing-page visits, job posts, tech changes, and public intent signals.',
      'Score fit and engagement separately, then combine into routing bands such as hot, nurture, reject, needs-human-review, or existing-customer.',
      'Route to owner using territory, segment, account ownership, round-robin, named account lists, or partner/channel rules.',
      'Write the CRM update, notify sales, draft the first follow-up, and attach a short evidence pack explaining the score and next action.',
      'Evaluate every run for enrichment coverage, false duplicates, match confidence, routing correctness, SLA compliance, and conversion lift.'
    ],
    mcps: [
      { t: 'CRM MCP', d: 'HubSpot, Salesforce, Pipedrive, or Attio for contacts, companies, owners, lifecycle stage, activities, and score fields.' },
      { t: 'Enrichment MCP/API', d: 'Apollo, Clearbit, People Data Labs, Clay, or custom providers for person, company, email, phone, firmographic, and technographic enrichment.' },
      { t: 'Web search + browser', d: 'Search and browser tools for company websites, LinkedIn pages, funding announcements, hiring pages, public docs, and source validation.' },
      { t: 'Messaging MCP', d: 'Slack, Teams, Gmail, Outlook, or sequences for owner alerts, review queues, and approved first-touch drafts.' },
      { t: 'Warehouse / Sheets', d: 'Postgres, BigQuery, Snowflake, Sheets, or CSV for historical leads, conversion outcomes, suppression lists, and scoring backtests.' },
      { t: 'Compliance store', d: 'Consent, suppression, region, unsubscribe, source policy, and audit fields before writing or messaging any lead.' }
    ],
    knowledgebase: [
      { t: 'ICP rules', d: 'Target industries, company-size bands, geographies, excluded segments, partner rules, negative-fit signals, and high-value account lists.' },
      { t: 'Scoring rubric', d: 'Fit score, engagement score, urgency score, decay rules, confidence thresholds, review bands, and examples of good or bad matches.' },
      { t: 'Field dictionary', d: 'Canonical CRM fields, accepted values, provider-to-CRM mappings, fallback rules, and required fields per lifecycle stage.' },
      { t: 'Routing policy', d: 'Territories, named accounts, owner precedence, round-robin rules, SLA targets, escalation rules, and review ownership.' },
      { t: 'Message playbook', d: 'Approved snippets, tone rules, evidence requirements, personalization limits, objection handling, and disallowed claims.' },
      { t: 'Decision log', d: 'What changed in scoring or enrichment, who approved it, the metric it targets, and whether the change improved future runs.' }
    ],
    evals: ['enrichment coverage', 'match confidence', 'duplicate rate', 'routing accuracy', 'owner SLA', 'MQL to SQL lift'],
    customizable: ['lead sources', 'CRM schema', 'MCPs', 'workflow-level skills', 'knowledgebase rules', 'enrichment providers', 'waterfall order', 'ICP scoring weights', 'territory routing', 'approval thresholds', 'follow-up style', 'compliance policy'],
    customWorkflowExample: 'Bring an existing lead scoring spreadsheet, enrichment SOP, CRM field map, routing policy, sales playbook, compliance rule, or manual qualification checklist. The workflow can be rebuilt around it and improved over repeated runs.',
    faqs: [
      { q: 'Can it work with our current CRM?', a: 'Yes. The workflow can be wired to Salesforce, HubSpot, Attio, Pipedrive, or a custom CRM schema through MCPs or APIs.' },
      { q: 'Can we choose our enrichment providers?', a: 'Yes. You can define provider order, fallback logic, confidence thresholds, field overwrite rules, and compliance constraints.' },
      { q: 'Can scoring match our ICP?', a: 'Yes. Your ICP rules, exclusions, territories, named accounts, and examples can live in the knowledgebase and be evaluated every run.' },
      { q: 'Can humans approve follow-up messages?', a: 'Yes. Drafts, CRM writes, owner routing, and outbound messages can all be approval-gated before anything is sent or updated.' }
    ]
  },
  {
    slug: 'claude-costs',
    c: 'FinOps',
    t: 'AWS, GCP, Azure cost optimizer',
    d: 'Monitors cloud spend, finds waste, explains anomalies, and proposes approval-gated savings actions.',
    pill: 'daily',
    color: 'var(--violet)',
    palette: ['var(--violet)', 'var(--cyan)', 'var(--amber)', 'var(--lime)', 'var(--success)', 'var(--pink)'],
    animation: 'cloud-cost',
    hero: 'Find and reduce AWS, GCP, and Azure waste before it hits the bill.',
    intro: 'Runloop can use cloud billing MCPs, cost exports, tagging rules, reusable FinOps skills, and your knowledgebase to detect anomalies, explain spend, recommend savings, and route approval-gated fixes.',
    problemHeading: 'The bottleneck is not seeing the bill. It is knowing which cost changes are safe to make.',
    problemIntro: 'Cloud cost automation needs context: owners, tags, environments, service criticality, commitment coverage, seasonality, and approval rules before it recommends action.',
    painPoints: [
      { t: 'Spend is split across clouds and accounts', d: 'AWS, GCP, and Azure each expose billing differently, making it hard to compare teams, products, environments, and cost centers.' },
      { t: 'Waste hides behind missing tags', d: 'Untagged resources, orphaned disks, idle load balancers, unused IPs, oversized databases, and stale environments quietly accumulate.' },
      { t: 'Savings recommendations need business context', d: 'Rightsizing a production database or buying commitments is not just math. It needs owner, SLA, usage pattern, and risk policy.' },
      { t: 'Reports rarely turn into action', d: 'The workflow can open approval queues, create tickets, notify owners, and track whether recommended changes actually reduced spend.' }
    ],
    proof: [
      { k: 'clouds', v: 'AWS Cost Explorer, GCP Billing, Azure Cost Management' },
      { k: 'skills', v: 'anomaly detection, rightsizing, tag hygiene, savings plans' },
      { k: 'knowledgebase', v: 'owner map, budgets, policies, safe actions' },
      { k: 'approvals', v: 'Slack, Jira, GitHub, Terraform PRs, change windows' }
    ],
    outcomes: ['Unify AWS, GCP, and Azure spend into one daily view', 'Detect anomalies, idle resources, tag gaps, and expensive services', 'Recommend rightsizing, shutdown, storage, and commitment actions', 'Route approval-gated tickets or infrastructure PRs with evidence'],
    steps: ['Import billing exports and cloud inventory', 'Normalize accounts, projects, subscriptions, tags, owners, and services', 'Detect anomalies, idle spend, commitment gaps, and risky growth', 'Explain each recommendation with evidence and expected savings', 'Route tickets, approvals, or Terraform PRs to the right owner'],
    stack: ['AWS', 'GCP', 'Azure', 'Cloud billing MCPs', 'Terraform', 'Slack / Jira'],
    skills: [
      { t: 'Spend normalization', d: 'Group AWS accounts, GCP projects, and Azure subscriptions by owner, product, environment, tag, service, region, and cost center.', tags: ['AWS', 'GCP', 'Azure'] },
      { t: 'Anomaly detection', d: 'Compare daily and weekly spend against expected seasonality, deployments, usage, budgets, and historical baselines.', tags: ['anomalies', 'budgets', 'seasonality'] },
      { t: 'Waste detection', d: 'Find idle resources, orphaned storage, unused IPs, oversized instances, stale snapshots, forgotten dev environments, and missing tags.', tags: ['idle', 'rightsizing', 'tags'] },
      { t: 'Approval-ready savings plan', d: 'Draft tickets, owner summaries, or Terraform PRs with estimated savings, risk level, rollback path, and required approval.', tags: ['approvals', 'Terraform', 'savings'] }
    ],
    planDetails: [
      'Connect AWS Cost Explorer or CUR, GCP Billing Export, Azure Cost Management, cloud inventory, budgets, and tag policies through MCPs or APIs.',
      'Normalize spend across accounts, projects, subscriptions, services, SKUs, regions, environments, products, teams, and cost centers.',
      'Join cost data with ownership sources such as tags, Terraform state, CMDB, GitHub CODEOWNERS, Kubernetes labels, spreadsheets, or service catalogs.',
      'Detect anomalies: sudden spend spikes, new expensive services, region drift, runaway data transfer, retry loops, storage growth, and unplanned environment usage.',
      'Find waste: idle compute, oversized databases, unused disks, stale snapshots, unattached IPs, low-utilization Kubernetes nodes, and missing lifecycle policies.',
      'Evaluate savings actions with your knowledgebase: production risk, SLA, change window, excluded services, commitment policy, and owner approval rules.',
      'Generate a daily or weekly FinOps report with top deltas, owner breakdowns, evidence, expected savings, and recommended next actions.',
      'Route approved work into Slack, Jira, GitHub, Terraform, or cloud console workflows, then measure whether spend actually dropped.'
    ],
    mcps: [
      { t: 'AWS MCP/API', d: 'Cost Explorer, CUR, EC2, RDS, EBS, S3, Lambda, CloudWatch, tags, accounts, budgets, and Savings Plans coverage.' },
      { t: 'GCP MCP/API', d: 'Cloud Billing export, BigQuery, Compute Engine, Cloud SQL, GKE, storage buckets, labels, projects, budgets, and committed-use discounts.' },
      { t: 'Azure MCP/API', d: 'Cost Management, Advisor, VMs, disks, databases, storage, subscriptions, resource groups, tags, budgets, and reservations.' },
      { t: 'Terraform / IaC MCP', d: 'Map resources to code owners, open infrastructure PRs, propose lifecycle policies, resize resources, or remove stale infrastructure safely.' },
      { t: 'Metrics and inventory', d: 'CloudWatch, Prometheus, Datadog, Grafana, Kubernetes, CMDB, or service catalog for utilization and ownership context.' },
      { t: 'Slack / Jira / GitHub', d: 'Route approval requests, owner reports, tickets, PRs, exception reviews, and recurring FinOps summaries.' }
    ],
    knowledgebase: [
      { t: 'Ownership map', d: 'Accounts, projects, subscriptions, tags, teams, services, owners, escalation paths, cost centers, and budget contacts.' },
      { t: 'Savings policy', d: 'Allowed actions, approval thresholds, excluded services, production constraints, change windows, rollback rules, and commitment policy.' },
      { t: 'Tagging dictionary', d: 'Required tags, accepted values, fallback ownership rules, environment naming, chargeback fields, and tag quality examples.' },
      { t: 'Risk rubric', d: 'How to classify safe shutdowns, risky rightsizing, commitment purchases, storage lifecycle changes, and human-review-only changes.' },
      { t: 'Report formats', d: 'Executive summary, owner tickets, Terraform PR notes, anomaly explanation, estimated savings, confidence, and proof requirements.' },
      { t: 'Decision log', d: 'What was recommended, who approved it, what changed, expected savings, realized savings, and whether the rule should be reused.' }
    ],
    evals: ['monthly savings found', 'realized savings', 'tag coverage', 'owner routing accuracy', 'anomaly precision', 'approval cycle time'],
    customizable: ['AWS accounts', 'GCP projects', 'Azure subscriptions', 'billing exports', 'MCPs', 'FinOps skills', 'tag policy', 'savings thresholds', 'approval rules', 'Terraform workflow', 'report format'],
    customWorkflowExample: 'Bring cloud bills, tagging policy, budgets, Terraform repos, owner maps, FinOps spreadsheets, or manual cost review checklists. The workflow can be rebuilt around your cloud setup and improved over repeated runs.',
    faqs: [
      { q: 'Can it work across AWS, GCP, and Azure together?', a: 'Yes. The workflow normalizes billing, inventory, owners, tags, and budgets across all three clouds into one cost view.' },
      { q: 'Can it make cloud changes automatically?', a: 'Usually teams start with approval-gated tickets or Terraform PRs. You can decide which actions are automatic, approval-only, or report-only.' },
      { q: 'Can it respect production risk?', a: 'Yes. The knowledgebase can encode excluded services, change windows, critical workloads, rollback requirements, and human-review thresholds.' },
      { q: 'Can it measure whether savings actually happened?', a: 'Yes. Recommendations are logged with expected savings, then compared against later billing data to track realized savings and improve future rules.' }
    ]
  },
  {
    slug: 'qa-regression',
    c: 'Engineering',
    t: 'Custom QA test suite',
    d: 'Uses coding agents to create, maintain, and run business-critical QA tests on a recurring schedule.',
    pill: 'scheduled',
    color: 'var(--cyan)',
    animation: 'qa',
    hero: 'Create a custom QA test suite that keeps running on schedule.',
    intro: 'Runloop can use Claude Code, Codex, MCPs, reusable skills, and your knowledgebase to write browser, API, edge-case, and business-critical tests, then run them on a recurring workflow with evidence and reports.',
    painPoints: [
      { t: 'Important paths are still manually checked', d: 'Checkout, onboarding, billing, login, admin flows, and customer-specific edge cases often live in someone\'s memory instead of a real test suite.' },
      { t: 'Existing tests miss business rules', d: 'Unit tests can pass while discount logic, role permissions, retries, cancellation flows, or compliance checks break in production.' },
      { t: 'QA coverage does not keep up with product changes', d: 'Claude Code or Codex can inspect the app, docs, tickets, and existing tests to propose and update coverage as the product evolves.' },
      { t: 'Scheduled checks need evidence, not just red or green', d: 'Recurring runs should produce screenshots, traces, logs, business-rule status, and a clear report for the team.' }
    ],
    proof: [
      { k: 'coding agents', v: 'Claude Code / Codex / Gemini CLI / Kimi' },
      { k: 'MCPs + skills', v: 'browser, GitHub, CI, app data, reusable QA skills' },
      { k: 'coverage', v: 'browser, API, edge-case, critical-path tests' },
      { k: 'schedule', v: 'hourly, daily, release, PR, or incident-triggered runs' }
    ],
    outcomes: ['Generate a custom QA suite from your app, docs, MCPs, skills, and business rules', 'Record and maintain critical browser workflows with Playwright', 'Run edge-case and business-critical checks on a recurring schedule', 'Report failures with evidence and suggested fixes from Claude Code or Codex'],
    steps: ['Map critical user journeys and business rules', 'Use Claude Code or Codex to create test files and fixtures', 'Record browser workflows and add edge-case assertions', 'Schedule recurring runs across staging, production, or release branches', 'Post evidence, failures, and recommended fixes'],
    stack: ['Claude Code', 'Codex CLI', 'Playwright', 'GitHub', 'CI / scheduler', 'Slack'],
    skills: [
      { t: 'Test suite generation', d: 'Claude Code, Codex, or another coding agent reads the repo, app routes, existing tests, docs, and known incidents to create focused QA tests.', tags: ['Claude Code', 'Codex', 'test files'] },
      { t: 'Workflow recording', d: 'Record critical browser flows, then convert them into maintainable Playwright tests with assertions, fixtures, selectors, and screenshots.', tags: ['Playwright', 'recording', 'browser'] },
      { t: 'Business-rule coverage', d: 'Turn edge cases like permissions, pricing, retries, cancellation, checkout, onboarding, and data validation into scheduled checks.', tags: ['edge cases', 'critical paths', 'rules'] },
      { t: 'Recurring run reporting', d: 'Run the suite on schedule, capture traces and logs, classify failures, and ask Claude Code or Codex for likely fixes or test updates.', tags: ['schedule', 'evidence', 'fix path'] }
    ],
    planDetails: [
      'Inventory the product: routes, APIs, roles, payments, onboarding, admin actions, high-value customer journeys, and release-blocking business rules.',
      'Read existing tests, docs, tickets, incident notes, support issues, MCP outputs, skills, and knowledgebase rules to find missing edge cases and business-critical workflows.',
      'Use Claude Code or Codex with the right MCPs and workflow-level skills to create the first QA suite: Playwright specs, API checks, fixtures, setup scripts, selectors, and assertion strategy.',
      'Record real browser workflows for critical paths, then have the coding agent clean them into stable tests instead of brittle recordings.',
      'Add edge-case scenarios such as expired sessions, permission boundaries, duplicate submits, retries, refunds, plan changes, empty states, and degraded APIs.',
      'Schedule recurring runs: hourly smoke checks, nightly full regression, pre-release gates, post-deploy production canaries, or custom business calendars.',
      'On every run, collect screenshots, videos, traces, console logs, network errors, CI output, and business-rule pass/fail status.',
      'When a check fails, ask Claude Code or Codex to inspect the evidence and suggest whether to fix code, update a test, add data, or escalate to a human.',
      'Store the final decision, changed tests, flaky signatures, business-rule coverage, and eval result so the QA suite improves over time.'
    ],
    mcps: [
      { t: 'Claude Code / Codex CLI', d: 'Repo-aware creation and maintenance of test suites, fixtures, assertions, selectors, setup scripts, and suggested fixes.' },
      { t: 'GitHub MCP', d: 'Pull requests, changed files, reviews, code owners, test commits, issue creation, PR comments, labels, and release branch context.' },
      { t: 'Playwright / browser tools', d: 'Workflow recording, browser execution, screenshots, videos, traces, console logs, network events, and visual checks.' },
      { t: 'CI / scheduler MCP', d: 'GitHub Actions, Buildkite, CircleCI, Jenkins, cron, or custom schedulers for hourly, nightly, release, and post-deploy runs.' },
      { t: 'App data and API tools', d: 'Seed data, test accounts, API checks, feature flags, billing sandboxes, staging environments, and production-safe canaries.' },
      { t: 'Slack / Teams / Jira', d: 'Scheduled summaries, failure reports, approval queues, owner notifications, incident threads, and follow-up tickets.' }
    ],
    knowledgebase: [
      { t: 'Critical workflow map', d: 'Checkout, signup, login, billing, cancellation, admin, permissions, customer-specific flows, and release-blocking journeys.' },
      { t: 'Business-rule library', d: 'Pricing rules, role boundaries, compliance requirements, retries, SLAs, accepted edge cases, and examples of broken behavior.' },
      { t: 'Test suite inventory', d: 'Generated specs, coverage goals, owners, fixtures, required accounts, environments, data setup, and maintenance notes.' },
      { t: 'Recording library', d: 'Recorded flows, cleaned Playwright versions, stable selectors, screenshots, videos, and notes on why each workflow matters.' },
      { t: 'Failure and flake memory', d: 'Selectors, error messages, trace fingerprints, retry patterns, browsers, environments, and links to prior decisions.' },
      { t: 'Decision log', d: 'What the coding agent changed, who approved it, which coverage gap it closed, and whether scheduled runs improved after the change.' }
    ],
    evals: ['critical-path coverage', 'edge-case coverage', 'scheduled pass rate', 'flake false-positive rate', 'time to diagnosis', 'report completeness'],
    customizable: ['Claude Code or Codex', 'MCPs', 'workflow-level skills', 'knowledgebase rules', 'test framework', 'recorded workflows', 'business-critical paths', 'edge-case library', 'run schedule', 'staging or production', 'approval gate', 'report destination'],
    faqs: [
      { q: 'Can it create a QA suite from scratch?', a: 'Yes. Claude Code or Codex can inspect the repo, product flows, docs, tickets, and current tests, then draft Playwright, API, or integration tests for review.' },
      { q: 'Can it record workflows?', a: 'Yes. Browser workflows can be recorded, then cleaned into maintainable tests with stable selectors, assertions, fixtures, screenshots, and trace capture.' },
      { q: 'Can it run on a schedule?', a: 'Yes. The workflow can run hourly, nightly, before releases, after deploys, or on a custom business calendar for critical customer paths.' },
      { q: 'Can humans approve generated tests and fixes?', a: 'Yes. You can keep generated tests, test updates, and code fixes behind PR review or approval queues before anything lands.' }
    ]
  },
  {
    slug: 'social-x',
    c: 'Social',
    t: 'Social media content automation',
    d: 'Turns product context into approved posts, replies, threads, carousels, and scheduled publishing workflows across channels.',
    pill: 'daily',
    color: 'var(--pink)',
    palette: ['var(--pink)', 'var(--cyan)', 'var(--violet)', 'var(--amber)', 'var(--lime)', 'var(--success)'],
    animation: 'social-x',
    hero: 'Turn product work into a steady social media publishing system.',
    intro: 'Runloop can use docs, changelogs, GitHub, web search, social MCPs, reusable brand skills, and your knowledgebase to draft posts, threads, LinkedIn updates, Reddit replies, Instagram captions, and scheduled campaigns for review.',
    problemHeading: 'The bottleneck is not ideas. It is turning real work into consistent, approved content.',
    problemIntro: 'Social automation needs source truth, brand voice, claim checking, approvals, scheduling, reply monitoring, and engagement feedback so the content loop improves over time.',
    painPoints: [
      { t: 'Launches happen faster than content planning', d: 'Product updates, docs, changelogs, customer proof, and demos often ship without a clear social narrative or posting calendar.' },
      { t: 'Generic AI posts weaken the brand', d: 'Good content needs voice rules, approved claims, banned phrases, audience context, examples, and human review before it goes live.' },
      { t: 'Every channel needs a different format', d: 'X threads, LinkedIn posts, Reddit replies, Instagram captions, and carousel outlines each need different tone, length, proof, and approval rules.' },
      { t: 'Engagement rarely feeds the next post', d: 'Replies, saves, clicks, quote posts, and high-performing hooks can be summarized into the knowledgebase for future campaigns.' }
    ],
    proof: [
      { k: 'sources', v: 'GitHub, docs, changelogs, web search, customer proof' },
      { k: 'skills', v: 'hooks, threads, launches, replies, claim checks' },
      { k: 'channels', v: 'X, LinkedIn, Reddit, Instagram, schedulers' },
      { k: 'learning', v: 'engagement signals, voice memory, topic backlog' }
    ],
    outcomes: ['Convert launches, docs, and changelogs into channel-specific posts', 'Generate campaign calendars, hooks, reply briefs, carousels, and approval queues', 'Check claims against source material, channel rules, and brand voice', 'Learn from engagement across platforms to improve future content'],
    steps: ['Collect source material from docs, GitHub, notes, and web research', 'Extract launch angles, customer proof, objections, and reusable themes', 'Draft channel-specific posts for X, LinkedIn, Reddit, Instagram, and schedulers', 'Check claims, tone, banned phrases, platform fit, and approval requirements', 'Schedule approved content and summarize engagement into the knowledgebase'],
    stack: ['X / Twitter', 'LinkedIn', 'Reddit', 'Instagram', 'Scheduler', 'Slack approvals'],
    skills: [
      { t: 'Source-to-content drafting', d: 'Turn release notes, docs, issues, demos, and customer proof into X threads, LinkedIn posts, Reddit replies, Instagram captions, and campaign variants.', tags: ['launches', 'threads', 'repurposing'] },
      { t: 'Channel adaptation', d: 'Rewrite the same source idea for platform-specific tone, length, structure, CTA, proof level, and formatting rules.', tags: ['X', 'LinkedIn', 'Reddit', 'Instagram'] },
      { t: 'Reply and conversation briefs', d: 'Track replies, questions, objections, mentions, comments, and quote posts, then draft useful response options for review.', tags: ['replies', 'objections', 'community'] },
      { t: 'Engagement learning', d: 'Summarize which hooks, topics, formats, and proof points work, then feed those insights into the next content cycle.', tags: ['metrics', 'topics', 'learning'] }
    ],
    planDetails: [
      'Connect source systems: docs, GitHub releases, changelogs, roadmap notes, customer proof, saved ideas, web research, and product pages.',
      'Build a topic backlog from launches, tutorials, customer outcomes, FAQs, competitor comparisons, founder notes, and support questions.',
      'Use brand skills and knowledgebase rules to draft platform-specific variants for X, LinkedIn, Reddit, Instagram, and scheduler queues.',
      'Check every draft against source material, approved claims, banned phrases, compliance rules, links, audience fit, and channel norms.',
      'Route drafts to Slack, Notion, Linear, or a review queue for human approval before scheduling or publishing.',
      'Schedule approved posts through X, LinkedIn, Instagram, Buffer, Typefully, Hypefury, Later, or your existing scheduler.',
      'Monitor replies, comments, mentions, quote posts, bookmarks, clicks, impressions, and questions that should become new content.',
      'Store winning hooks, weak topics, common objections, approved answers, and engagement summaries in the knowledgebase.'
    ],
    mcps: [
      { t: 'Social platform MCPs', d: 'X/Twitter, LinkedIn, Reddit, Instagram, and scheduler APIs for drafts, comments, replies, posting queues, profile context, and metrics.' },
      { t: 'Docs and GitHub MCPs', d: 'Release notes, pull requests, changelogs, docs, issues, product pages, and source-of-truth links for claim checking.' },
      { t: 'Scheduler MCP', d: 'Buffer, Typefully, Hypefury, Later, Notion calendar, or custom queues for campaign planning and timed publishing across channels.' },
      { t: 'Slack / Teams MCP', d: 'Approval threads, content review, legal or founder feedback, daily queue summaries, and reply escalation.' },
      { t: 'Web search and browser', d: 'Market context, competitor positioning, customer language, source verification, and timely topic research.' },
      { t: 'Analytics store', d: 'Post performance, clicks, impressions, bookmarks, replies, themes, hooks, and experiments for future planning.' }
    ],
    knowledgebase: [
      { t: 'Brand voice', d: 'Tone, vocabulary, banned phrases, approved claims, examples, formatting style, emoji policy, and audience segments.' },
      { t: 'Product truth', d: 'Features, use cases, integrations, pricing notes, limitations, roadmap boundaries, and source links for fact checking.' },
      { t: 'Channel playbook', d: 'X thread patterns, LinkedIn structures, Reddit community rules, Instagram caption formats, hook styles, and proof requirements.' },
      { t: 'Approval policy', d: 'Who reviews what, platform-specific publish permissions, legal-sensitive topics, escalation rules, and scheduling windows.' },
      { t: 'Engagement memory', d: 'Winning hooks, weak topics, frequent objections, useful replies, customer questions, comments, and high-signal conversations.' },
      { t: 'Experiment log', d: 'Content hypothesis, variants, schedule, metric target, result, and whether the pattern should be reused.' }
    ],
    evals: ['claim accuracy', 'approval acceptance rate', 'engagement lift', 'reply quality', 'channel fit', 'publish consistency'],
    customizable: ['source systems', 'X account', 'LinkedIn page', 'Reddit communities', 'Instagram account', 'brand voice', 'content pillars', 'MCPs', 'workflow-level skills', 'approval policy', 'scheduler', 'analytics metrics'],
    customWorkflowExample: 'Bring a launch checklist, content calendar, founder notes, docs, saved posts, brand guide, subreddit rules, approval policy, or manual social process. The workflow can be rebuilt around it and improved over repeated runs.',
    faqs: [
      { q: 'Which channels can it support?', a: 'X/Twitter, LinkedIn, Reddit, Instagram, schedulers, and custom channels can be wired through MCPs, APIs, or approval queues.' },
      { q: 'Can it publish automatically?', a: 'Yes, but most teams start with approval-gated drafts. You can decide which channels are draft-only, scheduled after approval, or auto-published.' },
      { q: 'Can it keep our brand voice?', a: 'Yes. Voice rules, examples, banned phrases, approved claims, and audience guidance can live in reusable skills and the knowledgebase.' },
      { q: 'Can it reply to comments and mentions?', a: 'It can monitor comments, mentions, replies, and community questions, then draft response options for human review.' },
      { q: 'Can it learn from engagement?', a: 'Yes. It can summarize hooks, topics, formats, and proof points that perform well, then use that memory in future content cycles.' }
    ]
  },
  {
    slug: 'instagram-content',
    c: 'Social',
    t: 'Instagram content automation',
    d: 'Turns product context into approved reels, carousel concepts, captions, asset briefs, and scheduled posting plans.',
    pill: 'weekly',
    color: 'var(--amber)',
    palette: ['var(--amber)', 'var(--pink)', 'var(--cyan)', 'var(--violet)', 'var(--lime)', 'var(--success)'],
    animation: 'instagram',
    hero: 'Turn one product idea into a week of Instagram-ready creative.',
    intro: 'Runloop can use docs, Drive, Instagram MCPs, design tools, image/video generation, reusable brand skills, and your knowledgebase to draft reels, carousels, captions, shot lists, and scheduled campaigns for review.',
    problemHeading: 'The bottleneck is not posting more. It is turning real product proof into visual stories people save.',
    problemIntro: 'Instagram automation needs source truth, visual direction, brand guardrails, approval queues, asset handoff, scheduling, and engagement feedback so each content cycle improves.',
    painPoints: [
      { t: 'Product updates do not become visual stories', d: 'Launches, docs, customer wins, and founder notes often need translation into hooks, slides, reels, captions, and visual briefs.' },
      { t: 'Creative direction is scattered', d: 'Design rules, caption style, examples, colors, proof points, and disallowed claims need to live in one reusable system.' },
      { t: 'Reels and carousels need different planning', d: 'A strong reel needs a hook, script, shot list, pacing, captions, and B-roll notes. A carousel needs slide structure and save-worthy takeaways.' },
      { t: 'Performance rarely feeds the next brief', d: 'Saves, shares, comments, completion rate, profile clicks, and top hooks can become memory for future creative.' }
    ],
    proof: [
      { k: 'formats', v: 'reels, carousels, captions, stories, creative briefs' },
      { k: 'tools', v: 'Instagram, Drive, Canva, image/video generation, schedulers' },
      { k: 'skills', v: 'hooks, scripts, slide outlines, brand guardrails' },
      { k: 'learning', v: 'saves, shares, comments, completion, topic memory' }
    ],
    outcomes: ['Create carousel outlines, slide copy, visual notes, and caption variants', 'Draft reel hooks, scripts, shot lists, B-roll ideas, and on-screen text', 'Generate or brief image/video assets while keeping human approval', 'Plan a weekly posting calendar and learn from engagement signals'],
    steps: ['Read docs, notes, customer proof, assets, and content backlog', 'Extract content angles, proof points, objections, and visual opportunities', 'Draft reels, carousels, captions, stories, and creative briefs', 'Check claims, brand voice, visual rules, and approval requirements', 'Schedule approved content and summarize performance into the knowledgebase'],
    stack: ['Instagram', 'Drive', 'Canva', 'Image / video generation', 'Scheduler', 'Slack approvals'],
    skills: [
      { t: 'Carousel planning', d: 'Turn one source idea into slide-by-slide outlines, hooks, proof points, visual notes, captions, and save-worthy takeaways.', tags: ['carousels', 'slides', 'captions'] },
      { t: 'Reel script drafting', d: 'Draft short hooks, voiceover scripts, shot lists, B-roll ideas, on-screen text, and pacing notes from source material.', tags: ['reels', 'scripts', 'shot list'] },
      { t: 'Visual asset briefing', d: 'Create image/video prompts, Canva briefs, asset requests, design notes, and production checklists for human or generated creative.', tags: ['image', 'video', 'briefs'] },
      { t: 'Engagement learning', d: 'Summarize what earns saves, shares, comments, profile clicks, completion, and replies, then improve future briefs.', tags: ['saves', 'shares', 'learning'] }
    ],
    planDetails: [
      'Connect source systems: docs, Drive folders, product notes, customer stories, testimonials, launches, saved ideas, and existing Instagram assets.',
      'Build a content backlog from product ideas, educational topics, customer proof, founder notes, FAQs, objections, and community questions.',
      'Use reusable brand skills and the knowledgebase to draft reels, carousel outlines, captions, story prompts, and content calendar options.',
      'Create creative briefs with image prompts, video prompts, shot lists, B-roll notes, on-screen text, design direction, and asset requirements.',
      'Check every draft against source material, approved claims, brand tone, visual rules, accessibility, platform fit, and review policy.',
      'Route drafts and asset briefs to Slack, Drive, Notion, Canva, or a review queue for approval before scheduling.',
      'Schedule approved posts through Instagram, Buffer, Later, Meta tools, or your existing scheduler.',
      'Monitor saves, shares, comments, completion, profile clicks, replies, and high-performing creative patterns, then store learnings for the next cycle.'
    ],
    mcps: [
      { t: 'Instagram / Meta MCP', d: 'Account context, drafts, comments, posts, publishing queues, insights, profile clicks, saves, shares, and engagement summaries.' },
      { t: 'Drive / asset MCP', d: 'Source images, videos, brand assets, product screenshots, customer proof, folders, approvals, and content handoff.' },
      { t: 'Canva / design MCP', d: 'Carousel templates, creative briefs, design assets, brand kits, slide structures, and production-ready design tasks.' },
      { t: 'Image and video generation', d: 'Generate or brief supporting visuals, thumbnails, backgrounds, storyboards, short clips, and production prompts for review.' },
      { t: 'Scheduler MCP', d: 'Later, Buffer, Meta Business Suite, Notion calendar, or custom queues for weekly planning and timed publishing.' },
      { t: 'Slack / Notion / Docs', d: 'Approval threads, content calendar review, founder feedback, legal review, asset requests, and campaign notes.' }
    ],
    knowledgebase: [
      { t: 'Brand visual rules', d: 'Colors, typography, layout rules, do/don’t examples, image style, caption tone, accessibility, and production constraints.' },
      { t: 'Content pillars', d: 'Education, launches, customer stories, founder POV, objections, product tips, behind-the-scenes, and recurring series.' },
      { t: 'Format playbook', d: 'Carousel structures, reel pacing, hook styles, slide formulas, caption patterns, CTA rules, and story formats.' },
      { t: 'Approved claims', d: 'Product facts, customer proof, source links, banned claims, compliance rules, and examples that require human review.' },
      { t: 'Asset library', d: 'Product screenshots, customer quotes, b-roll ideas, existing creatives, reusable prompts, templates, and approved visuals.' },
      { t: 'Engagement memory', d: 'Winning hooks, saved posts, shared carousels, comment themes, completion patterns, weak topics, and next experiments.' }
    ],
    evals: ['approval acceptance rate', 'save rate', 'share rate', 'caption quality', 'asset brief quality', 'posting consistency'],
    customizable: ['Instagram account', 'brand visual rules', 'content pillars', 'Drive assets', 'Canva templates', 'image generation', 'video generation', 'approval policy', 'scheduler', 'analytics metrics'],
    customWorkflowExample: 'Bring a content calendar, brand guide, Drive assets, Canva templates, saved posts, product notes, founder ideas, or manual Instagram process. The workflow can be rebuilt around it and improved over repeated runs.',
    faqs: [
      { q: 'Can it generate images or videos?', a: 'Yes. It can generate or brief images, video concepts, thumbnails, storyboards, and production prompts, with human review before use.' },
      { q: 'Can it work with our design process?', a: 'Yes. It can create Canva briefs, Drive asset requests, design notes, and approval queues around your existing workflow.' },
      { q: 'Can it publish automatically?', a: 'It can, but most teams start with approval-gated drafts and scheduled posts so captions and visuals are reviewed before publishing.' },
      { q: 'Can it learn what content works?', a: 'Yes. Saves, shares, comments, completion, profile clicks, and replies can be summarized into the knowledgebase for future creative.' }
    ]
  },
  {
    slug: 'support-triage',
    c: 'Support',
    t: 'Support triage automation',
    d: 'Classifies tickets, pulls customer context, drafts replies, and escalates risk.',
    pill: 'realtime',
    color: 'var(--success)',
    palette: ['var(--success)', 'var(--cyan)', 'var(--amber)', 'var(--violet)', 'var(--pink)', 'var(--lime)'],
    animation: 'support',
    hero: 'Triage support tickets with customer context before the queue gets noisy.',
    intro: 'Runloop can use Zendesk, Intercom, CRM MCPs, internal docs, reusable support skills, and your knowledgebase to classify issues, retrieve context, draft replies, and escalate risk.',
    problemHeading: 'The bottleneck is not receiving tickets. It is turning each one into the right next action fast.',
    problemIntro: 'Support automation needs account context, product state, approved knowledge, severity rules, escalation paths, and human approval for risky responses.',
    painPoints: [
      { t: 'Tickets arrive without enough context', d: 'Agents often need to check CRM, subscription, incidents, past conversations, feature flags, and account history before replying.' },
      { t: 'Urgency and risk are hard to spot at scale', d: 'Churn risk, security issues, billing escalations, outages, VIP customers, and compliance-sensitive requests need different handling.' },
      { t: 'Knowledge is scattered across tools', d: 'Internal docs, help-center articles, runbooks, past fixes, and product notes need to be retrieved and cited before drafting a response.' },
      { t: 'Resolved tickets rarely improve the system', d: 'The workflow can store final resolutions, missing docs, bad classifications, and new macros so future triage improves.' }
    ],
    proof: [
      { k: 'channels', v: 'Zendesk, Intercom, email, chat, Slack, forms' },
      { k: 'context', v: 'CRM, subscription, incidents, usage, account history' },
      { k: 'skills', v: 'classification, retrieval, reply drafting, escalation' },
      { k: 'learning', v: 'resolution memory, macro gaps, routing accuracy' }
    ],
    outcomes: ['Classify category, severity, sentiment, churn risk, and required owner', 'Pull account, subscription, incident, usage, and prior conversation context', 'Draft support replies using approved knowledge and citations', 'Escalate outage, security, billing, enterprise, or retention risks'],
    steps: ['Watch new tickets, chats, emails, forms, and Slack escalations', 'Fetch customer, account, subscription, product, and incident context', 'Classify category, severity, sentiment, urgency, and risk policy', 'Retrieve relevant docs, macros, runbooks, and past resolutions', 'Draft a response, route to owner, or escalate to the right queue'],
    stack: ['Zendesk', 'Intercom', 'CRM', 'Internal wiki', 'Incident tools', 'OpenAI / Anthropic'],
    skills: [
      { t: 'Ticket classification', d: 'Classify product area, category, urgency, sentiment, severity, SLA, customer tier, and required owner.', tags: ['category', 'severity', 'routing'] },
      { t: 'Customer context retrieval', d: 'Pull CRM, subscription, entitlement, usage, incident, feature flag, and prior conversation context before drafting.', tags: ['CRM', 'account', 'history'] },
      { t: 'Knowledge-grounded replies', d: 'Draft responses from approved docs, macros, runbooks, and past resolutions with citations and confidence.', tags: ['docs', 'macros', 'citations'] },
      { t: 'Risk escalation', d: 'Detect security, billing, outage, legal, churn, VIP, or data-sensitive issues and route them to the correct escalation path.', tags: ['risk', 'SLA', 'escalation'] }
    ],
    planDetails: [
      'Connect ticket and chat sources such as Zendesk, Intercom, Freshdesk, Help Scout, Gmail, Slack, forms, or custom support queues.',
      'Fetch context from CRM, billing, subscription, product analytics, incident status, feature flags, entitlement systems, and past conversations.',
      'Normalize each case into structured fields: customer, account, plan, category, product area, sentiment, urgency, SLA, owner, and risk flags.',
      'Retrieve relevant help-center articles, internal docs, runbooks, macros, known issues, release notes, and prior resolutions from the knowledgebase.',
      'Classify whether the case can receive a drafted response, needs human review, requires escalation, or should be linked to an incident.',
      'Draft responses with cited knowledge, missing-information questions, next steps, tone rules, and confidence level.',
      'Route high-risk cases to security, billing, engineering, customer success, incident response, or leadership queues.',
      'Store final resolution, human corrections, missing docs, macro gaps, routing mistakes, and customer outcome for future improvement.'
    ],
    mcps: [
      { t: 'Zendesk / Intercom MCP', d: 'Tickets, chats, users, conversations, tags, assignments, macros, SLAs, internal notes, and status updates.' },
      { t: 'CRM and billing MCPs', d: 'Customer tier, owner, subscription, renewal date, invoices, entitlement, revenue impact, and churn-risk context.' },
      { t: 'Product telemetry MCP', d: 'Usage events, errors, feature flags, recent activity, account state, and product-specific debugging context.' },
      { t: 'Knowledgebase MCP', d: 'Help-center docs, internal wiki, runbooks, release notes, known issues, macros, and prior resolved cases.' },
      { t: 'Incident / engineering MCP', d: 'Statuspage, PagerDuty, Linear, Jira, GitHub, logs, bug reports, and escalation queues for product issues.' },
      { t: 'Slack / Teams MCP', d: 'Escalation threads, approval queues, specialist review, daily support summaries, and handoff notes.' }
    ],
    knowledgebase: [
      { t: 'Support taxonomy', d: 'Categories, product areas, severity definitions, SLA rules, customer tiers, routing owners, and escalation paths.' },
      { t: 'Approved knowledge', d: 'Help articles, internal docs, macros, runbooks, known issues, release notes, and source links for reply drafting.' },
      { t: 'Risk policy', d: 'Security, billing, legal, medical/regulated, data privacy, outage, enterprise, and retention cases that need human review.' },
      { t: 'Tone and response rules', d: 'Brand voice, empathy level, forbidden claims, refund wording, compliance language, and required disclaimers.' },
      { t: 'Customer context map', d: 'CRM fields, plan fields, entitlement rules, owner mapping, renewal status, usage signals, and account health indicators.' },
      { t: 'Resolution memory', d: 'Final fixes, corrected classifications, missing docs, new macros, repeated issues, and whether a reply solved the case.' }
    ],
    evals: ['classification accuracy', 'first response time', 'escalation precision', 'reply acceptance rate', 'SLA risk caught', 'macro gap closure'],
    customizable: ['support channels', 'Zendesk / Intercom', 'CRM schema', 'billing system', 'knowledgebase', 'support skills', 'risk policy', 'routing rules', 'approval gates', 'reply tone'],
    customWorkflowExample: 'Bring support macros, help-center docs, escalation policy, CRM fields, support taxonomy, incident process, or manual triage checklist. The workflow can be rebuilt around it and improved over repeated runs.',
    faqs: [
      { q: 'Can it draft replies without sending them?', a: 'Yes. Most teams start with draft-only replies and internal notes, then add approval-gated sending for trusted categories.' },
      { q: 'Can it use customer/account context?', a: 'Yes. It can pull CRM, subscription, billing, usage, entitlement, and prior conversation context before classifying or drafting.' },
      { q: 'Can it escalate risky tickets?', a: 'Yes. Security, billing, outage, enterprise, churn, legal, or sensitive cases can be routed to the correct human queue.' },
      { q: 'Can it improve the knowledgebase?', a: 'Yes. Missing docs, corrected replies, repeated issues, and new macros can be stored so future triage improves.' }
    ]
  },
  {
    slug: 'trading-research',
    c: 'Research',
    t: 'Trading research automation',
    d: 'Monitors markets, news, filings, watchlists, and risk signals to prepare human-reviewed research briefs.',
    pill: 'scheduled',
    color: 'var(--violet)',
    palette: ['var(--violet)', 'var(--cyan)', 'var(--amber)', 'var(--lime)', 'var(--pink)', 'var(--success)'],
    animation: 'trading-research',
    hero: 'Build a market research automation, not a blind trading bot.',
    intro: 'Runloop can use market data MCPs, news, filings, watchlists, portfolio notes, reusable research skills, and your knowledgebase to create risk-aware alerts and human-reviewed briefs.',
    problemHeading: 'The bottleneck is not market data. It is turning noisy signals into a disciplined research workflow.',
    problemIntro: 'Trading research automation needs source policy, watchlist context, risk limits, evidence, uncertainty scoring, and human review before any decision is made.',
    painPoints: [
      { t: 'Signals are scattered across too many sources', d: 'Prices, filings, earnings, analyst notes, macro events, news, social chatter, and portfolio notes rarely arrive in one structured view.' },
      { t: 'Fast alerts can lack context', d: 'A price move matters differently if it follows earnings, guidance, liquidity, sector news, position exposure, or a known catalyst.' },
      { t: 'Research process is hard to repeat', d: 'The workflow can encode source rules, risk rubrics, watchlist logic, and briefing formats so each run is consistent.' },
      { t: 'Decisions need uncertainty and audit trail', d: 'The automation can cite sources, score confidence, flag missing evidence, and preserve a decision log for later review.' }
    ],
    proof: [
      { k: 'sources', v: 'market data, filings, news, macro, notes, watchlists' },
      { k: 'skills', v: 'catalyst scan, risk summary, thesis check, brief writing' },
      { k: 'MCPs', v: 'market APIs, news, SEC/filings, sheets, Slack' },
      { k: 'review', v: 'human-approved alerts and briefs, no blind execution' }
    ],
    outcomes: ['Track watchlists, price moves, catalysts, and volatility changes', 'Summarize news, filings, earnings, macro events, and thesis updates', 'Score signal strength, evidence quality, uncertainty, and portfolio risk', 'Produce pre-market, post-market, or event-driven briefs for human review'],
    steps: ['Read watchlists, portfolios, source policy, and risk rules', 'Collect market data, filings, news, events, and notes from approved sources', 'Cluster signals by ticker, sector, catalyst, uncertainty, and portfolio exposure', 'Generate a risk-aware brief with citations, confidence, and open questions', 'Send alerts or summaries to Slack, email, docs, or review queues'],
    stack: ['Market data API', 'News API', 'SEC / filings', 'Sheets', 'Slack', 'OpenAI / Kimi'],
    skills: [
      { t: 'Watchlist monitoring', d: 'Track price moves, volume, volatility, sector moves, earnings dates, filings, and event calendars for approved watchlists.', tags: ['watchlist', 'prices', 'events'] },
      { t: 'Catalyst and news synthesis', d: 'Summarize filings, earnings, guidance, macro events, company news, analyst notes, and source reliability into concise evidence packs.', tags: ['filings', 'news', 'catalysts'] },
      { t: 'Risk-aware brief writing', d: 'Write pre-market, post-market, or event-driven briefs with thesis impact, uncertainty, exposure, downside risks, and questions for review.', tags: ['risk', 'briefs', 'uncertainty'] },
      { t: 'Research memory', d: 'Compare new signals against thesis notes, prior briefs, watchlist rules, historical reactions, and human feedback.', tags: ['thesis', 'memory', 'feedback'] }
    ],
    planDetails: [
      'Connect approved sources: market data APIs, news feeds, SEC/filings, earnings calendars, macro calendars, spreadsheets, portfolio notes, and internal research docs.',
      'Normalize symbols, sectors, regions, asset classes, positions, watchlist groups, source credibility, timestamps, and event types.',
      'Monitor scheduled windows such as pre-market, intraday checkpoints, post-market, earnings week, macro releases, or custom watchlist events.',
      'Detect signals: abnormal price or volume moves, volatility changes, filings, guidance changes, estimate revisions, sector sympathy, and macro-sensitive moves.',
      'Attach context from the knowledgebase: thesis notes, risk limits, source policy, excluded sources, position exposure, prior decisions, and open questions.',
      'Score each signal by relevance, confidence, uncertainty, source quality, time sensitivity, and potential portfolio impact.',
      'Generate briefs with citations, evidence, risk notes, counterpoints, and explicit human-review next steps.',
      'Route alerts, briefs, and watchlist updates to Slack, email, docs, Notion, Sheets, or a review queue, then log feedback for future runs.'
    ],
    mcps: [
      { t: 'Market data MCP/API', d: 'Prices, volume, volatility, options signals, fundamentals, sectors, earnings calendars, and watchlist data from approved providers.' },
      { t: 'News and filings MCP', d: 'SEC filings, earnings releases, transcripts, company news, macro calendars, analyst notes, and source-cited summaries.' },
      { t: 'Portfolio / Sheets MCP', d: 'Watchlists, position notes, exposure, thesis fields, target review dates, risk limits, and historical decisions.' },
      { t: 'Web search + browser', d: 'Source verification, company pages, investor relations, press releases, central bank calendars, and timely research context.' },
      { t: 'Slack / Email / Docs', d: 'Human-reviewed alerts, pre-market briefs, post-market summaries, questions, approvals, and team feedback loops.' },
      { t: 'Analytics store', d: 'Signal history, brief quality, source performance, alert precision, human feedback, and later outcome review.' }
    ],
    knowledgebase: [
      { t: 'Source policy', d: 'Approved providers, blocked sources, recency rules, citation requirements, confidence rules, and source reliability notes.' },
      { t: 'Watchlist rules', d: 'Tickers, sectors, themes, thresholds, event types, priority names, excluded assets, and review cadence.' },
      { t: 'Thesis library', d: 'Current thesis, key drivers, downside risks, open questions, prior decisions, earnings notes, and links to supporting research.' },
      { t: 'Risk rubric', d: 'Position exposure, liquidity, volatility, event risk, correlation, macro sensitivity, and when human review is mandatory.' },
      { t: 'Brief format', d: 'Pre-market, post-market, event alert, earnings summary, source citations, uncertainty statement, and action-free review language.' },
      { t: 'Decision log', d: 'What was flagged, why it mattered, human feedback, later outcome, source quality, and whether future alert rules should change.' }
    ],
    evals: ['alert precision', 'source coverage', 'brief usefulness', 'citation completeness', 'false alarm rate', 'review response time'],
    customizable: ['asset universe', 'watchlists', 'market data MCPs', 'news sources', 'filing sources', 'risk rubric', 'brief format', 'alert thresholds', 'review channel', 'schedule'],
    customWorkflowExample: 'Bring a watchlist, portfolio notes, research checklist, market data provider, Slack alert process, source policy, or analyst briefing format. The workflow can be rebuilt around it and improved over repeated runs.',
    faqs: [
      { q: 'Does this execute trades?', a: 'No. This page is positioned for research, alerts, and human-reviewed briefs. It is designed to support review, not blindly execute trades.' },
      { q: 'Can it use our own watchlists and source policy?', a: 'Yes. Watchlists, source rules, citation requirements, risk rubrics, and excluded sources can live in the knowledgebase.' },
      { q: 'Can it run pre-market and post-market?', a: 'Yes. It can run on schedules such as pre-market, intraday, post-market, earnings windows, macro events, or custom watchlist triggers.' },
      { q: 'Can it learn which alerts are useful?', a: 'Yes. Human feedback and later outcomes can be stored to improve thresholds, source weighting, and brief quality over time.' }
    ]
  },
  {
    slug: 'aeo-agent',
    c: 'Marketing',
    t: 'AEO visibility automation',
    d: 'Tracks AI answer visibility, competitor citations, content gaps, and citation-ready page updates.',
    pill: 'weekly',
    color: 'var(--cyan)',
    palette: ['var(--cyan)', 'var(--violet)', 'var(--amber)', 'var(--lime)', 'var(--pink)', 'var(--success)'],
    animation: 'aeo',
    hero: 'Track and improve how AI engines answer your category questions.',
    intro: 'Runloop can use search APIs, browser tools, LLM providers, CMS MCPs, reusable AEO skills, and your knowledgebase to monitor prompts, compare citations, find gaps, and draft answer-ready updates.',
    problemHeading: 'The bottleneck is not publishing more pages. It is becoming the source AI answers trust.',
    problemIntro: 'AEO needs repeatable prompt sets, answer comparisons, citation analysis, proof quality, entity clarity, schema, and content updates that can be measured over time.',
    painPoints: [
      { t: 'AI answers cite competitors instead of you', d: 'You may rank in search but still be absent when ChatGPT, Perplexity, Gemini, Claude, or AI search summaries answer buyer questions.' },
      { t: 'Content gaps are hard to see manually', d: 'Answer engines expose missing proof, weak definitions, unclear comparisons, stale FAQs, and citation gaps across many prompt variants.' },
      { t: 'Teams do not know which pages to update', d: 'The workflow can map prompts to source pages, competitor citations, claims, schema gaps, and recommended page changes.' },
      { t: 'Visibility needs measurement over time', d: 'Recurring runs can track share of answer, cited sources, brand mentions, sentiment, and whether updates improved answer inclusion.' }
    ],
    proof: [
      { k: 'engines', v: 'ChatGPT, Perplexity, Gemini, Claude, AI search' },
      { k: 'analysis', v: 'citations, competitors, claims, pages, prompts' },
      { k: 'skills', v: 'FAQ briefs, schema, comparison pages, proof gaps' },
      { k: 'publishing', v: 'CMS drafts, docs PRs, approval workflows' }
    ],
    outcomes: ['Track brand mentions and citations across answer engines', 'Compare competitor visibility, cited pages, claims, and terminology', 'Find FAQ, schema, proof, and page gaps that block citation', 'Create citation-ready content briefs, CMS drafts, or docs updates'],
    steps: ['Run target prompts across configured answer engines and search APIs', 'Capture answers, cited URLs, competitors, claims, and missing entities', 'Score answer quality, brand presence, citation strength, and proof gaps', 'Draft FAQ, schema, comparison, docs, and landing-page updates', 'Publish through approval workflows and track visibility over time'],
    stack: ['Search APIs', 'Browser', 'CMS', 'Docs', 'OpenRouter', 'OpenAI / Anthropic'],
    skills: [
      { t: 'Prompt set monitoring', d: 'Run recurring buyer, comparison, problem, alternative, and category prompts across answer engines and search surfaces.', tags: ['prompts', 'visibility', 'engines'] },
      { t: 'Citation gap analysis', d: 'Compare who gets cited, which pages are used, which claims are repeated, and where your site lacks proof or clarity.', tags: ['citations', 'competitors', 'proof'] },
      { t: 'Answer-ready content drafting', d: 'Draft FAQs, schema, comparison sections, glossary updates, source-backed claims, and page briefs designed for citation.', tags: ['FAQ', 'schema', 'briefs'] },
      { t: 'Visibility reporting', d: 'Summarize share of answer, cited URLs, sentiment, missing entities, competitor movement, and impact from published updates.', tags: ['metrics', 'reports', 'learning'] }
    ],
    planDetails: [
      'Define prompt groups: buyer questions, alternatives, category definitions, comparison prompts, integration questions, pricing questions, and pain-point prompts.',
      'Run prompts across configured engines such as ChatGPT, Perplexity, Gemini, Claude, AI search surfaces, or provider APIs through OpenRouter or direct APIs.',
      'Capture answers, cited URLs, competitor names, brand mentions, source snippets, claims, sentiment, and missing terminology.',
      'Map citations and missing claims back to your docs, landing pages, blog posts, glossary, comparison pages, pricing pages, and support content.',
      'Score each prompt for brand presence, citation quality, answer accuracy, competitor dominance, entity clarity, and content gap severity.',
      'Draft content updates: FAQs, schema markup, comparison tables, citation-ready paragraphs, proof blocks, screenshots, and source-backed definitions.',
      'Route recommendations into CMS drafts, docs PRs, Notion tasks, Linear/Jira tickets, or Slack approval queues.',
      'Track visibility over time to see which updates improved citations, answer share, sentiment, and prompt coverage.'
    ],
    mcps: [
      { t: 'Answer engine / LLM APIs', d: 'OpenRouter, OpenAI, Anthropic, Gemini, Perplexity, or approved providers for recurring prompt runs and answer comparisons.' },
      { t: 'Search + browser tools', d: 'Search result checks, cited page inspection, competitor page review, schema inspection, source validation, and screenshot evidence.' },
      { t: 'CMS MCP', d: 'Webflow, WordPress, Contentful, Sanity, custom CMS, or docs systems for drafts, page updates, metadata, and publish workflows.' },
      { t: 'Docs / GitHub MCP', d: 'Docs PRs, changelog updates, comparison pages, markdown edits, issue tracking, and source-of-truth version control.' },
      { t: 'Analytics MCP', d: 'Search Console, GA, product analytics, rank tracking, click data, and prompt visibility history for before/after measurement.' },
      { t: 'Slack / Linear / Jira', d: 'Approval queues, content tasks, owner routing, editorial reviews, and recurring AEO visibility reports.' }
    ],
    knowledgebase: [
      { t: 'Prompt library', d: 'Target prompts, variants, audience stage, category, buyer intent, priority, engine coverage, and run cadence.' },
      { t: 'Entity and terminology map', d: 'Brand names, product names, integrations, competitors, categories, use cases, approved definitions, and disallowed claims.' },
      { t: 'Citation rules', d: 'What makes a page citation-ready: source-backed claims, examples, schema, dates, authoritativeness, clarity, and internal links.' },
      { t: 'Competitor index', d: 'Commonly cited competitors, cited pages, repeated claims, positioning, proof points, and gaps where your content can win.' },
      { t: 'Content playbook', d: 'FAQ structure, comparison format, glossary style, schema rules, proof blocks, source requirements, and editorial voice.' },
      { t: 'Visibility log', d: 'Prompt results, cited sources, brand presence, sentiment, published changes, and whether visibility improved after updates.' }
    ],
    evals: ['brand mention rate', 'citation share', 'answer accuracy', 'competitor displacement', 'content gap closure', 'visibility lift'],
    customizable: ['prompt library', 'answer engines', 'search APIs', 'CMS', 'docs repo', 'competitor set', 'AEO skills', 'knowledgebase rules', 'approval workflow', 'report cadence'],
    customWorkflowExample: 'Bring your target prompts, competitor list, docs, CMS, glossary, Search Console data, editorial rules, or manual AEO checklist. The workflow can be rebuilt around it and improved over repeated runs.',
    faqs: [
      { q: 'Which answer engines can it track?', a: 'It can track configured engines and providers such as ChatGPT, Perplexity, Gemini, Claude, AI search surfaces, OpenRouter, or direct APIs where available.' },
      { q: 'Can it update our CMS automatically?', a: 'It can draft updates and route them for approval. Publishing can stay manual, approval-gated, or automated depending on your CMS policy.' },
      { q: 'Can it compare competitors?', a: 'Yes. The workflow can track which competitors are mentioned, cited, and trusted for each prompt group, then identify content gaps.' },
      { q: 'Can it measure whether AEO changes worked?', a: 'Yes. Prompt results, citation share, brand mentions, and published content changes are logged so visibility can be measured over time.' }
    ]
  },
];

window.RUNLOOP_TEMPLATES = RUNLOOP_TEMPLATES;
function automationHref(slug) {
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '';
  return isLocal ? `template.html?slug=${slug}` : `/automations/${slug}/`;
}
window.automationHref = automationHref;
function pageHref(page) {
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '';
  if (page === 'home') return isLocal ? 'index.html' : '/';
  if (page === 'how') return isLocal ? 'how.html' : '/how/';
  return page;
}
window.pageHref = pageHref;

/* ========== SECTION: AUTOMATION GALLERY ========== */
function Templates() {
  const tpls = RUNLOOP_TEMPLATES;
  return h('section', { id: 'templates', className: 'section' },
    h('div', { className: 'shell' },
      h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Automations'),
          h('h2', { className: 'h2' },
            'Focused automation use cases. ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'Each one stands on its own.')
          )
        ),
        h('a', { className: 'btn ghost', href: automationHref('lead-enrichment') }, 'Explore automations', h('span', { className: 'arrow' }, '→'))
      ),
      h('div', { className: 'grid cols-3' },
        tpls.map((t, i) =>
          h('a', { key: t.slug, href: automationHref(t.slug), className: 'card template-card', style: { padding: 24, cursor: 'pointer', display: 'block' } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 } },
              h('span', { className: 'mono', style: { fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.08em', textTransform: 'uppercase' } }, t.c),
              h('span', { className: 'tag' }, h('span', { className: 'dot', style: { background: t.color } }), t.pill)
            ),
            h('h3', { className: 'h3', style: { margin: '0 0 8px' } }, t.t),
            h('p', { className: 'body', style: { margin: '0 0 20px' } }, t.d),
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
              h('div', { style: { display: 'flex', gap: 6 } },
                [0, 1, 2].map((_, j) =>
                  h('span', { key: j, style: { width: 24, height: 24, borderRadius: 6, background: 'var(--bg-3)', border: '1px solid var(--line)', display: 'inline-block' } })
                )
              ),
              h('span', { className: 'mono', style: { fontSize: 12, color: t.color } }, 'Open →')
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
  const groups = [
    {
      title: 'Coding CLIs',
      note: 'terminal-native agents for repo work',
      items: [
        { name: 'Claude Code', use: 'deep refactors', color: 'var(--violet)' },
        { name: 'Codex CLI', use: 'patches + tests', color: 'var(--lime)' },
        { name: 'Gemini CLI', use: 'analysis + review', color: 'var(--cyan)' },
        { name: 'Kimi', use: 'long context', color: 'var(--amber)' },
        { name: 'GLM', use: 'second opinion', color: 'var(--pink)' },
        { name: 'MiniMax', use: 'batch checks', color: 'var(--success)' },
      ]
    },
    {
      title: 'API providers',
      note: 'normal model APIs inside the same automation',
      items: [
        { name: 'OpenAI', use: 'structured outputs', color: 'var(--cyan)' },
        { name: 'Anthropic', use: 'reasoning steps', color: 'var(--violet)' },
        { name: 'OpenRouter', use: 'model gateway', color: 'var(--lime)' },
        { name: 'Compatible APIs', use: 'local or hosted', color: 'var(--fg-3)' },
      ]
    },
  ];
  const route = [
    { step: 'Plan', model: 'gemini-cli', note: 'read context and propose paths' },
    { step: 'Patch', model: 'codex-cli', note: 'edit files and run local checks' },
    { step: 'Refactor', model: 'claude-code', note: 'handle wide changes safely' },
    { step: 'Verify', model: 'kimi + glm', note: 'parallel review and cheap retries' },
    { step: 'Call APIs', model: 'api providers', note: 'OpenAI, Anthropic, OpenRouter, and compatible APIs' },
  ];

  return h('section', { className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { className: 'model-pool-layout', style: { display: 'grid', gap: 48, alignItems: 'start' } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Models + APIs'),
          h('h2', { className: 'h2', style: { margin: '0 0 18px', maxWidth: 520 } },
            'Use the right coding model or API ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'for each business step.')
          ),
          h('p', { className: 'body', style: { margin: '0 0 28px', maxWidth: 520 } },
            'Runloop can route work across coding CLIs, Kimi, GLM, MiniMax, normal APIs like OpenAI and Anthropic, OpenRouter, plus any compatible provider you add. The automation keeps the plan, evidence, evals, and final decision in one loop.'
          ),
          h('div', { className: 'card model-route-card', style: { padding: 22 } },
            h('div', { className: 'mono', style: { fontSize: 12, color: 'var(--fg-3)', marginBottom: 18 } }, 'routing_policy.yml'),
            route.map((r, i) =>
              h('div', { key: r.step, className: 'model-route-row', style: {
                display: 'grid',
                gap: 14,
                padding: '14px 0',
                borderTop: i ? '1px solid var(--line)' : 'none',
                alignItems: 'center'
              } },
                h('div', null,
                  h('div', { style: { fontSize: 15, fontWeight: 600 } }, r.step),
                  h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)', marginTop: 4 } }, r.note)
                ),
                h('span', { className: 'tag', style: { justifySelf: 'end' } }, h('span', { className: 'dot' }), r.model)
              )
            )
          )
        ),
        h('div', { className: 'card provider-panel', style: { padding: 22 } },
          h('div', { className: 'provider-panel-head', style: { display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'flex-start', marginBottom: 20 } },
            h('div', null,
              h('div', { className: 'mono', style: { fontSize: 12, color: 'var(--fg-3)', marginBottom: 8 } }, 'provider_pool'),
              h('h3', { style: { fontSize: 28, lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.03em', margin: 0 } }, 'One pool. Many runners.')
            ),
            h('span', { className: 'tag lime' }, h('span', { className: 'dot' }), 'hot-swap')
          ),
          h('div', { className: 'provider-groups', style: { display: 'grid', gap: 18 } },
            groups.map((group) =>
              h('div', { key: group.title, className: 'provider-group' },
                h('div', { className: 'provider-group-head', style: { display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', paddingBottom: 10, borderBottom: '1px solid var(--line)' } },
                  h('div', { style: { fontSize: 15, fontWeight: 700 } }, group.title),
                  h('div', { className: 'mono', style: { fontSize: 10, color: 'var(--fg-4)' } }, group.note)
                ),
                h('div', { className: 'provider-rows' },
                  group.items.map((item) =>
                    h('div', { key: item.name, className: 'provider-row', style: {
                      display: 'grid',
                      gap: 12,
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)'
                    } },
                      h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 } },
                        h('span', { style: {
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: item.color,
                          boxShadow: `0 0 14px ${item.color}`,
                          flexShrink: 0
                        } }),
                        h('span', { style: { fontSize: 14, fontWeight: 600 } }, item.name)
                      ),
                      h('span', { className: 'mono', style: { justifySelf: 'end', fontSize: 11, color: 'var(--fg-3)' } }, item.use)
                    )
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
            'Build one automation. ',
            h('span', { style: { background: 'linear-gradient(90deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'Improve every run.')
          ),
          h('p', { className: 'lead', style: { maxWidth: 560, margin: '0 auto 36px' } },
            'Bring one business outcome: faster support, safer releases, cleaner leads, lower cloud spend, or consistent content. We will map the automation, connect tools, define evals, and show how it improves over repeated runs.'
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
  const footerTemplates = RUNLOOP_TEMPLATES || [];

  return h('footer', { className: 'footer' },
    h('div', { className: 'shell' },
      h('div', { className: 'footer-grid' },
        h('div', { className: 'footer-col' },
          h(Logo, { name }),
          h('p', { style: { fontSize: 14, color: 'var(--fg-3)', margin: '16px 0 0', maxWidth: 280 } },
            'The open-source platform for automations that improve with every run.')
        ),
        h('div', { className: 'footer-col' },
          h('h5', null, 'Product'),
          h('a', { href: pageHref('home') }, 'Home'),
          h('a', { href: pageHref('how') }, 'How it works')
        ),
        h('div', { className: 'footer-col footer-templates' },
          h('h5', null, 'Automations'),
          footerTemplates.map(t =>
            h('a', { key: t.slug, href: automationHref(t.slug) }, t.t)
          )
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

Object.assign(window, { WhatImproves, Integrations, AutomationAnatomy, HowItLearns, Templates, Employees, Metrics, Logos, Testimonials, CTA, Footer });
