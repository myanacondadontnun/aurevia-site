import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";

const title = "Multilingual AI Chat for Shopify Stores | Aurevia";
const desc =
  "Serve global shoppers in their language with one brand voice, one catalog, and the same sales logic. Shopify conversational commerce, localized.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

const demoScript: ChatStep[] = [
  { type: "user", text: "Bonjour ! Est-ce que ce sac est imperméable ?" },
  {
    type: "card",
    head: "Language detected",
    title: "Français 🇫🇷",
    note: "Replying in the shopper's language",
  },
  {
    type: "bot",
    text: "Bonjour ! Oui — l'extérieur est déperlant et l'intérieur se nettoie d'un coup d'éponge. Parfait sous la pluie 🌧️",
  },
  { type: "user", text: "Génial ! Et la livraison en France ?" },
  {
    type: "bot",
    text: "Livraison en France en 4–6 jours ouvrés, et offerte dès 75 €. Je l'ajoute à votre panier ?",
  },
  { type: "user", text: "Oui, avec plaisir !" },
];

export default function MultilingualPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Multilingual support"
      headline={
        <>
          Fluent in <span className="green-highlight">every market</span> you ship to
        </>
      }
      subtitle="A shopper in Paris asks in French. One in Seoul asks in Korean. Aurevia answers each of them natively — same catalog, same brand voice, same selling instincts — in 95+ languages, without a separate bot per locale."
      heroBullets={[
        "95+ languages, auto-detected",
        "Same brand voice everywhere",
        "Sells and upsells in every locale",
      ]}
      demo={<FeatureChatDemo agentName="Sales Agent" script={demoScript} />}
      proofStrip={[
        { label: "One brain, every locale", text: "The same consultative flow and guardrails, localized — not a forked, unmaintained bot per country." },
        { label: "Reads like a native", text: "Fit questions, comparisons, and policy answers that sound natural, not machine-translated." },
        { label: "One queue for your team", text: "No more routing between regional inboxes — every conversation lands with full context." },
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
      testimonial={{
        quote:
          "We ship to fourteen countries and used to only really support English. The first week we turned on multilingual chat, we got a five-star review from a customer in Seoul who said it was the first brand that “spoke to them properly.”",
        name: "Clara Lindqvist",
        role: "International Manager",
        company: "Northfold",
      }}
    />
  );
}
