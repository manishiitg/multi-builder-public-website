FAQ_PRODUCT=[
 ("What makes a good goal?","One outcome you care about and one number that proves it, with a target. \"Book 5 demos a week\" works. \"Do more marketing\" doesn't, because nothing can tell whether it happened."),
 ("What if the metric can't be measured automatically?","AgentWorks says so. A missing or stale measurement is flagged on the goal instead of guessed, and the agent asks you how to get the number."),
 ("Can it change my workflow without asking?","Only if you let it. At the default autonomy level it runs steps on its own and asks before posting, sending or editing the workflow. You can move it up or down at any time."),
 ("What's the difference between a Goal and a Crew teammate?","A Goal owns an outcome and keeps working on its own schedule. A Crew teammate is who you talk to: you hand it a job in Slack or WhatsApp, or ask how a goal is doing."),
 ("Can I use it from ChatGPT or Claude?","Yes. AgentWorks includes an MCP server. Connect it to ChatGPT, Claude, Cowork or any MCP client to check goals, read reports and start runs from that chat. Hosted AI apps connect to your AgentWorks server with a sign-in link."),
 ("Does it work with the tools I already use?","Yes. Agents use MCP servers, APIs and their own browser, so anything you can do in a web app, they can do too, with credentials kept in the vault."),
]

AUTONOMY=[
 ("Ask first","Proposes every step and waits for your yes. Good for week one."),
 ("Run steps","Runs the workflow on its own. Asks before anything goes out or the workflow changes."),
 ("Edit workflow","Also rewrites its own steps when the evidence says a change will move the goal."),
 ("Full","Runs, changes and ships within the rules you set. You review the log, not each step."),
]
def autonomy_levels():
    return '\n          '.join(f'<li class="reveal"><small>Level {i+1}</small><h3>{t}</h3><p>{d}</p></li>' for i,(t,d) in enumerate(AUTONOMY))

