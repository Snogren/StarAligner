# StarAligner

A framework for building AI agents that work across any coding tool.

## What It Is

An agent is a set of files organized into a pyramid. Each level of the pyramid changes at a different rate. Stable things stay at the top. Volatile things stay at the bottom.

```
    Principles    — what the agent IS
    Skills        — what the agent CAN DO
    Maps          — what the agent KNOWS ABOUT
    Missions      — what the agent SHOULD DO
    Terrain       — what the agent DISCOVERS
```

**Principles** define the agent's identity. Values, methodology, checkpoints, quality gates, success criteria. No tool names, no project details. This file is the agent. Everything else can change without changing what the agent fundamentally is.

**Skills** are swappable capabilities. One file per tool or technique. Switch tools, swap the file. The agent's identity doesn't change.

**Maps** are dehydrated knowledge of the domain. They describe what exists and how it's structured — not implementation details. Think of a city map: it tells you what's there and where, but you still look at the actual street when you arrive. If it could change without a business decision, it doesn't belong in a map.

**Missions** are per-task. What to accomplish, what's in scope, what success looks like. The only layer the human writes every session.

**Terrain** is what the agent discovers at runtime. Never pre-authored. The human reviews it at checkpoints.

## Rules

Each layer can only reference layers above it. Principles never mention tools. Skills never mention projects. Maps never mention the current mission.

When live observation contradicts a map, the observation wins. The agent flags the contradiction and updates the map as part of its work.

## Human Oversight

**Checkpoints** are where the agent stops and produces a reviewable artifact — a plan, a map, a summary. The human builds their mental model from the artifact, then steers or approves.

**Quality gates** encode pass/fail criteria. The agent evaluates its own work against them and reports the result. The human makes the final call.

## Portability

All files live in one directory. A compiler reads a manifest and generates tool-specific output — CLAUDE.md, copilot-instructions.md, .cursor/rules/, AGENTS.md, whatever the tool expects. Switch tools by adding an output target and re-running the compiler. Never re-author the instructions.

## When to Create a New Agent

The agent is its principles. If two agents would have conflicting values, conflicting criteria for success, or conflicting rules about what to refuse — they're different agents. If only the tools, domain, or task differ, it's the same agent on a different mission.
