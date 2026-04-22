/* CardFileAttachmentsCategories — renderer.jsx
   Figma: 5L3DIB62Y0dFU3uVgLBeVK, node 11021:39653

   Globals injected by index.html:
     React, useState, useEffect, THEMES, S, useT, lum
     ReadReceiptIcon  ← from _shared/read-receipt-icon (declared in data.json dependencies)

   Props passed by the workspace:
     type              — "Contact" | "Loading" | "File" | "File receipt icon" | "File draft" | "Photos card"
     stroke            — boolean
     readReceiptStatus — "Sending" | "Sent" | "Delivered" | "Read"
     dark              — boolean (injected by workspace)
*/

/* ── Animated spinner styles ─────────────────────────────────────────────── */
const SPINNER_CSS = `
  @keyframes cfa-spin { to { transform: rotate(360deg); } }
  .cfa-spinner {
    width: 36px; height: 36px; border-radius: 50%;
    border: 3px solid #dde3ea;
    border-top-color: #00639b;
    animation: cfa-spin 0.9s linear infinite;
    flex-shrink: 0;
  }
`;

/* ── Google Photos logo — pure SVG, exact brand colors ──────────────────── */
function PhotosLogo({ size }) {
  const s = size || 24;
  return React.createElement("svg", { width: s, height: s, viewBox: "0 0 48 48", style: { display: "block", flexShrink: 0 } },
    React.createElement("path", { d: "M2 24 Q2 2 24 2 L24 24 Z", fill: "#FBBC04" }),
    React.createElement("path", { d: "M24 2 Q46 2 46 24 L24 24 Z", fill: "#EA4335" }),
    React.createElement("path", { d: "M46 24 Q46 46 24 46 L24 24 Z", fill: "#4285F4" }),
    React.createElement("path", { d: "M24 46 Q2 46 2 24 L24 24 Z", fill: "#34A853" })
  );
}

/* ── Material Symbol span ────────────────────────────────────────────────── */
function Sym({ name, size, color }) {
  return React.createElement("span", {
    style: {
      fontFamily: "'Google Symbols', sans-serif",
      fontSize: size || 20, lineHeight: 1,
      color: color || "#ffffff",
      display: "block", fontStyle: "normal", userSelect: "none",
    }
  }, name);
}

/* ── File icon slot — 36×36dp secondary square + drive_pdf symbol ────────── */
function FileIconSlot({ T }) {
  return React.createElement("div", { style: { position: "relative", width: 36, height: 36, flexShrink: 0 } },
    React.createElement("div", { style: { position: "absolute", inset: 0, background: T.sec || "#00639b", borderRadius: 12 } }),
    React.createElement("div", {
      style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", overflow: "hidden", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }
    }, React.createElement(Sym, { name: "drive_pdf", size: 18, color: T.onSec || "#ffffff" }))
  );
}

/* ── Shared token helpers ────────────────────────────────────────────────── */
function getTokens(dark) {
  return dark ? {
    bg:       "#1e1f20",
    border:   "#444746",
    onSurf:   "#e3e3e3",
    onSurfV:  "#c4c7c5",
    errName:  "#f2b8b5",
    sec:      "#7fcfff",
    onSec:    "#003549",
    surfW:    "#131314",
    skeleton: "#333537",
  } : {
    bg:       "#f0f4f9",
    border:   "#c4c7c5",
    onSurf:   "#1f1f1f",
    onSurfV:  "#444746",
    errName:  "#8c1d18",
    sec:      "#00639b",
    onSec:    "#ffffff",
    surfW:    "#ffffff",
    skeleton: "#dde3ea",
  };
}

