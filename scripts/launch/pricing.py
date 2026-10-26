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
 ("How is Enterprise priced?","A one-time setup fee for customizing and deploying it for your company, then a monthly fee for the platform, updates, support and ongoing changes. We scope both on a call, based on the processes, tools and where it runs."),
 ("What's included in Enterprise?","Everything: Goals, Crews, Flows, Brain, Studio, AgentBridge, Vault and, when it ships, LLM Gateway, deployed in your own cloud, set up for your processes, with SSO, audit logs, custom integrations and dedicated support."),
 ("Is the source code available?","Yes. The source is public under the Business Source License 1.1. Using it in the operation of your business, or offering it to others, needs a commercial license from us, which is included in Enterprise. Each version converts to the Apache License 2.0 after three years."),
 ("Do I need my own AI plan?","Yes. AgentWorks runs on the Claude, ChatGPT, Gemini or Cursor plan you already pay for, through that vendor's own coding agent (or its API key). We never mark up tokens, so your AI bill stays with your provider."),
]

body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">How we work</p>
        <h1>We don't hand you a login. <span class="dim">We build it around your company.</span></h1>
        <p class="lede">AgentWorks is deployed for each company: customized for your processes, connected to your tools and running in your own cloud. A one-time setup fee covers that work, and a monthly fee covers the platform, updates, support and changes as you grow. We scope both on a call.</p>
      </div>
    </section>


    <section class="section" id="onboarding">
      <div class="wrap">
        <div class="section-head center reveal">
          <p class="kicker">Three steps</p>
          <h2>One process first. <span class="dim">Results before scale.</span></h2>
        </div>
        <ol class="pilot">
          <li class="reveal"><small>Step 1 · 30 minutes</small><h3>Scope it on a call</h3><p>Which process to start with, which tools it touches, who approves what, and where it should run. We tell you honestly if it's a fit.</p></li>
          <li class="reveal"><small>Step 2 · Setup</small><h3>We customize and deploy</h3><p>We deploy in your cloud, connect your tools, load your company knowledge into Brain, set access and approval rules, and build the first agents with your team.</p></li>
          <li class="reveal"><small>Step 3 · Every month</small><h3>It runs, we improve it</h3><p>Your team uses it day to day. We review what the agents did with you, fix what isn't working and add the next process.</p></li>
        </ol>
        <p class="tpl-more center-row"><a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a></p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">What's included</p>
          <h2>Everything your deployment needs. <span class="dim">One platform, set up with you.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Agents for your processes</h3><p>Goals that run a process toward a number, Crews your teams ask, Flows your systems call, and the premade agents to start from. <a href="/platform/">See the platform</a>.</p></li>
          <li class="reveal"><h3>Built around your tools</h3><p>Integrations, company knowledge and approval rules set up for your processes, by us, with your team.</p></li>
          <li class="reveal"><h3>Company controls</h3><p>Single sign-on (SAML or OIDC), SCIM, Vault for tools and secrets, audit log export, every run recorded with its cost.</p></li>
          <li class="reveal"><h3>Your cloud</h3><p>Deployed in your VPC or private cloud, on the AI plans you already pay for. We never mark up model tokens.</p></li>
          <li class="reveal"><h3>Commercial license</h3><p>The source is public under the Business Source License; your deployment comes with a commercial license.</p></li>
          <li class="reveal"><h3>Support that stays</h3><p>Dedicated support with an SLA, a monthly review of what the agents did, and changes as you add teams.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Questions, answered.</h2>
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
          <p>Book a call and we'll scope a pilot around one of your processes.</p>
          <div class="cta-actions">
            <a class="btn btn-primary" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
      </div>
    </section>
  </main>
'''
PRICE_LD={"@type":"WebPage","name":"How AgentWorks works","url":"https://agentworkshq.com/pricing/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
BC=lambda name,path: {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"AgentWorks","item":"https://agentworkshq.com/"},{"@type":"ListItem","position":2,"name":name,"item":"https://agentworkshq.com"+path}]}
pages['pricing/index.html']=head('How AgentWorks Works - Deployed and Customized for Your Company','AgentWorks is deployed for each company: customized for your processes, connected to your tools and running in your own cloud, with a one-time setup fee and a monthly fee scoped on a call.','/pricing/',og='agentworks-pricing-og.jpg',extra_ld=ld(PRICE_LD,BC('Pricing','/pricing/'),SOFT,faq_ld(FAQ_PRICING)))+header('pricing')+body+footer()
