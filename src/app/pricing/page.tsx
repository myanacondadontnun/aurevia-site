"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SHOPIFY_APP_URL } from "@/lib/utils";

const visitorRanges = [
  { label: "Less than 5,000", min: 1000, max: 5000, value: 3000 },
  { label: "5,100 – 50,000", min: 5100, max: 50000, value: 25000 },
  { label: "51,000 – 150,000", min: 51000, max: 150000, value: 100000 },
  { label: "150,000+", min: 150001, max: 160000, value: 155000 },
];

type Currency = "USD" | "GBP";
type BillingCycle = "monthly" | "annual";

const GBP_RATE = 0.79;

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  GBP: "£",
};

interface Plan {
  id: string;
  name: string;
  basePrice: number;
  pricePer1k: number;
  customPricing: boolean;
  visitorMin: number;
  visitorMax: number;
  description: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "free-plan",
    name: "Free Pilot",
    basePrice: 0,
    pricePer1k: 0,
    customPricing: false,
    visitorMin: 0,
    visitorMax: 5000,
    description:
      "Perfect for trying Aurevia on your store with zero risk.",
    features: [
      "200 AI messages / month",
      "1 Seat included",
      "AI product recommendations",
      "AI training + Chatbot customisation",
      "Analytics + Conversation history",
      "Lead capture + Live chat",
      "Unlimited products and services",
      '"Ask Aurevia AI" in-app support',
    ],
  },
  {
    id: "pro-growth",
    name: "Pro Growth",
    basePrice: 49,
    pricePer1k: 15,
    customPricing: false,
    visitorMin: 1000,
    visitorMax: 50000,
    description:
      "For growing stores ready to turn visitors into paying customers.",
    features: [
      "Everything in Free, plus:",
      "Scales with your traffic (5k–50k visitors)",
      "$15 per 1,000 AI messages",
      "Priority email support",
      "Advanced analytics dashboard",
      "Custom AI selling rules",
      "Multi-language support",
      "Cart recovery automation",
    ],
  },
  {
    id: "pro-scale",
    name: "Pro Scale",
    basePrice: 99,
    pricePer1k: 13,
    customPricing: false,
    visitorMin: 51000,
    visitorMax: 150000,
    description:
      "For high-traffic stores that need maximum AI selling power.",
    features: [
      "Everything in Pro Growth, plus:",
      "Scales with your traffic (50k–150k visitors)",
      "$13 per 1,000 AI messages",
      "Dedicated account manager",
      "Advanced AI training tools",
      "Priority live chat support",
      "Custom integrations",
      "Team collaboration (multiple seats)",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    basePrice: 0,
    pricePer1k: 0,
    customPricing: true,
    visitorMin: 0,
    visitorMax: 999999999,
    description:
      "Tailored solutions for large-scale Shopify operations.",
    features: [
      "Everything in Pro Scale, plus:",
      "150,000+ visitors supported",
      "Custom pricing & SLA",
      "Dedicated success manager",
      "Custom AI model training",
      "White-label options",
      "API access & custom integrations",
      "Enterprise-grade security & compliance",
    ],
  },
];

function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatSliderLabel(value: number): string {
  if (value >= 1000) {
    const base = value / 1000;
    return (value % 1000 === 0 ? base.toFixed(0) : base.toFixed(1)) + "k";
  }
  return value.toString();
}

function calculatePrice(plan: Plan, visitorCount: number): number | "Custom" {
  if (plan.customPricing) return "Custom";
  if (plan.id === "free-plan") return 0;
  const messageBlocks = (visitorCount * 0.05 * 10) / 1000;
  const messageCost = messageBlocks * plan.pricePer1k;
  return Math.round(plan.basePrice + messageCost);
}

function convertPrice(usdPrice: number, currency: Currency): number {
  if (currency === "GBP") return Math.round(usdPrice * GBP_RATE);
  return usdPrice;
}