/* ── Main renderer ───────────────────────────────────────────────────────── */
function Renderer({ type, stroke, readReceiptStatus, dark }) {
  type = type || "File";
  stroke = !!stroke;
  readReceiptStatus = readReceiptStatus || "Read";

  const tk = getTokens(dark);

  const cardStyle = {
    background: tk.bg,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    padding: "18px 16px",
    gap: 12,
    flexShrink: 0,
    position: "relative",
    border: stroke ? `1px solid ${tk.border}` : "none",
    boxSizing: "border-box",
  };

  const titleStyle = {
    fontFamily: "'Google Sans Flex','Google Sans',sans-serif",
    fontWeight: 500, fontSize: 14, lineHeight: "20px",
    color: tk.onSurf, margin: 0,
    fontFeatureSettings: "'ss02' 1",
  };

  const subtitleStyle = {
    fontFamily: "'Google Sans Text','Google Sans',sans-serif",
    fontWeight: 400, fontSize: 12, lineHeight: "16px",
    letterSpacing: "0.1px", color: tk.onSurfV, margin: 0,
  };

  const wrap = (children) =>
    React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20 } }, children);

  /* ── Contact ── */
  if (type === "Contact") {
    return wrap(
      React.createElement("div", { style: cardStyle },
        React.createElement("div", {
          style: { width: 36, height: 36, borderRadius: "50%", background: dark ? "#1a3a5c" : "#d4e4f7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }
        }, React.createElement("span", { style: { fontSize: 14, fontWeight: 500, color: tk.sec, fontFamily: "'Google Sans',sans-serif" } }, "DH")),
        React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
          React.createElement("p", { style: { ...titleStyle, color: stroke ? tk.onSurf : tk.errName } }, "Danielle Holmes"),
          React.createElement("p", { style: subtitleStyle }, "View contact")
        )
      )
    );
  }

  /* ── Loading ── */
  if (type === "Loading") {
    return wrap(
      React.createElement("div", { style: cardStyle },
        React.createElement("style", null, SPINNER_CSS),
        React.createElement("div", { style: { position: "relative", width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" } },
          React.createElement("div", { className: "cfa-spinner", style: { borderColor: tk.skeleton, borderTopColor: tk.sec } }),
          React.createElement("div", { style: { position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" } },
            React.createElement(Sym, { name: "close", size: 20, color: tk.sec })
          )
        ),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4 } },
          React.createElement("div", { style: { width: 82, height: 14, borderRadius: 20, background: tk.skeleton } }),
          React.createElement("div", { style: { width: 44, height: 14, borderRadius: 20, background: tk.skeleton } })
        )
      )
    );
  }

  /* ── File ── */
  if (type === "File") {
    return wrap(
      React.createElement("div", { style: cardStyle },
        React.createElement(FileIconSlot, { T: tk }),
        React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
          React.createElement("p", { style: titleStyle }, "file_name.pdf"),
          React.createElement("p", { style: subtitleStyle }, "13KB · File")
        )
      )
    );
  }

  /* ── File receipt icon ── */
  if (type === "File receipt icon") {
    return React.createElement("div", { style: { display: "flex", alignItems: "flex-start", borderRadius: 20 } },
      React.createElement("div", { style: { ...cardStyle, alignItems: "flex-end" } },
        React.createElement(FileIconSlot, { T: tk }),
        React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
          React.createElement("p", { style: titleStyle }, "file_name.pdf"),
          React.createElement("p", { style: subtitleStyle }, "13KB · File")
        ),
        typeof ReadReceiptIcon !== "undefined"
          ? React.createElement("div", { style: { position: "absolute", bottom: 8, right: 8, width: 16, height: 16 } },
              React.createElement(ReadReceiptIcon, { mode: dark ? "Dark" : "Light", status: readReceiptStatus })
            )
          : null
      )
    );
  }

  /* ── File draft ── */
  if (type === "File draft") {
    return React.createElement("div", { style: { position: "relative", display: "inline-flex", flexDirection: "column", gap: 8 } },
      wrap(
        React.createElement("div", { style: cardStyle },
          React.createElement(FileIconSlot, { T: tk }),
          React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
            React.createElement("p", { style: titleStyle }, "file_name.pdf"),
            React.createElement("p", { style: subtitleStyle }, "13KB · File")
          )
        )
      ),
      React.createElement("div", {
        style: { position: "absolute", top: -12, right: -4, width: 24, height: 24, borderRadius: "50%", background: tk.onSurf, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }
      }, React.createElement(Sym, { name: "close", size: 16, color: tk.bg }))
    );
  }

  /* ── Photos card ── */
  if (type === "Photos card") {
    return wrap(
      React.createElement("div", { style: { ...cardStyle, padding: 8, alignItems: "center" } },
        React.createElement("div", { style: { width: 56, height: 56, borderRadius: 8, background: dark ? "#1a3050" : "#c5d8f0", flexShrink: 0 } }),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", flex: 1 } },
          React.createElement("p", { style: titleStyle }, "1 video"),
          React.createElement("p", { style: subtitleStyle }, "32 MB upload")
        ),
        React.createElement("div", {
          style: { width: 36, height: 36, borderRadius: "50%", background: tk.surfW, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }
        }, React.createElement(PhotosLogo, { size: 24 }))
      )
    );
  }

  return null;
}
