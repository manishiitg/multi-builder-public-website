#!/usr/bin/env python3
"""Sync catalog data and behavior; HQ owns the page layout and styling."""
import argparse
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
SOURCE = "https://raw.githubusercontent.com/manishiitg/free-agent-tools/main/docs/"
FILES = ["assets/app.js", "catalog.json", "catalog.csv", "llms.txt"]


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
        for name, content in contents.items():
            path = output / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(content)
        print("Synced free-tool data and search behavior from the public source")
    except Exception:
        if args.if_available and all((output / name).exists() for name in FILES):
            print("Catalog source unavailable; using committed data and behavior. Live data endpoints remain independent.")
        else:
            raise


if __name__ == "__main__":
    main()
