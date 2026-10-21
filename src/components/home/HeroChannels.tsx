"use client";

/**
 * Home hero demo: four tabs, one per channel, each a short sale played end to end on the Lucien Vallière demo store.
 * The store chat is the product-page widget (chat-demo-* in globals.css) as light glass: the shopper asks, the agent
 * shows three pieces, a pointer adds one to the cart and goes to checkout, then pays on the same Shopify checkout as
 * the cart recovery demos. WhatsApp (a cart reminder and a delivery question), Instagram (a story reply) and email (a
 * sizing question) are the cart recovery page's own demos, each ending on that checkout. Margin cues (wide screens) say what the agent did at each step, ending on the sale.
 * The active tab carries a progress line and hands over to the next ready tab when its sale is done; reduced motion
 * shows the confirmed order.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUp, BellRing, BookOpen, Check, Image as ImageIcon, Instagram, Link2, Search, ShoppingBag, SquarePen, Truck, type LucideIcon } from "lucide-react";
import { AureviaMark, DemoProducts, type DemoProductItem } from "@/components/FeatureDemo";
import { Checkout, Confirmed, EmailSaleDemo, M, Pointer, S, ShopChatDemo, usePointer, W, WhatsAppRecoveryDemo } from "@/components/RecoveryDemos";
import r from "@/components/recoveryDemos.module.css";
import { useScene } from "@/components/sceneClock";
import { ChannelMark, type ChannelKind } from "@/components/ChannelIcons";
import cueStyles from "@/components/featureCues.module.css";
import c from "./heroChannels.module.css";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** The widget is drawn at 400 × 660 and scaled down to fit the hero column (and the screen, on phones). */
const SCALE = 0.9;
function useFitScale() {
  const [scale, setScale] = useState(SCALE);
  useEffect(() => {
    const fit = () => setScale(Math.min(SCALE, (window.innerWidth - 32) / 400));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return scale;
}

type Tab = { kind: ChannelKind; label: string; ready: boolean };
const TABS: Tab[] = [
  { kind: "store", label: "Shopify store", ready: true },
  { kind: "whatsapp", label: "WhatsApp", ready: true },
  { kind: "instagram", label: "Instagram", ready: true },
  { kind: "email", label: "Email", ready: true },
];

/* ═════════════════════════ Margin cues ═════════════════════════ */

type Cue = { id: string; icon: LucideIcon; eyebrow: string; title: string; anchor: () => Element | null | undefined };

/** Places each shown cue level with its anchor, right edge at the widget's left edge (wide screens only). */
function CueLayer({ stage, cues, step }: { stage: React.RefObject<HTMLDivElement | null>; cues: Cue[]; step: string }) {
  const [tops, setTops] = useState<Record<string, number>>({});
  useLayoutEffect(() => {
    const measure = () => {
      const el = stage.current;
      if (!el || !window.matchMedia("(min-width: 1280px)").matches) return setTops({});
      const sb = el.getBoundingClientRect();
      // Level with each anchor, top to bottom, nudged apart where two would overlap.
      const raw = cues.flatMap((cue) => {
        const r = cue.anchor()?.getBoundingClientRect();
        return r ? [{ id: cue.id, top: r.top - sb.top + Math.min(r.height / 2, 18) }] : [];
      });
      raw.sort((x, y) => x.top - y.top);
      const next: Record<string, number> = {};
      let last = -Infinity;
      for (const { id, top } of raw) {
        last = Math.max(top, last + 62);
        next[id] = last;
      }
      setTops(next);
    };
    measure();
    const timers = [window.setTimeout(measure, 340), window.setTimeout(measure, 720)];
    window.addEventListener("resize", measure);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", measure);
    };
    // The step is what changes which cues show and where their messages sit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
  return (
    <div className={cueStyles.layer} aria-hidden="true">
      {cues.map((cue) => {
        const top = tops[cue.id];
        if (top === undefined) return null;
        const Icon = cue.icon;
        return (
          <span key={cue.id} className={cueStyles.cue} style={{ top }}>
            <span className={cueStyles.card}>
              <span className={cueStyles.icon}><Icon aria-hidden="true" /></span>
              <span className={cueStyles.text}>
                <span className={cueStyles.eyebrow}>{cue.eyebrow}</span>
                <span className={cueStyles.title}>{cue.title}</span>
              </span>
            </span>
            <span className={cueStyles.line} />
            <span className={cueStyles.node} />
          </span>
        );
      })}
    </div>
  );
}

/* ═════════════════════════ Store chat: a sale in the widget ═════════════════════════ */

const PIECES: DemoProductItem[] = [
  { name: "Tailored Cashmere Blazer", price: "$1,590.00", img: "/images/demo/lv/cashmere-blazer.webp" },
  { name: "Silk Draped Blouse", price: "$520.00", img: "/images/demo/lv/silk-blouse.webp" },
  { name: "Patent Ankle Boots", price: "$970.00", img: "/images/demo/lv/patent-boots.webp" },
];
const PICK = PIECES[1];

// Timeline (ms)
const T = { ask: 300, typing: 1100, answer: 1900, cards: 2300, toAdd: 3500, clickAdd: 4200, added: 4300, bar: 4600, toBar: 5300, clickBar: 6000, checkout: 6200, toPay: 7000, clickPay: 7700, done: 8300 };
function StoreSale({ scale, onMs }: { scale: number; onMs: (ms: number) => void }) {
  const { ref, ms } = useScene(T.done, { fromStart: true });
  useEffect(() => onMs(ms), [ms, onMs]);
  const at = (t: number) => ms >= t;
  const stage = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const payRef = useRef<HTMLSpanElement>(null);
  const step = ms < T.toAdd ? "rest" : ms < T.toBar ? "add" : ms < T.toPay ? "bar" : "pay";
  const frame = ref as React.RefObject<HTMLDivElement>;
  const pos = usePointer(frame, step, () => {
    if (step === "add") return frame.current?.querySelectorAll(".chat-demo-product-cta")[1];
    if (step === "bar") return frame.current?.querySelector(".chat-demo-view-cart");
    if (step === "pay") return payRef.current;
    return null;
  });

  // Keep the newest message in view, as the widget does.
  const shownCount = [T.ask, T.answer, T.cards, T.bar].filter((t) => ms >= t).length;
  useEffect(() => {
    if (list.current) list.current.scrollTop = list.current.scrollHeight;
  }, [shownCount]);

  const cueStep = `${at(T.cards)}-${at(T.bar)}-${at(T.done)}`;
  const cues: Cue[] = [
    at(T.cards) && { id: "find", icon: Search, eyebrow: "Product discovery", title: "For the occasion", anchor: () => stage.current?.querySelector(".chat-demo-carousel-wrap") },
    at(T.bar) && { id: "cart", icon: ShoppingBag, eyebrow: "Added to cart", title: PICK.name, anchor: () => stage.current?.querySelector(".chat-demo-cart-sticky") },
    at(T.done) && { id: "sale", icon: Check, eyebrow: "Sale", title: `Order #1047 · ${PICK.price}`, anchor: () => stage.current?.querySelector("[data-done-anchor]") },
  ].filter(Boolean) as Cue[];

  return (
    <div ref={stage} className={c.stage}>
      <div
        ref={ref}
        className={c.frame}
        style={{ width: 400 * scale, height: 660 * scale }}
        role="img"
        aria-label="A shopper asks the store's chat for an outfit, adds the suggested blouse to the cart and pays at checkout"
      >
        <div className="chat-demo-container" style={{ transform: `scale(${scale})` }}>
          <div className="chat-demo-header">
            <div className="chat-demo-avatar"><AureviaMark size={32} animate /></div>
            <div className="chat-demo-header-text">
              <div className="chat-demo-name font-fraunces">Sales Agent</div>
              <div className="chat-demo-status"><span className="chat-demo-status-dot" />Online</div>
            </div>
            <span className="chat-demo-new-chat-btn" aria-hidden="true"><SquarePen className="w-[15px] h-[15px]" strokeWidth={2} /></span>
          </div>

          <div className="chat-demo-messages" ref={list}>
            {at(T.ask) && <div className="chat-demo-bubble chat-demo-right chat-demo-pop">Something for a gallery opening. Sharp, but not stiff.</div>}
            {at(T.typing) && !at(T.answer) && (
              <div className="chat-demo-bot-row">
                <AureviaMark size={26} />
                <div className="chat-demo-bubble chat-demo-left chat-demo-typing-bubble">
                  <span className="chat-demo-dot" /><span className="chat-demo-dot" /><span className="chat-demo-dot" />
                </div>
              </div>
            )}
            {at(T.answer) && (
              <div className="chat-demo-bot-row">
                <AureviaMark size={26} />
                <div className="chat-demo-bubble chat-demo-left chat-demo-pop">Three pieces that do exactly that:</div>
              </div>
            )}
            {at(T.cards) && (
              <div className={cx(c.cards, at(T.clickAdd) && !at(T.added + 160) && c.pressSecond)}>
                <DemoProducts items={PIECES} added={at(T.added) ? [PICK.name] : []} />
              </div>
            )}
          </div>

          {at(T.bar) && (
            <div className="chat-demo-cart-sticky">
              <div className="chat-demo-cart-sticky-inner chat-demo-cart-bar-in">
                <span className="chat-demo-cart-summary">1 item · {PICK.price}</span>
                <span className={cx("chat-demo-view-cart", at(T.clickBar) && !at(T.checkout + 200) && c.pressed)}>CHECKOUT</span>
              </div>
            </div>
          )}

          <div className="chat-demo-input-wrap">
            <div className="chat-demo-input-pill">
              <span className="chat-demo-attach-btn" aria-hidden><ImageIcon className="w-4 h-4" strokeWidth={2} /></span>
              <span className="chat-demo-input-placeholder">Ask Aurevia</span>
              <span className="chat-demo-send-btn" aria-hidden><ArrowUp className="w-[18px] h-[18px]" strokeWidth={2.5} /></span>
            </div>
            <div className="chat-demo-powered-by">
              <img src="/images/aurevia-logo-mark.webp" alt="" />
              <span>Powered by Aurevia.io</span>
            </div>
          </div>
        </div>

        <Checkout
          open={at(T.checkout)}
          lines={[{ name: PICK.name, price: PICK.price, img: String(PICK.img) }]}
          total={PICK.price}
          paying={at(T.clickPay)}
          pressed={at(T.clickPay) && !at(T.clickPay + 200)}
          payRef={payRef as React.RefObject<HTMLSpanElement>}
        />
        <Confirmed on={at(T.done)} order="#1047" total={PICK.price} how="Sold in the store chat" />
        <span data-done-anchor className={c.doneAnchor} />
        <Pointer pos={pos} ms={ms} clicks={[T.clickAdd, T.clickBar, T.clickPay]} hidden={!at(T.toAdd) || at(T.done)} />
      </div>
      <CueLayer stage={stage} cues={cues} step={cueStep} />
    </div>
  );
}

/* ═════════════════════════ WhatsApp, Instagram, email: the cart recovery demos ═════════════════════════ */

type TimedCue = Omit<Cue, "anchor"> & { at: number; anchor: (stage: HTMLElement) => Element | null | undefined };
const SALE_ANCHOR = "[data-done-anchor]";

/** One of the cart recovery page's demos in the hero frame, with margin cues timed off the demo's own clock. */
function AppSale({
  scale,
  cues,
  onMs,
  children,
}: {
  scale: number;
  cues: TimedCue[];
  onMs: (ms: number) => void;
  children: (onMs: (ms: number) => void) => React.ReactNode;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const [ms, setMs] = useState(0);
  useEffect(() => onMs(ms), [ms, onMs]);
  const shown = cues.filter((cue) => ms >= cue.at);
  const layerCues: Cue[] = shown.map((cue) => ({ ...cue, anchor: () => (stage.current ? cue.anchor(stage.current) : null) }));
  return (
    <div ref={stage} className={c.stage}>
      <div className={c.appFrame} style={{ width: 400 * scale, height: 660 * scale }}>
        {children(setMs)}
        <span data-done-anchor className={c.doneAnchor} />
      </div>
      <CueLayer stage={stage} cues={layerCues} step={shown.map((cue) => cue.id).join()} />
    </div>
  );
}

const WHATSAPP_CUES: TimedCue[] = [
  { id: "nudge", at: W.nudge, icon: BellRing, eyebrow: "Cart recovery", title: "Reminder on WhatsApp", anchor: (el) => el.querySelector(".demo-wa-msg") },
  { id: "ship", at: W.answer, icon: Truck, eyebrow: "Shipping policy", title: "Arrives Wednesday", anchor: (el) => el.querySelectorAll(".demo-wa-msg")[2] },
  { id: "sale", at: W.done, icon: Check, eyebrow: "Sale", title: "Order #1044 · $520.00", anchor: (el) => el.querySelector(SALE_ANCHOR) },
];
const INSTAGRAM_CUES: TimedCue[] = [
  { id: "story", at: S.ask, icon: Instagram, eyebrow: "Story reply", title: "“Is this available?”", anchor: (el) => el.querySelector(`.${r.story}`) },
  { id: "link", at: S.link, icon: Link2, eyebrow: "Checkout link", title: "Size M in the cart", anchor: (el) => el.querySelector(`.${r.linkCard}`) },
  { id: "sale", at: S.done, icon: Check, eyebrow: "Sale", title: "Order #1046 · $148.00", anchor: (el) => el.querySelector(SALE_ANCHOR) },
];
const EMAIL_CUES: TimedCue[] = [
  { id: "size", at: M.answer, icon: BookOpen, eyebrow: "Knowledge base", title: "From the size guide", anchor: (el) => el.querySelectorAll(`.${r.message}`)[1] },
  { id: "link", at: M.btn, icon: Link2, eyebrow: "Checkout link", title: "Boots in a 38", anchor: (el) => el.querySelector(`.${r.threadBtn}`) },
  { id: "sale", at: M.done, icon: Check, eyebrow: "Sale", title: "Order #1048 · $970.00", anchor: (el) => el.querySelector(SALE_ANCHOR) },
];

/* ═════════════════════════ Tabs ═════════════════════════ */

/** When each tab's order is confirmed, on its own scene clock. */
const DONE_AT: Record<ChannelKind, number> = { store: T.done, whatsapp: W.done, instagram: S.done, email: M.done };
/** How long the confirmed order stays up before the next tab takes over (the scenes hold 2.8s before replaying, and a
    slow device sees the end a frame or two late, so this stays well inside that). */
const AFTER_SALE_MS = 2000;

export default function HeroChannels() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const scale = useFitScale();
  const tab = TABS[active];
  // The active scene's clock. Scenes only run while on screen, so the tabs never move on while nobody is looking.
  const [ms, setMs] = useState(0);
  // Latched: once the order is confirmed the hand-over is due, even if the scene starts replaying first.
  const [sold, setSold] = useState(false);
  if (!sold && ms >= DONE_AT[tab.kind]) setSold(true);
  const cycling = auto && TABS.filter((t) => t.ready).length > 1;

  // Once this tab's order is confirmed, hold on it for a beat, then hand over to the next ready tab. A click on any
  // tab stops the cycling.
  useEffect(() => {
    if (!cycling || !sold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      const order = TABS.map((t, i) => ({ t, i })).filter(({ t }) => t.ready);
      const at = order.findIndex(({ i }) => i === active);
      setMs(0);
      setSold(false);
      setActive(order[(at + 1) % order.length].i);
    }, AFTER_SALE_MS);
    return () => window.clearTimeout(id);
  }, [active, cycling, sold]);

  return (
    <div className={c.root}>
      <div className={c.tabs} role="tablist" aria-label="See a sale on each channel">
        {TABS.map((t, i) => (
          <button
            key={t.kind}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={t.label}
            title={t.label}
            className={cx(c.tab, i === active && c.tabOn)}
            onClick={() => {
              setAuto(false);
              setMs(0);
              setSold(false);
              setActive(i);
            }}
          >
            <ChannelMark kind={t.kind} className={c.mark} />
            {/* While the tabs play on their own, a ring fills round the active one as its sale plays. */}
            {i === active && cycling ? (
              <svg key={active} className={c.ring} viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="22.5" pathLength={100} style={{ strokeDashoffset: sold ? 0 : 100 - Math.min(1, ms / DONE_AT[t.kind]) * 100 }} />
              </svg>
            ) : null}
          </button>
        ))}
      </div>
      <div role="tabpanel" className={c.panel}>
        {tab.kind === "store" ? (
          <StoreSale key={active} scale={scale} onMs={setMs} />
        ) : tab.kind === "whatsapp" ? (
          <AppSale key={active} scale={scale} cues={WHATSAPP_CUES} onMs={setMs}>{(onMs) => <WhatsAppRecoveryDemo onMs={onMs} />}</AppSale>
        ) : tab.kind === "instagram" ? (
          <AppSale key={active} scale={scale} cues={INSTAGRAM_CUES} onMs={setMs}>{(onMs) => <ShopChatDemo theme="instagram" onMs={onMs} />}</AppSale>
        ) : (
          <AppSale key={active} scale={scale} cues={EMAIL_CUES} onMs={setMs}>{(onMs) => <EmailSaleDemo onMs={onMs} />}</AppSale>
        )}
      </div>
    </div>
  );
}
