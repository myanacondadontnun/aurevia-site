import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";

const title = "AI Chat for Home & Garden on Shopify | Aurevia";
const desc =
  "Space, style and use-case questions for home and garden stores, with bundles that fit the room and the season.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/solutions/home-garden" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/solutions/home-garden/" },
};


export default function HomeGardenPage() {
  return (
    <FeatureSubpageLayout
      path="/solutions/home-garden"
      breadcrumbLabel="Home & garden"
      backHref="/solutions"
      backLabel="← Back to Solutions"
      heroVisual={{
        src: "/images/home-garden.webp",
        alt: "Home and garden setting representing home decor ecommerce",
        chat: { ask: "A vase for a narrow mantel?", question: "Tall or low, and is it for fresh flowers?", answer: "Tall, fresh flowers.", pitch: "Slim, glazed inside and watertight for fresh stems:", product: { name: "Stoneware Vase", price: "$64.00", img: "/images/site/product-vase.webp" } },
      }}
      headline={
        <>
          From “for my <span className="green-highlight">room</span>” to the cart
        </>
      }
      subtitle="Home shoppers describe a room, not a keyword. Aurevia asks about space, light and style, then shows a few pieces that work together."
      challenges={[
        { title: "Will it fit?", problem: "Shoppers can't picture the size in their room.", fix: "The agent answers dimensions and asks about the space before suggesting anything." },
        { title: "Delivery surprises", problem: "Big or heavy items raise questions about delivery.", fix: "Delivery times and options, explained before checkout." },
        { title: "Single-item baskets", problem: "People buy one piece and come back later, or don't.", fix: "Pieces that go together, suggested from what you stock." },
      ]}
      beforeAfter={[
        { without: "Shoppers guess sizes and fit", with: "Dimensions and space questions answered" },
        { without: "Delivery questions go to email", with: "Delivery explained before checkout" },
        { without: "Browsers scroll every category", with: "A few pieces chosen for the room" },
        { without: "One item per order", with: "Pieces that finish the room" },
        { without: "Abandoned carts go quiet", with: "A nudge in the chat, then a follow-up email" },
        { without: "Style words get lost", with: "Your own style vocabulary, understood" },
      ]}
      fit={{
        good: ["Sell furniture, décor or garden products on Shopify", "Get size, material and delivery questions", "Want bigger baskets that make sense"],
        notYet: ["Need room planning or custom quotes handled in the chat", "Haven't written your product details down yet"],
      }}
      review={getReview("pippi-ceramics")}
      featureBand={{ src: "/images/site/product-lifestyle.webp", alt: "A set table with stoneware bowls", position: "50% 60%" }}
      featureBlocks={[
        { visual: { kind: "ask", q: "A vase for a narrow mantel?", a: "Tall or low, and is it for fresh flowers?" }, title: "How it asks", body: "Room, size and style first." },
        { visual: { kind: "products", items: [{ name: "Stoneware Vase", price: "$64", img: "/images/site/product-vase.webp" }, { name: "Beeswax Candle", price: "$28", img: "/images/site/product-candle.webp" }] }, title: "How it recommends", body: "A few pieces that work together, from your stock." },
        { visual: { kind: "upsell", items: [{ name: "Stoneware Vase", price: "$64", img: "/images/site/product-vase.webp" }, { name: "Linen Napkins, set of 4", price: "$36", img: "/images/site/product-napkins.webp" }] }, title: "Upsell and cross-sell", body: "Planters, care and accents that finish the job." },
        { visual: { kind: "answer", q: "Is the vase watertight?", a: "Yes, it's glazed inside for fresh flowers.", source: "From the product page" }, title: "Fewer surprises", body: "Dimensions, materials and delivery answered before they buy." },
      ]}
      howItWorks={[
        { title: "Listen for the use", body: "Gift, refresh or remodel changes the pick." },
        { title: "Show what goes together", body: "Only what you stock, chosen to match." },
        { title: "Complete the room", body: "The extras that make the first purchase work." },
      ]}
      relatedLinks={[
        { href: "/solutions/conversion", label: "Conversion" },
        { href: "/products/recommendations", label: "Recommendations" },
        { href: "/solutions/small-business", label: "Small business" },
      ]}
      faqs={[
        { q: "We ship heavy items. Can it set expectations?", a: "Yes. It explains your delivery times and options before checkout." },
        { q: "What about style words?", a: "It uses your own style vocabulary, so mid-century and coastal mean what they mean in your catalogue." },
        { q: "Seasonal ranges?", a: "It suggests seasonal collections when the shopper's timing calls for it." },
        { q: "Can it answer dimensions?", a: "Yes, from your product pages, and it asks about the space first." },
        { q: "Does it recover abandoned carts?", a: "Yes, with a nudge in the chat and a follow-up email, plus WhatsApp if you connect it." },
      ]}
    />
  );
}
