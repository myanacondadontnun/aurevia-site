"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface IndustryShowcaseItem {
  title: string;
  slug: string;
  subheader: string;
  href: string;
  /** Optional image path (e.g. /images/fashion-placeholder.png) for the right panel */
  image?: string;
  /** Word or phrase in the title to highlight (e.g. "Apparel" or "Health & Beauty") */
  titleHighlight?: string;
}

interface IndustriesShowcaseProps {
  industries: IndustryShowcaseItem[];
}

const PLACEHOLDER_COLORS = [
  "from-violet-900/40 to-fuchsia-900/30",
  "from-rose-900/40 to-amber-900/30",
  "from-emerald-900/40 to-teal-900/30",
  "from-sky-900/40 to-indigo-900/30",
  "from-lime-900/40 to-green-900/30",
];

export default function IndustriesShowcase({ industries }: IndustriesShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = industries.map((_, index) => {
      const el = sectionRefs.current[index];
      if (!el) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const ratio = entry.intersectionRatio;
              if (ratio >= 0.2) setActiveIndex(index);
            }
          });
        },
        { threshold: [0.2, 0.5, 0.8], rootMargin: "-20% 0px -20% 0px" }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach((obs, i) => {
        const el = sectionRefs.current[i];
        if (obs && el) obs.unobserve(el);
      });
    };
  }, [industries.length]);

  const scrollToSection = (slug: string) => {
    const el = document.getElementById(`industry-${slug}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full">
      {/* Pills: industry names */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12">
        {industries.map((industry, index) => (
          <button
            key={industry.slug}
            type="button"
            onClick={() => scrollToSection(industry.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              activeIndex === index
                ? "bg-primary/20 border-primary/50 text-[#00CC99]"
                : "bg-card/50 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
          >
            {industry.title}
          </button>
        ))}
      </div>

      {/* Two-column layout: left scrollable copy, right sticky image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: scrollable industry blocks */}
        <div className="space-y-0 pl-6 sm:pl-10 lg:pl-12">
          {industries.map((industry, index) => (
            <section
              key={industry.slug}
              id={`industry-${industry.slug}`}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className="min-h-[80vh] lg:min-h-[85vh] flex flex-col justify-center py-16 lg:py-24 scroll-mt-28"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-foreground mb-4">
                {industry.titleHighlight && industry.title.includes(industry.titleHighlight) ? (
                  <>
                    {industry.title.split(industry.titleHighlight)[0]}
                    <span className="green-highlight">{industry.titleHighlight}</span>
                    {industry.title.split(industry.titleHighlight)[1]}
                  </>
                ) : (
                  industry.title
                )}
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8">
                {industry.subheader}
              </p>
              <Link
                href={industry.href}
                className="inline-flex items-center gap-2 text-[#00CC99] font-medium hover:gap-3 transition-all"
              >
                Learn more
                <span aria-hidden>→</span>
              </Link>
            </section>
          ))}
        </div>

        {/* Right: sticky image placeholder (85% size) */}
        <div className="relative sticky top-24 lg:top-28 order-first lg:order-none flex justify-center lg:justify-end">
          <div className="w-[85%] aspect-[4/5] lg:aspect-square lg:min-h-[59.5vh] rounded-2xl overflow-hidden border border-border/30 bg-card/30">
            {industries.map((industry, index) => (
              <div
                key={industry.slug}
                className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
                  activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                } ${industry.image ? "bg-card/30" : `bg-gradient-to-br ${PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]}`}`}
                aria-hidden={activeIndex !== index}
              >
                {industry.image ? (
                  <img
                    src={industry.image}
                    alt=""
                    className="absolute inset-0 w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-foreground/60 text-sm font-medium">
                    {industry.title} — Image placeholder
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
