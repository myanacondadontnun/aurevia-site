"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  BookOpen,
  FileText,
  Gift,
  Instagram,
  Mail,
  MessageCircle,
  MessagesSquare,
  PackagePlus,
  Search,
  ShoppingBag,
  Truck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { Agent, Bot, Cards, Divider, Tracking, User, WidgetWindow } from "./Widget";
import s from "./scenarios.module.css";
import { GmailMessage, InstagramChat, WhatsAppChat, type ThreadMessage } from "./ChannelThreads";
import type { ScenarioPhotoName, ScenarioPhotos } from "./scenarioPhotoNames";

/**
 * "See how Aurevia turns hesitation into action": six moments in a shopper's journey, each in a different
 * kind of store. A compact scenario navigator on the left; on the right one stage per scenario, with the
 * store's own photo behind it and the Aurevia widget (or the channel threads) as the subject in front.
 * Each step the agent takes (knowledge base, upsell, handover…) appears outside the chat as a small source card.
 * Each scenario ends on a short outcome line. Selecting a scenario replays it; the section advances on its
 * own (with a progress bar on the active tab) until the visitor clicks.
 */

export type { ScenarioPhotos };

type Store = {
  name: string;
  category: string;
  /** The store's photo behind the stage. */
  bg: ScenarioPhotoName;
  /** Two tones for the placeholder gradient shown until the photo exists. */
  tint: [string, string];
};

const STORES = {
  fashion: { name: "Linden & Wren", category: "Fashion", bg: "store-fashion", tint: ["#ece4da", "#c8b6a2"] },
  skincare: { name: "Dewlight", category: "Skincare", bg: "store-skincare", tint: ["#f4e6e1", "#d9b9ae"] },
  audio: { name: "Halden Audio", category: "Electronics", bg: "store-audio", tint: ["#4a5056", "#22272b"] },
  home: { name: "Hearth & Clay", category: "Home & living", bg: "product-lifestyle", tint: ["#ebe6dc", "#b9b29f"] },
  jewellery: { name: "Solenne", category: "Jewellery", bg: "store-jewellery", tint: ["#efe7d8", "#c9b38c"] },
  active: { name: "Stride Studio", category: "Activewear", bg: "store-activewear", tint: ["#dde4e1", "#9bada7"] },
} satisfies Record<string, Store>;

type StoreId = keyof typeof STORES;

/** Which thread a step belongs to when a scenario shows two channels side by side. */
type Lane = "ig" | "wa";

type CardItem = { title: string; price: string; photo: ScenarioPhotoName; badge?: string };

type Step = (
  | { kind: "user"; text: string }
  | { kind: "bot"; text: string }
  | { kind: "agent"; text: string }
  | { kind: "divider"; text: string }
  | { kind: "cards"; items: CardItem[] }
  | { kind: "cartbar"; count: number }
  | { kind: "tracking"; order: string; status: string; carrier: string; eta: string }
) & { lane?: Lane; time?: string; /** Link button under a channel message (WhatsApp template). */ button?: string };

/** What the agent did at a step, shown outside the chat as a small source card once that step has played. */
type Cue = { at: number; icon: LucideIcon; eyebrow: string; title: string };

