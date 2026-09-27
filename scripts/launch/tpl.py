import html, json, sys
from pathlib import Path

# Premade agents come from the product's open-source catalog, snapshotted into catalog.json
# by sync_catalog.py: Crew agents (always-on teammates) and Goal playbooks (goal-driven automations).
CATALOG = json.loads((Path(__file__).resolve().parent / "catalog.json").read_text())
CREW = [dict(x, kind="crew") for x in CATALOG["crew"]]
GOALS = [dict(x, kind="goal") for x in sorted(CATALOG["playbooks"], key=lambda p: (p["area"], p["order"]))]
ALL = CREW + GOALS
N_CREW, N_GOALS = len(CREW), len(GOALS)
GH_PLAYBOOKS = "https://github.com/manishiitg/coding-agent-loop/tree/main/playbooks"

# Filter tabs on /agents/, in page order.
TEAMS = [
    ("sales", "Sales & GTM"), ("growth", "Marketing & growth"), ("customers", "Customers"),
    ("finance", "Finance"), ("ops", "Operations"), ("product", "Product"),
    ("shopify", "Shopify"), ("eng", "Engineering"),
]
ICON = {
    "sales": '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    "growth": '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    "customers": '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/>',
    "finance": '<path d="M4 4h12l4 4v12H4z"/><path d="M9 12h6M9 16h4M9 8h3"/>',
    "ops": '<path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h8M8 17h5"/>',
    "product": '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    "shopify": '<path d="m21 8-9-5-9 5 9 5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
    "eng": '<path d="m8 9-4 3 4 3M16 9l4 3-4 3"/>',
}
# Homepage picks: one per business team, all real catalog entries.
HOME_FEATURED = ["Invoice Chasing", "Sales Follow-up Coordinator", "Support Reply Drafter",
                 "Website Growth Starter", "Store Operations Coordinator"]


def by_name(name):
    for item in ALL:
        if item["name"] == name:
            return item
    raise KeyError(f"premade agent not in catalog.json: {name}")


def card(t, heading="h3"):
    e = html.escape
    kind = '<span class="tag tag-crew">Crew</span>' if t["kind"] == "crew" else '<span class="tag tag-goal">Goal</span>'
    role = f'<p class="tpl-goal"><span>Role</span>{e(t["role"])}</p>' if t["kind"] == "crew" and t.get("role") else ""
    return f'''<article class="tpl" data-cat="{t["team"]}">
            <div class="tpl-top"><span class="tpl-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{ICON[t["team"]]}</svg></span><span class="tpl-cat">{e(t["area"])}</span></div>
            <{heading}>{e(t["name"])}</{heading}>
            <p>{e(t["purpose"])}</p>
            {role}
            <div class="tpl-foot">{kind}<a class="tpl-src" href="{e(t["source"])}" target="_blank" rel="noreferrer">Source</a></div>
          </article>'''


def cards(items):
    return "\n          ".join(card(t) for t in items)


if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "home":
        print(cards(by_name(n) for n in HOME_FEATURED))
    elif mode.startswith("team:"):  # team:<team>:<crew|goal>
        _, team, kind = mode.split(":")
        print(cards(t for t in ALL if t["team"] == team and t["kind"] == kind))
