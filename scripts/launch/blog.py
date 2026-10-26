# /blog/: articles. Each post is one Markdown file in blog-posts/<slug>.md with a short header:
#
#   ---
#   title: Harness engineering, explained
#   description: One or two sentences for search results and the post list.
#   date: 2026-10-26
#   tag: Explainer            (Explainer, Guide or Update)
#   image: cover.webp         (in assets/blog/<slug>/; shown on the list, at the top and when shared)
#   draft: true               (optional; a draft is not published)
#   ---
#   Markdown body (## headings, lists, tables, links).
#
# Posts are image-first (owner, 2026-10-26: "not text heavy at all.. more image heavy"). Every ## section
# opens with a picture: ![alt text](name.webp "caption"). A .mp4 (a short HyperFrames loop) plays as a silent
# loop. A section holds at most two short paragraphs or one list besides its pictures; the build refuses more.
# Make diagrams with scripts/render-blog-images.py (blog-images/<slug>/*.html) or drop demo screenshots in.
#
# The build writes /blog/, one page per post, /blog/feed.xml, and the blog entries in sitemap.xml.
# Public-copy rules: no client or company specifics, no invented numbers, no figures from our own workspace.
import glob as _glob, html as _html, json as _json, markdown as _md, datetime as _dt

_POSTS_DIR=os.path.join(OUT,'blog-posts')
_TAGS={'Explainer','Guide','Update'}

def _read_post(path):
    raw=open(path).read()
    slug=os.path.splitext(os.path.basename(path))[0]
    assert re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*',slug), f'{path}: file name must be a lowercase-hyphen slug'
    m=re.match(r'---\n(.*?)\n---\n(.*)',raw,re.S)
    assert m, f'{path}: needs a --- header block'
    meta={}
    for line in m.group(1).splitlines():
        if line.strip():
            k,v=line.split(':',1); meta[k.strip()]=v.strip()
    for k in ('title','description','date','tag','image'):
        assert meta.get(k), f'{path}: header needs {k}'
    _dt.date.fromisoformat(meta['date'])
    assert meta['tag'] in _TAGS, f'{path}: tag must be one of {sorted(_TAGS)}'
    body=_figures(slug,_md.markdown(m.group(2),extensions=['tables','fenced_code','sane_lists']),path)
    _image_heavy(path,body)
    cover=_asset(slug,meta['image'],path)
    return dict(slug=slug,body=body,cover=cover,draft=meta.get('draft','').lower()=='true',**{k:meta[k] for k in ('title','description','date','tag')})

def _asset(slug,name,path):
    url=name if name.startswith('/') else f'/assets/blog/{slug}/{name}'
    assert os.path.exists(os.path.join(OUT,url.lstrip('/'))), f'{path}: missing {url}'
    return url

def _size(url):
    try:
        from PIL import Image
        with Image.open(os.path.join(OUT,url.lstrip('/'))) as im: return im.size
    except Exception: return (1600,900)

def _figures(slug,body,path):
    def fig(m):
        attrs=dict(re.findall(r'(\w+)="([^"]*)"',m.group(1)))
        url=_asset(slug,attrs['src'],path); alt=attrs.get('alt',''); cap=attrs.get('title','')
        assert alt, f'{path}: every picture needs alt text ({attrs["src"]})'
        w,h=(1600,900) if url.endswith('.mp4') else _size(url)
        media=(f'<video src="{url}" autoplay muted loop playsinline width="{w}" height="{h}" aria-label="{alt}"></video>' if url.endswith('.mp4')
               else f'<img src="{url}" alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async">')
        return f'<figure>{media}'+(f'<figcaption>{cap}</figcaption>' if cap else '')+'</figure>'
    return re.sub(r'<p>\s*<img ([^>]*)/?>\s*</p>',fig,body)

def _image_heavy(path,body):
    for sec in re.split(r'<h2[^>]*>',body)[1:]:
        head=re.sub(r'<[^>]+>','',sec.split('</h2>',1)[0])
        rest=sec.split('</h2>',1)[1]
        assert '<figure>' in rest, f'{path}: section "{head}" needs a picture'
        text=re.sub(r'<figure>.*?</figure>','',rest,flags=re.S)
        blocks=len(re.findall(r'<p>',text))+len(re.findall(r'<(?:ul|ol|table)>',text))
        assert blocks<=2, f'{path}: section "{head}" has {blocks} text blocks; keep it to two and let pictures carry it'

_posts=[p for p in (_read_post(f) for f in _glob.glob(os.path.join(_POSTS_DIR,'*.md'))) if not p['draft']]
_posts.sort(key=lambda p:(p['date'],p['slug']),reverse=True)

def _nice_date(d): return _dt.date.fromisoformat(d).strftime('%-d %B %Y')

def _post_cta():
    return f'''    <section class="cta">
      <div class="wrap">
        <h2>Tell us the process. <span class="dim">We'll show you how agents fit.</span></h2>
        <p>Book a short call and we'll scope a deployment around your company.</p>
        <div class="cta-actions">
          <a class="btn btn-amber" href="{CAL}" target="_blank" rel="noreferrer">Book a call</a>
          <a class="btn btn-ghost" href="/blog/">More articles</a>
        </div>
      </div>
    </section>
'''

