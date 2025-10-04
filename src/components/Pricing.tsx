"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, ArrowRight } from "lucide-react";
import { useStaggeredScrollFade } from "./ScrollAnimations";
import { openShopifyInstall } from "@/lib/utils";

// Exchange rate: 1 USD = 0.746992 GBP
const USD_TO_GBP_RATE = 0.746992;

const pricingPlans = [
  {
    name: "Starter Kit",
    monthlyPrice: 20,
    annualPrice: 200,
    yearlyDescription: "and save 17%",
    description: "Perfect for small businesses getting started",
    features: [
      "AI replies/mo = 500",
      "Max Seats Allowed = 1",
      "Analytics History = 3 months",
      "Knowledge Base = 25 documents",
      "Products = 200 max",
      '"Ask Aurevia" AI co-pilot = ✓',
      "No Visitor Cap",
      "Onboarding = Self Guided",
    ],
    ctaText: "Install from Shopify",
    ctaVariant: "default" as const,
  },
  {
    name: "Pilot Plan",
    monthlyPrice: 59,
    annualPrice: 590,
    yearlyDescription: "and save 17%",
    description: "Start intelligent, grow fast",
    features: [
      "AI replies/mo = 2000",
      "Downloadable leads for marketing",
      "Analytics history = 3 months",
      '"Ask Aurevia" AI co-pilot = ✓',
      "Onboarding = 1-to-1 with founders",
      "No Visitor Cap",
      "Add Unlimited Product and Knowledge",
      "Max Seats Allowed = 3",
      "14-day free trial",
    ],
    ctaText: "Install from Shopify",
    ctaVariant: "default" as const,
  },
  {
    name: "Revenue Suite",
    monthlyPrice: 99,
    annualPrice: 990,
    yearlyDescription: "and save 17%",
    description: "Premium AI for accelerated revenue generation",
    features: [
      "AI replies/mo = 5000",
      "Downloadable leads for marketing",
      "Analytics history = 12 months",
      '"Ask Aurevia" AI co-pilot = ✓',
      "Onboarding = 1-to-1 with founders",
      "No Visitor Cap",
      "Max Seats Allowed = 25",
      "Unlimited Products and Knowledge Base",
      "14-day free trial",
    ],
    ctaText: "Install from Shopify",
    ctaVariant: "default" as const,
    popular: true,
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'GBP'>('USD');
  const containerRef = useStaggeredScrollFade(150);

  const convertPrice = (usdPrice: number | string): string => {
    if (typeof usdPrice === 'string') return usdPrice;
    if (currency === 'GBP') {
      return Math.round(usdPrice * USD_TO_GBP_RATE).toString();
    }
    return usdPrice.toString();
  };

  const getCurrencySymbol = () => currency === 'GBP' ? '£' : '$';

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

          {/* Currency Toggle */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'GBP' : 'USD')}
              className="px-4 py-2 text-sm font-medium text-white bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {currency === 'USD' ? 'USD ($)' : 'GBP (£)'}
            </button>
          </div>

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
                    <div className="space-y-1">
                      <div>
                        <span className="text-3xl sm:text-4xl font-inter font-normal text-white">
                          {getCurrencySymbol()}{convertPrice(isAnnual ? plan.annualPrice : plan.monthlyPrice)}
                        </span>
                        <span className="text-sm sm:text-base text-muted-foreground">
                          {isAnnual ? "/year" : "/month"}
                        </span>
                      </div>
                      {!isAnnual && typeof plan.annualPrice === "number" && (
                        <div className="text-xs sm:text-sm text-muted-foreground">
                          or {getCurrencySymbol()}{convertPrice(plan.annualPrice)}/year and save 17%
                        </div>
                      )}
                    </div>
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
                  onClick={() => openShopifyInstall()}
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
