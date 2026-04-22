# Kickoff Prompt — Copy & Paste This Into Claude

Every time you want to add a new component to the library, start a new Claude.ai conversation and paste the entire message below. Fill in the two blanks at the top (your name and the Figma component URL).

Make sure you have the **Figma MCP connector** enabled in Claude before starting.

---

## COPY FROM HERE ↓

Hi Claude! I need help documenting a component from our Figma design system. I work with a coworker on a collaborative component library called the **ABC Component Library**, and we're adding this component to our shared workspace.

**Who I am:** [YOUR NAME]
**Component Figma URL:** [PASTE FIGMA URL HERE]

### Project context

- **Figma file key:** `ILEhlPBUH6Y4lKwqSnPnSc` (the ABC AI Tool file)
- **GitHub repo:** https://github.com/valeriamicolta-huge/abc-component-workspace
- **Live workspace:** [your Vercel URL]
- **Platform:** Android only (Material Design 3)

### What I need you to do

**Step 1 — Extract the component from Figma**

Use the Figma MCP tools in this order:

1. **`get_context_for_code_connect`** on the component set node — gives complete variant matrix, properties, defaults, and descendants.
2. **`get_design_context`** on the component set — gives visual specs, design tokens, and a screenshot.
3. **`get_variable_defs`** on the component set — resolves M3 token variable names to actual values.
4. **`get_screenshot`** if you need a visual reference.

If the node ID I gave you is a component instance (not a component set), find the parent component set first.

**Step 2 — Generate TWO files**

You need to produce **two files** for this component, both inside a folder named after the component's id (kebab-case, e.g. `rich-card/`):

#### File 1: `data.json` — the component data

Use this exact schema (look at `components/link-preview-card/data.json` in our repo for the canonical reference):

```json
{
  "id": "kebab-case-name",
  "name": "Display Name",
  "figmaNodeId": "XXX:XXX",
  "figmaFileKey": "ILEhlPBUH6Y4lKwqSnPnSc",
  "description": "One or two sentences about what this component does.",
  "contentFields": ["mediaImage", "title", "brand"],
  "properties": {
    "PropertyName": { "type": "VARIANT", "default": "...", "options": ["...", "..."] },
    "BooleanProperty": { "type": "BOOLEAN", "default": true }
  },
  "tokens": {
    "cornerRadius": "20dp (corner-large-increased)",
    "width": "330dp or 'fit content / fill parent'",
    "mediaHeight": "187dp or 'n/a'",
    "padding": { "top": 14, "right": 32, "bottom": 20, "left": 16 },
    "typography": {
      "title": { "token": "Title Medium", "spec": "Google Sans Text Medium, 16/24, tracking 0" }
    }
  },
  "colors": {
    "light": [["Element", "M3 Token", "#HEX"]],
    "dark": [["Element", "M3 Token", "#HEX"]]
  },
  "variants": [{ "name": "Variant name", "desc": "What changes." }],
  "behavior": {
    "interactive": "Tap, long press behavior.",
    "dynamic": "Any content-dependent behavior.",
    "readReceipt": "Visibility rules (or remove if N/A)."
  },
  "states": [["Default", "..."], ["Pressed", "..."]],
  "darkMode": {
    "tokens": [["Token", "#LIGHT", "#DARK"]],
    "notes": "Behavioral differences."
  },
  "motion": [["Transition", "duration", "easing"]],
  "writing": [["Element", "Guidelines"]],
  "a11y": [["Aspect", "Implementation"]],
  "assets": [["Name", "Type", "Description"]]
}
```

#### File 2: `renderer.jsx` — the visual preview

This is a small React component that draws the visual. The workspace loads it at runtime, so it has access to these globals: `React`, `useState`, `useRef`, `useEffect`, `THEMES` (light/dark M3 tokens), `S` (spacing/elevation/font tokens), `lum` (luminance helper).

**The renderer file MUST end with `const Renderer = ComponentName;`** so the workspace can pick it up.

The renderer receives a single `props` object with:
- All variant values keyed by property name (e.g. `props.Service`, `props.Type`, `props["Show Play/Pause"]`)
- `props.mediaImg` — uploaded image (data URL or null)
- `props.dominantColor` — extracted color (or `#e0e0e0` default)
- `props.title` — user-edited title
- `props.brand` — user-edited brand
- `props.dark` — boolean for dark mode

Look at `components/link-preview-card/renderer.jsx` and `components/voice-message/renderer.jsx` in our repo for canonical examples.

**Important for the renderer:**
- Use only `THEMES.light` / `THEMES.dark` tokens for colors (e.g. `T.pri`, `T.surf`, `T.onSurf`)
- Use `S.f` for the font family
- Render at the actual Figma size (e.g. `width: 330` for a 330dp component)
- If using SVG icons, inline them (no external imports)
- Don't import anything — the file is loaded as plain text and evaluated in the workspace's scope

### Critical rules

1. **Use Material 3 tokens, not raw values.** Write `"Title Medium"` and `"Primary"`, not `"16px bold"` and `"#0b57d0"`.
2. **Use `dp` for spatial values.** Not `px`.
3. **Include BOTH light and dark mode colors.** Every element with a color needs both.
4. **Describe variant combinations**, not just properties individually.
5. **Don't invent information.** If Figma doesn't specify something, note it explicitly.
6. **Set `contentFields` correctly.** This tells the workspace which content controls to show in the right panel. Only include fields the component actually uses. Available values: `"mediaImage"` (image upload with dominant color), `"title"` (editable title text), `"brand"` (editable brand/domain). If the component has no editable content, use `"contentFields": []`.

### Step 3 — Output

Give me three things in your response:

1. The full `data.json` content in a code block
2. The full `renderer.jsx` content in a code block
3. The exact entry to add to `registry.json`:
   ```json
   {
     "id": "component-id",
     "name": "Component Name",
     "addedBy": "[YOUR NAME]",
     "addedDate": "YYYY-MM-DD"
   }
   ```

### Step 4 — Upload to GitHub

Once you give me the files, I'll create a new folder at `components/component-id/` in the repo, add both files there, and update `registry.json` — I don't need GitHub access in your conversation.

---

## COPY UP TO HERE ↑

## After Claude responds — uploading to GitHub

1. Open https://github.com/valeriamicolta-huge/abc-component-workspace/tree/main/components
2. Click **Add file → Create new file**
3. In the filename field, type: `your-component-id/data.json` (the slash creates the folder!)
4. Paste the data JSON content
5. Commit
6. Click **Add file → Create new file** again
7. Type: `your-component-id/renderer.jsx`
8. Paste the renderer content
9. Commit
10. Open `registry.json` in the components folder, click pencil to edit
11. Add Claude's registry entry to the array (remember the comma!)
12. Commit
13. Refresh the live workspace — your component appears with full visual preview!

## Avoiding duplicate work

Before you start, open `registry.json` to see what's already done. If you're about to take on a big component, open a GitHub Issue titled `WIP: [Component Name]`.
