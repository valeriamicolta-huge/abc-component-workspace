/* CardFileAttachmentsCategories — renderer
   Figma: 5L3DIB62Y0dFU3uVgLBeVK, node 11021:39653

   Props:
     type              — "Contact" | "Loading" | "File" | "File receipt icon" | "File draft" | "Photos card"
     stroke            — boolean (adds 1px outline-variant border)
     readReceiptStatus — "Sending" | "Sent" | "Delivered" | "Read"  (only for "File receipt icon")

   Shared component used:
     _shared/read-receipt-icon/component.jsx  →  ReadReceiptIcon({ mode, status })
     Rendered at 16×16dp, bottom-right of the File receipt icon card.
     Mode is always "Light" (card-file-attachment only appears on light surfaces).

   Token reference (from get_variable_defs on node 11021:39653):
     surface-container:          #f0f4f9   — card background
     outline-variant:            #c4c7c5   — stroke border
     on-surface:                 #1f1f1f   — primary text
     on-surface-variant:         #444746   — secondary text / subtitle
     on-error-container:         #8c1d18   — contact name (Stroke=Off only)
     secondary:                  #00639b   — icon square bg / spinner color
     on-secondary:               #ffffff   — icon symbol color
     surface:                    #ffffff   — photos icon circle bg
     surface-container-highest:  #dde3ea   — loading skeleton lines
     corner-large-increased:     20dp
     corner-medium:              12dp

   Typography:
     Label Large  — Google Sans Flex, 500, 14/20, tracking 0      (file name)
     Title Small  — Google Sans Flex, 500, 14/20, tracking 0      (contact name, video title)
     Body Small   — Google Sans Text, 400, 12/16, tracking 0.1px  (subtitles)

   Layout notes:
     - All cards: padding 16px H / 18px V, gap 12px, border-radius 20dp
     - Photos card: padding 8px all sides (different from others)
     - File receipt icon: items-end (not items-center) so receipt sits at bottom-right
     - File draft: position relative wrapper, remove badge absolute at top:-12px right:-4px
     - Loading spinner: pure CSS animation (not Figma raster) — 36×36dp arc, secondary color
*/

/* ─── Animated loading spinner ────────────────────────────────────────────── */
const spinnerStyles = `
  @keyframes cfa-spin { to { transform: rotate(360deg); } }
  .cfa-spinner {
    width: 36px; height: 36px;
    border-radius: 50%;
    border: 3px solid #dde3ea;
    border-top-color: #00639b;
    animation: cfa-spin 0.9s linear infinite;
    flex-shrink: 0;
  }
`;

/* ─── Photos logo (abc/logo_photos_48dp) ──────────────────────────────────── */
function PhotosLogo({ size = 24 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" style={{ display: "block", flexShrink: 0 }}>
      {/* Yellow — top-left quadrant */}
      <path d="M4 12 L24 12 L24 24 L4 24 Z" fill="#FBBC04" />
      {/* Red — top-right quadrant */}
      <path d="M24 2 L44 2 L44 24 L24 24 Z" fill="#EA4335" />
      {/* Blue — bottom-right quadrant */}
      <path d="M24 24 L44 24 L44 44 L24 44 Z" fill="#4285F4" />
      {/* Green — bottom-left quadrant */}
      <path d="M12 24 L24 24 L24 46 L12 46 Z" fill="#34A853" />
    </svg>
  );
}

/* ─── Material Symbol placeholder ────────────────────────────────────────────
   Renders a Google Symbols ligature. The workspace loads Google Symbols font.  */
function Symbol({ name, size = 20, color = "#ffffff" }) {
  return (
    <span style={{
      fontFamily: "'Google Symbols', sans-serif",
      fontSize: size,
      lineHeight: 1,
      color,
      display: "block",
      fontStyle: "normal",
      userSelect: "none",
    }}>
      {name}
    </span>
  );
}

/* ─── File icon slot — 36×36dp secondary square + drive_pdf symbol ─────────── */
function FileIconSlot() {
  return (
    <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0 }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "#00639b",
        borderRadius: 12,
      }} />
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "hidden",
        width: 20, height: 20,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Symbol name="drive_pdf" size={18} color="#ffffff" />
      </div>
    </div>
  );
}

