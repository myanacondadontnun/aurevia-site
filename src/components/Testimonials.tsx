"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useScrollFade } from "./ScrollAnimations";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  fontClass: string;
  initials: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The fact that AI Agent can resolve so many questions so quickly is amazing. We had a technical issue last BFCM that created a 600-question pile-up, and AI Agent cleared them from the queue in minutes.",
    name: "Coen",
    role: "CX Lead",
    company: "Cabau Lifestyle",
    industry: "Fitness & Lifestyle",
    fontClass: "font-playfair italic",
    initials: "C",
    image: "/images/cabau-lifestyle.png",
  },
  {
    quote:
      "We were initially nervous about using AI, but it has quickly proven its worth. Our community members have even mistaken the AI Agent for a real person, which speaks volumes about how well it aligns with our brand voice. If you\u2019re considering AI Agent, think of it as an extra team member that can significantly boost your ability to serve your community.",
    name: "Kailey Burton",
    role: "Community Experience Head Coach",
    company: "LSKD",
    industry: "Activewear",
    fontClass: "font-playfair italic",
    initials: "KB",
    image: "/images/lskd.png",
  },
  {
    quote:
      "What I like about AI Agent is that the responses are so different, and it makes it sound like it\u2019s an actual agent. Sometimes agents forget personal details to call out when communicating with our customers, like birthdays or weddings, but I noticed on a few different occasions where the AI Agent is highlighting these things and is saying, congratulations on your wedding!",
    name: "Sindi Melgar",
    role: "Customer Service Manager",
    company: "Baby Gold",
    industry: "Jewelry",
    fontClass: "font-playfair italic",
    initials: "SM",
    image: "/images/baby-gold.png",
  },
  {
    quote:
      "We measure the amount of time we spend on customer queries and the number of customer tickets, and they both have reduced by about 20%.",
    name: "Rasmus Serup",
    role: "CEO",
    company: "Hairlust",
    industry: "Beauty & Haircare",
    fontClass: "font-playfair italic",
    initials: "RS",
    image: "/images/hairlust.png",
  },
  {
    quote:
      "I was a little bit hesitant about using AI Agent initially. It\u2019s been incredible to see how adaptable AI Agent is, and how it can quickly pick up on the small things. Using AI to eliminate the back and forth has been great, and getting back to customers much faster than before has been the biggest win for our team.",
    name: "Lauren Reams",
    role: "Customer Experience Manager",
    company: "VESSEL",
    industry: "Premium Goods",
    fontClass: "font-playfair italic",
    initials: "LR",
    image: "/images/vessel.png",
  },
  {
    quote:
      "Thanks to the time we\u2019ve saved by automating many of our routine tasks, our team has had the chance to bond more. We even had time for a team picnic and painted a picnic table outside! It\u2019s been great to step away and spend time as a team occasionally, knowing that our customers are still being taken care of by the AI Agent. It\u2019s really improved team morale.",
    name: "",
    role: "Customer Service Manager",
    company: "Pajar",
    industry: "Fashion & Outerwear",
    fontClass: "font-playfair italic",
    initials: "P",
    image: "/images/pajar.png",
  },
  {
    quote:
      "Customer service used to be about answering questions. Now it\u2019s about managing automation to create extraordinary experiences. And the best part? Customers will actually prefer using automation. Faster, more accurate, more tailored experiences\u2014this isn\u2019t just about efficiency. It\u2019s about a better way to serve customers.",
    name: "Milan Vanmarcke",
    role: "Customer Happiness Manager",
    company: "Loop Earplugs",
    industry: "Consumer Tech",
    fontClass: "font-playfair italic",
    initials: "MV",
    image: "/images/loop-earplugs.png",
  },
];

function getQuoteSize(length: number): string {
  if (length < 160)
    return "text-xl sm:text-2xl md:text-3xl lg:text-[2.1rem] lg:leading-[1.3]";
  if (length < 280)
    return "text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] lg:leading-[1.35]";
  return "text-base sm:text-lg md:text-xl lg:text-[1.4rem] lg:leading-[1.45]";
}

