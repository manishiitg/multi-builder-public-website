# Legal pages: /privacy/, /terms/, /refunds/. Plain-language drafts; have them reviewed before taking payments.
COMPANY='Excellence Technosoft Pvt Ltd'
CONTACT='manish@agentworkshq.com'
UPDATED='26 September 2026'

def _legal(title, intro, sections):
    body=''.join(f'<h2>{h}</h2>{b}' for h,b in sections)
    return f'''  <main id="main">
    <section class="page-hero left legal-hero">
      <div class="wrap">
        <p class="kicker">Legal</p>
        <h1>{title}</h1>
        <p class="lede">{intro}</p>
        <p class="muted">Last updated {UPDATED}</p>
      </div>
    </section>
    <section class="section-tight">
      <div class="wrap"><div class="legal">
{body}
        <p class="legal-nav"><a href="/privacy/">Privacy Policy</a> · <a href="/terms/">Terms of Service</a> · <a href="/refunds/">Refund Policy</a></p>
      </div></div>
    </section>
  </main>
'''

PRIVACY=[
 ('Who we are', f'<p>AgentWorks is operated by {COMPANY}, a company registered in India ("we", "us"). This policy explains what personal data we handle when you visit agentworkshq.com, book a call with us, or use AgentWorks Cloud or Enterprise. Questions: <a href="mailto:{CONTACT}">{CONTACT}</a>.</p>'),
 ('The website', '<p>The website does not use advertising or tracking cookies and has no sign-up forms. To understand which pages are useful, we use PostHog (hosted in the US) and Cloudflare Web Analytics in cookieless mode: they record page views, clicks and general information such as browser, device, country and the page that referred you. Nothing is stored on your device, we do not record your screen, and we do not identify you. Visits are counted with a hash that changes daily, so we cannot follow you across days or sites. Our hosting provider processes standard request data (such as IP address and browser type) to serve and protect the site.</p>'),
 ('Booking a call', '<p>When you book a call, you do it through Calendly, which receives the details you enter (such as your name, email and notes) under its own privacy policy. We use those details only to prepare for and follow up on the call.</p>'),
 ('The open-source app', '<p>If you run the open-source AgentWorks app on your own computer or server, your workspace, files, secrets and conversations stay on your machine. We do not receive them.</p>'),
 ('AgentWorks Cloud and Enterprise', '''<p>When we host or operate AgentWorks for you, we process:</p>
<ul><li><b>Account data:</b> names, email addresses and roles of the people you invite.</li>
<li><b>Workspace data:</b> the goals, workflows, files, memory, logs and connected-tool data your agents work with. You own this data. We process it only to provide the service to you, as your processor.</li>
<li><b>Billing data:</b> payments are handled by our payment provider, which acts as merchant of record. We do not store card numbers.</li></ul>
<p>We do not sell personal data, and we do not use your workspace data to train AI models.</p>'''),
 ('AI providers', '<p>AgentWorks runs AI agents on your own AI plan (for example Anthropic, OpenAI, Google or Cursor). Prompts and content your agents send to those providers are handled under your agreement with them and their policies.</p>'),
 ('Other service providers', '<p>We use a small number of providers to run the service, such as cloud hosting, website analytics (PostHog), email delivery, payment processing and the connectors you choose to enable (for example Slack, WhatsApp or Gmail). They process data only as needed to provide their part of the service.</p>'),
 ('Retention and deletion', '<p>We keep account and workspace data for as long as your account is active. After you cancel, you can export your data, and we delete it within 30 days unless the law requires us to keep it longer. Call notes are kept for as long as they are useful for our relationship with you.</p>'),
 ('Security', '<p>Secrets are encrypted and injected only at run time, agents run in an OS-enforced sandbox limited to the folders you grant, and every run is logged. No system is perfectly secure, and we will tell you promptly if a breach affects your data.</p>'),
 ('Your rights', f'<p>You can ask us to access, correct, export or delete your personal data, or object to how we use it, by writing to <a href="mailto:{CONTACT}">{CONTACT}</a>. We respond within 30 days. You may also complain to your local data protection authority. For India, this includes your rights under the Digital Personal Data Protection Act, 2023.</p>'),
 ('Changes', '<p>If we change this policy in a way that matters, we will update the date above and, for customers, tell you by email before the change takes effect.</p>'),
]

