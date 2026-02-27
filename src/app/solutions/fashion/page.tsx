import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fashion & Apparel | Aurevia Solutions",
  description: "AI-powered style picks for fashion and apparel Shopify stores.",
};

export default function FashionPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Fashion & Apparel
        </h1>
        <p className="text-lg text-muted-foreground">
          AI-powered style picks. Help fashion shoppers find the perfect look with personalized recommendations.
        </p>
      </div>
    </PageLayout>
  );
}
