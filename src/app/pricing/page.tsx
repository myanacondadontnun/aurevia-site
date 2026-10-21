"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Minus, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/schema";
import { reviews, SHOPIFY_LISTING_URL, SHOPIFY_RATING, SHOPIFY_REVIEW_COUNT } from "@/lib/reviews";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import CustomerLogos from "@/components/CustomerLogos";
import HeroWatermark from "@/components/home/HeroWatermark";
import h from "@/components/home/hero.module.css";
import p from "./pricing.module.css";

/**
 * Pricing, matching the public plans on the Shopify App Store listing (Partner dashboard, October 2026):
 * Free, Starter, Pro and Scale, billed through Shopify in US dollars, with a 14-day free trial on the paid plans.
 * Prices, message allowances and plan features below are the listing's own; keep them in step with it.
 */

type Cycle = "monthly" | "yearly";

type Plan = {
  id: string;
  name: string;
  /** Price per month on monthly billing, and the yearly price, in USD. Null on the free plan. */
  monthly: number | null;
  yearly: number | null;
  messages: string;
  /** Monthly AI messages, for the allowance meter. */
  allowance: number;
  /** The plan the board points people to: the first with the full app. */
  pick?: boolean;
  /** "Everything in X, plus" line, when the plan builds on another. */
  lead?: string;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthly: null,
    yearly: null,
    messages: "100 AI messages a month",
    allowance: 100,
    features: [
      "1 seat",
      "AI product recommendations",
      "Add to cart and checkout links",
      "Unlimited AI training",
      "Chatbot customisation",
      "Email, Instagram and WhatsApp",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    monthly: 19,
    yearly: 180,
    messages: "500 AI messages a month",
    allowance: 500,
    lead: "Everything in Free, plus",
    features: ["Unlimited seats", "Conversation history beyond 90 days", "API access and custom integrations"],
  },
  {
    id: "pro",
    pick: true,
    name: "Pro",
    monthly: 89,
    yearly: 852,
    messages: "3,000 AI messages a month",
    allowance: 3000,
    lead: "Full app access, plus",
    features: ["AI storefront SEO", "Product page optimisation", "AI image generation", "Priority email and call support"],
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 149,
    yearly: 1428,
    messages: "6,000 AI messages a month",
    allowance: 6000,
    lead: "Full app access, plus",
    features: [
      "Dedicated account manager",
      "White-label options",
      "Enterprise security and compliance",
      "SLA and priority support",
    ],
  },
];

// Column order follows PLANS: Free · Starter · Pro · Scale. true = included, false = not included.
const COMPARE: { group: string; rows: { label: string; values: (boolean | string)[] }[] }[] = [
  {
    group: "Usage",
    rows: [
      { label: "AI messages a month", values: ["100", "500", "3,000", "6,000"] },
      { label: "Extra messages", values: ["$10 per 250", "$10 per 250", "$10 per 250", "$10 per 250"] },
      { label: "Seats", values: ["1", "Unlimited", "Unlimited", "Unlimited"] },
      { label: "14-day free trial", values: [false, true, true, true] },
    ],
  },
  {
    group: "Selling",
    rows: [
      { label: "AI product recommendations", values: [true, true, true, true] },
      { label: "Add to cart and checkout links", values: [true, true, true, true] },
      { label: "Unlimited AI training", values: [true, true, true, true] },
      { label: "Chatbot customisation", values: [true, true, true, true] },
      { label: "Email, Instagram and WhatsApp", values: [true, true, true, true] },
    ],
  },
  {
    group: "Store and data",
    rows: [
      { label: "Conversation history beyond 90 days", values: [false, true, true, true] },
      { label: "API access and custom integrations", values: [false, true, true, true] },
      { label: "AI storefront SEO", values: [false, false, true, true] },
      { label: "Product page optimisation", values: [false, false, true, true] },
      { label: "AI image generation", values: [false, false, true, true] },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Priority email and call support", values: [false, false, true, true] },
      { label: "Dedicated account manager", values: [false, false, false, true] },
      { label: "White-label options", values: [false, false, false, true] },
      { label: "Enterprise security and compliance", values: [false, false, false, true] },
      { label: "SLA", values: [false, false, false, true] },
    ],
  },
];

