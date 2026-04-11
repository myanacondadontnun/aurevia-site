"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import CTASwarmBackdrop from "@/components/CTASwarmBackdrop";

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
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <div className="text-white font-inter" style={{backgroundColor: '#080808'}}>
      <section id="industries" className="py-10 sm:py-16 md:py-20 px-4 sm:px-6" style={{backgroundColor: '#080808'}} aria-label="Industry demos">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-5 sm:mb-8 scroll-fade">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal mb-2 sm:mb-4 text-white">
              Stores Like Yours Are Already{" "}
              <span className="green-highlight">Selling More</span>
            </h2>
            <p className="text-xs sm:text-lg font-light text-muted-foreground max-w-xl mx-auto">
              See how merchants in your niche are turning conversations into conversions — on autopilot.
            </p>
          </div>

          {/* Industry Tabs */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div
              className="inline-flex items-center gap-1 p-1 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-x-auto hide-scrollbar max-w-full"
              role="tablist"
              aria-label="Industry categories"
            >
              {industries.map((industry, index) => (
                <button
                  key={industry.title}
                  onClick={() => goToSlide(index)}
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-controls={`industry-panel-${index}`}
                  className={`px-3 py-2 sm:px-4 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-300 whitespace-nowrap min-h-[36px] ${
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

          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="relative mx-auto max-w-[1400px]" aria-live="polite">
              <div className="relative">
                {industries.map((industry, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={industry.title}
                      id={`industry-panel-${index}`}
                      role="tabpanel"
                      aria-label={`${industry.title} demo`}
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
                        <div className="relative w-1/2 bg-black/40">
                          <div className="aspect-[9/16] max-h-[520px] mx-auto">
                            <video
                              ref={getDesktopVideoRef(index)}
                              muted
                              playsInline
                              loop
                              preload="metadata"
                              controls={false}
                              title={industry.video.title}
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

                        <div className="w-1/2 flex flex-col justify-center px-10 lg:px-16 xl:px-20 py-10">
                          <span className="text-[4rem] lg:text-[5rem] xl:text-[5.5rem] font-normal text-[#02DFA6] leading-none tracking-tight">
                            {industry.stat}
                          </span>
                          <div className="mt-5 w-12 h-[2px] bg-[#02DFA6]/25 rounded-full" aria-hidden="true" />
                          <p className="mt-5 text-base lg:text-lg leading-[1.75] text-white/50 max-w-md">
                            {industry.statDesc}
                          </p>
                          <div className="mt-8 flex items-center gap-4">
                            <button
                              onClick={prevSlide}
                              aria-label="Previous industry"
                              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200"
                            >
                              <ChevronLeft className="w-4 h-4 text-white/50" aria-hidden="true" />
                            </button>
                            <button
                              onClick={nextSlide}
                              aria-label="Next industry"
                              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200"
                            >
                              <ChevronRight className="w-4 h-4 text-white/50" aria-hidden="true" />
                            </button>
                            <div className="flex gap-1.5 ml-3">
                              {industries.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => goToSlide(i)}
                                  aria-label={`Go to slide ${i + 1}`}
                                  aria-current={i === activeIndex ? "true" : undefined}
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
            <div
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              aria-live="polite"
            >
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                  {industries.map((industry, index) => (
                    <div key={industry.title} className="w-full flex-shrink-0 px-1" role="tabpanel" aria-label={`${industry.title} demo`}>
                      <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0c0c0c]">
                        <div className="relative aspect-[9/14]">
                          <video
                            ref={getMobileVideoRef(index)}
                            muted
                            playsInline
                            loop
                            preload="metadata"
                            controls={false}
                            title={industry.video.title}
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
                        <div className="p-3 sm:p-4">
                          <div className="flex items-start gap-2.5">
                            <span className="text-xl sm:text-2xl font-normal text-[#02DFA6] shrink-0 leading-none">
                              {industry.stat}
                            </span>
                            <p className="text-[12px] sm:text-[13px] leading-[1.5] text-white/55 pt-0.5">
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
                aria-label="Previous industry"
                className="absolute left-2 top-[40%] -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-white/[0.08] bg-black/60 backdrop-blur-sm"
              >
                <ChevronLeft className="w-4 h-4 text-white/70" aria-hidden="true" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next industry"
                className="absolute right-2 top-[40%] -translate-y-1/2 z-10 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border border-white/[0.08] bg-black/60 backdrop-blur-sm"
              >
                <ChevronRight className="w-4 h-4 text-white/70" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile dots */}
            <div className="flex justify-center mt-4 gap-2">
              {industries.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`rounded-full transition-all duration-300 p-1.5 ${
                    index === activeIndex
                      ? "bg-transparent"
                      : "bg-transparent"
                  }`}
                >
                  <span className={`block rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-5 h-1.5 bg-[#02DFA6]"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/35"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-8">
            <div className="text-center">
              <p className="text-muted-foreground mb-3 text-sm">
                Want to see how Aurevia fits your store?
              </p>
              <div className="flex justify-center">
                <a
                  href={SHOPIFY_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Try Aurevia for free on Shopify"
                  className="cta-button cta-button--has-swarm relative overflow-hidden inline-flex items-center justify-center px-6 py-2.5 text-white rounded-full transition-all duration-200 text-sm font-medium border-0 no-underline"
                >
                  <CTASwarmBackdrop roundedClassName="rounded-full" />
                  <span className="relative z-[3]">Try for Free</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
