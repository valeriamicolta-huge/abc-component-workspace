/* ReadReceiptIcon — shared component, Type = "Link preview card"

   Figma source: 5L3DIB62Y0dFU3uVgLBeVK
   Component set node: 16999:35496
   Link preview card variants: 22983:37166 – 22983:37180

   Built from Figma building blocks:
   - .Shapes Read receipt (10895:39324): 20×20dp circle + check/dot positions
   - .Double check icon (10895:50853): 10.65×8.224dp, two filled path vectors

   Construction:

   BASE SHAPE (.Shapes Read receipt):
   - 20×20dp filled circle (no stroke variant for Link preview card)
   - Dots (Sending):   3 circles at inset-[44.44%_61.11%_44.44%_27.78%], [44.44%], [44.44%_27.78%_44.44%_61.11%]
   - Single check (Sent):      .double check icon at inset-[27.75%_19.55%_31.13%_27.2%],  LEFT path only
   - Double check (Delivered): .double check icon at inset-[27.75%_24.55%_31.13%_22.2%],  BOTH paths
   - Double check (Read):      same position as Delivered, BOTH paths, different circle fill

   CHECKMARK PATHS (exact from .double check icon node 10895:50853, viewBox 0 0 12 9):
   - Left path  (node 10895:50854): fills left 75.64% of the 10.65px container (inset-[0_24.36%_0_0])
   - Right path (node 10895:50855): fills right 41.56%, starts at 58.44% (inset-[0_-12.52%_0_58.44%])
   Paths are FILLED shapes, not strokes. Color is applied via SVG fill attribute.

   DOUBLE CHECK ICON geometry within 20×20 circle:
   - Sent container:           top=5.55, left=5.44, w=10.65, h=8.224  → translate(5.44, 5.55) scale(10.65/12, 8.224/9)
   - Delivered/Read container: top=5.55, left=4.44, w=10.65, h=8.224  → translate(4.44, 5.55) scale(10.65/12, 8.224/9)

   TYPE = LINK PREVIEW CARD token values (get_variable_defs, nodes 22983:37166–37180):
   - Light/Sending:   circle = #9e9e9e,  dots   = rgba(0,0,0,0.38)
   - Light/Sent:      circle = #9e9e9e,  check  = rgba(0,0,0,0.45)
   - Light/Delivered: circle = #9e9e9e,  checks = rgba(0,0,0,0.45)
   - Light/Read:      circle = #f2f2f2 (md.sys.color.inverse-on-surface), checks = #444746 (md.sys.color.on-surface-variant)
   - Dark/Sending:    circle = #5c5c5e,  dots   = rgba(255,255,255,0.45)
   - Dark/Sent:       circle = #5c5c5e,  check  = rgba(255,255,255,0.55)
   - Dark/Delivered:  circle = #5c5c5e,  checks = rgba(255,255,255,0.55)
   - Dark/Read:       circle = #303030 (md.sys.color.inverse-on-surface dark), checks = #ffffff

   Component opacity: always 1 — Link preview card has no opacity reduction for any status.

   Sending dots (converted from Figma % insets within 20×20):
   - Left dot:   inset-[44.44%_61.11%_44.44%_27.78%] → cx=6.667, cy=10, r=1.111
   - Center dot: inset-[44.44%]                       → cx=10,    cy=10, r=1.111
   - Right dot:  inset-[44.44%_27.78%_44.44%_61.11%] → cx=13.333,cy=10, r=1.111

   Usage: <ReadReceiptIcon mode="Light" status="Sending" />
   Props:
     mode   — "Light" | "Dark"
     status — "Sending" | "Sent" | "Delivered" | "Read"
*/