/* ─── Shared ReadReceiptIcon (from _shared/read-receipt-icon/component.jsx) ── */
const LEFT_PATH  = "M3.05932 8.22417C2.81912 8.22417 2.59163 8.11348 2.44739 7.92486L0.150879 4.92187C-0.100758 4.59287 -0.0302234 4.12845 0.307199 3.88356C0.645258 3.63867 1.12248 3.70731 1.37412 4.03569L2.99705 6.15807L6.64261 0.354912C6.86248 0.00551026 7.33144 -0.104567 7.6911 0.108784C8.05013 0.322754 8.16388 0.77914 7.94401 1.12916L3.71002 7.86921C3.57785 8.07947 3.34718 8.21243 3.09427 8.22356C3.08284 8.22356 3.07076 8.22417 3.05932 8.22417Z";
const RIGHT_PATH = "M6.98576 8.22417C6.85041 8.22417 6.71315 8.18893 6.5886 8.11534C6.22958 7.90137 6.11583 7.44498 6.3357 7.09496L10.5697 0.354912C10.7895 0.00551026 11.2585 -0.104567 11.6182 0.108784C11.9772 0.322754 12.0909 0.77914 11.8711 1.12916L7.63709 7.86921C7.49348 8.09802 7.24248 8.22417 6.98576 8.22417Z";
const SX = 10.65 / 12;
const SY = 8.224 / 9;

