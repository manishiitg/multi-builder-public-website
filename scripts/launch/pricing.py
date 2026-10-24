Y='<span class="yes" aria-label="Included">✓</span>'
N='<span class="no" aria-label="Not included">—</span>'
import tpl as _PB
_PB_N=f"{_PB.N_CREW + _PB.N_GOALS}"
ROWS=[
 ("Goals",None),
 ("Goals with measured targets",(Y,Y)),
 ("Autopilot toward your goals",(Y,Y)),
 ("Premade Goal playbooks",(str(_PB.N_GOALS),str(_PB.N_GOALS))),
 ("Approvals and autonomy limits",(Y,Y)),
 ("Encrypted secrets vault and sandboxed code execution",(Y,Y)),
 ("Run logs and cost per goal",(Y,Y)),
 ("Products for the whole company",None),
 ("Crews: expert agents your team asks, with premade Crew agents",(N,Y)),
 ("Flows: fixed agent chains behind an API",(N,Y)),
 ("Brain: shared company knowledge for every agent",(N,Y)),
 ("Studio: an online AI workspace per employee, with cost and usage by person",(N,Y)),
 ("AgentBridge: every agent on one network",(N,Y)),
 ("Vault: governed MCP access, shared secrets and audit",(N,Y)),
 ("LLM Gateway: model access and cost per person",(N,"Coming soon")),
 ("Company controls",None),
 ("Custom integrations and playbooks built with you",(N,Y)),
 ("SSO (SAML / OIDC) and SCIM",(N,Y)),
 ("Audit log export",(N,Y)),
 ("Commercial license",(N,Y)),
 ("Deployment & support",None),
 ("Where it runs","Your Mac or server|Your VPC or private cloud"),
 ("Onboarding",("Docs","Set up with you")),
 ("Support",("Community","Dedicated + SLA")),
]
def compare():
    out=['<div class="compare-wrap"><table class="compare"><caption class="sr-only">Plan comparison</caption><thead><tr><th scope="col">Feature</th><th scope="col">Goals only</th><th scope="col">Enterprise</th></tr></thead><tbody>']
    for label,vals in ROWS:
        if vals is None:
            out.append(f'<tr class="grp"><th scope="rowgroup" colspan="3">{label}</th></tr>'); continue
        if isinstance(vals,str): vals=vals.split('|')
        out.append(f'<tr><th scope="row">{label}</th>'+''.join(f'<td>{v}</td>' for v in vals)+'</tr>')
    out.append('</tbody></table></div>')
    return '\n        '.join(out)

FAQ_PRICING=[
 ("What can I use without a call?","Goals. Download the app, connect your AI plan and set up your first Goal yourself. Every other product comes with an Enterprise deployment."),
 ("How is Enterprise priced?","A one-time setup fee for customizing and deploying it for your company, then a monthly fee for the platform, updates, support and ongoing changes. We scope both on a call, based on the processes, tools and where it runs."),
 ("What's included in Enterprise?","Everything: Goals, Crews, Flows, Brain, Studio, AgentBridge, Vault and, when it ships, LLM Gateway, deployed in your own cloud, set up for your processes, with SSO, audit logs, custom integrations and dedicated support."),
 ("Is the source code available?","Yes. The source is public under the Business Source License 1.1. Using it in the operation of your business, or offering it to others, needs a commercial license from us, which is included in Enterprise. Each version converts to the Apache License 2.0 after three years."),
 ("Do I need my own AI plan?","Yes. AgentWorks runs on the Claude, ChatGPT, Gemini or Cursor plan you already pay for, through that vendor's own coding agent (or its API key). We never mark up tokens, so your AI bill stays with your provider."),
 ("Which AI plan should I use?","Light use works on a $20 plan. If agents run all day, a $100–$200 plan (Claude Max or ChatGPT Pro) is the sweet spot. You can connect several and route each job to the one that fits."),
 ("Can I move from Goals to Enterprise?","Yes. It's the same engine, so your goals and playbooks move across."),
]

body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Pricing</p>
        <h1>Built for your company. <span class="dim">Customized and deployed with you.</span></h1>
        <p class="lede">AgentWorks is an Enterprise deployment: every product, customized for your processes and deployed in your own cloud, with a one-time setup fee and a monthly fee. Want to try it first? Goals is self-serve. Every plan runs on the AI subscription you already pay for.</p>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        {tiers()}
      </div>
    </section>

    <section class="section" id="onboarding">
      <div class="wrap">
        <div class="section-head center reveal">
          <p class="kicker">How Enterprise works</p>
          <h2>We don't hand you a login. <span class="dim">We build it around your company.</span></h2>
          <p class="lede">A one-time setup fee covers customizing and deploying it. A monthly fee covers the platform, updates, support and changes as you grow.</p>
        </div>
        <ol class="pilot">
          <li class="reveal"><small>Step 1 · 30 minutes</small><h3>Scope it on a call</h3><p>Which process to start with, which tools it touches, who approves what, and where it should run. We tell you honestly if it's a fit.</p></li>
          <li class="reveal"><small>Step 2 · Setup</small><h3>We customize and deploy</h3><p>We deploy in your cloud, connect your tools, load your company knowledge into Brain, set access and approval rules, and build the first agents with your team.</p></li>
          <li class="reveal"><small>Step 3 · Every month</small><h3>It runs, we improve it</h3><p>Your team uses it day to day. We review what the agents did with you, fix what isn't working and add the next process.</p></li>
        </ol>
        <p class="tpl-more center-row"><a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a><a class="btn btn-ghost" href="{INSTALL}">Or try Goals yourself</a></p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Compare plans</p>
          <h2>Everything in each plan.</h2>
        </div>
        {compare()}
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Pricing questions.</h2>
          <p class="muted">Still unsure? <a href="{CAL}" target="_blank" rel="noreferrer">Book 30 minutes with us.</a></p>
        </div>
        <div class="faq">
          {faq(FAQ_PRICING)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <div>
          <h2>Tell us your first process. <span class="dim">We'll build around it.</span></h2>
          <p>Book a call and we'll scope an Enterprise deployment around your company. Or try Goals yourself first.</p>
          <div class="cta-actions">
            <a class="btn btn-primary" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
            <a class="btn btn-ghost" href="{INSTALL}">Try Goals</a>
          </div>
        </div>
      </div>
    </section>
  </main>
'''
PRICE_LD={"@type":"WebPage","name":"AgentWorks Pricing","url":"https://agentworkshq.com/pricing/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
BC=lambda name,path: {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"AgentWorks","item":"https://agentworkshq.com/"},{"@type":"ListItem","position":2,"name":name,"item":"https://agentworkshq.com"+path}]}
pages['pricing/index.html']=head('AgentWorks Pricing - Enterprise Deployment, or Try Goals Yourself','AgentWorks is an Enterprise deployment: Goals, Crews, Flows, Brain, Studio, AgentBridge and Vault, customized and deployed in your own cloud with a setup fee and a monthly fee. Goals is also self-serve. Runs on your own AI plan.','/pricing/',og='agentworks-pricing-og.jpg',extra_ld=ld(PRICE_LD,BC('Pricing','/pricing/'),SOFT,faq_ld(FAQ_PRICING)))+header('pricing')+body+footer()
