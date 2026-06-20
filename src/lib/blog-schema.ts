import type { BlogPost } from "@/lib/blog-data";

const SITE_URL = "https://aurevia.io";

export function getBlogPostJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/resources/blogs/${post.slug}/`;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle,
    description: post.metaDescription,
    url,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      "@type": "Organization",
      name: "Aurevia.io",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Aurevia.io",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/twitter_card.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
    inLanguage: "en-US",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/home/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: `${SITE_URL}/resources/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Blog",
        item: `${SITE_URL}/resources/blogs/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.seoTitle,
        item: url,
      },
    ],
  };

  const schemas: Record<string, unknown>[] = [blogPosting, breadcrumb];

  if (post.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
}
