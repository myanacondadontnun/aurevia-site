"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, ArrowRight } from "lucide-react";
import { useStaggeredScrollFade } from "./ScrollAnimations";

const pricingPlans = [
  {
    name: "Starter Kit",
    monthlyPrice: 39,
    annualPrice: 27,
    description: "You're ready to do this right from day one.",
    features: [
      "Free 14-day Trial",
      "Seats = 1",
      "Max Seats = 5",
      "AI messages/seat/mo = 3000",
      "Extra AI message = $5 / 1000",
      "Analytics history = 3 months",
      "Ask Aurevia AI co-pilot ✅",
      "Onboarding = Self Serve Docs",
      "Support = Email + Discord 10×5",
      "Uptime SLA = 99%",
    ],
    ctaText: "Start Free Trial",
    ctaVariant: "default" as const,
  },
  {
    name: "Revenue Suite",
    monthlyPrice: 79,
    annualPrice: 55,
    description: "You're growing fast and it's time your store kept up.",
    features: [
      "Free 14-day Trial",
      "Seats = 3",
      "Max = 25",
      "AI messages/seat/mo = 10000",
      "Extra AI message = $4 / 1000",
      "Analytics = 12 months",
      "Onboarding = 1-to-1 success calls",
      "Support = Discord + Priority Email 24×7",
      "Uptime SLA = 99.5%",
    ],
    ctaText: "Start Free Trial",
    ctaVariant: "default" as const,
    popular: true,
  },
  {
    name: "Commerce OS",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    description: "You have built the brands. Let us build your entire AI sales process.",
    features: [
      "Unlimited seats & usage",
      "All-in rollout & management",
      "Dedicated success squad",
      "Custom integrations",
      "Quarterly ROI reviews",
    ],
    ctaText: "Schedule a Call",
    ctaVariant: "outline" as const,
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const containerRef = useStaggeredScrollFade(150);

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 scroll-fade">
          <h2 className="gradient-text text-4xl md:text-5xl font-inter font-normal mb-6">
            We don't gatekeep features
          </h2>
          <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the plan based on your usage, seats and growth plan.
          </p>

          {/* Monthly/Annual Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`font-medium ${!isAnnual ? "text-white" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`font-medium ${isAnnual ? "text-white" : "text-muted-foreground"}`}>
              Annually
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Save ~30%
              </Badge>
            )}
          </div>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`scroll-fade relative bg-card border-border hover:border-primary/30 transition-all duration-300 ${
                plan.popular ? "border-primary/50 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-inter font-normal text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  {typeof plan.monthlyPrice === "number" ? (
                    <>
                      <span className="text-4xl font-inter font-normal text-white">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">/seat/month</span>
                    </>
                  ) : (
                    <span className="text-4xl font-inter font-normal text-white">
                      {plan.monthlyPrice}
                    </span>
                  )}
                </div>
                <p className="text-base font-light text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-light text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="cta-button w-full py-3 flex items-center justify-center gap-2 text-white border-0"
                  data-variant={plan.ctaVariant}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-4 h-4 cta-arrow" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