const FAQS = [
  {
    q: "Is there a free trial?",
    a: "Yes. Starter, Pro and Scale each start with a 14-day free trial, and you aren't charged until it ends. The Free plan is free for as long as you use it, with 100 AI messages a month.",
  },
  {
    q: "What happens if I use up my messages?",
    a: "Add more on any plan: 250 extra AI messages cost $10. Or move up a plan for a bigger monthly allowance.",
  },
  {
    q: "What counts as an AI message?",
    a: "A message is a single reply the AI sends to a shopper. Menu clicks, quick replies and product cards don't count against your allowance.",
  },
  {
    q: "Can I change or cancel my plan any time?",
    a: "Yes, from Settings, then Subscription. Upgrades apply straight away and are prorated. Downgrades take effect at your next billing date. If you cancel, you keep access until the end of the paid period. There's no contract.",
  },
  {
    q: "How am I billed?",
    a: "Through Shopify, in US dollars. Charges appear on your regular Shopify invoice, so there's no separate card or account.",
  },
  {
    q: "How much does yearly billing save?",
    a: "Paying yearly saves about 20%: $48 a year on Starter, $216 on Pro and $360 on Scale.",
  },
];

const MAX_ALLOWANCE = Math.max(...PLANS.map((plan) => plan.allowance));

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function PriceBlock({ plan, cycle }: { plan: Plan; cycle: Cycle }) {
  if (plan.monthly === null || plan.yearly === null) {
    return (
      <div className={p.price}>
        <span className={p.amount}>$0</span>
        <span className={p.cadence}>Free for as long as you use it</span>
      </div>
    );
  }
  const perMonth = cycle === "yearly" ? Math.round(plan.yearly / 12) : plan.monthly;
  return (
    <div className={p.price}>
      <span className={p.amount}>
        {money(perMonth)}
        <span className={p.per}>/month</span>
      </span>
      <span className={p.cadence}>
        {cycle === "yearly" ? `Billed ${money(plan.yearly)} a year` : "Billed monthly"} · 14-day free trial
      </span>
    </div>
  );
}

