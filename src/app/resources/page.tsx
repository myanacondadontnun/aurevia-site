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
          <Link href="/resources/docs/" className="block text-[#00CC99] hover:underline">
            → Documentations
          </Link>
        </div>

        <div className="mb-12 rounded-2xl border border-border/30 bg-card/20 p-6 sm:p-8">
          <p className="font-fraunces italic text-lg sm:text-xl text-foreground leading-relaxed mb-5">
            &ldquo;I read half the docs and one comparison article before I installed anything else. That's rare for
            me—usually I just wing it and regret an app choice a month later.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-[#00795c]"
              aria-hidden="true"
            >
              OB
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">Ollie Bennett</p>
              <p className="text-xs text-muted-foreground">Store Owner, Cricket & Pine</p>
            </div>
          </div>
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
