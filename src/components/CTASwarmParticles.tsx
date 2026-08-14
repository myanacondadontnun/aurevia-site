"use client";

import { useEffect, useRef } from "react";

const MAX_SPEED = 1.35;
const MAX_FORCE = 0.055;
const SEP_DIST = 28;
const COH_DIST = 120;
const ALIGN_DIST = 70;
const DEFAULT_BOID_COUNT = 52;

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: "mint" | "white";
}

function limit(vx: number, vy: number, max: number) {
  const m = Math.hypot(vx, vy);
  if (m > max && m > 0) {
    return [(vx / m) * max, (vy / m) * max];
  }
  return [vx, vy];
}

type CTASwarmParticlesProps = {
  /** Lower counts (e.g. 12–18) when many instances exist on one page. */
  boidCount?: number;
  roundedClassName?: string;
};

export default function CTASwarmParticles({
  boidCount = DEFAULT_BOID_COUNT,
  roundedClassName = "rounded-3xl",
}: CTASwarmParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const N = Math.max(4, Math.min(boidCount, 80));
    let animationId: number;
    let boids: Boid[] = [];
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let t = 0;

    const initBoids = () => {
      boids = Array.from({ length: N }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        hue: Math.random() > 0.42 ? "mint" : "white",
      }));
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      cx = w * 0.5;
      cy = h * 0.38;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      if (boids.length === 0 && w >= 32 && h >= 32) initBoids();
    };

    const seek = (
      px: number,
      py: number,
      tx: number,
      ty: number,
      vx: number,
      vy: number,
      weight: number
    ) => {
      const dx = tx - px;
      const dy = ty - py;
      const d = Math.hypot(dx, dy) || 0.001;
      const desiredVx = (dx / d) * MAX_SPEED;
      const desiredVy = (dy / d) * MAX_SPEED;
      return [(desiredVx - vx) * weight, (desiredVy - vy) * weight];
    };

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      if (w < 32 || h < 32 || boids.length === 0) {
        animationId = requestAnimationFrame(tick);
        return;
      }

      if (reducedMotion) {
        ctx.clearRect(0, 0, w, h);
        for (const b of boids) {
          ctx.fillStyle =
            b.hue === "mint"
              ? "rgba(0,204,153, 0.22)"
              : "rgba(255, 255, 255, 0.12)";
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.hue === "mint" ? 1.5 : 1, 0, Math.PI * 2);
          ctx.fill();
        }
        return;
      }

      t += 0.012;
      const wanderCx = cx + Math.sin(t * 0.7) * (w * 0.12);
      const wanderCy = cy + Math.cos(t * 0.55) * (h * 0.08);

      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];
        let fx = 0;
        let fy = 0;

        let sepX = 0;
        let sepY = 0;
        let cohX = 0;
        let cohY = 0;
        let cohN = 0;
        let alignVx = 0;
        let alignVy = 0;
        let alignN = 0;

        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          const o = boids[j];
          const dx = b.x - o.x;
          const dy = b.y - o.y;
          const dist = Math.hypot(dx, dy) || 0.001;

          if (dist < SEP_DIST) {
            sepX += dx / dist;
            sepY += dy / dist;
          }
          if (dist < COH_DIST) {
            cohX += o.x;
            cohY += o.y;
            cohN++;
          }
          if (dist < ALIGN_DIST) {
            alignVx += o.vx;
            alignVy += o.vy;
            alignN++;
          }
        }

        if (cohN > 0) {
          const [sx, sy] = seek(
            b.x,
            b.y,
            cohX / cohN,
            cohY / cohN,
            b.vx,
            b.vy,
            0.018
          );
          fx += sx;
          fy += sy;
        }
        if (alignN > 0) {
          const ax = alignVx / alignN - b.vx;
          const ay = alignVy / alignN - b.vy;
          fx += ax * 0.04;
          fy += ay * 0.04;
        }
        fx += sepX * 0.85;
        fy += sepY * 0.85;

        const [wx, wy] = seek(
          b.x,
          b.y,
          wanderCx,
          wanderCy,
          b.vx,
          b.vy,
          0.022
        );
        fx += wx;
        fy += wy;

        const edgePad = 40;
        if (b.x < edgePad) fx += (edgePad - b.x) * 0.006;
        if (b.x > w - edgePad) fx -= (b.x - (w - edgePad)) * 0.006;
        if (b.y < edgePad) fy += (edgePad - b.y) * 0.006;
        if (b.y > h - edgePad) fy -= (b.y - (h - edgePad)) * 0.006;

        b.vx += fx * MAX_FORCE;
        b.vy += fy * MAX_FORCE;
        [b.vx, b.vy] = limit(b.vx, b.vy, MAX_SPEED);
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < -20) b.x = w + 20;
        if (b.x > w + 20) b.x = -20;
        if (b.y < -20) b.y = h + 20;
        if (b.y > h + 20) b.y = -20;
      }

      ctx.clearRect(0, 0, w, h);

      for (const b of boids) {
        const alpha = b.hue === "mint" ? 0.35 + Math.sin(t * 2 + b.x * 0.02) * 0.12 : 0.2;
        const r = b.hue === "mint" ? 1.6 : 1.1;
        if (b.hue === "mint") {
          ctx.fillStyle = `rgba(0,204,153, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(tick);
    };

    resize();
    tick();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [boidCount]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-[1] pointer-events-none overflow-hidden ${roundedClassName}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
