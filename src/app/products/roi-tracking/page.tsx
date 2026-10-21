import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { AppHeroDemo, LiveActivityMini, NotTrackedMini, OrderMatchMini, ProductAttributionScene } from "@/components/products/ProductScenes";
import { getReview } from "@/lib/reviews";

const title = "Ecommerce AI Revenue & ROI Tracking | Aurevia";
const desc =
  "See which sales came from the agent: assisted purchases, recommendations, upsells and recovered carts. Report on your Shopify store's chat in revenue, as well as message counts.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/roi-tracking" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/roi-tracking/" },
};

export default function RoiTrackingPage() {
  return (
    <FeatureSubpageLayout
      path="/products/roi-tracking"
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="ROI tracking"
      headline={
        <>
          See what the agent <span className="green-highlight">actually sold</span>
        </>
      }
      subtitle="Aurevia links real Shopify orders to the conversations behind them, so you can see exactly what the agent sold."
      heroBullets={[
        "Revenue linked to each conversation",
        "Split by feature: recommendations, recovered carts, upsells",
        "Based on real Shopify orders",
      ]}
      demo={<AppHeroDemo variant="revenue" />}
      featureBlocks={[
        {
          visual: { kind: "kpis" },
          title: "Influenced revenue, clearly defined",
          body: "Know exactly what “assisted by Aurevia” means in your report, so you can stand behind the number with your team.",
        },
        {
          visual: { kind: "attribution" },
          title: "More than the last click",
          body: "Count the part that product suggestions and nudges played in a purchase where the chat helped the shopper decide.",
        },
        {
          visual: { kind: "kpis", stats: [["Revenue / conversation", "$14"], ["AI-assisted conversion", "16.6%"], ["Rec. conversion", "23.7%"]] },
          title: "Order value and conversion together",
          body: "If the gain is bigger baskets or a higher conversion rate, you'll see both. Some stores improve on one, some on the other.",
        },
        {
          visual: { kind: "install" },
          title: "Built around Shopify",
          body: "Attribution follows how your store already records orders, discounts and returns, so it lines up with your accounts.",
        },
      ]}
      howItWorks={[
        { title: "Connect store data", body: "Shopify stays the record of every order. Aurevia links orders to the conversations behind them." },
        { title: "Choose a reporting window", body: "Weekly for running the store, monthly for bigger decisions. Trends tell you more than a single busy day." },
        { title: "Compare with campaigns", body: "See how the agent performs alongside paid traffic, launches and sales events." },
      ]}
      relatedLinks={[
        { href: "/resources/roi-calculator", label: "ROI calculator" },
      ]}
      faqs={[
        {
          q: "Is this the same as Google Analytics revenue?",
          a: "It works alongside it. GA often misses the part a conversation played. This links orders to the agent's involvement in a way a funnel tool can't show on its own.",
        },
        {
          q: "What if our sales cycle is long or mostly B2B?",
          a: "Use the assisted sales figures alongside your CRM. Stores measure success differently, so there's no single formula that fits everyone.",
        },
        {
          q: "How often should we review?",
          a: "Weekly for day-to-day decisions and monthly for bigger ones. That's often enough to spot real changes without reacting to every blip.",
        },
      ]}
      screenshot={{
        scene: <ProductAttributionScene />,
        title: "See which products the agent sold",
        caption: "Revenue Influenced counts the orders where the agent recommended a product, added it to the cart or created the checkout. Under it, each recommended product shows how often the agent showed it, how often it was added and bought, and the revenue it brought in.",
      }}
      setup={{
        title: "How attribution works",
        steps: [
          { scene: <LiveActivityMini tagged />, title: "The chat adds to cart", body: "When the agent adds an item or creates a checkout, the cart is tagged with the chat session." },
          { scene: <OrderMatchMini />, title: "Shopify sends the order", body: "The order webhook carries the tag. Aurevia matches it to the session and credits that conversation." },
          { scene: <NotTrackedMini />, title: "You read real numbers", body: "Orders placed without a chat are never credited. A card that says Not tracked means exactly that." },
        ],
      }}
      review={getReview("l1nk")}
      alsoSee={[
        { href: "/products/dashboard", title: "Dashboard & Ask Aurevia", body: "Ask questions about the numbers instead of reading charts." },
        { href: "/products/recommendations", title: "Recommendations", body: "Where most influenced revenue comes from." },
        { href: "/pricing", title: "Pricing", body: "Every plan includes attribution." },
      ]}
    />
  );
}
