/* Chip renderer
   Figma: 5L3DIB62Y0dFU3uVgLBeVK, node 471404:44042
   Globals: React, useState, useRef, useEffect, THEMES, S, lum, Avatar
   Babel-safe: no backticks, no destructuring params, no optional chaining.
   Must end with: const Renderer = Chip;

   Padding rules from Figma (node 471404:44045):
     Smart action / Smart reply:
       With leading icon  → left 12, right 16, vertical 6
       No leading content → left 16, right 16, vertical 6
     Suggestion:
       With leading (avatar or icon) → left 8, right 12, vertical 6
       No leading                    → left 16, right 16, vertical 6

   Carousel mode (type = Smart action):
     Shows a horizontally scrollable row of chips.
     User can add chips (with + button) and remove them (x on each chip).
     Each chip in the carousel has its own editable label.
*/

/* ── Icons ───────────────────────────────────────────────────────────────── */
function PhotoIcon(props) {
  var color = props.color || "#0b57d0";
  var size  = props.size  || 18;
  return React.createElement("svg", { width: size, height: size, viewBox: "0 0 18 18", fill: "none", style: { display: "block", flexShrink: 0 } },
    React.createElement("rect",   { x: 1.5, y: 3, width: 15, height: 12, rx: 1.5, stroke: color, strokeWidth: 1.3 }),
    React.createElement("circle", { cx: 5.5, cy: 6.5, r: 1.5, fill: color }),
    React.createElement("path",   { d: "M1.5 13L6 8.5L9 11L12 7.5L16.5 13", stroke: color, strokeWidth: 1.3, strokeLinejoin: "round" })
  );
}

