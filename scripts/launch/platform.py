# /platform/: how AgentWorks works, on one page (owner 2026-11-28: the story is the whole team getting faster;
# Goals, Flows, LLM Gateway, Crews and Studio pages are retired and redirect here).
PLATFORM_HOW=[
  ('Ask','Anyone asks the team&rsquo;s agents for data, status or a draft, from the app, Slack, WhatsApp or their own AI tool. The agents work in the company&rsquo;s real tools, so nobody waits for the one person who knows.'),
  ('Hand off','Any person or agent hands work to another agent and gets the result back, across teams, laptops and the server. A person is pulled in only when the decision is theirs.'),
  ('Keep it running','Agents stay online and run routine work on a schedule: the daily report, the follow-ups, the checks. It is done before anyone asks.'),
]
PLATFORM_PARTS=[
  ('One team room','People and their agents work in one shared project on your server. The Team panel shows who, person or agent, is on what, so the stand-up becomes a glance.',None),
  ('AgentBridge','Agents message each other and hand over work, across people, laptops and the server. Claude Code, Codex, Cursor and the team&rsquo;s other agents join the same network.','/agentbridge/'),
  ('Team kit','Tool connections (MCPs), secrets and skills set up once and shared across teams and projects. A new teammate or project starts with every system already connected.',None),
  ('Brain','Company knowledge and skills written once and read by every agent, with versions and folder permissions.','/brain/'),
  ('Vault','Secrets and tool access in one place: who may use which tool and credential, with every call recorded.','/vault/'),
  ('Premade agents','Ready agents for common work, such as invoice chasing, sales follow-up and support replies, to start from and adapt.','/agents/'),
]
PLATFORM_FAQ=[
  ("Do we have to replace Jira, Notion or Slack?","No. Your tools stay where they are. Agents work inside them through connections set up once in the Team kit (open the ticket, fill the sheet, post the summary), and AgentWorks adds the missing part: who does it next and where it stands."),
  ("Is it only for engineering teams?","No. Sales, support, finance, marketing, operations, product and engineering use it the same way. Developers keep their worktrees, pull requests, editor and terminal; everyone else works in chat."),
  ("Which AI does it use?","The plans your people already pay for: Claude, ChatGPT, Gemini, Cursor and others, through each vendor's own agent. People keep the AI tool they like, side by side on the same team, with no new per-seat AI bill."),
  ("Where does it run?","On your own server, or on a Mac. Your work, files and chats stay in your environment; AI requests go only to the providers you connect. The source is public, so your security team can read it."),
  ("Can an agent send something on its own?","Not unless you allow it. Emails, messages, payments and posts wait for a person by default."),
  ("How do we start?","Book a short call. In four weeks we set AgentWorks up with one of your teams on your servers, around one piece of work they pass around by hand. Then your team runs it."),
]
def _how(items):
    return '\n'.join(f'''          <li><b>{t}</b><span>{d}</span></li>''' for t,d in items)
def _parts(items):
    return '\n'.join(f'''          <li class="reveal"><h3>{t}</h3><p>{d}</p>{f'<p><a href="{h}">More about {t} &rarr;</a></p>' if h else ''}</li>''' for t,d,h in items)
platform_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">How it works</p>
        <h1>Everyone&rsquo;s AI agents, working as one team. <span class="dim">On top of the tools you already use.</span></h1>
        <p class="lede">Everyone on your team has AI, but each person&rsquo;s AI works alone and the work between people still moves by hand. AgentWorks connects them: anyone hands work to an agent, agents pass it on, and everyone sees where it stands.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="{DEMO}" target="_blank" rel="noreferrer">Try the demo</a>
        </div>
      </div>
    </section>

    <section class="section-tight" id="how">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Three things</p>
          <h2>Ask. Hand off. Keep it running.</h2>
        </div>
        <ol class="online-steps harness-steps reveal">
{_how(PLATFORM_HOW)}
        </ol>
      </div>
    </section>

    <section class="section-tight" id="one-request">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">One piece of work, across the team</p>
          <h2>What it looks like. <span class="dim">Illustrative example.</span></h2>
          <p class="lede">QA finds a broken checkout button the day before a release.</p>
        </div>
        <ol class="online-steps harness-steps reveal">
          <li><b>QA hands it off</b><span>The tester tells their agent what broke. It opens the Jira ticket with the steps and a screenshot.</span></li>
          <li><b>The developer&rsquo;s agent picks it up</b><span>It lands as a task with the developer&rsquo;s agent, details attached, and the fix starts.</span></li>
          <li><b>A person decides</b><span>The developer reviews the change. Nothing ships without them.</span></li>
          <li><b>Everyone sees it</b><span>The PM asks &ldquo;is checkout fixed?&rdquo; and gets the answer from an agent, without pinging anyone.</span></li>
        </ol>
      </div>
    </section>

    <section class="section-tight" id="parts">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">What it&rsquo;s made of</p>
          <h2>Set up once for the company. <span class="dim">Shared by every team.</span></h2>
        </div>
        <ul class="control two">
{_parts(PLATFORM_PARTS)}
        </ul>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Easy to say yes to</p>
          <h2>Nothing to replace. <span class="dim">Nothing leaves your company.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Keep your tools</h3><p>Jira, Notion, Google Docs and Sheets, Slack and the rest stay. AgentWorks is a layer on top.</p></li>
          <li class="reveal"><h3>Bring your own AI</h3><p>Each person uses the AI plan they already pay for. No forced switch, no second AI bill per seat.</p></li>
          <li class="reveal"><h3>Your servers</h3><p>Runs on your own server or a Mac. Your work, files and chats stay with you.</p></li>
          <li class="reveal"><h3>People approve what goes out</h3><p>Emails, messages, payments and posts wait for a person unless you allow them.</p></li>
          <li class="reveal"><h3>Every role</h3><p>Developers get worktrees, pull requests and terminals. Everyone else asks in plain words.</p></li>
          <li class="reveal"><h3>Source available</h3><p>The code is public under the Business Source License; your company runs it under a commercial licence.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">FAQ</p>
          <h2>Questions, answered.</h2>
        </div>
        <div class="faq reveal">
          {faq(PLATFORM_FAQ)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Pick one piece of work your team passes around. <span class="dim">We&rsquo;ll set it up with you.</span></h2>
        <p>In four weeks, one team, on your servers. Then your team runs it.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/pricing/">How we work</a>
        </div>
      </div>
    </section>
  </main>
'''
pages['platform/index.html']=head('How AgentWorks Works - Everyone\'s AI Agents Working as One Team','Anyone asks the team\'s agents, hands work off and keeps routine work running, on top of the tools you already use. AgentBridge, Team kit, Brain and Vault, on your servers.','/platform/',og='agentworks-product-og.jpg',extra_ld=ld(faq_ld(PLATFORM_FAQ),BC('How it works','/platform/')))+header('platform')+platform_body+footer()
SITEMAP_EXTRA=globals().get('SITEMAP_EXTRA',[])+[('/platform/','2026-11-28')]
