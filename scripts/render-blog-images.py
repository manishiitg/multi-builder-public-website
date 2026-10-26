#!/usr/bin/env python3
"""Render blog illustrations: blog-images/<slug>/<name>.html -> assets/blog/<slug>/<name>.webp.

Each source is only the inner HTML of one 1600x900 picture; blog-images/_frame.css gives every picture the
site's fonts, colours and building blocks (.card, .pill, .flow, .arrow ...), so posts look like the rest
of the site. Screenshots of the demo can go straight into assets/blog/<slug>/ as .webp instead.

Usage: python3 scripts/render-blog-images.py [slug ...]   (no slug = every post; skips up-to-date images)
"""
import os, subprocess, sys, tempfile, glob

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'blog-images')
OUT = os.path.join(ROOT, 'assets', 'blog')
CHROME = os.environ.get('CHROME', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
W, H = 1600, 900

frame_css = open(os.path.join(SRC, '_frame.css')).read()
fonts = f'file://{ROOT}/assets/fonts/'

def render(src, dst):
    page = f'''<!doctype html><html><head><meta charset="utf-8">
<style>
@font-face {{ font-family: "Space Grotesk"; src: url("{fonts}space-grotesk-latin.woff2") format("woff2"); font-weight: 300 700; }}
@font-face {{ font-family: "JetBrains Mono"; src: url("{fonts}jetbrains-mono-latin.woff2") format("woff2"); font-weight: 400 700; }}
{frame_css}
</style></head><body><div class="canvas">{open(src).read()}</div></body></html>'''
    with tempfile.TemporaryDirectory() as tmp:
        html = os.path.join(tmp, 'page.html'); png = os.path.join(tmp, 'shot.png')
        open(html, 'w').write(page)
        subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
                        f'--window-size={W},{H}', '--force-device-scale-factor=1', '--virtual-time-budget=3000',
                        f'--screenshot={png}', f'file://{html}'], check=True, capture_output=True)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        subprocess.run(['cwebp', '-quiet', '-q', '86', png, '-o', dst], check=True)
    print('rendered', os.path.relpath(dst, ROOT))

slugs = sys.argv[1:] or [d for d in os.listdir(SRC) if os.path.isdir(os.path.join(SRC, d))]
for slug in slugs:
    for src in sorted(glob.glob(os.path.join(SRC, slug, '*.html'))):
        dst = os.path.join(OUT, slug, os.path.splitext(os.path.basename(src))[0] + '.webp')
        newest = max(os.path.getmtime(src), os.path.getmtime(os.path.join(SRC, '_frame.css')))
        if os.path.exists(dst) and os.path.getmtime(dst) >= newest:
            continue
        render(src, dst)
