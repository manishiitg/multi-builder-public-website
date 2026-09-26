# Documentation

Start with the operator journey, then use the subsystem references when you need implementation detail.

## Start Here

- [Getting Started](getting-started/README.md): install AgentWorks, complete first-launch setup, and create a first automation.
- [Build Your First Workflow](getting-started/first-workflow.md): define an outcome, choose a worker, run it, review evidence, and improve the next run.

## Product Areas

- [Workflow](workflow/README.md): workflow authoring, execution, scheduling, monitoring, Auto-improve, and Auto Improve.
- [Organization and Agents](multiagent/README.md): delegation, Org Auto-improve, shared memory, and agent-to-agent coordination.
- [Core](core/README.md): providers, MCP, browser sessions, connectors, secrets, security, and shared runtime services.

`docs/bugs/` is an incident archive — see its index, which groups the 2026-08-01/02 investigations into how the agent-facing tool and permission contract actually behaves. `docs/refactor/` records implementation migrations — see its index, where status distinguishes a shipped design from one still being built. Neither folder is the recommended entry point for operators, but the bugs index is the fastest way to understand why an agent is told one thing and the runtime does another.

## Bot Connectors & Messaging

- Channel connectors overview: Slack and WhatsApp at a glance.
- Slack connections: per-workflow Slack apps, ownership, and the multi-listener runtime.
- Bot connectors architecture: shared lifecycle, routing, and code-review findings.
- [Bot connector system](core/bot_connector_system.md): sessions, channels, and event flow.
- [QA: Slack bot connectors](https://github.com/manishiitg/coding-agent-loop/issues/201): per-workflow apps, mention guard sign-off.
- [QA: WhatsApp bot connector](https://github.com/manishiitg/coding-agent-loop/issues/202): route switching, account management sign-off.

Manual checklists live in issues, never in `docs/` — browse all QA rounds [here](https://github.com/manishiitg/coding-agent-loop/issues?q=is%3Aissue+QA).

This folder also mirrors to the [GitHub wiki](https://github.com/manishiitg/coding-agent-loop/wiki) on every push to `main` — edit here, never there.

## Placement Rules

- Put a doc in `workflow/` when it is primarily about workflow authoring, workflow execution, step configuration, or workflow-only UX.
- Put a doc in `multiagent/` when it is primarily about manager/worker delegation, multi-agent chat, or agent-to-agent coordination.
- Put a doc in `core/` when it applies across chat, workflow, and multi-agent modes or describes a foundational subsystem or integration.

## All Pages

Every page in this folder, so the index (and the wiki
mirror) never silently omits one. Curated entry points are above;
this is the complete map.

### Top level

- Channel connectors
- Google CLI authentication and agent terminals
- Header Consolidation
- Live browser in workflows
- Outcome goals and measurable progress
- Auto-improve review visibility
- Workflow improvement through Auto-improve
- Reusable report data and widgets
- Secrets
- Setup Consolidation
- Workspace UI Design Guidelines

### Audits

- PLAT-324 architecture review — 2026-09-17
- Chat reliability backend implementation — 2026-09-17
- Chat reliability implementation — 2026-09-17
- ChatTab / ChatInput / ChatArea isolation review
- Message-sequence runtime cleanup collision — 2026-09-07
- Platform backlog reconciliation — 2026-09-05
- Fallback persistence and orphan-decision cleanup
- Full open-report reconciliation — 2026-09-05
- Schedule runtime projection fix
- Individual-step retry recovery
- Cross-workflow Auto-improve platform triage — 2026-08-29
- SQLite platform backlog comparison — 2026-09-05
- Run-mode capability boundary review — 2026-09-06
- Session identity and tool lifecycle review — 2026-09-07
- Workflow skill consistency review — 2026-09-06

### Core ([index](core/README.md))

- Azure AI Foundry & Responses API Integration
- [Bot Connector System](core/bot_connector_system.md)
- Bot Connectors: Architecture, Configuration, and Review
- [Browser Automation](core/browser.md)
- Coding CLI turn signals
- Native agent tools
- Coding CLI updates
- Coding Agent Continuation Architecture
- Coding-Agent Timeout Contract
- Coding CLI onboarding: contract review and implementation map
- AgentWorks — Plan
- Environment-Based API Key Defaults
- Event Cleanup - Progress
- Event System Architecture
- Folder Guard System
- [LLM Configuration & Resilience](core/llm_configuration_and_resilience.md)
- [🌉 MCP Bridge Layer & Exposed APIs](core/mcp_bridge_layer.md)
- Multi-User Authentication & Workspace Isolation
- Native Workspace Mode
- OAuth Integration Guide
- Designing a product.yaml
- Remote Workspace Gateway + Local Runner Plan
- Session And Tool Binding
- [Skills System](core/skills.md)
- Slack Connections (Per-Workflow Slack Apps)
- Streaming LLM Output
- Terminal lifecycle
- WhatsApp Connector

### Design

- Agent tool surface: one source of truth
- Direct API Transport vs. Routing Through Pi/MCP
- Chief of Staff as a standalone product
- Personal Finance Dashboard: a consolidated view across finance workflows
- Multiple provider accounts for workflows and Crew
- Native Coding-Agent Environment Policy
- Product API Transport for Coding Agents
- Product Tool Registration and Agent Visibility
- Auto-improve scheduled review lifecycle — historical design spec
- Reusable Platform for Dedicated Agent Products
- Skill system — current state and narrow product-skill design
- SparkQuill desktop on the platform — plan and research record
- User accounts, product access, and workflow sharing
- Video Studio Inside AgentWorks
- Work Product Design
- Schedule ownership and Builder warnings
- A Workflow as a Product: Custom UI Frontend, AgentWorks as Backend

### Getting Started ([index](getting-started/README.md))

- AgentWorks CLI and MCP
- [Build Your First Workflow](getting-started/first-workflow.md)
- Testing workflow changes alongside a running AgentWorks

### Handover

- Video Studio handover

### Integrations

- Default productivity MCP connections

### Multiagent ([index](multiagent/README.md))

- [Agent Memory System](multiagent/agent_memory_system.md)
- Multi-Tab Chat Architecture
- Slash Commands System
- Sub-Agent Delegation System

### Refactor (index)

- Canonical agent-definition construction
- Refactor spec: unify CLI live-input on tmux-session liveness (drop steer-vs-queue)
- Durable submit acknowledgement: file-ack P0 + pane fast-confirm P1
- Lazy Per-Terminal Event Loading
- Live-Attach Terminal: App vs PoC Demo — Debug Handoff
- mcpagent public API simplification
- Native streaming speech-to-text
- Design: Live-attach terminal transport (replace snapshot/replay mirror)

### Workflow ([index](workflow/README.md))

- Workflow API triggers
- [Auto-Improvement Framework](workflow/auto_improvement_framework.md)
- Backup, History & Versions Consolidation
- [Browser Automation in Workflows](workflow/browser_automation.md)
- [Cost And Log Measurement](workflow/cost_and_log_measurement.md)
- Crew workflow step
- Deterministic Routing (route-by-file)
- Eval Removal Plan: Migrate to Producer-Owned Measurement
- [Human Feedback System](workflow/human_feedback_system.md)
- Iteration Run Folder Architecture
- Learn Code and Code Execution Modes
- [Learning Architecture](workflow/learning_architecture.md)
- LinkedIn Auto-improve Review Audit — 2026-08-02
- Message Sequence Steps
- Orchestrator Step Type
- [Org Dashboard — design](workflow/workflow_monitoring.md)
- Persistent Stores Design
- Deterministic Pre-Validation Guide
- Publish — share a workflow's HTML to a public URL
- Auto-improve v2.1: Reliability-First Experiment Proposal
- Auto-improve v2: Proof-Carrying Workflows and Exception-Driven Autonomy
- [Workflow self-improvement & reporting — system overview](workflow/self_improvement_and_reporting.md)
- Shared knowledge bases through workflow references
- [step_config.json Format Specification](workflow/step_config_format_specification.md)
- [Tiered LLM Allocation](workflow/tiered_llm_allocation.md)
- [Tool Filtering System](workflow/tool_filtering_system.md)
- Workflow Builder Commands And Tools
- Interactive Workflow Builder
- [Workflow Manifest Architecture](workflow/workflow_manifest_architecture.md)
- [Workflow Monitoring](workflow/workflow_monitoring.md)
- [Workflow Scheduling](workflow/workflow_scheduling.md)
- Workflow Shell Working Directory

### Bugs (index)

Incident archive — 350+ investigations, browsed via its index, not listed here.

## Validate Links

Run the documentation link check before merging documentation changes:

```bash
node scripts/check-doc-links.js
```

## Isolated workflow testing

Use the standard isolated workflow testing process to reproduce platform issues with a disposable copy of `Workflow/testing` while the local AgentWorks app keeps running.
