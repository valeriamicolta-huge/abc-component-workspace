/* Voice Message visual renderer.
   Receives all variant props plus mediaImg, dominantColor, title, brand, dark.
   Available globals: React, useState, useRef, useEffect, useContext, THEMES, S, ThemeCtx, useT, lum.
   Must end with: const Renderer = ComponentName; */

function Waveform(props) {
  const count = props.count || 32;
  const bars = [];
  for (let i = 0; i < count; i++) {
    const h = 4 + Math.abs(Math.sin(i * 1.7) * 14) + Math.abs(Math.cos(i * 2.3) * 6);
    bars.push(h);
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, height: 24 }}>
      {bars.map((h, i) => (
        <div key={i} style={{
          width: 2, height: h, borderRadius: 1,
          background: (i / count) < props.progress ? props.playedColor : props.color,
          flexShrink: 0,
        }} />
      ))}
    </div>
  );
}

function VoiceMessage(props) {
  const service = props.Service;
  const chat = props.Chat;
  const type = props.Type;
  const status = props.Status;
  const { dark } = props;
  const T = dark ? THEMES.dark : THEMES.light;
  const isPlaying = status === "Playing";
  const isRCS = service === "RCS";
  const isXMSAlt = service === "xMS alt";
  const isOut = chat === "Outgoing";
  const isRCSOut = isRCS && isOut;
  const hasTranscriptButton = type === "w/transcription";
  const isExpanded = type === "w/transcription expanded";

  let bubbleBg;
  if (isRCSOut) bubbleBg = T.pri;
  else if (isXMSAlt) bubbleBg = T.surf;
  else if (isOut) bubbleBg = T.surfCH;
  else bubbleBg = T.surfC;

  const onBubble = isRCSOut ? T.onPri : T.onSurf;
  const playBtnBg = isRCSOut ? T.onPri : T.pri;
  const playBtnIcon = isRCSOut ? T.pri : T.onPri;
  const transcriptBtnBg = isRCSOut ? "rgba(255,255,255,0.15)" : T.surfCH;
  const transcriptBtnText = isRCSOut ? T.onPri : T.onSurf;
  const borderStyle = isXMSAlt ? "1px solid " + T.outlV : "none";

  return (
    <div style={{ width: 290, borderRadius: 20, overflow: "hidden", background: bubbleBg, fontFamily: S.f, border: borderStyle, boxSizing: "border-box" }}>
      {isExpanded && (
        <div style={{ padding: "12px 12px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, background: transcriptBtnBg, border: "none", color: transcriptBtnText, fontFamily: S.f, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 9L3 3M9 9V4M9 9H4M15 9L21 3M15 9V4M15 9H20M9 15L3 21M9 15V20M9 15H4M15 15L21 21M15 15V20M15 15H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Hide transcript
          </button>
          <button style={{ width: 28, height: 28, borderRadius: 14, background: "transparent", border: "none", color: onBubble, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 2V5M12 19V22M5 12H2M22 12H19M5.64 5.64L7.76 7.76M16.24 16.24L18.36 18.36M5.64 18.36L7.76 16.24M16.24 7.76L18.36 5.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}

      {isExpanded && (
        <div style={{ padding: "0 16px 12px" }}>
          {props.title && <p style={{ fontSize: 16, fontWeight: 500, lineHeight: "24px", color: onBubble, margin: "0 0 8px" }}>{props.title}</p>}
          <p style={{ fontSize: 16, lineHeight: "24px", color: onBubble, margin: 0 }}>
            Hey I was thinking that instead of dinner tonight that we get together next Friday instead. Its been quite a hectic and I just need some time to wind down. I'll go ahead and book us a table at Sushi Kappo Tamuro over at Eastlake at 7pm. Hopefully that works for you, but let me know if it doesn't. Okay thats it. Looking forward to seeing you.
          </p>
        </div>
      )}

      {hasTranscriptButton && (
        <div style={{ padding: "12px 12px 4px", display: "flex" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, background: transcriptBtnBg, border: "none", color: transcriptBtnText, fontFamily: S.f, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M3 3L9 9M3 3V8M3 3H8M21 3L15 9M21 3V8M21 3H16M3 21L9 15M3 21V16M3 21H8M21 21L15 15M21 21V16M21 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View transcript
          </button>
        </div>
      )}

      <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: 10, position: "relative" }}>
        <button style={{ width: 40, height: 40, borderRadius: 20, background: playBtnBg, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill={playBtnIcon}>
              <rect x="6" y="5" width="4" height="14" rx="1"/>
              <rect x="14" y="5" width="4" height="14" rx="1"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill={playBtnIcon}>
              <path d="M8 5.14v13.72a1 1 0 001.53.85l10.36-6.86a1 1 0 000-1.7L9.53 4.29A1 1 0 008 5.14z"/>
            </svg>
          )}
        </button>

        <Waveform
          color={isRCSOut ? "rgba(255,255,255,0.4)" : T.outl}
          playedColor={isRCSOut ? T.onPri : T.pri}
          progress={isPlaying ? 0.4 : 0}
          count={32}
        />

        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: "20px", color: onBubble, fontFamily: S.f, flexShrink: 0, minWidth: 40 }}>
          {isPlaying ? "00:09" : "00:05"}
        </span>

        {isRCSOut && (
          <div style={{ position: "absolute", bottom: -2, right: 8 }}>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5L4 8L9 2" stroke={T.onPri} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
              <path d="M5 5L8 8L13 2" stroke={T.onPri} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

const Renderer = VoiceMessage;
