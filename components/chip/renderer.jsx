/* Chip renderer
   Figma: 5L3DIB62Y0dFU3uVgLBeVK, node 471404:44042
   Globals: React, useState, useRef, useEffect, THEMES, S, lum, Avatar
   Babel-safe: no backticks, no destructuring params, no optional chaining.
   Must end with: const Renderer = Chip;
*/

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

function getTokens(dark) {
  if (dark) {
    return { surface: "#1e1f20", surfaceC: "#2a2b2c", priC: "#0842a0", onPriC: "#d3e3fd", onSurfV: "#c4c7c5", onSurf: "#e3e3e3", outlV: "#444746", primary: "#a8c7fa" };
  }
  return { surface: "#ffffff", surfaceC: "#f0f4f9", priC: "#d3e3fd", onPriC: "#0842a0", onSurfV: "#444746", onSurf: "#1f1f1f", outlV: "#c4c7c5", primary: "#0b57d0" };
}

function mkLabel(color) {
  return { fontFamily: "'Google Sans Text','Google Sans',sans-serif", fontWeight: 500, fontSize: 14, lineHeight: "20px", letterSpacing: 0, color: color, margin: 0, whiteSpace: "nowrap", userSelect: "none" };
}

function Chip(props) {
  var type           = props.type           || "Smart action";
  var selected       = !!props.selected;
  var leadingContent = props.leadingContent || "None";
  var label          = props.label          || "label text";
  var dark           = !!props.dark;
  var tk             = getTokens(dark);

  var chip = null;

  if (type === "Smart action") {
    var hasIcon = leadingContent === "Icon";
    var bg      = selected ? tk.priC   : tk.surface;
    var border  = selected ? "none"    : "1px solid " + tk.outlV;
    var lblClr  = selected ? tk.onPriC : tk.onSurfV;
    var icnClr  = selected ? tk.onPriC : tk.primary;
    chip = React.createElement("div", {
      style: { display: "inline-flex", alignItems: "center", height: 40, borderRadius: 20, background: bg, border: border, paddingLeft: hasIcon ? 12 : 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, gap: hasIcon ? 8 : 0, boxSizing: "border-box", cursor: "pointer", flexShrink: 0 }
    },
      hasIcon ? React.createElement(PhotoIcon, { color: icnClr, size: 18 }) : null,
      React.createElement("span", { style: mkLabel(lblClr) }, label)
    );
  }

  else if (type === "Smart reply") {
    var bg2     = selected ? tk.priC   : tk.surface;
    var border2 = selected ? "none"    : "1px solid " + tk.outlV;
    var lblClr2 = selected ? tk.onPriC : tk.onSurfV;
    chip = React.createElement("div", {
      style: { display: "inline-flex", alignItems: "center", height: 40, borderRadius: 20, background: bg2, border: border2, paddingLeft: 16, paddingRight: 16, paddingTop: 6, paddingBottom: 6, boxSizing: "border-box", cursor: "pointer", flexShrink: 0 }
    },
      React.createElement("span", { style: mkLabel(lblClr2) }, label)
    );
  }

  else if (type === "Suggestion") {
    var hasAvt = leadingContent === "Avatar";
    var hasIc  = leadingContent === "Icon";
    var hasLd  = hasAvt || hasIc;
    var bg3    = hasAvt ? tk.priC   : tk.surfaceC;
    var lbl3   = hasAvt ? tk.onPriC : tk.onSurf;
    var ic3    = hasAvt ? tk.onPriC : tk.primary;
    chip = React.createElement("div", {
      style: { display: "inline-flex", alignItems: "center", height: 32, borderRadius: 32, background: bg3, border: "none", paddingLeft: hasLd ? 4 : 8, paddingRight: 12, paddingTop: 6, paddingBottom: 6, gap: hasLd ? 4 : 0, boxSizing: "border-box", cursor: "pointer", flexShrink: 0, overflow: "hidden" }
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

  /* Wrap in a visible surface card so the chip is easy to see on the canvas */
  return React.createElement("div", {
    style: {
      display:        "inline-flex",
      alignItems:     "center",
      justifyContent: "center",
      padding:        32,
      borderRadius:   20,
      background:     dark ? "#2c2c2e" : "#ffffff",
      boxShadow:      dark ? "0 2px 12px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.08)",
    }
  }, chip);
}

const Renderer = Chip;
