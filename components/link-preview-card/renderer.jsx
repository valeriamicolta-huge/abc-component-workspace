/* Link Preview Card — polished renderer based on Figma base components.
   Globals: React, useState, useRef, useEffect, THEMES, S, lum
   Must end with: const Renderer = LinkPreviewCard; */

/* ─── Read Receipt (20×20dp, Type=Link preview card) ─── */
function ReadReceipt({ dark }) {
  const circleBg = dark ? "#1a2744" : "#ffffff";
  const checkColor = dark ? "#a8c7fa" : "#0b57d0";
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9.5" fill={circleBg} stroke={dark ? "rgba(168,199,250,0.3)" : "#0b57d0"} strokeWidth="1"/>
      <path d="M4.5 10L7.5 13L11 7.5" stroke={checkColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 10L11 13L14.5 7.5" stroke={checkColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Play/Pause button (60×60dp) ─── */
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
      <path d="M12 3C12 3 9 7 9 12C9 17 12 21 12 21M12 3C12 3 15 7 15 12C15 17 12 21 12 21M3 12H21M3.5 7.5H20.5M3.5 16.5H20.5" stroke={color} strokeWidth="1.2"/>
    </svg>
  );
}

/* ─── Main component ─── */
function LinkPreviewCard(props) {
  const type          = props.Type || "Received links";
  const styles        = props.Styles || "RCS";
  const category      = props.Category || "Incoming";
  const showPlayPause = props["Show Play/Pause"] !== false;
  const { mediaImg, dominantColor, title, brand, dark } = props;

  const T = dark ? THEMES.dark : THEMES.light;

  const isVideo  = type === "Video";
  const isSent   = type === "Sent links";
  const isLink   = isSent || type === "Received links";
  const isRCS    = styles === "RCS";
  const isOut    = category === "Outgoing";

  /* Card background */
  const hasDominant = dominantColor && dominantColor !== "#e0e0e0";
  const cardBg  = hasDominant ? dominantColor : (dark ? "#2c2c2c" : "#e8eaed");
  const isDarkBg = lum(cardBg) < 0.5;

  /* Text adapts to background luminance */
  const titleColor = isDarkBg ? "#ffffff" : T.onSurf;
  const brandColor = isDarkBg ? "rgba(255,255,255,0.7)" : T.onSurfV;

  /* Link area */
  let linkBg, linkText;
  if (isSent && isRCS)  { linkBg = T.pri;   linkText = dark ? T.onPri : "#ffffff"; }
  else if (isSent)      { linkBg = T.priC;  linkText = T.onPriC; }
  else                  { linkBg = T.surfC;  linkText = T.onSurf; }

  /* Media corner radius */
  const mediaRadius = isLink ? "0 0 12px 12px" : "20px 20px 0 0";

  /* Play overlay */
  const showPlay = (isVideo || isSent) && showPlayPause;

  /* Brand icon type */
  const brandLower = (brand || "").toLowerCase();
  const isYouTube  = brandLower.includes("youtube") || brandLower.includes("youtu");

  /* URL to show in link area */
  const displayUrl = brand
    ? "https://www." + brand.replace(/^https?:\/\/(www\.)?/, "") + "/watch?v=dQw4w9WgXcQ"
    : "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <div style={{
      width: 330, borderRadius: 20, overflow: "hidden",
      background: cardBg, fontFamily: S.f,
    }}>

      {/* Link text area */}
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

      {/* Media */}
      <div style={{
        width: 330, height: 187, position: "relative",
        overflow: "hidden", borderRadius: mediaRadius, flexShrink: 0,
        background: dark ? "#1e1e1e" : "#c8cdd4",
      }}>
        {mediaImg ? (
          <img src={mediaImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="4"
                stroke={isDarkBg ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}
                strokeWidth="1.5" fill="none"/>
              <circle cx="8.5" cy="8.5" r="2"
                stroke={isDarkBg ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}
                strokeWidth="1.5" fill="none"/>
              <path d="M2 16L7 11L10 14L15 9L22 16"
                stroke={isDarkBg ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}
                strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
            </svg>
            <span style={{ fontSize: 11, color: isDarkBg ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)" }}>
              Upload an image
            </span>
          </div>
        )}
        {showPlay && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            <PlayButton />
          </div>
        )}
      </div>

      {/* Info area */}
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
        {isRCS && isOut && (
          <div style={{ position: "absolute", bottom: 10, right: 12 }}>
            <ReadReceipt dark={dark} />
          </div>
        )}
      </div>
    </div>
  );
}

const Renderer = LinkPreviewCard;
