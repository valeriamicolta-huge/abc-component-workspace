# ABC Component Library

A collaborative workspace for documenting components from the ABC Android design system. Every component is extracted from Figma, stored as a JSON file, and rendered in an interactive web tool where you can preview variants, swap images, toggle dark mode, and export structured Markdown documentation for the client.

**Live workspace:** [your Vercel URL]

## How it works

- Each component lives as a single `.json` file in the `components/` folder
- The workspace (`index.html` at the repo root) reads `components/registry.json` on load and fetches each component file listed there
- Updates appear live on the deployed site as soon as changes are committed to `main`

## For new contributors

Want to add a component? Open `KICKOFF-PROMPT.md` at the root of this repo and follow the instructions. It contains a ready-to-paste prompt for a new Claude.ai conversation that handles the entire extraction process.

You don't need to install anything or run code locally. You just need:
- A Claude.ai account
- The Figma MCP connector enabled in Claude
- Write access to this GitHub repo

## Repo structure

```
abc-component-workspace/
├── index.html                  ← the workspace (deployed to Vercel)
├── KICKOFF-PROMPT.md           ← copy-paste prompt to start a component extraction
├── README.md                   ← this file
└── components/
    ├── README.md               ← contributor guide for this folder
    ├── registry.json           ← list of all components (update this when adding new ones)
    └── *.json                  ← individual component files
```

## Tech notes

- Pure HTML + React (loaded from CDN) — no build step, no framework setup
- Vercel hosts the `index.html` as a static file
- GitHub raw content URLs serve the JSON files at runtime
- A custom renderer for each component type lives inside `index.html`; by default new components show a generic placeholder preview until a renderer is added
