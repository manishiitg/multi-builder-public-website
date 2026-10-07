# /brain/: Brain, the shared company knowledge every agent reads and writes. Facts from the product docs and a live check on RTS (2026-10-06).
# Illustrative folders and notes only; no customer or own data.
FAQ_BRAIN=[
 ("What goes in Brain?","Skills (how to do a task), notes (what happened or was decided), facts (specific statements) and sources (the original document or a link to it). They are plain Markdown entries in nested folders, like Engineering/Payments/Checkout."),
 ("Who can read and change it?","Whoever you give a folder to. Access is set per folder and inherited by the folders inside it, with Reader, Editor and Owner roles. An agent can only touch the folders that the person it runs as can."),
 ("Can I undo a change?","Yes. Every entry keeps its history, and each change records who made it and why. Edits use a version check, so two agents can't silently overwrite each other."),
 ("Where is it stored, and is it backed up?","On your AgentWorks server as Markdown files. You can connect a private Git repository and publish a backup yourself: commit the versions you choose, then push."),
 ("Which agents can use it?","Crews, Code and Goals on AgentWorks, and any MCP client, such as Claude Code, through the same connection. Each project chooses how much Brain it gets: off, read only, read and write, or only chosen folders."),
 ("Does it search by meaning?","Not today. Search finds the exact text you type and shows the matching lines. Organizing entries into folders and tags is what makes things easy to find."),
 ("Do agents learn on their own?","They write to Brain when a project is set to read and write and the work calls for it, or when you ask. You decide per project. Nothing is saved from a chat unless an agent saves it."),
 ("Can I edit it by hand?","Browse, search and read it in the app, and use the Brain chat to manage access and backup. Content is changed by agents and clients, so a person tells an agent what to add or fix."),
]
brain_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Brain</p>
        <h1>What your team knows, <span class="dim">every agent knows.</span></h1>
        <p class="lede">Today each agent starts from zero, and the know-how sits in heads, chat threads and copies on laptops. Brain is one shared place for your company's skills, notes and facts. Write it once, give folders to the people and agents who need them, and every Crew, Code workspace, Goal and MCP client reads the same thing.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#problems">What it solves</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="goal-pair">
          <div class="explainer reveal" aria-label="Example Brain folders">
            <p class="explainer-title"><span>Brain</span><span>Company / Engineering</span></p>
            <div class="row"><div class="grow">Payments / Checkout / deployment<small>How we deploy and roll back checkout</small></div><span class="tag tag-goal">Skill</span></div>
            <div class="row"><div class="grow">Payments / Checkout / architecture<small>Services and how they connect</small></div><span class="tag">Note</span></div>
            <div class="row"><div class="grow">Payments / production-database<small>Production uses PostgreSQL</small></div><span class="tag">Fact</span></div>
            <div class="row"><div class="grow">Payments / design-document<small>Link to the original design</small></div><span class="tag">Source</span></div>
          </div>
          <div class="explainer ask-demo reveal" aria-label="Example: an agent reading Brain">
            <p class="explainer-title"><span>In Claude Code</span><span>Reading from Brain</span></p>
            <p class="ask-msg you">How do we roll back a bad checkout deploy?</p>
            <p class="ask-tool">Read <b>Engineering / Payments / Checkout / deployment</b> from Brain</p>
            <p class="ask-msg them"><b>Roll back to the last tagged release,</b> then check the payment queue before reopening traffic. The steps are in the team's deployment skill; I followed version 4.</p>
          </div>
        </div>
        <p class="muted center-row">Illustrative example.</p>
      </div>
    </section>

    <section class="section" id="problems">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">What it solves</p>
          <h2>Know-how that stays put. <span class="dim">Agents that start from scratch.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Every chat starts empty</h3><p>People paste the same context into every conversation. In Brain it is written once and every agent reads it.</p></li>
          <li class="reveal"><h3>The same facts, copied everywhere</h3><p>Notes about the company and its people end up duplicated across workflows, Crews and laptops, and drift apart. Brain keeps one copy.</p></li>
          <li class="reveal"><h3>Skills copied between laptops</h3><p>A skill shared as a file goes stale in every copy. Publish it to Brain once, and clients fetch the current version.</p></li>
          <li class="reveal"><h3>Knowledge in heads and threads</h3><p>Decisions and runbooks live in a few people's memory or a Slack thread. Brain gives them a home your agents can search.</p></li>
          <li class="reveal"><h3>No control over who sees what</h3><p>Access is set per folder with Reader, Editor and Owner roles, and an agent only reaches what the person it runs as can.</p></li>
          <li class="reveal"><h3>It piles up and gets messy</h3><p>One command, <code>/organize</code>, merges duplicates and tidies folders by products, teams or entities, and every move is reported.</p></li>
        </ul>
      </div>
    </section>

    <section class="section" id="how">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How it works</p>
          <h2>Folders, roles and one connection. <span class="dim">Used by every agent.</span></h2>
        </div>
        <ol class="loop reveal">
          <li><h3>Organize in folders</h3><p>Skills, notes, facts and sources live as Markdown entries in nested folders. You choose the structure, and agents can tidy it.</p></li>
          <li><h3>Grant by folder</h3><p>Give people and agents Reader, Editor or Owner on a folder. Access carries down into the folders inside it.</p></li>
          <li><h3>Connect your agents</h3><p>Crews, Code and Goals use Brain directly. Claude Code and other MCP clients connect to the same Brain. Each project picks off, read only, read and write, or chosen folders.</p></li>
          <li><h3>Keep it safe</h3><p>Every entry has a history you can roll back, and you can back it up to a private Git repository.</p></li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Company skills</p>
          <h2>Publish a skill once. <span class="dim">Everyone gets the current version.</span></h2>
          <p class="lede">Skills are shared today as files people copy into their own AI. In Brain, a skill is an entry with a version and an author. Anyone with access to its folder can use it from their own agent, and the agent says which version it followed. Skills that include scripts need a folder Owner to publish them.</p>
        </div>
        <ul class="control">
          <li class="reveal"><h3>One source</h3><p>Update the skill in Brain and every agent that uses it gets the change.</p></li>
          <li class="reveal"><h3>Versioned</h3><p>Each publish makes a new version, with the author and date recorded.</p></li>
          <li class="reveal"><h3>Works from your own tools</h3><p>An MCP client such as Claude Code fetches a skill and installs it in its own skills folder.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Brain, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_BRAIN)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Start with what everyone keeps asking. <span class="dim">Put it in Brain.</span></h2>
        <p>We set up Brain with your team: pick the first folders, move in the notes people ask about most, and connect your agents.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/product/">All products</a>
        </div>
      </div>
    </section>
  </main>
'''
BRAIN_LD={"@type":"WebPage","name":"AgentWorks Brain","url":"https://agentworkshq.com/brain/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['brain/index.html']=head('AgentWorks Brain - Shared Company Knowledge for Every AI Agent','Brain is one shared place for your company\'s skills, notes and facts. Write it once, share it by folder, and every Crew, Code workspace, Goal and MCP client reads the same knowledge, with history and backup.','/brain/',og='agentworks-product-og.jpg',extra_ld=ld(BRAIN_LD,BC('Brain','/brain/'),faq_ld(FAQ_BRAIN)))+header('product')+brain_body+footer()
