# StarAligner

A framework for building AI agents that work across any coding tool.

AI agents do great, as long as the stars align. The more complex the task, the more stars must align. StarAligner is a process for making stars align.

## Quick Start

```bash
npx create-staraligner
```

This creates a `.staraligner/` directory in your project:

```
.staraligner/
  CONSTITUTION.md       ← framework rules (read this first)
  PRINCIPLES.md         ← your agent's identity (edit this)
  skills/               ← one file per tool or technique
  domain/               ← dehydrated maps of what exists
  mission/              ← per-task objectives
  terrain/              ← agent-discovered context (don't edit)
  manifest.yaml         ← compiler config
  compile.mjs           ← generates tool-specific output
```

## The Pyramid

```
    Principles    — what the agent IS
    Skills        — what the agent CAN DO
    Maps          — what the agent KNOWS ABOUT
    Missions      — what the agent SHOULD DO
    Terrain       — what the agent DISCOVERS
```

Each layer can only reference layers above it. Stable things at the top. Volatile things at the bottom.

## How To Use It

1. **Define the agent.** Edit `PRINCIPLES.md`. Answer: what does it value, what does it refuse to do, what does success look like?

2. **Add skills.** One file per tool in `skills/`. Swap tools by swapping files.

3. **Map the domain.** Describe what exists and how it's structured in `domain/`. Not implementation details — if it could change without a business decision, don't store it.

4. **Write a mission.** What should the agent accomplish this session.

5. **Compile.** Edit `manifest.yaml` with your output targets, then run:

```bash
node compile.mjs
```

This generates tool-specific files: `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/`, `AGENTS.md` — whatever your tools expect. One source, every target.

## The Meta-Agent

StarAligner ships with its own agent that helps you build and maintain other agents.

```bash
npx create-staraligner --meta
```

This includes the StarAligner meta-agent, which can:
- Guide you through defining an agent's principles
- Research best practices for your domain
- Audit existing agents for structural violations
- Check that maps pass the dehydration test
- Verify checkpoints produce artifacts and gates have criteria

## Why

The hardest part of working with AI agents is keeping up cognitively with what they're doing. You need enough instruction to align the output, but not so much that you poison the water with false constraints.

StarAligner solves this by separating things that rarely change (principles) from things that change every session (terrain), putting human oversight at the boundaries (checkpoints and quality gates), and making the whole thing portable across tools (the compiler).

Read [CONSTITUTION.md](CONSTITUTION.md) for the full framework definition.
Read [PHILOSOPHY.md](PHILOSOPHY.md) for the deeper background.

## License

MIT
