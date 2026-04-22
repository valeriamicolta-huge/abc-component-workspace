import { useState } from "react";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
// Exact paths from uploaded SVG files. Rendered as single self-contained SVGs.

function DoubleCheckIcon({ color = "#ffffff" }) {
  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
      <path d="M3.05932 8.22417C2.81912 8.22417 2.59163 8.11348 2.44739 7.92486L0.150879 4.92187C-0.100758 4.59287 -0.0302234 4.12845 0.307199 3.88356C0.645258 3.63867 1.12248 3.70731 1.37412 4.03569L2.99705 6.15807L6.64261 0.354912C6.86248 0.00551026 7.33144 -0.104567 7.6911 0.108784C8.05013 0.322754 8.16388 0.77914 7.94401 1.12916L3.71002 7.86921C3.57785 8.07947 3.34718 8.21243 3.09427 8.22356C3.08284 8.22356 3.07076 8.22417 3.05932 8.22417Z" fill={color} />
      <path d="M6.98576 8.22417C6.85041 8.22417 6.71315 8.18893 6.5886 8.11534C6.22958 7.90137 6.11583 7.44498 6.3357 7.09496L10.5697 0.354912C10.7895 0.00551026 11.2585 -0.104567 11.6182 0.108784C11.9772 0.322754 12.0909 0.77914 11.8711 1.12916L7.63709 7.86921C7.49348 8.09802 7.24248 8.22417 6.98576 8.22417Z" fill={color} />
    </svg>
  );
}

function SingleCheckIcon({ color = "#ffffff" }) {
  // Same 12×9 viewBox as DoubleCheckIcon so centering math is identical.
  // The path fits inside the left ~8px of the canvas; we shift it right by 2px
  // (translate(2,0)) so the visual glyph sits centered in the 12-wide box.
  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
      <g transform="translate(2, 0)">
        <path d="M3.05932 8.22417C2.81912 8.22417 2.59163 8.11348 2.44739 7.92486L0.150879 4.92187C-0.100758 4.59287 -0.0302234 4.12845 0.307199 3.88356C0.645258 3.63867 1.12248 3.70731 1.37412 4.03569L2.99705 6.15807L6.64261 0.354912C6.86248 0.00551026 7.33144 -0.104567 7.6911 0.108784C8.05013 0.322754 8.16388 0.77914 7.94401 1.12916L3.71002 7.86921C3.57785 8.07947 3.34718 8.21243 3.09427 8.22356C3.08284 8.22356 3.07076 8.22417 3.05932 8.22417Z" fill={color} />
      </g>
    </svg>
  );
}

function SendingDots({ color = "rgba(255,255,255,0.7)" }) {
  return (
    <div style={{ display: "flex", gap: 1.5, alignItems: "center", justifyContent: "center" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ width: 2.5, height: 2.5, borderRadius: "50%", background: color, flexShrink: 0 }} />
      ))}
    </div>
  );
}

// ─── Circle styles — pure CSS, zero image dependencies ───────────────────────
//
// Each circle variant is defined by:
//   fill:         background color (null = transparent)
//   stroke:       border color     (null = no border)
//   strokeWidth:  border width in px
//
// All values pulled from Figma variable definitions on each variant node.
//
// Naming: getCircleStyle(mode, type, isRead)

