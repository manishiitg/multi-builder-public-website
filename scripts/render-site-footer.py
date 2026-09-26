#!/usr/bin/env python3
"""Render the shared site footer for pages outside the launch generator.

Reads footer() from scripts/launch/partials.py (no edits there) and writes
scripts/site-footer.fragment.html, which generate-agent-content.js injects
into every generated docs page. Also refreshes docs/index.html (header from
the launch fragment, footer from footer()) between its markers.

Re-run in prepare-deploy.sh so the header/footer (and the launch.js cache
key V) never drift from the marketing pages, and commit the result.
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(HERE, 'launch'))
from partials import V, footer  # noqa: E402

frag = footer()
out = os.path.join(HERE, 'site-footer.fragment.html')
with open(out, 'w') as f:
    f.write(frag)
print('wrote scripts/site-footer.fragment.html')

header_frag = open(os.path.join(HERE, 'launch', 'site-header.fragment.html')).read()
page_path = os.path.join(ROOT, 'docs', 'index.html')
page = open(page_path).read()
if '%%SITE_HEADER%%' in page:
    page = page.replace(
        '%%SITE_HEADER%%',
        '<!-- site-header:start -->\n' + header_frag + '<!-- site-header:end -->'
    )
else:
    page = re.sub(
        r'<!-- site-header:start -->.*?<!-- site-header:end -->',
        '<!-- site-header:start -->\n' + header_frag + '<!-- site-header:end -->',
        page,
        flags=re.S,
    )
page = re.sub(r'/launch\.css\?v=[^"\']+', f'/launch.css?v={V}', page)
marker = '<!-- site-footer:start -->'
head, sep, _ = page.partition(marker)
if not sep:
    raise SystemExit('docs/index.html lost its site-footer marker')
page = head + marker + '\n' + frag
open(page_path, 'w').write(page)
print('wrote docs/index.html header+footer')
