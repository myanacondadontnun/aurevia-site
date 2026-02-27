import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ROI Calculator | Aurevia Resources",
  description: "Calculate your potential return on investment with Aurevia.",
};

export default function ROICalculatorPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/resources" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Resources
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          ROI Calculator
        </h1>
        <p className="text-lg text-muted-foreground">
          Calculate your potential return. See how much revenue Aurevia could unlock for your store.
        </p>
      </div>
    </PageLayout>
  );
}
