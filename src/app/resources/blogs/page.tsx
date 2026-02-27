import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blogs | Aurevia Resources",
  description: "Latest insights and tips on AI sales co-pilots for e-commerce.",
};

export default function BlogsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/resources" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Resources
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Blogs
        </h1>
        <p className="text-lg text-muted-foreground">
          Latest insights and tips on AI sales co-pilots, Shopify optimization, and e-commerce growth.
        </p>
      </div>
    </PageLayout>
  );
}
