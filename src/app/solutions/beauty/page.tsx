import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "AI Sales Chat for Health & Beauty on Shopify | Aurevia";
const desc =
  "Skincare and cosmetics shoppers need trust. Ask skin type, goals, and routine—then recommend with upsells that feel like care, not pressure. Ecommerce AI for beauty brands.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function BeautyPage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      heroVisual={{
        src: "/images/health-beauty.jpg",
        alt: "Skincare and beauty products representing health and beauty ecommerce",
      }}
      headline={
        <>
          Recommend like a <span className="green-highlight">real specialist</span>
        </>
      }
      subtitle="Skincare and cosmetics are a trust game. Aurevia can ask the sensitive, practical questions a counter associate would: skin type, sensitivities, goals, and budget—then recommend a small regimen from your catalog, not an overwhelming grid. The win is a confident first purchase and a reason to come back, not a one-off discounter race."
      lede="Use structured discovery to reduce bad-fit buys that become chargebacks and one-star reviews, while still nudging routine upsells and refills that increase LTV the way your best educators do in-store."
      proofStrip={[
        { label: "Discovery-first", text: "Dry vs oily, AM vs PM, and concerns before SKUs, so the match makes sense to the customer." },
        { label: "AOV and LTV", text: "Serum + SPF + refills, when your rules allow—without sounding like a pushy script." },
        { label: "Deflection with care", text: "Ingredients and usage questions get answered in brand voice, with escalation when a medical claim is out of scope." },
      ]}
      featureBlocks={[
        { title: "How it asks", body: "Short chips and follow-ups to capture routine, time available, and concerns without a twenty-field form." },
        { title: "How it recommends", body: "1–3 hero products with clear ‘why for you’ copy grounded in your claims and product pages, not the open web." },
        { title: "Upsell and cross-sell", body: "Regimen builders, minis, and travel sets when they fit; hold back on bundles until intent is clear, per your rules." },
        { title: "Support and compliance", body: "Route sensitive topics to your team, with transcripts so you stay consistent with your regulatory story." },
      ]}
      howItWorks={[
        { title: "Qualify without friction", body: "Turn ingredient anxiety into a confident pick from what you already sell." },
        { title: "Educate, then add to cart", body: "Micro-explainers in chat, not a wall of long-form blog links." },
        { title: "Nudge subscription where it helps", body: "Refill prompts that match the routine you just built, not a generic banner." },
      ]}
      media={{
        ariaLabel: "Beauty vertical demo: skin type to regimen",
        caption: "Swap in: 15s clip of dry vs oily branch to curated picks",
        suggestedAsset: "Show the ‘ask if dry or oily’ rule, then 2 product cards with a gentle regimen upsell—your custom instructions mock is a good template for stills first.",
        kind: "video",
        aspect: "video",
      }}
      relatedLinks={[
        { href: "/solutions/conversion", label: "Conversion" },
        { href: "/solutions/insights", label: "Customer insights" },
        { href: "/solutions/small-business", label: "Small business" },
      ]}
      faqs={[
        { q: "How do you avoid over-claiming?", a: "You define allowed claims, tone, and when to hand off. The model stays inside your published reality." },
        { q: "What about shade matching?", a: "Use the assets and text you provide; complex shade journeys may blend AI triage with human review where you set it." },
        { q: "Can it sell bundles without confusing compliance?", a: "Yes, when you encode rules: only suggest bundles you merchandize, with clear per-step usage." },
      ]}
    />
  );
}
