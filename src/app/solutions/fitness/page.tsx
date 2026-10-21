import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";
import { DEMO_ART } from "@/lib/demoArt";

const title = "AI Chat for Fitness & Supplements on Shopify | Aurevia";
const desc =
  "Goal-based guidance for supplements and fitness gear. Aurevia asks about goals, builds the right stack and keeps refills coming, within your claims.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/solutions/fitness" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/solutions/fitness/" },
};


export default function FitnessPage() {
  return (
    <FeatureSubpageLayout
      path="/solutions/fitness"
      breadcrumbLabel="Fitness & supplements"
      backHref="/solutions"
      backLabel="← Back to Solutions"
      heroVisual={{
        src: "/images/fitness.webp",
        alt: "Fitness and wellness setting representing sports nutrition ecommerce",
        chat: { ask: "Shoes for my first half marathon?", question: "Road or trail, and how many miles a week?", answer: "Road, about 20.", pitch: "A cushioned road shoe built for that kind of mileage:", product: { name: "Road Running Shoe", price: "$140.00", img: DEMO_ART.roadShoe } },
      }}
      headline={
        <>
          Turn goals into <span className="green-highlight">the right stack</span>
        </>
      }
      subtitle="Fitness shoppers buy for a goal. Aurevia asks about it, builds a short list with clear reasons and adds the gear that completes it."
      challenges={[
        { title: "Goal mismatch", problem: "Shoppers pick products that don't suit their goal.", fix: "The agent asks about the goal and level first, then builds a short list." },
        { title: "Claim questions", problem: "People ask what a supplement does, and answers vary.", fix: "Answers come from your product content, within the claims you allow." },
        { title: "One and done", problem: "Customers buy once and forget to reorder.", fix: "Refill nudges on the right timeline, and gear that fits the plan." },
      ]}
      beforeAfter={[
        { without: "Shoppers guess what they need", with: "A plan built around their goal" },
        { without: "Usage questions go to email", with: "Answers from your content, at any hour" },
        { without: "Claims depend on who replies", with: "Answers stay within your approved claims" },
        { without: "One item per order", with: "Kits and refills that match the goal" },
        { without: "Abandoned carts go quiet", with: "A nudge in the chat, then a follow-up email" },
        { without: "Sizing returns on shoes and kit", with: "Size advice before they buy" },
      ]}
      fit={{
        good: ["Sell supplements, activewear or gear on Shopify", "Get goal and usage questions every day", "Want refills and repeat orders"],
        notYet: ["Need medical advice given in the chat", "Haven't written your product details down yet"],
      }}
      review={getReview("purebronze")}
      featureBand={{ src: "/images/site/store-activewear.png", alt: "Running shoes and leggings on a wooden bench", position: "30% 70%" }}
      featureBlocks={[
        { visual: { kind: "ask", q: "Shoes for my first half marathon?", a: "Road or trail, and how many miles a week?" }, title: "How it asks", body: "Goal, level and routine, in a few quick questions." },
        { visual: { kind: "products", items: [{ name: "Road Running Shoe", price: "$140", img: DEMO_ART.roadShoe }, { name: "Trail Running Shoe", price: "$155", img: DEMO_ART.trailShoe }] }, title: "How it recommends", body: "A short stack or kit, with the reason in the shopper's words." },
        { visual: { kind: "upsell", items: [{ name: "Road Running Shoe", price: "$140", img: DEMO_ART.roadShoe }, { name: "Running Socks, 3 pack", price: "$24", img: DEMO_ART.socks }] }, title: "Upsell and cross-sell", body: "Refills and gear that match the plan." },
        { visual: { kind: "answer", q: "Can I return worn shoes?", a: "Within 30 days, if they've only been worn indoors.", source: "From your returns policy" }, title: "Answers without the inbox", body: "Usage, sizing and returns, answered from your own content." },
      ]}
      howItWorks={[
        { title: "Capture the goal", body: "A few sharp questions, not a long quiz." },
        { title: "Build the plan", body: "A short list with a reason for each product." },
        { title: "Keep it going", body: "Refill nudges on the right timeline." },
      ]}
      relatedLinks={[
        { href: "/solutions/conversion", label: "Conversion" },
        { href: "/solutions/enterprise", label: "Enterprise" },
        { href: "/products/automated-responses", label: "Automated responses" },
      ]}
      faqs={[
        { q: "What about health claims?", a: "You set the limits. Medical questions go to your policy or your team." },
        { q: "International labels?", a: "It answers from the content you provide for each market." },
        { q: "We have a lot of products.", a: "That's where questions beat search: it narrows the range before showing anything." },
        { q: "Can it build a stack or kit?", a: "Yes. It suggests a short set of products that fit the shopper's goal." },
        { q: "Will it give medical advice?", a: "No. Medical questions go to your policy or your team." },
      ]}
    />
  );
}
