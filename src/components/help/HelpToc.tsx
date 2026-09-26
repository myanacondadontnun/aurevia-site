"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
}

/** Right rail: the open article's sections, highlighting the one in view. */
export default function HelpToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const headings = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 1] }
    );
    headings.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page" className="hidden xl:block sticky top-28 text-sm">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">On this page</p>
      <ul className="space-y-1 border-l border-border/70">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`-ml-px block border-l-2 pl-3 py-1 leading-snug transition-colors ${
                  isActive ? "border-[#00CC99] text-[#00795c] font-medium" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
