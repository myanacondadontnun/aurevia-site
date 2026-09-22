import type { Metadata } from "next";
import Chrome from "./_components/Chrome";
import PxcNav from "./_components/PxcNav";
import PxcFooter from "./_components/PxcFooter";
import ChatWidget from "./_components/ChatWidget";
import MarkRow from "./_components/MarkRow";

const CALENDLY = "https://calendly.com/km-kkishal/30min";

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
        ctaHref={CALENDLY}
        ctaLabel="Book a call"
        ctaExternal
      />

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero__grid">
            <div className="hero__inner">
              <p className="hero__eyebrow reveal-up"><span className="px px--pulse"></span> A Shopify brand &amp; store studio</p>
              <h1 className="hero__title">
                <span className="line"><span>Your Shopify brand,</span></span>
                <span className="line"><span>built from <em>scratch</em>.</span></span>
              </h1>
              <p className="hero__sub reveal-up">
                Pixel &amp; Code builds Shopify brands end to end — the logo, the colours, the
                packaging and product design, and a custom storefront that isn&rsquo;t the same theme
                every other store is running. Already have a brand? We&rsquo;ll build the store around it.
              </p>
              <p className="hero__builds reveal-up"><b>We build</b> brand identity <span className="px"></span> logo &amp; colour <span className="px"></span> product &amp; packaging design <span className="px"></span> custom Shopify storefronts <span className="px"></span> websites &amp; web apps <span className="px"></span> AI automation</p>
              <div className="hero__actions reveal-up">
                <a href={CALENDLY} target="_blank" rel="noopener" className="btn btn--primary" data-track="book_call">
                  <span>Book a free scoping call</span>
                  <Arrow />
                </a>
                <a href="#shopify" className="btn btn--ghost"><span>See what a brand build includes</span></a>
              </div>
              <p className="hero__trust reveal-up">30-min call, no pitch <span className="px"></span> Fixed-price builds <span className="px"></span> You own the store and the files</p>
            </div>

            {/* The six weeks, drawn in the brand's own pixel language — no stock art, no 3D. */}
            <div className="weeks" aria-label="A typical six-week brand and store build">
              <div className="weeks__bars" aria-hidden="true">
                <div className="weeks__col"><i></i><i></i></div>
                <div className="weeks__col"><i></i><i></i><i></i><i></i></div>
                <div className="weeks__col"><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <div className="weeks__col"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <div className="weeks__col"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
                <div className="weeks__col weeks__col--now"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
              </div>
              <div className="weeks__labels reveal-up">
                <span><b>wk 1</b>Scope</span>
                <span><b>wk 2</b>Identity</span>
                <span><b>wk 3</b>Design</span>
                <span><b>wk 4</b>Build</span>
                <span><b>wk 5</b>Products</span>
                <span className="is-now"><b>wk 6</b>Launch</span>
              </div>
              <p className="weeks__caption reveal-up">Something real to look at every Friday from week two.</p>
            </div>
          </div>
        </section>

        {/* FACTS — replaces the decorative service-word ticker */}
        <section className="facts" aria-label="Facts">
          <div className="facts__inner">
            <span><span className="px"></span><b>Sreya Creates</b> — brand and custom storefront, live at sreyacreates.com</span>
            <span><span className="px"></span><b>Aurevia</b> — our own Shopify app, shipped weekly for 12+ months</span>
            <span><span className="px"></span><b>JCR Pharma</b> — three portals live in about six weeks</span>
            <span><span className="px"></span><b>Every project</b> — your store, your repos, your accounts, from week one</span>
          </div>
        </section>

        {/* SHOPIFY — the headline offer, given its own section above everything else */}
        <section className="section" id="shopify">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What we&rsquo;re known for</span>
            <h2 className="section__title">A whole Shopify brand, not just a theme.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
            Most Shopify stores look like the next one because they start with a bought theme and a
            logo from a marketplace. We start at the other end: what the brand is, what it looks
            like, how the products are presented — then build the storefront to match.
          </p>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Identity</span>
              <h3>Logo &amp; wordmark</h3>
              <p>A real mark designed for your brand, delivered in every format you&rsquo;ll ever need —
                 store, packaging, socials, print.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Identity</span>
              <h3>Colour &amp; type system</h3>
              <p>A palette and typeface pairing that holds together across the storefront, your ads
                 and your packaging, written down so anyone can apply it.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Product</span>
              <h3>Product &amp; packaging design</h3>
              <p>Labels, boxes, inserts and product imagery designed alongside the brand rather than
                 bolted on afterwards by someone else.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Storefront</span>
              <h3>Custom Shopify storefront</h3>
              <p>Built as a custom theme on your own Shopify store — your sections, your layouts,
                 your checkout flow. Fast on mobile, because that&rsquo;s where the sales are.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Storefront</span>
              <h3>Product pages that sell</h3>
              <p>Collection and product pages structured around how people actually decide — the
                 photography, the copy blocks, the upsells and the bundles.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Launch</span>
              <h3>Apps, integrations &amp; handover</h3>
              <p>Reviews, email, analytics and shipping wired up, then the whole store handed to you
                 with the brand files and a recorded walkthrough.</p>
            </article>
          </div>
          <div className="case-actions reveal-up" style={{ marginTop: "2.5rem" }}>
            <a href="/pixel-and-code/shopify-brand-building/" className="btn btn--primary">
              <span>See how a Shopify brand build works</span>
              <Arrow />
            </a>
            <a href="/pixel-and-code/shopify-brand-building/#stores" className="btn btn--ghost"><span>See a store we built</span></a>
          </div>
        </section>

        {/* PROOF */}
        <section className="testimonials section">
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
            <article className="quote">
              <span className="quote__mark">&ldquo;</span>
              <p className="quote__text">Plugging a conversational AI agent into an existing enterprise sales stack without breaking anything is not a small ask. They handled it cleanly and communicated every step of the way.</p>
              <div className="quote__by">
                <span className="quote__logo"><img src="/pixel-and-code/assets/logos/cpq-agent.svg" alt="" loading="lazy" /></span>
                <span><span className="quote__name">Product Lead</span><span className="quote__role">Expedite Commerce &middot; AI CPQ agent</span></span>
              </div>
            </article>
          </div>
          <p className="quotes__note">Shopify is where we spend most of our time: Aurevia, the AI sales agent listed below, is our own product, live on the Shopify App Store. We built it, we run it, and we sit inside the same admin your store does &mdash; so we don&rsquo;t quote ourselves, <a href="/pixel-and-code/aurevia-io/">read how it was built</a> instead.</p>
          <div className="logo-strip">
            <span className="logo-strip__label">Worked with</span>
            <div className="logo-strip__row">
              <img src="/pixel-and-code/assets/logos/sreya-creates-wordmark.png" alt="Sreya Creates" loading="lazy" className="logo-strip__img--light" />
              <img src="/pixel-and-code/assets/logos/aurevia.png" alt="Aurevia" loading="lazy" />
              <img src="/pixel-and-code/assets/logos/jcrpharma.png" alt="JCR Pharma" loading="lazy" className="logo-strip__img--light" />
              <img src="/pixel-and-code/assets/logos/masters-in-minds.png" alt="Masters in Minds" loading="lazy" className="logo-strip__img--light" />
              <img src="/pixel-and-code/assets/logos/cpq-agent.svg" alt="Expedite Commerce" loading="lazy" />
            </div>
          </div>
        </section>

        <MarkRow />

        {/* SERVICES */}
        <section className="services section" id="services">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What we do</span>
            <h2 className="section__title">Three ways to work with us.</h2>
          </div>
          <div className="svc-grid">
            <article className="svc-card svc-card--lead">
              <span className="svc-card__idx" aria-hidden="true">01</span>
              <div className="svc-card__head">
                <h3 className="svc-card__title">Shopify brand building</h3>
                <span className="svc-card__tag">What we&rsquo;re known for</span>
              </div>
              <div className="svc-card__text">
                <p className="svc-card__desc">A brand built from nothing — logo, colour, type,
                   packaging and product design — and a custom Shopify storefront built to match.
                   Already trading? We rebuild the store around the brand you have.</p>
                <span className="svc-card__stack">Logo &amp; identity <span className="px"></span> Colour &amp; type <span className="px"></span> Packaging <span className="px"></span> Product design <span className="px"></span> Custom theme</span>
                <a href="/pixel-and-code/shopify-brand-building/" className="svc-card__link"><span>See how we build Shopify brands ↗</span></a>
              </div>
            </article>

            <article className="svc-card">
              <span className="svc-card__idx" aria-hidden="true">02</span>
              <div className="svc-card__head"><h3 className="svc-card__title">Websites &amp; web apps</h3></div>
              <div className="svc-card__text">
                <p className="svc-card__desc">Software built around your operation — dashboards,
                   portals, marketplaces and job boards — plus the marketing site that sells it.
                   JCR Pharma and Masters in Minds were both built this way.</p>
                <span className="svc-card__stack">Dashboards <span className="px"></span> Portals <span className="px"></span> Marketplaces &amp; job boards <span className="px"></span> Marketing sites <span className="px"></span> SaaS</span>
                <a href="/pixel-and-code/web-app-development/" className="svc-card__link"><span>See how we build platforms ↗</span></a>
              </div>
            </article>

            <article className="svc-card">
              <span className="svc-card__idx" aria-hidden="true">03</span>
              <div className="svc-card__head"><h3 className="svc-card__title">AI automation</h3></div>
              <div className="svc-card__text">
                <p className="svc-card__desc">Short version: we plug practical AI into the systems you
                   already run, so the repetitive work stops landing on someone&rsquo;s desk.</p>
                <span className="svc-card__stack">AI agents <span className="px"></span> Automation <span className="px"></span> CRM/API integrations</span>
                <a href="/pixel-and-code/ai-automation/" className="svc-card__link"><span>See how we build AI &amp; automation ↗</span></a>
              </div>
            </article>
          </div>
        </section>

        {/* PROCESS — each step says what lands in your inbox, not how we feel about code */}
        <section className="process section" id="process">
          <div className="process__sticky">
            <div className="process__left">
              <span className="section__label"><span className="px"></span> How we work</span>
              <h2 className="section__title">From brief to <em>launch</em>, in four steps.</h2>
              <p className="process__intro">You always know what is being built this week, why, and
                 what you will be able to look at on Friday.</p>
              <a href="/pixel-and-code/how-we-work/" className="btn btn--ghost" style={{ marginTop: "1.8rem" }}>
                <span>See the full process</span>
                <Arrow />
              </a>
            </div>
            <div className="process__right" data-steps>
              <div className="step" data-step>
                <span className="step__blocks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
                <div className="step__body">
                <span className="step__index">01</span>
                <h3>Scope</h3>
                <p>A 30-minute call, then we map it: who you sell to, what the brand has to say, what the store must do at launch.</p>
                <span className="step__deliverable">You get: a written scope and a fixed quote, within one business day</span>
                </div>
              </div>
              <div className="step" data-step>
                <span className="step__blocks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
                <div className="step__body">
                <span className="step__index">02</span>
                <h3>Identity &amp; design</h3>
                <p>Logo, palette and type first, then the real storefront screens — reviewed with you before any production code starts.</p>
                <span className="step__deliverable">You get: your brand direction, then a clickable store design</span>
                </div>
              </div>
              <div className="step" data-step>
                <span className="step__blocks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
                <div className="step__body">
                <span className="step__index">03</span>
                <h3>Build</h3>
                <p>The custom theme built on your own Shopify store, with products, collections and apps wired in as we go.</p>
                <span className="step__deliverable">You get: a Friday preview link and a short written changelog, every week</span>
                </div>
              </div>
              <div className="step" data-step>
                <span className="step__blocks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
                <div className="step__body">
                <span className="step__index">04</span>
                <h3>Launch &amp; hand over</h3>
                <p>We go live, watch the first real orders, fix what they find, then hand the whole thing to you.</p>
                <span className="step__deliverable">You get: the store, the brand files, written docs and a recorded walkthrough</span>
                </div>
              </div>
            </div>
          </div>
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

        {/* WORK — every row carries an outcome, not just a category */}
        <section className="work section" id="work">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Selected work</span>
            <h2 className="section__title">Things we&rsquo;ve built.</h2>
          </div>
          <div className="work__list" data-work>
            <a className="project" data-project href="https://sreyacreates.com" target="_blank" rel="noopener">
              <div className="project__brand">
                <span className="project__logo project__logo--light"><img src="/pixel-and-code/assets/logos/sreya-creates.png" alt="" loading="lazy" /></span>
                <div className="project__meta">
                  <h3>Sreya Creates <span className="project__tag">Brand + store</span></h3>
                  <span>Handmade jewellery, Kolkata <span className="px"></span> Shopify</span>
                  <span className="project__outcome">Logo, palette and type designed from scratch, then a custom storefront built for one-of-a-kind stock and seasonal Pujo drops.</span>
                </div>
              </div>
              <span className="project__year">&apos;25</span>
              <span className="project__arrow">↗</span>
            </a>
            <a className="project" data-project href="/pixel-and-code/aurevia-io/">
              <div className="project__brand">
                <span className="project__logo"><img src="/pixel-and-code/assets/logos/aurevia.png" alt="" loading="lazy" /></span>
                <div className="project__meta">
                  <h3>Aurevia <span className="project__tag">Built &amp; run by us</span></h3>
                  <span>AI sales agent for Shopify <span className="px"></span> Brand, product &amp; SaaS</span>
                  <span className="project__outcome">Named, branded and built in-house; live on the Shopify App Store with a new release every week for over a year.</span>
                </div>
              </div>
              <span className="project__year">&apos;25</span>
              <span className="project__arrow">↗</span>
            </a>
            <a className="project" data-project href="/pixel-and-code/jcrpharma-co-uk/">
              <div className="project__brand">
                <span className="project__logo project__logo--light"><img src="/pixel-and-code/assets/logos/jcrpharma.png" alt="" loading="lazy" /></span>
                <div className="project__meta">
                  <h3>JCR Pharma</h3>
                  <span>Life-sciences &amp; biometrics recruitment platform</span>
                  <span className="project__outcome">Candidate portal, employer portal and internal dashboard live in about six weeks; time-to-hire almost halved.</span>
                </div>
              </div>
              <span className="project__year">&apos;24</span>
              <span className="project__arrow">↗</span>
            </a>
            <a className="project" data-project href="https://www.mastersinminds.com/" target="_blank" rel="noopener">
              <div className="project__brand">
                <span className="project__logo project__logo--light"><img src="/pixel-and-code/assets/logos/masters-in-minds.png" alt="" loading="lazy" /></span>
                <div className="project__meta">
                  <h3>Masters in Minds</h3>
                  <span>Business consulting website</span>
                  <span className="project__outcome">Marketing site designed and built end to end.</span>
                </div>
              </div>
              <span className="project__year">&apos;24</span>
              <span className="project__arrow">↗</span>
            </a>
            <a className="project" data-project href="https://www.expeditecommerce.com/cpq-software/" target="_blank" rel="noopener">
              <div className="project__brand">
                <span className="project__logo"><img src="/pixel-and-code/assets/logos/cpq-agent.svg" alt="" loading="lazy" /></span>
                <div className="project__meta">
                  <h3>AI CPQ Agent</h3>
                  <span>Conversational configure-price-quote <span className="px"></span> AI automation</span>
                  <span className="project__outcome">A Claude-powered quoting agent plugged into a live enterprise sales stack.</span>
                </div>
              </div>
              <span className="project__year">&apos;25</span>
              <span className="project__arrow">↗</span>
            </a>
          </div>
          <div className="verticals">
            <span className="verticals__label">Sectors we&rsquo;ve shipped in</span>
            <a href="/pixel-and-code/shopify-brand-building/">Ecommerce &amp; Shopify</a>
            <a href="/pixel-and-code/jcrpharma-co-uk/">Recruitment &amp; life sciences</a>
            <a href="https://www.mastersinminds.com/" target="_blank" rel="noopener">Professional services</a>
            <a href="https://www.expeditecommerce.com/cpq-software/" target="_blank" rel="noopener">B2B SaaS &amp; enterprise sales</a>
          </div>
        </section>

        {/* ENGAGEMENT MODELS */}
        <section className="section" id="pricing">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Ways to engage</span>
            <h2 className="section__title">Pick the shape that fits.</h2>
          </div>
          <div className="models">
            <div className="model">
              <div>
                <h3>Shopify brand build</h3>
                <span className="model__for">For founders launching or relaunching a store</span>
              </div>
              <div>
                <p>The whole thing: brand identity, logo, colour and type, packaging and product design, and a custom Shopify storefront built on top of it.</p>
                <ul>
                  <li>Fixed scope and fixed price, agreed after the scoping call</li>
                  <li>Live in about six weeks</li>
                  <li>Brand only, or store only, if that&rsquo;s all you need</li>
                </ul>
              </div>
              <div className="model__terms">Fixed price<span>~6 weeks to launch</span><span>Quote within one business day</span></div>
            </div>
            <div className="model">
              <div>
                <h3>Website or web app build</h3>
                <span className="model__for">For businesses that need software, not a store</span>
              </div>
              <div>
                <p>A marketing site, an internal platform or a full SaaS product — designed, built and launched the same way, week by week.</p>
                <ul>
                  <li>Fixed scope and fixed price per phase</li>
                  <li>First launch in about six weeks</li>
                  <li>A demo of working software every week</li>
                </ul>
              </div>
              <div className="model__terms">Fixed price<span>~6 weeks to first launch</span><span>Quote within one business day</span></div>
            </div>
            <div className="model">
              <div>
                <h3>AI automation</h3>
                <span className="model__for">Add-on, or on its own</span>
              </div>
              <div>
                <p>One workflow automated end to end and plugged into the systems you already run, with a human in the loop where it matters.</p>
                <ul>
                  <li>Fixed price per automation</li>
                  <li>Judged on the hours it removes, not the demo</li>
                </ul>
              </div>
              <div className="model__terms">Fixed price<span>Audit first, then build</span><span>Quote within one business day</span></div>
            </div>
            <div className="model">
              <div>
                <h3>Full handover</h3>
                <span className="model__for">Included in every project</span>
              </div>
              <div>
                <p>We don&rsquo;t sell retainers. At launch everything is yours: the Shopify store, the brand files, the code, the infrastructure and a recorded walkthrough of how it all fits together.</p>
                <ul>
                  <li>Store, repos and cloud accounts in your name from week one</li>
                  <li>Editable brand source files, not just exported PNGs</li>
                  <li>Need more later? A new fixed-price phase, quoted the same way</li>
                </ul>
              </div>
              <div className="model__terms">No lock-in<span>Nothing to migrate later</span><span>Come back when you need us</span></div>
            </div>
          </div>
          <p className="models__note">Every engagement starts with a free 30-minute scoping call. Afterwards you get a written scope and a fixed quote within one business day, whether or not you go ahead.</p>
        </section>

        <MarkRow />

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
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Questions</span>
            <h2 className="section__title">Before you get in touch.</h2>
          </div>
          <div className="faq">
            <details className="faq__item"><summary>Do you use a Shopify theme or build it custom?</summary><p>Custom. We build the storefront as your own theme so the layouts, sections and product pages are designed for your brand, not adapted from someone else&rsquo;s. It still lives in your Shopify admin, so your team edits content the normal way.</p></details>
            <details className="faq__item"><summary>Can you do just the branding, or just the store?</summary><p>Yes, either. Plenty of merchants come to us with a brand they already like and want the store rebuilt around it, and some want the identity, logo and packaging only. The full build is simply the two together.</p></details>
            <details className="faq__item"><summary>We already sell on Shopify. Can you rebuild what we have?</summary><p>Yes. We work on your existing store, keep your products, orders and apps in place, and launch the new storefront when it&rsquo;s ready — not by starting a new store from scratch.</p></details>
            <details className="faq__item"><summary>How much does a project cost?</summary><p>It depends on scope, which is why we start with a free scoping call. After it you get a written scope and a fixed quote within one business day. Every engagement is fixed price. We don&rsquo;t sell retainers.</p></details>
            <details className="faq__item"><summary>How long does it take?</summary><p>A brand and store build typically launches in about six weeks. Brand-only work is faster; larger platforms are phased so something real is live early and grows from there.</p></details>
            <details className="faq__item"><summary>What do we own at the end?</summary><p>Everything. The Shopify store is in your name from week one, and at launch you get the editable brand source files, the theme code, the documentation and a recorded walkthrough.</p></details>
            <details className="faq__item"><summary>Do you only work on Shopify?</summary><p>No — it&rsquo;s what we&rsquo;re known for, but we also build websites, web apps and internal platforms (JCR Pharma, Masters in Minds), and AI automations that plug into systems a business already runs.</p></details>
            <details className="faq__item"><summary>Do you work with agencies?</summary><p>Yes, as a white-label design and development partner for agencies that sell the project and need a team to build it. <a href="/pixel-and-code/development-partners/">See how that works</a>.</p></details>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact section" id="contact">
          <div className="contact__inner">
            <span className="section__label reveal-up"><span className="px"></span> Let&rsquo;s talk</span>
            <h2 className="contact__title">Tell us about your brand.</h2>
            <p className="contact__sub">Send a short brief and you&rsquo;ll hear from Kishal or Ritwik within one business day. Or skip the form and book a call.</p>
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
                <h3>Prefer to talk?</h3>
                <p>Book a free 30-minute scoping call. We map the brand and the store with you and send a written scope and fixed quote afterwards.</p>
                <a href={CALENDLY} target="_blank" rel="noopener" className="btn btn--primary" data-track="book_call"><span>Book a scoping call</span></a>
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
