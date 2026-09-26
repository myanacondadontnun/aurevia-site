import { Star, BadgeCheck } from "lucide-react";
import type { Review } from "@/lib/reviews";
import { SHOPIFY_LISTING_URL } from "@/lib/reviews";

function initials(store: string) {
  const words = store.replace(/[_\-]+/g, " ").split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : store.slice(0, 2)).toUpperCase();
}

/** One verbatim App Store review: store avatar, stars, the quote in Fraunces, verified footer. */
export default function ReviewQuote({ review, compact = false }: { review: Review; compact?: boolean }) {
  return (
    <figure
      className={`relative flex h-full flex-col rounded-2xl border border-border/60 bg-card ${compact ? "p-5 sm:p-6" : "p-7 sm:p-9"}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-5 top-3 select-none font-fraunces leading-none text-[#009973]/15 ${compact ? "text-6xl" : "text-8xl"}`}
      >
        &rdquo;
      </span>

      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f3d30] text-xs font-semibold tracking-wide text-white"
        >
          {initials(review.store)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-foreground">{review.store}</span>
          <span className="block text-xs text-muted-foreground">{review.country}</span>
        </span>
      </div>

      <div className="mt-4 flex items-center gap-0.5" aria-label="Rated 5 out of 5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[#f5b301] text-[#f5b301]" aria-hidden="true" />
        ))}
      </div>

      <blockquote className={`mt-3 flex-1 font-fraunces text-foreground leading-snug ${compact ? "text-[1.05rem] sm:text-lg" : "text-xl sm:text-2xl"}`}>
        {review.quote}
      </blockquote>

      <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-border/60 pt-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <BadgeCheck className="h-4 w-4 text-[#009973]" aria-hidden="true" />
          Verified review
        </span>
        <a href={SHOPIFY_LISTING_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline-offset-2 hover:underline">
          Shopify App Store
        </a>
      </figcaption>
    </figure>
  );
}
