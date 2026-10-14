import type { ChannelKind } from "@/components/ChannelIcons";

/** The four places the agent answers. Shared by the home section and /channels. */
export const CHANNELS: { kind: ChannelKind; name: string; short: string; body: string }[] = [
  {
    kind: "store",
    name: "Shopify store",
    short: "The chat widget on every page: recommendations, cart, compare, order tracking.",
    body: "The Aurevia widget sits on your storefront and answers shoppers while they browse. Product questions, sizing, stock, delivery and order status, using your own catalogue and help content. It can add to the real Shopify cart and open checkout.",
  },
  {
    kind: "whatsapp",
    name: "WhatsApp",
    short: "Your own WhatsApp Business number, answered by the same agent.",
    body: "Connect your own WhatsApp Business number and Aurevia answers the customers who message it. Replies use the same catalogue and knowledge base as your storefront agent, so a customer gets the same answer wherever they ask. Your team can take over any conversation from the Aurevia inbox at any time.",
  },
  {
    kind: "instagram",
    name: "Instagram",
    short: "DMs answered, comments moderated, product links sent in the thread.",
    body: "Connect your Instagram professional account and Aurevia handles direct messages and comments on your posts. Straightforward questions get answered; anything negative or uncertain is queued for you to approve, edit or discard before it is posted.",
  },
  {
    kind: "email",
    name: "Email",
    short: "Cart follow-ups go out, replies come back, the agent answers in the thread.",
    body: "Every store gets its own Aurevia-hosted address, which you can forward to your own mailbox. Cart-recovery emails go out from it under your store's name, shoppers reply to it, and the agent answers in the same thread with the cart still attached. Support emails land in the same inbox for your team.",
  },
];
