import type { ReactNode } from "react";
import { ArrowRight, Building2, Check, Lock, Plus, ServerCog, ShieldCheck, Star, UserX } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/schema";
import { reviews, SHOPIFY_LISTING_URL, SHOPIFY_RATING, SHOPIFY_REVIEW_COUNT } from "@/lib/reviews";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import { sitePhoto } from "@/lib/sitePhoto";
import { Bot, Cards, User, WidgetWindow } from "./Widget";

function SectionHead({ title, lede, center = false, dark = false }: { title: ReactNode; lede?: ReactNode; center?: boolean; dark?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <h2 className={`au-h2 ${dark ? "text-white" : "text-[color:var(--au-ink)]"}`}>{title}</h2>
      {lede && <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? "text-white/70" : "text-[color:var(--au-ink-2)]"}`}>{lede}</p>}
    </div>
  );
}

function Checks({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-6 grid gap-3">
      {items.map((t) => (
        <li key={t} className={`flex items-start gap-3 text-sm ${dark ? "text-white/85" : "text-foreground"}`}>
          <Check className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? "text-[#00CC99]" : "text-[#00665A]"}`} aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Shot({ src, alt, dark = false }: { src: string; alt: string; dark?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`block w-full rounded-2xl border ${dark ? "border-white/10" : "border-border"} bg-white shadow-[0_30px_60px_-30px_rgba(15,61,48,0.45)]`}
    />
  );
}

const LV = "/images/demo/lv";

/* ---------- Asks first ---------- */

export function AsksFirst() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionHead
          title={<>Most store chatbots search. <span className="text-[#00665A]">Aurevia asks.</span></>}
          lede="Shoppers rarely type a product name. They describe an occasion or a problem. A keyword bot hunts for matching words. A good salesperson asks one question, then recommends."
        />
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-2">
          <div className="grid min-w-0 content-start gap-4">
            <p className="text-sm font-semibold text-foreground/60">A keyword chatbot</p>
            <div className="flex min-h-[380px] flex-col justify-end gap-3 rounded-[28px] border border-border bg-[#f7f8f8] p-6 sm:p-8">
              <div className="ml-auto max-w-[80%] rounded-lg bg-[#5b6470] px-3.5 py-2.5 text-sm text-white">
                I need something for a gallery opening on Friday.
              </div>
              <div className="max-w-[85%] rounded-lg bg-white px-3.5 py-2.5 text-sm text-foreground shadow-sm">
                Sorry, I couldn&rsquo;t find any products matching &ldquo;gallery opening&rdquo;. Try searching for: Dresses, Tops, Shoes.
              </div>
              <div className="max-w-[85%] rounded-lg bg-white px-3.5 py-2.5 text-sm text-foreground/70 shadow-sm">Was this helpful? Yes / No</div>
            </div>
            <p className="border-l-2 border-border pl-4 text-sm text-muted-foreground">
              Matches words, not intent. The shopper is sent back to browsing on their own.
            </p>
          </div>
          <div className="grid min-w-0 content-start gap-4">
            <p className="text-sm font-semibold text-[#00665A]">Aurevia</p>
            <div className="flex justify-center rounded-[28px] bg-[#e8eeec] px-4 py-8 sm:px-8">
              <WidgetWindow title="Lucien Vallière">
                <User>I need something for a gallery opening on Friday.</User>
                <Bot>Nice. Sharp or relaxed? And will it be warm inside?</Bot>
                <User>Sharp, not corporate. Probably warm.</User>
                <Bot>Then skip heavy wool. A silk blouse, with a blazer you can slip off:</Bot>
                <Cards
                  products={[
                    { title: "Silk Draped Blouse", price: "$520.00", image: `${LV}/silk-blouse.webp` },
                    { title: "Tailored Cashmere Blazer", price: "$1,590.00", image: `${LV}/cashmere-blazer.webp` },
                  ]}
                />
              </WidgetWindow>
            </div>
            <p className="border-l-2 border-[#00CC99] pl-4 text-sm text-muted-foreground">
              One question about the occasion, then two pieces that work together, from your live catalog.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Team in control ---------- */

