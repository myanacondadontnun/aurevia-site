"use client";

import Link from "next/link";
import { Shirt, Sparkles, Dumbbell, Smartphone, Home } from "lucide-react";
import { useScrollFade } from "./ScrollAnimations";

const industries = [
  { icon: Shirt, label: "Fashion & apparel", href: "/solutions/fashion" },
  { icon: Sparkles, label: "Health & beauty", href: "/solutions/beauty" },
  { icon: Dumbbell, label: "Fitness & supplements", href: "/solutions/fitness" },
  { icon: Smartphone, label: "Electronics", href: "/solutions/electronics" },
  { icon: Home, label: "Home & garden", href: "/solutions/home-garden" },
];

/** One row of industry chips linking to the solution pages. Replaces the old four-video section. */
export default function Industries() {
  const ref = useScrollFade();
  return (
    <section id="industries" className="py-12 sm:py-16 px-4 sm:px-6">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="container mx-auto max-w-4xl text-center scroll-fade">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00795c] mb-3">Built for your category</p>
        <h2 className="text-2xl sm:text-3xl font-fraunces font-normal text-foreground mb-6">
          See how it sells in <span className="green-highlight">your store&rsquo;s world</span>
        </h2>
        <ul className="flex flex-wrap justify-center gap-2.5">
          {industries.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-2 text-sm text-foreground/85 transition-colors hover:border-[#00CC99]/60 hover:text-[#00795c]"
              >
                <i.icon className="h-4 w-4 text-muted-foreground group-hover:text-[#00795c]" aria-hidden="true" />
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
