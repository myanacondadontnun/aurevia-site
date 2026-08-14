"use client";

import { useState, useEffect, useRef } from "react";

interface Industry {
  title: string;
  icon: string;
  description: string;
  impactPoints: string[];
}

const industries: Industry[] = [
  {
    title: "Home & Decor",
    icon: "🛋️",
    description: "The AI Sales Agent guides shoppers through dimensions, styles, and material questions — while suggesting bundles that fit room aesthetics.",
    impactPoints: [
      "36% more checkouts on high-consideration items",
      "22% lift in add-to-cart rates for bundles",
      "40% reduction in post-purchase returns thanks to better upfront guidance",
      "Upsells matching decor with AI-powered room logic"
    ]
  },
  {
    title: "Fashion & Apparel",
    icon: "👗",
    description: "Chat about fit, fabric and outfit ideas. Aurevia upsells \"complete the look\" bundles and cuts costly returns.",
    impactPoints: [
      "18% higher average order value",
      "22% fewer size-related returns",
      "\"Complete-the-look\" bundles convert in chat",
      "Instant fit advice lowers pre-purchase tickets"
    ]
  },
  {
    title: "Beauty & Cosmetics",
    icon: "💄",
    description: "From undertone questions to ingredient lists, the bot recommends perfect shades and triggers subscription refills before bottles run dry.",
    impactPoints: [
      "31% boost in repeat-order revenue",
      "24/7 shade-match and ingredient help",
      "Auto-replenish nudges lift subscription rate",
      "Fewer returns thanks to accurate colour picks"
    ]
  },
  {
    title: "Food & Beverage",
    icon: "🍷",
    description: "Cross-sell wine with cheese, upsell gift hampers, and remind customers when their favourites run low.",
    impactPoints: [
      "23% jump in bundled hamper sales",
      "2× higher repeat-purchase frequency",
      "AI pairings raise AOV at checkout",
      "Expiry reminders minimise waste and churn"
    ]
  },
  {
    title: "Electronics & Gadgets",
    icon: "🔌",
    description: "Shoppers pit models side-by-side, get warranty add-ons, and see real-time stock alert, no human agent required.",
    impactPoints: [
      "29% more accessories sold per device",
      "12% drop in spec-question emails",
      "Warranty-upsell prompts raise add-on uptake",
      "Real-time stock alerts prevent lost sales"
    ]
  }
];

