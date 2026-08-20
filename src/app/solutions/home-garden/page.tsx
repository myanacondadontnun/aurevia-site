import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "AI Chat for Home & Garden on Shopify | Aurevia";
const desc =
  "Style, space, and use-case discovery for home décor and garden. Bigger baskets with bundles that fit the room and the season—conversational commerce for home brands.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function HomeGardenPage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      heroVisual={{
        src: "/images/home-garden.jpg",
        alt: "Home and garden setting representing home decor ecommerce",
      }}
      headline={
        <>
          From “for my <span className="green-highlight">room</span>” to the cart
        </>
      }
      subtitle="Home and garden is visual and personal—shoppers are not always searching a keyword; they are describing a table, a light, a plant that survives a balcony. Aurevia can capture space, light, and style, then show a few pieces that work together, with bundle nudges for planters, care, and accents that complete the look without feeling pushy."
      lede="High consideration and shipping weight mean misfit buys are expensive. Consultative Q&A in-session saves returns and support tickets, while bigger baskets come from true cross-sell that matches the use case, not a random “customers also bought” strip."
      proofStrip={[
        { label: "Inspiration in words", text: "Turn vague “something for the living room” into a shoppable, justified shortlist." },
        { label: "AOV", text: "Sets, care items, and seasonal add-ons in one coherent thread." },
        { label: "Support", text: "Deflect assembly, size, and delivery questions with order-aware, policy-bounded answers when they already purchased." },
      ]}
      featureBlocks={[
        { title: "How it asks", body: "Dimensions, color palette, pet/kid constraints, and maintenance appetite before a recommendation." },
        { title: "How it recommends", body: "Cohesive 2–3 item sets when that is the right answer, or a single hero with clear trade-offs." },
        { title: "Upsell and cross-sell", body: "Planters, soil, and care; lighting layers; the accessories that make the first purchase work in real life." },
        { title: "Deflection", body: "Shipping windows, return windows for bulky goods, and ‘will it fit’ answered with the facts you publish." },
      ]}
      howItWorks={[
        { title: "Listen for the use case", body: "Gift vs remodel vs quick refresh changes what you should pitch." },
        { title: "Show real combinations", body: "Only SKUs you stock; visual consistency in copy when your PDP images carry the look." },
        { title: "Nudge the complete job", body: "Cart the pieces that make the first purchase work—without feeling like a hardware store upsell at checkout." },
      ]}
      media={{
        ariaLabel: "Home decor demo: room context to bundle",
        caption: "Swap in: 15s clip: living room request to vase + coasters bundle",
        suggestedAsset: "Match your Orbit Vase + coasters bundle mock: the AI ties room context to a bundle add-to-cart with a small discount callout if you run one.",
        kind: "video",
        aspect: "video",
      }}
      relatedLinks={[
        { href: "/solutions/conversion", label: "Conversion" },
        { href: "/products/recommendations", label: "Recommendations" },
        { href: "/solutions/small-business", label: "Small business" },
      ]}
      faqs={[
        { q: "We sell heavy freight. Can the AI set expectations?", a: "Yes, when you encode shipping and lead-time stories; clarity reduces WISMO and cancels that come from surprise." },
        { q: "What about style vocabulary?", a: "Train tone and adjectives in your brand voice; mid-century and coastal are not the same in your catalog, and the AI can respect that with your list." },
        { q: "Seasonal merchandising?", a: "Nudge the right outdoor or holiday collections in chat when the shopper’s text signals timing." },
      ]}
      testimonial={{
        quote:
          "“Will this actually fit my space” is the question that kills more sales than anything else we sell. Now the AI walks people through dimensions and style before they ever get to checkout.",
        name: "Grace Whitfield",
        role: "Owner",
        company: "Thistle & Loam",
      }}
    />
  );
}
