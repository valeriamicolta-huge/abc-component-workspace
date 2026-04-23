/* Link Preview Card renderer
   Globals: React, useState, useRef, useEffect, THEMES, S, lum
   Shared component globals: ReadReceiptIcon (from components/_shared/read-receipt-icon/)

   Babel-safe rules:
   - No template literals (backticks)
   - No destructuring in function params
   - No arrow functions with implicit returns in JSX
   - No const/let in top-level — use var or function declarations
   - Must end with: const Renderer = LinkPreviewCard;
*/

/* ── Play/Pause button (60x60dp) ─────────────────────────────────────────── */
function PlayPauseButton(props) {
  var isPlaying = props.isPlaying;
  var onClick   = props.onClick;
  return React.createElement("div", {
    onClick: onClick,
    style: {
      width: 60, height: 60, borderRadius: 30,
      background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", flexShrink: 0,
    }
  },
    isPlaying
      ? React.createElement("svg", { width: 28, height: 28, viewBox: "0 0 24 24", fill: "#fff" },
          React.createElement("rect", { x: 6,  y: 5, width: 4, height: 14, rx: 1.5 }),
          React.createElement("rect", { x: 14, y: 5, width: 4, height: 14, rx: 1.5 })
        )
      : React.createElement("svg", { width: 28, height: 28, viewBox: "0 0 24 24", fill: "#fff" },
          React.createElement("path", { d: "M8 5.14v13.72a1 1 0 001.53.85l10.36-6.86a1 1 0 000-1.7L9.53 4.29A1 1 0 008 5.14z" })
        )
  );
}

/* ── Brand icon (16x16dp) ────────────────────────────────────────────────── */
function BrandIcon(props) {
  var isYouTube = props.isYouTube;
  var color     = props.color;
  if (isYouTube) {
    return React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none" },
      React.createElement("rect", { x: 1, y: 3.5, width: 14, height: 9, rx: 2.5, fill: "#FF0000" }),
      React.createElement("path", { d: "M6.5 5.5L11 8L6.5 10.5V5.5Z", fill: "white" })
    );
  }
  return React.createElement("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none" },
    React.createElement("circle", { cx: 12, cy: 12, r: 9, stroke: color, strokeWidth: 1.5 }),
    React.createElement("path", { d: "M12 3C12 3 9 7 9 12C9 17 12 21 12 21M12 3C12 3 15 7 15 12C15 17 12 21 12 21", stroke: color, strokeWidth: 1.2 }),
    React.createElement("path", { d: "M3.5 12H20.5M4 7.5H20M4 16.5H20", stroke: color, strokeWidth: 1.2 })
  );
}

/* ── Media placeholder ───────────────────────────────────────────────────────
   Hosted at components/link-preview-card/media-placeholder.svg in the repo.
   Upload Media.svg as media-placeholder.svg to that folder in GitHub. */
var MEDIA_PLACEHOLDER_URL = "https://raw.githubusercontent.com/valeriamicolta-huge/abc-component-workspace/main/components/link-preview-card/media-placeholder.svg";

function MediaPlaceholder() {
  return React.createElement("img", {
    src: MEDIA_PLACEHOLDER_URL,
    alt: "",
    style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
  });
}

