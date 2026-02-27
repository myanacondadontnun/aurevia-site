import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lead Qualification | Aurevia Products",
  description: "AI-powered lead qualification to prioritize high-intent shoppers.",
};

export default function LeadQualificationPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Lead Qualification
        </h1>
        <p className="text-lg text-muted-foreground">
          Qualify leads in real-time. Aurevia identifies high-intent visitors and surfaces them for your sales team.
        </p>
      </div>
    </PageLayout>
  );
}
