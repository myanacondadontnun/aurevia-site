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
              className="text-muted-foreground hover:text-[#00CC99] text-sm mb-4 inline-block transition-colors font-normal"
            >
              ← Back to Resources
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-foreground tracking-tight">
              Calculate your <span className="green-highlight">ROI</span>
            </h1>
          </div>
        </section>

        {/* Calculator block */}
        <ROICalculator />

        <div className="container mx-auto max-w-6xl">
          <div className="scroll-fade my-12 max-w-2xl mx-auto rounded-2xl border border-border/30 bg-card/20 p-6 sm:p-8">
            <p className="font-fraunces italic text-lg sm:text-xl text-foreground leading-relaxed mb-5">
              &ldquo;The calculator undersold it, honestly. Once we saw the real attributed revenue in the dashboard,
              it matched what the estimate promised almost exactly.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-[#00795c]"
                aria-hidden="true"
              >
                TH
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">Theo Hastings</p>
                <p className="text-xs text-muted-foreground">Finance Lead, Ember & Co.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA card */}
        <ROICalculatorCTACard />
      </div>
    </PageLayout>
  );
}
