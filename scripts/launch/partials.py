import re
CAL_URL='https://calendar.google.com/calendar/appointments/schedules/AcZssZ1IrGuhEQLUL5dEFGm4OWRJvz5M0KOaizd2SH2-oadqBESndvBRGq8s1MF41uOI931Xu1NrhfZu'
# Cloud is not live yet: early access goes through a call. Point this at the app when signup ships.
SIGNUP=CAL_URL
LOGIN=None
# PayPal subscription link for Cloud ($99/month plan "Cloud monthly"). While None, the site keeps
# the "Book a call" flow. Setting it switches the Cloud card, onboarding, FAQ, legal copy and offer JSON-LD.
PAYPAL_SUBSCRIBE='https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-8U224306ST2761520NK4MBQA'
CAL=CAL_URL
GH='https://github.com/manishiitg/agentworks'
INSTALL='/download/'
# The demo; its own sign-in screen shows the shared login (owner 2026-10-26).
DEMO='https://demo.agentworkshq.com/'
V='launch87'

def head(title, desc, path, og='agentworks-home-og.jpg', extra_ld=''):
    url='https://agentworkshq.com'+path
    # og is a file in assets/og/ (1200x630), or a site path such as a blog cover (1600x900).
    og_url, og_w, og_h = (og, 1600, 900) if og.startswith('/') else ('/assets/og/'+og, 1200, 630)
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
  <meta property="og:image" content="https://agentworkshq.com{og_url}">
  <meta property="og:image:width" content="{og_w}">
  <meta property="og:image:height" content="{og_h}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="https://agentworkshq.com{og_url}">
  <meta name="twitter:creator" content="@manish_iitg">
  <link rel="canonical" href="{url}">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="icon" type="image/svg+xml" href="/assets/brand/agentworks-logo.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=2">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png?v=2">
  <link rel="apple-touch-icon" sizes="256x256" href="/apple-touch-icon.png?v=2">
  <link rel="shortcut icon" href="/favicon.ico?v=2">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/fonts/fonts.css?v=workforce1">
  <link rel="stylesheet" href="/launch.css?v={V}">
{extra_ld}</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
'''

# Platform pages (owner 2026-11-28): one "How it works" page plus the parts that keep their own page.
# Goals, Flows, LLM Gateway, Crews and Studio are retired and redirect to /platform/.
PRODUCT=[('/platform/','How it works','Ask, hand off and keep it running: everyone\'s AI agents working as one team.','connect'),
         ('/agentbridge/','AgentBridge','Agents message each other and hand over work, across people, laptops and the server.','bullpen'),
         ('/brain/','Brain','Company knowledge and skills for every agent.','brain'),
         ('/vault/','Vault','Secrets and tool access, and who may use them.','gateway'),
         ('/agents/','Premade agents','Ready agents for common work to start from.','crew')]
# The platform pages, for cross-links between them.
PRODUCT_PAGES=[(h,t,d) for h,t,d,i in PRODUCT]
# One short line per menu item (the long description stays for cards and tooltips).
MENU_SHORT={
 '/platform/':'Ask, hand off, keep it running', '/agentbridge/':'Agents hand work to each other',
 '/brain/':'Shared knowledge for every agent', '/vault/':'Secrets and tool access', '/agents/':'Ready agents to start from',
 '/solutions/sales/':'Follow up every lead', '/solutions/shopify/':'Orders, returns, stock',
 '/solutions/support/':'Fast, safe first replies', '/solutions/finance/':'Invoices and payments',
 '/solutions/marketing/':'SEO and AI search',
}
_PICON={'goal':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
        'improve':'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
        'crew':'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
        'relay':'<circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 12h3M14 12h3"/>',
        'bench':'<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
        'experts':'<circle cx="12" cy="7" r="3"/><path d="M5 20a7 7 0 0 1 14 0"/><path d="M3 11h3M18 11h3"/>',
        'brain':'<path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 17.5 9 5 9-5"/>',
        'gateway':'<path d="M4 12h4M16 12h4M12 4v4M12 16v4"/><rect x="8" y="8" width="8" height="8" rx="2"/>',
        'code':'<path d="m8 9-4 3 4 3M16 9l4 3-4 3"/>',
        'llmgw':'<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="4"/>',
        'bullpen':'<circle cx="8" cy="8" r="2.5"/><circle cx="16" cy="8" r="2.5"/><path d="M3.5 19a4.5 4.5 0 0 1 9 0M11.5 19a4.5 4.5 0 0 1 9 0"/>',
        'connect':'<path d="M9 7H6a4 4 0 0 0 0 8h3M15 7h3a4 4 0 0 1 0 8h-3M8 11h8"/>'}

def _drop(label, overview, groups, menu_id, current):
    """Compact dropdown: icon + title per item (description kept as a tooltip), in one column
    per group. `groups` is [(group label or None, [(href, title, desc, icon), ...]), ...]."""
    def row(h,t,d,ic):
        tip=re.sub(r'<[^>]+>','',d).replace('"','&quot;')
        return (f'<a class="pm-item" href="{h}" title="{tip}"><span class="pm-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{ic}</svg></span>'
                f'<span><b>{t}</b><small>{MENU_SHORT.get(h,"")}</small></span></a>')
    cols=''.join(f'<div class="pm-col">{f"<p class=pm-group>{g}</p>" if g else ""}{"".join(row(*it) for it in items)}</div>' for g,items in groups)
    oh,ot=overview
    wide=(' pm-wide pm-3' if len(groups)>2 else ' pm-wide') if len(groups)>1 else ''
    return f'''        <div class="nav-drop{" is-current" if current else ""}" data-drop>
          <button type="button" class="nav-drop-btn" aria-expanded="false" aria-controls="{menu_id}" data-drop-btn>{label} <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
          <div class="nav-panel{wide}" id="{menu_id}"><a class="pm-all" href="{oh}">{ot} <span aria-hidden="true">→</span></a><div class="pm-cols">{cols}</div></div>
        </div>'''

# Enterprise/B2B site (owner 2026-10-26): one menu of solutions by team, one Platform page,
# How we work, Blog. Products are capabilities of one platform, not separate things to buy.
SOL_ORDER=['sales','support','finance','shopify','marketing','growth','engineering']
NAV=[('/pricing/','How we work','pricing'),('/blog/','Blog','blog')]
PLAT_KEYS=('platform','brain','vault','agentbridge','bullpen')
def header(active=None):
    from sol_data import SOLUTIONS
    by={u['slug']:u for u in SOLUTIONS}
    sol=[(f'/solutions/{k}/',by[k]['nav'],by[k]['navdesc'],by[k]['icon']) for k in SOL_ORDER if k in by]
    links='\n'.join(f'        <a href="{h}"{" aria-current=\"page\"" if active and k==active else ""}>{t}</a>' for h,t,k in NAV)
    mlinks='\n'.join(f'      <a href="{h}">{t}</a>' for h,t,k in NAV)
    msol='\n'.join(f'      <a class="sub" href="{h}">{t}</a>' for h,t,d,i in sol)
    mplat='\n'.join(f'      <a class="sub" href="{h}">{t}</a>' for h,t,d,i in PRODUCT)
    return f'''  <header class="site-header">
    <div class="wrap header-row">
      <a class="brand" href="/" aria-label="AgentWorks home"><img src="/assets/brand/agentworks-logo.svg" alt="" width="30" height="30"><span>AgentWorks</span></a>
      <nav class="nav" aria-label="Primary">
{_drop('Solutions',('/agents/','All premade agents'),[('By team',sol)],'usecase-menu',active in ('solutions','agents'))}
{_drop('Platform',('/platform/','How it works'),[(None,[(h,t,d,_PICON[i]) for h,t,d,i in PRODUCT[1:]])],'platform-menu',active in PLAT_KEYS)}
{links}
      </nav>
      <div class="header-actions">
        <a class="link" href="{DEMO}" target="_blank" rel="noreferrer">Try the demo</a>
        <a class="btn btn-primary btn-sm" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle><span></span><span></span><span></span></button>
      </div>
    </div>
    <div class="wrap mobile-menu" id="mobile-menu" data-mobile-menu>
      <p class="mm-label">Solutions</p>
{msol}
      <a class="sub" href="/agents/">All premade agents</a>
      <p class="mm-label">Platform</p>
{mplat}
{mlinks}
      <a href="{DEMO}" target="_blank" rel="noreferrer">Try the demo</a>
      <a class="btn btn-primary" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
    </div>
  </header>
