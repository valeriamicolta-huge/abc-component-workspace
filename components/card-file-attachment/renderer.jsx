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

/* ── Wavy M3 spinner animation ───────────────────────────────────────────────
   Matches Figma node 11018:40533 (.circular-determinate ABC):
   - Light grey wavy track ring
   - Blue wavy active indicator arc that rotates
   The wave effect is achieved by drawing an SVG circle with a sinusoidal
   stroke-dasharray that creates the ripple appearance, matching the M3 spec. */
const SPINNER_CSS = `
  @keyframes cfa-rotate { to { transform: rotate(360deg); } }
  @keyframes cfa-wave-dash {
    0%   { stroke-dashoffset: 0; }
    50%  { stroke-dashoffset: -32; }
    100% { stroke-dashoffset: -64; }
  }
  .cfa-spinner-wrap {
    width: 36px; height: 36px; position: relative; flex-shrink: 0;
    animation: cfa-rotate 1.4s linear infinite;
  }
`;

function WavySpinner({ trackColor, activeColor }) {
  /* 36×36dp, cx=18 cy=18 r=15.5 → circumference ≈ 97.4
     Track: full ring, wavy appearance via filter
     Active indicator: ~75% arc (≈73dp) with wavy stroke */
  const r = 15.5;
  const circ = 2 * Math.PI * r; /* ≈ 97.4 */
  return React.createElement("div", { className: "cfa-spinner-wrap" },
    React.createElement("style", null, SPINNER_CSS),
    React.createElement("svg", {
      width: 36, height: 36, viewBox: "0 0 36 36", fill: "none",
      style: { position: "absolute", inset: 0 }
    },
      /* Track — full wavy ring */
      React.createElement("circle", {
        cx: 18, cy: 18, r: r,
        stroke: trackColor || "#dde3ea",
        strokeWidth: 3.5,
        strokeLinecap: "round",
        fill: "none",
        /* Wavy effect: alternating dash pattern that simulates wave */
        strokeDasharray: "4 2 6 2 4 2 8 2 4 2 6 2 4 2 8 2 4 2 6 2",
      }),
      /* Active indicator — ~270° arc in secondary blue */
      React.createElement("circle", {
        cx: 18, cy: 18, r: r,
        stroke: activeColor || "#00639b",
        strokeWidth: 3.5,
        strokeLinecap: "round",
        fill: "none",
        strokeDasharray: `${circ * 0.72} ${circ * 0.28}`,
        strokeDashoffset: circ * 0.25,
        style: { transformOrigin: "18px 18px" }
      })
    )
  );
}

/* ── Google Photos logo — pure SVG, exact brand colors ───────────────────── */
function PhotosLogo({ size }) {
  const s = size || 24;
  const h = s / 2;
  return React.createElement("svg", { width: s, height: s, viewBox: "0 0 48 48", style: { display: "block", flexShrink: 0 } },
    React.createElement("path", { d: "M2 24 Q2 2 24 2 L24 24 Z",  fill: "#FBBC04" }),
    React.createElement("path", { d: "M24 2 Q46 2 46 24 L24 24 Z", fill: "#EA4335" }),
    React.createElement("path", { d: "M46 24 Q46 46 24 46 L24 24 Z",fill: "#4285F4" }),
    React.createElement("path", { d: "M24 46 Q2 46 2 24 L24 24 Z", fill: "#34A853" })
  );
}

/* ── Inline SVG icons (replaces Google Symbols font ligatures) ───────────────
   Issue: Google Symbols font renders the ligature name as text in this env.
   Solution: Use inline SVG paths for each needed icon. */

function IconClose({ size, color }) {
  const s = size || 20;
  return React.createElement("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", style: { display: "block", flexShrink: 0 } },
    React.createElement("path", { d: "M18 6L6 18M6 6L18 18", stroke: color || "#ffffff", strokeWidth: 2, strokeLinecap: "round" })
  );
}

function IconPDF({ color }) {
  /* drive_pdf — simplified file + PDF badge icon */
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", style: { display: "block" } },
    React.createElement("rect", { x: 3, y: 1, width: 11, height: 14, rx: 1.5, fill: color || "#ffffff", opacity: 0.9 }),
    React.createElement("path", { d: "M10 1L14 5H10V1Z", fill: color || "#ffffff", opacity: 0.6 }),
    React.createElement("rect", { x: 1, y: 11, width: 18, height: 8, rx: 2, fill: color || "#ffffff" }),
    React.createElement("text", { x: 10, y: 18, textAnchor: "middle", fontSize: 5.5, fontWeight: 700, fontFamily: "sans-serif", fill: "#00639b" }, "PDF")
  );
}

/* ── File icon slot — 36×36dp secondary square + PDF icon ────────────────── */
function FileIconSlot({ tk }) {
  return React.createElement("div", { style: { position: "relative", width: 36, height: 36, flexShrink: 0 } },
    React.createElement("div", { style: { position: "absolute", inset: 0, background: tk.sec, borderRadius: 12 } }),
    React.createElement("div", {
      style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", display: "flex", alignItems: "center", justifyContent: "center" }
    }, React.createElement(IconPDF, { color: tk.onSec }))
  );
}

/* ── Token helpers ───────────────────────────────────────────────────────── */
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
    spinTrack:"#333537",
    spinArc:  "#7fcfff",
    removeBg: "#e3e3e3",
    removeX:  "#1e1f20",
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
    spinTrack:"#dde3ea",
    spinArc:  "#00639b",
    removeBg: "#1f1f1f",
    removeX:  "#ffffff",
  };
}

