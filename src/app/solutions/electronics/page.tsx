import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";

const title = "AI Product Guidance for Electronics on Shopify | Aurevia";
const desc =
  "Spec questions answered in plain words, side-by-side comparisons and the right accessories. Fewer wrong-spec returns for tech and electronics stores.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/solutions/electronics" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/solutions/electronics/" },
};


export default function ElectronicsPage() {
  return (
    <FeatureSubpageLayout
      path="/solutions/electronics"
      breadcrumbLabel="Electronics"
      backHref="/solutions"
      backLabel="← Back to Solutions"
      heroVisual={{
        src: "/images/electronics.webp",
        alt: "Consumer electronics and gadgets representing technology ecommerce",
        chat: { ask: "Headphones for long flights?", question: "Over-ear or in-ear, and what's your budget?", answer: "Over-ear, under $300.", pitch: "These cancel engine noise and last a long-haul flight:", product: { name: "Over-Ear ANC Headphones", price: "$249.00", img: "/images/site/audio-headphones.webp" } },
      }}
      headline={
        <>
          Out-spec the <span className="green-highlight">comparison tab</span>
        </>
      }
      subtitle="Tech buyers lose hours in tabs and reviews. Aurevia asks what they need, compares your products in plain words and adds the right cable or case."
      challenges={[
        { title: "Spec confusion", problem: "Buyers can't tell which model works with their setup.", fix: "The agent asks what they're connecting and answers from your specs." },
        { title: "Wrong-part returns", problem: "A missing cable or the wrong port means a return.", fix: "It checks compatibility and suggests the accessory that completes the box." },
        { title: "Comparison fatigue", problem: "Shoppers leave to read reviews and compare tabs.", fix: "Two products side by side in plain words, with a clear pick." },
      ]}
      beforeAfter={[
        { without: "Buyers read spec sheets alone", with: "Specs explained in plain words" },
        { without: "Compatibility questions go to email", with: "Answered from your product data, at any hour" },
        { without: "Shoppers compare in other tabs", with: "Side-by-side comparisons in the chat" },
        { without: "Accessories get forgotten", with: "The right case or cable, added" },
        { without: "Abandoned carts go quiet", with: "A nudge in the chat, then a follow-up email" },
        { without: "Returns for the wrong model", with: "Fewer wrong-spec orders" },
      ]}
      fit={{
        good: ["Sell electronics, audio or accessories on Shopify", "Get technical questions before people buy", "Have specs on your product pages"],
        notYet: ["Need repair or warranty diagnostics handled in the chat", "Sell mostly through marketplaces rather than your own store"],
      }}
      review={getReview("l1nk")}
      featureBand={{ src: "/images/site/store-audio.webp", alt: "Headphones on a desk at golden hour", position: "40% 75%" }}
      featureBlocks={[
        { visual: { kind: "ask", q: "Headphones for long flights?", a: "Over-ear or in-ear, and what's your budget?" }, title: "How it asks", body: "Use, space and budget first, before any spec sheet." },
        { visual: { kind: "products", items: [{ name: "Over-Ear ANC Headphones", price: "$249", img: "/images/site/audio-headphones.webp" }, { name: "Travel Case", price: "$39", img: "/images/site/audio-case.webp" }] }, title: "How it recommends", body: "Compatible picks from your catalogue, compared in plain words." },
        { visual: { kind: "upsell", items: [{ name: "Over-Ear ANC Headphones", price: "$249", img: "/images/site/audio-headphones.webp" }, { name: "Travel Case", price: "$39", img: "/images/site/audio-case.webp" }] }, title: "Upsell and cross-sell", body: "The case, cable or charger they'd have grabbed in store." },
        { visual: { kind: "answer", q: "What's your returns window?", a: "30 days, with a free return label.", source: "From your returns policy" }, title: "Fewer wrong-spec returns", body: "Compatibility and returns answered from your product pages and policies." },
      ]}
      howItWorks={[
        { title: "Understand the job", body: "Home office, travel or creator setup, asked first." },
        { title: "Show what fits", body: "Only products that work together, from your catalogue." },
        { title: "Complete the box", body: "The accessories that make it work on day one." },
      ]}
      relatedLinks={[
        { href: "/solutions/support", label: "Support automation" },
        { href: "/products/cart-recovery", label: "Cart recovery" },
        { href: "/products/roi-tracking", label: "Insights & ROI" },
      ]}
      faqs={[
        { q: "How do you avoid overpromising on compatibility?", a: "Answers come from your own specs. When it isn't sure, it asks or hands over." },
        { q: "We also sell on marketplaces. Does that matter?", a: "Aurevia runs on your own store and channels, using your Shopify data." },
        { q: "B2B or bulk quotes?", a: "It captures the lead and passes it to your team for account pricing." },
        { q: "Can it compare two products?", a: "Yes. It puts them side by side and says which one fits what the shopper told it." },
        { q: "Does it know what's in stock?", a: "Yes. It reads stock from Shopify, so it only suggests what you can ship." },
      ]}
    />
  );
}
