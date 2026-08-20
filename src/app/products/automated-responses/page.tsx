import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "AI Automated Responses for Shopify | Aurevia";
const desc =
  "Catalog-grounded AI answers for pre-sales, shipping, and returns—24/7. Deflect tickets without losing the sale. Built for ecommerce brands.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

const demoScript: ChatStep[] = [
  { type: "user", text: "Hi! Do you ship to Canada? How long does it take?" },
  {
    type: "bot",
    text: "We do! 🇨🇦 Standard shipping to Canada is 5–8 business days, express is 2–3. And orders over $75 ship free.",
  },
  {
    type: "card",
    head: "Answered from your policies",
    title: "Shipping & delivery",
    note: "Source: store policy · updated 2 days ago",
  },
  { type: "user", text: "What about customs fees? I've been burned before 😅" },
  {
    type: "bot",
    text: "Duties are calculated at checkout — the price you see is final. No surprise fees at the door, promise.",
  },
  { type: "user", text: "Amazing. Ordering now!" },
];

export default function AutomatedResponsesPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Automated responses"
      headline={
        <>
          Every question answered in <span className="green-highlight">seconds, not shifts</span>
        </>
      }
      subtitle="Your shoppers don't wait for business hours — and now they don't have to. Aurevia answers from your catalog, policies, and brand voice, then steers the conversation back toward the sale."
      heroBullets={[
        "Live 24/7, in your brand voice",
        "Grounded in your store data",
        "Hands off to humans with full context",
      ]}
      demo={<FeatureChatDemo agentName="Support Agent" script={demoScript} />}
      proofStrip={[
        { label: "Answers in seconds", text: "Shipping, sizing, and policy questions resolved instantly — before they become tickets." },
        { label: "Zero made-up answers", text: "Every reply is grounded in your published data, so shoppers never hear fantasy SKUs or invented return rules." },
        { label: "Sells while it supports", text: "The same thread that answers a question can recommend a product and open the cart." },
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
      testimonial={{
        quote:
          "We're a two-person team and customers used to wait until Monday for an answer. Now someone gets a real, specific response at 2am on a Saturday, and half the time they check out right after.",
        name: "Hannah Voss",
        role: "Co-Founder",
        company: "Marlin & Ash",
      }}
    />
  );
}
