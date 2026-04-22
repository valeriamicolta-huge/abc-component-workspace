/* CardFileAttachmentsCategories — renderer.jsx
   Figma: 5L3DIB62Y0dFU3uVgLBeVK, node 11021:39653

   Globals injected by index.html:
     React, useState, useRef, useEffect, THEMES, S, useT, lum
     ReadReceiptIcon  ← from _shared/read-receipt-icon (declared in data.json dependencies)

   Props passed by the workspace:
     type              — "Contact" | "Loading" | "File" | "File receipt icon" | "File draft" | "Photos card"
     stroke            — boolean
     readReceiptStatus — "Sending" | "Sent" | "Delivered" | "Read"
     dark              — boolean (injected by workspace)

   Icon strategy: ALL icons are pure inline SVG paths.
   Google Symbols font ligatures (drive_pdf, close) do not render in this
   environment — they output the literal text. Every icon is hand-drawn as SVG.
*/

/* ── Wavy M3 circular progress spinner ───────────────────────────────────────
   Matches Figma node 11018:40533 (.circular-determinate ABC):
   Grey wavy track + blue wavy active arc, full rotation animation. */
const SPINNER_CSS = `
  @keyframes cfa-rotate { to { transform: rotate(360deg); } }
  .cfa-spin { animation: cfa-rotate 1.4s linear infinite; transform-origin: 18px 18px; }
`;

function WavySpinner({ trackColor, activeColor }) {
  const r = 15;
  const circ = 2 * Math.PI * r; /* ≈ 94.25 */
  /* Wavy dash pattern — alternating short/long dashes to mimic M3 wave texture */
  const waveDash = "3 1.5 5 1.5 3 1.5 7 1.5 3 1.5 5 1.5 3 1.5 7 1.5 3 1.5 5 1.5";

  return React.createElement("div", { style: { position: "relative", width: 36, height: 36, flexShrink: 0 } },
    React.createElement("style", null, SPINNER_CSS),
    /* Static wavy track */
    React.createElement("svg", {
      width: 36, height: 36, viewBox: "0 0 36 36", fill: "none",
      style: { position: "absolute", inset: 0 }
    },
      React.createElement("circle", {
        cx: 18, cy: 18, r: r,
        stroke: trackColor || "#dde3ea",
        strokeWidth: 3,
        strokeLinecap: "round",
        fill: "none",
        strokeDasharray: waveDash,
      })
    ),
    /* Rotating active arc */
    React.createElement("svg", {
      width: 36, height: 36, viewBox: "0 0 36 36", fill: "none",
      style: { position: "absolute", inset: 0 },
      className: "cfa-spin"
    },
      React.createElement("circle", {
        cx: 18, cy: 18, r: r,
        stroke: activeColor || "#00639b",
        strokeWidth: 3,
        strokeLinecap: "round",
        fill: "none",
        /* ~270° arc */
        strokeDasharray: `${circ * 0.7} ${circ * 0.3}`,
        strokeDashoffset: circ * 0.25,
        strokeDasharray: waveDash.split(" ").map((v, i) =>
          i % 2 === 0 ? String(parseFloat(v) * 2.2) : v
        ).join(" "),
      })
    )
  );
}

/* ── Icon: × close ────────────────────────────────────────────────────────── */
function IconClose({ size, color }) {
  const s = size || 16;
  const p = s * 0.22;
  const e = s - p;
  return React.createElement("svg", {
    width: s, height: s, viewBox: `0 0 ${s} ${s}`, fill: "none",
    style: { display: "block", flexShrink: 0 }
  },
    React.createElement("line", { x1: p, y1: p, x2: e, y2: e, stroke: color || "#ffffff", strokeWidth: 1.8, strokeLinecap: "round" }),
    React.createElement("line", { x1: e, y1: p, x2: p, y2: e, stroke: color || "#ffffff", strokeWidth: 1.8, strokeLinecap: "round" })
  );
}

/* ── Icon: drive_pdf ──────────────────────────────────────────────────────────
   Drawn to match the Google Drive PDF icon visual:
   - White document body with folded top-right corner
   - Red "PDF" label badge at the bottom of the document */
