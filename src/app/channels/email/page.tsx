import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { EmailReplyDemo, InboxRecoveryDemo } from "@/components/RecoveryDemos";
import { getReview } from "@/lib/reviews";

const title = "Email for Shopify: Cart Recovery, Answers and Checkout Links | Aurevia";
const desc =
  "Aurevia emails shoppers who left a cart, answers their replies in the same thread with a checkout link ready, and handles support email in one inbox.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/channels/email" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/channels/email/" },
};

export default function EmailChannelPage() {
  return (
    <FeatureSubpageLayout
      path="/channels/email"
      backHref="/channels"
      backLabel="← Back to Channels"
      eyebrow="Email"
      headline={
        <>
          Emails that <span className="green-highlight">bring the cart back</span>
        </>
      }
      subtitle="Every store gets its own Aurevia email address. Cart-recovery emails go out from it under your store's name, shoppers reply, and the agent answers in the same thread with a checkout link ready. Support email lands in the same inbox for your team."
      demo={<InboxRecoveryDemo />}
      featureBlocks={[
        { visual: { kind: "email" }, title: "Recovers abandoned carts", body: "A follow-up in your voice with the exact items, prices and a one-click way back to the cart." },
        { visual: { kind: "emailReply" }, title: "Answers questions", body: "Shoppers reply with a question and the agent answers in the same thread, from your catalogue and policies." },
        { visual: { kind: "checkoutLink" }, title: "Sends checkout links", body: "Every answer can carry the shopper's saved cart, so buying is one click from the email." },
        { visual: { kind: "ticket" }, title: "Handles support email", body: "Order questions, returns and delivery queries land in one inbox, answered or passed to your team." },
        { visual: { kind: "forward" }, title: "Forwards to your mailbox", body: "Forward the Aurevia address to your own mailbox and keep a copy of everything." },
        { visual: { kind: "rules" }, title: "Respects your rules", body: "Quiet hours, frequency caps, a minimum cart value and one-click unsubscribe on every email." },
      ]}
      howItWorks={[
        { title: "Turn on recovery", body: "Choose the delay, from ten minutes to a day, and whether the agent writes the copy or uses your template." },
        { title: "The email goes out", body: "Under your store's name, outside quiet hours, never more often than your cap allows." },
        { title: "Replies come back", body: "The agent answers in the thread, and purchases show up as recovered revenue." },
      ]}
      secondDemo={{
        eyebrow: "In the thread",
        title: "A question in the reply, answered in the reply",
        body: "When a shopper writes back, they get a real answer in the same thread, with their cart still saved and a link straight back to it. Nothing goes to a no-reply address.",
        demo: <EmailReplyDemo />,
        points: ["Answers from your catalogue", "Cart still attached", "Your team can step in"],
      }}
      relatedLinks={[]}
      faqs={[
        { q: "Do I need my own email provider?", a: "No. Aurevia hosts an address for your store. You can forward it to your own mailbox." },
        { q: "Who gets the recovery email?", a: "Shoppers who gave an email in the chat or are signed in to your store, and who haven't opted out." },
      ]}
      review={getReview("littleangel")}
      alsoSee={[
        { href: "/channels/store", title: "Store chat", body: "Recommends, answers and adds to the cart on every page." },
        { href: "/channels/whatsapp", title: "WhatsApp", body: "Support, products, checkout links and cart reminders." },
        { href: "/channels/instagram", title: "Instagram", body: "DMs, story replies and comments, handled for you." }
      ]}
    />
  );
}
