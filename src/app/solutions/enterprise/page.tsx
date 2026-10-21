import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Aurevia for Larger Shopify Brands | Custom Plans";
const desc =
  "High-volume Shopify stores: unlimited seats, priority support, a custom message allowance, and a GDPR-ready data setup. Talk to us about a plan that fits your traffic.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/solutions/enterprise" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/solutions/enterprise/" },
};

export default function EnterprisePage() {
  return (
    <FeatureSubpageLayout
      path="/solutions/enterprise"
      breadcrumbLabel="Enterprise"
      backHref="/solutions"
      backLabel="← Back to Solutions"
      headline={
        <>
          The same <span className="green-highlight">revenue</span> story, at volume
        </>
      }
      subtitle="Larger stores need the same agent with more room: more messages, more seats, a team that answers fast, and clear answers on where data lives. That is what the custom plan covers. No separate product, no re-platforming."
      lede="Aurevia is Shopify-native. Your catalog, orders and cart stay in Shopify; the agent reads them through the app you installed. If you have a legal or security review to pass, we'll work through it with you."
      featureBlocks={[
        { visual: { kind: "allowance" }, title: "Custom message allowance", body: "Scale plans stop at 6,000 messages a month. Above that we quote a flat monthly allowance instead of stacking top-ups." },
        { visual: { kind: "team" }, title: "Team at scale", body: "Owner, admin and member roles. Members handle conversations and tickets; admins shape the AI. Unlimited seats on custom plans." },
        { visual: { kind: "handoff" }, title: "Priority support", body: "A named contact, faster replies, and help with rollout: knowledge sources, handoff rules and hours set up with you." },
        { visual: { kind: "guardrail" }, title: "Governed behaviour", body: "Always and Never rules, corrections, handoff thresholds and working hours give you a documented control layer over what the agent says." },
      ]}
      howItWorks={[
        { title: "Talk to us", body: "Share traffic, order volume and what you need the agent to own. We size the allowance." },
        { title: "Pilot on your store", body: "Install, train on your documents, run for two to four weeks and read the attributed revenue." },
        { title: "Move to the custom plan", body: "Billed through Shopify like every other plan, so procurement sees one invoice." },
      ]}
      relatedLinks={[
        { href: "/contact", label: "Talk to us" },
        { href: "/pricing", label: "Plans and pricing" },
        { href: "/gdpr", label: "GDPR and data handling" },
        { href: "/help", label: "Help centre" },
      ]}
      faqs={[
        { q: "Is there an API or a way to pull data into our warehouse?", a: "Not yet. Today the dashboard is the reporting surface, and leads export as CSV. If you need a specific feed, tell us what for and we'll be straight about timing." },
        { q: "Will you complete a security questionnaire or sign a DPA?", a: "Yes. Send it over. Our GDPR page describes the data we hold, where, and for how long; the DPA follows the same terms." },
        { q: "Can we run it on more than one store?", a: "Yes. One login can belong to several stores and switch between them. Each store keeps its own agent, knowledge and plan." },
      ]}
    />
  );
}
