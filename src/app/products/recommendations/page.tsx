import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "AI Product Recommendations for Shopify | Aurevia";
const desc =
  "Consultative discovery, curated picks, and add-to-cart in chat. Lift conversion and AOV with intent-based AI—built for ecommerce, not search dumps.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function RecommendationsPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          Ask first. <span className="green-highlight">Sell</span> next.
        </>
      }
      subtitle="Aurevia does not firehose twenty random SKUs. It clarifies intent, offers quick replies when that helps, then surfaces a small set of on-catalog recommendations—with clear reasons to buy, and add-to-cart in the same thread. That is the difference between a search box and a sales rep."
      lede="Brands that win on Shopify treat discovery as a conversation: budget, use case, constraints, and taste. The AI is trained to behave that way, so you capture revenue that keyword search never sees."
      proofStrip={[
        { label: "Intent, not keyword ping", text: "Clarify before recommending, so the first good option is a great option." },
        { label: "AOV, not one-off", text: "Bundles, add-ons, and “pairs with” nudges sit on the same rails as the first recommendation." },
        { label: "Catalog-grounded", text: "No fake products or off-menu SKUs—recommendations map to what you actually sell." },
      ]}
      featureBlocks={[
        {
          title: "Curated shortlists, not endless grids",
          body: "One to four strong picks, each justified for that shopper, reduce decision fatigue and get them to a decision faster.",
        },
        {
          title: "In-chat purchase actions",
          body: "Add to cart, line-item edits, and cart awareness keep momentum—no “open a new tab and figure it out” dead zone.",
        },
        {
          title: "Complements and bundles that feel helpful",
          body: "Upsell when the intent is there; hold back when it would read as spam, using rules you set.",
        },
        {
          title: "Works with your merchandising story",
          body: "Promote collections, new drops, and margin-friendly alternatives without losing the consultative feel.",
        },
      ]}
      howItWorks={[
        { title: "Shoppers state a goal", body: "Gifts, rooms, use cases, size constraints—captured in natural language." },
        { title: "The AI narrows the universe", body: "Quick replies and follow-ups build a spec you could not get from a single query string." },
        { title: "Recommend, justify, add to cart", body: "Show cards, handle objections, and keep them moving to checkout in one session." },
      ]}
      media={{
        ariaLabel: "Product recommendation demo video placeholder",
        caption: "Swap in: walkthrough from intent to handpicked gallery to “pairs perfectly”",
        suggestedAsset: "5-step flow: intent chips, curated gallery, add-ons, free-shipping nudge, checkout—your “AI Sales Agent” storyboard is perfect here.",
        kind: "video",
        aspect: "video",
      }}
      relatedLinks={[
        { href: "/products/cart-recovery", label: "Cart recovery" },
        { href: "/solutions/conversion", label: "Conversion solutions" },
        { href: "/products/shopify", label: "Shopify integration" },
        { href: "/products/roi-tracking", label: "ROI tracking" },
      ]}
      faqs={[
        {
          q: "How is this different from “similar products” carousels?",
          a: "Carousels are static; Aurevia responds to a live person with questions, objections, and context. The output is a managed shortlist, not a grid of maybes.",
        },
        {
          q: "Can we cap discounts or control upsell aggressiveness?",
          a: "Yes. Merchant rules and instructions shape how assertively the AI bundles and upsells so it matches your brand promise.",
        },
        {
          q: "What about niche catalogs?",
          a: "Long-tail SKUs and technical specs are exactly where Q&A and clarification outperform generic search—your catalog and KB ground the model.",
        },
      ]}
    />
  );
}
