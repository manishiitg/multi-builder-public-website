# /download/: how to get the free app. Every "Download free app" button lands here (INSTALL in partials.py).
# The installer itself lives in the product repo; agentworkshq.com/install.sh redirects to it (_redirects).
INSTALL_CMD='curl -fsSL https://agentworkshq.com/install.sh | bash'
FAQ_DOWNLOAD=[
 ("Why install from Terminal instead of a download link?","The app isn't notarized by Apple yet, so macOS blocks a copy downloaded in a browser and says it \"is damaged and can't be opened\". A download made with curl isn't flagged. Notarization is on the roadmap."),
 ("What does the install command do?","It finds the newest AgentWorks release on GitHub, installs AgentWorks.app in Applications, sets up the small bridge Claude Code and Codex use to reach AgentWorks tools, and opens the app. You can read the script before you run it."),
 ("Do I need to install it again for updates?","No. The app checks for new releases and updates itself."),
 ("Does it work on an Intel Mac or Windows?","Not yet. The desktop app ships for Apple Silicon Macs (M1 or newer). On other machines, use AgentWorks Cloud, or run it on a Linux server."),
 ("What else do I need?","An AI plan you already have, such as Claude, ChatGPT, Gemini or Cursor. AgentWorks runs each vendor's own agent CLI on that plan, and walks you through connecting it on first launch."),
]
download_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Download</p>
        <h1>Get AgentWorks. <span class="dim">Free and open source.</span></h1>
        <p class="lede">The desktop app for Apple Silicon Macs. Paste one line into Terminal and it installs, opens, and keeps itself up to date.</p>
      </div>
    </section>

    <section class="section-tight" id="mac">
      <div class="wrap">
        <div class="dl-card reveal">
          <p class="dl-k">macOS · Apple Silicon (M1 or newer)</p>
          <p class="dl-step">Open <b>Terminal</b>, paste this line and press Return:</p>
          <div class="dl-cmd"><code id="install-cmd">{INSTALL_CMD}</code><button type="button" class="btn btn-amber btn-sm" data-copy="install-cmd">Copy</button></div>
          <p class="dl-note">About a minute. Then pick a workspace folder and connect the AI plan you already have. <a href="https://raw.githubusercontent.com/manishiitg/agentworks/main/install.sh" target="_blank" rel="noreferrer">Read the script</a> · <a href="{GH}/releases" target="_blank" rel="noreferrer">All releases</a></p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Other ways to run it</p>
          <h2>Not on an Apple Silicon Mac? <span class="dim">You still have options.</span></h2>
        </div>
        <ul class="control">
          <li class="reveal"><h3>AgentWorks Cloud</h3><p>Hosted for you at $99 a month, with hand-held onboarding. Works from any computer with a browser.</p><p><a href="/pricing/">See Cloud</a></p></li>
          <li class="reveal"><h3>Your own Linux server</h3><p>Run it on a server you control with the rootless deployer, and open it from any browser.</p><p><a href="{GH}/blob/main/deploy/README.md" target="_blank" rel="noreferrer">Self-hosting guide</a></p></li>
          <li class="reveal"><h3>Enterprise</h3><p>Deployed in your cloud or data center, with SSO, roles and support.</p><p><a href="/enterprise/">Enterprise</a></p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Installing, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_DOWNLOAD)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Rather not set it up yourself? <span class="dim">We'll do it with you.</span></h2>
        <p>Cloud comes with hand-held onboarding: we set up your first goal or Crew together on a call.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/pricing/">See pricing</a>
        </div>
      </div>
    </section>
  </main>
'''
DL_LD={"@type":"WebPage","name":"Download AgentWorks","url":"https://agentworkshq.com/download/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['download/index.html']=head('Download AgentWorks - Free Desktop App for Apple Silicon Macs','Install the free, open-source AgentWorks app on an Apple Silicon Mac with one Terminal command. It installs, opens and updates itself. Or use AgentWorks Cloud or your own Linux server.','/download/',extra_ld=ld(DL_LD,BC('Download','/download/'),faq_ld(FAQ_DOWNLOAD)))+header()+download_body+footer()
