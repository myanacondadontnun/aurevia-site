import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { EmbedMini, ProductsScene, SourcesMini, SyncMini } from "@/components/products/ProductScenes";
import { getReview } from "@/lib/reviews";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Aurevia for Shopify | AI Sales Agent Made for Shopify";
const desc =
  "A 5-minute install from the Shopify App Store. Product sync, a chat that knows the cart, and checkout actions that work with your store as it is. An AI sales agent made for Shopify.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/shopify" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/shopify/" },
};

const demoScript: ChatStep[] = [
  {
    type: "card",
    cue: { icon: "sync", eyebrow: "Shopify sync", title: "Catalogue imported" },
    head: "Store connected",
    title: "128 products synced",
    note: "Collections, discounts and policies imported",
    progress: true,
  },
  {
    type: "bot",
    text: "I've read your catalogue and brand voice. Try me: ask anything a customer would.",
  },
  { type: "user", text: "Does the Terra planter fit a 30cm pot?" },
  {
    type: "bot",
    cue: { icon: "search", eyebrow: "Product data", title: "Terra planter specs" },
    text: "Yes. The inner diameter is 32cm, a drainage tray is included, and it's frost-proof for outdoor use. Shall I add one to your cart?",
  },
  { type: "user", text: "Okay, that's impressive 😄" },
  { type: "cartbar", summary: "1 item · £44.00", cue: { icon: "cart", eyebrow: "Shopify cart", title: "Added in the chat" } },
];

export default function ShopifyPage() {
  return (
    <FeatureSubpageLayout
      path="/products/shopify"
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Shopify integration"
      headline={
        <>
          Made for Shopify <span className="green-highlight">from the start</span>
        </>
      }
      subtitle="Install from the App Store and Aurevia syncs your catalogue, discounts and policies, then starts selling with Shopify as the source of truth. You don't need to edit your theme or run a long setup project."
      heroBullets={[
        "One-click App Store install",
        "Catalogue and policies sync automatically",
        "Real cart and checkout actions",
      ]}
      demo={<FeatureChatDemo agentName="Sales Agent" script={demoScript} />}
      featureBlocks={[
        {
          visual: { kind: "install" },
          title: "App Store install",
          body: "It installs the same way as the rest of your apps. You don't need your own hosting to get started.",
        },
        {
          visual: { kind: "order" },
          title: "Knows the cart and the order",
          body: "The agent can see what's in the basket and which order a shopper is asking about. It needs both to sell and support properly.",
        },
        {
          visual: { kind: "brand" },
          title: "No code, styled to your brand",
          body: "Colours, tone and prompts are set in a simple editor, so changes don't need a developer each time.",
        },
        {
          visual: { kind: "allowance" },
          title: "Grows with your store",
          body: "Start small, then add knowledge sources, stricter rules, team seats and channels as you grow.",
        },
      ]}
      howItWorks={[
        { title: "Install the app", body: "Connect your store, then check your catalogue and brand basics." },
        { title: "Turn on the widget", body: "Show it where shoppers need help. Product pages, collections and the cart are common places to start." },
        { title: "Adjust and measure", body: "Tune selling rules, read conversations and track ROI, so you know when it's worth spending more on traffic." },
      ]}
      relatedLinks={[
        { href: "/pricing", label: "Pricing" },
        { href: "/solutions/small-business", label: "Small business" },
      ]}
      faqs={[
        {
          q: "Will this slow my storefront down?",
          a: "The widget is built for real storefronts. It loads the chat without holding up the rest of your page.",
        },
        {
          q: "Do you support headless or custom themes?",
          a: "Shopify is the source of truth, and we work with however your theme or headless front end shows products, so recommendations stay accurate. For complex setups, check edge cases with our team.",
        },
        {
          q: "Is there a free plan?",
          a: "There's no free plan, but every store gets a 14-day trial with 500 shopper messages and no card needed. Paid plans start at $19 a month and are billed through Shopify.",
        },
      ]}
      screenshot={{
        scene: <ProductsScene />,
        title: "Your catalogue, scored and in sync",
        caption: "Products, collections and discounts come from Shopify and stay up to date through webhooks. Each product gets a score for SEO, images, completeness and AI readiness, with an Ask Aurevia to fix button.",
      }}
      setup={{
        title: "Install to first chat in about ten minutes",
        steps: [
          { scene: <SyncMini />, title: "Install and sync", body: "Approve the Shopify permissions and the catalogue syncs itself during onboarding." },
          { scene: <SourcesMini />, title: "Add your policies", body: "Add shipping, returns and sizing from your Shopify policy pages in one click." },
          { scene: <EmbedMini />, title: "Enable the embed", body: "Flip one toggle in the theme editor. Aurevia checks your theme and confirms when the widget is live." },
        ],
      }}
      review={getReview("fresh-famous")}
      alsoSee={[
        { href: "/help/install-and-enable-the-widget", title: "Help: install guide", body: "Every step, and what to expect." },
        { href: "/products/dashboard", title: "Dashboard & Ask Aurevia", body: "What you see once it's running." },
        { href: "/pricing", title: "Pricing", body: "Billed through Shopify, with a 14-day trial and no card needed." },
      ]}
    />
  );
}
