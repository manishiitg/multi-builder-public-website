function templateAccent(template, index) {
  const palette = template.palette || [template.color];
  return palette[index % palette.length] || template.color;
}

function TemplateHeroVisual({ template, lifecycle }) {
  if (template.animation === 'company-setup') {
    const rows = [
      { name: 'company / runloop workspace', meta: 'policies + tools + shared KB', state: 'pass', label: 'setup' },
      { name: 'employee / sales ops', meta: 'CRM + enrichment + email review', state: 'run', label: '4 automations' },
      { name: 'employee / support ops', meta: 'helpdesk + docs + escalation', state: 'warn', label: '6 automations' },
      { name: 'employee / engineering QA', meta: 'GitHub + browser + CI scheduler', state: 'pass', label: '5 automations' },
    ];

    return h('div', { className: 'qa-hero-animation company-hero-animation' },
      h('div', { className: 'qa-hero-top' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          h('span', { className: 'qa-window-dot red' }),
          h('span', { className: 'qa-window-dot amber' }),
          h('span', { className: 'qa-window-dot green' }),
          h('span', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11, marginLeft: 8 } }, 'company :: employees :: automations')
        ),
        h('span', { className: 'qa-live-pill' },
          h('span', { className: 'qa-live-dot' }),
          'building org'
        )
      ),
      h('div', { className: 'qa-pipeline' },
        h('div', { className: 'qa-flow-line' }),
        ['company', 'employees', 'workflows', 'improve'].map((node, i) =>
          h('div', { key: node, className: `qa-node qa-node-${i + 1}` },
            h('span', { className: 'qa-node-pulse' }),
            h('span', { className: 'mono' }, node)
          )
        )
      ),
      h('div', { className: 'qa-console' },
        rows.map(row =>
          h('div', { key: row.name, className: `qa-test-row ${row.state}` },
            h('div', null,
              h('div', { style: { fontWeight: 650 } }, row.name),
              h('div', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11 } }, row.meta)
            ),
            h('span', { className: 'qa-status mono' }, row.label)
          )
        )
      ),
      h('div', { className: 'qa-evidence-grid' },
        h('div', null,
          h('div', { className: 'eyebrow' }, '// Company system'),
          h('div', { className: 'qa-evidence-tags' },
            ['MCPs', 'skills', 'knowledgebase', 'evals'].map((item, i) =>
              h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
            )
          )
        ),
        h('div', { className: 'qa-memory-card' },
          h('div', { className: 'mono', style: { color: templateAccent(template, 1), fontSize: 11 } }, 'workspace'),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'employees'), h('strong', null, '8')),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'automations'), h('strong', null, '23'))
        )
      )
    );
  }

  if (template.animation === 'support') {
    const rows = [
      { name: 'ticket / login loop', meta: 'enterprise account + SLA', state: 'run', label: 'triage' },
      { name: 'chat / billing issue', meta: 'invoice + renewal context', state: 'warn', label: 'review' },
      { name: 'incident / api errors', meta: 'statuspage + logs', state: 'fail', label: 'escalate' },
      { name: 'reply / password reset', meta: 'approved macro + docs', state: 'pass', label: 'drafted' },
    ];

    return h('div', { className: 'qa-hero-animation support-hero-animation' },
      h('div', { className: 'qa-hero-top' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          h('span', { className: 'qa-window-dot red' }),
          h('span', { className: 'qa-window-dot amber' }),
          h('span', { className: 'qa-window-dot green' }),
          h('span', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11, marginLeft: 8 } }, `automation :: ${template.slug}`)
        ),
        h('span', { className: 'qa-live-pill' },
          h('span', { className: 'qa-live-dot' }),
          'triaging'
        )
      ),
      h('div', { className: 'qa-pipeline' },
        h('div', { className: 'qa-flow-line' }),
        ['intake', 'context', 'classify', 'respond'].map((node, i) =>
          h('div', { key: node, className: `qa-node qa-node-${i + 1}` },
            h('span', { className: 'qa-node-pulse' }),
            h('span', { className: 'mono' }, node)
          )
        )
      ),
      h('div', { className: 'qa-console' },
        rows.map(row =>
          h('div', { key: row.name, className: `qa-test-row ${row.state}` },
            h('div', null,
              h('div', { style: { fontWeight: 650 } }, row.name),
              h('div', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11 } }, row.meta)
            ),
            h('span', { className: 'qa-status mono' }, row.label)
          )
        )
      ),
      h('div', { className: 'qa-evidence-grid' },
        h('div', null,
          h('div', { className: 'eyebrow' }, '// Support system'),
          h('div', { className: 'qa-evidence-tags' },
            ['Zendesk', 'CRM', 'docs', 'Slack'].map((item, i) =>
              h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
            )
          )
        ),
        h('div', { className: 'qa-memory-card' },
          h('div', { className: 'mono', style: { color: templateAccent(template, 1), fontSize: 11 } }, 'queue'),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'risk'), h('strong', null, '3')),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'SLA'), h('strong', null, '94%'))
        )
      )
    );
  }

  if (template.animation === 'instagram') {
    const rows = [
      { name: 'carousel / launch tip', meta: 'slide outline + visual notes', state: 'pass', label: 'outlined' },
      { name: 'reel / customer proof', meta: 'hook + shot list + b-roll', state: 'run', label: 'scripted' },
      { name: 'asset / thumbnail', meta: 'image prompt + canva brief', state: 'warn', label: 'review' },
      { name: 'calendar / week plan', meta: 'scheduler + approval queue', state: 'pass', label: 'queued' },
    ];

    return h('div', { className: 'qa-hero-animation instagram-hero-animation' },
      h('div', { className: 'qa-hero-top' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          h('span', { className: 'qa-window-dot red' }),
          h('span', { className: 'qa-window-dot amber' }),
          h('span', { className: 'qa-window-dot green' }),
          h('span', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11, marginLeft: 8 } }, `automation :: ${template.slug}`)
        ),
        h('span', { className: 'qa-live-pill' },
          h('span', { className: 'qa-live-dot' }),
          'creative loop'
        )
      ),
      h('div', { className: 'qa-pipeline' },
        h('div', { className: 'qa-flow-line' }),
        ['idea', 'format', 'asset', 'schedule'].map((node, i) =>
          h('div', { key: node, className: `qa-node qa-node-${i + 1}` },
            h('span', { className: 'qa-node-pulse' }),
            h('span', { className: 'mono' }, node)
          )
        )
      ),
      h('div', { className: 'qa-console' },
        rows.map(row =>
          h('div', { key: row.name, className: `qa-test-row ${row.state}` },
            h('div', null,
              h('div', { style: { fontWeight: 650 } }, row.name),
              h('div', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11 } }, row.meta)
            ),
            h('span', { className: 'qa-status mono' }, row.label)
          )
        )
      ),
      h('div', { className: 'qa-evidence-grid' },
        h('div', null,
          h('div', { className: 'eyebrow' }, '// Creative system'),
          h('div', { className: 'qa-evidence-tags' },
            ['Instagram', 'Canva', 'Drive', 'image/video'].map((item, i) =>
              h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
            )
          )
        ),
        h('div', { className: 'qa-memory-card' },
          h('div', { className: 'mono', style: { color: templateAccent(template, 1), fontSize: 11 } }, 'signals'),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'saves'), h('strong', null, '18')),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'approval'), h('strong', null, '89%'))
        )
      )
    );
  }

  if (template.animation === 'aeo') {
    const rows = [
      { name: 'prompt / best agent builder', meta: 'perplexity + chatgpt + gemini', state: 'run', label: 'tracked' },
      { name: 'citation / competitor docs', meta: 'missing proof block', state: 'warn', label: 'gap' },
      { name: 'page / comparison faq', meta: 'schema + source links', state: 'pass', label: 'drafted' },
      { name: 'visibility / category', meta: 'share of answer trend', state: 'fail', label: '+18%' },
    ];

    return h('div', { className: 'qa-hero-animation aeo-hero-animation' },
      h('div', { className: 'qa-hero-top' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          h('span', { className: 'qa-window-dot red' }),
          h('span', { className: 'qa-window-dot amber' }),
          h('span', { className: 'qa-window-dot green' }),
          h('span', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11, marginLeft: 8 } }, `automation :: ${template.slug}`)
        ),
        h('span', { className: 'qa-live-pill' },
          h('span', { className: 'qa-live-dot' }),
          'visibility scan'
        )
      ),
      h('div', { className: 'qa-pipeline' },
        h('div', { className: 'qa-flow-line' }),
        ['prompt', 'compare', 'draft', 'measure'].map((node, i) =>
          h('div', { key: node, className: `qa-node qa-node-${i + 1}` },
            h('span', { className: 'qa-node-pulse' }),
            h('span', { className: 'mono' }, node)
          )
        )
      ),
      h('div', { className: 'qa-console' },
        rows.map(row =>
          h('div', { key: row.name, className: `qa-test-row ${row.state}` },
            h('div', null,
              h('div', { style: { fontWeight: 650 } }, row.name),
              h('div', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11 } }, row.meta)
            ),
            h('span', { className: 'qa-status mono' }, row.label)
          )
        )
      ),
      h('div', { className: 'qa-evidence-grid' },
        h('div', null,
          h('div', { className: 'eyebrow' }, '// AEO system'),
          h('div', { className: 'qa-evidence-tags' },
            ['prompts', 'citations', 'schema', 'CMS'].map((item, i) =>
              h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
            )
          )
        ),
        h('div', { className: 'qa-memory-card' },
          h('div', { className: 'mono', style: { color: templateAccent(template, 1), fontSize: 11 } }, 'visibility'),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'mentions'), h('strong', null, '62%')),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'citations'), h('strong', null, '11'))
        )
      )
    );
  }

  if (template.animation === 'trading-research') {
    const rows = [
      { name: 'nvda / earnings window', meta: 'guidance + volume spike', state: 'run', label: 'signal' },
      { name: 'macro / cpi release', meta: 'calendar + sector exposure', state: 'warn', label: 'risk' },
      { name: 'filing / 8-k update', meta: 'source cited summary', state: 'pass', label: 'briefed' },
      { name: 'watchlist / semis', meta: 'sympathy move cluster', state: 'fail', label: 'review' },
    ];

    return h('div', { className: 'qa-hero-animation trading-hero-animation' },
      h('div', { className: 'qa-hero-top' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          h('span', { className: 'qa-window-dot red' }),
          h('span', { className: 'qa-window-dot amber' }),
          h('span', { className: 'qa-window-dot green' }),
          h('span', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11, marginLeft: 8 } }, `automation :: ${template.slug}`)
        ),
        h('span', { className: 'qa-live-pill' },
          h('span', { className: 'qa-live-dot' }),
          'research scan'
        )
      ),
      h('div', { className: 'qa-pipeline' },
        h('div', { className: 'qa-flow-line' }),
        ['watch', 'collect', 'score', 'brief'].map((node, i) =>
          h('div', { key: node, className: `qa-node qa-node-${i + 1}` },
            h('span', { className: 'qa-node-pulse' }),
            h('span', { className: 'mono' }, node)
          )
        )
      ),
      h('div', { className: 'qa-console' },
        rows.map(row =>
          h('div', { key: row.name, className: `qa-test-row ${row.state}` },
            h('div', null,
              h('div', { style: { fontWeight: 650 } }, row.name),
              h('div', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11 } }, row.meta)
            ),
            h('span', { className: 'qa-status mono' }, row.label)
          )
        )
      ),
      h('div', { className: 'qa-evidence-grid' },
        h('div', null,
          h('div', { className: 'eyebrow' }, '// Research inputs'),
          h('div', { className: 'qa-evidence-tags' },
            ['market data', 'news', 'filings', 'watchlist'].map((item, i) =>
              h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
            )
          )
        ),
        h('div', { className: 'qa-memory-card' },
          h('div', { className: 'mono', style: { color: templateAccent(template, 1), fontSize: 11 } }, 'confidence'),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'signals'), h('strong', null, '7')),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'risk'), h('strong', null, 'med'))
        )
      )
    );
  }

  if (template.animation === 'social-x') {
    const rows = [
      { name: 'x / launch thread', meta: 'docs + github release', state: 'pass', label: 'sourced' },
      { name: 'linkedin / founder post', meta: 'brand skill + claim check', state: 'run', label: 'drafted' },
      { name: 'reddit / community reply', meta: 'rules + knowledgebase', state: 'warn', label: 'review' },
      { name: 'instagram / caption', meta: 'scheduler + approval queue', state: 'pass', label: 'queued' },
    ];

    return h('div', { className: 'qa-hero-animation social-hero-animation' },
      h('div', { className: 'qa-hero-top' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          h('span', { className: 'qa-window-dot red' }),
          h('span', { className: 'qa-window-dot amber' }),
          h('span', { className: 'qa-window-dot green' }),
          h('span', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11, marginLeft: 8 } }, `automation :: ${template.slug}`)
        ),
        h('span', { className: 'qa-live-pill' },
          h('span', { className: 'qa-live-dot' }),
          'content loop'
        )
      ),
      h('div', { className: 'qa-pipeline' },
        h('div', { className: 'qa-flow-line' }),
        ['source', 'adapt', 'approve', 'learn'].map((node, i) =>
          h('div', { key: node, className: `qa-node qa-node-${i + 1}` },
            h('span', { className: 'qa-node-pulse' }),
            h('span', { className: 'mono' }, node)
          )
        )
      ),
      h('div', { className: 'qa-console' },
        rows.map(row =>
          h('div', { key: row.name, className: `qa-test-row ${row.state}` },
            h('div', null,
              h('div', { style: { fontWeight: 650 } }, row.name),
              h('div', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11 } }, row.meta)
            ),
            h('span', { className: 'qa-status mono' }, row.label)
          )
        )
      ),
      h('div', { className: 'qa-evidence-grid' },
        h('div', null,
          h('div', { className: 'eyebrow' }, '// Content system'),
          h('div', { className: 'qa-evidence-tags' },
            ['X', 'LinkedIn', 'Reddit', 'Instagram'].map((item, i) =>
              h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
            )
          )
        ),
        h('div', { className: 'qa-memory-card' },
          h('div', { className: 'mono', style: { color: templateAccent(template, 1), fontSize: 11 } }, 'signals'),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'hooks'), h('strong', null, '14')),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'approval'), h('strong', null, '91%'))
        )
      )
    );
  }

  if (template.animation === 'cloud-cost') {
    const rows = [
      { name: 'aws / rds-prod', meta: 'rightsizing candidate + low cpu', state: 'warn', label: '$1.8k/mo' },
      { name: 'gcp / gke-dev', meta: 'idle nodes after 8pm', state: 'pass', label: '$920/mo' },
      { name: 'azure / disks', meta: 'unattached + no owner tag', state: 'fail', label: '$640/mo' },
      { name: 'egress / us-east', meta: 'anomaly vs 14d baseline', state: 'run', label: 'review' },
    ];

    return h('div', { className: 'qa-hero-animation cost-hero-animation' },
      h('div', { className: 'qa-hero-top' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          h('span', { className: 'qa-window-dot red' }),
          h('span', { className: 'qa-window-dot amber' }),
          h('span', { className: 'qa-window-dot green' }),
          h('span', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11, marginLeft: 8 } }, `automation :: ${template.slug}`)
        ),
        h('span', { className: 'qa-live-pill' },
          h('span', { className: 'qa-live-dot' }),
          'daily scan'
        )
      ),
      h('div', { className: 'qa-pipeline' },
        h('div', { className: 'qa-flow-line' }),
        ['ingest', 'normalize', 'detect', 'approve'].map((node, i) =>
          h('div', { key: node, className: `qa-node qa-node-${i + 1}` },
            h('span', { className: 'qa-node-pulse' }),
            h('span', { className: 'mono' }, node)
          )
        )
      ),
      h('div', { className: 'qa-console' },
        rows.map(row =>
          h('div', { key: row.name, className: `qa-test-row ${row.state}` },
            h('div', null,
              h('div', { style: { fontWeight: 650 } }, row.name),
              h('div', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11 } }, row.meta)
            ),
            h('span', { className: 'qa-status mono' }, row.label)
          )
        )
      ),
      h('div', { className: 'qa-evidence-grid' },
        h('div', null,
          h('div', { className: 'eyebrow' }, '// Clouds'),
          h('div', { className: 'qa-evidence-tags' },
            ['AWS', 'GCP', 'Azure', 'Terraform'].map((item, i) =>
              h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
            )
          )
        ),
        h('div', { className: 'qa-memory-card' },
          h('div', { className: 'mono', style: { color: templateAccent(template, 1), fontSize: 11 } }, 'savings'),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'found'), h('strong', null, '$8.2k')),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'risk'), h('strong', null, 'low'))
        )
      )
    );
  }

  if (template.animation === 'lead') {
    const rows = [
      { name: 'form / demo request', meta: 'utm + consent + source', state: 'pass', label: 'captured' },
      { name: 'account / acme.co', meta: 'CRM MCP + enrichment API', state: 'run', label: 'enriched' },
      { name: 'score / enterprise fit', meta: 'ICP skill + knowledgebase', state: 'warn', label: 'review' },
      { name: 'route / named account', meta: 'owner policy + SLA', state: 'pass', label: 'assigned' },
    ];

    return h('div', { className: 'qa-hero-animation lead-hero-animation' },
      h('div', { className: 'qa-hero-top' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          h('span', { className: 'qa-window-dot red' }),
          h('span', { className: 'qa-window-dot amber' }),
          h('span', { className: 'qa-window-dot green' }),
          h('span', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11, marginLeft: 8 } }, `automation :: ${template.slug}`)
        ),
        h('span', { className: 'qa-live-pill' },
          h('span', { className: 'qa-live-dot' }),
          'enriching'
        )
      ),
      h('div', { className: 'qa-pipeline' },
        h('div', { className: 'qa-flow-line' }),
        ['capture', 'enrich', 'score', 'route'].map((node, i) =>
          h('div', { key: node, className: `qa-node qa-node-${i + 1}` },
            h('span', { className: 'qa-node-pulse' }),
            h('span', { className: 'mono' }, node)
          )
        )
      ),
      h('div', { className: 'qa-console' },
        rows.map(row =>
          h('div', { key: row.name, className: `qa-test-row ${row.state}` },
            h('div', null,
              h('div', { style: { fontWeight: 650 } }, row.name),
              h('div', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11 } }, row.meta)
            ),
            h('span', { className: 'qa-status mono' }, row.label)
          )
        )
      ),
      h('div', { className: 'qa-evidence-grid' },
        h('div', null,
          h('div', { className: 'eyebrow' }, '// Inputs'),
          h('div', { className: 'qa-evidence-tags' },
            ['CRM MCP', 'enrichment API', 'sales skills', 'knowledgebase'].map((item, i) =>
              h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
            )
          )
        ),
        h('div', { className: 'qa-memory-card' },
          h('div', { className: 'mono', style: { color: templateAccent(template, 1), fontSize: 11 } }, 'scorecard'),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'fit'), h('strong', null, '0.84')),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'confidence'), h('strong', null, '92%'))
        )
      )
    );
  }

  if (template.animation === 'qa') {
    const rows = [
      { name: 'critical / checkout', meta: 'business rule + payment sandbox', state: 'pass', label: 'covered' },
      { name: 'edge / permissions', meta: 'codex generated assertions', state: 'run', label: 'scheduled' },
      { name: 'browser / onboarding', meta: 'recorded workflow + trace', state: 'warn', label: 'watching' },
      { name: 'api / retries', meta: 'claude code fixture update', state: 'fail', label: 'needs fix' },
    ];

    return h('div', { className: 'qa-hero-animation' },
      h('div', { className: 'qa-hero-top' },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
          h('span', { className: 'qa-window-dot red' }),
          h('span', { className: 'qa-window-dot amber' }),
          h('span', { className: 'qa-window-dot green' }),
          h('span', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11, marginLeft: 8 } }, `automation :: ${template.slug}`)
        ),
        h('span', { className: 'qa-live-pill' },
          h('span', { className: 'qa-live-dot' }),
          'running eval'
        )
      ),
      h('div', { className: 'qa-pipeline' },
        h('div', { className: 'qa-flow-line' }),
        ['map', 'generate', 'record', 'schedule'].map((node, i) =>
          h('div', { key: node, className: `qa-node qa-node-${i + 1}` },
            h('span', { className: 'qa-node-pulse' }),
            h('span', { className: 'mono' }, node)
          )
        )
      ),
      h('div', { className: 'qa-console' },
        rows.map(row =>
          h('div', { key: row.name, className: `qa-test-row ${row.state}` },
            h('div', null,
              h('div', { style: { fontWeight: 650 } }, row.name),
              h('div', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 11 } }, row.meta)
            ),
            h('span', { className: 'qa-status mono' }, row.label)
          )
        )
      ),
      h('div', { className: 'qa-evidence-grid' },
        h('div', null,
          h('div', { className: 'eyebrow' }, '// Evidence'),
          h('div', { className: 'qa-evidence-tags' },
            ['Claude Code', 'Codex', 'Playwright', 'scheduler'].map((item, i) =>
              h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
            )
          )
        ),
        h('div', { className: 'qa-memory-card' },
          h('div', { className: 'mono', style: { color: templateAccent(template, 1), fontSize: 11 } }, 'knowledgebase'),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'critical paths'), h('strong', null, '24')),
          h('div', { className: 'qa-memory-row' }, h('span', null, 'edge cases'), h('strong', null, '0.88'))
        )
      )
    );
  }

  return h('div', { className: 'card template-blueprint', style: { padding: 24 } },
    h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', marginBottom: 20 } },
      h('span', { className: 'mono', style: { color: 'var(--fg-3)', fontSize: 12 } }, `automation :: ${template.slug}`),
      h('span', { className: 'tag', style: { color: template.color } }, h('span', { className: 'dot', style: { background: template.color } }), template.pill)
    ),
    lifecycle.map((row, i) =>
      h('div', { key: row.k, className: 'template-blueprint-row', style: {
        display: 'grid',
        gap: 16,
        padding: '15px 0',
        borderTop: i ? '1px solid var(--line)' : 'none',
        alignItems: 'start'
      } },
        h('div', { className: 'mono', style: { fontSize: 11, color: template.color } }, row.k),
        h('div', { className: 'body', style: { color: 'var(--fg-2)' } }, row.v)
      )
    )
  );
}

