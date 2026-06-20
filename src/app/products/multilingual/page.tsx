import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Multilingual AI Chat for Shopify Stores | Aurevia";
const desc =
  "Serve global shoppers in their language with one brand voice, one catalog, and the same sales logic. Shopify conversational commerce, localized.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function MultilingualPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          One store, <span className="green-highlight">every market</span> you ship to
        </>
      }
      subtitle="Aurevia does not just translate a generic script. The same product rules, cart actions, and brand tone apply in each language you enable—so you scale internationally without a separate bot per locale or a support team that is awake around the clock in five time zones."
      lede="If you already invest in global traffic, language should be a growth lever, not a patchwork of spreadsheets. Multilingual support here means the AI can still recommend, upsell, and hand off—coherently."
      proofStrip={[
        { label: "One brain", text: "Same consultative flow and guardrails, localized—not a forked, unmaintained bot per country." },
        { label: "Shopper experience", text: "Quick replies and natural questions read naturally in the buyer’s language." },
        { label: "Ops simplicity", text: "Less manual routing between regional inboxes; more one queue with context." },
      ]}
      featureBlocks={[
        {
          title: "Conversations that match how people actually shop",
          body: "Fit questions, product comparisons, and policy lines read fluently, so you are not leaving money on the table in key regions.",
        },
        {
          title: "Revenue, not just translation",
          body: "Recommendations, bundles, and cart nudges work in the shopper’s language—AOV and conversion are part of the design.",
        },
        {
          title: "Aligned with your policies",
          body: "Returns, duties, and shipping messaging stay consistent with what you publish per market.",
        },
        {
          title: "Still merchant-controlled",
          body: "Brand vocabulary and do-not-say lists apply everywhere you sell, so the voice stays yours.",
        },
      ]}
      howItWorks={[
        { title: "Set languages", body: "Enable the locales you support; your catalog and policies feed the same reasoning layer." },
        { title: "Shoppers self-select or auto-detect", body: "Meet customers in their language from the first message." },
        { title: "Measure by region", body: "See which markets drive assisted revenue and which questions repeat—tune with data." },
      ]}
      media={{
        ariaLabel: "Placeholder for same chat in two languages",
        caption: "Swap in: side-by-side or toggle UI showing the same flow in two locales",
        suggestedAsset: "Show one conversation duplicated EN/ES (or your priority pair) with matching product cards and Add to cart.",
        kind: "image",
        aspect: "wide",
      }}
      relatedLinks={[
        { href: "/products/shopify", label: "Shopify integration" },
        { href: "/products/automated-responses", label: "Automated responses" },
        { href: "/solutions/conversion", label: "Conversion solutions" },
      ]}
      faqs={[
        {
          q: "Do I need a separate app per language?",
          a: "No. Aurevia is designed to run one cohesive experience: same rules, multiple languages, one dashboard.",
        },
        {
          q: "Will recommendations still work across locales?",
          a: "Yes. Product understanding and consultative follow-ups are part of the same system—not a bolted-on translator for search results only.",
        },
        {
          q: "What about right-to-left languages?",
          a: "Confirm target locales with your success contact; we will align UI and messaging to what your storefront already supports.",
        },
      ]}
    />
  );
}