body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Product</p>
        <h1>One goal. One metric. <span class="dim">An agent that doesn't stop at done.</span></h1>
        <p class="lede">Most AI automation finishes a task and waits for the next prompt. AgentWorks gives an agent an outcome to own. It plans the work, runs it on schedule, measures every run and changes its own plan until the metric hits your target.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/agents/">Browse premade agents</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <ol class="loop reveal">
          <li><h2>Set the goal</h2><p>An outcome in plain words, the metric that proves it, and the target.</p></li>
          <li><h2>Run</h2><p>Agents plan the steps, connect your tools and run on schedule.</p></li>
          <li><h2>Measure</h2><p>Every run records what it did and what it moved.</p></li>
          <li><h2>Auto-improve</h2><p>It fixes what broke, drops what didn't work and tries what's next.</p></li>
        </ol>
      </div>
    </section>

    <section class="section" id="goals">
      <div class="wrap">
        <div class="feature">
          <div class="reveal">
            <p class="kicker">Goals</p>
            <h2>Say what you want. <span class="dim">Pick the number that proves it.</span></h2>
            <p class="lede">A goal is the outcome, a primary metric with a target, a few supporting metrics, and the rules that must stay true while the agent works. Describe it in chat and AgentWorks sets it up with you.</p>
            <ul class="points">
              <li><span><b>One primary metric.</b> The number that decides whether the goal is met.</span></li>
              <li><span><b>Supporting metrics.</b> The signals that explain why it moved, like reply time or open rate.</span></li>
              <li><span><b>What must stay true.</b> Guardrails the agent can't trade away, like "never email the same person twice a day".</span></li>
            </ul>
          </div>
          <div class="goal-spec reveal" aria-label="Example goal">
            <p class="goal-spec-label">What we're working toward</p>
            <p class="goal-spec-title">Turn more inbound signups into booked demos.</p>
            <div class="goal-spec-metric">
              <div><small>Primary metric</small><b>Demos booked per week</b></div>
              <div class="goal-spec-num"><strong>6</strong><span>target 5</span></div>
            </div>
            <div class="bar"><i class="w-100"></i></div>
            <div class="spec-list">
              <p><small>Supporting</small>First reply time · Reply rate · Show-up rate</p>
              <p><small>Must stay true</small>Max 2 emails per person a week · Never promise pricing</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="measure">
      <div class="wrap">
        <div class="feature flip">
          <div class="reveal">
            <p class="kicker">Measure</p>
            <h2>Progress, not activity. <span class="dim">And never a made-up number.</span></h2>
            <p class="lede">Every run leaves evidence: what it did, what it cost, and what the metric did next. If a number is missing or out of date, the goal says so instead of guessing.</p>
            <ul class="points">
              <li><span><b>Trend, not a snapshot.</b> Every measurement is dated, so you see the direction.</span></li>
              <li><span><b>Stale data flagged.</b> "Measurement stale" beats a confident wrong number.</span></li>
              <li><span><b>Cost per goal.</b> What each goal costs to run, per run and per model.</span></li>
            </ul>
          </div>
          <div class="explainer reveal" aria-hidden="true">
            <p class="explainer-title"><span>Goals</span><span>3 active</span></p>
            <div class="goal-card"><p class="goal-top"><span class="tag tag-ok">Target met</span><span>target 5</span></p><p class="goal-name">Demos booked per week</p><p class="goal-nums"><strong>6</strong><span>from 1</span></p><div class="bar"><i class="w-100"></i></div></div>
            <div class="goal-card"><p class="goal-top"><span class="tag tag-goal">Tracking</span><span>target under 5%</span></p><p class="goal-name">Overdue invoices</p><p class="goal-nums"><strong>8.9%</strong><span>from 14%</span></p><div class="bar"><i class="w-62"></i></div></div>
            <div class="goal-card"><p class="goal-top"><span class="tag">Measurement stale</span><span>last seen 3 days ago</span></p><p class="goal-name">Organic clicks per week</p><p class="goal-nums"><strong>—</strong><span>asking you for access</span></p><div class="bar"><i class="w-0"></i></div></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="improve">
      <div class="wrap">
        <div class="feature">
          <div class="reveal">
            <p class="kicker">Auto-improve</p>
            <h2>It finds what would move the goal. <span class="dim">Then it does it.</span></h2>
            <p class="lede">After runs, AgentWorks reviews the evidence against your goal. It repairs broken steps, drops ideas that didn't work, does the work nobody was doing, and comes back later to check whether it helped.</p>
            <ul class="points">
              <li><span><b>Fixes.</b> A step failed or a login expired: it repairs it and re-runs.</span></li>
              <li><span><b>Did for you.</b> Each change says what it should move and when it will check.</span></li>
              <li><span><b>Focus areas.</b> Tell it where to look first. Your goals and rules always win.</span></li>
              <li><span><b>Challenges your rules.</b> If a rule is costing the goal, it asks. The rule stays until you answer.</span></li>
            </ul>
          </div>
          <div class="explainer reveal" aria-hidden="true">
            <p class="explainer-title"><span>Did for you</span><span>Demo bookings · this week</span></p>
            <div class="did"><p><b>Replies were going out 6 hours late.</b> Now answers new signups within 10 minutes.</p><p class="did-meta"><span class="tag tag-goal">Should move: demos booked</span><span class="tag">Check in 7 days</span></p></div>
            <div class="did"><p><b>The third follow-up never got a reply.</b> 40 sent, 0 answers, so it was dropped.</p><p class="did-meta"><span class="tag">Dropped</span></p></div>
            <div class="did"><p><b>Is the 2-emails-a-week limit costing bookings?</b> Half the no-shows asked for a reminder.</p><p class="did-meta"><span class="tag tag-wait">Needs your answer</span></p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="autonomy">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Autonomy</p>
          <h2>You decide how far it goes. <span class="dim">Turn it up as you trust it.</span></h2>
          <p class="lede">Set it per goal. Anything that reaches a customer can always require your approval, whatever the level.</p>
        </div>
        <ol class="pilot four">
          {autonomy_levels()}
        </ol>
      </div>
    </section>

    <section class="section" id="crew">
      <div class="wrap">
        <div class="feature flip">
          <div class="reveal">
            <p class="kicker sky">Crew</p>
            <h2>Talk to it where you work. <span class="dim">Slack, WhatsApp, ChatGPT, Claude.</span></h2>
            <p class="lede">Crew teammates are always on. Each has its own browser, files, tools, memory and schedule. Hand one a job in chat, approve what it drafted, or ask how a goal is doing.</p>
            <ul class="points">
              <li><span><b>Remembers.</b> Customers, preferences and past decisions carry into every job.</span></li>
              <li><span><b>Signs in.</b> Uses your web apps through its own browser, with credentials from the vault.</span></li>
              <li><span><b>Reports back.</b> Answers in the channel you asked from, and sends updates by email.</span></li>
              <li><span><b>From your AI app.</b> Connect ChatGPT, Claude, Cowork or any MCP client to the AgentWorks MCP server to check goals, read reports and start runs. It can read and run; it can't edit your workflows.</span></li>
            </ul>
          </div>
          <div class="explainer reveal" aria-hidden="true">
            <p class="explainer-title"><span># sales · Slack</span><span>Sage is working</span></p>
            <div class="msg"><span class="avatar avatar-you">Y</span><div class="msg-body"><p class="msg-meta"><b>You</b>9:04 AM</p><p class="msg-text">@Sage how are demo bookings doing this week?</p></div></div>
            <div class="msg"><span class="avatar avatar-sage">S</span><div class="msg-body"><p class="msg-meta"><b>Sage</b>Crew · 9:04 AM</p><p class="msg-text"><b>6 booked, target 5.</b> Faster replies did most of it. Two signups asked about pricing, and I've drafted answers for you to approve.</p></div></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="stack">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Under the hood</p>
          <h2>Built on the tools <span class="dim">you already trust.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 9-4 3 4 3M16 9l4 3-4 3"/></svg></span><h3>Your AI plan</h3><p>Runs on Claude Code, Codex, Cursor, Pi or Muse with the subscription you already have, or on API keys.</p></li>
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg></span><h3>Its own browser</h3><p>A persistent, isolated browser per workflow, so agents can work in any web app you use.</p></li>
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/><circle cx="12" cy="12" r="3"/></svg></span><h3>MCP and APIs</h3><p>Connect any MCP server or API. Tools are granted per workflow, not globally.</p></li>
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></span><h3>Secrets vault</h3><p>Encrypted, injected only at run time, never shown in chat or logs.</p></li>
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/></svg></span><h3>Sandboxed</h3><p>OS-enforced sandbox per agent: Landlock on Linux, sandbox-exec on macOS.</p></li>
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h16M4 19h10"/></svg></span><h3>Full run log</h3><p>Every step, tool call, decision and cost, kept per run.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">How it works, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_PRODUCT)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Pick one goal. <span class="dim">Watch the number move.</span></h2>
        <p>Start from a premade agent or describe your own goal. Ten minutes to set up, on the AI plan you already have.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="{INSTALL}" target="_blank" rel="noreferrer">Download free app</a>
        </div>
      </div>
    </section>
  </main>