type Scenario = {
  id: string;
  label: string;
  short: string;
  store: StoreId;
  /** The one-line problem shown above the stage. */
  problem: string;
  /** What the conversation achieved, shown once it has played out. Plain facts from the scene, no metrics. */
  outcome: string;
  /** The widget on the store, or channel threads instead of the widget. */
  view: "widget" | "recovery" | "social";
  /** Header once a team member has joined (handover). */
  header?: { title: string; subtitle: string; agent: string };
  steps: Step[];
  cues: Cue[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "discovery",
    label: "Product discovery",
    short: "Discovery",
    store: "fashion",
    problem: "A shopper is browsing the new collection, looking for a wedding-guest dress.",
    outcome: "Two dresses under $200, picked for an outdoor daytime wedding",
    view: "widget",
    steps: [
      { kind: "user", text: "I need a dress for a summer wedding. Under $200." },
      { kind: "bot", text: "Lovely. Is it a daytime or an evening ceremony?" },
      { kind: "user", text: "Daytime, outdoors." },
      { kind: "bot", text: "Then these two. Both are breathable and under $200:" },
      {
        kind: "cards",
        items: [
          { title: "Linen Midi Dress", price: "$168.00", photo: "fashion-linen-dress" },
          { title: "Silk Slip Dress", price: "$189.00", photo: "fashion-silk-dress" },
        ],
      },
    ],
    cues: [
      { at: 1, icon: MessagesSquare, eyebrow: "Guided discovery", title: "Asked about the occasion" },
      { at: 4, icon: Search, eyebrow: "Product discovery", title: "2 dresses under $200" },
    ],
  },
  {
    id: "questions",
    label: "Buying questions",
    short: "Questions",
    store: "skincare",
    problem: "A shopper on the product page has questions nobody is around to answer.",
    outcome: "Both questions answered without leaving the product page",
    view: "widget",
    steps: [
      { kind: "user", text: "Is the Vitamin C serum okay for sensitive skin?" },
      { kind: "bot", text: "Yes. It's a gentle 10% formula and fragrance-free. Start every other morning for the first week." },
      { kind: "user", text: "Can I use it with my retinol?" },
      { kind: "bot", text: "Yes, just not together. Use the serum in the morning and your retinol at night." },
    ],
    cues: [
      { at: 1, icon: BookOpen, eyebrow: "Knowledge base", title: "From the product details" },
      { at: 3, icon: FileText, eyebrow: "Knowledge base", title: "From the routine guide" },
    ],
  },
  {
    id: "upsell",
    label: "Upselling",
    short: "Upsell",
    store: "audio",
    problem: "A shopper has one item in the cart and is about to leave.",
    outcome: "Case added, cart up from $249 to $278",
    view: "widget",
    steps: [
      { kind: "bot", text: "Added the Arc Headphones to your cart." },
      {
        kind: "cards",
        items: [
          { title: "Arc Headphones", price: "$249.00", photo: "audio-headphones", badge: "In Cart: 1" },
          { title: "Travel Case", price: "$29.00", photo: "audio-case" },
        ],
      },
      { kind: "bot", text: "The travel case fits them folded and has a pocket for the cable. Want it for $29?" },
      { kind: "user", text: "Yes, add it." },
      { kind: "cartbar", count: 2 },
    ],
    cues: [
      { at: 2, icon: PackagePlus, eyebrow: "Upsell", title: "Paired with Arc Headphones" },
      { at: 4, icon: ShoppingBag, eyebrow: "Added to cart", title: "Cart $249 → $278" },
    ],
  },
  {
    id: "recovery",
    label: "Cart recovery",
    short: "Recovery",
    store: "home",
    problem: "A shopper left with the serving set still in their cart.",
    outcome: "Cart saved with free gift wrap, ready to check out",
    view: "recovery",
    steps: [
      { kind: "bot", time: "10:42", text: "Hi Camille, your Ceramic Serving Set is still in your cart. Want me to hold it for you?", button: "Checkout Now" },
      { kind: "user", time: "10:47", text: "Yes please! Can you gift-wrap it? It's for my sister." },
      { kind: "bot", time: "10:47", text: "Of course. Gift wrap is free and we'll leave the price off the slip. Your cart is saved, check out whenever you're ready." },
    ],
    cues: [
      { at: 0, icon: Mail, eyebrow: "Cart recovery", title: "Email, then WhatsApp" },
      { at: 2, icon: Gift, eyebrow: "Cart saved", title: "Free gift wrap noted" },
    ],
  },
  {
    id: "social",
    label: "Instagram & WhatsApp",
    short: "Instagram & WhatsApp",
    store: "jewellery",
    problem: "Shoppers message you on Instagram and WhatsApp, often after hours.",
    outcome: "Both messages answered in their own app, with products to tap",
    view: "social",
    steps: [
      { lane: "ig", kind: "user", text: "Saw the gold hoops in your reel. Are they back in stock?" },
      { lane: "ig", kind: "bot", text: "They are, as of this morning. Here they are, with the pendant people pair them with:" },
      {
        lane: "ig",
        kind: "cards",
        items: [
          { title: "Gold Hoops", price: "$86.00", photo: "jewellery-hoops" },
          { title: "Gold Pendant", price: "$120.00", photo: "jewellery-pendant" },
        ],
      },
      { lane: "wa", kind: "user", time: "23:41", text: "Hi! Do you ship to Toronto? It's a gift." },
      { lane: "wa", kind: "bot", time: "23:41", text: "We do, in 4 to 6 business days, and gift wrap is free. Want me to add it at checkout?" },
      { lane: "wa", kind: "user", time: "23:42", text: "Yes please!" },
    ],
    cues: [
      { at: 1, icon: Instagram, eyebrow: "Instagram DM", title: "Stock checked: Gold Hoops" },
      { at: 4, icon: MessageCircle, eyebrow: "WhatsApp", title: "Shipping to Canada" },
    ],
  },
  {
    id: "orders",
    label: "Orders & handover",
    short: "Orders",
    store: "active",
    problem: "A customer checks on an order and needs a change only your team can make.",
    outcome: "Tracking shared, then Maya set up the size exchange",
    view: "widget",
    header: { title: "Maya from Stride Studio", subtitle: "Team member", agent: "MR" },
    steps: [
      { kind: "user", text: "Where's my order #48291? The leggings might be the wrong size." },
      { kind: "tracking", order: "Order #48291", status: "Out for delivery", carrier: "UPS Ground", eta: "Arrives today" },
      { kind: "bot", text: "It arrives today. Size swaps go through the team, so I'm bringing in Maya." },
      { kind: "divider", text: "Maya joined the chat" },
      { kind: "agent", text: "Hi, Maya here. I'll email you a free exchange label now. Which size do you need?" },
    ],
    cues: [
      { at: 1, icon: Truck, eyebrow: "Order lookup", title: "#48291 · Out for delivery" },
      { at: 3, icon: UserRound, eyebrow: "Handover", title: "Maya joined with the chat" },
    ],
  },
];