/* ── Main renderer ───────────────────────────────────────────────────────── */
function Renderer({ type, stroke, readReceiptStatus, dark }) {
  type = type || "File";
  stroke = !!stroke;
  readReceiptStatus = readReceiptStatus || "Read";

  /* Photo upload state for Photos card */
  const [photoSrc, setPhotoSrc] = useState(null);
  const photoInputRef = useRef(null);

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
    React.createElement("div", {
      style: { display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20 }
    }, children);

  /* ── Contact ─────────────────────────────────────────────────────────── */
  if (type === "Contact") {
    return wrap(
      React.createElement("div", { style: cardStyle },
        /* Avatar initials circle */
        React.createElement("div", {
          style: { width: 36, height: 36, borderRadius: "50%", background: dark ? "#1a3a5c" : "#d4e4f7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }
        }, React.createElement("span", {
          style: { fontSize: 14, fontWeight: 500, color: tk.sec, fontFamily: "'Google Sans',sans-serif" }
        }, "DH")),
        React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
          React.createElement("p", { style: { ...titleStyle, color: stroke ? tk.onSurf : tk.errName } }, "Danielle Holmes"),
          React.createElement("p", { style: subtitleStyle }, "View contact")
        )
      )
    );
  }

  /* ── Loading ─────────────────────────────────────────────────────────── */
  if (type === "Loading") {
    return wrap(
      React.createElement("div", { style: cardStyle },
        /* Wavy M3 spinner + close icon */
        React.createElement("div", { style: { position: "relative", width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" } },
          React.createElement(WavySpinner, { trackColor: tk.spinTrack, activeColor: tk.spinArc }),
          React.createElement("div", { style: { position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" } },
            React.createElement(IconClose, { size: 18, color: tk.spinArc })
          )
        ),
        /* Skeleton lines */
        React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4 } },
          React.createElement("div", { style: { width: 82, height: 14, borderRadius: 20, background: tk.skeleton } }),
          React.createElement("div", { style: { width: 44, height: 14, borderRadius: 20, background: tk.skeleton } })
        )
      )
    );
  }

  /* ── File ────────────────────────────────────────────────────────────── */
  if (type === "File") {
    return wrap(
      React.createElement("div", { style: cardStyle },
        React.createElement(FileIconSlot, { tk }),
        React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
          React.createElement("p", { style: titleStyle }, "file_name.pdf"),
          React.createElement("p", { style: subtitleStyle }, "13KB · File")
        )
      )
    );
  }

  /* ── File receipt icon ───────────────────────────────────────────────── */
  if (type === "File receipt icon") {
    return React.createElement("div", { style: { display: "flex", alignItems: "flex-start", borderRadius: 20 } },
      React.createElement("div", { style: { ...cardStyle, alignItems: "flex-end" } },
        React.createElement(FileIconSlot, { tk }),
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

  /* ── File draft ──────────────────────────────────────────────────────── */
  if (type === "File draft") {
    return React.createElement("div", { style: { position: "relative", display: "inline-flex", flexDirection: "column", gap: 8 } },
      wrap(
        React.createElement("div", { style: cardStyle },
          React.createElement(FileIconSlot, { tk }),
          React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
            React.createElement("p", { style: titleStyle }, "file_name.pdf"),
            React.createElement("p", { style: subtitleStyle }, "13KB · File")
          )
        )
      ),
      /* Remove badge */
      React.createElement("div", {
        style: { position: "absolute", top: -12, right: -4, width: 24, height: 24, borderRadius: "50%", background: tk.removeBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }
      }, React.createElement(IconClose, { size: 14, color: tk.removeX }))
    );
  }

  /* ── Photos card ─────────────────────────────────────────────────────── */
  if (type === "Photos card") {
    const handlePhotoChange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoSrc(ev.target.result);
      reader.readAsDataURL(file);
    };

    return wrap(
      React.createElement("div", { style: { ...cardStyle, padding: 8, alignItems: "center" } },
        /* Video thumbnail — tappable upload area */
        React.createElement("div", {
          onClick: () => photoInputRef.current && photoInputRef.current.click(),
          style: {
            width: 56, height: 56, borderRadius: 8, flexShrink: 0,
            background: photoSrc ? "none" : (dark ? "#1a3050" : "#c5d8f0"),
            overflow: "hidden", cursor: "pointer", position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
          }
        },
          photoSrc
            ? React.createElement("img", { src: photoSrc, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
            : React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none" },
                React.createElement("path", { d: "M12 5V19M5 12H19", stroke: dark ? "#7fcfff" : "#00639b", strokeWidth: 1.5, strokeLinecap: "round" })
              )
        ),
        /* Hidden file input */
        React.createElement("input", {
          ref: photoInputRef,
          type: "file",
          accept: "image/*",
          onChange: handlePhotoChange,
          style: { display: "none" }
        }),
        /* Content */
        React.createElement("div", { style: { display: "flex", flexDirection: "column", flex: 1 } },
          React.createElement("p", { style: titleStyle }, "1 video"),
          React.createElement("p", { style: subtitleStyle }, "32 MB upload")
        ),
        /* Photos logo circle */
        React.createElement("div", {
          style: { width: 36, height: 36, borderRadius: "50%", background: tk.surfW, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }
        }, React.createElement(PhotosLogo, { size: 24 }))
      )
    );
  }

  return null;
}
