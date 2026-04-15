"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cn, SHOPIFY_APP_URL } from "@/lib/utils";

export const AI_COMPARISON_TOC = [
  { id: "what-makes-great", label: "What makes a great AI sales agent?" },
  { id: "why-you-need", label: "Why you need one on Shopify" },
  { id: "how-we-compared", label: "How we compared these tools" },
  { id: "quick-comparison", label: "Quick comparison table" },
  { id: "spider-charts", label: "Spider diagrams" },
  { id: "detailed-reviews", label: "Detailed reviews (top 6)" },
  { id: "full-landscape", label: "Full market landscape" },
  { id: "deep-tables", label: "Category deep-dives" },
  { id: "feature-matrix", label: "Feature matrix" },
  { id: "verdict", label: "Verdict & next steps" },
] as const;

const NAVBAR_OFFSET = 112;

/**
 * Pick the section whose heading band overlaps the "reading zone" most.
 * Returns null while the hero sits above the first in-page anchor.
 */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const rafRef = useRef<number>(0);

  const updateActive = useCallback(() => {
    const first = ids.length ? document.getElementById(ids[0]) : null;
    if (first) {
      const firstTop = first.getBoundingClientRect().top;
      if (firstTop > NAVBAR_OFFSET + 72) {
        setActive(null);
        return;
      }
    }

    const vh = window.innerHeight;
    const bandTop = NAVBAR_OFFSET + 8;
    const bandBottom = Math.min(vh * 0.62, vh - 80);

    let best: string | null = null;
    let bestOverlap = 0;

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const overlap = Math.max(0, Math.min(r.bottom, bandBottom) - Math.max(r.top, bandTop));
      const headingBoost = r.top <= bandTop + 24 && r.bottom > bandTop ? 48 : 0;
      const score = overlap + headingBoost;
      if (score > bestOverlap) {
        bestOverlap = score;
        best = id;
      }
    }

    setActive(bestOverlap >= 28 ? best : null);
  }, [ids]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        ticking = false;
        updateActive();
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateActive]);

  return active;
}

export default function AIComparisonListicleLayout({ children }: { children: ReactNode }) {
  const ids = AI_COMPARISON_TOC.map((t) => t.id);
  const active = useActiveSection(ids);

  return (
    <div className="mx-auto max-w-[1280px] xl:overflow-visible">
      {/* Mobile / tablet: horizontal mini-TOC */}
      <nav
        className="mb-8 flex gap-2 overflow-x-auto pb-1 xl:hidden [-webkit-overflow-scrolling:touch]"
        aria-label="On this page"
      >
        {AI_COMPARISON_TOC.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300",
              active != null && active === item.id
                ? "border-[#02DFA6]/45 bg-[#02DFA6]/[0.14] text-[#02DFA6] shadow-[0_0_0_1px_rgba(2,223,166,0.18),0_6px_20px_-8px_rgba(2,223,166,0.25)]"
                : "border-border/50 bg-card/40 text-muted-foreground hover:border-[#02DFA6]/28 hover:text-white",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* align-items stretch (default) so side columns are as tall as the article — required for position:sticky */}
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,210px)_minmax(0,1fr)_minmax(0,201px)] xl:gap-12 xl:overflow-visible">
        {/* Left: TOC rail spans full row height; inner nav sticks while that rail scrolls through viewport */}
        <aside className="relative hidden min-h-0 xl:block xl:overflow-visible" aria-label="Table of contents">
          {/* Sticky must NOT share a node with overflow:auto — that breaks viewport stickiness */}
          <div className="sticky top-28 z-20 w-full pb-10">
            <nav className="max-h-[calc(100dvh-7.5rem)] overflow-y-auto overflow-x-visible overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                On this page
              </p>
              <ul className="space-y-1 border-l border-white/[0.08] pl-0">
                {AI_COMPARISON_TOC.map((item) => {
                  const isActive = active != null && active === item.id;
                  return (
                    <li key={item.id} className="relative pl-2">
                      <a
                        href={`#${item.id}`}
                        className={cn(
                          "relative block rounded-lg py-2.5 pl-3 pr-2.5 text-[13px] leading-snug transition-all duration-300 ease-out",
                          isActive
                            ? "bg-white/[0.09] pl-3.5 font-medium text-white shadow-[0_2px_16px_-4px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.08]"
                            : "font-light text-muted-foreground hover:bg-white/[0.04] hover:text-white/95",
                        )}
                      >
                        {isActive && (
                          <span
                            className="pointer-events-none absolute left-1 top-1/2 h-[70%] w-[3px] -translate-y-1/2 rounded-full bg-[#02DFA6] shadow-[0_0_12px_rgba(2,223,166,0.45)]"
                            aria-hidden
                          />
                        )}
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Center: article */}
        <article className="min-w-0 xl:min-h-0">{children}</article>

        {/* Right: CTA rail spans full row height; inner column sticks */}
        <aside className="relative hidden min-h-0 xl:block xl:overflow-visible" aria-label="Get started">
          <div className="sticky top-28 z-20 w-full pb-10">
            <div className="max-h-[calc(100dvh-7.5rem)] overflow-y-auto overflow-x-visible overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#051210] p-3.5 shadow-lg shadow-black/35 ring-1 ring-[#02DFA6]/10">
                <div className="mb-3 flex items-center gap-2">
                  <img
                    src="/images/Logo_wo_bg.png"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 shrink-0 object-contain"
                  />
                  <span className="font-montserrat text-xs font-thin tracking-[0.05em] text-white/90">
                    Aurevia.io
                  </span>
                </div>
                <h2 className="font-playfair text-lg font-normal leading-snug text-white sm:text-xl">
                  Hire your AI sales co-pilot
                </h2>
                <p className="mt-1.5 text-xs font-light leading-relaxed text-muted-foreground">
                  Install in minutes. Guided checkout, upsells, and attribution — tuned for Shopify.
                </p>
                <div className="mt-3.5 flex flex-col gap-2">
                  <a
                    href={SHOPIFY_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#02DFA6] px-3 py-2 text-xs font-medium text-black transition-colors hover:bg-[#02DFA6]/90"
                  >
                    Try for free
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <Link
                    href="/pricing/"
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-transparent px-3 py-2 text-xs font-medium text-white transition-colors hover:border-[#02DFA6]/40 hover:bg-white/[0.04]"
                  >
                    View pricing
                  </Link>
                  <Link
                    href="/resources/roi-calculator/"
                    className="text-center text-[11px] font-light text-muted-foreground underline-offset-2 hover:text-[#02DFA6] hover:underline"
                  >
                    Model ROI with our calculator →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
