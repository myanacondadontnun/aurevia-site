"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { reviews, SHOPIFY_LISTING_URL, SHOPIFY_RATING, SHOPIFY_REVIEW_COUNT } from "@/lib/reviews";
import s from "./reviewsShowcase.module.css";

/**
 * "What merchants say": one review at a time as a large editorial pull-quote, with the store names beneath as
 * tabs (a hairline fills under the active one while it rotates). Quotes are verbatim from lib/reviews; the green
 * phrase is an exact substring of the review, only coloured, never reworded.
 */

const FEATURED: { id: string; highlight: string }[] = [
  { id: "masks-capes", highlight: "how quickly customers get guided to the right product" },
  { id: "lotus-beauty", highlight: "Aurevia help increasing order value" },
  { id: "l1nk", highlight: "Seeing those conversations has helped us understand what people are really looking for" },
  { id: "purebronze", highlight: "It saves time so I can focus on running the business." },
  { id: "pippi-ceramics", highlight: "AI chat, product recommendations and customer assistance" },
  { id: "littleangel", highlight: "a nice time-saver" },
  { id: "fresh-famous", highlight: "The setup was surprisingly simple" },
];

/** The reviewing store's own logo, where the site has it (public/logos), drawn in the name's ink colour through
    a mask; `ratio` is width / height. Stores without one show just their name. */
const LOGOS: Record<string, { src: string; ratio: number }> = {
  "masks-capes": { src: "/logos/customer-masks.webp", ratio: 127 / 65 },
  purebronze: { src: "/logos/customer-purebronze.webp", ratio: 190 / 243 },
};

const ROTATE_MS = 8000;

function Quote({ text, highlight }: { text: string; highlight: string }) {
  const at = text.indexOf(highlight);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className={s.mark}>{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  );
}

export default function ReviewsShowcase() {
  const items = FEATURED.map((f) => ({ ...f, review: reviews.find((r) => r.id === f.id) })).filter(
    (x): x is { id: string; highlight: string; review: (typeof reviews)[number] } => Boolean(x.review),
  );
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % items.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduced, cycle, items.length]);

  const pick = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
  };

  return (
    <section className={s.section} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className={s.top}>
          <h2 className={s.title}>What merchants say</h2>
          <a href={SHOPIFY_LISTING_URL} target="_blank" rel="noopener noreferrer" className={s.rating}>
            <span className={s.score}>{SHOPIFY_RATING.toFixed(1)}</span>
            <span className={s.ratingText}>
              <span className={s.stars} aria-label={`${SHOPIFY_RATING.toFixed(1)} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} aria-hidden="true" />)}
              </span>
              <span className={s.ratingLine}>
                {SHOPIFY_REVIEW_COUNT} reviews on the Shopify App Store <ArrowRight aria-hidden="true" />
              </span>
            </span>
          </a>
        </div>

        {/* Every quote sits in the same grid cell, so the block is always as tall as the longest one and nothing
            below it moves when the quote changes. */}
        <div className={s.stage} aria-live="polite">
          {items.map((item, i) => (
            <figure key={item.id} className={`${s.figure} ${i === active ? s.on : ""}`} aria-hidden={i !== active}>
              <span className={s.openMark} aria-hidden="true">&ldquo;</span>
              <blockquote className={s.quote}>
                <Quote text={item.review.quote} highlight={item.highlight} />
              </blockquote>
              <figcaption className={s.by}>
                {LOGOS[item.id] && (
                  <span
                    className={s.logo}
                    aria-hidden="true"
                    style={{
                      width: `calc(var(--logo-h) * ${LOGOS[item.id].ratio})`,
                      WebkitMaskImage: `url(${LOGOS[item.id].src})`,
                      maskImage: `url(${LOGOS[item.id].src})`,
                    }}
                  />
                )}
                <span>
                  <span className={s.store}>{item.review.store}</span>
                  <span className={s.where}>{item.review.country} · Shopify App Store review</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div role="tablist" aria-label="Choose a review" className={s.tabs}>
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => pick(i)}
              className={`${s.tab} ${i === active ? s.tabOn : ""}`}
            >
              {item.review.store}
              {i === active && !reduced && (
                <span
                  key={`${active}-${cycle}`}
                  className={`${s.fill} ${paused ? s.fillPaused : ""}`}
                  style={{ animationDuration: `${ROTATE_MS}ms` }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
