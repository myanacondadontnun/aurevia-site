import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";

const title = "AI Chat for Fashion & Apparel on Shopify | Aurevia";
const desc =
  "Size, fit and style answered in the chat. Fewer returns, more full-price sales and complete looks, from an AI sales agent built for fashion stores.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/solutions/fashion" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/solutions/fashion/" },
};


export default function FashionPage() {
  return (
    <FeatureSubpageLayout
      path="/solutions/fashion"
      breadcrumbLabel="Fashion & apparel"
      backHref="/solutions"
      backLabel="← Back to Solutions"
      heroVisual={{
        src: "/images/fashion-apparel.webp",
        alt: "Fashion retail environment representing apparel ecommerce",
        chat: { ask: "Something for a summer wedding, under $200?", question: "Lovely! Will it be outdoors, and do you prefer midi or maxi?", answer: "Outdoors, midi please.", pitch: "The Linen Midi is light enough for a summer day:", product: { name: "Linen Midi Dress", price: "$168.00", img: "/images/site/fashion-linen-dress.png" } },
      }}
      headline={
        <>
          Fit and style, <span className="green-highlight">before the return label</span>
        </>
      }
      subtitle="Fashion shoppers aren't short on options. They're short on confidence. Aurevia asks about fit, occasion and budget, then shows a few looks they can add to the cart."
      challenges={[
        { title: "Sizing doubt", problem: "Shoppers can't tell if it runs small, so they leave or order two sizes.", fix: "The agent answers from your size guide and fit notes, and recommends one size with a reason." },
        { title: "Return anxiety", problem: "Unclear return terms stop people at checkout.", fix: "Your returns policy, explained in plain words the moment they ask." },
        { title: "Launch-day rush", problem: "Drops and sales flood your inbox with the same questions.", fix: "The agent handles the repeats, so your team only sees what needs a person." },
      ]}
      beforeAfter={[
        { without: "Shoppers guess their size", with: "Size advice from your own guide" },
        { without: "Product questions wait for email", with: "Answers in seconds, at any hour" },
        { without: "Browsers scroll the whole collection", with: "A short list picked for the occasion" },
        { without: "One item per order", with: "Pieces that complete the look" },
        { without: "Abandoned carts go quiet", with: "A nudge in the chat, then a follow-up email" },
        { without: "You don't know what shoppers ask", with: "Every question in your dashboard" },
      ]}
      fit={{
        good: ["Sell clothing, shoes or accessories on Shopify", "Get the same sizing and fit questions every day", "Want fewer returns without discounting"],
        notYet: ["Don't have size guides or product details written down yet", "Sell mostly through marketplaces rather than your own store"],
      }}
      review={getReview("masks-capes")}
      featureBand={{ src: "/images/site/store-fashion.webp", alt: "A rail of linen dresses in a sunlit studio", position: "50% 60%" }}
      featureBlocks={[
        { visual: { kind: "ask" }, title: "How it asks", body: "Fit, occasion and climate first, so every pick has a reason." },
        { visual: { kind: "products", items: [{ name: "Linen Midi Dress", price: "$168", img: "/images/site/fashion-linen-dress.png" }, { name: "Silk Slip Dress", price: "$189", img: "/images/site/fashion-silk-dress.webp" }] }, title: "How it recommends", body: "One to four pieces from your catalogue, each with a clear why." },
        { visual: { kind: "upsell", items: [{ name: "Linen Midi Dress", price: "$168", img: "/images/site/fashion-linen-dress.png" }, { name: "Crossbody Bag", price: "$68", img: "/images/demo/lv/crossbody-bag.webp" }] }, title: "Upsell and cross-sell", body: "Pieces that complete the look, within the rules you set." },
        { visual: { kind: "answer" }, title: "Sizing answers, fewer returns", body: "Size guides and materials answered before doubt turns into a return." },
      ]}
      howItWorks={[
        { title: "Learn the occasion", body: "Office, wedding or weekend, asked before it pitches." },
        { title: "Match from stock", body: "Only what you can ship." },
        { title: "Complete the look", body: "Accessories when they help, never in the way." },
      ]}
      relatedLinks={[
        { href: "/solutions/conversion", label: "Conversion" },
        { href: "/products/recommendations", label: "Recommendations" },
      ]}
      faqs={[
        { q: "Can it follow our size chart?", a: "Yes. It answers from your own size guides and fit notes." },
        { q: "Fast fashion or premium?", a: "You set the tone and how hard it sells, so it sounds like your brand." },
        { q: "Multi-currency and global shipping?", a: "It explains the markets and shipping options you've set up." },
        { q: "Can it check live stock for a size?", a: "Yes. It reads stock from Shopify, so it won't suggest a size you've sold out of." },
        { q: "Does it recover abandoned carts?", a: "Yes, with a nudge in the chat and a follow-up email, plus WhatsApp if you connect it." },
      ]}
    />
  );
}
