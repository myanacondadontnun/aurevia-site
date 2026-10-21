import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { CorrectionMini, KnowledgeScene, RulesMini, SourcesMini } from "@/components/products/ProductScenes";
import { getReview } from "@/lib/reviews";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "AI Automated Responses for Shopify | Aurevia";
const desc =
  "Answers pre-sales, shipping and returns questions 24/7, using your own catalogue and policies. Fewer tickets, and shoppers stay on their way to checkout. Made for Shopify stores.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/automated-responses" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/automated-responses/" },
};

const demoScript: ChatStep[] = [
  { type: "user", text: "Hi! Do you ship to Canada? How long does it take?" },
  {
    type: "bot",
    cue: { icon: "book", eyebrow: "Knowledge base", title: "Shipping & Delivery" },
    text: "Yes, we do. Standard shipping to Canada takes 5 to 8 business days, or 2 to 3 with express. Orders over $75 ship free.",
  },
  {
    type: "card",
    head: "Answered from your policies",
    title: "Shipping and delivery",
    note: "Source: store policy · updated 2 days ago",
  },
  { type: "user", text: "What about customs fees? I've been burned before 😅" },
  {
    type: "bot",
    cue: { icon: "check", eyebrow: "Store policy", title: "Duties at checkout" },
    text: "Duties are worked out at checkout, so the price you see is what you pay. Nothing extra to pay at the door.",
  },
  { type: "user", text: "Great, ordering now!", cue: { icon: "cart", eyebrow: "Outcome", title: "Heading to checkout" } },
];

const orderScript: ChatStep[] = [
  { type: "user", text: "Where's my order? #1042, camille@example.com" },
  { type: "bot", text: "Found it. Here's where it is right now:" },
  { type: "card", delay: 500, head: "Order #1042 · Shipped", title: "UPS Ground · 1Z 999 AA1 01", note: "Left the regional hub this morning · est. delivery Thursday", progress: true },
  { type: "bot", text: "I'll keep an eye on it. Shall I message you if the estimate changes?", delay: 1200 },
  { type: "user", text: "Yes please!", delay: 1400 },
];

export default function AutomatedResponsesPage() {
  return (
    <FeatureSubpageLayout
      path="/products/automated-responses"
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Automated responses"
      headline={
        <>
          Shopper questions answered <span className="green-highlight">in seconds, at any hour</span>
        </>
      }
      subtitle="Shoppers ask questions at all hours. Aurevia answers from your catalogue, policies and brand voice, then points them back to what they came to buy."
      heroBullets={[
        "Answers 24/7 in your brand voice",
        "Works from your own store data",
        "Passes to your team with the full chat",
      ]}
      demo={<FeatureChatDemo agentName="Support Agent" script={demoScript} />}
      featureBlocks={[
        {
          visual: { kind: "knowledge" },
          title: "What it answers from day one",
          body: "Product fit, sizing, materials, shipping cut-offs and common policy questions, all based on what is actually in your store, so you can stand behind the answers.",
        },
        {
          visual: { kind: "upsell" },
          title: "Support that also sells",
          body: "In the same reply it can show a product card, suggest a bundle or point to checkout. Fewer tickets get raised because shoppers get their answer before they need to write in.",
        },
        {
          visual: { kind: "voice" },
          title: "Sounds like you, at any hour",
          body: "Set the tone, the words you use and plain-English selling rules, so the agent advises shoppers the way you would, whenever they shop.",
        },
        {
          visual: { kind: "handoff" },
          title: "Hands over when it should",
          body: "Harder cases go to your team with context: what the shopper viewed, what they added and what they were told. Your team doesn't start from scratch.",
        },
      ]}
      howItWorks={[
        {
          title: "Add your store's information",
          body: "Connect your catalogue, FAQs and policies. Aurevia works from what you already publish, not from random web pages.",
        },
        {
          title: "Shoppers ask in their own words",
          body: "Plain questions, quick replies and questions about several things at once all go into one chat that handles selling and support.",
        },
        {
          title: "You adjust, it gets better",
          body: "Change replies and rules from the dashboard. See what shoppers ask and what leads to orders, and make changes each week.",
        },
      ]}
      relatedLinks={[
        { href: "/products/shopify", label: "Shopify integration" },
        { href: "/products/ticket-management", label: "Handing over to your team" },
        { href: "/solutions/support", label: "Support automation" },
        { href: "/products/recommendations", label: "Product recommendations" },
      ]}
      faqs={[
        {
          q: "Is this just ChatGPT on my site?",
          a: "No. Replies are based on your store data and the rules you set, and the agent can take store actions like adding to cart and looking up orders. It isn't a general-purpose chatbot.",
        },
        {
          q: "How does this reduce support load?",
          a: "Most tickets start with a shopper who isn't sure about something. When they get a correct answer quickly and can buy without leaving the chat, many never write in.",
        },
        {
          q: "Can a person take over mid-chat?",
          a: "Yes. The agent hands over with the full conversation, so your team picks it up without asking the customer to repeat themselves.",
        },
      ]}
      secondDemo={{
        eyebrow: "Where is my order",
        title: "Order updates without a ticket",
        body: "Give the agent an order number and email and it looks the order up in Shopify, shows the status, carrier and tracking, and offers to keep an eye on it. The most common support question gets answered without reaching your inbox.",
        demo: <FeatureChatDemo agentName="Lucien" script={orderScript} loopPause={5000} />,
        points: ["Live Shopify order lookup", "Carrier and tracking link", "Nobody on your team needed"],
      }}
      screenshot={{
        scene: <KnowledgeScene />,
        title: "Everything it answers from, in one list",
        caption: "Links, files and text you add become the agent's sources. Each one shows its sync status, so you can see what it can and can't answer.",
      }}
      setup={{
        title: "How merchants set it up",
        steps: [
          { scene: <SourcesMini />, title: "Add your policies", body: "Paste a link, upload a PDF or type it in. Aurevia also suggests your Shopify policy pages so you can add them all in one click." },
          { scene: <RulesMini />, title: "Set Always and Never rules", body: "Fixed rules the agent follows in every reply, such as never promising a delivery date." },
          { scene: <CorrectionMini />, title: "Correct it once", body: "See an answer you'd phrase differently in Live Activity? Correct it there and the agent uses your version from then on." },
        ],
      }}
      review={getReview("purebronze")}
      alsoSee={[
        { href: "/products/ticket-management", title: "Live takeover & tickets", body: "When a shopper asks for a person, your team joins the same chat." },
        { href: "/products/recommendations", title: "Recommendations", body: "From a vague request to a short list, with reasons." },
        { href: "/help/train-the-ai-with-your-content", title: "Help: training the agent", body: "A step-by-step guide to sources and corrections." },
      ]}
    />
  );
}
