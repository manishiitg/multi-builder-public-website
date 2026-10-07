GUARANTEE=('<p class="guarantee">Subscribe in 2 minutes · We set up your first goal with you, by hand · Cancel anytime</p>' if PAYPAL_SUBSCRIBE
  else '<p class="guarantee">Cloud starts with a call · We set up your first goal with you, by hand</p>')
ONB_STEP1=(f'<li class="reveal"><small>Step 1 · 2 minutes</small><h3>Subscribe</h3><p>Subscribe with PayPal, or <a href="{CAL}" target="_blank" rel="noreferrer">book a 30-minute call</a> first if you want to check it fits. Cancel anytime.</p></li>'
  if PAYPAL_SUBSCRIBE else '<li class="reveal"><small>Step 1 · 30 minutes</small><h3>Book a call</h3><p>A short call about the outcome you want and the tools you use. We tell you honestly if it\'s a fit.</p></li>')
ONB_CTA=(f'<p class="tpl-more center-row"><a class="btn btn-amber" href="{PAYPAL_SUBSCRIBE}" target="_blank" rel="noreferrer">Subscribe with PayPal</a><a class="btn btn-ghost" href="{CAL}" target="_blank" rel="noreferrer">Book a call first</a><span class="muted">7-day money-back guarantee.</span></p>'
  if PAYPAL_SUBSCRIBE else f'<p class="tpl-more center-row"><a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a><span class="muted">7-day money-back guarantee once you start.</span></p>')

Y='<span class="yes" aria-label="Included">✓</span>'
N='<span class="no" aria-label="Not included">—</span>'
import tpl as _PB
_PB_N=f"{_PB.N_CREW + _PB.N_GOALS}"
ROWS=[
 ("Teammates & goals",None),
 ("Crew teammates",("Unlimited",N,"Unlimited")),
 ("Goals with measured targets",(Y,Y,Y)),
 ("Auto-improvement toward your goals",(Y,Y,Y)),
 ("Premade Crew agents and Goal playbooks",(_PB_N,f"{_PB.N_GOALS} Goal playbooks",_PB_N)),
 ("Engineering playbooks",(Y,Y,Y)),
 ("Relays: fixed agent chains behind an API",(Y,N,Y)),
 ("Custom playbooks built with you",(N,N,Y)),
 ("Channels & tools",None),
 ("Slack and WhatsApp",(Y,Y,Y)),
 ("Gmail updates and granted mailbox work",(Y,Y,Y)),
 ("Browser per teammate or goal",("Self-run","Hosted","Your cloud")),
 ("MCP servers and API tools",(Y,Y,Y)),
 ("Expert Crews: call shared Crews from MCP clients and the CLI",(Y,N,Y)),
 ("Custom integrations",(N,N,Y)),
 ("Control & security",None),
 ("Approvals and autonomy limits",(Y,Y,Y)),
 ("Encrypted secrets vault",(Y,Y,Y)),
 ("Sandboxed code execution",(Y,Y,Y)),
 ("Run logs and cost per goal",(Y,Y,Y)),
 ("Roles and per-goal sharing",(Y,Y,Y)),
 ("Code: a private AI workspace per employee, shared plans, cost and usage by person",(Y,N,Y)),
 ("Brain: shared company knowledge for every agent, with folder access and history",(Y,N,Y)),
 ("Vault: governed MCP access, shared secrets and audit",(N,N,"Early access")),
 ("SSO (SAML / OIDC) and SCIM",(N,N,Y)),
 ("Audit log export",(N,N,Y)),
 ("Deployment & support",None),
 ("Where it runs","Your Mac or server|AgentWorks cloud|Your VPC or private cloud"),
 ("Onboarding",("Docs","First goal set up with you","Scoped pilot")),
 ("Support",("Community","Priority email","Dedicated + SLA")),
]
def compare():
    out=['<div class="compare-wrap"><table class="compare"><caption class="sr-only">Plan comparison</caption><thead><tr><th scope="col">Feature</th><th scope="col">Open source</th><th scope="col">Cloud</th><th scope="col">Enterprise</th></tr></thead><tbody>']
    for label,vals in ROWS:
        if vals is None:
            out.append(f'<tr class="grp"><th scope="rowgroup" colspan="4">{label}</th></tr>'); continue
        if isinstance(vals,str): vals=vals.split('|')
        out.append(f'<tr><th scope="row">{label}</th>'+''.join(f'<td>{v}</td>' for v in vals)+'</tr>')
    out.append('</tbody></table></div>')
    return '\n        '.join(out)

