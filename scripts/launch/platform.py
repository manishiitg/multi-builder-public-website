# /platform/: everything AgentWorks does, on one page for a company buyer (owner 2026-10-26: the site sells
# to enterprises and B2B companies; products are capabilities of one platform, not separate things to buy).
# The detail pages (/goals/, /crews/ ...) stay as "learn more" links. No pricing numbers on the site yet.
PLATFORM_DO=[
  ('/goals/','Run a process toward a number','Give agents a process and a target, like collecting overdue invoices or replying to every new lead within ten minutes. They run it on schedule, every run is measured, and the plan is improved from what the numbers show.','Goals'),
  ('/crews/','Give every team an expert agent','Turn what one person knows into an agent the whole team asks from Slack, WhatsApp, the app or their own AI. ','Crews'),
  ('/studio/','A private AI workspace for every employee','Each person works with their own AI on the Claude, ChatGPT or Codex plans your company already pays for, with skills, tools and files ready on day one, and the company sees cost and usage per person.','Studio'),
  ('/flows/','Fixed steps your systems can call','Early access. Chain agent steps, rules and scripts into one sequence and call it from your website, CRM or any system through an API or webhook.','Flows'),
]
PLATFORM_FOUNDATION=[
  ('/brain/','Shared knowledge','Policies, product facts and skills written once and read by every agent, with versions and folder permissions.','Brain'),
  ('/vault/','Tools and secrets under control','One governed door to your tools and credentials. IT decides which group can use what, and every call is recorded.','Vault'),
  ('/llm-gateway/','Model access and cost per person','Choose which AI models each person and agent may use, and see the cost by person and by model. Coming soon.','LLM Gateway'),
  ('/agentbridge/','Connect the agents your people already run','Claude Code, Codex, Cursor and ChatGPT join one company network, ask each other and your Crews for help, and hand work over.','AgentBridge'),
]
PLATFORM_FAQ=[
  ("Do we have to buy each product separately?","No. AgentWorks is one platform. We start with one process your team wants handed to agents, set up the parts it needs, and add more as you go."),
  ("Where does it run?","In your own cloud or private infrastructure, with single sign-on. Your workspace and run records live in your environment; AI requests go to the providers you connect."),
  ("Which AI models does it use?","The Claude, ChatGPT, Gemini or Cursor plans your company already pays for, through each vendor's own agent. You can change models without rebuilding the work."),
  ("How do people stay in control?","Anything that goes out, such as emails, messages or payments, waits for a person's approval unless you allow it. Every run is recorded with what it did, what it cost and who approved it."),
  ("How do we start?","Book a short call. We pick one process with you, run a four-week pilot on it in your environment, then review the results together."),
]
def _cards(items):
    return '\n'.join(f'''          <li class="reveal"><h3>{t}</h3><p>{d}</p><p><a href="{h}">{n} &rarr;</a></p></li>''' for h,t,d,n in items)
platform_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Platform</p>
        <h1>One platform for the agents that run your processes. <span class="dim">Your people stay in charge.</span></h1>
        <p class="lede">AgentWorks gives your company agents that do real work inside your processes, an expert agent for every team, and the controls IT and leadership need, deployed in your own cloud.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="{DEMO}" target="_blank" rel="noreferrer">Try the demo</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">What it does</p>
          <h2>The work agents take on. <span class="dim">Four ways to use it.</span></h2>
        </div>
        <ul class="control two">
{_cards(PLATFORM_DO)}
        </ul>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Shared foundation</p>
          <h2>What every agent runs on. <span class="dim">Set up once for the company.</span></h2>
        </div>
        <ul class="control two">
{_cards(PLATFORM_FOUNDATION)}
        </ul>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Control</p>
          <h2>Built for how companies buy software. <span class="dim">Not a tool someone installed on a laptop.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Your cloud</h3><p>Deployed in your VPC or private cloud, customized to your processes, tools and approval rules.</p></li>
          <li class="reveal"><h3>Single sign-on</h3><p>SAML or OIDC sign-in, with access by team and person. Being in the company is not access; sharing is.</p></li>
          <li class="reveal"><h3>Every run recorded</h3><p>Runs on AgentWorks keep what was asked, what was done, what it cost and who approved it; messages between connected agents are kept too. Visible to the people the work is shared with.</p></li>
          <li class="reveal"><h3>People approve what matters</h3><p>Outgoing messages, payments and changes wait for a named person unless you allow them.</p></li>
          <li class="reveal"><h3>Your AI plans</h3><p>Runs on the Claude, ChatGPT, Gemini or Cursor plans you already pay for. No new model contract.</p></li>
          <li class="reveal"><h3>Source available</h3><p>The code is public under the Business Source License, with a commercial license for your deployment.</p></li>
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
        <h2>Tell us the process. <span class="dim">We'll show you how agents fit.</span></h2>
        <p>Book a short call and we'll scope a pilot around one of your processes.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/pricing/">How we work</a>
        </div>
      </div>
    </section>
  </main>
'''
pages['platform/index.html']=head('AgentWorks Platform - AI Agents for Company Processes','One platform for agents that run your company processes, expert agents for every team, and the controls IT needs: your cloud, single sign-on, every run recorded, people approving what matters.','/platform/',extra_ld=ld(faq_ld(PLATFORM_FAQ),BC('Platform','/platform/')))+header('platform')+platform_body+footer()
SITEMAP_EXTRA=globals().get('SITEMAP_EXTRA',[])+[('/platform/','2026-10-26')]
