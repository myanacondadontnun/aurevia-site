"use client";

import { useEffect, useRef } from "react";
import h from "./hero.module.css";

/** Turns the watermark very slowly, a little faster while the page scrolls (easing back after), and lets it
    drift with a light parallax: it moves up at a quarter of the scroll speed, so it reads as further back.
    Paused while the hero is off screen; still under reduced motion. */
function useSpin<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const BASE = 3; // degrees per second: one turn every two minutes
    const MAX_BOOST = 9; // scrolling at most quadruples it
    const PARALLAX = 0.25;
    let angle = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let last = 0;
    let raf = 0;
    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(boost + Math.abs(y - lastY) * 0.05, MAX_BOOST);
      lastY = y;
    };
    const tick = (t: number) => {
      const dt = last ? Math.min(t - last, 64) / 1000 : 0;
      last = t;
      angle = (angle + (BASE + boost) * dt) % 360;
      boost *= Math.exp(-1.6 * dt);
      el.style.transform = `translateY(${-window.scrollY * PARALLAX}px) rotate(${angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return ref;
}

/** The hero's signature: the Aurevia ring cropped by the right edge, turning slowly (shared by the home and product
    heroes, which both use hero.module.css). */
export default function HeroWatermark() {
  const spinRef = useSpin<HTMLSpanElement>();
  return (
    <span className={h.watermark} aria-hidden="true">
      <span ref={spinRef} className={h.watermarkSpin} />
    </span>
  );
}
