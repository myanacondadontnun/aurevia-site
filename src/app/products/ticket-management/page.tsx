import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Ecommerce Chat Escalation & Handoff | Aurevia";
const desc =
  "Triage conversations with cart and order context. Route high-stakes issues to your team—without losing the story. For Shopify teams who outgrew a blind inbox.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function TicketManagementPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          Escalation that keeps <span className="green-highlight">revenue</span> in the loop
        </>
      }
      subtitle="Aurevia is not a full replacement for your helpdesk—but it is the front line that should never send you a context-free “customer is angry” ping. Triage, status, and full conversation + cart context land where your team works, so the fix is fast and the sale is not lost by default."
      lede="Use this when volume grows: the AI deflects and sells first; humans get clear triage, not a firehose. Think handoff, not ticket ping-pong."
      proofStrip={[
        { label: "Context-rich", text: "See what they asked, what they bought, and what the AI already offered." },
        { label: "Faster first reply", text: "Your team opens the right queue with the story pre-written by the customer." },
        { label: "Revenue-friendly", text: "Escalation does not have to mean abandoning a warm cart." },
      ]}
      featureBlocks={[
        {
          title: "Triage you can trust",
          body: "Spot urgent threads—chargebacks, severe complaints, or VIP rules—and route them before they sit in a general bucket.",
        },
        {
          title: "Not “another app” fatigue",
          body: "The goal is fewer duplicate tools, not more. Connect conversation history and outcomes so leadership sees one picture.",
        },
        {
          title: "Works with how you already operate",
          body: "If you run a helpdesk today, the AI is the first touch that enriches what humans see next—not a black box on the side.",
        },
        {
          title: "Accountability, not black-box AI",
          body: "Reviewable transcripts and outcomes mean you can coach the AI and the team with the same data.",
        },
      ]}
      howItWorks={[
        { title: "AI handles first", body: "Deflect FAQs, WISMO, and fit questions with catalog-aware answers in brand voice." },
        { title: "Triggers you define", body: "Escalation rules reflect your risk, SLAs, and customer tiers—not a one-size list." },
        { title: "Team picks up in context", body: "Humans get chat history, cart, and what was promised so the customer is not re-explaining." },
      ]}
      media={{
        ariaLabel: "Placeholder for merchant dashboard with assign and status",
        caption: "Swap in: static or screen capture of conversation list + assign to team + cart sidebar",
        suggestedAsset: "A UI mock: active chats on the left, message thread, right rail with line items, status pill, and Assign action—see your 'live chat + history' reference.",
        kind: "image",
        aspect: "wide",
      }}
      relatedLinks={[
        { href: "/products/automated-responses", label: "Automated responses" },
        { href: "/products/lead-qualification", label: "Lead capture" },
        { href: "/products/analytics", label: "Conversation analytics" },
        { href: "/solutions/enterprise", label: "Enterprise programs" },
      ]}
      faqs={[
        {
          q: "Is this a Zendesk or Gorgias replacement?",
          a: "Aurevia focuses on the AI storefront and conversation layer. Many teams use it alongside a helpdesk; the value is deflection plus rich escalation context, not re-building your entire support stack in day one.",
        },
        {
          q: "What does an agent see on handoff?",
          a: "At minimum, the full message thread and shopper context the AI used—so agents answer as if they were there the whole time.",
        },
        {
          q: "Can we limit what the AI says before handoff?",
          a: "Yes. Merchant rules and policy hierarchy keep the AI in bounds; sensitive topics can route to humans immediately if you prefer.",
        },
      ]}
    />
  );
}
