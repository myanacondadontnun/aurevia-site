import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Performance Dashboard | Aurevia Products",
  description: "Track AI performance, conversions, and revenue impact in one dashboard.",
};

export default function DashboardPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Performance Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Get a clear view of how Aurevia is performing. Monitor conversions, revenue attribution, and engagement metrics.
        </p>
      </div>
    </PageLayout>
  );
}
