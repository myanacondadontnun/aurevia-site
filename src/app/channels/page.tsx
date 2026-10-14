import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import ChannelExplorer from "@/components/ChannelExplorer";

const title = "Channels — Shopify Store, WhatsApp, Instagram & Email | Aurevia";
const desc =
  "Aurevia answers your customers wherever they message you: on your Shopify store, on WhatsApp Business, in Instagram DMs and comments, and by email. One AI agent, one inbox, your catalogue.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/channels" },
  openGraph: { title, description: desc, type: "website" },
};

const principles = [
  {
    heading: "Customers message you first",
    body:
      "Aurevia replies to conversations your customers start. We do not send marketing broadcasts. The one exception is the cart reminder: a single message, by email or WhatsApp, sent only to shoppers who ticked the box asking for it, with a way to stop in every one.",
  },
  {
    heading: "Your data stays yours",
    body:
      "Messages and comments are used to answer that conversation for your store, and nothing else. We never use them for advertising, never sell them, and never mix one store's data with another's.",
  },
  {
    heading: "You stay in control",
    body:
      "Every conversation appears in your Aurevia dashboard. You choose which replies go out automatically, you can take over by hand, and you can disconnect a channel whenever you like — disconnecting removes our access to that account.",
  },
];

export default function ChannelsPage() {
  return (
    <PageLayout>
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-10 sm:py-14">
          <Link
            href="/"
            className="text-muted-foreground hover:text-[#00CC99] text-sm mb-8 inline-block transition-colors"
          >
            ← Back to home
          </Link>

          <div className="mb-12 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-foreground leading-tight mb-4">
              Answer customers <span className="green-highlight">wherever they message</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Shoppers ask the same questions on your storefront, on WhatsApp, in your Instagram DMs and
              by email. Aurevia answers all four with one AI agent, one inbox and one source of truth:
              your product catalogue and your help content.
            </p>
          </div>

          <div className="mb-16">
            <ChannelExplorer />
          </div>

          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-fraunces font-normal text-foreground mb-6">
              How we handle your customers&apos; messages
            </h2>
            <div className="space-y-6">
              {principles.map((item) => (
                <div key={item.heading}>
                  <h3 className="text-base sm:text-lg font-inter font-normal text-foreground mb-2">
                    {item.heading}
                  </h3>
                  <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm font-normal text-muted-foreground leading-relaxed mt-6">
              Full detail is in our{" "}
              <Link href="/privacy-policy" className="text-foreground hover:text-[#00CC99] transition-colors">
                Privacy Policy
              </Link>
              ,{" "}
              <Link href="/terms" className="text-foreground hover:text-[#00CC99] transition-colors">
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link href="/gdpr" className="text-foreground hover:text-[#00CC99] transition-colors">
                GDPR Compliance
              </Link>{" "}
              pages. To request deletion of data held for a connected account, email{" "}
              <a href="mailto:privacy@aurevia.io" className="text-foreground hover:text-[#00CC99] transition-colors">
                privacy@aurevia.io
              </a>
              .
            </p>
          </div>

          <div className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-inter font-normal text-foreground mb-3">
              About the business providing this service
            </h2>
            <p className="text-sm font-normal text-muted-foreground leading-relaxed">
              Aurevia is operated by <strong className="font-normal text-foreground">Aurevia Artificial
              Intelligence Ltd</strong>, a private limited company registered in England and Wales,
              company number <strong className="font-normal text-foreground">16622049</strong>.
              Registered office: 2 North Road, Cardiff, Wales, CF10 3DY, United Kingdom.
            </p>
            <p className="text-sm font-normal text-muted-foreground leading-relaxed mt-3">
              Enquiries:{" "}
              <a href="mailto:hello@aurevia.io" className="text-foreground hover:text-[#00CC99] transition-colors">
                hello@aurevia.io
              </a>{" "}
              ·{" "}
              <Link href="/contact" className="text-foreground hover:text-[#00CC99] transition-colors">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
