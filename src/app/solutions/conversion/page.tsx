import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Increase Sales Conversion | Aurevia Solutions",
  description: "Boost conversion rates with AI-powered recommendations and cart recovery.",
};

export default function ConversionPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Increase Sales Conversion
        </h1>
        <p className="text-lg text-muted-foreground">
          Turn more visitors into buyers with AI that recommends the right products and recovers abandoned carts.
        </p>
      </div>
    </PageLayout>
  );
}
