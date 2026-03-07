import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://aurevia.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
  }[] = [
    // Core pages
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/home/", priority: 1.0, changeFrequency: "weekly" },

    // Products
    { path: "/products/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/shopify/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/products/automated-responses/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/recommendations/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/cart-recovery/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/analytics/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/dashboard/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/multilingual/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/ticket-management/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/lead-qualification/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/roi-tracking/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products/api/", priority: 0.6, changeFrequency: "monthly" },

    // Solutions
    { path: "/solutions/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/solutions/small-business/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/solutions/growing-business/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/solutions/enterprise/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/solutions/support/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/solutions/conversion/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/solutions/insights/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/solutions/stories/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/solutions/industries/", priority: 0.6, changeFrequency: "monthly" },

    // Industry verticals
    { path: "/solutions/fashion/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/solutions/beauty/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/solutions/fitness/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/solutions/electronics/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/solutions/home-garden/", priority: 0.6, changeFrequency: "monthly" },

    // Resources
    { path: "/resources/", priority: 0.7, changeFrequency: "weekly" },
    { path: "/resources/roi-calculator/", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resources/blogs/", priority: 0.7, changeFrequency: "weekly" },
    { path: "/resources/docs/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/resources/ai-comparisons/", priority: 0.7, changeFrequency: "monthly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
