/* Link Preview Card renderer — polished with Figma base components.
   Globals: React, useState, useRef, useEffect, THEMES, S, lum
   Must end with: const Renderer = LinkPreviewCard; */

/* ─── Read Receipt ─── 
   Type = Link preview card always.
   Appearance driven by Mode + Status props, NOT by workspace dark toggle.
   
   From Figma:
   - Light/Read (Link preview card):   white circle, blue border, blue double-checks
   - Dark/Read  (Link preview card):   dark navy circle, light-blue border, light-blue checks
   - Sending:   three dots (animated appearance, shown as 3 dots here)
   - Sent:      single faint check
   - Delivered: double faint checks
   - Read:      double solid blue checks
*/
function ReadReceipt({ mode, status }) {
  const isDark   = mode === "Dark";
  const isSend   = status === "Sending";
  const isSent   = status === "Sent";
  const isDeliv  = status === "Delivered";
  const isRead   = status === "Read";

  /* Circle colors */
  const circleFill   = isDark ? "#041e49" : "#ffffff";
  const circleBorder = isDark ? "rgba(168,199,250,0.5)" : "#0b57d0";

  /* Check / dot colors */
  const checkSolid = isDark ? "#a8c7fa" : "#0b57d0";
  const checkFaint = isDark ? "rgba(168,199,250,0.5)" : "rgba(11,87,208,0.45)";

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" fill={circleFill} stroke={circleBorder} strokeWidth="1.2"/>

      {/* Sending — three dots */}
      {isSend && <>
        <circle cx="6.5"  cy="10" r="1.2" fill={checkFaint}/>
        <circle cx="10"   cy="10" r="1.2" fill={checkFaint}/>
        <circle cx="13.5" cy="10" r="1.2" fill={checkFaint}/>
      </>}

      {/* Sent — single faint check (left position) */}
      {isSent && (
        <path d="M5.5 10L8 12.5L11 7.5" stroke={checkFaint} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      )}

      {/* Delivered — double faint checks */}
      {isDeliv && <>
        <path d="M4.5 10L7  12.5L10 7.5" stroke={checkFaint} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8  10L10.5 12.5L13.5 7.5" stroke={checkFaint} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </>}

      {/* Read — double solid checks */}
      {isRead && <>
        <path d="M4.5 10L7  12.5L10 7.5" stroke={checkSolid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8  10L10.5 12.5L13.5 7.5" stroke={checkSolid} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </>}
    </svg>
  );
}

/* ─── Play button (60×60dp) ─── */
function PlayButton() {
  return (
    <div style={{
      width: 60, height: 60, borderRadius: 30,
      background: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff">
        <path d="M8 5.14v13.72a1 1 0 001.53.85l10.36-6.86a1 1 0 000-1.7L9.53 4.29A1 1 0 008 5.14z"/>
      </svg>
    </div>
  );
}

/* ─── Brand icon (16×16dp) ─── */
function BrandIcon({ isYouTube, color }) {
  if (isYouTube) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3.5" width="14" height="9" rx="2.5" fill="#FF0000"/>
        <path d="M6.5 5.5L11 8L6.5 10.5V5.5Z" fill="white"/>
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5"/>
      <path d="M12 3C12 3 9 7 9 12C9 17 12 21 12 21M12 3C12 3 15 7 15 12C15 17 12 21 12 21" stroke={color} strokeWidth="1.2"/>
      <path d="M3.5 12H20.5M4 7.5H20M4 16.5H20" stroke={color} strokeWidth="1.2"/>
    </svg>
  );
}

/* ─── Figma placeholder (light purple bg + purple image icon) ─── */
function MediaPlaceholder() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#ede7f6",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {/* Purple image icon matching Figma .Base/Media Link preview card */}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="8" width="40" height="32" rx="4" fill="#7c3aed" opacity="0.15"/>
        <rect x="4" y="8" width="40" height="32" rx="4" stroke="#7c3aed" strokeWidth="2" fill="none"/>
        <circle cx="16" cy="20" r="4" fill="#7c3aed"/>
        <path d="M4 34L14 24L20 30L28 20L44 34" stroke="#7c3aed" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>
  );
}

/* ─── Main component ─── */
function LinkPreviewCard(props) {
  const type             = props.Type || "Received links";
  const styles           = props.Styles || "RCS";
  const category         = props.Category || "Incoming";
  const showPlayPause    = props["Show Play/Pause"] !== false;
  const receiptMode      = props["Read receipt Mode"] || "Light";
  const receiptStatus    = props["Read receipt Status"] || "Read";
  const { mediaImg, dominantColor, title, brand, dark } = props;

  /* Workspace theme — used ONLY for the link area (which lives outside the card bg) */
  const T = dark ? THEMES.dark : THEMES.light;

  const isVideo  = type === "Video";
  const isSent   = type === "Sent links";
  const isLink   = isSent || type === "Received links";
  const isRCS    = styles === "RCS";
  const isOut    = category === "Outgoing";
  const showReadReceipt = isRCS && isOut;

  /* ── Card background ──
     Always the extracted dominant color (or default gray).
     This does NOT change with the dark/light toggle — the image is the same image. */
  const hasDominant = mediaImg && dominantColor && dominantColor !== "#e0e0e0";
  const cardBg   = hasDominant ? dominantColor : (dark ? "#2c2c2c" : "#e8eaed");

  /* ── Info area text colors respond ONLY to the card bg luminance, never to dark mode ──
     If someone uploads a dark image, the card bg is dark → white text.
     If they upload a light image, the card bg is light → dark text.
     The workspace dark/light toggle has NO effect on the info area. */
  const isDarkCardBg  = lum(cardBg) < 0.5;
  const titleColor    = isDarkCardBg ? "#ffffff" : "#1f1f1f";
  const brandColor    = isDarkCardBg ? "rgba(255,255,255,0.7)" : "#444746";

  /* ── Link area background — uses workspace theme (it's a separate surface) ──
     Received links: Surface Container (responds to dark mode normally)
     Sent XMS:       Primary Container
     Sent RCS:       Primary */
  let linkBg, linkText;
  if (isSent && isRCS)  { linkBg = T.pri;   linkText = dark ? T.onPri : "#ffffff"; }
  else if (isSent)      { linkBg = T.priC;  linkText = T.onPriC; }
  else                  { linkBg = T.surfC;  linkText = T.onSurf; }

  /* Media corner radius */
  const mediaRadius = isLink ? "0 0 12px 12px" : "20px 20px 0 0";

  /* Play overlay — Video and Sent links only */
  const showPlay = (isVideo || isSent) && showPlayPause;

  /* Brand icon type */
  const brandLower = (brand || "").toLowerCase();
  const isYouTube  = brandLower.includes("youtube") || brandLower.includes("youtu");

  /* URL display in link area */
  const displayUrl = brand
    ? "https://www." + brand.replace(/^https?:\/\/(www\.)?/, "") + "/watch?v=dQw4w9WgXcQ"
    : "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <div style={{
      width: 330, borderRadius: 20, overflow: "hidden",
      background: cardBg, fontFamily: S.f,
    }}>

      {/* ── Link text area (uses workspace theme, separate from card bg) ── */}
      {isLink && (
        <div style={{ padding: "12px 16px", background: linkBg }}>
          <p style={{
            fontSize: 16, lineHeight: "24px", color: linkText,
            margin: 0, wordBreak: "break-all",
            overflow: "hidden", display: "-webkit-box",
            WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
          }}>
            {displayUrl}
          </p>
        </div>
      )}

      {/* ── Media area ── */}
      <div style={{
        width: 330, height: 187,
        position: "relative", overflow: "hidden",
        borderRadius: mediaRadius, flexShrink: 0,
      }}>
        {mediaImg ? (
          <img src={mediaImg} alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          /* Figma .Base/Media Link preview card placeholder */
          <MediaPlaceholder />
        )}

        {showPlay && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            <PlayButton />
          </div>
        )}
      </div>

      {/* ── Info area — text/icons respond to card bg luminance ONLY ── */}
      <div style={{ padding: "14px 16px 16px", position: "relative" }}>

        {/* Title — color based on card bg luminance, never dark mode */}
        <p style={{
          fontSize: 16, fontWeight: 500, lineHeight: "24px",
          color: titleColor, margin: "0 0 10px",
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>
          {title || "Card title goes here"}
        </p>

        {/* Brand row — color based on card bg luminance, never dark mode */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 16, flexShrink: 0 }}>
            <BrandIcon isYouTube={isYouTube} color={brandColor} />
          </div>
          <span style={{ fontSize: 12, lineHeight: "16px", color: brandColor, letterSpacing: "0.1px" }}>
            {brand || "brand.com"}
          </span>
        </div>

        {/* Read receipt — Type=Link preview card always, Mode+Status from props */}
        {showReadReceipt && (
          <div style={{ position: "absolute", bottom: 10, right: 12 }}>
            <ReadReceipt mode={receiptMode} status={receiptStatus} />
          </div>
        )}
      </div>
    </div>
  );
}

const Renderer = LinkPreviewCard;
