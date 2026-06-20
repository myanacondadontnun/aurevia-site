import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Automate Ecommerce Support with AI | WISMO & Policies | Aurevia";
const desc =
  "Deflect WISMO, returns, and product questions with order-aware, catalog-grounded answers—while the AI still sells when the moment is right. Shopify + AI support that pays for itself.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function SupportPage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      headline={
        <>
          Support that does not <span className="green-highlight">surrender the sale</span>
        </>
      }
      subtitle="WISMO and policy questions are not an annoyance—they are where trust is won or lost. Aurevia gives accurate, on-brand answers with order context, and only hands off when a human is truly needed. The same system can offer a product fix or cross-sell when it resolves the issue, so support time drops while revenue does not have to."
      lede="This is the path for operations leaders who are out of headcount, not out of customers. The goal is not ‘close every ticket in ten seconds’—it is resolve correctly, reduce repeats, and keep buyers moving."
      proofStrip={[
        { label: "Order-aware", text: "Track status, shipping, and return paths without making shoppers dig for a portal login first." },
        { label: "Deflection with dignity", text: "Fewer one-line macros; more real answers with room to add value." },
        { label: "Sales when it makes sense", text: "A resolved doubt is a good moment to suggest what pairs well or replaces an out-of-stock item." },
      ]}
      featureBlocks={[
        { title: "Pre- and post-sales in one", body: "The story does not end at purchase—Aurevia links discovery, cart, and support into one experience." },
        { title: "Policy consistency", body: "Returns, exchanges, and edge cases use what you actually publish, so the team is not firefighting self-inflicted mistakes." },
        { title: "Lower ticket volume, higher CSAT", body: "When people get a fast, correct response, they do not have to re-open, DM, and escalate." },
        { title: "Escalation with context", body: "Hand rare cases to people with the thread and the cart—not a blank “customer mad” email." },
      ]}
      howItWorks={[
        { title: "Connect policies and help content", body: "Your real rules feed the first line of response." },
        { title: "Shoppers self-serve WISMO", body: "Order lookups and clear timelines reduce ‘where is my order’ load." },
        { title: "Triage the exceptions", body: "Only the threads that need policy judgment hit your team." },
      ]}
      media={{
        ariaLabel: "Pre-sales and post-sales chat mock placeholder",
        caption: "Swap in: side-by-side phone UIs: product Q vs. order tracking in chat",
        suggestedAsset: "Use your dual-mobile mock: TrailLite pre-sales + order #12345 post-sales with in-transit card.",
        kind: "image",
        aspect: "wide",
      }}
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
