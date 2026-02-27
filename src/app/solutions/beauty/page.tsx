import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Health & Beauty | Aurevia Solutions",
  description: "Personalized beauty tips for health and beauty Shopify stores.",
};

export default function BeautyPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Health & Beauty
        </h1>
        <p className="text-lg text-muted-foreground">
          Personalized beauty tips. Guide beauty shoppers to the right products for their skin type and concerns.
        </p>
      </div>
    </PageLayout>
  );
}
