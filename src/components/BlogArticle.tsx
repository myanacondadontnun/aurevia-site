"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Calendar,
  Tag,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Lightbulb,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  type BlogPost,
  type BlogSection,
  type SubSection,
  getRelatedPosts,
} from "@/lib/blog-data";
import { SHOPIFY_APP_URL } from "@/lib/utils";

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

function Paragraph({ text }: { text: string }) {
  return (
    <p className="text-[15px] sm:text-base text-muted-foreground font-light leading-relaxed mb-4">
      {renderFormattedText(text)}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-5 ml-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[15px] sm:text-base text-muted-foreground font-light leading-relaxed"
        >
          <span className="text-[#00CC99] mt-2 shrink-0 w-1.5 h-1.5 rounded-full bg-[#00CC99]/60" />
          <span>{renderFormattedText(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function OrderedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3 mb-5 ml-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 text-[15px] sm:text-base text-muted-foreground font-light leading-relaxed"
        >
          <span className="text-[#00CC99] font-medium text-sm mt-0.5 shrink-0 w-6 h-6 rounded-full border border-[#00CC99]/30 flex items-center justify-center">
            {i + 1}
          </span>
          <span className="flex-1">{renderFormattedText(item)}</span>
        </li>
      ))}
    </ol>
  );
}

function SubSectionBlock({ sub }: { sub: SubSection }) {
  return (
    <div className="mb-6">
      <h4 className="text-base sm:text-lg font-inter font-normal text-foreground mb-3">
        {sub.title}
      </h4>
      {sub.paragraphs.map((p, i) => (
        <Paragraph key={i} text={p} />
      ))}
      {sub.list && <BulletList items={sub.list} />}
      {sub.orderedList && <OrderedList items={sub.orderedList} />}
    </div>
  );
}

function SectionBlock({ section }: { section: BlogSection }) {
  return (
    <section id={section.id} className="mb-10 scroll-mt-24">
      {section.title && (
        <h2 className="text-xl sm:text-2xl font-fraunces font-normal text-foreground mb-4 pb-2 border-b border-border/30">
          {section.title}
        </h2>
      )}
      {section.paragraphs.map((p, i) => (
        <Paragraph key={i} text={p} />
      ))}
      {section.list && <BulletList items={section.list} />}
      {section.orderedList && <OrderedList items={section.orderedList} />}
      {section.subsections?.map((sub, i) => (
        <SubSectionBlock key={i} sub={sub} />
      ))}
    </section>
  );
}

function TableOfContents({ sections }: { sections: BlogSection[] }) {
  const tocSections = sections.filter((s) => s.title);
  if (tocSections.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-28 w-56 shrink-0 self-start">
      <p className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-border/30 pl-3">
        {tocSections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-sm text-muted-foreground/70 hover:text-[#00CC99] transition-colors duration-200 block py-0.5 leading-snug"
            >
              {s.title}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#faqs"
            className="text-sm text-muted-foreground/70 hover:text-[#00CC99] transition-colors duration-200 block py-0.5 leading-snug"
          >
            FAQs
          </a>
        </li>
      </ul>
    </nav>
  );
}

function RelatedPosts({ slug }: { slug: string }) {
  const related = getRelatedPosts(slug);
  if (related.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="text-xl sm:text-2xl font-fraunces font-normal text-foreground mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/resources/blogs/${post.slug}/`}
            className="group block"
          >
            <Card className="h-full bg-transparent border border-border/50 hover:border-[#00CC99]/30 transition-all duration-300">
              <CardContent className="p-5">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#00CC99]/10 text-[#00CC99] border border-[#00CC99]/20 mb-3">
                  {post.category}
                </span>
                <h3 className="text-sm sm:text-base font-inter font-normal text-foreground mb-2 group-hover:text-[#00CC99] transition-colors duration-200 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground font-light line-clamp-2">
                  {post.metaDescription}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aurevia_blog_theme");
      if (saved === "light") setIsLightMode(true);
    } catch {
      // ignore
    }
  }, []);

  const formattedDate = new Date(post.publishDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div
      className={`container mx-auto px-4 sm:px-6 max-w-6xl ${isLightMode ? "blog-light" : ""}`}
      data-blog-theme={isLightMode ? "light" : "dark"}
    >
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground/60 mb-8 flex-wrap">
        <Link
          href="/home/"
          className="hover:text-[#00CC99] transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href="/resources/"
          className="hover:text-[#00CC99] transition-colors"
        >
          Resources
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href="/resources/blogs/"
          className="hover:text-[#00CC99] transition-colors"
        >
          Blog
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-muted-foreground/40 truncate max-w-[200px]">
          {post.title}
        </span>
      </nav>

      {/* Article Header */}
      <header className="max-w-3xl mb-10">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#00CC99]/10 text-[#00CC99] border border-[#00CC99]/20">
            <Tag className="w-3 h-3" />
            {post.category}
          </span>

          <button
            type="button"
            onClick={() => {
              setIsLightMode((prev) => {
                const next = !prev;
                try {
                  localStorage.setItem("aurevia_blog_theme", next ? "light" : "dark");
                } catch {
                  // ignore
                }
                return next;
              });
            }}
            aria-pressed={isLightMode}
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[#00CC99]/30 transition-colors"
            title={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
          >
            <Lightbulb className={`h-4 w-4 ${isLightMode ? "text-[#00CC99]" : "text-muted-foreground"}`} />
            {isLightMode ? "Light" : "Dark"}
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-fraunces font-normal text-foreground mb-5 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>
      </header>

      <Separator className="mb-10 bg-border/30" />

      {/* Article Body + TOC */}
      <div className="flex gap-12 items-start">
        <article className="flex-1 min-w-0 max-w-3xl">
          {post.sections.map((section) => (
            <SectionBlock key={section.id} section={section} />
          ))}

          {/* FAQs */}
          {post.faqs.length > 0 && (
            <section id="faqs" className="mb-10 scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-fraunces font-normal text-foreground mb-4 pb-2 border-b border-border/30">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {post.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border-border/30"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-[#00CC99] hover:no-underline py-4 text-[15px] sm:text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-light text-[15px] sm:text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {/* CTA */}
          <div className="mt-12 mb-8 rounded-xl border border-[#00CC99]/20 bg-gradient-to-br from-[#00CC99]/5 to-transparent p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-inter font-normal text-foreground mb-2">
              Ready to put this into practice?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground font-light mb-5 max-w-lg">
              Aurevia helps Shopify stores automate support, recover abandoned
              carts, and grow revenue with an AI sales co-pilot.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00cc99] text-black text-sm font-medium hover:bg-[#00cc99]/90 transition-colors duration-200"
              >
                Try Aurevia Free
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/resources/blogs/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 text-muted-foreground text-sm font-medium hover:border-[#00CC99]/30 hover:text-foreground transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                All Articles
              </Link>
            </div>
          </div>
        </article>

        <TableOfContents sections={post.sections} />
      </div>

      <Separator className="mt-4 mb-10 bg-border/30" />

      <RelatedPosts slug={post.slug} />
    </div>
  );
}
