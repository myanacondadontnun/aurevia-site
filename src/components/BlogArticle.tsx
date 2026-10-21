/**
 * One blog post: a back link to the blog, the category, title and byline, then the article in a readable column
 * (~44rem) with an on-this-page rail on wide screens, the questions, the author card, one call to action and related
 * posts (design.md type, cards and pills).
 */

import { Fragment } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { type BlogPost, type BlogSection, type SubSection, getRelatedPosts } from "@/lib/blog-data";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import b from "@/components/blog/blog.module.css";

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>
  );
}

function Body({ paragraphs, list, orderedList }: { paragraphs: string[]; list?: string[]; orderedList?: string[] }) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className={b.para}>
          {renderFormattedText(p)}
        </p>
      ))}
      {list && (
        <ul className={b.list}>
          {list.map((item, i) => (
            <li key={i}>{renderFormattedText(item)}</li>
          ))}
        </ul>
      )}
      {orderedList && (
        <ol className={b.olist}>
          {orderedList.map((item, i) => (
            <li key={i}>{renderFormattedText(item)}</li>
          ))}
        </ol>
      )}
    </>
  );
}

function SubSectionBlock({ sub }: { sub: SubSection }) {
  return (
    <>
      <h3 className={b.subTitle}>{sub.title}</h3>
      <Body paragraphs={sub.paragraphs} list={sub.list} orderedList={sub.orderedList} />
    </>
  );
}

function SectionBlock({ section }: { section: BlogSection }) {
  return (
    <section id={section.id} className={b.section}>
      {section.title && <h2 className={b.sectionTitle}>{section.title}</h2>}
      <Body paragraphs={section.paragraphs} list={section.list} orderedList={section.orderedList} />
      {section.subsections?.map((sub, i) => (
        <SubSectionBlock key={i} sub={sub} />
      ))}
    </section>
  );
}

function TableOfContents({ sections, hasFaqs }: { sections: BlogSection[]; hasFaqs: boolean }) {
  const tocSections = sections.filter((s) => s.title);
  if (tocSections.length === 0) return null;
  return (
    <nav aria-label="On this page" className={b.toc}>
      <span className={b.label}>On this page</span>
      <ul className={b.tocList}>
        {tocSections.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`}>{s.title}</a>
          </li>
        ))}
        {hasFaqs && (
          <li>
            <a href="#faqs">Questions</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

function RelatedPosts({ slug }: { slug: string }) {
  const related = getRelatedPosts(slug);
  if (related.length === 0) return null;
  return (
    <section className={b.related} aria-labelledby="related-heading">
      <h2 id="related-heading" className={b.h2}>Related articles</h2>
      <div className={b.grid} style={{ marginTop: "var(--au-head-gap)" }}>
        {related.map((post) => (
          <Link key={post.slug} href={`/resources/blogs/${post.slug}/`} className={b.card}>
            <span className={b.tag}>{post.category}</span>
            <h3 className={b.cardTitle}>{post.title}</h3>
            <p className={b.cardText}>{post.metaDescription}</p>
            <span className={b.meta}>
              <span className={b.metaItem}>
                <Clock aria-hidden="true" />
                {post.readingTime}
              </span>
              <span className={b.read}>
                Read <ArrowRight aria-hidden="true" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Who is behind the blog. Bios are the same facts as /pixel-and-code/about; keep
// them in step. Posts are credited to the team; the founders are named so readers
// (and search engines) can see who stands behind the advice.
const AUTHORS = [
  {
    name: "Kishal Mandal",
    role: "Co-founder & CTO",
    photo: "/pixel-and-code/assets/headshots/kishal.webp",
    bio: "Builds production AI systems, with 5+ years across AI and full-stack engineering. Kaggle Notebooks Master and published AI researcher.",
  },
  {
    name: "Ritwik Mandal",
    role: "Co-founder & CEO",
    photo: "/pixel-and-code/assets/headshots/ritwik.webp",
    bio: "MSc in Operations, Project & Supply Chain Management from the University of Manchester. Takes Aurevia's demo calls with Shopify merchants.",
  },
];

function AuthorBox() {
  return (
    <section id="about-the-author" aria-labelledby="about-the-author-heading" className={b.author}>
      <h2 id="about-the-author-heading" className={b.label}>About the author</h2>
      <p className={b.authorName}>The Aurevia team</p>
      <p className={b.authorText}>
        Aurevia is an AI sales agent for Shopify stores, built and run by its two founders. We write about what we
        learn building it for Shopify merchants.
      </p>
      <ul className={b.people}>
        {AUTHORS.map((a) => (
          <li key={a.name} className={b.person}>
            <img src={a.photo} alt={a.name} width={44} height={44} loading="lazy" />
            <div>
              <p className={b.personName}>{a.name}</p>
              <p className={b.personRole}>{a.role}</p>
              <p className={b.personBio}>{a.bio}</p>
            </div>
          </li>
        ))}
      </ul>
      {/* Plain <a>: /pixel-and-code is a self-contained section that needs a full page load. */}
      <a href="/pixel-and-code/about/" className={b.link}>
        Meet the team <ArrowRight aria-hidden="true" />
      </a>
    </section>
  );
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
      <Link href="/resources/blogs/" className={b.back}>
        <ArrowLeft aria-hidden="true" /> Blog
      </Link>

      <header className={b.postHead}>
        <span className={b.tag}>{post.category}</span>
        <h1 className={b.postTitle}>{post.title}</h1>
        <div className={b.byline}>
          <a href="#about-the-author">By the Aurevia team</a>
          <span className={b.metaItem}>
            <Calendar aria-hidden="true" />
            {formattedDate}
          </span>
          <span className={b.metaItem}>
            <Clock aria-hidden="true" />
            {post.readingTime}
          </span>
        </div>
      </header>

      <div className={b.layout}>
        <article className={b.article}>
          {post.sections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}

          {post.faqs.length > 0 && (
            <section id="faqs" className={b.faqs}>
              <h2 className={b.sectionTitle}>Frequently asked questions</h2>
              <div className={b.faqList}>
                {post.faqs.map((faq) => (
                  <details key={faq.question} className={b.faqItem}>
                    <summary className={b.faqQ}>
                      {faq.question}
                      <span className={b.faqIcon} aria-hidden="true" />
                    </summary>
                    <p className={b.faqA}>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <AuthorBox />

          <div className={b.cta} style={{ marginTop: 32 }}>
            <div>
              <h2 className={b.ctaTitle}>Put this into practice</h2>
              <p className={b.ctaText}>
                Aurevia answers shoppers, recommends products and recovers carts on your Shopify store, 24/7.
              </p>
            </div>
            <div className={b.ctaButtons}>
              <a href={SHOPIFY_APP_URL} target="_blank" rel="noopener noreferrer" className={b.primary}>
                Start free trial <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>

        <TableOfContents sections={post.sections} hasFaqs={post.faqs.length > 0} />
      </div>

      <RelatedPosts slug={post.slug} />
    </div>
  );
}
