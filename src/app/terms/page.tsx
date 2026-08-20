import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

const title = "Terms & Conditions | Aurevia";
const desc = "The terms that govern use of Aurevia's AI sales and support assistant for Shopify.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="20 August 2026"
      intro="These terms govern your use of Aurevia, an AI sales and support assistant for Shopify stores, provided by Aurevia Artificial Intelligence Ltd. By installing or using Aurevia, you agree to them."
      relatedLinks={[
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/gdpr", label: "GDPR Compliance" },
        { href: "/pricing", label: "Pricing" },
      ]}
      sections={[
        {
          heading: "1. The service",
          body: (
            <p>
              Aurevia is a Shopify App Store application that adds an AI-powered chat widget to a merchant&apos;s
              storefront, along with a merchant-facing dashboard for configuration, analytics, and revenue
              attribution. We may add, change, or retire features over time as the product evolves.
            </p>
          ),
        },
        {
          heading: "2. Eligibility and accounts",
          body: (
            <p>
              You must be an authorized representative of a Shopify store to install Aurevia. You&apos;re
              responsible for keeping your account credentials secure and for all activity under your account,
              including configuration choices that affect what the AI says to your customers.
            </p>
          ),
        },
        {
          heading: "3. Billing",
          body: (
            <p>
              Subscriptions are billed through the Shopify Billing API on the plan you select. Prices are shown
              on our <a href="/pricing">pricing page</a> and may change with notice; continued use after a price
              change constitutes acceptance. Cancelling or uninstalling stops future billing but doesn&apos;t
              refund charges already incurred, except where required by law or Shopify&apos;s billing policies.
            </p>
          ),
        },
        {
          heading: "4. Acceptable use",
          body: (
            <ul>
              <li>Don&apos;t use Aurevia to deceive customers, make false claims about products, or violate consumer protection law.</li>
              <li>Don&apos;t attempt to reverse-engineer, scrape, or overload the service outside normal use.</li>
              <li>Don&apos;t upload content you don&apos;t have rights to into the knowledge base or brand configuration.</li>
              <li>Don&apos;t use the service to process categories of data (e.g. health or financial account details) beyond what your Shopify store ordinarily handles, without telling us first.</li>
            </ul>
          ),
        },
        {
          heading: "5. AI-generated responses",
          body: (
            <p>
              Aurevia&apos;s AI answers are generated based on the catalog, policies, and rules a merchant
              provides. We work to keep responses accurate and grounded in that data, but AI systems can make
              mistakes. Merchants are responsible for reviewing their configuration and knowledge base, and for
              how the AI represents their brand, pricing, and policies to customers.
            </p>
          ),
        },
        {
          heading: "6. Intellectual property",
          body: (
            <p>
              Aurevia and its underlying technology remain our property. Merchants retain ownership of their own
              store data, catalog, and brand content, and grant us a license to process it solely to provide the
              service.
            </p>
          ),
        },
        {
          heading: "7. Third-party services",
          body: (
            <p>
              Aurevia integrates with Shopify and other third-party providers (see our{" "}
              <a href="/privacy-policy">Privacy Policy</a> for subprocessors). We&apos;re not responsible for the
              availability or acts of those third parties, though we choose them carefully.
            </p>
          ),
        },
        {
          heading: "8. Disclaimers and limitation of liability",
          body: (
            <p>
              Aurevia is provided “as is.” To the extent permitted by law, we disclaim implied warranties of
              merchantability or fitness for a particular purpose, and our aggregate liability for any claim is
              limited to the amount you paid us in the 12 months before the claim arose. Nothing here limits
              liability where the law doesn&apos;t allow it — for example, for fraud or death or personal injury
              caused by negligence.
            </p>
          ),
        },
        {
          heading: "9. Termination",
          body: (
            <p>
              Either party may terminate by uninstalling the app or discontinuing the service. We may suspend or
              terminate access for material breach of these terms, non-payment, or activity that puts the
              service or other merchants at risk.
            </p>
          ),
        },
        {
          heading: "10. Governing law",
          body: (
            <p>
              These terms are governed by the laws of England and Wales, and any dispute will be handled by the
              courts of England and Wales, without prejudice to any mandatory consumer protections in your home
              jurisdiction.
            </p>
          ),
        },
        {
          heading: "11. Changes to these terms",
          body: (
            <p>
              We&apos;ll post updates here with a new “last updated” date, and notify merchants directly of
              material changes.
            </p>
          ),
        },
        {
          heading: "12. Contact",
          body: (
            <p>
              Questions about these terms: <a href="mailto:sales@aurevia.io">sales@aurevia.io</a> or our{" "}
              <a href="/contact">contact form</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