function ReplyIcon(props) {
  var color = props.color || "#0b57d0";
  var size  = props.size  || 18;
  return React.createElement("svg", { width: size, height: size, viewBox: "0 0 18 18", fill: "none", style: { display: "block", flexShrink: 0 } },
    React.createElement("path", { d: "M7 4L3 8L7 12M3 8H11C13.209 8 15 9.791 15 12V14", stroke: color, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" })
  );
}

function CloseIcon(props) {
  var color = props.color || "#444746";
  var size  = props.size  || 12;
  return React.createElement("svg", { width: size, height: size, viewBox: "0 0 12 12", fill: "none", style: { display: "block", flexShrink: 0 } },
    React.createElement("line", { x1: 2, y1: 2, x2: 10, y2: 10, stroke: color, strokeWidth: 1.5, strokeLinecap: "round" }),
    React.createElement("line", { x1: 10, y1: 2, x2: 2, y2: 10, stroke: color, strokeWidth: 1.5, strokeLinecap: "round" })
  );
}

function PlusIcon(props) {
  var color = props.color || "#0b57d0";
  var size  = props.size  || 16;
  return React.createElement("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", style: { display: "block", flexShrink: 0 } },
    React.createElement("line", { x1: 8, y1: 3, x2: 8, y2: 13, stroke: color, strokeWidth: 1.5, strokeLinecap: "round" }),
    React.createElement("line", { x1: 3, y1: 8, x2: 13, y2: 8, stroke: color, strokeWidth: 1.5, strokeLinecap: "round" })
  );
}

/* ── Tokens ──────────────────────────────────────────────────────────────── */
function getTokens(dark) {
  if (dark) {
    return { surface: "#1e1f20", surfaceC: "#2a2b2c", priC: "#0842a0", onPriC: "#d3e3fd", onSurfV: "#c4c7c5", onSurf: "#e3e3e3", outlV: "#444746", primary: "#a8c7fa" };
  }
  return { surface: "#ffffff", surfaceC: "#f0f4f9", priC: "#d3e3fd", onPriC: "#0842a0", onSurfV: "#444746", onSurf: "#1f1f1f", outlV: "#c4c7c5", primary: "#0b57d0" };
}

function mkLabel(color) {
  return { fontFamily: "'Google Sans Text','Google Sans',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: "20px", letterSpacing: 0, color: color, margin: 0, whiteSpace: "nowrap", userSelect: "none" };
}

/* ── Single chip element ─────────────────────────────────────────────────── */
function SingleChip(props) {
  var type           = props.type           || "Smart action";
  var selected       = !!props.selected;
  var leadingContent = props.leadingContent || "None";
  var label          = props.label          || "label text";
  var dark           = !!props.dark;
  var onRemove       = props.onRemove       || null;
  var tk             = getTokens(dark);

  /* Smart action */
  if (type === "Smart action") {
    var hasIcon = leadingContent === "Icon";
    var bg      = selected ? tk.priC   : tk.surface;
    var border  = selected ? "none"    : "1px solid " + tk.outlV;
    var lblClr  = selected ? tk.onPriC : tk.onSurfV;
    var icnClr  = selected ? tk.onPriC : tk.primary;
    /* Padding: with icon → 12/16; no icon → 16/16 */
    var pleft   = hasIcon ? 12 : 16;
    return React.createElement("div", {
      style: { position: "relative", display: "inline-flex", alignItems: "center", height: 40, borderRadius: 20, background: bg, border: border, paddingLeft: pleft, paddingRight: onRemove ? 28 : 16, paddingTop: 6, paddingBottom: 6, gap: hasIcon ? 8 : 0, boxSizing: "border-box", cursor: "pointer", flexShrink: 0 }
    },
      hasIcon ? React.createElement(PhotoIcon, { color: icnClr, size: 18 }) : null,
      React.createElement("span", { style: mkLabel(lblClr) }, label),
      onRemove
        ? React.createElement("div", {
            onClick: function(e) { e.stopPropagation(); onRemove(); },
            style: { position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, borderRadius: "50%", background: dark ? "#444746" : "#c4c7c5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }
          },
            React.createElement(CloseIcon, { color: dark ? "#e3e3e3" : "#444746", size: 10 })
          )
        : null
    );
  }

  /* Smart reply */
  if (type === "Smart reply") {
    var bg2     = selected ? tk.priC   : tk.surface;
    var border2 = selected ? "none"    : "1px solid " + tk.outlV;
    var lblClr2 = selected ? tk.onPriC : tk.onSurfV;
    return React.createElement("div", {
      style: { display: "inline-flex", alignItems: "center", height: 40, borderRadius: 20, background: bg2, border: border2, paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, boxSizing: "border-box", cursor: "pointer", flexShrink: 0 }
    },
      React.createElement("span", { style: mkLabel(lblClr2) }, label)
    );
  }

  /* Suggestion */
  if (type === "Suggestion") {
    var hasAvt = leadingContent === "Avatar";
    var hasIc  = leadingContent === "Icon";
    var hasLd  = hasAvt || hasIc;
    var bg3    = hasAvt ? tk.priC    : tk.surfaceC;
    var lbl3   = hasAvt ? tk.onPriC  : tk.onSurf;
    var ic3    = hasAvt ? tk.onPriC  : tk.primary;
    /* Padding: with leading → left 8, right 12; no leading → 16/16 */
    var pl3    = hasLd ? 8  : 16;
    var pr3    = hasLd ? 12 : 16;
    return React.createElement("div", {
      style: { display: "inline-flex", alignItems: "center", height: 32, borderRadius: 32, background: bg3, border: "none", paddingLeft: pl3, paddingRight: pr3, paddingTop: 6, paddingBottom: 6, gap: hasLd ? 4 : 0, boxSizing: "border-box", cursor: "pointer", flexShrink: 0, overflow: "hidden" }
    },
      hasAvt
        ? React.createElement("div", { style: { width: 20, height: 20, borderRadius: "50%", overflow: "hidden", flexShrink: 0 } },
            typeof Avatar !== "undefined"
              ? React.createElement(Avatar, { type: "Single Avatar", size: 20, dark: dark })
              : React.createElement("div", { style: { width: 20, height: 20, background: "#d4e4f7", borderRadius: "50%" } })
          )
        : null,
      hasIc ? React.createElement(ReplyIcon, { color: ic3, size: 18 }) : null,
      React.createElement("span", { style: Object.assign({}, mkLabel(lbl3), { paddingLeft: hasLd ? 4 : 0 }) }, label)
    );
  }

  return null;
}

/* ── Main renderer ───────────────────────────────────────────────────────── */
function Chip(props) {
  var type           = props.type           || "Smart action";
  var selected       = !!props.selected;
  var leadingContent = props.leadingContent || "None";
  var label          = props.label          || "label text";
  var dark           = !!props.dark;
  var tk             = getTokens(dark);

  /* Carousel state — list of chip objects */
  var carouselState  = useState([
    { id: 1, label: "Photos",       leading: "Icon" },
    { id: 2, label: "Location",     leading: "Icon" },
    { id: 3, label: "Calendar",     leading: "Icon" },
  ]);
  var chips          = carouselState[0];
  var setChips       = carouselState[1];
  var nextId         = useState(4);
  var getNextId      = nextId[0];
  var setNextId      = nextId[1];
  var newLabel       = useState("");
  var newLabelVal    = newLabel[0];
  var setNewLabel    = newLabel[1];
  var inputRef       = useRef(null);

  function addChip() {
    var lbl = newLabelVal.trim() || "New chip";
    setChips(function(prev) {
      return prev.concat([{ id: getNextId, label: lbl, leading: leadingContent }]);
    });
    setNextId(function(n) { return n + 1; });
    setNewLabel("");
    if (inputRef.current) inputRef.current.focus();
  }

  function removeChip(id) {
    setChips(function(prev) { return prev.filter(function(c) { return c.id !== id; }); });
  }

  /* Carousel view — Smart action only */
  if (type === "Smart action carousel") {
    return React.createElement("div", {
      style: { display: "flex", flexDirection: "column", gap: 16, padding: 24, borderRadius: 20, background: dark ? "#2c2c2e" : "#ffffff", boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.08)", maxWidth: 480 }
    },
      /* Scrollable chip row */
      React.createElement("div", {
        style: { display: "flex", flexDirection: "row", gap: 8, overflowX: "auto", paddingBottom: 4 }
      },
        chips.map(function(c) {
          return React.createElement(SingleChip, {
            key: c.id,
            type: "Smart action",
            selected: selected,
            leadingContent: c.leading,
            label: c.label,
            dark: dark,
            onRemove: function() { removeChip(c.id); }
          });
        })
      ),
      /* Add chip input row */
      React.createElement("div", {
        style: { display: "flex", gap: 8, alignItems: "center" }
      },
        React.createElement("input", {
          ref: inputRef,
          value: newLabelVal,
          onChange: function(e) { setNewLabel(e.target.value); },
          onKeyDown: function(e) { if (e.key === "Enter") addChip(); },
          placeholder: "Chip label...",
          style: { flex: 1, height: 36, padding: "0 12px", borderRadius: 18, border: "1px solid " + tk.outlV, background: tk.surface, color: tk.onSurf, fontFamily: "'Google Sans Text','Google Sans',sans-serif", fontSize: 13, outline: "none", boxSizing: "border-box" }
        }),
        React.createElement("div", {
          onClick: addChip,
          style: { width: 36, height: 36, borderRadius: 18, background: tk.priC, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }
        },
          React.createElement(PlusIcon, { color: tk.onPriC, size: 16 })
        )
      ),
      React.createElement("p", {
        style: { margin: 0, fontSize: 11, color: tk.onSurfV, fontFamily: "'Google Sans Text','Google Sans',sans-serif" }
      }, "Type a label and press + or Enter to add a chip. Click \u00d7 to remove.")
    );
  }

  /* Single chip view — wrapped in a visible card */
  return React.createElement("div", {
    style: { display: "inline-flex", alignItems: "center", justifyContent: "center", padding: 32, borderRadius: 20, background: dark ? "#2c2c2e" : "#ffffff", boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.08)" }
  },
    React.createElement(SingleChip, { type: type, selected: selected, leadingContent: leadingContent, label: label, dark: dark })
  );
}

const Renderer = Chip;
