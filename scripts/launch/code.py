# /code/: Code: bring the team's coding plans to one server, share them and track cost; each person codes in a private workspace. Facts from the product team (2026-09-28).
FAQ_CODE=[
 ("Which coding plans can we bring?","Claude Code, Codex, Cursor, Muse, Pi and Antigravity. Connect an account by browser login (Claude Code, Codex, Cursor, Muse) or by API key. The login stays on the server."),
 ("Who pays when someone uses a shared account?","The account's owner. Runs on a shared account act as that owner and use their plan, and the owner can see who used it and where."),
 ("Can we see how much of a plan is left?","Yes. Each account has a live usage check that reads the coding CLI's own usage or status, so you see the limit the vendor reports."),
 ("Can someone using my shared account see my login?","Not through the app, and runs can't reach it either: every coding run is confined to its own workspace and files, so it cannot read another account's login files on the server. Still, share an account only with people and Crews you trust."),
 ("Is there a terminal?","No. There is no standalone terminal or shell. You ask the agent, and it runs the commands for you, each one in its own sandbox."),
 ("Who can see my Code?","Only you. A Code can't be shared with other people. Admins and anyone an admin names as a Code reviewer can also read its chats, files and costs, read-only, and every view is recorded. The Code tells you this in its settings."),
 ("How is it isolated?","Every command the agent runs is sandboxed with Linux Landlock and gets its own private /tmp, and the agent's own files are protected. The sandbox covers commands. Some coding agents' built-in read tools aren't sandboxed yet, so treat a Code as private to people, not sealed off from the server."),
 ("Can other people or agents use my Code?","No. Other people can't be added to it, and other people's agents and tools can't call into it. Your Code can call your own Crews and workflows."),
]
code_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Code</p>
        <h1>Every employee wants coding agents. <span class="dim">Bring them to one place.</span></h1>
        <p class="lede">Today each person runs Claude Code, Codex or Cursor on their own laptop and their own plan, and the company can't see what it costs, who uses how much, or what the agents actually produced. With Code, everyone codes on your AgentWorks server, on the plans you already pay for, and you review cost, usage and output in one place. People can reach their Code from Slack or WhatsApp when they're away from the desk.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#uses">See use cases</a>
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

{uc_section([
 uc_chat("Code from your phone",("whatsapp","WhatsApp"),("code","checkout-service"),"Did the retry change pass the tests?","Yes, all 48 pass. Want a summary?"),
 uc_chat("Share one plan",("user","Rio"),("claude","Ava's shared Claude Max"),"Fix the flaky webhook test.","Fixed. It ran on Ava's plan, and she can see it was you."),
 uc_chat("See where spend went",("user","Admin"),("code","Usage"),"Who used the most this week?","Rio, on checkout-service, through Ava's account."),
 uc_chat("Review the week",("claude","Manager's Claude"),("code","Code review"),"What did the team ship this week?","Checkout retries, a CSV export and two bug fixes.",via="Read-only over MCP · every view recorded"),
 uc_chat("Check a plan's limit",("user","Account owner"),("code","Accounts"),"How much of my plan is left?","38% of this week's limit used.",via="Live usage check from the coding CLI"),
 uc_chat("Use your Crews",("code","Your Code"),("crew","DevOps Crew"),"Is staging healthy before I deploy?","Yes. All checks are green."),
], h2='One server for every coding agent.', dim='Illustrative examples.')}
    <section class="section-tight">
      <div class="wrap">
        {uc_pills(['Each Code is private to its owner','Admins review read-only, every view recorded','Every command sandboxed','Cost per person, Code and plan'])}
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
            <p class="explainer-title"><span>Who can see this Code</span><span>Private to its owner</span></p>
            <div class="row"><span class="avatar avatar-ava">A</span><div class="grow">Ava<small>Owner · files, chats, agent</small></div><span class="tag tag-run">Owner</span></div>
            <div class="row"><span class="avatar avatar-otto">C</span><div class="grow">Admin or Code reviewer<small>Read-only, every view recorded</small></div><span class="tag tag-wait">Audited</span></div>
            <div class="row"><span class="avatar avatar-rio">R</span><div class="grow">Everyone else<small>No access</small></div><span class="tag">None</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="connect">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Connections</p>
          <h2>Connect your own tools. <span class="dim">They stay yours.</span></h2>
        </div>
        <ul class="control two">
          <li class="reveal"><h3>Your own MCP servers</h3><p>Sign in to GitHub, Slack, Google Workspace and more with your own account. Only your chats can use them.</p></li>
          <li class="reveal"><h3>Personal secrets</h3><p>Stored encrypted, visible only to you, used only in your chats.</p></li>
        </ul>
        <div class="connect-row center-row" aria-label="Coding agents a Code can run on">
          <span class="chip">{logo("claude")}Claude Code</span>
          <span class="chip">{logo("openai")}Codex</span>
          <span class="chip">{logo("cursor")}Cursor</span>
          <span class="chip"><span class="mono-logo" aria-hidden="true">M</span>Muse</span>
          <span class="chip"><span class="mono-logo" aria-hidden="true">P</span>Pi</span>
          <span class="chip"><img src="/assets/brand/ai/antigravity.svg" alt="" width="16" height="16" />Antigravity</span>
        </div>
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
pages['code/index.html']=head('AgentWorks Code - Coding Agents for Every Employee, With Cost and Usage in One Place','Everyone codes with Claude Code, Codex, Cursor, Muse, Pi or Antigravity on your AgentWorks server, on the plans you already pay for. See cost, usage and output per person in one place, share accounts without handing out logins, and keep each workspace private from colleagues.','/code/',og='agentworks-product-og.jpg',extra_ld=ld(CODE_LD,BC('Code','/code/'),faq_ld(FAQ_CODE)))+header('product')+code_body+footer()
