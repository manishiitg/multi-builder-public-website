# /harness-engineering/: AgentWorks as the company's agent harness. Every claim maps to a shipped product
# part; the honest limits are in the FAQ. Keep "Pulse" and own-workspace numbers out (public copy rules).
HARNESS_PARTS=[
  ('Instructions and context','What the agent is told and what it can look up: its job, the rules, the know-how, and what happened last time.','Project and per-agent instructions, skills, shared company knowledge in Brain, and memory that carries from one run to the next.','/brain/','Brain'),
  ('Tools','What the agent can act with, and how each tool explains itself so the agent uses it correctly.','MCP servers, a browser, files, the database, Gmail, Slack and WhatsApp, granted per group through Vault.','/vault/','Vault'),
  ('The work loop','How the work runs: which steps need judgment, which are the same every time, and what starts them.','Goal steps (agent steps for judgment, scripted steps for known work), Crews you can ask any time, schedules and condition triggers.','/goals/','Goals'),
  ('Guardrails','What the agent may touch, and what waits for a person.','Access per group, secrets that reach work only as environment variables, step-level file access, and people approving the steps that matter.','/vault/','Vault'),
  ('Checks','How you know a run did its job, not just that it finished.','Output checks on every step, a goal with a number and a target, and a review of every run against them.','/goals/','Goals'),
  ('Records','The evidence: what was asked, what the agent did, what it cost and who approved it.','Every run recorded with its steps, results, cost and the person who asked or approved, visible to the people the work is shared with.','/product/','Product'),
]
HARNESS_FAQ=[
  ("What is harness engineering?","An AI agent is a model plus a harness: the instructions, tools, work loop, guardrails, checks and records around the model. Harness engineering is designing that layer so the agent does the job reliably, not just once in a demo."),
  ("Is AgentWorks an agent harness?","Yes, for a company. It runs on the coding agents and AI plans your people already use (Claude Code, Codex, Cursor and others) and adds the shared parts: company knowledge, granted tools and secrets, approvals, checks and a record of every run. It connects those agents rather than replacing them."),
  ("Do I need an engineer to do harness engineering on AgentWorks?","No. You describe the change to the Builder in plain words and it updates the steps, instructions and checks, with every change logged. Developers can make the same changes over MCP from their own coding agent."),
  ("How is this different from building an agent on my laptop?","On a laptop the harness belongs to one person: it runs when their laptop is on, uses their keys and leaves no shared record. On AgentWorks the same agent runs on a schedule or when someone asks, the team uses it from Slack, WhatsApp, a dashboard or their own AI, and every run is recorded."),
  ("Which AI models does it use?","It runs on the Claude, ChatGPT, Gemini or Cursor plan the company already pays for. The harness stays the same when you change the model."),
  ("Can I compare two versions of a harness?","Not with a built-in A/B switch yet. You can try a change, compare the measured results of runs before and after, and see exactly what changed in the plan's change log."),
]
_parts_rows='\n'.join(f'''            <tr><th scope="row">{n}</th><td>{w}</td><td>{a} <a href="{h}">{l} &rarr;</a></td></tr>''' for n,w,a,h,l in HARNESS_PARTS)
harness_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Harness engineering</p>
        <h1>Harness engineering for your company. <span class="dim">Not one agent on one laptop.</span></h1>
        <p class="lede">An AI agent is a model plus a harness: the instructions, tools, checks and records around it. The model decides how well it can think. The harness decides whether it does the job every day. AgentWorks is where your company builds, shares and improves that harness, so the agents your people already use work the same way for everyone.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="{DEMO}" target="_blank" rel="noreferrer">Try the demo</a>
        </div>
      </div>
    </section>

    <section class="section-tight" id="parts">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">The six parts</p>
          <h2>Every part of a harness. <span class="dim">Already in one place.</span></h2>
          <p class="lede">Most agent failures today are not the model. They are a missing tool, an unclear instruction, no check on the result, or no record of what happened. These are the parts that prevent them, and where each one lives in AgentWorks.</p>
        </div>
        <figure class="harness-figure reveal"><img src="/assets/blog/harness-engineering-explained/six-parts-ring.webp" alt="A model in the centre with six parts around it: instructions and context, tools, work loop, guardrails, checks and records" width="1600" height="900" loading="lazy"></figure>
        <div class="harness-table reveal">
          <table>
            <thead><tr><th scope="col">Part</th><th scope="col">What it is</th><th scope="col">In AgentWorks</th></tr></thead>
            <tbody>
{_parts_rows}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="section-tight" id="company">
      <div class="wrap">
        <div class="section-head center reveal">
          <p class="kicker">One person or the whole company</p>
          <h2>Most harness engineering stops at one laptop. <span class="dim">Yours doesn't have to.</span></h2>
          <p class="lede">Claude Code, Codex and Cursor are excellent harnesses for one person. AgentWorks is the shared one for the company, built around the agents your people already use.</p>
        </div>
        <div class="online-pair">
          <div class="online-col before reveal">
            <p class="online-h">One engineer's harness</p>
            <ul>
              <li>Instructions and skills live in one person's folders</li>
              <li>Tools and keys sit on their machine</li>
              <li>It runs when they start it</li>
              <li>Checks are whatever they remember to do</li>
              <li>No shared record of runs or cost</li>
            </ul>
          </div>
          <div class="online-col after reveal">
            <p class="online-h">Your company's harness on AgentWorks</p>
            <ul>
              <li>Instructions, skills and knowledge shared in one place</li>
              <li>Tools and secrets granted per group, never copied around</li>
              <li>Runs on a schedule, on a trigger, or when anyone asks</li>
              <li>Every step checked, every goal measured against its target</li>
              <li>Every run recorded: steps, result, cost and who approved</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section-tight" id="example">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Example</p>
          <h2>A refund review, seen as a harness. <span class="dim">Illustrative.</span></h2>
        </div>
        <ol class="online-steps harness-steps reveal">
          <li><b>Script pulls yesterday's refund requests</b><span>A tool call with no AI in the loop: the same result every time, checked before the next step starts.</span></li>
          <li><b>An agent checks each one against the order</b><span>Its instructions and the refund policy skill tell it what a valid request looks like.</span></li>
          <li><b>A rule in code flags anything over $200</b><span>A guardrail that does not depend on the agent remembering it.</span></li>
          <li><b>A person approves the big ones</b><span>In Slack or WhatsApp, with the agent's reasoning attached.</span></li>
          <li><b>Script issues the refunds and records the run</b><span>Every refund, approval and cost lands in the run record, and the goal tracks how fast refunds close.</span></li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">FAQ</p>
          <h2>Questions, answered.</h2>
        </div>
        <div class="faq reveal">
          {faq(HARNESS_FAQ)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Bring the agents you already use. <span class="dim">We'll build the company harness around them.</span></h2>
        <p>Book a short call and we'll scope it around one of your processes.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/blog/">Read the blog</a>
        </div>
      </div>
    </section>
  </main>
'''
pages['harness-engineering/index.html']=head('Harness Engineering for Your Company - AgentWorks','An AI agent is a model plus a harness: instructions, tools, checks and records. AgentWorks is the shared agent harness for your company, built around the Claude Code, Codex and Cursor agents your people already use.','/harness-engineering/',extra_ld=ld(faq_ld(HARNESS_FAQ),BC('Harness engineering','/harness-engineering/')))+header()+harness_body+footer()
SITEMAP_EXTRA=[('/harness-engineering/','2026-10-26')]
