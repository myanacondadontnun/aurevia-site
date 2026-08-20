import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

const title = "GDPR Compliance | Aurevia";
const desc = "How Aurevia meets UK and EU GDPR obligations, and how to exercise your data rights.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/gdpr" },
};

export default function GdprPage() {
  return (
    <LegalPageLayout
      title="GDPR Compliance"
      lastUpdated="20 August 2026"
      intro="Aurevia Artificial Intelligence Ltd is committed to the UK GDPR and EU GDPR. This page explains the roles we play, the rights you have, and how to exercise them. It should be read alongside our Privacy Policy."
      relatedLinks={[
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms & Conditions" },
        { href: "/contact", label: "Contact us" },
      ]}
      sections={[
        {
          heading: "1. Controller and processor roles",
          body: (
            <p>
              For a merchant&apos;s own account and billing data, Aurevia acts as a <strong>data controller</strong>.
              For the shopper and store data a merchant syncs to run the AI widget — catalog, order details,
              conversation content — Aurevia acts as a <strong>data processor</strong>, and the merchant is the
              controller responsible for their own customers&apos; data.
            </p>
          ),
        },
        {
          heading: "2. Legal basis for processing",
          body: (
            <ul>
              <li><strong>Contract:</strong> processing needed to provide the service a merchant subscribed to.</li>
              <li><strong>Legitimate interests:</strong> securing the service, preventing abuse, and improving the product, balanced against your rights.</li>
              <li><strong>Consent:</strong> for optional cookies or communications, where applicable.</li>
              <li><strong>Legal obligation:</strong> where we must retain or disclose data to comply with law.</li>
            </ul>
          ),
        },
        {
          heading: "3. Your rights under GDPR",
          body: (
            <ul>
              <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
              <li><strong>Rectification</strong> — correct inaccurate or incomplete data.</li>
              <li><strong>Erasure</strong> — request deletion, subject to legal or contractual retention needs.</li>
              <li><strong>Portability</strong> — receive your data in a portable format, where technically feasible.</li>
              <li><strong>Restriction</strong> — limit how we process your data in certain circumstances.</li>
              <li><strong>Objection</strong> — object to processing based on legitimate interests.</li>
              <li><strong>Withdraw consent</strong> — where processing relies on consent, at any time.</li>
            </ul>
          ),
        },
        {
          heading: "4. How to exercise your rights",
          body: (
            <p>
              Merchants can request account data changes or deletion directly from their dashboard, or by
              emailing <a href="mailto:privacy@aurevia.io">privacy@aurevia.io</a>. Shoppers who chatted with
              Aurevia on a merchant&apos;s store should first contact that merchant, since they control the
              underlying customer relationship — but you can also reach us directly and we&apos;ll forward the
              request. We respond within one month, as required by law.
            </p>
          ),
        },
        {
          heading: "5. Data Processing Agreement",
          body: (
            <p>
              Merchants who need a signed Data Processing Agreement (DPA) for their own compliance review can
              request one through our <a href="/contact">contact form</a> or by emailing{" "}
              <a href="mailto:privacy@aurevia.io">privacy@aurevia.io</a>.
            </p>
          ),
        },
        {
          heading: "6. Sub-processors",
          body: (
            <p>
              We use a limited set of sub-processors for hosting, database, AI model inference, and email
              delivery, each bound by data processing terms consistent with GDPR. A current list is available on
              request.
            </p>
          ),
        },
        {
          heading: "7. International transfers",
          body: (
            <p>
              Where personal data is transferred outside the UK or EEA — for example to a hosting or AI
              provider — we use Standard Contractual Clauses or an equivalent legally recognized safeguard.
            </p>
          ),
        },
        {
          heading: "8. Data breach notification",
          body: (
            <p>
              If a personal data breach occurs that&apos;s likely to result in a risk to your rights, we&apos;ll
              notify the relevant supervisory authority within 72 hours where required, and notify affected
              merchants without undue delay.
            </p>
          ),
        },
        {
          heading: "9. Supervisory authority",
          body: (
            <p>
              If you&apos;re unhappy with how we&apos;ve handled your data, you can lodge a complaint with your
              local data protection authority — in the UK, the{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
                Information Commissioner&apos;s Office (ICO)
              </a>
              .
            </p>
          ),
        },
        {
          heading: "10. Contact our data protection contact",
          body: (
            <p>
              <a href="mailto:privacy@aurevia.io">privacy@aurevia.io</a> — Aurevia Artificial Intelligence Ltd.
            </p>
          ),
        },
      ]}
    />
  );
}
