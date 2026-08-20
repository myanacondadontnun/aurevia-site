"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import { Check, Minus, ChevronDown, ShieldCheck, Sparkles, Star } from "lucide-react";

type Currency = "USD" | "GBP";
type BillingCycle = "monthly" | "annual";

const GBP_RATE = 0.79;
const currencySymbols: Record<Currency, string> = { USD: "$", GBP: "£" };

interface Plan {
  id: string;
  name: string;
  monthly: number;
  tagline: string;
  overage: string;
  cta: string;
  highlight?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 19,
    tagline: "For new stores getting started with AI selling.",
    overage: "+ $10 per 250 messages",
    cta: "Start free trial",
    features: [
      "500 AI messages / month",
      "1 seat included",
      "AI product recommendations",
      "Automated responses & Q&A",
      "AI training + chatbot customisation",
      "Analytics + conversation history",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthly: 49,
    tagline: "For growing stores turning traffic into paying customers.",
    overage: "+ $10 per 250 messages",
    cta: "Start free trial",
    highlight: true,
    features: [
      "Everything in Starter, plus:",
      "1,500 AI messages / month",
      "Cart recovery automation",
      "Multi-language support",
      "Custom AI selling rules",
      "Advanced analytics dashboard",
      "Priority email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 89,
    tagline: "For high-traffic stores at full selling power.",
    overage: "+ $10 per 250 messages",
    cta: "Start free trial",
    features: [
      "Everything in Growth, plus:",
      "3,000 AI messages / month",
      "ROI & revenue attribution",
      "API access & custom integrations",
      "Custom AI training tools",
      "Team seats & collaboration",
      "Priority live chat support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 149,
    tagline: "For established brands scaling AI across the store.",
    overage: "+ $10 per 250 messages",
    cta: "Start free trial",
    features: [
      "Everything in Pro, plus:",
      "6,000 AI messages / month",
      "Dedicated account manager",
      "Custom AI model training",
      "White-label options",
      "Enterprise security & compliance",
      "SLA & priority support",
    ],
  },
];

// Feature comparison matrix. "true" = check, "false" = dash, string = value.
// Column order: Starter · Growth · Pro · Scale
const comparison: { group: string; rows: { label: string; values: (boolean | string)[] }[] }[] = [
  {
    group: "Usage",
    rows: [
      { label: "AI messages / month", values: ["500", "1,500", "3,000", "6,000"] },
      { label: "Message overage", values: ["$10 / 250", "$10 / 250", "$10 / 250", "$10 / 250"] },
      { label: "Seats", values: ["1", "3", "Multiple", "Unlimited"] },
      { label: "Products & services", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
    ],
  },
  {
    group: "AI capabilities",
    rows: [
      { label: "AI product recommendations", values: [true, true, true, true] },
      { label: "Automated responses & Q&A", values: [true, true, true, true] },
      { label: "Cart recovery automation", values: [false, true, true, true] },
      { label: "Multilingual support", values: [false, true, true, true] },
      { label: "Custom AI selling rules", values: [false, true, true, true] },
      { label: "Custom AI training tools", values: [false, false, true, true] },
    ],
  },
  {
    group: "Insights & platform",
    rows: [
      { label: "Analytics dashboard", values: ["Basic", "Advanced", "Advanced", "Custom"] },
      { label: "ROI & revenue attribution", values: [false, true, true, true] },
      { label: "API access & integrations", values: [false, false, true, true] },
      { label: "Team collaboration", values: [false, false, true, true] },
      { label: "SLA & enterprise security", values: [false, false, false, true] },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Support", values: ["In-app", "Priority email", "Priority chat", "Dedicated manager"] },
    ],
  },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes. Every plan starts with a 14-day free trial and you won't be charged until it ends—so you can see the AI selling before you pay a cent.",
  },
  {
    q: "How does message-based pricing work?",
    a: "Each plan includes a set number of AI messages per month. If you go over, it's +$10 per additional 250 messages. Messages roughly track to about half your monthly visitors, so you only pay as you grow.",
  },
  {
    q: "What counts as an AI message?",
    a: "A message is a single reply the AI sends to a shopper. Menu clicks, quick replies, and product cards don't count against your allowance.",
  },
  {
    q: "Can I change or cancel my plan anytime?",
    a: "Absolutely. Upgrade, downgrade, or cancel from your dashboard at any time. Changes take effect on your next billing cycle and there are no lock-in contracts.",
  },
  {
    q: "How am I billed?",
    a: "All charges are handled securely through the Shopify App Store and appear on your regular Shopify invoice—no separate card or account required.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes. Switch to annual billing to save 20% versus paying monthly.",
  },
];

function convert(usd: number, currency: Currency): number {
  return currency === "GBP" ? Math.round(usd * GBP_RATE) : usd;
}

function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function PricingPage() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sym = currencySymbols[currency];

  function priceDisplay(plan: Plan) {
    const monthly = convert(plan.monthly, currency);
    if (billing === "annual") {
      const perMo = Math.round(monthly * 0.8);
      const yearly = perMo * 12;
      return { big: `${sym}${formatNumber(yearly)}`, sub: "/year", note: `${sym}${formatNumber(perMo)}/mo · save 20%` };
    }
    return { big: `${sym}${formatNumber(monthly)}`, sub: "/month", note: null as string | null };
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-24 sm:pt-32 pb-16">
        {/* Hero */}
        <section className="px-4 sm:px-6 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00CC99]/25 bg-[#00CC99]/10 px-3 py-1 text-xs font-medium text-[#00795c] mb-5">
            <Sparkles className="h-3.5 w-3.5" /> Simple, usage-based pricing
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-fraunces font-normal text-foreground leading-[1.1] mb-4">
            Pricing that grows{" "}
            <span className="green-highlight">with your store</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Pick a plan that matches your traffic. Start with a 14-day free trial—you&apos;re
            only charged once you&apos;re selling more.
          </p>

          {/* Toggles */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex rounded-full border border-border bg-card p-1">
              {(["monthly", "annual"] as BillingCycle[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setBilling(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    billing === c ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c === "monthly" ? "Monthly" : "Annual"}
                  {c === "annual" && <span className="ml-1 text-[11px] opacity-80">−20%</span>}
                </button>
              ))}
            </div>
            <div className="inline-flex rounded-full border border-border bg-card p-1">
              {(["USD", "GBP"] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-all ${
                    currency === cur ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {currencySymbols[cur]} {cur}
                </button>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-[#00CC99]" /> 14-day free trial</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#00CC99]" /> Billed via Shopify</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 text-[#00CC99]" /> Official Shopify Partner</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-[#00CC99]" /> Cancel anytime</span>
          </div>
        </section>

        {/* Plan cards */}
        <section className="px-4 sm:px-6 mt-12 sm:mt-14 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {plans.map((plan) => {
              const price = priceDisplay(plan);
              return (
                <div
                  key={plan.id}
                  className={`relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 ${
                    plan.highlight
                      ? "border-2 border-[#00CC99] bg-card shadow-[0_18px_50px_-16px_rgba(0,153,115,0.35)]"
                      : "border border-border bg-card hover:border-[#00CC99]/40 hover:shadow-lg"
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-[#00CC99] to-[#009973] px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground min-h-[40px]">{plan.tagline}</p>

                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="text-4xl font-fraunces font-normal text-foreground">{price.big}</span>
                    <span className="mb-1 text-sm text-muted-foreground">{price.sub}</span>
                  </div>
                  <div className="min-h-[38px] mt-1">
                    {price.note && <p className="text-xs text-[#00795c] font-medium">{price.note}</p>}
                    <p className="text-xs text-muted-foreground">{plan.overage}</p>
                  </div>

                  <a
                    href={SHOPIFY_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all min-h-[44px] no-underline ${
                      plan.highlight
                        ? "cta-button text-primary-foreground"
                        : "border border-border text-foreground hover:border-[#00CC99] hover:text-[#00795c]"
                    }`}
                  >
                    {plan.cta}
                  </a>

                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <Check className="h-4 w-4 shrink-0 mt-0.5 text-[#00CC99]" />
                        <span className={i === 0 && f.startsWith("Everything") ? "font-medium text-foreground" : "text-muted-foreground"}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Unlimited / Enterprise band */}
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Unlimited <span className="text-sm font-normal text-muted-foreground">— custom pricing</span>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-xl">
                For very high-volume stores: unlimited AI messages, a dedicated success manager, and a custom plan built around your operation.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-foreground hover:border-[#00CC99] hover:text-[#00795c] transition-all text-center no-underline"
            >
              Contact sales
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Prices estimated at ~0.5 AI messages per visitor. {currency === "GBP" && "GBP is approximate. "}
            All charges billed securely via the Shopify App Store.
          </p>
        </section>

        {/* Comparison table */}
        <section className="px-4 sm:px-6 mt-20 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-fraunces font-normal text-foreground text-center mb-8">
            Compare every <span className="green-highlight">plan</span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 font-medium text-muted-foreground w-[28%]">Features</th>
                  {plans.map((p) => (
                    <th key={p.id} className="p-4 text-center font-semibold text-foreground">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((section) => (
                  <Fragment key={section.group}>
                    <tr className="bg-muted/40">
                      <td colSpan={5} className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {section.group}
                      </td>
                    </tr>
                    {section.rows.map((row) => (
                      <tr key={row.label} className="border-b border-border/60 last:border-0">
                        <td className="p-4 text-foreground">{row.label}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="p-4 text-center">
                            {v === true ? (
                              <Check className="mx-auto h-4 w-4 text-[#00CC99]" />
                            ) : v === false ? (
                              <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />
                            ) : (
                              <span className="text-muted-foreground">{v}</span>
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
        </section>

        {/* Testimonial */}
        <section className="px-4 sm:px-6 mt-20 max-w-3xl mx-auto text-center">
          <div className="rounded-3xl border border-border bg-card px-6 py-10 sm:px-12 sm:py-14">
            <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#00CC99]/10">
              <svg className="h-5 w-5 text-[#00CC99]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>
            </div>
            <blockquote className="text-lg sm:text-2xl font-playfair italic text-foreground leading-snug max-w-2xl mx-auto">
              &ldquo;We installed <span className="text-[#00795c]">Aurevia</span> on a Friday and by Monday our
              support tickets had dropped noticeably. The AI doesn&apos;t just answer questions—it actually{" "}
              <span className="text-[#00795c]">sells</span>.&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground">Sophie Marchand</p>
              <p className="text-xs text-muted-foreground">Head of E-Commerce, Lumière &amp; Co.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-fraunces font-normal text-foreground text-center mb-8">
            Pricing <span className="green-highlight">questions</span>
          </h2>
          <div className="divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-foreground">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 -mt-1 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 sm:px-6 mt-20 max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-[#0d1717] px-6 py-14 sm:px-12 sm:py-20 text-center">
            <div
              className="absolute inset-0 pointer-events-none opacity-80"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 15% 10%, rgba(0,204,153,0.28) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 90% 90%, rgba(0,153,115,0.22) 0%, transparent 55%)",
              }}
            />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-fraunces font-normal text-[#fffffc] leading-tight mb-4">
                Turn more visitors into revenue
              </h2>
              <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto mb-8">
                Install Aurevia in minutes and let your AI sales agent start closing—24/7, on autopilot.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={SHOPIFY_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button text-primary-foreground font-semibold rounded-xl px-7 py-3 text-sm sm:text-base min-h-[48px] inline-flex items-center justify-center no-underline"
                >
                  Try for free on Shopify
                </a>
                <Link
                  href="/resources/roi-calculator"
                  className="rounded-xl border border-white/20 px-7 py-3 text-sm sm:text-base font-medium text-[#fffffc] hover:bg-white/10 transition-colors min-h-[48px] inline-flex items-center justify-center no-underline"
                >
                  Calculate your ROI
                </Link>
              </div>
              <p className="mt-5 text-xs text-white/50">14-day free trial · Setup in minutes · No credit card required</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
