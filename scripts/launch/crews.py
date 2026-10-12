# /crews/: Crews in depth. One page for both uses of a Crew: a teammate you talk to, and an expert your team asks.
from uc_data import USECASES as _UC
_XC=next(u for u in _UC if u['slug']=='expert-crews')
import html as _hc
_share_steps=''.join(f'<li><h3>{t}</h3><p>{d}</p></li>' for t,d in [
 ('Experts build it','The team that knows the subject sets up the Crew.'),
 ('Offer clear asks','Free-text questions, or typed functions like <code>diagnose_service(name)</code>.'),
 ('Share it','Give people access with scoped tokens.'),
 ('Ask from any tool','Claude, ChatGPT, Cursor, Codex or the terminal.')])
_examples=''.join(f'<li>{_hc.escape(p)}</li>' for p in _XC['playbooks'])
FAQ_CREWS=[
 ("What is a Crew, exactly?","An AI agent set up as a long-lived specialist: one of the native agents (Claude Code, Codex, Cursor, Pi or Muse) with its own skills, memory, connected tools, browser and workspace. It keeps working on the same job and remembers what it learned."),
 ("How is a Crew different from a skill file?","A skill is instructions you copy into your own AI. A Crew is the whole expert: the agent, its skills, the tools it can check and the functions it offers. Owners update it once and everyone gets the new version."),
 ("Can I use a Crew without setting up a Goal?","Yes. A Crew works on its own. Talk to it in the app, in Slack or WhatsApp, or ask it from an MCP client. Goals can also hand steps to a Crew when you want both."),
]+[tuple(q) for q in _XC['faq']]+[
 ("Can Crews work with each other?","Yes. A Crew can ask another Crew a question or call one of its functions, each in its own private thread, subject to the access you grant."),
]
crews_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Crews</p>
        <h1>Build an expert once. <span class="dim">Your whole team can ask it.</span></h1>
        <p class="lede">A Crew is an AI agent with your team's skills, tools and memory. Talk to it in Slack or WhatsApp like a teammate, or share it as an expert anyone can ask from Claude, ChatGPT, Cursor, the terminal, or your own agents.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#share">How sharing works</a>
        </div>
      </div>
    </section>

    <section class="section-tight" id="skills">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Not just a skill</p>
          <h2>A skill tells an AI how. <span class="dim">A Crew does it.</span></h2>
          <p class="lede">People already share skills: instructions you copy into your own AI. A Crew shares the whole expert instead, set up once by the team that knows the subject.</p>
        </div>
        <div class="equation reveal" aria-label="What a Crew is made of">
          <div class="eq-part"><small>Agent</small><b>Does the work</b><span>Claude Code, Codex or Cursor</span></div>
          <i aria-hidden="true">+</i>
          <div class="eq-part"><small>Skills</small><b>Knows how</b><span>Your runbooks and how-tos</span></div>
          <i aria-hidden="true">+</i>
          <div class="eq-part"><small>Integrations</small><b>Can check</b><span>Dashboards, database, Slack</span></div>
          <i aria-hidden="true">+</i>
          <div class="eq-part"><small>Functions</small><b>Clear asks</b><span><code>diagnose_service(name)</code></span></div>
          <i aria-hidden="true">=</i>
          <div class="eq-part eq-result"><small>Crew</small><b>DevOps expert</b><span>Shared with your team</span></div>
        </div>
        <div class="goal-pair">
          <div class="goal-spec reveal" aria-label="A shared skill compared with a Crew">
            <p class="goal-spec-label">Why not just share a skill?</p>
            <table class="vs">
              <thead><tr><th></th><th>Shared skill</th><th>Crew</th></tr></thead>
              <tbody>
                <tr><th>Copies</th><td>Everyone installs their own</td><td>One live expert, asked by all</td></tr>
                <tr><th>Updates</th><td>Goes stale on each laptop</td><td>Owners update once, for everyone</td></tr>
                <tr><th>Your systems</th><td>Instructions only</td><td>Connected tools it can check</td></tr>
                <tr><th>Memory</th><td>Forgets between chats</td><td>Keeps your team's knowledge</td></tr>
                <tr><th>Control</th><td>Each person's own access</td><td>Scoped access, every call logged</td></tr>
              </tbody>
            </table>
          </div>
          <div class="explainer ask-demo reveal" aria-hidden="true">
            <p class="explainer-title"><span>In Claude</span><span>Asking the DevOps expert</span></p>
            <p class="ask-msg you">Why is the orders API slow in eu-west since this morning?</p>
            <p class="ask-tool">Called <b>devops-expert · diagnose_service</b> through AgentWorks</p>
            <p class="ask-msg them"><b>DevOps expert</b> p95 latency jumped after the 09:40 deploy of orders-service. The database read replica is 40 seconds behind, so reads fall back to the primary. Rolling back is the fastest fix. I've drafted the rollback for your approval.</p>
          </div>
        </div>
        <p class="muted center-row">Illustrative conversation.</p>
      </div>
    </section>

    <section class="section" id="ways">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Use cases</p>
          <h2>One Crew. <span class="dim">Wherever the work is. Illustrative examples.</span></h2>
        </div>
        <ul class="ucx-grid">
{chr(10).join([
 uc_chat("A teammate in Slack",("user","Support lead"),("slack","Support Crew"),"Summarise today's angry tickets.","Five tickets, three about late refunds. Replies are drafted for you."),
 uc_chat("An expert on WhatsApp",("user","Founder"),("whatsapp","Finance Crew"),"Who hasn't paid this month?","Four customers. Reminders are ready for your OK."),
 uc_chat("Asked from Cursor",("cursor","Developer"),("crew","API Crew"),"How do I call the billing API safely?","Use an idempotency key. Example attached.",via="Called <b>api-crew · ask</b> through AgentWorks"),
 uc_chat("From the terminal",("term","agentworks crews ask"),("crew","Legal Crew"),"Is clause 7 in this contract OK?","It conflicts with our standard terms. Suggested edit attached."),
 uc_chat("Inside a Goal",("goal","Sales goal"),("crew","Writer Crew"),"Write the first email for this lead.","Draft ready, in your tone."),
 uc_chat("Crew to Crew",("crew","Support Crew"),("crew","DevOps Crew"),"Is checkout down?","Slow since the 09:40 deploy. Rollback in progress."),
 ])}
        </ul>
        <div class="connect-row center-row" aria-label="Where you can reach a Crew">
          <span class="chip">{tool("slack")}Slack</span>
          <span class="chip">{tool("whatsapp")}WhatsApp</span>
          <span class="chip">{logo("claude")}Claude</span>
          <span class="chip">{logo("openai")}ChatGPT</span>
          <span class="chip">{logo("cursor")}Cursor</span>
          <span class="chip">{tool("modelcontextprotocol")}Any MCP client</span>
          <span class="chip"><span class="mono-logo" aria-hidden="true">&gt;_</span>Terminal</span>
        </div>
      </div>
    </section>

