import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Customer Stories | Aurevia Solutions",
  description: "See how Shopify merchants are using Aurevia and the benefits it brings to their businesses.",
};

export default function StoriesPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Customer Stories
        </h1>
        <p className="text-lg text-muted-foreground">
          See how Shopify merchants are using Aurevia and the awesome benefits it&apos;s bringing to their businesses!
        </p>
      </div>
    </PageLayout>
  );
}
