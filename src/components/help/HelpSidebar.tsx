"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { HELP_CATEGORIES, helpArticles, sectionId } from "@/lib/help-articles";
import d from "./docs.module.css";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/**
 * Left rail: every category, every guide, and the open guide's sections nested under it. On phones it folds into a
 * "Browse the docs" panel above the guide.
 */
export default function HelpSidebar() {
  const pathname = usePathname() ?? "";
  const activeSlug = pathname.replace(/^\/help\/?/, "").replace(/\/$/, "");

  const nav = (
    <nav aria-label="Documentation contents" className={d.nav}>
      <Link href="/help/" className={cx(d.navAll, activeSlug === "" && d.navOn)} aria-current={activeSlug === "" ? "page" : undefined}>
        All guides
      </Link>
      {HELP_CATEGORIES.map((category) => {
        const articles = helpArticles.filter((a) => a.category === category);
        if (articles.length === 0) return null;
        return (
          <div key={category} className={d.navGroup}>
            <span className={d.eyebrow}>{category}</span>
            <ul className={d.navList}>
              {articles.map((a) => {
                const active = a.slug === activeSlug;
                return (
                  <li key={a.slug}>
                    <Link href={`/help/${a.slug}/`} aria-current={active ? "page" : undefined} className={cx(d.navLink, active && d.navOn)}>
                      {a.title}
                    </Link>
                    {active && (
                      <ul className={d.navSections}>
                        {a.sections.map((s) => (
                          <li key={s.heading}>
                            <a href={`#${sectionId(s.heading)}`}>{s.heading}</a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );

  return (
    <>
      <details className={d.railMobile}>
        <summary>
          Browse the docs <ChevronDown width={18} height={18} aria-hidden="true" />
        </summary>
        <div className={d.railMobileBody}>{nav}</div>
      </details>
      <div className={d.rail}>{nav}</div>
    </>
  );
}