'''

def footer():
    from sol_data import SOLUTIONS
    by={u['slug']:u for u in SOLUTIONS}
    sol_links='\n'.join(f'            <li><a href="/solutions/{k}/">{by[k]["nav"]}</a></li>' for k in SOL_ORDER if k in by)
    return f'''  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <a class="brand" href="/"><img src="/assets/brand/agentworks-logo.svg" alt="" width="30" height="30"><span>AgentWorks</span></a>
          <p class="blurb">Everyone on your team has AI. AgentWorks makes the team faster: everyone's AI agents work together, on top of the tools you already use, on your own servers.</p>
        </div>
        <div>
          <h2 class="fh">Solutions</h2>
          <ul>
{sol_links}
            <li><a href="/agents/">Premade agents</a></li>
          </ul>
        </div>
        <div>
          <h2 class="fh">Platform</h2>
          <ul>
            <li><a href="/platform/">How it works</a></li>
            <li><a href="/agentbridge/">AgentBridge</a></li>
            <li><a href="/brain/">Brain</a></li>
            <li><a href="/vault/">Vault</a></li>
          </ul>
        </div>
        <div>
          <h2 class="fh">Resources</h2>
          <ul>
            <li><a href="/pricing/">How we work</a></li>
            <li><a href="/docs/">Docs</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/harness-engineering/">Harness engineering</a></li>
            <li><a href="{GH}" target="_blank" rel="noreferrer">Source code</a></li>
            <li><a href="/llms.txt">llms.txt</a></li>
          </ul>
        </div>
        <div>
          <h2 class="fh">Company</h2>
          <ul>
            <li><a href="/about/">About</a></li>
            <li><a href="{CAL}" target="_blank" rel="noreferrer">Book a call</a></li>
            <li><a href="https://x.com/manish_iitg" target="_blank" rel="noreferrer">X / Twitter</a></li>
            <li><a href="https://in.linkedin.com/in/manishiitg" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 XTECH, India · AgentWorks is a product of XTECH, source-available under the Business Source License 1.1. · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a> · <a href="/refunds/">Refunds</a></p>
        <p>Runs on the AI plan you already pay for.</p>
      </div>
    </div>
  </footer>
  <script src="/launch.js?v={V}"></script>
  <script src="/analytics.js?v=1"></script>
