import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";
import { FeatureMetricsDemo } from "@/components/FeatureDemo";

const title = "Ecommerce AI Revenue & ROI Tracking | Aurevia";
const desc =
  "Attribute sales to AI: assisted purchases, recommendations, upsells, and recovery. Prove conversational commerce in dollars, not just chat volume for Shopify.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/roi-tracking" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/roi-tracking/" },
};

export default function RoiTrackingPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="ROI tracking"
      headline={
        <>
          Prove it in <span className="green-highlight">dollars, not messages</span>
        </>
      }
      subtitle="Most chatbots report “messages handled” and hope you don't ask about money. Aurevia attributes real orders to real conversations — recommendations, upsells, and rescued carts — so finance signs off without squinting."
      heroBullets={[
        "Revenue attributed per conversation",
        "Feature-level breakdown: recs, rescues, upsells",
        "Attribution tied to real Shopify orders",
      ]}
      demo={
        <FeatureMetricsDemo
          title="Revenue attribution"
          stats={[
            { label: "AI-attributed revenue", value: "$23.9k", delta: "▲ 32%" },
            { label: "Assisted AOV", value: "$64", delta: "▲ 12%" },
            { label: "Return on spend", value: "11×" },
          ]}
          rows={[
            { label: "Product recommendations", value: "$11.2k", pct: 88 },
            { label: "Cart rescues", value: "$7.4k", pct: 58 },
            { label: "Bundles & upsells", value: "$5.3k", pct: 42 },
          ]}
          rowsHeading="Revenue by feature"
          chart
        />
      }
      proofStrip={[
        { label: "Dollar-linked, defensible", text: "Outcomes tied to the AI with a definition you can stand behind in a finance review." },
        { label: "Know what to double down on", text: "See which behaviors move revenue — recs, bundles, nudges — feature by feature." },
        { label: "Real orders, not estimates", text: "A card that says Not tracked means exactly that. Every number ties back to an order Shopify sent us." },
      ]}
      featureBlocks={[
        {
          title: "Influenced revenue, defined clearly",
          body: "Understand what “assisted by Aurevia” means in your report so you can stand behind the number internally.",
        },
        {
          title: "Not just the last click",
          body: "Capture how discovery and nudges participate in a journey where chat was the trusted guide.",
        },
        {
          title: "AOV and conversion, side by side",
          body: "When the story is bigger baskets and higher CVR, show both; some brands win on rate, some on size of order.",
        },
        {
          title: "Built for the Shopify stack",
          body: "Stay aligned with how your store already records orders, discounts, and returns—so attribution maps to how you run finance.",
        },
      ]}
      howItWorks={[
        { title: "Connect store data", body: "Shopify remains the system of record; Aurevia links outcomes to the conversations that mattered." },
        { title: "Choose a reporting window", body: "Weekly for ops, monthly for board prep—trends beat one-day spikes." },
        { title: "Tie to campaigns", body: "See whether paid traffic, launches, and sales events scale with the AI, not in spite of it." },
      ]}
      relatedLinks={[
        { href: "/resources/roi-calculator", label: "ROI calculator" },
      ]}
      faqs={[
        {
          q: "Is this the same as Google Analytics revenue?",
          a: "Complementary. GA often misses the full role of a conversation; this ties orders to the AI’s participation in a way a funnel tool alone will not show.",
        },
        {
          q: "What if our sales cycle is long or B2B-leaning?",
          a: "Use assisted pipeline metrics together with your CRM; the point is a rigorous story, not a single formula for every brand.",
        },
        {
          q: "How often should we review?",
          a: "Weekly for operators, monthly for executive decisions—enough to see signal without chasing noise.",
        },
      ]}
      screenshot={{
        src: "/images/app/dashboard-mode-desktop.webp",
        url: "app.aurevia.io/dashboard",
        title: "Influenced revenue, per product",
        caption: "Revenue Influenced and Orders Influenced total the orders where the agent recommended, added to cart or generated the checkout. Below it, every recommended product with shown, added, bought and revenue.",
      }}
      setup={{
        title: "How attribution works",
        steps: [
          { src: "/images/app/live-activity-desktop.webp", title: "The chat adds to cart", body: "When the agent adds an item or creates a checkout, the cart is tagged with the chat session." },
          { src: "/images/app/dashboard-mode-desktop.webp", title: "Shopify sends the order", body: "The order webhook carries the tag. Aurevia matches it to the session and credits that conversation." },
          { src: "/images/app/dashboard-desktop.webp", title: "You read real numbers", body: "Orders placed without a chat are never credited. A card that says Not tracked means exactly that." },
        ],
      }}
      review={getReview("l1nk")}
      alsoSee={[
        { href: "/products/dashboard", title: "Dashboard & Ask Aurevia", body: "Ask questions about the numbers instead of reading charts." },
        { href: "/products/recommendations", title: "Recommendations", body: "Where most influenced revenue comes from." },
        { href: "/pricing", title: "Pricing", body: "Every plan includes attribution." },
      ]}
    />
  );
}
