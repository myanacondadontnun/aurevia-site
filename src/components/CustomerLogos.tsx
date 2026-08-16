"use client";

import { useScrollFade } from "./ScrollAnimations";

type Logo = { src: string; alt: string; heightClass?: string };

// Light row — dark wordmarks, desaturated on white.
const rowLight: Logo[] = [
  { src: "/logos/logo-1.png", alt: "Almada" },
  { src: "/logos/logo-2.png", alt: "Issy" },
  // Extra height compensates for built-in padding in these PNGs.
  { src: "/logos/logo-5.png", alt: "Studio Simone", heightClass: "h-10 sm:h-14" },
  { src: "/logos/logo-11.png", alt: "Damson Madder", heightClass: "h-9 sm:h-12" },
  { src: "/logos/logo-6.png", alt: "Love Heartwood", heightClass: "h-10 sm:h-14" },
  { src: "/logos/logo-13.png", alt: "Sable & Fern" },
  { src: "/logos/logo-9.png", alt: "Apothaka" },
];

// Dark row — logos flattened to white silhouettes on black.
const rowDark: Logo[] = [
  { src: "/logos/logo-4.png", alt: "Framework" },
  { src: "/logos/logo-8.png", alt: "Mashu" },
  { src: "/logos/logo-12.png", alt: "Velamont" },
  { src: "/logos/logo-3.png", alt: "Liha" },
  { src: "/logos/logo-14.png", alt: "Okko" },
  { src: "/logos/logo-15.png", alt: "Maison Lune" },
  { src: "/logos/logo-16.png", alt: "Harlow" },
];

function MarqueeRow({
  logos,
  variant,
}: {
  logos: Logo[];
  variant: "light" | "dark";
}) {
  const logoFilter =
    variant === "light"
      ? "grayscale opacity-50"
      : "brightness-0 invert opacity-60";

  return (
    <div
      className={`overflow-hidden ${variant === "light" ? "bg-white" : "bg-black"}`}
    >
      <div
        className={`marquee-track flex w-max items-center ${variant === "dark" ? "marquee-reverse" : ""}`}
      >
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
                className={`${logo.heightClass ?? "h-6 sm:h-8"} w-auto max-w-none ${logoFilter}`}
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
      <p className="text-center text-xs sm:text-sm text-muted-foreground uppercase tracking-wide mb-6 sm:mb-8 px-4">
        Trusted by growing Shopify brands
      </p>

      <MarqueeRow logos={rowLight} variant="light" />
      <MarqueeRow logos={rowDark} variant="dark" />

      <style jsx global>{`
        .marquee-track {
          animation: logo-marquee 32s linear infinite;
        }

        .marquee-track.marquee-reverse {
          animation-direction: reverse;
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
