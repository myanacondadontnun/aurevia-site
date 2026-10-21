import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HelpShell from "@/components/help/HelpShell";
import { HELP_CATEGORIES, helpArticles } from "@/lib/help-articles";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import d from "@/components/help/docs.module.css";

export const metadata: Metadata = {
  title: "Documentation | Aurevia",
  description: "Setup and how-to guides for Aurevia: install the widget, train the AI, take over chats, cart recovery, channels, team and billing.",
  alternates: { canonical: "/help" },
};

export default function HelpIndexPage() {
  return (
    <HelpShell>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Documentation", path: "/help" }])} />
      <header className={d.head}>
        <h1 className={d.title}>Documentation</h1>
        <p className={d.lede}>
          Short, step-by-step guides for everything in the merchant app. If something isn&rsquo;t covered,{" "}
          <Link href="/contact/" className={d.inlineLink}>
            tell us
          </Link>{" "}
          and we&rsquo;ll answer and add it here.
        </p>
      </header>

      <div className={d.groups}>
        {HELP_CATEGORIES.map((category) => {
          const articles = helpArticles.filter((a) => a.category === category);
          if (articles.length === 0) return null;
          return (
            <section key={category} aria-labelledby={`help-${category}`}>
              <h2 id={`help-${category}`} className={d.eyebrow}>
                {category}
              </h2>
              <ul className={d.cards}>
                {articles.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/help/${a.slug}/`} className={d.card}>
                      <h3 className={d.cardTitle}>
                        <span>{a.title}</span>
                        <ArrowRight aria-hidden="true" />
                      </h3>
                      <p className={d.cardSummary}>{a.summary}</p>
                      <span className={d.cardMeta}>{a.minutes} min read</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </HelpShell>
  );
}