/** How long each scenario plays before the section moves on by itself. */
const ADVANCE_MS = 12000;

const STEP_DELAY: Record<Step["kind"], number> = {
  user: 1200,
  bot: 1500,
  agent: 1500,
  divider: 700,
  cards: 500,
  cartbar: 500,
  tracking: 600,
};

function useReveal(active: number) {
  const [shown, setShown] = useState(1);
  useEffect(() => {
    const steps = SCENARIOS[active].steps;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(steps.length);
      return;
    }
    setShown(1);
    const timers: number[] = [];
    let t = 0;
    for (let i = 1; i < steps.length; i++) {
      t += STEP_DELAY[steps[i].kind];
      timers.push(window.setTimeout(() => setShown(i + 1), t));
    }
    return () => timers.forEach(clearTimeout);
  }, [active]);
  return shown;
}

/* ---------- chat steps ---------- */

/** Where each cue sits beside the widget: level with its message, right edge at the widget's left edge. */
type CueSpot = { top: number; right: number; visible: boolean };

/**
 * Measures, on wide screens, where each shown cue's message is inside the widget, so the cue can sit outside the
 * widget level with it (as in the hero). Re-measures as messages arrive and slide up; a cue whose message has
 * scrolled out of the top of the widget fades away.
 */
function useCueSpots(stage: React.RefObject<HTMLDivElement | null>, sc: Scenario, shown: number) {
  const [spots, setSpots] = useState<Record<number, CueSpot>>({});
  useLayoutEffect(() => {
    if (sc.view !== "widget") return setSpots({});
    const measure = () => {
      const el = stage.current;
      if (!el || !window.matchMedia("(min-width: 1280px)").matches) return setSpots({});
      const body = el.querySelector<HTMLElement>(`.${s.body}`);
      const widget = el.querySelector<HTMLElement>(`.${s.stageWidget}`);
      if (!body || !widget) return;
      const sb = el.getBoundingClientRect();
      const bb = body.getBoundingClientRect();
      const right = sb.right - widget.getBoundingClientRect().left;
      // Body children are the rendered steps in order; the cart strip step renders outside the body.
      const rendered = sc.steps.slice(0, shown).flatMap((st, i) => (st.kind === "cartbar" ? [] : [i]));
      const kids = Array.from(body.children) as HTMLElement[];
      const next: Record<number, CueSpot> = {};
      for (const c of sc.cues) {
        if (c.at >= shown) continue;
        const anchor =
          sc.steps[c.at].kind === "cartbar"
            ? el.querySelector<HTMLElement>(`[class*="cartBar"]`)
            : kids[rendered.indexOf(c.at)];
        if (!anchor) continue;
        const r = anchor.getBoundingClientRect();
        next[c.at] = { top: r.top - sb.top + Math.min(r.height / 2, 14), right, visible: r.top > bb.top - 4 };
      }
      setSpots(next);
    };
    measure();
    // Again once the newest message has finished sliding in.
    const timers = [window.setTimeout(measure, 300), window.setTimeout(measure, 700)];
    window.addEventListener("resize", measure);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", measure);
    };
  }, [sc, shown, stage]);
  return spots;
}

