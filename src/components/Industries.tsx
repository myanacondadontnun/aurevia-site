"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface Industry {
  title: string;
  image: string;
  impactPoints: string[];
}

const industries: Industry[] = [
  {
    title: "Home & Decor",
    image: "/images/home-decor.jpg",
    impactPoints: [
      "36% more checkouts on high-consideration items",
      "22% lift in add-to-cart rates for bundles",
      "40% fewer returns via guided shopping"
    ]
  },
  {
    title: "Fashion & Apparel",
    image: "/images/fashion.jpg.jpg",
    impactPoints: [
      "18% higher average order value",
      "22% fewer size-related returns",
      "\"Complete-the-look\" bundles convert in chat"
    ]
  },
  {
    title: "Beauty & Cosmetics",
    image: "/images/beauty.jpg.jpg",
    impactPoints: [
      "31% boost in repeat-order revenue",
      "24/7 shade-match and ingredient help",
      "Fewer returns via accurate colour picks"
    ]
  },
  {
    title: "Food & Beverage",
    image: "/images/food.jpg.jpg",
    impactPoints: [
      "23% jump in bundled hamper sales",
      "2× higher repeat-purchase frequency",
      "AI pairings raise AOV at checkout"
    ]
  },
  {
    title: "Electronics & Gadgets",
    image: "/images/electronics.jpg",
    impactPoints: [
      "29% more accessories sold per device",
      "12% drop in spec-question emails",
      "Warranty-upsell prompts increase uptake"
    ]
  }
];

export default function Industries() {

  // Only consider visible cards (not hidden ones)
  const visibleIndustries = industries.filter(
    (industry) => industry.title !== "Home & Decor" && industry.title !== "Electronics & Gadgets"
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visibleIndustries.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [visibleIndustries.length]);

  const getCardPosition = (cardIndex: number) => {
    // For 3 cards: 0=center, 1=right, 2=left (rotating)
    const diff = (cardIndex - activeIndex + visibleIndustries.length) % visibleIndustries.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === 2) return 'left';
    return 'center';
  };

  const getCardStyles = (position: string) => {
    const transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    switch (position) {
      case 'center':
        return { transform: 'translateX(0px) scale(1)', zIndex: 50, filter: 'blur(0)', opacity: 1, width: '400px', height: '400px', transition };
      case 'right':
        return { transform: 'translateX(260px) scale(0.88)', zIndex: 30, filter: 'blur(3px)', opacity: 0.7, width: '400px', height: '400px', transition };
      case 'left':
        return { transform: 'translateX(-260px) scale(0.88)', zIndex: 30, filter: 'blur(3px)', opacity: 0.7, width: '400px', height: '400px', transition };
      case 'far-right':
        return { transform: 'translateX(520px) scale(0.75)', zIndex: 10, filter: 'blur(10px)', opacity: 0.4, width: '400px', height: '400px', transition };
      case 'far-left':
        return { transform: 'translateX(-520px) scale(0.75)', zIndex: 10, filter: 'blur(10px)', opacity: 0.4, width: '400px', height: '400px', transition };
      default:
        return {};
    }
  };

  return (
    <div className="min-h-screen text-white font-inter" style={{backgroundColor: '#080808'}}>
      <section id="industries" className="py-24 px-6" style={{backgroundColor: '#080808'}}>
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              Build for DTC, Across every Aisle
            </Badge>
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-normal mb-6 text-white">
              See how Aurevia <span className="green-highlight">boosts revenue</span> across industries
            </h2>
            <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto">
              Real-time AI sales agent that adapts to your niche.
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto overflow-visible">
            <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: '1000px' }}>
              <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
                {visibleIndustries.map((industry, index) => {
                  const position = getCardPosition(index);
                  return (
                    <div
                      key={industry.title}
                      onClick={() => setActiveIndex(index)}
                      className="absolute cursor-pointer rounded-2xl overflow-hidden transition-all duration-700 ease-out shadow-2xl border border-white/10"
                      style={{
                        ...getCardStyles(position),
                        backgroundImage: `url(${industry.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      {/* Floating pill header */}
                      <div className="absolute top-4 left-4 px-4 py-1 rounded-full bg-[radial-gradient(ellipse_at_bottom,_#024d3f_0%,_#000000_100%)] bg-opacity-90 backdrop-blur-sm text-white text-sm border border-white/20 shadow-md">
                        {industry.title}
                      </div>
                      {/* Impact section with new look */}
                      <div className="absolute bottom-0 w-full p-4 border-t border-white/10 rounded-b-2xl bg-[radial-gradient(ellipse_at_bottom,_#024d3f_0%,_#000000_100%)] bg-opacity-90 backdrop-blur-sm">
                        <ul className="space-y-1 text-white text-sm">
                          {industry.impactPoints.map((point, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="w-1.5 h-1.5 bg-white rounded-full mt-2" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-8 gap-3">
              {visibleIndustries.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`${index === activeIndex ? 'w-6 h-3 bg-white shadow-lg' : 'w-3 h-3 bg-white/30 hover:bg-white/50'} rounded-full transition-all duration-300 backdrop-blur-sm`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
