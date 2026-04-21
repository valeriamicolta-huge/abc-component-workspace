# Kickoff Prompt — Copy & Paste This Into Claude

Every time you want to add a new component to the library, start a new Claude.ai conversation and paste the entire message below. Fill in the two blanks at the top (your name and the Figma component URL).

Make sure you have the **Figma MCP connector** enabled in Claude before starting. You can check this by clicking the connector icon in the chat input.

---

## COPY FROM HERE ↓

Hi Claude! I need help documenting a component from our Figma design system. I work with a coworker on a collaborative component library called the **ABC Component Library**, and we're adding this component to our shared workspace.

**Who I am:** [YOUR NAME]
**Component Figma URL:** [PASTE FIGMA URL HERE]

### Project context

- **Figma file key:** `ILEhlPBUH6Y4lKwqSnPnSc` (the ABC AI Tool file)
- **GitHub repo (where the component JSON will live):** https://github.com/valeriamicolta-huge/abc-component-workspace
- **Live workspace:** [your Vercel URL]
- **Platform:** Android only (Material Design 3)
- **Reference file:** `components/link-preview-card.json` in our repo is the format template

### What I need you to do

**Step 1 — Extract the component from Figma**

Use the Figma MCP tools in this order:

1. **`get_context_for_code_connect`** on the component set node — this gives you the complete variant matrix: all properties, their types (VARIANT, BOOLEAN, TEXT), default values, variant options, and the descendant tree showing which elements appear in which variants. This is the MOST important tool — don't skip it.
2. **`get_design_context`** on the component set — this gives you visual specs, design tokens (spacing, corner radius, colors), typography references, and a screenshot.
3. **`get_variable_defs`** on the component set — this resolves M3 token variable names to their actual values.
4. **`get_screenshot`** if you need a visual reference for the variants.

If the node I give you is a component instance (not a component set), find the parent component set first — it holds all the variants. If you can't find it, search the file metadata for component sets matching the component name.

**Step 2 — Generate the JSON file**

Create a single JSON file following this exact schema:

```json
{
  "id": "kebab-case-component-name",
  "name": "Display Name For Sidebar",
  "figmaNodeId": "XXX:XXX",
  "figmaFileKey": "ILEhlPBUH6Y4lKwqSnPnSc",
  "renderer": null,
  "description": "One or two sentences about what this component does and its primary purpose.",
  "properties": {
    "PropertyName": { "type": "VARIANT", "default": "...", "options": ["...", "..."] },
    "BooleanProperty": { "type": "BOOLEAN", "default": true }
  },
  "tokens": {
    "cornerRadius": "20dp (corner-large-increased)",
    "width": "330dp",
    "mediaHeight": "187dp",
    "padding": { "top": 14, "right": 32, "bottom": 20, "left": 16 },
    "typography": {
      "title": { "token": "Title Medium", "spec": "Google Sans Text Medium, 16/24, tracking 0" },
      "body": { "token": "Body Small", "spec": "..." }
    }
  },
  "colors": {
    "light": [
      ["Element name", "M3 Token", "#HEXCODE"]
    ],
    "dark": [
      ["Element name", "M3 Token", "#HEXCODE"]
    ]
  },
  "variants": [
    { "name": "Variant name", "desc": "What changes in this variant combination." }
  ],
  "behavior": {
    "interactive": "What happens on tap, long press, etc.",
    "dynamic": "Any behavior that depends on content or context.",
    "readReceipt": "Any conditional visibility rules (or remove this field if not applicable)."
  },
  "states": [
    ["Default", "..."],
    ["Pressed", "..."],
    ["Loading", "..."]
  ],
  "darkMode": {
    "tokens": [
      ["Token name", "#LIGHTHEX", "#DARKHEX"]
    ],
    "notes": "Any behavioral differences between light and dark mode."
  },
  "motion": [
    ["Transition name", "duration", "easing"]
  ],
  "writing": [
    ["Element", "Copy guidelines, max length, tone, etc."]
  ],
  "a11y": [
    ["Role", "..."],
    ["Label", "aria-label pattern"],
    ["Contrast", "WCAG requirement"],
    ["Keyboard", "Tab/Enter behavior"]
  ],
  "assets": [
    ["Asset name", "Type (Icon/Slot/Overlay)", "Description"]
  ]
}
```

### Critical rules

1. **Use Material 3 tokens, not raw values.** Write `"Title Medium"` and `"Primary"`, not `"16px bold"` and `"#0b57d0"`. The hex codes are fallbacks only.
2. **Use `dp` for all spatial values.** Not `px`. Android uses density-independent pixels.
3. **Include BOTH light and dark mode colors.** Every element that has a color needs both variants listed.
4. **Describe every variant combination** in the `variants` array, not just the properties individually. If the component has 3 properties with 2, 2, and 4 options that meaningfully change the layout, list the combinations that matter.
5. **Don't invent information.** If the Figma component doesn't specify motion, states, or accessibility details, note that explicitly rather than making things up. The reference card has these because we added sensible defaults — but check with me before doing the same for a new component.
6. **Keep `renderer: null`** for now. The renderer field links a component to a custom React visual preview in the workspace. Unless it renders like the Link Preview Card (in which case use `"linkPreviewCard"`), leave it null and the workspace will show a placeholder.

### Step 3 — Output

When you're done, give me:
1. The final JSON content in a code block so I can copy it
2. The exact filename I should use (e.g., `rich-card.json`)
3. The exact entry I should add to `registry.json`, matching this format:
   ```json
   {
     "id": "component-id",
     "name": "Component Name",
     "file": "component-id.json",
     "addedBy": "[YOUR NAME]",
     "addedDate": "YYYY-MM-DD"
   }
   ```

### Step 4 — Upload to GitHub

Once you give me the JSON, I'll upload it myself to GitHub at https://github.com/valeriamicolta-huge/abc-component-workspace/tree/main/components — you don't need GitHub access. I'll paste the JSON directly into the GitHub editor, add the registry entry, commit, and the live workspace will show the new component after a refresh.

---

## COPY UP TO HERE ↑

## After Claude responds

1. Claude will extract the component using the Figma MCP tools and give you a complete JSON file
2. Open https://github.com/valeriamicolta-huge/abc-component-workspace/tree/main/components
3. Click **Add file → Create new file**
4. Name it exactly what Claude suggested (e.g., `rich-card.json`)
5. Paste the JSON content from Claude's response
6. Scroll down and click **Commit changes**
7. Open `registry.json` in the same folder
8. Click the pencil icon to edit
9. Add Claude's registry entry to the `components` array (remember to add a comma after the previous entry)
10. Commit the changes
11. Refresh the live workspace — your component appears!

## Avoiding duplicate work

Before you start, open `registry.json` on GitHub to see what's already documented. If you're about to work on something big, message your coworker or open a GitHub Issue titled "WIP: [Component Name]" so the other person knows it's taken.
