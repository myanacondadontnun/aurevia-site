"use client";

/**
 * Pinned capability showcase. On desktop the stage sticks to the viewport while
 * the section scrolls past: copy on the left, visual on the right, and both
 * crossfade in place as each step's stretch of scroll goes by. On phones and
 * short windows it falls back to a plain stacked list, because a pinned stage
 * can't fit a readable mockup and its copy on one small screen.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";

export interface ShowcaseItem {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
}

const PIN_QUERY = "(min-width: 1024px) and (min-height: 620px)";
/** Scroll distance each step holds the stage for, in vh. */
const STEP_VH = 70;

function Copy({ item }: { item: ShowcaseItem }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted-foreground mb-3">{item.eyebrow}</p>
      <h3 className="text-xl sm:text-3xl font-fraunces font-normal text-foreground leading-tight mb-3 sm:mb-4">
        {item.title}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">{item.body}</p>
      <ul className="flex flex-wrap justify-center lg:justify-start gap-2">
        {item.points.map((pt) => (
          <li
            key={pt}
            className="text-xs sm:text-[13px] font-medium px-3 py-1.5 rounded-full border border-border bg-card text-foreground"
          >
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PinnedShowcase({
  items,
  renderVisual,
  wideVisual = false,
  tallVisual = false,
}: {
  items: ShowcaseItem[];
  /** `active` is defined only when pinned; undefined means the visual manages its own playback. */
  renderVisual: (index: number, active: boolean | undefined) => ReactNode;
  /** Give the visual three fifths of the stage (browser frames) instead of half (phones). */
  wideVisual?: boolean;
  /** Visual is phone-height; shrink it on short screens. */
  tallVisual?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const sync = () => setPinned(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!pinned) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress = span > 0 ? Math.min(0.999, Math.max(0, -rect.top / span)) : 0;
      setCurrent(Math.floor(progress * items.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, items.length]);

  const goTo = (index: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + (span * (index + 0.5)) / items.length;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!pinned) {
    return (
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
        {items.map((item, index) => (
          <div key={item.eyebrow} className="flex flex-col items-center gap-8 sm:gap-10">
            <div className={`flex justify-center ${wideVisual ? "w-full max-w-2xl px-2 pb-8" : ""}`}>
              {renderVisual(index, undefined)}
            </div>
            <div className="max-w-md text-center">
              <Copy item={item} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapRef} style={{ height: `calc(100dvh + ${items.length * STEP_VH}vh)` }}>
      <div className="pin-stage">
        <div
          className={`max-w-6xl mx-auto w-full grid items-center gap-12 xl:gap-16 ${
            wideVisual ? "grid-cols-5" : "grid-cols-2"
          }`}
        >
          <div className={wideVisual ? "col-span-2" : ""}>
            <div className="pin-ticks flex items-center gap-1.5 mb-6" role="tablist" aria-label="Capabilities">
              {items.map((item, index) => (
                <button
                  key={item.eyebrow}
                  type="button"
                  role="tab"
                  aria-selected={index === current}
                  aria-label={item.eyebrow}
                  onClick={() => goTo(index)}
                  className={index === current ? "is-active" : ""}
                />
              ))}
            </div>
            <div className="pin-stack max-w-md">
              {items.map((item, index) => (
                <div key={item.eyebrow} className={index === current ? "is-active" : ""} aria-hidden={index !== current}>
                  <Copy item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className={`pin-stack justify-items-center items-center ${wideVisual ? "col-span-3 px-6 pb-10" : ""}`}>
            {items.map((item, index) => (
              <div
                key={item.eyebrow}
                className={`${index === current ? "is-active" : ""} ${tallVisual ? "pin-visual-tall" : "w-full"}`}
              >
                {renderVisual(index, index === current)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