for p in _posts:
    url=f'/blog/{p["slug"]}/'
    art={"@type":"BlogPosting","image":"https://agentworkshq.com"+p['cover'],"headline":p['title'],"description":p['description'],"datePublished":p['date'],"dateModified":p['date'],"url":"https://agentworkshq.com"+url,"author":{"@id":"https://agentworkshq.com/#organization"},"publisher":{"@id":"https://agentworkshq.com/#organization"},"isPartOf":{"@id":"https://agentworkshq.com/#website"}}
    crumbs={"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"AgentWorks","item":"https://agentworkshq.com/"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://agentworkshq.com/blog/"},{"@type":"ListItem","position":3,"name":p['title'],"item":"https://agentworkshq.com"+url}]}
    body=f'''  <main id="main">
    <section class="page-hero post-hero">
      <div class="wrap">
        <p class="kicker"><a href="/blog/">Blog</a> · {_html.escape(p['tag'])} · <time datetime="{p['date']}">{_nice_date(p['date'])}</time></p>
        <h1>{_html.escape(p['title'])}</h1>
        <p class="lede">{_html.escape(p['description'])}</p>
        <figure class="post-cover"><img src="{p['cover']}" alt="" width="{_size(p['cover'])[0]}" height="{_size(p['cover'])[1]}" fetchpriority="high"></figure>
      </div>
    </section>
    <section class="section-tight post-body">
      <div class="wrap">
        <article class="prose">
{p['body']}
        </article>
      </div>
    </section>
{_post_cta()}  </main>
'''
    pages[f'blog/{p["slug"]}/index.html']=head(f'{p["title"]} - AgentWorks Blog',p['description'],url,og=p['cover'],extra_ld=ld(art,crumbs))+header()+body+footer()

_items='\n'.join(f'''          <li><a href="/blog/{p['slug']}/"><img src="{p['cover']}" alt="" width="{_size(p['cover'])[0]}" height="{_size(p['cover'])[1]}"><small>{_html.escape(p['tag'])} · <time datetime="{p['date']}">{_nice_date(p['date'])}</time></small><b>{_html.escape(p['title'])}</b><span>{_html.escape(p['description'])}</span></a></li>''' for p in _posts)
blog_body=f'''  <main id="main">
    <section class="page-hero">
      <div class="wrap">
        <p class="kicker">Blog</p>
        <h1>Running a company with agents. <span class="dim">Explained in plain words.</span></h1>
        <p class="lede">Explainers and guides on how agents do real work in a company: what to hand them, how to keep people in control, and how to tell whether it is working.</p>
      </div>
    </section>
    <section class="section-tight">
      <div class="wrap">
        <ul class="post-list">
{_items}
        </ul>
      </div>
    </section>
{_post_cta()}  </main>
'''
_blog_ld={"@type":"Blog","name":"AgentWorks Blog","url":"https://agentworkshq.com/blog/","publisher":{"@id":"https://agentworkshq.com/#organization"},"blogPost":[{"@type":"BlogPosting","headline":p['title'],"url":f"https://agentworkshq.com/blog/{p['slug']}/","datePublished":p['date']} for p in _posts]}
pages['blog/index.html']=head('AgentWorks Blog - Running a Company with Agents','Explainers and guides on how AI agents do real work in a company: what to hand them, how to keep people in control, and how to tell whether it is working.','/blog/',extra_ld=ld(_blog_ld,BC('Blog','/blog/')))+header()+blog_body+footer()

def _rfc822(d): return _dt.datetime.combine(_dt.date.fromisoformat(d),_dt.time(9,0),_dt.timezone.utc).strftime('%a, %d %b %Y %H:%M:%S +0000')
_feed_items=''.join(f'''    <item>
      <title>{_html.escape(p['title'])}</title>
      <link>https://agentworkshq.com/blog/{p['slug']}/</link>
      <guid>https://agentworkshq.com/blog/{p['slug']}/</guid>
      <pubDate>{_rfc822(p['date'])}</pubDate>
      <description>{_html.escape(p['description'])}</description>
    </item>
''' for p in _posts)
pages['blog/feed.xml']=f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>AgentWorks Blog</title>
    <link>https://agentworkshq.com/blog/</link>
    <description>Explainers and guides on running a company with AI agents.</description>
{_feed_items}  </channel>
</rss>
'''

# sitemap.xml: the blog's entries (and other generated routes listed in SITEMAP_EXTRA) are rewritten on every build.
SITEMAP_EXTRA=globals().get('SITEMAP_EXTRA',[])
_sm_path=os.path.join(OUT,'sitemap.xml')
_sm=open(_sm_path).read()
_managed=['/blog/']+[f'/blog/{p["slug"]}/' for p in _posts]+[u for u,_ in SITEMAP_EXTRA]
_sm=re.sub(r'  <url>\n    <loc>https://agentworkshq\.com/blog/.*?</url>\n','',_sm,flags=re.S)
for u in [u for u,_ in SITEMAP_EXTRA]:
    _sm=re.sub(r'  <url>\n    <loc>https://agentworkshq\.com'+re.escape(u)+r'</loc>.*?</url>\n','',_sm,flags=re.S)
_lastmod={'/blog/':(_posts[0]['date'] if _posts else _dt.date.today().isoformat())}
_lastmod.update({f'/blog/{p["slug"]}/':p['date'] for p in _posts})
_lastmod.update(dict(SITEMAP_EXTRA))
_new=''.join(f'''  <url>
    <loc>https://agentworkshq.com{u}</loc>
    <lastmod>{_lastmod[u]}</lastmod>
    <changefreq>{'weekly' if u=='/blog/' else 'monthly'}</changefreq>
    <priority>{'0.7' if u=='/blog/' else '0.6'}</priority>
  </url>
''' for u in _managed)
_sm=_sm.replace('</urlset>',_new+'</urlset>')
open(_sm_path,'w').write(_sm)