{LAYER["crew"].replace('<p class="kicker sky">Layer 2 · Crews</p>','<p class="kicker sky">Inside a Crew</p>')}
    <section class="section" id="share">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How sharing works</p>
          <h2>Built once by the experts. <span class="dim">Used by everyone.</span></h2>
        </div>
        <ol class="loop reveal">{_share_steps}</ol>
        {uc_pills(['Scoped access per person and Crew','Owner chats stay private','Every call logged'])}
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Crews, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_CREWS)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Pick one expert to share first. <span class="dim">See it answer in week one.</span></h2>
        <p>We build your first Crew with the team that owns the knowledge, then connect it to the tools your people already use.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="{INSTALL}">Download free app</a>
        </div>
      </div>
    </section>
  </main>
'''
CREWS_LD={"@type":"WebPage","name":"AgentWorks Crews","url":"https://agentworkshq.com/crews/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['crews/index.html']=head('AgentWorks Crews - Build an Expert AI Agent Once, Share It With Your Team','Crews are AI agents with your skills, tools and memory. Talk to one in Slack or WhatsApp, or share it as an expert anyone asks from Claude, ChatGPT, Cursor, the terminal, or their own agents.','/crews/',og='agentworks-product-og.jpg',extra_ld=ld(CREWS_LD,BC('Crews','/crews/'),faq_ld(FAQ_CREWS)))+header('product')+crews_body+footer()
