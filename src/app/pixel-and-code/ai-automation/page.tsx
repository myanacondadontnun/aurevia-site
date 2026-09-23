import type { Metadata } from "next";
import Chrome from "../_components/Chrome";
import PxcNav from "../_components/PxcNav";
import PxcFooter from "../_components/PxcFooter";
import ChatWidget from "../_components/ChatWidget";
import BodyBg from "../_components/BodyBg";

const CALENDLY = "https://calendly.com/ritwik-mandal-aurevia/30min";

export const metadata: Metadata = {
  title: "AI & Workflow Automation for Businesses — Pixel & Code",
  description:
    "Replace repetitive operational work with practical AI: agents, RAG, integrations and custom tools on the latest Claude models, with a human in the loop. Fixed price, fully handed over.",
  alternates: { canonical: "https://aurevia.io/pixel-and-code/ai-automation/" },
  openGraph: {
    type: "website",
    title: "AI & Workflow Automation — Pixel & Code",
    description: "One workflow automated end to end on Claude, with a human in the loop. Fixed price, fully handed over.",
  },
};

export default function AiAutomationPage() {
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
        ctaHref={CALENDLY}
        ctaLabel="Book a call with Ritwik"
        ctaExternal
      />

      <main id="top">
        {/* HERO */}
        <section className="page-hero section">
          <span className="case-eyebrow reveal-up"><span className="px"></span> AI &amp; workflow automation</span>
          <h1 className="case-title reveal-up">One workflow, automated end to end.</h1>
          <p className="case-summary reveal-up">
            Not a chatbot bolted onto your website. We pick the one process that eats the most
            hours, wire it to your real systems on the latest Claude models, and keep a person in
            the loop where a wrong answer would cost you.
          </p>
          <div className="case-actions reveal-up">
            <a href={CALENDLY} target="_blank" rel="noopener" className="btn btn--primary" data-track="book_call">
              <span>Book a free scoping call</span>
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="/pixel-and-code/#contact" className="btn btn--ghost"><span>Send us your brief</span></a>
          </div>
        </section>

        {/* WHERE IT PAYS OFF */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Where it pays off</span>
            <h2 className="section__title">The work nobody should be doing by hand.</h2>
          </div>
          <div className="feature-grid">
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Inbound</span>
              <h3>Enquiries, quotes and triage</h3>
              <p>Emails, forms and chat that need reading, qualifying and answering. An agent drafts, a person approves, the CRM is updated without anyone retyping.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Documents</span>
              <h3>Extraction and checking</h3>
              <p>Invoices, CVs, contracts, reports. Pull the fields out, check them against your rules, flag the exceptions for a human.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Knowledge</span>
              <h3>Answers from your own material</h3>
              <p>Retrieval over your docs, tickets and product data so staff and customers get grounded answers, with sources, not guesses.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Sales</span>
              <h3>Selling and quoting</h3>
              <p>Conversational agents that recommend, configure and quote inside the tools you already use. We built one for an enterprise CPQ stack and one for Shopify stores.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Operations</span>
              <h3>Glue between systems</h3>
              <p>The spreadsheet someone updates every Monday from three other systems. Replaced by an integration that runs itself and tells you when it can&rsquo;t.</p>
            </article>
            <article className="feature-card reveal-up">
              <span className="feature-card__tag">Not a fit</span>
              <h3>When we say no</h3>
              <p>If the workflow has no clear owner, no data, or the cost of a wrong answer is unbounded, we will tell you on the scoping call rather than build something you can&rsquo;t trust.</p>
            </article>
          </div>
        </section>

        {/* HOW IT RUNS */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> How a project runs</span>
            <h2 className="section__title">Audit first, then build, then hand over.</h2>
          </div>
          <div className="models">
            <div className="model">
              <div><h3>Audit</h3><span className="model__for">First</span></div>
              <div>
                <p>We sit with the people doing the work, map the workflow step by step, and find where the data actually lives.</p>
                <ul>
                  <li>A written map of the process and its exceptions</li>
                  <li>What to automate, what to leave human, and why</li>
                  <li>A fixed quote for the build</li>
                </ul>
              </div>
              <div className="model__terms">Short, paid or free depending on scope<span>Decided on the scoping call</span></div>
            </div>
            <div className="model">
              <div><h3>Build</h3><span className="model__for">Weekly releases</span></div>
              <div>
                <p>Agents, retrieval and integrations built on the latest Claude models, in your accounts, with evaluation sets so you can see accuracy, not just demos.</p>
                <ul>
                  <li>Human approval steps wherever a wrong answer costs money</li>
                  <li>Logging and monitoring from the first release</li>
                  <li>Measured against the hours it removes</li>
                </ul>
              </div>
              <div className="model__terms">Fixed price<span>A working release every week</span></div>
            </div>
            <div className="model">
              <div><h3>Hand over</h3><span className="model__for">Included</span></div>
              <div>
                <p>Everything runs in your cloud under your API keys. You get the code, the prompts, the eval sets, written docs and a recorded walkthrough.</p>
                <ul>
                  <li>No retainer, no lock-in</li>
                  <li>Your team can change prompts and rules without us</li>
                  <li>Further automations as new fixed-price phases</li>
                </ul>
              </div>
              <div className="model__terms">Fully yours<span>Nothing to migrate later</span></div>
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Proof</span>
            <h2 className="section__title">We run this in production ourselves.</h2>
          </div>
          <div className="lp-proof">
            <div className="lp-proof__text reveal-up">
              <p>
                Aurevia is our own AI sales agent for Shopify stores: it reads the catalogue, talks to
                shoppers, recommends products and hands off to a human when it should. It is live on the
                Shopify App Store and has shipped a release every week for over a year.
              </p>
              <p>
                For Expedite Commerce we integrated a conversational quoting agent into a live
                enterprise CPQ stack without breaking what was already there.
              </p>
              <a href="/pixel-and-code/aurevia-io/" className="btn btn--ghost"><span>Read the Aurevia case study ↗</span></a>
            </div>
            <figure className="case-shot reveal-up" style={{ margin: 0 }}>
              <img src="/images/lead-management-dashboard.png" alt="Aurevia dashboard — live conversations with human takeover" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section__head">
            <span className="section__label reveal-up"><span className="px"></span> Questions</span>
            <h2 className="section__title">Before you reach out.</h2>
          </div>
          <div className="faq">
            <details className="faq__item">
              <summary>Which models do you use?</summary>
              <p>The latest Claude models by default, running under your own API keys so usage and cost are yours to see. We will use another model where it is clearly the better tool.</p>
            </details>
            <details className="faq__item">
              <summary>What about our data?</summary>
              <p>Everything runs in your cloud accounts. Nothing is trained on your data, and retrieval indexes live with you. We put this in writing before starting.</p>
            </details>
            <details className="faq__item">
              <summary>How do we know it is accurate?</summary>
              <p>Every build ships with an evaluation set drawn from your real cases, so you see a measured accuracy number before go-live and after every change.</p>
            </details>
            <details className="faq__item">
              <summary>Do you offer retainers or ongoing support?</summary>
              <p>No. Fixed price, fully handed over. When you want the next workflow automated, it is a new fixed-price phase, quoted the same way.</p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="contact section" id="contact">
          <div className="contact__inner">
            <span className="section__label reveal-up"><span className="px"></span> Let&rsquo;s talk</span>
            <h2 className="contact__title">Which workflow eats the most hours?</h2>
            <p className="contact__sub">Tell us in a sentence and we will say on the call whether it is worth automating, and what it would cost.</p>
            <div className="contact__grid">
              <div className="contact__side" style={{ borderLeft: 0, padding: 0 }}>
                <a href={CALENDLY} target="_blank" rel="noopener" className="btn btn--primary" data-track="book_call"><span>Book a free scoping call</span></a>
                <div className="contact__alt">
                  Or <a href="/pixel-and-code/#contact">send a short brief</a> and hear back within one business day.
                </div>
              </div>
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