function getCircleStyle(mode, type, isRead) {
  const d = mode === "Dark";

  if (isRead) {
    // READ — filled circles
    // Light: primary = #0b57d0 (on-bubble, voice RCS, no-container, link preview)
    // Dark:  primary = #a8c7fa (on-bubble, voice RCS)
    // Light/Dark Media: surface white / dark inverse-on-surface
    // Homescreen Light: #0b57d0, Dark: #a8c7fa
    // Voice Colorful / Card File: on-surface-variant fill

    switch (type) {
      case "On bubble":
        return d
          ? { fill: "#a8c7fa",  stroke: null } // primary dark
          : { fill: "#0b57d0",  stroke: null }; // primary light

      case "No container":
        return d
          ? { fill: "#303030",  stroke: null }  // inverse-on-surface dark
          : { fill: "#f2f2f2",  stroke: null };  // inverse-on-surface light

      case "Media":
        return d
          ? { fill: "#303030",  stroke: null }
          : { fill: "#ffffff",  stroke: null };  // surface white

      case "Voice moods RCS":
        return d
          ? { fill: "#a8c7fa",  stroke: null }
          : { fill: "#0b57d0",  stroke: null };

      case "Voice moods Colorful":
        return d
          ? { fill: "#303030",  stroke: null }
          : { fill: "#f2f2f2",  stroke: null };

      case "Card File attachments":
        return d
          ? { fill: "#303030",  stroke: null }
          : { fill: "#f2f2f2",  stroke: null };

      case "Homescreen":
        return d
          ? { fill: "#a8c7fa",  stroke: null }
          : { fill: "#0b57d0",  stroke: null };

      case "Link preview card":
        return d
          ? { fill: "#303030",  stroke: null }
          : { fill: "#f2f2f2",  stroke: null };

      default:
        return { fill: "#0b57d0", stroke: null };
    }
  }

  // SENDING / SENT / DELIVERED — outlined circles
  // On bubble: white stroke 1.5px @ 50% opacity handled by outer opacity
  // No container light: on-surface-variant #444746 stroke
  // No container dark: on-surface-variant #c4c7c5 stroke
  switch (type) {
    case "On bubble":
      return { fill: null, stroke: "rgba(255,255,255,1)", strokeWidth: 1.5 };

    case "No container":
      return d
        ? { fill: null, stroke: "#c4c7c5", strokeWidth: 1.5 }
        : { fill: null, stroke: "#444746", strokeWidth: 1.5 };

    case "Media":
      return { fill: null, stroke: "rgba(255,255,255,1)", strokeWidth: 1.5 };

    case "Voice moods RCS":
      return { fill: null, stroke: "rgba(255,255,255,1)", strokeWidth: 1.5 };

    case "Voice moods Colorful":
      return { fill: null, stroke: "rgba(255,255,255,1)", strokeWidth: 1.5 };

    case "Card File attachments":
      return d
        ? { fill: null, stroke: "#c4c7c5", strokeWidth: 1.5 }
        : { fill: null, stroke: "#444746", strokeWidth: 1.5 };

    case "Homescreen":
      return d
        ? { fill: null, stroke: "#c4c7c5", strokeWidth: 1.5 }
        : { fill: null, stroke: "#444746", strokeWidth: 1.5 };

    case "Link preview card":
      return d
        ? { fill: null, stroke: "#c4c7c5", strokeWidth: 1.5 }
        : { fill: null, stroke: "#444746", strokeWidth: 1.5 };

    default:
      return { fill: null, stroke: "rgba(255,255,255,1)", strokeWidth: 1.5 };
  }
}

// ─── Check / dot color tokens ─────────────────────────────────────────────────

function getCheckColor(mode, type, status) {
  const d = mode === "Dark";
  if (status === "Read") {
    // on-primary token drives check color inside filled circle
    switch (type) {
      case "On bubble":              return d ? "#062e6f" : "#ffffff";
      case "No container":           return d ? "#e3e3e3" : "#1f1f1f"; // on-surface
      case "Media":                  return d ? "#e3e3e3" : "#1f1f1f";
      case "Voice moods RCS":        return d ? "#062e6f" : "#ffffff";
      case "Voice moods Colorful":   return d ? "#e3e3e3" : "#1f1f1f";
      case "Card File attachments":  return d ? "#e3e3e3" : "#1f1f1f";
      case "Homescreen":             return d ? "#062e6f" : "#ffffff";
      case "Link preview card":      return d ? "#e3e3e3" : "#1f1f1f";
      default:                       return "#ffffff";
    }
  }
  // Sent / Delivered — check sits on transparent circle, color matches stroke/context
  switch (type) {
    case "On bubble":             return "#ffffff";
    case "No container":          return d ? "#c4c7c5" : "#444746";
    case "Media":                 return "#ffffff";
    case "Voice moods RCS":       return "#ffffff";
    case "Voice moods Colorful":  return "#ffffff";
    case "Card File attachments": return d ? "#c4c7c5" : "#444746";
    case "Homescreen":            return d ? "#c4c7c5" : "#444746";
    case "Link preview card":     return d ? "#c4c7c5" : "#444746";
    default:                      return "#ffffff";
  }
}

function getDotColor(mode, type) {
  const d = mode === "Dark";
  switch (type) {
    case "On bubble":             return "#ffffff";
    case "No container":          return d ? "#c4c7c5" : "#444746";
    case "Media":                 return "#ffffff";
    case "Voice moods RCS":       return "#ffffff";
    case "Voice moods Colorful":  return "#ffffff";
    case "Card File attachments": return d ? "#c4c7c5" : "#444746";
    case "Homescreen":            return d ? "#c4c7c5" : "#444746";
    case "Link preview card":     return d ? "#c4c7c5" : "#444746";
    default:                      return "#ffffff";
  }
}

