import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "AI Chat for Growing Shopify Brands | Rules & Scale | Aurevia";
const desc =
  "More SKUs, more traffic, more channels—without losing your voice. Custom selling rules, brand governance, and revenue attribution for fast-scaling ecommerce teams.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function GrowingBusinessPage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      headline={
        <>
          Scale the strategy, <span className="green-highlight">not the chaos</span>
        </>
      }
      subtitle="The growing stage is when ‘we will fix that later’ becomes expensive: inconsistent answers, ad spend without feedback loops, and a team that is half in spreadsheets. Aurevia gives you governance in plain English—how hard to upsell, when to bundle, which topics route to people—and the analytics to prove it so marketing can keep buying traffic with a straight face."
      lede="This is for mid-market and ramping brands: enough monthly sessions that 1 point of CVR is real money, and enough people that the AI has to be coachable, not a black box."
      proofStrip={[
        { label: "Rules you can read", text: "Merchant instructions that match how your head of ecommerce actually runs promos and positioning." },
        { label: "Revenue, not noise", text: "ROI and analytics tie AI behavior to what finance cares about so budget conversations get easier." },
        { label: "Channel coordination", text: "Support the same product story you run on email and paid social—on-site." },
      ]}
      featureBlocks={[
        { title: "Custom selling playbooks", body: "Bundle logic, add-on rules, and ‘never lead with X’ policies without shipping new code for every test." },
        { title: "Attribution for grown-up budgets", body: "See how assisted sessions compare to holdouts; allocate spend to what works, not the loudest channel." },
        { title: "Multi-team alignment", body: "Give growth, product, and CX a shared read on intents and frictions from real chats." },
        { title: "Scale headcount with leverage", body: "Let humans do judgment calls; let the AI do volume that does not need a person." },
      ]}
      howItWorks={[
        { title: "Document what ‘good’ looks like", body: "Turn your best rep’s talk track into written rules the model can follow." },
        { title: "Roll out in cohorts", body: "Pilot new categories, regions, or campaigns with clear success metrics." },
        { title: "Tighten weekly", body: "Review analytics and fix the top 3 frictions; compound improvements beat one hero launch." },
      ]}
      media={{
        ariaLabel: "Custom selling instructions panel placeholder",
        caption: "Swap in: your “That’s not how I’d sell it” rules UI or screen recording",
        suggestedAsset: "A screen capture scrolling custom instructions: e.g. ask skin type first, do not open with premium, correct bad recs. Your brand mock is ideal.",
        kind: "video",
        aspect: "wide",
      }}
      relatedLinks={[
        { href: "/products/roi-tracking", label: "ROI tracking" },
        { href: "/solutions/enterprise", label: "Enterprise" },
        { href: "/solutions/conversion", label: "Conversion" },
      ]}
      faqs={[
        { q: "We already A/B the site. How does this add?", a: "You A/B a sales brain that can react to the specific doubt that heatmaps will not show. Many teams test both, not either-or." },
        { q: "What about brand compliance?", a: "Set tone, vocabulary, and prohibited claims so teams do not have to police every line manually in real time." },
        { q: "How do we onboard new hires faster?", a: "The AI does not replace training, but it stops new reps from being the only source of first answers while they ramp." },
      ]}
    />
  );
}
