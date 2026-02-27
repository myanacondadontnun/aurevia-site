import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conversation Analytics | Aurevia Products",
  description: "Deep insights from every customer conversation.",
};

export default function AnalyticsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Conversation Analytics
        </h1>
        <p className="text-lg text-muted-foreground">
          Understand what customers ask, where they drop off, and how to improve. Full conversation history and insights.
        </p>
      </div>
    </PageLayout>
  );
}
