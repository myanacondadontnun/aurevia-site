import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "AI Chat for Fitness & Supplements on Shopify | Aurevia";
const desc =
  "Goal-based product guidance, stack building, and trust-first answers for supplements and fitness gear. Shopify AI that matches how serious athletes and beginners actually shop.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function FitnessPage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      heroVisual={{
        src: "/images/fitness.jpg",
        alt: "Fitness and wellness setting representing sports nutrition ecommerce",
      }}
      headline={
        <>
          Turn goals into <span className="green-highlight">the right stack</span>
        </>
      }
      subtitle="Protein, recovery, and gear purchases live at the edge of health claims and high expectations. Aurevia can talk goals—build, cut, endurance, or everyday wellness—then build a product shortlist with clear, compliant reasons to buy, plus gear add-ons that complete the use case. You sell outcomes your customers can repeat, not one-off SKUs that sit in the cabinet."
      lede="Deflect the repetitive ‘what do I take when’ questions with structured discovery, and keep AOV with stacks and refills that match the journey, not a random cross-sell carousel."
      proofStrip={[
        { label: "Goal-first", text: "Muscle, energy, focus, and constraints captured before the first recommendation." },
        { label: "Trust", text: "Guardrails on claims, ingredients, and when to hand off to your experts." },
        { label: "AOV", text: "Stacks, shakers, and refills in-context when the buyer’s intent supports them." },
      ]}
      featureBlocks={[
        { title: "How it asks", body: "Diet, timing, and training context so a beginner and an advanced lifter do not get the same canned pitch." },
        { title: "How it recommends", body: "Curated options with usage framing from your own PDP and label story—no off-catalog fantasy SKUs." },
        { title: "Upsell and cross-sell", body: "Complementary gear, flavors, and refills; respect your rules for subscription vs one-time." },
        { title: "Deflection", body: "Shipping, subscription changes, and common product how-tos in brand voice, with order context where relevant." },
      ]}
      howItWorks={[
        { title: "Capture the goal", body: "A few sharp questions beat a fifty-field quiz nobody finishes." },
        { title: "Build a defensible plan", body: "Short lists with the ‘why’ tied to the shopper in their words." },
        { title: "Keep the regimen going", body: "Refill and complement nudges on the timeline that matches the product, not a generic blast." },
      ]}
      media={{
        ariaLabel: "Fitness supplement demo: goal to stack",
        caption: "Swap in: 15s clip of goal questions to stack recommendation",
        suggestedAsset: "A flow: “goal + dietary constraint” → two SKUs + shaker upsell, with a trust line that stays inside your label claims.",
        kind: "video",
        aspect: "video",
      }}
      relatedLinks={[
        { href: "/solutions/conversion", label: "Conversion" },
        { href: "/solutions/enterprise", label: "Enterprise" },
        { href: "/products/automated-responses", label: "Automated responses" },
      ]}
      faqs={[
        { q: "What about health compliance?", a: "You set where the AI can go; sensitive medical territory routes to your policy and humans as you require." },
        { q: "Do you help with international labels?", a: "Ground answers in the content you provide per market; the AI is not inventing new claims per country." },
        { q: "What about high SKU count?", a: "That is where Q&A and goals beat search alone—narrow before you ever show a wall of tubs." },
      ]}
      testimonial={{
        quote:
          "People ask us to basically build their stack for them — creatine, protein, pre-workout, what goes with what. The AI does that consultative selling at 11pm when our team's long gone home.",
        name: "Connor Blake",
        role: "Founder",
        company: "Ironmark Nutrition",
      }}
    />
  );
}
