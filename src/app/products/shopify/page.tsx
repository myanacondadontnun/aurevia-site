import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Aurevia Shopify App — AI Sales Co-Pilot | Install";
const desc =
  "5-minute install from the Shopify App Store. Product sync, cart-aware chat, and checkout paths that respect your store. Conversational AI built native for Shopify.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function ShopifyPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          Native to Shopify, <span className="green-highlight">not bolted on</span>
        </>
      }
      subtitle="Aurevia lives where your product data, cart, and checkout already do. You install from the App Store, sync what you sell, and turn on a consultative AI that can recommend, nudge, and answer—without theme surgery or a six-week project. The platform bet is simple: the store stays the system of record; the AI executes on top."
      lede="If you are a Shopify brand, this is the shortest path to conversational commerce that actually does commerce: add to cart, cart edits, and hands-off to checkout the way your customers expect, with governance you can trust."
      proofStrip={[
        { label: "Fast setup", text: "Go from install to a live, brand-styled conversation in a single work session when you are ready." },
        { label: "Stays in sync", text: "Product and policy changes flow through to what the AI can say and sell." },
        { label: "Merchant in control", text: "Rules, voice, and escalation reflect how you want to run the brand." },
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
      media={{
        ariaLabel: "Shopify install and first message demo placeholder",
        caption: "Swap in: screencast from App Store click to first live product chat",
        suggestedAsset: "Record install → first conversation showing a product card and add to cart, or a split-screen: PDP + chat overlay.",
        kind: "video",
        aspect: "video",
      }}
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
    />
  );
}
