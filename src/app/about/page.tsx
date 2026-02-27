import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "About Us | Aurevia - Shopify AI Sales Co-Pilot",
  description: "Learn about Aurevia, the AI sales co-pilot for Shopify stores.",
};

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          About Us
        </h1>
        <p className="text-lg text-muted-foreground">
          Aurevia is an AI sales co-pilot built for Shopify. We help merchants recover carts, upsell products, and sell 24/7—GDPR-compliant and Shopify-Partner verified.
        </p>
      </div>
    </PageLayout>
  );
}