function getOpacity(mode, type, status) {
  const d = mode === "Dark";
  if (status === "Read") return 1;
  switch (type) {
    case "On bubble":             return 0.5;
    case "No container":          return status === "Sending" ? 1 : (d ? 0.8 : 0.6);
    case "Media":                 return 0.8;
    case "Voice moods RCS":       return 0.5;
    case "Voice moods Colorful":  return 0.8;
    case "Card File attachments": return 0.8;
    case "Homescreen":            return 0.8;
    case "Link preview card":     return 1;
    default:                      return 1;
  }
}

// ─── BaseReadReceiptIcon ──────────────────────────────────────────────────────

export function BaseReadReceiptIcon({ mode = "Light", status = "Sending", type = "On bubble" }) {
  const isRead      = status === "Read";
  const isDelivered = status === "Delivered";
  const isSent      = status === "Sent";
  const isSending   = status === "Sending";

  const circle  = getCircleStyle(mode, type, isRead);
  const opacity = getOpacity(mode, type, status);
  const cc      = getCheckColor(mode, type, status);
  const dc      = getDotColor(mode, type);

  return (
    <div style={{
      position: "relative",
      width: 20, height: 20,
      flexShrink: 0,
      opacity,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      {/* Circle — pure CSS, no expiring image URLs */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        background:  circle.fill   ?? "transparent",
        border:      circle.stroke ? `${circle.strokeWidth ?? 1.5}px solid ${circle.stroke}` : "none",
        boxSizing:   "border-box",
      }} />

      {/* Icon content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isSending   && <SendingDots color={dc} />}
        {isSent      && <SingleCheckIcon color={cc} />}
        {isDelivered && <DoubleCheckIcon color={cc} />}
        {isRead      && <DoubleCheckIcon color={cc} />}
      </div>
    </div>
  );
}

// ─── ShapesReadReceipt — 4-icon strip ────────────────────────────────────────

export function ShapesReadReceipt({ mode = "Light", type = "On bubble" }) {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {["Sending", "Sent", "Delivered", "Read"].map(s => (
        <BaseReadReceiptIcon key={s} mode={mode} status={s} type={type} />
      ))}
    </div>
  );
}

// ─── App — Reference Sheet ────────────────────────────────────────────────────

const ALL_TYPES    = ["On bubble", "No container", "Media", "Voice moods RCS", "Voice moods Colorful", "Card File attachments", "Homescreen", "Link preview card"];
const ALL_STATUSES = ["Sending", "Sent", "Delivered", "Read"];

const PREVIEW_BG = {
  Light: {
    "On bubble":             "#3C8A2E",
    "No container":          "#F1F3F4",
    "Media":                 "#1C1C1C",
    "Voice moods RCS":       "#2D2D2D",
    "Voice moods Colorful":  "#C2185B",
    "Card File attachments": "#E8EAED",
    "Homescreen":            "#E3EBF3",
    "Link preview card":     "#F1F3F4",
  },
  Dark: {
    "On bubble":             "#1E5C15",
    "No container":          "#2D2E30",
    "Media":                 "#0D0D0D",
    "Voice moods RCS":       "#1A1A1A",
    "Voice moods Colorful":  "#880E4F",
    "Card File attachments": "#35373B",
    "Homescreen":            "#1A2733",
    "Link preview card":     "#2D2E30",
  },
};

export default function App() {
  const [mode, setMode]         = useState("Light");
  const [previewType, setPreview] = useState("On bubble");

  const d       = mode === "Dark";
  const pageBg  = d ? "#202124" : "#F0F4F9";
  const panelBg = d ? "#2D2E30" : "#ffffff";
  const border  = d ? "#3C4043" : "#E8EAED";
  const txtPri  = d ? "#E8EAED" : "#202124";
  const txtSub  = d ? "#9AA0A6" : "#5F6368";
  const accent  = "#0b57d0";
  const font    = "'Google Sans','Product Sans',Roboto,sans-serif";

  const SectionLabel = ({ children }) => (
    <p style={{ margin: "0 0 10px", fontSize: 11, color: txtSub, fontWeight: 700,
      letterSpacing: "0.06em", textTransform: "uppercase" }}>{children}</p>
  );

  return (
    <div style={{ minHeight: "100vh", background: pageBg, fontFamily: font,
      color: txtPri, padding: "28px 20px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, color: txtSub, fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase" }}>Building Block</p>
          <h1 style={{ margin: "0 0 2px", fontSize: 20, fontWeight: 500 }}>.Base/Read receipt icon</h1>
          <p style={{ margin: 0, fontSize: 12, color: txtSub }}>
            All 8 types · 4 statuses · Light & Dark — pure CSS circles
          </p>
        </div>

        {/* Mode toggle */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "inline-flex", borderRadius: 20, overflow: "hidden", border: `1.5px solid ${border}` }}>
            {["Light", "Dark"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: "6px 20px", fontSize: 13, fontWeight: 500, border: "none",
                cursor: "pointer", fontFamily: font, transition: "all 0.15s",
                background: mode === m ? accent : "transparent",
                color:      mode === m ? "#fff" : txtSub,
              }}>{m}</button>
            ))}
          </div>
        </div>

        {/* ── Shapes strip preview ── */}
        <section style={{ marginBottom: 28 }}>
          <SectionLabel>.Shapes Read receipt — Building block</SectionLabel>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {ALL_TYPES.map(t => (
              <button key={t} onClick={() => setPreview(t)} style={{
                padding: "4px 10px", fontSize: 11, fontWeight: 500, borderRadius: 14,
                cursor: "pointer", fontFamily: font, transition: "all 0.15s",
                border:     `1.5px solid ${previewType === t ? accent : border}`,
                background:  previewType === t ? accent : "transparent",
                color:       previewType === t ? "#fff" : txtSub,
              }}>{t}</button>
            ))}
          </div>
          <div style={{
            background: PREVIEW_BG[mode][previewType],
            borderRadius: 10, padding: "14px 18px",
            display: "inline-flex", alignItems: "center",
            transition: "background 0.2s",
          }}>
            <ShapesReadReceipt mode={mode} type={previewType} />
          </div>
        </section>

        {/* ── Full grid ── */}
        <section style={{ marginBottom: 32 }}>
          <SectionLabel>.Base/Read receipt icon — All types × statuses</SectionLabel>
          <div style={{ background: panelBg, borderRadius: 12, border: `1px solid ${border}`, overflow: "hidden" }}>

            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "152px repeat(4,1fr)",
              borderBottom: `1px solid ${border}`, background: d ? "#26282B" : "#F8F9FA" }}>
              <div style={{ padding: "8px 12px", fontSize: 10, color: txtSub,
                fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Type</div>
              {ALL_STATUSES.map(s => (
                <div key={s} style={{ padding: "8px 4px", fontSize: 10, color: txtSub,
                  fontWeight: 700, textAlign: "center", textTransform: "uppercase",
                  letterSpacing: "0.04em", borderLeft: `1px solid ${border}` }}>{s}</div>
              ))}
            </div>

            {/* Data rows */}
            {ALL_TYPES.map((type, i) => (
              <div key={type} style={{
                display: "grid", gridTemplateColumns: "152px repeat(4,1fr)",
                borderTop: i === 0 ? "none" : `1px solid ${border}`,
              }}>
                <div style={{ padding: "10px 12px", fontSize: 11, color: txtPri,
                  fontWeight: 500, display: "flex", alignItems: "center", lineHeight: 1.3 }}>
                  {type}
                </div>
                {ALL_STATUSES.map(status => (
                  <div key={status} style={{
                    background: PREVIEW_BG[mode][type],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "10px 4px",
                    borderLeft: `1px solid ${border}`,
                    transition: "background 0.2s",
                  }}>
                    <BaseReadReceiptIcon mode={mode} status={status} type={type} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── Building blocks ── */}
        <section style={{ marginBottom: 24 }}>
          <SectionLabel>.Double check icon — Building block</SectionLabel>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "white",   color: "#ffffff", bg: "#404040" },
              { label: "gray",    color: "#444746", bg: "#F1F3F4" },
              { label: "lt gray", color: "#c4c7c5", bg: "#F1F3F4" },
              { label: "blue",    color: "#0b57d0", bg: "#F1F3F4" },
              { label: "lt blue", color: "#a8c7fa", bg: "#303134" },
            ].map(({ label, color, bg }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 40, height: 40, background: bg, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <DoubleCheckIcon color={color} />
                </div>
                <span style={{ fontSize: 9, color: txtSub }}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 32 }}>
          <SectionLabel>.Single check icon — Building block (Sent)</SectionLabel>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { label: "white",   color: "#ffffff", bg: "#404040" },
              { label: "gray",    color: "#444746", bg: "#F1F3F4" },
              { label: "lt gray", color: "#c4c7c5", bg: "#F1F3F4" },
              { label: "blue",    color: "#0b57d0", bg: "#F1F3F4" },
            ].map(({ label, color, bg }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 40, height: 40, background: bg, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SingleCheckIcon color={color} />
                </div>
                <span style={{ fontSize: 9, color: txtSub }}>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <p style={{ fontSize: 11, color: txtSub, textAlign: "center" }}>
          Figma · 5L3DIB62Y0dFU3uVgLBeVK · node 21063:23829
        </p>
      </div>
    </div>
  );
}
