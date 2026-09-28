# /goals/: the Goals product in depth (goal, metric, measure, auto-improve, autonomy, the plan).
FAQ_GOALS=[q for q in FAQ_PRODUCT if not q[0].startswith("What's the difference")]+[
 ("What's the difference between a Goal and a Crew?","A Goal owns an outcome and keeps working on its own schedule. A Crew is an expert you or your team ask for help, in Slack, WhatsApp or from Claude and ChatGPT. Goals can hand steps to Crews."),
]
goals_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Goals</p>
        <h1>One goal. One metric. <span class="dim">An agent that doesn't stop at done.</span></h1>
        <p class="lede">Most AI automation finishes a task and waits for the next prompt. AgentWorks gives an agent an outcome to own. It plans the work, runs it on schedule, measures every run and changes its own plan until the metric hits your target.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#demo">Watch the 60-second demo</a>
        </div>
      </div>
    </section>

    <section class="section-tight" id="demo">
      <div class="wrap">
        <figure class="demo-video reveal">
          <video controls preload="none" playsinline width="1920" height="1080" poster="/assets/video/agentworks-demo-poster.jpg" aria-label="AgentWorks 60-second demo: an agent working toward the goal of booking more sales demos">
            <source src="/assets/video/agentworks-demo.mp4" type="video/mp4" />
          </video>
          <figcaption>60-second demo: an agent with the goal "Book more sales demos". Illustrative data.</figcaption>
        </figure>
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

    <section class="section" id="layers">
      <div class="wrap">
        <div class="section-head center reveal">
          <p class="kicker">Under the hood</p>
          <h2>Three layers, <span class="dim">built to run for months.</span></h2>
        </div>
        <ol class="layer-stack reveal" aria-label="The three layers">
          <li><a href="#layer-workflow"><span>3</span><b>Workflows &amp; goals</b><small>Pipelines of deterministic and agentic steps, learnings and a knowledge base, measured against a goal</small></a></li>
          <li><a href="#crew"><span>2</span><b>Crews</b><small>An agent with skills, memory, a browser, Slack and WhatsApp, triggers, and calls to other crews</small></a></li>
          <li><a href="#engine-agent"><span>1</span><b>Agents</b><small>Vendor-native Claude Code, Codex, Cursor, Pi and Muse in live terminals, with your MCP tools, inside a sandbox</small></a></li>
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

{LAYER["layer-workflow"]}
    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Start from a playbook</p>
          <h2>{_T.N_GOALS} Goal playbooks, <span class="dim">ready to install.</span></h2>
          <p class="lede">Sales follow-up, invoice chasing, support replies, SEO, store operations and more. Each sets up the goal, the metric, the tools and the approvals, and you tune it to your business.</p>
        </div>
        <p class="center-row"><a class="btn btn-ghost" href="/agents/">Browse Goal playbooks</a></p>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">How it works, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_GOALS)}
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
GOALS_LD={"@type":"WebPage","name":"AgentWorks Goals","url":"https://agentworkshq.com/goals/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['goals/index.html']=head('AgentWorks Goals - AI Agents That Work Until They Hit Your Number','Give an AI agent a goal and a metric. AgentWorks plans the work, runs it on schedule, measures every run and improves its own plan until the number hits your target.','/goals/',og='agentworks-product-og.jpg',extra_ld=ld(GOALS_LD,BC('Goals','/goals/'),faq_ld(FAQ_GOALS),DEMO_VIDEO_LD))+header('product')+goals_body+footer()
