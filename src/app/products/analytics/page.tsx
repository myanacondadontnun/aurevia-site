import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureMetricsDemo } from "@/components/FeatureDemo";

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
      eyebrow="Conversation analytics"
      headline={
        <>
          Your customers are telling you <span className="green-highlight">what to fix</span>
        </>
      }
      subtitle="Every chat is a tiny piece of market research. Aurevia clusters what shoppers actually ask — the sizing doubts, the shipping confusion, the products that stall — into a ranked list of what to improve next."
      heroBullets={[
        "Top questions, auto-clustered weekly",
        "Drop-off points mapped to the journey",
        "One transcript-backed truth for the team",
      ]}
      demo={
        <FeatureMetricsDemo
          title="Conversation intelligence"
          stats={[
            { label: "Intents tracked", value: "47", delta: "▲ 6 new" },
            { label: "Questions clustered", value: "1.9k" },
            { label: "Journey drop-off", value: "−23%", delta: "vs last month" },
          ]}
          rows={[
            { label: "“Does it run true to size?”", value: "214", pct: 90 },
            { label: "“Where is my order?”", value: "178", pct: 74 },
            { label: "“Is it in stock in black?”", value: "121", pct: 51 },
            { label: "“Do you ship to the EU?”", value: "96", pct: 40 },
          ]}
          rowsHeading="Top questions this week"
          chart={false}
        />
      }
      proofStrip={[
        { label: "Behavior, not vanity", text: "Intents, friction, and patterns — not a chat-volume counter dressed up as insight." },
        { label: "The journey, connected", text: "See how questions link to add-to-carts, exits, and handoffs over time." },
        { label: "Everyone reads one truth", text: "Marketing, product, and support work from the same transcript-backed evidence." },
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
      testimonial={{
        quote:
          "We used to guess why the return rate on our travel mugs was high. Aurevia's analytics showed everyone was asking the same lid question we'd buried on page three of the PDP. Fixed the copy, watched the tickets disappear.",
        name: "Priya Nair",
        role: "Head of Ecommerce",
        company: "Faro Home Goods",
      }}
    />
  );
}
