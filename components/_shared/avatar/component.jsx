/* Avatar — shared component, Size = 56
   Figma source: 5L3DIB62Y0dFU3uVgLBeVK
   Avatar frame node:    10798:136557
   Monogram base node:   18425:64943

   Types exposed (Size=56 only):
     "Single Avatar"              — Person photo. Placeholder shown, user can upload.
     "Unassigned Avatar"          — Grey circle + person silhouette. User can upload.
     "Monogram"                   — Coloured circle + single initial. Color + initial editable.
     "Unassigned Business Avatar" — Rounded-square grey + building icon. User can upload.
     "Business Avatar"            — Brand logo. Placeholder shown, user can upload.

   Props:
     type    — string (one of the 5 types above)
     color   — "Red"|"Green"|"Yellow"|"Purple"|"Pink"|"Cyan"  (Monogram only)
     initial — single character                                 (Monogram only)
     dark    — boolean, follows workspace toggle

   Clicking any uploadable avatar opens a file picker.
   Hovering shows a camera overlay to signal uploadability.

   Icon strategy: ALL icons are pure inline SVG. No Google Symbols font.
   Image placeholders: stable URLs, never expire.

   Must end with: const Component = Avatar;
*/

/* Monogram palette — from Figma variable defs on node 18425:64943 */
var MONOGRAM = {
  Red:    { lb: "#FFCDD2", db: "#B71C1C", lt: "#60150f", dt: "#fff8f8" },
  Green:  { lb: "#C8E6C9", db: "#1B5E20", lt: "#00381f", dt: "#f2fcef" },
  Yellow: { lb: "#FFF9C4", db: "#4d2600", lt: "#4d2600", dt: "#fffade" },
  Purple: { lb: "#E1BEE7", db: "#4A148C", lt: "#400b84", dt: "#fdf8ff" },
  Pink:   { lb: "#FCE4EC", db: "#880E4F", lt: "#620438", dt: "#fff7fc" },
  Cyan:   { lb: "#B2EBF2", db: "#006064", lt: "#003641", dt: "#f0fbff" },
};

/* Stable placeholder images — not expiring */
var IMG_PERSON   = "https://i.pravatar.cc/112?img=47";
var IMG_BUSINESS = "https://logo.clearbit.com/google.com";

/* Hover CSS injected once */
var HOVER_CSS = ".av-wrap:hover .av-cam { opacity: 1 !important; }";

/* Camera overlay — shown on hover */
function CamOverlay() {
  return React.createElement("div", {
    className: "av-cam",
    style: {
      position: "absolute", inset: 0, borderRadius: "inherit",
      background: "rgba(0,0,0,0.35)",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: 0, transition: "opacity 0.15s",
    }
  },
    React.createElement("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none" },
      React.createElement("path", { d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z", stroke: "#fff", strokeWidth: 1.8, strokeLinejoin: "round" }),
      React.createElement("circle", { cx: 12, cy: 13, r: 4, stroke: "#fff", strokeWidth: 1.8 })
    )
  );
}

/* Person silhouette SVG — Unassigned Avatar */
function PersonIcon(props) {
  var c = props.color || "#747775";
  var s = props.size  || 32;
  return React.createElement("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", style: { display: "block" } },
    React.createElement("circle", { cx: 12, cy: 8, r: 4, fill: c }),
    React.createElement("path",   { d: "M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8", fill: c })
  );
}

/* Building SVG — Unassigned Business Avatar */
function BuildingIcon(props) {
  var c = props.color || "#747775";
  var s = props.size  || 30;
  return React.createElement("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", style: { display: "block" } },
    React.createElement("rect",   { x: 3,  y: 3,  width: 18, height: 18, rx: 1, stroke: c, strokeWidth: 1.5 }),
    React.createElement("rect",   { x: 7,  y: 7,  width: 3,  height: 3,  fill: c }),
    React.createElement("rect",   { x: 14, y: 7,  width: 3,  height: 3,  fill: c }),
    React.createElement("rect",   { x: 7,  y: 13, width: 3,  height: 3,  fill: c }),
    React.createElement("rect",   { x: 14, y: 13, width: 3,  height: 3,  fill: c }),
    React.createElement("rect",   { x: 10, y: 16, width: 4,  height: 5,  fill: c })
  );
}

