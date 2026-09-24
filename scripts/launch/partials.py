SIGNUP='https://app.agentworkshq.com/signup'
LOGIN='https://app.agentworkshq.com/login'
CAL='https://calendly.com/manishiitg/15min'
GH='https://github.com/manishiitg/coding-agent-loop'
INSTALL=GH+'/releases/latest'
V='launch7'

def head(title, desc, path, og='agentworks-home-og.jpg', extra_ld=''):
    url='https://agentworkshq.com'+path
    return f'''<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="theme-color" content="#fbfbf9">
  <meta name="color-scheme" content="light">
  <meta name="application-name" content="AgentWorks">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{url}">
  <meta property="og:site_name" content="AgentWorks">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_US">
  <meta property="og:image" content="https://agentworkshq.com/assets/og/{og}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="https://agentworkshq.com/assets/og/{og}">
  <meta name="twitter:creator" content="@manish_iitg">
  <link rel="canonical" href="{url}">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="apple-touch-icon" sizes="256x256" href="/apple-touch-icon.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/fonts/fonts.css?v=workforce1">
  <link rel="stylesheet" href="/launch.css?v={V}">
{extra_ld}</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
'''

NAV=[('/agents/','Agents','agents'),('/pricing/','Pricing','pricing'),('/enterprise/','Enterprise','enterprise'),('/docs/','Docs','docs')]
PRODUCT=[('/product/#goals','Goals','Give an AI agent a goal and a metric. It works until it hits the target.','goal'),
         ('/product/#improve','Auto-improve','It measures every run and changes its own plan.','improve'),
         ('/product/#crew','Crew','Always-on teammates you talk to in Slack and WhatsApp.','crew')]
_PICON={'goal':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
        'improve':'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
        'crew':'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'}

def header(active=None):
    items=''.join(f'<a class="pm-item" href="{h}"><span class="pm-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{_PICON[i]}</svg></span><span><b>{t}</b><small>{d}</small></span></a>' for h,t,d,i in PRODUCT)
    links='\n'.join(f'        <a href="{h}"{" aria-current=\"page\"" if active and k==active else ""}>{t}</a>' for h,t,k in NAV)
    mprod='\n'.join(f'      <a class="sub" href="{h}">{t}</a>' for h,t,d,i in PRODUCT)
    mlinks='\n'.join(f'      <a href="{h}">{t}</a>' for h,t,k in NAV)
    return f'''  <header class="site-header">
    <div class="wrap header-row">
      <a class="brand" href="/" aria-label="AgentWorks home"><img src="/assets/brand/agentworks-logo.svg" alt="" width="30" height="30"><span>AgentWorks</span></a>
      <nav class="nav" aria-label="Primary">
        <div class="nav-drop{" is-current" if active=="product" else ""}" data-drop>
          <button type="button" class="nav-drop-btn" aria-expanded="false" aria-controls="product-menu" data-drop-btn>Product <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
          <div class="nav-panel" id="product-menu"><a class="pm-all" href="/product/">How AgentWorks works <span aria-hidden="true">→</span></a>{items}</div>
        </div>
{links}
      </nav>
      <div class="header-actions">
        <a class="link" href="{GH}" target="_blank" rel="noreferrer">GitHub</a>
        <a class="link" href="{LOGIN}">Log in</a>
        <a class="btn btn-primary btn-sm" href="{SIGNUP}">Sign up</a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle><span></span><span></span><span></span></button>
      </div>
    </div>
    <div class="wrap mobile-menu" id="mobile-menu" data-mobile-menu>
      <p class="mm-label">Product</p>
      <a class="sub" href="/product/">Overview</a>
{mprod}
{mlinks}
      <a href="{GH}" target="_blank" rel="noreferrer">GitHub</a>
      <a href="{LOGIN}">Log in</a>
      <a class="btn btn-primary" href="{SIGNUP}">Sign up for $99/month</a>
    </div>
  </header>
'''

def footer():
    return f'''  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a class="brand" href="/"><img src="/assets/brand/agentworks-logo.svg" alt="" width="30" height="30"><span>AgentWorks</span></a>
          <p class="blurb">AI agents that keep working until they hit your goal. Open source, hosted for $99 a month, or in your own cloud.</p>
        </div>
        <div>
          <h2 class="fh">Product</h2>
          <ul>
            <li><a href="/product/">Overview</a></li>
            <li><a href="/product/#goals">Goals</a></li>
            <li><a href="/product/#improve">Auto-improve</a></li>
            <li><a href="/product/#crew">Crew</a></li>
            <li><a href="/agents/">Premade agents</a></li>
          </ul>
        </div>
        <div>
          <h2 class="fh">Plans</h2>
          <ul>
            <li><a href="/pricing/">Pricing</a></li>
            <li><a href="{SIGNUP}">Cloud sign up</a></li>
            <li><a href="/enterprise/">Enterprise</a></li>
            <li><a href="{GH}" target="_blank" rel="noreferrer">Open source</a></li>
          </ul>
        </div>
        <div>
          <h2 class="fh">Resources</h2>
          <ul>
            <li><a href="/docs/">Docs</a></li>
                        <li><a href="{INSTALL}" target="_blank" rel="noreferrer">Download</a></li>
            <li><a href="/llms.txt">llms.txt</a></li>
          </ul>
        </div>
        <div>
          <h2 class="fh">Company</h2>
          <ul>
            <li><a href="{CAL}" target="_blank" rel="noreferrer">Book a call</a></li>
            <li><a href="https://x.com/manish_iitg" target="_blank" rel="noreferrer">X / Twitter</a></li>
            <li><a href="https://in.linkedin.com/in/manishiitg" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 AgentWorks. Open source under the MIT license.</p>
        <p>Runs on the AI plan you already pay for.</p>
      </div>
    </div>
  </footer>
  <script src="/launch.js?v={V}"></script>
</body>
</html>
'''

import os, glob, re as _re
_ROOT=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
_LOGO_FILL={'claude':'#D97757','openai':'currentColor','googlegemini':'#8E75B2','cursor':'currentColor'}
def logo(name):
    svg=open(os.path.join(_ROOT,'assets','brand','ai',name+'.svg')).read()
    svg=_re.sub(r'<title>.*?</title>','',svg).replace('role="img" ','')
    return svg.replace('<svg ','<svg aria-hidden="true" fill="%s" '%_LOGO_FILL[name],1)

def shot(num, title, want, caption=''):
    """Real screenshot from assets/product/launch/<num>-*.{png,jpg,webp}, else a labelled slot."""
    files=sorted(glob.glob(os.path.join(_ROOT,'assets','product','launch',num+'-*')))
    files=[f for f in files if f.lower().endswith(('.png','.jpg','.jpeg','.webp'))]
    cap=f'<figcaption><b>{title}.</b> {caption}</figcaption>' if caption else ''
    if files:
        from PIL import Image
        f=files[0]; w,h=Image.open(f).size
        rel='/'+os.path.relpath(f,_ROOT)
        return f'<figure class="shot reveal"><img src="{rel}" alt="{title}: {caption or want}" width="{w}" height="{h}" loading="lazy">{cap}</figure>'
    return f'<figure class="shot reveal"><div class="shot-slot"><div><b>Screenshot {num}: {title}</b><span>{want}</span></div></div>{cap}</figure>'
