# 404 page (the old /product/ page is retired and redirects to /platform/).
nf_body=f'''  <main id="main">
    <section class="page-hero notfound">
      <div class="wrap">
        <p class="kicker">404</p>
        <h1>This page isn't here. <span class="dim">Your team&rsquo;s work still is.</span></h1>
        <p class="lede">The link may be old or mistyped. Here's where to go next.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/">Home</a>
          <a class="btn btn-ghost" href="/platform/">How it works</a>
          <a class="btn btn-ghost" href="/agents/">Premade agents</a>
          <a class="btn btn-ghost" href="/docs/">Docs</a>
        </div>
      </div>
    </section>
  </main>
'''
nf=head('Page Not Found - AgentWorks','This page does not exist. Go to the AgentWorks homepage, how it works, premade agents or docs.','/404.html',og='agentworks-404-og.jpg',extra_ld=ld({"@type":"WebPage","name":"Page Not Found","url":"https://agentworkshq.com/404.html","isPartOf":{"@id":"https://agentworkshq.com/#website"}}))
nf=nf.replace('<link rel="canonical"','<meta name="robots" content="noindex">\n  <link rel="canonical"',1)
pages['404.html']=nf+header()+nf_body+footer()
