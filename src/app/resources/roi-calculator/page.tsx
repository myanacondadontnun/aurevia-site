import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import ROICalculator from "@/components/ROICalculator";
import ROICalculatorCTACard from "@/components/ROICalculatorCTACard";

export const metadata: Metadata = {
  title: "ROI Calculator | Aurevia Resources",
  description: "Calculate your potential return on investment with Aurevia.",
};

export default function ROICalculatorPage() {
  return (
    <PageLayout>
      <div className="w-full overflow-x-hidden font-roi font-light antialiased px-6 sm:px-8 md:px-10 lg:px-16 xl:px-24">
        {/* Calculator hero - single headline, ROI highlighted */}
        <section className="w-full pt-6 pb-4 sm:pt-8 sm:pb-6">
          <div className="container mx-auto max-w-6xl">
            <Link
              href="/resources"
              className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-4 inline-block transition-colors font-normal"
            >
              ← Back to Resources
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              Calculate your <span className="green-highlight">ROI</span>
            </h1>
          </div>
        </section>

        {/* Calculator block */}
        <ROICalculator />

        {/* CTA card */}
        <ROICalculatorCTACard />
      </div>
    </PageLayout>
  );
}
