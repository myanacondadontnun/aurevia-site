"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useGridStaggerFade } from "./ScrollAnimations";
import {
  ShoppingCart,
  Palette,
  DollarSign,
  BarChart2,
  Globe,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const challenges = [
  {
    problem: "You Watch Sales Slip Away at Checkout",
    teaser:
      "You did everything right — the ad worked, they browsed, they added to cart. Then they left...",
    full:
      " No reason. No goodbye. Just another abandoned cart notification you've learned to ignore. It stings every time, because you know that was a real person ready to buy.",
    icon: ShoppingCart,
    link: "/resources/blogs/reduce-checkout-abandonment-shopify/",
  },
  {
    problem: "Your Chatbot Sounds Nothing Like You",
    teaser:
      "You spent years building a brand voice your customers love. Then your chatbot replies and...",
    full:
      " it feels like a stranger hijacked your store. So robotic, so generic. Customers notice. They disengage. And you're left wondering if automation is even worth it.",
    icon: Palette,
    link: "/resources/blogs/chatbot-brand-voice/",
  },
  {
    problem: "Your Average Order Won't Budge",
    teaser:
      "You keep running promos, slashing margins, hoping customers will add just one more item...",
    full:
      " They don't. Your AOV flatlines month after month while acquisition costs keep climbing. You're working harder to earn less on every single order.",
    icon: DollarSign,
    link: "/resources/blogs/increase-aov-shopify-without-discounts/",
  },
  {
    problem: "You're Making Decisions in the Dark",
    teaser:
      "You know customers are chatting, clicking, browsing — but you have no idea where they drop off...",
    full:
      " Your gut says something's broken, but the data isn't there. So you guess. And guessing at this stage costs real money.",
    icon: BarChart2,
    link: "/resources/blogs/shopify-ecommerce-funnel-analytics/",
  },
  {
    problem: "You're Losing Customers You Never Even Reached",
    teaser:
      "Someone in Tokyo loved your product at 3am your time. They had a question. Nobody answered...",
    full:
      " They moved on. You'll never know they existed. Multiply that by every timezone, every language you don't speak — that's revenue you're silently leaving behind.",
    icon: Globe,
    link: "/resources/blogs/24-7-ai-support-after-hours-sales/",
  },
  {
    problem: "You're Drowning in the Same Questions",
    teaser:
      "\"Where's my order?\" — for the 47th time today. You started this business to build something meaningful...",
    full:
      " not to copy-paste tracking links. But every hour you spend on repetitive tickets is an hour stolen from the work that actually grows your store.",
    icon: HelpCircle,
    link: "/resources/blogs/reduce-repetitive-support-questions-shopify/",
  },
];

function ChallengeCard({
  challenge,
}: {
  challenge: (typeof challenges)[number];
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = challenge.icon;

  return (
    <Card className="challenge-card scroll-fade-lr bg-transparent border border-border/50 hover:border-primary/30 transition-all duration-300 group">
      <Link
        href={challenge.link}
        aria-label={`Read the full guide: ${challenge.problem}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#02DFA6]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
      >
        <CardContent className="p-4 sm:p-8 h-full flex flex-col relative">
        <div className="mb-3 sm:mb-6">
          <Icon className="challenge-icon w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-[#02DFA6] transition-colors duration-300" aria-hidden="true" />
        </div>
        <h3 className="text-lg sm:text-xl font-inter font-normal text-white mb-3 sm:mb-4 group-hover:text-[#02DFA6] transition-colors duration-300">
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
              className="mt-2 text-sm text-[#02DFA6]/80 hover:text-[#02DFA6] transition-colors duration-200 font-medium"
            >
              Read more...
            </button>
          )}
        </div>

        <span className="inline-flex items-center gap-1.5 mt-5 text-xs text-white/30 group-hover:text-white/60 transition-colors duration-200 underline underline-offset-2 decoration-white/15 group-hover:decoration-white/40">
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
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-inter font-normal mb-3 sm:mb-6 text-white">
            Sound Familiar? You&apos;re Not the{" "}
            <span className="green-highlight">Only One Struggling</span>
          </h2>
          <p className="text-sm sm:text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            You&apos;re not alone — and there&apos;s a way through.
          </p>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-7xl mx-auto"
        >
          {challenges.map((challenge, index) => (
            <ChallengeCard key={index} challenge={challenge} />
          ))}
        </div>
      </div>
    </section>
  );
}
