import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ROICalculator from "@/components/ROICalculator";
import ROICalculatorCTACard from "@/components/ROICalculatorCTACard";
import HeroWatermark from "@/components/home/HeroWatermark";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import h from "@/components/home/hero.module.css";
import r from "@/components/roi/roi.module.css";

export const metadata: Metadata = {
  title: "ROI Calculator | Aurevia Resources",
  description: "Estimate the revenue an AI sales agent could add to your Shopify store, and what it costs on each Aurevia plan.",
  alternates: { canonical: "/resources/roi-calculator" },
  openGraph: { title: "ROI Calculator | Aurevia", description: "Estimate the revenue an AI sales agent could add to your Shopify store.", url: "https://aurevia.io/resources/roi-calculator/" },
};

/** The model in lib/roi.ts and lib/pricing.ts, in words. Keep in step with those constants. */
const METHOD = [
  { lead: "Conversations.", text: "About 1.5% of your visitors chat with the agent." },
  { lead: "Conversion.", text: "Those chats convert at your own rate, or a 2% benchmark if yours is lower, times 1.5. We keep it between 1% and 6%." },
  { lead: "Order value.", text: "Orders from a chat are counted at 1.1 times your average order value." },
  { lead: "Plan.", text: "We size the plan from your traffic, at about one AI message for every two visitors, and use its monthly price." },
  { lead: "ROI.", text: "The extra revenue, minus the plan price, as a percentage of the plan price." },
];

export default function ROICalculatorPage() {
  return (
    <div className={r.page}>
      <Navbar />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "ROI Calculator", path: "/resources/roi-calculator" }])} />
      <main id="main-content">
        {/* Head and calculator share the home hero's canvas: blooms, grain and the turning ring. */}
        <section className={`${h.hero} ${r.top}`}>
          <div className={h.grain} aria-hidden="true" />
          <HeroWatermark />
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${r.head}`}>
            <h1 className={r.title}>
              What could Aurevia add
              <span className={r.accentLine}>to your store?</span>
            </h1>
            <p className={r.lede}>
              Enter three numbers from your Shopify admin. We estimate the extra sales from chats with the agent and set
              them against the plan you would be on.
            </p>
          </div>
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${r.boardWrap}`}>
            <ROICalculator />
          </div>
        </section>

        <section className={r.method}>
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${r.methodGrid}`}>
            <div>
              <h2 className={r.h2}>How we estimate</h2>
              <p className={r.methodAside}>
                An estimate, not a promise. Your own results depend on your catalogue, traffic and how shoppers use the
                chat.
              </p>
            </div>
            <ol className={r.steps}>
              {METHOD.map((m) => (
                <li key={m.lead}>
                  <span><b>{m.lead}</b> {m.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <ROICalculatorCTACard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
