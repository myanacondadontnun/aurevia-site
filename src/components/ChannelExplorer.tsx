"use client";

/**
 * /channels: pick a channel and see what the agent does there, with a live
 * mockup of the conversation. The tab follows the URL hash (#whatsapp etc.) so
 * other pages can link straight to one channel. Every channel's copy stays in
 * the HTML; only the mockup is swapped.
 */

import { useEffect, useState, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { ChannelBadge, type ChannelKind } from "./ChannelIcons";
import { CHANNELS } from "@/lib/channels";
import { FeatureChatDemo, type ChatStep } from "./FeatureDemo";
import { PhoneFrame } from "./DeviceFrames";
import MessengerDemo, { type MessengerStep } from "./MessengerDemo";
import AbandonedCartEmail from "./AbandonedCartEmail";

const IMG = {
  blazer: "/images/demo/lv/cashmere-blazer.webp",
  blouse: "/images/demo/lv/silk-blouse.webp",
  boots: "/images/demo/lv/patent-boots.webp",
  jacket: "/images/demo/lv/pop-pink-jacket.webp",
};

const storeScript: ChatStep[] = [
  { type: "user", text: "Something for a gallery opening — sharp, but not stiff." },
  { type: "bot", text: "Say less. Three pieces that do exactly that:" },
  {
    type: "products",
    delay: 500,
    items: [
      { name: "Tailored Cashmere Blazer", price: "$1,590.00", img: IMG.blazer },
      { name: "Silk Draped Blouse", price: "$520.00", img: IMG.blouse },
      { name: "Patent Ankle Boots", price: "$970.00", img: IMG.boots },
    ],
  },
  { type: "bot", text: "The blazer over the blouse is the whole look. Want me to check your size?", delay: 1400 },
];

const whatsappSteps: MessengerStep[] = [
  { from: "shopper", text: "Hi, do you have the silk blouse in a medium?" },
  {
    from: "store",
    text: "Yes, medium is in stock. Here's the link to pick your colour.",
    product: { name: "Silk Draped Blouse", meta: "Size M · $520.00", img: IMG.blouse },
  },
  { from: "shopper", text: "And where's my order #1042?" },
  { from: "store", text: "It shipped yesterday with UPS Ground and is due Thursday. Want the tracking link?" },
];

const instagramSteps: MessengerStep[] = [
  { from: "shopper", text: "Is the pink jacket in your last post waterproof?" },
  {
    from: "store",
    text: "It's a light shell made for wind and rain, so yes. Here it is:",
    product: { name: "Pop Pink zip-up", meta: "$148.00", img: IMG.jacket },
  },
  { from: "shopper", text: "Can I talk to someone about a bulk order?" },
  { from: "store", text: "Of course. I've passed this to the team and they'll reply here." },
];

const DETAILS: Record<ChannelKind, { can: string[]; note?: string; preview: ReactNode }> = {
  store: {
    can: ["Recommends and compares products", "Adds to the real Shopify cart", "Tracks orders and opens tickets", "Hands off to your team live"],
    preview: (
      <PhoneFrame>
        <FeatureChatDemo bare agentName="Lucien" script={storeScript} />
      </PhoneFrame>
    ),
  },
  whatsapp: {
    can: ["Answers from your knowledge base", "Finds and recommends products", "Tracks orders", "Hands off to your team"],
    note: "Sends product links rather than adding to a cart, because the cart lives on your storefront.",
    preview: <MessengerDemo theme="whatsapp" storeName="Lucien Vallière" subtitle="Business account" steps={whatsappSteps} />,
  },
  instagram: {
    can: ["Answers direct messages", "Replies to comments on your posts", "Finds and recommends products", "Hands off to your team"],
    note: "Negative or uncertain comment replies wait for you to approve, edit or discard.",
    preview: <MessengerDemo theme="instagram" storeName="Lucien Vallière" subtitle="Instagram" steps={instagramSteps} />,
  },
  email: {
    can: ["Sends cart follow-ups in your voice", "Answers replies in the same thread", "Collects support email in one inbox", "Forwards to your own mailbox"],
    preview: <AbandonedCartEmail />,
  },
};

const isKind = (value: string): value is ChannelKind => CHANNELS.some((c) => c.kind === value);

export default function ChannelExplorer() {
  const [active, setActive] = useState<ChannelKind>("store");

  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.slice(1);
      if (isKind(hash)) setActive(hash);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const select = (kind: ChannelKind) => {
    setActive(kind);
    window.history.replaceState(null, "", `#${kind}`);
  };

  return (
    <div>
      <div role="tablist" aria-label="Channels" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CHANNELS.map((channel) => {
          const on = channel.kind === active;
          return (
            <button
              key={channel.kind}
              type="button"
              role="tab"
              id={`tab-${channel.kind}`}
              aria-selected={on}
              aria-controls={`panel-${channel.kind}`}
              onClick={() => select(channel.kind)}
              className={`flex items-center gap-3 rounded-2xl border p-3 sm:p-4 text-left transition-colors ${
                on ? "border-[#00665A] bg-card shadow-sm" : "border-border bg-transparent hover:bg-card"
              }`}
            >
              <ChannelBadge kind={channel.kind} className="h-9 w-9 rounded-[10px]" />
              <span className="text-sm sm:text-base font-semibold text-foreground">{channel.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl border border-border bg-card p-6 sm:p-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          {CHANNELS.map((channel) => {
            const detail = DETAILS[channel.kind];
            return (
              <div
                key={channel.kind}
                role="tabpanel"
                id={`panel-${channel.kind}`}
                aria-labelledby={`tab-${channel.kind}`}
                hidden={channel.kind !== active}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl sm:text-3xl font-fraunces font-normal text-foreground">{channel.name}</h2>
                  <span className="rounded-full bg-[#e6eeea] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#00665A]">
                    Live
                  </span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">{channel.body}</p>
                <ul className="space-y-2.5">
                  {detail.can.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00665A]" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                  {detail.note ? (
                    <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Minus className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.5} />
                      {detail.note}
                    </li>
                  ) : null}
                </ul>
              </div>
            );
          })}
        </div>
        <div key={active} className="channel-preview flex justify-center">
          {DETAILS[active].preview}
        </div>
      </div>
    </div>
  );
}
