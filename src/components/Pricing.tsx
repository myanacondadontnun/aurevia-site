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
    name: "Pilot Plan",
    monthlyPrice: 59,
    annualPrice: 39,
    description: "Start intelligent, grow fast",
    features: [
      "Free 14-day Trial",
      "Seats Included = 1",
      "Max Seats Allowed = 3",
      "AI messages/mo = 2000",
      "Need more? One-click upgrade",
      "Extra AI message = £15/1000",
      "Every feature unlocked",
      "Analytics history = 3 months",
      '"Ask Aurevia" AI co-pilot = ✓',
      "Onboarding = Self Serve Documents",
      "Support = Email and Discord 10x5",
      "Uptime SLA = 99%",
    ],
    ctaText: "Start Free Trial",
    ctaVariant: "default" as const,
  },
  {
    name: "Revenue Suite",
    monthlyPrice: 99,
    annualPrice: 79,
    description: "Premium AI for accelerated revenue generation",
    features: [
      "Free 14-day Trial",
      "Seats Included = 3",
      "Max Seats Allowed = 25",
      "AI messages/mo = 5000",
      "Need more? One-click upgrade",
      "Extra AI message = £10/1000",
      "Every feature unlocked",
      "Analytics history = 12 months",
      '"Ask Aurevia" AI co-pilot = ✓',
      "Onboarding = 1-to-1 success calls",
      "Discord + Priority Email 24x7",
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-6 sm:mb-8 scroll-fade">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            Pricing
          </Badge>
        </div>
        
        <div className="text-center mb-12 sm:mb-16 scroll-fade">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-inter font-normal mb-4 sm:mb-6 text-white">
            We <span className="green-highlight">don't gatekeep</span> features
          </h2>
          <p className="text-lg sm:text-xl font-light text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8">
            Choose the plan based on your usage, seats and growth plan.
          </p>

          {/* Monthly/Annual Toggle */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            <span className={`font-medium text-sm sm:text-base ${!isAnnual ? "text-white" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`font-medium text-sm sm:text-base ${isAnnual ? "text-white" : "text-muted-foreground"}`}>
              Annually
            </span>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 text-xs sm:text-sm">
              Save ~30%
            </Badge>
          </div>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`scroll-fade relative border-border hover:border-primary/30 transition-all duration-300 ${
                plan.popular ? "border-primary/50 md:scale-105" : ""
              } ${plan.name === 'Revenue Suite' ? 'bg-black bg-[linear-gradient(135deg,_rgba(0,64,64,0.18)_0%,_rgba(0,128,128,0.12)_100%)]' : 'bg-card'}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 sm:px-4 py-1 text-xs sm:text-sm">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-3 sm:pb-4 pt-6 sm:pt-8">
                <h3 className="text-xl sm:text-2xl font-inter font-normal text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-3 sm:mb-4">
                  {typeof plan.monthlyPrice === "number" ? (
                    <>
                      <span className="text-3xl sm:text-4xl font-inter font-normal text-white">
                        £{isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-sm sm:text-base text-muted-foreground">/seat/month</span>
                    </>
                  ) : (
                    <span className="text-3xl sm:text-4xl font-inter font-normal text-white">
                      {plan.monthlyPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base font-light text-muted-foreground px-2 sm:px-0">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-3 sm:pt-4 px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-light text-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="cta-button w-full py-2.5 sm:py-3 flex items-center justify-center gap-2 text-white border-0 text-sm sm:text-base"
                  data-variant={plan.ctaVariant}
                  onClick={() => {
                    if (plan.ctaText === "Schedule a Call") {
                      scrollToSection("contact");
                    }
                  }}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 cta-arrow" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
