import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "AI Sales Chat for Small Shopify Stores | Aurevia";
const desc =
  "One lean tool: consultative sales, support, and setup in a single day. For founders and small teams who cannot hire a 24/7 floor staff—Shopify AI that sells.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function SmallBusinessPage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      headline={
        <>
          Your first <span className="green-highlight">always-on</span> sales rep
        </>
      }
      subtitle="If you are a founder-led brand, you already wear merchandising, ads, and DMs. Aurevia is the one surface that answers the front door, sells when you are in production, and keeps basic support from eating your night. No enterprise procurement deck required—just install, tune your voice, and get back to making the product."
      lede="This path is for catalogs that are not infinite yet, but the questions still are. You are not looking for a science project; you are looking for conversion you can see in Shopify and time back on the calendar."
      proofStrip={[
        { label: "Hours, not months", text: "Go from App Store to first live assist without a dev sprint." },
        { label: "All-in-one thread", text: "Sales and pre/post support share one place so you are not context-switching across five inboxes." },
        { label: "Room to grow", text: "When you add SKUs, languages, and headcount, the same foundation scales with you." },
      ]}
      featureBlocks={[
        { title: "Sell while you run the business", body: "Discovery, cart nudges, and checkout nudges run without you re-typing the same answer in DMs." },
        { title: "Fewer “is this in stock” interruptions", body: "Ground answers in the catalog and policies you already maintain." },
        { title: "A fair shot at AOV", body: "Bundling and add-ons in chat without building a new discounts matrix every week by hand." },
        { title: "Honest about what you can maintain", body: "Start with strong defaults, add custom rules as you see repeat behavior." },
      ]}
      howItWorks={[
        { title: "Install the Shopify app", body: "Connect your store and set brand basics in one session." },
        { title: "Write like you talk", body: "Plain-English rules so the bot sells the way you would." },
        { title: "Check numbers weekly", body: "Use the dashboard to see if time saved and extra revenue justify the next step." },
      ]}
      media={{
        ariaLabel: "Founder storyboard or testimonial placeholder",
        caption: "Swap in: 3 frames—install, first sale, week-one stat—or a short founder video",
        suggestedAsset: "A simple three-panel still: “Day 0 install → first assisted cart → 7-day snapshot”—or a 30s phone selfie placeholder for a future case study clip.",
        kind: "video",
        aspect: "wide",
      }}
      relatedLinks={[
        { href: "/products/shopify", label: "Shopify app" },
        { href: "/solutions/growing-business", label: "Growing business" },
        { href: "/pricing", label: "Pricing" },
      ]}
      faqs={[
        { q: "We only have a few hundred sessions a week. Is it worth it?", a: "Yes—early-stage is when every conversion counts double. A single recovered cart or upsell can pay for the cost of a light tool if your margins are healthy." },
        { q: "Do I need a developer?", a: "The default path is no-code. Bring devs only if you want custom integrations later." },
        { q: "What if I already answer DMs on Instagram?", a: "Aurevia handles the on-site experience where the purchase happens; you can still run social the way you prefer." },
      ]}
    />
  );
}
