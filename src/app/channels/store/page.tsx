import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";
import { getReview } from "@/lib/reviews";

const title = "Store Chat for Shopify: An AI Sales Agent on Every Page | Aurevia";
const desc =
  "The Aurevia chat on your Shopify store recommends products, answers sizing, stock and delivery questions, compares options, adds to the real cart and hands off to your team.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/channels/store" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/channels/store/" },
};

const IMG = {
  blazer: "/images/demo/lv/cashmere-blazer.webp",
  blouse: "/images/demo/lv/silk-blouse.webp",
  boots: "/images/demo/lv/patent-boots.webp",
};

const demoScript: ChatStep[] = [
  { type: "user", text: "Something for a gallery opening. Sharp, but not stiff." },
  { type: "bot", text: "Three pieces that do exactly that:", cue: { icon: "search", eyebrow: "Product discovery", title: "For the occasion" } },
  {
    type: "products",
    delay: 500,
    items: [
      { name: "Tailored Cashmere Blazer", price: "$1,590.00", img: IMG.blazer },
      { name: "Silk Draped Blouse", price: "$520.00", img: IMG.blouse },
      { name: "Patent Ankle Boots", price: "$970.00", img: IMG.boots },
    ],
  },
  { type: "user", text: "Adding the blouse." },
  { type: "addcart", name: "Silk Draped Blouse" },
  { type: "cartbar", summary: "1 item · $520.00", cue: { icon: "cart", eyebrow: "Shopify cart", title: "Added in the chat" } },
];

const supportScript: ChatStep[] = [
  { type: "user", text: "Where's my order #1042?" },
  { type: "card", head: "Order #1042", title: "Shipped · due Thursday", note: "UPS Ground · tracking sent by email", progress: true },
  { type: "user", text: "Can I change the delivery address?" },
  { type: "bot", text: "I've asked the team to change it. Someone will join this chat in a moment." },
  { type: "agent", name: "Grace", role: "Live agent · Lucien Vallière", delay: 1800 },
  { type: "bot", text: "Hi, Grace here. Done, it now goes to your office. Anything else?", delay: 900 },
];

export default function StoreChannelPage() {
  return (
    <FeatureSubpageLayout
      path="/channels/store"
      backHref="/channels"
      backLabel="← Back to Channels"
      eyebrow="Store chat"
      headline={
        <>
          A sales assistant <span className="green-highlight">on every page</span>
        </>
      }
      subtitle="The Aurevia chat sits on your Shopify store and helps shoppers while they browse. It recommends and compares products, answers sizing, stock and delivery questions from your own catalogue and help content, and adds to the real Shopify cart."
      demo={<FeatureChatDemo agentName="Sales Agent" script={demoScript} />}
      featureBlocks={[
        { visual: { kind: "products" }, title: "Recommends products", body: "Asks what the shopper needs, then suggests two or three products with a reason for each." },
        { visual: { kind: "answer" }, title: "Answers questions", body: "Sizing, materials, stock, delivery and returns, from your synced catalogue and knowledge base." },
        { visual: { kind: "cart" }, title: "Adds to the cart and opens checkout", body: "Shoppers add to the real Shopify cart inside the chat, and checkout is one tap away." },
        { visual: { kind: "compare" }, title: "Compares products", body: "Two products side by side with a clear recommendation when a shopper can't decide." },
        { visual: { kind: "order" }, title: "Tracks orders", body: "Order status and delivery dates without a support ticket." },
        { visual: { kind: "handoff" }, title: "Hands off to your team", body: "When a shopper needs a person, your team joins the same chat with the cart and history on screen." },
      ]}
      howItWorks={[
        { title: "Install from the App Store", body: "Approve the Shopify permissions and your catalogue syncs itself." },
        { title: "Turn on the app embed", body: "One toggle in the theme editor puts the chat on every page." },
        { title: "Shoppers start asking", body: "The agent answers in your voice, and every conversation shows up in your dashboard." },
      ]}
      secondDemo={{
        eyebrow: "Support",
        title: "Order questions and handoffs, in the same chat",
        body: "Shoppers can check an order without leaving the page. When something needs a person, a ticket opens, your team is pinged, and they take over the same conversation.",
        demo: <FeatureChatDemo agentName="Lucien" script={supportScript} loopPause={5000} />,
        points: ["Order tracking", "Live takeover", "Tickets with the cart attached"],
      }}
      relatedLinks={[]}
      faqs={[
        { q: "Does it slow my store down?", a: "The chat loads after your page, so it doesn't hold up your theme." },
        { q: "Can I change how it looks?", a: "Yes. Colours, position, greeting and tone are set in your dashboard." },
      ]}
      review={getReview("masks-capes")}
      alsoSee={[
        { href: "/channels/email", title: "Email", body: "Cart recovery, answers and checkout links in the thread." },
        { href: "/channels/whatsapp", title: "WhatsApp", body: "Support, products, checkout links and cart reminders." },
        { href: "/channels/instagram", title: "Instagram", body: "DMs, story replies and comments, handled for you." }
      ]}
    />
  );
}
