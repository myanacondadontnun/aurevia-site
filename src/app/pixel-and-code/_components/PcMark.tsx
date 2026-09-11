// The "refactoring brackets" pixel-block logo mark — reused in the nav, preloader,
// footer, and chat widget. script.js (initPcMark) animates the bracket shapes via GSAP.
export default function PcMark({ size }: { size?: "md" | "lg" }) {
  return (
    <span className={`pc-mark${size ? ` pc-mark--${size}` : ""}`} data-pc-mark aria-hidden="true">
      <span className="pc-mark__side pc-mark__left"><i></i><i></i><i></i></span>
      <span className="pc-mark__pixel"></span>
      <span className="pc-mark__side pc-mark__right"><i></i><i></i><i></i></span>
    </span>
  );
}
