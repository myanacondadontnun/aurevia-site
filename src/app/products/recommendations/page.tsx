import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product Recommendations | Aurevia Products",
  description: "AI-powered product recommendations that boost AOV and conversion.",
};

export default function RecommendationsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Product Recommendations
        </h1>
        <p className="text-lg text-muted-foreground">
          Aurevia analyzes live shopper context to suggest the perfect products—increasing average order value and conversion.
        </p>
      </div>
    </PageLayout>
  );
}
