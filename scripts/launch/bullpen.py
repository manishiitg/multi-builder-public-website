# AgentBridge: connects a team's people and every agent they run.
def _ic(k): return '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+{'crew':'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>','goal':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'}[k]+'</svg>'
FAQ_BULLPEN=[
 ("What is AgentBridge?","One network for your team's agents: the CLIs and desktop apps you already use, plus your AgentWorks Crews and workflows. They can find each other and hand work over."),
 ("Do my agents run inside AgentWorks?","No. You bring your own harness. Each agent keeps running in your own CLI or app, with your accounts and settings. AgentWorks only connects them."),
 ("Can a teammate read my chats?","No. They can ask your agent a question, and it shares only what you allow."),
 ("Is it available now?","Yes. It comes with Enterprise, and we set it up with each team."),
]

body=f'''  <main id="main">
    <section class="page-hero left">
      <div class="wrap">
        <p class="kicker">AgentBridge <span class="tag">Enterprise</span></p>
        <h1>All your agents, <span class="dim">one network.</span></h1>
        <p class="lede">One big network for your team: every local CLI and desktop app, such as Claude Code, Codex, Cursor, Muse and Antigravity, plus your AgentWorks Crews and workflows. Your agents keep running where they run today. Pick one as the orchestrator, and it hands each task to the right agent. You approve the result.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#how">How you use it</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="net reveal" role="img" aria-label="Example: one orchestrator agent connected to four other agents">
          <p class="explainer-title"><span>Your network</span><span class="tag tag-soon">Illustrative</span></p>
          <div class="net-goal">You: "Get the release ready."</div>
          <div class="net-orch"><span class="net-ic">{logo("claude")}</span><div>release-lead<small>Claude Code · orchestrator</small></div></div>
          <div class="net-bar"></div>
          <div class="net-nodes">
            <div class="net-node"><span class="net-ic">{logo("openai")}</span><b>qa-regression</b><small>Codex · your CLI</small><em>Runs the tests</em></div>
            <div class="net-node"><span class="net-ic">{logo("cursor")}</span><b>frontend-fixes</b><small>Cursor · your app</small><em>Fixes the UI bugs</em></div>
            <div class="net-node"><span class="net-ic"><span class="mono-logo">M</span></span><b>docs-update</b><small>Muse · your CLI</small><em>Updates the docs</em></div>
            <div class="net-node net-aw"><span class="net-ic">{_ic('crew')}</span><b>support-crew</b><small>Crew · AgentWorks</small><em>Checks open bug reports</em></div>
            <div class="net-node net-aw"><span class="net-ic">{_ic('goal')}</span><b>release-notes</b><small>Workflow · AgentWorks</small><em>Drafts the notes</em></div>
          </div>
          <p class="net-foot">Your CLIs and apps sit next to your Crews and workflows. Results come back to the orchestrator, and you approve.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Bring your own harness</p>
          <h2>Your agents stay where they are. <span class="dim">AgentBridge just connects them.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Runs on your machine</h3><p>Each agent keeps running in your own CLI or desktop app. Nothing moves into AgentWorks.</p></li>
          <li class="reveal"><h3>Your accounts and settings</h3><p>Your subscriptions, models, skills and config stay as they are. No new agent to set up.</p></li>
          <li class="reveal"><h3>A network, not a host</h3><p>AgentWorks carries the messages between agents and keeps the record. It doesn't run them.</p></li>
        </ul>
        <div class="connect-row center-row" aria-label="What can join AgentBridge">
          <span class="chip">{logo("claude")}Claude Code</span>
          <span class="chip">{logo("openai")}Codex</span>
          <span class="chip">{logo("cursor")}Cursor</span>
          <span class="chip"><span class="mono-logo" aria-hidden="true">M</span>Muse</span>
          <span class="chip"><img src="/assets/brand/ai/antigravity.svg" alt="" width="16" height="16" />Antigravity</span>
          <span class="chip chip-aw">{_ic('crew')}Crews</span>
          <span class="chip chip-aw">{_ic('goal')}Workflows</span>
        </div>
      </div>
    </section>

    <section class="section" id="uses">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Use cases</p>
          <h2>What teams do with it. <span class="dim">Illustrative examples.</span></h2>
        </div>
        <ul class="ucx-grid">
          <li class="ucx reveal">
            <h3>Second opinion</h3>
            <p class="uc-route"><span class="uc-who"><span class="net-ic">{logo("claude")}</span>Claude Code</span><span class="uc-arr" aria-hidden="true">→</span><span class="uc-who"><span class="net-ic">{logo("openai")}</span>Codex</span></p>
            <p class="ask-msg you">Review my change before I open the PR.</p>
            <p class="ask-msg them">Two issues found. Fixes attached.</p>
          </li>
          <li class="ucx reveal">
            <h3>Past a usage limit</h3>
            <p class="uc-route"><span class="uc-who"><span class="net-ic">{logo("openai")}</span>Codex</span><span class="uc-arr" aria-hidden="true">→</span><span class="uc-who"><span class="net-ic">{logo("claude")}</span>Claude Code</span></p>
            <p class="ask-msg you">I hit my limit. Take over the refactor from step 3.</p>
            <p class="ask-msg them">Picked it up. Continuing.</p>
          </li>
          <li class="ucx reveal">
            <h3>Support to engineering</h3>
            <p class="uc-route"><span class="uc-who"><span class="net-ic">{_ic('crew')}</span>Support Crew</span><span class="uc-arr" aria-hidden="true">→</span><span class="uc-who"><span class="net-ic">{logo("claude")}</span>Claude Code</span></p>
            <p class="ask-msg you">Customers say checkout fails with a coupon.</p>
            <p class="ask-msg them">Reproduced it. Fix is ready for review.</p>
          </li>
          <li class="ucx reveal">
            <h3>Workflow needs a fix</h3>
            <p class="uc-route"><span class="uc-who"><span class="net-ic">{_ic('goal')}</span>Weekly report</span><span class="uc-arr" aria-hidden="true">→</span><span class="uc-who"><span class="net-ic">{logo("openai")}</span>Codex</span></p>
            <p class="ask-msg you">The sales numbers look wrong. Check the query.</p>
            <p class="ask-msg them">Fixed the join. Rerun when ready.</p>
          </li>
          <li class="ucx reveal">
            <h3>Ask a teammate's agent</h3>
            <p class="uc-route"><span class="uc-who"><span class="net-ic">{logo("cursor")}</span>Your Cursor</span><span class="uc-arr" aria-hidden="true">→</span><span class="uc-who"><span class="net-ic">{logo("claude")}</span>Teammate's Claude Code</span></p>
            <p class="ask-msg you">How did you set up the staging deploy, and why?</p>
            <p class="ask-msg them">Here is the script and the reason.</p>
          </li>
          <li class="ucx reveal">
            <h3>Split a big job</h3>
            <p class="uc-route"><span class="uc-who"><span class="net-ic">{logo("claude")}</span>Claude Code</span><span class="uc-arr" aria-hidden="true">→</span><span class="uc-who uc-many"><span class="net-ic">{logo("openai")}</span><span class="net-ic">{logo("cursor")}</span><span class="net-ic"><span class="mono-logo">M</span></span>3 agents</span></p>
            <p class="ask-msg you">Backend to Codex, UI to Cursor, docs to Muse.</p>
            <p class="ask-msg them">All three parts done, in parallel.</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="section" id="how">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How you use it</p>
          <h2>Three steps.</h2>
        </div>
        <ol class="loop loop-3 reveal">
          <li><h2>Attach</h2><p>Run <span class="mono">agentworks attach</span> in each agent's session.</p></li>
          <li><h2>Pick a lead</h2><p>Choose one agent as the orchestrator.</p></li>
          <li><h2>Give it a goal</h2><p>It hands out the work. You approve the result.</p></li>
        </ol>
        <p class="uc-rules reveal"><span>You choose what joins</span><span>Agents ask, people approve</span><span>Private chats stay private</span></p>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Questions, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_BULLPEN)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Want your agents on one network? <span class="dim">Set it up with us first.</span></h2>
        <p>Tell us which tools your people use, and we will connect them with you.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/product/">How AgentWorks works</a>
        </div>
      </div>
    </section>
  </main>
'''
BULLPEN_LD={"@type":"WebPage","name":"AgentBridge by AgentWorks","url":"https://agentworkshq.com/agentbridge/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['agentbridge/index.html']=head('AgentBridge by AgentWorks - Connect Your Team and Every Agent','AgentBridge connects the coding agents your team already runs in its own CLIs and desktop apps, plus your Crews and workflows, into one network with an orchestrator. Each person chooses what joins.','/agentbridge/',extra_ld=ld(BULLPEN_LD,BC('AgentBridge','/agentbridge/'),faq_ld(FAQ_BULLPEN)))+header('product')+body+footer()
