# Flows: a fixed chain of agents you design once and run from anywhere.
FAQ_RELAYS=[
 ("How do I publish a new version?","Edit the draft in the Flow Builder and publish. Each publish freezes a numbered version behind the same endpoint, so callers can pin a version or follow the latest."),
 ("How is a Flow different from a Goal?","A Goal works toward a number: it plans, measures and adjusts its own steps, and shows whether the metric moves. A Flow is fixed. It runs the same steps in the same order every time, which is what you want behind a website form or another system."),
 ("What can a step be?","An agent step with its own system prompt and message, a classifier that sorts the input into the categories you name, a condition that decides which step runs next, or a script step for exact work like formatting data or calling an API. Steps pass their output to the next one."),
 ("How does a Flow send a request the right way?","Add a classifier step. You list the categories, such as billing, support or sales, with a line on what belongs in each, and the Flow sends each request to that category's branch. The diagram shows which way every run went."),
 ("Who can run a Flow I share?","Anyone you share it with opens its dashboard and can ask it questions or run the published version. Only you change the steps."),
 ("How do other systems run a Flow?","Each deployed Flow gets a trigger: an authenticated API endpoint or webhook. Your website, CRM, backend or no-code tool sends the input and gets the result back, or a callback when it finishes."),
 ("Which models run the agent steps?","The same AI plans you connect to AgentWorks, such as Claude, ChatGPT, Gemini or Cursor. You can choose a different one per step."),
]

body=f'''  <main id="main">
    <section class="page-hero left">
      <div class="wrap">
        <p class="kicker">Flows <span class="tag">Enterprise</span></p>
        <h1>The same steps, every time. <span class="dim">Run them from anywhere.</span></h1>
        <p class="lede">Some jobs don't need an agent that plans. They need the same few steps, done well, every time: read the enquiry, decide what it is, look something up, write the reply. Flows let you chain agents, decisions and small scripts into one simple sequence, then call it from your website, your CRM or any other system. Share it, and your team runs it from its dashboard.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/docs/guides/publish-relay/">Read the Flow guide</a>
          <a class="btn btn-ghost" href="#how">See how it works</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="plan reveal" aria-label="Example flow">
          <div class="plan-head"><b>Website enquiry → qualified reply</b><span class="tag tag-soon">Example</span></div>
          <div class="pipe">
            <p class="pipe-name">Trigger · Contact form on your website</p>
            <ol>
              <li class="st cond"><small>Classifier</small><b>Sort the enquiry</b><em>sales → next · support or partner → their own agent</em></li>
              <li class="st det"><small>Script</small><b>Look up the company</b><em>CRM API call</em></li>
              <li class="st agent"><small>Agent</small><b>Draft the reply</b><em>your tone, with pricing</em></li>
              <li class="st det"><small>Script</small><b>Send to your CRM</b><em>returns the result</em></li>
            </ol>
          </div>
          <div class="plan-foot"><span><i class="lg agent"></i>Agent step: system prompt + message</span><span><i class="lg cond"></i>Classifier or condition: picks the next step</span><span><i class="lg det"></i>Script step</span></div>
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
          <li><h2>Chain the steps</h2><p>Agent steps, classifiers, conditions and small scripts.</p></li>
          <li><h2>Test with real input</h2><p>See every step's output, and the exact path each run took on the diagram.</p></li>
          <li><h2>Deploy a trigger</h2><p>Get a versioned API endpoint or webhook.</p></li>
          <li><h2>Run it anywhere</h2><p>Call it from your site, CRM or backend, or share its dashboard with your team. Every run is logged.</p></li>
        </ol>
      </div>
    </section>

{uc_section([
 uc_pipe("Website enquiry",("web","Contact form"),[("cond","Classifier: sales, support or partner"),("det","Look up the company in your CRM"),("agent","Draft the reply in your tone")],"Reply sent, lead logged"),
 uc_pipe("Support triage",("mail","New ticket"),[("cond","Classifier: billing, bug, account or other"),("agent","That area's agent finds the answer in your help docs"),("cond","Found an answer?")],"Answered, or routed to a person"),
 uc_pipe("Invoice intake",("mail","Invoice by email"),[("agent","Extract supplier, amount and due date"),("det","Check the totals add up"),("cond","Anything off?")],"Booked, or flagged for review"),
 uc_pipe("Content check",("web","New blog draft"),[("agent","Check it against your style guide"),("agent","Check every claim has a source")],"Approved, or edits suggested"),
 uc_pipe("Order exception",("shopify","Store webhook"),[("agent","Decide what went wrong"),("det","Update the order")],"Customer update prepared"),
 uc_pipe("Call notes to CRM",("user","Call transcript"),[("agent","Summarise and pull next steps"),("det","Write them to the CRM")],"Notes and follow-ups logged"),
], h2='Same steps, every time.', dim='Illustrative examples.')}

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
        <p>We are opening Flows to a small group of early users. Tell us the steps you repeat, and we will set up your first Flow with you.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Get early access</a>
          <a class="btn btn-ghost" href="/product/">How AgentWorks works</a>
        </div>
      </div>
    </section>
  </main>
'''
RELAYS_LD={"@type":"WebPage","name":"AgentWorks Flows","url":"https://agentworkshq.com/flows/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['flows/index.html']=head('AgentWorks Flows - Chain AI Agents and Run Them From Anywhere','Chain agent steps, conditions and scripts into one fixed Flow, then call it from your website, CRM or any system through an API endpoint or webhook.','/flows/',extra_ld=ld(RELAYS_LD,BC('Flows','/flows/'),faq_ld(FAQ_RELAYS)))+header('product')+body+footer()
