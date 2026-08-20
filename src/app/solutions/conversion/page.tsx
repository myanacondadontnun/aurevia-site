import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Increase Ecommerce Conversion Rate with AI | Aurevia";
const desc =
  "Move stalled traffic to purchase: guided product discovery, cart nudges, and checkout in chat. Shopify AI built for CVR and AOV, not deflection only.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function ConversionPage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      headline={
        <>
          Turn traffic into <span className="green-highlight">revenue you can name</span>
        </>
      }
      subtitle="If your sessions look healthy but the cash register does not, the gap is often intent and confidence. Aurevia runs consultative sales in the same session: clarify what they need, show a tight shortlist, add to cart, and nudge them over the line—so conversion is not a hope left to your PDP copy alone."
      lede="This use case is for growth and ecommerce leads who are tired of “more traffic” with flat CVR. The lever is a sales-aware assistant that is allowed to do commerce, not a bot that is only allowed to say “contact us.”"
      proofStrip={[
        { label: "CVR and AOV", text: "Measure both: sometimes you win on rate, sometimes on basket size—Aurevia is built for both." },
        { label: "Less guesswork on merchandising", text: "Hear the questions people actually ask, then fix PDPs, bundles, and nudges with data." },
        { label: "Fits paid and organic", text: "Whether the click came from Meta or search, the experience after arrival decides if you get paid back." },
      ]}
      featureBlocks={[
        { title: "Pre-sales that asks before it pitches", body: "Quick replies and follow-ups that mirror how your best in-store rep would narrow options." },
        { title: "In-chat cart and checkout nudges", body: "Keep momentum: cart edits, free-shipping progress, and clear paths to pay in thread." },
        { title: "Bundle and upsell with guardrails", body: "Revenue logic you set—so cross-sell reads helpful, not desperate." },
        { title: "Attribution you can show internally", body: "Pair with ROI and analytics so the channel mix and site roadmap win together." },
      ]}
      howItWorks={[
        { title: "Clarify intent", body: "The AI captures goals, constraints, and doubt in a few turns." },
        { title: "Recommend with reasons", body: "Short, justified picks from your real catalog, not a random grid." },
        { title: "Close in-session", body: "Add to cart, resolve last objections, and hand off to checkout with trust cues." },
      ]}
      media={{
        ariaLabel: "Adaptive sales brain placeholder",
        caption: "Swap in: inputs to AI brain to outputs (recommend, bundle, nudge) still or motion",
        suggestedAsset: "Use your 'One adaptive sales brain' diagram: catalog, voice, rules in; recommendations and cart nudges out.",
        kind: "image",
        aspect: "wide",
      }}
      relatedLinks={[
        { href: "/products/recommendations", label: "Product recommendations" },
        { href: "/products/cart-recovery", label: "Cart recovery" },
        { href: "/products/roi-tracking", label: "ROI tracking" },
      ]}
      faqs={[
        { q: "We already run CRO on the site. Why chat?", a: "Because many questions never make it to a form—they die in hesitation. A consultative thread captures that intent the moment it appears." },
        { q: "How fast can we test impact?", a: "Ship a pilot, compare assisted sessions against holdouts, and read weekly; your dashboard and ROI views connect to real orders." },
        { q: "Is this one-size upsell spam?", a: "No. Merchants set tone and rules; the best programs sound like help, not pressure." },
      ]}
      testimonial={{
        quote:
          "We tested a dozen conversion tactics over the years. This is the first one where I can actually watch a hesitant browser turn into a completed order in the same chat window.",
        name: "Nate Kowalski",
        role: "Head of Growth",
        company: "Alder & Finch",
      }}
    />
  );
}
