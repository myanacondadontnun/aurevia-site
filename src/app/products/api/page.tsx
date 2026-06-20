import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";

const title = "Aurevia API & Webhooks for Developers | Integrations";
const desc =
  "REST, webhooks, and custom integrations: connect your ecommerce stack to Aurevia’s AI layer. For teams that need more than a default Shopify widget deployment.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

export default function ApiPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      headline={
        <>
          Wire Aurevia to <span className="green-highlight">your</span> stack
        </>
      }
      subtitle="The Shopify app is the default path, but your operations may not stop at a single store view. The API and webhook surface is for teams that need reliable events, back-office sync, and custom workflows—so engineering can trust the plumbing while marketing still gets a high-performing assistant on the site."
      lede="Use this when you already run a CDP, custom CRM, or in-house data warehouse, or when you are piloting non-standard storefronts and need a stable contract for what “conversation and outcome” means in your system."
      proofStrip={[
        { label: "Integrator-friendly", text: "Clear boundaries: store, conversation, and outcome events without mystery payloads." },
        { label: "Extensible", text: "Build on top of the same product intelligence merchants see in the dashboard." },
        { label: "Security-minded", text: "Treat keys and per-environment access the way you already do for the rest of your commerce APIs." },
      ]}
      featureBlocks={[
        {
          title: "Event-driven",
          body: "React to new leads, escalations, and outcomes in the tools your team already monitors.",
        },
        {
          title: "Fits the enterprise timeline",
          body: "Security review, staging, and rollout fit orgs that cannot flip a single production switch in an afternoon—without blocking the first Shopify pilot.",
        },
        {
          title: "Complements, not rewrites, your data model",
          body: "Map conversations and customer IDs to how you store identity today instead of a parallel system nobody trusts.",
        },
        {
          title: "Path for advanced deployments",
          body: "If your roadmap includes custom storefronts or multi-system orchestration, start the technical conversation with what you need in scope.",
        },
      ]}
      howItWorks={[
        { title: "Define the integration", body: "Align on which events, objects, and SLAs you need in dev and prod." },
        { title: "Connect securely", body: "Issue keys, test in staging, and validate with your security checklist." },
        { title: "Go live in phases", body: "Pilot a cohort, then expand; watch logs and business metrics in parallel." },
      ]}
      media={{
        ariaLabel: "Architecture diagram or API documentation placeholder",
        caption: "Swap in: diagram of Store → Aurevia → CRM/warehouse, or a docs page screenshot",
        suggestedAsset: "A simple one-slide diagram: webhooks to your queue, optional REST to enrich sessions, and read-only links to your docs site.",
        kind: "image",
        aspect: "wide",
      }}
      relatedLinks={[
        { href: "/resources/docs", label: "Documentation" },
        { href: "/solutions/enterprise", label: "Enterprise" },
        { href: "/products/shopify", label: "Shopify app" },
      ]}
      faqs={[
        {
          q: "Is there a public Postman or OpenAPI spec?",
          a: "See the documentation index for the latest public artifacts; enterprise engagements may include expanded examples under NDA if needed.",
        },
        {
          q: "Do you support custom storefronts?",
          a: "Work with our team on the contract between your product catalog and the AI; many paths are possible, but the source of product truth must stay reliable.",
        },
        {
          q: "What about rate limits?",
          a: "High-volume orgs get guidance aligned to real chat throughput and your batch jobs—tune with us before launch day.",
        },
      ]}
    />
  );
}