function CueCard({ cue }: { cue: Cue }) {
  const Icon = cue.icon;
  return (
    <span className={s.cueCard}>
      <span className={s.cueIcon}><Icon aria-hidden="true" /></span>
      <span className={s.cueText}>
        <span className={s.cueEyebrow}>{cue.eyebrow}</span>
        <span className={s.cueTitle}>{cue.title}</span>
      </span>
    </span>
  );
}

function renderStep(step: Step, i: number, photos: ScenarioPhotos): ReactNode {
  switch (step.kind) {
    case "user":
      return <User key={i}>{step.text}</User>;
    case "bot":
      return <Bot key={i}>{step.text}</Bot>;
    case "agent":
      return <Agent key={i} initials="MR">{step.text}</Agent>;
    case "divider":
      return <Divider key={i}>{step.text}</Divider>;
    case "cards":
      return (
        <Cards
          key={i}
          eager
          products={step.items.map((item) => ({ title: item.title, price: item.price, image: photos[item.photo], badge: item.badge }))}
        />
      );
    case "cartbar":
      // Not a message: the count drives the cart strip docked on the widget's input.
      return null;
    case "tracking":
      return <Tracking key={i} order={step.order} status={step.status} carrier={step.carrier} eta={step.eta} step={3} />;
  }
}

