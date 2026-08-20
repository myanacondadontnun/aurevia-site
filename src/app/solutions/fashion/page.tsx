import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "AI Chat for Fashion & Apparel on Shopify | Aurevia";
const desc =
  "Size, fit, and style in natural language. Reduce returns, lift conversion, and upsell complete looks with a consultative AI built for fashion ecommerce.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function FashionPage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      heroVisual={{
        src: "/images/fashion-apparel.jpg",
        alt: "Fashion retail environment representing apparel ecommerce",
      }}
      headline={
        <>
          Fit and style, <span className="green-highlight">before the return label</span>
        </>
      }
      subtitle="Fashion shoppers are not short on options—they are short on confidence. Aurevia asks the questions a great associate would: climate, use case, body preference, and budget—then shows a small set of on-catalog looks with a path to add to cart, not a wall of maybe-right SKUs. You get fewer misfit sends and more full-price wins."
      lede="If returns are your second tax, this is where you defuse the doubt while they are still in session: materials, size guides, and honest comparisons, plus bundles when a complete look is the right upsell."
      proofStrip={[
        { label: "Conversion", text: "Move browsers to a confident add-to-cart with a consultative path, not only filters." },
        { label: "AOV", text: "Outfits, matching accessories, and ‘complete the look’ nudges when intent is there." },
        { label: "Support", text: "Deflect WISMO and fit anxiety with on-brand, accurate answers and order context when they already bought." },
      ]}
      featureBlocks={[
        { title: "How it asks", body: "Chips and follow-ups for fit, use case, and climate so recommendations are narrow and explained." },
        { title: "How it recommends", body: "Curated 1–4 items with a clear ‘why’ tied to the shopper’s own words, from your real catalog." },
        { title: "Upsell and cross-sell", body: "Layer pieces that complete a look; respect rules like never push premium as the first card." },
        { title: "Deflect without ghosting", body: "Pre- and post-purchase in one place so a sizing fear does not become a return before it has to be a ticket." },
      ]}
      howItWorks={[
        { title: "Learn the use case", body: "Hiking, office, or gift—clarify before pitching." },
        { title: "Match from inventory", body: "Only what you can ship; no off-menu SKUs." },
        { title: "Nudge the basket", body: "Outfits and accessories when it feels helpful, not when it clogs the sale." },
      ]}
      media={{
        ariaLabel: "Vertical demo for fashion: fit and bundle",
        caption: "Swap in: 15s clip of size/fit Q&A to outfit bundle in chat",
        suggestedAsset: "Record a ‘lightweight jacket for hiking’ flow with product card and second layer as upsell—match your pre-sales phone mock style.",
        kind: "video",
        aspect: "video",
      }}
      relatedLinks={[
        { href: "/solutions/conversion", label: "Conversion" },
        { href: "/products/recommendations", label: "Recommendations" },
        { href: "/solutions/stories", label: "Customer stories" },
      ]}
      faqs={[
        { q: "Can we follow our size chart strictly?", a: "Yes. Ground answers in the guides you already publish, and set rules for when to say ‘size up for relaxed fit’ versus ‘true to size.’" },
        { q: "What about fast fashion vs premium?", a: "Set tone, upsell rules, and how assertively to present alternatives; the AI should feel like your brand, not a generic mall." },
        { q: "Do you handle multi-currency and global shipping?", a: "Pair accurate policy copy with the locales you serve; the AI can speak your shipping story where you enable it." },
      ]}
      testimonial={{
        quote:
          "Sizing questions used to be our single biggest source of returns. The AI walks people through fit the way our best in-store associate used to, and our return rate actually moved because of it.",
        name: "Yasmin Torres",
        role: "Brand Director",
        company: "Rowe & Rue",
      }}
    />
  );
}
