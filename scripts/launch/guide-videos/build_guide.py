"""Generate a HyperFrames walkthrough composition from a small spec.

Usage: python3 build_guide.py <guide-folder>
Reads <guide-folder>/spec.json and assets/vo/{script,durs}.json, writes <guide-folder>/index.html.

Coordinates in the spec are the app's CSS pixels at 1440x900 (what Playwright's boundingBox returns);
screenshots are captured at 2x (2880x1800). Scene timing follows the voice clips: each scene starts
LEAD seconds before its clip and ends when the next one starts.
"""
import html
import json
import re
import sys
from pathlib import Path

LEAD, GAP, END_CARD = 0.4, 0.45, 3.2
TITLE_CARD = 2.6

CSS = """
      @font-face { font-family: "Space Grotesk"; src: url("assets/fonts/space-grotesk-latin.woff2") format("woff2"); font-weight: 300 700; font-style: normal; }
      @font-face { font-family: "JetBrains Mono"; src: url("assets/fonts/jetbrains-mono-latin.woff2") format("woff2"); font-weight: 400 700; font-style: normal; }
      :root { --bg: #fbfbf9; --card: #fff; --border: rgba(15,15,20,.09); --text: #0e0e12; --muted: #6c6c77; --amber: #f5a524; --amber-text: #b45309; --amber-soft: rgba(245,165,36,.14); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { margin: 0; overflow: hidden; background: var(--bg); }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; background: var(--bg); font-family: "Space Grotesk", sans-serif; color: var(--text); }
      #bg-glow { position: absolute; inset: 0; background: radial-gradient(1100px 600px at 50% 110%, rgba(245,165,36,.12), transparent 70%); }
      .scene { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 100%; }
      .scene-app { display: flex; flex-direction: column; align-items: center; justify-content: flex-start; width: 100%; height: 100%; padding-top: 30px; }
      .kicker { font-family: "JetBrains Mono", monospace; font-size: 22px; letter-spacing: .08em; text-transform: uppercase; color: var(--amber-text); }
      .title { font-size: 84px; font-weight: 600; letter-spacing: -.03em; margin-top: 18px; text-align: center; }
      .sub { font-size: 32px; color: var(--muted); margin-top: 16px; text-align: center; }
      .win { position: relative; width: 1376px; height: 896px; border-radius: 22px; overflow: hidden; background: #0d0f14; box-shadow: 0 40px 90px -30px rgba(15,15,20,.45), 0 0 0 1px rgba(15,15,20,.1); }
      .win .bar { position: absolute; top: 0; left: 0; right: 0; height: 36px; background: #1a1d25; display: flex; align-items: center; gap: 9px; padding-left: 16px; z-index: 2; }
      .win .bar i { width: 12px; height: 12px; border-radius: 50%; background: #3a3e49; display: block; }
      .win .view { position: absolute; top: 36px; left: 0; right: 0; bottom: 0; overflow: hidden; }
      .win .cam { position: absolute; top: 0; left: 0; width: 1376px; height: 860px; transform-origin: 0 0; }
      .win .cam img { position: absolute; top: 0; left: 0; width: 1376px; height: 860px; display: block; }
      .ring { position: absolute; border: 4px solid var(--amber); border-radius: 12px; opacity: 0; }
      .cursor { position: absolute; left: 0; top: 0; width: 30px; height: 30px; opacity: 0; z-index: 3; }
      .cursor svg { width: 30px; height: 30px; display: block; filter: drop-shadow(0 2px 3px rgba(0,0,0,.45)); }
      .click { position: absolute; width: 44px; height: 44px; margin: -22px 0 0 -22px; border-radius: 50%; border: 3px solid var(--amber); opacity: 0; z-index: 3; }
      .demo-tag { position: absolute; right: 290px; top: 46px; font-family: "JetBrains Mono", monospace; font-size: 16px; letter-spacing: .06em; color: var(--muted); background: var(--card); border: 1px solid var(--border); border-radius: 999px; padding: 6px 14px; z-index: 3; }
      #end-logo { width: 110px; height: 110px; }
      #end-next { margin-top: 34px; font-family: "JetBrains Mono", monospace; font-size: 24px; color: var(--amber-text); padding: 12px 26px; border-radius: 999px; background: var(--amber-soft); }
      #captions { position: absolute; inset: 0; z-index: 10; pointer-events: none; }
      .cap { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 46px; pointer-events: none; }
      .cap span { display: block; max-width: 1400px; background: rgba(14,14,18,.82); color: #fff; font-size: 34px; font-weight: 500; line-height: 1.3; padding: 12px 26px; border-radius: 14px; text-align: center; }
"""

