// ── Inline SVG icons (no external font dependency) ──
const ICONS = {
  picture_as_pdf: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
    </svg>
  ),
  audio_file: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 13c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.36 0 .69.1.99.27L14 9.67V8l-4 1.33v5.08A2 2 0 0 0 11 15z"/>
    </svg>
  ),
  image: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>
  ),
  video_file: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 11l-3 2.12V13H8v-2h2v-2.12L13 11V8l4 4-4 4v-3z"/>
    </svg>
  ),
  download: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
    </svg>
  ),
  download_expires: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" opacity="0.5"/>
      <circle cx="18" cy="18" r="5.5" fill="none" stroke={color} strokeWidth="1.8"/>
      <path d="M18 15.5v3l1.5 1.5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  refresh: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
    </svg>
  ),
  close: (color) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  ),
  close_small: (color) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  ),
  person: (color) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
  video_placeholder: (color) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={color}>
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>
  ),
};

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

  // ── Token resolution from Material GenUX Kit v0.4.1 ──
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

  function getIconKey() {
    if (State === "Download expires") return "download_expires";
    if (State === "Download") return "download";
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
              {ICONS.close(T.secondary)}
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
              : ICONS.person(T.onSecondary)}
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
          <div style={{ width: 56, height: 56, borderRadius: 8, overflow: "hidden", flexShrink: 0, backgroundColor: T.surfaceContainerHighest, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {props.mediaImg
              ? <img src={props.mediaImg} alt="media" style={{ width: 56, height: 56, objectFit: "cover" }} />
              : ICONS.video_placeholder(T.onSurfaceVariant)}
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
            {ICONS.picture_as_pdf(T.onSecondary)}
          </div>
          <div style={contentStyle}>
            <span style={headlineStyle}>{title}</span>
            <span style={secondaryStyle}>13KB ･ File</span>
          </div>
        </div>
        <div style={{ position: "absolute", top: -10, right: -10, width: 24, height: 24, borderRadius: "50%", backgroundColor: T.onSurface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          {ICONS.close_small(T.surface)}
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
            {ICONS.picture_as_pdf(T.onSecondary)}
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
          {ICONS[getIconKey()](T.onSecondary)}
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
