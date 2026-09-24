#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist

node scripts/sync-product-docs.js --if-available

cp index.html dist/
cp 404.html dist/
cp runloop.css dist/
cp runloop_site.js dist/
cp secondary.css dist/
cp launch.css dist/
cp launch.js dist/
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

mkdir -p dist/.well-known
cp .well-known/mcp-client.json dist/.well-known/

mkdir -p dist/assets/{brand,fonts,hero,og,product,storyboard,vendor}
cp assets/brand/agentworks-logo.svg dist/assets/brand/
cp -R assets/fonts/. dist/assets/fonts/
cp -R assets/vendor/. dist/assets/vendor/
cp assets/hero/goal-loop-1600x900.mp4 assets/hero/goal-loop-1600x900.webm assets/hero/goal-loop-mobile-900x1200.mp4 assets/hero/goal-loop-poster.jpg dist/assets/hero/

# Keep the public payload limited to assets referenced by production pages.
cp assets/og/agentworks-*.jpg dist/assets/og/

product_assets=(
  agentworks-product-auto-improve-panel.png
  agentworks-product-browser-access.png
  agentworks-product-pulse-panel.png
  agentworks-product-schedules.png
  agentworks-product-workspace.png
  agentworks-coding-cli-480.webp
  agentworks-coding-cli-760.webp
  agentworks-coding-cli-1440.webp
  agentworks-bot-connectors-retina.webp
  agentworks-coding-cli-retina.webp
  agentworks-pulse-human-question-480.webp
  agentworks-pulse-human-question-760.webp
  agentworks-pulse-human-question-1440.webp
  agentworks-pulse-human-question-retina.webp
  agentworks-shared-learnings-480.webp
  agentworks-shared-learnings-760.webp
  agentworks-shared-learnings-1440.webp
  agentworks-shared-learnings-retina.webp
  agentworks-workflow-multi-llm-480.webp
  agentworks-workflow-multi-llm-760.webp
  agentworks-workflow-multi-llm-1440.webp
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
  org-dashboard-agentworks-480.webp
  org-dashboard-agentworks-760.webp
  org-dashboard-agentworks-1440.webp
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

# Launch-page screenshots (optional until captured).
if [ -d assets/product/launch ]; then
  cp -R assets/product/launch dist/assets/product/
fi

storyboard_assets=(
  improve-auto-agent.webp
  improve-goal-advisor.webp
  learn-decision.webp
  learn-question.webp
  measure-cost.webp
  measure-pulse.webp
  run-health.webp
  run-workflows.webp
)
for asset in "${storyboard_assets[@]}"; do
  cp "assets/storyboard/${asset}" dist/assets/storyboard/
done
cp -R docs dist/docs
cp -R docs-content dist/docs-content
cp -R product dist/product
cp -R pricing dist/pricing
cp -R enterprise dist/enterprise
cp -R agents dist/agents

node scripts/generate-agent-content.js

find dist -name ".DS_Store" -delete