CURSOR_SVG = '<svg viewBox="0 0 24 24"><path d="M4 2l14 11-6.2 1 3.6 7.2-2.8 1.3-3.5-7.3L4 20z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>'


def pct(v, total):
    return f"{v / total * 100:.3f}%"


def sentences(text):
    """Split narration into caption lines: one sentence each, very short ones merged forward."""
    parts = [p.strip() for p in re.split(r"(?<=[.?!])\s+", text) if p.strip()]
    out = []
    for p in parts:
        if out and len(out[-1]) < 24:
            out[-1] = out[-1] + " " + p
        else:
            out.append(p)
    return out


def build(folder: Path):
    spec = json.loads((folder / "spec.json").read_text())
    script = {s["id"]: s["text"] for s in json.loads((folder / "assets/vo/script.json").read_text())}
    durs = json.loads((folder / "assets/vo/durs.json").read_text())
    scenes, audio, caps, tl = [], [], [], []
    E = '"power3.out"'

    # Title card, then one app scene per voice clip, then an end card.
    t = TITLE_CARD
    scenes.append(
        f'<section id="title" class="clip scene" data-start="0" data-duration="{TITLE_CARD}" data-track-index="1">'
        f'<div class="kicker">AgentWorks guide</div><div class="title" id="t-title">{html.escape(spec["title"])}</div>'
        f'<div class="sub" id="t-sub">{html.escape(spec["subtitle"])}</div></section>'
    )
    tl.append(f'tl.fromTo("#title > *", {{ opacity: 0, y: 22 }}, {{ opacity: 1, y: 0, duration: 0.7, ease: {E}, stagger: 0.15 }}, 0.2);')
    tl.append(f'tl.to("#title > *", {{ opacity: 0, duration: 0.35 }}, {TITLE_CARD - 0.4:.2f});')

    for i, sc in enumerate(spec["scenes"]):
        vid = sc["vo"]
        d = durs[vid]
        vo_start = t + LEAD
        end = vo_start + d + GAP
        sid = f"s{i + 1}"
        audio.append(f'<audio id="vo-{sid}" src="assets/vo/{vid}.mp3" data-start="{vo_start:.2f}" data-duration="{d}" data-track-index="20"></audio>')
        layers = []
        for j, r in enumerate(sc.get("rings", [])):
            x, y, w, h = r["box"]
            p = r.get("pad", 8)
            layers.append(
                f'<div class="ring" id="{sid}-r{j}" style="left:{pct(x - p, 1440)};top:{pct(y - p, 900)};width:{pct(w + 2 * p, 1440)};height:{pct(h + 2 * p, 900)}"></div>'
            )
            at = vo_start + r["at"] * d
            tl.append(f'tl.fromTo("#{sid}-r{j}", {{ opacity: 0, scale: 1.04 }}, {{ opacity: 1, scale: 1, duration: 0.45, ease: {E} }}, {at:.2f});')
            if r.get("until") is not None:
                tl.append(f'tl.to("#{sid}-r{j}", {{ opacity: 0, duration: 0.3 }}, {vo_start + r["until"] * d:.2f});')
        clicks = sc.get("clicks", [])
        if clicks:
            layers.append(f'<div class="cursor" id="{sid}-cur">{CURSOR_SVG}</div>')
            sx, sy = clicks[0].get("from", [720, 520])
            K = 1376 / 1440  # app CSS px -> window px
            tl.append(f'tl.set("#{sid}-cur", {{ x: {sx * K:.1f}, y: {sy * K:.1f} }}, {t:.2f});')
            tl.append(f'tl.to("#{sid}-cur", {{ opacity: 1, duration: 0.3 }}, {t + 0.6:.2f});')
            for k, c in enumerate(clicks):
                cx, cy = c["at_xy"]
                at = vo_start + c["at"] * d
                tl.append(f'tl.to("#{sid}-cur", {{ x: {cx * K:.1f}, y: {cy * K:.1f}, duration: 0.9, ease: "power2.inOut" }}, {at - 0.9:.2f});')
                layers.append(f'<div class="click" id="{sid}-c{k}" style="left:{pct(cx, 1440)};top:{pct(cy, 900)}"></div>')
                tl.append(f'tl.fromTo("#{sid}-c{k}", {{ opacity: 0.9, scale: 0.4 }}, {{ opacity: 0, scale: 1.4, duration: 0.6, ease: "power2.out" }}, {at:.2f});')
        zoom = sc.get("zoom")
        if zoom:
            s = zoom["scale"]
            # keep the zoomed view inside the screenshot (1440x900 app px)
            zx = min(max(zoom["x"], 0), 1440 - 1440 / s)
            zy = min(max(zoom["y"], 0), 900 - 900 / s)
            k = 1376 / 1440
            tx, ty = -zx * k * s, -zy * k * s
            tl.append(f'tl.fromTo("#{sid}-cam", {{ scale: 1, x: 0, y: 0 }}, {{ scale: {s}, x: {tx:.1f}, y: {ty:.1f}, duration: 1.6, ease: "power2.inOut" }}, {vo_start + zoom.get("at", 0.1) * d:.2f});')
        scenes.append(
            f'<section id="{sid}" class="clip scene-app" data-start="{t:.2f}" data-duration="{end - t:.2f}" data-track-index="1">'
            f'<div class="win" id="{sid}-win"><div class="bar"><i></i><i></i><i></i></div><div class="view" data-layout-allow-overflow>'
            f'<div class="cam" id="{sid}-cam"><img src="assets/screens/{sc["image"]}" alt="" />{"".join(layers)}</div></div></div>'
            + ('<div class="demo-tag">Demo data</div>' if sc.get("demo_tag") else "")
            + "</section>"
        )
        if i == 0:
            tl.append(f'tl.fromTo("#{sid}-win", {{ opacity: 0, y: 40 }}, {{ opacity: 1, y: 0, duration: 0.7, ease: {E} }}, {t + 0.05:.2f});')
        tl.append(f'tl.to("#{sid}-win", {{ opacity: 0, duration: 0.35 }}, {end - 0.4:.2f});')
        if i > 0:
            tl.append(f'tl.fromTo("#{sid}-win", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.4 }}, {t + 0.02:.2f});')
        # captions: sentences spread over the clip by length
        lines = sentences(script[vid])
        usable, total = d - 0.6, sum(len(x) for x in lines)
        ct = vo_start + 0.25
        for line in lines:
            cd = usable * len(line) / total
            caps.append(f'<div class="clip cap" data-start="{ct:.2f}" data-duration="{cd:.2f}" data-track-index="30"><span>{html.escape(line)}</span></div>')
            ct += cd
        t = end

    scenes.append(
        f'<section id="end" class="clip scene" data-start="{t:.2f}" data-duration="{END_CARD}" data-track-index="1">'
        '<img id="end-logo" src="assets/brand/agentworks-logo.svg" alt="AgentWorks" />'
        f'<div class="title" style="font-size:60px">{html.escape(spec["end_title"])}</div>'
        f'<div id="end-next">{html.escape(spec["end_next"])}</div></section>'
    )
    tl.append(f'tl.fromTo("#end > *", {{ opacity: 0, y: 18 }}, {{ opacity: 1, y: 0, duration: 0.6, ease: {E}, stagger: 0.18 }}, {t + 0.15:.2f});')
    total_len = t + END_CARD

    doc = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <title>{html.escape(spec["title"])}: AgentWorks guide</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>{CSS}    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-width="1920" data-height="1080" data-duration="{total_len:.2f}">
      <div id="bg-glow"></div>
      {chr(10).join('      ' + a for a in audio).strip()}
      {chr(10).join('      ' + s for s in scenes).strip()}
      <div id="captions">
{chr(10).join('        ' + c for c in caps)}
      </div>
    </div>
    <script>
      const tl = gsap.timeline({{ paused: true }});
{chr(10).join('      ' + line for line in tl)}
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
"""
    (folder / "index.html").write_text(doc)
    print(f"wrote {folder / 'index.html'} ({total_len:.1f}s)")


if __name__ == "__main__":
    build(Path(sys.argv[1]))
