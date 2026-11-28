# /vault/ (owner 2026-11-28: the enterprise use-case pages and /ecommerce/ are retired; Vault keeps its page).
import html as _h
_e=_h.escape
VAULT_PAINS=[('Tool logins live on every laptop','Each person connects tools with their own keys, so access can\'t be reviewed or removed in one place.'),
             ('Anyone can call any tool','There is no way to say which team may use which tool, or what it may be asked to do.'),
             ('Shared keys get pasted around','API keys and passwords travel through chats and files, with no record of who can use them.')]
VAULT_STEPS=[('Connect tools once','An admin connects a tool (an MCP server) and approves what it can do. Connecting it gives nobody access yet.'),
             ('Give access by group','Access is off by default. Give a group single tools or whole servers, and add rules on what a tool may be asked.'),
             ('Share keys without pasting them','A group\'s agents use a shared key at run time; nobody passes it around in chat.'),
             ('Every call is recorded','Each call is checked against the current groups and rules, and logged with the person and the agent that made it.')]
VAULT_INCLUDES=['One connection for Claude, ChatGPT, Cursor and your team\'s agents','Sign-in with your company account','Off-by-default access per group, server or single tool','Rules on what a tool may be asked','New or changed tools held for review','Shared keys given to groups, not pasted into chats','A record of every call, with the person and the agent','A chat assistant that sets up access and explains each change']
VAULT_FAQ=[('Is Vault part of every setup?','Yes. It comes with AgentWorks and we set it up with you, together with the Team kit your teams share.'),
       ('Which AI tools work with it?','Any tool that can connect to a remote MCP server, such as Claude, ChatGPT, Cursor and your team\'s agents. People sign in with the company account, and a tool can be disconnected at any time.'),
       ('Does connecting a tool give people access?','No. Access is off by default. A tool reaches people only through the groups an admin gives it to, and new or changed tools wait for review.'),
       ('Can agents see a shared key?','An agent receives the key when it runs, so it can use it. What Vault stops is keys being pasted into chats and files, and use by people outside the group.'),
       ('Where does it run?','On your AgentWorks server, on your own infrastructure.')]
_USES_V=uc_section([
 uc_pipe("Allowed call",("claude","Claude"),[("det","github · create_issue"),("ok","Engineering may use it")],"Call made and recorded"),
 uc_pipe("Blocked tool",("cursor","Cursor"),[("det","database · run_query"),("no","Not given to Marketing")],"Refused and recorded"),
 uc_pipe("Rule on inputs",("openai","ChatGPT"),[("det","jira · create_ticket, project FIN"),("cond","Rule: project must be SUP"),("no","Input not allowed")],"Refused, with the reason"),
 uc_pipe("Shared key",("crew","Support agent"),[("det","Needs the payments API key"),("ok","Support may use the key")],"Refund looked up, key never pasted"),
 uc_pipe("New tool appears",("vault","Server update"),[("det","Server adds delete_repo"),("cond","Held for admin review")],"Nobody can call it until approved"),
 uc_pipe("Access removed",("user","Admin"),[("det","Removes a person from a group"),("no","Next call checked again")],"Their access ends"),
], h2='Every call goes through one door.', dim='Illustrative examples.')
_pains=''.join(f'<li class="reveal"><span class="num">0{i+1}</span><div><b>{_e(t)}</b><span>{_e(d)}</span></div></li>' for i,(t,d) in enumerate(VAULT_PAINS))
_steps=''.join(f'<li><h3>{_e(t)}</h3><p>{_e(d)}</p></li>' for t,d in VAULT_STEPS)
_incl=''.join(f'<li>{_e(p)}</li>' for p in VAULT_INCLUDES)
_others=''.join(f'<a class="uc-link" href="{h}"><b>{t}</b><span>{_e(d)}</span></a>' for h,t,d in PRODUCT_PAGES if h!='/vault/')
vault_body=f'''  <main id="main">
    <section class="page-hero left">
      <div class="wrap">
        <p class="kicker">Vault</p>
        <h1>Decide which tools your team&rsquo;s agents can use. <span class="dim">Every call recorded.</span></h1>
        <p class="lede">When everyone&rsquo;s agents work together, they share the company&rsquo;s tools. Vault keeps that safe: admins connect tools once, people sign in with the company account, and every call is checked against the groups and rules you set.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="#uses">See examples</a>
        </div>
      </div>
    </section>

    <section class="section-tight">
      <div class="wrap">
        <ul class="pain">{_pains}</ul>
      </div>
    </section>

{_USES_V}    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <p class="kicker">How it works</p>
          <h2>Connect once. <span class="dim">Every call checked.</span></h2>
        </div>
        <ol class="loop reveal">{_steps}</ol>
      </div>
    </section>

    <section class="section" id="includes">
      <div class="wrap split">
        <div class="reveal">
          <p class="kicker">What it includes</p>
          <h2>Built for your security review. <span class="dim">From day one.</span></h2>
          <p class="lede">Book a call to see it working with your own tools.</p>
        </div>
        <ul class="pb-list reveal">{_incl}</ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap faq-grid">
        <div class="reveal">
          <p class="kicker">FAQ</p>
          <h2 class="h2">Questions, <span class="dim">answered.</span></h2>
        </div>
        <div class="faq">
          {faq(VAULT_FAQ)}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head reveal"><p class="kicker">Also in AgentWorks</p><h2>The rest of the platform.</h2></div>
        <div class="uc-grid">{_others}</div>
      </div>
    </section>

    <section class="cta">
      <div class="wrap">
        <h2>Share tools safely across the team. <span class="dim">Set it up with us.</span></h2>
        <p>Tell us which tools and AI apps your teams use, and we will set up Vault with you.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/platform/">How it works</a>
        </div>
      </div>
    </section>
  </main>
'''
_VLD={"@type":"WebPage","name":"AgentWorks Vault","url":"https://agentworkshq.com/vault/","isPartOf":{"@id":"https://agentworkshq.com/#website"}}
_VBC={"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"AgentWorks","item":"https://agentworkshq.com/"},{"@type":"ListItem","position":2,"name":"How it works","item":"https://agentworkshq.com/platform/"},{"@type":"ListItem","position":3,"name":"Vault","item":"https://agentworkshq.com/vault/"}]}
pages['vault/index.html']=head('AgentWorks Vault - Decide Which Tools Your Team\'s Agents Can Use','Vault is one place for the tools and shared keys your team\'s agents use. Admins connect tools once, give access by group, and every call is checked and recorded.','/vault/',og='agentworks-product-og.jpg',extra_ld=ld(_VLD,_VBC,faq_ld(VAULT_FAQ)))+header('vault')+vault_body+footer()
