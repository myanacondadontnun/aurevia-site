import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomerLogos from "@/components/CustomerLogos";
import PartnerPrograms from "@/components/PartnerPrograms";
import PartnerEarnings from "@/components/partners/PartnerEarnings";
import HeroWatermark from "@/components/home/HeroWatermark";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/schema";
import h from "@/components/home/hero.module.css";
import p from "@/components/partners/partners.module.css";

const title = "Partner Program for Shopify Agencies & Referrers | Aurevia";
const desc =
  "Partner with Aurevia, the AI sales agent for Shopify. Agency partners earn up to 30% recurring commission on client stores; referral partners earn 20% for 18 months.";

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
    a: "If you set up or manage Shopify stores for clients, apply as an agency partner. If you recommend tools to merchants but don't run their stores, apply as a referral partner.",
  },
  {
    q: "What do partners earn?",
    a: "Agency partners earn up to 30% recurring commission on the subscriptions of the client stores they bring, for as long as the store stays a customer. Referral partners earn 20% of the monthly subscription of each store they refer, for 18 months, with no cap on referrals.",
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
    <div className={p.page}>
      <Navbar />
      <JsonLd data={faqJsonLd(faqs.map((f) => ({ question: f.q, answer: f.a })))} />
      <main id="main-content">
        {/* ─── Hero: the home hero's canvas and proof row, with what one client store earns on the right ─── */}
        <section className={h.hero}>
          <div className={h.grain} aria-hidden="true" />
          <HeroWatermark />
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${h.inner} ${p.heroInner}`}>
            <div className={h.copy}>
              <h1 className={`${h.title} ${h.fade} ${p.heroTitle}`}>
                Grow your clients&rsquo; stores.
                <span className={`${h.accentLine} ${h.accent}`}>Earn as they grow.</span>
              </h1>
              <p className={`${h.lede} ${h.fade}`} style={{ animationDelay: "120ms" }}>
                Bring Aurevia, the AI sales agent for Shopify, to the stores you build or advise, and earn on every one.
              </p>
              <div className={`${h.ctas} ${h.fade}`} style={{ animationDelay: "180ms" }}>
                <a href="#apply" className={h.primary}>
                  Apply to partner <ArrowRight aria-hidden="true" />
                </a>
                <a href="#programs" className={h.secondary}>
                  See the programs
                </a>
              </div>
              {/* The program terms, and the live install count (Oct 2026). */}
              <ul className={`${h.stats} ${h.fade}`} style={{ animationDelay: "220ms" }}>
                <li className={h.stat}>
                  <span className={h.statFig}>30%</span>
                  <span className={h.statLabel}>Up to, recurring</span>
                </li>
                <li className={h.stat}>
                  <span className={h.statFig}>20%</span>
                  <span className={h.statLabel}>On referrals</span>
                </li>
                <li className={h.stat}>
                  <span className={h.statFig}>50+</span>
                  <span className={h.statLabel}>Shopify stores</span>
                </li>
              </ul>
            </div>
            <div className={`${h.demo} ${h.fadeLate}`}>
              <PartnerEarnings />
            </div>
          </div>
        </section>

        <CustomerLogos />

        <PartnerPrograms
          between={
            // ─── How it works (night): three steps as a ledger ───
            <section className={p.night}>
              <span className={p.nightRing} aria-hidden="true" />
              <div className="container mx-auto max-w-6xl px-4 sm:px-6">
                <h2 className={p.h2}>How it works</h2>
                <ol className={p.steps}>
                  {steps.map((s, i) => (
                    <li key={s.title} className={p.step}>
                      <span className={p.stepNo}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 className={p.stepTitle}>{s.title}</h3>
                      <p className={p.stepBody}>{s.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          }
        />

        {/* ─── Questions ─── */}
        <section className={p.section}>
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${p.faqGrid}`}>
            <div>
              <h2 className={p.h2}>Partner questions</h2>
              <p className={p.faqAside}>
                Something else? <a href="/contact/" className={p.inlineLink}>Talk to us</a>
              </p>
            </div>
            <div className={p.faqList}>
              {faqs.map((f) => (
                <details key={f.q} className={p.faqItem}>
                  <summary className={p.faqQ}>
                    {f.q}
                    <span className={p.faqIcon} aria-hidden="true" />
                  </summary>
                  <p className={p.faqA}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
