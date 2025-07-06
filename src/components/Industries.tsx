"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Industry {
  title: string;
  image: string;
  impactPoints: string[];
}

const industries: Industry[] = [
  {
    title: "Fashion & Apparel",
    image: "/images/fashion.png",
    impactPoints: ["Personalized style recommendations", "Size and fit guidance", "Trend-based upselling"]
  },
  {
    title: "Beauty & Cosmetics",
    image: "/images/beauty.png",
    impactPoints: ["Shade matching assistance", "Skincare routine building", "Product ingredient advice"]
  },
  {
    title: "Fitness & Yoga",
    image: "/images/fitness.png",
    impactPoints: ["Equipment recommendations", "Workout plan suggestions", "Nutrition guidance"]
  }
];

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % industries.length);
    setIsAutoplay(false);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + industries.length) % industries.length);
    setIsAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoplay(false);
  };

  return (
    <div className="min-h-screen text-white font-inter" style={{backgroundColor: '#080808'}}>
      <section id="industries" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{backgroundColor: '#080808'}}>
        <div className="container mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
              Build for DTC, Across every Aisle
            </Badge>
          </div>
          
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-4 sm:mb-6 text-white">
              See how Aurevia <span className="green-highlight">boosts revenue</span> across industries
            </h2>
            <p className="text-lg sm:text-xl font-light text-muted-foreground max-w-3xl mx-auto">
              Real-time AI sales agent that adapts to your niche.
            </p>
          </div>

          {/* Desktop Layout: Enhanced Carousel */}
          <div className="hidden md:block">
            <div className="relative max-w-7xl mx-auto">
              <div className="relative h-[600px] lg:h-[720px] flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                  {industries.map((industry, index) => {
                    const isActive = index === activeIndex;
                    const isPrev = index === (activeIndex - 1 + industries.length) % industries.length;
                    const isNext = index === (activeIndex + 1) % industries.length;
                    
                    let cardClasses = "absolute cursor-pointer bg-card border-border overflow-hidden group transition-all duration-700 ease-in-out";
                    let cardStyles = {};
                    
                    if (isActive) {
                      cardClasses += " z-30 hover:border-primary/30";
                      cardStyles = {
                        transform: 'translateX(0) scale(1)',
                        opacity: 1,
                        width: '420px',
                        height: '560px'
                      };
                    } else if (isPrev) {
                      cardClasses += " z-20";
                      cardStyles = {
                        transform: 'translateX(-280px) scale(0.85)',
                        opacity: 0.6,
                        width: '420px',
                        height: '560px'
                      };
                    } else if (isNext) {
                      cardClasses += " z-20";
                      cardStyles = {
                        transform: 'translateX(280px) scale(0.85)',
                        opacity: 0.6,
                        width: '420px',
                        height: '560px'
                      };
                    } else {
                      cardClasses += " z-10";
                      cardStyles = {
                        transform: 'translateX(0) scale(0.7)',
                        opacity: 0.3,
                        width: '420px',
                        height: '560px'
                      };
                    }
                    
                    return (
                      <Card
                        key={industry.title}
                        onClick={() => goToSlide(index)}
                        className={cardClasses}
                        style={cardStyles}
                      >
                        <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                          {/* Image Container */}
                          <div className="mb-6 flex-shrink-0">
                            <div className="aspect-[1/1] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center overflow-hidden">
                              <img
                                src={industry.image}
                                alt={industry.title}
                                className="object-contain w-full h-full"
                              />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col justify-center space-y-4">
                            <h3 className="text-xl lg:text-2xl font-inter font-normal text-white leading-tight">
                              {industry.title}
                            </h3>
                            <div className="space-y-2">
                              {industry.impactPoints.map((point, pointIndex) => (
                                <p key={pointIndex} className="text-sm lg:text-base font-light text-muted-foreground leading-relaxed">
                                  • {point}
                                </p>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-background/80 border border-border rounded-full hover:bg-background hover:border-primary/50 transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 bg-background/80 border border-border rounded-full hover:bg-background hover:border-primary/50 transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Layout: Simple Card Stack */}
          <div className="md:hidden">
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {industries.map((industry, index) => (
                    <div key={industry.title} className="w-full flex-shrink-0 px-2">
                      <Card className="bg-card border-border overflow-hidden">
                        <CardContent className="p-6">
                          {/* Image Container */}
                          <div className="mb-6">
                            <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center overflow-hidden">
                              <img
                                src={industry.image}
                                alt={industry.title}
                                className="object-contain w-full h-full"
                              />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-inter font-normal text-white leading-tight">
                              {industry.title}
                            </h3>
                            <div className="space-y-2">
                              {industry.impactPoints.map((point, pointIndex) => (
                                <p key={pointIndex} className="text-sm font-light text-muted-foreground leading-relaxed">
                                  • {point}
                                </p>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobile Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 border border-border rounded-full hover:bg-background hover:border-primary/50 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 border border-border rounded-full hover:bg-background hover:border-primary/50 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Find out more section */}
          <div className="flex justify-center mt-8 sm:mt-12 mb-4">
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
          <div className="flex justify-center mt-6 sm:mt-8 gap-3">
            {industries.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${
                  index === activeIndex 
                    ? 'w-6 h-3 bg-white shadow-lg' 
                    : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                } rounded-full transition-all duration-300 backdrop-blur-sm`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
