import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";
import { DEMO_ART } from "@/lib/demoArt";

const title = "AI Sales Chat for Health & Beauty on Shopify | Aurevia";
const desc =
  "Skincare and beauty shoppers need trust. Aurevia asks about skin type and routine, then recommends products and refills that feel like care, not pressure.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/solutions/beauty" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/solutions/beauty/" },
};


export default function BeautyPage() {
  return (
    <FeatureSubpageLayout
      path="/solutions/beauty"
      breadcrumbLabel="Health & beauty"
      backHref="/solutions"
      backLabel="← Back to Solutions"
      heroVisual={{
        src: "/images/health-beauty.webp",
        alt: "Skincare and beauty products representing health and beauty ecommerce",
        chat: { ask: "Something for dry, sensitive skin?", question: "Happy to help. Is it for your morning or evening routine?", answer: "Evening, fragrance-free.", pitch: "This one is fragrance-free and made for overnight repair:", product: { name: "Barrier Night Cream", price: "$42.00", img: DEMO_ART.cream } },
      }}
      headline={
        <>
          Recommend like a <span className="green-highlight">real specialist</span>
        </>
      }
      subtitle="Beauty is a trust game. Aurevia asks about skin type, sensitivities and goals, then recommends a small routine from your catalogue, not an overwhelming grid."
      challenges={[
        { title: "Choice overload", problem: "Shoppers face dozens of serums and don't know where to start.", fix: "The agent asks about skin type and goals, then suggests a short routine." },
        { title: "Ingredient worries", problem: "Sensitive-skin shoppers hesitate over what's inside.", fix: "Ingredients and usage come from your product pages, within your approved claims." },
        { title: "No repeat purchase", problem: "Customers run out and buy somewhere else.", fix: "Refills and the next step in the routine, suggested at the right moment." },
      ]}
      beforeAfter={[
        { without: "Shoppers scroll every product", with: "A routine built for their skin" },
        { without: "Ingredient questions go to email", with: "Answers from your product pages, at any hour" },
        { without: "Claims depend on who replies", with: "Answers stay within your approved claims" },
        { without: "One product per order", with: "The next step in the routine, suggested" },
        { without: "Abandoned carts go quiet", with: "A nudge in the chat, then a follow-up email" },
        { without: "Shade and skin questions pile up", with: "The tricky ones go to your team" },
      ]}
      fit={{
        good: ["Sell skincare, haircare or cosmetics on Shopify", "Have ingredient lists and usage notes for your products", "Want routines and refills, not one-off orders"],
        notYet: ["Need medical or prescription advice given in the chat", "Haven't written your product details down yet"],
      }}
      review={getReview("lotus-beauty")}
      featureBand={{ src: "/images/site/store-skincare.webp", alt: "Skincare bottles on a stone shelf", position: "30% 80%" }}
      featureBlocks={[
        { visual: { kind: "ask", q: "Something for dry, sensitive skin?", a: "Happy to help. Is it for day or night?" }, title: "How it asks", body: "Skin type, concerns and routine, asked gently." },
        { visual: { kind: "products", items: [{ name: "Hydrating Serum", price: "$38", img: DEMO_ART.serum }, { name: "Barrier Cream", price: "$42", img: DEMO_ART.cream }] }, title: "How it recommends", body: "A short routine from your range, with a reason for each step." },
        { visual: { kind: "upsell", items: [{ name: "Hydrating Serum", price: "$38", img: DEMO_ART.serum }, { name: "Mineral SPF 50", price: "$29", img: DEMO_ART.spf }] }, title: "Upsell and cross-sell", body: "Refills and the next step in the routine, never random extras." },
        { visual: { kind: "guardrail", rule: "Give medical advice" }, title: "Support and compliance", body: "Stays within your approved claims and hands sensitive questions to your team." },
      ]}
      howItWorks={[
        { title: "Understand the skin", body: "A few questions turn ingredient worry into a confident pick." },
        { title: "Explain, then add to cart", body: "Short answers in the chat, not a pile of blog links." },
        { title: "Bring them back", body: "Refill nudges that match the routine they bought." },
      ]}
      relatedLinks={[
        { href: "/solutions/conversion", label: "Conversion" },
        { href: "/products/roi-tracking", label: "Insights & ROI" },
        { href: "/solutions/small-business", label: "Small business" },
      ]}
      faqs={[
        { q: "How do you avoid over-claiming?", a: "You set the allowed claims and the tone. It stays inside what you publish." },
        { q: "What about shade matching?", a: "It uses your shade guides, and passes tricky matches to your team." },
        { q: "Can it suggest bundles?", a: "Yes, only the bundles you sell, with clear usage for each step." },
        { q: "Can it recommend a full routine?", a: "Yes. It builds a short routine from your range, in the right order." },
        { q: "Will it make medical claims?", a: "No. It stays within the claims you approve and passes medical questions to your team." },
      ]}
    />
  );
}
