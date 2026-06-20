import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Ecommerce AI Performance Dashboard | Aurevia";
const desc =
  "A merchant home for what matters: conversations, revenue-leaning signals, and how your AI is performing. Shopify AI analytics without vanity charts.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function DashboardPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          A command center for <span className="green-highlight">outcomes</span>
        </>
      }
      subtitle="The dashboard is where you see whether the investment is working: are shoppers engaging, is the AI staying on-brand, and is revenue moving—not just how many messages you processed. It is the daily screen for heads of ecommerce who need signal, not a firehose of chat logs."
      lede="Pair this with ROI tracking and conversation analytics: the dashboard is the snapshot; the other views are the drill-down when you are optimizing a campaign or a playbook."
      proofStrip={[
        { label: "At a glance", text: "KPIs that connect chat activity to the business, not a wall of unlabeled widgets." },
        { label: "Team-ready", text: "Give leadership and operators the same numbers so plans do not get debated from different spreadsheets." },
        { label: "Actionable", text: "Spot what to test next: prompts, products, or regions—without a separate BI hire." },
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
      media={{
        ariaLabel: "Performance dashboard video placeholder",
        caption: "Swap in: screen capture pan across KPIs and a healthy trend line",
        suggestedAsset: "8–12s Lottie or video: conversations, sales snapshot, a sparkline, and a clean dark UI matching your brand mock.",
        kind: "video",
        aspect: "video",
      }}
      relatedLinks={[
        { href: "/products/analytics", label: "Conversation analytics" },
        { href: "/products/roi-tracking", label: "ROI tracking" },
        { href: "/solutions/insights", label: "Insights solutions" },
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
          q: "What if we are in beta and numbers move around?",
          a: "Early on, use trends and qualitative wins alongside absolute figures; the product hardens with your feedback.",
        },
      ]}
    />
  );
}
