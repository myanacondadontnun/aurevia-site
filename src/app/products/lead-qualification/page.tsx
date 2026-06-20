import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Ecommerce Lead Capture & Export | Aurevia";
const desc =
  "You paid for the traffic—capture the conversation. Name, email, and high-intent signals in one place, exportable for your CRM and follow-up. Shopify AI chat with leads built in.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function LeadQualificationPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          You paid for the traffic—<span className="green-highlight">keep the people</span>
        </>
      }
      subtitle="Aurevia ties conversations to contact records so a chat is not a black hole. Capture emails when it makes sense, see who is browsing versus buying, and export leads to your follow-up process. Sales and marketing get names they can work—not anonymous threads that never leave the widget."
      lede="Use this for high-consideration catalogs, B2B-light storefronts, or any brand where a human will eventually pick up the phone. The AI can qualify intent first so your team spends minutes on the right accounts."
      proofStrip={[
        { label: "Attribution", text: "Know which sessions produced a lead, not just which ads got clicks." },
        { label: "Compliance-minded", text: "Collect only what you need; align copy with your privacy policy and regions." },
        { label: "Revenue, not just names", text: "Pair leads with what they almost bought to prioritize outreach." },
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
          title: "Export to how you work",
          body: "Get a clean table for your CRM, lifecycle email, or sales queue—less copy-paste from random inboxes.",
        },
        {
          title: "Pair with high-intent signals",
          body: "Prioritize by cart value, category interest, and repeat visits so outbound time is not wasted.",
        },
      ]}
      howItWorks={[
        { title: "Engage, then request", body: "Qualify the problem first; the ask for an email is contextual, not cold." },
        { title: "Tag and triage", body: "Status and notes help marketing and support sort hot versus nurture leads." },
        { title: "Sync or export", body: "Move contacts into the tools you already pay for, on a schedule that fits ops." },
      ]}
      media={{
        ariaLabel: "Lead table export mock placeholder",
        caption: "Swap in: lead list UI with name, email, captured time, and Export",
        suggestedAsset: "Use your dashboard still: a simple table, export button, and maybe a “captured from chat” column.",
        kind: "image",
        aspect: "wide",
      }}
      relatedLinks={[
        { href: "/products/ticket-management", label: "Escalation" },
        { href: "/solutions/insights", label: "Customer insights" },
        { href: "/products/analytics", label: "Analytics" },
      ]}
      faqs={[
        {
          q: "Can we block capture in certain countries?",
          a: "Work with your policies and our configuration options for consent-appropriate copy by region; your legal team should align requirements.",
        },
        {
          q: "Does this replace my ESP?",
          a: "No. It feeds your stack—export or integrate—so the email platform or CRM you already use gets better inputs.",
        },
        {
          q: "How is this different from a pop-up form?",
          a: "The lead arrives with a transcript of what they need. Your team and automations are not starting from a bare address alone.",
        },
      ]}
    />
  );
}
