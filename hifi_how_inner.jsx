function HowDeepHero() {
  return h('section', { className: 'hero how-deep-hero', style: { paddingBottom: 42 } },
    h('div', { className: 'hero-bg' }),
    h('div', { className: 'shell hero-inner' },
      h('div', { style: { display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center', flexWrap: 'wrap' } },
        h('span', { className: 'tag violet' }, h('span', { className: 'dot' }), 'How it works'),
        h('span', { className: 'tag amber' }, h('span', { className: 'dot' }), 'Self-improving automations')
      ),
      h('h1', { className: 'display', style: { textAlign: 'center', marginBottom: 24, maxWidth: 1040, margin: '0 auto 24px' } },
        'Set goals and metrics. ',
        h('span', { style: { background: 'linear-gradient(120deg, var(--violet), var(--cyan))', WebkitBackgroundClip: 'text', color: 'transparent' } }, 'Let agents improve the automation.')
      ),
      h('p', { className: 'lead', style: { maxWidth: 790, margin: '0 auto', textAlign: 'center' } },
        'Runloop turns your repeatable business process into a custom managed AI automation. You define the target outcome, metrics, tools, and approval rules. Agents run the work, evaluate the result, and make measured improvements over time.'
      ),
      h('div', { className: 'how-page-nav' },
        [
          ['Workspace', '#workspace'],
          ['Loop', '#loop'],
          ['Example', '#example'],
          ['Builder', '#builder'],
          ['Knowledge', '#knowledge'],
          ['Models', '#models'],
          ['Browser', '#browser'],
          ['Observability', '#observability'],
        ].map(item =>
          h('a', { key: item[0], href: item[1], className: 'mono' }, item[0])
        )
      )
    )
  );
}

function LoopOverview() {
  const items = [
    { t: 'Goals + metrics', d: 'Define success', c: 'var(--violet)' },
    { t: 'Agents run', d: 'Use tools and models', c: 'var(--cyan)' },
    { t: 'Eval checks', d: 'Score against target', c: 'var(--lime)' },
    { t: 'Improve', d: 'Propose measured changes', c: 'var(--pink)' },
    { t: 'Skills + KB', d: 'Save what worked', c: 'var(--amber)' },
    { t: 'Next run', d: 'Start with better defaults', c: 'var(--success)' },
  ];

  return h('section', { className: 'section tight how-loop-section' },
    h('div', { className: 'shell' },
      h('div', { className: 'how-loop-head' },
        h('div', { className: 'eyebrow' }, '// The operating loop'),
        h('p', { className: 'body', style: { margin: 0 } },
          'The product is not a library of pre-made workflows. It is a loop that turns your measured business outcomes into better custom automation behavior.'
        )
      ),
      h('div', { className: 'how-loop-visual' },
        items.map((item, i) =>
          h('div', { key: item.t, className: 'how-loop-node' },
            h('div', { style: { display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 } },
              h('span', { style: { width: 9, height: 9, borderRadius: '50%', background: item.c, boxShadow: `0 0 16px ${item.c}` } }),
              h('span', { className: 'mono', style: { color: item.c, fontSize: 10 } }, `0${i + 1}`)
            ),
            h('div', { style: { fontSize: 18, fontWeight: 700, marginBottom: 5 } }, item.t),
            h('div', { className: 'small' }, item.d),
            i < items.length - 1
              ? h('span', { className: 'how-loop-arrow' }, '→')
              : h('span', { className: 'how-loop-arrow return' }, '↺')
          )
        )
      )
    )
  );
}

function WorkspaceAnatomy() {
  const parts = [
    ['Goals + metrics', 'What business outcome the automation is trying to improve, how it is measured, and what threshold counts as success.'],
    ['Plan steps', 'The work broken into stages: fetch context, analyze, decide, act, write, publish, review, or ask for approval.'],
    ['Tools + MCPs', 'Connected apps, APIs, browser actions, scripts, model providers, and internal systems available to each step.'],
    ['Knowledgebase', 'Facts, policies, examples, edge cases, decisions, and lessons saved from previous runs so the next run starts ahead.'],
    ['Skills', 'Reusable abilities and scripts promoted from repeated wins so stable parts become faster, cheaper, and more consistent.'],
    ['Safety + schedule', 'Human approvals, risk limits, trigger rules, recurrence, account boundaries, and places where the automation must pause.'],
  ];

  return h('section', { id: 'workspace', className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { className: 'how-two-col', style: { display: 'grid', gap: 54, alignItems: 'start' } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Automation workspace'),
          h('h2', { className: 'h2', style: { margin: '0 0 18px' } },
            'Everything the automation needs ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'lives in one workspace.')
          ),
          h('p', { className: 'body', style: { margin: 0, maxWidth: 540 } },
            'Instead of a one-off prompt or fixed preset, Runloop keeps a durable operating workspace for your automation. The builder defines the system, the runner executes it, the evaluator scores it, and the optimizer uses evidence to decide what should improve next.'
          )
        ),
        h('div', { className: 'card file-map', style: { padding: 24 } },
          parts.map((p, i) =>
            h('div', { key: p[0], className: 'file-row', style: {
              display: 'grid',
              gap: 16,
              padding: '14px 0',
              borderTop: i ? '1px solid var(--line)' : 'none',
              alignItems: 'start'
            } },
              h('div', { style: { fontSize: 18, fontWeight: 700, color: i < 3 ? 'var(--violet)' : 'var(--cyan)' } }, p[0]),
              h('div', { className: 'body', style: { color: 'var(--fg-2)' } }, p[1])
            )
          )
        )
      )
    )
  );
}

function RunLifecycle() {
  const stages = [
    { n: '01', t: 'Set goals', d: 'Define the business result, target metric, allowed tools, model policy, and where humans must stay in control.', c: 'var(--violet)' },
    { n: '02', t: 'Build steps', d: 'Break the process into clear stages with inputs, expected outputs, tool access, approval gates, and fallback paths.', c: 'var(--cyan)' },
    { n: '03', t: 'Run agents', d: 'AI agents execute step by step, calling MCP tools, APIs, browsers, code, model providers, or scripts as needed.', c: 'var(--lime)' },
    { n: '04', t: 'Evaluate', d: 'A separate evaluation pass scores the output against the goal and explains what passed, failed, or needs review.', c: 'var(--amber)' },
    { n: '05', t: 'Improve', d: 'Agents propose changes to prompts, steps, skills, tools, rubrics, or scripts based on the metric evidence.', c: 'var(--pink)' },
    { n: '06', t: 'Promote or revert', d: 'Useful changes are kept as skills or fast paths. Bad changes are rejected. The next run starts with better defaults.', c: 'var(--success)' },
  ];

  return h('section', { id: 'loop', className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { style: { textAlign: 'center', marginBottom: 44 } },
        h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// The loop'),
        h('h2', { className: 'h2', style: { margin: 0 } },
          'It is execution, evaluation, ',
          h('span', { style: { color: 'var(--fg-3)' } }, 'and automated improvement.')
        )
      ),
      h('div', { className: 'inner-lifecycle-grid', style: { display: 'grid', gap: 14 } },
        stages.map(s =>
          h('div', { key: s.n, className: 'card inner-step-card', style: { padding: 20 } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 14, marginBottom: 14 } },
              h('span', { className: 'mono', style: { color: s.c, fontSize: 11 } }, s.n),
              h('span', { style: { width: 10, height: 10, borderRadius: '50%', background: s.c, boxShadow: `0 0 18px ${s.c}` } })
            ),
            h('h3', { style: { fontSize: 22, fontWeight: 600, margin: '0 0 10px' } }, s.t),
            h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } }, s.d)
          )
        )
      )
    )
  );
}

