---
title: How to run coding agents with human approval and an audit trail
description: Make approval specific, keep the change and its checks together, and record what actually shipped. A visual guide for teams working with coding agents.
date: 2026-10-26
tag: Guide
image: cover.webp
draft: true
---

## Agree on the work and the decision

![A coding brief separates the requested change, what the agent may do now, and the action that needs a person's approval](brief.webp "Illustrative brief: fix a CSV export, prepare the change, and wait before releasing it.")

To run a coding agent with human approval, define what it can do now and the specific action that must wait. For example: investigate a broken export, prepare a fix and run the relevant checks; ask before releasing it. Name the person who makes that decision.

A written instruction explains the process. Where an approval must be enforced, use the relevant tool or repository permission as well. A chat message alone is not an access control.

## Approve the change you can inspect

![An approval packet contains the change, the checks and known limits, followed by a decision tied to that version](approval.webp "A useful approval refers to a concrete change and a named next action.")

Ask the agent for a short review packet: what changed, the change itself, the checks it ran and anything still unverified. Let the reviewer inspect the work before approving the next action. A statement that tests passed is useful only alongside which tests ran and their results.

Record the decision against the exact version reviewed, such as its commit. If that version changes, the earlier decision no longer describes the new work. Keep approval to merge separate from approval to release when those are different decisions in your process.

## Keep a trail from request to outcome

![A connected sequence of records: request, proposed change, check results, human decision, and release evidence](trail.webp "A review trail connects the request to the result without guessing the missing steps.")

Keep the original request, the proposed change, check results, the reviewer's decision and evidence of what shipped linked together. Record failures and unfinished checks too. A successful build supports a claim that code compiled; it does not prove the live feature worked.

Use this trail to answer practical questions: why did this change happen, who approved which action, and what was verified afterward? Keep passwords, tokens and private account credentials out of the record.

## Know what your workspace records

![Two columns distinguish AgentWorks Studio workspace review from a complete native coding-agent command log](review-scope.webp "Workspace review and command-level logging answer different questions.")

[AgentWorks Studio](/studio/) lets admins and assigned reviewers inspect workspace chats, files and costs without changing them, and records those review views. These records help a team review work and usage centrally. They are not a promise of a complete event log from the coding agent's own command-line tool.

Before relying on any workspace as your audit trail, check which decisions, commands and release events it actually records. Keep missing evidence with the repository or deployment system, and link it to the change. Agree on that process before the first release.