FAQ_PRICING=[
 ("What does the $99 cover?","Goals, hosted for you: unlimited goals with measured targets, auto-improvement, every premade Goal playbook, a browser for each goal, onboarding for your first goal, and priority email support. Crews, Code, Vault and Relays are part of Enterprise."),
 ("What's in Enterprise?","Everything: Goals, Crews, Code, Vault and Relays, deployed in your own cloud, with SSO, audit logs, custom integrations and dedicated support."),
 ("Do I need my own AI plan?","Yes. AgentWorks runs on the Claude, ChatGPT, Gemini or Cursor plan you already pay for, through that vendor's own coding agent (or its API key). We never mark up tokens, so your AI bill stays with your provider."),
 ("Which AI plan should I use?","Light use works on a $20 plan. If teammates run all day, a $100–$200 plan (Claude Max or ChatGPT Pro) is the sweet spot. You can connect several and route each job to the one that fits."),
 ("Is there a free trial?","The open-source edition is free forever. Cloud comes with a 7-day money-back guarantee: if it's not for you, cancel in the first week and we refund you in full."),
 ("Can I cancel anytime?","Yes. Cancel from your workspace settings. You keep access until the end of the billing period and can export your goals, agents and logs."),
 ("Can I move between open source and Cloud?","Yes. It's the same engine, so goals, agents and playbooks move either way."),
 ("How is Enterprise priced?","By deployment and scope, as an annual contract. Most teams start with a paid pilot on one engineering goal with agreed success metrics, then expand."),
]

body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Pricing</p>
        <h1>One engine. Three ways to run it.</h1>
        <p class="lede">Self-host it free, let us run Goals for you for $99 a month, or deploy everything in your own cloud. Every plan runs on the AI subscription you already pay for.</p>
        {GUARANTEE}
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
          <p class="kicker">How Cloud onboarding works</p>
          <h2>We don't hand you a login. <span class="dim">We set it up with you.</span></h2>
          <p class="lede">Every Cloud team is onboarded by hand. You get a working goal in week one, not a blank workspace.</p>
        </div>
        <ol class="pilot">
          {ONB_STEP1}
          <li class="reveal"><small>Step 2 · Setup session</small><h3>We build your first goal with you</h3><p>We connect your tools and AI plan, pick the right premade agent or write one, and agree the metric and target together.</p></li>
          <li class="reveal"><small>Step 3 · First month</small><h3>It runs, we check in</h3><p>Your agents work toward the goal. We review the results with you and tune the setup until the number moves.</p></li>
        </ol>
        {ONB_CTA}
      </div>
    </section>

    <section class="section">
      <div class="wrap feature">
        <div class="reveal">
          <p class="kicker">What you'll actually pay</p>
          <h2 class="h2">$99 plus the AI plan <span class="dim">you already have.</span></h2>
          <p class="lede">No credits to count, no pool that runs dry mid-month, no marked-up tokens. Your Claude, ChatGPT or Gemini plan does the work, and your provider bills you directly.</p>
          <ol class="numbered">
            <li><div><b>AgentWorks Cloud: $99/month</b><span>Unlimited teammates and goals, hosting, browsers, onboarding and support.</span></div></li>
            <li><div><b>Your AI plan: $20–$200/month</b><span>Billed by Anthropic, OpenAI, Google or Cursor. Most teams already have one.</span></div></li>
            <li><div><b>What it replaces</b><span>Hours of chasing, triaging and reporting every week, and the part-time hire you were about to make.</span></div></li>
          </ol>
        </div>
        <div class="explainer reveal" aria-label="Example monthly cost">
          <p class="explainer-title"><span>Example monthly bill</span><span>4 teammates · 5 goals</span></p>
          <div class="cost-row"><div><b>AgentWorks Cloud</b><small>Unlimited teammates and goals</small></div><strong>$99</strong></div>
          <div class="cost-row"><div><b>Claude Max</b><small>Heavy daily use, billed by Anthropic</small></div><strong>$100</strong></div>
          <div class="cost-row total"><div><b>Total</b><small>No per-task fees or credits</small></div><strong>$199<span>/mo</span></strong></div>
        </div>
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
          <h2>Start with one goal this week.</h2>
          <p>Pick a premade agent, connect your tools and set the target. Book a short call and we'll set up your first goal with you.</p>
          <div class="cta-actions">
            <a class="btn btn-primary" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
            <a class="btn btn-ghost" href="/enterprise/">Enterprise</a>
          </div>
        </div>
      </div>
    </section>
  </main>
'''
PRICE_LD={"@type":"WebPage","name":"AgentWorks Pricing","url":"https://agentworkshq.com/pricing/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
BC=lambda name,path: {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"AgentWorks","item":"https://agentworkshq.com/"},{"@type":"ListItem","position":2,"name":name,"item":"https://agentworkshq.com"+path}]}
pages['pricing/index.html']=head('AgentWorks Pricing - Open Source, $99 Cloud, Enterprise','AgentWorks pricing: free and open source, $99/month hosted with unlimited AI agents and goals, or Enterprise in your own cloud. Runs on your own AI plan.','/pricing/',og='agentworks-pricing-og.jpg',extra_ld=ld(PRICE_LD,BC('Pricing','/pricing/'),SOFT,faq_ld(FAQ_PRICING)))+header('pricing')+body+footer()
