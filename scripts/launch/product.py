FAQ_PRODUCT=[
 ("What makes a good goal?","One outcome you care about and one number that proves it, with a target. \"Book 5 demos a week\" works. \"Do more marketing\" doesn't, because nothing can tell whether it happened."),
 ("What if the metric can't be measured automatically?","AgentWorks says so. A missing or stale measurement is flagged on the goal instead of guessed, and the agent asks you how to get the number."),
 ("Can it change my workflow without asking?","Only if you let it. At the default autonomy level it runs steps on its own and asks before posting, sending or editing the workflow. You can move it up or down at any time."),
 ("What's the difference between a Goal and a Crew teammate?","A Goal owns an outcome and keeps working on its own schedule. A Crew teammate is who you talk to: you hand it a job in Slack or WhatsApp, or ask how a goal is doing."),
 ("Can I use it from ChatGPT or Claude?","Yes. AgentWorks includes an MCP server. Connect it to ChatGPT, Claude, Cowork or any MCP client to check goals, read reports and start runs from that chat. Hosted AI apps connect to your AgentWorks server with a sign-in link."),
 ("Does it work with the tools I already use?","Yes. Agents use MCP servers, APIs and their own browser, so anything you can do in a web app, they can do too, with credentials kept in the vault."),
]

AUTONOMY=[
 ("Ask first","Proposes every step and waits for your yes. Good for week one."),
 ("Run steps","Runs the workflow on its own. Asks before anything goes out or the workflow changes."),
 ("Edit workflow","Also rewrites its own steps when the evidence says a change will move the goal."),
 ("Full","Runs, changes and ships within the rules you set. You review the log, not each step."),
]
def autonomy_levels():
    return '\n          '.join(f'<li class="reveal"><small>Level {i+1}</small><h3>{t}</h3><p>{d}</p></li>' for i,(t,d) in enumerate(AUTONOMY))

import re as _re
_LAYERS=open('product_layers.html').read()
_LAYERS=_re.sub(r'\{\{LOGO:(\w+)\}\}',lambda m: logo(m.group(1)),_LAYERS)
_LAYERS=_re.sub(r'\{\{TOOL:(\w+)\}\}',lambda m: tool(m.group(1)),_LAYERS)
_LAYERS=_LAYERS.replace('{{SIGNUP}}',SIGNUP).replace('{{CAL}}',CAL)
# The layers file holds four sections: engine, crew, layer-workflow and bring-your-own-AI.
_SECS=['    <section'+x for x in _LAYERS.split('    <section')[1:]]
LAYER={('byo' if 'id="' not in x.split('>')[0] else _re.search(r'id="([^"]+)"',x).group(1)):x.rstrip()+'\n' for x in _SECS}
FAQ_OVERVIEW=[FAQ_HOME[0]]+[q for q in FAQ_PRODUCT if q[0].startswith(("What's the difference","Can I use it","Does it work"))]
def _pcard(h,t,d): return f'<a class="uc-link" href="{h}"><b>{t}</b><span>{d}</span></a>'
PRODUCT_CARDS=''.join(_pcard(h,t,d) for h,t,d in PRODUCT_PAGES)
body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Product</p>
        <h1>One platform. <span class="dim">Agents that own the work.</span></h1>
        <p class="lede">Goals chase a number you set. Crews turn your team's know-how into experts anyone can ask. Code gives every employee a private AI workspace on your server, with cost and output visible to the company. Brain is the shared knowledge every agent reads. Vault governs every MCP tool and shared secret. All of it runs on the AI plan you already pay for.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#demo">Watch the 60-second demo</a>
        </div>
      </div>
    </section>

    <section class="section-tight" id="products">
      <div class="wrap">
        <div class="uc-grid six">{PRODUCT_CARDS}</div>
      </div>
    </section>

    <section class="section-tight" id="demo">
      <div class="wrap">
        <figure class="demo-video reveal">
          <video controls preload="none" playsinline width="1920" height="1080" poster="/assets/video/agentworks-demo-poster.jpg" aria-label="AgentWorks 60-second demo: an agent working toward the goal of booking more sales demos">
            <source src="/assets/video/agentworks-demo.mp4" type="video/mp4" />
          </video>
          <figcaption>60-second demo: an agent with the goal "Book more sales demos". Illustrative data.</figcaption>
        </figure>
      </div>
    </section>

{scripted_section()}
    <section class="section" id="layers">
      <div class="wrap">
        <div class="section-head center reveal">
          <p class="kicker">Under the hood</p>
          <h2>Three layers, <span class="dim">built to run for months.</span></h2>
        </div>
        <ol class="layer-stack reveal" aria-label="The three layers">
          <li><a href="/goals/#layer-workflow"><span>3</span><b>Workflows &amp; goals</b><small>Pipelines of deterministic and agentic steps, learnings and a knowledge base, measured against a goal</small></a></li>
          <li><a href="/crews/#crew"><span>2</span><b>Crews</b><small>An agent with skills, memory, a browser, Slack and WhatsApp, triggers, and calls to other crews</small></a></li>
          <li><a href="#engine-agent"><span>1</span><b>Agents</b><small>Vendor-native Claude Code, Codex, Cursor, Pi and Muse in live terminals, with your MCP tools and sandboxed commands</small></a></li>
        </ol>
      </div>
    </section>

