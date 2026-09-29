# Agent instructions

Codex and OpenCode read this file directly. Claude Code reads it through `CLAUDE.md`.

## Pull request size

Every PR adds at most 400 source lines (ric-team git-workflow practice, katalyst-forge NFR-060). Tests, BDD `.feature` specs, Markdown, `docs/`, lockfiles, and generated code do not count, and deletions do not count.

Measure the PR before you open or update it. Use the PR's base branch as the base. For a stacked PR, the base is its parent branch, not main:

```
bash ~/.claude/skills/katalyst-forge/scripts/forge-size-gate.sh origin/main HEAD
```

If the Forge skill is not installed, run `skills/katalyst-forge/scripts/forge-size-gate.sh` from a katalyst-forge checkout.

- Exit 1 means the PR is over budget. Split the branch into stacked PRs before you request review, and give each one its own revert path. A "Size Justification" section, a scope note, or a follow-up promise in the PR body does not satisfy the rule.
- Exit 2 means the gate could not run. Fix the problem and run the gate again. Never skip the gate, and never count lines by hand.
