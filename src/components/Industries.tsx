"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function useManualVideoRef() {
  const videoRef = useRef<HTMLVideoElement>(null);
  return videoRef;
}

interface Industry {
  title: string;
  video: {
    mp4: string;
    title: string;
  };
  stat: string;
  statDesc: string;
}

const industries: Industry[] = [
  {
    title: "Apparel",
    video: {
      mp4: "https://aurevia-content.s3.eu-north-1.amazonaws.com/Apparel_Collab.mp4",
      title: "Fashion & Apparel Demo Video"
    },
    stat: "28%",
    statDesc: "conversion boost by acting as a 24/7 personal stylist — recommending occasion-ready outfits and guiding shoppers through size, fit, and vibe."
  },
  {
    title: "Beauty & Skincare",
    video: {
      mp4: "https://aurevia-content.s3.eu-north-1.amazonaws.com/beauty_video.mp4",
      title: "Beauty & Cosmetics Demo Video"
    },
    stat: "31%",
    statDesc: "increase in repeat-order revenue — helping beauty shoppers find the right products for their skin type, concerns, and ingredient needs, instantly."
  },
  {
    title: "Male Fitness & Fashion",
    video: {
      mp4: "https://aurevia-content.s3.eu-north-1.amazonaws.com/fitness_apparel_video.mp4",
      title: "Fitness & Yoga Demo Video"
    },
    stat: "23%",
    statDesc: "reduction in returns — from activewear to date night, suggesting high-fit, low-regret pieces based on style, body type, and daily lifestyle."
  },
  {
    title: "Fitness & Supplements",
    video: {
      mp4: "https://aurevia-content.s3.eu-north-1.amazonaws.com/FItness_video.mp4",
      title: "Fitness & Equipment Demo Video"
    },
    stat: "18%",
    statDesc: "AOV boost in fitness stores by guiding buyers to the right stack — from whey to creatine — based on habits, history, and goals."
  }
];

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [videoCompleted, setVideoCompleted] = useState<{[key: number]: boolean}>({});
  
  const desktopVideoRef0 = useManualVideoRef();
  const desktopVideoRef1 = useManualVideoRef();
  const desktopVideoRef2 = useManualVideoRef();
  const desktopVideoRef3 = useManualVideoRef();
  
  const mobileVideoRef0 = useManualVideoRef();
  const mobileVideoRef1 = useManualVideoRef();
  const mobileVideoRef2 = useManualVideoRef();
  const mobileVideoRef3 = useManualVideoRef();
  
  const getDesktopVideoRef = useCallback((index: number) => {
    switch (index) {
      case 0: return desktopVideoRef0;
      case 1: return desktopVideoRef1;
      case 2: return desktopVideoRef2;
      case 3: return desktopVideoRef3;
      default: return null;
    }
  }, [desktopVideoRef0, desktopVideoRef1, desktopVideoRef2, desktopVideoRef3]);
  
  const getMobileVideoRef = useCallback((index: number) => {
    switch (index) {
      case 0: return mobileVideoRef0;
      case 1: return mobileVideoRef1;
      case 2: return mobileVideoRef2;
      case 3: return mobileVideoRef3;
      default: return null;
    }
  }, [mobileVideoRef0, mobileVideoRef1, mobileVideoRef2, mobileVideoRef3]);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      if (videoCompleted[activeIndex]) {
        setActiveIndex((prev) => (prev + 1) % industries.length);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isAutoplay, activeIndex, videoCompleted]);
  
  const handleVideoEnd = (index: number) => {
    setVideoCompleted(prev => ({ ...prev, [index]: true }));
  };

  useEffect(() => {
    industries.forEach((_, index) => {
      const desktopVideo = getDesktopVideoRef(index)?.current;
      const mobileVideo = getMobileVideoRef(index)?.current;
      
      if (desktopVideo) {
        desktopVideo.currentTime = 0;
        desktopVideo.pause();
      }
      if (mobileVideo) {
        mobileVideo.currentTime = 0;
        mobileVideo.pause();
      }
      
      if (index === activeIndex) {
        if (desktopVideo) {
          desktopVideo.play().catch(() => {});
        }
        if (mobileVideo) {
          mobileVideo.play().catch(() => {});
        }
      }
    });
  }, [activeIndex, getDesktopVideoRef, getMobileVideoRef]);

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
    <div className="text-white font-inter" style={{backgroundColor: '#080808'}}>
      <section id="industries" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6" style={{backgroundColor: '#080808'}}>
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 scroll-fade">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-3 sm:mb-4 text-white">
              Stores Like Yours Are Already{" "}
              <span className="green-highlight">Selling More</span>
            </h2>
            <p className="text-base sm:text-lg font-light text-muted-foreground max-w-xl mx-auto">
              See how merchants in your niche are turning conversations into conversions — on autopilot.
            </p>
          </div>

          {/* Industry Tabs */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
              {industries.map((industry, index) => (
                <button
                  key={industry.title}
                  onClick={() => goToSlide(index)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    index === activeIndex
                      ? "bg-[#02DFA6]/10 text-[#02DFA6] shadow-[0_0_12px_rgba(2,223,166,0.08)]"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  {industry.title}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout — full-width horizontal: video half + info half */}
          <div className="hidden md:block">
            <div className="relative mx-auto max-w-[1400px]">
              <div className="relative">
                {industries.map((industry, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={industry.title}
                      className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isActive
                          ? "relative opacity-100 translate-y-0"
                          : "absolute inset-0 opacity-0 translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div
                        className="absolute -inset-[1px] rounded-2xl opacity-30"
                        style={{
                          background: 'linear-gradient(135deg, rgba(2,223,166,0.12), transparent 60%, rgba(2,223,166,0.06))',
                        }}
                      />
                      <div className="relative flex rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0c0c]">
                        {/* Video half — full visibility, no crop */}
                        <div className="relative w-1/2 bg-black/40">
                          <div className="aspect-[9/16] max-h-[520px] mx-auto">
                            <video
                              ref={getDesktopVideoRef(index)}
                              muted
                              playsInline
                              loop
                              preload="metadata"
                              controls={false}
                              webkit-playsinline="true"
                              x-webkit-airplay="allow"
                              onEnded={() => handleVideoEnd(index)}
                              className="w-full h-full object-contain"
                            >
                              <source src={industry.video.mp4} type="video/mp4" />
                            </video>
                          </div>
                          <div className="absolute top-4 left-4 z-10">
                            <img
                              src="/images/Logo_wo_bg.png"
                              alt="Aurevia"
                              className="w-8 h-8 object-contain opacity-60"
                            />
                          </div>
                        </div>

                        {/* Info half */}
                        <div className="w-1/2 flex flex-col justify-center px-10 lg:px-16 xl:px-20 py-10">
                          <span className="text-[4rem] lg:text-[5rem] xl:text-[5.5rem] font-normal text-[#02DFA6] leading-none tracking-tight">
                            {industry.stat}
                          </span>
                          <div className="mt-5 w-12 h-[2px] bg-[#02DFA6]/25 rounded-full" />
                          <p className="mt-5 text-base lg:text-lg leading-[1.75] text-white/50 max-w-md">
                            {industry.statDesc}
                          </p>
                          <div className="mt-8 flex items-center gap-4">
                            <button
                              onClick={prevSlide}
                              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200"
                            >
                              <ChevronLeft className="w-4 h-4 text-white/50" />
                            </button>
                            <button
                              onClick={nextSlide}
                              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200"
                            >
                              <ChevronRight className="w-4 h-4 text-white/50" />
                            </button>
                            <div className="flex gap-1.5 ml-3">
                              {industries.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => goToSlide(i)}
                                  className={`rounded-full transition-all duration-300 ${
                                    i === activeIndex
                                      ? "w-5 h-1.5 bg-[#02DFA6]"
                                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/35"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {industries.map((industry, index) => (
                    <div key={industry.title} className="w-full flex-shrink-0 px-1">
                      <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0c0c]">
                        <div className="relative aspect-[9/13]">
                          <video
                            ref={getMobileVideoRef(index)}
                            muted
                            playsInline
                            loop
                            preload="metadata"
                            controls={false}
                            webkit-playsinline="true"
                            x-webkit-airplay="allow"
                            onEnded={() => handleVideoEnd(index)}
                            className="absolute inset-0 w-full h-full object-cover"
                          >
                            <source src={industry.video.mp4} type="video/mp4" />
                          </video>
                          <div className="absolute top-3 left-3 z-10">
                            <img
                              src="/images/Logo_wo_bg.png"
                              alt="Aurevia"
                              className="w-6 h-6 object-contain opacity-70"
                            />
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl font-normal text-[#02DFA6] shrink-0 leading-none">
                              {industry.stat}
                            </span>
                            <p className="text-[13px] leading-[1.55] text-white/55 pt-0.5">
                              {industry.statDesc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={prevSlide}
                className="absolute left-2 top-[40%] -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.08] bg-black/60 backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4 text-white/70" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-[40%] -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full border border-white/[0.08] bg-black/60 backdrop-blur-sm"
              >
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Mobile dots */}
            <div className="flex justify-center mt-4 gap-2">
              {industries.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "w-5 h-1.5 bg-[#02DFA6]" 
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/35"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-3 text-sm">
                Want to see how Aurevia fits your store?
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="cta-button px-6 py-2.5 text-white rounded-full transition-all duration-200 text-sm font-medium border-0"
              >
                Find Out More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
