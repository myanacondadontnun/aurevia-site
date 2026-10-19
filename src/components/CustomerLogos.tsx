"use client";

import { useScrollFade } from "./ScrollAnimations";

type Logo = { src: string; alt: string; heightClass?: string };

// One white row, one direction. Logos are flattened to a single grey so dark
// and light source files sit together.
const logos: Logo[] = [
  { src: "/logos/logo-1.webp", alt: "Almada" },
  { src: "/logos/customer-yeoni.webp", alt: "YÉONI." },
  { src: "/logos/logo-4.webp", alt: "Framework" },
  { src: "/logos/customer-masks.webp", alt: "Masks & Capes", heightClass: "h-9 sm:h-12" },
  { src: "/logos/logo-2.webp", alt: "Issy" },
  { src: "/logos/customer-cernucci.webp", alt: "Cernucci" },
  { src: "/logos/logo-8.webp", alt: "Mashu" },
  // Extra height compensates for built-in padding in these PNGs.
  { src: "/logos/logo-5.webp", alt: "Studio Simone", heightClass: "h-10 sm:h-14" },
  { src: "/logos/customer-purebronze.webp", alt: "PureBronze Tanning", heightClass: "h-10 sm:h-14" },
  { src: "/logos/logo-12.webp", alt: "Velamont" },
  { src: "/logos/customer-kobets.webp", alt: "Kobets" },
  { src: "/logos/logo-11.webp", alt: "Damson Madder", heightClass: "h-9 sm:h-12" },
  { src: "/logos/logo-3.webp", alt: "Liha" },
  { src: "/logos/customer-ugarit.webp", alt: "Ugarit-Verlag", heightClass: "h-9 sm:h-12" },
  // logo-6-mark: logo-6 with its white background knocked out, so the grey treatment shows the mark, not a block.
  { src: "/logos/logo-6-mark.webp", alt: "Love Heartwood", heightClass: "h-10 sm:h-14" },
  { src: "/logos/logo-14.webp", alt: "Okko" },
  { src: "/logos/customer-vernier.webp", alt: "Vernier", heightClass: "h-10 sm:h-14" },
  { src: "/logos/logo-13.webp", alt: "Sable & Fern" },
  { src: "/logos/logo-15.webp", alt: "Maison Lune" },
  { src: "/logos/customer-lookspretty.webp", alt: "LooksPretty", heightClass: "h-10 sm:h-14" },
  { src: "/logos/logo-9.webp", alt: "Apothaka" },
  { src: "/logos/logo-16.webp", alt: "Harlow" },
];

function MarqueeRow() {
  return (
    <div className="overflow-hidden bg-white">
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center gap-12 sm:gap-20 py-5 sm:py-7 pr-12 sm:pr-20"
          >
            {logos.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={copy === 0 ? logo.alt : ""}
                loading="lazy"
                className={`${logo.heightClass ?? "h-6 sm:h-8"} w-auto max-w-none brightness-0 opacity-55`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CustomerLogos() {
  const sectionRef = useScrollFade();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      aria-label="Shopify brands using Aurevia"
      className="scroll-fade pt-8 sm:pt-12"
    >
      <p className="text-center text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6 sm:mb-8 px-4">
        {/* 50 merchant stores still installed (prod stores table, 19 Oct 2026, test/review/demo stores excluded). Re-count before raising. */}
        Trusted by 50+ Shopify stores
      </p>

      <MarqueeRow />

      <style jsx global>{`
        .marquee-track {
          animation: logo-marquee 70s linear infinite;
        }

        @keyframes logo-marquee {
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
