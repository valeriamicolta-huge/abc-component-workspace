/* Chip renderer
   Figma: 5L3DIB62Y0dFU3uVgLBeVK, node 471404:44042
   Globals: React, useState, useRef, useEffect, THEMES, S, lum, Avatar
   Babel-safe: no backticks, no destructuring params, no optional chaining.
   Must end with: const Renderer = Chip;

   Types:
     Smart action          — 40dp, r=20, optional icon/avatar leading, label
     Smart action carousel — horizontally scrollable row, 4px gap, chipCount controls count
     Smart reply           — 40dp, r=20, label only
     Suggestion            — 32dp, r=32, optional icon/avatar leading, label
     Emoji                 — 40dp, r=20, single emoji, no label
     Sticker               — 48dp, r=8, sticker image, no label

   Padding rules (Figma):
     Smart action with leading    → left 12, right 16, vertical 6
     Smart action no leading      → left 16, right 16, vertical 6
     Suggestion with leading      → left 8,  right 12, vertical 6
     Suggestion no leading        → left 16, right 16, vertical 6
     Emoji                        → left 16, right 16, vertical 6 (emoji centred)
     Sticker                      → left 5,  right 5,  vertical 6
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

/* ── Default carousel chip labels ───────────────────────────────────────── */
var DEFAULT_LABELS = ["Photos", "Location", "Calendar", "Music", "Contacts", "Files", "Maps", "Notes", "Tasks", "Weather"];

/* Default emojis for carousel */
var DEFAULT_EMOJIS = ["❤️", "😂", "😍", "👍", "🔥", "😢", "🎉", "😮", "🙏", "😎"];

