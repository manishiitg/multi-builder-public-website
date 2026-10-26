# Business use-case landing pages: /solutions/<slug>/ (data in sol_data.py).
import html as _h
import tpl as _tpl
from sol_data import SOLUTIONS


def _ops(u):
    e=_h.escape
    goal,(mlabel,mval,mpct),(ft,fd),(ct,cd),people,cowork,code=u['ops']
    return f'''
    <section class="section-tight" id="run">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How this team runs on agents</p>
          <h2>A goal on top. Agents doing the work. <span class="dim">People approving what matters.</span></h2>
        </div>
        <div class="ops reveal" aria-label="Example: how Goals, Flows, Crews, people and their own AI fit together">
          <div class="ops-goal">
            <p class="ops-k"><span class="ops-ic ic-goal"></span>Goal <em>Illustrative</em></p>
            <p class="ops-title">&ldquo;{e(goal)}&rdquo;</p>
            <div class="ops-meter"><small>{e(mlabel)}</small><b>{e(mval)}</b><span class="ops-bar"><i class="ob{int(round(mpct/10.0)*10)}"></i></span></div>
            <p class="ops-sub">Agents own the target end to end. Every day the number is checked and what is not working gets changed.</p>
          </div>
          <div class="ops-row">
            <div class="ops-card"><p class="ops-k"><span class="ops-ic ic-flow"></span>Flow</p><p class="ops-title">{e(ft)}</p><p class="ops-sub">{e(fd)}</p></div>
            <div class="ops-card"><p class="ops-k"><span class="ops-ic ic-crew"></span>Crew</p><p class="ops-title">{e(ct)}</p><p class="ops-sub">{e(cd)}</p></div>
            <div class="ops-card ops-people"><p class="ops-k"><span class="ops-ic ic-person"></span>People</p><p class="ops-title">Approve exceptions only</p><p class="ops-sub">{e(people)}</p></div>
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
    gname,gmetric,(gval,gsub)=u['goal']
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
      <div class="wrap split">
        <ul class="pain">{pains}</ul>
        <div class="goal-spec reveal" aria-label="Example goal">
          <p class="goal-spec-label">Example goal</p>
          <p class="goal-spec-title">{e(gname)}</p>
          <div class="goal-spec-metric">
            <div><small>Primary metric</small><b>{e(gmetric)}</b></div>
            <div class="goal-spec-num"><strong>{e(gval)}</strong></div>
          </div>
          <p class="muted">{e(gsub)}. Illustrative numbers.</p>
        </div>
      </div>
    </section>

    <section class="section" id="agents">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Premade agents</p>
          <h2>Start from agents that <span class="dim">already know the job.</span></h2>
          <p class="lede">Each one comes with its goal, its tools and its guardrails. We set up the first one with you.</p>
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
          <h2>You set the target. <span class="dim">The agents keep working until it's hit.</span></h2>
        </div>
        <ol class="loop reveal">
          <li><h3>Set the goal</h3><p>Pick a premade agent or describe the outcome, then agree the metric and target with us.</p></li>
          <li><h3>Run</h3><p>Agents work through your tools on a schedule, with your approval on anything that goes out.</p></li>
          <li><h3>Measure</h3><p>Every run records what it did and what it moved, so you see progress, not activity.</p></li>
          <li><h3>Every run improves it</h3><p>It fixes what broke, drops what didn't work and tries the next idea.</p></li>
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
        <div class="section-head reveal"><p class="kicker">More use cases</p><h2>Other goals agents can own.</h2></div>
        <div class="uc-grid">{others}</div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Start with one goal. <span class="dim">We'll set it up with you.</span></h2>
        <p>Book a short call. We connect your tools, pick the agent and agree the metric together.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/pricing/">See pricing</a>
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
