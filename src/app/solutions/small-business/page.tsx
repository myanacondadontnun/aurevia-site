import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";

const title = "AI Sales Chat for Small Shopify Stores | Aurevia";
const desc =
  "One lean tool: consultative sales, support, and setup in a single day. For founders and small teams who can't staff a shop floor around the clock: Shopify AI that sells.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/solutions/small-business" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/solutions/small-business/" },
};

export default function SmallBusinessPage() {
  return (
    <FeatureSubpageLayout
      path="/solutions/small-business"
      breadcrumbLabel="Small business"
      backHref="/solutions"
      backLabel="← Back to Solutions"
      headline={
        <>
          Your first <span className="green-highlight">always-on</span> sales rep
        </>
      }
      subtitle="If you are a founder-led brand, you already wear merchandising, ads, and DMs. Aurevia is the one surface that answers the front door, sells when you are in production, and keeps basic support from eating your night. No enterprise procurement needed. Install it, tune your voice and get back to making the product."
      lede="This path is for catalogs that are not infinite yet, but the questions still are. You are not looking for a science project; you are looking for conversion you can see in Shopify and time back on the calendar."
      featureBlocks={[
        { visual: { kind: "live" }, title: "Sell while you run the business", body: "Discovery, cart nudges, and checkout nudges run without you re-typing the same answer in DMs." },
        { visual: { kind: "answer", q: "Is the blouse in stock in M?", a: "Yes, M is in stock and ready to ship.", source: "Live stock from Shopify" }, title: "Fewer “is this in stock” interruptions", body: "Ground answers in the catalogue and policies you already maintain." },
        { visual: { kind: "upsell" }, title: "A fair shot at AOV", body: "Bundling and add-ons in chat without building a new discounts matrix every week by hand." },
        { visual: { kind: "knowledge" }, title: "Honest about what you can maintain", body: "Start with strong defaults, add custom rules as you see repeat behaviour." },
      ]}
      howItWorks={[
        { title: "Install the Shopify app", body: "Connect your store and set brand basics in one session." },
        { title: "Write like you talk", body: "Plain-English rules so the bot sells the way you would." },
        { title: "Check numbers weekly", body: "Use the dashboard to see if time saved and extra revenue justify the next step." },
      ]}
      relatedLinks={[
        { href: "/products/shopify", label: "Shopify app" },
        { href: "/solutions/growing-business", label: "Growing business" },
        { href: "/pricing", label: "Pricing" },
      ]}
      faqs={[
        { q: "We only have a few hundred sessions a week. Is it worth it?", a: "Yes. Early on, every conversion counts double. A single recovered cart or upsell can pay for the cost of a light tool if your margins are healthy." },
        { q: "Do I need a developer?", a: "The default path is no-code. Bring devs only if you want custom integrations later." },
        { q: "What if I already answer DMs on Instagram?", a: "Connect Instagram in Settings → Channels and the same agent answers DMs and moderates comments. You can keep handling social yourself until you are ready." },
      ]}
      review={getReview("chawla")}
    />
  );
}
