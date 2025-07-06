"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useStaggeredScrollFade } from "./ScrollAnimations";
import { ShoppingCart, Battery, DollarSign, BarChart2, Globe, HelpCircle } from "lucide-react";

const challenges = [
  {
    problem: "You Lose Too Many Carts",
    solution: "Up to 70% abandon checkout. Aurevia's AI recovers carts using real-time nudges and one-click links.",
    icon: ShoppingCart
  },
  {
    problem: "Your Replies Feel Off-Brand",
    solution: "Generic chatbot replies erode engagement. AI Scraping keeps every response on-brand: voice, tone, and avatar.",
    icon: Battery
  },
  {
    problem: "Your AOV Stagnates",
    solution: "No personalization, no upsells. Our sales agent boosts AOV with AI recommendations and up-sells — without discounts.",
    icon: DollarSign
  },
  {
    problem: "You're Flying Blind on Data",
    solution: "Aurevia shows where chats convert (or drop). Fix funnel leaks and scale with built-in insights.",
    icon: BarChart2
  },
  {
    problem: "You Miss Out on Global Customers",
    solution: "Multilingual AI chat handles time zones and language — allowing boundless traffic 24/7.",
    icon: Globe
  },
  {
    problem: "You Can't Answer Every Question",
    solution: '"Where\'s my order?" tickets pile up. Aurevia handles FAQs instantly so you can focus on growth, not desk work.',
    icon: HelpCircle
  },
];

export default function Challenges() {
  const containerRef = useStaggeredScrollFade(100);

  return (
    <section id="benefits" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-8 scroll-fade">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            Pain Points Solved
          </Badge>
        </div>
        
        <div className="text-center mb-16 scroll-fade">
          <h2 className="text-4xl md:text-5xl font-inter font-normal mb-6 text-white">
            Fixing the <span className="green-highlight">Real Challenges</span> Shopify Merchants Face
          </h2>
          <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            Lost carts. Support overload. Shopify pain points, handled by Aurevia.
          </p>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <Card
                key={index}
                className="challenge-card scroll-fade bg-transparent border border-border/50 hover:border-primary/30 transition-all duration-300 group"
              >
                <CardContent className="p-8 h-full flex flex-col relative">
                  <div className="mb-6">
                    <Icon className="challenge-icon w-6 h-6 text-muted-foreground group-hover:text-[#02DFA6] transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-inter font-normal text-white mb-4 group-hover:text-[#02DFA6] transition-colors duration-300">
                    {challenge.problem}
                  </h3>

                  <div className="flex-1">
                    <p className="text-base font-light text-muted-foreground leading-relaxed">
                      {challenge.solution}
                    </p>
                  </div>

                  <div className="card-hover-gradient"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
