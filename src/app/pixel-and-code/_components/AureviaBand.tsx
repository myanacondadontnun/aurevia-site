// The studio's own product as a section — the Charle "we built CSignal" move.
// Left: the claim and two pills. Right: what Aurevia does to a visitor, as a
// four-step rail that script.js (initAurevia) advances on a timer, and a "live"
// card that quotes the actual prompt the widget shows on sreyacreates.com — a
// real string, not an invented metric.
const SHOPIFY_APP_URL = "https://apps.shopify.com/aurevia-io";

const steps = [
  { n: "01", t: "Greet", d: "Opens the conversation with every visitor, in their language, before they bounce." },
  { n: "02", t: "Recommend", d: "Reads your catalogue and suggests the right product and bundle for what they asked." },
  { n: "03", t: "Recover", d: "Follows up the abandoned cart by email with the exact items left behind, in the store's voice." },
  { n: "04", t: "Report", d: "Shows you what it talked about and what it sold, in your own dashboard." },
];

export default function AureviaBand() {
  return (
    <section className="section band band--deep aur" id="aurevia" data-wm="Aurevia">
      <div className="stickers stickers--aur" aria-hidden="true">
        <i className="sticker sticker--blob" />
        <i className="sticker sticker--chev" />
      </div>
      <div className="aur__grid">
        <div className="aur__copy">
          <h2 className="section__title">Most stores leave the shopper to <em>figure it out</em>.</h2>
          <p className="aur__sub">
            So we built Aurevia, our own AI sales agent for Shopify. It talks to every visitor,
            recommends the right product, chases the abandoned cart and shows you what it sold.
            Every store we build can ship with it from day one.
          </p>
          <div className="aur__actions">
            <a href={SHOPIFY_APP_URL} target="_blank" rel="noopener" className="btn btn--primary"><span>Try Aurevia on Shopify</span></a>
            <a href="/pixel-and-code/aurevia-io/" className="btn btn--ghost"><span>How we built it</span></a>
          </div>
        </div>

        <div className="aur__demo" data-aur>
          <ol className="aur__rail" aria-label="What Aurevia does">
            <i className="aur__track" aria-hidden="true"><b className="aur__fill" /></i>
            {steps.map((s, i) => (
              <li className={`aur__step${i === 2 ? " is-on" : ""}`} data-aur-step key={s.n}>
                <span className="aur__node" aria-hidden="true" />
                <span className="aur__index">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>

          <a className="aur__live" href="https://sreyacreates.com" target="_blank" rel="noopener">
            <span className="aur__live-icon" aria-hidden="true"><i /></span>
            <span className="aur__live-body">
              <b>Need help choosing? &middot; on sreyacreates.com</b>
              <span>TELL ME WHAT YOU&rsquo;RE LOOKING FOR &middot; I&rsquo;LL RECOMMEND FROM THIS STORE</span>
            </span>
            <span className="aur__live-meta"><b>AUREVIA</b><span><i /> Live</span></span>
          </a>
        </div>
      </div>
    </section>
  );
}
