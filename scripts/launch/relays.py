# Relays: a fixed chain of agents you design once and run from anywhere.
FAQ_RELAYS=[
 ("How do I publish a new version?","Edit the draft in the Relay Builder and publish. Each publish freezes a numbered version behind the same endpoint, so callers can pin a version or follow the latest."),
 ("How is a Relay different from a Workflow?","A Workflow owns a goal: it plans, measures and changes its own steps until the metric moves. A Relay is fixed. It runs the same steps in the same order every time, which is what you want behind a website form or another system."),
 ("What can a step be?","An agent step with its own system prompt and message, a condition that decides which step runs next, or a script step for exact work like formatting data or calling an API. Steps pass their output to the next one."),
 ("How do other systems run a Relay?","Each deployed Relay gets a trigger: an authenticated API endpoint or webhook. Your website, CRM, backend or no-code tool sends the input and gets the result back, or a callback when it finishes."),
 ("Which models run the agent steps?","The same AI plans you connect to AgentWorks, such as Claude, ChatGPT, Gemini or Cursor. You can choose a different one per step."),
]

body=f'''  <main id="main">
    <section class="page-hero left">
      <div class="wrap">
        <p class="kicker">Relays</p>
        <h1>A fixed relay of agents. <span class="dim">Run it from anywhere.</span></h1>
        <p class="lede">Some jobs don't need an agent that plans. They need the same few steps, done well, every time: read the enquiry, decide what it is, look something up, write the reply. Relays let you chain agents, decisions and small scripts into one simple sequence, then call it from your website, your CRM or any other system.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/docs/relay/">Read the Relay docs</a>
          <a class="btn btn-ghost" href="#how">See how it works</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="plan reveal" aria-label="Example relay">
          <div class="plan-head"><b>Website enquiry → qualified reply</b><span class="tag tag-soon">Example</span></div>
          <div class="pipe">
            <p class="pipe-name">Trigger · Contact form on your website</p>
            <ol>
              <li class="st agent"><small>Agent</small><b>Classify the enquiry</b><em>sales, support or partner</em></li>
              <li class="st cond"><small>Condition</small><b>Is it a sales lead?</b><em>yes → next · no → support relay</em></li>
              <li class="st det"><small>Script</small><b>Look up the company</b><em>CRM API call</em></li>
              <li class="st agent"><small>Agent</small><b>Draft the reply</b><em>your tone, with pricing</em></li>
              <li class="st det"><small>Script</small><b>Send to your CRM</b><em>returns the result</em></li>
            </ol>
          </div>
          <div class="plan-foot"><span><i class="lg agent"></i>Agent step: system prompt + message</span><span><i class="lg cond"></i>Condition</span><span><i class="lg det"></i>Script step</span></div>
        </div>
      </div>
    </section>

    <section class="section" id="how">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How it works</p>
          <h2>Design it once. <span class="dim">Call it from anything.</span></h2>
        </div>
        <ol class="loop reveal">
          <li><h2>Chain the steps</h2><p>Add agent steps, each with its own system prompt, message and model. Add conditions for decisions, and script steps where exact code is better.</p></li>
          <li><h2>Test with real input</h2><p>Run it on sample inputs and see every step's output before anything goes live.</p></li>
          <li><h2>Deploy a trigger</h2><p>Each Relay gets an authenticated API endpoint or webhook, versioned so a change never breaks callers.</p></li>
          <li><h2>Run it anywhere</h2><p>Your website, CRM, backend or no-code tool calls it. Every run is logged with its inputs, outputs and cost.</p></li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Where Relays fit</p>
          <h2>Three ways to put agents to work.</h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Relays</h3><p>A fixed chain you call from outside. Same steps every time, predictable cost, an answer back in seconds or minutes.</p></li>
          <li class="reveal"><h3><a href="/goals/">Workflows with a goal</a></h3><p>Own an outcome like "5 demos a week". Plan, run on schedule, measure and improve the plan until the number moves.</p></li>
          <li class="reveal"><h3><a href="/crews/">Crew</a></h3><p>Always-on teammates you talk to in chat, Slack or WhatsApp, with memory, skills and their own tools.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Ideas</p>
          <h2>Relays teams are asking for.</h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Website enquiry to qualified reply</h3><p>Classify, enrich from your CRM, draft a reply, and log the lead.</p></li>
          <li class="reveal"><h3>Support ticket triage</h3><p>Summarize, find the answer in your help docs, and route what it can't answer.</p></li>
          <li class="reveal"><h3>Document intake</h3><p>Extract fields from an invoice or form, validate them with a script, and flag what needs a person.</p></li>
          <li class="reveal"><h3>Content checks</h3><p>Check a draft against your style and claims rules before it's published.</p></li>
          <li class="reveal"><h3>Order exceptions</h3><p>Read the order, decide the case, and prepare the customer update.</p></li>
          <li class="reveal"><h3>Your own chain</h3><p>Any few steps you repeat today, turned into one call.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Questions, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_RELAYS)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Have a chain in mind? <span class="dim">Build it with us first.</span></h2>
        <p>We are opening Relays to a small group of early users. Tell us the steps you repeat, and we will set up your first Relay with you.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Get early access</a>
          <a class="btn btn-ghost" href="/product/">How AgentWorks works</a>
        </div>
      </div>
    </section>
  </main>
'''
RELAYS_LD={"@type":"WebPage","name":"AgentWorks Relays","url":"https://agentworkshq.com/relays/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['relays/index.html']=head('AgentWorks Relays - Chain AI Agents and Run Them From Anywhere','Chain agent steps, conditions and scripts into one fixed Relay, then call it from your website, CRM or any system through an API endpoint or webhook.','/relays/',extra_ld=ld(RELAYS_LD,BC('Relays','/relays/'),faq_ld(FAQ_RELAYS)))+header('product')+body+footer()