function IconDrivePDF({ size, color }) {
  const s = size || 20;
  /* Document shape in a 20×20 canvas */
  return React.createElement("svg", {
    width: s, height: s, viewBox: "0 0 20 20", fill: "none",
    style: { display: "block", flexShrink: 0 }
  },
    /* Document body — white page with folded corner */
    React.createElement("path", {
      d: "M3 2.5C3 1.67 3.67 1 4.5 1H12L17 6V17.5C17 18.33 16.33 19 15.5 19H4.5C3.67 19 3 18.33 3 17.5V2.5Z",
      fill: color || "#ffffff"
    }),
    /* Folded corner triangle */
    React.createElement("path", {
      d: "M12 1L17 6H12.5C12.22 6 12 5.78 12 5.5V1Z",
      fill: color || "#ffffff",
      opacity: 0.5
    }),
    /* PDF badge — red pill at bottom */
    React.createElement("rect", { x: 2, y: 12, width: 16, height: 6.5, rx: 1.5, fill: "#EA4335" }),
    React.createElement("text", {
      x: 10, y: 17.2,
      textAnchor: "middle",
      fontSize: 4.5,
      fontWeight: 700,
      fontFamily: "Arial, sans-serif",
      fill: "#ffffff",
      letterSpacing: "0.3"
    }, "PDF")
  );
}

/* ── Google Photos logo ───────────────────────────────────────────────────── */
function PhotosLogo({ size }) {
  const s = size || 24;
  return React.createElement("svg", {
    width: s, height: s, viewBox: "0 0 48 48",
    style: { display: "block", flexShrink: 0 }
  },
    React.createElement("path", { d: "M2 24 Q2 2 24 2 L24 24 Z",  fill: "#FBBC04" }),
    React.createElement("path", { d: "M24 2 Q46 2 46 24 L24 24 Z", fill: "#EA4335" }),
    React.createElement("path", { d: "M46 24 Q46 46 24 46 L24 24 Z",fill: "#4285F4" }),
    React.createElement("path", { d: "M24 46 Q2 46 2 24 L24 24 Z", fill: "#34A853" })
  );
}

/* ── File icon slot — 36×36dp secondary rounded square + drive_pdf icon ───── */
function FileIconSlot({ tk }) {
  return React.createElement("div", {
    style: { position: "relative", width: 36, height: 36, flexShrink: 0 }
  },
    /* Secondary colour rounded square background */
    React.createElement("div", {
      style: { position: "absolute", inset: 0, background: tk.sec, borderRadius: 12 }
    }),
    /* drive_pdf icon centred */
    React.createElement("div", {
      style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
    },
      React.createElement(IconDrivePDF, { size: 20, color: tk.onSec })
    )
  );
}

/* ── Token map ────────────────────────────────────────────────────────────── */
function getTokens(dark) {
  return dark ? {
    bg:        "#1e1f20",
    border:    "#444746",
    onSurf:    "#e3e3e3",
    onSurfV:   "#c4c7c5",
    errName:   "#f2b8b5",
    sec:       "#7fcfff",
    onSec:     "#003549",
    surfW:     "#131314",
    skeleton:  "#333537",
    spinTrack: "#333537",
    spinArc:   "#7fcfff",
    removeBg:  "#e3e3e3",
    removeX:   "#1e1f20",
  } : {
    bg:        "#f0f4f9",
    border:    "#c4c7c5",
    onSurf:    "#1f1f1f",
    onSurfV:   "#444746",
    errName:   "#8c1d18",
    sec:       "#00639b",
    onSec:     "#ffffff",
    surfW:     "#ffffff",
    skeleton:  "#dde3ea",
    spinTrack: "#dde3ea",
    spinArc:   "#00639b",
    removeBg:  "#1f1f1f",
    removeX:   "#ffffff",
  };
}

