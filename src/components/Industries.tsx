"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useVideoIntersection } from "./ScrollAnimations";

interface Industry {
  title: string;
  video: {
    mp4: string;
    title: string;
  };
  impactPoints: string[];
}

const industries: Industry[] = [
  {
    title: "Apparel",
    video: {
      mp4: "https://aurevia-content.s3.eu-north-1.amazonaws.com/Apparel_Collab.mp4",
      title: "Fashion & Apparel Demo Video"
    },
    impactPoints: ["🎯 28% conversion boost by acting as a 24/7 personal stylist — recommending occasion-ready outfits and guiding shoppers through size, fit, and vibe."]
  },
  {
    title: "Beauty & Skincare",
    video: {
      mp4: "https://aurevia-content.s3.eu-north-1.amazonaws.com/beauty_video.mp4",
      title: "Beauty & Cosmetics Demo Video"
    },
    impactPoints: ["✨ 31% increase in repeat-order revenue — helping beauty shoppers find the right products for their skin type, concerns, and ingredient needs, instantly."]
  },
  {
    title: "Male Fitness & Fashion",
    video: {
      mp4: "https://aurevia-content.s3.eu-north-1.amazonaws.com/fitness_apparel_video.mp4",
      title: "Fitness & Yoga Demo Video"
    },
    impactPoints: ["💪 23% reduction in returns — from activewear to date night, suggesting high-fit, low-regret pieces based on style, body type, and daily lifestyle."]
  },
  {
    title: "Fitness & Supplements",
    video: {
      mp4: "https://aurevia-content.s3.eu-north-1.amazonaws.com/FItness_video.mp4",
      title: "Fitness & Equipment Demo Video"
    },
    impactPoints: ["🔥 18% AOV boost in fitness stores by guiding buyers to the right stack — from whey to creatine — based on habits, history, and goals."]
  }
];

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [videoCompleted, setVideoCompleted] = useState<{[key: number]: boolean}>({});
  
  // Create video refs for each video (desktop)
  const desktopVideoRef0 = useVideoIntersection();
  const desktopVideoRef1 = useVideoIntersection();
  const desktopVideoRef2 = useVideoIntersection();
  const desktopVideoRef3 = useVideoIntersection();
  
  // Create video refs for each video (mobile)
  const mobileVideoRef0 = useVideoIntersection();
  const mobileVideoRef1 = useVideoIntersection();
  const mobileVideoRef2 = useVideoIntersection();
  const mobileVideoRef3 = useVideoIntersection();
  
  // Map video refs to their respective indices
  const getDesktopVideoRef = (index: number) => {
    switch (index) {
      case 0: return desktopVideoRef0;
      case 1: return desktopVideoRef1;
      case 2: return desktopVideoRef2;
      case 3: return desktopVideoRef3;
      default: return null;
    }
  };
  
  const getMobileVideoRef = (index: number) => {
    switch (index) {
      case 0: return mobileVideoRef0;
      case 1: return mobileVideoRef1;
      case 2: return mobileVideoRef2;
      case 3: return mobileVideoRef3;
      default: return null;
    }
  };

  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      // Only advance if current video has completed at least once
      if (videoCompleted[activeIndex]) {
        setActiveIndex((prev) => (prev + 1) % industries.length);
      }
    }, 1000); // Check more frequently
    return () => clearInterval(interval);
  }, [isAutoplay, activeIndex, videoCompleted]);
  
  // Handle video completion
  const handleVideoEnd = (index: number) => {
    setVideoCompleted(prev => ({ ...prev, [index]: true }));
  };

  // Control video playback based on active index
  useEffect(() => {
    // Reset all videos to beginning and control playback
    industries.forEach((_, index) => {
      const desktopVideo = getDesktopVideoRef(index)?.current;
      const mobileVideo = getMobileVideoRef(index)?.current;
      
      // Reset all videos to beginning
      if (desktopVideo) {
        desktopVideo.currentTime = 0;
      }
      if (mobileVideo) {
        mobileVideo.currentTime = 0;
      }
      
      if (index === activeIndex) {
        // Play active video from beginning
        if (desktopVideo) {
          desktopVideo.play().catch(() => {
            // Autoplay blocked, this is normal
          });
        }
        if (mobileVideo) {
          mobileVideo.play().catch(() => {
            // Autoplay blocked, this is normal
          });
        }
      } else {
        // Pause inactive videos (they're already reset to beginning)
        if (desktopVideo) desktopVideo.pause();
        if (mobileVideo) mobileVideo.pause();
      }
    });
  }, [activeIndex]);

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
              <div className="relative h-[800px] lg:h-[900px] flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                  {industries.map((industry, index) => {
                    const isActive = index === activeIndex;
                    const isPrev = index === (activeIndex - 1 + industries.length) % industries.length;
                    const isNext = index === (activeIndex + 1) % industries.length;
                    
                    let cardClasses = "absolute cursor-pointer bg-card border-border overflow-hidden group transition-all duration-700 ease-in-out [transition-property:transform,opacity,filter]";
                    let cardStyles = {};
                    
                    if (isActive) {
                      cardClasses += " z-30 hover:border-primary/30";
                      cardStyles = {
                        transform: 'translateX(0) scale(1)',
                        opacity: 1,
                        filter: 'blur(0px)',
                        width: '480px',
                        height: '720px'
                      };
                    } else if (isPrev) {
                      cardClasses += " z-20";
                      cardStyles = {
                        transform: 'translateX(-320px) scale(0.85)',
                        opacity: 0.6,
                        filter: 'blur(2px)',
                        width: '480px',
                        height: '720px'
                      };
                    } else if (isNext) {
                      cardClasses += " z-20";
                      cardStyles = {
                        transform: 'translateX(320px) scale(0.85)',
                        opacity: 0.6,
                        filter: 'blur(2px)',
                        width: '480px',
                        height: '720px'
                      };
                    } else {
                      cardClasses += " z-10";
                      cardStyles = {
                        transform: 'translateX(0) scale(0.7)',
                        opacity: 0.3,
                        filter: 'blur(4px)',
                        width: '480px',
                        height: '720px'
                      };
                    }
                    
                    return (
                      <Card
                        key={industry.title}
                        onClick={() => goToSlide(index)}
                        className={cardClasses}
                        style={cardStyles}
                      >
                        <CardContent className="p-4 h-full flex flex-col">
                          {/* Video Container - Takes most of the space */}
                          <div className="flex-1 mb-4 relative">
                            <div className="h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center overflow-hidden">
                              <video
                                ref={getDesktopVideoRef(index)}
                                width="100%"
                                height="100%"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                controls={false}
                                webkit-playsinline="true"
                                x-webkit-airplay="allow"
                                onEnded={() => handleVideoEnd(index)}
                                style={{
                                  borderRadius: '8px',
                                  objectFit: 'contain',
                                  width: '100%',
                                  height: '100%'
                                }}
                              >
                                <source src={industry.video.mp4} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                            {/* Logo Watermark */}
                            <div className="absolute top-3 left-3 z-10 opacity-80 hover:opacity-100 transition-opacity duration-200">
                              <img
                                src="/images/Logo_wo_bg.png"
                                alt="Aurevia Logo"
                                className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-lg"
                              />
                            </div>
                          </div>

                          {/* Impact Content */}
                          <div className="flex-shrink-0 space-y-3 min-h-[120px] px-2">
                            {industry.impactPoints.map((point, pointIndex) => (
                              <div key={pointIndex} className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 border border-primary/20">
                                <p className="text-sm font-medium text-white leading-relaxed">
                                  {point}
                                </p>
                              </div>
                            ))}
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
                      <Card className="bg-card border-border overflow-hidden min-h-[500px]">
                        <CardContent className="p-4 h-full flex flex-col">
                          {/* Video Container - Takes most of the space */}
                          <div className="flex-1 mb-4 relative">
                            <div className="h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center overflow-hidden">
                              <video
                                ref={getMobileVideoRef(index)}
                                width="100%"
                                height="100%"
                                muted
                                playsInline
                                loop
                                preload="metadata"
                                controls={false}
                                webkit-playsinline="true"
                                x-webkit-airplay="allow"
                                onEnded={() => handleVideoEnd(index)}
                                style={{
                                  borderRadius: '8px',
                                  objectFit: 'contain',
                                  width: '100%',
                                  height: '100%'
                                }}
                              >
                                <source src={industry.video.mp4} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                            {/* Logo Watermark */}
                            <div className="absolute top-3 left-3 z-10 opacity-80 hover:opacity-100 transition-opacity duration-200">
                              <img
                                src="/images/Logo_wo_bg.png"
                                alt="Aurevia Logo"
                                className="w-6 h-6 sm:w-8 sm:h-8 object-contain drop-shadow-lg"
                              />
                            </div>
                          </div>

                          {/* Impact Content */}
                          <div className="flex-shrink-0 space-y-3 min-h-[120px] px-2">
                            {industry.impactPoints.map((point, pointIndex) => (
                              <div key={pointIndex} className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 border border-primary/20">
                                <p className="text-sm font-medium text-white leading-relaxed">
                                  {point}
                                </p>
                              </div>
                            ))}
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