/* ── Main component ──────────────────────────────────────────────────────── */
function LinkPreviewCard(props) {
  var type          = props.Type                  || "Received links";
  var styles        = props.Styles                || "RCS";
  var category      = props.Category              || "Incoming";
  var showPlayProp  = props["Show Play/Pause"]    !== false;
  var receiptStatus = props["Read receipt Status"] || "Read";
  var mediaImg      = props.mediaImg;
  var dominantColor = props.dominantColor;
  var title         = props.title;
  var brand         = props.brand;
  var dark          = props.dark;

  var playState  = useState(false);
  var isPlaying  = playState[0];
  var setPlaying = playState[1];

  var T = dark ? THEMES.dark : THEMES.light;

  var isVideo    = type === "Video";
  var isImage    = type === "Image";
  var isSentLink = type === "Sent links";
  var isRecvLink = type === "Received links";
  var isLink     = isSentLink || isRecvLink;
  var isRCS      = styles === "RCS";
  var isOut      = category === "Outgoing";

  var showPlay = isVideo ? true : (isLink && showPlayProp);
  var showReadReceipt =
    (isSentLink && isRCS) ||
    (isImage    && isRCS && isOut) ||
    (isVideo    && isRCS && isOut);

  /* Card background — driven by dominant color, unaffected by dark toggle */
  var hasDominant  = mediaImg && dominantColor && dominantColor !== "#e0e0e0";
  var cardBg       = hasDominant ? dominantColor : (dark ? "#2c2c2c" : "#e8eaed");
  var isDarkCardBg = lum(cardBg) < 0.5;

  /* Text colors respond to card bg luminance */
  var titleColor = isDarkCardBg ? "#ffffff" : "#1f1f1f";
  var brandColor = isDarkCardBg ? "rgba(255,255,255,0.7)" : "#444746";

  /* Link area background */
  var linkBg, linkText;
  if (isSentLink && isRCS) { linkBg = T.pri;   linkText = dark ? T.onPri : "#ffffff"; }
  else if (isSentLink)     { linkBg = T.priC;  linkText = T.onPriC; }
  else                     { linkBg = T.surfC; linkText = T.onSurf; }

  var mediaRadius = isLink ? "0 0 12px 12px" : "20px 20px 0 0";

  var brandLower = (brand || "").toLowerCase();
  var isYouTube  = brandLower.indexOf("youtube") >= 0 || brandLower.indexOf("youtu") >= 0;

  var cleanBrand  = (brand || "").replace(/^https?:\/\/(www\.)?/, "");
  var displayUrl  = brand
    ? "https://www." + cleanBrand + "/watch?v=dQw4w9WgXcQ"
    : "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  var receiptMode = dark ? "Dark" : "Light";

  return React.createElement("div", {
    style: { width: 330, borderRadius: 20, overflow: "hidden", background: cardBg, fontFamily: S.f }
  },

    /* Link text area */
    isLink && React.createElement("div", { style: { padding: "12px 16px", background: linkBg } },
      React.createElement("p", {
        style: {
          fontSize: 16, lineHeight: "24px", color: linkText,
          margin: 0, wordBreak: "break-all",
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
        }
      }, displayUrl)
    ),

    /* Media area */
    React.createElement("div", {
      style: {
        width: 330, height: 187, position: "relative",
        overflow: "hidden", borderRadius: mediaRadius, flexShrink: 0,
      }
    },
      mediaImg
        ? React.createElement("img", { src: mediaImg, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
        : React.createElement(MediaPlaceholder, null),

      showPlay && React.createElement("div", {
        style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }
      },
        React.createElement(PlayPauseButton, {
          isPlaying: isPlaying,
          onClick: function(e) { e.stopPropagation(); setPlaying(function(p) { return !p; }); }
        })
      )
    ),

    /* Info area */
    React.createElement("div", { style: { padding: "14px 16px 16px", position: "relative" } },
      React.createElement("p", {
        style: {
          fontSize: 16, fontWeight: 500, lineHeight: "24px",
          color: titleColor, margin: "0 0 10px",
          overflow: "hidden", display: "-webkit-box",
          WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        }
      }, title || "Card title goes here"),

      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
        React.createElement("div", { style: { width: 16, height: 16, flexShrink: 0 } },
          React.createElement(BrandIcon, { isYouTube: isYouTube, color: brandColor })
        ),
        React.createElement("span", {
          style: { fontSize: 12, lineHeight: "16px", color: brandColor, letterSpacing: "0.1px" }
        }, brand || "brand.com")
      ),

      showReadReceipt && React.createElement("div", {
        style: { position: "absolute", bottom: 10, right: 12 }
      },
        React.createElement(ReadReceiptIcon, { mode: receiptMode, status: receiptStatus })
      )
    )
  );
}

const Renderer = LinkPreviewCard;
