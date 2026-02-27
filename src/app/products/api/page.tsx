import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Custom API | Aurevia Products",
  description: "Extend Aurevia with our custom API. Integrate with your stack.",
};

export default function APIPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Custom API
        </h1>
        <p className="text-lg text-muted-foreground">
          Connect Aurevia to your existing tools with our REST API. Custom integrations, webhooks, and more.
        </p>
      </div>
    </PageLayout>
  );
}