function RunningExample() {
  const rows = [
    ['Goal', 'Reduce false escalations in support triage without missing urgent tickets.'],
    ['Metric', 'SLA accuracy, escalation precision, reply acceptance rate, and human corrections.'],
    ['Run', 'The agent reads a new ticket, pulls CRM and incident context, classifies severity, and drafts the next action.'],
    ['Evaluate', 'A separate eval checks whether the right docs were used, risk was classified correctly, and the reply followed policy.'],
    ['Improve', 'If false escalations dropped, the new routing rule is kept. If it caused misses, the change is reverted.'],
    ['Save', 'Repeated fixes become support skills, macros, deterministic checks, or knowledgebase rules for the next run.'],
  ];

  return h('section', { id: 'example', className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { className: 'running-example' },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Concrete example'),
          h('h2', { className: 'h2', style: { margin: '0 0 18px' } },
            'Example: support triage ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'that improves its own routing.')
          ),
          h('p', { className: 'body', style: { margin: 0, maxWidth: 560 } },
            'This is the same loop applied to a real business outcome. The team sets the target. Agents run the work. Evals decide whether the proposed improvement is worth keeping.'
          )
        ),
        h('div', { className: 'card', style: { padding: 24 } },
          rows.map((r, i) =>
            h('div', { key: r[0], className: 'running-example-row' },
              h('div', { className: 'mono', style: { color: i < 2 ? 'var(--violet)' : 'var(--cyan)', fontSize: 11 } }, r[0]),
              h('div', { className: 'body', style: { color: 'var(--fg-2)' } }, r[1])
            )
          )
        )
      )
    )
  );
}