function Avatar(props) {
  var type    = props.type    || "Single Avatar";
  var color   = props.color   || "Red";
  var initial = (props.initial || "A").charAt(0).toUpperCase();
  var dark    = !!props.dark;

  var upState     = useState(null);
  var uploaded    = upState[0];
  var setUploaded = upState[1];
  var inputRef    = useRef(null);

  function onUpload(e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var r = new FileReader();
    r.onload = function(ev) { setUploaded(ev.target.result); };
    r.readAsDataURL(f);
  }

  function open() { if (inputRef.current) inputRef.current.click(); }

  var base = {
    width: 56, height: 56, borderRadius: "50%",
    position: "relative", flexShrink: 0, overflow: "hidden",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
  };

  var input = React.createElement("input", {
    ref: inputRef, type: "file", accept: "image/*",
    onChange: onUpload, style: { display: "none" }
  });

  var style_ = React.createElement("style", null, HOVER_CSS);

  /* ── Single Avatar ── */
  if (type === "Single Avatar") {
    return React.createElement("div", { className: "av-wrap", style: base, onClick: open },
      style_, input,
      React.createElement("img", {
        src: uploaded || IMG_PERSON, alt: "Avatar",
        style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
      }),
      React.createElement(CamOverlay, null)
    );
  }

  /* ── Unassigned Avatar ── */
  if (type === "Unassigned Avatar") {
    var bg  = dark ? "#3c3c3c" : "#e8eaf0";
    var ic  = dark ? "#9aa0a6" : "#747775";
    return React.createElement("div", { className: "av-wrap", style: Object.assign({}, base, { background: bg }), onClick: open },
      style_, input,
      uploaded
        ? React.createElement("img", { src: uploaded, alt: "Avatar", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
        : React.createElement(PersonIcon, { color: ic, size: 32 }),
      React.createElement(CamOverlay, null)
    );
  }

  /* ── Monogram ── */
  if (type === "Monogram") {
    var pal  = MONOGRAM[color] || MONOGRAM.Red;
    var bg   = dark ? pal.db : pal.lb;
    var tc   = dark ? pal.dt : pal.lt;
    return React.createElement("div", {
      style: Object.assign({}, base, { background: bg, cursor: "default" })
    },
      React.createElement("span", {
        style: {
          fontFamily: "'Google Sans Flex','Google Sans',sans-serif",
          fontWeight: 400, fontSize: 24, lineHeight: 1,
          color: tc, userSelect: "none",
        }
      }, initial)
    );
  }

  /* ── Unassigned Business Avatar ── */
  if (type === "Unassigned Business Avatar") {
    var bg  = dark ? "#2c2c2c" : "#e9eef6";
    var ic  = dark ? "#9aa0a6" : "#747775";
    var biz = Object.assign({}, base, { background: bg, borderRadius: "14.93px" });
    return React.createElement("div", { className: "av-wrap", style: biz, onClick: open },
      style_, input,
      uploaded
        ? React.createElement("img", { src: uploaded, alt: "Business Avatar", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
        : React.createElement(BuildingIcon, { color: ic, size: 30 }),
      React.createElement(CamOverlay, null)
    );
  }

  /* ── Business Avatar ── */
  if (type === "Business Avatar") {
    var bizStyle = Object.assign({}, base, { borderRadius: "14.93px", background: dark ? "#2c2c2c" : "#f0f4f9" });
    return React.createElement("div", { className: "av-wrap", style: bizStyle, onClick: open },
      style_, input,
      React.createElement("img", {
        src: uploaded || IMG_BUSINESS, alt: "Business Avatar",
        style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
      }),
      React.createElement(CamOverlay, null)
    );
  }

  return null;
}

const Component = Avatar;
