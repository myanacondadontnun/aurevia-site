import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";
import { FeatureMetricsDemo } from "@/components/FeatureDemo";

const title = "Dashboard & Ask Aurevia Copilot | Aurevia";
const desc =
  "A merchant home for what matters: conversations, revenue-leaning signals, and how your AI is performing. Shopify AI analytics without vanity charts.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/dashboard" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/dashboard/" },
};

export default function DashboardPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Dashboard & Ask Aurevia"
      headline={
        <>
          Monday morning, <span className="green-highlight">answered in one screen</span>
        </>
      }
      subtitle="Open the dashboard and know in ten seconds whether the AI earned its keep this week: revenue assisted, conversations handled, and where humans had to step in. Signal for operators — not a firehose of chat logs."
      heroBullets={[
        "Revenue and conversations, one view",
        "AI health: coverage & deflection",
        "Built for a weekly operator check-in",
      ]}
      demo={
        <FeatureMetricsDemo
          title="Performance"
          stats={[
            { label: "Revenue assisted", value: "£12,480", delta: "▲ 18%" },
            { label: "Conversations", value: "1,284", delta: "▲ 9%" },
            { label: "Resolved by AI", value: "82%", delta: "▲ 4pts" },
          ]}
          rows={[
            { label: "Recommendation → checkout", value: "212", pct: 86 },
            { label: "Question → add to cart", value: "147", pct: 60 },
            { label: "Cart rescue → paid", value: "58", pct: 24 },
          ]}
          rowsHeading="Top converting flows"
          chart
        />
      }
      proofStrip={[
        { label: "Signal, not noise", text: "KPIs that connect chat activity to the business — no wall of unlabeled widgets." },
        { label: "One truth for the team", text: "Leadership and operators read the same numbers, so plans stop being debated from different spreadsheets." },
        { label: "Points at the next fix", text: "Spot what to test next — prompts, products, or regions — without hiring a BI analyst." },
      ]}
      featureBlocks={[
        {
          title: "Conversation and revenue in one place",
          body: "See volume alongside the outcomes you care about so you are not overfitting to “chats per day.”",
        },
        {
          title: "Health of the AI, not a mystery",
          body: "Understand coverage, deflection, and where humans take over, so you can coach both the model and the team.",
        },
        {
          title: "Fits the Shopify operator’s day",
          body: "Short, focused check-ins: what changed this week, what to fix next, what to keep.",
        },
        {
          title: "Grounded in your go-to-market",
          body: "Tie what you see to campaigns, launches, and support spikes—context matters when numbers move.",
        },
      ]}
      howItWorks={[
        { title: "Connect and install", body: "Shopify data and your KB feed the first baseline view." },
        { title: "Run your week", body: "Check the headline metrics and the exceptions that need attention." },
        { title: "Iterate in place", body: "Adjust rules, copy, and priorities from the same home base." },
      ]}
      relatedLinks={[
        { href: "/products/roi-tracking", label: "ROI tracking" },
      ]}
      faqs={[
        {
          q: "How is this different from Google Analytics alone?",
          a: "This ties buyer questions, AI performance, and revenue-leaning outcomes together—so you are not inferring everything from pageviews.",
        },
        {
          q: "Can I share access with my agency?",
          a: "Use your org’s process for logins; the goal is one honest view of performance for brand and partners alike.",
        },
        {
          q: "Can I ask the dashboard questions instead of reading charts?",
          a: "Yes. Ask Aurevia is built into the dashboard: press ⌘K and ask in plain English. It answers with charts and sources, and can propose catalog fixes that you confirm before anything is written to Shopify.",
        },
      ]}
      screenshot={{
        src: "/images/app/ask-aurevia-desktop.webp",
        mobile: "/images/app/ask-aurevia-mobile.webp",
        url: "app.aurevia.io/product-management",
        title: "Ask it to fix something, then confirm",
        caption: "Ask Aurevia proposes the edit as a card: the product, the new title and description. Nothing is written to Shopify until you click Confirm.",
      }}
      setup={{
        title: "What you'll actually look at",
        steps: [
          { src: "/images/app/dashboard-desktop.webp", title: "Home, in chat view", body: "Active chats, resolution rate, sold by AI, and a copilot box in the middle of the page." },
          { src: "/images/app/dashboard-mode-desktop.webp", title: "Home, in dashboard view", body: "Revenue and orders influenced, the recommendation funnel and the questions shoppers ask most." },
          { src: "/images/app/live-activity-desktop.webp", title: "Live Activity", body: "Every open conversation with the shopper's cart beside it, refreshing as it happens." },
        ],
      }}
      review={getReview("l1nk")}
      alsoSee={[
        { href: "/products/roi-tracking", title: "Insights & ROI", body: "How attribution works, number by number." },
        { href: "/help/use-ask-aurevia", title: "Help: Ask Aurevia", body: "Prompts that work and what the copilot can change." },
        { href: "/help/read-the-dashboard-metrics", title: "Help: reading the metrics", body: "What every card means." },
      ]}
    />
  );
}