/* ── Exact filled paths from .double check icon (10895:50853), viewBox 0 0 12 9 ── */
const LEFT_PATH  = "M3.05932 8.22417C2.81912 8.22417 2.59163 8.11348 2.44739 7.92486L0.150879 4.92187C-0.100758 4.59287 -0.0302234 4.12845 0.307199 3.88356C0.645258 3.63867 1.12248 3.70731 1.37412 4.03569L2.99705 6.15807L6.64261 0.354912C6.86248 0.00551026 7.33144 -0.104567 7.6911 0.108784C8.05013 0.322754 8.16388 0.77914 7.94401 1.12916L3.71002 7.86921C3.57785 8.07947 3.34718 8.21243 3.09427 8.22356C3.08284 8.22356 3.07076 8.22417 3.05932 8.22417Z";
const RIGHT_PATH = "M6.98576 8.22417C6.85041 8.22417 6.71315 8.18893 6.5886 8.11534C6.22958 7.90137 6.11583 7.44498 6.3357 7.09496L10.5697 0.354912C10.7895 0.00551026 11.2585 -0.104567 11.6182 0.108784C11.9772 0.322754 12.0909 0.77914 11.8711 1.12916L7.63709 7.86921C7.49348 8.09802 7.24248 8.22417 6.98576 8.22417Z";

/* Scale factors to map the 12×9 viewBox into the 10.65×8.224dp container */
const SX = 10.65 / 12;   /* 0.8875 */
const SY = 8.224 / 9;    /* 0.9138 */

function ReadReceiptIcon({ mode, status }) {
  const isLight     = mode !== "Dark";
  const isSending   = status === "Sending";
  const isSent      = status === "Sent";
  const isDelivered = status === "Delivered";
  const isRead      = status === "Read";

  /* ── Circle fill ──────────────────────────────────────────────────────────────
     Read:   md.sys.color.inverse-on-surface  (#f2f2f2 light / #303030 dark)
     Others: Link preview card grey           (#9e9e9e light / #5c5c5e dark) */
  const circleFill = isRead
    ? (isLight ? "#f2f2f2" : "#303030")
    : (isLight ? "#9e9e9e" : "#5c5c5e");

  /* ── Mark colors ──────────────────────────────────────────────────────────────
     Read:   md.sys.color.on-surface-variant (#444746 light / #ffffff dark) — solid
     Others: reduced opacity on the grey circle */
  const markColor = isRead
    ? (isLight ? "#444746" : "#ffffff")
    : (isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.55)");

  const dotColor = isRead
    ? (isLight ? "#444746" : "#ffffff")
    : (isLight ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.45)");

  /* ── Check container origins ──────────────────────────────────────────────────
     Sent:            inset-[27.75%_19.55%_31.13%_27.2%]  → x=5.44, y=5.55
     Delivered/Read:  inset-[27.75%_24.55%_31.13%_22.2%]  → x=4.44, y=5.55 */
  const sentX  = 5.44;
  const dblX   = 4.44;
  const checkY = 5.55;

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Circle — filled, no stroke */}
      <circle cx="10" cy="10" r="10" fill={circleFill} />

      {/* Sending — 3 static dots at exact Figma inset positions */}
      {isSending && <>
        <circle cx="6.667"  cy="10" r="1.111" fill={dotColor} />
        <circle cx="10"     cy="10" r="1.111" fill={dotColor} />
        <circle cx="13.333" cy="10" r="1.111" fill={dotColor} />
      </>}

      {/* Sent — left path only, placed at Sent container origin */}
      {isSent && (
        <g transform={`translate(${sentX}, ${checkY}) scale(${SX}, ${SY})`}>
          <path d={LEFT_PATH} fill={markColor} />
        </g>
      )}

      {/* Delivered — both paths at Delivered container origin */}
      {isDelivered && (
        <g transform={`translate(${dblX}, ${checkY}) scale(${SX}, ${SY})`}>
          <path d={LEFT_PATH}  fill={markColor} />
          <path d={RIGHT_PATH} fill={markColor} />
        </g>
      )}

      {/* Read — same geometry as Delivered, solid on-surface-variant fill */}
      {isRead && (
        <g transform={`translate(${dblX}, ${checkY}) scale(${SX}, ${SY})`}>
          <path d={LEFT_PATH}  fill={markColor} />
          <path d={RIGHT_PATH} fill={markColor} />
        </g>
      )}
    </svg>
  );
}

const Component = ReadReceiptIcon;
