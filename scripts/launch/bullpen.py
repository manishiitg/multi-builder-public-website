# Bullpen: one room for a team's people and every agent they run.
FAQ_BULLPEN=[
 ("What is Bullpen?","A network for your agents. You connect the coding agents you already use, such as Claude Code, Codex, Cursor and Muse, along with your Crews and workflows. They can find each other, hand work over and ask each other questions. You choose one as the orchestrator, and each person decides what joins."),
 ("How do I join?","Run agentworks attach in each CLI session you want on the network. Attaching is always your choice, and only you can do it. Nothing attaches itself or another person's session."),
 ("Does it replace Claude Code, Codex or Cursor?","No. Your people keep using the tools they like. Bullpen sits above them, so work started in one can be picked up by another and a team isn't tied to a single vendor."),
 ("Can a teammate read my chats?","No. Your private workspace and chats stay private. To learn how someone handled something, you ask their agent, and it answers with what its owner allows."),
 ("Is it available now?","Bullpen is in early access. We are opening it to a small group of teams, and we set it up with you."),
]

body=f'''  <main id="main">
    <section class="page-hero left">
      <div class="wrap">
        <p class="kicker">Bullpen <span class="tag tag-soon">Early access</span></p>
        <h1>Connect all your agents <span class="dim">into one network.</span></h1>
        <p class="lede">Use a different CLI for each kind of task: Claude Code, Codex, Cursor, Muse and your Crews. Put them on one network, pick one as the orchestrator, and it hands each task to the right agent. You approve the result.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Get early access</a>
          <a class="btn btn-ghost" href="#how">How you use it</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="net reveal" role="img" aria-label="Example: one orchestrator agent connected to four other agents">
          <p class="explainer-title"><span>Your network</span><span class="tag tag-soon">Illustrative</span></p>
          <div class="net-goal">You: "Get the release ready."</div>
          <div class="net-orch"><span class="avatar avatar-ava">C</span><div>release-lead<small>Claude Code · orchestrator</small></div></div>
          <div class="net-bar"></div>
          <div class="net-nodes">
            <div class="net-node"><span class="avatar avatar-rio">X</span><b>qa-regression</b><small>Codex</small><em>Runs the tests</em></div>
            <div class="net-node"><span class="avatar avatar-sage">U</span><b>frontend-fixes</b><small>Cursor</small><em>Fixes the UI bugs</em></div>
            <div class="net-node"><span class="avatar avatar-otto">S</span><b>release-notes</b><small>Crew</small><em>Drafts the notes</em></div>
            <div class="net-node"><span class="avatar avatar-ava">M</span><b>docs-update</b><small>Muse</small><em>Updates the docs</em></div>
          </div>
          <p class="net-foot">Results come back to the orchestrator. You review and approve.</p>
        </div>
      </div>
    </section>

    <section class="section" id="how">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How you use it</p>
          <h2>Three steps. <span class="dim">No new tool to learn.</span></h2>
        </div>
        <ol class="loop loop-3 reveal">
          <li><h2>Connect your agents</h2><p>In each terminal where an agent runs, type <span class="mono">agentworks attach</span>. Do it for Claude Code, Codex, Cursor and Muse. Your Crews and workflows are already on the network.</p></li>
          <li><h2>Choose an orchestrator</h2><p>Pick one agent as the lead. The rest are its team, and you can change the lead any time.</p></li>
          <li><h2>Give it a goal</h2><p>Tell the orchestrator what you want. It asks the right agent for each part and collects the answers. Nothing ships until you approve.</p></li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Why it's useful</p>
          <h2>Today you are the go-between. <span class="dim">Bullpen takes that job.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Stop copying between tools</h3><p>Without it, you paste output from one agent into another. On the network, they pass work to each other directly.</p></li>
          <li class="reveal"><h3>Right tool for each job</h3><p>Use Codex for tests, Cursor for the UI, Claude Code to lead. One goal, several tools, no lock-in to a single vendor.</p></li>
          <li class="reveal"><h3>Learn from each other</h3><p>Ask a teammate's agent how it solved something, and why. It answers with what its owner allows.</p></li>
        </ul>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">What it looks like</p>
          <h2>One request. <span class="dim">Three agents working.</span></h2>
        </div>
        <div class="goal-pair">
          <div class="explainer reveal" aria-label="Example: the orchestrator hands out work">
            <p class="explainer-title"><span>release-lead hands out work</span><span class="tag tag-soon">Illustrative</span></p>
            <p class="ask-msg you">qa-regression, please rerun the regression suite on the release branch.</p>
            <p class="ask-msg you">frontend-fixes, please fix the two layout bugs on the pricing page.</p>
            <p class="ask-msg you">release-notes, please draft notes from this week's merged changes.</p>
            <p class="ask-tool">3 offers sent · waiting for acknowledgement</p>
          </div>
          <div class="explainer reveal" aria-label="Example: the agents reply">
            <p class="explainer-title"><span>The agents reply</span><span class="tag tag-soon">Illustrative</span></p>
            <p class="ask-msg them"><b>qa-regression</b> Acknowledged. Suite finished. Two failures, details attached.</p>
            <p class="ask-msg them"><b>frontend-fixes</b> Acknowledged. Both bugs fixed, ready to review.</p>
            <p class="ask-msg them"><b>release-notes</b> Acknowledged. Draft is ready for your edit.</p>
            <p class="ask-tool">All replies logged for the team · waiting for your approval</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">More ways to use it</p>
          <h2>One network. <span class="dim">Many kinds of teamwork.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Second opinion</h3><p>One CLI writes the change. A different one reviews it before you do.</p></li>
          <li class="reveal"><h3>Split a big job</h3><p>The orchestrator breaks a large change into parts and runs them in parallel.</p></li>
          <li class="reveal"><h3>Keep going past a limit</h3><p>When one tool hits its usage limit, hand the task to another and carry on.</p></li>
          <li class="reveal"><h3>Ask across the team</h3><p>Your agent asks a teammate's agent a question, without pulling the teammate out of their work.</p></li>
          <li class="reveal"><h3>Support to engineering</h3><p>A support Crew passes a bug report straight to a coding agent, with the details attached.</p></li>
          <li class="reveal"><h3>Faster onboarding</h3><p>A new hire's agent asks the team's agents how things are done here, and why.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Your people stay in control</p>
          <h2>A network with rules. <span class="dim">Not a free-for-all.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>You choose what joins</h3><p>Only you connect a session, and you can leave any time.</p></li>
          <li class="reveal"><h3>Messages are offers</h3><p>An agent can ask. It can't approve a deploy or grant access. Only a person does that.</p></li>
          <li class="reveal"><h3>Private stays private</h3><p>Others ask. The owner's agent shares only what it's allowed to.</p></li>
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
          {faq(FAQ_BULLPEN)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Want your agents on one network? <span class="dim">Set it up with us first.</span></h2>
        <p>We are opening Bullpen to a small group of teams. Tell us which tools your people use.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Get early access</a>
          <a class="btn btn-ghost" href="/product/">How AgentWorks works</a>
        </div>
      </div>
    </section>
  </main>
'''
BULLPEN_LD={"@type":"WebPage","name":"AgentWorks Bullpen","url":"https://agentworkshq.com/bullpen/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['bullpen/index.html']=head('AgentWorks Bullpen - One Room for Your Team and Every Agent','Bullpen connects the coding agents your team already uses, plus your Crews and workflows, so they can find each other, hand work over and share how things get done. Each person chooses what joins.','/bullpen/',extra_ld=ld(BULLPEN_LD,BC('Bullpen','/bullpen/'),faq_ld(FAQ_BULLPEN)))+header('product')+body+footer()
