import PcMark from "./PcMark";

// Section divider: five logo marks that morph through their bracket states in
// sequence, left to right (script.js initPcMark reads data-delay). The brand's
// one animated asset, reused as the page's rhythm instead of a hairline.
export default function MarkRow() {
  return (
    <div className="mark-row" aria-hidden="true">
      {[0, 0.15, 0.3, 0.45, 0.6].map((d) => (
        <span key={d} className="pc-mark" data-pc-mark data-delay={d}>
          <span className="pc-mark__side pc-mark__left"><i></i><i></i><i></i></span>
          <span className="pc-mark__pixel"></span>
          <span className="pc-mark__side pc-mark__right"><i></i><i></i><i></i></span>
        </span>
      ))}
    </div>
  );
}
