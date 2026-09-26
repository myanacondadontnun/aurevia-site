"use client";

import { useScrollFade } from "./ScrollAnimations";
import ReviewQuote from "./ReviewQuote";
import TrustStrip from "./TrustStrip";
import { getReview } from "@/lib/reviews";

const picks = ["masks-capes", "purebronze", "l1nk"].map(getReview);

export default function MerchantReviews() {
  const ref = useScrollFade();
  return (
    <section className="py-14 sm:py-24 px-4 sm:px-6">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="container mx-auto max-w-6xl scroll-fade">
        <div className="text-center mb-10">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00795c] mb-3">From the App Store</p>
          <h2 className="text-2xl sm:text-4xl font-fraunces font-normal text-foreground mb-4">
            What merchants <span className="green-highlight">say</span>
          </h2>
          <TrustStrip align="center" />
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {picks.map((r) => (
            <li key={r.id}>
              <ReviewQuote review={r} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
