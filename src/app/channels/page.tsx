import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";

const title = "Messaging Channels — WhatsApp & Instagram | Aurevia";
const desc =
  "Aurevia answers your customers wherever they message you: on your store, on WhatsApp Business, and in Instagram DMs and comments. One AI agent, one inbox, your catalogue. WhatsApp and Instagram are in early access.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/channels" },
  openGraph: { title, description: desc, type: "website" },
};

const channels = [
  {
    name: "Your store",
    status: "Live",
    statusTone: "text-[#00CC99]",
    body:
      "The Aurevia widget sits on your storefront and answers shoppers while they browse — product questions, sizing, stock, delivery, order status — using your own catalogue and help content.",
  },
  {
    name: "WhatsApp Business",
    status: "Early access",
    statusTone: "text-muted-foreground",
    body:
      "Connect your own WhatsApp Business number and Aurevia answers the customers who message it. Replies use the same catalogue and knowledge base as your storefront agent, so a customer gets the same answer wherever they ask. Your team can take over any conversation from the Aurevia inbox at any time.",
  },
  {
    name: "Instagram",
    status: "Early access",
    statusTone: "text-muted-foreground",
    body:
      "Connect your Instagram professional account and Aurevia handles direct messages and comments on your posts. Straightforward questions get answered; anything negative or uncertain is queued for you to approve, edit or discard before it is posted.",
  },
];

const principles = [
  {
    heading: "Customers message you first",
    body:
      "Aurevia replies to conversations your customers start. We do not send marketing broadcasts and we do not message people who have not contacted you.",
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
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-10 sm:py-14">
          <Link
            href="/home"
            className="text-muted-foreground hover:text-[#00CC99] text-sm mb-8 inline-block transition-colors"
          >
            ← Back to home
          </Link>

          <div className="mb-12 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-foreground leading-tight mb-4">
              Answer customers <span className="green-highlight">wherever they message</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Shoppers ask the same questions on your storefront, on WhatsApp and in your Instagram DMs.
              Aurevia answers all three with one AI agent, one inbox and one source of truth — your
              product catalogue and your help content.
            </p>
          </div>

          <div className="space-y-6 mb-16">
            {channels.map((channel) => (
              <div
                key={channel.name}
                className="rounded-xl border border-border/50 bg-card/40 p-6 sm:p-8"
              >
                <div className="flex items-baseline justify-between gap-4 mb-3 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-fraunces font-normal text-foreground">
                    {channel.name}
                  </h2>
                  <span className={`text-xs uppercase tracking-wide ${channel.statusTone}`}>
                    {channel.status}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                  {channel.body}
                </p>
              </div>
            ))}
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
                  <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm font-light text-muted-foreground leading-relaxed mt-6">
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
            <p className="text-sm font-light text-muted-foreground leading-relaxed">
              Aurevia is operated by <strong className="font-normal text-foreground">Aurevia Artificial
              Intelligence Ltd</strong>, a private limited company registered in England and Wales,
              company number <strong className="font-normal text-foreground">16622049</strong>.
              Registered office: 2 North Road, Cardiff, Wales, CF10 3DY, United Kingdom.
            </p>
            <p className="text-sm font-light text-muted-foreground leading-relaxed mt-3">
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
