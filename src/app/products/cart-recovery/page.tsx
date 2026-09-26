import type { Metadata } from "next";
import FeatureSubpageLayout from "@/components/FeatureSubpageLayout";
import { FeatureChatDemo, type ChatStep } from "@/components/FeatureDemo";
import { getReview } from "@/lib/reviews";
import AbandonedCartEmail from "@/components/AbandonedCartEmail";

const title = "Cart Recovery for Shopify: In-Chat Nudges and Follow-Up Emails | Aurevia";
const desc =
  "Catch hesitation while the shopper is still on your store, then follow up abandoned carts by email in your own voice, with the exact items, quiet hours and frequency caps.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/products/cart-recovery" },
  openGraph: { title, description: desc, type: "article", url: "https://aurevia.io/products/cart-recovery/" },
};

const nudgeScript: ChatStep[] = [
  { type: "bot", text: "Still thinking about the Silk Draped Blouse? Happy to help if anything's holding you back — sizing, shipping, or the hem." },
  { type: "user", text: "Honestly just wondering if it'll arrive before Friday.", delay: 1800 },
  { type: "bot", text: "Order in the next 2 hours and it ships today. Express lands Wednesday, standard Thursday. Both before Friday." },
  { type: "cartbar", summary: "1 item · $520.00 · Free shipping", delay: 600 },
  { type: "user", text: "Okay, doing it.", delay: 1500 },
];

export default function CartRecoveryPage() {
  return (
    <FeatureSubpageLayout
      backHref="/products"
      backLabel="← Back to Products"
      eyebrow="Cart recovery"
      headline={
        <>
          Save the sale <span className="green-highlight">before and after they leave</span>
        </>
      }
      subtitle="On the store, the agent notices a cart that has gone quiet and opens with the question that usually stops people. After they leave, it writes the follow-up email itself: the exact items, your tone, a one-click way back, and replies that land in your inbox."
      heroBullets={[
        "In-chat nudge when a cart goes quiet",
        "Follow-up emails written in your voice",
        "Quiet hours, frequency caps and a minimum cart value",
      ]}
      demo={<FeatureChatDemo agentName="Lucien" script={nudgeScript} loopPause={5000} />}
      proofStrip={[
        { label: "On the store", text: "If a shopper has items in the cart and the chat has been closed for a few minutes, the agent opens with a short, cart-aware nudge. Once per session, never nagging." },
        { label: "After they leave", text: "You choose the delay, from ten minutes to a day. The email shows the real line items and prices and links straight back to the cart." },
        { label: "Replies come back to you", text: "Shoppers answer the email, the reply lands in your Aurevia inbox, and the agent responds in the same thread with the cart still attached." },
      ]}
      featureBlocks={[
        {
          title: "Written by the AI, or by you",
          body: "Let Aurevia write the subject and opener in your store's voice with guidance you give it, or use your own templates. The product list, prices and total are always rendered from the real cart.",
        },
        {
          title: "Guardrails your brand can stand behind",
          body: "A minimum cart value, a frequency cap in days, quiet hours in your timezone, and one-click unsubscribe on every email.",
        },
        {
          title: "Optional second email and discount",
          body: "Add a second touch one to seventy-two hours later, and a discount code you can choose to include on the first email or hold back.",
        },
        {
          title: "Results you can read",
          body: "Abandoned, emailed, replied, recovered and recovered revenue, with every cart listed by status.",
        },
      ]}
      howItWorks={[
        { title: "A cart goes quiet", body: "Idle past your threshold with items still in it. The agent nudges in chat if they're on the store, and schedules the email if they've left." },
        { title: "The email goes out", body: "Under your store's sender name, from an Aurevia-hosted address, outside quiet hours, never more often than your cap allows." },
        { title: "They reply or return", body: "Replies are answered by the agent in the same thread. Purchases close the cart and show up as recovered revenue." },
      ]}
      relatedLinks={[
        { href: "/products/recommendations", label: "Product recommendations" },
        { href: "/help/cart-recovery-emails", label: "Set up cart recovery" },
        { href: "/products/roi-tracking", label: "Insights & ROI" },
      ]}
      faqs={[
        {
          q: "Does this replace my email or SMS flows?",
          a: "It replaces the abandoned-cart email. Everything else you run stays as it is. If you'd rather keep your existing flow, leave Aurevia's recovery switched off.",
        },
        {
          q: "Who is emailed?",
          a: "Shoppers who gave an email in the chat, or who are signed in to your store, and who haven't opted out. Consent wording is recorded with each lead.",
        },
        {
          q: "Does it use my message quota?",
          a: "Only when the AI writes the email copy. Emails using your own templates don't count, and if you run out of messages recovery switches to your templates automatically.",
        },
      ]}
      secondDemo={{
        eyebrow: "After they leave",
        title: "The email they actually get",
        body: "Written in your store's voice, with the exact items and prices from the real cart, a one-click way back, and a reply address that lands in your Aurevia inbox. Sent under your store's name, outside quiet hours, never more often than your cap allows.",
        demo: <AbandonedCartEmail />,
        points: ["Real line items and total", "Your sender name", "Replies answered by the AI"],
      }}
      review={getReview("littleangel")}
      alsoSee={[
        { href: "/products/recommendations", title: "Recommendations", body: "Fewer abandoned carts start with the right product in it." },
        { href: "/help/cart-recovery-emails", title: "Help: cart recovery", body: "Every setting explained." },
        { href: "/products/roi-tracking", title: "Insights & ROI", body: "Recovered revenue shows up next to everything else the agent influenced." },
      ]}
    />
  );
}
