// Hero visual: a blank wireframe storefront that becomes a branded one — mark
// drops in, palette washes, type swaps, products fill, "Live" — then resets and
// does it again with the next specimen. Three specimens, all fictional and
// labelled as such on the panel; nothing here is or resembles a client.
// script.js (initLoop) drives the phases by toggling classes; every phase is a
// CSS transition on colour, transform or opacity. No browser chrome is drawn —
// it's a page, not a window.
export interface LoopPin { key: string; phase: string; label: string; x: string; y: string; }

// `pins`: sticker labels placed on parts of the specimen, each tied to the phase
// that reveals it (is-mark, is-colour, is-type, is-products, is-live). Used by the
// Shopify section to name the six deliverables on the thing itself.
export default function StoreLoop({ large = false, pins = [] }: { large?: boolean; pins?: LoopPin[] }) {
  return (
    <div className={`loop${large ? " loop--large" : ""}`} data-loop aria-label="A blank storefront becoming a branded one, three times over">
      <div className="loop__page">
        <div className="loop__bar">
          <i className="loop__mark" aria-hidden="true" />
          <b className="loop__word" data-loop-word>&nbsp;</b>
          <span className="loop__nav" aria-hidden="true"><i /><i /><i /></span>
          <i className="loop__cart" aria-hidden="true" />
        </div>
        <div className="loop__hero" aria-hidden="true">
          <span className="loop__h1" />
          <span className="loop__h1 loop__h1--short" />
          <span className="loop__btn" />
          <i className="loop__blob" />
        </div>
        <div className="loop__grid" aria-hidden="true">
          <figure className="loop__card"><i /><b /><s /></figure>
          <figure className="loop__card"><i /><b /><s /></figure>
          <figure className="loop__card"><i /><b /><s /></figure>
        </div>
      </div>
      {pins.map((p) => (
        <span key={p.key} className="loop__pin" data-pin={p.key} data-phase={p.phase} style={{ left: p.x, top: p.y }}>
          <i aria-hidden="true" />{p.label}
        </span>
      ))}
      <span className="loop__live" aria-hidden="true"><i /> Live</span>
      {!large && <p className="loop__caption reveal-up">Identity first, then the store it has to live in.</p>}
    </div>
  );
}