function CustomWorkflowSection({ template, customOptions }) {
  return h('section', { className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { className: 'card', style: { padding: 0, overflow: 'hidden' } },
        h('div', { className: 'custom-workflow-grid', style: { display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 0 } },
            h('div', { style: { padding: 30, borderRight: '1px solid var(--line)' } },
            h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Custom workflow automation'),
            h('h2', { className: 'h2', style: { margin: '0 0 18px' } },
              'Start with this automation, ',
              h('span', { style: { color: 'var(--fg-3)' } }, 'or build the workflow around your process.')
            ),
            h('p', { className: 'body', style: { margin: '0 0 22px', color: 'var(--fg-2)' } },
              'This is a deployable use case, not a fixed preset. Runloop can adapt the automation to your exact MCPs, reusable skills, knowledgebase, systems, policies, approval points, evals, and output format.'
            ),
            h('a', { className: 'btn violet', href: 'https://calendly.com/manishiitg/15min', target: '_blank', rel: 'noreferrer' },
              'Design a custom automation',
              h('span', { className: 'arrow' }, '→')
            )
          ),
          h('div', { style: { padding: 30 } },
            h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// What can change'),
            h('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 } },
              customOptions.map((item, i) =>
                h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
              )
            ),
            h('div', { className: 'template-blueprint-row', style: { display: 'grid', gap: 14, paddingTop: 18, borderTop: '1px solid var(--line)' } },
              h('div', { className: 'mono', style: { fontSize: 11, color: templateAccent(template, 2) } }, 'custom'),
              h('div', { className: 'body', style: { color: 'var(--fg-2)' } },
                template.customWorkflowExample || 'Bring an existing SOP, spreadsheet, prompt, CI job, ticket queue, manual checklist, or internal process. The workflow can be rebuilt around it and improved over repeated runs.'
              )
            )
          )
        )
      )
    )
  );
}

