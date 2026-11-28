"""Generate 1200x630 social images for the launch pages: python3 scripts/launch/og.py (needs Playwright via NODE_PATH)."""
import os, subprocess, json, tempfile, sys
ROOT=os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))
_CAT=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'catalog.json')))
N_AGENTS=len(_CAT['crew'])
CARDS=[
 ('agentworks-home-og.jpg','Everyone on your team has AI.','AgentWorks makes the team faster.','team'),
 ('agentworks-product-og.jpg','Ask. Hand off.','Keep it running.','how'),
 ('agentworks-agents-og.jpg',f'{N_AGENTS} premade agents,','ready to start today.','agents'),
 ('agentworks-pricing-og.jpg','One team, four weeks.','We set it up with you.','setup'),
 ('agentworks-404-og.jpg','This page isn’t here.','Your team’s work still is.','none'),
]
ART={
'how':'''<div class="art grid4"><div><s>01</s><b>Ask</b></div><div><s>02</s><b>Hand off</b></div><div><s>03</s><b>Keep it running</b></div><div><s>04</s><b>See where it stands</b></div></div>''',
'agents':'''<div class="art list"><p><b>Invoice Chasing</b><span>Finance</span></p><p><b>Sales Follow-up</b><span>Sales</span></p><p><b>Support Reply Drafter</b><span>Support</span></p><p><b>Store Operations</b><span>Shopify</span></p></div>''',
'setup':'''<div class="art list"><p><b>Week 1</b><span>Pick the work</span></p><p><b>Weeks 2&ndash;3</b><span>Connect tools, build agents</span></p><p><b>Week 4</b><span>Your team runs it</span></p><p class="hl"><b>Next team</b><span>Same setup</span></p></div>''',
'team':'''<div class="art list"><p><b>Sales lead&rsquo;s agent</b><span>Asks</span></p><p><b>Data agent</b><span>Pulls the numbers</span></p><p><b>Review deck</b><span>Updated</span></p><p class="hl"><b>Manager</b><span>Sees it done</span></p></div>''',
'none':'',
}
CSS=open(os.path.join(ROOT,'assets','fonts','fonts.css')).read().replace('url("','url("file://'+os.path.join(ROOT,'assets','fonts')+'/')
TPL='''<!doctype html><html><head><meta charset="utf-8"><style>{css}
*{{box-sizing:border-box;margin:0}} body{{width:1200px;height:630px;background:#fbfbf9;font-family:"Space Grotesk";color:#0e0e12;position:relative;overflow:hidden}}
body::before{{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(15,15,20,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(15,15,20,.06) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 80% 70% at 30% 20%,#000,transparent 75%)}}
.brand{{position:absolute;left:64px;top:56px;display:flex;align-items:center;gap:14px;font-weight:700;font-size:30px}} .brand img{{width:44px;height:44px}}
.copy{{position:absolute;left:64px;top:168px;width:{cw}px}} h1{{font-size:{fs}px;line-height:1.04;letter-spacing:-.04em;font-weight:600}} h1 span{{color:#74747f;display:block}}
.foot{{position:absolute;left:64px;bottom:52px;font-size:22px;color:#74747f}} .foot b{{color:#b45309}}
.art{{position:absolute;right:56px;top:150px;width:430px}} .card{{background:#fff;border:1px solid rgba(15,15,20,.1);border-radius:24px;padding:26px;box-shadow:0 20px 50px rgba(15,15,20,.12)}}
.ask{{font-size:19px;background:#f5f5f2;border-radius:14px;padding:12px 14px}} .big{{font-size:64px;font-weight:600;letter-spacing:-.05em;margin-top:18px}} .big i{{color:#f5a524;font-style:normal}} .sub{{color:#047857;font-size:18px;font-weight:600}} svg{{width:100%;height:110px;margin-top:10px}}
.grid4{{display:grid;grid-template-columns:1fr 1fr;gap:12px}} .grid4 div{{background:#fff;border:1px solid rgba(15,15,20,.1);border-radius:18px;padding:22px;box-shadow:0 12px 30px rgba(15,15,20,.08)}} .grid4 s{{text-decoration:none;font-family:"JetBrains Mono";color:#b45309;font-size:16px;display:block;margin-bottom:10px}} .grid4 b{{font-size:24px}}
.list{{display:grid;gap:12px}} .list p{{display:flex;justify-content:space-between;align-items:center;background:#fff;border:1px solid rgba(15,15,20,.1);border-radius:16px;padding:18px 20px;font-size:21px;box-shadow:0 10px 26px rgba(15,15,20,.07)}} .list span{{color:#74747f;font-size:18px}} .list .hl{{border:2px solid #f5a524}} .list .hl span{{color:#b45309;font-weight:600}}
</style></head><body><div class="brand"><img src="file://{logo}">AgentWorks</div><div class="copy"><h1>{t1}<span>{t2}</span></h1></div>{art}<p class="foot">agentworkshq.com &middot; <b>on the AI plan you already pay for</b></p></body></html>'''
tmp=tempfile.mkdtemp(); jobs=[]
for f,t1,t2,art in CARDS:
    html=TPL.format(css=CSS,logo=os.path.join(ROOT,'assets','brand','agentworks-logo.svg'),t1=t1,t2=t2,art=ART[art],cw=(1072 if art=='none' else 600),fs=(78 if art=='none' else 60))
    hp=os.path.join(tmp,f+'.html'); open(hp,'w').write(html); jobs.append([hp,os.path.join(ROOT,'assets','og',f)])
js='''const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:630}});for(const [h,o] of %s){await p.goto('file://'+h);await p.waitForTimeout(300);await p.screenshot({path:o,type:'jpeg',quality:86});console.log('og',o.split('/').pop())}await b.close()})();'''%json.dumps(jobs)
jp=os.path.join(tmp,'og.cjs'); open(jp,'w').write(js)
subprocess.run(['node',jp],check=True)