function ImprovementExamples() {
  const examples = [
    ['Goal movement', 'Tracks whether the automation moved the target metric: SLA accuracy, QA coverage, lead quality, savings, or acceptance rate.'],
    ['Agent changes', 'Lets agents propose changes to step instructions, model routing, tool choice, rubrics, prompts, scripts, or approval rules.'],
    ['Skills saved', 'Promotes repeated good behavior into reusable skills so future runs start with proven operating knowledge.'],
    ['Cost reduced', 'Routes stable work to cheaper models, deterministic scripts, or fast paths after evals show the step is reliable.'],
  ];

  return h('section', { className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 48, alignItems: 'end', marginBottom: 34 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// What improves'),
          h('h2', { className: 'h2', style: { margin: 0 } },
            'Each run gives agents ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'evidence for what to improve.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
          'Runloop does not assume a change helped because it sounds better. It compares future runs against the goals and metrics you care about, then keeps only changes that improve the automation.'
        )
      ),
      h('div', { className: 'grid cols-4' },
        examples.map((e, i) =>
          h('div', { key: e[0], className: 'card', style: { padding: 22, minHeight: 190 } },
            h('div', { className: 'mono', style: { color: i % 2 ? 'var(--cyan)' : 'var(--violet)', fontSize: 11, marginBottom: 18 } }, `0${i + 1}`),
            h('h3', { style: { margin: '0 0 10px', fontSize: 22, fontWeight: 600 } }, e[0]),
            h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } }, e[1])
          )
        )
      )
    )
  );
}