function ReadReceiptIcon({ mode = "Light", status = "Read" }) {
  const isLight     = mode !== "Dark";
  const isSending   = status === "Sending";
  const isSent      = status === "Sent";
  const isDelivered = status === "Delivered";
  const isRead      = status === "Read";

  /* Card File Attachments token values (get_variable_defs, node 11021:39653):
     Sending/Sent/Delivered: outlined circle, on-surface-variant stroke #444746
     Read: filled circle #f2f2f2 (inverse-on-surface), checks #1f1f1f (on-surface) */
  const circleFill   = isRead ? "#f2f2f2" : "none";
  const circleStroke = isRead ? "none"    : "#444746";
  const markColor    = isRead
    ? "#1f1f1f"
    : (isLight ? "rgba(68,71,70,0.6)" : "rgba(242,242,242,0.8)");
  const dotColor = isRead ? "#1f1f1f" : "rgba(68,71,70,0.6)";
  const opacity  = (status === "Sending" || isRead) ? 1 : 0.8;

  const sentX  = 5.44;
  const dblX   = 4.44;
  const checkY = 5.55;

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      style={{ display: "block", flexShrink: 0 }}>
      <g opacity={opacity}>
        {isRead
          ? <circle cx="8" cy="8" r="8" fill={circleFill} />
          : <circle cx="8" cy="8" r="7.25" fill="none" stroke={circleStroke} strokeWidth="1.5" />
        }
        {/* Scale all positions from 20px space to 16px space */}
        <g transform="scale(0.8)">
          {isSending && <>
            <circle cx="6.667" cy="10" r="1.111" fill={dotColor} />
            <circle cx="10"    cy="10" r="1.111" fill={dotColor} />
            <circle cx="13.333" cy="10" r="1.111" fill={dotColor} />
          </>}
          {isSent && (
            <g transform={`translate(${sentX}, ${checkY}) scale(${SX}, ${SY})`}>
              <path d={LEFT_PATH} fill={markColor} />
            </g>
          )}
          {(isDelivered || isRead) && (
            <g transform={`translate(${dblX}, ${checkY}) scale(${SX}, ${SY})`}>
              <path d={LEFT_PATH}  fill={markColor} />
              <path d={RIGHT_PATH} fill={markColor} />
            </g>
          )}
        </g>
      </g>
    </svg>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */
function CardFileAttachmentsCategories({ type = "File", stroke = false, readReceiptStatus = "Read" }) {

  const cardBase = {
    background: "#f0f4f9",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    padding: "18px 16px",
    gap: 12,
    flexShrink: 0,
    position: "relative",
    border: stroke ? "1px solid #c4c7c5" : "none",
    boxSizing: "border-box",
  };

  const titleStyle = {
    fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: 0,
    color: "#1f1f1f",
    margin: 0,
    fontFeatureSettings: "'ss02' 1",
  };

  const subtitleStyle = {
    fontFamily: "'Google Sans Text', 'Google Sans', sans-serif",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "16px",
    letterSpacing: "0.1px",
    color: "#444746",
    margin: 0,
  };

  /* ── Contact ──────────────────────────────────────────────────────────── */
  if (type === "Contact") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20 }}>
        <div style={cardBase}>
          {/* Avatar — initials circle (placeholder for real avatar image) */}
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#d4e4f7",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, overflow: "hidden",
          }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#00639b", fontFamily: "'Google Sans', sans-serif" }}>DH</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ ...titleStyle, color: stroke ? "#1f1f1f" : "#8c1d18" }}>Danielle Holmes</p>
            <p style={subtitleStyle}>View contact</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Loading ──────────────────────────────────────────────────────────── */
  if (type === "Loading") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20 }}>
        <style>{spinnerStyles}</style>
        <div style={{ ...cardBase, alignItems: "center" }}>
          {/* Animated CSS spinner */}
          <div style={{ position: "relative", width: 36, height: 36, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="cfa-spinner" />
            <div style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Symbol name="close" size={20} color="#00639b" />
            </div>
          </div>
          {/* Skeleton lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ width: 82, height: 14, borderRadius: 20, background: "#dde3ea" }} />
            <div style={{ width: 44, height: 14, borderRadius: 20, background: "#dde3ea" }} />
          </div>
        </div>
      </div>
    );
  }

  /* ── File ─────────────────────────────────────────────────────────────── */
  if (type === "File") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20 }}>
        <div style={cardBase}>
          <FileIconSlot />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={titleStyle}>file_name.pdf</p>
            <p style={subtitleStyle}>13KB · File</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── File receipt icon ────────────────────────────────────────────────── */
  if (type === "File receipt icon") {
    return (
      <div style={{ display: "flex", alignItems: "flex-start", borderRadius: 20 }}>
        <div style={{ ...cardBase, alignItems: "flex-end" }}>
          <FileIconSlot />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p style={titleStyle}>file_name.pdf</p>
            <p style={subtitleStyle}>13KB · File</p>
          </div>
          {/* ReadReceiptIcon — 16×16dp, absolute bottom-right */}
          <div style={{ position: "absolute", bottom: 8, right: 8, width: 16, height: 16 }}>
            <ReadReceiptIcon mode="Light" status={readReceiptStatus} />
          </div>
        </div>
      </div>
    );
  }

  /* ── File draft ───────────────────────────────────────────────────────── */
  if (type === "File draft") {
    return (
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20 }}>
          <div style={cardBase}>
            <FileIconSlot />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={titleStyle}>file_name.pdf</p>
              <p style={subtitleStyle}>13KB · File</p>
            </div>
          </div>
        </div>
        {/* Remove badge — 24×24dp at top:-12px right:-4px */}
        <div style={{
          position: "absolute", top: -12, right: -4,
          width: 24, height: 24,
          borderRadius: "50%",
          background: "#1f1f1f",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Symbol name="close" size={16} color="#ffffff" />
        </div>
      </div>
    );
  }

  /* ── Photos card ──────────────────────────────────────────────────────── */
  if (type === "Photos card") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", borderRadius: 20 }}>
        <div style={{ ...cardBase, padding: 8 }}>
          {/* Video thumbnail */}
          <div style={{
            width: 56, height: 56,
            borderRadius: 8,
            background: "linear-gradient(135deg, #4a90d9 0%, #2c5f8a 100%)",
            flexShrink: 0,
            overflow: "hidden",
          }} />
          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <p style={titleStyle}>1 video</p>
            <p style={subtitleStyle}>32 MB upload</p>
          </div>
          {/* Photos logo — 36×36dp white circle */}
          <div style={{
            width: 36, height: 36,
            borderRadius: "50%",
            background: "#ffffff",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <PhotosLogo size={24} />
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const Component = CardFileAttachmentsCategories;
