"""Snapshot the product's premade-agent catalog into scripts/launch/catalog.json.

Reads the product repo's origin/main with `git show` (never its working tree), so run
`git -C ../mcp-agent-builder-go fetch origin` first. The website build only reads the snapshot.

    python3 scripts/launch/sync_catalog.py
"""
import json
import subprocess
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2] / "mcp-agent-builder-go"
REF = "origin/main"
GH_TREE = "https://github.com/manishiitg/coding-agent-loop/tree/main/"

# Product catalog folders -> website teams (the /agents/ filter tabs).
TEAM_OF = {
    "sales": "sales", "gtm": "sales",
    "marketing": "growth", "website-growth": "growth", "growth-analytics": "growth",
    "customer-support": "customers", "customer-success": "customers",
    "finance": "finance",
    "operations": "ops",
    "product": "product",
    "shopify": "shopify",
    "engineering": "eng", "qa": "eng", "security": "eng", "security-engineering": "eng",
    "browser-qa": "eng", "reliability-operations": "eng", "performance-engineering": "eng",
    "finops": "eng", "engineering-operations-intelligence": "eng",
}
AREA_LABEL = {
    "gtm": "GTM", "qa": "QA", "finops": "FinOps", "browser-qa": "Browser QA",
    "website-growth": "Website growth", "growth-analytics": "Growth analytics",
    "customer-support": "Customer support", "customer-success": "Customer success",
    "reliability-operations": "Reliability operations", "performance-engineering": "Performance engineering",
    "engineering-operations-intelligence": "Engineering operations intelligence",
}


def git(*args):
    return subprocess.check_output(["git", "-C", str(REPO), *args], text=True)


def show(path):
    return json.loads(git("show", f"{REF}:{path}"))


def label(folder):
    return AREA_LABEL.get(folder, folder.replace("-", " ").capitalize())


def main():
    files = git("ls-tree", "-r", "--name-only", REF, "playbooks").split()
    crew, playbooks = [], []
    for f in sorted(p for p in files if p.startswith("playbooks/crew-agents/") and p.endswith("/catalog.json")):
        folder = f.split("/")[2]
        for a in show(f)["agents"]:
            crew.append({
                "id": a["id"], "name": a["name"], "role": a.get("role", ""), "purpose": a.get("purpose", ""),
                "area": label(folder), "team": TEAM_OF.get(folder, "ops"),
                "source": GH_TREE + "/".join(f.split("/")[:3]),
            })
    for f in sorted(p for p in files if p.startswith("playbooks/agentic-engineering-platform/") and p.endswith("/playbook.json")):
        folder = f.split("/")[2]
        d = show(f)
        playbooks.append({
            "id": d["id"], "name": d["title"], "purpose": d["description"], "order": d.get("order", 99),
            "area": label(folder), "team": TEAM_OF.get(folder, "ops"),
            "source": GH_TREE + "/".join(f.split("/")[:4]),
        })
    rev = git("rev-parse", "--short", REF).strip()
    out = {"source_commit": rev, "crew": crew, "playbooks": playbooks}
    (HERE / "catalog.json").write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n")
    print(f"catalog.json: {len(crew)} crew agents, {len(playbooks)} playbooks from {REF} {rev}")


if __name__ == "__main__":
    main()
