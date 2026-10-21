"use client";

import { useEffect, useState } from "react";
import d from "./docs.module.css";

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
    <nav aria-label="On this page" className={d.toc}>
      <span className={d.eyebrow}>On this page</span>
      <ul className={d.tocList}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={item.id === active ? d.tocOn : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
