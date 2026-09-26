import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "AI Product Recommendations for Shopify | Aurevia";
const desc =
  "Consultative discovery, curated picks, and add-to-cart in chat. Lift conversion and AOV with intent-based AI—built for ecommerce, not search dumps.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/recommendations" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/recommendations/" },
};

const demoScript: ChatStep[] = [
  { type: "bot", text: "Hey! Shopping for yourself or hunting for a gift today?" },
  { type: "user", text: "Me. Gallery opening on Friday — sharp, but not stiff." },
  { type: "bot", text: "Say less. Three pieces that do exactly that, and they layer:" },
  {
    type: "products",
    items: [
      { name: "Tailored Cashmere Blazer", price: "$1,590.00", img: "/images/demo/lv/cashmere-blazer.webp" },
      { name: "Silk Draped Blouse", price: "$520.00", img: "/images/demo/lv/silk-blouse.webp" },
      { name: "Patent Ankle Boots", price: "$970.00", img: "/images/demo/lv/patent-boots.webp" },
    ],
  },
  { type: "user", text: "Adding the blouse and the boots." },
  { type: "addcart", name: "Silk Draped Blouse" },
  { type: "addcart", name: "Patent Ankle Boots", delay: 400 },
  { type: "cartbar", summary: "2 items · $1,490.00" },
];

const compareScript: ChatStep[] = [
  { type: "user", text: "Metro hoodie or the Pop Pink jacket for cold morning runs?" },
  { type: "bot", text: "Depends what you're running through:" },
  {
    type: "compare",
    delay: 500,
    a: { name: "Metro Yellow hoodie", price: "$129.00", img: "/images/demo/lv/metro-hoodie.webp" },
    b: { name: "Pop Pink zip-up", price: "$148.00", img: "/images/demo/lv/pop-pink-jacket.webp" },
    rows: [
      { label: "Weather", a: "Dry cold", b: "Wind + rain", winner: "b" },
      { label: "Warmth", a: "Heavy fleece", b: "Light shell", winner: "a" },
      { label: "Fit", a: "Oversized", b: "Fitted" },
      { label: "Rating", a: "5.0 (2)", b: "4.5 (2)", winner: "a" },
    ],
    verdict: "Wet mornings, take the jacket. Dry and cold, the hoodie wins.",
  },
  { type: "bot", text: "Want both? I can bundle them for you.", delay: 2400 },
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
      secondDemo={{
        eyebrow: "When they can't decide",
        title: "Two options, one honest verdict",
        body: "Stuck between two products is where most carts die. The agent lays them out side by side, highlights the winner per row, and says which one fits the shopper's actual situation.",
        demo: <FeatureChatDemo agentName="Lucien" script={compareScript} loopPause={5000} />,
        points: ["Winner highlighted per row", "Plain-English verdict", "Add either from the card"],
      }}
      screenshot={{
        src: "/images/app/dashboard-mode-desktop.webp",
        url: "app.aurevia.io/dashboard",
        title: "Which recommendations turned into orders",
        caption: "Top Recommended Products shows every product the agent suggested: how often it was shown, added to cart and bought, and the revenue it produced.",
      }}
      setup={{
        title: "Three settings, then it sells your way",
        steps: [
          { src: "/images/app/products-desktop.webp", title: "Sync the catalog", body: "One click pulls products, collections and discounts from Shopify. Hide anything the agent shouldn't suggest with the Assistant switch." },
          { src: "/images/app/persona-desktop.webp", title: "Set how hard it sells", body: "Upsell strength, what recommendations are based on, cross-sell prompts and urgency triggers, all in AI Behaviour." },
          { src: "/images/app/knowledge-desktop.webp", title: "Add what the catalog can't say", body: "Size guides, fabric notes and brand rules go into the Knowledge Base so recommendations come with reasons." },
        ],
      }}
      review={getReview("masks-capes")}
      alsoSee={[
        { href: "/products/cart-recovery", title: "Cart recovery", body: "Nudges while they're still on the store, emails after they leave." },
        { href: "/products/automated-responses", title: "Product questions", body: "Fit, fabric, shipping and returns answered from your own data." },
        { href: "/products/roi-tracking", title: "Insights & ROI", body: "Revenue influenced, tied to real Shopify orders." },
      ]}
    />
  );
}
