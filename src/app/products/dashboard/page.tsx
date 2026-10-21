import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { AppHeroDemo, AskEditScene, ChatHomeMini, DashboardMini, LiveActivityMini } from "@/components/products/ProductScenes";
import { getReview } from "@/lib/reviews";

const title = "Dashboard & Ask Aurevia Copilot | Aurevia";
const desc =
  "One place to see your store's conversations, the sales they led to and how the agent is doing. AI analytics for Shopify, with only the charts you'll actually use.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/dashboard" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/dashboard/" },
};

export default function DashboardPage() {
  return (
    <FeatureSubpageLayout
      path="/products/dashboard"
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Dashboard & Ask Aurevia"
      headline={
        <>
          Check your week <span className="green-highlight">on one screen</span>
        </>
      }
      subtitle="Open the dashboard and see at a glance whether the agent paid for itself this week: the revenue it helped with, the conversations it handled and where your team had to step in. You get the numbers that matter without reading through chat logs."
      heroBullets={[
        "Revenue and conversations in one view",
        "How the agent is doing: coverage and deflection",
        "Made for a weekly check-in",
      ]}
      demo={<AppHeroDemo />}
      featureBlocks={[
        {
          visual: { kind: "kpis" },
          title: "Conversations and revenue together",
          body: "See chat volume next to the results you care about, so you don't end up chasing chats per day.",
        },
        {
          visual: { kind: "kpis", stats: [["Resolution rate", "93.9%"], ["Human escalations", "10"], ["AI messages", "486"]] },
          title: "See how the agent is doing",
          body: "Check coverage, deflection and where your team takes over, so you know what to improve in the agent and in your team.",
        },
        {
          visual: { kind: "live" },
          title: "Fits a store owner's day",
          body: "Short check-ins: what changed this week, what to fix next and what to keep.",
        },
        {
          visual: { kind: "context" },
          title: "Context for the numbers",
          body: "Read the numbers against your campaigns, launches and busy support days. When a figure moves, that context matters.",
        },
      ]}
      howItWorks={[
        { title: "Connect and install", body: "Your Shopify data and knowledge base give you the first baseline." },
        { title: "Check in each week", body: "Look at the headline numbers and anything that needs attention." },
        { title: "Make changes in the same place", body: "Adjust rules, wording and priorities without leaving the dashboard." },
      ]}
      relatedLinks={[
        { href: "/products/roi-tracking", label: "ROI tracking" },
      ]}
      faqs={[
        {
          q: "How is this different from Google Analytics?",
          a: "It links shopper questions, how the agent performed and the sales that followed, so you aren't guessing everything from pageviews.",
        },
        {
          q: "Can I share access with my agency?",
          a: "Follow your own process for sharing logins. The aim is that you and your partners look at the same honest view of performance.",
        },
        {
          q: "Can I ask the dashboard questions instead of reading charts?",
          a: "Yes. Ask Aurevia is built into the dashboard. Press ⌘K and ask in plain English. It answers with charts and sources, and can suggest catalogue fixes that you confirm before anything changes in Shopify.",
        },
      ]}
      screenshot={{
        scene: <AskEditScene />,
        title: "Ask it to fix something, then confirm",
        caption: "Ask Aurevia shows the edit as a card with the product, the new title and the new description. Nothing changes in Shopify until you click Confirm.",
      }}
      setup={{
        title: "What you'll actually look at",
        steps: [
          { scene: <ChatHomeMini />, title: "Home, in chat view", body: "Active chats, resolution rate, sales made by the agent, and an Ask Aurevia box in the middle of the page." },
          { scene: <DashboardMini />, title: "Home, in dashboard view", body: "Revenue and orders the agent influenced, the recommendation funnel and the questions shoppers ask most." },
          { scene: <LiveActivityMini />, title: "Live Activity", body: "Every open conversation with the shopper's cart beside it, updating as it happens." },
        ],
      }}
      review={getReview("l1nk")}
      alsoSee={[
        { href: "/products/roi-tracking", title: "Insights & ROI", body: "How attribution works, one number at a time." },
        { href: "/help/use-ask-aurevia", title: "Help: Ask Aurevia", body: "Questions that work well and what it can change." },
        { href: "/help/read-the-dashboard-metrics", title: "Help: reading the metrics", body: "What every card means." },
      ]}
    />
  );
}
