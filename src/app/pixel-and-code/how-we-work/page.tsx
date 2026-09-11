import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";
import BodyBg from "../_components/BodyBg";

export const metadata: Metadata = {
  title: "How We Work — Pixel & Code",
  description:
    "From discovery to launch and beyond — the six-stage process Pixel & Code uses to ship AI apps, job boards, and custom software.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/how-we-work/" },
  openGraph: {
    type: "website",
    title: "How We Work — Pixel & Code",
    description: "The six-stage process behind every Pixel & Code build — discovery, design, architecture, weekly builds, launch, and growth.",
  },
};

export default function HowWeWorkPage() {
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
          <span className="case-eyebrow reveal-up"><span className="px"></span> How we work</span>
          <h1 className="case-title reveal-up">Six stages. No surprises.</h1>
          <p className="case-summary reveal-up">
            Every Pixel &amp; Code build — from a year-long AI platform to a six-week job board —
            runs through the same process. It&apos;s not slower for small projects or thinner for big ones;
            it&apos;s just how much of it you feel.
          </p>
          <div className="case-actions reveal-up">
            <a href="/pixel-and-code/#contact" className="btn btn--primary">
              <span>Start a project</span>
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="/pixel-and-code/#work" className="btn btn--ghost"><span>See our work</span></a>
          </div>
          <div className="page-hero__scroll reveal-up">
            <span>Scroll</span>
            <div className="page-hero__scroll-line"><i></i></div>
          </div>
        </section>

        {/* ROADMAP */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="roadmap" data-roadmap>
            <div className="roadmap__line">
              <div className="roadmap__line-fill" data-roadmap-line></div>
            </div>

            <div className="roadmap__stage" data-roadmap-stage>
              <div className="roadmap__node" data-roadmap-node></div>
              <div className="roadmap__card">
                <span className="roadmap__index">01</span>
                <h3>Discover</h3>
                <p>We dig into goals, users, and constraints on a discovery call, then map the product
                   and scope into a fixed, written proposal — so budget and timeline are agreed before
                   anyone writes a line of code.</p>
                <div className="roadmap__tags">
                  <span className="roadmap__tag">Discovery call</span>
                  <span className="roadmap__tag">Scope doc</span>
                  <span className="roadmap__tag">Fixed quote</span>
                </div>
              </div>
            </div>

            <div className="roadmap__stage" data-roadmap-stage>
              <div className="roadmap__node" data-roadmap-node></div>
              <div className="roadmap__card">
                <span className="roadmap__index">02</span>
                <h3>Design</h3>
                <p>Wireframes first, then polished, motion-rich interfaces in Figma — validated with you
                   before a single production component gets built, so revisions happen on paper, not
                   in code.</p>
                <div className="roadmap__tags">
                  <span className="roadmap__tag">Wireframes</span>
                  <span className="roadmap__tag">Figma</span>
                  <span className="roadmap__tag">Prototype review</span>
                </div>
              </div>
            </div>

            <div className="roadmap__stage" data-roadmap-stage>
              <div className="roadmap__node" data-roadmap-node></div>
              <div className="roadmap__card">
                <span className="roadmap__index">03</span>
                <h3>Architect</h3>
                <p>We pick the stack to fit the problem, not the other way round — Django for Aurevia&apos;s
                   AI backend, React and Vite for JCR Pharma&apos;s fast two-sided job platform. Data model
                   and integrations get mapped before the build sprint starts.</p>
                <div className="roadmap__tags">
                  <span className="roadmap__tag">Stack selection</span>
                  <span className="roadmap__tag">Data model</span>
                  <span className="roadmap__tag">Integrations</span>
                </div>
              </div>
            </div>

            <div className="roadmap__stage" data-roadmap-stage>
              <div className="roadmap__node" data-roadmap-node></div>
              <div className="roadmap__card">
                <span className="roadmap__index">04</span>
                <h3>Build</h3>
                <p>Clean, tested code shipped in weekly increments, with a live staging link every
                   Friday. You watch the product take shape in real time instead of waiting for a
                   single big reveal.</p>
                <div className="roadmap__tags">
                  <span className="roadmap__tag">Weekly demos</span>
                  <span className="roadmap__tag">Staging links</span>
                  <span className="roadmap__tag">Code review</span>
                </div>
              </div>
            </div>

            <div className="roadmap__stage" data-roadmap-stage>
              <div className="roadmap__node" data-roadmap-node></div>
              <div className="roadmap__card">
                <span className="roadmap__index">05</span>
                <h3>Launch</h3>
                <p>A full QA pass, then deploy — with monitoring switched on from day one and clear
                   handoff docs, so launch day is uneventful, which is exactly the goal.</p>
                <div className="roadmap__tags">
                  <span className="roadmap__tag">QA pass</span>
                  <span className="roadmap__tag">Deploy</span>
                  <span className="roadmap__tag">Handoff docs</span>
                </div>
              </div>
            </div>

            <div className="roadmap__stage" data-roadmap-stage>
              <div className="roadmap__node" data-roadmap-node></div>
              <div className="roadmap__card">
                <span className="roadmap__index">06</span>
                <h3>Grow</h3>
                <p>Real usage surfaces real requests. We watch what users actually do, then turn the
                   feedback into the next sprint — the same way every feature in Aurevia shipped
                   because a merchant asked for it.</p>
                <div className="roadmap__tags">
                  <span className="roadmap__tag">Analytics</span>
                  <span className="roadmap__tag">Roadmap</span>
                  <span className="roadmap__tag">Full handover</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE SAME PROCESS, TWO DIFFERENT SCALES */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up">Same process, different scale</span>
            <h2 className="section__title" data-split>What this looks like in practice.</h2>
          </div>
          <div className="feature-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <a href="/pixel-and-code/aurevia-io/" className="feature-card reveal-up">
              <span className="feature-card__tag">AI SaaS · ~12 months</span>
              <h3>Aurevia</h3>
              <p>All six stages, stretched over a year of iterative builds on Django — new agent
                 capabilities shipping as merchants asked for them.</p>
            </a>
            <a href="/pixel-and-code/jcrpharma-co-uk/" className="feature-card reveal-up">
              <span className="feature-card__tag">Job platform · ~6 weeks</span>
              <h3>JCR Pharma</h3>
              <p>The same six stages, compressed into a focused six-week sprint on React and Vite to get
                 a full two-sided platform live fast.</p>
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="contact section" id="contact">
          <div className="contact__inner">
            <span className="section__label reveal-up">Let&apos;s talk</span>
            <h2 className="contact__title" data-split>Ready to start stage one?</h2>
            <p className="contact__sub reveal-up">
              Chat with our AI to scope your project — it captures the details and a human follows up
              within one business day.
            </p>
            <form className="contact__ai reveal-up" data-contact-ai>
              <input type="text" data-contact-input placeholder="Describe your project — our AI takes it from here…" autoComplete="off" aria-label="Describe your project" />
              <button type="submit" aria-label="Start the conversation">
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
            <div className="contact__prompts reveal-up" data-contact-prompts>
              <button type="button" className="contact__prompt">Build an MVP</button>
              <button type="button" className="contact__prompt">AI automation</button>
              <button type="button" className="contact__prompt">Get a price estimate</button>
            </div>
          </div>
        </section>
      </main>

      <div className="case-crosslink">
        <a href="/pixel-and-code/about/">About Pixel &amp; Code →</a>
        <a href="/pixel-and-code/#work">See our work →</a>
      </div>

      <PxcFooter
        links={[
          { href: "/pixel-and-code/about/", label: "About" },
          { href: "/pixel-and-code/how-we-work/", label: "Process" },
          { href: "/pixel-and-code/#work", label: "Work" },
          { href: "/pixel-and-code/#contact", label: "Contact" },
        ]}
      />

      <ChatWidget />
    </>
  );
}
