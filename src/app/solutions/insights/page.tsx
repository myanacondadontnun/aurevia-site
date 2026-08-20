import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Ecommerce Customer & Conversation Insights | Aurevia";
const desc =
  "Turn chats into a strategy layer: what shoppers ask, where they drop, and which AI flows win. Data-driven decisions for Shopify brands, not hunches from a transcript export.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function InsightsPage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      headline={
        <>
          The voice of the customer, <span className="green-highlight">in numbers</span>
        </>
      }
      subtitle="The answers are already in your chat logs; most teams do not have time to read thousands of them. This use case is for operators who want a weekly, honest picture of demand signals: confusion on PDPs, feature requests, competitor comparisons, and drop-offs—so product, site, and growth stop debating from anecdotes."
      lede="Pair insights with the products dashboard, analytics, and ROI: understanding why revenue moved is as important as the fact that it moved. Aurevia gives you a structured view of the conversation side of the business."
      proofStrip={[
        { label: "Faster product cycles", text: "Ship copy and FAQ updates where real questions cluster." },
        { label: "Smarter A/B tests", text: "Test the assistant and the site on evidence, not internal opinions only." },
        { label: "Shared vocabulary", text: "Marketing and CX use the same intent labels when they plan launches." },
      ]}
      featureBlocks={[
        { title: "Intent and friction maps", body: "See the repeat themes that SEO and analytics never spell out in shoppers’ own words." },
        { title: "Win/loss and journey views", body: "Know where conversations die without a sale so you can fix the next barrier." },
        { title: "Tie to business outcomes", body: "Layer revenue signals so strategy picks the levers with money attached." },
        { title: "Action meetings, not slide decks", body: "Export a short list of fixes: PDP bullet, new bundle, policy clarifier, prompt tweak." },
      ]}
      howItWorks={[
        { title: "Start collecting with purpose", body: "Tag labels that match how you run the business, not a generic taxonomy." },
        { title: "Review weekly with owners", body: "Assign a top friction to product, a top confusion to copy, a top return driver to operations." },
        { title: "Measure the fix", body: "Re-run the same read after a change to prove impact, not pat yourself on the back for shipping." },
      ]}
      media={{
        ariaLabel: "Metrics row and chart placeholder for insights",
        caption: "Swap in: dashboard crop with trend lines or top-questions list",
        suggestedAsset: "Use the analytics mock: four KPIs + a chart block—enough to feel like a real weekly review still.",
        kind: "image",
        aspect: "wide",
      }}
      relatedLinks={[
        { href: "/products/analytics", label: "Conversation analytics" },
        { href: "/products/dashboard", label: "Performance dashboard" },
        { href: "/resources/roi-calculator", label: "ROI calculator" },
      ]}
      faqs={[
        { q: "We already have heatmaps. Why this?", a: "Heatmaps show where people click, not what they still do not understand. Conversations capture the doubt behind the click." },
        { q: "Is this for executives or ICs?", a: "Both: executives get a strategy summary; ICs get the list of what to change this sprint." },
        { q: "How much analyst time is required?", a: "The point is the opposite: less manual transcript reading, more pre-clustered signal." },
      ]}
      testimonial={{
        quote:
          "I used to dread the quarterly deck because half of it was guessing what customers wanted. Now I pull straight from what they actually asked the AI, and the deck writes itself.",
        name: "Ravi Deshmukh",
        role: "Head of Insights",
        company: "Fernbridge Co.",
      }}
    />
  );
}