/* ── Main renderer ────────────────────────────────────────────────────────── */
function Renderer({ type, stroke, readReceiptStatus, dark }) {
  type               = type || "File";
  stroke             = !!stroke;
  readReceiptStatus  = readReceiptStatus || "Read";

  const [photoSrc, setPhotoSrc] = useState(null);
  const photoInputRef = useRef(null);

  const tk = getTokens(dark);

  const cardStyle = {
    background:   tk.bg,
    borderRadius: 20,
    display:      "flex",
    alignItems:   "center",
    padding:      "18px 16px",
    gap:          12,
    flexShrink:   0,
    position:     "relative",
    border:       stroke ? `1px solid ${tk.border}` : "none",
    boxSizing:    "border-box",
  };

  const titleStyle = {
    fontFamily:          "'Google Sans Flex','Google Sans',sans-serif",
    fontWeight:          500,
    fontSize:            14,
    lineHeight:          "20px",
    color:               tk.onSurf,
    margin:              0,
    fontFeatureSettings: "'ss02' 1",
  };

  const subtitleStyle = {
    fontFamily:    "'Google Sans Text','Google Sans',sans-serif",
    fontWeight:    400,
    fontSize:      12,
    lineHeight:    "16px",
    letterSpacing: "0.1px",
    color:         tk.onSurfV,
    margin:        0,
  };

  const wrap = (children) =>
    React.createElement("div", {
      style: { display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20 }
    }, children);

  /* ── Contact ─────────────────────────────────────────────────────────── */
  if (type === "Contact") {
    return wrap(
      React.createElement("div", { style: cardStyle },
        React.createElement("div", {
          style: {
            width: 36, height: 36, borderRadius: "50%",
            background: dark ? "#1a3a5c" : "#d4e4f7",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }
        },
          React.createElement("span", {
            style: { fontSize: 14, fontWeight: 500, color: tk.sec, fontFamily: "'Google Sans',sans-serif" }
          }, "DH")
        ),
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
        React.createElement("div", {
          style: { position: "relative", width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }
        },
          React.createElement(WavySpinner, { trackColor: tk.spinTrack, activeColor: tk.spinArc }),
          /* × icon centred inside spinner */
          React.createElement("div", { style: { position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" } },
            React.createElement(IconClose, { size: 16, color: tk.spinArc })
          )
        ),
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
    /* Card sits on surface-container (#f0f4f9) — a light surface.
       Read receipt mode follows the workspace dark toggle. */
    return React.createElement("div", { style: { display: "flex", alignItems: "flex-start", borderRadius: 20 } },
      React.createElement("div", { style: { ...cardStyle, alignItems: "flex-end" } },
        React.createElement(FileIconSlot, { tk }),
        React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
          React.createElement("p", { style: titleStyle }, "file_name.pdf"),
          React.createElement("p", { style: subtitleStyle }, "13KB · File")
        ),
        typeof ReadReceiptIcon !== "undefined"
          ? React.createElement("div", {
              style: { position: "absolute", bottom: 8, right: 8, width: 16, height: 16 }
            },
              React.createElement(ReadReceiptIcon, {
                mode: dark ? "Dark" : "Light",
                status: readReceiptStatus
              })
            )
          : null
      )
    );
  }

  /* ── File draft ──────────────────────────────────────────────────────── */
  if (type === "File draft") {
    return React.createElement("div", {
      style: { position: "relative", display: "inline-flex", flexDirection: "column", gap: 8 }
    },
      wrap(
        React.createElement("div", { style: cardStyle },
          React.createElement(FileIconSlot, { tk }),
          React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
            React.createElement("p", { style: titleStyle }, "file_name.pdf"),
            React.createElement("p", { style: subtitleStyle }, "13KB · File")
          )
        )
      ),
      /* Remove badge — 24×24dp dark circle with × */
      React.createElement("div", {
        style: {
          position: "absolute", top: -12, right: -4,
          width: 24, height: 24, borderRadius: "50%",
          background: tk.removeBg,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
        }
      },
        React.createElement(IconClose, { size: 13, color: tk.removeX })
      )
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
        /* Thumbnail — tappable upload area */
        React.createElement("div", {
          onClick: () => photoInputRef.current && photoInputRef.current.click(),
          style: {
            width: 56, height: 56, borderRadius: 8, flexShrink: 0,
            background: photoSrc ? "none" : (dark ? "#1a3050" : "#c5d8f0"),
            overflow: "hidden", cursor: "pointer", position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1.5px dashed ${dark ? "#7fcfff" : "#00639b"}`,
            boxSizing: "border-box",
          }
        },
          photoSrc
            ? React.createElement("img", {
                src: photoSrc,
                style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
              })
            : React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none" },
                React.createElement("path", {
                  d: "M12 5V19M5 12H19",
                  stroke: dark ? "#7fcfff" : "#00639b",
                  strokeWidth: 1.5, strokeLinecap: "round"
                })
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
        /* Photos logo — white circle */
        React.createElement("div", {
          style: {
            width: 36, height: 36, borderRadius: "50%",
            background: tk.surfW,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
          }
        },
          React.createElement(PhotosLogo, { size: 24 })
        )
      )
    );
  }

  return null;
}
