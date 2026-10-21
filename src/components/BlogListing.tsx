"use client";

/**
 * /resources/blogs: a plain head, search and category pills, the newest post as a wide featured card, then the rest
 * as a grid of white cards (design.md cards and pills), and one closing call to action.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search } from "lucide-react";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import { blogPosts, getAllCategories, type BlogCategory, type BlogPost } from "@/lib/blog-data";
import b from "@/components/blog/blog.module.css";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

function Meta({ post }: { post: BlogPost }) {
  return (
    <span className={b.meta}>
      <span>{formatDate(post.publishDate)}</span>
      <span className={b.metaItem}>
        <Clock aria-hidden="true" />
        {post.readingTime}
      </span>
      <span className={b.read}>
        Read <ArrowRight aria-hidden="true" />
      </span>
    </span>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/resources/blogs/${post.slug}/`} className={b.card}>
      <span className={b.tag}>{post.category}</span>
      <h2 className={b.cardTitle}>{post.title}</h2>
      <p className={b.cardText}>{post.metaDescription}</p>
      <Meta post={post} />
    </Link>
  );
}

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");
  const categories = getAllCategories();

  // Newest first.
  const posts = useMemo(
    () => [...blogPosts].sort((x, y) => new Date(y.publishDate).getTime() - new Date(x.publishDate).getTime()),
    []
  );

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeCategory !== "All" && post.category !== activeCategory) return false;
      if (!query) return true;
      return (
        post.title.toLowerCase().includes(query) ||
        post.metaDescription.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query)
      );
    });
  }, [posts, searchQuery, activeCategory]);

  // The newest post leads, as a wide card, only on the unfiltered list.
  const browsing = activeCategory === "All" && !searchQuery.trim();
  const featured = browsing ? filteredPosts[0] : undefined;
  const rest = featured ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6">
      <h1 className={b.title}>Blog</h1>
      <p className={b.lede}>Guides on AI sales, Shopify conversion and support, from what we learn building Aurevia.</p>

      <div className={b.tools}>
        <label className={b.search}>
          <span className="sr-only">Search articles</span>
          <Search aria-hidden="true" />
          <input
            type="search"
            placeholder="Search articles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={b.searchInput}
          />
        </label>
        <div className={b.pills} role="group" aria-label="Filter by category">
          {(["All", ...categories] as (BlogCategory | "All")[]).map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={cx(b.pill, activeCategory === cat && b.pillOn)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {featured ? (
        <Link href={`/resources/blogs/${featured.slug}/`} className={b.featured}>
          <div>
            <span className={b.tag}>{featured.category}</span>
            <h2 className={b.featuredTitle} style={{ marginTop: 16 }}>{featured.title}</h2>
          </div>
          <div className={b.featuredSide}>
            <p>{featured.metaDescription}</p>
            <Meta post={featured} />
          </div>
        </Link>
      ) : null}

      {rest.length > 0 ? (
        <div className={b.grid}>
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : !featured ? (
        <p className={b.empty} role="status">
          <b>No articles found</b>
          Try another search or category.
        </p>
      ) : null}

      <div className={b.cta}>
        <div>
          <h2 className={b.ctaTitle}>See it on your store</h2>
          <p className={b.ctaText}>Install from the Shopify App Store and try any paid plan free for 14 days.</p>
        </div>
        <div className={b.ctaButtons}>
          <a href={SHOPIFY_APP_URL} target="_blank" rel="noopener noreferrer" className={b.primary}>
            Start free trial <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
