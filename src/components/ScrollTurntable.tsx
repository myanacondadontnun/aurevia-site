"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Folder under /public holding f000.webp … fNNN.webp */
  basePath: string;
  frameCount: number;
  /** Element whose scroll progress (0 → 1 across the viewport) drives the rotation */
  scrollRef: React.RefObject<HTMLElement | null>;
  /** Full rotations across the scroll range */
  turns?: number;
  /** Frames per second of idle drift when the user is not scrolling (0 disables) */
  idleFps?: number;
  className?: string;
  alt?: string;
};

const framePath = (base: string, i: number) =>
  `${base}/f${String(i).padStart(3, "0")}.webp`;

/**
 * Draws a pre-rendered turntable sequence to a canvas and scrubs it with scroll.
 * Frames load progressively; until a frame is decoded the nearest loaded one is drawn.
 */
export default function ScrollTurntable({
  basePath,
  frameCount,
  scrollRef,
  turns = 1,
  idleFps = 0,
  className = "",
  alt = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scroller = scrollRef.current;
    if (!canvas || !scroller) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const frames: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    let current = 0; // eased frame position (float)
    let target = 0;
    let idleOffset = 0;
    let lastScrollAt = performance.now();
    let raf = 0;
    let drawnIndex = -1;
    let disposed = false;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        drawnIndex = -1;
      }
    };

    const nearestLoaded = (i: number) => {
      if (frames[i]) return i;
      for (let d = 1; d < frameCount; d++) {
        const a = (i + d) % frameCount;
        const b = (i - d + frameCount) % frameCount;
        if (frames[a]) return a;
        if (frames[b]) return b;
      }
      return -1;
    };

    const draw = (i: number) => {
      const idx = nearestLoaded(i);
      if (idx < 0 || idx === drawnIndex) return;
      const img = frames[idx]!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      drawnIndex = idx;
    };

    const progress = () => {
      const rect = scroller.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top reaches the viewport top, 1 when its bottom reaches the viewport bottom
      const total = rect.height - vh;
      if (total <= 0) return 0;
      return Math.min(1, Math.max(0, -rect.top / total));
    };

    const onScroll = () => {
      target = progress() * turns * frameCount;
      lastScrollAt = performance.now();
    };

    const tick = (now: number) => {
      if (disposed) return;
      if (idleFps > 0 && now - lastScrollAt > 400) {
        idleOffset += idleFps / 60;
      }
      const goal = target + idleOffset;
      current += (goal - current) * 0.12;
      const i =
        ((Math.round(current) % frameCount) + frameCount) % frameCount;
      draw(i);
      raf = requestAnimationFrame(tick);
    };

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          frames[i] = img;
          if (i === 0) draw(0);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(basePath, i);
      });

    // Coarse-to-fine: every 8th frame first so scrubbing looks right early, then fill in.
    const order: number[] = [];
    for (const step of [8, 4, 2, 1]) {
      for (let i = 0; i < frameCount; i += step) {
        if (!order.includes(i)) order.push(i);
      }
    }
    const preload = async () => {
      const queue = [...order];
      const worker = async () => {
        while (queue.length && !disposed) {
          const i = queue.shift()!;
          await load(i);
        }
      };
      await Promise.all(Array.from({ length: 6 }, worker));
    };

    size();
    const ro = new ResizeObserver(() => {
      size();
      draw(((Math.round(current) % frameCount) + frameCount) % frameCount);
    });
    ro.observe(canvas);

    if (reduceMotion) {
      load(0);
      return () => {
        disposed = true;
        ro.disconnect();
      };
    }

    preload();
    onScroll();
    current = target;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [basePath, frameCount, scrollRef, turns, idleFps]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    />
  );
}
