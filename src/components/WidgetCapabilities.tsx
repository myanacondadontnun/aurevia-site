"use client";

/**
 * Home: "On your storefront". Five capabilities on one pinned stage, copy on
 * the left and an animated widget mockup in a phone frame on the right. Scripts use the
 * Lucien Vallière demo catalog (USD) so every mockup tells one story.
 */

import type { ReactNode } from "react";
import { FeatureChatDemo, type ChatStep } from "./FeatureDemo";
import { PhoneFrame } from "./DeviceFrames";
import RecoveryNudges from "./RecoveryNudges";
import PinnedShowcase, { type ShowcaseItem } from "./PinnedShowcase";

const IMG = {
  blazer: "/images/demo/lv/cashmere-blazer.webp",
  blouse: "/images/demo/lv/silk-blouse.webp",
  boots: "/images/demo/lv/patent-boots.webp",
  necklace: "/images/demo/lv/gilded-necklace.webp",
  hoodie: "/images/demo/lv/metro-hoodie.webp",
  jacket: "/images/demo/lv/pop-pink-jacket.webp",
};

const recommendScript: ChatStep[] = [
  { type: "user", text: "Something for a gallery opening. Sharp, but not stiff." },
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

const cartScript: ChatStep[] = [
  { type: "user", text: "Add the silk blouse in a medium" },
  { type: "bot", text: "On it." },
  {
    type: "products",
    delay: 400,
    items: [{ name: "Silk Draped Blouse", price: "$520.00", img: IMG.blouse }],
  },
  { type: "addcart", name: "Silk Draped Blouse", delay: 1100 },
  { type: "cartbar", summary: "1 item · $520.00", delay: 300 },
  { type: "bot", text: "Added: Silk Draped Blouse, size M. You're over $300, so shipping's on us.", delay: 400 },
  {
    type: "minicart",
    delay: 1600,
    total: "$520.00",
    items: [{ name: "Silk Draped Blouse with Asymmetric Cut", variant: "Size M", price: "$520.00", img: IMG.blouse }],
  },
];

const compareScript: ChatStep[] = [
  { type: "user", text: "Metro hoodie or the Pop Pink jacket for cold morning runs?" },
  { type: "bot", text: "Depends what you're running through. Honest breakdown:" },
  {
    type: "compare",
    delay: 500,
    a: { name: "Metro Yellow hoodie", price: "$129.00", img: IMG.hoodie },
    b: { name: "Pop Pink zip-up", price: "$148.00", img: IMG.jacket },
    rows: [
      { label: "Weather", a: "Dry cold", b: "Wind + rain", winner: "b" },
      { label: "Warmth", a: "Heavy fleece", b: "Light shell", winner: "a" },
      { label: "Fit", a: "Oversized", b: "Fitted" },
      { label: "Rating", a: "5.0 (2)", b: "4.5 (2)", winner: "a" },
    ],
    verdict: "Wet mornings, take the jacket. Dry and cold, the hoodie wins.",
  },
  { type: "bot", text: "Want both? I can bundle them for you.", delay: 2400 },
];

const handoffScript: ChatStep[] = [
  { type: "user", text: "I need to change the shipping address on order #1042. Can I talk to a person?" },
  { type: "bot", text: "Of course. I've raised a ticket and pinged the team. One moment." },
  {
    type: "card",
    delay: 600,
    head: "Support ticket",
    title: "#2481 · Address change on order #1042",
    note: "Assigned to Ritwik · usually replies in about 2 min",
    progress: true,
  },
  { type: "agent", name: "Ritwik", role: "Live agent · Lucien Vallière", delay: 2200 },
  { type: "bot", text: "Hi, Ritwik here. Address updated on #1042. It ships tomorrow. Anything else I can do?", delay: 900 },
  { type: "user", text: "That's it, thank you!", delay: 1400 },
];

// `demo` gets `active` only when the stage is pinned; unpinned, each demo starts itself on scroll.
const rows: (ShowcaseItem & { demo: (active?: boolean) => ReactNode })[] = [
  {
    eyebrow: "01 · Recommendations",
    title: "Recommends what they'll actually buy",
    body: "Aurevia reads intent, not keywords. A vague ask becomes two or three products the shopper can act on, pulled live from your catalogue with real prices and stock.",
    points: ["Product cards inside the chat", "Live catalogue, live prices", "Curated sets, not a wall of results"],
    demo: (active) => (
      <PhoneFrame>
        <FeatureChatDemo bare startOnView active={active} agentName="Lucien" script={recommendScript} />
      </PhoneFrame>
    ),
  },
  {
    eyebrow: "02 · Cart",
    title: "Adds to cart and opens the drawer",
    body: "No links to click, no tabs to switch. The shopper says yes, the item lands in your real Shopify cart, and the drawer slides up with a checkout button.",
    points: ["Add, update, remove from chat", "Works with your theme's cart", "One-tap checkout"],
    demo: (active) => (
      <PhoneFrame>
        <FeatureChatDemo bare startOnView active={active} agentName="Lucien" script={cartScript} loopPause={4500} />
      </PhoneFrame>
    ),
  },
  {
    eyebrow: "03 · Compare",
    title: "Compares products and gives a verdict",
    body: "When a shopper is stuck between two options, Aurevia lays them out side by side and says which one fits. That's the moment most carts are won or lost.",
    points: ["Two products, one card", "Winner highlighted per row", "A plain-English verdict"],
    demo: (active) => (
      <PhoneFrame>
        <FeatureChatDemo bare startOnView active={active} agentName="Lucien" script={compareScript} loopPause={5000} />
      </PhoneFrame>
    ),
  },
  {
    eyebrow: "04 · Handoff",
    title: "Hands off to your team when it should",
    body: "Ask for a human and a ticket opens, your team gets pinged, and the same chat turns into a live conversation. The shopper never leaves the window.",
    points: ["Ticket with working-hours awareness", "Live takeover from the dashboard", "Hand back to AI when done"],
    demo: (active) => (
      <PhoneFrame>
        <FeatureChatDemo bare startOnView active={active} agentName="Lucien" script={handoffScript} loopPause={5500} />
      </PhoneFrame>
    ),
  },
  {
    eyebrow: "05 · Recovery",
    title: "Follows up when they leave",
    body: "Abandon a cart and Aurevia writes the follow-up in your store's voice, by email or on WhatsApp, with the exact items and a one-click way back. Replies come straight into your inbox.",
    points: ["Email and WhatsApp nudges", "Quiet hours and frequency caps", "Replies answered by the AI"],
    demo: () => <RecoveryNudges />,
  },
];

export default function WidgetCapabilities() {
  return (
    <section id="storefront" className="py-14 sm:py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-20 scroll-fade">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00665A] mb-3">The AI sales agent for Shopify</p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-fraunces font-normal mb-4 sm:mb-5 text-foreground">
            What is <span className="green-highlight">Aurevia</span>?
          </h2>
          <p className="text-sm sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The best store associate greets, asks, recommends and closes. Aurevia does that on every page of your
            Shopify store, in your brand&rsquo;s voice, and hands the conversation to your team when it should.
          </p>
        </div>

        <PinnedShowcase items={rows} tallVisual renderVisual={(index, active) => rows[index].demo(active)} />
      </div>
    </section>
  );
}
