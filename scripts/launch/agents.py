import tpl as _tpl
TABS='\n          '.join(f'<button type="button" data-filter="{k}" aria-pressed="false">{v}</button>' for k,v in _tpl.TEAMS)
def _section(k,label):
    crew=[t for t in _tpl.CREW if t['team']==k]; goals=[t for t in _tpl.GOALS if t['team']==k]
    parts=[f'<div class="tpl-section" id="team-{k}" data-tpl-section>',
           f'  <div class="tpl-section-head"><h2>{label}</h2><p>{len(crew)} Crew agents · {len(goals)} Goal playbooks</p></div>']
    if crew: parts+=['  <h3 class="tpl-kind">Crew agents</h3>','  <div class="tpl-grid">',_tpl.cards(crew),'  </div>']
    if goals: parts+=['  <h3 class="tpl-kind">Goal playbooks</h3>','  <div class="tpl-grid">',_tpl.cards(goals),'  </div>']
    parts.append('</div>')
    return '\n        '.join(parts)
SECTIONS='\n\n        '.join(_section(k,v) for k,v in _tpl.TEAMS)
body=f'''  <main id="main" data-tpl-filter>
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Premade agents</p>
        <h1>Premade agents, ready to start today. <span class="dim">{_tpl.N_CREW + _tpl.N_GOALS} of them.</span></h1>
        <p class="lede">{_tpl.N_CREW} Crew agents you talk to in chat, Slack or WhatsApp, and {_tpl.N_GOALS} Goal playbooks that run on their own against a target. Each ships with its setup steps, the tools it needs and guardrails that ask before anything reaches a customer. Open source: read, fork or extend any of them.</p>
        <label class="search"><span class="sr-only">Search agents</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input type="search" placeholder="Search: invoices, refunds, Shopify, SEO, incidents…" data-tpl-search>
        </label>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="tabs" role="group" aria-label="Filter agents">
          <button type="button" data-filter="all" aria-pressed="true">All</button>
          {TABS}
        </div>

        {SECTIONS}
        <p class="empty" data-tpl-empty>No agents match that search. <a href="{SIGNUP}" target="_blank" rel="noreferrer">Describe your goal</a> and we'll build it with you.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Open source library</p>
          <h2>Read every agent before you install it.</h2>
          <p class="lede">Each Crew agent and Goal playbook is a versioned, plain-Markdown skill package with its setup checks, required tools and the evidence it keeps. Fork one, or write your own from the template.</p>
        </div>
        <p class="center-row"><a class="btn btn-ghost" href="{_tpl.GH_PLAYBOOKS}" target="_blank" rel="noreferrer">Browse the library on GitHub</a></p>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <div>
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
ITEMS={"@type":"ItemList","name":"AgentWorks premade agents","numberOfItems":len(_tpl.ALL),"itemListElement":[{"@type":"ListItem","position":i+1,"name":t['name'],"description":t['purpose']} for i,t in enumerate(_tpl.ALL)]}
TPL_LD={"@type":"CollectionPage","name":"AgentWorks Premade Agents","url":"https://agentworkshq.com/agents/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['agents/index.html']=head('AgentWorks Premade Agents - Ready-Made AI Teammates and Goals',f'{_tpl.N_CREW + _tpl.N_GOALS} open-source premade AI agents: Crew teammates and goal-driven playbooks for sales, support, finance, Shopify, marketing, operations, product and engineering.','/agents/',og='agentworks-agents-og.jpg',extra_ld=ld(TPL_LD,BC('Premade agents','/agents/'),ITEMS))+header('agents')+body+footer()
