import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";
import MarkRow from "../_components/MarkRow";
import StoreLoop from "../_components/StoreLoop";
import Deliverables from "../_components/Deliverables";
import PricingTabs from "../_components/PricingTabs";
import Showcase from "../_components/Showcase";

export const metadata: Metadata = {
  title: "Shopify Brand Building — Pixel & Code",
  description:
    "A Shopify brand built from scratch: logo, colour and type, packaging and product design, and a custom storefront that isn't a bought theme. Live in about six weeks, from £4,900, and looked after for every occasion afterwards.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/shopify-brand-building/" },
  openGraph: {
    type: "website",
    title: "Shopify Brand Building — Pixel & Code",
    description: "Logo, colour, packaging, product design and a custom Shopify storefront — one team, about six weeks.",
  },
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

// Rebuilt 2026-09 to be skimmable — a reader who never scrolls past the fold
// still gets the offer, the price and the proof — and to carry the homepage's
// design language (hero grid + stickers + store loop, mark-row dividers,
// watermarked bands, quote-sheet pricing, the founders' call). Sections:
// hero → skim strip → before/after → what you get (pinned loop) → proof
// (Sreya, incl. the festive page + occasions) → the bar → process → pricing
// → FAQ → brief form. No wall of feature cards anywhere.
export default function ShopifyBrandBuildingPage() {
  return (
    <>
      <Chrome />

      <PxcNav
        logoHref="/pixel-and-code/"
        links={[
          { href: "/pixel-and-code/shopify-brand-building/", label: "Shopify" },
          { href: "/pixel-and-code/#work", label: "Our work" },
          { href: "/pixel-and-code/#process", label: "How we work" },
          { href: "/pixel-and-code/#pricing", label: "Pricing" },
        ]}
        ctaHref="#contact"
        ctaLabel="Start a project"
      />

      <main id="top">
        {/* HERO — same grid as home: copy left, the store loop + stickers right */}
        <section className="hero hero--page">
          <div className="hero__grid">
            <div className="hero__inner">
              <p className="hero__eyebrow reveal-up"><span className="px px--pulse"></span> Shopify brand building</p>
              <h1 className="hero__title">
                <span className="line"><span>A Shopify brand,</span></span>
                <span className="line"><span>built <em data-swap data-words="from scratch|to sell|in six weeks|for every occasion">from scratch</em>.</span></span>
              </h1>
              <p className="hero__sub reveal-up">
                Logo, colours, packaging, product design and a custom storefront &mdash; one team,
                one fixed price, live in about six weeks. Then we keep it fresh for every
                occasion, from Pujo to Black Friday.
              </p>
              <p className="hero__builds reveal-up"><b>You get</b> brand identity <span className="px"></span> custom Shopify theme <span className="px"></span> packaging <span className="px"></span> product pages that sell <span className="px"></span> occasion pages all year</p>
              <div className="hero__actions reveal-up">
                <a href="#contact" className="btn btn--primary">
                  <span>Get a fixed quote</span>
                  <Arrow />
                </a>
                <a href="#stores" className="btn btn--ghost"><span>See a store we built</span></a>
              </div>
              <p className="hero__trust reveal-up">From &pound;4,900 <span className="px"></span> About six weeks <span className="px"></span> You own the store, the files and the theme</p>
            </div>

            <div className="hero__visual">
              <div className="stickers" aria-hidden="true">
                <i className="sticker sticker--block" />
                <i className="sticker sticker--tri" />
                <i className="sticker sticker--squiggle" />
                <i className="sticker sticker--dot" />
              </div>
              <StoreLoop />
            </div>
          </div>
        </section>

        {/* SKIM STRIP — the whole page in four tiles */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="skim">
            <div className="skim__tile reveal-up"><span className="skim__big"><em>6</em> weeks</span><span className="skim__label">Brief to launch</span></div>
            <div className="skim__tile reveal-up"><span className="skim__big">from <em>&pound;4,900</em></span><span className="skim__label">Brand + custom store, fixed</span></div>
            <div className="skim__tile reveal-up"><span className="skim__big"><em>1</em> team</span><span className="skim__label">Design and build, no handoffs</span></div>
            <div className="skim__tile reveal-up"><span className="skim__big"><em>&pound;290</em>/mo</span><span className="skim__label">Occasion pages, all year round</span></div>
          </div>
        </section>

        <MarkRow />

        {/* BEFORE / AFTER — the problem in one glance */}
        <section className="section band band--raise" data-wm="Theme">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Why most stores blur together</span>
            <h2 className="section__title">The theme is not the brand.</h2>
          </div>
          <div className="swap reveal-up">
            <div className="swap__col swap__col--before">
              <div className="swap__head"><span className="px"></span> The usual store</div>
              <ul>
                <li>A theme tens of thousands of stores also run</li>
                <li>A logo from a marketplace</li>
                <li>A palette borrowed from the theme demo</li>
                <li>Packaging from whoever printed it</li>
                <li>Three freelancers who never spoke</li>
                <li>Same homepage in December as in June</li>
              </ul>
            </div>
            <div className="swap__arrow" aria-hidden="true">&rarr;</div>
            <div className="swap__col swap__col--after">
              <div className="swap__head"><span className="px"></span> What we hand over</div>
              <ul>
                <li>Your own theme, built section by section</li>
                <li>An original mark, every export, source files</li>
                <li>A colour and type system, written down</li>
                <li>Packaging designed with the store, print-ready</li>
                <li>One team from first call to handover</li>
                <li>A page for every occasion, changed on a schedule</li>
              </ul>
            </div>
          </div>
        </section>

        {/* WHAT YOU GET — six deliverables pinned on the thing itself */}
        <section className="section" id="deliverables">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What you get</span>
            <h2 className="section__title">Everything the brand touches.</h2>
          </div>
          <div className="pinned" data-loop-scope>
            <StoreLoop
              large
              pins={[
                { key: "mark", phase: "is-mark", label: "Logo & wordmark", x: "3%", y: "16%" },
                { key: "colour", phase: "is-colour", label: "Colour & type", x: "34%", y: "40%" },
                { key: "storefront", phase: "is-type", label: "Custom storefront", x: "4%", y: "62%" },
                { key: "packaging", phase: "is-type", label: "Packaging & product", x: "78%", y: "28%" },
                { key: "products", phase: "is-products", label: "Product pages", x: "36%", y: "84%" },
                { key: "apps", phase: "is-live", label: "Apps & handover", x: "66%", y: "8%" },
              ]}
            />
            <ol className="pinned__list">
              <li data-pin-item="mark"><b>Logo &amp; wordmark</b><span>An original mark in every format: store, packaging, socials, print, plus the editable sources.</span></li>
              <li data-pin-item="colour"><b>Colour &amp; type system</b><span>A palette and pairing that holds across storefront, ads and packaging, in a short brand guide.</span></li>
              <li data-pin-item="storefront"><b>Custom Shopify storefront</b><span>Your own theme on your own store. Sections your team can rearrange in the admin, fast on a phone.</span></li>
              <li data-pin-item="packaging"><b>Product &amp; packaging design</b><span>Labels, boxes, inserts and imagery designed with the brand, supplied print-ready.</span></li>
              <li data-pin-item="products"><b>Product pages that sell</b><span>Collection and product pages built around how people decide: imagery, copy, variants, bundles, reviews.</span></li>
              <li data-pin-item="apps"><b>Apps, migration &amp; handover</b><span>Email, reviews, analytics and shipping wired in. Rebuilt on your live store with no downtime, then handed over.</span></li>
            </ol>
          </div>
        </section>

        <MarkRow />

        {/* PROOF — Sreya Creates, then the festive page and the occasions that follow it */}
        <section className="section band band--deep" id="stores" data-wm="Proof">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Proof</span>
            <h2 className="section__title">A store we built.</h2>
          </div>

          <div className="case-meta reveal-up">
            <div className="case-meta__item">
              <span className="case-meta__label">Store</span>
              <span className="case-meta__value">Sreya Creates</span>
            </div>
            <div className="case-meta__item">
              <span className="case-meta__label">Sector</span>
              <span className="case-meta__value">Handmade jewellery &middot; Kolkata</span>
            </div>
            <div className="case-meta__item">
              <span className="case-meta__label">Scope</span>
              <span className="case-meta__value">Brand, storefront, AI agent, ongoing care</span>
            </div>
            <div className="case-meta__item">
              <span className="case-meta__label">Live at</span>
              <span className="case-meta__value"><a href="https://sreyacreates.com" target="_blank" rel="noopener">sreyacreates.com &#8599;</a></span>
            </div>
          </div>

          <figure className="case-shot reveal-up" style={{ marginTop: 0 }}>
            <a href="https://sreyacreates.com" target="_blank" rel="noopener">
              <img src="/pixel-and-code/assets/screenshots/shopify/sreya-creates-home.jpg" alt="The Sreya Creates homepage — a custom Shopify storefront built by Pixel &amp; Code" loading="lazy" width={1280} height={711} />
            </a>
          </figure>

          <p className="case-summary reveal-up" style={{ maxWidth: 720, margin: "0 0 0.5rem" }}>
            One-of-a-kind pieces, made to order. We built the monogram, the cream-and-red palette,
            the editorial type and a custom theme with sections for one-of-one stock, seasonal
            drops, gift-wrap at checkout and Kolkata archive artwork as texture. Aurevia, our own
            AI assistant, answers questions in the corner.
          </p>

          {/* The festive page: a custom page for every occasion, managed by us */}
          <div className="occasion">
            <div className="occasion__shot reveal-up">
              <span className="occasion__sticker">Live now &middot; Pujo 2026</span>
              <figure className="case-shot">
                <a href="https://sreyacreates.com/collections/festive-collection" target="_blank" rel="noopener">
                  <img src="/pixel-and-code/assets/screenshots/shopify/sreya-creates-festive.jpg" alt="The Sreya Creates Festive Collection page for Durga Pujo — a seasonal landing page designed and managed by Pixel &amp; Code" loading="lazy" width={1440} height={900} />
                </a>
              </figure>
            </div>
            <div className="occasion__text reveal-up">
              <span className="section__label"><span className="px"></span> After launch</span>
              <h3>A custom page for every occasion.</h3>
              <p>
                <strong>A store shouldn&rsquo;t look the same in October as it does in March.</strong> For
                Sreya Creates we designed a Pujo page &mdash; its own palette, artwork, copy and
                collection &mdash; and switched the homepage and the announcement bar to match.
              </p>
              <p>
                We keep managing the store afterwards: a new landing page for each sale or festival,
                banners and collections swapped in on a date and rolled back afterwards, so the store
                always looks like it was built for this week.
              </p>
              <ul className="occasion__list" aria-label="Occasions we build pages for">
                <li className="is-live">Durga Pujo</li>
                <li>Diwali</li>
                <li>Black Friday</li>
                <li>Christmas gifting</li>
                <li>Valentine&rsquo;s</li>
                <li>Mother&rsquo;s Day</li>
                <li>New drop</li>
                <li>Clearance</li>
              </ul>
              <a href="https://sreyacreates.com/collections/festive-collection" target="_blank" rel="noopener" className="btn btn--ghost"><span>See the festive page &#8599;</span></a>
            </div>
          </div>

          <div className="case-shot-grid" style={{ marginBottom: 0 }}>
            <figure className="case-shot reveal-up">
              <img src="/pixel-and-code/assets/screenshots/shopify/sreya-creates-collection.jpg" alt="A Sreya Creates collection page" loading="lazy" width={1120} height={657} />
            </figure>
            <figure className="case-shot reveal-up">
              <img src="/pixel-and-code/assets/screenshots/shopify/sreya-creates-product.jpg" alt="A Sreya Creates product page" loading="lazy" width={1120} height={657} />
            </figure>
          </div>
        </section>

        {/* THE BAR — Shopify stores we rate, alongside ours */}
        <section className="section band band--raise" id="bar" data-wm="Taste">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What we rate</span>
            <h2 className="section__title">The bar we build to.</h2>
          </div>
          <Showcase only={["Shopify stores"]} />
        </section>

        <MarkRow />

        {/* PROCESS — the four things that land in your inbox */}
        <section className="process section" id="process">
          <div className="section__head process__head">
            <div>
              <span className="section__label"><span className="px"></span> How it runs</span>
              <h2 className="section__title">Brief to <em>launch</em>, in four steps.</h2>
            </div>
            <p className="process__intro">Something to look at every Friday from week two. You talk to
               the two people designing and building it.</p>
          </div>
          <Deliverables />
        </section>

        {/* PRICING — the Shopify sheets only */}
        <section className="section band band--raise" id="pricing" data-wm="Price">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Pricing</span>
            <h2 className="section__title">Three builds and one monthly plan.</h2>
          </div>
          <PricingTabs only="shopify" />
        </section>

        {/* FAQ — five, short */}
        <section className="section" id="faq">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Questions</span>
            <h2 className="section__title">Before you reach out.</h2>
          </div>
          <div className="faq">
            <details className="faq__item reveal-up"><summary>Custom theme or customised theme?</summary><p>Custom. Your own theme, built section by section for your brand. Your team still edits content in the Shopify admin as normal.</p></details>
            <details className="faq__item reveal-up"><summary>We already have a brand we like. Can you keep it?</summary><p>Yes. We design the storefront around the identity you have and only extend it where the store needs something that doesn&rsquo;t exist yet. That&rsquo;s the &ldquo;Store only&rdquo; package.</p></details>
            <details className="faq__item reveal-up"><summary>Will the store go down while you rebuild it?</summary><p>No. We build on an unpublished theme on your live store and publish when you&rsquo;ve signed off. Products, orders and app data stay put.</p></details>
            <details className="faq__item reveal-up"><summary>What does &ldquo;a page for every occasion&rdquo; cost?</summary><p>&pound;290 a month, per store, after launch. We agree the calendar up front, design a custom page for each sale or festival, switch the homepage, banners and collections over on the date and roll them back afterwards. You approve every page before it goes live and can cancel any month.</p></details>
            <details className="faq__item reveal-up"><summary>What do we own at the end?</summary><p>Everything. The store is in your name from week one. At launch you get the editable brand sources, the theme code, the brand guide and a recorded walkthrough. No retainer required.</p></details>
          </div>
        </section>

        {/* CONTACT — same brief form as home, with the drawn watermark */}
        <section className="contact section" id="contact">
          <div className="contact__wm" aria-hidden="true">
            <span className="contact__wm-grid" />
            <span className="contact__wm-mark" />
            <span className="contact__wm-ring" />
            <span className="contact__wm-bits" />
          </div>
          <div className="contact__inner">
            <span className="section__label reveal-up"><span className="px"></span> Let&rsquo;s talk</span>
            <h2 className="contact__title">Ready to build the brand?</h2>
            <p className="contact__sub">Send a short brief and you&rsquo;ll get a written scope and a fixed number within one business day.</p>
            <div className="contact__grid">
              <form className="contact__form" data-lead-form noValidate>
                <div className="field">
                  <input type="text" name="name" id="lead-name" placeholder=" " autoComplete="name" required />
                  <label htmlFor="lead-name">Your name</label>
                </div>
                <div className="field">
                  <input type="email" name="email" id="lead-email" placeholder=" " autoComplete="email" required />
                  <label htmlFor="lead-email">Email address</label>
                </div>
                <div className="field field--full">
                  <input type="text" name="store" id="lead-store" placeholder=" " autoComplete="url" inputMode="url" />
                  <label htmlFor="lead-store">Store or website URL (if you have one)</label>
                </div>
                <div className="field field--full">
                  <textarea name="project" id="lead-project" rows={4} placeholder=" " required></textarea>
                  <label htmlFor="lead-project">What do you sell, and where are you now?</label>
                </div>
                <div className="field field--hp" aria-hidden="true"><input type="text" name="company_url" tabIndex={-1} autoComplete="off" /></div>
                <button type="submit" className="btn btn--primary" data-lead-submit>
                  <span>Send brief</span>
                  <Arrow />
                </button>
                <p className="contact__note" data-lead-note aria-live="polite"></p>
              </form>
              <aside className="contact__side">
                <h3>Prefer to talk it through?</h3>
                <p>Book a free 30-minute scoping call with Ritwik. We map the brand and the store with you, then send the scope and the number in writing.</p>
                <a href="/pixel-and-code/#book" className="btn btn--ghost"><span>Book a call with Ritwik</span></a>
                <div className="contact__alt">
                  Email <a href="mailto:sales@aurevia.io" data-track="email_click">sales@aurevia.io</a><br />
                  or <button type="button" data-open-chat>scope it with our AI assistant</button>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <div className="case-crosslink">
        <a href="/pixel-and-code/web-app-development/">Websites &amp; web apps &rarr;</a>
        <a href="/pixel-and-code/#work">See all our work &rarr;</a>
      </div>

      <PxcFooter
        links={[
          { href: "/pixel-and-code/#work", label: "Our work" },
          { href: "/pixel-and-code/#process", label: "How we work" },
          { href: "/pixel-and-code/#pricing", label: "Pricing" },
          { href: "/pixel-and-code/#contact", label: "Contact" },
        ]}
      />

      <ChatWidget />
    </>
  );
}
