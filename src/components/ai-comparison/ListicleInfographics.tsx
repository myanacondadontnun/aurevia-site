import type { ReactNode } from "react";
import Link from "next/link";
import {
  BarChart3,
  Brain,
  Clock,
  GitBranch,
  HandCoins,
  MessageCircle,
  Package,
  RefreshCw,
  ShoppingCart,
  Sparkles,
  UserRound,
  Wallet,
} from "lucide-react";

/** Hero-style illustration: Shopify bag + orbit — no external image */
export function ListicleHeroVisual() {
  return (
    <figure className="mx-auto mt-10 max-w-2xl">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-[#0b3c2f]/40 via-card to-background p-8 shadow-inner">
        <div className="pointer-events-none absolute inset-0 opacity-[0.15]">
          <svg className="h-full w-full" viewBox="0 0 400 250" fill="none" aria-hidden>
            <circle cx="200" cy="125" r="90" stroke="#00CC99" strokeWidth="1" strokeDasharray="6 8" />
            <circle cx="200" cy="125" r="120" stroke="#00CC99" strokeWidth="0.5" strokeDasharray="4 10" />
          </svg>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[#00CC99]/30 bg-[#00CC99]/10 shadow-[0_0_40px_-8px_rgba(0,204,153,0.5)]">
            <ShoppingCart className="h-10 w-10 text-[#00CC99]" strokeWidth={1.25} />
          </div>
          <p className="max-w-sm text-center text-sm font-light text-muted-foreground">
            AI connects catalog, orders, and checkout — not just a chat bubble on top of your theme.
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs font-light text-muted-foreground/90">
        Concept diagram: conversational layer wired into Shopify data and the purchase path.
      </figcaption>
    </figure>
  );
}

const capabilityNodes = [
  { label: "Answer product & policy questions", Icon: MessageCircle },
  { label: "Recommend & bundle with live inventory", Icon: Package },
  { label: "Collapse cart hesitation in-session", Icon: Sparkles },
  { label: "Track orders & surface shipping context", Icon: RefreshCw },
  { label: "Capture leads without killing conversion", Icon: UserRound },
];

export function InfographicCapabilities() {
  return (
    <figure className="my-10">
      <div className="rounded-2xl border border-[#00CC99]/20 bg-gradient-to-br from-[#00CC99]/[0.07] via-card/60 to-background p-6 sm:p-8">
        <div className="mx-auto grid max-w-lg gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex flex-col items-center justify-center sm:row-span-2">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#00CC99]/40 bg-[#00CC99]/10">
              <Brain className="h-11 w-11 text-[#00CC99]" strokeWidth={1.1} />
            </div>
            <p className="mt-3 text-center text-xs font-medium uppercase tracking-wider text-[#00CC99]/90">
              Sales-grade AI
            </p>
          </div>
          <ul className="space-y-3 sm:col-start-2">
            {capabilityNodes.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-start gap-3 rounded-xl border border-black/8 bg-black/20 px-3 py-2.5"
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#00CC99]" />
                <span className="text-sm font-light leading-snug text-muted-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs font-light text-muted-foreground">
        Infographic: a capable Shopify AI agent routes questions, catalog, and checkout momentum — not generic
        deflection only.
      </figcaption>
    </figure>
  );
}

const benefits: {
  title: string;
  body: ReactNode;
  Icon: typeof Clock;
}[] = [
  {
    title: "24/7 coverage without payroll creep",
    body: "Paid traffic and international shoppers meet the same assistant at 2am as at 2pm — critical when CAC is high.",
    Icon: Clock,
  },
  {
    title: "Lift conversion & AOV",
    body: (
      <>
        Proactive nudges, bundles, and threshold messaging turn hesitation into completed orders — see our{" "}
        <Link
          href="/resources/blogs/increase-aov-shopify-without-discounts/"
          className="text-sky-400 underline decoration-sky-400/40 underline-offset-2 hover:text-[#00CC99] hover:decoration-[#00CC99]"
        >
          AOV without discounts
        </Link>{" "}
        guide.
      </>
    ),
    Icon: BarChart3,
  },
  {
    title: "Free your humans for hard cases",
    body: "Let automation own repetitive pre-purchase questions so agents handle empathy-heavy logistics.",
    Icon: UserRound,
  },
  {
    title: "Personalized discovery at scale",
    body: "Signals like dwell, scroll depth, and cart value inform what the assistant says next — not one script for everyone.",
    Icon: Sparkles,
  },
];

export function InfographicBenefits() {
  return (
    <figure className="my-10">
      <div className="grid gap-3 sm:grid-cols-2">
        {benefits.map(({ title, body, Icon }) => (
          <div
            key={title}
            className="flex gap-4 rounded-xl border border-border/50 bg-card/40 p-4 transition-colors hover:border-[#00CC99]/25"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#00CC99]/10 text-[#00CC99]">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">{title}</h4>
              <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs font-light text-muted-foreground">
        Infographic-style summary: why revenue-focused stores add AI now — not only to answer FAQs faster.
      </figcaption>
    </figure>
  );
}

const methodologySteps = [
  {
    step: "1",
    title: "Shopify depth",
    detail: "Catalog, orders, inventory, and price rules — not a pasted FAQ.",
    Icon: ShoppingCart,
  },
  {
    step: "2",
    title: "Trainable & on-brand",
    detail: "Grounded answers with guardrails; avoids generic widget tone.",
    Icon: Brain,
  },
  {
    step: "3",
    title: "Fast, no-code setup",
    detail: "Minutes to first value; no engineering sprint to ship.",
    Icon: GitBranch,
  },
  {
    step: "4",
    title: "Predictable pricing",
    detail: "Flat tiers vs surprise per-resolution or per-conversation spikes.",
    Icon: Wallet,
  },
  {
    step: "5",
    title: "Human handoff when needed",
    detail: "Clean escalation path for edge cases and VIPs.",
    Icon: HandCoins,
  },
];

export function InfographicMethodology() {
  return (
    <figure className="my-10">
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/30 via-card/50 to-background p-5 sm:p-7">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300/90">
          How we evaluated tools
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          {methodologySteps.map(({ step, title, detail, Icon }) => (
            <div
              key={step}
              className="flex w-full flex-col items-center rounded-xl border border-violet-400/25 bg-black/30 px-3 py-4 text-center sm:w-[calc(33.333%-0.5rem)] sm:min-w-[140px] lg:w-[calc(20%-0.4rem)]"
            >
              <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/15 text-sm font-medium text-violet-200">
                {step}
              </span>
              <Icon className="mb-2 h-5 w-5 text-violet-300" />
              <h4 className="text-xs font-medium text-foreground">{title}</h4>
              <p className="mt-1 text-[11px] font-light leading-snug text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs font-light text-muted-foreground">
        Flow-style infographic: five gates every vendor in this listicle was scored against.
      </figcaption>
    </figure>
  );
}
