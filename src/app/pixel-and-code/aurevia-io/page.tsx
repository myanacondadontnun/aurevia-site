import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";

export const metadata: Metadata = {
  title: "Aurevia — Shopify AI Sales Agent | Pixel & Code",
  description:
    "How Pixel & Code built Aurevia, a Django-powered AI sales and support agent for Shopify merchants, over a year-long engagement — from cart recovery to 95-language support.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/aurevia-io/" },
  openGraph: {
    type: "article",
    title: "Aurevia — Shopify AI Sales Agent | Pixel & Code",
    description: "A year-long build: the Django-powered AI sales agent helping Shopify merchants convert visitors 24/7.",
    images: ["https://aurevia.io/pixel-and-code/assets/logos/aurevia.png"],
  },
  twitter: { card: "summary" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Aurevia — Shopify AI Sales Agent",
  creator: { "@type": "Organization", name: "Pixel & Code" },
  about: "AI sales and support agent for Shopify merchants",
  url: "https://aurevia.io/pixel-and-code/aurevia-io/",
  image: "https://aurevia.io/pixel-and-code/assets/logos/aurevia.png",
};

export default function AureviaCaseStudyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
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
        {/* CASE STUDY HERO */}
        <section className="case-hero section">
          <a href="/pixel-and-code/#work" className="case-breadcrumb reveal-up">
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to work
          </a>
          <div className="case-hero__inner">
            <span className="case-eyebrow reveal-up"><span className="px"></span> AI SaaS · Shopify App · 2025</span>
            <h1 className="case-title reveal-up">Aurevia</h1>
            <p className="case-summary reveal-up">
              Shopify merchants lose sales every day to abandoned carts, off-brand chatbots, and support
              queues no one has time for. Aurevia is the AI sales &amp; support agent that fixes that —
              a merchant installs it in one click and it starts selling, answering, and recovering revenue
              around the clock. We built the entire product, end to end, on Django.
            </p>
            <div className="case-meta reveal-up">
              <div className="case-meta__item">
                <span className="case-meta__label">Role</span>
                <span className="case-meta__value">Full product build</span>
              </div>
              <div className="case-meta__item">
                <span className="case-meta__label">Stack</span>
                <span className="case-meta__value">Django</span>
              </div>
              <div className="case-meta__item">
                <span className="case-meta__label">Timeline</span>
                <span className="case-meta__value">~12 months</span>
              </div>
              <div className="case-meta__item">
                <span className="case-meta__label">Platform</span>
                <span className="case-meta__value">Shopify App Store</span>
              </div>
            </div>
            <div className="case-actions reveal-up">
              <a className="btn btn--primary" href="https://aurevia.io" target="_blank" rel="noopener">
                <span>Visit Aurevia.io</span>
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a className="btn btn--ghost" href="https://apps.shopify.com/aurevia-io" target="_blank" rel="noopener"><span>Shopify App Store ↗</span></a>
              <a className="btn btn--ghost" href="https://www.linkedin.com/company/aurevia-ai/" target="_blank" rel="noopener"><span>LinkedIn ↗</span></a>
            </div>
          </div>
        </section>

        <div className="case-shot-full">
          <figure className="case-shot reveal-up">
            <img src="/images/home-dashboard.png" alt="Aurevia dashboard — home" loading="eager" />
          </figure>
        </div>

        {/* THE PROBLEM */}
        <section className="section">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> The problem</span>
            <h2 className="section__title" data-split>Great traffic. Leaky funnel.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, fontSize: "1.1rem" }}>
            Shopify stores were doing the hard part — getting people to the site — and losing them at the
            easiest part: the conversation. Shoppers left carts at checkout over last-minute questions.
            Support teams answered the same &quot;where&apos;s my order?&quot; dozens of times a day. Off-the-shelf
            chatbots sounded nothing like the brand they represented. And merchants had no visibility into
            where, in that whole journey, customers actually dropped off.
          </p>
        </section>

        {/* WHAT WE BUILT */}
        <section className="section">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> What we built</span>
            <h2 className="section__title" data-split>A sales rep that never clocks out.</h2>
          </div>
          <p className="case-summary reveal-up" style={{ maxWidth: 760, marginBottom: "2.5rem" }}>
            We built Aurevia as a native Shopify App on Django — install is one click, and the app
            auto-syncs the store&apos;s products, discounts, and branding immediately. From there, merchants
            set the agent&apos;s tone of voice, colours and business rules, and feed it FAQs and product docs
            so its answers stay on-brand. Every capability below shipped because a merchant asked for it.
          </p>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Pre-sale</span>
              <h3>AI Product Recommendations</h3>
              <p>Natural, personalised conversations that recommend the right product and lift average order value.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Pre &amp; post-sale</span>
              <h3>Automated Support</h3>
              <p>Instant, context-aware answers 24/7 — no more waiting on support hours for a simple question.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Pre-sale</span>
              <h3>Cart Recovery</h3>
              <p>Detects exit intent, answers last-minute objections, and drops a one-click checkout link.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Analytics</span>
              <h3>Conversation Analytics</h3>
              <p>A dashboard showing what customers ask, where they drop off, and what to fix next.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Global</span>
              <h3>Multilingual Support</h3>
              <p>Real-time translation across 95+ languages, so the agent is never off the clock or off-language.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Sales ops</span>
              <h3>Lead Qualification &amp; Handoff</h3>
              <p>Surfaces high-intent shoppers in real time, and hands off to a human agent with full context when needed.</p>
            </article>
          </div>

          <div className="case-shot-grid">
            <figure className="case-shot reveal-up"><img src="/images/product-management-dashboard.png" alt="Aurevia dashboard — product catalog and AI readiness" loading="lazy" /></figure>
            <figure className="case-shot reveal-up"><img src="/images/ai-training-dashboard.png" alt="Aurevia dashboard — AI training and knowledge base" loading="lazy" /></figure>
          </div>
        </section>

        <div className="case-shot-full">
          <figure className="case-shot reveal-up">
            <img src="/images/lead-management-dashboard.png" alt="Aurevia dashboard — leads and live conversations" loading="lazy" />
          </figure>
        </div>

        {/* IMPACT */}
        <section className="section">
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Impact</span>
            <h2 className="section__title" data-split>What merchants are seeing.</h2>
          </div>
          <div className="stats__grid" style={{ marginBottom: "2rem" }}>
            <div className="stat" data-stat>
              <div className="stat__num"><span data-num="67">0</span>%</div>
              <div className="stat__label">AI-driven sales lift</div>
            </div>
            <div className="stat" data-stat>
              <div className="stat__num"><span data-num="35">0</span>%</div>
              <div className="stat__label">Purchases made via AI chat</div>
            </div>
            <div className="stat" data-stat>
              <div className="stat__num"><span data-num="8">0</span>×</div>
              <div className="stat__label">Return on AI investment</div>
            </div>
            <div className="stat" data-stat>
              <div className="stat__num"><span data-num="80">0</span>%</div>
              <div className="stat__label">Questions resolved by AI</div>
            </div>
          </div>
          <p className="case-note reveal-up">
            Figures reported by Aurevia across its merchant base — including a 28% conversion lift for
            apparel stores, 31% more repeat-order revenue in beauty, 23% fewer returns in fitness &amp;
            fashion, and an 18% AOV boost for supplement brands. Source:
            {" "}<a href="https://aurevia.io" target="_blank" rel="noopener">aurevia.io</a>.
          </p>

          <div className="case-pullquote reveal-up">
            <span className="case-pullquote__mark" aria-hidden="true">&ldquo;</span>
            <p>During last year&apos;s BFCM, a technical hiccup left one merchant with a 600-question support
               backlog — Aurevia&apos;s agent cleared the entire queue in minutes, without adding headcount.</p>
            <cite>Reported by <b>Cabau Lifestyle</b>, an Aurevia merchant</cite>
          </div>
        </section>

        {/* CTA */}
        <section className="contact section" id="contact">
          <div className="contact__inner case-cta">
            <span className="section__label reveal-up"><span className="px"></span> Let&apos;s talk</span>
            <h2 className="contact__title" data-split>Building something like this?</h2>
            <p className="contact__sub reveal-up">
              We take AI products from first sketch to a live App Store listing. Tell us what you&apos;re building.
            </p>
            <div className="hero__actions reveal-up" style={{ justifyContent: "center" }}>
              <a href="/pixel-and-code/#contact" className="btn btn--primary">
                <span>Start a project</span>
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/pixel-and-code/#work" className="btn btn--ghost"><span>See more work</span></a>
            </div>
          </div>
        </section>
      </main>

      <div className="case-crosslink">
        <a href="/pixel-and-code/#work">↑ All work</a>
        <a href="/pixel-and-code/jcrpharma-co-uk/">Next case study: JCR Pharma →</a>
      </div>

      <PxcFooter
        links={[
          { href: "/pixel-and-code/#services", label: "Services" },
          { href: "/pixel-and-code/#work", label: "Our work" },
          { href: "/pixel-and-code/about/", label: "Who we are" },
          { href: "/pixel-and-code/#contact", label: "Contact" },
        ]}
      />

      <ChatWidget />
    </>
  );
}
