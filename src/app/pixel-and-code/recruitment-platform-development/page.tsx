import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";
import BodyBg from "../_components/BodyBg";

export const metadata: Metadata = {
  title: "Recruitment Platform Development — Pixel & Code",
  description:
    "A platform built around how your recruiters actually work — candidate portal, employer portal, admin dashboard, automated communication. Built on JCR Pharma's real results.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/recruitment-platform-development/" },
  openGraph: {
    type: "website",
    title: "Recruitment Platform Development — Pixel & Code",
    description: "A recruitment platform built around candidate, employer and admin workflows — cut JCR Pharma's time-to-hire by roughly 50%.",
  },
};

export default function RecruitmentPlatformDevelopmentPage() {
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
          <span className="case-eyebrow reveal-up"><span className="px"></span> For recruitment &amp; staffing businesses</span>
          <h1 className="case-title reveal-up" data-split>A platform built around how your recruiters actually work.</h1>
          <p className="case-summary reveal-up">
            Candidate intake, employer communication, screening, reporting — all the parts of
            recruitment that still run on email and spreadsheets, built into one platform instead.
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
            <span className="section__label reveal-up"><span className="px"></span> Where the process breaks down</span>
            <h2 className="section__title" data-split>Recruiting shouldn&apos;t run on email.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Manual sourcing</span>
              <h3>CVs tracked in inboxes and spreadsheets</h3>
              <p>Every candidate, every application, every update chased down and logged by hand
                 instead of living in one system.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">No self-service</span>
              <h3>Employers wait on you for updates</h3>
              <p>Without a portal, every status check is a phone call or an email — for you and for
                 them.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Slow time-to-hire</span>
              <h3>Coordination eats the timeline</h3>
              <p>The actual matching is quick — it&apos;s the manual back-and-forth between candidate,
                 employer, and your team that stretches a hire from days into weeks.</p>
            </article>
          </div>
        </section>

        {/* SOLUTION / DELIVERABLES */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What we&apos;d build</span>
            <h2 className="section__title" data-split>One platform, every side of the hire.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
            We&apos;ve built exactly this before — a two-sided platform covering candidates, employers, and
            your own team&apos;s admin, deployed to run lean.
          </p>
          <div className="feature-grid">
            <article className="feature-card reveal-up"><h3>Candidate portal</h3><p>Browse and apply for roles directly, without email as the only channel.</p></article>
            <article className="feature-card reveal-up"><h3>Employer &amp; client portal</h3><p>Post roles and track applicants without waiting on a phone call.</p></article>
            <article className="feature-card reveal-up"><h3>Admin dashboard</h3><p>Your team manages listings, candidates and communications in one place.</p></article>
            <article className="feature-card reveal-up"><h3>Automated email</h3><p>Applications, status changes and alerts go out automatically.</p></article>
            <article className="feature-card reveal-up"><h3>Applicant tracking</h3><p>Every candidate&apos;s stage visible at a glance, not buried in a thread.</p></article>
            <article className="feature-card reveal-up"><h3>Secure access control</h3><p>Candidates, employers and admins each see only what&apos;s theirs.</p></article>
          </div>
        </section>

        {/* PROOF */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Proof</span>
            <h2 className="section__title" data-split>JCR Pharma&apos;s platform, built by us.</h2>
          </div>
          <div className="lp-proof">
            <div className="lp-proof__text reveal-up">
              <p>
                JCR Pharma recruits for one of the narrowest, most technical corners of hiring —
                biostatistics, clinical data, bioinformatics — where a precise match matters more than
                volume. We built the full platform running that process on React and Vite, in about
                six weeks.
              </p>
              <p>
                The result: roughly a <strong>50% cut in time-to-hire</strong>, and recruitment
                operations that are dramatically simpler to run day to day.
              </p>
              <a href="/pixel-and-code/jcrpharma-co-uk/" className="btn btn--ghost"><span>Read the JCR Pharma case study ↗</span></a>
            </div>
            <figure className="case-shot reveal-up" style={{ margin: 0 }}>
              <img src="/pixel-and-code/assets/screenshots/jcrpharma/jobs.png" alt="JCR Pharma job search and listings page" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* TIMELINE + INVESTMENT */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="lp-split">
            <div className="reveal-up">
              <h3>Timeline</h3>
              <p>JCR Pharma&apos;s full platform — candidate portal, employer portal, admin dashboard and
                 automated email — took about six weeks from kickoff to live. A platform with a
                 narrower first scope can move faster still.</p>
            </div>
            <div className="reveal-up">
              <h3>Investment</h3>
              <p>Investment scales with scope. JCR Pharma&apos;s build shows what a focused, six-week
                 platform costs to run lean — we&apos;ll give you a precise, fixed-scope number after a
                 short discovery call.</p>
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
              <summary>We already use an ATS or CRM — can you integrate with it?</summary>
              <p>Usually, yes — a custom platform can sit alongside or pull from what you already
                 use rather than forcing a full switch. We&apos;ll confirm feasibility during discovery.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>Can candidates and employers have separate logins?</summary>
              <p>Yes — that&apos;s exactly how JCR Pharma&apos;s platform is built, with each side seeing only
                 what&apos;s relevant to them.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>How fast can this go live?</summary>
              <p>JCR Pharma&apos;s full platform took about six weeks. A narrower first version — just the
                 candidate portal, say — can move faster.</p>
            </details>
            <details className="faq__item reveal-up">
              <summary>How do you handle candidate data and compliance?</summary>
              <p>Access control and careful data handling are built in from the start, and we&apos;ll work
                 through your specific compliance requirements as part of discovery.</p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="contact section" id="contact">
          <div className="contact__inner">
            <span className="section__label reveal-up">Let&apos;s talk</span>
            <h2 className="contact__title" data-split>Ready to build your platform?</h2>
            <p className="contact__sub reveal-up">Chat with our AI to scope your project — it captures the
               details and a human follows up within one business day.</p>
            <form className="contact__ai reveal-up" data-contact-ai>
              <input type="text" data-contact-input placeholder="Describe your project — our AI takes it from here…" autoComplete="off" aria-label="Describe your project" />
              <button type="submit" aria-label="Start the conversation">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
            <div className="contact__prompts reveal-up" data-contact-prompts>
              <button type="button" className="contact__prompt">Recruitment platform</button>
              <button type="button" className="contact__prompt">Candidate portal</button>
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
