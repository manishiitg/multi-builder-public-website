from uc_data import uc_nav_items
AREAS=[
 ("Browser QA",8,"Agents that test your product like users do, keep evidence and repair their own tests.",
  ["Critical journey validation","Release and PR quality gate","Authentication and session validation","Role and permission validation","Flaky-test detection and stabilization","Browser test self-healing","Scheduled regression and synthetic monitoring","Basic browser setup"]),
 ("Reliability operations",4,"From alert to verified recovery, with humans approving every consequential step.",
  ["CI and deployment failure triage","Incident investigation and coordination","Governed remediation and recovery","Post-incident review and actions"]),
 ("Security engineering",1,"Authorized assessment through reviewed fixes to verified closure.",
  ["Application security assessment and remediation"]),
 ("Performance engineering",2,"Measure pages, journeys and APIs against the budgets you set.",
  ["Browser performance validation","API performance validation"]),
 ("FinOps",1,"Find cost anomalies and prove the savings after every change.",
  ["Cost anomaly to verified savings"]),
 ("Growth & engineering intelligence",7,"Governed metrics for delivery, quality, funnels, retention, SEO and AI visibility.",
  ["Engineering operations intelligence","Funnel and conversion intelligence","Activation and retention intelligence","SEO intelligence","AI visibility intelligence","Growth experimentation and follow-through","Growth data foundation"]),
]
def areas():
    out=[]
    for name,n,desc,items in AREAS:
        lis=''.join(f'<li>{i}</li>' for i in items)
        out.append(f'<article class="area reveal"><h3>{name}<small>{n} playbook{"s" if n>1 else ""}</small></h3><p>{desc}</p><ul>{lis}</ul></article>')
    return '\n          '.join(out)

FAQ_ENT=[
 ("Where does AgentWorks run?","In your AWS, GCP or Azure account, in a private cloud, or on your own servers. Agents, browsers, secrets and logs stay inside your environment."),
 ("Which models can we use?","Your enterprise Claude, ChatGPT or Gemini agreements through Claude Code, Codex, Cursor and Pi, or API models through AWS Bedrock, Azure, Vertex AI or OpenRouter. You choose per goal and per step."),
 ("How is this different from an internal developer portal?","A portal catalogs services and gives engineers self-service actions. AgentWorks gives agents a goal, such as release quality, incident response or security backlog, and has them do the work, measure the result and improve, with approvals and audit."),
 ("How is this different from a workflow builder?","In a builder, you draw every step. In AgentWorks you set the outcome and the metric, start from a playbook, and AgentWorks keeps improving the plan against evidence from each run."),
 ("Is it open source?","Yes. The engine is MIT-licensed, so your security team can read every line. Enterprise adds SSO, SCIM, audit export, custom playbooks, deployment support and an SLA."),
 ("How long does a pilot take?","About four weeks: one week to pick the goal and connect systems, then three weeks of supervised runs against agreed success metrics."),
]

