import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Multilingual Support | Aurevia Products",
  description: "Reach global customers with AI that speaks their language.",
};

export default function MultilingualPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Multilingual Support
        </h1>
        <p className="text-lg text-muted-foreground">
          Aurevia supports multiple languages so you can engage customers worldwide in their preferred language.
        </p>
      </div>
    </PageLayout>
  );
}
