import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Automate Ecommerce Support with AI | WISMO & Policies | Aurevia";
const desc =
  "Deflect WISMO, returns, and product questions with order-aware, catalogue-grounded answers, while the agent still sells when the moment is right. Shopify + AI support that pays for itself.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/solutions/support" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/solutions/support/" },
};

const demoScript: ChatStep[] = [
  { type: "user", text: "Where's my order #1042?" },
  {
    type: "card",
    head: "Order #1042",
    title: "Shipped · due Thursday",
    note: "UPS Ground · tracking sent by email",
    progress: true,
    cue: { icon: "check", eyebrow: "Order lookup", title: "Live from Shopify" },
  },
  { type: "user", text: "Can I return it if the size is wrong?" },
  { type: "bot", text: "Yes. You have 30 days, and the return label is free.", cue: { icon: "book", eyebrow: "Store policy", title: "Returns & exchanges" } },
  { type: "user", text: "I'd rather swap it for a larger size now." },
  { type: "bot", text: "I've passed that to the team with your order attached. Someone will reply here shortly.", cue: { icon: "ticket", eyebrow: "Handoff", title: "Ticket with the order" } },
];

export default function SupportPage() {
  return (
    <FeatureSubpageLayout
      path="/solutions/support"
      breadcrumbLabel="Automate support"
      backHref="/solutions"
      backLabel="← Back to Solutions"
      headline={
        <>
          Support that does not <span className="green-highlight">surrender the sale</span>
        </>
      }
      demo={<FeatureChatDemo agentName="Support Agent" script={demoScript} />}
      subtitle="Order and policy questions are where trust is won. Aurevia answers them from your store's own data and hands over only when a person is needed."
      featureBlocks={[
        { visual: { kind: "order" }, title: "Pre- and post-sales in one", body: "The story doesn't end at purchase. Aurevia links discovery, cart and support in one place." },
        { visual: { kind: "knowledge" }, title: "Policy consistency", body: "Returns, exchanges, and edge cases use what you actually publish, so the team is not firefighting self-inflicted mistakes." },
        { visual: { kind: "kpis", stats: [["Resolution rate", "93.9%"], ["Human escalations", "10"], ["Conversations", "163"]] }, title: "Lower ticket volume, higher CSAT", body: "When people get a fast, correct response, they do not have to re-open, DM, and escalate." },
        { visual: { kind: "handoff" }, title: "Escalation with context", body: "Rare cases go to your team with the thread and the cart, not a blank email." },
      ]}
      howItWorks={[
        { title: "Connect policies and help content", body: "Your real rules feed the first line of response." },
        { title: "Shoppers self-serve WISMO", body: "Order lookups and clear timelines reduce ‘where is my order’ load." },
        { title: "Triage the exceptions", body: "Only the threads that need policy judgment hit your team." },
      ]}
      relatedLinks={[
        { href: "/products/automated-responses", label: "Automated responses" },
        { href: "/products/ticket-management", label: "Escalation" },
        { href: "/solutions/conversion", label: "Conversion" },
      ]}
      faqs={[
        { q: "Is this a replacement for Gorgias or Zendesk?", a: "Often it is the AI layer that feeds those tools with better first responses and less noise. The focus is deflection and context, not re-buying a whole helpdesk in week one." },
        { q: "How do you handle edge-case policies?", a: "You set boundaries; sensitive flows can route to humans quickly while the AI still gathers facts." },
        { q: "Can we still run macros for VIPs?", a: "Use your playbooks: priority tiers and special handling sit alongside the AI, not in conflict with it." },
      ]}
    />
  );
}
