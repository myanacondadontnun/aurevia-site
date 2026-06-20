import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Conversation Analytics for Shopify | Aurevia";
const desc =
  "What shoppers ask, where they drop, and which flows win. Conversation intelligence to tune your AI sales playbook—beyond message counts and CSAT alone.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function AnalyticsPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          Read the <span className="green-highlight">stories in the data</span>
        </>
      }
      subtitle="This is the behavior layer: top intents, common objections, and drop-off points in the journey. You use it to fix copy, adjust merchandising, and coach the AI—because real growth comes from learning what people actually needed and did not get fast enough. ROI is money; analytics is the why and what next."
      lede="Merchants use conversation analytics to answer: What should our PDP clarify? Which products confuse people? What should we A/B in the widget next week? It is a learning system, not a report card for chat volume."
      proofStrip={[
        { label: "Behavior-first", text: "Intents, friction, and patterns—not vanity chat totals." },
        { label: "Journey view", text: "See how questions connect to add-to-carts, exits, and handoffs over time." },
        { label: "Team alignment", text: "Give marketing, product, and support the same transcript-backed truth." },
      ]}
      featureBlocks={[
        {
          title: "Transcripts and themes",
          body: "Cluster what keeps coming up so you are not guessing from one-off support emails.",
        },
        {
          title: "Funnel and drop-off",
          body: "Know where the conversation ends without a win—then fix the product page, policy, or prompt.",
        },
        {
          title: "A/B the assistant, not the whole site at once",
          body: "Test welcome flows, nudges, and discovery depth with controlled experiments and clear reads.",
        },
        {
          title: "Paired with win/loss thinking",
          body: "Identify what a “win” even means in your category—gift, subscription, B2B quote—and track toward that.",
        },
      ]}
      howItWorks={[
        { title: "Tag conversations", body: "Automatic and merchant labels build a map of your shoppers’ real language." },
        { title: "Review weekly", body: "Pick the top 3 frictions; assign owners in product, CX, and growth." },
        { title: "Ship improvements", body: "Update site copy, KB entries, and AI rules with evidence, not hunches." },
      ]}
      media={{
        ariaLabel: "Funnel and top questions chart placeholder",
        caption: "Swap in: top intents bar chart or funnel vs site baseline",
        suggestedAsset: "A chart of “Top questions this week” or a funnel: landed → asked → add to cart, with a highlight on the biggest drop.",
        kind: "image",
        aspect: "video",
      }}
      relatedLinks={[
        { href: "/products/roi-tracking", label: "ROI tracking" },
        { href: "/solutions/insights", label: "Insights solutions" },
        { href: "/products/dashboard", label: "Performance dashboard" },
      ]}
      faqs={[
        {
          q: "How is this different from ROI tracking?",
          a: "ROI tracking centers dollars attributed to the AI. Analytics centers language, intent, and journey so you can improve what creates those dollars.",
        },
        {
          q: "Do I need a data team?",
          a: "No. The first wins come from a weekly read of repeated questions and a short fix list, not a warehouse project.",
        },
        {
          q: "Can I export for deeper analysis?",
          a: "Yes—treat conversation exports as inputs to your own BI or agency reviews if you outgrow the built-in views.",
        },
      ]}
    />
  );
}
