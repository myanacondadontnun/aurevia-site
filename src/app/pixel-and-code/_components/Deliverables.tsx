// "How we work", shown as the four things that actually land in a client's
// inbox rather than four steps. Each is a drawn artefact — a quote sheet, a
// brand board, a Friday preview card, a handover folder — stacked like a hand
// of cards until the section scrolls in, then fanned out with its week.
// script.js (initHand) adds .is-on via IntersectionObserver.
const items = [
  {
    kind: "quote", week: "Wk 1", title: "Scope & fixed quote",
    cap: "One business day after the scoping call: a written scope and a number that doesn't move.",
  },
  {
    kind: "board", week: "Wk 2", title: "Brand board",
    cap: "Mark, palette and type, agreed before the storefront is drawn — so the store expresses the brand instead of containing it.",
  },
  {
    kind: "preview", week: "Wk 3–5", title: "Friday preview link",
    cap: "A staging link and a short changelog every week from week two. You click, we fix, nothing waits for a big reveal.",
  },
  {
    kind: "folder", week: "Wk 6", title: "Handover folder",
    cap: "The live store, editable brand source files, the theme code, docs and a recorded walkthrough. Nothing to migrate later.",
  },
];

export default function Deliverables() {
  return (
    <div className="hand" data-hand>
      <ol className="hand__stack">
        {items.map((it) => (
          <li className={`hand__item hand__item--${it.kind}`} key={it.kind}>
            <div className="hand__paper" aria-hidden="true">
              {it.kind === "quote" && (
                <>
                  <span className="hand__lines"><i /><i /><i /><i /></span>
                  <span className="hand__stamp">Fixed</span>
                  <span className="hand__sum"><i /><b /></span>
                </>
              )}
              {it.kind === "board" && (
                <>
                  <span className="hand__mark" />
                  <span className="hand__swatches"><i /><i /><i /><i /></span>
                  <span className="hand__aa">Aa</span>
                  <span className="hand__lines hand__lines--short"><i /><i /></span>
                </>
              )}
              {it.kind === "preview" && (
                <>
                  <span className="hand__url" />
                  <span className="hand__shot"><i /><i /><i /></span>
                  <span className="hand__log"><i /><i /><i /></span>
                </>
              )}
              {it.kind === "folder" && (
                <>
                  <span className="hand__tab" />
                  <span className="hand__files"><i /><i /><i /></span>
                </>
              )}
            </div>
            <span className="hand__week">{it.week}</span>
            <h3 className="hand__title">{it.title}</h3>
            <p className="hand__cap">{it.cap}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
