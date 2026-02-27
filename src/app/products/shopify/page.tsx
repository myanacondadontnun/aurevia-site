import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shopify Integration | Aurevia Products",
  description: "Seamless Shopify integration. One-click install, full product sync, and native checkout.",
};

export default function ShopifyPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Shopify Integration
        </h1>
        <p className="text-lg text-muted-foreground">
          Aurevia is built for Shopify. One-click install from the App Store, automatic product sync, and native checkout links.
        </p>
      </div>
    </PageLayout>
  );
}
