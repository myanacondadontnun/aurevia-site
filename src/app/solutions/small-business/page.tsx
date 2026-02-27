import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Small Business | Aurevia Solutions",
  description: "AI sales co-pilot built for small Shopify stores.",
};

export default function SmallBusinessPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Small Business
        </h1>
        <p className="text-lg text-muted-foreground">
          Affordable AI that scales with you. Perfect for small teams who want 24/7 sales support without the overhead.
        </p>
      </div>
    </PageLayout>
  );
}
