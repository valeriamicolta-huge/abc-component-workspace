# ABC Component Library Workspace — Project Handoff

Paste this entire document at the start of a new Claude conversation to restore full context.

---

## What this project is

A collaborative web tool for documenting Android (Material Design 3) components from Figma. Two designers (Valeria + coworker) extract components from Figma, generate structured files, upload them to GitHub, and the tool renders them live with interactive variant controls and a `.md` export for an AI-driven design system.

**Live workspace:** https://abc-component-workspace.vercel.app
**GitHub repo:** https://github.com/valeriamicolta-huge/abc-component-workspace
**Figma source file:** `ILEhlPBUH6Y4lKwqSnPnSc` (ABC AI Tool)
**Base components file:** `5L3DIB62Y0dFU3uVgLBeVK` (HUGE ABC Component Library)

---

## Architecture (v2 — modular, DO NOT change index.html for new components)

```
abc-component-workspace/
├── index.html                  ← workspace shell, loads everything dynamically. Edit only for workspace-level features.
├── KICKOFF-PROMPT.md           ← copy-paste prompt for extracting NEW components from Figma
├── TRANSLATION-PROMPT.md       ← copy-paste prompt for converting EXISTING component code into our format
├── README.md
└── components/
    ├── registry.json           ← list of active components (edit this to add/remove)
    └── [component-id]/
        ├── data.json           ← documentation, properties, tokens, colors, behavior, conditional logic
        └── renderer.jsx        ← React visual preview, loaded + compiled at runtime via Babel
```

**How the workspace loads components at runtime:**
1. Fetches `components/registry.json`
2. For each entry, fetches `components/[id]/data.json`
3. Fetches `components/[id]/renderer.jsx` as plain text, compiles it with Babel, evaluates it
4. The renderer file MUST end with `const Renderer = ComponentName;`
5. Renderer globals available: `React`, `useState`, `useRef`, `useEffect`, `useContext`, `THEMES`, `S`, `ThemeCtx`, `useT`, `lum`

**To add a new component:** Create `components/[id]/data.json` + `components/[id]/renderer.jsx` on GitHub, add an entry to `registry.json`. Never edit `index.html`.

**To remove a component:** Remove its entry from `registry.json` FIRST, then delete the folder. Order matters — if the folder is deleted first, the workspace crashes on load.

---

## Key workspace features