function TemplateLanding({ name }) {
  const params = new URLSearchParams(window.location.search);
  const pathMatch = window.location.pathname.match(/\/automations\/([^/]+)\/?$/);
  const slug = (pathMatch && pathMatch[1]) || params.get('slug') || 'lead-enrichment';
  const templates = window.RUNLOOP_TEMPLATES || [];
  const template = templates.find(t => t.slug === slug) || templates[0];

  React.useEffect(() => {
    if (template) {
      const suffix = template.t.toLowerCase().includes('automation') ? '' : ' automation';
      document.title = `${template.t}${suffix} - Runloop`;
      const canonicalUrl = `${window.location.origin}/automations/${template.slug}/`;
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);

      let description = document.querySelector('meta[name="description"]');
      if (!description) {
        description = document.createElement('meta');
        description.setAttribute('name', 'description');
        document.head.appendChild(description);
      }
      description.setAttribute('content', template.intro || template.d || 'Runloop automation landing page.');
    }
  }, [template && template.slug]);

  if (!template) return null;

  const lifecycle = [
    { k: 'Trigger', v: 'Runs on schedule, webhook, commit, ticket, mention, or manual start.' },
    { k: 'Analyze', v: 'Collects context from tools, APIs, docs, prior runs, and human notes.' },
    { k: 'Decide', v: 'Routes to the right model, scores uncertainty, and pauses for approval when needed.' },
    { k: 'Act', v: 'Updates systems, drafts output, opens tickets, posts summaries, or queues review.' },
    { k: 'Improve', v: 'Stores evals, decisions, business rules, and faster paths for the next run.' },
  ];

  const richSections = Boolean(template.skills || template.planDetails || template.mcps || template.knowledgebase || template.evals || template.customizable);
  const customOptions = template.customizable || [
    'trigger sources',
    'step sequence',
    'MCP tools',
    'model routing',
    'approval gates',
    'eval metrics',
    'knowledgebase rules',
    'output format',
    'schedule'
  ];

  return h(React.Fragment, null,
    h(window.Nav, { name, current: 'templates' }),
    h('main', { className: 'template-page' },
      h('section', { className: 'section template-hero-section' },
        h('div', { className: 'shell' },
          h('div', { className: 'template-hero-grid', style: { display: 'grid', gap: 56, alignItems: 'center' } },
            h('div', null,
              h('div', { style: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 22 } },
                h('span', { className: 'tag', style: { color: template.color } }, h('span', { className: 'dot', style: { background: template.color } }), template.c)
              ),
              h('h1', { className: 'h1', style: { margin: '0 0 22px', maxWidth: 760 } }, template.hero),
              h('p', { className: 'lead', style: { maxWidth: 640, margin: '0 0 34px' } }, template.intro),
              h('div', { style: { display: 'flex', gap: 12, flexWrap: 'wrap' } },
                h('a', { className: 'btn primary', href: 'https://github.com/manishiitg/mcp-agent-builder-go', target: '_blank', rel: 'noreferrer' }, 'Customize this automation', h('span', { className: 'arrow' }, '→'))
              )
            ),
            h(TemplateHeroVisual, { template, lifecycle })
          )
        )
      ),
      (template.painPoints || template.proof) && h('section', { className: 'section tight', style: { background: 'var(--bg-2)' } },
        h('div', { className: 'shell' },
          h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'start', marginBottom: 34 } },
            h('div', null,
              h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Why this matters'),
              h('h2', { className: 'h2', style: { margin: 0 } },
                template.problemHeading || 'The bottleneck is not running tests. It is knowing what to trust next.'
              )
            ),
            h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
              template.problemIntro || 'The automation is designed for repeated workflows where evidence, memory, and routing matter as much as the first model answer.'
            )
          ),
          template.painPoints && h('div', { className: 'builder-capabilities-grid', style: { display: 'grid', gap: 16, marginBottom: template.proof ? 26 : 0 } },
            template.painPoints.map(point =>
              h('div', { key: point.t, className: 'card', style: { padding: 22 } },
                h('h3', { style: { margin: '0 0 10px', fontSize: 21, fontWeight: 600 } }, point.t),
                h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } }, point.d)
              )
            )
          ),
          template.proof && h('div', { className: 'template-proof-grid', style: { display: 'grid', gap: 14 } },
            template.proof.map((item, i) =>
              h('div', { key: item.k, className: 'template-proof-card' },
                h('div', { className: 'mono', style: { color: templateAccent(template, i), fontSize: 11 } }, item.k),
                h('div', { style: { fontWeight: 650 } }, item.v)
              )
            )
          )
        )
      ),
      h('section', { className: 'section tight', style: { background: template.painPoints ? 'var(--bg)' : 'var(--bg-2)' } },
        h('div', { className: 'shell' },
          h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'start', marginBottom: 34 } },
            h('div', null,
              h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// What it automates'),
              h('h2', { className: 'h2', style: { margin: 0 } }, template.t)
            ),
            h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
              'Each automation ships with clear inputs, repeatable steps, model routing, approval points, and evals so the next run is easier to trust.'
            )
          ),
          h('div', { className: 'template-outcomes', style: { display: 'grid', gap: 16 } },
            template.outcomes.map((outcome, i) =>
              h('div', { key: outcome, className: 'card', style: { padding: 20 } },
                h('div', { className: 'mono', style: { fontSize: 11, color: templateAccent(template, i), marginBottom: 12 } }, `0${i + 1}`),
                h('div', { style: { fontSize: 17, fontWeight: 600, lineHeight: 1.35 } }, outcome)
              )
            )
          )
        )
      ),
      h(CustomWorkflowSection, { template, customOptions }),
      h('section', { className: 'section tight', style: { background: 'var(--bg-2)' } },
        h('div', { className: 'shell' },
          h('div', { className: 'template-detail-grid', style: { display: 'grid', gap: 24 } },
            h('div', { className: 'card', style: { padding: 24 } },
              h('div', { className: 'eyebrow', style: { marginBottom: 18 } }, '// Automation path'),
              template.steps.map((step, i) =>
                h('div', { key: step, style: { display: 'grid', gridTemplateColumns: '48px 1fr', gap: 14, padding: '13px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
                  h('span', { className: 'mono', style: { color: templateAccent(template, i), fontSize: 11 } }, String(i + 1).padStart(2, '0')),
                  h('span', { className: 'body', style: { color: 'var(--fg-2)' } }, step)
                )
              )
            ),
            h('div', { className: 'card', style: { padding: 24 } },
              h('div', { className: 'eyebrow', style: { marginBottom: 18 } }, '// Connectors'),
              h('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
                template.stack.map((item, i) =>
                  h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
                )
              )
            )
          )
        )
      ),
      richSections && h('section', { className: 'section tight' },
        h('div', { className: 'shell' },
          h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 48, alignItems: 'end', marginBottom: 38 } },
            h('div', null,
              h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Build plan'),
              h('h2', { className: 'h2', style: { margin: 0 } },
                'What this automation includes ',
                h('span', { style: { color: 'var(--fg-3)' } }, 'before customization.')
              )
            ),
            h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
              `Use this as a starting solution for the job. The ${template.t.toLowerCase()} can be customized for your tools, data sources, approval policy, routing rules, evals, and reporting style.`
            )
          ),
          template.skills && h('div', { style: { marginBottom: 26 } },
            h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Skills used'),
            h('div', { className: 'builder-capabilities-grid', style: { display: 'grid', gap: 16 } },
              template.skills.map((skill, i) =>
                h('div', { key: skill.t, className: 'card', style: { padding: 22 } },
                  h('div', { className: 'mono', style: { color: templateAccent(template, i), fontSize: 11, marginBottom: 12 } }, String(i + 1).padStart(2, '0')),
                  h('h3', { style: { margin: '0 0 10px', fontSize: 22, fontWeight: 600 } }, skill.t),
                  h('p', { className: 'body', style: { margin: '0 0 16px', color: 'var(--fg-2)' } }, skill.d),
                  h('div', { style: { display: 'flex', gap: 7, flexWrap: 'wrap' } },
                    skill.tags.map((tag, j) =>
                      h('span', { key: tag, className: 'mono', style: {
                        color: templateAccent(template, i + j),
                        fontSize: 10,
                        padding: '4px 8px',
                        borderRadius: 999,
                        border: '1px solid var(--line)',
                        background: 'var(--bg)'
                      } }, tag)
                    )
                  )
                )
              )
            )
          ),
          template.planDetails && h('div', { className: 'template-detail-grid', style: { display: 'grid', gap: 24, marginBottom: 26 } },
            h('div', { className: 'card', style: { padding: 24 } },
              h('div', { className: 'eyebrow', style: { marginBottom: 18 } }, '// Plan steps'),
              template.planDetails.map((step, i) =>
                h('div', { key: step, style: { display: 'grid', gridTemplateColumns: '48px 1fr', gap: 14, padding: '13px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
                  h('span', { className: 'mono', style: { color: templateAccent(template, i), fontSize: 11 } }, String(i + 1).padStart(2, '0')),
                  h('span', { className: 'body', style: { color: 'var(--fg-2)' } }, step)
                )
              )
            ),
            h('div', { className: 'card', style: { padding: 24 } },
              h('div', { className: 'eyebrow', style: { marginBottom: 18 } }, '// Eval metrics'),
              h('p', { className: 'body', style: { margin: '0 0 16px', color: 'var(--fg-2)' } },
                'The automation improves when these metrics move in the right direction across repeated runs.'
              ),
              h('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
                (template.evals || []).map((metric, i) =>
                  h('span', { key: metric, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), metric)
                )
              )
            )
          ),
          template.mcps && h('div', { style: { marginBottom: 26 } },
            h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// MCPs and tools'),
            h('div', { className: 'builder-capabilities-grid', style: { display: 'grid', gap: 16 } },
              template.mcps.map((tool, i) =>
                h('div', { key: tool.t, className: 'card', style: { padding: 22 } },
                  h('h3', { style: { margin: '0 0 10px', fontSize: 21, fontWeight: 600, color: templateAccent(template, i) } }, tool.t),
                  h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } }, tool.d)
                )
              )
            )
          ),
          template.knowledgebase && h('div', { className: 'template-detail-grid', style: { display: 'grid', gap: 24 } },
            h('div', { className: 'card', style: { padding: 24 } },
              h('div', { className: 'eyebrow', style: { marginBottom: 18 } }, '// Knowledgebase structure'),
              template.knowledgebase.map((kb, i) =>
                h('div', { key: kb.t, style: { padding: '14px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
                  h('div', { style: { fontWeight: 700, color: templateAccent(template, i), marginBottom: 6 } }, kb.t),
                  h('div', { className: 'body', style: { color: 'var(--fg-2)' } }, kb.d)
                )
              )
            ),
            h('div', { className: 'card', style: { padding: 24 } },
              h('div', { className: 'eyebrow', style: { marginBottom: 18 } }, '// Customize it'),
              h('p', { className: 'body', style: { margin: '0 0 16px', color: 'var(--fg-2)' } },
                'This automation is not fixed. Swap tools, change rules, add approvals, tune classifications, and shape reports around how your team actually works.'
              ),
              h('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap' } },
                (template.customizable || []).map((item, i) =>
                  h('span', { key: item, className: 'tag' }, h('span', { className: 'dot', style: { background: templateAccent(template, i) } }), item)
                )
              )
            )
          )
        )
      ),
      template.faqs && h('section', { className: 'section tight', style: { background: 'var(--bg-2)' } },
        h('div', { className: 'shell' },
          h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 48, alignItems: 'start', marginBottom: 34 } },
            h('div', null,
              h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Questions'),
              h('h2', { className: 'h2', style: { margin: 0 } }, 'What teams usually ask before deploying it.')
            ),
            h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
              'The workflow can start conservatively as a reporting layer, then take more actions as the evals and approval policy earn trust.'
            )
          ),
          h('div', { className: 'template-faq-grid', style: { display: 'grid', gap: 16 } },
            template.faqs.map(item =>
              h('div', { key: item.q, className: 'card', style: { padding: 22 } },
                h('h3', { style: { margin: '0 0 10px', fontSize: 20, fontWeight: 650 } }, item.q),
                h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } }, item.a)
              )
            )
          )
        )
      ),
      h(window.CTA),
      h(window.Footer, { name })
    )
  );
}

Object.assign(window, { TemplateLanding });
