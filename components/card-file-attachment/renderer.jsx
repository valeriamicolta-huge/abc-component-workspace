function CardFileAttachment(props) {
  const {
    Type = "File",
    State = "Generic",
    Stroke = "Off",
    Metadata = false,
    dark = false,
    title = "file_name.pdf",
    brand = "Danielle Holmes",
  } = props;

  // ── Token resolution from Material GenUX Kit v0.4.1 (gm3-color-tokens-full.css) ──
  const light = {
    surfaceContainer:        "#f0f4f9",
    surfaceContainerHighest: "#dde3ea",
    outlineVariant:          "#c4c7c5",
    secondary:               "#00639b",
    onSecondary:             "#ffffff",
    onSurface:               "#1f1f1f",
    onSurfaceVariant:        "#444746",
    onErrorContainer:        "#8c1d18",
    surface:                 "#ffffff",
  };
  const darkTokens = {
    surfaceContainer:        "#1e1f20",
    surfaceContainerHighest: "#333537",
    outlineVariant:          "#444746",
    secondary:               "#7fcfff",
    onSecondary:             "#003553",
    onSurface:               "#e3e3e3",
    onSurfaceVariant:        "#c4c7c5",
    onErrorContainer:        "#f9dedc",
    surface:                 "#131314",
  };

  const T = dark ? darkTokens : light;
  const hasStroke = Stroke === "On";

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    borderRadius: 20,
    fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
    position: "relative",
    width: "fit-content",
    maxWidth: 240,
  };

  const bodyStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: "18px 16px",
    borderRadius: 20,
    backgroundColor: T.surfaceContainer,
    border: hasStroke ? `1px solid ${T.outlineVariant}` : "none",
    width: "100%",
    boxSizing: "border-box",
    minWidth: 160,
  };

  const iconBgStyle = {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: T.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    position: "relative",
  };

  const iconStyle = {
    fontFamily: "'Material Symbols Rounded', sans-serif",
    fontSize: 20,
    color: T.onSecondary,
    lineHeight: 1,
    fontVariationSettings: "'FILL' 1",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 1,
    minWidth: 0,
  };

  const headlineStyle = {
    fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    color: T.onSurface,
    lineHeight: "20px",
    letterSpacing: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 140,
  };

  const secondaryStyle = {
    fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
    fontSize: 12,
    fontWeight: 400,
    color: T.onSurfaceVariant,
    lineHeight: "16px",
    letterSpacing: "0.1px",
    whiteSpace: "nowrap",
  };

  const metaStyle = {
    paddingLeft: 16,
    fontSize: 12,
    fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
    fontWeight: 400,
    color: T.onSurfaceVariant,
    lineHeight: "16px",
    letterSpacing: "0.1px",
  };

  function SkeletonLine({ width }) {
    return (
      <div style={{
        width,
        height: 14,
        borderRadius: 20,
        backgroundColor: T.surfaceContainerHighest,
      }} />
    );
  }

  function ProgressRing() {
    const size = 36, stroke = 4;
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    return (
      <svg width={size} height={size} style={{ position: "absolute", top: 0, left: 0 }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.surfaceContainerHighest} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.secondary} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={circ * 0.5}
          strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
    );
  }

  function getIcon() {
    if (State === "Download" || State === "Download expires") return "download";
    if (State === "Retry") return "refresh";
    if (Type === "Audio") return "audio_file";
    if (Type === "Image") return "image";
    if (Type === "Video") return "video_file";
    return "picture_as_pdf";
  }

  function getErrorHeadline() {
    const map = { Audio: "Can't load audio", Image: "Can't load image", Video: "Can't load video", Contact: "Can't load contact" };
    return map[Type] || "Can't load file";
  }

  // ── LOADING ──
  if (Type === "Loading") {
    return (
      <div style={cardStyle}>
        <div style={bodyStyle}>
          <div style={{ width: 36, height: 36, flexShrink: 0, position: "relative" }}>
            <ProgressRing />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ ...iconStyle, color: T.secondary, fontSize: 18 }}>close</span>
            </div>
          </div>
          <div style={{ ...contentStyle, gap: 4 }}>
            <SkeletonLine width={82} />
            <SkeletonLine width={44} />
          </div>
        </div>
      </div>
    );
  }

  // ── CONTACT ──
  if (Type === "Contact") {
    return (
      <div style={cardStyle}>
        <div style={bodyStyle}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: T.secondary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
            {props.mediaImg
              ? <img src={props.mediaImg} alt="contact" style={{ width: 36, height: 36, objectFit: "cover" }} />
              : <span style={iconStyle}>person</span>}
          </div>
          <div style={contentStyle}>
            <span style={{ ...headlineStyle, color: hasStroke ? T.onSurface : T.onErrorContainer }}>{brand}</span>
            <span style={secondaryStyle}>View contact</span>
          </div>
        </div>
        {Metadata && <div style={metaStyle}>Oct 16, 3:55 PM</div>}
      </div>
    );
  }

  // ── PHOTOS CARD ──
  if (Type === "Photos card") {
    return (
      <div style={cardStyle}>
        <div style={{ ...bodyStyle, padding: 8, alignItems: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: 8, overflow: "hidden", flexShrink: 0, backgroundColor: T.surfaceContainerHighest }}>
            {props.mediaImg
              ? <img src={props.mediaImg} alt="media" style={{ width: 56, height: 56, objectFit: "cover" }} />
              : <div style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ ...iconStyle, color: T.onSurfaceVariant }}>video_file</span>
                </div>}
          </div>
          <div style={contentStyle}>
            <span style={headlineStyle}>1 video</span>
            <span style={secondaryStyle}>32 MB upload</span>
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: T.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path d="M24 4L12 24l12 20h24V4z" fill="#4285F4"/>
              <path d="M24 4L12 24H0V4z" fill="#FBBC04"/>
              <path d="M0 24l12 20h12L12 24z" fill="#34A853"/>
              <path d="M12 44l12-20H12z" fill="#EA4335"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // ── FILE DRAFT ──
  if (Type === "File draft") {
    return (
      <div style={{ ...cardStyle, position: "relative" }}>
        <div style={bodyStyle}>
          <div style={iconBgStyle}>
            <span style={iconStyle}>picture_as_pdf</span>
          </div>
          <div style={contentStyle}>
            <span style={headlineStyle}>{title}</span>
            <span style={secondaryStyle}>13KB ･ File</span>
          </div>
        </div>
        <div style={{ position: "absolute", top: -10, right: -10, width: 24, height: 24, borderRadius: "50%", backgroundColor: T.onSurface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <span style={{ ...iconStyle, fontSize: 16, color: T.surface }}>close</span>
        </div>
      </div>
    );
  }

  // ── FILE RECEIPT ICON ──
  if (Type === "File receipt icon") {
    return (
      <div style={cardStyle}>
        <div style={{ ...bodyStyle, alignItems: "flex-end", position: "relative" }}>
          <div style={iconBgStyle}>
            <span style={iconStyle}>picture_as_pdf</span>
          </div>
          <div style={contentStyle}>
            <span style={headlineStyle}>{title}</span>
            <span style={secondaryStyle}>13KB ･ File</span>
          </div>
          <div style={{ position: "absolute", bottom: 8, right: 8, width: 16, height: 16 }}>
            <svg viewBox="0 0 16 16" width="16" height="16">
              <path d="M1 8l4 4L11 4" stroke={T.secondary} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 8l4 4L15 4" stroke={T.secondary} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {Metadata && <div style={metaStyle}>Oct 16, 3:55 PM</div>}
      </div>
    );
  }

  // ── DEFAULT: Audio / File / Image / Video ──
  const isError = State === "Retry";
  const headline = isError ? getErrorHeadline() : title;
  const showLabel = State === "Generic and label" || State === "Generic";
  const secondaryLabels = { Audio: "0:42 ･ Audio", Image: "1.2MB ･ Image", Video: "18MB ･ Video", File: "13KB ･ File" };

  return (
    <div style={cardStyle}>
      <div style={bodyStyle}>
        <div style={iconBgStyle}>
          <span style={iconStyle}>{getIcon()}</span>
        </div>
        <div style={contentStyle}>
          <span style={headlineStyle}>{headline}</span>
          {showLabel && <span style={secondaryStyle}>{secondaryLabels[Type] || "13KB ･ File"}</span>}
        </div>
      </div>
      {Metadata && <div style={metaStyle}>Oct 16, 3:55 PM</div>}
    </div>
  );
}

const Renderer = CardFileAttachment;