export default function Scenarios({ photos }: { photos: ScenarioPhotos }) {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [interacted, setInteracted] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const shown = useReveal(active);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Advance on its own, one scenario at a time, until the visitor takes control. Desktop only: on phones and
  // tablets the scenes differ in height, so advancing by itself would shift everything below while nobody
  // touches the page (and iOS Safari doesn't compensate the scroll position).
  useEffect(() => {
    if (
      interacted ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(min-width: 1024px)").matches
    )
      return;
    setAutoplay(true);
    const id = window.setTimeout(() => setActive((a) => (a + 1) % SCENARIOS.length), ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [active, interacted]);

  const pick = (i: number, focus = false) => {
    setInteracted(true);
    setAutoplay(false);
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };

  const sc = SCENARIOS[active];
  const store: Store = STORES[sc.store];
  const stepsShown = sc.steps.slice(0, shown);
  const joinedAt = sc.steps.findIndex((st) => st.kind === "divider");
  const agentIn = sc.header && (joinedAt === -1 || shown > joinedAt);
  const header = agentIn && sc.header ? sc.header : { title: store.name, subtitle: undefined, agent: undefined };
  const finished = shown >= sc.steps.length;
  const steps = () => stepsShown.map((step, i) => renderStep(step, i, photos));
  const cartCount = stepsShown.reduce((n, st) => (st.kind === "cartbar" ? st.count : n), 0);
  // The same steps as the channel's own messages: the shopper is "me", the store is "them".
  const thread = (lane?: Lane): ThreadMessage[] =>
    stepsShown
      .filter((st) => lane === undefined || st.lane === lane)
      .flatMap((st): ThreadMessage[] => {
        if (st.kind === "user") return [{ from: "me", text: st.text, time: st.time }];
        if (st.kind === "bot") return [{ from: "them", text: st.text, time: st.time, button: st.button }];
        if (st.kind === "cards") return [{ from: "them", cards: st.items.map((it) => ({ title: it.title, price: it.price, image: photos[it.photo] })) }];
        return [];
      });
  const bg = photos[store.bg];
  const cues = sc.cues.filter((c) => c.at < shown);
  const spots = useCueSpots(stageRef, sc, shown);
  // Every cue of the scene is laid out from the start and only revealed as its step plays, so the row's height
  // never changes mid-scene and nothing below it moves.
  const cueList = (className: string) => (
    <div className={className} aria-hidden="true">
      {sc.cues.map((c) => (
        <span key={`${sc.id}-${c.at}`} className={c.at < shown ? s.cueShown : s.cueWaiting}>
          <CueCard cue={c} />
        </span>
      ))}
    </div>
  );

  return (
    <section className={s.section}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className={s.head}>
          <h2 className={s.title}>See how Aurevia turns hesitation into action.</h2>
          <p className={s.lede}>Explore how your AI sales agent helps at every step of the buying journey.</p>
        </div>

        <div className={s.grid}>
          <div role="tablist" aria-label="Shopping scenarios" aria-orientation="vertical" className={s.nav}>
            {SCENARIOS.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`scenario-tab-${item.id}`}
                aria-controls="scenario-panel"
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                onClick={() => pick(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowRight") pick((i + 1) % SCENARIOS.length, true);
                  if (e.key === "ArrowUp" || e.key === "ArrowLeft") pick((i + SCENARIOS.length - 1) % SCENARIOS.length, true);
                }}
                className={`${s.tab} ${active === i ? s.tabOn : ""}`}
              >
                <span className={s.tabNum}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.tabLabel}>{item.label}</span>
                <span className={s.tabShort}>{item.short}</span>
                <span className={s.tabMetaWrap}>
                  <span className={s.tabMeta}>{STORES[item.store].name} · {STORES[item.store].category}</span>
                </span>
                {autoplay && active === i && (
                  <span key={`p-${item.id}`} className={s.progress} style={{ animationDuration: `${ADVANCE_MS}ms` }} aria-hidden="true" />
                )}
              </button>
            ))}
          </div>

          <div id="scenario-panel" role="tabpanel" aria-labelledby={`scenario-tab-${sc.id}`} className={s.panel}>
            <p className={s.problem} key={`h-${sc.id}`}>{sc.problem}</p>

            <div
              key={sc.id}
              ref={stageRef}
              className={`${s.stage} ${sc.view === "widget" ? s.stageWithCues : s.stageThreads}`}
              style={{ "--tint-a": store.tint[0], "--tint-b": store.tint[1] } as CSSProperties}
            >
              {bg && <img src={bg} alt="" className={s.stageBg} />}
              <span className={s.stageShade} aria-hidden="true" />

              {/* Top band: the store chip, then (wide screens, two-channel scenes) the cues in a row after it. */}
              <div className={s.topBand}>
                <div className={s.storeChip}>
                  <span className={s.storeMono} aria-hidden="true">{store.name.charAt(0)}</span>
                  <span className={s.storeText}>
                    <strong>{store.name}</strong>
                    <small>{store.category}</small>
                  </span>
                </div>
                {sc.view !== "widget" && cueList(`${s.cues} ${s.cuesStage}`)}
              </div>

              {/* Widget scenes on wide screens: each cue beside its own message, joined to it by a hairline. */}
              {sc.view === "widget" && (
                <div className={s.cueLayer} aria-hidden="true">
                  {cues.map((c) => {
                    const spot = spots[c.at];
                    if (!spot) return null;
                    return (
                      <span
                        key={`${sc.id}-${c.at}`}
                        className={`${s.cueAnchor} ${spot.visible ? "" : s.cueGone}`}
                        style={{ top: spot.top, right: spot.right }}
                      >
                        <CueCard cue={c} />
                        <span className={s.cueLine} />
                        <span className={s.cueNode} />
                      </span>
                    );
                  })}
                </div>
              )}

              {sc.view === "widget" && (
                <div className={s.stageWidget}>
                  <WidgetWindow
                    title={header.title}
                    subtitle={header.subtitle}
                    avatar={header.agent ? <span className={s.agentAvatar} aria-hidden="true">{header.agent}</span> : undefined}
                    className={s.window}
                    bodyClassName={s.body}
                    footer={false}
                    cartCount={cartCount}
                  >
                    {steps()}
                  </WidgetWindow>
                </div>
              )}

              {sc.view === "recovery" && (
                <div className={s.threads}>
                  <GmailMessage
                    store={store.name}
                    to="me"
                    time="10:41 AM"
                    subject="Your Ceramic Serving Set is waiting"
                    photo={photos["product-main"]}
                    product="Ceramic Serving Set"
                    price="$68.00"
                  />
                  <WhatsAppChat business={store.name} status="Business account" messages={thread()} />
                </div>
              )}

              {sc.view === "social" && (
                <div className={s.threads}>
                  <InstagramChat name={store.name} handle="solenne.jewellery" context="You replied to their reel" messages={thread("ig")} />
                  <WhatsAppChat business={store.name} status="Business account" messages={thread("wa")} />
                </div>
              )}
            </div>

            {/* Narrower screens: the same cues in a row under the stage. */}
            {cueList(`${s.cues} ${s.cuesBelow}`)}

            <p className={`${s.outcome} ${finished ? s.outcomeOn : ""}`} aria-live="polite">
              <span className={s.outcomeIcon} aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
              </span>
              {/* Always laid out (hidden until the scene ends) so its line height is reserved from the start. */}
              <span aria-hidden={!finished}>{sc.outcome}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
