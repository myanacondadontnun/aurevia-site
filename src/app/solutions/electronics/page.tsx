import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Electronics | Aurevia Solutions",
  description: "Smart gadget guidance for electronics Shopify stores.",
};

export default function ElectronicsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Electronics
        </h1>
        <p className="text-lg text-muted-foreground">
          Smart gadget guidance. Answer technical questions and recommend the right electronics for your customers.
        </p>
      </div>
    </PageLayout>
  );
}