{LAYER["engine"]}{LAYER["byo"]}    <section class="section" id="stack">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Under the hood</p>
          <h2>Built on the tools <span class="dim">you already trust.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 9-4 3 4 3M16 9l4 3-4 3"/></svg></span><h3>Your AI plan</h3><p>Runs each vendor's own coding agent (Claude Code, Codex, Cursor, Pi or Muse) on the subscription you already have, or on that agent's API key.</p></li>
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg></span><h3>Its own browser</h3><p>A persistent, isolated browser per workflow, so agents can work in any web app you use.</p></li>
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/><circle cx="12" cy="12" r="3"/></svg></span><h3>MCP and APIs</h3><p>Connect any MCP server or API. Tools are granted per workflow, not globally.</p></li>
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></span><h3>Secrets vault</h3><p>Encrypted, injected only at run time, never shown in chat or logs.</p></li>
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/></svg></span><h3>Sandboxed commands</h3><p>Every command an agent runs gets an OS-enforced sandbox (Landlock on Linux, sandbox-exec on macOS) and a private /tmp and home folder.</p></li>
          <li class="reveal"><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 12h16M4 19h10"/></svg></span><h3>Full run log</h3><p>Every step, tool call, decision and cost, kept per run.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">How it works, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_OVERVIEW)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Start with one goal or one expert. <span class="dim">We'll set it up with you.</span></h2>
        <p>Start from a premade agent or describe your own. Ten minutes to set up, on the AI plan you already have.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="{INSTALL}">Download free app</a>
        </div>
      </div>
    </section>
  </main>
'''
DEMO_VIDEO_LD={"@type":"VideoObject","name":"AgentWorks in 60 seconds: an agent that books more sales demos","description":"Give an AI agent a goal and a metric. AgentWorks plans the work, asks before anything reaches a customer, measures every run, keeps what works and keeps going until it hits the target. Illustrative data.","thumbnailUrl":"https://agentworkshq.com/assets/video/agentworks-demo-poster.jpg","contentUrl":"https://agentworkshq.com/assets/video/agentworks-demo.mp4","uploadDate":"2026-09-27","duration":"PT1M1S","transcript":"With AgentWorks, you give an agent a goal and a number, and it keeps working until it hits it. Here, the goal is simple: book more sales demos. The metric is demos booked per week. The target is five. AgentWorks turns that into a plan. Pull new signups, research each company, write a personal first email, and follow up with the ones who go quiet. Anything that reaches a customer can wait for you. A key account? It asks first. Approve it, change it, or skip it. After every run, it measures what moved. It keeps what works, and drops what doesn't. Replies went from six hours to ten minutes. The follow-up nobody answered is gone. Six weeks in, it's booking six demos a week. Target met. AgentWorks. Give an agent a goal, and watch the number move."}
PROD_LD={"@type":"WebPage","name":"AgentWorks Product","url":"https://agentworkshq.com/product/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['product/index.html']=head('AgentWorks Product - Goals, Crews, Code and Relays','One platform for AI agents that own the work: Goals that chase a number, Crews your team can ask, Code for a private AI workspace per employee, and Relays, all on the AI plan you already pay for.','/product/',og='agentworks-product-og.jpg',extra_ld=ld(PROD_LD,BC('Product','/product/'),faq_ld(FAQ_OVERVIEW),DEMO_VIDEO_LD))+header('product')+body+footer()

nf_body=f'''  <main id="main">
    <section class="page-hero notfound">
      <div class="wrap">
        <p class="kicker">404</p>
        <h1>This page isn't here. <span class="dim">Your goals still are.</span></h1>
        <p class="lede">The link may be old or mistyped. Here's where to go next.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/">Home</a>
          <a class="btn btn-ghost" href="/product/">Product</a>
          <a class="btn btn-ghost" href="/agents/">Premade agents</a>
          <a class="btn btn-ghost" href="/docs/">Docs</a>
        </div>
      </div>
    </section>
  </main>
'''
nf=head('Page Not Found - AgentWorks','This page does not exist. Go to the AgentWorks homepage, product overview, premade agents or docs.','/404.html',og='agentworks-404-og.jpg',extra_ld=ld({"@type":"WebPage","name":"Page Not Found","url":"https://agentworkshq.com/404.html","isPartOf":{"@id":"https://agentworkshq.com/#website"}}))
nf=nf.replace('<link rel="canonical"','<meta name="robots" content="noindex">\n  <link rel="canonical"',1)
pages['404.html']=nf+header()+nf_body+footer()
