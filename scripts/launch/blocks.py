from partials import *
import html as H

def faq(items, heading=None):
    out=[]
    for i,(q,a) in enumerate(items):
        out.append(f'<details{" open" if i==0 else ""}><summary>{H.escape(q)}</summary><p>{H.escape(a)}</p></details>')
    return '\n          '.join(out)

def faq_ld(items):
    import json
    return json.dumps({"@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in items]}, ensure_ascii=False, indent=2)

