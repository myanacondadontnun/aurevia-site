import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automate Customer Support | Aurevia Solutions",
  description: "Automate support with AI that answers FAQs and handles common queries 24/7.",
};

export default function SupportPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Automate Customer Support
        </h1>
        <p className="text-lg text-muted-foreground">
          Reduce support load and response times. Aurevia handles common questions so your team focuses on complex issues.
        </p>
      </div>
    </PageLayout>
  );
}
