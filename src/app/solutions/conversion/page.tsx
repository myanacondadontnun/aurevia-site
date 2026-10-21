import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Increase Ecommerce Conversion Rate with AI | Aurevia";
const desc =
  "Move stalled traffic to purchase: guided product discovery, cart nudges, and checkout in chat. Shopify AI built for CVR and AOV, not deflection only.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/solutions/conversion" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/solutions/conversion/" },
};

const demoScript: ChatStep[] = [
  { type: "user", text: "I like both jackets but can't decide." },
  { type: "bot", text: "Happy to help. Where will you wear it most?" },
  { type: "user", text: "City evenings, and it rains a lot here." },
  {
    type: "compare",
    a: { name: "Classic Leather Jacket", price: "$340.00", img: "/images/demo/lv/classic-leather-jacket.webp" },
    b: { name: "Pop Pink Zip-Up", price: "$148.00", img: "/images/demo/lv/pop-pink-jacket.webp" },
    rows: [
      { label: "Rain", a: "Water-resistant", b: "Light shell", winner: "a" },
      { label: "Evenings", a: "Dresses up", b: "Casual" , winner: "a" },
    ],
    verdict: "For rainy city evenings, the leather jacket.",
    cue: { icon: "search", eyebrow: "Compares for them", title: "Two jackets, one pick" },
  },
  { type: "user", text: "Leather it is." },
  { type: "cartbar", summary: "1 item · $340.00", cue: { icon: "cart", eyebrow: "Shopify cart", title: "Sale closed in the chat" } },
];

export default function ConversionPage() {
  return (
    <FeatureSubpageLayout
      path="/solutions/conversion"
      breadcrumbLabel="Increase sales"
      backHref="/solutions"
      backLabel="← Back to Solutions"
      headline={
        <>
          Turn traffic into <span className="green-highlight">revenue you can name</span>
        </>
      }
      demo={<FeatureChatDemo agentName="Sales Agent" script={demoScript} />}
      subtitle="Traffic looks healthy but sales are flat? The gap is usually confidence. Aurevia asks what shoppers need, shows a short list and closes the sale in the chat."
      featureBlocks={[
        { visual: { kind: "ask" }, title: "Pre-sales that asks before it pitches", body: "Quick replies and follow-ups that mirror how your best in-store rep would narrow options." },
        { visual: { kind: "cart" }, title: "In-chat cart and checkout nudges", body: "Keep momentum: cart edits, free-shipping progress, and a one-tap checkout link in the thread." },
        { visual: { kind: "upsell" }, title: "Bundle and upsell with guardrails", body: "Revenue rules you set, so cross-sell reads as helpful, not desperate." },
        { visual: { kind: "attribution" }, title: "Attribution you can show internally", body: "Pair with ROI and analytics so the channel mix and site roadmap win together." },
      ]}
      howItWorks={[
        { title: "Clarify intent", body: "The AI captures goals, constraints, and doubt in a few turns." },
        { title: "Recommend with reasons", body: "Short, justified picks from your real catalogue, not a random grid." },
        { title: "Close in-session", body: "Add to cart, resolve last objections, and hand off to checkout with trust cues." },
      ]}
      relatedLinks={[
        { href: "/products/recommendations", label: "Product recommendations" },
        { href: "/products/cart-recovery", label: "Cart recovery" },
        { href: "/products/roi-tracking", label: "ROI tracking" },
      ]}
      faqs={[
        { q: "We already run CRO on the site. Why chat?", a: "Because many questions never make it to a form. They die in hesitation. A consultative thread captures that intent the moment it appears." },
        { q: "How fast can we test impact?", a: "Install, let it run for a week, then read Revenue Influenced and Orders Influenced on the dashboard. Every number ties to a real Shopify order." },
        { q: "Is this one-size upsell spam?", a: "No. Merchants set tone and rules; the best programs sound like help, not pressure." },
      ]}
    />
  );
}
