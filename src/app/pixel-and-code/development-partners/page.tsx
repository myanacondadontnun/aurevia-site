import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";
import BodyBg from "../_components/BodyBg";

export const metadata: Metadata = {
  title: "Technical Delivery Partner for Agencies — Pixel & Code",
  description:
    "Technical delivery for agencies that need more than a marketing website — SaaS applications, internal platforms, and AI integrations, white-label or disclosed.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/development-partners/" },
  openGraph: {
    type: "website",
    title: "Technical Delivery Partner for Agencies — Pixel & Code",
    description: "Technical delivery for agencies that need more than a marketing website — white-label or disclosed.",
  },
};

export default function DevelopmentPartnersPage() {
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
          <span className="case-eyebrow reveal-up"><span className="px"></span> For agencies</span>
          <h1 className="case-title reveal-up" data-split>Technical delivery for agencies that need more than a marketing website.</h1>
          <p className="case-summary reveal-up">
            Your team is strong on brand, design and acquisition. We handle the projects that sit
            beyond a standard website — SaaS applications, internal platforms, AI integrations and
            complex web apps — either collaboratively or behind the scenes.
          </p>
          <div className="case-actions reveal-up">
            <a href="/pixel-and-code/#contact" className="btn btn--primary">
              <span>Discuss a partnership</span>
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
            <span className="section__label reveal-up"><span className="px"></span> Where agencies hit a wall</span>
            <h2 className="section__title" data-split>Great at brand. Stuck on the build.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Scope creep</span>
              <h3>A client asks for something beyond a website</h3>
              <p>A custom app, a client portal, an AI feature — outside what your team ships day to
                 day, but too good a client relationship to turn away.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Hiring risk</span>
              <h3>You don&apos;t want to hire full-time engineers</h3>
              <p>Technical projects come in unevenly — hard to justify a permanent engineering team
                 for work that isn&apos;t your core offering.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Trust</span>
              <h3>You need a partner you can actually rely on</h3>
              <p>Subcontracting technical work is only worth it if delivery is dependable and your
                 client relationship stays protected either way.</p>
            </article>
          </div>
        </section>

        {/* SOLUTION / DELIVERABLES */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> How we work with agencies</span>
            <h2 className="section__title" data-split>Collaborative, or invisible — your call.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
            We can sit behind your brand as pure technical delivery, or work alongside your team as a
            disclosed partner — whichever your client relationship calls for.
          </p>
          <div className="feature-grid">
            <article className="feature-card reveal-up"><h3>White-label or disclosed delivery</h3><p>You choose how visible we are to your client.</p></article>
            <article className="feature-card reveal-up"><h3>Apps &amp; platform development</h3><p>SaaS products, internal tools, and AI integrations beyond a standard website build.</p></article>
            <article className="feature-card reveal-up"><h3>Technical discovery support</h3><p>Feasibility and scoping help before you commit a client to a build.</p></article>
            <article className="feature-card reveal-up"><h3>Fixed scope, fully handed over</h3><p>One project, one price, and your studio owns everything at the end.</p></article>
            <article className="feature-card reveal-up"><h3>NDA availability</h3><p>Happy to sign one — just ask as part of getting started.</p></article>
            <article className="feature-card reveal-up"><h3>Direct or behind-the-scenes communication</h3><p>We fit into however you run the client relationship.</p></article>
          </div>
        </section>

        {/* PROOF */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Proof</span>
            <h2 className="section__title" data-split>Production work, not a portfolio piece.</h2>
          </div>
          <div className="lp-proof">
            <div className="lp-proof__text reveal-up">
              <p>
                Aurevia is a production Shopify SaaS product we designed and built end to end on
                Django — AI product recommendations, cart recovery, billing, and a live App Store
                listing merchants use today. We&apos;ve also delivered JCR Pharma&apos;s full recruitment
                platform on React and Vite in about six weeks — real range across SaaS and platform
                work, not a single template applied twice.
              </p>
              <a href="/pixel-and-code/aurevia-io/" className="btn btn--ghost"><span>Read the Aurevia case study ↗</span></a>
            </div>
            <figure className="case-shot reveal-up" style={{ margin: 0 }}>
              <img src="/pixel-and-code/assets/screenshots/aurevia/ai_training.png" alt="Aurevia dashboard — AI training and knowledge base" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* TIMELINE + INVESTMENT */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="lp-split">
            <div className="reveal-up">
              <h3>Capacity &amp; timelines</h3>
              <p>Project timelines have ranged from six weeks (JCR Pharma&apos;s full platform) to a
                 year of iterative releases (Aurevia&apos;s SaaS build) — we&apos;ll be upfront about capacity
                 and realistic delivery dates before you commit a client to one.</p>
            </div>
            <div className="reveal-up">
              <h3>Investment</h3>
              <p>Investment scales with scope, and we&apos;re happy to structure it however works for your
                 studio — fixed-scope per project, or a retained arrangement. We&apos;ll walk through
                 options on a call.</p>
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
              <summary>Can we stay the primary point of contact for our client?</summary>
              <p>Yes — white-label delivery means your client only ever hears from you; we work
                 entirely behind the scenes if that&apos;s what the relationship needs.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Do you sign NDAs with our clients?</summary>
              <p>Yes, happy to — just raise it as part of getting started.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Can we start with just a technical feasibility check, not a full build?</summary>
              <p>Yes — a smaller discovery engagement before committing to a full build is a
                 reasonable first step, and often the right one.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Do you offer referral arrangements?</summary>
              <p>Worth discussing directly on a call — depends on the shape of the ongoing
                 relationship.</p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="contact section" id="contact">
          <div className="contact__inner">
            <span className="section__label reveal-up">Let&apos;s talk</span>
            <h2 className="contact__title" data-split>Ready to talk about a partnership?</h2>
            <p className="contact__sub reveal-up">Chat with our AI to scope your project — it captures the
               details and a human follows up within one business day.</p>
            <form className="contact__ai reveal-up" data-contact-ai>
              <input type="text" data-contact-input placeholder="Describe your project — our AI takes it from here…" autoComplete="off" aria-label="Describe your project" />
              <button type="submit" aria-label="Start the conversation">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
            <div className="contact__prompts reveal-up" data-contact-prompts>
              <button type="button" className="contact__prompt">White-label delivery</button>
              <button type="button" className="contact__prompt">A client project</button>
              <button type="button" className="contact__prompt">Retained partnership</button>
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
