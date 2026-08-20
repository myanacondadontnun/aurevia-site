import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "In-Session Cart Recovery for Shopify | Aurevia";
const desc =
  "Nudge hesitant shoppers in real time: last-minute Q&A, free-shipping progress, and checkout links. Reduce abandonment before email even matters.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

const demoScript: ChatStep[] = [
  {
    type: "card",
    head: "Exit intent detected",
    title: "Cart: £58.00 · 1 item",
    note: "Shopper idle at checkout for 40s",
  },
  {
    type: "bot",
    text: "Before you go — anything holding you back? Shipping's free on this order, by the way 👀",
  },
  { type: "user", text: "Oh! I thought shipping was extra.\nCan it arrive by Friday though?" },
  {
    type: "bot",
    text: "Yes — order in the next 3 hours and it lands Thursday. Your cart's ready whenever you are:",
  },
  { type: "cartbar", summary: "1 item · £58.00 · Free shipping" },
  { type: "user", text: "Okay you got me. Checking out 🙌" },
];

export default function CartRecoveryPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Cart recovery"
      headline={
        <>
          Save the sale <span className="green-highlight">before the tab closes</span>
        </>
      }
      subtitle="Recovery emails arrive hours after the moment is gone. Aurevia catches the hesitation live — answers the last objection, shows the free-shipping math, and drops a one-tap path to pay while the shopper is still on your store."
      heroBullets={[
        "Real-time exit-intent rescue",
        "Cart-aware, objection-first replies",
        "One-tap checkout handoff",
      ]}
      demo={<FeatureChatDemo agentName="Sales Agent" script={demoScript} />}
      proofStrip={[
        { label: "The moment that matters", text: "70% of carts are abandoned — and the cheapest one to save is the one still on your site." },
        { label: "Context, not spam", text: "The AI already knows the cart, the line items, and what was discussed. No generic pop-up begging." },
        { label: "Doubt → paid, one thread", text: "From last objection to checkout link without ever leaving the conversation." },
      ]}
      featureBlocks={[
        {
          title: "Answer what stopped them",
          body: "Shipping, fit, return anxiety, and payment questions—solved in chat before they close the tab.",
        },
        {
          title: "Line-item and cart awareness",
          body: "Update quantities, swap variants, and keep the math transparent so the decision feels easy.",
        },
        {
          title: "Urgency without sleaze",
          body: "Use ethical nudges your brand can stand behind—merchants set how hard the pitch goes.",
        },
        {
          title: "Paired with re-engagement you already run",
          body: "Session rescue complements email and SMS, instead of being the only line of defense after they leave.",
        },
      ]}
      howItWorks={[
        { title: "Detect stall signals", body: "High-intent questions, time on page, and cart value inform what to say next." },
        { title: "Defuse the objection", body: "Short, factual answers and relevant picks bring confidence back in-line." },
        { title: "Hand off to checkout", body: "Drive to cart review or a checkout link with trust cues your store already provides." },
      ]}
      relatedLinks={[
        { href: "/products/recommendations", label: "Product recommendations" },
        { href: "/solutions/conversion", label: "Conversion solutions" },
        { href: "/products/roi-tracking", label: "ROI tracking" },
      ]}
      faqs={[
        {
          q: "Is this only email and SMS follow-up?",
          a: "No. The emphasis is live rescue while the session is still active, layered with the remarketing you already do.",
        },
        {
          q: "Can we set cart-value thresholds for nudges?",
          a: "Yes. Merchant rules and instructions help govern when upsells and urgency prompts should appear.",
        },
        {
          q: "Does it work with discount codes and Shopify checkout?",
          a: "Aurevia is built Shopify-native, so the journey stays in your store’s real cart and policies.",
        },
      ]}
      testimonial={{
        quote:
          "Every abandoned cart notification used to feel like a tiny loss we just accepted. Now the AI catches the hesitation in real time and hands them a checkout link before they've even closed the tab.",
        name: "Tomasz Wolski",
        role: "Growth Lead",
        company: "Basecamp Outfitters",
      }}
    />
  );
}
