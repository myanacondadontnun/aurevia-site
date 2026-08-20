import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Ecommerce Chat Escalation & Handoff | Aurevia";
const desc =
  "Triage conversations with cart and order context. Route high-stakes issues to your team—without losing the story. For Shopify teams who outgrew a blind inbox.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

const demoScript: ChatStep[] = [
  { type: "user", text: "My order arrived damaged 😞 The mug is cracked down the side." },
  {
    type: "bot",
    text: "Oh no — so sorry, Maya. I've pulled up order #48291. I can ship a free replacement today, or refund you in full. Which works better?",
  },
  { type: "user", text: "Replacement please. The outer box was soaked too, FYI." },
  {
    type: "bot",
    text: "Done — your replacement ships today with tracking. And I'm flagging the packaging issue to the team with your photos attached.",
  },
  {
    type: "card",
    head: "Ticket created",
    title: "#1042 · Damaged on arrival",
    note: "Priority: high · Full transcript & order attached",
    progress: true,
  },
  { type: "user", text: "Wow, that was easy. Thank you!" },
];

export default function TicketManagementPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Ticket management"
      headline={
        <>
          Fewer tickets. <span className="green-highlight">Better handoffs.</span>
        </>
      }
      subtitle="The AI resolves the routine issues on its own — refunds, replacements, WISMO — and when something genuinely needs a human, your team gets the full story: transcript, order, cart, and what was already promised."
      heroBullets={[
        "AI resolves the repetitive 80%",
        "Escalations arrive with full context",
        "Your rules decide what needs a human",
      ]}
      demo={<FeatureChatDemo agentName="Support Agent" script={demoScript} />}
      proofStrip={[
        { label: "No blank tickets", text: "Every escalation carries what they asked, what they bought, and what the AI already offered." },
        { label: "First reply, pre-written", text: "Your team opens the right queue with the story already gathered — no “can you repeat that?”" },
        { label: "The cart stays warm", text: "Escalating a problem never has to mean abandoning a sale mid-thread." },
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
      testimonial={{
        quote:
          "Our shared support inbox used to be a graveyard of unanswered questions by Friday. Now most of it never even reaches a human, and the tickets that do come through are the ones that actually need a person.",
        name: "Fatima Rahman",
        role: "Customer Support Lead",
        company: "Willowbrook Studio",
      }}
    />
  );
}
