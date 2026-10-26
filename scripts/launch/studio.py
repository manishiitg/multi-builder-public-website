# /studio/: a private AI workspace for each employee, using company knowledge and AI plans. Account and review facts confirmed by the product reviewer (2026-10-26).
FAQ_CODE=[
 ("Which coding plans can we bring?","Claude Code, Codex, Cursor, Muse, Pi and Antigravity. Connect an account by browser login (Claude Code, Codex, Cursor, Muse) or by API key. The login stays on the server."),
 ("Who pays when someone uses a shared account?","The account's owner. Runs on a shared account act as that owner and use their plan, and the owner can see who used it and where."),
 ("Can we see how much of a plan is left?","Yes. Each account has a live usage check that reads the coding CLI's own usage or status, so you see the limit the vendor reports."),
 ("Can someone using my shared account see my login?","Not through the app, and runs can't reach it either: every coding run is confined to its own workspace and files, so it cannot read another account's login files on the server. Still, share an account only with people and Crews you trust."),
 ("Is there a terminal?","No. There is no standalone terminal or shell. You ask the agent, and it runs the commands for you, each one in its own sandbox."),
 ("What can my team audit when using Claude Code?","In AgentWorks Studio, admins and assigned reviewers can read a person's chats, files and costs without changing them; every review view is recorded. The company can review cost, usage and output centrally. This describes review of the AgentWorks workspace, not a promise of a complete event log from the native coding CLI."),
 ("Who can see my workspace?","Only you, until you add co-owners. A workspace starts private; the owner can add co-owners to work on it together, and anyone else uses what you share from it, such as a Crew. Admins and anyone an admin names as a reviewer can also read its chats, files and costs without changing anything, and every view is recorded. The workspace tells you this in its settings."),
 ("How is it isolated?","Every command the agent runs is sandboxed with Linux Landlock and gets its own private /tmp, and the agent's own files are protected. The sandbox covers commands. Some coding agents' built-in read tools aren't sandboxed yet, so treat a workspace as private to people, not sealed off from the server."),
 ("Can other people or agents use my workspace?","People you add as co-owners can work in it with you, each in their own chat. Other people use what you share from it, such as a Crew, through its dashboard or from their own AI apps. Your workspace can call your own Crews and workflows."),
]
code_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Studio <span class="tag">Enterprise</span></p>
        <h1>A private AI workspace for every employee, <span class="dim">connected to your company.</span></h1>
        <p class="lede">Prepare a customer brief, compare supplier documents or work through a question with AI that can use your company’s shared knowledge and connected tools. Each person works in their own browser workspace, on your company’s Claude, Codex or Cursor plans. Add a colleague when you want to work together, or share a reusable agent as a Crew.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#workspace">See the workspace</a>
        </div>
      </div>
    </section>

    <section class="section-tight" id="workspace">
      <div class="wrap">
        <p class="muted">An illustrative example: Leena is preparing for a customer meeting. She wants one brief drawn from the account documents and the company’s approved product information, with unanswered questions kept visible.</p>
        <div class="ws reveal" aria-label="Illustrative Studio workspace: Leena prepares a customer brief">
          <div class="ws-side">
            <p class="ws-h">Customer meeting <span class="tag tag-soon">Illustrative</span></p>
            <p class="hub-sub">AI for this workspace</p>
            <div class="hub-chips"><span class="chip">{logo("claude")}Claude Code · company plan</span></div>
            <p class="hub-sub">Connected tools</p>
            <div class="ws-list">
              <p>{tool("googledrive")}Google Drive<span class="tag tag-run">Connected</span></p>
              <p>{tool("slack")}Slack<span class="tag tag-run">Connected</span></p>
            </div>
            <p class="hub-sub">Shared knowledge</p>
            <div class="ws-list"><p><span class="ws-dot"></span>Approved product information</p><p><span class="ws-dot"></span>Customer meeting guide</p></div>
            <p class="hub-sub">Working files</p>
            <div class="ws-list"><p><span class="ws-dot"></span>Account notes</p><p><span class="ws-dot"></span>Customer brief · draft</p></div>
            <p class="hub-sub">Workspace access</p>
            <p class="muted">Private until Leena adds co-owners. Admins and assigned reviewers can inspect chats, files and costs; every review is recorded.</p>
          </div>
          <div class="ws-chat">
            <p class="explainer-title"><span>Customer meeting · Leena’s chat</span><span>Claude Code</span></p>
            <p class="ask-msg you">Prepare a brief for my customer meeting from the account notes and our approved product information. Flag anything we still need to confirm.</p>
            <p class="ask-tool">Read <b>account notes</b> and <b>shared product knowledge</b></p>
            <p class="ask-msg them"><b>Draft ready.</b> I’ve saved the customer’s priorities, relevant product details and sources in the brief. Their requested delivery date still needs confirmation.</p>
            <p class="ask-msg you">I’ve checked the brief. Keep the delivery date as an open question and add a handover note for my colleague.</p>
            <p class="ask-msg them"><b>Brief updated.</b> The handover includes the open question and the documents behind it.</p>
          </div>
        </div>
        <p class="muted">Leena reviews the result before handing it over. If a colleague needs to continue the work, she can add them as a co-owner; they get their own chat in the same workspace. Her files and the handover are already there.</p>
        <ul class="ucx-grid ws-modes">
          <li class="ucx reveal"><h3>Cowork</h3><p class="uc-did">For business work: research, documents, browser tasks and a dashboard, through chat.</p></li>
          <li class="ucx reveal"><h3>Dev</h3><p class="uc-did">For engineers: ask your coding agent to change files, run commands and check the tests.</p></li>
          <li class="ucx reveal"><h3>Local</h3><p class="uc-did">Work on files on your own computer, with the same agents and tools.</p></li>
        </ul>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Company plans and usage</p>
          <h2>Use the plans you have. <span class="dim">See who uses them.</span></h2>
          <p>Connect your company’s Claude, Codex and Cursor accounts. People use the plans you share without receiving the login, and you can see cost and usage per person and workspace. A shared account’s owner pays for the work run on it.</p>
        </div>
        <div class="goal-pair">
          <div class="explainer reveal" aria-label="Example: connected coding accounts">
            <p class="explainer-title"><span>Coding accounts</span><span>On your server</span></p>
            <div class="plans">
              <div class="plan-row">{logo("claude")}<b>Claude Max · Ava</b><small>Shared with 4 people and 2 Crews · 38% of weekly limit used</small><span class="tag tag-run">Shared</span></div>
              <div class="plan-row">{logo("openai")}<b>Codex · team key</b><small>Server account · admins choose who can use it</small><span class="tag">Server</span></div>
              <div class="plan-row">{logo("cursor")}<b>Cursor · Rio</b><small>Only Rio's own workspaces</small><span class="tag">Private</span></div>
            </div>
          </div>
          <div class="explainer reveal" aria-label="Example: usage by person and project">
            <p class="explainer-title"><span>Usage this week</span><span>By person and workspace</span></p>
            <div class="row"><span class="avatar avatar-rio">R</span><div class="grow">Rio · customer brief<small>Claude Max · Ava's account</small></div><span class="mono">1.2M tokens</span></div>
            <div class="row"><span class="avatar avatar-sage">S</span><div class="grow">Sage · supplier comparison<small>Codex · team key</small></div><span class="mono">640K tokens</span></div>
            <div class="row"><span class="avatar avatar-otto">O</span><div class="grow">Release notes Crew<small>Claude Max · Ava's account</small></div><span class="mono">210K tokens</span></div>
            <div class="row"><span class="avatar avatar-ava">A</span><div class="grow">Ava · quarterly planning<small>Claude Max · own account</small></div><span class="mono">880K tokens</span></div>
          </div>
        </div>
        <p class="muted center-row">Illustrative example.</p>
      </div>
    </section>

    <section class="section-tight" id="connected">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Connected from day one</p>
          <h2>Set up once. <span class="dim">Everyone starts ready.</span></h2>
        </div>
        <ul class="ucx-grid ws-modes">
          <li class="ucx reveal"><h3>Your plans</h3><p class="uc-did">Claude Code, Codex, Cursor, Muse, Pi and Antigravity, on the subscriptions you already have.</p></li>
          <li class="ucx reveal"><h3>Your knowledge and skills</h3><p class="uc-did">Company knowledge from Brain and shared skills, available in every workspace.</p></li>
          <li class="ucx reveal"><h3>Your tools</h3><p class="uc-did">MCP tools, Slack, Gmail and Google apps, connected once and used from chat.</p></li>
          <li class="ucx reveal"><h3>Other agents</h3><p class="uc-did">Reach agents on the AgentBridge network and the coding agents running on people's own computers.</p></li>
          <li class="ucx reveal"><h3>Your other AI apps</h3><p class="uc-did">Use what you build from ChatGPT, Claude and Cursor over MCP.</p></li>
          <li class="ucx reveal"><h3>Work together</h3><p class="uc-did">Run a project in one workspace: add co-owners who each work in their own chat, let others use what you built, or hand work to a colleague.</p></li>
        </ul>
      </div>
    </section>

    <section class="section-tight" id="contractors">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Contractors and freelancers</p>
          <h2>Give them a workspace. <span class="dim">Keep the work.</span></h2>
        </div>
        <ul class="ucx-grid ws-modes">
          <li class="ucx reveal"><h3>Start with your company’s context</h3><p class="uc-did">The contractor starts with your knowledge, skills and tools already connected.</p></li>
          <li class="ucx reveal"><h3>The work stays with you</h3><p class="uc-did">Files and chats live on your server, not on a personal laptop or account.</p></li>
          <li class="ucx reveal"><h3>No logins to hand out</h3><p class="uc-did">They use the company's plans without ever seeing the login. They see only what you share with them.</p></li>
          <li class="ucx reveal"><h3>Ends when you say</h3><p class="uc-did">Disable the account and access stops at once. Cost is tracked per person.</p></li>
        </ul>
      </div>
    </section>

    <section class="section-tight" id="starters">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Start here</p>
          <h2>One workspace, <span class="dim">many jobs.</span></h2>
        </div>
        <ul class="ucx-grid ws-modes">
          <li class="ucx reveal"><h3>Research and documents</h3><p class="uc-did">Compare supplier proposals against your requirements, prepare a customer brief or organize a set of documents.</p></li>
          <li class="ucx reveal"><h3>Software helper</h3><p class="uc-did">Ask your coding agent to investigate a bug, change the code and run the relevant checks.</p></li>
          <li class="ucx reveal"><h3>Personal assistant</h3><p class="uc-did">Plan the week, prepare a daily briefing and follow up on tasks.</p></li>
          <li class="ucx reveal"><h3>Team expert</h3><p class="uc-did">One job for your team, such as invoices or support questions, using your instructions and files.</p></li>
          <li class="ucx reveal"><h3>Automation</h3><p class="uc-did">Repeatable work on a schedule, an event or a webhook, with skills and reusable functions.</p></li>
          <li class="ucx reveal"><h3>Company knowledge</h3><p class="uc-did">Find answers in your company Brain and suggest how to improve it.</p></li>
          <li class="ucx reveal"><h3>Chief of Staff</h3><p class="uc-did">Coordinate your Crews and workflows, follow up on blockers and prepare status summaries.</p></li>
        </ul>
        <p class="muted center-row">Build it in Studio. <a href="/crews/">Share it as a Crew</a> so anyone on your team can ask it.</p>
      </div>
    </section>

