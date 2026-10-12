# /goals/: the Goals product in depth (goal, metric, measure, auto-improve, autonomy, the plan).
FAQ_GOALS=[FAQ_HOME[0]]+[q for q in FAQ_PRODUCT if not q[0].startswith("What's the difference")]+[
 ("What's the difference between a Goal and a Crew?","A Goal owns an outcome and keeps working on its own schedule. A Crew is an expert you or your team ask for help, in Slack, WhatsApp or from Claude and ChatGPT. Goals can hand steps to Crews."),
]
goals_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Goals</p>
        <h1>One goal. One metric. <span class="dim">An agent that doesn't stop at done.</span></h1>
        <p class="lede">Most AI automation finishes a task and waits for the next prompt. Goals puts an agent inside your process with a target to work toward. It plans its part of the work, runs it on schedule, measures every run and adjusts its plan, so you can see what is moving the metric. Your team stays in charge of the goal.</p>
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

{uc_section([
 uc_goal("Book more demos","Sales team","Demos booked per week","7","2","w-100","answers new signups within 10 minutes.","Target met"),
 uc_goal("Get paid on time","Finance team","Overdue invoices","8%","14%","w-62","sends polite reminders and escalates after the third."),
 uc_goal("Answer faster","Support team","First reply time","15 min","4 hours","w-88","drafts replies from your help docs for an agent to send."),
 uc_goal("Grow search traffic","Marketing team","Organic clicks per week","+30%","last quarter","w-45","refreshes the pages that lost their ranking."),
 uc_goal("Win back carts","Store team","Abandoned carts recovered","11%","4%","w-62","sends the reminder at the hour each buyer usually shops."),
 uc_goal("Calm down CI","Platform team","Flaky tests in CI","3","19","w-88","fixes the flakiest tests first and checks they stay green."),
], h2='One goal per team.', dim='Illustrative numbers.')}
    <section class="section" id="goals">
      <div class="wrap">
        <div class="feature">
          <div class="reveal">
            <p class="kicker">Goals</p>
            <h2>Say what you want. <span class="dim">Pick the number that proves it.</span></h2>
            <p class="lede">A goal is the outcome, a primary metric with a target, a few supporting metrics, and the rules that must stay true while the agent works. Describe it in chat and AgentWorks sets it up with you.</p>
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

    <section class="section" id="improve">
      <div class="wrap">
        <div class="feature">
          <div class="reveal">
            <p class="kicker">Auto-improve</p>
            <h2>It finds what would move the goal. <span class="dim">Then it does it.</span></h2>
            <p class="lede">After runs, AgentWorks reviews the evidence against your goal. It repairs broken steps, drops ideas that didn't work, does the work nobody was doing, and comes back later to check whether it helped.</p>
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
          <a class="btn btn-ghost" href="{INSTALL}">Download the app</a>
        </div>
      </div>
    </section>
  </main>
'''
GOALS_LD={"@type":"WebPage","name":"AgentWorks Goals","url":"https://agentworkshq.com/goals/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['goals/index.html']=head('AgentWorks Goals - AI Agents That Work Toward Your Number and Measure It','Give an AI agent a goal and a metric. Goals plans its part of the work, runs it on schedule, measures every run and adjusts its plan, so you can see what moves your number.','/goals/',og='agentworks-product-og.jpg',extra_ld=ld(GOALS_LD,BC('Goals','/goals/'),faq_ld(FAQ_GOALS),DEMO_VIDEO_LD))+header('product')+goals_body+footer()