body=f'''  <main id="main">
    <section class="page-hero left">
      <div class="wrap">
        <p class="kicker">AgentWorks Enterprise</p>
        <h1>Agentic engineering operations, in your own cloud.</h1>
        <p class="lede">Your engineers ship faster with AI. Now QA, CI, incidents, security and cloud cost are the bottleneck. AgentWorks puts agents on those goals, with approvals, audit trails and your own models.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="{GH}" target="_blank" rel="noreferrer">Read the source</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div class="reveal">
          <p class="kicker">The new bottleneck</p>
          <h2>Code got faster. Everything around it didn't.</h2>
          <p class="lede">AI coding tools multiplied how much your team ships. The work that keeps it safe in production still waits on people.</p>
        </div>
        <ul class="pain reveal">
          <li><span class="num">01</span><div><b>Releases wait on flaky tests</b><span>Agents run the right suites for each change, repair broken tests and record a pass, fail or needs-review decision.</span></div></li>
          <li><span class="num">02</span><div><b>Incidents start from zero</b><span>Agents correlate alerts, logs and deploys and bring a first RCA with evidence before the war room fills up.</span></div></li>
          <li><span class="num">03</span><div><b>The security backlog only grows</b><span>Agents triage findings, prepare reviewed fixes and verify closure instead of adding tickets.</span></div></li>
          <li><span class="num">04</span><div><b>Cloud cost surprises</b><span>Agents catch anomalies, prepare rightsizing changes and prove the savings afterwards.</span></div></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Playbooks</p>
          <h2>23 engineering playbooks, ready to install.</h2>
          <p class="lede">Each playbook sets up the goal, the tools, the evidence to keep and the questions agents should ask your team. We tune them to your stack and build new ones with you.</p>
        </div>
        <div class="areas">
          {areas()}
        </div>
      </div>
    </section>

    <section class="section" id="use-cases">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Use cases</p>
          <h2>Start with the goal that hurts most.</h2>
          <p class="lede">Each use case comes with its playbooks, an example goal and a four-week pilot plan.</p>
        </div>
        <div class="uc-grid five">{''.join(f'<a class="uc-link" href="{h}"><b>{t}</b><span>{d}</span></a>' for h,t,d,i in uc_nav_items())}</div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Where we fit</p>
          <h2>Not another portal. Not another canvas.</h2>
        </div>
        <ul class="versus">
          <li class="reveal"><small>Developer portals</small><h3>Catalog and self-service</h3><p>Great for knowing what you run. Engineers still do the work behind every action.</p></li>
          <li class="reveal"><small>Workflow builders</small><h3>You draw every step</h3><p>Good for fixed flows. When the flow breaks or the goal moves, someone rebuilds it.</p></li>
          <li class="us reveal"><small>AgentWorks</small><h3>Agents that own a goal</h3><p>Set the outcome and the metric. Agents do the work, measure it and improve the plan, under your approvals and audit.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Security &amp; control</p>
          <h2>Built for your security review.</h2>
          <p class="lede">Open source, self-hosted and governed. Your CISO can read every line and every log.</p>
        </div>
        <ul class="checklist">
          <li><div><b>Self-hosted deployment</b><span>Your VPC, private cloud or data center. Nothing leaves your network unless you allow it.</span></div></li>
          <li><div><b>SSO and SCIM</b><span>SAML or OIDC sign-in with your identity provider, and automatic provisioning.</span></div></li>
          <li><div><b>Roles and per-workflow access</b><span>Admin, member, contributor and read-only roles, plus owner and reader access for every workflow.</span></div></li>
          <li><div><b>Approvals and autonomy limits</b><span>Outward actions and workflow changes ask first by default. Raise limits per goal.</span></div></li>
          <li><div><b>Encrypted secrets</b><span>AES-256-GCM vault, injected only at run time and never shown in chat or logs.</span></div></li>
          <li><div><b>OS-enforced sandbox</b><span>Landlock on Linux and sandbox-exec on macOS restrict each agent to what you grant.</span></div></li>
          <li><div><b>Complete audit trail</b><span>Every run, tool call, decision and cost is recorded and exportable to your SIEM.</span></div></li>
          <li><div><b>Your models, your contracts</b><span>Use your existing enterprise AI agreements or private endpoints. No token markup.</span></div></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How we start</p>
          <h2>One goal. Four weeks. Measured.</h2>
          <p class="lede">We don't sell a platform and hope. We pick one painful goal, agree how success is measured, and prove it.</p>
        </div>
        <ol class="pilot">
          <li class="reveal"><small>Week 1</small><h3>Pick the goal</h3><p>Choose one goal, such as "no release without a QA decision", agree the metric, and deploy AgentWorks in your environment.</p></li>
          <li class="reveal"><small>Weeks 2–4</small><h3>Run under supervision</h3><p>Agents run the playbook with approvals on. We tune it to your stack and your team's answers every week.</p></li>
          <li class="reveal"><small>Review</small><h3>Decide on evidence</h3><p>Review the metric, the run log and the cost together. Expand to the next goal only if it paid off.</p></li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">Deployment</p>
          <h2>Runs where your code runs.</h2>
        </div>
        <ul class="deploy">
          <li class="reveal"><h3>Your cloud account</h3><p>Deployed into AWS, GCP or Azure with your networking, identity and secrets managers.</p></li>
          <li class="reveal"><h3>Private cloud or on-prem</h3><p>Linux servers you control, with private model endpoints and no outbound calls you haven't approved.</p></li>
          <li class="reveal"><h3>Dedicated hosted</h3><p>A single-tenant AgentWorks we run for you, isolated from every other customer.</p></li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Enterprise questions.</h2>
        </div>
        <div class="faq">
          {faq(FAQ_ENT)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <div>
          <h2>Pick the goal. We'll prove it in four weeks.</h2>
          <p>Tell us where engineering time is leaking. We'll bring the playbook and the success metric to the first call.</p>
          <div class="cta-actions">
            <a class="btn btn-primary" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
            <a class="btn btn-ghost" href="/agents/#engineering">See the playbooks</a>
          </div>
        </div>
      </div>
    </section>
  </main>
'''
ENT_LD={"@type":"WebPage","name":"AgentWorks Enterprise","url":"https://agentworkshq.com/enterprise/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['enterprise/index.html']=head('AgentWorks Enterprise - Agentic Engineering Operations','Put AI agents on engineering goals: release quality, incidents, security backlog and cloud cost. Self-hosted with SSO, approvals, audit logs and your models.','/enterprise/',og='agentworks-enterprise-og.jpg',extra_ld=ld(ENT_LD,BC('Enterprise','/enterprise/'),faq_ld(FAQ_ENT)))+header('enterprise')+body+footer()
