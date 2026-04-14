import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources | Aurevia - Shopify AI Sales Co-Pilot",
  description:
    "Blogs, Review My Shopify, AI comparisons, ROI calculator, and documentation for Aurevia.",
};

export default function ResourcesPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Resources
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn more about AI sales co-pilots, get a Shopify store review, compare options, calculate ROI, and explore our docs.
        </p>
        <div className="space-y-4">
          <Link href="/resources/blogs/" className="block text-[#02DFA6] hover:underline">
            → Blogs
          </Link>
          <Link
            href="/resources/review-my-shopify/"
            className="block text-[#02DFA6] hover:underline"
          >
            → Review My Shopify
          </Link>
          <Link href="/resources/ai-comparisons/" className="block text-[#02DFA6] hover:underline">
            → AI Agent Comparisons
          </Link>
          <Link href="/resources/roi-calculator/" className="block text-[#02DFA6] hover:underline">
            → ROI Calculator
          </Link>
          <Link href="/resources/docs/" className="block text-[#02DFA6] hover:underline">
            → Documentations
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
