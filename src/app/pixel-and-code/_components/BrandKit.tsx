// Hero visual. Replaces the six-week bar chart, which said "we work in sprints"
// — true of any studio, and nothing to do with what we now sell.
//
// This is the deliverable instead: the five things a brand build hands over —
// mark, type, palette, packaging, storefront — laid out as a designer's board.
// The specimen palette is deliberately NOT the Pixel & Code accent (see the
// --kit-* tokens): it has to read as a client's identity, not ours.
//
// No fake browser chrome: the storefront tile is a collection grid of product
// cards, which is content, not a drawn window.
export default function BrandKit() {
  return (
    <div className="kit" aria-label="What a brand build hands over: mark, type, palette, packaging and storefront">
      <div className="kit__board" data-kit>
        <figure className="kit__tile kit__tile--mark" data-kit-tile>
          <svg className="kit__mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            {/* A generic monogram: an arch over a seed — enough to read as "a real
                mark was drawn here" without impersonating any actual brand. */}
            <path
              d="M14 50V30a18 18 0 0 1 36 0v20"
              stroke="var(--kit-ink)"
              strokeWidth="3.2"
              strokeLinecap="round"
              data-kit-draw
            />
            <circle cx="32" cy="34" r="6.5" fill="var(--kit-clay)" data-kit-pop />
          </svg>
          <figcaption className="kit__cap">Mark</figcaption>
        </figure>

        <figure className="kit__tile kit__tile--type" data-kit-tile>
          <span className="kit__specimen">Aa<span>Bb</span></span>
          <figcaption className="kit__stack">Display &middot; Text &middot; Caption</figcaption>
        </figure>

        <figure className="kit__tile kit__tile--palette" data-kit-tile>
          <div className="kit__swatches">
            <i className="kit__sw--1" data-kit-sw />
            <i className="kit__sw--2" data-kit-sw />
            <i className="kit__sw--3" data-kit-sw />
            <i className="kit__sw--4" data-kit-sw />
            <i className="kit__sw--5" data-kit-sw />
          </div>
          <figcaption className="kit__cap">Palette</figcaption>
        </figure>

        <figure className="kit__tile kit__tile--pack" data-kit-tile>
          <svg className="kit__pack" viewBox="0 0 48 56" fill="none" stroke="var(--accent-dim)" strokeWidth="1.6" aria-hidden="true">
            {/* Carton: front face, lid crease, and a label panel. */}
            <path d="M8 18 24 10l16 8v22l-16 8-16-8V18Z" strokeLinejoin="round" />
            <path d="M8 18l16 8 16-8M24 26v22" strokeLinejoin="round" />
            <rect x="15" y="27" width="18" height="10" rx="1.5" stroke="var(--kit-brass)" />
          </svg>
          <figcaption className="kit__cap">Packaging</figcaption>
        </figure>

        <figure className="kit__tile kit__tile--store" data-kit-tile>
          <div className="kit__store">
            <span className="kit__card kit__card--lead"><i /><b /><s /></span>
            <span className="kit__card"><i /><b /><s /></span>
            <span className="kit__card"><i /><b /><s /></span>
            <span className="kit__card"><i /><b /><s /></span>
          </div>
          <figcaption className="kit__cap">Storefront</figcaption>
        </figure>
      </div>
      <p className="kit__caption reveal-up">Identity first, then the store it has to live in.</p>
    </div>
  );
}
