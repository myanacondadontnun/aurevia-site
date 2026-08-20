import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "AI Product Guidance for Electronics on Shopify | Aurevia";
const desc =
  "Spec-aware recommendations, compare-mode answers, and accessories that make sense. Reduce return-prone misfit buys in tech and consumer electronics with consultative AI.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function ElectronicsPage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      heroVisual={{
        src: "/images/electronics.jpg",
        alt: "Consumer electronics and gadgets representing technology ecommerce",
      }}
      headline={
        <>
          Out-spec the <span className="green-highlight">comparison tab</span>
        </>
      }
      subtitle="Tech buyers burn hours in tabs, reviews, and Reddit threads. Aurevia can ask what they are solving—space, power, budget, OS—and compare on-catalog options with plain language, not a dump of spec rows. The outcome is a confident add-to-cart and the right cable or case, not a return because the port was wrong."
      lede="Use this in categories where a wrong spec is a costly return. The AI is grounded in your PDPs, so the comparison stays honest to what you actually sell and support."
      proofStrip={[
        { label: "Spec-aware", text: "Ports, compatibility, and use-case fit before a SKU is crowned." },
        { label: "AOV", text: "Accessories, warranties, and care plans when they complete the use case, not a random add-on list." },
        { label: "Deflection", text: "Order status, warranty basics, and ‘will this work with X’ answered with the facts you ship." },
      ]}
      featureBlocks={[
        { title: "How it asks", body: "Environment, device ecosystem, and non-negotiables first—no premature recommendation." },
        { title: "How it recommends", body: "Two or three strong options with a comparison narrative your team would stand behind in-store." },
        { title: "Upsell and cross-sell", body: "Cables, cases, and extended support bundles that are tied to the exact device they picked." },
        { title: "Deflection and returns", body: "Reduce ‘not compatible’ and ‘wrong size’ by clarifying the constraints before the box ships." },
      ]}
      howItWorks={[
        { title: "Frame the job to be done", body: "Home office, travel, or creator setup—clarify before you pitch a SKU." },
        { title: "Surface compatible picks", body: "Ground claims in your catalog, not a generic web search." },
        { title: "Add the right extras", body: "Complete the box with the accessories the buyer would have grabbed in retail." },
      ]}
      media={{
        ariaLabel: "Electronics compare demo: compatibility question",
        caption: "Swap in: 15s clip of compatibility Q&A to two product cards",
        suggestedAsset: "A split compare: “works with iPad Pro” or port-matching, then add cable + case—keep text tied to your PDPs.",
        kind: "video",
        aspect: "video",
      }}
      relatedLinks={[
        { href: "/solutions/support", label: "Support automation" },
        { href: "/products/cart-recovery", label: "Cart recovery" },
        { href: "/solutions/insights", label: "Insights" },
      ]}
      faqs={[
        { q: "How do we avoid overpromising on compatibility?", a: "Ground answers in your own specs; when uncertain, the path is clarification or a human, not a guess." },
        { q: "What if we sell third-party marketplaces and our own DTC site?", a: "Aurevia is focused on the experience on your store; use your data where it is authoritative for that channel." },
        { q: "B2B or bulk quotes?", a: "Layer lead capture and escalation when a conversation needs account pricing, not a consumer widget." },
      ]}
      testimonial={{
        quote:
          "Buyers want to know if a charger is compatible with three different devices before they'll click add to cart. Aurevia answers that instantly instead of losing them to a return three weeks later.",
        name: "Ben Sato",
        role: "Ecommerce Manager",
        company: "Voltware",
      }}
    />
  );
}
