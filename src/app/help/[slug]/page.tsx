import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import HelpShell from "@/components/help/HelpShell";
import HelpToc from "@/components/help/HelpToc";
import { getAdjacentArticles, getHelpArticle, getHelpSlugs, helpArticles, sectionId } from "@/lib/help-articles";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import d from "@/components/help/docs.module.css";

export function generateStaticParams() {
  return getHelpSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Aurevia Documentation`,
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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Documentation", path: "/help" },
          { name: article.title, path: `/help/${article.slug}` },
        ])}
      />
      <article className={d.article}>
        <span className={d.eyebrow}>{article.category}</span>
        <h1 className={d.articleTitle}>{article.title}</h1>
        <p className={d.articleSummary}>{article.summary}</p>
        <p className={d.articleMeta}>
          {article.minutes} min read · Updated {article.updated}
        </p>

        <div className={d.sections}>
          {article.sections.map((section) => (
            <section key={section.heading} id={sectionId(section.heading)} className={d.section}>
              <h2 className={d.h2}>{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className={d.para}>
                  {p}
                </p>
              ))}
              {section.steps && (
                <ol className={d.steps}>
                  {section.steps.map((step, i) => (
                    <li key={i}>
                      <span className={d.stepNo} aria-hidden="true">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              {section.tips && (
                <div className={d.tips}>
                  <span className={d.eyebrow}>Good to know</span>
                  <ul>
                    {section.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        <nav aria-label="Previous and next guides" className={d.pager}>
          {prev ? (
            <Link href={`/help/${prev.slug}/`} className={d.pageLink}>
              <ArrowLeft aria-hidden="true" />
              <span className={d.pageText}>
                <small>Previous</small>
                <b>{prev.title}</b>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/help/${next.slug}/`} className={`${d.pageLink} ${d.pageNext}`}>
              <span className={d.pageText}>
                <small>Next</small>
                <b>{next.title}</b>
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </nav>

        {related.length > 0 && (
          <aside className={d.related}>
            <h2 className={d.eyebrow}>Related guides</h2>
            <ul className={d.pills}>
              {related.map((a) => (
                <li key={a.slug}>
                  <Link href={`/help/${a.slug}/`} className={d.pill}>
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
