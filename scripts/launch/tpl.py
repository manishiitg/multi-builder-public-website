import html, json, sys
# (id, cat, catlabel, icon, name, desc, goal, kinds, home)
SMB = [
 ("money","Money","💸","Invoice Chaser","Watches Stripe or QuickBooks for overdue invoices and sends polite, escalating follow-ups from your own inbox.","Overdue invoices under 5% of receivables",["crew","goal"],True),
 ("money","Money","💳","Failed Payment Recovery","Spots failed card payments, retries at the right time and asks customers to update their card before access lapses.","Recover 40% of failed payments",["goal"],False),
 ("money","Money","📊","Weekly Business Report","Pulls revenue, orders, pipeline and support numbers into one Monday brief in Slack, with anomalies flagged.","In #founders every Monday by 8am",["goal"],False),
 ("customers","Customers","📥","Inbox Triage","Sorts your inbox, answers the routine emails in your voice and leaves only the ones that need you.","90% of inbound answered within 4 business hours",["crew","goal"],True),
 ("customers","Customers","🎧","Support First Response","Answers support questions on email and WhatsApp from your docs and order history, and hands off anything sensitive.","Median first response under 15 minutes",["crew","goal"],False),
 ("customers","Customers","⭐","Review Responder","Replies to every Google and marketplace review, and routes the unhappy ones to you with the order attached.","Every review answered within 48 hours",["goal"],False),
 ("growth","Growth","🎯","Lead Follow-up","Researches each new lead, writes a personal first email and follows up until they book or say no.","Every new lead contacted within 1 hour",["crew","goal"],True),
 ("growth","Growth","🔎","SEO Intelligence","Finds keywords you can win, fixes technical SEO issues and writes page-level briefs, then tracks rankings.","Organic clicks up 15% a quarter",["goal"],True),
 ("growth","Growth","🤖","AI Visibility","Checks whether ChatGPT, Perplexity, Gemini and Google AI Overviews cite you, and closes the gaps.","Cited for your top 20 buyer questions",["goal"],False),
 ("growth","Growth","👀","Competitor Watch","Tracks competitors' pricing, launches and messaging, and sends a short digest when something actually changes.","Price changes surfaced within 7 days",["crew","goal"],False),
 ("ops","Operations","📦","Order Watchdog","Finds Shopify orders stuck in payment, fulfilment or shipping, fixes what it can and tells the customer.","Zero orders stuck more than 24 hours",["goal"],True),
 ("ops","Operations","📝","Meeting Notes to Actions","Turns meeting notes into tasks with owners and due dates, and chases them in Slack.","Every action item owned within 1 hour",["crew"],False),
]
ENG = [
 ("eng","Engineering","🚦","Release & PR Quality Gate","Binds a build to the browser QA suites it needs and publishes an auditable pass, fail or needs-review decision.","No release ships without a recorded decision",["goal"],False),
 ("eng","Engineering","🚨","Incident Investigation","Correlates alerts, logs and deploys, writes a first RCA with evidence and coordinates the response in Slack.","Time to first RCA under 30 minutes",["crew","goal"],False),
 ("eng","Engineering","☁️","Cloud Cost Anomaly to Savings","Detects cost spikes, proposes evidence-backed rightsizing, prepares the change and verifies the savings.","Verified monthly savings, tracked per change",["goal"],False),
 ("eng","Engineering","🛡️","Application Security","Runs authorized code, dependency, secret and config checks, then drives reviewed fixes to verified closure.","Critical findings closed within 14 days",["goal"],False),
]
ICON={'💸': '<path d="M4 4h12l4 4v12H4z"/><path d="M9 12h6M9 16h4M9 8h3"/>', '💳': '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>', '📊': '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', '📥': '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>', '🎧': '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/>', '⭐': '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>', '🎯': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>', '🔎': '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', '🤖': '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 4v4M9 14h.01M15 14h.01"/>', '👀': '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', '📦': '<path d="m21 8-9-5-9 5 9 5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>', '📝': '<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/>', '🚦': '<path d="M5 12l4 4 10-10"/>', '🚨': '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>', '☁️': '<path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19 10a4 4 0 0 1-1 8z"/>', '🛡️': '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>'}
# Business agents that already exist as installable playbooks; the rest are marked coming soon.
AVAILABLE={'SEO Intelligence','AI Visibility'}

def card(t, heading='h3'):
    cat,catlabel,icon,name,desc,goal,kinds,home = t
    tags=''.join(f'<span class="tag tag-{k}">{"Crew" if k=="crew" else "Goal"}</span>' for k in kinds)
    if cat!='eng' and name not in AVAILABLE:
        tags+='<span class="tag tag-soon">Coming soon</span>'
    return f'''<article class="tpl" data-cat="{cat}">
            <div class="tpl-top"><span class="tpl-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{ICON[icon]}</svg></span><span class="tpl-cat">{catlabel}</span></div>
            <{heading}>{html.escape(name)}</{heading}>
            <p>{html.escape(desc)}</p>
            <p class="tpl-goal"><span>Goal</span>{html.escape(goal)}</p>
            <div class="tpl-foot">{tags}</div>
          </article>'''
if __name__=='__main__':
  mode=sys.argv[1]
  if mode=='home':
    print('\n          '.join(card(t) for t in SMB+ENG if t[7]))
  elif mode=='smb':
    print('\n          '.join(card(t) for t in SMB))
  elif mode=='eng':
    print('\n          '.join(card(t) for t in ENG))
