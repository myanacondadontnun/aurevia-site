import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import BlogArticle from "@/components/BlogArticle";
import { getAllSlugs, getBlogBySlug } from "@/lib/blog-data";
import { getBlogPostJsonLd } from "@/lib/blog-schema";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.seoTitle} | Aurevia Blog`,
    description: post.metaDescription,
    alternates: {
      canonical: `/resources/blogs/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url: `https://aurevia.io/resources/blogs/${post.slug}/`,
      type: "article",
      publishedTime: post.publishDate,
      siteName: "Aurevia.io",
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: "/images/twitter_card.png",
          width: 1200,
          height: 600,
          alt: post.seoTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
      images: ["/images/twitter_card.png"],
    },
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLdSchemas = getBlogPostJsonLd(post);

  return (
    <PageLayout>
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BlogArticle post={post} />
    </PageLayout>
  );
}
