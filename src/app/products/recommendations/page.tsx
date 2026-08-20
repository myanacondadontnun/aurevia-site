import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "AI Product Recommendations for Shopify | Aurevia";
const desc =
  "Consultative discovery, curated picks, and add-to-cart in chat. Lift conversion and AOV with intent-based AI—built for ecommerce, not search dumps.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

const demoScript: ChatStep[] = [
  { type: "bot", text: "Hey! Shopping for yourself or hunting for a gift today?" },
  {
    type: "user",
    text: "Me! My skin gets so dry in winter, but heavy SPF always breaks me out 😩",
  },
  {
    type: "bot",
    text: "Got it — dry skin, sensitive to rich SPF. These three layer together without clogging:",
  },
  {
    type: "products",
    items: [
      { name: "Hydra Barrier Serum", price: "£32.00", img: "serum" },
      { name: "Cloud Cream", price: "£28.00", img: "cream" },
      { name: "Featherlight SPF 50", price: "£24.00", img: "spf" },
    ],
  },
  { type: "user", text: "Adding the serum and the SPF 😍" },
  { type: "cartbar", summary: "2 items · £56.00" },
];

export default function RecommendationsPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Product recommendations"
      headline={
        <>
          Your best sales rep, <span className="green-highlight">cloned for every visitor</span>
        </>
      }
      subtitle="Aurevia doesn't firehose twenty random SKUs. It asks the two questions a great associate would ask, then serves a short, justified shortlist — with add-to-cart right in the thread."
      heroBullets={[
        "Consultative discovery, not keyword search",
        "Curated shortlists with reasons to buy",
        "Add to cart without leaving the chat",
      ]}
      demo={<FeatureChatDemo agentName="Sales Agent" script={demoScript} />}
      proofStrip={[
        { label: "Ask first, sell next", text: "Intent is clarified before anything is pitched, so the first pick is a great pick." },
        { label: "Built to lift AOV", text: "Bundles, add-ons, and “pairs with” nudges ride the same rails as the first recommendation." },
        { label: "Only real products", text: "Every card maps to your live catalog — no invented SKUs, no out-of-stock embarrassments." },
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
      testimonial={{
        quote:
          "Our catalog is huge and honestly a little overwhelming. The AI asks two or three questions and gets people to the right product faster than our old filters ever did — and they're buying more per order because of it.",
        name: "Marcus Webb",
        role: "Founder",
        company: "Ridgeline Gear",
      }}
    />
  );
}
