# /about/: who is behind AgentWorks. Facts only: the operating company, where it is, when it started, how to reach it.
about_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">About</p>
        <h1>AgentWorks is built by XTECH. <span class="dim">A small team in India.</span></h1>
        <p class="lede">We make AI agents work inside company processes, with your people in control: agents track the goal, measure every run and improve the next one, and a person approves what matters. The source is public and free for developers, and we customize and deploy it for companies under a commercial license.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="{GH}" target="_blank" rel="noreferrer">See the code on GitHub</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <ul class="control">
          <li class="reveal"><h3>Company</h3><p>AgentWorks is a product of <b>XTECH</b>, a partnership firm in India, founded in December 2025. XTECH operates agentworkshq.com and is the company behind the AgentWorks platform and its custom deployments.</p></li>
          <li class="reveal"><h3>Founder</h3><p>Founded and run by Manish Prakash. You can find him on <a href="https://in.linkedin.com/in/manishiitg" target="_blank" rel="noreferrer">LinkedIn</a> and <a href="https://x.com/manish_iitg" target="_blank" rel="noreferrer">X</a>.</p></li>
          <li class="reveal"><h3>What we build</h3><p>A source-available platform with six products: Goals, Crews and Relays for your teams, and Brain, Vault and Code for IT and leadership. <a href="/product/">See the products</a>.</p></li>
          <li class="reveal"><h3>How we work with companies</h3><p>We scope a deployment on a call, customize it for your processes, tools and approval rules, and deploy it in your own cloud. <a href="/pricing/">See how it works</a>.</p></li>
          <li class="reveal"><h3>Source code</h3><p>The source is public under the Business Source License 1.1, free for developers and with a commercial license for business use, at <a href="{GH}" target="_blank" rel="noreferrer">github.com/manishiitg/agentworks</a>.</p></li>
          <li class="reveal"><h3>Contact</h3><p>Email <a href="mailto:manish@agentworkshq.com">manish@agentworkshq.com</a> or <a href="{CAL}" target="_blank" rel="noreferrer">book a 30-minute call</a>.</p></li>
        </ul>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Tell us the process. <span class="dim">We'll show you how agents fit.</span></h2>
        <p>Book a short call and we'll scope a deployment around your company.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/pricing/">Pricing</a>
        </div>
      </div>
    </section>
  </main>
'''
ABOUT_LD={"@type":"AboutPage","name":"About AgentWorks","url":"https://agentworkshq.com/about/","isPartOf":{"@id":"https://agentworkshq.com/#website"},"about":{"@id":"https://agentworkshq.com/#organization"}}
pages['about/index.html']=head('About AgentWorks - Built by XTECH, India','AgentWorks is a product of XTECH, a partnership firm in India founded in December 2025. AI agents for company processes, customized and deployed in your own cloud, with your people in control.','/about/',extra_ld=ld(ABOUT_LD,BC('About','/about/')))+header()+about_body+footer()
