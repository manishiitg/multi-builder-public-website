exec(open('enterprise.py').read().split("FAQ_ENT=")[0])  # reuse AREAS/areas()
body=f'''  <main id="main" data-tpl-filter>
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Premade agents</p>
        <h1>Premade agents, ready to start today.</h1>
        <p class="lede">Every premade agent ships with its goal, the tools it needs and sensible guardrails. Install it, answer a few questions, and it starts running. Tune anything later.</p>
        <label class="search"><span class="sr-only">Search agents</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input type="search" placeholder="Search: invoices, Shopify, SEO…" data-tpl-search>
        </label>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="tabs" role="group" aria-label="Filter agents">
          <button type="button" data-filter="all" aria-pressed="true">All</button>
          <button type="button" data-filter="money" aria-pressed="false">Money</button>
          <button type="button" data-filter="customers" aria-pressed="false">Customers</button>
          <button type="button" data-filter="growth" aria-pressed="false">Growth</button>
          <button type="button" data-filter="ops" aria-pressed="false">Operations</button>
          <button type="button" data-filter="eng" aria-pressed="false">Engineering</button>
        </div>

        <div class="tpl-section" data-tpl-section>
          <div class="tpl-section-head">
            <h2>For your business</h2>
            <p>Rolling out now, included in every plan. Crew agents live in your chat; Goal agents run on their own against a target.</p>
          </div>
          <div class="tpl-grid">
          {tpl('smb')}
          </div>
        </div>

        <div class="tpl-section" id="engineering" data-tpl-section>
          <div class="tpl-section-head">
            <h2>For engineering teams</h2>
            <p>Playbooks for QA, reliability, security, performance and cloud cost. Included in every plan, and tuned to your stack on <a href="/enterprise/">Enterprise</a>.</p>
          </div>
          <div class="tpl-grid">
          {tpl('eng')}
          </div>
        </div>
        <p class="empty" data-tpl-empty>No agents match that search. <a href="{SIGNUP}" target="_blank" rel="noreferrer">Describe your goal</a> and we'll build it with you.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Full playbook library</p>
          <h2>All 23 engineering playbooks.</h2>
          <p class="lede">Versioned, open source and written as plain Markdown skill packages, so you can read them, fork them or write your own from the template.</p>
        </div>
        <div class="areas">
          {areas()}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <div class="cta-card">
          <h2>Don't see your goal?</h2>
          <p>Describe the outcome in a sentence. AgentWorks proposes the plan, the tools and the metric, and you approve it.</p>
          <div class="cta-actions">
            <a class="btn btn-primary" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
            <a class="btn btn-ghost" href="{INSTALL}" target="_blank" rel="noreferrer">Download free app</a>
          </div>
        </div>
      </div>
    </section>
  </main>
'''
import tpl as _tpl
ITEMS={"@type":"ItemList","name":"AgentWorks premade agents","itemListElement":[{"@type":"ListItem","position":i+1,"name":t[3],"description":t[4]+' Goal: '+t[5]+'.'} for i,t in enumerate(_tpl.SMB+_tpl.ENG)]}
TPL_LD={"@type":"CollectionPage","name":"AgentWorks Premade Agents","url":"https://agentworkshq.com/agents/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['agents/index.html']=head('AgentWorks Premade Agents - Ready-Made AI Teammates and Goals','Premade AI agents for business: invoice chasing, inbox triage, support, lead follow-up, Shopify orders and SEO, plus 23 engineering playbooks. Each has a goal.','/agents/',og='agentworks-agents-og.jpg',extra_ld=ld(TPL_LD,BC('Premade agents','/agents/'),ITEMS))+header('agents')+body+footer()