export function TeamControl() {
  return (
    <section className="bg-white py-20 sm:py-28 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <SectionHead
            title="Your team stays in control"
            lede="Every conversation shows up live. Step in with one tap from your desk or your phone, then hand it back to the AI."
          />
          <Checks
            items={[
              "Live activity across every channel",
              "Take over and hand back in one tap",
              "Team seats with roles, and leads and tickets in one inbox",
              "Correct an answer once and the agent remembers it",
            ]}
          />
        </div>
        <figure className="relative m-0 pb-10 pr-6 sm:pr-10">
          <Shot src="/images/app/live-activity-desktop.webp" alt="Live Activity in the Aurevia dashboard, with a take over button on an ongoing chat" />
          <img
            src="/images/app/live-activity-mobile.webp"
            alt="The same conversation on a phone"
            loading="lazy"
            className="absolute bottom-0 right-0 w-[30%] rounded-[18px] border border-border bg-white shadow-[0_24px_48px_-20px_rgba(15,61,48,0.5)]"
          />
        </figure>
      </div>
    </section>
  );
}

/* ---------- Ask Aurevia (dark band) ---------- */

export function AskAureviaBand() {
  const prompts = [
    "What did shoppers ask about most this week?",
    "Which products get questions but no sales?",
    "Rewrite this description using the sizing answers",
    "Chart revenue sold by AI this month",
  ];
  return (
    <section className="bg-[#00665A] py-20 sm:py-28 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
        <div className="order-2 lg:order-1">
          <Shot src="/images/app/ask-aurevia-desktop.webp" alt="Ask Aurevia proposing a product description change for approval" dark />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHead
            dark
            title="Ask your store anything. Then let it help."
            lede="Ask Aurevia is a copilot inside your dashboard. It reads your conversations, products and orders, answers in plain English and proposes changes for you to approve."
          />
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Example questions">
            {prompts.map((p) => (
              <li key={p} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white/85">{p}</li>
            ))}
          </ul>
          <Checks
            dark
            items={["Charts and answers from your real store data", "Proposes product fixes. Nothing changes until you approve.", "Creates product images on request"]}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Revenue ---------- */

export function RevenueBand() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <SectionHead
            title="See exactly what the agent sold"
            lede="Revenue sold by AI, resolution and escalation rates, and the questions shoppers ask most. The numbers that show whether it pays for itself."
          />
          <a href="/products/dashboard/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00665A] hover:text-foreground">
            Explore analytics <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <Shot src="/images/app/dashboard-desktop.webp" alt="The Aurevia dashboard showing revenue sold by AI and the most asked questions" />
      </div>
    </section>
  );
}

/* ---------- Always on (photo when available) ---------- */

