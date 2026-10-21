"use client";

/* Playback clock for scripted product demos (product page scenes, cart recovery demos): a millisecond timeline
   that plays while the demo is on screen, holds the finished state, then loops. */

import { useEffect, useRef, useState } from "react";

const HOLD = 2800;

/** Playback clock for one scene, restarting from 0 each time it comes into view. Before that it shows the finished
    state (no-JS, thumbnails), or the first frame with `fromStart` for demos whose screens would visibly slide back. */
export function useScene(end: number, { fromStart = false }: { fromStart?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [ms, setMs] = useState(fromStart ? 0 : end);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMs(end);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      let e = t - start;
      if (e >= end + HOLD) {
        start = t;
        e = 0;
      }
      const v = Math.min(Math.round(e / 40) * 40, end);
      setMs((prev) => (prev === v ? prev : v));
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting) {
        start = 0;
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end]);
  return { ref, ms };
}

/** 0 → 1 progress of a window inside the timeline. */
export const span = (ms: number, from: number, to: number) => Math.max(0, Math.min(1, (ms - from) / (to - from)));
/** Text typed out between two times. */
export const typed = (text: string, ms: number, from: number, to: number) => text.slice(0, Math.round(span(ms, from, to) * text.length));