function BuilderSystem() {
  const capabilities = [
    {
      k: 'Automation builder',
      t: 'Design the automation graph.',
      d: 'Configure the automation graph: steps, inputs, groups, variables, triggers, schedules, tools, model policy, approval gates, and expected output contracts.',
      tags: ['graph', 'variables', 'triggers'],
      c: 'var(--violet)'
    },
    {
      k: 'Step types',
      t: 'Use the right mode for each job.',
      d: 'Steps can run as agent reasoning, direct tool calls, code execution, learned code, human feedback, evaluation checks, branching logic, or sub-agent handoffs.',
      tags: ['agent', 'tool', 'learn_code'],
      c: 'var(--cyan)'
    },
    {
      k: 'Evaluation system',
      t: 'Check the work after it runs.',
      d: 'Define eval steps separately from execution. Evals read run outputs, score completeness, format, factual quality, policy fit, regressions, and business rules.',
      tags: ['eval plan', 'scores', 'report'],
      c: 'var(--lime)'
    },
    {
      k: 'Metrics',
      t: 'Define what better means.',
      d: 'Attach business and run metrics to the automation: quality, cost, latency, pass rate, coverage, retries, human escalations, or domain-specific KPIs.',
      tags: ['target', 'trend', 'verdict'],
      c: 'var(--amber)'
    },
    {
      k: 'Knowledgebase',
      t: 'Keep lessons close to the automation.',
      d: 'Store automation-specific rules, examples, edge cases, source notes, brand voice, customer facts, prior decisions, and operator corrections.',
      tags: ['rules', 'examples', 'decisions'],
      c: 'var(--pink)'
    },
    {
      k: 'Automation skills',
      t: 'Turn repeated know-how into reusable ability.',
      d: 'Promote reliable patterns into automation-level skills or reusable scripts, so future runs can execute stable parts with less reasoning and fewer tokens.',
      tags: ['skills', 'scripts', 'fast path'],
      c: 'var(--success)'
    },
  ];

  return h('section', { id: 'builder', className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 48, alignItems: 'end', marginBottom: 38 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Builder system'),
          h('h2', { className: 'h2', style: { margin: 0 } },
            'The builder is where ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'the automation becomes operational.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
          'Runloop is not just a chat box for agents. The builder gives each automation a typed structure: what steps exist, how each step runs, which outputs are expected, how evals score the run, what the automation remembers, and what metrics should improve.'
        )
      ),
      h('div', { className: 'builder-capabilities-grid', style: { display: 'grid', gap: 16 } },
        capabilities.map((cap, i) =>
          h('div', { key: cap.k, className: 'card', style: { padding: 22 } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginBottom: 16 } },
              h('div', { className: 'mono', style: { color: cap.c, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' } }, cap.k),
              h('span', { className: 'mono', style: { color: 'var(--fg-4)', fontSize: 11 } }, `0${i + 1}`)
            ),
            h('h3', { style: { margin: '0 0 10px', fontSize: 22, fontWeight: 600 } }, cap.t),
            h('p', { className: 'body', style: { margin: '0 0 16px', color: 'var(--fg-2)' } }, cap.d),
            h('div', { style: { display: 'flex', gap: 7, flexWrap: 'wrap' } },
              cap.tags.map(tag =>
                h('span', { key: tag, className: 'mono', style: {
                  color: cap.c,
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
    )
  );
}

function AdvancedCapabilitiesIntro() {
  return h('section', { className: 'section tight advanced-capabilities-intro' },
    h('div', { className: 'shell' },
      h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 48, alignItems: 'end' } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Advanced capabilities'),
          h('h2', { className: 'h2', style: { margin: 0 } },
            'Once the loop is clear, ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'these are the systems it can use.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
          'The sections below are platform details: knowledgebase, skills, model routing, multimodal tools, browser modes, execution runtime, trust controls, and observability.'
        )
      )
    )
  );
}

function KnowledgeAndSkills() {
  const knowledge = [
    ['Rules', 'Durable instructions the automation should follow every run: brand constraints, policy rules, customer preferences, thresholds, and edge cases.'],
    ['Examples', 'Good outputs, bad outputs, source notes, prior tickets, screenshots, reports, or domain references that help future runs behave consistently.'],
    ['Decisions', 'Why something changed, who approved it, what metric it was meant to move, and whether the change was kept, reverted, or still being tested.'],
  ];

  const skills = [
    ['Automation-level skill', 'Reusable know-how scoped to one automation, such as how to review a PR, classify a lead, score an AEO answer, or package a social post.'],
    ['Reusable script', 'Deterministic code for stable steps like parsing, validation, report generation, routing, cleanup, or API transformation.'],
    ['Fast path', 'Before calling a large model, Runloop can try the saved skill or script, validate the output, and only escalate when the fast path fails.'],
  ];

  function detailList(items, color) {
    return items.map((item, i) =>
      h('div', { key: item[0], style: { padding: '16px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 } },
          h('span', { style: { width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: `0 0 16px ${color}` } }),
          h('span', { style: { fontWeight: 700 } }, item[0])
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } }, item[1])
      )
    );
  }

  return h('section', { id: 'knowledge', className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'end', marginBottom: 38 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Knowledge + skills'),
          h('h2', { className: 'h2', style: { margin: 0 } },
            'The automation improves because ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'it remembers and compiles.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
          'Knowledgebase and automation skills are the compounding layer. The knowledgebase captures what the automation learned; skills turn repeated procedures into reusable execution paths.'
        )
      ),
      h('div', { className: 'how-two-col', style: { display: 'grid', gap: 22, alignItems: 'stretch' } },
        h('div', { className: 'card', style: { padding: 24 } },
          h('div', { className: 'mono', style: { color: 'var(--pink)', fontSize: 11, marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase' } }, 'Knowledgebase'),
          h('h3', { style: { margin: '0 0 12px', fontSize: 26, fontWeight: 600 } }, 'Memory the automation can trust.'),
          h('p', { className: 'body', style: { margin: '0 0 18px', color: 'var(--fg-2)' } },
            'It is not generic chat memory. It is automation-scoped context that future runs can use to avoid repeating mistakes and preserve domain-specific decisions.'
          ),
          detailList(knowledge, 'var(--pink)')
        ),
        h('div', { className: 'card', style: { padding: 24 } },
          h('div', { className: 'mono', style: { color: 'var(--success)', fontSize: 11, marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase' } }, 'Automation skills'),
          h('h3', { style: { margin: '0 0 12px', fontSize: 26, fontWeight: 600 } }, 'Reusable ability for this automation.'),
          h('p', { className: 'body', style: { margin: '0 0 18px', color: 'var(--fg-2)' } },
            'When a repeated pattern becomes reliable, Runloop can promote it into a skill or script. The next run starts with that ability instead of rediscovering the process.'
          ),
          detailList(skills, 'var(--success)')
        )
      )
    )
  );
}

function ModelPlans() {
  const groups = [
    {
      title: 'Coding plans',
      note: 'Best for repo-aware work, terminal execution, code review, tests, and generated patches.',
      color: 'var(--violet)',
      items: ['Claude Code', 'Codex CLI', 'Gemini CLI', 'Kimi', 'GLM', 'MiniMax']
    },
    {
      title: 'API models',
      note: 'Best for automation steps that need normal model calls: extraction, classification, summarization, ranking, writing, and eval scoring.',
      color: 'var(--cyan)',
      items: ['OpenAI', 'Anthropic', 'Google', 'Kimi API', 'OpenRouter', 'custom endpoints']
    },
    {
      title: 'Tiered routing',
      note: 'Best for controlling cost and quality per step: high reasoning for execution, medium for learning, cheaper tiers for stable evals or simple transforms.',
      color: 'var(--lime)',
      items: ['execution', 'learning', 'evaluation', 'fallbacks', 'step overrides', 'budget policy']
    },
  ];

  return h('section', { id: 'models', className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'end', marginBottom: 38 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Models + coding plans'),
          h('h2', { className: 'h2', style: { margin: 0 } },
            'Each step can run on ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'the right kind of intelligence.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
          'Runloop does not treat every model as interchangeable. Some steps need coding agents that can operate inside a repo. Other steps need fast API calls. Eval and learning steps can use their own cheaper or stricter model policy.'
        )
      ),
      h('div', { className: 'inner-trust-grid', style: { display: 'grid', gap: 18 } },
        groups.map(group =>
          h('div', { key: group.title, className: 'card', style: { padding: 24 } },
            h('div', { className: 'mono', style: { color: group.color, fontSize: 11, marginBottom: 14, letterSpacing: '0.08em', textTransform: 'uppercase' } }, group.title),
            h('p', { className: 'body', style: { margin: '0 0 18px', color: 'var(--fg-2)' } }, group.note),
            h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
              group.items.map(item =>
                h('span', { key: item, className: 'mono', style: {
                  color: group.color,
                  fontSize: 10,
                  padding: '5px 9px',
                  borderRadius: 999,
                  border: '1px solid var(--line)',
                  background: 'var(--bg)'
                } }, item)
              )
            )
          )
        )
      )
    )
  );
}

function MultimodalCapabilities() {
  const capabilities = [
    {
      t: 'Web search',
      d: 'Research current information, compare sources, gather citations, monitor competitors, or refresh context before a run makes decisions.',
      tags: ['search', 'sources', 'fresh context'],
      c: 'var(--cyan)'
    },
    {
      t: 'Read images',
      d: 'Inspect screenshots, UI states, receipts, charts, documents, creative assets, product photos, or QA captures as part of the automation.',
      tags: ['vision', 'screenshots', 'documents'],
      c: 'var(--violet)'
    },
    {
      t: 'Generate images',
      d: 'Create campaign assets, thumbnails, illustrations, product mockups, social graphics, or visual variants from an automation step.',
      tags: ['creative', 'variants', 'assets'],
      c: 'var(--pink)'
    },
    {
      t: 'Generate video',
      d: 'Produce short-form clips, previews, storyboards, reels, explainers, or video drafts that can be checked and iterated by evals.',
      tags: ['reels', 'previews', 'storyboards'],
      c: 'var(--amber)'
    },
    {
      t: 'Browser actions',
      d: 'Open websites, test flows, capture pages, fill non-sensitive forms with approval, or verify that generated content renders correctly.',
      tags: ['browser', 'QA', 'screens'],
      c: 'var(--lime)'
    },
    {
      t: 'Files + reports',
      d: 'Read documents, generate reports, create structured outputs, package artifacts, and pass files between steps for review or publishing.',
      tags: ['docs', 'reports', 'artifacts'],
      c: 'var(--success)'
    },
  ];

  return h('section', { className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 48, alignItems: 'end', marginBottom: 38 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Tool capabilities'),
          h('h2', { className: 'h2', style: { margin: 0 } },
            'Automations can work with ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'web, images, video, files, and browsers.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
          'A Runloop step is not limited to text generation. The automation can research the web, read visual inputs, create media, operate a browser, and package real deliverables.'
        )
      ),
      h('div', { className: 'builder-capabilities-grid', style: { display: 'grid', gap: 16 } },
        capabilities.map((cap, i) =>
          h('div', { key: cap.t, className: 'card', style: { padding: 22 } },
            h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, marginBottom: 14 } },
              h('div', { className: 'mono', style: { color: cap.c, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' } }, cap.t),
              h('span', { className: 'mono', style: { color: 'var(--fg-4)', fontSize: 11 } }, `0${i + 1}`)
            ),
            h('p', { className: 'body', style: { margin: '0 0 16px', color: 'var(--fg-2)' } }, cap.d),
            h('div', { style: { display: 'flex', gap: 7, flexWrap: 'wrap' } },
              cap.tags.map(tag =>
                h('span', { key: tag, className: 'mono', style: {
                  color: cap.c,
                  fontSize: 10,
                  padding: '4px 8px',
                  borderRadius: 999,
                  border: '1px solid var(--line)',
                  background: 'var(--bg-2)'
                } }, tag)
              )
            )
          )
        )
      )
    )
  );
}

function BrowserSystem() {
  const modes = [
    {
      k: 'Playwright MCP',
      t: 'Deterministic browser automation.',
      d: 'Use it when the automation needs repeatable navigation, stable selectors, screenshots, downloads, regression checks, or saved scripts that can replay the same flow later.',
      tags: ['snapshots', 'locators', 'artifacts'],
      c: 'var(--violet)'
    },
    {
      k: 'Agent-browser',
      t: 'Agent-operated browser sessions.',
      d: 'Use it when the agent needs to inspect a live page, work through unfamiliar UI, connect to a local Chrome session, or reuse logged-in browser state through CDP.',
      tags: ['live session', 'CDP', 'local browser'],
      c: 'var(--cyan)'
    },
    {
      k: 'Shared session model',
      t: 'Control when browser state is reused.',
      d: 'Browser sessions can be scoped to an automation, group, or sub-agent. A run can share state when continuity matters, or isolate state when parallel agents should not interfere.',
      tags: ['session id', 'share browser', 'isolation'],
      c: 'var(--lime)'
    },
  ];

  const rules = [
    ['Snapshot first', 'The agent reads the accessibility tree before acting, so interactions are grounded in visible UI state.'],
    ['Durable selectors', 'Saved scripts avoid ephemeral refs and unstable CSS chains; future runs need locators that survive page reloads and deploys.'],
    ['Human-safe actions', 'Browser steps can pause for approvals, account access, OTPs, and risky submissions before continuing.'],
  ];

  return h('section', { id: 'browser', className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'end', marginBottom: 38 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Browser system'),
          h('h2', { className: 'h2', style: { margin: 0 } },
            'Browser work can be ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'scripted, watched, or shared.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
          'Runloop supports both deterministic browser automation and agent-operated browser sessions. That lets an automation move from exploratory UI work to reliable replayable steps.'
        )
      ),
      h('div', { className: 'inner-trust-grid', style: { display: 'grid', gap: 18, marginBottom: 22 } },
        modes.map(mode =>
          h('div', { key: mode.k, className: 'card', style: { padding: 24 } },
            h('div', { className: 'mono', style: { color: mode.c, fontSize: 11, marginBottom: 14, letterSpacing: '0.08em', textTransform: 'uppercase' } }, mode.k),
            h('h3', { style: { margin: '0 0 10px', fontSize: 23, fontWeight: 600 } }, mode.t),
            h('p', { className: 'body', style: { margin: '0 0 16px', color: 'var(--fg-2)' } }, mode.d),
            h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
              mode.tags.map(tag =>
                h('span', { key: tag, className: 'mono', style: {
                  color: mode.c,
                  fontSize: 10,
                  padding: '5px 9px',
                  borderRadius: 999,
                  border: '1px solid var(--line)',
                  background: 'var(--bg)'
                } }, tag)
              )
            )
          )
        )
      ),
      h('div', { className: 'card', style: { padding: 24 } },
        h('div', { className: 'mono', style: { color: 'var(--amber)', fontSize: 11, marginBottom: 18, letterSpacing: '0.08em', textTransform: 'uppercase' } }, 'Browser authoring rules'),
        h('div', { className: 'observability-grid', style: { display: 'grid', gap: 14 } },
          rules.map(rule =>
            h('div', { key: rule[0], style: { borderTop: '1px solid var(--line)', paddingTop: 14 } },
              h('div', { style: { fontSize: 16, fontWeight: 700, marginBottom: 7 } }, rule[0]),
              h('div', { className: 'body', style: { color: 'var(--fg-2)' } }, rule[1])
            )
          )
        )
      )
    )
  );
}

function ExecutionEngine() {
  const rows = [
    ['Agents for judgment', 'Use coding, research, browser, or domain agents when a step needs reasoning, exploration, or creative judgment.'],
    ['Tool calls', 'Call connected tools, APIs, browser actions, databases, or internal systems through the step runtime.'],
    ['code_exec', 'Let the agent write and run code for the current run when it needs flexible computation or parsing.'],
    ['learn_code', 'Save stable step logic as reusable code and try it before spending LLM tokens on future runs.'],
    ['Model routing', 'Different steps can use different providers and reasoning levels, from Claude Code and Codex to OpenAI, Anthropic, Kimi, and OpenRouter routes.'],
    ['Run folder', 'Each run keeps outputs, costs, decisions, approvals, failures, and evaluation notes so operators can inspect what happened later.'],
  ];

  return h('section', { className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { className: 'how-two-col', style: { display: 'grid', gap: 54, alignItems: 'center' } },
        h('div', { className: 'card terminal-card', style: { padding: 24 } },
          h('div', { className: 'mono', style: { color: 'var(--fg-3)', marginBottom: 18 } }, 'inside one run'),
          rows.map((r, i) =>
            h('div', { key: r[0], style: { padding: '13px 0', borderTop: i ? '1px solid var(--line)' : 'none' } },
              h('div', { style: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 } },
                h('span', { style: { width: 7, height: 7, borderRadius: '50%', background: i === 2 ? 'var(--lime)' : 'var(--violet)' } }),
                h('span', { style: { fontWeight: 600 } }, r[0])
              ),
              h('div', { className: 'body', style: { color: 'var(--fg-2)' } }, r[1])
            )
          )
        ),
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Execution engine'),
          h('h2', { className: 'h2', style: { margin: '0 0 18px' } },
            'Use intelligence where it matters. ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'Automate the rest.')
          ),
          h('p', { className: 'body', style: { margin: '0 0 20px', maxWidth: 560 } },
            'Early runs may use more agent reasoning because the process is still being discovered. As the automation stabilizes, repeatable steps move from agent work into tool calls, code_exec, learn_code, or automation skills. That is how runs become faster, cheaper, and more reliable over time.'
          ),
          h('div', { className: 'tag lime' }, h('span', { className: 'dot' }), 'stable steps can graduate to fast paths')
        )
      )
    )
  );
}

function HumanEvalImprove() {
  const blocks = [
    {
      k: 'Human control',
      t: 'Pause before risky actions.',
      d: 'Approvals, account access, OTPs, edge cases, and unclear business decisions can stop the run and ask a human before continuing.',
      color: 'var(--amber)'
    },
    {
      k: 'Independent checks',
      t: 'Score the result after the run.',
      d: 'Evaluation is separate from execution, so the worker does not simply grade its own homework. Reports show what passed, what failed, and why.',
      color: 'var(--cyan)'
    },
    {
      k: 'Measured improvement',
      t: 'Keep changes that prove themselves.',
      d: 'Runloop tracks whether a change improves quality, speed, cost, or reliability across future runs before treating it as a new default.',
      color: 'var(--lime)'
    },
  ];

  return h('section', { className: 'section', style: { background: 'var(--bg-2)' } },
    h('div', { className: 'shell' },
      h('div', { className: 'split-heading', style: { display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'end', marginBottom: 38 } },
        h('div', null,
          h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// Trust loop'),
          h('h2', { className: 'h2', style: { margin: 0 } },
            'Control, evaluation, and improvement ',
            h('span', { style: { color: 'var(--fg-3)' } }, 'are built into the run.')
          )
        ),
        h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } },
          'The important part is separation: the automation can do the work, the evaluator can judge the result, and the optimizer can decide what should change next.'
        )
      ),
      h('div', { className: 'inner-trust-grid', style: { display: 'grid', gap: 18 } },
        blocks.map(b =>
          h('div', { key: b.k, className: 'card', style: { padding: 24 } },
            h('div', { className: 'mono', style: { fontSize: 11, color: b.color, marginBottom: 14 } }, b.k),
            h('h3', { style: { margin: '0 0 10px', fontSize: 24, fontWeight: 600 } }, b.t),
            h('p', { className: 'body', style: { margin: 0, color: 'var(--fg-2)' } }, b.d)
          )
        )
      )
    )
  );
}