{uc_section([
 uc_chat("Work from your phone",("whatsapp","WhatsApp"),("code","checkout-service"),"Did the retry change pass the tests?","Yes, all 48 pass. Want a summary?"),
 uc_chat("Share one plan",("user","Rio"),("claude","Ava's shared Claude Max"),"Fix the flaky webhook test.","Fixed. It ran on Ava's plan, and she can see it was you."),
 uc_chat("See where spend went",("user","Admin"),("code","Usage"),"Who used the most this week?","Rio, on checkout-service, through Ava's account."),
 uc_chat("Review the week",("claude","Manager's Claude"),("code","Review"),"What did the team ship this week?","Checkout retries, a CSV export and two bug fixes.",via="Review over MCP · every view recorded"),
 uc_chat("Check a plan's limit",("user","Account owner"),("code","Accounts"),"How much of my plan is left?","38% of this week's limit used.",via="Live usage check from the coding CLI"),
 uc_chat("Use your Crews",("code","Your workspace"),("crew","DevOps Crew"),"Is staging healthy before I deploy?","Yes. All checks are green."),
], h2='Engineering work has a home here too.', dim='Illustrative examples.')}
    <section class="section-tight">
      <div class="wrap">
        {uc_pills(['Private until you add co-owners','Admins and assigned reviewers can review, every view recorded','Every command sandboxed','Cost per person, workspace and plan'])}
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="goal-pair">
          <div class="explainer reveal" aria-label="Example Studio workspace">
            <p class="explainer-title"><span>checkout-service</span><span>Private · Claude Code</span></p>
            <p class="ask-msg you">Add retries to the payment webhook handler, then run the tests.</p>
            <p class="ask-tool">Ran <b>npm test</b> in the sandbox · 2 failures, fixed, re-ran</p>
            <p class="ask-msg them"><b>Done</b> Retries with backoff on 5xx and timeouts, capped at 3. All 48 tests pass. The change is in webhook.ts and its test file.</p>
          </div>
          <div class="explainer reveal" aria-label="Who can see this workspace">
            <p class="explainer-title"><span>Who can see this workspace</span><span>Private until you add co-owners</span></p>
            <div class="row"><span class="avatar avatar-ava">A</span><div class="grow">Ava<small>Owner · files, chats, agent</small></div><span class="tag tag-run">Owner</span></div>
            <div class="row"><span class="avatar avatar-otto">C</span><div class="grow">Admin or assigned reviewer<small>Can read, never change · every view recorded</small></div><span class="tag tag-wait">Audited</span></div>
            <div class="row"><span class="avatar avatar-rio">R</span><div class="grow">Everyone else<small>Uses what you share, such as a Crew</small></div><span class="tag">Shared</span></div>
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
        <div class="connect-row center-row" aria-label="Coding agents a workspace can run on">
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
          <h2 class="h2">Studio, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_CODE)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Give your team AI they can work with. <span class="dim">In the context of your company.</span></h2>
        <p>We connect your company’s AI plans, knowledge and tools, then open the first employee workspaces with your team.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/product/">All products</a>
        </div>
      </div>
    </section>
  </main>
'''
CODE_LD={"@type":"WebPage","name":"AgentWorks Studio","url":"https://agentworkshq.com/studio/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['studio/index.html']=head('AgentWorks Studio - A Private AI Workspace for Every Employee','Prepare briefs, compare documents and work with AI connected to your company. Studio gives each employee a private workspace using company AI plans, shared knowledge and tools, with cost and usage per person.','/studio/',og='agentworks-product-og.jpg',extra_ld=ld(CODE_LD,BC('Studio','/studio/'),faq_ld(FAQ_CODE)))+header('product')+code_body+footer()
