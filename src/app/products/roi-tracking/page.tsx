import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ROI Tracking | Aurevia Products",
  description: "Measure the real revenue impact of your AI sales co-pilot.",
};

export default function ROITrackingPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          ROI Tracking
        </h1>
        <p className="text-lg text-muted-foreground">
          See exactly how much revenue Aurevia drives. Track attributed sales, cart recoveries, and upsells.
        </p>
      </div>
    </PageLayout>
  );
}
