# Components

This folder contains all component documentation files for the ABC Component Library workspace.

Each `.json` file represents one component from the design system. The live workspace tool reads these files and renders them dynamically in the sidebar.

## How to add a new component

1. Open a Claude.ai conversation with the **Figma MCP** connected
2. Tell Claude: *"Extract the [Component Name] from Figma node [node-id] and generate a JSON file for our component workspace following the same schema as `link-preview-card.json` in this repo"*
3. Claude will produce a complete component JSON file
4. In this `components/` folder on GitHub, click **Add file → Create new file**
5. Name it `your-component-name.json` (lowercase, hyphenated)
6. Paste the JSON Claude generated and commit
7. Open `registry.json` and add a new entry to the `components` array:
   ```json
   {
     "id": "your-component-name",
     "name": "Your Component Name",
     "file": "your-component-name.json",
     "addedBy": "Your Name",
     "addedDate": "2026-04-21"
   }
   ```
8. Commit the registry update
9. Refresh the live workspace — your component appears in the sidebar

## Component JSON schema

Each component file must include these top-level fields:

- `id` — unique identifier (kebab-case, used as filename)
- `name` — display name shown in the UI
- `figmaNodeId` — the Figma component set node ID (e.g. `"201:58651"`)
- `figmaFileKey` — the Figma file key from the URL
- `renderer` — name of the React renderer to use (use `"linkPreviewCard"` if it should render like the existing one, or omit to show a generic placeholder)
- `description` — short description of the component
- `properties` — variants, booleans, and text properties from Figma
- `tokens` — corner radius, width, padding, typography
- `colors` — light and dark mode color tables
- `variants` — descriptions of each variant combination
- `behavior` — interactive rules, dynamic behavior
- `states` — Default, Pressed, Loading, etc.
- `darkMode` — token mapping between light and dark
- `motion` — transitions with durations and easing
- `writing` — copy guidelines
- `a11y` — accessibility specs
- `assets` — icons, slots, overlays

See `link-preview-card.json` in this folder as the reference example.

## Avoiding duplicate work

Before extracting a component, check the `registry.json` file to see what's already documented and who's working on what.

When you start working on a new component, open a GitHub Issue with the title "WIP: [Component Name]" so your coworker knows it's being worked on.
