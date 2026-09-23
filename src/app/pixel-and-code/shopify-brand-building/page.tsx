import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";
import BodyBg from "../_components/BodyBg";
import PxcIcon from "../_components/PxcIcon";

export const metadata: Metadata = {
  title: "Shopify Brand Building — Pixel & Code",
  description:
    "A Shopify brand built from scratch: logo, colour and type, packaging and product design, and a custom storefront that isn't a bought theme. Live in about six weeks, fixed price.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/shopify-brand-building/" },
  openGraph: {
    type: "website",
    title: "Shopify Brand Building — Pixel & Code",
    description: "Logo, colour, packaging, product design and a custom Shopify storefront — one team, about six weeks.",
  },
};

// The studio's headline offer (repositioned 2026-09). Structure follows the other
// solution pages — hero, problem, deliverables, proof, timeline/investment, FAQ, CTA —
// so it inherits script.js's reveal/split animations without new CSS.
export default function ShopifyBrandBuildingPage() {
  return (
    <>
      <BodyBg mode="code" />
      <Chrome />

      <PxcNav
        logoHref="/pixel-and-code/"
        links={[
          { href: "/pixel-and-code/shopify-brand-building/", label: "Shopify" },
          { href: "/pixel-and-code/#work", label: "Our work" },
          { href: "/pixel-and-code/#process", label: "How we work" },
          { href: "/pixel-and-code/#pricing", label: "Pricing" },
        ]}
        ctaHref="https://calendly.com/km-kkishal/30min"
        ctaLabel="Book a call"
        ctaExternal
      />

      <main id="top">
        {/* HERO */}
        <section className="page-hero section">
          <span className="case-eyebrow reveal-up"><span className="px"></span> For Shopify merchants &amp; founders</span>
          <h1 className="case-title reveal-up" data-split>A Shopify brand built from scratch.</h1>
          <p className="case-summary reveal-up">
            The logo, the colours, the packaging, the product design — and a custom storefront built
            on top of it, not a theme with your logo dropped in. One team, fixed price, live in about
            six weeks.
          </p>
          <div className="case-actions reveal-up">
            <a href="https://calendly.com/km-kkishal/30min" target="_blank" rel="noopener" className="btn btn--primary" data-track="book_call">
              <span>Book a free scoping call</span>
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#contact" className="btn btn--ghost"><span>Send us your brief</span></a>
          </div>
          <div className="page-hero__scroll reveal-up">
            <span>Scroll</span>
            <div className="page-hero__scroll-line"><i></i></div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section band band--raise">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Why most stores blur together</span>
            <h2 className="section__title" data-split>The theme is not the brand.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Sameness</span>
              <PxcIcon name="sameness" />
              <h3>Everyone bought the same theme</h3>
              <p>A popular Shopify theme is running on tens of thousands of stores. Shoppers can&apos;t
                 name why yours feels familiar, but it does — and familiar is not memorable.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Fragments</span>
              <PxcIcon name="fragments" />
              <h3>The brand was assembled from pieces</h3>
              <p>A logo from a marketplace, a palette from the theme demo, packaging from whoever
                 printed it. Nothing was designed to sit next to anything else.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Handoffs</span>
              <PxcIcon name="handoffs" />
              <h3>Three freelancers, three directions</h3>
              <p>A designer, a Shopify dev and a packaging supplier who never spoke. You end up being
                 the one holding the brand together.</p>
            </article>
          </div>
        </section>

        {/* DELIVERABLES */}
        <section className="section">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What you get</span>
            <h2 className="section__title" data-split>Everything the brand touches.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
            We design the identity and build the storefront ourselves, in that order, so the store
            is an expression of the brand rather than a container for it.
          </p>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Identity</span>
              <PxcIcon name="naming" />
              <h3>Naming &amp; positioning</h3>
              <p>What the brand stands for, who it&apos;s for and how it talks — written down before
                 anything gets drawn.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Identity</span>
              <PxcIcon name="mark" />
              <h3>Logo &amp; wordmark</h3>
              <p>An original mark with the full set of exports: horizontal, stacked, icon, light and
                 dark, plus the editable source files.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Identity</span>
              <PxcIcon name="palette" />
              <h3>Colour &amp; type system</h3>
              <p>A palette and typeface pairing documented in a short brand guide, so your ads,
                 emails and packaging stay consistent long after launch.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Product</span>
              <PxcIcon name="packaging" />
              <h3>Packaging &amp; product design</h3>
              <p>Labels, boxes, inserts and unboxing — designed with the same system as the store, in
                 print-ready files your supplier can use.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Storefront</span>
              <PxcIcon name="storefront" />
              <h3>Custom Shopify theme</h3>
              <p>Your own theme, not a licensed one: custom sections your team can rearrange in the
                 admin, built to stay fast on a phone.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Storefront</span>
              <PxcIcon name="grid" />
              <h3>Collection &amp; product pages</h3>
              <p>Structured around how people actually decide — imagery, copy blocks, size and
                 variant pickers, bundles, upsells and reviews.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Launch</span>
              <PxcIcon name="plug" />
              <h3>Apps &amp; integrations</h3>
              <p>Email, reviews, analytics, subscriptions and shipping wired in and tested, so launch
                 day isn&apos;t the first time anything runs.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Launch</span>
              <PxcIcon name="migrate" />
              <h3>Migration without downtime</h3>
              <p>Already trading? We work on your live store, keep products, orders and history in
                 place, and switch over when the new storefront is ready.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Handover</span>
              <PxcIcon name="handover" />
              <h3>The files, not just the pixels</h3>
              <p>Editable brand sources, the theme code, a short brand guide and a recorded
                 walkthrough of how to run it all yourself.</p>
            </article>
          </div>
        </section>

        {/* PROOF — the store itself is the argument, so it gets the full width */}
        <section className="section band band--deep" id="stores">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Proof</span>
            <h2 className="section__title" data-split>Stores we&apos;ve built.</h2>
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
              <span className="case-meta__value">Brand, storefront &amp; AI agent</span>
            </div>
            <div className="case-meta__item">
              <span className="case-meta__label">Live at</span>
              <span className="case-meta__value">sreyacreates.com</span>
            </div>
          </div>

          <figure className="case-shot reveal-up">
            <a href="https://sreyacreates.com" target="_blank" rel="noopener">
              <img src="/pixel-and-code/assets/screenshots/shopify/sreya-creates-home.jpg" alt="The Sreya Creates homepage — a custom Shopify storefront built by Pixel &amp; Code" loading="lazy" width={1280} height={711} />
            </a>
          </figure>

          <div className="case-shot-grid">
            <figure className="case-shot reveal-up">
              <img src="/pixel-and-code/assets/screenshots/shopify/sreya-creates-collection.jpg" alt="A Sreya Creates collection page" loading="lazy" width={1120} height={657} />
            </figure>
            <figure className="case-shot reveal-up">
              <img src="/pixel-and-code/assets/screenshots/shopify/sreya-creates-product.jpg" alt="A Sreya Creates product page" loading="lazy" width={1120} height={657} />
            </figure>
          </div>

          <div className="lp-proof">
            <div className="lp-proof__text reveal-up">
              <p>
                Sreya Creates makes earrings, necklaces and dreamcatchers one at a time in Kolkata.
                Almost every piece is one of a kind, which is a genuinely awkward thing to sell
                through a stock theme built for restockable inventory.
              </p>
              <p>
                So we built the brand and the store together: the monogram and wordmark, the cream
                and deep-red palette, the editorial type, and a custom Shopify theme with sections
                made for one-of-one stock, Pujo seasonal drops, gift-wrap at checkout and archival
                Kolkata artwork running through the page as texture.
              </p>
              <a href="https://sreyacreates.com" target="_blank" rel="noopener" className="btn btn--ghost"><span>Visit sreyacreates.com ↗</span></a>
            </div>
            <div className="lp-split" style={{ gridTemplateColumns: "1fr" }}>
              <div className="reveal-up">
                <h3>What we built</h3>
                <p>Logo and wordmark, colour and type system, product photography direction, and a
                   custom theme &mdash; homepage, collections, product pages, cart and checkout.</p>
              </div>
              <div className="reveal-up">
                <h3>What it runs</h3>
                <p>Seasonal collections, gift-wrap as a cart option, an email capture for new drops,
                   and Aurevia &mdash; our own AI shopping assistant &mdash; answering questions in
                   the corner of the store.</p>
              </div>
            </div>
          </div>

          <p className="quotes__note" style={{ marginTop: "2.4rem" }}>
            We also build <em>for</em> Shopify, not just on it: Aurevia is our own app, listed on the
            Shopify App Store and shipped roughly every week for over a year &mdash; so we work in the
            same admin, theme architecture and checkout your store does.{" "}
            <a href="/pixel-and-code/aurevia-io/">Read how Aurevia was built</a>.
          </p>
        </section>

        {/* TIMELINE + INVESTMENT */}
        <section className="section">
          <div className="lp-split">
            <div className="reveal-up">
              <h3>Timeline</h3>
              <p>A full brand and store build typically launches in about six weeks: scope, then
                 identity, then design, then the build, with something to look at every Friday from
                 week two. Brand-only or store-only work is faster.</p>
            </div>
            <div className="reveal-up">
              <h3>Investment</h3>
              <p>Fixed price, agreed before we start. Because scope varies — one product or two
                 hundred, brand from scratch or a rebuild — we quote after a short scoping call, in
                 writing, within one business day.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section band band--raise">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Questions</span>
            <h2 className="section__title" data-split>Before you reach out.</h2>
          </div>
          <div className="faq">
            <details className="faq__item reveal-up">
              <summary>Do we get a custom theme or a customised one?</summary>
              <p>Custom. The storefront is your own theme, designed for your brand and built section
                 by section. Your team still edits content normally in the Shopify admin.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Can you do the branding only?</summary>
              <p>Yes. Identity, logo, colour, type and packaging can be delivered on their own, with a
                 brand guide your existing developer can build against.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>We already have a brand we like. Can you keep it?</summary>
              <p>Of course. We&apos;ll design the storefront around the identity you have, and only
                 tidy or extend it where the store needs something that doesn&apos;t exist yet.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Will our store go down while you rebuild it?</summary>
              <p>No. We develop against your live store on an unpublished theme and publish only when
                 you&apos;ve signed off. Products, orders and app data stay where they are.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Can you design the packaging too?</summary>
              <p>Yes — labels, boxes and inserts, supplied as print-ready files. We design them
                 alongside the store so the unboxing matches what the customer bought from.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>What happens after launch?</summary>
              <p>We watch the first real orders, fix what they surface, then hand everything over: the
                 store, the theme code, the editable brand files, the brand guide and a recorded
                 walkthrough. No retainer, no lock-in.</p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="contact section" id="contact">
          <div className="contact__inner">
            <span className="section__label reveal-up">Let&apos;s talk</span>
            <h2 className="contact__title" data-split>Ready to build the brand?</h2>
            <p className="contact__sub reveal-up">Chat with our AI to scope your store — it captures the
               details and a human follows up within one business day.</p>
            <form className="contact__ai reveal-up" data-contact-ai>
              <input type="text" data-contact-input placeholder="Tell us what you sell — our AI takes it from here…" autoComplete="off" aria-label="Describe your brand" />
              <button type="submit" aria-label="Start the conversation">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
            <div className="contact__prompts reveal-up" data-contact-prompts>
              <button type="button" className="contact__prompt">Brand from scratch</button>
              <button type="button" className="contact__prompt">Rebuild our store</button>
              <button type="button" className="contact__prompt">Get a price estimate</button>
            </div>
          </div>
        </section>
      </main>

      <div className="case-crosslink">
        <a href="/pixel-and-code/web-app-development/">Websites &amp; web apps →</a>
        <a href="/pixel-and-code/#work">See our work →</a>
      </div>

      <PxcFooter
        links={[
          { href: "/pixel-and-code/#work", label: "Our work" },
          { href: "/pixel-and-code/about/", label: "Who we are" },
          { href: "/pixel-and-code/#contact", label: "Contact" },
        ]}
      />

      <ChatWidget />
    </>
  );
}
