import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gain Customer Insights | Aurevia Solutions",
  description: "Unlock customer insights from every conversation with AI analytics.",
};

export default function InsightsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Gain Customer Insights
        </h1>
        <p className="text-lg text-muted-foreground">
          Understand what customers want. Aurevia surfaces trends, pain points, and opportunities from every conversation.
        </p>
      </div>
    </PageLayout>
  );
}
