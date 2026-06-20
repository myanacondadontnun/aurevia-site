import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Enterprise Ecommerce AI & Integrations | Aurevia";
const desc =
  "High-volume Shopify brands: security review–friendly rollout, custom integrations, and operational process. AI sales and support with the rigor your org expects.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function EnterprisePage() {
  return (
    <FeatureSubpageLayout
      backHref="/solutions"
      backLabel="← Back to Solutions"
      headline={
        <>
          The same <span className="green-highlight">revenue</span> story, enterprise-grade
        </>
      }
      subtitle="At volume, a storefront assistant has to pass legal, security, and data reviews—not just a marketing demo. This path is for teams that need staged rollouts, integration contracts, and alignment between ecommerce, customer experience, and IT. Aurevia’s Shopify-native core is the pilot; the API and process layer is how you make it last."
      lede="Pair this with the API and documentation resources when you are ready. The goal is not a science fair project—it is a governed path from pilot cohort to org-wide, with a shared definition of what ‘AI influenced’ means in your reports."
      proofStrip={[
        { label: "Process, not a weekend hack", text: "Staging, sign-off, and success criteria the CFO and CISO can recognize." },
        { label: "Your identity and data model", text: "Webhooks and APIs map to the CRM and data warehouse you already fund." },
        { label: "Runbooks for humans", text: "Escalation, audit, and training so frontline teams are not left improvising on day thirty." },
      ]}
      featureBlocks={[
        { title: "Integration-first mindset", body: "Connect the conversation and outcome events the rest of the business already monitors." },
        { title: "Scale without re-platforming", body: "Keep Shopify as the commerce core while you orchestrate the AI layer to match your change windows." },
        { title: "Region and policy complexity", body: "Multi-brand or multi-geo teams get structure around what can be said where." },
        { title: "Partner-friendly", body: "Give agencies and SIs a contract they can implement against, not a black box." },
      ]}
      howItWorks={[
        { title: "Scope the pilot", body: "Pick categories, geos, or traffic slices with a clear success plan." },
        { title: "Security and legal alignment", body: "Work through reviews with documentation and the controls you need on paper." },
        { title: "Expand with evidence", body: "Scale traffic and use cases on outcomes, not enthusiasm alone." },
      ]}
      media={{
        ariaLabel: "Trust compliance or RFP one-pager placeholder",
        caption: "Swap in: security checklist, logo wall, or slide cover for RFP",
        suggestedAsset: "A single executive-friendly visual: checkmarks for GDPR readiness, data handling, SSO/roadmap, support SLAs—whatever your sales team needs as a static PDF hero.",
        kind: "image",
        aspect: "wide",
      }}
      relatedLinks={[
        { href: "/products/api", label: "Custom API" },
        { href: "/resources/docs", label: "Documentation" },
        { href: "/solutions/growing-business", label: "Growing business" },
      ]}
      faqs={[
        { q: "Do you sign DPAs and security questionnaires?", a: "Enterprise review packages are handled with your team; we approach them as standard for brands at scale, not a one-off favor." },
        { q: "What about non-Shopify front ends?", a: "Talk to us about your product catalog and identity model; the goal is a reliable connection between truth and the AI, whatever your stack is piloting." },
        { q: "How do we govern model behavior in regulated categories?", a: "Layer merchant rules, claims restrictions, and human escalation to match the categories you are responsible for in-market." },
      ]}
    />
  );
}
