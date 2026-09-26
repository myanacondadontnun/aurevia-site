import type { Metadata } from "next";
import Link from "next/link";
import HelpShell from "@/components/help/HelpShell";
import { HELP_CATEGORIES, helpArticles } from "@/lib/help-articles";

export const metadata: Metadata = {
  title: "Help Center | Aurevia",
  description: "Setup and how-to guides for Aurevia: install the widget, train the AI, take over chats, cart recovery, channels, team and billing.",
  alternates: { canonical: "/help" },
};

export default function HelpIndexPage() {
  return (
    <HelpShell>
      <header className="mb-10">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00795c] mb-3">Help center</p>
        <h1 className="text-3xl sm:text-5xl font-fraunces font-normal text-foreground mb-3">
          Set up and run <span className="green-highlight">Aurevia</span>
        </h1>
        <p className="text-sm sm:text-lg font-light text-muted-foreground max-w-2xl">
          Short, step-by-step guides for everything in the merchant app. If something isn&rsquo;t covered,{" "}
          <Link href="/contact" className="text-[#00CC99] hover:underline">
            contact us
          </Link>{" "}
          and we&rsquo;ll answer and add it here.
        </p>
      </header>

      <div className="space-y-12">
        {HELP_CATEGORIES.map((category) => {
          const articles = helpArticles.filter((a) => a.category === category);
          if (articles.length === 0) return null;
          return (
            <section key={category} aria-labelledby={`help-${category}`}>
              <h2 id={`help-${category}`} className="text-xs font-semibold tracking-[0.16em] uppercase text-muted-foreground mb-4">
                {category}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {articles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/help/${a.slug}/`}
                      className="group block h-full rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-[#00CC99]/60"
                    >
                      <h3 className="text-base sm:text-lg font-medium text-foreground leading-snug mb-1.5 group-hover:text-[#00795c]">
                        {a.title}
                      </h3>
                      <p className="text-sm font-light text-muted-foreground leading-relaxed mb-3">{a.summary}</p>
                      <span className="text-xs text-muted-foreground">{a.minutes} min read</span>
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
