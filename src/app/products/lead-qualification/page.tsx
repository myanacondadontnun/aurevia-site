import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { LeadsScene } from "@/components/products/ProductScenes";
import { getReview } from "@/lib/reviews";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Ecommerce Lead Capture & Export | Aurevia";
const desc =
  "You paid for the traffic, so keep the conversation. Names, emails and buying signals in one place, ready to export for your CRM and follow-up. AI chat for Shopify with lead capture built in.";

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
    cue: { icon: "search", eyebrow: "Qualifying", title: "Volume and timeline" },
    text: "We do. 200 or more units puts you in our wholesale tier. When do you need them?",
  },
  { type: "user", text: "Next month ideally. Budget is around $4k." },
  {
    type: "bot",
    cue: { icon: "mail", eyebrow: "Handover", title: "Sales team notified" },
    text: "That works. I've passed your details to our sales team and Sarah will email you a quote today. What's the best email address for you?",
  },
  { type: "user", text: "tom@northarc.co, thanks!", cue: { icon: "user", eyebrow: "Lead captured", title: "Saved to Leads" } },
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
      path="/products/lead-qualification"
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Lead qualification"
      headline={
        <>
          You paid for the traffic. <span className="green-highlight">Keep the people.</span>
        </>
      }
      subtitle="Aurevia learns budget, timeline and needs in the chat, asks for an email when it makes sense and hands your team a lead worth following up."
      heroBullets={[
        "Asks about budget and timeline in the chat",
        "Asks for the email after helping, not before",
        "CSV export for your CRM",
      ]}
      demo={<FeatureChatDemo agentName="Sales Agent" script={demoScript} />}
      featureBlocks={[
        {
          visual: { kind: "ask", q: "Do you do bulk pricing?", a: "We do. What's the best email for a quote?", source: "Captures the lead" },
          title: "Asked for in the chat",
          body: "The agent asks for an email at the right moment, after it has helped, so the exchange feels fair.",
        },
        {
          visual: { kind: "history" },
          title: "Conversation history, organised",
          body: "See what they asked, what the agent said and what to do next when your team takes over.",
        },
        {
          visual: { kind: "export" },
          title: "Export when you need to",
          body: "Every lead sits in the Leads tab with its transcript. On any paid plan, export the list as a CSV and add it to the tools you already use."
        },
        {
          visual: { kind: "leads" },
          title: "Sort by buying signals",
          body: "Prioritise by cart value, the categories they looked at and repeat visits, so your follow-up time isn't wasted.",
        },
      ]}
      howItWorks={[
        { title: "Help first, then ask", body: "The agent works out what they need first, so asking for an email makes sense at that point." },
        { title: "Tag and sort", body: "Statuses and notes help marketing and support tell hot leads from ones to nurture." },
        { title: "Follow up", body: "Open the latest chat, copy the email, or export the list as a CSV when you want it somewhere else." },
      ]}
      relatedLinks={[
        { href: "/products/ticket-management", label: "Handing over to your team" },
        { href: "/products/roi-tracking", label: "Insights & ROI" },
      ]}
      faqs={[
        {
          q: "Can we stop collecting leads in certain countries?",
          a: "You can set the consent wording by region to match your own policies. Your legal team should confirm what each region requires.",
        },
        {
          q: "Does this replace my email platform?",
          a: "No. Leads live in Aurevia with their conversation history, and you can export them as a CSV for the email platform or CRM you already use. There is no automatic sync today.",
        },
        {
          q: "How is this different from a pop-up form?",
          a: "The lead comes with a transcript of what they need, so your team and your automations have more to work with than an email address.",
        },
      ]}
      screenshot={{
        scene: <LeadsScene />,
        title: "Every lead with the conversation attached",
        caption: "Lead Collection lists shoppers who gave an email, with their phone number, chat count and last chat. Open the latest conversation or export the list as a CSV.",
      }}
      review={getReview("l1nk")}
      alsoSee={[
        { href: "/products/ticket-management", title: "Live takeover & tickets", body: "Join the chat yourself when a hot lead comes in." },
        { href: "/products/cart-recovery", title: "Cart recovery", body: "Leads who leave a cart get the follow-up email automatically." },
        { href: "/help/take-over-a-live-chat", title: "Help: Live Activity", body: "Filters, the details panel and taking over." },
      ]}
    />
  );
}
