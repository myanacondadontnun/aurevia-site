"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Clock, ArrowRight, Tag } from "lucide-react";
import { buildShopifyInstallUrl } from "@/lib/utils";
import {
  blogPosts,
  getAllCategories,
  type BlogCategory,
} from "@/lib/blog-data";

function CategoryPill({
  category,
  isActive,
  onClick,
}: {
  category: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
        isActive
          ? "bg-[#00CC99]/15 border-[#00CC99]/40 text-[#00CC99]"
          : "bg-transparent border-border/50 text-muted-foreground hover:border-[#00CC99]/30 hover:text-foreground"
      }`}
    >
      {category}
    </button>
  );
}

function BlogCard({ post }: { post: (typeof blogPosts)[number] }) {
  const formattedDate = new Date(post.publishDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <Link href={`/resources/blogs/${post.slug}/`} className="group block h-full">
      <Card className="h-full bg-transparent border border-border/50 hover:border-[#00CC99]/30 transition-all duration-300 overflow-hidden">
        <CardContent className="p-6 sm:p-8 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#00CC99]/10 text-[#00CC99] border border-[#00CC99]/20">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-inter font-normal text-foreground mb-3 group-hover:text-[#00CC99] transition-colors duration-300 leading-snug">
            {post.title}
          </h2>

          <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 flex-1 line-clamp-3">
            {post.metaDescription}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{formattedDate}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-[#00CC99]/70 group-hover:text-[#00CC99] transition-colors duration-200 font-medium">
              Read
              <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    BlogCategory | "All"
  >("All");

  const categories = getAllCategories();

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.metaDescription.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
      <Link
        href="/resources/"
        className="text-muted-foreground hover:text-[#00CC99] text-sm mb-6 inline-flex items-center gap-1 transition-colors duration-200"
      >
        ← Back to Resources
      </Link>

      <div className="mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-foreground mb-4">
          Blog
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground font-light max-w-2xl">
          Research-backed guides on AI sales, Shopify optimization, and
          e-commerce growth strategies.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="mb-8 sm:mb-10 space-y-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-border/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-[#00CC99]/40 focus:ring-1 focus:ring-[#00CC99]/20 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <CategoryPill
            category="All"
            isActive={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
          />
          {categories.map((cat) => (
            <CategoryPill
              key={cat}
              category={cat}
              isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg mb-2">
            No articles found
          </p>
          <p className="text-muted-foreground/60 text-sm">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      <div className="mt-14 sm:mt-16 rounded-2xl border border-border/30 bg-card/20 p-6 sm:p-8">
        <p className="font-fraunces italic text-lg sm:text-xl text-foreground leading-relaxed mb-5">
          &ldquo;Half of what I know about running the store better came from this blog before I ever installed the
          app. It's the rare vendor content that's actually useful instead of just a sales pitch.&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-[#00795c]"
            aria-hidden="true"
          >
            LN
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">Lena Novak</p>
            <p className="text-xs text-muted-foreground">Owner, Novak & Sons</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-6 sm:p-8">
        <div>
          <p className="text-foreground font-medium">Ready to see it on your store?</p>
          <p className="text-sm text-muted-foreground mt-1">
            Install from the Shopify App Store and go live in minutes.
          </p>
        </div>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-full sm:w-auto">
          <a href={buildShopifyInstallUrl()} target="_blank" rel="noopener noreferrer">
            Start free on Shopify
          </a>
        </Button>
      </div>
    </div>
  );
}
