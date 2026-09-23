import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";
import BodyBg from "../_components/BodyBg";

export const metadata: Metadata = {
  title: "SaaS Product Development for Founders — Pixel & Code",
  description:
    "Turn a validated idea into a production-ready SaaS product — discovery, UX, development, billing, and launch. Built by the team behind Aurevia.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/saas-development/" },
  openGraph: {
    type: "website",
    title: "SaaS Product Development for Founders — Pixel & Code",
    description: "Turn a validated idea into a production-ready SaaS product. Built by the team behind Aurevia.",
  },
};

export default function SaasDevelopmentPage() {
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
        ctaHref="https://calendly.com/ritwik-mandal-aurevia/30min"
        ctaLabel="Book a call with Ritwik"
        ctaExternal
      />

      <main id="top">
        {/* HERO */}
        <section className="page-hero section">
          <span className="case-eyebrow reveal-up"><span className="px"></span> For SaaS founders</span>
          <h1 className="case-title reveal-up" data-split>Turn your validated idea into a production SaaS product.</h1>
          <p className="case-summary reveal-up">
            You&apos;ve proven the problem is real. Now it needs building properly — authentication,
            billing, admin, integrations — and a team that ships every week, not every quarter.
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
            <span className="section__label reveal-up"><span className="px"></span> Where founders get stuck</span>
            <h2 className="section__title" data-split>Familiar, expensive problems.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Delivery risk</span>
              <h3>A freelancer or agency has gone quiet</h3>
              <p>Missed deadlines, disappearing contractors, or code you don&apos;t fully trust — and the
                 clock is still running on your runway.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Technical debt</span>
              <h3>You&apos;ve outgrown the no-code prototype</h3>
              <p>What got you to your first users won&apos;t hold up under real usage, real auth, or real
                 billing. It needs a proper foundation now, not a rewrite later.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Judgment, not just hands</span>
              <h3>You need senior technical judgment</h3>
              <p>Not another pair of hands typing code — someone who can make the architecture and
                 scope calls, without you giving up equity for a co-founder.</p>
            </article>
          </div>
        </section>

        {/* SOLUTION / DELIVERABLES */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What we&apos;d build</span>
            <h2 className="section__title" data-split>A production SaaS platform, not a demo.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
            SaaS is the deepest end of our web app work — launching or rebuilding a production-ready platform without you assembling an internal product team first.
          </p>
          <div className="feature-grid">
            <article className="feature-card reveal-up"><h3>Product discovery</h3><p>Scope, users, and priorities mapped before a line of code.</p></article>
            <article className="feature-card reveal-up"><h3>UX &amp; interface design</h3><p>Wireframes to polished screens, validated with you first.</p></article>
            <article className="feature-card reveal-up"><h3>Web application development</h3><p>Clean architecture, shipped in weekly working releases.</p></article>
            <article className="feature-card reveal-up"><h3>Authentication &amp; permissions</h3><p>Proper user accounts, roles, and access control from day one.</p></article>
            <article className="feature-card reveal-up"><h3>Subscription billing</h3><p>Plans, upgrades, and payment handling wired in correctly.</p></article>
            <article className="feature-card reveal-up"><h3>Admin dashboards</h3><p>So your team can operate the product without touching code.</p></article>
            <article className="feature-card reveal-up"><h3>Third-party integrations</h3><p>CRM, analytics, or whatever your workflow already depends on.</p></article>
            <article className="feature-card reveal-up"><h3>Deployment &amp; handover</h3><p>Live, monitored through launch, then fully handed over with docs and a walkthrough.</p></article>
          </div>
        </section>

        {/* PROOF */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Proof</span>
            <h2 className="section__title" data-split>We&apos;ve done exactly this.</h2>
          </div>
          <div className="lp-proof">
            <div className="lp-proof__text reveal-up">
              <p>
                Aurevia is a production Shopify SaaS product we designed and built end to end on
                Django — AI product recommendations, cart recovery, subscription billing, merchant
                configuration, analytics, and a live Shopify App Store listing.
              </p>
              <p>
                It&apos;s the clearest evidence of what we can take from first sketch to commercial launch.
              </p>
              <a href="/pixel-and-code/aurevia-io/" className="btn btn--ghost"><span>Read the Aurevia case study ↗</span></a>
            </div>
            <figure className="case-shot reveal-up" style={{ margin: 0 }}>
              <img src="/images/home-dashboard.png" alt="Aurevia dashboard — chat widget branding and tone settings" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* TIMELINE + INVESTMENT */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="lp-split">
            <div className="reveal-up">
              <h3>Timeline</h3>
              <p>Every build runs through the same six stages — Discover, Design, Architect, Build,
                 Launch, Grow — just at different scale. JCR Pharma&apos;s platform took about six weeks;
                 Aurevia&apos;s full SaaS build ran across a year of weekly releases. Your timeline depends
                 on scope, not on guesswork.</p>
            </div>
            <div className="reveal-up">
              <h3>Investment</h3>
              <p>Investment scales with scope, so we don&apos;t quote a number before understanding what
                 you&apos;re building. What we can promise: a clear, fixed-scope estimate after a short
                 discovery conversation — no surprise invoices once the build starts.</p>
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
              <summary>Do you work with pre-seed or early-stage startups?</summary>
              <p>Yes, as long as the idea is validated and there&apos;s a real scope to build against —
                 we&apos;re not the right fit for pure idea-stage exploration with no direction yet.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Do you offer retainers or ongoing support?</summary>
              <p>No. Every project is fixed price and fully handed over at launch. When you want the next
                 thing built, it is a new fixed-price phase, quoted the same way as the first.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>What if our scope changes mid-project?</summary>
              <p>It usually does, a little. Because we ship weekly, changes get discussed and
                 prioritised as you go, rather than saved up for a big renegotiation at the end.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Will we own the code and IP?</summary>
              <p>That&apos;s exactly the kind of detail we lock down in the agreement before starting —
                 happy to talk it through on a call.</p>
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
            <h2 className="contact__title" data-split>Ready to scope your build?</h2>
            <p className="contact__sub reveal-up">Chat with our AI to scope your project — it captures the
               details and a human follows up within one business day.</p>
            <form className="contact__ai reveal-up" data-contact-ai>
              <input type="text" data-contact-input placeholder="Describe your project — our AI takes it from here…" autoComplete="off" aria-label="Describe your project" />
              <button type="submit" aria-label="Start the conversation">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
            <div className="contact__prompts reveal-up" data-contact-prompts>
              <button type="button" className="contact__prompt">Build an MVP</button>
              <button type="button" className="contact__prompt">Rebuild an existing platform</button>
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
