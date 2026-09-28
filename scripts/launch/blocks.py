from partials import *
import html as H

def _cloud_cta():
    if PAYPAL_SUBSCRIBE:
        return (f'<a class="btn btn-amber btn-block" href="{PAYPAL_SUBSCRIBE}" target="_blank" rel="noreferrer">Subscribe with PayPal</a>\n'
                f'              <small>Cancel anytime · 7-day money-back guarantee · <a href="{CAL}" target="_blank" rel="noreferrer">or book a call first</a></small>')
    return (f'<a class="btn btn-amber btn-block" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>\n'
            '              <small>Starts with a call · 7-day money-back guarantee</small>')

def tiers(heading='h3'):
    return f'''<div class="tiers">
          <article class="tier reveal">
            <p class="tier-name">Open source</p>
            <p class="tier-price"><strong>$0</strong><span>forever</span></p>
            <p class="tier-desc">Run the whole engine yourself, on your Mac or your own Linux server.</p>
            <ul class="tier-list">
              <li>Crew teammates and Goals</li>
              <li>Auto-improvement toward your goals</li>
              <li>All premade agents and playbooks</li>
              <li>Slack and WhatsApp channels</li>
              <li>Secrets vault, sandbox, run logs</li>
              <li>MIT license, community support</li>
            </ul>
            <div class="tier-foot">
              <a class="btn btn-ghost btn-block" href="{GH}" target="_blank" rel="noreferrer">Get it on GitHub</a>
              <small>macOS app or self-hosted Linux</small>
            </div>
          </article>
          <article class="tier tier-featured reveal">
            <span class="tier-badge">Hand-held onboarding</span>
            <p class="tier-name">Cloud</p>
            <p class="tier-price"><strong>$99</strong><span>/ month</span></p>
            <p class="tier-desc">Everything in open source, hosted and set up for you. Nothing to install.</p>
            <ul class="tier-list">
              <li class="head">Everything in Open source, plus</li>
              <li>Unlimited Crew teammates and Goals</li>
              <li>Hosted workspace with a browser per teammate</li>
              <li>Gmail updates and mailbox work you grant</li>
              <li>Hand-held onboarding: we set up your first goal with you</li>
              <li>Invite your team with roles</li>
              <li>Priority email support</li>
            </ul>
            <div class="tier-foot">
              {_cloud_cta()}
            </div>
          </article>
          <article class="tier reveal">
            <p class="tier-name">Enterprise</p>
            <p class="tier-price"><strong>Custom</strong></p>
            <p class="tier-desc">Agentic engineering operations, deployed in your cloud with the controls your security team needs.</p>
            <ul class="tier-list">
              <li class="head">Everything in Cloud, plus</li>
              <li>Self-hosted in your VPC or private cloud</li>
              <li>SSO (SAML / OIDC) and SCIM</li>
              <li>Audit logs and per-workflow permissions</li>
              <li>Engineering playbooks and custom playbooks</li>
              <li>Custom integrations built with you</li>
              <li>Dedicated support and SLA</li>
            </ul>
            <div class="tier-foot">
              <a class="btn btn-ghost btn-block" href="{CAL}" target="_blank" rel="noreferrer">Talk to us</a>
              <small>Starts with a scoped pilot</small>
            </div>
          </article>
        </div>'''

