import subprocess, json, sys, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
from partials import *
from blocks import *
OUT=os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
def tpl(mode): return subprocess.check_output([sys.executable,'tpl.py',mode],text=True).rstrip()
def fill(s, **kw):
    s=s.replace('{{SIGNUP}}',SIGNUP).replace('{{CAL}}',CAL).replace('{{GH}}',GH).replace('{{INSTALL}}',INSTALL)
    for k,v in kw.items(): s=s.replace('{{'+k+'}}',v)
    import re
    s=re.sub(r'\{\{LOGO:(\w+)\}\}',lambda m: logo(m.group(1)),s)
    s=re.sub(r'\{\{TOOL:(\w+)\}\}',lambda m: tool(m.group(1)),s)
    s=re.sub(r'\{\{SHOT:([^|}]+)\|([^|}]+)\|([^|}]+)\|([^}]*)\}\}',lambda m: shot(*m.groups()),s)
    assert '{{' not in s, s[s.index('{{'):s.index('{{')+40]
    return s
def ld(*nodes):
    graph=[json.loads(n) if isinstance(n,str) else n for n in nodes]
    return '  <script type="application/ld+json">\n'+json.dumps({"@context":"https://schema.org","@graph":graph},ensure_ascii=False,indent=2)+'\n  </script>\n'
ORG={"@type":"Organization","@id":"https://agentworkshq.com/#organization","name":"AgentWorks","url":"https://agentworkshq.com/","logo":"https://agentworkshq.com/assets/brand/agentworks-logo.svg","sameAs":[GH,"https://x.com/manish_iitg","https://in.linkedin.com/in/manishiitg"]}
SOFT={"@type":"SoftwareApplication","@id":"https://agentworkshq.com/#software","name":"AgentWorks","applicationCategory":"BusinessApplication","operatingSystem":"Web, macOS, Linux","description":"AI teammates that own a goal: Crew teammates you message in Slack or WhatsApp, and Goals that run, measure and improve until they hit a target.","url":"https://agentworkshq.com/","codeRepository":GH,"offers":[{"@type":"Offer","name":"Open source","price":"0","priceCurrency":"USD"},{"@type":"Offer","name":"Cloud","price":"99","priceCurrency":"USD","availability":"https://schema.org/LimitedAvailability","priceSpecification":{"@type":"UnitPriceSpecification","price":"99","priceCurrency":"USD","billingDuration":"P1M"}}]}

pages={}
body=open('home.body.html').read()
pages['index.html']=head('AgentWorks - Goal-Driven AI Agents for Business','AI agents for business that own a goal and a metric. They run the work daily, measure every run and improve until they hit the target. $99/month or open source.','/',extra_ld=ld(ORG,{"@type":"WebSite","@id":"https://agentworkshq.com/#website","name":"AgentWorks","url":"https://agentworkshq.com/"},SOFT,faq_ld(FAQ_HOME)))+header()+fill(body,TEMPLATES=tpl('home'),TIERS=tiers(),FAQ=faq(FAQ_HOME))+footer()
for name in ['pricing.py', 'enterprise.py', 'agents.py', 'product.py', 'usecases.py', 'solutions.py']:
    exec(open(name).read())
for path,content in pages.items():
    import os
    full=os.path.join(OUT,path); os.makedirs(os.path.dirname(full),exist_ok=True)
    open(full,'w').write(content); print('wrote',path,len(content))
