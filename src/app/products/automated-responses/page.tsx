import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "AI Automated Responses for Shopify | Aurevia";
const desc =
  "Catalog-grounded AI answers for pre-sales, shipping, and returns—24/7. Deflect tickets without losing the sale. Built for ecommerce brands.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function AutomatedResponsesPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          Instant answers that still feel like <span className="green-highlight">selling</span>—not stalling
        </>
      }
      subtitle="Aurevia is not a generic help bot. It answers with your catalog, policies, and brand voice, then nudges shoppers toward the right product and the cart. You get 24/7 coverage without a script that dead-ends in “contact support.”"
      lede="You paid for the traffic. Make sure the first message they get is accurate, on-brand, and revenue-aware. Merchants use automated responses to reduce repeat questions, shorten time-to-answer, and keep humans for the conversations that need a person."
      proofStrip={[
        { label: "Ecommerce-native", text: "Recommendations and cart context live in the same thread as policies and shipping." },
        { label: "Guardrails", text: "Grounded in your data so shoppers do not get fantasy SKUs or made-up return rules." },
        { label: "Escalation-ready", text: "When a thread needs a human, your team gets full history—not a blank ticket." },
      ]}
      featureBlocks={[
        {
          title: "What it answers, out of the box",
          body: "Product fit, size and materials, shipping cutoffs, and common policy questions—tied to what is actually in your store so answers stay defensible.",
        },
        {
          title: "Sales-aware, not ticket-first",
          body: "The same turn can suggest a product card, a bundle, or a checkout nudge. Support volume drops because uncertainty disappears before it becomes a ticket.",
        },
        {
          title: "Always-on without sounding robotic",
          body: "Set tone, vocabulary, and plain-English “selling rules” so the AI consults the way you would, at any hour your buyers shop.",
        },
        {
          title: "Handoff when it matters",
          body: "Complex cases escalate with context: what they viewed, what they added, and what they were told—so your team does not start over.",
        },
      ]}
      howItWorks={[
        {
          title: "Ingest your truth",
          body: "Connect catalog, FAQs, and policies. Aurevia uses what you already publish—no training on random web pages.",
        },
        {
          title: "Shoppers ask in their words",
          body: "Natural language, quick replies, and multi-intent questions route to a single thread that can sell and support together.",
        },
        {
          title: "You tune, it improves",
          body: "Adjust responses and rules from the dashboard; watch what gets asked and what converts so you can iterate weekly.",
        },
      ]}
      media={{
        ariaLabel: "Demo placeholder for instant AI response with product card",
        caption: "Swap in: 15–20s screen recording of a shipping question that ends on a product recommendation",
        suggestedAsset: "Record a browser session: shopper asks about delivery, AI answers, then steers to a high-fit SKU with an Add to cart chip.",
        aspect: "video",
        kind: "video",
      }}
      relatedLinks={[
        { href: "/products/shopify", label: "Shopify integration" },
        { href: "/products/ticket-management", label: "Escalation and context" },
        { href: "/solutions/support", label: "Support automation" },
        { href: "/products/recommendations", label: "Product recommendations" },
      ]}
      faqs={[
        {
          q: "Is this a generic ChatGPT on my site?",
          a: "No. Responses are designed around your store data and merchant rules, with ecommerce actions—like add to cart and order-aware replies—not open-ended chat for its own sake.",
        },
        {
          q: "How does this reduce support load?",
          a: "Most tickets start as uncertainty. When shoppers get a correct answer fast—and can buy without a detour—many issues never get filed.",
        },
        {
          q: "Can a human take over mid-chat?",
          a: "Yes. The AI can hand off with full context so your team picks up the conversation without making the customer repeat themselves.",
        },
      ]}
    />
  );
}
