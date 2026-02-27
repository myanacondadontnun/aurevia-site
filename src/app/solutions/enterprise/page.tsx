import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enterprise | Aurevia Solutions",
  description: "Enterprise-grade AI sales co-pilot for large Shopify merchants.",
};

export default function EnterprisePage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Enterprise
        </h1>
        <p className="text-lg text-muted-foreground">
          Enterprise features for high-volume stores. Custom integrations, dedicated support, and advanced analytics.
        </p>
      </div>
    </PageLayout>
  );
}