'''
PROD_LD={"@type":"WebPage","name":"AgentWorks Product","url":"https://agentworkshq.com/product/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['product/index.html']=head('AgentWorks Product - Goals, Auto-improve and Crew','AI automation that measures itself: give an agent a goal and a metric, and it runs the work, tracks every run and improves its plan until it hits the target.','/product/',og='agentworks-product-og.jpg',extra_ld=ld(PROD_LD,BC('Product','/product/'),faq_ld(FAQ_PRODUCT)))+header('product')+body+footer()

nf_body=f'''  <main id="main">
    <section class="page-hero notfound">
      <div class="wrap">
        <p class="kicker">404</p>
        <h1>This page isn't here. <span class="dim">Your goals still are.</span></h1>
        <p class="lede">The link may be old or mistyped. Here's where to go next.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/">Home</a>
          <a class="btn btn-ghost" href="/product/">Product</a>
          <a class="btn btn-ghost" href="/agents/">Premade agents</a>
          <a class="btn btn-ghost" href="/docs/">Docs</a>
        </div>
      </div>
    </section>
  </main>
'''
nf=head('Page Not Found - AgentWorks','This page does not exist. Go to the AgentWorks homepage, product overview, premade agents or docs.','/404.html',og='agentworks-404-og.jpg',extra_ld=ld({"@type":"WebPage","name":"Page Not Found","url":"https://agentworkshq.com/404.html","isPartOf":{"@id":"https://agentworkshq.com/#website"}}))
nf=nf.replace('<link rel="canonical"','<meta name="robots" content="noindex">\n  <link rel="canonical"',1)
pages['404.html']=nf+header()+nf_body+footer()