function ObservabilitySurface() {
  const items = [
    ['Run timeline', 'What happened, in what order, and where the automation paused or failed.'],
    ['Outputs', 'Files, reports, messages, browser artifacts, screenshots, or generated deliverables.'],
    ['Evaluation', 'Pass/fail checks, scores, comments, and suggested fixes.'],
    ['Cost', 'Token and model usage split across execution, learning, and evaluation.'],
    ['Learning', 'Rules, reusable code, and decisions that affect the next run.'],
  ];

  return h('section', { id: 'observability', className: 'section tight' },
    h('div', { className: 'shell' },
      h('div', { className: 'card observability-card', style: { padding: 28 } },
        h('div', { className: 'eyebrow', style: { marginBottom: 16 } }, '// What operators inspect'),
        h('h2', { className: 'h2', style: { margin: '0 0 24px', maxWidth: 760 } },
          'When something changes, you can see what changed and why.'
        ),
        h('div', { className: 'observability-grid', style: { display: 'grid', gap: 12 } },
          items.map(i =>
            h('div', { key: i[0], style: { borderTop: '1px solid var(--line)', paddingTop: 14 } },
              h('div', { style: { fontSize: 16, fontWeight: 700, marginBottom: 7 } }, i[0]),
              h('div', { className: 'body', style: { color: 'var(--fg-2)' } }, i[1])
            )
          )
        )
      )
    )
  );
}

Object.assign(window, { HowDeepHero, LoopOverview, WorkspaceAnatomy, RunLifecycle, RunningExample, ImprovementExamples, BuilderSystem, AdvancedCapabilitiesIntro, KnowledgeAndSkills, ModelPlans, MultimodalCapabilities, BrowserSystem, ExecutionEngine, HumanEvalImprove, ObservabilitySurface });
