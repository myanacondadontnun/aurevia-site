import type { MetadataRoute } from "next";

const siteUrl = "https://aurevia.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // `trailingSlash: true` in next.config.js → include trailing slashes in URLs.
  const routes = [
    { path: "/", priority: 0.8 },
    { path: "/home", priority: 1.0 },
    { path: "/solutions/", priority: 0.6 },
    { path: "/roi-calculator/", priority: 0.6 },
    { path: "/shopify/", priority: 0.9 },
    { path: "/about/", priority: 0.6 },
    { path: "/careers/", priority: 0.6 },
    { path: "/roadmap/", priority: 0.6 },
    { path: "/blog/", priority: 0.6 },
    { path: "/research/", priority: 0.6 },
    { path: "/other/", priority: 0.6 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path === "/" ? "/" : path}`,
    lastModified: now,
    changeFrequency: path === "/" || path === "/home" || path.startsWith("/shopify") ? "weekly" : "monthly",
    priority,
  }));
}