export function AlwaysOnBand() {
  const photo = sitePhoto("night");
  return (
    <section className="relative overflow-hidden bg-[#13211d] px-4 sm:px-6">
      {photo && (
        <>
          <img src={photo} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1714]/90 via-[#0b1714]/60 to-transparent" aria-hidden="true" />
        </>
      )}
      <div className="relative container mx-auto max-w-6xl py-24 sm:py-36">
        <div className="max-w-lg">
          <h2 className="font-fraunces font-normal text-white text-3xl sm:text-5xl leading-[1.1]">Selling while you sleep</h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/75">
            Shoppers don&rsquo;t keep office hours. Aurevia answers at 2am in your brand&rsquo;s voice, and every
            conversation is waiting for you when you&rsquo;re back.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Setup ---------- */

/* ---------- Security & GDPR ---------- */

export function SecurityBand() {
  // A brand-green band, so it doesn't echo the FAQ's two-column list below it: three headline facts in
  // Fraunces side by side, then the remaining details as one quiet footer line with the links.
  const facts = [
    { value: "London, UK", detail: "Chats, leads and tickets are stored on AWS in London (eu-west-2)." },
    { value: "Encrypted", detail: "Everything is encrypted in transit and at rest." },
    { value: "Never sold", detail: "Your customers’ conversations are never sold or used for advertising." },
  ];
  return (
    <section className="bg-[#00665A] px-4 py-20 sm:px-6 sm:py-28">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-fraunces font-normal text-3xl sm:text-5xl leading-[1.1] text-white text-balance">
            Your customers&rsquo; data, handled properly
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/80">
            Built to meet UK and EU GDPR, and Shopify&rsquo;s data protection requirements.
          </p>
        </div>

        <dl className="mt-14 grid sm:mt-16 md:grid-cols-3 md:divide-x md:divide-white/20">
          {facts.map((f) => (
            <div key={f.value} className="border-t border-white/20 py-8 first:border-t-0 md:border-t-0 md:px-10 md:py-2 md:first:pl-0 md:last:pr-0">
              <dt className="font-fraunces text-4xl font-normal leading-none text-white sm:text-5xl">{f.value}</dt>
              <dd className="m-0 mt-4 max-w-xs text-base leading-relaxed text-white/75">{f.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/20 pt-7 text-sm text-white/70 sm:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl leading-relaxed">
            GDPR access and deletion requests arrive through Shopify&rsquo;s GDPR webhooks. Aurevia Artificial
            Intelligence Ltd is a UK registered company, no. 16622049.
          </p>
          <div className="flex shrink-0 flex-wrap gap-x-6 gap-y-3 font-semibold">
            <a href="/gdpr/" className="group inline-flex items-center gap-1.5 whitespace-nowrap text-white hover:text-white/80">
              How we handle GDPR <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href="/privacy-policy/" className="group inline-flex items-center gap-1.5 whitespace-nowrap text-white hover:text-white/80">
              Privacy policy <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */

// Longest-use reviews first; every review is quoted verbatim from the Shopify listing.
const REVIEW_ORDER = ["l1nk", "masks-capes", "lotus-beauty", "purebronze", "pippi-ceramics", "littleangel", "fresh-famous", "chawla"];

export function ReviewsWall() {
  const ordered = REVIEW_ORDER.map((id) => reviews.find((r) => r.id === id)).filter((r): r is (typeof reviews)[number] => Boolean(r));
  const countries = Array.from(new Set(ordered.map((r) => r.country)));
  return (
    <section className="bg-white py-20 sm:py-28 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <SectionHead title="What merchants say" />
            <a
              href={SHOPIFY_LISTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-2xl border border-border bg-[#f3f6f5] p-6 hover:border-[#00665A]/40"
            >
              <p className="font-fraunces text-6xl text-foreground">{SHOPIFY_RATING.toFixed(1)}</p>
              <span className="mt-2 flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#f5b301] text-[#f5b301]" />)}
              </span>
              <p className="mt-3 text-sm text-foreground">
                From {SHOPIFY_REVIEW_COUNT} reviews on the Shopify App Store
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Merchants in {countries.join(", ")}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00665A]">
                Read them on Shopify <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </div>
          <ul className="columns-1 gap-4 sm:columns-2 [&>li]:mb-4">
            {ordered.map((r) => (
              <li key={r.id} className="break-inside-avoid rounded-2xl border border-border bg-card p-6">
                <span className="flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[#f5b301] text-[#f5b301]" aria-hidden="true" />)}
                </span>
                <blockquote className="mt-4 text-[15px] leading-relaxed text-foreground">&ldquo;{r.quote}&rdquo;</blockquote>
                <p className="mt-5 text-sm font-semibold text-foreground">{r.store}</p>
                <p className="text-xs text-muted-foreground">{r.country}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews: a curated row, right after the product story ---------- */

/** Three reviews that each make a different point: finding the right product, bigger orders, and what the
    conversations teach you. Quoted verbatim from the Shopify listing via lib/reviews. */
const FEATURED_REVIEWS = ["masks-capes", "lotus-beauty", "l1nk"];

export function ReviewsRow() {
  const featured = FEATURED_REVIEWS.map((id) => reviews.find((r) => r.id === id)).filter((r): r is (typeof reviews)[number] => Boolean(r));
  return (
    <section className="bg-[#f3f6f5] py-20 sm:py-28 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-fraunces font-normal text-3xl sm:text-5xl leading-[1.1] text-foreground">What merchants say</h2>
          <a
            href={SHOPIFY_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-border bg-white py-2 pl-3 pr-4 text-sm text-foreground transition-colors hover:border-[#00665A]/40 sm:self-auto"
          >
            <span className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[#f5b301] text-[#f5b301]" />)}
            </span>
            <span className="whitespace-nowrap">
              <strong className="font-semibold">{SHOPIFY_RATING.toFixed(1)}</strong> · {SHOPIFY_REVIEW_COUNT} reviews on Shopify
            </span>
            <ArrowRight className="h-4 w-4 text-[#00665A] transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3 sm:mt-12">
          {featured.map((r) => (
            <li key={r.id} className="flex flex-col rounded-3xl border border-border bg-white p-7 sm:p-8">
              <span className="font-fraunces text-5xl leading-none text-[#00665A]" aria-hidden="true">&ldquo;</span>
              <blockquote className="mt-3 flex-1 text-[17px] leading-relaxed text-foreground">{r.quote}</blockquote>
              <div className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00665A] font-fraunces text-base text-white"
                  aria-hidden="true"
                >
                  {r.store.charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">{r.store}</span>
                  <span className="block text-xs text-muted-foreground">{r.country} · Shopify App Store</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const FAQS = [
  {
    question: "How long does setup take?",
    answer:
      "About ten minutes. Install from the Shopify App Store, let your catalog and policies sync, set the tone and handoff rules, and go live. No code or theme edits.",
  },
  {
    question: "What does Aurevia know about my store?",
    answer:
      "Your products, variants, prices and stock come live from Shopify, along with your policies and store pages. You can add your own documents and correct any answer, and the agent uses the correction from then on.",
  },
  {
    question: "When does it hand a chat to my team?",
    answer:
      "When your handoff rules say so, or when the shopper asks for a person. Your team sees the full conversation, takes over from the dashboard or a phone, and can hand it back to the AI.",
  },
  {
    question: "Which channels does it work on?",
    answer:
      "The chat on your Shopify store, plus cart follow-up emails. WhatsApp and Instagram are in early access.",
  },
  {
    question: "Where is my customers' data stored?",
    answer:
      "On AWS in London, encrypted in transit and at rest. Data access and deletion requests come through Shopify's standard GDPR webhooks, and our GDPR page lists what we hold and for how long.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Every plan starts with a 14-day free trial with 500 messages and no card. After that, plans are billed through Shopify and priced by how many shopper messages the AI answers.",
  },
];

export function HomeFAQ() {
  return (
    <section className="bg-[var(--au-white)] py-[var(--au-section-y)] px-4 sm:px-6">
      <JsonLd data={faqJsonLd(FAQS)} />
      <div className="container mx-auto max-w-6xl grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div>
          <SectionHead title="Questions merchants ask us" />
          <p className="mt-4 text-muted-foreground">
            Something else?{" "}
            <a href="/contact/" className="font-semibold text-[color:var(--au-green-ink)] hover:text-[color:var(--au-ink)]">Talk to us</a>
          </p>
        </div>
        <div className="border-t border-border">
          {FAQS.map((f, i) => (
            <details key={f.question} className="group border-b border-border" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {f.question}
                <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="pb-6 pr-8 leading-relaxed text-muted-foreground">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */

export function FinalCTA() {
  // A laptop on a desk showing a store with the Aurevia widget open: the product working while you're away.
  // On desktop the copy sits on the dark green wall to the left; on phones the photo leads and the copy follows.
  return (
    <section className="px-4 sm:px-6 pb-[var(--au-section-y)]">
      <div className="container mx-auto max-w-6xl overflow-hidden rounded-[var(--au-r-xl)] bg-[#17241f] !p-0 relative lg:h-[560px]">
        <img
          src="/images/site/final-cta-bg.webp"
          alt="A laptop on a desk showing a store with the Aurevia chat open"
          loading="lazy"
          className="block h-[260px] w-full object-cover object-[80%_45%] sm:h-[340px] lg:absolute lg:inset-0 lg:h-full lg:object-[60%_50%]"
        />
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(14,24,20,0.7) 0%, rgba(14,24,20,0.35) 34%, rgba(14,24,20,0) 55%)",
          }}
          aria-hidden="true"
        />
        <div className="relative px-6 pb-12 pt-9 sm:px-12 sm:pb-16 lg:flex lg:h-full lg:max-w-[560px] lg:flex-col lg:justify-center lg:px-16 lg:py-0">
          <h2 className="au-h2 text-white">
            Put a salesperson on every page
          </h2>
          <p className="mt-5 max-w-md text-base sm:text-lg text-white">
            Try Aurevia free for 14 days. No card, and you can cancel from Shopify any time.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={SHOPIFY_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-full bg-[var(--au-green)] px-7 text-sm sm:text-base font-semibold text-white transition-colors hover:bg-[var(--au-green-hover)]"
            >
              Start free trial
            </a>
            <a
              href="/book-demo/"
              className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-full border border-[#747D79] bg-[#1f2725]/40 px-7 text-sm sm:text-base font-semibold text-[#F5F4F0] backdrop-blur-md transition-colors hover:border-[#9aa39f]"
            >
              Book a demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