/* ── Leading content renderer (shared) ──────────────────────────────────── */
function LeadingContent(props) {
  var leadingContent = props.leadingContent;
  var iconColor      = props.iconColor;
  var dark           = props.dark;
  var chipType       = props.chipType || "Smart action";

  if (leadingContent === "Icon") {
    if (chipType === "Suggestion") {
      return React.createElement(ReplyIcon, { color: iconColor, size: 18 });
    }
    return React.createElement(PhotoIcon, { color: iconColor, size: 18 });
  }
  if (leadingContent === "Avatar") {
    return React.createElement("div", { style: { width: 20, height: 20, borderRadius: "50%", overflow: "hidden", flexShrink: 0 } },
      typeof Avatar !== "undefined"
        ? React.createElement(Avatar, { type: "Single Avatar", size: 20, dark: dark })
        : React.createElement("div", { style: { width: 20, height: 20, background: "#d4e4f7", borderRadius: "50%" } })
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
  var emoji          = props.emoji          || "❤️";
  var chipCount      = parseInt(props.chipCount) || 3;
  var dark           = !!props.dark;
  var tk             = getTokens(dark);

  /* Editable label state for single chips */
  var labelState = useState(label);
  var localLabel = labelState[0];
  var setLabel   = labelState[1];
  var editState  = useState(false);
  var isEditing  = editState[0];
  var setEditing = editState[1];
  var inputRef   = useRef(null);

  useEffect(function() { setLabel(label); }, [label]);
  useEffect(function() { if (isEditing && inputRef.current) inputRef.current.focus(); }, [isEditing]);

  /* Inline editable label element */
  function EditableLabel(color, padLeft) {
    var style = Object.assign({}, mkLabel(color), { paddingLeft: padLeft || 0 });
    if (isEditing) {
      return React.createElement("input", {
        ref: inputRef,
        value: localLabel,
        onChange: function(e) { setLabel(e.target.value); },
        onBlur: function() { setEditing(false); },
        onKeyDown: function(e) { if (e.key === "Enter") setEditing(false); },
        style: { border: "none", outline: "none", background: "transparent", fontFamily: "'Google Sans Text','Google Sans',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: "20px", color: color, width: Math.max(60, localLabel.length * 9) + "px", padding: 0, margin: 0, paddingLeft: padLeft || 0 }
      });
    }
    return React.createElement("span", {
      onClick: function() { setEditing(true); },
      title: "Click to edit",
      style: Object.assign({}, style, { cursor: "text" })
    }, localLabel);
  }

  /* Card wrapper */
  function card(children) {
    return React.createElement("div", {
      style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 32, borderRadius: 20, background: dark ? "#2c2c2e" : "#ffffff", boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.08)" }
    }, children,
      React.createElement("p", { style: { margin: 0, fontSize: 11, color: tk.onSurfV, fontFamily: "'Google Sans Text',sans-serif" } }, "Click label to edit")
    );
  }

  /* ── Smart action carousel ── */
  if (type === "Smart action carousel") {
    var count   = Math.max(1, Math.min(chipCount, 10));
    var hasIcon = leadingContent === "Icon";
    var hasAvt  = leadingContent === "Avatar";
    var hasLd   = hasIcon || hasAvt;
    var bg      = selected ? tk.priC   : tk.surface;
    var border  = selected ? "none"    : "1px solid " + tk.outlV;
    var lblClr  = selected ? tk.onPriC : tk.onSurfV;
    var icnClr  = selected ? tk.onPriC : tk.primary;
    var pleft   = hasLd ? 12 : 16;

    var items = [];
    for (var i = 0; i < count; i++) {
      var chipLabel = DEFAULT_LABELS[i % DEFAULT_LABELS.length];
      items.push(
        React.createElement("div", {
          key: i,
          style: { display: "inline-flex", alignItems: "center", height: 40, borderRadius: 20, background: bg, border: border, paddingLeft: pleft, paddingRight: 16, paddingTop: 6, paddingBottom: 6, gap: hasLd ? 8 : 0, boxSizing: "border-box", cursor: "pointer", flexShrink: 0 }
        },
          hasIcon ? React.createElement(PhotoIcon, { color: icnClr, size: 18 }) : null,
          hasAvt
            ? React.createElement("div", { style: { width: 20, height: 20, borderRadius: "50%", overflow: "hidden", flexShrink: 0 } },
                typeof Avatar !== "undefined"
                  ? React.createElement(Avatar, { type: "Single Avatar", size: 20, dark: dark })
                  : React.createElement("div", { style: { width: 20, height: 20, background: "#d4e4f7", borderRadius: "50%" } })
              )
            : null,
          React.createElement("span", { style: mkLabel(lblClr) }, chipLabel)
        )
      );
    }

    return React.createElement("div", {
      style: { padding: 24, borderRadius: 20, background: dark ? "#2c2c2e" : "#ffffff", boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.08)", maxWidth: 480 }
    },
      React.createElement("div", {
        style: { display: "flex", flexDirection: "row", gap: 4, overflowX: "auto", paddingBottom: 4 }
      }, items)
    );
  }

  /* ── Smart action ── */
  if (type === "Smart action") {
    var hasLd2  = leadingContent !== "None";
    var bg2     = selected ? tk.priC   : tk.surface;
    var brd2    = selected ? "none"    : "1px solid " + tk.outlV;
    var clr2    = selected ? tk.onPriC : tk.onSurfV;
    var icn2    = selected ? tk.onPriC : tk.primary;
    var pl2     = hasLd2 ? 12 : 16;
    return card(
      React.createElement("div", {
        style: { display: "inline-flex", alignItems: "center", height: 40, borderRadius: 20, background: bg2, border: brd2, paddingLeft: pl2, paddingRight: 16, paddingTop: 6, paddingBottom: 6, gap: hasLd2 ? 8 : 0, boxSizing: "border-box", cursor: "pointer", flexShrink: 0, color: clr2 }
      },
        React.createElement(LeadingContent, { leadingContent: leadingContent, iconColor: icn2, dark: dark, chipType: "Smart action" }),
        EditableLabel(clr2, 0)
      )
    );
  }

  /* ── Smart reply ── */
  if (type === "Smart reply") {
    var bg3  = selected ? tk.priC   : tk.surface;
    var brd3 = selected ? "none"    : "1px solid " + tk.outlV;
    var clr3 = selected ? tk.onPriC : tk.onSurfV;
    return card(
      React.createElement("div", {
        style: { display: "inline-flex", alignItems: "center", height: 40, borderRadius: 20, background: bg3, border: brd3, paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, boxSizing: "border-box", cursor: "pointer", flexShrink: 0, color: clr3 }
      }, EditableLabel(clr3, 0))
    );
  }

  /* ── Suggestion ── */
  if (type === "Suggestion") {
    var hasLd3 = leadingContent !== "None";
    var bg4    = leadingContent === "Avatar" ? tk.priC   : tk.surfaceC;
    var clr4   = leadingContent === "Avatar" ? tk.onPriC : tk.onSurf;
    var icn4   = leadingContent === "Avatar" ? tk.onPriC : tk.primary;
    var pl4    = hasLd3 ? 8  : 16;
    var pr4    = hasLd3 ? 12 : 16;
    return card(
      React.createElement("div", {
        style: { display: "inline-flex", alignItems: "center", height: 32, borderRadius: 32, background: bg4, border: "none", paddingLeft: pl4, paddingRight: pr4, paddingTop: 6, paddingBottom: 6, gap: hasLd3 ? 4 : 0, boxSizing: "border-box", cursor: "pointer", flexShrink: 0, overflow: "hidden", color: clr4 }
      },
        React.createElement(LeadingContent, { leadingContent: leadingContent, iconColor: icn4, dark: dark, chipType: "Suggestion" }),
        EditableLabel(clr4, hasLd3 ? 4 : 0)
      )
    );
  }

  /* ── Emoji chip ──
     40dp height, 20dp radius, surface bg, outline-variant border
     Single emoji centred, no label. Emoji prop selectable from panel. */
  if (type === "Emoji") {
    return React.createElement("div", {
      style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 32, borderRadius: 20, background: dark ? "#2c2c2e" : "#ffffff", boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.08)" }
    },
      React.createElement("div", {
        style: { display: "inline-flex", alignItems: "center", justifyContent: "center", height: 40, borderRadius: 20, background: tk.surface, border: "1px solid " + tk.outlV, paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, boxSizing: "border-box", cursor: "pointer", flexShrink: 0 }
      },
        React.createElement("span", { style: { fontSize: 22, lineHeight: 1, userSelect: "none" } }, emoji)
      )
    );
  }

  /* ── Sticker chip ──
     48dp height, 8dp radius, surface bg, outline-variant border
     54×46dp sticker image centred, no label, padding 5/6. */
  if (type === "Sticker") {
    /* Use a stable placeholder sticker — coffee cup emoji as fallback */
    return React.createElement("div", {
      style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 32, borderRadius: 20, background: dark ? "#2c2c2e" : "#ffffff", boxShadow: dark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.08)" }
    },
      React.createElement("div", {
        style: { display: "inline-flex", alignItems: "center", justifyContent: "center", height: 48, borderRadius: 8, background: tk.surface, border: "1px solid " + tk.outlV, paddingLeft: 5, paddingRight: 5, paddingTop: 6, paddingBottom: 6, boxSizing: "border-box", cursor: "pointer", flexShrink: 0 }
      },
        React.createElement("span", { style: { fontSize: 36, lineHeight: 1, userSelect: "none", width: 54, textAlign: "center" } }, "\u2615")
      )
    );
  }

  return null;
}

const Renderer = Chip;
