# /code/: Code: bring the team's coding plans to one server, share them and track cost; each person codes in a private workspace. Facts from the product team (2026-09-28).
FAQ_CODE=[
 ("Which coding plans can we bring?","Claude Code, Codex, Cursor, Muse and Pi. Connect an account by browser login (Claude Code, Codex, Cursor, Muse) or by API key. It's stored encrypted on the server, and nobody sees the credential."),
 ("Who pays when someone uses a shared account?","The account's owner. Runs on a shared account act as that owner and use their plan, and the owner can see who used it and where."),
 ("Can we see how much of a plan is left?","Yes. Each account has a live usage check that reads the coding CLI's own usage or status, so you see the limit the vendor reports."),
 ("Is there a terminal?","No. There is no standalone terminal or shell. You ask the agent, and it runs the commands for you, each one in its own sandbox."),
 ("Who can see my Code?","You, and the people you share it with. Admins and anyone an admin names as a Code reviewer can also read its chats, files and costs, read-only, and every view is recorded. The Code itself tells you this."),
 ("How is it isolated?","Every command the agent runs is sandboxed with Linux Landlock and gets its own private /tmp, and the agent's own files are protected. The sandbox covers commands. Some coding agents' built-in read tools aren't sandboxed yet, so treat a Code as private to people, not sealed off from the server."),
 ("Can other workflows or Crews use my Code?","No. A Code can call your Crews and workflows, but nothing can call into a Code."),
]
code_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Code</p>
        <h1>Every employee wants coding agents. <span class="dim">Bring them to one place.</span></h1>
        <p class="lede">Today each person runs Claude Code, Codex or Cursor on their own laptop and their own plan, and the company can't see what it costs, who uses how much, or what the agents actually produced. With Code, everyone codes on your AgentWorks server, on the plans you already pay for, and you see cost, usage and output in one place.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#see">What you see</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="goal-pair">
          <div class="explainer reveal" aria-label="Example: connected coding accounts">
            <p class="explainer-title"><span>Coding accounts</span><span>On your server</span></p>
            <div class="plans">
              <div class="plan-row">{logo("claude")}<b>Claude Max · Ava</b><small>Shared with 4 people and 2 Crews · 38% of weekly limit used</small><span class="tag tag-run">Shared</span></div>
              <div class="plan-row">{logo("openai")}<b>Codex · team key</b><small>Server account · admins choose who can use it</small><span class="tag">Server</span></div>
              <div class="plan-row">{logo("cursor")}<b>Cursor · Rio</b><small>Only Rio's own Codes</small><span class="tag">Private</span></div>
            </div>
          </div>
          <div class="explainer reveal" aria-label="Example: usage by person and project">
            <p class="explainer-title"><span>Usage this week</span><span>By person and Code</span></p>
            <div class="row"><span class="avatar avatar-rio">R</span><div class="grow">Rio · checkout-service<small>Claude Max · Ava's account</small></div><span class="mono">1.2M tokens</span></div>
            <div class="row"><span class="avatar avatar-sage">S</span><div class="grow">Sage · data-pipeline<small>Codex · team key</small></div><span class="mono">640K tokens</span></div>
            <div class="row"><span class="avatar avatar-otto">O</span><div class="grow">Release notes Crew<small>Claude Max · Ava's account</small></div><span class="mono">210K tokens</span></div>
            <div class="row"><span class="avatar avatar-ava">A</span><div class="grow">Ava · mobile-app<small>Claude Max · own account</small></div><span class="mono">880K tokens</span></div>
          </div>
        </div>
        <p class="muted center-row">Illustrative example.</p>
      </div>
    </section>

    <section class="section" id="see">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">What the company sees</p>
          <h2>Cost, usage and output. <span class="dim">For every person, in one place.</span></h2>
          <p class="lede">Work in a Code is private from colleagues and reviewable by the company. Everyone sees that stated plainly in the product.</p>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Cost</h3><p>Cost and tokens per person, per Code and per provider account, so AI spend is a number, not a guess.</p></li>
          <li class="reveal"><h3>Usage</h3><p>A live usage and quota check for every account. Account owners see who used their account and where. Admins see everything.</p></li>
          <li class="reveal"><h3>Actual output</h3><p>Admins and named Code reviewers can open any Code's chats, files and costs, read-only, with every view audited. AI assistants can do the same over MCP, for example to summarise a team's week.</p></li>
        </ul>
      </div>
    </section>

    <section class="section" id="plans">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">One place for every coding plan</p>
          <h2>Share the plans you already pay for. <span class="dim">Instead of a seat for every person.</span></h2>
          <p class="lede">Connect each account once. Decide who can use it. See where every token went.</p>
        </div>
        <ol class="loop reveal">
          <li><h3>Connect once</h3><p>Add Claude Code, Codex, Cursor or Muse by browser login, or any of them by API key. Credentials are stored encrypted on the server, and nobody sees them.</p></li>
          <li><h3>Share without the login</h3><p>Keep an account private, or share it with chosen people, workflows or Crews. Admins decide who can use the server's own accounts and set the default models.</p></li>
          <li><h3>Track it centrally</h3><p>Cost and tokens per account, per person and per Code, workflow or Crew, plus a live check of each plan's own usage limit.</p></li>
          <li><h3>Stay accountable</h3><p>Runs on a shared account act as, and bill to, its owner. Owners see who used their account and where. Admins see everything.</p></li>
        </ol>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="goal-pair">
          <div class="explainer reveal" aria-label="Example Code workspace">
            <p class="explainer-title"><span>checkout-service</span><span>Private · Claude Code</span></p>
            <p class="ask-msg you">Add retries to the payment webhook handler, then run the tests.</p>
            <p class="ask-tool">Ran <b>npm test</b> in the sandbox · 2 failures, fixed, re-ran</p>
            <p class="ask-msg them"><b>Done</b> Retries with backoff on 5xx and timeouts, capped at 3. All 48 tests pass. The change is in webhook.ts and its test file.</p>
          </div>
          <div class="explainer reveal" aria-label="Who can see this Code">
            <p class="explainer-title"><span>Who has access</span><span>Only the owner shares</span></p>
            <div class="row"><span class="avatar avatar-ava">A</span><div class="grow">Ava<small>Owner</small></div><span class="tag tag-run">Co-owner</span></div>
            <div class="row"><span class="avatar avatar-rio">R</span><div class="grow">Rio<small>Reviews the changes</small></div><span class="tag">Editor</span></div>
            <div class="row"><span class="avatar avatar-sage">S</span><div class="grow">Sage<small>Follows along</small></div><span class="tag">Viewer</span></div>
            <div class="row"><span class="avatar avatar-otto">C</span><div class="grow">Code reviewer<small>Read-only, every view recorded</small></div><span class="tag tag-wait">Audited</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="inside">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">A private workspace for everyone</p>
          <h2>Each person gets a Code. <span class="dim">Their files, their agent.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>The coding agent you like</h3><p>Claude Code, Codex, Cursor, Muse or Pi, on a shared account or your own.</p></li>
          <li class="reveal"><h3>Sandboxed commands</h3><p>The agent runs every command for you inside a Linux Landlock sandbox with its own private /tmp. Its own files are protected. There's no open shell on the server.</p></li>
          <li class="reveal"><h3>Private by default</h3><p>A new Code is yours alone. Skills you add stay in it.</p></li>
          <li class="reveal"><h3>Share with the right people</h3><p>Add someone as viewer, editor or co-owner. Only the owner shares, and removing someone takes effect at once.</p></li>
          <li class="reveal"><h3>Uses your Crews and workflows</h3><p>Your agent can ask a Crew or run a workflow. Nothing can call into a Code.</p></li>
          <li class="reveal"><h3>Cost you can see</h3><p>Tokens and cost tracked per Code, per person and per AI account.</p></li>
        </ul>
      </div>
    </section>

    <section class="section" id="connect">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Connections</p>
          <h2>Connect your own tools. <span class="dim">They stay yours.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>MCP servers</h3><p>Use the servers your admin selects for the Code, plus your own remote MCP servers. Your logins and API keys are stored encrypted, switched on per Code, and never usable by anyone else. Calls to private or internal network addresses are blocked.</p></li>
          <li class="reveal"><h3>Gmail</h3><p>A Google account you connect in a Code is kept in that Code's own credential store, used only in your chats and never shared across the server.</p></li>
          <li class="reveal"><h3>Slack and WhatsApp</h3><p>Talk to your Code from a Slack direct message or a one-to-one WhatsApp chat.</p></li>
        </ul>
        <div class="connect-row center-row" aria-label="Coding agents a Code can run on">
          <span class="chip">{logo("claude")}Claude Code</span>
          <span class="chip">{logo("openai")}Codex</span>
          <span class="chip">{logo("cursor")}Cursor</span>
          <span class="chip"><span class="mono-logo" aria-hidden="true">M</span>Muse</span>
          <span class="chip"><span class="mono-logo" aria-hidden="true">P</span>Pi</span>
        </div>
      </div>
    </section>

    <section class="section" id="review">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">For teams</p>
          <h2>Private to people. <span class="dim">Open to review.</span></h2>
          <p class="lede">A Code is private, not hidden. The people responsible for the server can review it, and the Code says so up front.</p>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Admins see the whole picture</h3><p>Every account, every person's usage, and which Codes, workflows and Crews it went to.</p></li>
          <li class="reveal"><h3>Same accounts for Crews</h3><p>The plans you bring also power your Crews, in chat, Slack, WhatsApp or the live terminal. For Enterprise, sign-in goes through your SSO, with roles and per-workflow access.</p></li>
          <li class="reveal"><h3>Owners see their account</h3><p>Whoever shares an account sees who used it and where, and can stop sharing at any time.</p></li>
          <li class="reveal"><h3>Code reviewers</h3><p>Admins, and people an admin names as Code reviewers, can read any Code's chats, files and costs. Read-only, and every view goes in the audit log. AI assistants can do the same review over the AgentWorks MCP connection with a dedicated <code>code:review</code> token.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Code, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_CODE)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Bring your team's coding plans in. <span class="dim">See usage in week one.</span></h2>
        <p>We set up AgentWorks with your team, connect the coding accounts you already have and open the first Codes together.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/product/">All products</a>
        </div>
      </div>
    </section>
  </main>
'''
CODE_LD={"@type":"WebPage","name":"AgentWorks Code","url":"https://agentworkshq.com/code/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['code/index.html']=head('AgentWorks Code - Coding Agents for Every Employee, With Cost and Usage in One Place','Everyone codes with Claude Code, Codex, Cursor, Muse or Pi on your AgentWorks server, on the plans you already pay for. See cost, usage and output per person in one place, share accounts without handing out logins, and keep each workspace private from colleagues.','/code/',og='agentworks-product-og.jpg',extra_ld=ld(CODE_LD,BC('Code','/code/'),faq_ld(FAQ_CODE)))+header('product')+code_body+footer()
