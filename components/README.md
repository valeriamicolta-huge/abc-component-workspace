# Components

This folder holds every component in the ABC design system, one `.json` file per component. The live workspace reads these files and renders them in the sidebar.

## Quick start: adding a component

1. Open the root-level `KICKOFF-PROMPT.md` in this repo
2. Copy the prompt, paste into a new Claude.ai conversation (with Figma MCP connected)
3. Fill in your name and the Figma component URL
4. Claude extracts the component and gives you a JSON file
5. Come back here and click **Add file → Create new file**
6. Name the file exactly what Claude suggested (e.g., `rich-card.json`)
7. Paste the JSON, commit
8. Open `registry.json` and add Claude's registry entry (remember the comma!)
9. Commit
10. Refresh the live workspace → your component is there!

## Rules

- Filenames are **kebab-case** and match the `id` field inside the JSON (`rich-card.json` → `"id": "rich-card"`)
- Every component must appear in `registry.json` or the workspace won't find it
- Use Material 3 tokens (not raw values) and `dp` units (not `px`) in the JSON content
- Include BOTH light and dark mode colors — skipping dark mode means the component looks broken when the toggle is flipped

## Avoiding duplicate work

Before you start, scan `registry.json` to see what's already done. If you're about to take on a big component, open a GitHub Issue titled `WIP: [Component Name]` or message your coworker so you don't both end up working on the same thing.

## Reference

`link-preview-card.json` is the canonical example of the full JSON schema. Every new component should match its structure and level of detail.
