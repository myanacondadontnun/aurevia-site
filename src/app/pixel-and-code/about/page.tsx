import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";

export const metadata: Metadata = {
  title: "About — Pixel & Code",
  description:
    "Pixel & Code is a small product studio — the people who scope your project are the same people who design and build it.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/about/" },
  openGraph: {
    type: "website",
    title: "About — Pixel & Code",
    description: "A small studio that designs, builds, and ships every product itself — no handoffs between agencies.",
  },
};

export default function AboutPage() {
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
        ctaHref="https://calendly.com/km-kkishal/30min"
        ctaLabel="Book a call"
        ctaExternal
      />

      <main id="top">
        {/* HERO */}
        <section className="page-hero section">
          <span className="case-eyebrow reveal-up"><span className="px"></span> About Pixel &amp; Code</span>
          <h1 className="case-title reveal-up" data-split>A small studio. A lot of ownership.</h1>
          <p className="case-summary reveal-up">
            Pixel &amp; Code is run by a small team that designs, builds, and ships every product
            itself — no account managers, no handoffs between agencies. The people who scope your
            project are the same people who write the code.
          </p>
          <div className="page-hero__scroll reveal-up">
            <span>Scroll</span>
            <div className="page-hero__scroll-line"><i></i></div>
          </div>
        </section>

        {/* VALUES */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> How we&apos;re different</span>
            <h2 className="section__title" data-split>Small on purpose.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Ownership</span>
              <h3>No handoffs</h3>
              <p>The same people who scope your project design it, build it, and answer your questions after launch.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Momentum</span>
              <h3>Ship weekly</h3>
              <p>You see real, working progress every week — not a single big reveal months into the build.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Craft</span>
              <h3>Built by builders</h3>
              <p>Every stack decision — Django, React, whatever the problem calls for — is made by the person who&apos;ll maintain it.</p>
            </article>
          </div>
        </section>

        {/* TEAM */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> The team</span>
            <h2 className="section__title" data-split>Who you&apos;ll actually talk to.</h2>
          </div>
          <div className="team-grid">
            <article className="team-card reveal-up">
              <div className="team-card__avatar"><img src="/pixel-and-code/assets/headshots/kishal.jpg" alt="Kishal Mandal" loading="lazy" /></div>
              <h3>Kishal Mandal</h3>
              <span className="team-card__role">Co-founder · CTO</span>
              <p>
                Builds production AI systems that actually ship — 5+ years across the full AI and
                full-stack spectrum. Currently architects multi-agent systems and LLM-powered sales
                automation at Expedite Commerce; freelances end-to-end app builds on the side. Kaggle
                Notebooks Master (top 0.1% globally) and a published AI researcher when he&apos;s not shipping code.
              </p>
            </article>
            <article className="team-card reveal-up">
              <div className="team-card__avatar"><img src="/pixel-and-code/assets/headshots/ritwik.jpg" alt="Ritwik Mandal" loading="lazy" /></div>
              <h3>Ritwik Mandal</h3>
              <span className="team-card__role">Co-founder · CEO</span>
              <p>
                Works as a Digital Skills Consultant at Aspire 2Be, helping close the UK&apos;s digital
                skills gap across Data Science, AI, and Cyber Security. Also co-founded an AI sales
                agent for Shopify merchants — the kind of product that sounds simple until you&apos;re
                building it. MSc in Operations, Project &amp; Supply Chain Management, University of
                Manchester, First Class with Distinction.
              </p>
            </article>
          </div>
        </section>

        {/* CTA */}
        <section className="contact section" id="contact">
          <div className="contact__inner">
            <span className="section__label reveal-up">Let&apos;s talk</span>
            <h2 className="contact__title" data-split>Want to work with us directly?</h2>
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
        <a href="/pixel-and-code/how-we-work/">How we work →</a>
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
