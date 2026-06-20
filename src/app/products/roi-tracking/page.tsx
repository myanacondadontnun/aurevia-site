import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Ecommerce AI Revenue & ROI Tracking | Aurevia";
const desc =
  "Attribute sales to AI: assisted purchases, recommendations, upsells, and recovery. Prove conversational commerce in dollars, not just chat volume for Shopify.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function RoiTrackingPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          <span className="green-highlight">Real revenue</span> from real conversations
        </>
      }
      subtitle="This page is the money case: which dollars moved because the AI was in the path—recommendations, upsells, in-session nudges, and assisted checkouts. You use it to justify ad spend, headcount, and roadmap—and to compare channels fairly against a bot that was only ever measured in “messages handled.”"
      lede="Conversational commerce only wins board attention when the spreadsheet connects. ROI tracking is where influenced revenue, feature contribution, and trends over time get explicit so finance and growth speak the same language."
      proofStrip={[
        { label: "Dollar-linked", text: "Tie outcomes to the AI, not a vague “chat helped” story." },
        { label: "Feature-level", text: "See which behaviors move revenue—recs, bundles, nudges—so you can double down." },
        { label: "Benchmark-ready", text: "Compare before/after periods and campaigns on a like-for-like basis." },
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
      media={{
        ariaLabel: "Revenue and donut chart placeholder for AI-influenced sales",
        caption: "Swap in: “AI-influenced revenue” chart or static from your analytics mock",
        suggestedAsset: "Bar compare “without chat / with Aurevia” and a donut: AI-influenced vs direct. Short motion is ideal.",
        kind: "image",
        aspect: "wide",
      }}
      relatedLinks={[
        { href: "/products/analytics", label: "Conversation analytics" },
        { href: "/solutions/insights", label: "Customer insights" },
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
    />
  );
}