TERMS=[
 ('Agreement', f'<p>These terms are an agreement between you (or the organization you represent) and {COMPANY}, India ("we", "us"), for AgentWorks Cloud and any other hosted AgentWorks service. By using the service you accept them. Enterprise customers may have a separate written agreement, which takes precedence where it differs.</p>'),
 ('The open-source software', '<p>The AgentWorks source code is licensed under the MIT License. Your use of the open-source software on your own machines is governed by that license, not by these terms.</p>'),
 ('The service', '<p>AgentWorks Cloud lets you set goals and run AI agents, crews and workflows that work toward them using your connected tools and your own AI plan. We onboard Cloud customers by hand and may change or improve features over time. We will not remove a core feature you are paying for without reasonable notice.</p>'),
 ('Your account', '<p>You are responsible for the accounts you create, for keeping credentials safe, and for what happens under your workspace. Tell us promptly if you suspect unauthorized access.</p>'),
 ('Your AI plan and connected tools', '<p>Agents run on AI subscriptions and API keys you provide, and act through tools you connect (such as Slack, WhatsApp, Gmail, MCP servers or websites). Those providers bill you directly and their terms apply to your use of them. You are responsible for having the right to connect them and to let agents act in them.</p>'),
 ('Agent actions and approvals', '<p>AI agents can make mistakes. You choose how much each agent or workflow may do on its own, and outward actions such as sending messages ask for your approval by default. You are responsible for reviewing outputs and for actions you approve or allow agents to take automatically.</p>'),
 ('Acceptable use', '<p>You must not use the service to break the law, infringe others\' rights, send spam, access systems without authorization, run security tests against targets you are not authorized to test, or harm the service or other customers. We may suspend a workspace that puts the service or others at risk, and will tell you why.</p>'),
 ('Your data', '<p>You own the data in your workspace. You give us permission to process it only to provide and support the service for you. Our <a href="/privacy/">Privacy Policy</a> explains how we handle it. You can export your data at any time while your account is active.</p>'),
 ('Fees and billing', '<p>Cloud costs the price shown on our <a href="/pricing/">pricing page</a> at the time you subscribe, billed monthly in advance through our payment provider, which acts as merchant of record and may add applicable taxes. Prices can change with at least 30 days\' notice before your next billing period. Refunds are covered by our <a href="/refunds/">Refund Policy</a>.</p>'),
 ('Cancellation and termination', '<p>You can cancel at any time and keep access until the end of the paid period. We may terminate for material breach of these terms if it is not fixed within 14 days of notice. After termination, you can export your data for 30 days, after which we delete it.</p>'),
 ('Warranties', '<p>We provide the service with reasonable skill and care. Beyond that, and to the extent the law allows, the service is provided "as is", without warranties that it will be uninterrupted, error-free or that agent outputs will be accurate or achieve a particular result.</p>'),
 ('Liability', '<p>To the extent the law allows, neither side is liable for indirect or consequential losses, lost profits or lost data, and our total liability under these terms is limited to the fees you paid us in the 12 months before the claim. Nothing limits liability that cannot be limited by law.</p>'),
 ('Governing law', '<p>These terms are governed by the laws of India, and the courts of India have exclusive jurisdiction over any dispute, except where the law of your country gives you the right to bring a claim locally.</p>'),
 ('Changes and contact', f'<p>We may update these terms and will give customers at least 30 days\' notice of material changes by email. Questions: <a href="mailto:{CONTACT}">{CONTACT}</a>.</p>'),
]

REFUNDS=[
 ('7-day money-back guarantee', f'<p>If AgentWorks Cloud is not right for you, cancel within 7 days of your first payment and we will refund that payment in full, no questions asked. Email <a href="mailto:{CONTACT}">{CONTACT}</a>.</p>'),
 ('After the first 7 days', '<p>You can cancel at any time. Your subscription stops renewing and you keep access until the end of the period you have paid for. We do not give partial refunds for unused time, except where the law requires it or we have failed to provide the service.</p>'),
 ('Your AI plan', '<p>Your AI subscription or API usage (for example with Anthropic, OpenAI, Google or Cursor) is billed by that provider, not by us, so refunds for it are handled under their policy.</p>'),
 ('Enterprise', '<p>Enterprise pilots and contracts follow the refund and termination terms in your agreement.</p>'),
 ('How refunds are paid', '<p>Refunds go back to the original payment method through our payment provider, usually within 5 to 10 business days depending on your bank.</p>'),
]

for slug,title,intro,sections,desc in [
 ('privacy','Privacy Policy','What personal data AgentWorks handles, why, and your choices.',PRIVACY,'How AgentWorks handles personal data on the website, in the open-source app and in AgentWorks Cloud and Enterprise.'),
 ('terms','Terms of Service','The terms for using AgentWorks Cloud and other hosted AgentWorks services.',TERMS,'Terms of Service for AgentWorks Cloud and hosted AgentWorks services, operated by Excellence Technosoft Pvt Ltd.'),
 ('refunds','Refund Policy','A 7-day money-back guarantee, and how cancellation works after that.',REFUNDS,'AgentWorks Cloud refund policy: 7-day money-back guarantee, cancel anytime, access until the end of the paid period.'),
]:
    path=f'/{slug}/'
    LD={"@type":"WebPage","name":f"AgentWorks {title}","url":"https://agentworkshq.com"+path,"isPartOf":{"@id":"https://agentworkshq.com/#website"}}
    pages[f'{slug}/index.html']=head(f'{title} - AgentWorks',desc,path,extra_ld=ld(LD))+header()+_legal(title,intro,sections)+footer()
