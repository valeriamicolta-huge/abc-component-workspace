/* ReadReceiptIcon — shared component, Type = "Link preview card"

   Figma source: 5L3DIB62Y0dFU3uVgLBeVK
   Component set node: 16999:35496
   Link preview card variants: 22983:37166 – 22983:37180

   Built from Figma building blocks:
   - .Shapes Read receipt (10895:39324): 20×20dp circle + check/dot positions
   - .Double check icon (10895:50853): 10.65×8.224dp, two path vectors

   Construction (from Figma code):

   BASE SHAPE (.Shapes Read receipt):
   - 20×20dp circle (filled for all statuses — no outlined/stroke variant for this type)
   - Dots (Sending):   3 circles at inset-[44.44%_61.11%_44.44%_27.78%], [44.44%], [44.44%_27.78%_44.44%_61.11%]
   - Single check (Sent):      double check icon at inset-[27.75%_19.55%_31.13%_27.2%],  LEFT vector only
   - Double check (Delivered): double check icon at inset-[27.75%_24.55%_31.13%_22.2%],  BOTH vectors
   - Double check (Read):      same position as Delivered, BOTH vectors, different circle fill

   TYPE = LINK PREVIEW CARD token values (from get_variable_defs on nodes 22983:37166–37180):
   - Light/Sending:   circle = #9e9e9e,  dots   = rgba(0,0,0,0.38)
   - Light/Sent:      circle = #9e9e9e,  check  = rgba(0,0,0,0.45)
   - Light/Delivered: circle = #9e9e9e,  checks = rgba(0,0,0,0.45)
   - Light/Read:      circle = #f2f2f2 (md.sys.color.inverse-on-surface), checks = #444746 (md.sys.color.on-surface-variant)
   - Dark/Sending:    circle = #5c5c5e,  dots   = rgba(255,255,255,0.45)
   - Dark/Sent:       circle = #5c5c5e,  check  = rgba(255,255,255,0.55)
   - Dark/Delivered:  circle = #5c5c5e,  checks = rgba(255,255,255,0.55)
   - Dark/Read:       circle = #303030 (md.sys.color.inverse-on-surface dark), checks = #ffffff

   Component opacity: always 1 (Link preview card has no opacity reduction for any status)

   Double check icon exact geometry (10.65×8.224dp within 20×20 circle):
   - Sent container:           top=5.55, left=5.44, w=10.65, h=8.224  (inset-[27.75%_19.55%_31.13%_27.2%])
   - Delivered/Read container: top=5.55, left=4.44, w=10.65, h=8.224  (inset-[27.75%_24.55%_31.13%_22.2%])
   - Left vector:  left 75.64% of container width  (24.36% right inset)
   - Right vector: starts at 58.44% from left, overflows slightly (-12.52% right inset)

   Sending dots (converted from % insets within 20×20):
   - Left dot:   cx=6.667, cy=10, r=1.111
   - Center dot: cx=10,    cy=10, r=1.111
   - Right dot:  cx=13.333,cy=10, r=1.111

   Usage: <ReadReceiptIcon mode="Light" status="Sending" />
   Props:
     mode   — "Light" | "Dark"
     status — "Sending" | "Sent" | "Delivered" | "Read"
*/

function ReadReceiptIcon({ mode, status }) {
  const isLight     = mode !== "Dark";
  const isSending   = status === "Sending";
  const isSent      = status === "Sent";
  const isDelivered = status === "Delivered";
  const isRead      = status === "Read";

  /* ── Circle fill ──────────────────────────────────────────────────────────────
     Read:   md.sys.color.inverse-on-surface  (#f2f2f2 light / #303030 dark)
     Others: medium grey specific to Link preview card surface
             (#9e9e9e light / #5c5c5e dark) */
  const circleFill = isRead
    ? (isLight ? "#f2f2f2" : "#303030")
    : (isLight ? "#9e9e9e" : "#5c5c5e");

  /* ── Mark / dot colors ────────────────────────────────────────────────────────
     Read:   md.sys.color.on-surface-variant (#444746 light / #ffffff dark) — solid
     Others: black or white at reduced opacity to sit on the grey circle */
  const markColor = isRead
    ? (isLight ? "#444746" : "#ffffff")
    : (isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.55)");

  const dotColor = isRead
    ? (isLight ? "#444746" : "#ffffff")
    : (isLight ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.45)");

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Circle — filled for all statuses; no stroke variant for Link preview card */}
      <circle cx="10" cy="10" r="10" fill={circleFill} />

      {/* Sending — 3 static dots
          Positions from Figma inset percentages within 20×20:
          Left:   inset-[44.44%_61.11%_44.44%_27.78%] → cx=6.667, cy=10
          Center: inset-[44.44%]                       → cx=10,    cy=10
          Right:  inset-[44.44%_27.78%_44.44%_61.11%] → cx=13.333,cy=10 */}
      {isSending && <>
        <circle cx="6.667"  cy="10" r="1.111" fill={dotColor} />
        <circle cx="10"     cy="10" r="1.111" fill={dotColor} />
        <circle cx="13.333" cy="10" r="1.111" fill={dotColor} />
      </>}

      {/* Sent — single check (left vector only)
          Container: inset-[27.75%_19.55%_31.13%_27.2%] → x=5.44, y=5.55, w=10.65, h=8.224
          Left vector occupies left 75.64% of container (24.36% right inset)
          Path derived from double_check_icon.svg left path, scaled to container */}
      {isSent && (
        <path
          d="M6.2 10.8 L8.8 13.2 L13.8 7.2"
          stroke={markColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}

      {/* Delivered — double check (both vectors)
          Container: inset-[27.75%_24.55%_31.13%_22.2%] → x=4.44, y=5.55, w=10.65, h=8.224
          Left vector:  x=4.44 → x=12.494 (75.64% of 10.65)
          Right vector: starts at x=10.66 (58.44% offset), overflows to x≈16.42 */}
      {isDelivered && <>
        <path
          d="M4.5 10.8 L7.1 13.2 L12.1 7.2"
          stroke={markColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M8.2 10.8 L10.8 13.2 L15.8 7.2"
          stroke={markColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>}

      {/* Read — same double check layout as Delivered, solid on-surface-variant color */}
      {isRead && <>
        <path
          d="M4.5 10.8 L7.1 13.2 L12.1 7.2"
          stroke={markColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M8.2 10.8 L10.8 13.2 L15.8 7.2"
          stroke={markColor}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>}
    </svg>
  );
}

const Component = ReadReceiptIcon;
