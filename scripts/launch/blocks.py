from partials import *
import html as H

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
              <li>Email inbox for every teammate</li>
              <li>Hand-held onboarding: we set up your first goal with you</li>
              <li>Invite your team with roles</li>
              <li>Priority email support</li>
            </ul>
            <div class="tier-foot">
              <a class="btn btn-amber btn-block" href="{SIGNUP}" target="_blank" rel="noreferrer">Book a call</a>
              <small>Starts with a call · 7-day money-back guarantee</small>
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
 ("Do I need to know how to code?","No. Pick a premade agent or describe what you want in plain words, and AgentWorks sets it up with you. Engineers can go deeper with custom tools, skills and playbooks."),
 ("What's the difference between Crew and Goals?","A Crew teammate does what you ask, when you ask, in Slack, WhatsApp or the app. A Goal has a target, like \"every lead contacted within an hour\", and keeps running, measuring and improving on its own until it hits it. Teammates often work on goals."),
 ("Can I talk to it from ChatGPT or Claude?","Yes. Connect ChatGPT, Claude, Cowork or any MCP client to the AgentWorks MCP server, then check goals, read reports and start runs without leaving that chat."),
 ("Which AI plans can I use?","Claude (Pro or Max), ChatGPT (Plus or Pro), Gemini, Cursor and Muse, through each vendor's own coding agent: Claude Code, Codex, Cursor, Pi and Muse. Sign in with your subscription, or give that agent an API key. Pi can also route to OpenRouter and other providers."),
 ("What does the $99 cover, and what else will I pay?","$99 covers your hosted workspace, unlimited teammates and goals, every premade agent, onboarding and support. Your AI plan is billed separately by its provider. Most teams use a plan they already have; heavy use works best on a $100–$200 plan."),
 ("Can a teammate send something without me?","Not unless you allow it. Anything that goes out, like emails, messages, payments and posts, waits for your approval by default. You can raise the limits per teammate or goal once you trust it."),
 ("Is my data used to train AI models?","We don't train on your data. Your AI provider's own policy applies to the prompts sent through your plan, and business plans from the major providers don't train on them either."),
 ("Is AgentWorks really open source?","Yes. The engine is MIT-licensed on GitHub and you can run it free on your Mac or your own server. Cloud is the same engine, hosted and set up for you."),
 ("How do I get Cloud?","Book a short call. We onboard teams by hand: we set up your first goal with you, connect your tools, and check in through your first month. The open-source app is free to download today."),
 ("What if it's not for me?","Cancel anytime. If you cancel in your first 7 days, we refund you in full, no questions asked."),
]
def faq(items, heading=None):
    out=[]
    for i,(q,a) in enumerate(items):
        out.append(f'<details{" open" if i==0 else ""}><summary>{H.escape(q)}</summary><p>{H.escape(a)}</p></details>')
    return '\n          '.join(out)

def faq_ld(items):
    import json
    return json.dumps({"@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in items]}, ensure_ascii=False, indent=2)
