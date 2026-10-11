#!/usr/bin/env python3
"""Render the HQ directory with the same chrome as the marketing pages."""
import sys
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts" / "launch"))
from partials import head, header, footer


def render():
    structured_data = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Free Agent Tools",
        "url": "https://agentworkshq.com/free-tools/",
        "isPartOf": {"@id": "https://agentworkshq.com/#website"},
    }
    page = head(
        "Free Agent Tools - APIs, Credits and MCPs | AgentWorks",
        "A maintained directory of free API tiers and credits for AI agents, with official sources, eligibility and review dates.",
        "/free-tools/",
        extra_ld='  <script type="application/ld+json">' + json.dumps(structured_data) + '</script>\n'
        '  <link rel="stylesheet" href="/free-tools/assets/style.css?v=hq1">\n'
        '  <script src="/free-tools/assets/app.js" defer></script>\n',
    )
    page += header()
    page += (ROOT / "scripts/launch/free-tools.body.html").read_text()
    page += footer()
    (ROOT / "free-tools/index.html").write_text(page)
    print("Rendered free-tools/index.html with shared AgentWorks layout")


if __name__ == "__main__":
    render()
