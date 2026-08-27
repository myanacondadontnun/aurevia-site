"use client";

import { useItemScrollFade, useParallaxContainer } from "./ScrollAnimations";

const panels = [
  {
    title: "Every metric, one glance",
    description:
      "Active chats, resolution rate, revenue sold by AI — your entire operation surfaces the moment you log in.",
    image: "/images/home-dashboard.png",
  },
  {
    title: "Live on your storefront, selling in real time",
    description:
      "Aurevia chats with shoppers on your live store, recommending products and closing sales — this is the widget actually running, not a mockup.",
    image: "/images/widget-storefront-demo.png",
  },
  {
    title: "Feed it your docs, watch it get sharper",
    description:
      "Drop in return policies, size guides, and FAQs — Aurevia stays on-brand and stops guessing on technical questions.",
    image: "/images/ai-training-dashboard.png",
  },
  {
    title: "Watch every conversation as it happens",
    description:
      "See what shoppers are asking and what's in their cart, and step in yourself with one click if you need to.",
    image: "/images/lead-management-dashboard.png",
  },
  {
    title: "Your whole catalog, always in sync",
    description:
      "Products, pricing, and stock sync straight from Shopify — no manual uploads, no stale listings.",
    image: "/images/product-management-dashboard.png",
  },
];

export default function DashboardShowcase() {
  const fadeRef = useItemScrollFade(140);
  const parallaxRef = useParallaxContainer(28);

  return (
    <section id="how-it-works" className="py-12 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-20 scroll-fade">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-fraunces font-normal mb-3 sm:mb-4 text-foreground">
            One Agent, <span className="green-highlight">Every Part of Your Store</span>
          </h2>
          <p className="text-sm sm:text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            From the storefront widget to the dashboard behind it — here's what running on Aurevia actually looks like.
          </p>
        </div>

        <div
          ref={(node) => {
            const mutableFadeRef = fadeRef as { current: HTMLElement | null };
            const mutableParallaxRef = parallaxRef as { current: HTMLElement | null };
            mutableFadeRef.current = node;
            mutableParallaxRef.current = node;
          }}
          className="max-w-5xl mx-auto space-y-16 sm:space-y-28"
        >
          {panels.map((panel, index) => (
            <div
              key={panel.title}
              className={`scroll-fade-item flex flex-col ${
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-6 sm:gap-10 md:gap-14`}
            >
              <div className="w-full md:w-3/5">
                <div className="parallax-item rounded-xl sm:rounded-2xl overflow-hidden border border-border/60 shadow-2xl bg-card">
                  <img
                    src={panel.image}
                    alt={panel.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/5 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-inter font-normal text-foreground leading-tight mb-3 sm:mb-4">
                  {panel.title}
                </h3>
                <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                  {panel.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
