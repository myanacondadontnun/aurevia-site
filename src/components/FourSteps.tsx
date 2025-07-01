"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useStaggeredScrollFade } from "./ScrollAnimations";

const steps = [
  {
    number: "1",
    title: "Install Aurevia from the Shopify App Store",
    description:
      "One-click install. No scripts, no theme edits. Aurevia auto-syncs your products, discounts, and branding.",
  },
  {
    number: "2",
    title: "Set tone, colours and business rules",
    description:
      "Make chatbot of your own brand — upload name/logo, choose tone-of-voice and set rules. Live preview updates instantly.",
  },
  {
    number: "3",
    title: "Feed Knowledge, Get Smarter",
    description:
      "Drop FAQs, product docs, and brand guidelines. Answers stay on-brand, technical questions vanish.",
  },
  {
    number: "4",
    title: "Start Converting, 24/7",
    description:
      "Aurevia launches on your storefront, answering, upselling, and recovering carts. See real-time revenue in the dashboard.",
  },
];

export default function FourSteps() {
  const containerRef = useStaggeredScrollFade(150);

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 scroll-fade">
          <h2 className="gradient-text text-4xl md:text-5xl font-inter font-normal mb-4">
            From Install → Revenue
          </h2>
          <h3 className="text-2xl md:text-3xl font-inter font-normal mb-6 text-primary">
            4 Simple Steps
          </h3>
          <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            No code, no dev hours. Just one click and Aurevia starts selling for you.
          </p>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {steps.map((step, index) => (
            <Card
              key={step.number}
              className="scroll-fade bg-card border-border overflow-hidden group hover:border-primary/30 transition-all duration-300"
            >
              <CardContent className="p-8">
                {/* Step Number & Graphic Placeholder */}
                <div className="mb-6">
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/30 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-inter font-medium text-primary">
                          {step.number}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Step {step.number} Visual</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-inter font-normal text-white leading-tight">
                    Step {step.number}: {step.title}
                  </h3>
                  <p className="text-base font-light text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
