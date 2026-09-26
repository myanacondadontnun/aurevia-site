import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildShopifyInstallUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resources | Aurevia - Shopify AI Sales Co-Pilot",
  description:
    "Blogs, Review My Shopify, AI comparisons, ROI calculator, and documentation for Aurevia.",
};

export default function ResourcesPage() {
  const installUrl = buildShopifyInstallUrl();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-fraunces font-normal text-foreground mb-6">
          Resources
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn more about AI sales co-pilots, get a Shopify store review, compare options, calculate ROI, and explore our docs.
        </p>
        <div className="space-y-4 mb-12">
          <Link href="/resources/blogs/" className="block text-[#00CC99] hover:underline">
            → Blogs
          </Link>
          <Link
            href="/resources/review-my-shopify/"
            className="block text-[#00CC99] hover:underline"
          >
            → Review My Shopify
          </Link>
          <Link href="/resources/ai-comparisons/" className="block text-[#00CC99] hover:underline">
            → AI Agent Comparisons
          </Link>
          <Link href="/resources/roi-calculator/" className="block text-[#00CC99] hover:underline">
            → ROI Calculator
          </Link>
          <Link href="/help/" className="block text-[#00CC99] hover:underline">
            → Help center
          </Link>
        </div>


        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-6 sm:p-8 mb-12">
          <div>
            <p className="text-foreground font-medium">Ready to see it on your store?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Install from the Shopify App Store and go live in minutes.
            </p>
          </div>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-full sm:w-auto">
            <a href={installUrl} target="_blank" rel="noopener noreferrer">
              Start free on Shopify
            </a>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
