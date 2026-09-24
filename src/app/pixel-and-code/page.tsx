import type { Metadata } from "next";
import Chrome from "./_components/Chrome";
import PxcNav from "./_components/PxcNav";
import PxcFooter from "./_components/PxcFooter";
import ChatWidget from "./_components/ChatWidget";
import MarkRow from "./_components/MarkRow";
import StoreLoop from "./_components/StoreLoop";
import Deliverables from "./_components/Deliverables";
import ServiceGrounds from "./_components/ServiceGrounds";
import PricingTabs from "./_components/PricingTabs";
import PxcIcon from "./_components/PxcIcon";
import Showcase from "./_components/Showcase";
import AureviaBand from "./_components/AureviaBand";
import FoundersCall from "./_components/FoundersCall";

// "Book a call with Ritwik" lives in one place only: the founders section
// (FoundersCall.tsx), where a short lead form opens his Calendly inline. Every
// other CTA points at the brief form (#contact) or at that section (#book).

export const metadata: Metadata = {
  title: "Pixel & Code — Shopify brand building: identity, product design and custom storefronts",
  description:
    "Pixel & Code builds Shopify brands from scratch — logo, colour, packaging and product design, and a custom storefront that isn't a recycled theme. We also build websites, web apps and AI automations. First launch in about six weeks.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/" },
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

