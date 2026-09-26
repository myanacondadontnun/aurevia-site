"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HELP_CATEGORIES, helpArticles, sectionId } from "@/lib/help-articles";

/**
 * Left rail: every category, every article, and the active article's sections
 * nested under it. Collapses into a <details> on phones.
 */
export default function HelpSidebar() {
  const pathname = usePathname() ?? "";
  const activeSlug = pathname.replace(/^\/help\/?/, "").replace(/\/$/, "");

  const nav = (
    <nav aria-label="Help center contents" className="text-sm">
      <Link
        href="/help/"
        className={`block rounded-lg px-3 py-1.5 mb-3 font-medium transition-colors ${
          activeSlug === "" ? "bg-primary/10 text-[#00795c]" : "text-foreground hover:bg-muted/60"
        }`}
      >
        All guides
      </Link>
      {HELP_CATEGORIES.map((category) => {
        const articles = helpArticles.filter((a) => a.category === category);
        if (articles.length === 0) return null;
        return (
          <div key={category} className="mb-5">
            <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{category}</p>
            <ul className="space-y-0.5">
              {articles.map((a) => {
                const active = a.slug === activeSlug;
                return (
                  <li key={a.slug}>
                    <Link
                      href={`/help/${a.slug}/`}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-lg px-3 py-1.5 leading-snug transition-colors ${
                        active ? "bg-primary/10 text-[#00795c] font-medium" : "text-foreground/80 hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      {a.title}
                    </Link>
                    {active && (
                      <ul className="mt-1 mb-2 ml-3 border-l border-border/70 pl-3 space-y-0.5">
                        {a.sections.map((s) => (
                          <li key={s.heading}>
                            <a
                              href={`#${sectionId(s.heading)}`}
                              className="block rounded-md px-2 py-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {s.heading}
                            </a>
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
      <details className="lg:hidden mb-6 rounded-xl border border-border/60 bg-card">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-medium text-foreground">Browse guides</summary>
        <div className="border-t border-border/60 px-2 py-3">{nav}</div>
      </details>
      <div className="hidden lg:block sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3">{nav}</div>
    </>
  );
}
