/* Link Preview Card renderer
   Globals: React, useState, useRef, useEffect, THEMES, S, lum
   Must end with: const Renderer = LinkPreviewCard; */

/* ─── Read Receipt (Type = Link preview card) ──────────────────────
   From Figma node 16999:35495 screenshot:
   - ALL circles are GREY (never blue)
   - Light mode: medium grey circle (#8e8e8e), white/faint check marks
   - Dark mode: dark grey circle (#3a3a3c), lighter faint check marks
   - The only blue that appears in the full sheet is for "On bubble" type
     which is a different type — Link preview card type is always grey
   - Read status: solid white checks on grey circle
   - Sending: 3 white dots
   - Sent: 1 faint white check
   - Delivered: 2 faint white checks
   - Read: 2 solid white checks (slightly brighter than delivered)
*/
function ReadReceipt({ mode, status }) {
  const isLight     = mode !== "Dark";
  const isSending   = status === "Sending";
  const isSent      = status === "Sent";
  const isDelivered = status === "Delivered";
  const isRead      = status === "Read";

  const circleFill = isLight ? "#8e8e93" : "#3a3a3c";
  const faintCheck = isLight ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.35)";
  const solidCheck = isLight ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)";
  const dotColor   = isLight ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)";

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "block" }}>
      <circle cx="10" cy="10" r="9.5" fill={circleFill}/>

      {/* Sending — 3 dots */}
      {isSending && <>
        <circle cx="6"  cy="10" r="1.3" fill={dotColor}/>
        <circle cx="10" cy="10" r="1.3" fill={dotColor}/>
        <circle cx="14" cy="10" r="1.3" fill={dotColor}/>
      </>}

      {/* Sent — single faint check (left-aligned) */}
      {isSent && (
        <path d="M6 10.5L8.5 13L13 7.5"
          stroke={faintCheck} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      )}

      {/* Delivered — double faint checks */}
      {isDelivered && <>
        <path d="M4.5 10.5L7 13L11.5 7.5"
          stroke={faintCheck} strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M8 10.5L10.5 13L15 7.5"
          stroke={faintCheck} strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </>}

      {/* Read — double solid white checks */}
      {isRead && <>
        <path d="M4.5 10.5L7 13L11.5 7.5"
          stroke={solidCheck} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M8 10.5L10.5 13L15 7.5"
          stroke={solidCheck} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </>}
    </svg>
  );
}