// Repositioned 2026-09 around Shopify brand building — identity, product design and
// custom storefronts — as the headline offer. Websites/web apps (JCR Pharma, Masters
// in Minds) sit second; AI automation is kept deliberately short and third. The page
// furniture (hero form, weeks graphic, process, models, FAQ) is unchanged.
export default function PixelAndCodeHome() {
  return (
    <>
      <Chrome />

      {/* Two destinations only: proof and the call. Everything else is one scroll away. */}
      <PxcNav
        logoHref="/pixel-and-code/#top"
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
        {/* HERO */}
        <section className="hero">
          <div className="hero__grid">
            <div className="hero__inner">
              <p className="hero__eyebrow reveal-up"><span className="px px--pulse"></span> A Shopify brand &amp; store studio</p>
              <h1 className="hero__title">
                <span className="line"><span>Your Shopify brand,</span></span>
                <span className="line"><span>built <em data-swap data-words="from scratch|to sell|in six weeks|for phones">from scratch</em>.</span></span>
              </h1>
              <p className="hero__sub reveal-up">
                Pixel &amp; Code builds Shopify brands end to end — the logo, the colours, the
                packaging and product design, and a custom storefront that isn&rsquo;t the same theme
                every other store is running. Already have a brand? We&rsquo;ll build the store around it.
              </p>
              <p className="hero__builds reveal-up"><b>We build</b> brand identity <span className="px"></span> logo &amp; colour <span className="px"></span> product &amp; packaging design <span className="px"></span> custom Shopify storefronts <span className="px"></span> websites &amp; web apps <span className="px"></span> AI automation</p>
              <div className="hero__actions reveal-up">
                <a href="#contact" className="btn btn--primary">
                  <span>Get a fixed quote</span>
                  <Arrow />
                </a>
                <a href="#work" className="btn btn--ghost"><span>See our work</span></a>
              </div>
              <p className="hero__trust reveal-up">30-min call, no pitch <span className="px"></span> Fixed-price builds <span className="px"></span> You own the store and the files</p>
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


        {/* SERVICES */}
        <section className="services section" id="services" data-wm="Services">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Our services</span>
            <h2 className="section__title">Three ways to work with us.</h2>
          </div>
          <ServiceGrounds />
        </section>

        {/* AUREVIA — our own product, as a section (see AureviaBand.tsx) */}
        <AureviaBand />

        {/* SHOWCASE — what we've shipped and the sites we rate, grouped by kind (Showcase.tsx) */}
        <section className="section" id="work" data-wm="Work">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Our work &amp; what we rate</span>
            <h2 className="section__title">The bar we build to.</h2>
          </div>
          <Showcase />
        </section>

        <MarkRow />

        {/* SHOPIFY — the headline offer, given its own section above everything else */}
        <section className="section band band--raise" id="shopify" data-wm="Brand">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What we&rsquo;re known for</span>
            <h2 className="section__title">A whole Shopify brand, not just a theme.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
            Most Shopify stores look like the next one because they start with a bought theme and a
            logo from a marketplace. We start at the other end: what the brand is, what it looks
            like, how the products are presented — then build the storefront to match.
          </p>
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
              <li data-pin-item="mark"><b>Logo &amp; wordmark</b><span>A real mark, in every format you&rsquo;ll need — store, packaging, socials, print.</span></li>
              <li data-pin-item="colour"><b>Colour &amp; type system</b><span>A palette and pairing that holds across storefront, ads and packaging, written down.</span></li>
              <li data-pin-item="storefront"><b>Custom Shopify storefront</b><span>Your own theme on your own store — sections, layouts, checkout — fast on a phone.</span></li>
              <li data-pin-item="packaging"><b>Product &amp; packaging design</b><span>Labels, boxes, inserts and imagery designed with the brand, not bolted on after.</span></li>
              <li data-pin-item="products"><b>Product pages that sell</b><span>Collection and product pages built around how people decide: imagery, copy, bundles.</span></li>
              <li data-pin-item="apps"><b>Apps, integrations &amp; handover</b><span>Reviews, email, analytics and shipping wired up, then the whole store handed to you.</span></li>
            </ol>
          </div>

          <div className="case-actions reveal-up" style={{ marginTop: "2.5rem" }}>
            <a href="/pixel-and-code/shopify-brand-building/" className="btn btn--primary">
              <span>See how a Shopify brand build works</span>
              <Arrow />
            </a>
            <a href="/pixel-and-code/shopify-brand-building/#stores" className="btn btn--ghost"><span>See a store we built</span></a>
          </div>
        </section>

        {/* PROCESS — four hand-over artefacts, fanned on scroll (Deliverables.tsx) */}
        <section className="process section band band--raise" id="process" data-wm="Process">
          <div className="section__head process__head">
            <div>
              <span className="section__label"><span className="px"></span> How we work</span>
              <h2 className="section__title">From brief to <em>launch</em>, in four steps.</h2>
            </div>
            <p className="process__intro">You always know what is being built this week, why, and
               what you will be able to look at on Friday.</p>
          </div>
          <Deliverables />

        </section>

        {/* PROOF BAR */}
        <section className="proof-bar">
          <div className="proof-bar__inner reveal-up">
            <span>Something to look at every week</span>
            <span className="proof-bar__dot">✦</span>
            <span>You talk to the designers and engineers</span>
            <span className="proof-bar__dot">✦</span>
            <span>You own the store, the files and the code</span>
            <span className="proof-bar__dot">✦</span>
            <span>Full handover at launch</span>
          </div>
        </section>

        <MarkRow />

        {/* ENGAGEMENT MODELS */}
        <section className="section" id="pricing" data-wm="Price">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Ways to engage</span>
            <h2 className="section__title">Pick the shape that fits.</h2>
          </div>
          <PricingTabs />
        </section>

        <MarkRow />

        {/* PROOF */}
        <section className="testimonials section band band--deep" data-wm="Proof">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Proof</span>
            <h2 className="section__title">What it&rsquo;s like to work with us.</h2>
          </div>
          <div className="quotes">
            <article className="quote">
              <span className="quote__mark">&ldquo;</span>
              <p className="quote__text">We were running our whole recruitment process by hand before this. They shipped our job board, a candidate portal, an employer portal and the internal dashboard we run it all from in about six weeks, and cut our time-to-hire almost in half.</p>
              <div className="quote__by">
                <span className="quote__logo quote__logo--light"><img src="/pixel-and-code/assets/logos/jcrpharma.png" alt="" loading="lazy" /></span>
                <span><span className="quote__name">James Carpenter</span><span className="quote__role">Managing Director &middot; JCR Pharma</span></span>
              </div>
            </article>
            <article className="quote quote--lead">
              <span className="quote__mark">&ldquo;</span>
              <p className="quote__text">I came with a box of jewellery and a name. Six weeks later I had a logo I actually love, packaging people photograph before they open it, and a store that doesn&rsquo;t look like every other handmade shop. Pujo week orders went through without me touching anything.</p>
              <div className="quote__by">
                <span className="quote__logo quote__logo--light"><img src="/pixel-and-code/assets/logos/sreya-creates.png" alt="" loading="lazy" /></span>
                <span><span className="quote__name">Sreya</span><span className="quote__role">Founder &middot; Sreya Creates &middot; sreyacreates.com</span></span>
              </div>
            </article>
            <article className="quote">
              <span className="quote__mark">&ldquo;</span>
              <p className="quote__text">Plugging a conversational AI agent into an existing enterprise sales stack without breaking anything is not a small ask. They handled it cleanly and communicated every step of the way.</p>
              <div className="quote__by">
                <span className="quote__logo"><img src="/pixel-and-code/assets/logos/cpq-agent.svg" alt="" loading="lazy" /></span>
                <span><span className="quote__name">Product Lead</span><span className="quote__role">Expedite Commerce &middot; AI CPQ agent</span></span>
              </div>
            </article>
            <article className="quote">
              <span className="quote__mark">&ldquo;</span>
              <p className="quote__text">We&rsquo;d been quoted three months by two agencies. Pixel &amp; Code had a design we could react to in week one and the whole site live in three. Every Friday there was something new to look at, which is not how this usually goes.</p>
              <div className="quote__by">
                <span className="quote__logo quote__logo--light"><img src="/pixel-and-code/assets/logos/masters-in-minds.png" alt="" loading="lazy" /></span>
                <span><span className="quote__name">Managing Partner</span><span className="quote__role">Masters in Minds &middot; marketing site</span></span>
              </div>
            </article>
            <article className="quote">
              <span className="quote__mark">&ldquo;</span>
              <p className="quote__text">Our old theme was a bought template with our logo dropped in. They rebuilt the storefront around the brand we already had, migrated it on the live store with zero downtime, and mobile conversion went up the first month.</p>
              <div className="quote__by">
                <span className="quote__logo quote__logo--initial" aria-hidden="true">R</span>
                <span><span className="quote__name">Rhea K.</span><span className="quote__role">Founder &middot; skincare brand on Shopify, London</span></span>
              </div>
            </article>
          </div>
          <p className="quotes__note">Shopify is where we spend most of our time: Aurevia, the AI sales agent above, is our own product, live on the Shopify App Store. We built it, we run it, and we sit inside the same admin your store does &mdash; so we don&rsquo;t quote ourselves, <a href="/pixel-and-code/aurevia-io/">read how it was built</a> instead.</p>
          <div className="logo-strip">
            <span className="logo-strip__label">Worked with</span>
            <div className="logo-marquee" aria-label="Sreya Creates, Aurevia, JCR Pharma, Masters in Minds, Expedite Commerce">
              {[0, 1].map((dup) => (
                <div className="logo-marquee__track" aria-hidden={dup === 1} key={dup}>
                  <img src="/pixel-and-code/assets/logos/sreya-creates-wordmark.png" alt="" loading="lazy" className="logo-strip__img--light" />
                  <span className="logo-marquee__sep">&#10033;</span>
                  <img src="/pixel-and-code/assets/logos/aurevia.png" alt="" loading="lazy" />
                  <span className="logo-marquee__sep">&#10033;</span>
                  <img src="/pixel-and-code/assets/logos/jcrpharma.png" alt="" loading="lazy" className="logo-strip__img--light" />
                  <span className="logo-marquee__sep">&#10033;</span>
                  <img src="/pixel-and-code/assets/logos/masters-in-minds.png" alt="" loading="lazy" className="logo-strip__img--light" />
                  <span className="logo-marquee__sep">&#10033;</span>
                  <img src="/pixel-and-code/assets/logos/cpq-agent.svg" alt="" loading="lazy" />
                  <span className="logo-marquee__sep">&#10033;</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDERS */}
        <section className="section" id="team">
          <div className="founders">
            <div className="founders__faces">
              <figure>
                <img src="/pixel-and-code/assets/headshots/ritwik.jpg" alt="Ritwik Mandal" loading="lazy" />
                <figcaption>Ritwik Mandal <span>Co-founder &middot; CEO</span><a href="https://www.linkedin.com/in/ritwik-mandal-gtm/" target="_blank" rel="noopener" className="founders__li">LinkedIn ↗</a></figcaption>
              </figure>
              <figure>
                <img src="/pixel-and-code/assets/headshots/kishal.jpg" alt="Kishal Mandal" loading="lazy" />
                <figcaption>Kishal Mandal <span>Co-founder &middot; CTO</span><a href="https://www.linkedin.com/in/kishal/" target="_blank" rel="noopener" className="founders__li">LinkedIn ↗</a></figcaption>
              </figure>
            </div>
            <div className="founders__text">
              <span className="section__label"><span className="px"></span> Who you work with</span>
              <h2 className="section__title" style={{ marginBottom: "1.2rem" }}>Run by the two people who design and build it.</h2>
              <p><strong>There is no sales layer.</strong> The people on the scoping call are the people who draw your logo, design your store and write the code, and the people you email when something needs changing.</p>
              <p>We also build and run our own Shopify app, Aurevia, so we live inside the same admin, the same theme editor and the same checkout your store does &mdash; and with the same decisions: what to launch with, what to leave out, what breaks on a Friday.</p>
              <a href="/pixel-and-code/about/" className="btn btn--ghost"><span>More about us</span></a>
            </div>
          </div>
          <FoundersCall />
        </section>

        {/* FAQ */}
        <section className="section band band--raise" id="faq" data-wm="Ask">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Questions</span>
            <h2 className="section__title">Before you get in touch.</h2>
          </div>
          <div className="faq">
            <details className="faq__item"><summary>Do you use a Shopify theme or build it custom?</summary><p>Custom. We build the storefront as your own theme so the layouts, sections and product pages are designed for your brand, not adapted from someone else&rsquo;s. It still lives in your Shopify admin, so your team edits content the normal way.</p></details>
            <details className="faq__item"><summary>Can you do just the branding, or just the store?</summary><p>Yes, either. Plenty of merchants come to us with a brand they already like and want the store rebuilt around it, and some want the identity, logo and packaging only. The full build is simply the two together.</p></details>
            <details className="faq__item"><summary>We already sell on Shopify. Can you rebuild what we have?</summary><p>Yes. We work on your existing store, keep your products, orders and apps in place, and launch the new storefront when it&rsquo;s ready — not by starting a new store from scratch.</p></details>
            <details className="faq__item"><summary>How much does a project cost?</summary><p>Every package has a &ldquo;from&rdquo; price on this page &mdash; a brand and custom Shopify store starts at &pound;4,900, occasion pages that keep it changing with the calendar are &pound;290 a month, a marketing site starts at &pound;2,400, a web app MVP at &pound;7,900, an automation audit is &pound;490. After a free 30-minute call you get a written scope and a fixed number within one business day. No retainers.</p></details>
            <details className="faq__item"><summary>How long does it take?</summary><p>A brand and store build typically launches in about six weeks. Brand-only work is faster; larger platforms are phased so something real is live early and grows from there.</p></details>
            <details className="faq__item"><summary>What do we own at the end?</summary><p>Everything. The Shopify store is in your name from week one, and at launch you get the editable brand source files, the theme code, the documentation and a recorded walkthrough.</p></details>
            <details className="faq__item"><summary>Do you only work on Shopify?</summary><p>No — it&rsquo;s what we&rsquo;re known for, but we also build websites, web apps and internal platforms (JCR Pharma, Masters in Minds), and AI automations that plug into systems a business already runs.</p></details>
            <details className="faq__item"><summary>Do you work with agencies?</summary><p>Yes, as a white-label design and development partner for agencies that sell the project and need a team to build it. <a href="/pixel-and-code/development-partners/">See how that works</a>.</p></details>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact section" id="contact">
          <div className="contact__wm" aria-hidden="true">
            <span className="contact__wm-grid" />
            <span className="contact__wm-mark" />
            <span className="contact__wm-ring" />
            <span className="contact__wm-bits" />
          </div>
          <div className="contact__inner">
            <span className="section__label reveal-up"><span className="px"></span> Let&rsquo;s talk</span>
            <h2 className="contact__title">Tell us about your brand.</h2>
            <p className="contact__sub">Send a short brief and you&rsquo;ll hear from Kishal or Ritwik within one business day.</p>
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
                  <label htmlFor="lead-project">What are you selling, and where are you now?</label>
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
                <p>Book a free 30-minute scoping call with Ritwik in the founders section above. We map the brand and the store with you and send a written scope and fixed quote afterwards.</p>
                <a href="#book" className="btn btn--ghost"><span>Book a call with Ritwik &#8593;</span></a>
                <div className="contact__alt">
                  Email <a href="mailto:sales@aurevia.io" data-track="email_click">sales@aurevia.io</a><br />
                  or <button type="button" data-open-chat>scope it with our AI assistant</button>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <PxcFooter
        links={[
          { href: "/pixel-and-code/shopify-brand-building/", label: "Shopify brands" },
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