- **Dark/light toggle** — workspace theme toggle in top-right header
- **Preview canvas** — `#d3dbe5` light / `#0e0e0e` dark, intentionally darker than the card so the component is visible
- **Right panel — Variants section** — dynamically renders controls based on `data.json` properties. Supports: M3Select (dropdown for 3+ options), M3Seg (segmented for 2 options), M3Switch (boolean)
- **`propertyVisibility`** — a field in `data.json` that hides/shows variant controls based on current prop values. Example: `"Show Play/Pause": { "when": { "Type": ["Video", "Sent links", "Received links"] } }`
- **Right panel — Content section** — only shown if `data.json` has `contentFields`. Available fields: `"mediaImage"`, `"title"`, `"brand"`
- **Export** — Download `.md` (client's document_structure.md template) or `.json`. The `.md` export now includes a Conditional Logic section.

---

## M3 Theme tokens (available as globals in renderers)

```js
THEMES.light = { pri: "#0b57d0", onPri: "#fff", priC: "#d3e3fd", onPriC: "#0842a0",
  surf: "#fff", surfC: "#f0f4f9", surfCH: "#e9eef6", surfCHi: "#dde3ea",
  onSurf: "#1f1f1f", onSurfV: "#444746", outl: "#747775", outlV: "#c4c7c5" }
THEMES.dark  = { pri: "#a8c7fa", onPri: "#062e6f", priC: "#0842a0", onPriC: "#d3e3fd",
  surf: "#131314", surfC: "#1e1f20", surfCH: "#282a2c", surfCHi: "#333537",
  onSurf: "#e3e3e3", onSurfV: "#c4c7c5", outl: "#8e918f", outlV: "#444746" }
S.f = '"Google Sans Text","Roboto","Noto Sans",system-ui,sans-serif'
lum(hex) // returns luminance 0-1, used to decide text color over extracted image bg
```

---

## Components currently in the workspace

### 1. Link Preview Card (`components/link-preview-card/`)
**Status:** Active, renderer built, still polishing the read receipt icon

**Figma node:** `201:58651` (file `ILEhlPBUH6Y4lKwqSnPnSc`)
**Base components file:** `5L3DIB62Y0dFU3uVgLBeVK`

**Properties:**
- `Type`: Received links / Sent links / Video / Image
- `Styles`: XMS / RCS
- `Category`: Incoming / Outgoing (only visible when Type = Video or Image)
- `Show Play/Pause`: boolean (visible for Video, Sent links, Received links)
- `Read receipt Status`: Sending / Sent / Delivered / Read (only visible when Styles=RCS and Type ≠ Received links)
- `Read receipt Mode` was REMOVED — mode is inferred from context in the AI design system

**Visibility rules (implemented in renderer + documented in data.json `conditionalLogic`):**
- Play button: Video always shows it. Links show it if `Show Play/Pause = true`. Image never shows it.
- Read receipt: `(Sent links + RCS)` OR `(Image + RCS + Outgoing)` OR `(Video + RCS + Outgoing)`

**Key renderer behaviors:**
- Card background = dominant color extracted from uploaded image. Falls back to `#e8eaed` light / `#2c2c2c` dark.
- Info area text (title, brand) responds ONLY to card bg luminance (`lum(cardBg) < 0.5`), NOT to the workspace dark toggle
- Link area (above image) DOES respond to workspace dark toggle — it's a separate surface
- Play/pause button is a dynamic toggle — clicking it switches between play and pause icons using `useState`
- Placeholder image when no media uploaded: lavender `#ede7f6` bg with filled purple `#6d28d9` icon (Figma `.Base/Media Link preview card`)

**Read receipt (STILL BEING POLISHED):**
- Always uses Type = "Link preview card" from the Figma `.Base/Read receipt icon` component
- From Figma variable defs: circle bg = `inverse-on-surface` token (`#f2f2f2` light / `#313131` dark), check marks = `on-surface-variant` token (`#444746` light / `#c4c7c5` dark)
- Circle has a border: `#c4c7c5` light / `#5c5f5e` dark
- The icon has been extracted from Figma multiple times but is still not pixel-perfect — compare against individual node screenshots: Light/Read=`22983:37178`, Dark/Read=`22983:37180`, Light/Sending=`22983:37166`, Dark/Sending=`22983:37168`

**`contentFields`:** `["mediaImage", "title", "brand"]`

---

### 2. Card File Attachment (`components/card-file-attachment/`)
**Status:** Added by coworker, files exist on GitHub

---

## Decisions already made (don't re-debate these)

- **Platform:** Android only (M3). iOS was dropped.
- **No `import` statements in renderer files** — they're evaluated as plain text in the workspace's scope
- **No TypeScript in renderers** — plain JSX only
- **`Read receipt Mode` removed from exported .md** — inferred from context, not a design-time property
- **`Read receipt Status` lives in States section of .md** — it's a runtime state, not a design-time variant
- **Conditional Logic section added to .md export** — most valuable section for AI consumption, documents exactly which sub-components render per property combination
- **Figma asset URLs expire in 7 days** — never hardcode them in renderers. Use inline SVG or data URIs instead.
- **`registry.json` is the source of truth** — always edit it before deleting folders
- **`propertyVisibility` in data.json** — hides/shows variant controls in the right panel based on current prop values. The workspace reads this automatically.

---

## Prompts available in the repo

- **`KICKOFF-PROMPT.md`** — for extracting a NEW component from Figma. Requires Figma MCP connected. Generates both `data.json` and `renderer.jsx`.
- **`TRANSLATION-PROMPT.md`** — for converting EXISTING component code into the workspace format. No MCP needed.

Both prompts instruct Claude to output: the complete `data.json`, the complete `renderer.jsx`, and the exact `registry.json` entry to add.

---

## What to do when you start a new conversation

1. Paste this entire document
2. Say what you want to work on
3. If you're extracting a new component, make sure the **Figma MCP** is connected (enable it in the Claude.ai connector settings before starting the conversation)
4. If you're continuing work on an existing component, you can paste the current `data.json` and `renderer.jsx` from GitHub so Claude has the latest version

---

## Files that should always be in sync

If you make changes to any of these, make sure both files are updated together:
- `data.json` changes that affect property names → `renderer.jsx` must read those same prop names
- `data.json` `propertyVisibility` rules → should match the renderer's actual conditional logic
- `registry.json` → must stay in sync with what folders actually exist in `components/`
