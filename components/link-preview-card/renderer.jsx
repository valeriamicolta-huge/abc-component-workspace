/* Link Preview Card visual renderer.
   Receives all variant props, plus mediaImg, dominantColor, title, brand, dark.
   Available globals from workspace: React, useState, useRef, useEffect, useContext, THEMES, S, ThemeCtx, useT, lum.
   Must end with: const Renderer = ComponentName; */

function LinkPreviewCard(props) {
  const type = props.Type;
  const styles = props.Styles;
  const category = props.Category;
  const showPlayPause = props["Show Play/Pause"];
  const { mediaImg, dominantColor, title, brand, dark } = props;
  const T = dark ? THEMES.dark : THEMES.light;
  const isVideo = type === "Video", isImage = type === "Image", isSent = type === "Sent links", isReceived = type === "Received links";
  const isRCS = styles === "RCS", isOut = category === "Outgoing", isLink = isSent || isReceived;
  const bg = dominantColor && dominantColor !== "#e0e0e0" ? dominantColor : (dark ? "#3c3c3c" : "#e0e0e0");
  const linkBg = isSent && isRCS ? T.pri : isSent ? T.priC : T.surfC;
  const linkColor = isSent && isRCS ? (dark ? "#062e6f" : "#fff") : isSent ? T.onPriC : T.onSurf;
  const isDarkBg = lum(bg) < 0.5;
  const titleC = isDarkBg ? "#fff" : T.onSurf;
  const brandC = isDarkBg ? "rgba(255,255,255,0.7)" : T.onSurfV;

  return (
    <div style={{ width: 330, borderRadius: 20, overflow: "hidden", background: bg, fontFamily: S.f }}>
      {isLink && (
        <div style={{ padding: "12px 16px", background: linkBg }}>
          <p style={{ fontSize: 16, lineHeight: "24px", color: linkColor, maxWidth: 260, margin: 0, wordBreak: "break-word" }}>
            https://www.youtube.com/watch?v=example
          </p>
        </div>
      )}
      <div style={{ width: 330, height: 187, position: "relative", overflow: "hidden", borderRadius: isLink ? "0 0 12px 12px" : (isImage || isVideo) ? "20px 20px 0 0" : 0 }}>
        {mediaImg ? (
          <img src={mediaImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg," + bg + "88," + bg + "cc)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
              <circle cx="8.5" cy="8.5" r="2" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
              <path d="M2 16L7 11L10 14L15 9L22 16" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
            </svg>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Upload an image</span>
          </div>
        )}
        {(isVideo || isLink) && showPlayPause && (
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 60, height: 60, borderRadius: 30, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5.14v13.72a1 1 0 001.53.85l10.36-6.86a1 1 0 000-1.7L9.53 4.29A1 1 0 008 5.14z"/>
            </svg>
          </div>
        )}
      </div>
      <div style={{ padding: "14px 32px 20px 16px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 16, fontWeight: 500, lineHeight: "24px", color: titleC, margin: 0, whiteSpace: "pre-line" }}>
            {title || "Card title goes here"}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 16, borderRadius: 2, background: "red", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="10" height="7" viewBox="0 0 10 7" fill="#fff">
                <path d="M4 0L0 3.5L4 7V4.5C7 4.5 9 5.5 10 7C9.5 4 7.5 1 4 0V0Z"/>
              </svg>
            </div>
            <span style={{ fontSize: 12, lineHeight: "16px", color: brandC, letterSpacing: "0.1px" }}>
              {brand || "brand.com"}
            </span>
          </div>
        </div>
        {isRCS && isOut && (
          <div style={{ position: "absolute", bottom: 8, right: 8 }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5L4 8L9 2" stroke={isDarkBg ? "rgba(255,255,255,0.6)" : T.onSurfV} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 5L8 8L13 2" stroke={isDarkBg ? "rgba(255,255,255,0.6)" : T.onSurfV} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

const Renderer = LinkPreviewCard;
