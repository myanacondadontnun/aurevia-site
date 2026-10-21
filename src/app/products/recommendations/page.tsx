import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { CatalogueSwitchMini, DashboardScene, SellStrengthMini, SizeGuideMini } from "@/components/products/ProductScenes";
import { getReview } from "@/lib/reviews";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "AI Product Recommendations for Shopify | Aurevia";
const desc =
  "The agent asks shoppers what they need, suggests a few products that fit, and lets them add to cart in the chat. Built to lift conversion and order value for Shopify stores.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/recommendations" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/recommendations/" },
};

const demoScript: ChatStep[] = [
  { type: "bot", text: "Hi! Are you shopping for yourself or buying a gift?", cue: { icon: "chat", eyebrow: "Discovery", title: "Asks what it's for" } },
  { type: "user", text: "For me. Gallery opening on Friday, so sharp but not stiff." },
  { type: "bot", text: "Here are three pieces that do that, and they layer well:" },
  {
    type: "products",
    cue: { icon: "search", eyebrow: "Catalogue match", title: "3 pieces for Friday" },
    items: [
      { name: "Tailored Cashmere Blazer", price: "$1,590.00", img: "/images/demo/lv/cashmere-blazer.webp" },
      { name: "Silk Draped Blouse", price: "$520.00", img: "/images/demo/lv/silk-blouse.webp" },
      { name: "Patent Ankle Boots", price: "$970.00", img: "/images/demo/lv/patent-boots.webp" },
    ],
  },
  { type: "user", text: "Adding the blouse and the boots." },
  { type: "addcart", name: "Silk Draped Blouse" },
  { type: "addcart", name: "Patent Ankle Boots", delay: 400 },
  { type: "cartbar", summary: "2 items · $1,490.00", cue: { icon: "cart", eyebrow: "Added in the chat", title: "2 items · $1,490" } },
];

const compareScript: ChatStep[] = [
  { type: "user", text: "Metro hoodie or the Pop Pink jacket for cold morning runs?" },
  { type: "bot", text: "It depends on the weather you run in:" },
  {
    type: "compare",
    delay: 500,
    a: { name: "Metro Yellow hoodie", price: "$129.00", img: "/images/demo/lv/metro-hoodie.webp" },
    b: { name: "Pop Pink zip-up", price: "$148.00", img: "/images/demo/lv/pop-pink-jacket.webp" },
    rows: [
      { label: "Weather", a: "Dry cold", b: "Wind and rain", winner: "b" },
      { label: "Warmth", a: "Heavy fleece", b: "Light shell", winner: "a" },
      { label: "Fit", a: "Oversized", b: "Fitted" },
      { label: "Rating", a: "5.0 (2)", b: "4.5 (2)", winner: "a" },
    ],
    verdict: "On wet mornings, take the jacket. If it's dry and cold, go for the hoodie.",
  },
  { type: "bot", text: "Want both? I can bundle them for you.", delay: 2400 },
];

export default function RecommendationsPage() {
  return (
    <FeatureSubpageLayout
      path="/products/recommendations"
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Product recommendations"
      headline={
        <>
          Advice like your best sales assistant, <span className="green-highlight">for every visitor</span>
        </>
      }
      subtitle="Aurevia asks two good questions, then suggests a short list with a reason for each pick. Shoppers add to cart right in the chat."
      heroBullets={[
        "Asks what they need before suggesting anything",
        "Short lists with a reason for each pick",
        "Add to cart without leaving the chat",
      ]}
      demo={<FeatureChatDemo agentName="Sales Agent" script={demoScript} />}
      featureBlocks={[
        {
          visual: { kind: "products" },
          title: "Short lists, not endless grids",
          body: "One to four good picks, each explained for that shopper, so they spend less time deciding.",
        },
        {
          visual: { kind: "cart" },
          title: "Buy from the chat",
          body: "Shoppers can add to cart, change items and see their cart in the chat, so nobody has to open a new tab and work it out.",
        },
        {
          visual: { kind: "upsell" },
          title: "Add-ons that help",
          body: "The agent suggests extras when the shopper is open to them and holds back when it would feel pushy, using rules you set.",
        },
        {
          visual: { kind: "install" },
          title: "Fits how you merchandise",
          body: "Promote collections, new drops and higher-margin alternatives while the advice stays helpful.",
        },
      ]}
      howItWorks={[
        { title: "Shoppers say what they want", body: "Gifts, rooms, uses and size limits, all in their own words." },
        { title: "The agent narrows it down", body: "Quick replies and follow-up questions build a clearer brief than a single search ever could." },
        { title: "Suggest, explain, add to cart", body: "Show product cards, answer doubts and get them to checkout in the same visit." },
      ]}
      relatedLinks={[
        { href: "/products/cart-recovery", label: "Cart recovery" },
        { href: "/solutions/conversion", label: "Conversion solutions" },
        { href: "/products/shopify", label: "Shopify integration" },
        { href: "/products/roi-tracking", label: "ROI tracking" },
      ]}
      faqs={[
        {
          q: "How is this different from a “similar products” carousel?",
          a: "A carousel shows the same thing to everyone. Aurevia responds to the person in front of it, with their questions, doubts and context, and ends with a short list chosen for them.",
        },
        {
          q: "Can we limit discounts or how hard it upsells?",
          a: "Yes. Your rules and instructions set how much the agent bundles and upsells, so it fits the way your brand sells.",
        },
        {
          q: "What about niche catalogues?",
          a: "Long-tail products and technical specs are where asking questions works better than generic search. The agent works from your catalogue and knowledge base.",
        },
      ]}
      secondDemo={{
        eyebrow: "When they can't decide",
        title: "Two options, one honest verdict",
        body: "Shoppers often get stuck between two products. The agent puts them side by side, marks the better option on each row, and says which one suits the shopper's situation.",
        demo: <FeatureChatDemo agentName="Lucien" script={compareScript} loopPause={5000} />,
        points: ["Better option marked on each row", "A plain-English verdict", "Add either from the card"],
      }}
      screenshot={{
        scene: <DashboardScene focus="recommendations" />,
        title: "Which recommendations turned into orders",
        caption: "Top Recommended Products lists every product the agent suggested, with how often it was shown, added to cart and bought, and the revenue it brought in.",
      }}
      setup={{
        title: "Three settings to get it selling your way",
        steps: [
          { scene: <CatalogueSwitchMini />, title: "Sync the catalogue", body: "One click pulls in products, collections and discounts from Shopify. Use the Assistant switch to hide anything the agent shouldn't suggest." },
          { scene: <SellStrengthMini />, title: "Set how hard it sells", body: "Upsell strength, what recommendations are based on, cross-sell prompts and urgency triggers, all in AI Behaviour." },
          { scene: <SizeGuideMini />, title: "Add what the catalogue can't say", body: "Size guides, fabric notes and brand rules go in the Knowledge Base, so the agent can explain its picks." },
        ],
      }}
      review={getReview("masks-capes")}
      alsoSee={[
        { href: "/products/cart-recovery", title: "Cart recovery", body: "Nudges while they're still on the store, emails after they leave." },
        { href: "/products/automated-responses", title: "Product questions", body: "Fit, fabric, shipping and returns answered from your own data." },
        { href: "/products/roi-tracking", title: "Insights & ROI", body: "Revenue the agent influenced, tied to real Shopify orders." },
      ]}
    />
  );
}
