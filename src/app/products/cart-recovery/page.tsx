import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "In-Session Cart Recovery for Shopify | Aurevia";
const desc =
  "Nudge hesitant shoppers in real time: last-minute Q&A, free-shipping progress, and checkout links. Reduce abandonment before email even matters.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function CartRecoveryPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          Catch hesitation <span className="green-highlight">in the session</span>
        </>
      }
      subtitle="Abandonment is not a single moment—it is a series of small doubts. Aurevia steps in while the buyer is still on your store: answer the sizing question, remove the policy doubt, and drop a one-click path to pay. Email sequences still matter; this is about revenue you can save today."
      lede="If you are already paying for ads, the highest ROI moment is the one before they leave. In-session cart recovery is built around cart-aware dialog, nudges, and checkout handoff—aligned with the north-star playbook for reactive selling."
      proofStrip={[
        { label: "In-context", text: "The AI already knows the cart, line items, and what was discussed—no backtracking." },
        { label: "Nudges that feel fair", text: "Free-shipping or bundle prompts only when the intent is warm, not when it is spam." },
        { label: "Checkout, not detours", text: "One coherent thread from doubt to pay—fewer “let me get back to you” stalls." },
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
      media={{
        ariaLabel: "Before and after cart recovery demo placeholder",
        caption: "Swap in: two-panel or short clip of abandon vs. nudge + complete checkout",
        suggestedAsset: "Record or mock a stuck cart: AI resolves the last objection, shows progress to free ship, and lands on a View cart / Pay button.",
        kind: "video",
        aspect: "wide",
      }}
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
    />
  );
}
