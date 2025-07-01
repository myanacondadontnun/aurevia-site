"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import { useScrollFade } from "./ScrollAnimations";

const benefits = [
  "Full access to all features, no card, for 60 days",
  "Keep 100% of the sales you make",
  "Direct access to founders for live support and feature requests",
  "A permanent discount if you decide to stay post-launch",
];

export default function BetaTester() {
  const cardRef = useScrollFade();

  return (
    <section id="beta" className="py-24 px-6">
      <div className="container mx-auto">
        <Card
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className="scroll-fade bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-primary/20 max-w-4xl mx-auto"
        >
          <CardContent className="p-12 text-center">
            <div>
              <h2 className="gradient-text text-3xl md:text-4xl font-inter font-normal mb-6">
                Become a Beta Tester. Get Aurevia Free
              </h2>

              <p className="text-lg font-light text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                We're inviting a select group of forward-thinking Shopify merchants to test
                Aurevia in real conditions and shape what comes next. It's not about who's
                first — it's about who fits.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-inter font-normal mb-6 text-white">
                  What You Get:
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center gap-3 text-foreground"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-lg font-light">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                className="cta-button text-white font-medium px-8 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto border-0"
              >
                Let's Get To Know You
                <ArrowRight className="w-5 h-5 cta-arrow" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
