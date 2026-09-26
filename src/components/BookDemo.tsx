"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Lock } from "lucide-react";
import TrustStrip from "@/components/TrustStrip";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";
import { trackEvent } from "@/lib/analytics";

/** Ritwik's booking calendar. Name, email and the store domain are prefilled from the form. */
const CALENDLY_URL = "https://calendly.com/ritwik-mandal-aurevia/30min";
const LEAD_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby2Um5z2N6m9X1WzbNACYogzZf60qtXeoMYaZEg0zIKwCyZQ6CL_53HUcAibwzx92fKlw/exec";

const script: ChatStep[] = [
  { type: "bot", text: "Welcome to Lucien Vallière. What are you looking for today?" },
  { type: "user", text: "A waterproof jacket for cold morning runs." },
  { type: "bot", text: "Two that do exactly that. The Pop Pink shell is the one for rain:" },
  {
    type: "products",
    delay: 500,
    items: [
      { name: "Pop Pink zip-up jacket", price: "$148.00", img: "/images/demo/lv/pop-pink-jacket.webp" },
      { name: "Metro Yellow hoodie", price: "$129.00", img: "/images/demo/lv/metro-hoodie.webp" },
    ],
  },
  { type: "user", text: "Add the jacket in medium.", delay: 1600 },
  { type: "addcart", name: "Pop Pink zip-up jacket" },
  { type: "cartbar", summary: "1 item · $148.00" },
];

const INPUT =
  "w-full rounded-xl border border-border/70 bg-card px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#009973]/40 focus:border-[#009973] transition-shadow";

export default function BookDemo() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", storeUrl: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const storeUrl = form.storeUrl.trim().replace(/^https?:\/\//i, "").replace(/\/$/, "");
    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();

    // Record the lead first (fire-and-forget), then hand off to the calendar.
    try {
      const body = new URLSearchParams({
        name: fullName,
        email: form.email.trim(),
        company: storeUrl,
        subject: "Demo request",
        message: `Demo booking started by ${fullName} for ${storeUrl}.`,
      });
      void fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        keepalive: true,
      }).catch(() => undefined);
      trackEvent("demo_booking_started", { form_name: "book_demo", company: storeUrl });
    } catch {
      /* never block the booking on analytics or the sheet */
    }

    const params = new URLSearchParams({ name: fullName, email: form.email.trim(), a1: storeUrl });
    window.location.href = `${CALENDLY_URL}?${params.toString()}`;
  };

  return (
    <div className="min-h-[100dvh] lg:grid lg:grid-cols-2">
      {/* Left: the product, in one glance */}
      <aside className="hero-bg relative flex flex-col items-center px-6 pt-6 pb-4 lg:min-h-[100dvh] lg:justify-center lg:px-12 lg:pb-10">
        <Link href="/home" className="absolute left-6 top-5 flex items-center gap-2 lg:left-10 lg:top-8" aria-label="Aurevia home">
          <img src="/images/aurevia-logo-mark.png" alt="" className="h-7 w-auto" />
          <span className="font-fraunces text-lg text-foreground">Aurevia.io</span>
        </Link>
        <div className="mt-14 hidden lg:block">
          <FeatureChatDemo agentName="Lucien" script={script} loopPause={7000} scale={0.68} />
        </div>
        <div className="mt-12 max-w-md text-center lg:mt-10">
          <h2 className="font-fraunces text-3xl text-foreground sm:text-4xl">Your store&rsquo;s AI agent that sells</h2>
          <p className="mt-3 text-base font-light text-muted-foreground">
            Recommends, adds to cart, answers from your policies, and hands off to your team when it should.
          </p>
        </div>
      </aside>

      {/* Right: the booking */}
      <main className="flex items-center justify-center bg-background px-6 pt-6 pb-12 lg:px-12 lg:py-12">
        <div className="w-full max-w-lg">
          <ul className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <Lock className="h-4 w-4" aria-hidden="true" /> GDPR-ready data handling
            </li>
            <li>
              <TrustStrip />
            </li>
          </ul>

          <h1 className="text-center font-fraunces text-4xl leading-tight text-foreground sm:text-5xl">
            Book a free <span className="green-highlight">30-minute demo</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-base font-light text-muted-foreground sm:text-lg">
            See Aurevia running on a store like yours and get your questions answered by the people who built it.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4" aria-label="Book a demo">
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" name="firstName" value={form.firstName} onChange={onChange} required autoComplete="given-name" placeholder="First name" aria-label="First name" className={INPUT} />
              <input type="text" name="lastName" value={form.lastName} onChange={onChange} required autoComplete="family-name" placeholder="Last name" aria-label="Last name" className={INPUT} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="email" name="email" value={form.email} onChange={onChange} required autoComplete="email" placeholder="Work email" aria-label="Work email" className={INPUT} />
              <input
                type="text"
                name="storeUrl"
                value={form.storeUrl}
                onChange={onChange}
                required
                inputMode="url"
                pattern="^(https?://)?[A-Za-z0-9.\-]+\.[A-Za-z]{2,}(/.*)?$"
                title="Your store domain, for example yourstore.myshopify.com"
                placeholder="Store URL"
                aria-label="Store URL"
                className={INPUT}
              />
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              We respect your privacy. By continuing you agree to be contacted about Aurevia, in line with our{" "}
              <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
                privacy policy
              </Link>
              .
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="cta-button inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-semibold disabled:opacity-60"
            >
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
              {submitting ? "Opening the calendar…" : "Choose a date & time"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Prefer to try it yourself first?{" "}
            <a href="https://apps.shopify.com/aurevia-io" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
              Start the 14-day free trial
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
