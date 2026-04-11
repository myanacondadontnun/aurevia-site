import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import BlogArticle from "@/components/BlogArticle";
import { getAllSlugs, getBlogBySlug } from "@/lib/blog-data";

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
      url: `https://aurevia.io/resources/blogs/${post.slug}`,
      type: "article",
      publishedTime: post.publishDate,
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

  return (
    <PageLayout>
      <BlogArticle post={post} />
    </PageLayout>
  );
}
