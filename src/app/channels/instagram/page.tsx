import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import ChannelPrinciples from "@/components/channels/ChannelPrinciples";
import { CommentModerationDemo, ShopChatDemo } from "@/components/RecoveryDemos";
import { getReview } from "@/lib/reviews";

const title = "Instagram for Shopify: DMs, Story Replies and Comments | Aurevia";
const desc =
  "Aurevia answers Instagram DMs, turns story replies into a cart and a checkout link, replies to comments automatically and hides spam and abusive ones.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/channels/instagram" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/channels/instagram/" },
};

export default function InstagramChannelPage() {
  return (
    <FeatureSubpageLayout
      path="/channels/instagram"
      backHref="/channels"
      backLabel="← Back to Channels"
      eyebrow="Instagram"
      headline={
        <>
          DMs, stories and comments, <span className="green-highlight">handled</span>
        </>
      }
      subtitle="Connect your Instagram professional account and the agent answers DMs, turns a story reply like “Is this available?” into a cart and a checkout link, replies to comments in your voice, and hides spam and abusive comments."
      demo={<ShopChatDemo theme="instagram" />}
      featureBlocks={[
        { visual: { kind: "dm" }, title: "Answers DMs", body: "Product, sizing and order questions, from the same catalogue and knowledge base as your store chat." },
        { visual: { kind: "products", items: [{ name: "Pop Pink Zip-Up", price: "$148", img: "/images/demo/lv/pop-pink-jacket.webp" }, { name: "Metro Hoodie", price: "$129", img: "/images/demo/lv/metro-hoodie.webp" }] }, title: "Shows products and adds to the cart", body: "Product cards in the thread, and a cart the agent builds for the shopper." },
        { visual: { kind: "story" }, title: "Turns story replies into sales", body: "Someone replies “Is this available?” to a story and gets the answer, a cart and a checkout link." },
        { visual: { kind: "commentReply" }, title: "Replies to comments automatically", body: "Questions under your posts get a reply in your voice, with the link sent by DM." },
        { visual: { kind: "commentHidden" }, title: "Hides spam and hate comments", body: "Spam, scams and abuse are hidden before your followers see them." },
        { visual: { kind: "dm", q: "Where's my order?", a: "Shipped yesterday, due Thursday." }, title: "Supports customers", body: "Order status and returns in DMs, with your team a tap away for anything else." },
      ]}
      howItWorks={[
        { title: "Connect your account", body: "Link your Instagram professional account in Settings, then Channels." },
        { title: "Set the rules", body: "Choose what gets an automatic reply and what waits for you." },
        { title: "It works in the background", body: "DMs, story replies and comments are handled, and every one appears in your inbox." },
      ]}
      secondDemo={{
        eyebrow: "Comments",
        title: "Every comment answered or cleaned up",
        body: "Questions under your posts get a public reply and the link by DM. Spam and abusive comments are hidden as they arrive. Anything the agent isn't sure about waits for you to approve, edit or discard.",
        demo: <CommentModerationDemo />,
        points: ["Automatic replies", "Spam and hate hidden", "You approve the uncertain ones"],
      }}
      relatedLinks={[]}
      faqs={[
        { q: "Which accounts can I connect?", a: "Instagram professional accounts, Business or Creator." },
        { q: "Can I turn off automatic comment replies?", a: "Yes. You choose what replies automatically, and anything else waits for you." },
      ]}
      review={getReview("l1nk")}
      extra={<ChannelPrinciples />}
      alsoSee={[
        { href: "/channels/store", title: "Store chat", body: "Recommends, answers and adds to the cart on every page." },
        { href: "/channels/email", title: "Email", body: "Cart recovery, answers and checkout links in the thread." },
        { href: "/channels/whatsapp", title: "WhatsApp", body: "Support, products, checkout links and cart reminders." }
      ]}
    />
  );
}
