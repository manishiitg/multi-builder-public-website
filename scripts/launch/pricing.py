Y='<span class="yes" aria-label="Included">✓</span>'
N='<span class="no" aria-label="Not included">—</span>'
import tpl as _PB
_PB_N=f"{_PB.N_CREW + _PB.N_GOALS}"
ROWS=[
 ("Teammates & goals",None),
 ("Crew teammates",("Unlimited","Unlimited")),
 ("Goals with measured targets",(Y,Y)),
 ("Auto-improvement toward your goals",(Y,Y)),
 ("Premade Crew agents and Goal playbooks",(_PB_N,_PB_N)),
 ("Engineering playbooks",(Y,Y)),
 ("Relays: fixed agent chains behind an API",(Y,Y)),
 ("Custom playbooks built with you",(N,Y)),
 ("Channels & tools",None),
 ("Slack and WhatsApp",(Y,Y)),
 ("Gmail updates and granted mailbox work",(Y,Y)),
 ("Browser per teammate or goal",("Self-run","Your cloud")),
 ("MCP servers and API tools",(Y,Y)),
 ("Expert Crews: call shared Crews from MCP clients and the CLI",(Y,Y)),
 ("Custom integrations",(N,Y)),
 ("Control & security",None),
 ("Approvals and autonomy limits",(Y,Y)),
 ("Encrypted secrets vault",(Y,Y)),
 ("Sandboxed code execution",(Y,Y)),
 ("Run logs and cost per goal",(Y,Y)),
 ("Roles and per-goal sharing",(Y,Y)),
 ("Code: a private AI workspace per employee, shared plans, cost and usage by person",(Y,Y)),
 ("Brain: shared company knowledge for every agent, with folder access and history",(Y,Y)),
 ("Vault: governed MCP access, shared secrets and audit",(N,"Early access")),
 ("SSO (SAML / OIDC) and SCIM",(N,Y)),
 ("Audit log export",(N,Y)),
 ("Deployment & support",None),
 ("Where it runs","Your Mac or server|Your VPC or private cloud"),
 ("Onboarding",("Docs","Scoped pilot")),
 ("Support",("Community","Dedicated + SLA")),
]
def compare():
    out=['<div class="compare-wrap"><table class="compare"><caption class="sr-only">Plan comparison</caption><thead><tr><th scope="col">Feature</th><th scope="col">Free for developers</th><th scope="col">Custom deployment</th></tr></thead><tbody>']
    for label,vals in ROWS:
        if vals is None:
            out.append(f'<tr class="grp"><th scope="rowgroup" colspan="3">{label}</th></tr>'); continue
        if isinstance(vals,str): vals=vals.split('|')
        out.append(f'<tr><th scope="row">{label}</th>'+''.join(f'<td>{v}</td>' for v in vals)+'</tr>')
    out.append('</tbody></table></div>')
    return '\n        '.join(out)

FAQ_PRICING=[
 ("How is a custom deployment priced?","A one-time setup fee for customizing and deploying it for your company, then a monthly fee for the platform, updates, support and ongoing changes. We scope both on a call, based on the processes, tools and where it runs."),
 ("What's included in a custom deployment?","Everything: Goals, Crews, Relays, Brain, Vault and Code, deployed in your own cloud, set up for your processes, with SSO, audit logs, custom integrations and dedicated support."),
 ("Is the free version the full platform?","Yes. It's the same engine under the Business Source License 1.1, free to read, modify and run locally for personal, development, testing, evaluation, education and research use. A custom deployment adds Vault, enterprise sign-in, a commercial license for your business, and our team setting it up and supporting it. Each version converts to the Apache License 2.0 after three years."),
 ("Can my company use the free version?","To try it out and evaluate it, yes. Using it in the operation of your business, or offering it to others, needs a commercial license from us, which is included in a custom deployment."),
 ("Do I need my own AI plan?","Yes. AgentWorks runs on the Claude, ChatGPT, Gemini or Cursor plan you already pay for, through that vendor's own coding agent (or its API key). We never mark up tokens, so your AI bill stays with your provider."),
 ("Which AI plan should I use?","Light use works on a $20 plan. If agents run all day, a $100–$200 plan (Claude Max or ChatGPT Pro) is the sweet spot. You can connect several and route each job to the one that fits."),
 ("Can I move from the free version to a custom deployment?","Yes. It's the same engine, so goals, agents and playbooks move across."),
]

body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Pricing</p>
        <h1>Free for developers. <span class="dim">Licensed and customized for your company.</span></h1>
        <p class="lede">The whole platform is free for developers to read, modify and run locally. When your company wants to use it in its operations, we customize and deploy it with you, in your own cloud, with your tools and approval rules, under a commercial license. Every plan runs on the AI subscription you already pay for.</p>
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
          <p class="kicker">How a custom deployment works</p>
          <h2>We don't hand you a login. <span class="dim">We build it around your company.</span></h2>
          <p class="lede">A one-time setup fee covers customizing and deploying it. A monthly fee covers the platform, updates, support and changes as you grow.</p>
        </div>
        <ol class="pilot">
          <li class="reveal"><small>Step 1 · 30 minutes</small><h3>Scope it on a call</h3><p>Which process to start with, which tools it touches, who approves what, and where it should run. We tell you honestly if it's a fit.</p></li>
          <li class="reveal"><small>Step 2 · Setup</small><h3>We customize and deploy</h3><p>We deploy in your cloud, connect your tools, load your company knowledge into Brain, set access and approval rules, and build the first agents with your team.</p></li>
          <li class="reveal"><small>Step 3 · Every month</small><h3>It runs, we improve it</h3><p>Your team uses it day to day. We review what the agents did with you, fix what isn't working and add the next process.</p></li>
        </ol>
        <p class="tpl-more center-row"><a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a><a class="btn btn-ghost" href="{GH}" target="_blank" rel="noreferrer">Or try it free</a></p>
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
          <h2>Start free. <span class="dim">License and customize when you're ready.</span></h2>
          <p>Try the platform locally today, or book a call and we'll scope a deployment around your company.</p>
          <div class="cta-actions">
            <a class="btn btn-primary" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
            <a class="btn btn-ghost" href="{GH}" target="_blank" rel="noreferrer">Get it on GitHub</a>
          </div>
        </div>
      </div>
    </section>
  </main>
'''
PRICE_LD={"@type":"WebPage","name":"AgentWorks Pricing","url":"https://agentworkshq.com/pricing/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
BC=lambda name,path: {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"AgentWorks","item":"https://agentworkshq.com/"},{"@type":"ListItem","position":2,"name":name,"item":"https://agentworkshq.com"+path}]}
pages['pricing/index.html']=head('AgentWorks Pricing - Free for Developers or Custom Deployment','AgentWorks is free for developers to read, modify and run locally, or customized and deployed in your own cloud for your company, with a setup fee and a monthly fee. Runs on your own AI plan.','/pricing/',og='agentworks-pricing-og.jpg',extra_ld=ld(PRICE_LD,BC('Pricing','/pricing/'),SOFT,faq_ld(FAQ_PRICING)))+header('pricing')+body+footer()
