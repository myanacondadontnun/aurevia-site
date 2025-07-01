import { useState, useEffect } from "react";

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

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Calculate position relative to center with proper stacking
  const getCardPosition = (cardIndex: number) => {
    const diff = (cardIndex - activeIndex + industries.length) % industries.length;
    
    // Map positions: 0=center, 1=right, 2=far-right, 3=far-left, 4=left
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
          transform: 'translateX(0px) scale(1) rotateY(0deg)',
          zIndex: 50,
          filter: 'blur(0px)',
          opacity: 1,
          width: '320px',
          transition: baseTransition
        };
      case 'right':
        return {
          transform: 'translateX(100px) scale(0.88) rotateY(-12deg)',
          zIndex: 30,
          filter: 'blur(1px)',
          opacity: 0.8,
          width: '280px',
          transition: baseTransition
        };
      case 'left':
        return {
          transform: 'translateX(-100px) scale(0.88) rotateY(12deg)',
          zIndex: 30,
          filter: 'blur(1px)',
          opacity: 0.8,
          width: '280px',
          transition: baseTransition
        };
      case 'far-right':
        return {
          transform: 'translateX(180px) scale(0.75) rotateY(-25deg)',
          zIndex: 10,
          filter: 'blur(2px)',
          opacity: 0.6,
          width: '260px',
          transition: baseTransition
        };
      case 'far-left':
        return {
          transform: 'translateX(-180px) scale(0.75) rotateY(25deg)',
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
    <div className="min-h-screen bg-gray-900 text-white">
      <section id="industries" className="py-24 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              See how Aurevia boosts revenue from fashion, food and beyond
            </h2>
            <p className="text-xl font-light text-gray-400 max-w-3xl mx-auto">
              Real-time AI sales agent chat bot that adapts to any Shopify niche.
            </p>
          </div>

          {/* 3D Carousel Container */}
          <div className="relative max-w-7xl mx-auto overflow-hidden">
            <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: '1000px' }}>
              <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                {industries.map((industry, index) => {
                  const position = getCardPosition(index);
                  const isCenter = position === 'center';
                  
                  return (
                    <div
                      key={industry.title}
                      onClick={() => setActiveIndex(index)}
                      className="absolute cursor-pointer rounded-2xl overflow-hidden transition-all duration-700 ease-out"
                      style={{
                        ...getCardStyles(position),
                        height: '420px'
                      }}
                    >
                      {/* Luminar-style card with static gradient background */}
                      <div className="relative h-full w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-2xl border border-white/10 shadow-2xl">
                        {/* Subtle overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/5 rounded-2xl" />
                        
                        {/* Content */}
                        <div className="relative h-full p-6 flex flex-col">
                          {/* Icon */}
                          <div className="absolute top-4 right-4 text-3xl opacity-90">
                            {industry.icon}
                          </div>
                          
                          {/* Title Badge */}
                          <div className={`self-start mb-4 px-3 py-1 rounded-full border transition-colors duration-300 ${
                            isCenter
                              ? "bg-white/20 border-white/30 text-white backdrop-blur-sm"
                              : "bg-white/10 border-white/20 text-white/70 backdrop-blur-sm"
                          }`}>
                            <span className="text-sm font-medium">{industry.title}</span>
                          </div>
                          
                          {/* Description */}
                          <p className={`text-base leading-relaxed mb-3 flex-shrink-0 transition-colors duration-300 ${
                            isCenter ? "text-white" : "text-white/60"
                          }`}>
                            {industry.description}
                          </p>
                          
                          {/* Impact Points - Only show on center card */}
                          {isCenter && (
                            <div className="flex-1 flex flex-col justify-end pb-4 animate-fade-in">
                              <div>
                                <h4 className="text-sm font-semibold mb-2 text-white/90">Impact:</h4>
                                <ul className="space-y-1.5">
                                  {industry.impactPoints.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm">
                                      <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0" />
                                      <span className="text-white/90 font-light">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Visual placeholder for non-center cards */}
                          {!isCenter && (
                            <div className="flex-1 flex items-end pb-4">
                              <div className="w-full aspect-[3/2] bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-lg flex items-center justify-center border border-white/10 backdrop-blur-sm transition-opacity duration-300 opacity-60">
                                <div className="text-center text-white/60">
                                  <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                    <div className="w-8 h-8 bg-white/40 rounded" />
                                  </div>
                                  <p className="text-sm text-white/80">{industry.title} Demo</p>
                                  <p className="text-xs mt-1 text-white/50">Click to explore</p>
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
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 gap-3">
              {industries.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full transition-all duration-300 backdrop-blur-sm ${
                    index === activeIndex 
                      ? 'w-6 h-3 bg-white shadow-lg' 
                      : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                  }`}
                />
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