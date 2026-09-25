# Enterprise use-case landing pages: /enterprise/<slug>/. Content maps to the real playbooks in coding-agent-loop/playbooks.
import html as _h

from uc_data import USECASES, uc_nav_items

def _page(u):
    e=_h.escape
    pains=''.join(f'<li class="reveal"><span class="num">0{i+1}</span><div><b>{e(t)}</b><span>{e(d)}</span></div></li>' for i,(t,d) in enumerate(u['pains']))
    steps=''.join(f'<li><h3>{e(t)}</h3><p>{e(d)}</p></li>' for t,d in u['steps'])
    pbs=''.join(f'<li>{e(p)}</li>' for p in u['playbooks'])
    gname,gmetric,(gval,gsub)=u['goal']
    others=''.join(f'<a class="uc-link" href="/enterprise/{o["slug"]}/"><b>{e(o["nav"])}</b><span>{e(o["navdesc"])}</span></a>' for o in USECASES if o is not u)
    return f'''  <main id="main">
    <section class="page-hero left">
      <div class="wrap">
        <p class="kicker">{e(u['kicker'])}</p>
        <h1>{e(u['h1'])} <span class="dim">{e(u['h1dim'])}</span></h1>
        <p class="lede">{e(u['lede'])}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#playbooks">See the playbooks</a>
        </div>
      </div>
    </section>

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

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How it works</p>
          <h2>Agents own the goal. <span class="dim">You own the approvals.</span></h2>
        </div>
        <ol class="loop reveal">{steps}</ol>
      </div>
    </section>

    <section class="section" id="playbooks">
      <div class="wrap split">
        <div class="reveal">
          <p class="kicker">Playbooks</p>
          <h2>Ready to install. <span class="dim">Tuned to your stack.</span></h2>
          <p class="lede">Each playbook sets up the goal, the tools, the evidence to keep and the questions agents should ask your team. They are open source and versioned, and we tune them to your environment during the pilot.</p>
        </div>
        <ul class="pb-list reveal">{pbs}</ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Built for your security review</p>
          <h2>Runs in your cloud. <span class="dim">Every action on the record.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Self-hosted</h3><p>Deployed in your cloud account or data center. Evidence stays in your environment.</p></li>
          <li class="reveal"><h3>Approvals</h3><p>Anything that changes production or reaches people waits for approval by default.</p></li>
          <li class="reveal"><h3>Audit trail</h3><p>Every run, tool call, decision and cost is recorded per workflow.</p></li>
          <li class="reveal"><h3>Your models</h3><p>Your enterprise Claude, ChatGPT or Gemini agreements, or private endpoints.</p></li>
          <li class="reveal"><h3>Scoped access</h3><p>Tools, folders and secrets are granted per workflow, inside an OS-enforced sandbox.</p></li>
          <li class="reveal"><h3>SSO and roles</h3><p>Sign-in through your identity provider, with roles and per-workflow access.</p></li>
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
        <h2>Pick the goal. <span class="dim">We'll prove it in four weeks.</span></h2>
        <p>A scoped pilot on one goal, in your environment, with the success metric agreed up front.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/enterprise/">Enterprise overview</a>
        </div>
      </div>
    </section>
  </main>
'''

for u in USECASES:
    path=f'/enterprise/{u["slug"]}/'
    LD={"@type":"WebPage","name":u['title'],"url":"https://agentworkshq.com"+path,"isPartOf":{"@id":"https://agentworkshq.com/#website"}}
    BCL={"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"AgentWorks","item":"https://agentworkshq.com/"},{"@type":"ListItem","position":2,"name":"Enterprise","item":"https://agentworkshq.com/enterprise/"},{"@type":"ListItem","position":3,"name":u['nav'],"item":"https://agentworkshq.com"+path}]}
    pages[f'enterprise/{u["slug"]}/index.html']=head(u['title'],u['desc'],path,og='agentworks-enterprise-og.jpg',extra_ld=ld(LD,BCL,faq_ld(u['faq'])))+header('enterprise')+_page(u)+footer()
