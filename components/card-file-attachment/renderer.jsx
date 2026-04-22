/* CardFileAttachmentsCategories — renderer.jsx
   Figma: 5L3DIB62Y0dFU3uVgLBeVK, node 11021:39653

   Globals injected by index.html:
     React, useState, useRef, useEffect, THEMES, S, useT, lum
     ReadReceiptIcon  from _shared/read-receipt-icon (declared in data.json dependencies)

   Props passed by the workspace:
     type              "Contact" | "Loading" | "File" | "File receipt icon" | "File draft" | "Photos card"
     stroke            boolean
     readReceiptStatus "Sending" | "Sent" | "Delivered" | "Read"
     dark              boolean (injected by workspace)

   IMPORTANT — Babel-safe rules applied throughout this file:
     - No template literals (backticks). String concatenation only.
     - No shorthand object properties { r } — always { r: r }.
     - No optional chaining.
     - All icons are pure inline SVG — zero Google Symbols font dependency.

   File receipt icon dark mode rule:
     Always inverted vs workspace: Light workspace = Dark card, Dark workspace = Light card.
*/

/* Wavy M3 circular spinner — matches Figma node 11018:40533 */
var SPINNER_CSS = "@keyframes cfa-rotate { to { transform: rotate(360deg); } } .cfa-spin { animation: cfa-rotate 1.4s linear infinite; transform-origin: 18px 18px; }";

function WavySpinner(props) {
  var trackColor  = props.trackColor  || "#dde3ea";
  var activeColor = props.activeColor || "#00639b";
  var spinR  = 15;
  var circ   = 2 * Math.PI * spinR;
  var arcOn  = String(Math.round(circ * 0.7 * 10) / 10);
  var arcOff = String(Math.round(circ * 0.3 * 10) / 10);
  var arcDash   = arcOn + " " + arcOff;
  var arcOffset = circ * 0.25;
  var waveDash  = "3 1.5 5 1.5 3 1.5 7 1.5 3 1.5 5 1.5 3 1.5 7 1.5";

  return React.createElement("div", { style: { position: "relative", width: 36, height: 36, flexShrink: 0 } },
    React.createElement("style", null, SPINNER_CSS),
    React.createElement("svg", { width: 36, height: 36, viewBox: "0 0 36 36", fill: "none", style: { position: "absolute", inset: 0 } },
      React.createElement("circle", { cx: 18, cy: 18, r: spinR, stroke: trackColor, strokeWidth: 3, strokeLinecap: "round", fill: "none", strokeDasharray: waveDash })
    ),
    React.createElement("svg", { width: 36, height: 36, viewBox: "0 0 36 36", fill: "none", style: { position: "absolute", inset: 0 }, className: "cfa-spin" },
      React.createElement("circle", { cx: 18, cy: 18, r: spinR, stroke: activeColor, strokeWidth: 3, strokeLinecap: "round", fill: "none", strokeDasharray: arcDash, strokeDashoffset: arcOffset })
    )
  );
}

/* Icon: X close — two crossing lines */
function IconClose(props) {
  var s  = props.size  || 16;
  var color = props.color || "#ffffff";
  var p  = Math.round(s * 0.22);
  var e  = s - p;
  var vb = "0 0 " + s + " " + s;
  return React.createElement("svg", { width: s, height: s, viewBox: vb, fill: "none", style: { display: "block", flexShrink: 0 } },
    React.createElement("line", { x1: p, y1: p, x2: e, y2: e, stroke: color, strokeWidth: 1.8, strokeLinecap: "round" }),
    React.createElement("line", { x1: e, y1: p, x2: p, y2: e, stroke: color, strokeWidth: 1.8, strokeLinecap: "round" })
  );
}

/* Icon: drive_pdf — white "PDF" text on secondary blue square
   Matches Figma node 15376:11927: white text label, no document outline */
function IconDrivePDF(props) {
  var color = props.color || "#ffffff";
  return React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", style: { display: "block", flexShrink: 0 } },
    React.createElement("text", { x: 10, y: 13.5, textAnchor: "middle", fontSize: 7, fontWeight: 700, fontFamily: "Arial,sans-serif", fill: color, letterSpacing: "0.5" }, "PDF")
  );
}

