import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

const title = "Privacy Policy | Aurevia";
const desc = "How Aurevia Artificial Intelligence Ltd collects, uses, and protects your data.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="20 August 2026"
      intro="Aurevia Artificial Intelligence Ltd (“Aurevia”, “we”, “us”) builds an AI sales and support assistant for Shopify merchants. This policy explains what we collect, why, and the choices you have — whether you're a merchant using Aurevia or a shopper chatting with it on a merchant's storefront."
      relatedLinks={[
        { href: "/terms", label: "Terms & Conditions" },
        { href: "/gdpr", label: "GDPR Compliance" },
        { href: "/contact", label: "Contact us" },
      ]}
      sections={[
        {
          heading: "1. Who this applies to",
          body: (
            <p>
              This policy covers two groups: <strong>merchants</strong> who install Aurevia from the Shopify
              App Store and configure it on their store, and <strong>shoppers</strong> who interact with the
              Aurevia chat widget on a merchant&apos;s storefront. Where the two are treated differently, we say
              so explicitly.
            </p>
          ),
        },
        {
          heading: "2. What we collect",
          body: (
            <>
              <p>
                <strong>From merchants:</strong> account and billing details provided through the Shopify App
                Store, store and product data synced via the Shopify API (catalog, collections, discounts,
                policies, order and customer records needed to answer shopper questions), and configuration you
                set (tone of voice, business rules, knowledge base content).
              </p>
              <p>
                <strong>From shoppers:</strong> the messages sent to the chat widget, any contact details
                volunteered in a conversation (such as an email address for a quote or lead capture), and basic
                technical data (IP address, browser, device type, and pages viewed) needed to run the widget and
                keep it secure.
              </p>
              <p>
                <strong>Cookies and similar technology:</strong> we use a small number of cookies and local
                storage entries to keep a chat session connected across page loads and to remember basic
                preferences. We do not use these for cross-site ad tracking.
              </p>
            </>
          ),
        },
        {
          heading: "3. How we use it",
          body: (
            <ul>
              <li>To operate the chat widget: answering questions, recommending products, and assisting checkout using the merchant&apos;s live catalog and policies.</li>
              <li>To generate the analytics, ROI attribution, and dashboard views merchants see for their own store.</li>
              <li>To secure the service, prevent abuse, and debug issues when something breaks.</li>
              <li>To communicate with merchants about their account, billing, and material changes to the service.</li>
              <li>To improve Aurevia&apos;s underlying models and features, using aggregated or de-identified conversation data wherever practical.</li>
            </ul>
          ),
        },
        {
          heading: "4. AI processing and subprocessors",
          body: (
            <p>
              Aurevia generates chat responses using large language model providers under contract, who process
              conversation content solely to return a response and do not use merchant or shopper data to train
              their own models outside that agreement. We also rely on infrastructure and analytics
              subprocessors (cloud hosting, database, and email delivery providers) strictly to run the service.
              A current subprocessor list is available on request at{" "}
              <a href="mailto:privacy@aurevia.io">privacy@aurevia.io</a>.
            </p>
          ),
        },
        {
          heading: "5. Data sharing",
          body: (
            <p>
              We don&apos;t sell personal data. We share it only with the subprocessors above, with Shopify as
              required for the app to function, when required by law or a valid legal request, or with a
              merchant&apos;s explicit instruction (for example, exporting captured leads to their CRM).
            </p>
          ),
        },
        {
          heading: "6. Data retention",
          body: (
            <p>
              Conversation transcripts and store data are retained for as long as a merchant&apos;s account is
              active, plus a limited period afterward to allow reinstatement and meet accounting obligations.
              Merchants can request earlier deletion at any time; see{" "}
              <a href="/gdpr">our GDPR page</a> for how.
            </p>
          ),
        },
        {
          heading: "7. Your rights",
          body: (
            <p>
              Depending on where you&apos;re located, you may have the right to access, correct, export, or
              delete your personal data, and to object to or restrict certain processing. See{" "}
              <a href="/gdpr">GDPR Compliance</a> for the full list and how to exercise them. Shoppers who want
              their chat data removed should contact the merchant&apos;s store directly, or reach us at{" "}
              <a href="mailto:privacy@aurevia.io">privacy@aurevia.io</a> and we&apos;ll route the request.
            </p>
          ),
        },
        {
          heading: "8. International transfers",
          body: (
            <p>
              Aurevia and its subprocessors may process data outside your country, including in the UK, EU, and
              US. Where that involves transferring personal data out of the UK or EEA, we rely on Standard
              Contractual Clauses or an equivalent safeguard.
            </p>
          ),
        },
        {
          heading: "9. Children's privacy",
          body: (
            <p>
              Aurevia is a business tool for Shopify merchants and is not directed at children. We don&apos;t
              knowingly collect personal data from children under 16.
            </p>
          ),
        },
        {
          heading: "10. Changes to this policy",
          body: (
            <p>
              We&apos;ll update the date at the top of this page when this policy changes, and notify merchants
              directly for material changes.
            </p>
          ),
        },
        {
          heading: "11. Contact",
          body: (
            <p>
              Questions or requests: <a href="mailto:privacy@aurevia.io">privacy@aurevia.io</a>, or use our{" "}
              <a href="/contact">contact form</a>. Aurevia Artificial Intelligence Ltd.
            </p>
          ),
        },
      ]}
    />
  );
}
