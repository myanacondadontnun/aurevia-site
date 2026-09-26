import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { helpArticles } from "@/lib/help-articles";

/**
 * Sitemap for static export (Cloudflare Pages, etc.): regenerated on every `next build`.
 *
 * - Add new page URLs here in `staticRoutes` (same paths as in `src/app/…`, with trailing slash).
 * - New blog posts are picked up automatically from `src/lib/blog-data.ts` (add the post to `blogPosts`).
 */
export const dynamic = "force-static";

const siteUrl = "https://aurevia.io";

const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
}[] = [
  // Core pages
  { path: "/home/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/pricing/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/channels/", priority: 0.8, changeFrequency: "monthly" },

  // Products
  { path: "/products/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/shopify/", priority: 0.9, changeFrequency: "weekly" },
  { path: "/products/automated-responses/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/recommendations/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/cart-recovery/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/products/dashboard/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products/ticket-management/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products/lead-qualification/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products/roi-tracking/", priority: 0.7, changeFrequency: "monthly" },

  // Solutions
  { path: "/solutions/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/small-business/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/growing-business/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/enterprise/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/support/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/solutions/conversion/", priority: 0.7, changeFrequency: "monthly" },

  // Industry verticals
  { path: "/solutions/fashion/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/solutions/beauty/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/solutions/fitness/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/solutions/electronics/", priority: 0.6, changeFrequency: "monthly" },
  { path: "/solutions/home-garden/", priority: 0.6, changeFrequency: "monthly" },

  // Resources (blog index; individual posts are appended from blog-data below)
  { path: "/resources/", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources/roi-calculator/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/resources/blogs/", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources/review-my-shopify/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/help/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/book-demo/", priority: 0.8, changeFrequency: "monthly" },
  { path: "/resources/ai-comparisons/", priority: 0.7, changeFrequency: "monthly" },

  // Pixel & Code (dev studio site, merged in at /pixel-and-code)
  { path: "/pixel-and-code/", priority: 0.5, changeFrequency: "monthly" },
  { path: "/pixel-and-code/how-we-work/", priority: 0.5, changeFrequency: "monthly" },
  { path: "/pixel-and-code/about/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/pixel-and-code/saas-development/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/pixel-and-code/ai-automation/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/pixel-and-code/web-app-development/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/pixel-and-code/recruitment-platform-development/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/pixel-and-code/development-partners/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/pixel-and-code/aurevia-io/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/pixel-and-code/jcrpharma-co-uk/", priority: 0.4, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fromStatic = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const fromBlog: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/resources/blogs/${post.slug}/`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const fromHelp: MetadataRoute.Sitemap = helpArticles.map((a) => ({
    url: `${siteUrl}/help/${a.slug}/`,
    lastModified: new Date(a.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...fromStatic, ...fromBlog, ...fromHelp];
}
