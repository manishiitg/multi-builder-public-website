#!/usr/bin/env python3
"""Sync the public directory UI; AgentWorks HQ is its only hosting destination."""
import argparse
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
SOURCE = "https://raw.githubusercontent.com/manishiitg/free-agent-tools/main/docs/"
FILES = ["index.html", "assets/app.js", "assets/style.css", "assets/icon.svg", "catalog.json", "catalog.csv", "llms.txt"]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, help="Local generated directory for development")
    parser.add_argument("--if-available", action="store_true")
    args = parser.parse_args()
    output = ROOT / "free-tools"
    try:
        # Fetch everything before writing; an interrupted sync keeps the committed copy.
        contents = {}
        for name in FILES:
            if args.source:
                contents[name] = (args.source / name).read_bytes()
            else:
                with urlopen(Request(SOURCE + name, headers={"User-Agent": "AgentWorksCatalogSync/1.0"}), timeout=15) as response:
                    contents[name] = response.read()
        assert b'https://agentworkshq.com/free-tools/' in contents["index.html"], "Unexpected catalog destination"
        for name, content in contents.items():
            path = output / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(content)
        print("Synced AgentWorks HQ free-tool directory from its public source")
    except Exception:
        if args.if_available and all((output / name).exists() for name in FILES):
            print("Catalog source unavailable; using committed directory UI. Live data endpoints remain independent.")
        else:
            raise


if __name__ == "__main__":
    main()
