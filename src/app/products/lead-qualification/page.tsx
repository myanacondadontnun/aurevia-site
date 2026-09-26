import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Ecommerce Lead Capture & Export | Aurevia";
const desc =
  "You paid for the traffic—capture the conversation. Name, email, and high-intent signals in one place, exportable for your CRM and follow-up. Shopify AI chat with leads built in.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/lead-qualification" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/lead-qualification/" },
};

const demoScript: ChatStep[] = [
  { type: "user", text: "Do you do bulk pricing? I'd need around 200 units for a company retreat." },
  {
    type: "bot",
    text: "We do! 200+ units qualifies for our wholesale tier. What's your timeline looking like?",
  },
  { type: "user", text: "Next month ideally. Budget is around $4k." },
  {
    type: "bot",
    text: "That's a great fit. I've passed the details to our sales team — Sarah will email you a tailored quote today. What's the best address?",
  },
  { type: "user", text: "tom@northarc.co — thanks!" },
  {
    type: "card",
    head: "Saved to Leads",
    title: "High intent · B2B · $4k budget",
    note: "Timeline 30 days · Transcript attached · In your Leads tab",
    progress: true,
  },
];

export default function LeadQualificationPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Lead qualification"
      headline={
        <>
          You paid for the traffic — <span className="green-highlight">keep the people</span>
        </>
      }
      subtitle="Every anonymous chat is a lead you almost had. Aurevia qualifies intent in the conversation — budget, timeline, use case — captures the email at the natural moment, and hands your team a name worth calling."
      heroBullets={[
        "Qualifies budget & timeline in-chat",
        "Captures emails after value, not before",
        "Exports clean records to your CRM",
      ]}
      demo={<FeatureChatDemo agentName="Sales Agent" script={demoScript} />}
      proofStrip={[
        { label: "Names, not sessions", text: "Know which conversations produced a lead — not just which ads got clicks." },
        { label: "Qualified before you call", text: "Budget, timeline, and intent arrive with the contact, so outreach minutes land on the right accounts." },
        { label: "Privacy-minded by design", text: "Collect only what you need, with copy aligned to your policy and regions." },
      ]}
      featureBlocks={[
        {
          title: "In-flow capture, not a wall",
          body: "Ask for email at the right moment—after value, not before—so the exchange feels fair.",
        },
        {
          title: "Conversation history, organized",
          body: "Review what they asked, what the AI said, and what to do next when your team takes over.",
        },
        {
          title: "Export when you need to",
          body: "Every lead sits in the Leads tab with its transcript. Export the list as CSV on any paid plan and drop it into the tools you already use."
        },
        {
          title: "Pair with high-intent signals",
          body: "Prioritize by cart value, category interest, and repeat visits so outbound time is not wasted.",
        },
      ]}
      howItWorks={[
        { title: "Engage, then request", body: "Qualify the problem first; the ask for an email is contextual, not cold." },
        { title: "Tag and triage", body: "Status and notes help marketing and support sort hot versus nurture leads." },
        { title: "Follow up", body: "Open the latest chat, copy the email, or export the list as CSV when you want it somewhere else." },
      ]}
      relatedLinks={[
        { href: "/products/ticket-management", label: "Escalation" },
        { href: "/products/roi-tracking", label: "Insights & ROI" },
      ]}
      faqs={[
        {
          q: "Can we block capture in certain countries?",
          a: "Work with your policies and our configuration options for consent-appropriate copy by region; your legal team should align requirements.",
        },
        {
          q: "Does this replace my ESP?",
          a: "No. Leads live in Aurevia with their conversation history, and you can export them as CSV for the email platform or CRM you already use. There is no automatic sync today.",
        },
        {
          q: "How is this different from a pop-up form?",
          a: "The lead arrives with a transcript of what they need. Your team and automations are not starting from a bare address alone.",
        },
      ]}
      screenshot={{
        src: "/images/app/leads-desktop.webp",
        url: "app.aurevia.io/lead-management",
        title: "Every lead with the conversation attached",
        caption: "Lead Collection lists shoppers who gave an email, with phone, chat count and last chat. Open the latest conversation or export the list as CSV.",
      }}
      review={getReview("l1nk")}
      alsoSee={[
        { href: "/products/ticket-management", title: "Live takeover & tickets", body: "Pick up a hot lead in the chat yourself." },
        { href: "/products/cart-recovery", title: "Cart recovery", body: "Leads with a cart get the follow-up email automatically." },
        { href: "/help/take-over-a-live-chat", title: "Help: Live Activity", body: "Filters, details panel and takeover." },
      ]}
    />
  );
}
