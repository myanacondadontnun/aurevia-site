import { Star } from "lucide-react";
import { SHOPIFY_LISTING_URL, SHOPIFY_RATING, SHOPIFY_REVIEW_COUNT } from "@/lib/reviews";

/** "5.0 on Shopify · 6 reviews" with five stars, linking to the listing. */
export default function TrustStrip({ className = "", align = "start" }: { className?: string; align?: "start" | "center" }) {
  return (
    <a
      href={SHOPIFY_LISTING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
      aria-label={`Rated ${SHOPIFY_RATING.toFixed(1)} out of 5 on the Shopify App Store from ${SHOPIFY_REVIEW_COUNT} reviews`}
    >
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-[#f5b301] text-[#f5b301]" />
        ))}
      </span>
      <span>
        <strong className="font-semibold text-foreground">{SHOPIFY_RATING.toFixed(1)}</strong> on Shopify
        <span className="text-foreground/60"> · {SHOPIFY_REVIEW_COUNT} reviews</span>
      </span>
    </a>
  );
}
