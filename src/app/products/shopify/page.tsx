import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Aurevia Shopify App — AI Sales Co-Pilot | Install";
const desc =
  "5-minute install from the Shopify App Store. Product sync, cart-aware chat, and checkout paths that respect your store. Conversational AI built native for Shopify.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

const demoScript: ChatStep[] = [
  {
    type: "card",
    head: "Store connected",
    title: "128 products synced",
    note: "Collections, discounts & policies imported",
    progress: true,
  },
  {
    type: "bot",
    text: "I've read your catalog and brand voice. Try me — ask anything a customer would.",
  },
  { type: "user", text: "Does the Terra planter fit a 30cm pot?" },
  {
    type: "bot",
    text: "It does — inner diameter is 32cm with a drainage tray included, and it's frost-proof for outdoors. Want one in your cart?",
  },
  { type: "user", text: "Okay, that's impressive 😄" },
  { type: "cartbar", summary: "1 item · £44.00" },
];

export default function ShopifyPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Shopify integration"
      headline={
        <>
          Native to Shopify, <span className="green-highlight">not bolted on</span>
        </>
      }
      subtitle="One click from the App Store and Aurevia syncs your catalog, discounts, and policies — then starts selling with your store as the system of record. No theme surgery, no six-week project."
      heroBullets={[
        "One-click App Store install",
        "Catalog & policy sync, automatic",
        "Real cart and checkout actions",
      ]}
      demo={<FeatureChatDemo agentName="Sales Agent" script={demoScript} />}
      proofStrip={[
        { label: "Live in one sitting", text: "From install to a brand-styled conversation on your storefront in a single work session." },
        { label: "Always in sync", text: "Product and policy changes flow straight through to what the AI can say and sell." },
        { label: "You hold the keys", text: "Rules, voice, and escalation reflect how you run the brand — not how a bot vendor does." },
      ]}
      featureBlocks={[
        {
          title: "App Store install",
          body: "The same trust path you already use for the rest of your stack; no custom hosting required to start.",
        },
        {
          title: "Cart- and order-aware by design",
          body: "The AI is not blind to what is in the bag or which order is at stake—a requirement for real selling and support together.",
        },
        {
          title: "No-code, brand-styled",
          body: "Colors, tone, and prompts live in a merchant-friendly surface so changes do not need a dev ticket every time.",
        },
        {
          title: "Room to grow with your business",
          body: "Start lean; add languages, stricter rules, and analytics depth as you scale.",
        },
      ]}
      howItWorks={[
        { title: "Install the app", body: "Connect your store; confirm catalog and brand basics." },
        { title: "Turn on the widget", body: "Drop in where shoppers need help: PDP, collection, and cart are common starting points." },
        { title: "Tune and measure", body: "Adjust selling rules, watch conversations, and connect ROI so you can scale spend with confidence." },
      ]}
      relatedLinks={[
        { href: "/products/api", label: "Custom API" },
        { href: "/pricing", label: "Pricing" },
        { href: "/solutions/small-business", label: "Small business" },
      ]}
      faqs={[
        {
          q: "Will this slow my storefront?",
          a: "The widget is built for real storefronts: load the chat experience the way a modern app should, without blocking the rest of your page.",
        },
        {
          q: "Do you support headless or custom themes?",
          a: "Shopify is the source of truth; we will align to how your theme or headless front presents products so recommendations stay accurate. Confirm edge cases with our team for complex stacks.",
        },
        {
          q: "Is there a free plan?",
          a: "See current plans on the pricing page; trials are structured so you can test full workflows before you commit.",
        },
      ]}
      testimonial={{
        quote:
          "Installing Aurevia felt like the opposite of every other app we've added — it just synced with our catalog and matched our brand voice out of the box. We were live the same afternoon.",
        name: "Ollie Bennett",
        role: "Store Owner",
        company: "Cricket & Pine",
      }}
    />
  );
}
