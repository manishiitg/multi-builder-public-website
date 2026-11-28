# /pricing/ "How we work" (owner 2026-11-28): product plus a four-week setup with one team on the company's
# servers, then the licence. No prices, no free tier, no hosted plan.
FAQ_PRICING=[
 ("What does the four-week setup include?","We pick one team and one piece of work they pass around by hand. We install AgentWorks on your servers, connect the tools that work touches, set up the Team kit, and build the agents with your people. At the end your team runs it."),
 ("How is it priced?","A fixed setup with a clear scope, then the product licence. We agree both on a call once we know the team and the work."),
 ("Do we have to change our tools?","No. Jira, Notion, Google Docs and Sheets, Slack and the rest stay. Agents work inside them."),
 ("Do we need new AI subscriptions?","No. Each person uses the AI plan they already pay for (Claude, ChatGPT, Gemini, Cursor and others), or the team uses a shared key. We never mark up model costs."),
 ("Is the source code available?","Yes. The source is public under the Business Source License 1.1. Using it in the operation of your business needs a commercial licence from us, which comes with the setup. Each version converts to the Apache License 2.0 after three years."),
 ("What happens after the first team?","Add the next team when the first one works. Its agents use the same Team kit, Brain and tool connections, so each team starts faster."),
]

body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">How we work</p>
        <h1>We set it up with you. <span class="dim">Your team runs it.</span></h1>
        <p class="lede">In four weeks we set AgentWorks up with one of your teams, on your servers: one piece of work they pass around by hand, the tools it touches, and the agents that do it. Then your team runs it, and you add the next team when it works.</p>
      </div>
    </section>


    <section class="section" id="onboarding">
      <div class="wrap">
        <div class="section-head center reveal">
          <p class="kicker">Four weeks</p>
          <h2>One team first. <span class="dim">Then the next.</span></h2>
        </div>
        <ol class="pilot">
          <li class="reveal"><small>Step 1 &middot; 30 minutes</small><h3>Pick the work on a call</h3><p>Which team, which piece of work moves between people by hand, which tools it touches and who decides what. We tell you honestly if it&rsquo;s a fit.</p></li>
          <li class="reveal"><small>Step 2 &middot; Four weeks</small><h3>We set it up with your team</h3><p>We install AgentWorks on your servers, connect your tools in the Team kit, add your company knowledge to Brain, and build the agents with the people who do the work.</p></li>
          <li class="reveal"><small>Step 3 &middot; After</small><h3>Your team runs it</h3><p>The team asks its agents, hands work off and lets routine jobs run. When it works, the next team joins on the same setup.</p></li>
        </ol>
        <p class="tpl-more center-row"><a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a></p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">What you get</p>
          <h2>The product and the setup. <span class="dim">Done with you, not for you.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>Agents for one piece of work</h3><p>The agents your team needs for the work you picked, built from premade agents where they fit. <a href="/platform/">How it works</a>.</p></li>
          <li class="reveal"><h3>Your tools connected</h3><p>Jira, Notion, Google Docs, Slack and the rest, connected once in the Team kit and shared across teams.</p></li>
          <li class="reveal"><h3>On your servers</h3><p>Installed on your own server or a Mac, on the AI plans your people already pay for.</p></li>
          <li class="reveal"><h3>People stay in charge</h3><p>Anything that goes out waits for a person unless you allow it; everyone sees who, person or agent, is on what.</p></li>
          <li class="reveal"><h3>Commercial licence</h3><p>The source is public under the Business Source License; your company runs it under a commercial licence.</p></li>
          <li class="reveal"><h3>Your team owns it</h3><p>We hand it over with your people trained on it, so the next piece of work doesn&rsquo;t wait for us.</p></li>
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
          <h2>Pick one piece of work your team passes around. <span class="dim">We&rsquo;ll set it up with you.</span></h2>
          <p>Book a short call about the work and the team.</p>
          <div class="cta-actions">
            <a class="btn btn-primary" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          </div>
        </div>
      </div>
    </section>
  </main>
'''
PRICE_LD={"@type":"WebPage","name":"How we work with AgentWorks","url":"https://agentworkshq.com/pricing/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
BC=lambda name,path: {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"AgentWorks","item":"https://agentworkshq.com/"},{"@type":"ListItem","position":2,"name":name,"item":"https://agentworkshq.com"+path}]}
pages['pricing/index.html']=head('How We Work - AgentWorks Set Up With One Team in Four Weeks','In four weeks we set AgentWorks up with one of your teams on your servers: one piece of work they pass around by hand, your tools connected, the agents built with your people. Then your team runs it.','/pricing/',og='agentworks-pricing-og.jpg',extra_ld=ld(PRICE_LD,BC('How we work','/pricing/'),SOFT,faq_ld(FAQ_PRICING)))+header('pricing')+body+footer()