function applyBillingCycle(monthlyPrice: number, cycle: BillingCycle): number {
  if (cycle === "annual") return monthlyPrice * 10;
  return monthlyPrice;
}

export default function PricingPage() {
  const [selectedRange, setSelectedRange] = useState(0);
  const [sliderValue, setSliderValue] = useState(3000);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const range = visitorRanges[selectedRange];
  const isEnterprise = range.min >= 150001;

  const handleRangeSelect = useCallback((index: number) => {
    setSelectedRange(index);
    const r = visitorRanges[index];
    setSliderValue(r.value);
  }, []);

  const visiblePlans = plans.filter((plan) => {
    if (range.max <= 5000) {
      return plan.id === "free-plan";
    }
    if (range.min >= 5100 && range.max <= 50000) {
      return plan.id === "free-plan" || plan.id === "pro-growth";
    }
    if (range.min >= 51000 && range.max <= 150000) {
      return plan.id === "free-plan" || plan.id === "pro-scale" || plan.id === "enterprise";
    }
    return plan.id === "enterprise";
  });

  const recommendedId = isEnterprise
    ? "enterprise"
    : range.min >= 51000
      ? "pro-scale"
      : range.min >= 5100
        ? "pro-growth"
        : "free-plan";

  const displayVisitors =
    sliderValue < 5000
      ? "<5,000"
      : sliderValue >= 150000
        ? ">150,000"
        : formatNumber(sliderValue);

  const sym = currencySymbols[currency];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pt-28 pb-16">
        {/* Page header */}
        <section className="relative z-10 text-center px-4 sm:px-6 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-inter font-normal text-white mb-4">
            Choose Your{" "}
            <span className="green-highlight">Plan</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            All plans include a 14-day free trial. You won&apos;t be charged
            until the trial period ends.
          </p>
        </section>

        {/* Currency + Billing toggles */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {/* Currency toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-inter">Currency:</span>
              <div className="relative flex rounded-full border border-white/10 bg-black/60 p-0.5">
                <button
                  onClick={() => setCurrency("USD")}
                  className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
                    currency === "USD"
                      ? "bg-gradient-to-r from-[#02DFA6] to-[#024d3f] text-[#0d1717]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  $ USD
                </button>
                <button
                  onClick={() => setCurrency("GBP")}
                  className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
                    currency === "GBP"
                      ? "bg-gradient-to-r from-[#02DFA6] to-[#024d3f] text-[#0d1717]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  £ GBP
                </button>
              </div>
            </div>

            {/* Billing cycle toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-inter">Billing:</span>
              <div className="relative flex rounded-full border border-white/10 bg-black/60 p-0.5">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
                    billingCycle === "monthly"
                      ? "bg-gradient-to-r from-[#02DFA6] to-[#024d3f] text-[#0d1717]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`relative z-10 rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
                    billingCycle === "annual"
                      ? "bg-gradient-to-r from-[#02DFA6] to-[#024d3f] text-[#0d1717]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Annual
                  <span className="ml-1 text-[10px] opacity-80">(save 2 months)</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Visitor estimation */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Visitor&apos;s Estimation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {visitorRanges.map((r, i) => (
              <button
                key={i}
                onClick={() => handleRangeSelect(i)}
                className={`rounded-lg p-3 text-center text-xs font-medium transition-all duration-300 border cursor-pointer ${
                  selectedRange === i
                    ? "bg-gradient-to-r from-[#02DFA6] to-[#024d3f] text-[#0d1717] border-transparent"
                    : "bg-black text-white border-gray-600 hover:border-[#02DFA6]/50 hover:-translate-y-0.5"
                }`}
              >
                {r.label} Visitors
              </button>
            ))}
          </div>
        </section>

        {/* Slider */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mb-10">
          <label className="block text-sm font-medium text-white mb-3 text-center">
            Select Your Monthly Visitors
          </label>
          <div className="relative px-4 mb-3">
            <input
              type="range"
              min={range.min}
              max={range.max}
              step={1000}
              value={isEnterprise ? range.value : sliderValue}
              disabled={isEnterprise}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full h-2 appearance-none cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: `linear-gradient(to right, #024d3f, #02DFA6, #024d3f)`,
              }}
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>{formatSliderLabel(range.min)}</span>
              <span>{formatSliderLabel(range.max)}</span>
            </div>
          </div>
          <div className="text-center">
            <span className="text-2xl font-semibold text-[#02DFA6]">
              {displayVisitors}
            </span>
            <span className="text-sm text-gray-400 ml-2">monthly visitors</span>
          </div>
        </section>

        {/* Plan cards */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div
            className={`grid gap-6 ${
              visiblePlans.length === 1
                ? "grid-cols-1 max-w-md mx-auto"
                : visiblePlans.length === 2
                  ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {visiblePlans.map((plan) => {
              const rawPrice = calculatePrice(plan, sliderValue);
              const isRecommended = plan.id === recommendedId;

              let displayPrice: string;
              let perLabel: string;
              let perKLabel: string | null = null;

              if (rawPrice === "Custom") {
                displayPrice = "Custom";
                perLabel = "";
              } else {
                const converted = convertPrice(rawPrice, currency);
                const finalPrice = applyBillingCycle(converted, billingCycle);
                displayPrice = `${sym}${formatNumber(finalPrice)}`;
                perLabel = billingCycle === "annual" ? "/year" : "/month";

                if (plan.pricePer1k > 0) {
                  const convertedPer1k = convertPrice(plan.pricePer1k, currency);
                  perKLabel = `+ ${sym}${convertedPer1k}/1k messages`;
                }
              }

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-lg p-6 transition-all duration-300 backdrop-blur-md border ${
                    isRecommended
                      ? "border-[#02DFA6]"
                      : "border-white/10"
                  }`}
                  style={{
                    background:
                      isRecommended
                        ? "rgba(13, 23, 23, 0.4)"
                        : "rgba(29, 39, 39, 0.4)",
                  }}
                >
                  {isRecommended && visiblePlans.length > 1 && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#02DFA6] to-[#024d3f] text-[#0d1717] text-xs font-semibold whitespace-nowrap">
                      Recommended for you
                    </div>
                  )}

                  <div className="flex flex-col h-full min-h-[480px]">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-white mb-3 font-inter">
                        {plan.name}
                      </h3>

                      <div className="mb-3 font-inter">
                        {rawPrice === "Custom" ? (
                          <>
                            <span className="text-2xl text-white">Custom</span>
                            <span className="text-sm text-gray-400 ml-1 block">
                              Pricing
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              className={`text-4xl ${
                                isRecommended
                                  ? "text-[#02DFA6]"
                                  : "text-white"
                              }`}
                            >
                              {displayPrice}
                            </span>
                            <span className="text-sm text-gray-400 ml-1">
                              {perLabel}
                            </span>
                            {billingCycle === "annual" && rawPrice > 0 && (
                              <div className="text-xs text-[#02DFA6]/70 mt-1">
                                {sym}{formatNumber(convertPrice(rawPrice as number, currency))}/mo equivalent
                              </div>
                            )}
                            {perKLabel && (
                              <div className="text-xs text-gray-400 mt-1">
                                {perKLabel}
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <p className="text-xs text-gray-300 mb-4">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-6 flex-grow">
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              className="w-4 h-4 text-[#02DFA6] mr-2 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-xs text-gray-300">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <a
                        href={SHOPIFY_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2.5 px-6 text-white text-sm font-medium rounded-xl text-center transition-all duration-300 active:scale-95 hover:scale-[1.02] hover:-translate-y-[1px]"
                        style={{
                          background:
                            "linear-gradient(135deg, #0b3c2f 0%, #089357 50%, #07824d 100%)",
                        }}
                      >
                        {plan.customPricing
                          ? "Contact Sales"
                          : "Get Started"}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing note */}
        <section className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center mb-16">
          <p className="text-xs text-gray-500">
            Prices calculated at 0.5 messages per visitor.
            {currency === "GBP" && " GBP prices are approximate based on current exchange rates."}
            {" "}All charges billed via the Shopify App Store. Cancel anytime.
          </p>
        </section>

        {/* ROI Calculator CTA */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-20">
          <div
            className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden px-6 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20 text-center border border-white/[0.06]"
            style={{
              background:
                "linear-gradient(135deg, #0b3c2f 0%, rgba(2, 223, 166, 0.18) 50%, rgba(11, 60, 47, 0.4) 100%)",
            }}
          >
            {/* Wave overlays matching screenshot aesthetic */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 100% 80% at 5% 15%, rgba(2, 223, 166, 0.1) 0%, transparent 55%), radial-gradient(ellipse 85% 65% at 92% 85%, rgba(2, 223, 166, 0.07) 0%, transparent 50%), radial-gradient(ellipse 70% 90% at 50% 55%, rgba(255,255,255,0.03) 0%, transparent 60%)",
              }}
            />
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]"
              viewBox="0 0 800 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden
            >
              <path d="M0 120 Q200 80 400 120 T800 120" stroke="white" strokeWidth="0.6" fill="none" />
              <path d="M0 200 Q250 160 500 200 T800 200" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M0 280 Q150 240 400 280 T800 280" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M-50 60 Q100 30 300 60 Q500 90 850 60" stroke="white" strokeWidth="0.4" fill="none" />
              <path d="M-30 340 Q200 300 450 340 Q650 380 830 340" stroke="white" strokeWidth="0.4" fill="none" />
            </svg>
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-roi font-normal text-white mb-3 tracking-tight">
                Wondering if Aurevia is worth it?
              </h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto mb-8">
                See exactly how much additional revenue Aurevia could unlock for your store.
              </p>
              <Link
                href="/resources/roi-calculator"
                className="inline-flex items-center justify-center text-white font-medium px-8 py-3.5 text-base rounded-xl min-h-[48px] transition-all no-underline hover:scale-[1.02] active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, #0b3c2f 0%, #089357 50%, #07824d 100%)",
                }}
              >
                Calculate Your ROI
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div
            className="rounded-2xl sm:rounded-3xl px-6 py-10 sm:px-12 sm:py-14 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(29, 39, 39, 0.6) 0%, rgba(13, 23, 23, 0.4) 100%)",
            }}
          >
            {/* Quote icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-white/[0.08] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#02DFA6]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>
              </div>
            </div>

            <blockquote className="mb-8">
              <p className="text-xl sm:text-2xl md:text-3xl font-playfair italic text-white font-medium leading-snug tracking-tight max-w-3xl mx-auto">
                &ldquo;We installed <span className="text-[#02DFA6]">Aurevia</span> on a Friday and by Monday our
                support tickets had dropped by 40%. The AI doesn&apos;t just answer questions — it actually{" "}
                <span className="text-[#02DFA6] italic">sells</span>. We&apos;ve seen a 22% uplift in
                conversion rate on pages where the chatbot engages visitors.&rdquo;
              </p>
            </blockquote>

            <div className="flex flex-col items-center gap-1">
              <p className="text-sm sm:text-base font-inter font-medium text-white/80">
                Sophie Marchand
              </p>
              <p className="text-xs sm:text-sm font-inter text-white/40">
                Head of E-Commerce, <span className="font-semibold">Lumière & Co.</span>
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #02dfa6;
          cursor: pointer;
          border: 2px solid #0d1717;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #02dfa6;
          cursor: pointer;
          border: 2px solid #0d1717;
        }
      `}</style>
    </div>
  );
}