FAQ_HOME=[
 ("Does every step use AI?","No. Work that should run the same way every time, like pulling data, calling an API or applying a change, runs as a scripted step: plain code with no AI, whose output is checked before the workflow moves on. Agents take the steps that need judgment, and rules like \"over $200 needs approval\" are decided in code."),
 ("Do I need to know how to code?","No. Pick a premade agent or describe what you want in plain words, and AgentWorks sets it up with you. Engineers can go deeper with custom tools, skills and playbooks."),
 ("What's the difference between Crew and Goals?","A Crew teammate does what you ask, when you ask, in Slack, WhatsApp or the app. A Goal has a target, like \"every lead contacted within an hour\", and keeps running, measuring and improving on its own until it hits it. Teammates often work on goals."),
 ("Which AI plans can I use?","Claude (Pro or Max), ChatGPT (Plus or Pro), Gemini, Cursor and Muse, through each vendor's own coding agent: Claude Code, Codex, Cursor, Pi and Muse. Sign in with your subscription, or give that agent an API key. Pi can also route to OpenRouter and other providers."),
 ("How do I get Cloud?",("Subscribe with PayPal on the pricing page, or book a short call first. Within one business day of subscribing we email you to set up your first goal together: we connect your tools, agree the metric and check in through your first month. Cancel anytime." if PAYPAL_SUBSCRIBE else "Book a short call. We onboard teams by hand: we set up your first goal with you, connect your tools, and check in through your first month. The open-source app is free to download today.")),
 ("Can people use a Crew from Claude or ChatGPT?","Yes. Share a Crew and people ask it from Claude, ChatGPT, Cursor, Claude Code, Codex or the agentworks CLI, through MCP. Each person gets their own conversation, and the Crew's private chats and data stay private."),
 ("Can a teammate send something without me?","Not unless you allow it. Anything that goes out, like emails, messages, payments and posts, waits for your approval by default. You can raise the limits per teammate or goal once you trust it."),
]
def faq(items, heading=None):
    out=[]
    for i,(q,a) in enumerate(items):
        out.append(f'<details{" open" if i==0 else ""}><summary>{H.escape(q)}</summary><p>{H.escape(a)}</p></details>')
    return '\n          '.join(out)

def faq_ld(items):
    import json
    return json.dumps({"@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in items]}, ensure_ascii=False, indent=2)

# "Not everything should be agentic": scripted steps next to agent steps. Used on Home, Product and Goals.
def scripted_section(sid='scripted'):
    return f'''    <section class="section" id="{sid}">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Scripted where it counts</p>
          <h2>Not everything should be agentic. <span class="dim">Script what's known. Use agents for judgment.</span></h2>
          <p class="lede">Pulling data, calling an API or applying a change should happen the same way every time. AgentWorks runs that work as scripted steps: plain code with no AI in the loop, checked before the workflow moves on. Agents take the steps that need judgment, and the two hand off through files and data, not chat.</p>
        </div>
        <div class="plan reveal" aria-label="Example: a workflow that mixes scripted and agent steps">
          <div class="plan-head"><b>Refund review</b><span class="tag">Illustrative</span></div>
          <div class="pipe">
            <p class="pipe-name">Runs every morning</p>
            <ol>
              <li class="st det"><small>Script</small><b>Pull yesterday's refund requests</b><em>API call, no AI</em></li>
              <li class="st agent"><small>Agent</small><b>Check each against the order</b><em>judgment</em></li>
              <li class="st cond"><small>Rule</small><b>Over $200?</b><em>decided in code</em></li>
              <li class="st human"><small>Approval</small><b>You approve the big ones</b><em>human step</em></li>
              <li class="st det"><small>Script</small><b>Issue the refunds</b><em>same way every time</em></li>
            </ol>
          </div>
          <div class="plan-foot"><span><i class="lg det"></i>Script: code, no AI</span><span><i class="lg agent"></i>Agent</span><span><i class="lg cond"></i>Rule in code</span><span><i class="lg human"></i>Human approval</span></div>
        </div>
        <ul class="control engine-points">
          <li class="reveal"><h3>Same result every time</h3><p>A scripted step runs as code and must exit cleanly and pass its output check before the next step starts. If it fails, the run stops and says why, instead of guessing.</p></li>
          <li class="reveal"><h3>Cheaper and faster</h3><p>No model tokens for work that doesn't need thinking. Agents spend your AI plan only where judgment moves the result.</p></li>
          <li class="reveal"><h3>Written for you, readable by you</h3><p>Describe the step and the Builder writes the script and tests it before it runs. The code is yours to read, review and change, and every run is logged.</p></li>
        </ul>
      </div>
    </section>
'''
