"use client";

import { Clock, CalendarCheck, Rocket, Hand } from "lucide-react";
import { useScrollFade } from "./ScrollAnimations";

const facts = [
  { icon: Clock, value: "24/7", label: "Selling while you sleep", note: "Every page, every hour, in your brand's voice." },
  { icon: CalendarCheck, value: "14 days", label: "Free trial, no card", note: "500 shopper messages included. Billed through Shopify after." },
  { icon: Rocket, value: "~10 min", label: "Install to first chat", note: "Catalog syncs itself. Add your policies and go live." },
  { icon: Hand, value: "1 click", label: "Take over any chat", note: "From the dashboard or your phone, then hand back to the AI." },
];

export default function Stats() {
  const ref = useScrollFade();
  return (
    <section className="py-14 sm:py-24 px-4 sm:px-6">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="container mx-auto max-w-6xl scroll-fade">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-fraunces text-2xl font-normal leading-tight text-foreground sm:text-4xl md:text-[2.75rem]">
            Somewhere right now, a customer left your store.{" "}
            <span className="green-highlight">AI would have saved that sale.</span>
          </h2>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <li key={f.value} className="rounded-2xl border border-border/60 bg-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#009973]/10 text-[#00795c]" aria-hidden="true">
                <f.icon className="h-5 w-5" />
              </span>
              <p className="mt-4 font-fraunces text-3xl leading-none text-foreground sm:text-4xl">{f.value}</p>
              <p className="mt-2 text-sm font-medium text-foreground">{f.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{f.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
