/* ReadReceiptIcon — shared component, Type = "Link preview card"
   
   Built from Figma building blocks:
   - .Shapes Read receipt (10895:39324): 20×20dp circle + check/dot positions
   - .Double check icon (10895:50853): 10.65×8.224dp, two vectors

   Construction (from Figma code):
   
   BASE SHAPE (.Shapes Read receipt):
   - 20×20dp circle background image (dark grey for Sending/Sent/Delivered, slightly different for Read)
   - Dots (Sending): 3 circles at inset-[44.44%_61.11%_44.44%_27.78%], [44.44%], [44.44%_27.78%_44.44%_61.11%]
   - Single check (Sent): double check icon at inset-[27.75%_19.55%_31.13%_27.2%], LEFT vector only
   - Double check (Delivered): double check icon at inset-[27.75%_24.55%_31.13%_22.2%], BOTH vectors
   - Double check (Read): same position as Delivered, BOTH vectors, different circle bg

   TYPE = LINK PREVIEW CARD overrides (from variable defs on nodes 22983:37166-37180):
   - Light/Sending:    circle = #9e9e9e (medium grey), dots = rgba(0,0,0,0.5)  
   - Light/Sent:       circle = #9e9e9e, single check = rgba(0,0,0,0.5) faint
   - Light/Delivered:  circle = #9e9e9e, double checks = rgba(0,0,0,0.5) faint
   - Light/Read:       circle = #f2f2f2 (inverse-on-surface), double checks = #444746 (on-surface-variant) solid
   - Dark/Sending:     circle = #5c5c5e, dots = rgba(255,255,255,0.45)
   - Dark/Sent:        circle = #5c5c5e, single check = rgba(255,255,255,0.55) faint
   - Dark/Delivered:   circle = #5c5c5e, double checks = rgba(255,255,255,0.55) faint
   - Dark/Read:        circle = #303030 (inverse-on-surface dark), double checks = #ffffff solid

   Double check icon exact dimensions: 10.65×8.224px within 20×20 circle
   Left vector:  occupies left 75.64% of the 10.65px width (inset-[0_24.36%_0_0])
   Right vector: occupies right 41.56% from 58.44% offset (inset-[0_-12.52%_0_58.44%])
   
   Must end with: const Component = ReadReceiptIcon;
*/

function ReadReceiptIcon({ mode, status }) {
  const isLight     = mode !== "Dark";
  const isSending   = status === "Sending";
  const isSent      = status === "Sent";
  const isDelivered = status === "Delivered";
  const isRead      = status === "Read";

  /* ── Circle background ──
     Read uses inverse-on-surface token (light/inverted)
     All others use a medium grey circle */
  const circleFill = isRead
    ? (isLight ? "#f2f2f2" : "#303030")
    : (isLight ? "#9e9e9e" : "#5c5c5e");

  /* ── Mark colors ──
     Read: on-surface-variant (#444746 light / #ffffff dark) — solid, full opacity
     Others: black (light) / white (dark) at reduced opacity */
  const markRead  = isLight ? "#444746" : "#ffffff";
  const markFaint = isLight ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.55)";
  const dotFaint  = isLight ? "rgba(0,0,0,0.38)" : "rgba(255,255,255,0.45)";
  const markColor = isRead ? markRead : markFaint;

  /* ── Double check icon geometry (from Figma: 10.65×8.224px in 20×20 circle) ──
     Container positioned at:
       Sent:             inset [27.75%, 19.55%, 31.13%, 27.2%]  → single check only
       Delivered/Read:   inset [27.75%, 24.55%, 31.13%, 22.2%]  → double check

     Converting % insets to absolute coords within 20×20:
       Sent container:      top=5.55, right=3.91, bottom=6.226, left=5.44  → w=10.65, h=8.224
       Deliv/Read container: top=5.55, right=4.91, bottom=6.226, left=4.44 → w=10.65, h=8.224
     
     Left vector:  left 75.64% of container width  (24.36% right inset)
     Right vector: right 41.56%, starting at 58.44% from left (-12.52% right inset means it overflows slightly)
  */

  /* Sending dots — 3 circles at specific inset percentages */
  /* inset-[44.44%_61.11%_44.44%_27.78%] → top=8.888, right=12.222, bottom=8.888, left=5.556 → x=5.556, y=8.888, w=2.222, h=2.222 → cx=6.667, cy=10, r=1.111 */
  /* inset-[44.44%] → cx=10, cy=10, r=1.111 */
  /* inset-[44.44%_27.78%_44.44%_61.11%] → cx=13.333, cy=10, r=1.111 */

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: "block" }}>
      {/* Circle background */}
      <circle cx="10" cy="10" r="10" fill={circleFill}/>

      {/* Sending — 3 dots at exact Figma inset positions */}
      {isSending && <>
        <circle cx="6.667"  cy="10" r="1.1" fill={dotFaint}/>
        <circle cx="10"     cy="10" r="1.1" fill={dotFaint}/>
        <circle cx="13.333" cy="10" r="1.1" fill={dotFaint}/>
      </>}

      {/* Sent — single check, left-aligned (Figma: inset-[27.75%_19.55%_31.13%_27.2%], left vector only)
          Container: x=5.44, y=5.55, w=10.65, h=8.225
          Left vector fills left 75.64% of container width → x=5.44 to x=5.44+8.054=13.494
          SVG path approximating the single check mark */}
      {isSent && (
        <path
          d="M6.2 10.8 L8.8 13.2 L13.8 7.2"
          stroke={markColor} strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
          fill="none"
        />
      )}

      {/* Delivered — double checks (Figma: inset-[27.75%_24.55%_31.13%_22.2%], both vectors)
          Container shifted slightly right vs Sent
          Left vector: x=4.44 to x=4.44+8.054=12.494
          Right vector: from x=4.44+(10.65*0.5844)=10.66 to x=4.44+10.65+1.333=16.423 */}
      {isDelivered && <>
        <path
          d="M4.5 10.8 L7.1 13.2 L12.1 7.2"
          stroke={markColor} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M8.2 10.8 L10.8 13.2 L15.8 7.2"
          stroke={markColor} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          fill="none"
        />
      </>}

      {/* Read — same double check layout as Delivered, but solid color */}
      {isRead && <>
        <path
          d="M4.5 10.8 L7.1 13.2 L12.1 7.2"
          stroke={markColor} strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M8.2 10.8 L10.8 13.2 L15.8 7.2"
          stroke={markColor} strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round"
          fill="none"
        />
      </>}
    </svg>
  );
}

const Component = ReadReceiptIcon;
