/* Link Preview Card renderer
   Globals: React, useState, useRef, useEffect, THEMES, S, lum
   Must end with: const Renderer = LinkPreviewCard; */

/* ─── Read Receipt ───────────────────────────────────────────────
   Built from Figma node 16999:35495. Type = "Link preview card" always.
   
   From the Figma screenshot, each variant is a 20×20 circle with:
   - A circle background that changes per Mode × Status
   - Double-check marks (or dots for Sending) layered on top
   
   Circle backgrounds observed from Figma:
   Light/Sending (link preview card): medium grey #8e8e8e, no checks → 3 dots
   Light/Sent:    medium grey circle, 1 faint check
   Light/Delivered: medium grey circle, 2 faint checks
   Light/Read:    white circle, blue border, 2 blue checks (imgModeLightStatusReadTypeNoContainer)
   
   Dark/Sending (link preview card): dark circle #2c2c2c, 3 dots
   Dark/Sent:     dark circle, 1 faint check
   Dark/Delivered: dark circle, 2 faint checks
   Dark/Read:     dark navy circle, light blue border, 2 light blue checks (imgModeDarkStatusReadTypeLinkPreviewCard)
*/
function ReadReceipt({ mode, status }) {
  const isLight    = mode === "Light";
  const isSending  = status === "Sending";
  const isSent     = status === "Sent";
  const isDelivered = status === "Delivered";
  const isRead     = status === "Read";

  /* Circle style per mode */
  const circleFill   = isLight ? "#9e9e9e"  : "#2c2c2e";
  const circleStroke = isLight ? "none"     : "none";

  /* For Read: distinct circle */
  const readCircleFill   = isLight ? "#ffffff"  : "#0d1b3e";
  const readCircleStroke = isLight ? "#1a73e8"  : "#4a90d9";

  /* Check colors */
  const checkFaint = isLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)";
  const checkSolid = isLight ? "#1a73e8"                : "#7ab4f5";

  const fill   = isRead ? readCircleFill   : circleFill;
  const stroke = isRead ? readCircleStroke : circleStroke;

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "block" }}>
      <circle cx="10" cy="10" r="9.5" fill={fill} stroke={stroke} strokeWidth={isRead ? "1" : "0"}/>

      {/* Sending — 3 dots */}
      {isSending && <>
        <circle cx="6.5"  cy="10" r="1.3" fill={isLight ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)"}/>
        <circle cx="10"   cy="10" r="1.3" fill={isLight ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)"}/>
        <circle cx="13.5" cy="10" r="1.3" fill={isLight ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)"}/>
      </>}

      {/* Sent — single faint check (left) */}
      {isSent && (
        <path d="M5.5 10.5L8 13L12 7.5"
          stroke={checkFaint} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      )}

      {/* Delivered — double faint checks */}
      {isDelivered && <>
        <path d="M4.5 10.5L7 13L11 7.5"
          stroke={checkFaint} strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M7.5 10.5L10 13L14 7.5"
          stroke={checkFaint} strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </>}

      {/* Read — double solid checks in brand blue */}
      {isRead && <>
        <path d="M4.5 10.5L7 13L11 7.5"
          stroke={checkSolid} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M7.5 10.5L10 13L14 7.5"
          stroke={checkSolid} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
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

/* ─── Figma .Base/Media Link preview card placeholder ───
   A lavender background with the purple filled image icon from Figma.
   Rendered as an <img> pointing to a base64-encoded inline SVG so it
   matches the Figma design exactly without relying on expiring asset URLs. */
function MediaPlaceholder() {
  /* Inline SVG that matches the Figma filled icon:
     - Lavender (#ede7f6) background fill
     - Centered purple (#7c3aed) rounded rectangle (the "photo frame")
     - White filled sun circle and mountain silhouette inside */
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="330" height="187" viewBox="0 0 330 187">
    <rect width="330" height="187" fill="#ede7f6"/>
    <g transform="translate(141, 69)">
      <rect x="0" y="0" width="48" height="38" rx="4" fill="#7c3aed"/>
      <circle cx="13" cy="12" r="5" fill="#ede7f6"/>
      <path d="M0 30 L14 18 L22 24 L30 14 L48 30 L48 38 L0 38 Z" fill="#ede7f6"/>
    </g>
  </svg>`;
  const encoded = "data:image/svg+xml," + encodeURIComponent(svgContent);
  return (
    <img
      src={encoded}
      alt="Media placeholder"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

/* ─── Main component ─── */
function LinkPreviewCard(props) {
  const type          = props.Type          || "Received links";
  const styles        = props.Styles        || "RCS";
  const category      = props.Category      || "Incoming";
  const showPlayPause = props["Show Play/Pause"] !== false;
  const receiptMode   = props["Read receipt Mode"]   || "Light";
  const receiptStatus = props["Read receipt Status"] || "Read";
  const { mediaImg, dominantColor, title, brand, dark } = props;

  const T = dark ? THEMES.dark : THEMES.light;

  const isVideo    = type === "Video";
  const isImage    = type === "Image";
  const isSentLink = type === "Sent links";
  const isRecvLink = type === "Received links";
  const isLink     = isSentLink || isRecvLink;
  const isRCS      = styles === "RCS";
  const isOut      = category === "Outgoing";

  /* ── Visibility rules per the spec ──────────────────────────────
     Play/Pause: only Video type
     Read receipt: Sent links+RCS, or Image+RCS+Outgoing, or Video+RCS+Outgoing
  */
  const showPlay        = isVideo && showPlayPause;
  const showReadReceipt = (isSentLink && isRCS) ||
                          (isImage   && isRCS && isOut) ||
                          (isVideo   && isRCS && isOut);

  /* ── Card background ──
     Dominant color from uploaded image, doesn't change with dark toggle */
  const hasDominant = mediaImg && dominantColor && dominantColor !== "#e0e0e0";
  const cardBg      = hasDominant ? dominantColor : (dark ? "#2c2c2c" : "#e8eaed");
  const isDarkCardBg = lum(cardBg) < 0.5;

  /* Info area text responds ONLY to card bg luminance, never to dark mode toggle */
  const titleColor = isDarkCardBg ? "#ffffff" : "#1f1f1f";
  const brandColor = isDarkCardBg ? "rgba(255,255,255,0.7)" : "#444746";

  /* Link area uses workspace theme (separate surface above the image) */
  let linkBg, linkText;
  if (isSentLink && isRCS)  { linkBg = T.pri;   linkText = dark ? T.onPri : "#ffffff"; }
  else if (isSentLink)      { linkBg = T.priC;  linkText = T.onPriC; }
  else                      { linkBg = T.surfC;  linkText = T.onSurf; }

  /* Corner radius for media area */
  const mediaRadius = isLink ? "0 0 12px 12px" : "20px 20px 0 0";

  /* Brand icon */
  const brandLower = (brand || "").toLowerCase();
  const isYouTube  = brandLower.includes("youtube") || brandLower.includes("youtu");

  /* URL for link area */
  const displayUrl = brand
    ? "https://www." + brand.replace(/^https?:\/\/(www\.)?/, "") + "/watch?v=dQw4w9WgXcQ"
    : "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <div style={{
      width: 330, borderRadius: 20, overflow: "hidden",
      background: cardBg, fontFamily: S.f,
    }}>

      {/* Link text area — only for link types */}
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

      {/* Media area */}
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
          <MediaPlaceholder />
        )}

        {/* Play button only on Video type */}
        {showPlay && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            <PlayButton />
          </div>
        )}
      </div>

      {/* Info area — text/icons respond to card bg luminance ONLY, never dark mode */}
      <div style={{ padding: "14px 16px 16px", position: "relative" }}>
        <p style={{
          fontSize: 16, fontWeight: 500, lineHeight: "24px",
          color: titleColor, margin: "0 0 10px",
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }}>
          {title || "Card title goes here"}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 16, flexShrink: 0 }}>
            <BrandIcon isYouTube={isYouTube} color={brandColor} />
          </div>
          <span style={{ fontSize: 12, lineHeight: "16px", color: brandColor, letterSpacing: "0.1px" }}>
            {brand || "brand.com"}
          </span>
        </div>

        {/* Read receipt — always Type=Link preview card, Mode+Status from panel */}
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
