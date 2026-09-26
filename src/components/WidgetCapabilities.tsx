"use client";

/**
 * Home: "On your storefront" — five capability rows, copy on one side and an
 * animated widget mockup in a phone frame on the other. Scripts use the
 * Lucien Vallière demo catalog (USD) so every mockup tells one story.
 */

import { useEffect, useRef } from "react";
import { FeatureChatDemo, type ChatStep } from "./FeatureDemo";
import { PhoneFrame } from "./DeviceFrames";
import AbandonedCartEmail from "./AbandonedCartEmail";

const IMG = {
  blazer: "/images/demo/lv/cashmere-blazer.webp",
  blouse: "/images/demo/lv/silk-blouse.webp",
  boots: "/images/demo/lv/patent-boots.webp",
  necklace: "/images/demo/lv/gilded-necklace.webp",
  hoodie: "/images/demo/lv/metro-hoodie.webp",
  jacket: "/images/demo/lv/pop-pink-jacket.webp",
};

const recommendScript: ChatStep[] = [
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
  { type: "bot", text: "Added — Silk Draped Blouse, size M. You're over $300, so shipping's on us.", delay: 400 },
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
  { type: "bot", text: "Of course. I've raised a ticket and pinged the team — one moment." },
  {
    type: "card",
    delay: 600,
    head: "Support ticket",
    title: "#2481 · Address change on order #1042",
    note: "Assigned to Ritwik · usually replies in about 2 min",
    progress: true,
  },
  { type: "agent", name: "Ritwik", role: "Live agent · Lucien Vallière", delay: 2200 },
  { type: "bot", text: "Hi, Ritwik here. Address updated on #1042 — it ships tomorrow. Anything else I can do?", delay: 900 },
  { type: "user", text: "That's it, thank you!", delay: 1400 },
];

const rows = [
  {
    eyebrow: "01 · Recommendations",
    title: "Recommends what they'll actually buy",
    body: "Aurevia reads intent, not keywords. A vague ask becomes two or three products the shopper can act on, pulled live from your catalog with real prices and stock.",
    points: ["Product cards inside the chat", "Live catalog, live prices", "Curated sets, not a wall of results"],
    demo: <FeatureChatDemo bare startOnView agentName="Lucien" script={recommendScript} />,
  },
  {
    eyebrow: "02 · Cart",
    title: "Adds to cart and opens the drawer",
    body: "No links to click, no tabs to switch. The shopper says yes, the item lands in your real Shopify cart, and the drawer slides up with a checkout button.",
    points: ["Add, update, remove from chat", "Works with your theme's cart", "One-tap checkout"],
    demo: <FeatureChatDemo bare startOnView agentName="Lucien" script={cartScript} loopPause={4500} />,
  },
  {
    eyebrow: "03 · Compare",
    title: "Compares products and gives a verdict",
    body: "When a shopper is stuck between two options, Aurevia lays them out side by side and says which one fits. That's the moment most carts are won or lost.",
    points: ["Two products, one card", "Winner highlighted per row", "A plain-English verdict"],
    demo: <FeatureChatDemo bare startOnView agentName="Lucien" script={compareScript} loopPause={5000} />,
  },
  {
    eyebrow: "04 · Handoff",
    title: "Hands off to your team when it should",
    body: "Ask for a human and a ticket opens, your team gets pinged, and the same chat turns into a live conversation. The shopper never leaves the window.",
    points: ["Ticket with working-hours awareness", "Live takeover from the dashboard", "Hand back to AI when done"],
    demo: <FeatureChatDemo bare startOnView agentName="Lucien" script={handoffScript} loopPause={5500} />,
  },
  {
    eyebrow: "05 · Recovery",
    title: "Follows up when they leave",
    body: "Abandon a cart and Aurevia writes the follow-up in your store's voice, with the exact items and a one-click way back. Replies come straight into your inbox.",
    points: ["Sent under your store's name", "Quiet hours and frequency caps", "Replies answered by the AI"],
    demo: <AbandonedCartEmail />,
    plain: true,
  },
];

export default function WidgetCapabilities() {
  const listRef = useRef<HTMLDivElement>(null);

  // Reveal each row once, when a third of it is on screen. Rows are observed
  // individually so they arrive one after another as you scroll, on any width.
  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const rows = Array.from(root.querySelectorAll<HTMLElement>(".cap-row"));
    if (typeof IntersectionObserver === "undefined") {
      rows.forEach((r) => r.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -8% 0px" }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="storefront" className="py-14 sm:py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-20 scroll-fade">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00795c] mb-3">The AI sales agent for Shopify</p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-fraunces font-normal mb-4 sm:mb-5 text-foreground">
            What is <span className="green-highlight">Aurevia</span>?
          </h2>
          <p className="text-sm sm:text-xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The best store associate greets, asks, recommends and closes. Aurevia does that on every page of your
            Shopify store, in your brand&rsquo;s voice, and hands the conversation to your team when it should.
          </p>
        </div>

        <div ref={listRef} className="max-w-6xl mx-auto space-y-16 sm:space-y-28">
          {rows.map((row, index) => (
            <div
              key={row.eyebrow}
              className={`cap-row grid items-center gap-8 sm:gap-12 md:grid-cols-2 ${
                index % 2 === 1 ? "cap-row-reverse md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="cap-row-visual flex justify-center">
                {row.plain ? row.demo : <PhoneFrame>{row.demo}</PhoneFrame>}
              </div>
              <div className="cap-row-copy max-w-md mx-auto md:mx-0 text-center md:text-left">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase text-muted-foreground mb-3">{row.eyebrow}</p>
                <h3 className="text-xl sm:text-3xl font-fraunces font-normal text-foreground leading-tight mb-3 sm:mb-4">
                  {row.title}
                </h3>
                <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed mb-5">{row.body}</p>
                <ul className="flex flex-wrap justify-center md:justify-start gap-2">
                  {row.points.map((pt) => (
                    <li
                      key={pt}
                      className="text-xs sm:text-[13px] px-3 py-1.5 rounded-full border border-border/70 bg-card text-foreground/80"
                    >
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
