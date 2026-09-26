import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HelpShell from "@/components/help/HelpShell";
import HelpToc from "@/components/help/HelpToc";
import { getAdjacentArticles, getHelpArticle, getHelpSlugs, helpArticles, sectionId } from "@/lib/help-articles";

export function generateStaticParams() {
  return getHelpSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Aurevia Help Center`,
    description: article.summary,
    alternates: { canonical: `/help/${article.slug}` },
  };
}

export default async function HelpArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) notFound();

  const toc = article.sections.map((s) => ({ id: sectionId(s.heading), label: s.heading }));
  const { prev, next } = getAdjacentArticles(article.slug);
  const related = (article.related ?? [])
    .map((s) => helpArticles.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <HelpShell aside={<HelpToc items={toc} />}>
      <article className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#00795c] mb-3">{article.category}</p>
        <h1 className="text-3xl sm:text-4xl font-fraunces font-normal text-foreground leading-tight mb-3">{article.title}</h1>
        <p className="text-base sm:text-lg font-light text-muted-foreground mb-2">{article.summary}</p>
        <p className="text-xs text-muted-foreground mb-10">
          {article.minutes} min read · Updated {article.updated}
        </p>

        <div className="space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading} id={sectionId(section.heading)} className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-fraunces font-normal text-foreground mb-3">{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed mb-3">
                  {p}
                </p>
              ))}
              {section.steps && (
                <ol className="mt-2 space-y-2.5">
                  {section.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm sm:text-base text-foreground/90 leading-relaxed">
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-[#00795c]"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              {section.tips && (
                <div className="mt-4 rounded-xl border border-[#00CC99]/30 bg-[#00CC99]/8 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#00795c] mb-2">Good to know</p>
                  <ul className="space-y-1.5">
                    {section.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-foreground/85 leading-relaxed">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        <nav aria-label="Previous and next guides" className="mt-14 grid gap-3 sm:grid-cols-2 border-t border-border/60 pt-8">
          {prev ? (
            <Link
              href={`/help/${prev.slug}/`}
              className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 hover:border-[#00CC99]/60 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-[#00795c]" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">Previous</span>
                <span className="block text-sm font-medium text-foreground leading-snug">{prev.title}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/help/${next.slug}/`}
              className="group flex items-center justify-end gap-3 rounded-xl border border-border/60 bg-card p-4 text-right hover:border-[#00CC99]/60 transition-colors"
            >
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-wide text-muted-foreground">Next</span>
                <span className="block text-sm font-medium text-foreground leading-snug">{next.title}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-[#00795c]" aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </nav>

        {related.length > 0 && (
          <aside className="mt-10">
            <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-muted-foreground mb-3">Related guides</h2>
            <ul className="flex flex-wrap gap-2">
              {related.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/help/${a.slug}/`}
                    className="inline-block rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs sm:text-[13px] text-foreground/80 hover:border-[#00CC99]/60 hover:text-foreground transition-colors"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </HelpShell>
  );
}
