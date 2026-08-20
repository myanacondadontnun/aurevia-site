import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureCodeDemo } from "@/components/FeatureDemo";

const title = "Aurevia API & Webhooks for Developers | Integrations";
const desc =
  "REST, webhooks, and custom integrations: connect your ecommerce stack to Aurevia’s AI layer. For teams that need more than a default Shopify widget deployment.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "article" },
};

const demoLines = [
  "POST /webhooks/aurevia  HTTP/1.1",
  "",
  "{",
  '  "event": "lead.captured",',
  '  "conversation_id": "cnv_8f2a91",',
  '  "contact": { "email": "tom@northarc.co" },',
  '  "intent": "wholesale",',
  '  "cart_value": 4000,',
  '  "transcript_url": "https://…/cnv_8f2a91"',
  "}",
];

export default function ApiPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Custom API"
      headline={
        <>
          Wire Aurevia into <span className="green-highlight">your stack</span>
        </>
      }
      subtitle="Webhooks for every lead, escalation, and outcome. REST for everything else. Engineering gets a stable contract and clean payloads — marketing still gets a high-performing assistant on the storefront."
      heroBullets={[
        "Webhooks for leads, tickets & outcomes",
        "REST API with per-environment keys",
        "Payloads that map to your data model",
      ]}
      demo={
        <FeatureCodeDemo
          fileName="webhook — lead.captured"
          lines={demoLines}
          responseChip="200 OK · delivered in 84ms"
        />
      }
      proofStrip={[
        { label: "No mystery payloads", text: "Clear boundaries between store, conversation, and outcome events — documented with real examples." },
        { label: "Build on the same brain", text: "The intelligence merchants see in the dashboard is the same surface your systems consume." },
        { label: "Keys handled properly", text: "Per-environment access and rotation, the way you already run the rest of your commerce APIs." },
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
      testimonial={{
        quote:
          "Our dev team is small and stretched thin, so “just another integration” usually means it never ships. Aurevia's API docs were clean enough that we had a working proof of concept before our first coffee break.",
        name: "Diego Ferreira",
        role: "Lead Engineer",
        company: "Norr Studio",
      }}
    />
  );
}
