import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automated Responses | Aurevia Products",
  description: "AI-powered automated responses for your Shopify store. Instant, context-aware replies 24/7.",
};

export default function AutomatedResponsesPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Automated Responses
        </h1>
        <p className="text-lg text-muted-foreground">
          Aurevia&apos;s AI delivers instant, context-aware responses to customer queries—24/7. No more waiting for support hours.
        </p>
      </div>
    </PageLayout>
  );
}
