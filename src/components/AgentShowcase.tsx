"use client";

import { useEffect, useRef, useState } from "react";
import ScrollTurntable from "./ScrollTurntable";

const steps = [
  {
    eyebrow: "Step 01",
    title: "Asks before it answers",
    body: "Shoppers rarely arrive knowing what they want. Aurevia opens with a clarifying question, the way a good floor rep would.",
  },
  {
    eyebrow: "Step 02",
    title: "Recommends what they'll actually buy",
    body: "It matches intent to inventory and suggests the two or three products most likely to convert, not a wall of results.",
  },
  {
    eyebrow: "Step 03",
    title: "Recovers the cart before it's gone",
    body: "On exit intent it answers the last objection and drops a one-click checkout link. Revenue you'd otherwise lose.",
  },
];

export default function AgentShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Which step is "lit" follows the same scroll progress the turntable uses.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="agent-showcase-heading"
      className="relative h-[240vh] sm:h-[280vh]"
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="container mx-auto h-full px-4 sm:px-6">
          <div className="grid h-full grid-rows-[auto_1fr] items-center gap-4 lg:grid-cols-2 lg:grid-rows-1 lg:gap-12">
            {/* Turntable */}
            <div className="relative mx-auto flex w-full max-w-[280px] items-center justify-center pt-20 sm:max-w-[360px] lg:order-2 lg:max-w-[520px] lg:pt-0">
              <div
                aria-hidden
                className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(0,204,153,0.22)_0%,rgba(0,204,153,0)_70%)] blur-2xl"
              />
              <ScrollTurntable
                basePath="/turntable/ai-mark"
                frameCount={120}
                scrollRef={sectionRef}
                turns={1}
                idleFps={4}
                alt="Aurevia AI agent mark rotating"
                className="relative aspect-square w-full"
              />
            </div>

            {/* Copy */}
            <div className="self-start lg:order-1 lg:self-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#009973]">
                How the agent sells
              </p>
              <h2
                id="agent-showcase-heading"
                className="font-fraunces text-2xl font-normal leading-[1.15] text-foreground sm:text-4xl lg:text-5xl"
              >
                One agent,{" "}
                <span className="green-highlight">every step of the sale</span>
              </h2>

              <ol className="mt-6 space-y-3 sm:mt-10 sm:space-y-5">
                {steps.map((s, i) => {
                  const on = i === active;
                  return (
                    <li
                      key={s.title}
                      className={`border-l-2 pl-4 transition-all duration-500 sm:pl-6 ${
                        on
                          ? "border-[#00CC99] opacity-100"
                          : "border-border opacity-40"
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {s.eyebrow}
                      </p>
                      <h3 className="mt-1 text-base font-medium text-foreground sm:text-xl">
                        {s.title}
                      </h3>
                      <p
                        className={`mt-1 max-w-md text-sm leading-relaxed text-muted-foreground transition-all duration-500 sm:text-base ${
                          on ? "max-h-40 opacity-100" : "max-h-0 overflow-hidden opacity-0 sm:max-h-40 sm:opacity-100"
                        }`}
                      >
                        {s.body}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