export default function IndustriesEnhanced() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  const getCardStyles = (position: string): React.CSSProperties => {
    const baseTransition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

    switch (position) {
      case 'center':
        return {
          transform: 'translateX(0px) scale(1) rotateY(0deg)',
          zIndex: 50,
          filter: 'blur(0px)',
          opacity: 1,
          width: 'min(320px, 80vw)',
          transition: baseTransition
        };
      case 'right':
        return {
          transform: 'translateX(min(100px, 22vw)) scale(0.88) rotateY(-12deg)',
          zIndex: 30,
          filter: 'blur(1px)',
          opacity: 0.8,
          width: 'min(280px, 70vw)',
          transition: baseTransition
        };
      case 'left':
        return {
          transform: 'translateX(max(-100px, -22vw)) scale(0.88) rotateY(12deg)',
          zIndex: 30,
          filter: 'blur(1px)',
          opacity: 0.8,
          width: 'min(280px, 70vw)',
          transition: baseTransition
        };
      case 'far-right':
        return {
          transform: 'translateX(min(180px, 38vw)) scale(0.75) rotateY(-25deg)',
          zIndex: 10,
          filter: 'blur(2px)',
          opacity: 0.6,
          width: 'min(260px, 65vw)',
          transition: baseTransition
        };
      case 'far-left':
        return {
          transform: 'translateX(max(-180px, -38vw)) scale(0.75) rotateY(25deg)',
          zIndex: 10,
          filter: 'blur(2px)',
          opacity: 0.6,
          width: 'min(260px, 65vw)',
          transition: baseTransition
        };
      default:
        return {};
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % industries.length);
      } else {
        setActiveIndex((prev) => (prev - 1 + industries.length) % industries.length);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-foreground">
      <section id="industries-enhanced" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" aria-label="Industry impact carousel">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              See how Aurevia boosts revenue from fashion, food and beyond
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-light text-muted-foreground max-w-3xl mx-auto">
              Real-time AI sales agent chat bot that adapts to any Shopify niche.
            </p>
          </div>

          <div
            className="relative max-w-7xl mx-auto overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            aria-live="polite"
          >
            <div className="relative h-[420px] sm:h-[460px] md:h-[500px] flex items-center justify-center" style={{ perspective: '1000px' }}>
              <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                {industries.map((industry, index) => {
                  const position = getCardPosition(index);
                  const isCenter = position === 'center';

                  return (
                    <div
                      key={industry.title}
                      onClick={() => setActiveIndex(index)}
                      role="button"
                      tabIndex={isCenter ? 0 : -1}
                      aria-label={`${industry.title}${isCenter ? ' (active)' : ' - click to view'}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveIndex(index);
                        }
                      }}
                      className="absolute cursor-pointer rounded-2xl overflow-hidden transition-all duration-700 ease-out"
                      style={{
                        ...getCardStyles(position),
                        height: 'min(420px, 65vh)'
                      }}
                    >
                      <div className="relative h-full w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-2xl border border-black/10 shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 rounded-2xl" aria-hidden="true" />

                        <div className="relative h-full p-4 sm:p-6 flex flex-col">
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-2xl sm:text-3xl opacity-90" aria-hidden="true">
                            {industry.icon}
                          </div>

                          <div className={`self-start mb-3 sm:mb-4 px-2.5 sm:px-3 py-1 rounded-full border transition-colors duration-300 ${
                            isCenter
                              ? "bg-white border-black/30 text-foreground backdrop-blur-sm"
                              : "bg-white border-black/20 text-foreground/70 backdrop-blur-sm"
                          }`}>
                            <span className="text-xs sm:text-sm font-medium">{industry.title}</span>
                          </div>

                          <p className={`text-sm sm:text-base leading-relaxed mb-3 flex-shrink-0 transition-colors duration-300 ${
                            isCenter ? "text-foreground" : "text-foreground/60"
                          }`}>
                            {industry.description}
                          </p>

                          {isCenter && (
                            <div className="flex-1 flex flex-col justify-end pb-2 sm:pb-4 animate-fade-in">
                              <div>
                                <h4 className="text-xs sm:text-sm font-normal mb-2 text-foreground/90">Impact:</h4>
                                <ul className="space-y-1 sm:space-y-1.5">
                                  {industry.impactPoints.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                                      <span className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 sm:mt-2 flex-shrink-0" aria-hidden="true" />
                                      <span className="text-foreground/90 font-light">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {!isCenter && (
                            <div className="flex-1 flex items-end pb-2 sm:pb-4">
                              <div className="w-full aspect-[3/2] bg-gradient-to-br from-black/10 via-black/5 to-transparent rounded-lg flex items-center justify-center border border-black/10 backdrop-blur-sm transition-opacity duration-300 opacity-60">
                                <div className="text-center text-foreground/60">
                                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-white rounded-lg flex items-center justify-center backdrop-blur-sm" aria-hidden="true">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded" />
                                  </div>
                                  <p className="text-xs sm:text-sm text-foreground/80">{industry.title} Demo</p>
                                  <p className="text-[10px] sm:text-xs mt-1 text-foreground/50">Click to explore</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-3" role="tablist" aria-label="Industry carousel navigation">
              {industries.map((industry, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to ${industry.title}`}
                  className="p-1.5"
                >
                  <span className={`block rounded-full transition-all duration-300 backdrop-blur-sm ${
                    index === activeIndex
                      ? 'w-6 h-3 bg-white shadow-lg'
                      : 'w-3 h-3 bg-white hover:bg-white'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    </div>
  );
}
