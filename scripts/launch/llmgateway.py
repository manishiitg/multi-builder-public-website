# /llm-gateway/: LLM Gateway, one company endpoint for AI model calls. Facts from PR 278 / PLAT-869 (2026-10-11): per-person
# llm:use tokens limited to model list and inference, per-person model access, every request audited with cost by person
# and model, runs on the AgentWorks server next to Vault. Not released yet, so the page says "Coming soon".
FAQ_LLMGW=[
 ("Is it available?","Not yet. LLM Gateway is coming soon. Book a call and we will set it up with you when it opens."),
 ("How do apps call it?","Through one endpoint on your AgentWorks server: list the models, then send messages or responses requests. Each person or app uses their own token."),
 ("What can a token do?","Only list models and run them. It can't change settings or reach the admin screens, and the person's current model access still applies on every call."),
 ("Does it replace Vault?","No. Vault governs MCP tools and shared secrets. LLM Gateway governs model calls. They run side by side on your server."),
]

_mrow=lambda ic,name,who,tag,cls='': f'<div class="row"><span class="net-ic">{ic}</span><div class="grow">{name}<small>{who}</small></div><span class="tag {cls}">{tag}</span></div>'
body=f'''  <main id="main">
    <section class="page-hero left">
      <div class="wrap">
        <p class="kicker">LLM Gateway <span class="tag">Enterprise</span> <span class="tag tag-soon">Coming soon</span></p>
        <h1>One endpoint for every model. <span class="dim">Every call checked and costed.</span></h1>
        <p class="lede">Give every person and internal app one way to call AI models. You choose who can use which model, and see the cost of every call by person and by model.</p>
        <div class="hero-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#uses">See use cases</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <div class="goal-pair">
          <div class="explainer reveal" aria-label="Example: who can use which model">
            <p class="explainer-title"><span>Models</span><span class="tag tag-soon">Illustrative</span></p>
            {_mrow(logo("claude"),"Claude","Engineering, Support","Allowed","tag-run")}
            {_mrow(logo("openai"),"GPT","Everyone","Allowed","tag-run")}
            {_mrow(logo("googlegemini"),"Gemini","Data team only","Limited","tag-wait")}
          </div>
          <div class="explainer reveal" aria-label="Example: cost by person this week">
            <p class="explainer-title"><span>Cost this week</span><span class="tag tag-soon">Illustrative</span></p>
            <div class="row"><span class="avatar avatar-rio">R</span><div class="grow">Rio<small>Claude · support tool</small></div><span class="mono">$42</span></div>
            <div class="row"><span class="avatar avatar-sage">S</span><div class="grow">Sage<small>Gemini · data notebooks</small></div><span class="mono">$31</span></div>
            <div class="row"><span class="avatar avatar-otto">O</span><div class="grow">Docs bot<small>GPT · internal app</small></div><span class="mono">$12</span></div>
            <div class="row"><span class="avatar avatar-ava">A</span><div class="grow">Ava<small>Claude · coding</small></div><span class="mono">$27</span></div>
          </div>
        </div>
      </div>
    </section>

{uc_section([
 uc_pipe("Internal app",("code","Support tool"),[("det","Calls Claude with Rio's token"),("ok","Support may use Claude")],"Answer returned, cost recorded"),
 uc_pipe("Model not allowed",("user","An intern's script"),[("det","Asks for the largest model"),("no","Not in their allowed models")],"Refused and recorded"),
 uc_pipe("Lost laptop",("term","An old token"),[("det","Tries to list the models"),("no","Token revoked")],"Refused"),
 uc_pipe("No provider keys in apps",("openai","Any app"),[("det","Uses the company endpoint"),("ok","Signs in with a personal token")],"Provider keys stay off laptops"),
 uc_pipe("Monthly cost review",("user","Finance"),[("det","Opens the cost summary"),("ok","By person and by model")],"AI spend explained, line by line"),
 uc_pipe("With Vault",("vault","Your server"),[("det","Vault governs the tools"),("det","LLM Gateway governs the models")],"One place for AI access"),
], h2='One door for model calls.', dim='Illustrative examples.')}
    <section class="section" id="how">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How it works</p>
          <h2>Three steps.</h2>
        </div>
        <ol class="loop loop-3 reveal">
          <li><h2>Add your models</h2><p>Connect the model providers your company uses, once.</p></li>
          <li><h2>Choose who uses what</h2><p>Allow each person the models they need.</p></li>
          <li><h2>Hand out tokens</h2><p>People and apps call one endpoint. Every call is checked and costed.</p></li>
        </ol>
        {uc_pills(['A token per person','Model access per person','Every call recorded with its cost','Runs on your server'])}
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Questions, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(FAQ_LLMGW)}
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Bring model calls under one roof. <span class="dim">Before the bills surprise you.</span></h2>
        <p>Tell us which models and apps your teams use, and we will set up LLM Gateway with you.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/vault/">See Vault</a>
        </div>
      </div>
    </section>
  </main>
'''
LLMGW_LD={"@type":"WebPage","name":"AgentWorks LLM Gateway","url":"https://agentworkshq.com/llm-gateway/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
pages['llm-gateway/index.html']=head('AgentWorks LLM Gateway - One Endpoint for Every AI Model, With Access and Cost Control','LLM Gateway gives every person and internal app one endpoint for AI models. Choose who can use which model, hand out personal tokens, and see the cost of every call by person and by model.','/llm-gateway/',extra_ld=ld(LLMGW_LD,BC('LLM Gateway','/llm-gateway/'),faq_ld(FAQ_LLMGW)))+header('product')+body+footer()