export default function Testimonials() {
  const sectionRef = useScrollFade();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const go = useCallback(
    (index: number) => {
      if (isAnimating || index === active) return;
      setDirection(index > active ? "right" : "left");
      setIsAnimating(true);
      setTimeout(() => {
        setActive(index);
        setTimeout(() => setIsAnimating(false), 50);
      }, 300);
    },
    [active, isAnimating]
  );

  const next = useCallback(
    () => go((active + 1) % testimonials.length),
    [active, go]
  );
  const prev = useCallback(
    () => go((active - 1 + testimonials.length) % testimonials.length),
    [active, go]
  );

  useEffect(() => {
    const timer = setInterval(next, 12000);
    return () => clearInterval(timer);
  }, [next]);

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
        next();
      } else {
        prev();
      }
    }
  };

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="testimonials"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      className="scroll-fade relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 6%) 50%, hsl(0 0% 4%) 100%)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(2,223,166,0.1) 50%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(2,223,166,0.1) 50%, transparent 100%)",
        }}
      />

      <div
        className="container mx-auto max-w-6xl relative z-10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`testimonial-slide ${isAnimating ? `testimonial-exit-${direction}` : "testimonial-enter"}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <figure className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            {/* Left -- Image or Monogram card */}
            <div className="w-full lg:w-5/12 flex-shrink-0">
              <div className="relative aspect-[4/5] max-w-[320px] mx-auto rounded-2xl overflow-hidden border border-white/[0.06]">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={`${t.name || t.company} - ${t.role}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(145deg, hsl(0 0% 8%) 0%, hsl(0 0% 4%) 60%, hsl(163 30% 6%) 100%)",
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 40%, rgba(2,223,166,0.06) 0%, transparent 60%)",
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      aria-hidden="true"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    />
                    <div className="relative h-full flex flex-col items-center justify-center p-8">
                      <span
                        className="text-[5rem] sm:text-[6rem] font-playfair font-medium text-white/[0.07] leading-none select-none"
                        aria-hidden="true"
                      >
                        {t.initials}
                      </span>
                      <span className="mt-4 text-sm font-inter font-normal tracking-[0.25em] uppercase text-white/30">
                        {t.company}
                      </span>
                      <span className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-[10px] font-inter font-medium tracking-[0.12em] uppercase border border-[#02DFA6]/10 text-[#02DFA6]/40 bg-[#02DFA6]/[0.03]">
                        {t.industry}
                      </span>
                    </div>
                  </>
                )}

                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(2,223,166,0.25) 50%, transparent 100%)",
                  }}
                />
              </div>
            </div>

            {/* Right -- Quote */}
            <div className="w-full lg:w-7/12">
              <blockquote className="mb-8 sm:mb-10">
                <p
                  className={`${getQuoteSize(t.quote.length)} ${t.fontClass} text-white font-medium tracking-tight leading-snug`}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="flex items-center gap-4">
                <span className="text-sm sm:text-base font-inter font-normal tracking-widest uppercase text-white/80">
                  {t.company}
                </span>
                <span className="w-px h-8 bg-white/20" aria-hidden="true" />
                <div>
                  {t.name ? (
                    <>
                      <p className="text-sm sm:text-base font-inter font-medium text-white/70">
                        {t.name}
                      </p>
                      <p className="text-xs sm:text-sm font-inter text-white/40 font-light">
                        {t.role}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm sm:text-base font-inter text-white/50 font-light">
                      {t.role}
                    </p>
                  )}
                </div>
              </figcaption>
            </div>
          </figure>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-1 sm:gap-2.5 mt-12 sm:mt-14" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              className="p-1.5 rounded-full"
            >
              <span className={`block rounded-full transition-all duration-300 ${
                i === active
                  ? "w-3 h-3 bg-white"
                  : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
