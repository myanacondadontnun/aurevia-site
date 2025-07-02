"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollFade } from "./ScrollAnimations";

interface Industry {
  title: string;
  description: string;
  impactPoints: string[];
}

const industries: Industry[] = [
  {
    title: "Home & Decor",
    description:
      "The AI Sales Agent guides shoppers through dimensions, styles, and material questions — while suggesting bundles that fit room aesthetics.",
    impactPoints: [
      "36% more checkouts on high-consideration items",
      "22% lift in add-to-cart rates for bundles",
      "40% reduction in post-purchase returns thanks to better upfront guidance",
      "Upsells matching decor with AI-powered room logic"
    ]
  },
  {
    title: "Fashion & Apparel",
    description:
      "Chat about fit, fabric and outfit ideas. Aurevia upsells \"complete the look\" bundles and cuts costly returns.",
    impactPoints: [
      "18% higher average order value",
      "22% fewer size-related returns",
      "\"Complete-the-look\" bundles convert in chat",
      "Instant fit advice lowers pre-purchase tickets"
    ]
  },
  {
    title: "Beauty & Cosmetics",
    description:
      "From undertone questions to ingredient lists, the bot recommends perfect shades and triggers subscription refills before bottles run dry.",
    impactPoints: [
      "31% boost in repeat-order revenue",
      "24/7 shade-match and ingredient help",
      "Auto-replenish nudges lift subscription rate",
      "Fewer returns thanks to accurate colour picks"
    ]
  },
  {
    title: "Food & Beverage",
    description:
      "Cross-sell wine with cheese, upsell gift hampers, and remind customers when their favourites run low.",
    impactPoints: [
      "23% jump in bundled hamper sales",
      "2× higher repeat-purchase frequency",
      "AI pairings raise AOV at checkout",
      "Expiry reminders minimise waste and churn"
    ]
  },
  {
    title: "Electronics & Gadgets",
    description:
      "Shoppers pit models side-by-side, get warranty add-ons, and see real-time stock alert, no human agent required.",
    impactPoints: [
      "29% more accessories sold per device",
      "12% drop in spec-question emails",
      "Warranty-upsell prompts raise add-on uptake",
      "Real-time stock alerts prevent lost sales"
    ]
  }
];

const gradientClasses = [
  "from-black to-[#0E2F21]",
  "from-black to-[#1B1F1A]",
  "from-black to-[#0B3C40]",
  "from-black to-[#2E2C26]",
  "from-black to-[#1F2A23]"
];

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const getCardPosition = (cardIndex: number) => {
    const diff = (cardIndex - activeIndex + industries.length) % industries.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === 2) return 'far-right';
    if (diff === 3) return 'far-left';
    if (diff === 4) return 'left';
    return 'center';
  };

  const getCardStyles = (position: string) => {
    const baseTransition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    switch (position) {
      case 'center':
        return {
          transform: 'translateX(0px) scale(1)',
          zIndex: 50,
          filter: 'blur(0px)',
          opacity: 1,
          width: '320px',
          transition: baseTransition
        };
      case 'right':
        return {
          transform: 'translateX(240px) scale(0.88)',
          zIndex: 30,
          filter: 'blur(1px)',
          opacity: 0.8,
          width: '280px',
          transition: baseTransition
        };
      case 'left':
        return {
          transform: 'translateX(-240px) scale(0.88)',
          zIndex: 30,
          filter: 'blur(1px)',
          opacity: 0.8,
          width: '280px',
          transition: baseTransition
        };
      case 'far-right':
        return {
          transform: 'translateX(480px) scale(0.75)',
          zIndex: 10,
          filter: 'blur(2px)',
          opacity: 0.6,
          width: '260px',
          transition: baseTransition
        };
      case 'far-left':
        return {
          transform: 'translateX(-480px) scale(0.75)',
          zIndex: 10,
          filter: 'blur(2px)',
          opacity: 0.6,
          width: '260px',
          transition: baseTransition
        };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <section id="industries" className="py-24 px-6 bg-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="gradient-text text-4xl md:text-5xl font-normal mb-6">
              See how Aurevia boosts revenue from fashion, food and beyond
            </h2>
            <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto">
              Real-time AI sales agent chat bot that adapts to any Shopify niche.
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto overflow-visible">
            <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: '1000px' }}>
              <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
                {industries.map((industry, index) => {
                  const position = getCardPosition(index);
                  const isCenter = position === 'center';
                  // Dynamically set font size based on number of impact points
                  const minFont = 14; // px
                  const maxFont = 20; // px
                  const minHeader = 15; // px
                  const maxHeader = 22; // px
                  const minPoints = 2;
                  const maxPoints = Math.max(...industries.map(i => i.impactPoints.length));
                  const points = industry.impactPoints.length;
                  // Linear interpolation for font size
                  const bulletFontSize = maxFont - ((points - minPoints) / (maxPoints - minPoints)) * (maxFont - minFont);
                  const headerFontSize = maxHeader - ((points - minPoints) / (maxPoints - minPoints)) * (maxHeader - minHeader);
                  return (
                    <div
                      key={industry.title}
                      onClick={() => setActiveIndex(index)}
                      className="absolute cursor-pointer rounded-2xl overflow-hidden transition-all duration-700 ease-out"
                      style={{ ...getCardStyles(position), height: '500px' }}
                    >
                      <div className={`relative h-full w-full bg-gradient-to-br ${gradientClasses[index]} rounded-2xl border border-white/10 shadow-2xl`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5 rounded-2xl" />
                        <div className="relative h-full p-6 flex flex-col">
                          <div className="self-start mb-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 shadow-sm">
                            {industry.title}
                          </div>
                          <p className="text-base leading-relaxed mb-3 text-white/60">{industry.description}</p>

                          <div className="flex-1 flex flex-col justify-start rounded-lg p-4 border border-white/10 backdrop-blur-md bg-white/10" style={{ height: 220 }}>
                            <h4 className="font-semibold mb-2 text-white/90" style={{ fontSize: headerFontSize }}>{'Impact:'}</h4>
                            <ul className="flex-1 flex flex-col justify-start space-y-1.5">
                              {industry.impactPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2 font-light text-sm" style={{ fontSize: bulletFontSize }}>
                                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-white/90">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center mt-8 gap-3">
              {industries.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`${index===activeIndex?'w-6 h-3 bg-white shadow-lg':'w-3 h-3 bg-white/30 hover:bg-white/50'} rounded-full transition-all duration-300 backdrop-blur-sm`} />
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </section>
    </div>
  );
}
