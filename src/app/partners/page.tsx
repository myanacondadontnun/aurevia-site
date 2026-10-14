import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import PartnerPrograms from "@/components/PartnerPrograms";
import TrustStrip from "@/components/TrustStrip";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/schema";

const title = "Partner Program for Shopify Agencies, Referrers & Apps | Aurevia";
const desc =
  "Partner with Aurevia, the AI sales agent for Shopify. Three programs: agency partners earn up to 30% recurring commission on client stores, referral partners earn 20% for 18 months, and tech partners co-market with us.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/partners" },
  openGraph: { title, description: desc, type: "website", url: "https://aurevia.io/partners/" },
};

const steps = [
  { title: "Apply", body: "Pick the program that fits and tell us how you work with Shopify stores." },
  { title: "Get your agreement", body: "We reply by email with your partner agreement and answer your questions." },
  { title: "Bring a store", body: "Install Aurevia on a client store or send a merchant our way. We help with the first setup." },
];

const faqs = [
  {
    q: "Which program is right for me?",
    a: "If you set up or manage Shopify stores for clients, apply as an agency partner. If you recommend tools to merchants but don't run their stores, apply as a referral partner. If you run an app or platform for Shopify brands, apply as a tech partner.",
  },
  {
    q: "What do partners earn?",
    a: "Agency partners earn up to 30% recurring commission on the subscriptions of the client stores they bring, for as long as the store stays a customer. Referral partners earn 20% of the monthly subscription of each store they refer, for 18 months, with no cap on referrals. Tech partnerships are co-marketing rather than commission.",
  },
  {
    q: "Do my clients need to be on Shopify?",
    a: "Yes. Aurevia installs from the Shopify App Store and works with the store's catalogue, cart and orders.",
  },
  {
    q: "What does Aurevia do for a store?",
    a: "It is an AI sales agent that recommends products, adds to cart, compares options, tracks orders and hands off to the team. It answers on the storefront, WhatsApp, Instagram and email, and follows up abandoned carts.",
  },
  {
    q: "How do I apply?",
    a: "Use the form on this page. We read every application and reply by email with your partner agreement.",
  },
];

export default function PartnersPage() {
  return (
    <PageLayout>
      <JsonLd data={faqJsonLd(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-10 sm:py-16">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00795c] mb-3">Partners</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-fraunces font-normal text-foreground leading-[1.1] mb-5">
              Grow your clients&rsquo; stores. <span className="green-highlight">Grow with us.</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed mb-7">
              Aurevia is the AI sales agent for Shopify. If you build stores, advise merchants or run an app they
              rely on, there are three ways to work with us.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href="#apply"
                className="cta-button inline-flex min-h-[48px] items-center justify-center rounded-xl px-7 text-sm sm:text-base"
              >
                Apply to partner
              </a>
              <a
                href="#programs"
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-border bg-card px-7 text-sm sm:text-base font-semibold text-foreground transition-colors hover:border-[#0b3c2f]"
              >
                See the programs
              </a>
              <TrustStrip />
            </div>
          </div>

          <PartnerPrograms />

          <div className="mt-16 sm:mt-24">
            <h2 className="text-2xl sm:text-4xl font-fraunces font-normal text-foreground mb-8">How it works</h2>
            <ol className="grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                  <span className="text-sm font-semibold text-[#00795c]">Step {index + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 sm:mt-24 max-w-3xl">
            <h2 className="text-2xl sm:text-4xl font-fraunces font-normal text-foreground mb-6">Common questions</h2>
            <div className="divide-y divide-border border-y border-border">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base sm:text-lg font-semibold text-foreground">
                    {faq.q}
                    <span className="text-xl font-normal text-muted-foreground transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