/* ─── Play / Pause button (60×60dp) ─── */
function PlayPauseButton({ isPlaying, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 60, height: 60, borderRadius: 30,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {isPlaying ? (
        /* Pause icon */
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <rect x="6" y="5" width="4" height="14" rx="1.5"/>
          <rect x="14" y="5" width="4" height="14" rx="1.5"/>
        </svg>
      ) : (
        /* Play icon */
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M8 5.14v13.72a1 1 0 001.53.85l10.36-6.86a1 1 0 000-1.7L9.53 4.29A1 1 0 008 5.14z"/>
        </svg>
      )}
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

/* ─── Figma placeholder (.Base/Media Link preview card) ───
   From screenshot: lavender (#ede7f6) background, centered filled purple
   rounded rectangle with white sun circle + white mountain silhouette.
   Encoded as inline SVG data URL so it renders as a proper <img>. */
function MediaPlaceholder() {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="330" height="187" viewBox="0 0 330 187">',
    '<rect width="330" height="187" fill="#ede7f6"/>',
    '<g transform="translate(139,69)">',
    /* Outer purple rounded rect */
    '<rect x="0" y="0" width="52" height="38" rx="5" fill="#6d28d9"/>',
    /* White sun */
    '<circle cx="14" cy="11" r="5.5" fill="#ede7f6"/>',
    /* White mountain */
    '<path d="M0 32 L16 16 L24 23 L33 12 L52 32 L52 38 L0 38 Z" fill="#ede7f6"/>',
    '</g>',
    '</svg>'
  ].join('');
  return (
    <img
      src={"data:image/svg+xml," + encodeURIComponent(svg)}
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

/* ─── Main component ─── */
function LinkPreviewCard(props) {
  const type          = props.Type          || "Received links";
  const styles        = props.Styles        || "RCS";
  const category      = props.Category      || "Incoming";
  const showPlayProp  = props["Show Play/Pause"] !== false;
  const receiptMode   = props["Read receipt Mode"]   || "Light";
  const receiptStatus = props["Read receipt Status"] || "Read";
  const { mediaImg, dominantColor, title, brand, dark } = props;

  /* Dynamic play/pause state — toggled by clicking the button */
  const [isPlaying, setIsPlaying] = useState(false);

  const T = dark ? THEMES.dark : THEMES.light;

  const isVideo    = type === "Video";
  const isImage    = type === "Image";
  const isSentLink = type === "Sent links";
  const isRecvLink = type === "Received links";
  const isLink     = isSentLink || isRecvLink;
  const isRCS      = styles === "RCS";
  const isOut      = category === "Outgoing";

  /* ── Visibility rules ──
     Play button:
       - Video: always show (regardless of showPlayProp)
       - Sent links + Received links: show only if showPlayProp = true
     Read receipt:
       - Sent links + RCS only
       - Image + RCS + Outgoing
       - Video + RCS + Outgoing
  */
  const showPlay = isVideo
    ? true
    : (isLink && showPlayProp);

  const showReadReceipt =
    (isSentLink && isRCS) ||
    (isImage    && isRCS && isOut) ||
    (isVideo    && isRCS && isOut);

  /* Card background — dominant color, not affected by dark toggle */
  const hasDominant  = mediaImg && dominantColor && dominantColor !== "#e0e0e0";
  const cardBg       = hasDominant ? dominantColor : (dark ? "#2c2c2c" : "#e8eaed");
  const isDarkCardBg = lum(cardBg) < 0.5;

  /* Info area text responds ONLY to card bg luminance */
  const titleColor = isDarkCardBg ? "#ffffff" : "#1f1f1f";
  const brandColor = isDarkCardBg ? "rgba(255,255,255,0.7)" : "#444746";

  /* Link area bg — uses workspace theme (separate surface) */
  let linkBg, linkText;
  if (isSentLink && isRCS) { linkBg = T.pri;  linkText = dark ? T.onPri : "#ffffff"; }
  else if (isSentLink)     { linkBg = T.priC; linkText = T.onPriC; }
  else                     { linkBg = T.surfC; linkText = T.onSurf; }

  const mediaRadius = isLink ? "0 0 12px 12px" : "20px 20px 0 0";

  const brandLower = (brand || "").toLowerCase();
  const isYouTube  = brandLower.includes("youtube") || brandLower.includes("youtu");

  const displayUrl = brand
    ? "https://www." + brand.replace(/^https?:\/\/(www\.)?/, "") + "/watch?v=dQw4w9WgXcQ"
    : "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  return (
    <div style={{ width: 330, borderRadius: 20, overflow: "hidden", background: cardBg, fontFamily: S.f }}>

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

      {/* Media area */}
      <div style={{
        width: 330, height: 187, position: "relative",
        overflow: "hidden", borderRadius: mediaRadius, flexShrink: 0,
      }}>
        {mediaImg
          ? <img src={mediaImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
          : <MediaPlaceholder />
        }

        {showPlay && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            <PlayPauseButton isPlaying={isPlaying} onClick={e => { e.stopPropagation(); setIsPlaying(!isPlaying); }} />
          </div>
        )}
      </div>

      {/* Info area — responds to card bg luminance, not dark mode */}
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
            <BrandIcon isYouTube={isYouTube} color={brandColor}/>
          </div>
          <span style={{ fontSize: 12, lineHeight: "16px", color: brandColor, letterSpacing: "0.1px" }}>
            {brand || "brand.com"}
          </span>
        </div>

        {showReadReceipt && (
          <div style={{ position: "absolute", bottom: 10, right: 12 }}>
            <ReadReceipt mode={receiptMode} status={receiptStatus}/>
          </div>
        )}
      </div>
    </div>
  );
}

const Renderer = LinkPreviewCard;