/* Google Photos logo — four quadrant paths */
function PhotosLogo(props) {
  var s = props.size || 24;
  return React.createElement("svg", { width: s, height: s, viewBox: "0 0 48 48", style: { display: "block", flexShrink: 0 } },
    React.createElement("path", { d: "M2 24 Q2 2 24 2 L24 24 Z",   fill: "#FBBC04" }),
    React.createElement("path", { d: "M24 2 Q46 2 46 24 L24 24 Z",  fill: "#EA4335" }),
    React.createElement("path", { d: "M46 24 Q46 46 24 46 L24 24 Z", fill: "#4285F4" }),
    React.createElement("path", { d: "M24 46 Q2 46 2 24 L24 24 Z",  fill: "#34A853" })
  );
}

/* 36x36dp secondary rounded square + "PDF" text — matches Figma exactly */
function FileIconSlot(props) {
  var tk = props.tk;
  return React.createElement("div", { style: { position: "relative", width: 36, height: 36, flexShrink: 0 } },
    React.createElement("div", { style: { position: "absolute", inset: 0, background: tk.sec, borderRadius: 12 } }),
    React.createElement("div", { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", alignItems: "center", justifyContent: "center" } },
      React.createElement(IconDrivePDF, { color: tk.onSec })
    )
  );
}

/* Token maps */
function getTokens(dark) {
  if (dark) {
    return { bg: "#1e1f20", border: "#444746", onSurf: "#e3e3e3", onSurfV: "#c4c7c5", errName: "#f2b8b5", sec: "#7fcfff", onSec: "#003549", surfW: "#131314", skeleton: "#333537", spinTrack: "#333537", spinArc: "#7fcfff", removeBg: "#e3e3e3", removeX: "#1e1f20" };
  }
  return { bg: "#f0f4f9", border: "#c4c7c5", onSurf: "#1f1f1f", onSurfV: "#444746", errName: "#8c1d18", sec: "#00639b", onSec: "#ffffff", surfW: "#ffffff", skeleton: "#dde3ea", spinTrack: "#dde3ea", spinArc: "#00639b", removeBg: "#1f1f1f", removeX: "#ffffff" };
}

/* Main renderer */
function Renderer(props) {
  var type              = props.type              || "File";
  var stroke            = !!props.stroke;
  var readReceiptStatus = props.readReceiptStatus || "Read";
  var dark              = !!props.dark;

  var photoState      = useState(null);
  var photoSrc        = photoState[0];
  var setPhotoSrc     = photoState[1];
  var photoInputRef   = useRef(null);

  var tk      = getTokens(dark);
  /* File receipt icon always uses inverted tokens */
  var rTk     = getTokens(!dark);

  var cardBase = {
    borderRadius: 20,
    display:      "flex",
    alignItems:   "center",
    padding:      "18px 16px",
    gap:          12,
    flexShrink:   0,
    position:     "relative",
    boxSizing:    "border-box",
  };

  var titleBase = {
    fontFamily:          "'Google Sans Flex','Google Sans',sans-serif",
    fontWeight:          500,
    fontSize:            14,
    lineHeight:          "20px",
    margin:              0,
    fontFeatureSettings: "'ss02' 1",
  };

  var subtitleBase = {
    fontFamily:    "'Google Sans Text','Google Sans',sans-serif",
    fontWeight:    400,
    fontSize:      12,
    lineHeight:    "16px",
    letterSpacing: "0.1px",
    margin:        0,
  };

  var titleStyle    = Object.assign({}, titleBase,    { color: tk.onSurf });
  var subtitleStyle = Object.assign({}, subtitleBase, { color: tk.onSurfV });
  var rTitleStyle   = Object.assign({}, titleBase,    { color: rTk.onSurf });
  var rSubtitleStyle= Object.assign({}, subtitleBase, { color: rTk.onSurfV });

  function wrap(children) {
    return React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20 } }, children);
  }

  function cardStyle(overrides) {
    return Object.assign({}, cardBase, { background: tk.bg, border: stroke ? "1px solid " + tk.border : "none" }, overrides || {});
  }

  function rCardStyle(overrides) {
    return Object.assign({}, cardBase, { background: rTk.bg, border: stroke ? "1px solid " + rTk.border : "none" }, overrides || {});
  }

  /* Contact */
  if (type === "Contact") {
    return wrap(
      React.createElement("div", { style: cardStyle() },
        /* Avatar shared component — _shared/avatar/component.jsx */
        typeof Avatar !== "undefined"
          ? React.createElement("div", { style: { width: 36, height: 36, flexShrink: 0 } },
              React.createElement(Avatar, { type: "Single Avatar", dark: dark })
            )
          : React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: dark ? "#1a3a5c" : "#d4e4f7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } },
              React.createElement("span", { style: { fontSize: 14, fontWeight: 500, color: tk.sec, fontFamily: "'Google Sans',sans-serif" } }, "DH")
            ),
        React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
          React.createElement("p", { style: Object.assign({}, titleStyle, { color: stroke ? tk.onSurf : tk.errName }) }, "Danielle Holmes"),
          React.createElement("p", { style: subtitleStyle }, "View contact")
        )
      )
    );
  }

  /* Loading */
  if (type === "Loading") {
    return wrap(
      React.createElement("div", { style: cardStyle() },
        React.createElement("div", { style: { position: "relative", width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" } },
          React.createElement(WavySpinner, { trackColor: tk.spinTrack, activeColor: tk.spinArc }),
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

  /* File */
  if (type === "File") {
    return wrap(
      React.createElement("div", { style: cardStyle() },
        React.createElement(FileIconSlot, { tk: tk }),
        React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
          React.createElement("p", { style: titleStyle }, "file_name.pdf"),
          React.createElement("p", { style: subtitleStyle }, "13KB · File")
        )
      )
    );
  }

  /* File receipt icon — always inverted vs workspace */
  if (type === "File receipt icon") {
    return React.createElement("div", { style: { display: "flex", alignItems: "flex-start", borderRadius: 20 } },
      React.createElement("div", { style: rCardStyle({ alignItems: "flex-end" }) },
        React.createElement(FileIconSlot, { tk: rTk }),
        React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
          React.createElement("p", { style: rTitleStyle }, "file_name.pdf"),
          React.createElement("p", { style: rSubtitleStyle }, "13KB · File")
        ),
        typeof ReadReceiptIcon !== "undefined"
          ? React.createElement("div", { style: { position: "absolute", bottom: 8, right: 8, width: 16, height: 16 } },
              React.createElement(ReadReceiptIcon, { mode: dark ? "Light" : "Dark", status: readReceiptStatus })
            )
          : null
      )
    );
  }

  /* File draft */
  if (type === "File draft") {
    return React.createElement("div", { style: { position: "relative", display: "inline-flex", flexDirection: "column", gap: 8 } },
      wrap(
        React.createElement("div", { style: cardStyle() },
          React.createElement(FileIconSlot, { tk: tk }),
          React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
            React.createElement("p", { style: titleStyle }, "file_name.pdf"),
            React.createElement("p", { style: subtitleStyle }, "13KB · File")
          )
        )
      ),
      React.createElement("div", { style: { position: "absolute", top: -12, right: -4, width: 24, height: 24, borderRadius: "50%", background: tk.removeBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } },
        React.createElement(IconClose, { size: 13, color: tk.removeX })
      )
    );
  }

  /* Photos card */
  if (type === "Photos card") {
    function handlePhotoChange(e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(ev) { setPhotoSrc(ev.target.result); };
      reader.readAsDataURL(file);
    }

    return wrap(
      React.createElement("div", { style: cardStyle({ padding: 8, alignItems: "center" }) },
        React.createElement("div", {
          onClick: function() { if (photoInputRef.current) photoInputRef.current.click(); },
          style: { width: 56, height: 56, borderRadius: 8, flexShrink: 0, background: photoSrc ? "none" : (dark ? "#1a3050" : "#c5d8f0"), overflow: "hidden", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px dashed " + (dark ? "#7fcfff" : "#00639b"), boxSizing: "border-box" }
        },
          photoSrc
            ? React.createElement("img", { src: photoSrc, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
            : React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none" },
                React.createElement("path", { d: "M12 5V19M5 12H19", stroke: dark ? "#7fcfff" : "#00639b", strokeWidth: 1.5, strokeLinecap: "round" })
              )
        ),
        React.createElement("input", { ref: photoInputRef, type: "file", accept: "image/*", onChange: handlePhotoChange, style: { display: "none" } }),
        React.createElement("div", { style: { display: "flex", flexDirection: "column", flex: 1 } },
          React.createElement("p", { style: titleStyle }, "1 video"),
          React.createElement("p", { style: subtitleStyle }, "32 MB upload")
        ),
        React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: tk.surfW, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } },
          React.createElement(PhotosLogo, { size: 24 })
        )
      )
    );
  }

  return null;
}