</body>
</html>
'''

import os, glob, re as _re
_ROOT=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
_LOGO_FILL={'claude':'#D97757','openai':'currentColor','googlegemini':'#8E75B2','cursor':'currentColor'}
_TOOL_FILL={'slack':'#4A154B','whatsapp':'#25D366','gmail':'#EA4335','googledrive':'#4285F4','googlesheets':'#34A853','googlecalendar':'#4285F4','stripe':'#635BFF','shopify':'#7AB55C','quickbooks':'#2CA01C','hubspot':'#FF7A59','notion':'#000000','github':'#181717','linear':'#5E6AD2','posthog':'#F54E00','modelcontextprotocol':'#000000','googlechrome':'#4285F4','atlassian':'#0052CC','figma':'#F24E1E','airtable':'#18BFFF','asana':'#F06A6A','clickup':'#7B68EE'}
def tool(name):
    svg=open(os.path.join(_ROOT,'assets','brand','tools',name+'.svg')).read()
    svg=_re.sub(r'<title>.*?</title>','',svg).replace('role="img" ','')
    return svg.replace('<svg ','<svg aria-hidden="true" fill="%s" '%_TOOL_FILL[name],1)

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


# Illustrated use-case cards (product pages). Each card is a small picture of one job, not a paragraph.
UC_IC={'crew':'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
       'goal':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
       'brain':'<path d="M12 3 3 8l9 5 9-5-9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 17.5 9 5 9-5"/>',
       'code':'<path d="m8 9-4 3 4 3M16 9l4 3-4 3"/>',
       'relay':'<circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><path d="M7 12h3M14 12h3"/>',
       'vault':'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
       'user':'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
       'web':'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
       'mail':'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
       'term':'<path d="m5 8 4 4-4 4M12 16h7"/>'}

def uc_ic(name):
    """Icon tile: a brand logo (claude/openai/cursor), a tool logo (slack/whatsapp/...), 'M' for Muse, or a UC_IC line icon."""
    if name in ('claude','openai','cursor','googlegemini'): inner=logo(name)
    elif name=='muse': inner='<span class="mono-logo">M</span>'
    elif name in UC_IC: inner='<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+UC_IC[name]+'</svg>'
    else: inner=tool(name)
    return f'<span class="net-ic">{inner}</span>'

def uc_who(ic, name): return f'<span class="uc-who">{uc_ic(ic)}{name}</span>'

def uc_chat(title, frm, to, ask, reply, via=''):
    """frm/to are (icon, label). Ask bubble, optional tool line, reply bubble."""
    v=f'\n            <p class="ask-tool">{via}</p>' if via else ''
    return f'''          <li class="ucx reveal">
            <h3>{title}</h3>
            <p class="uc-route">{uc_who(*frm)}<span class="uc-arr" aria-hidden="true">→</span>{uc_who(*to)}</p>
            <p class="ask-msg you">{ask}</p>{v}
            <p class="ask-msg them">{reply}</p>
          </li>'''

def uc_pipe(title, trigger, steps, result):
    """trigger is (icon, label); steps are (kind, label) with kind agent|cond|det|ok|no; result is the outcome line."""
    lis=''.join(f'<li class="uc-st {k}">{l}</li>' for k,l in steps)
    return f'''          <li class="ucx reveal">
            <h3>{title}</h3>
            <p class="uc-route">{uc_who(*trigger)}</p>
            <ol class="uc-steps">{lis}</ol>
            <p class="uc-out">{result}</p>
          </li>'''

def uc_section(cards, kicker='Use cases', h2='What teams do with it.', dim='Illustrative examples.', sid='uses'):
    return f'''    <section class="section" id="{sid}">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">{kicker}</p>
          <h2>{h2} <span class="dim">{dim}</span></h2>
        </div>
        <ul class="ucx-grid">
{chr(10).join(cards)}
        </ul>
      </div>
    </section>
'''

def uc_pills(items): return '<p class="uc-rules reveal">'+''.join(f'<span>{i}</span>' for i in items)+'</p>'
