#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist

node scripts/sync-product-docs.js --if-available

cp index.html dist/
cp 404.html dist/
cp how.html dist/
cp runloop.css dist/
cp runloop_site.js dist/
cp secondary.css dist/
cp workforce.css dist/
cp workforce.js dist/
cp _headers dist/
cp _redirects dist/
cp robots.txt dist/
cp llms.txt dist/
cp sitemap.xml dist/
cp site.webmanifest dist/
cp favicon.ico dist/
cp favicon-16.png dist/
cp favicon-32.png dist/
cp apple-touch-icon.png dist/
cp icon-256.png dist/

mkdir -p dist/assets/{brand,fonts,og,product,vendor}
cp assets/brand/agentworks-logo.svg dist/assets/brand/
cp -R assets/fonts/. dist/assets/fonts/
cp -R assets/vendor/. dist/assets/vendor/

# Keep the public payload limited to assets referenced by production pages.
cp assets/og/agentworks-*.jpg dist/assets/og/

product_assets=(
  agentworks-bot-connectors-retina.webp
  agentworks-coding-cli-retina.webp
  agentworks-pulse-human-question-retina.webp
  agentworks-shared-learnings-retina.webp
  agentworks-workflow-multi-llm-retina.webp
  automation-workspace.png
  bots-connector.png
  browser-integrations.png
  chief-of-staff.png
  global-secrets.png
  global-skills.png
  generated-report-dashboard.jpg
  live-terminal-tmux.png
  model-catalog.png
  multi-cli-management-demo-poster.jpg
  multi-cli-management-demo.mp4
  operating-loop-demo-poster.jpg
  operating-loop-demo.mp4
  org-dashboard-agentworks-retina.webp
  org-dashboard-scale.png
  org-goals.png
  org-pulse-agentworks.jpg
  org-pulse.png
  reporting-dashboard.png
  trading-plan-laptop.png
  workflow-automation-demo-poster.jpg
  workflow-automation-demo.mp4
  workflow-cost-analysis.jpg
  workflow-pulse.png
)
for asset in "${product_assets[@]}"; do
  cp "assets/product/${asset}" dist/assets/product/
done
cp -R docs dist/docs
cp -R docs-content dist/docs-content
cp -R use-cases dist/use-cases
cp -R updates dist/updates

find dist -name ".DS_Store" -delete
