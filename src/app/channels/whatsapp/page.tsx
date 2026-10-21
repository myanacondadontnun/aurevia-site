import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import ChannelPrinciples from "@/components/channels/ChannelPrinciples";
import { ShopChatDemo, WhatsAppRecoveryDemo } from "@/components/RecoveryDemos";
import { getReview } from "@/lib/reviews";

const title = "WhatsApp for Shopify: Support, Products and Checkout Links | Aurevia";
const desc =
  "Connect your WhatsApp Business number and Aurevia answers customers, shows products, builds the cart, sends a checkout link and nudges shoppers who left a cart.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/channels/whatsapp" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/channels/whatsapp/" },
};

export default function WhatsAppChannelPage() {
  return (
    <FeatureSubpageLayout
      path="/channels/whatsapp"
      backHref="/channels"
      backLabel="← Back to Channels"
      eyebrow="WhatsApp"
      headline={
        <>
          Sell and support <span className="green-highlight">on WhatsApp</span>
        </>
      }
      subtitle="Connect your own WhatsApp Business number and the agent answers the customers who message it. It answers questions, shows products, builds the cart and sends a checkout link, and it nudges shoppers who left a cart behind."
      demo={<ShopChatDemo theme="whatsapp" />}
      featureBlocks={[
        { visual: { kind: "answer" }, title: "Answers questions", body: "Product, sizing, stock and delivery questions, from the same catalogue and knowledge base as your store chat." },
        { visual: { kind: "products" }, title: "Shows products", body: "Product cards with the photo, size and price, right in the conversation." },
        { visual: { kind: "checkoutLink" }, title: "Adds to the cart and sends a checkout link", body: "The agent builds the cart and sends a link that opens checkout with everything in it." },
        { visual: { kind: "nudge" }, title: "Recovers abandoned carts", body: "Shoppers who opt in get one short message with what they left and a link back to the cart." },
        { visual: { kind: "order" }, title: "Supports customers", body: "Order status, returns and delivery questions, answered any time of day." },
        { visual: { kind: "handoff" }, title: "Hands off to your team", body: "Your team can take over any conversation from the Aurevia inbox." },
      ]}
      howItWorks={[
        { title: "Connect your number", body: "Link your WhatsApp Business number in Settings, then Channels." },
        { title: "Customers message you", body: "The agent replies with the same answers your store chat gives." },
        { title: "Watch it in one inbox", body: "Every WhatsApp conversation sits next to your store chats and emails." },
      ]}
      secondDemo={{
        eyebrow: "Abandoned carts",
        title: "A nudge on WhatsApp when a cart goes quiet",
        body: "Shoppers who tick the WhatsApp box in the chat get one short message from your own number, sent with the first email, showing what they left and a link back to the cart. If they reply, the agent answers in the same thread.",
        demo: <WhatsAppRecoveryDemo />,
        points: ["Opt-in only, STOP to end", "Your WhatsApp Business number", "Replies answered by the agent"],
      }}
      relatedLinks={[]}
      faqs={[
        { q: "Do I need a WhatsApp Business number?", a: "Yes. The agent answers on your own number, so customers always talk to your store." },
        { q: "Will it send broadcasts?", a: "No. It replies to conversations customers start. The only message it starts is the cart reminder, and only for shoppers who asked for it." },
      ]}
      review={getReview("lotus-beauty")}
      extra={<ChannelPrinciples />}
      alsoSee={[
        { href: "/channels/store", title: "Store chat", body: "Recommends, answers and adds to the cart on every page." },
        { href: "/channels/email", title: "Email", body: "Cart recovery, answers and checkout links in the thread." },
        { href: "/channels/instagram", title: "Instagram", body: "DMs, story replies and comments, handled for you." }
      ]}
    />
  );
}
