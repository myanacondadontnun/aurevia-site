import type { Metadata } from "next";
import Chrome from "./_components/Chrome";
import PxcNav from "./_components/PxcNav";
import PxcFooter from "./_components/PxcFooter";
import ChatWidget from "./_components/ChatWidget";
import MarkRow from "./_components/MarkRow";

const CALENDLY = "https://calendly.com/km-kkishal/30min";

export const metadata: Metadata = {
  title: "Pixel & Code — SaaS, AI automation and internal tools, built in about six weeks",
  description:
    "Pixel & Code is a two-founder product studio. We design and build SaaS products, AI automations and internal platforms for founders and growing businesses — fixed scope, weekly working releases, first launch in about six weeks.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/" },
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

// Rebuilt 2026-09 for paid-ad traffic: one offer (live in ~6 weeks), a real
// lead form + calendar link instead of chat-only intake, engagement models,
// founders, FAQ. No preloader / 3D / cursor — see Chrome.tsx and layout.tsx.
export default function PixelAndCodeHome() {
  return (
    <>
      <Chrome />

      {/* Two destinations only: proof and the call. Everything else is one scroll away. */}
      <PxcNav
        logoHref="/pixel-and-code/#top"
        links={[
          { href: "/pixel-and-code/#work", label: "Our work" },
          { href: "/pixel-and-code/#process", label: "How we work" },
          { href: "/pixel-and-code/#team", label: "Who we are" },
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
              <p className="hero__eyebrow reveal-up"><span className="px px--pulse"></span> A product studio for the AI era</p>
              <h1 className="hero__title">
                <span className="line"><span>Your product, live</span></span>
                <span className="line"><span>in about <em>six weeks</em>.</span></span>
              </h1>
              <p className="hero__sub reveal-up">
                Pixel &amp; Code designs and builds SaaS products, AI automations and internal
                platforms for founders and growing businesses. Fixed scope, a working release
                every week, and a senior team you talk to directly.
              </p>
              <p className="hero__builds reveal-up"><b>We build</b> SaaS <span className="px"></span> internal tools <span className="px"></span> AI automation <span className="px"></span> marketplaces &amp; job boards <span className="px"></span> Shopify storefronts <span className="px"></span> websites</p>
              <div className="hero__actions reveal-up">
                <a href={CALENDLY} target="_blank" rel="noopener" className="btn btn--primary" data-track="book_call">
                  <span>Book a free scoping call</span>
                  <Arrow />
                </a>
                <a href="#contact" className="btn btn--ghost"><span>Send us your brief</span></a>
              </div>
              <p className="hero__trust reveal-up">30-min call, no pitch <span className="px"></span> Fixed-price MVPs <span className="px"></span> You own the code</p>
            </div>

            {/* The six weeks, drawn in the brand's own pixel language — no stock art, no 3D. */}
            <div className="weeks" aria-label="A typical six-week MVP sprint">
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
                <span><b>wk 2</b>Design</span>
                <span><b>wk 3</b>Build</span>
                <span><b>wk 4</b>Build</span>
                <span><b>wk 5</b>Test</span>
                <span className="is-now"><b>wk 6</b>Launch</span>
              </div>
              <p className="weeks__caption reveal-up">A working release in your hands every Friday from week two.</p>
            </div>
          </div>
        </section>

        {/* FACTS — replaces the decorative service-word ticker */}
        <section className="facts" aria-label="Facts">
          <div className="facts__inner">
            <span><span className="px"></span><b>Aurevia</b> — our own SaaS, shipped weekly for 12+ months</span>
            <span><span className="px"></span><b>JCR Pharma</b> — three portals live in about six weeks</span>
            <span><span className="px"></span><b>Every project</b> — your repos, your cloud, from week one</span>
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
          <p className="quotes__note">Aurevia, the Shopify sales agent listed below, is our own product. We built it and run it, so we don&rsquo;t quote ourselves &mdash; <a href="/pixel-and-code/aurevia-io/">read how it was built</a> instead.</p>
          <div className="logo-strip">
            <span className="logo-strip__label">Worked with</span>
            <div className="logo-strip__row">
              <img src="/pixel-and-code/assets/logos/cpq-agent.svg" alt="Expedite Commerce" loading="lazy" />
              <img src="/pixel-and-code/assets/logos/jcrpharma.png" alt="JCR Pharma" loading="lazy" className="logo-strip__img--light" />
              <img src="/pixel-and-code/assets/logos/masters-in-minds.png" alt="Masters in Minds" loading="lazy" className="logo-strip__img--light" />
              <img src="/pixel-and-code/assets/logos/aurevia.png" alt="Aurevia" loading="lazy" />
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
            <article className="svc-card">
              <span className="svc-card__idx" aria-hidden="true">01</span>
              <div className="svc-card__head"><h3 className="svc-card__title">SaaS Product Development</h3></div>
              <div className="svc-card__text">
                <p className="svc-card__desc">Launch or rebuild a production-ready SaaS platform without
                   assembling an internal product team — discovery, UX, billing, admin, integrations,
                   through to deployment.</p>
                <span className="svc-card__stack">Discovery <span className="px"></span> UX/UI <span className="px"></span> Billing <span className="px"></span> Admin <span className="px"></span> Integrations</span>
                <a href="/pixel-and-code/saas-development/" className="svc-card__link"><span>See how we build SaaS ↗</span></a>
              </div>
            </article>

            <article className="svc-card">
              <span className="svc-card__idx" aria-hidden="true">02</span>
              <div className="svc-card__head"><h3 className="svc-card__title">AI &amp; Workflow Automation</h3></div>
              <div className="svc-card__text">
                <p className="svc-card__desc">Replace repetitive operational work with practical AI
                   systems, integrations and custom tools — built on the latest Claude models, with
                   a human kept in the loop.</p>
                <span className="svc-card__stack">AI agents <span className="px"></span> RAG <span className="px"></span> Automation <span className="px"></span> CRM/API <span className="px"></span> Monitoring</span>
                <a href="/pixel-and-code/ai-automation/" className="svc-card__link"><span>See how we build AI &amp; automation ↗</span></a>
              </div>
            </article>

            <article className="svc-card">
              <span className="svc-card__idx" aria-hidden="true">03</span>
              <div className="svc-card__head"><h3 className="svc-card__title">Web apps, websites &amp; storefronts</h3></div>
              <div className="svc-card__text">
                <p className="svc-card__desc">Software built around your operation — dashboards, portals,
                   marketplaces and job boards — plus the marketing site and custom Shopify storefront
                   that sell it.</p>
                <span className="svc-card__stack">Dashboards <span className="px"></span> Portals <span className="px"></span> Marketplaces &amp; job boards <span className="px"></span> Shopify storefronts <span className="px"></span> Marketing sites</span>
                <a href="/pixel-and-code/web-app-development/" className="svc-card__link"><span>See how we build platforms ↗</span></a>
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
                 what you will be able to click on Friday.</p>
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
                <p>A 30-minute call, then we map the product: who it is for, what v1 must do, what waits.</p>
                <span className="step__deliverable">You get: a written scope and a fixed quote, within one business day</span>
                </div>
              </div>
              <div className="step" data-step>
                <span className="step__blocks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
                <div className="step__body">
                <span className="step__index">02</span>
                <h3>Design</h3>
                <p>Clickable screens for the real flows, reviewed with you before production code starts.</p>
                <span className="step__deliverable">You get: a clickable prototype and a build plan by week</span>
                </div>
              </div>
              <div className="step" data-step>
                <span className="step__blocks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
                <div className="step__body">
                <span className="step__index">03</span>
                <h3>Build</h3>
                <p>Working software in your own repos and cloud, released to a staging link every week.</p>
                <span className="step__deliverable">You get: a Friday demo link and a short written changelog, every week</span>
                </div>
              </div>
              <div className="step" data-step>
                <span className="step__blocks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>
                <div className="step__body">
                <span className="step__index">04</span>
                <h3>Launch &amp; hand over</h3>
                <p>We deploy, watch the first real users, fix what they find, then hand the whole thing to you.</p>
                <span className="step__deliverable">You get: your repos, your cloud, written docs and a recorded walkthrough</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF BAR */}
        <section className="proof-bar">
          <div className="proof-bar__inner reveal-up">
            <span>A working release every week</span>
            <span className="proof-bar__dot">✦</span>
            <span>You talk to the engineers</span>
            <span className="proof-bar__dot">✦</span>
            <span>You own the code and repos</span>
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
            <a className="project" data-project href="/pixel-and-code/aurevia-io/">
              <div className="project__brand">
                <span className="project__logo"><img src="/pixel-and-code/assets/logos/aurevia.png" alt="" loading="lazy" /></span>
                <div className="project__meta">
                  <h3>Aurevia <span className="project__tag">Built &amp; run by us</span></h3>
                  <span>AI sales agent for Shopify <span className="px"></span> SaaS</span>
                  <span className="project__outcome">Live on the Shopify App Store; new release every week for over a year.</span>
                </div>
              </div>
              <span className="project__year">&apos;25</span>
              <span className="project__arrow">↗</span>
            </a>
            <a className="project" data-project href="https://www.expeditecommerce.com/cpq-software/" target="_blank" rel="noopener">
              <div className="project__brand">
                <span className="project__logo"><img src="/pixel-and-code/assets/logos/cpq-agent.svg" alt="" loading="lazy" /></span>
                <div className="project__meta">
                  <h3>AI CPQ Agent</h3>
                  <span>Conversational configure-price-quote <span className="px"></span> AI SaaS</span>
                  <span className="project__outcome">A Claude-powered quoting agent integrated into a live enterprise sales stack.</span>
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
          </div>
          <div className="verticals">
            <span className="verticals__label">Sectors we&rsquo;ve shipped in</span>
            <a href="/pixel-and-code/jcrpharma-co-uk/">Recruitment &amp; life sciences</a>
            <a href="/pixel-and-code/aurevia-io/">Ecommerce &amp; Shopify</a>
            <a href="https://www.expeditecommerce.com/cpq-software/" target="_blank" rel="noopener">B2B SaaS &amp; enterprise sales</a>
            <a href="https://www.mastersinminds.com/" target="_blank" rel="noopener">Professional services</a>
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
                <h3>MVP sprint</h3>
                <span className="model__for">For founders launching a first product</span>
              </div>
              <div>
                <p>A scoped v1 designed, built and launched: discovery, UX, the build, billing, admin, deployment.</p>
                <ul>
                  <li>Fixed scope and fixed price, agreed after the scoping call</li>
                  <li>First launch in about six weeks</li>
                  <li>A demo of working software every week</li>
                </ul>
              </div>
              <div className="model__terms">Fixed price<span>~6 weeks to first launch</span><span>Quote within one business day</span></div>
            </div>
            <div className="model">
              <div>
                <h3>AI &amp; automation project</h3>
                <span className="model__for">For businesses replacing manual work</span>
              </div>
              <div>
                <p>One workflow automated end to end on the latest Claude models, with a human in the loop where it matters.</p>
                <ul>
                  <li>Starts with a short audit of the workflow and its data</li>
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
                <p>We don&rsquo;t sell retainers. At launch everything is yours: the code, the infrastructure, the documentation and a recorded walkthrough of how it all fits together.</p>
                <ul>
                  <li>Repos and cloud accounts in your name from week one</li>
                  <li>Written docs plus a recorded handover session</li>
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
              <h2 className="section__title" style={{ marginBottom: "1.2rem" }}>Run by the two people who build your product.</h2>
              <p><strong>There is no sales layer.</strong> The people on the scoping call are the people who design, build and ship your product, and the people you email when something needs changing.</p>
              <p>We also build and run our own software, Aurevia, so we live with the same decisions we make for you: what to ship first, what to leave out, what breaks at 2am.</p>
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
            <details className="faq__item"><summary>How much does a project cost?</summary><p>It depends on scope, which is why we start with a free scoping call. After it you get a written scope and a fixed quote within one business day. Every engagement is fixed price. We don&rsquo;t sell retainers.</p></details>
            <details className="faq__item"><summary>How long does it take?</summary><p>A scoped MVP typically reaches first launch in about six weeks. Larger platforms are phased so something real is live early and grows from there.</p></details>
            <details className="faq__item"><summary>Who owns the code?</summary><p>You do. Everything lives in your repositories and your cloud accounts from the first week, so there is nothing to hand over later.</p></details>
            <details className="faq__item"><summary>What happens after launch?</summary><p>We hand everything over: repos, cloud, docs and a recorded walkthrough. If you want more built later, that is a new fixed-price phase, quoted the same way. No retainer, no lock-in.</p></details>
            <details className="faq__item"><summary>Do you use AI to build?</summary><p>Yes, and we say so. AI speeds up the build; the architecture, reviews and decisions are ours. AI features inside your product are built on the latest Claude models with a human kept in the loop.</p></details>
            <details className="faq__item"><summary>Do you work with agencies?</summary><p>Yes, as a white-label development partner for agencies that sell the project and need a team to build it. <a href="/pixel-and-code/development-partners/">See how that works</a>.</p></details>
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact section" id="contact">
          <div className="contact__inner">
            <span className="section__label reveal-up"><span className="px"></span> Let&rsquo;s talk</span>
            <h2 className="contact__title">Tell us what you&rsquo;re building.</h2>
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
                  <label htmlFor="lead-project">What are you building, and by when?</label>
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
                <p>Book a free 30-minute scoping call. We map the product with you and send a written scope and fixed quote afterwards.</p>
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
          { href: "/pixel-and-code/#work", label: "Our work" },
          { href: "/pixel-and-code/#process", label: "How we work" },
          { href: "/pixel-and-code/#team", label: "Who we are" },
          { href: "/pixel-and-code/#pricing", label: "Pricing" },
          { href: "/pixel-and-code/#contact", label: "Contact" },
        ]}
      />

      <ChatWidget />
    </>
  );
}
