"use client";

import { useEffect, useRef, useState } from "react";
import { trackButtonClick } from "@/lib/analytics";
import { buildShopifyInstallUrl } from "@/lib/utils";

export default function ROICalculatorCTACard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    trackButtonClick("Start for free", "roi_calculator_cta");
  };

  return (
    <section
      className="w-full flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 overflow-hidden"
      aria-label="Try Aurevia for free"
    >
      <div
        ref={cardRef}
        className={`w-full max-w-4xl cta-card-reveal ${isVisible ? "cta-card-visible" : ""}`}
      >
        <div
          className="relative rounded-3xl sm:rounded-[2rem] overflow-hidden px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14 text-center"
          style={{
            background:
              "linear-gradient(135deg, #0b3c2f 0%, rgba(2, 223, 166, 0.18) 50%, rgba(11, 60, 47, 0.4) 100%)",
            boxShadow:
              "0 20px 60px -15px rgba(2, 223, 166, 0.12), 0 0 0 1px rgba(2, 223, 166, 0.06)",
          }}
        >
          {/* Clouds: layered soft green blobs for hazy, diffused look */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 100% 80% at 5% 15%, rgba(2, 223, 166, 0.14) 0%, transparent 55%), radial-gradient(ellipse 85% 65% at 92% 85%, rgba(2, 223, 166, 0.1) 0%, transparent 50%), radial-gradient(ellipse 70% 90% at 50% 55%, rgba(255,255,255,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 75% 20%, rgba(1, 197, 148, 0.08) 0%, transparent 45%), radial-gradient(ellipse 50% 70% at 15% 75%, rgba(2, 223, 166, 0.06) 0%, transparent 50%)",
            }}
          />
          {/* Waves: soft horizontal bands for a rolling, wave-like feel */}
          <div
            className="absolute inset-0 pointer-events-none opacity-70"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(2, 223, 166, 0.04) 25%, transparent 50%, rgba(11, 60, 47, 0.06) 75%, transparent 100%), linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 30%, rgba(2, 223, 166, 0.03) 70%, transparent 100%)",
            }}
          />
          {/* Grain: layered for a more visible, organic texture */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g2)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "180px 180px",
            }}
          />
          {/* Thin white lines and waves – abstract overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18]"
            viewBox="0 0 800 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <path d="M0 120 Q200 80 400 120 T800 120" stroke="white" strokeWidth="0.6" fill="none" />
            <path d="M0 200 Q250 160 500 200 T800 200" stroke="white" strokeWidth="0.5" fill="none" />
            <path d="M0 280 Q150 240 400 280 T800 280" stroke="white" strokeWidth="0.5" fill="none" />
            <path d="M-50 60 Q100 30 300 60 Q500 90 850 60" stroke="white" strokeWidth="0.4" fill="none" />
            <path d="M-30 340 Q200 300 450 340 Q650 380 830 340" stroke="white" strokeWidth="0.4" fill="none" />
            <line x1="0" y1="50" x2="800" y2="50" stroke="white" strokeWidth="0.35" opacity="0.8" />
            <line x1="0" y1="350" x2="800" y2="350" stroke="white" strokeWidth="0.35" opacity="0.8" />
          </svg>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-6 sm:mb-8 tracking-tight font-roi">
              Try Aurevia.io for free
            </h2>
            <a
              href={buildShopifyInstallUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="inline-flex items-center justify-center cta-button text-white font-normal px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg rounded-xl min-h-[48px] border-0 shadow-lg hover:shadow-primary/20 transition-all font-roi no-underline"
              aria-label="Start for free on Shopify App Store"
            >
              Start for free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