export default function PricingPage() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const review = reviews.find((r) => r.id === "purebronze");

  return (
    <div className={p.page}>
      <Navbar />
      <main id="main-content">
        {/* Head and plans share the home hero's canvas: blooms, grain and the turning ring. */}
        <section className={`${h.hero} ${p.top}`}>
          <div className={h.grain} aria-hidden="true" />
          <HeroWatermark />
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${p.head}`}>
            <h1 className={p.title}>Plans and pricing</h1>
            <p className={p.lede}>Start on the free plan, or try a paid plan free for 14 days.</p>
            <ul className={p.facts}>
              {["Billed through Shopify", "In US dollars", "Cancel any time"].map((fact) => (
                <li key={fact}>
                  <Check aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
            <div className={p.headRow}>
              <div className={p.switch} role="radiogroup" aria-label="Billing period">
                {(["monthly", "yearly"] as Cycle[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={cycle === c}
                    onClick={() => setCycle(c)}
                    className={`${p.switchOption} ${cycle === c ? p.switchOn : ""}`}
                  >
                    {c === "monthly" ? "Monthly" : "Yearly"}
                    {c === "yearly" && <span className={p.save}>Save about 20%</span>}
                  </button>
                ))}
              </div>
              <a
                href={SHOPIFY_LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={p.rating}
                aria-label={`Rated ${SHOPIFY_RATING.toFixed(1)} out of 5 on the Shopify App Store from ${SHOPIFY_REVIEW_COUNT} reviews`}
              >
                <span className={p.stars} aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
                </span>
                {SHOPIFY_RATING.toFixed(1)} from {SHOPIFY_REVIEW_COUNT} reviews on Shopify
              </a>
            </div>
          </div>

          {/* Plans: one board, four columns split by hairlines; Pro, the first plan with the full app, sits on night. */}
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${p.plansSection}`}>
            <ol className={p.board}>
              {PLANS.map((plan) => (
                <li key={plan.id} className={`${p.plan} ${plan.pick ? p.planPick : ""}`}>
                  <div className={p.planHead}>
                    <h2 className={p.planName}>{plan.name}</h2>
                    {plan.pick && <span className={p.pickTag}>Recommended</span>}
                  </div>
                  <PriceBlock plan={plan} cycle={cycle} />
                  <div className={p.allowance}>
                    <p className={p.messages}>{plan.messages}</p>
                    <span className={p.meter} aria-hidden="true">
                      <span style={{ width: `${Math.max(2, (plan.allowance / MAX_ALLOWANCE) * 100)}%` }} />
                    </span>
                  </div>
                  <a
                    href={SHOPIFY_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={plan.monthly === null ? p.secondary : p.primary}
                  >
                    {plan.monthly === null ? "Install free" : "Start free trial"}
                    {plan.monthly !== null && <ArrowRight aria-hidden="true" />}
                  </a>
                  {plan.lead && <p className={p.lead}>{plan.lead}</p>}
                  <ul className={p.features}>
                    {plan.features.map((f) => (
                      <li key={f}>
                        <Check aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <div className={p.notes}>
              <p>Need more messages? Add 250 for $10 on any plan.</p>
              <Link href="/contact/" className={p.link}>
                High volume? Talk to us <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <CustomerLogos />

        {/* Every feature, plan by plan. */}
        <section className={p.compareSection}>
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className={p.h2}>Compare plans</h2>
            <div className={p.tableWrap}>
              <table className={p.table}>
                <thead>
                  <tr>
                    <th scope="col"><span className="sr-only">Feature</span></th>
                    {PLANS.map((plan) => (
                      <th key={plan.id} scope="col">{plan.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((section) => (
                    <Fragment key={section.group}>
                      <tr className={p.groupRow}>
                        <th colSpan={5} scope="colgroup">{section.group}</th>
                      </tr>
                      {section.rows.map((row) => (
                        <tr key={row.label}>
                          <th scope="row">{row.label}</th>
                          {row.values.map((v, i) => (
                            <td key={i}>
                              {v === true ? (
                                <Check className={p.yes} aria-label="Included" />
                              ) : v === false ? (
                                <Minus className={p.no} aria-label="Not included" />
                              ) : (
                                v
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* One real review, quoted verbatim from the Shopify App Store listing. */}
        {review && (
          <section className={p.reviewSection}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <figure className={p.review}>
                <blockquote className={p.quote}>&ldquo;{review.quote}&rdquo;</blockquote>
                <figcaption className={p.by}>
                  <span className={p.byLogo} aria-hidden="true" />
                  <span>
                    <span className={p.byStore}>{review.store}</span>
                    <span className={p.byWhere}>{review.country} · Shopify App Store review</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        <section className={p.faqSection}>
          <JsonLd data={faqJsonLd(FAQS.map((f) => ({ question: f.q, answer: f.a })))} />
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${p.faqGrid}`}>
            <div>
              <h2 className={p.h2}>Pricing questions</h2>
              <p className={p.faqAside}>
                Something else? <Link href="/contact/" className={p.inlineLink}>Talk to us</Link>
              </p>
            </div>
            <div className={p.faqList}>
              {FAQS.map((f, i) => (
                <div key={f.q} className={p.faqItem}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className={p.faqQ}
                  >
                    {f.q}
                    <span className={`${p.faqIcon} ${openFaq === i ? p.faqIconOpen : ""}`} aria-hidden="true" />
                  </button>
                  {openFaq === i && <p className={p.faqA}>{f.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={p.ctaSection}>
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className={p.cta}>
              <span className={p.ctaMark} aria-hidden="true" />
              <h2 className={p.ctaTitle}>Try it on your store, free for 14 days</h2>
              <p className={p.ctaLede}>No card needed, and you can cancel from Shopify any time.</p>
              <div className={p.ctaButtons}>
                <a href={SHOPIFY_APP_URL} target="_blank" rel="noopener noreferrer" className={p.primary}>
                  Start free trial <ArrowRight aria-hidden="true" />
                </a>
                <Link href="/book-demo/" className={p.ctaSecondary}>
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
