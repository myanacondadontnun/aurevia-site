/**
 * Abandoned-cart recovery email, rebuilt as HTML from the real template
 * (greeting, line items, total, return-to-cart button, reply prompt, sign-off).
 * Content is the Lucien Vallière demo store; prices in USD.
 */

const lines = [
  { name: "Silk Draped Blouse with Asymmetric Cut", price: "$520.00", img: "/images/demo/lv/silk-blouse.webp" },
  { name: "Gilded Statement Necklace with Art Deco Links", price: "$780.00", img: "/images/demo/lv/gilded-necklace.webp" },
  { name: "Patent Leather Ankle Boots with Sculpted Heel", price: "$970.00", img: "/images/demo/lv/patent-boots.webp" },
];

export default function AbandonedCartEmail() {
  return (
    <div className="demo-email" aria-label="Example cart recovery email">
      <div className="demo-email-meta">
        <span>
          From <strong>Lucien Vallière</strong> · via aurevia.io
        </span>
        <span>
          Subject <strong>Still thinking it over, Camille?</strong>
        </span>
      </div>
      <div className="demo-email-body">
        <h4>Hi Camille,</h4>
        <p>
          Just wanted to check in. You&rsquo;ve got the Silk Draped Blouse, Gilded Statement Necklace and Patent Ankle
          Boots sitting in your cart. If you have any questions about them or need help deciding, just reply here and
          I&rsquo;ll get back to you.
        </p>
        <div className="demo-email-lines">
          {lines.map((l) => (
            <div key={l.name} className="demo-email-line">
              <div className="demo-email-thumb">
                <img src={l.img} alt="" loading="lazy" />
              </div>
              <div className="demo-email-line-main">
                <div className="demo-email-line-title">{l.name}</div>
                <div className="demo-email-line-qty">Qty 1</div>
              </div>
              <div className="demo-email-line-price">{l.price}</div>
            </div>
          ))}
        </div>
        <div className="demo-email-total">
          Total <strong>$2,270.00</strong>
        </div>
        <span className="demo-email-btn">Return to your cart</span>
        <p className="demo-email-foot">Reply to this email if you have any questions.</p>
        <p className="demo-email-sign">&mdash; Lucien Vallière</p>
      </div>
      <div className="demo-email-reply">
        <span aria-hidden>↩</span>
        <span>
          Replies land in your Aurevia inbox and the AI answers them in the same thread, with the cart still attached.
        </span>
      </div>
    </div>
  );
}
