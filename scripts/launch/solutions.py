# Business use-case landing pages: /solutions/<slug>/ (data in sol_data.py).
import html as _h
import tpl as _tpl
from sol_data import SOLUTIONS


def _ops(u):
    e=_h.escape
    (ft,fd),(ct,cd),people,cowork,code=u['ops']
    return f'''
    <section class="section-tight" id="run">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How this team runs on agents</p>
          <h2>Ask. Hand off. Keep it running. <span class="dim">Illustrative example.</span></h2>
        </div>
        <div class="ops reveal" aria-label="Example: how this team, its agents and everyone's own AI work together">
          <div class="ops-row">
            <div class="ops-card"><p class="ops-k"><span class="ops-ic ic-crew"></span>Ask</p><p class="ops-title">{e(ct)}</p><p class="ops-sub">{e(cd)}</p></div>
            <div class="ops-card"><p class="ops-k"><span class="ops-ic ic-flow"></span>Keep it running</p><p class="ops-title">{e(ft)}</p><p class="ops-sub">{e(fd)}</p></div>
            <div class="ops-card ops-people"><p class="ops-k"><span class="ops-ic ic-person"></span>Hand off to a person</p><p class="ops-title">Only when it&rsquo;s their call</p><p class="ops-sub">{e(people)}</p></div>
          </div>
          <div class="ops-base">
            <p class="ops-k"><span class="ops-ic ic-net"></span>Everyone&rsquo;s personal AI connects in, through AgentBridge</p>
            <div class="ops-uses">
              <p><span class="hub-chips"><span class="chip">{logo('claude')}Claude Cowork</span><span class="chip">{logo('openai')}ChatGPT</span></span><span>{e(cowork)}</span></p>
              <p><span class="hub-chips"><span class="chip">{logo('claude')}Claude Code</span><span class="chip">{logo('openai')}Codex</span><span class="chip">{logo('cursor')}Cursor</span></span><span>{e(code)}</span></p>
              <p><span class="hub-chips"><span class="chip">{tool('slack')}Slack</span><span class="chip">{tool('whatsapp')}WhatsApp</span></span><span>Everyone else asks and approves where they already talk.</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
'''

def _sol_page(u):
    e=_h.escape
    pains=''.join(f'<li class="reveal"><span class="num">0{i+1}</span><div><b>{e(t)}</b><span>{e(d)}</span></div></li>' for i,(t,d) in enumerate(u['pains']))
    cards='\n'.join(_tpl.card(_tpl.by_name(n)) for n in u['agents'])
    others=''.join(f'<a class="uc-link" href="/solutions/{o["slug"]}/"><b>{e(o["nav"])}</b><span>{e(o["navdesc"])}</span></a>' for o in SOLUTIONS if o is not u)
    return f'''  <main id="main">
    <section class="page-hero left">
      <div class="wrap">
        <p class="kicker">{e(u['kicker'])}</p>
        <h1>{e(u['h1'])} <span class="dim">{e(u['h1dim'])}</span></h1>
        <p class="lede">{e(u['lede'])}</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#run">See how the team runs on agents</a>
        </div>
      </div>
    </section>
{_ops(u)}
    <section class="section-tight">
      <div class="wrap">
        <ul class="pain">{pains}</ul>
      </div>
    </section>

    <section class="section" id="agents">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Premade agents</p>
          <h2>Start from agents that <span class="dim">already know the job.</span></h2>
          <p class="lede">Each one comes with its tools and its guardrails, and asks before anything reaches a customer. We set them up with your team.</p>
        </div>
        <div class="tpl-grid">
          {cards}
        </div>
        <p class="conn-more">Works with {e(u['connectors'])} <a href="/#connectors">See connectors →</a></p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How it works</p>
          <h2>Your team and its agents, <span class="dim">in one place.</span></h2>
        </div>
        <ol class="loop reveal">
          <li><h3>Ask</h3><p>Anyone on the team asks the agents for data, status or a draft, from the app, Slack, WhatsApp or their own AI.</p></li>
          <li><h3>Hand off</h3><p>Agents pass work to each other and to people. A person is asked only when the decision is theirs.</p></li>
          <li><h3>Keep it running</h3><p>Routine jobs run on a schedule, in the tools you already use.</p></li>
          <li><h3>See where it stands</h3><p>Everyone sees who, person or agent, is on what, without chasing anyone.</p></li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Questions, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(u['faq'])}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal"><p class="kicker">More use cases</p><h2>Other teams on AgentWorks.</h2></div>
        <div class="uc-grid">{others}</div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Pick one piece of work this team passes around. <span class="dim">We'll set it up with you.</span></h2>
        <p>In four weeks, on your servers, with your people. Then your team runs it.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/pricing/">How we work</a>
        </div>
      </div>
    </section>
  </main>
'''

for u in SOLUTIONS:
    path=f'/solutions/{u["slug"]}/'
    LD={"@type":"WebPage","name":u['title'],"url":"https://agentworkshq.com"+path,"isPartOf":{"@id":"https://agentworkshq.com/#website"}}
    BCL={"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"AgentWorks","item":"https://agentworkshq.com/"},{"@type":"ListItem","position":2,"name":"Use cases","item":"https://agentworkshq.com/agents/"},{"@type":"ListItem","position":3,"name":u['nav'],"item":"https://agentworkshq.com"+path}]}
    pages[f'solutions/{u["slug"]}/index.html']=head(u['title'],u['desc'],path,og='agentworks-agents-og.jpg',extra_ld=ld(LD,BCL,faq_ld(u['faq'])))+header('solutions')+_sol_page(u)+footer()
