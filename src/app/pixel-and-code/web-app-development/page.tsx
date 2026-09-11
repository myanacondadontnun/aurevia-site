import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";
import BodyBg from "../_components/BodyBg";

export const metadata: Metadata = {
  title: "Web Application Development — Pixel & Code",
  description:
    "Dashboards, portals, marketplaces and booking systems — production web applications built around how your business actually runs, not a rebuilt spreadsheet.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/web-app-development/" },
  openGraph: {
    type: "website",
    title: "Web Application Development — Pixel & Code",
    description: "Dashboards, portals, marketplaces and booking systems — production web applications built around your business.",
  },
};

export default function WebAppDevelopmentPage() {
  return (
    <>
      <BodyBg mode="code" />
      <Chrome />

      <PxcNav
        logoHref="/pixel-and-code/"
        links={[
          { href: "/pixel-and-code/#work", label: "Our work" },
          { href: "/pixel-and-code/#process", label: "How we work" },
          { href: "/pixel-and-code/#team", label: "Who we are" },
          { href: "/pixel-and-code/#pricing", label: "Pricing" },
        ]}
        ctaHref="https://calendly.com/km-kkishal/30min"
        ctaLabel="Book a call"
        ctaExternal
      />

      <main id="top">
        {/* HERO */}
        <section className="page-hero section">
          <span className="case-eyebrow reveal-up"><span className="px"></span> For growing businesses</span>
          <h1 className="case-title reveal-up" data-split>Web applications built around how your business actually runs.</h1>
          <p className="case-summary reveal-up">
            Dashboards, portals, marketplaces, booking systems — production software designed for
            your workflow, not a spreadsheet with extra steps.
          </p>
          <div className="case-actions reveal-up">
            <a href="/pixel-and-code/#contact" className="btn btn--primary">
              <span>Discuss your project</span>
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <div className="page-hero__scroll reveal-up">
            <span>Scroll</span>
            <div className="page-hero__scroll-line"><i></i></div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Where off-the-shelf stops working</span>
            <h2 className="section__title" data-split>Your operation outgrew generic tools.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Disconnected tools</span>
              <h3>Every team runs a different system</h3>
              <p>A spreadsheet here, a SaaS subscription there, none of them talking to each other —
                 and someone has to manually bridge the gap every day.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">No self-service</span>
              <h3>Customers or partners wait on your team</h3>
              <p>Without a proper portal, every status update or request becomes an email or a phone
                 call — for them and for you.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Outgrown no-code</span>
              <h3>The quick fix has become the bottleneck</h3>
              <p>Whatever got you running — a form tool, a no-code app, a shared spreadsheet — wasn&apos;t
                 built for the volume or complexity you&apos;re at now.</p>
            </article>
          </div>
        </section>

        {/* SOLUTION / DELIVERABLES */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What we&apos;d build</span>
            <h2 className="section__title" data-split>Software built around your operation.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
            Internal Platforms &amp; Web Apps is one of our three core offers — building the system
            around your business instead of forcing your business into a disconnected tool.
          </p>
          <div className="feature-grid">
            <article className="feature-card reveal-up"><h3>Internal dashboards</h3><p>See and manage what matters without exporting a spreadsheet.</p></article>
            <article className="feature-card reveal-up"><h3>Customer &amp; partner portals</h3><p>Self-service access instead of every update going through email.</p></article>
            <article className="feature-card reveal-up"><h3>Marketplaces &amp; job boards</h3><p>Two-sided platforms with search, matching, and applications built in.</p></article>
            <article className="feature-card reveal-up"><h3>Booking &amp; workflow systems</h3><p>Scheduling and process tools shaped around how your team actually works.</p></article>
            <article className="feature-card reveal-up"><h3>Third-party integrations</h3><p>Connects to the tools you already depend on, rather than replacing them all.</p></article>
            <article className="feature-card reveal-up"><h3>Deployment &amp; handover</h3><p>Live, monitored through launch, then fully handed over with docs and a walkthrough.</p></article>
          </div>
        </section>

        {/* PROOF */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Proof</span>
            <h2 className="section__title" data-split>A real two-sided platform, built in six weeks.</h2>
          </div>
          <div className="lp-proof">
            <div className="lp-proof__text reveal-up">
              <p>
                JCR Pharma ran a specialist recruitment business by hand — job postings, candidate
                intake, screening, employer communication. We built the full platform running that
                process on React and Vite: candidate portal, employer portal, and an internal admin
                dashboard, in about six weeks.
              </p>
              <p>
                The result: roughly a <strong>50% cut in time-to-hire</strong>, and day-to-day
                operations that are dramatically simpler to run.
              </p>
              <a href="/pixel-and-code/jcrpharma-co-uk/" className="btn btn--ghost"><span>Read the JCR Pharma case study ↗</span></a>
            </div>
            <figure className="case-shot reveal-up" style={{ margin: 0 }}>
              <img src="/pixel-and-code/assets/screenshots/jcrpharma/employers.png" alt="JCR Pharma employer hiring page" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* TIMELINE + INVESTMENT */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="lp-split">
            <div className="reveal-up">
              <h3>Timeline</h3>
              <p>JCR Pharma&apos;s full platform — two portals and an admin dashboard — took about six
                 weeks from kickoff to live. A single dashboard or portal, scoped narrower, can move
                 faster still.</p>
            </div>
            <div className="reveal-up">
              <h3>Investment</h3>
              <p>Investment scales with scope, so we don&apos;t quote a number before understanding what
                 you need. What we can promise: a clear, fixed-scope estimate after a short discovery
                 conversation.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Questions</span>
            <h2 className="section__title" data-split>Before you reach out.</h2>
          </div>
          <div className="faq">
            <details className="faq__item reveal-up">
              <summary>We&apos;re not a tech company — is this really for us?</summary>
              <p>Yes. Most of our platform work has been for teams whose core business isn&apos;t
                 software — this is about giving your operation the right tool, not turning you into
                 a tech company.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Can you integrate with the tools we already use?</summary>
              <p>Usually, yes — a custom platform can pull from or sit alongside your existing systems
                 rather than forcing a full switch.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Can different user types (staff, customers, partners) have separate access?</summary>
              <p>Yes — that&apos;s exactly how JCR Pharma&apos;s platform is built, with each side seeing only
                 what&apos;s relevant to them.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>What happens after launch?</summary>
              <p>We deploy, watch the first real users, fix what they find, then hand over: your repos,
                 your cloud, written docs and a recorded walkthrough.</p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="contact section" id="contact">
          <div className="contact__inner">
            <span className="section__label reveal-up">Let&apos;s talk</span>
            <h2 className="contact__title" data-split>Ready to scope your platform?</h2>
            <p className="contact__sub reveal-up">Chat with our AI to scope your project — it captures the
               details and a human follows up within one business day.</p>
            <form className="contact__ai reveal-up" data-contact-ai>
              <input type="text" data-contact-input placeholder="Describe your project — our AI takes it from here…" autoComplete="off" aria-label="Describe your project" />
              <button type="submit" aria-label="Start the conversation">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
            <div className="contact__prompts reveal-up" data-contact-prompts>
              <button type="button" className="contact__prompt">Internal dashboard</button>
              <button type="button" className="contact__prompt">Customer portal</button>
              <button type="button" className="contact__prompt">Get a price estimate</button>
            </div>
          </div>
        </section>
      </main>

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
