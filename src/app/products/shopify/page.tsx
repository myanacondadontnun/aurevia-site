import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Aurevia for Shopify — Native AI Sales Agent";
const desc =
  "5-minute install from the Shopify App Store. Product sync, cart-aware chat, and checkout paths that respect your store. Conversational AI built native for Shopify.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/shopify" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/shopify/" },
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
          body: "Start lean; add knowledge sources, stricter rules, team seats and channels as you scale.",
        },
      ]}
      howItWorks={[
        { title: "Install the app", body: "Connect your store; confirm catalog and brand basics." },
        { title: "Turn on the widget", body: "Drop in where shoppers need help: PDP, collection, and cart are common starting points." },
        { title: "Tune and measure", body: "Adjust selling rules, watch conversations, and connect ROI so you can scale spend with confidence." },
      ]}
      relatedLinks={[
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
          a: "No free plan, but every store gets a 14-day trial with 500 shopper messages and no card. Paid plans start at $19 a month and are billed through Shopify.",
        },
      ]}
      screenshot={{
        src: "/images/app/products-desktop.webp",
        url: "app.aurevia.io/product-management",
        title: "Your catalog, scored and in sync",
        caption: "Products, collections and discounts pull from Shopify and stay current through webhooks. Each product gets a score for SEO, images, completeness and AI readiness, with an Ask Aurevia to fix button.",
      }}
      setup={{
        title: "Install to first chat in about ten minutes",
        steps: [
          { src: "/images/app/products-desktop.webp", title: "Install and sync", body: "Approve the Shopify permissions, and the catalog syncs itself during onboarding." },
          { src: "/images/app/knowledge-desktop.webp", title: "Add your policies", body: "Shipping, returns and sizing from your Shopify policy pages, one click." },
          { src: "/images/app/dashboard-desktop.webp", title: "Enable the embed", body: "One toggle in the theme editor. Aurevia checks your theme and confirms the widget is live." },
        ],
      }}
      review={getReview("fresh-famous")}
      alsoSee={[
        { href: "/help/install-and-enable-the-widget", title: "Help: install guide", body: "Every step, with what to expect." },
        { href: "/products/dashboard", title: "Dashboard & Ask Aurevia", body: "What you see once it's running." },
        { href: "/pricing", title: "Pricing", body: "Billed through Shopify, 14-day trial, no card." },
      ]}
    />
  );
}
