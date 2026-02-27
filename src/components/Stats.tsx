"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScrollFade } from "./ScrollAnimations";

const stats = [
  { number: "67%", label: "AI-Driven Sales Lift" },
  { number: "35%", label: "Buy via AI Chat" },
  { number: "8×", label: "AI ROI Return" },
  { number: "80%", label: "Resolved by AI" },
];

function useStatNumberReveal(staggerMs = 150) {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      wrapRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const wraps = wrapRefs.current.filter(Boolean) as HTMLDivElement[];
    if (wraps.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wraps.forEach((wrap, i) => {
              setTimeout(() => wrap.classList.add("visible"), i * staggerMs);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    if (wraps[0]?.parentElement) {
      observer.observe(wraps[0].parentElement);
    }

    return () => observer.disconnect();
  }, [staggerMs]);

  return setRef;
}

export default function Stats() {
  const sectionRef = useScrollFade();
  const setNumberRef = useStatNumberReveal(180);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="scroll-fade py-14 sm:py-16 md:py-20 px-4 sm:px-6 relative"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left — headline */}
          <div className="lg:w-5/12">
            <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] md:leading-[1.2] font-inter font-normal text-white">
              Somewhere right now, a customer left your store.{" "}
              <span className="green-highlight">AI would have saved that sale.</span>
            </h2>
          </div>

          {/* Right — 2×2 stat grid */}
          <div className="lg:w-7/12">
            <div className="grid grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-background p-6 sm:p-8 md:p-10 text-center"
                >
                  <div
                    ref={setNumberRef(index)}
                    className="stat-number-wrap"
                  >
                    <span className="stat-number-inner text-4xl sm:text-5xl md:text-6xl font-bold gradient-text inline-block">
                      {stat.number}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
