// Pixel & Code's actual wordmark: "Pixel" in Press Start 2P, "&" in JetBrains
// Mono (lime), "Code" in the system monospace stack — exactly the fonts/colors
// from pixel-and-code/styles.css (.logo-pixel / .logo-amp / .logo-code), just
// laid out on one line with no mark icon or dark backdrop for Aurevia's navbar.
//
// "&Code" outline is drawn as 8 offset copies (text-shadow). "Pixel" uses a
// text-stroke under the fill (paint-order: stroke fill) instead — see the note
// inside the component for why the pixel font needs a thinner ring.
function outline(color: string, px = 1) {
  const shadows: string[] = [];
  for (let dx = -px; dx <= px; dx++) {
    for (let dy = -px; dy <= px; dy++) {
      if (dx !== 0 || dy !== 0) shadows.push(`${dx}px ${dy}px 0 ${color}`);
    }
  }
  return shadows.join(", ");
}

const OUTLINE = outline("#000");

export default function PixelCodeBadge() {
  return (
    // align-items: baseline — the three fonts have very different ascent/descent
    // metrics, so lining up box bottoms (flex-end) put "Pixel" visibly lower than
    // "&Code". Aligning baselines is what makes them read as one word.
    <span style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "baseline", fontSize: "1.05rem", lineHeight: 1 }}>
      {/* Press Start 2P is an 8x8 bitmap font: its capitals span the FULL em
          (ink from 1.0em down to 0.125em above the baseline, i.e. 0.875em
          tall), while Menlo's cap height is ~0.73em. Measured in-browser with
          canvas measureText. To make "Pixel" the same visual height as "Code"
          its font-size must be 0.73 / 0.875 ≈ 0.83em — the old 0.91em made it
          ~10% taller, which is why it looked bigger. Its ink also stops
          0.125em above its own baseline, so nudge it down by that much so
          the bottoms of "Pixel" and "Code" sit on the same line.

          Outline: 1px text-stroke with paint-order: stroke fill draws the
          stroke UNDER the fill, so only the outer 0.5px shows. At ~14px each
          bitmap "pixel" is 1.75px, and the 1px 8-way shadow ring used on
          "&Code" ate the counters of P/e into solid blobs; a 0.5px visible
          ring keeps them open. */}
      <span
        style={{
          position: "relative",
          top: "0.125em",
          fontFamily: '"Press Start 2P", monospace',
          fontSize: "0.83em",
          color: "#f2f3f5",
          WebkitTextStroke: "1px #000",
          paintOrder: "stroke fill",
        }}
      >
        Pixel
      </span>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 700, color: "#c7f94a", margin: "0 0.1em", textShadow: OUTLINE }}>
        &amp;
      </span>
      <span style={{ fontFamily: "Menlo, Monaco, Consolas, 'Cascadia Code', ui-monospace, monospace", fontWeight: 500, color: "#f2f3f5", textShadow: OUTLINE }}>
        Code
      </span>
    </span>
  );
}
