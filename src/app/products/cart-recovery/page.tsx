import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { getReview } from "@/lib/reviews";
import { InboxRecoveryDemo, WhatsAppRecoveryDemo } from "@/components/RecoveryDemos";

const title = "Cart Recovery for Shopify: In-Chat Nudges and Follow-Up Emails | Aurevia";
const desc =
  "Help hesitant shoppers while they're still on your store, then follow up abandoned carts by email in your own voice, with the exact items, quiet hours and frequency caps.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/cart-recovery" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/cart-recovery/" },
};

export default function CartRecoveryPage() {
  return (
    <FeatureSubpageLayout
      path="/products/cart-recovery"
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Cart recovery"
      headline={
        <>
          Win back the sale <span className="green-highlight">before and after they leave</span>
        </>
      }
      subtitle="In the chat, it nudges a cart that has gone quiet. After they leave, it emails the exact items in your voice, with a one-click way back."
      heroBullets={[
        "A chat nudge when a cart goes quiet",
        "Follow-up emails written in your voice",
        "Quiet hours, frequency caps and a minimum cart value",
      ]}
      demo={<InboxRecoveryDemo />}
      featureBlocks={[
        {
          visual: { kind: "email" },
          title: "Written by the agent, or by you",
          body: "Let Aurevia write the subject line and opening in your store's voice, following guidance you give it, or use your own templates. The product list, prices and total always come from the real cart.",
        },
        {
          visual: { kind: "rules" },
          title: "Limits you control",
          body: "A minimum cart value, a frequency cap in days, quiet hours in your time zone, and a one-click unsubscribe link on every email.",
        },
        {
          visual: { kind: "discount" },
          title: "Optional second email and discount",
          body: "Add a second email 1 to 72 hours later, and a discount code you can include in the first email or save for the second.",
        },
        {
          visual: { kind: "kpis", stats: [["Emailed", "31"], ["Replied", "6"], ["Recovered", "9"]] },
          title: "See what came back",
          body: "Abandoned, emailed, replied, recovered and recovered revenue, with every cart listed by status.",
        },
      ]}
      howItWorks={[
        { title: "A cart goes quiet", body: "It sits idle past your threshold with items still in it. If they're on the store, the agent nudges them in the chat. If they've left, it schedules the email." },
        { title: "The email goes out", body: "It's sent under your store's name from an Aurevia-hosted address, outside quiet hours, and never more often than your cap allows." },
        { title: "They reply or come back", body: "The agent answers replies in the same thread. A purchase closes the cart and counts as recovered revenue." },
      ]}
      relatedLinks={[
        { href: "/products/recommendations", label: "Product recommendations" },
        { href: "/help/cart-recovery-emails", label: "Set up cart recovery" },
        { href: "/products/roi-tracking", label: "Insights & ROI" },
      ]}
      faqs={[
        {
          q: "Does this replace my email or SMS flows?",
          a: "It replaces your abandoned-cart email. Everything else you run stays as it is. If you'd rather keep your existing flow, leave Aurevia's recovery switched off.",
        },
        {
          q: "Who gets emailed?",
          a: "Shoppers who gave an email in the chat, or who are signed in to your store, and who haven't opted out. The consent wording they saw is saved with each lead.",
        },
        {
          q: "Does it use my message quota?",
          a: "Only when the agent writes the email. Emails that use your own templates don't count, and if you run out of messages, recovery switches to your templates automatically.",
        },
      ]}
      secondDemo={{
        eyebrow: "On WhatsApp",
        title: "The same nudge, where they already chat",
        body: "Shoppers who tick the WhatsApp box in the chat get one short message from your own number, sent with the first email, showing what they left and a link back to the cart. If they reply, the agent answers in the same WhatsApp thread and your team can take over from the inbox.",
        demo: <WhatsAppRecoveryDemo />,
        points: ["Opt-in only, reply STOP to end", "Sent from your WhatsApp Business number", "Replies answered by the agent"],
      }}
      review={getReview("littleangel")}
      alsoSee={[
        { href: "/products/recommendations", title: "Recommendations", body: "Fewer carts get abandoned when the right product is in them." },
        { href: "/help/cart-recovery-emails", title: "Help: cart recovery", body: "Every setting explained." },
        { href: "/products/roi-tracking", title: "Insights & ROI", body: "Recovered revenue sits next to every other sale the agent helped with." },
      ]}
    />
  );
}
