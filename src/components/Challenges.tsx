"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useGridStaggerFade } from "./ScrollAnimations";
import { ArrowRight, ShoppingCart, Check, Clock, Minus } from "lucide-react";

const challenges = [
  {
    problem: "You Watch Sales Slip Away at Checkout",
    teaser:
      "You did everything right — the ad worked, they browsed, they added to cart. Then they left...",
    full:
      " No reason. No goodbye. Just another abandoned cart notification you've learned to ignore. It stings every time, because you know that was a real person ready to buy.",
    visual: "cart" as const,
    link: "/resources/blogs/reduce-checkout-abandonment-shopify/",
  },
  {
    problem: "Your Average Order Won't Budge",
    teaser:
      "You keep running promos, slashing margins, hoping customers will add just one more item...",
    full:
      " They don't. Your AOV flatlines month after month while acquisition costs keep climbing. You're working harder to earn less on every single order.",
    visual: "aov" as const,
    link: "/resources/blogs/increase-aov-shopify-without-discounts/",
  },
  {
    problem: "You're Losing Customers You Never Even Reached",
    teaser:
      "Someone in Tokyo loved your product at 3am your time. They had a question. Nobody answered...",
    full:
      " They moved on. You'll never know they existed. Multiply that by every timezone, every language you don't speak — that's revenue you're silently leaving behind.",
    visual: "reach" as const,
    link: "/resources/blogs/24-7-ai-support-after-hours-sales/",
  },
];

/* Scene 1 — a checkout stepper that reaches Cart, then stalls one step short of
   Checkout and drifts back. Two steps already done (dark), the last still open. */
function CartVisual() {
  return (
    <div className="cv-stepper">
      <div className="cv-track-wrap">
        <div className="cv-track" />
        <div className="cv-track-fill" />
        <div className="cv-step" style={{ left: "8%" }} />
        <div className="cv-step" style={{ left: "50%" }} />
        <div className="cv-step cv-step--pending" style={{ left: "92%" }} />
        <div className="cv-ping" />
        <div className="cv-chip">
          <ShoppingCart aria-hidden="true" strokeWidth={2.25} />
        </div>
      </div>
      <div className="cv-labels">
        <span className="cv-label">Browse</span>
        <span className="cv-label">Cart</span>
        <span className="cv-label">Checkout</span>
      </div>
    </div>
  );
}

/* Scene 2 — an area chart that redraws itself on loop, always landing in the
   same low, flat band well under the dashed "target" line above it. */
function AOVVisual() {
  return (
    <>
      <svg viewBox="0 0 320 156" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="cvAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00CC99" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#00CC99" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="26" y1="52" x2="294" y2="52" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="3 5" strokeLinecap="round" />
        <path
          d="M26 96 Q70 88 108 93 T186 90 T264 86 L294 84 L294 132 L26 132 Z"
          fill="url(#cvAreaFill)"
        />
        <path
          className="cv-chart-line"
          d="M26 96 Q70 88 108 93 T186 90 T264 86 L294 84"
          fill="none"
          stroke="#00CC99"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="cv-chart-dot" cx="294" cy="84" r="4" fill="#00CC99" />
      </svg>
      <span className="cv-flat-badge">
        <Minus aria-hidden="true" strokeWidth={3} />
        Flat
      </span>
    </>
  );
}

/* Scene 3 — an outgoing message that never gets a reply: typing dots settle
   into a single "sent" checkmark, while a row of timezone chips takes turns
   lighting up — nobody's actually awake to answer. */
function ReachVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-between px-7 sm:px-8">
      <div className="cv-msg-bubble">
        <span className="cv-msg-dots">
          <span className="cv-msg-dot" />
          <span className="cv-msg-dot" />
          <span className="cv-msg-dot" />
        </span>
        <span className="cv-msg-sent">
          <Check aria-hidden="true" strokeWidth={2.5} />
        </span>
      </div>
      <div className="cv-tz-row">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="cv-tz-chip">
            <Clock aria-hidden="true" strokeWidth={2} />
          </span>
        ))}
      </div>
    </div>
  );
}

function ChallengeVisual({ variant }: { variant: "cart" | "aov" | "reach" }) {
  return (
    <div className="challenge-visual">
      {variant === "cart" && <CartVisual />}
      {variant === "aov" && <AOVVisual />}
      {variant === "reach" && <ReachVisual />}
    </div>
  );
}

function ChallengeCard({
  challenge,
}: {
  challenge: (typeof challenges)[number];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="challenge-card scroll-fade-lr bg-transparent border border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
      <Link
        href={challenge.link}
        aria-label={`Read the full guide: ${challenge.problem}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00CC99]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
      >
        <ChallengeVisual variant={challenge.visual} />
        <CardContent className="p-4 sm:p-8 h-full flex flex-col relative">
        <h3 className="text-lg sm:text-xl font-inter font-normal text-foreground mb-3 sm:mb-4 mt-4 sm:mt-6 group-hover:text-[#00CC99] transition-colors duration-300">
          {challenge.problem}
        </h3>

        <div className="flex-1">
          <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
            {challenge.teaser}
            {expanded && (
              <span className="animate-fade-in">{challenge.full}</span>
            )}
          </p>
          {!expanded && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setExpanded(true);
              }}
              aria-expanded={false}
              aria-label={`Read more about: ${challenge.problem}`}
              className="mt-2 text-sm text-[#00CC99]/80 hover:text-[#00CC99] transition-colors duration-200 font-medium"
            >
              Read more...
            </button>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 mt-5 text-xs text-foreground/30 group-hover:text-foreground/60 transition-colors duration-200 underline underline-offset-2 decoration-white/15 group-hover:decoration-white/40">
          Read the full guide
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </span>

        <div className="card-hover-gradient"></div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default function Challenges() {
  const containerRef = useGridStaggerFade(3, 120, 200);

  return (
    <section id="benefits" className="py-12 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-16 scroll-fade">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-fraunces font-normal mb-3 sm:mb-6 text-foreground">
            Sound Familiar? You&apos;re Not the{" "}
            <span className="green-highlight">Only One Struggling</span>
          </h2>
          <p className="text-sm sm:text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            You&apos;re not alone — and there&apos;s a way through.
          </p>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-7xl mx-auto"
        >
          {challenges.map((challenge, index) => (
            <ChallengeCard key={index} challenge={challenge} />
          ))}
        </div>
      </div>
    </section>
  );
}
