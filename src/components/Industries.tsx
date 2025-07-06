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
    title: "Fashion & Apparel",
    image: "/images/fashion.png",
    impactPoints: []
  },
  {
    title: "Beauty & Cosmetics",
    image: "/images/beauty.png",
    impactPoints: []
  },
  {
    title: "Fitness & Yoga",
    image: "/images/fitness.png",
    impactPoints: []
  }
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
    // For 3 cards: 0=center, 1=right, 2=left (rotating)
    const diff = (cardIndex - activeIndex + industries.length) % industries.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    if (diff === 2) return 'left';
    return 'center';
  };

  const getCardStyles = (position: string) => {
    const transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    switch (position) {
      case 'center':
        return { transform: 'translateX(0px) scale(1)', zIndex: 50, filter: 'blur(0)', opacity: 1, width: '480px', transition };
      case 'right':
        return { transform: 'translateX(300px) scale(0.88)', zIndex: 30, filter: 'blur(3px)', opacity: 0.7, width: '480px', transition };
      case 'left':
        return { transform: 'translateX(-300px) scale(0.88)', zIndex: 30, filter: 'blur(3px)', opacity: 0.7, width: '480px', transition };
      case 'far-right':
        return { transform: 'translateX(600px) scale(0.75)', zIndex: 10, filter: 'blur(10px)', opacity: 0.4, width: '480px', transition };
      case 'far-left':
        return { transform: 'translateX(-600px) scale(0.75)', zIndex: 10, filter: 'blur(10px)', opacity: 0.4, width: '480px', transition };
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
                {industries.map((industry, index) => {
                  const position = getCardPosition(index);
                  return (
                    <div
                      key={industry.title}
                      onClick={() => setActiveIndex(index)}
                      className="absolute cursor-pointer rounded-2xl overflow-hidden transition-all duration-700 ease-out shadow-2xl border border-white/10 bg-card"
                      style={getCardStyles(position)}
                    >
                      {/* Main content area with 4:3 aspect ratio */}
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl relative overflow-hidden">
                        {/* Full-size Image */}
                        <img
                          src={industry.image}
                          alt={industry.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Find out more section */}
            <div className="flex justify-center mt-12 mb-4">
              <div className="text-center">
                <p className="text-muted-foreground mb-4 text-sm">
                  Want to see how Aurevia can boost your industry?
                </p>
                <button
                  onClick={() => {
                    const element = document.getElementById("contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  Find Out More
                </button>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-8 gap-3">
              {industries.map((_, index) => (
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
