"use client";

/**
 * Feature-page product demos: the same widget chrome as the hero ChatDemo
 * (chat-demo-* classes in globals.css), driven by a per-page script so every
 * Platform page shows the AI doing that page's exact job. Two extra variants
 * cover the non-chat products: an animated dashboard panel (metrics) and a
 * webhook/terminal panel (code).
 */

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  ArrowUp,
  BookOpen,
  Check,
  Image as ImageIcon,
  Mail,
  MessageCircle,
  RefreshCw,
  Search,
  ShoppingBag,
  SquarePen,
  Ticket,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import cueStyles from "./featureCues.module.css";

import { DEMO_ART as DEMO_IMAGES } from "@/lib/demoArt";


/* ---------- chat variant ---------- */

export interface DemoProductItem {
  name: string;
  price: string;
  /** key into the built-in demo image set */
  img: keyof typeof DEMO_IMAGES | string;
}

/** A margin cue: what the agent just did, shown beside its message on wide screens. The icon is a key, not a
    component, so server pages can pass it. */
export type DemoCueIcon = "book" | "search" | "cart" | "user" | "mail" | "sync" | "chat" | "ticket" | "check";
export interface DemoCue {
  icon: DemoCueIcon;
  eyebrow: string;
  title: string;
}

const CUE_ICONS: Record<DemoCueIcon, LucideIcon> = {
  book: BookOpen,
  search: Search,
  cart: ShoppingBag,
  user: UserRound,
  mail: Mail,
  sync: RefreshCw,
  chat: MessageCircle,
  ticket: Ticket,
  check: Check,
};

export type ChatStep = { cue?: DemoCue } & (
  | { type: "bot"; text: string; typing?: number; delay?: number }
  | { type: "user"; text: string; typing?: number; delay?: number }
  | { type: "products"; items: DemoProductItem[]; delay?: number }
  | {
      type: "card";
      head: string;
      title: string;
      note?: string;
      progress?: boolean;
      delay?: number;
    }
  | { type: "cartbar"; summary: string; delay?: number }
  /** Flip a visible product card's CTA to "Added ✓" */
  | { type: "addcart"; name: string; delay?: number }
  /** Slide the mini-cart drawer up over the chat */
  | { type: "minicart"; items: DemoCartLine[]; total: string; delay?: number }
  /** Two-product comparison card with a verdict */
  | { type: "compare"; a: DemoCompareSide; b: DemoCompareSide; rows: DemoCompareRow[]; verdict: string; delay?: number }
  /** Human agent joins: header flips to the agent, later bot messages render as the agent */
  | { type: "agent"; name: string; role?: string; delay?: number }
);

export interface DemoCartLine {
  name: string;
  price: string;
  img: string;
  variant?: string;
  qty?: number;
}

export interface DemoCompareSide {
  name: string;
  price: string;
  img: string;
  rating?: string;
}

export interface DemoCompareRow {
  label: string;
  a: string;
  b: string;
  winner?: "a" | "b";
}

export function AureviaMark({ size, animate = false }: { size: number; animate?: boolean }) {
  return (
    <span
      className={`chat-demo-mark ${animate ? "chat-demo-mark-animate" : ""}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="chat-demo-mark-breathe">
        <img src="/images/widget-mark-outer.webp" alt="" className="chat-demo-mark-outer" />
      </span>
    </span>
  );
}

function DemoProducts({ items, added }: { items: DemoProductItem[]; added: string[] }) {
  return (
    <div className="chat-demo-carousel-wrap chat-demo-pop">
      <div className="chat-demo-carousel-strip" style={{ padding: "4px 2px 5px" }}>
        {items.map((p) => (
          <article key={p.name} className={`chat-demo-product-card ${added.includes(p.name) ? "chat-demo-product-added" : ""}`}>
            <div className="chat-demo-product-img-wrap">
              <div className="chat-demo-product-img-frame">
                <img
                  src={DEMO_IMAGES[p.img] ?? p.img}
                  alt={p.name}
                  className="chat-demo-product-img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="chat-demo-product-body">
              <h4 className="chat-demo-product-name">{p.name}</h4>
              <p className="chat-demo-product-price">{p.price}</p>
              <button type="button" className="chat-demo-product-cta" tabIndex={-1}>
                {added.includes(p.name) ? "Added ✓" : "Add to cart"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function DemoStatusCard({
  head,
  title,
  note,
  progress,
}: {
  head: string;
  title: string;
  note?: string;
  progress?: boolean;
}) {
  return (
    <div className="chat-demo-support-card chat-demo-pop">
      <div className="chat-demo-support-card-head">{head}</div>
      <div className="chat-demo-support-card-body">
        <p className="chat-demo-support-strong">{title}</p>
        {note ? <p className="chat-demo-support-muted">{note}</p> : null}
        {progress ? (
          <div className="chat-demo-support-progress" style={{ marginTop: 7 }}>
            <span className="chat-demo-support-dot chat-demo-support-dot-active" />
            <span className="chat-demo-support-line" />
            <span className="chat-demo-support-dot" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DemoCompareCard({
  a,
  b,
  rows,
  verdict,
}: {
  a: DemoCompareSide;
  b: DemoCompareSide;
  rows: DemoCompareRow[];
  verdict: string;
}) {
  return (
    <div className="chat-demo-compare chat-demo-pop">
      <div className="chat-demo-compare-head">Side by side</div>
      <div className="chat-demo-compare-grid">
        <div className="chat-demo-compare-label" />
        {[a, b].map((side) => (
          <div key={side.name} className="chat-demo-compare-product">
            <div className="chat-demo-compare-img">
              <img src={DEMO_IMAGES[side.img] ?? side.img} alt={side.name} loading="lazy" />
            </div>
            <span className="chat-demo-compare-name">{side.name}</span>
            <span className="chat-demo-compare-price">{side.price}</span>
          </div>
        ))}
        {rows.map((row, i) => (
          <div key={row.label} className="chat-demo-compare-row" style={{ animationDelay: `${0.25 + i * 0.18}s` }}>
            <span className="chat-demo-compare-label">{row.label}</span>
            <span className={`chat-demo-compare-cell ${row.winner === "a" ? "chat-demo-compare-win" : ""}`}>{row.a}</span>
            <span className={`chat-demo-compare-cell ${row.winner === "b" ? "chat-demo-compare-win" : ""}`}>{row.b}</span>
          </div>
        ))}
      </div>
      <div className="chat-demo-compare-verdict">
        <span className="chat-demo-compare-verdict-tag">Verdict</span>
        {verdict}
      </div>
    </div>
  );
}

function DemoMiniCart({ open, items, total }: { open: boolean; items: DemoCartLine[]; total: string }) {
  return (
    <>
      <div className={`chat-demo-minicart-backdrop ${open ? "chat-demo-minicart-open" : ""}`} aria-hidden />
      <div className={`chat-demo-minicart ${open ? "chat-demo-minicart-open" : ""}`} aria-hidden={!open}>
        <div className="chat-demo-minicart-head">
          <span className="chat-demo-minicart-title">Your cart</span>
          <span className="chat-demo-minicart-close">×</span>
        </div>
        {items.map((line) => (
          <div key={line.name} className="chat-demo-minicart-line">
            <div className="chat-demo-minicart-thumb">
              <img src={DEMO_IMAGES[line.img] ?? line.img} alt={line.name} />
            </div>
            <div className="chat-demo-minicart-main">
              <span className="chat-demo-minicart-item-title">{line.name}</span>
              {line.variant ? <span className="chat-demo-minicart-variant">{line.variant}</span> : null}
              <div className="chat-demo-minicart-meta">
                <span className="chat-demo-minicart-price">{line.price}</span>
                <span className="chat-demo-minicart-qty">
                  <span className="chat-demo-minicart-qty-btn">−</span>
                  <span className="chat-demo-minicart-qty-val">{line.qty ?? 1}</span>
                  <span className="chat-demo-minicart-qty-btn">+</span>
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="chat-demo-minicart-footer">
          <div className="chat-demo-minicart-total">
            <span>Total</span>
            <strong>{total}</strong>
          </div>
          <span className="chat-demo-minicart-checkout">Checkout</span>
        </div>
      </div>
    </>
  );
}

function AgentAvatar({ name, size }: { name: string; size: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="chat-demo-agent-avatar" style={{ width: size, height: size, fontSize: size * 0.4 }} aria-hidden>
      {initials}
    </span>
  );
}

export function FeatureChatDemo({
  agentName = "Sales Agent",
  script,
  bare = false,
  loopPause = 6000,
  startOnView = false,
  active,
  scale,
}: {
  agentName?: string;
  script: ChatStep[];
  /** Skip the built-in 0.85 scale wrap (for device frames that do their own scaling) */
  bare?: boolean;
  /** ms to hold the finished conversation before it replays */
  loopPause?: number;
  /** Start the script when the demo scrolls into view and reset when it leaves */
  startOnView?: boolean;
  /** Controlled playback: plays from the top while true, resets while false. Overrides startOnView. */
  active?: boolean;
  /** Override the built-in 0.85 scale (the container is 400×660 at scale 1) */
  scale?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(!startOnView);
  const armed = active ?? inView;
  const [visible, setVisible] = useState<number[]>([]);
  const [typingFrom, setTypingFrom] = useState<"none" | "bot" | "user">("none");
  const [cartBar, setCartBar] = useState<string | null>(null);
  const [added, setAdded] = useState<string[]>([]);
  const [miniCart, setMiniCart] = useState<{ items: DemoCartLine[]; total: string } | null>(null);
  const [agent, setAgent] = useState<{ name: string; role?: string; at: number } | null>(null);
  const [cycle, setCycle] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!startOnView || active !== undefined) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      // Arm while the demo is still ~a screen's third below the fold, so the first
      // message is already on screen by the time the row is fully in view.
      { threshold: 0.01, rootMargin: "0px 0px 30% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView, active]);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisible([]);
    setTypingFrom("none");
    setCartBar(null);
    setAdded([]);
    setMiniCart(null);
    setAgent(null);

    if (!armed) return;

    let elapsed = 120;

    script.forEach((step, index) => {
      elapsed += step.delay ?? (index === 0 ? 150 : step.type === "user" ? 1900 : 1100);

      if (step.type === "bot" || step.type === "user") {
        const typing = step.typing ?? (index === 0 ? 450 : Math.min(1600, 500 + step.text.length * 14));
        const side = step.type === "bot" ? "bot" : "user";
        const t1 = setTimeout(() => setTypingFrom(side), elapsed);
        elapsed += typing;
        const t2 = setTimeout(() => {
          setTypingFrom("none");
          setVisible((prev) => [...prev, index]);
        }, elapsed);
        timersRef.current.push(t1, t2);
      } else if (step.type === "cartbar") {
        const t = setTimeout(() => setCartBar(step.summary), elapsed);
        timersRef.current.push(t);
      } else if (step.type === "addcart") {
        const t = setTimeout(() => setAdded((prev) => [...prev, step.name]), elapsed);
        timersRef.current.push(t);
      } else if (step.type === "minicart") {
        const t = setTimeout(() => setMiniCart({ items: step.items, total: step.total }), elapsed);
        timersRef.current.push(t);
      } else if (step.type === "agent") {
        const t = setTimeout(() => {
          setAgent({ name: step.name, role: step.role, at: index });
          setVisible((prev) => [...prev, index]);
        }, elapsed);
        timersRef.current.push(t);
      } else {
        const t = setTimeout(() => setVisible((prev) => [...prev, index]), elapsed);
        timersRef.current.push(t);
      }
    });

    const loop = setTimeout(() => setCycle((c) => c + 1), elapsed + loopPause);
    timersRef.current.push(loop);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [cycle, script, loopPause, armed]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visible, typingFrom, cartBar]);

  // Margin cues (wide screens): one per step that has played and carries a cue, placed level with its message.
  const wrapRef = useRef<HTMLDivElement>(null);
  const firedCues = script.flatMap((st, i) =>
    st.cue && (visible.includes(i) || (st.type === "cartbar" && cartBar !== null)) ? [i] : []
  );
  const firedKey = firedCues.join(",");
  const [cueSpots, setCueSpots] = useState<Record<number, { top: number; visible: boolean }>>({});
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const list = scrollRef.current;
    if (!wrap || !list || !firedKey) return setCueSpots({});
    const ids = firedKey.split(",").map(Number);
    const measure = () => {
      if (!window.matchMedia("(min-width: 1280px)").matches) return setCueSpots({});
      const wr = wrap.getBoundingClientRect();
      const lr = list.getBoundingClientRect();
      const next: Record<number, { top: number; visible: boolean }> = {};
      let lastTop = -Infinity;
      for (const i of ids) {
        const isCart = script[i].type === "cartbar";
        const anchor = isCart
          ? wrap.querySelector<HTMLElement>(".chat-demo-cart-sticky")
          : (wrap.querySelector<HTMLElement>(`[data-step="${i}"]`)?.firstElementChild as HTMLElement | null);
        if (!anchor) continue;
        const r = anchor.getBoundingClientRect();
        // Keep cards from overlapping when two messages sit close together.
        const top = Math.max(r.top - wr.top + Math.min(r.height / 2, 16), lastTop + 58);
        const visible = isCart || (r.top + 6 >= lr.top && r.top <= lr.bottom);
        if (visible) lastTop = top;
        next[i] = { top, visible };
      }
      setCueSpots(next);
    };
    measure();
    const timers = [window.setTimeout(measure, 320), window.setTimeout(measure, 700)];
    list.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      timers.forEach(clearTimeout);
      list.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [firedKey, script]);

  const renderMessage = (i: number) => {
        const step = script[i];
        if (step.type === "products") {
          return <DemoProducts key={i} items={step.items} added={added} />;
        }
        if (step.type === "compare") {
          return <DemoCompareCard key={i} a={step.a} b={step.b} rows={step.rows} verdict={step.verdict} />;
        }
        if (step.type === "agent") {
          return (
            <div key={i} className="chat-demo-system-line chat-demo-pop">
              <AgentAvatar name={step.name} size={18} />
              <span>
                <strong>{step.name}</strong> joined the chat
              </span>
            </div>
          );
        }
        if (step.type === "addcart" || step.type === "minicart") return null;
        if (step.type === "card") {
          return (
            <DemoStatusCard
              key={i}
              head={step.head}
              title={step.title}
              note={step.note}
              progress={step.progress}
            />
          );
        }
        if (step.type === "cartbar") return null;
        const lines = step.text.split("\n");
        const bubble = lines.map((line, li) => (
          <span key={li}>
            {line}
            {li < lines.length - 1 && <br />}
          </span>
        ));
        const fromAgent = agent !== null && i > agent.at;
        return step.type === "bot" ? (
          <div key={i} className="chat-demo-bot-row">
            {fromAgent ? <AgentAvatar name={agent.name} size={26} /> : <AureviaMark size={26} />}
            <div className={`chat-demo-bubble chat-demo-left chat-demo-pop ${fromAgent ? "chat-demo-left-agent" : ""}`}>{bubble}</div>
          </div>
        ) : (
          <div key={i} className="chat-demo-bubble chat-demo-right chat-demo-pop">
            {bubble}
          </div>
        );
  };

  const container = (
      <div
        ref={rootRef}
        className={`chat-demo-container ${bare ? "chat-demo-bare" : ""}`}
        style={scale !== undefined && !bare ? { transform: `scale(${scale})` } : undefined}
      >
        <div className={`chat-demo-header ${agent ? "chat-demo-header-agent" : ""}`}>
          <div className="chat-demo-avatar">
            {agent ? <AgentAvatar name={agent.name} size={32} /> : <AureviaMark size={32} animate />}
          </div>
          <div className="chat-demo-header-text">
            <div className="chat-demo-name font-fraunces">{agent ? agent.name : agentName}</div>
            <div className="chat-demo-status">
              <span className="chat-demo-status-dot" />
              {agent ? agent.role ?? "Live agent" : "Online"}
            </div>
          </div>
          <button type="button" className="chat-demo-new-chat-btn" aria-label="Start new chat" tabIndex={-1}>
            <SquarePen className="w-[15px] h-[15px]" strokeWidth={2} />
          </button>
        </div>

        <div className="chat-demo-messages" ref={scrollRef}>
          {visible.map((i) => (
            // display: contents keeps the chat's layout; the cue layer measures the first child.
            <div key={i} data-step={i} style={{ display: "contents" }}>
              {renderMessage(i)}
            </div>
          ))}

          {typingFrom === "bot" && (
            <div className="chat-demo-bot-row">
              {agent ? <AgentAvatar name={agent.name} size={26} /> : <AureviaMark size={26} />}
              <div className="chat-demo-bubble chat-demo-left chat-demo-typing-bubble">
                <span className="chat-demo-dot" />
                <span className="chat-demo-dot" />
                <span className="chat-demo-dot" />
              </div>
            </div>
          )}
          {typingFrom === "user" && (
            <div className="chat-demo-bubble chat-demo-right chat-demo-typing-bubble">
              <span className="chat-demo-dot chat-demo-dot-customer" />
              <span className="chat-demo-dot chat-demo-dot-customer" />
              <span className="chat-demo-dot chat-demo-dot-customer" />
            </div>
          )}
        </div>

        {cartBar && (
          <div className="chat-demo-cart-sticky">
            <div className="chat-demo-cart-sticky-inner chat-demo-cart-bar-in">
              <span className="chat-demo-cart-summary">{cartBar}</span>
              <span className="chat-demo-view-cart">VIEW CART</span>
            </div>
          </div>
        )}

        <div className="chat-demo-input-wrap">
          <div className="chat-demo-input-pill">
            <span className="chat-demo-attach-btn" aria-hidden>
              <ImageIcon className="w-4 h-4" strokeWidth={2} />
            </span>
            <span className="chat-demo-input-placeholder">Ask Aurevia</span>
            <span className="chat-demo-send-btn" aria-hidden>
              <ArrowUp className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </span>
          </div>
          <div className="chat-demo-powered-by">
            <img src="/images/aurevia-logo-mark.webp" alt="" />
            <span>Powered by Aurevia.io</span>
          </div>
        </div>

        {miniCart ? <DemoMiniCart open items={miniCart.items} total={miniCart.total} /> : null}
      </div>
  );

  if (bare) return container;
  return (
    <div
      ref={wrapRef}
      className="chat-demo-scale-wrap"
      style={{ position: "relative", ...(scale !== undefined ? { width: 400 * scale, height: 660 * scale } : {}) }}
    >
      {container}
      {firedCues.length > 0 ? (
        <div className={cueStyles.layer} aria-hidden="true">
          {firedCues.map((i) => {
            const spot = cueSpots[i];
            const cue = script[i].cue;
            if (!spot || !cue) return null;
            const Icon = CUE_ICONS[cue.icon];
            return (
              <span key={`${cycle}-${i}`} className={`${cueStyles.cue} ${spot.visible ? "" : cueStyles.gone}`} style={{ top: spot.top }}>
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
      ) : null}
    </div>
  );
}

/* ---------- metrics variant (dashboard-flavored pages) ---------- */

export interface MetricStat {
  label: string;
  value: string;
  delta?: string;
}

export interface MetricRow {
  label: string;
  value: string;
  /** 0–100, bar width */
  pct: number;
}

export function FeatureMetricsDemo({
  title,
  stats,
  rows,
  rowsHeading,
  chart = true,
}: {
  title: string;
  stats: MetricStat[];
  rows?: MetricRow[];
  rowsHeading?: string;
  chart?: boolean;
}) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="w-full max-w-[400px] rounded-xl bg-[#F3F6F5] overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 100% -20%, rgba(0, 82, 61, 0.22) 0%, transparent 65%)",
        boxShadow:
          "0 24px 48px rgba(15, 15, 15, 0.18), 0 8px 16px rgba(15, 15, 15, 0.08)",
      }}
    >
      <div className="flex items-center gap-2.5 px-5 pt-4 pb-3">
        <AureviaMark size={28} animate />
        <div className="min-w-0 flex-1">
          <p className="font-fraunces text-[15px] font-normal text-[#2d3737] leading-tight">{title}</p>
          <p className="text-[11px] font-normal text-[#2d3737]/70 leading-tight mt-px">Aurevia dashboard</p>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#00665a] bg-[#007f68]/[0.08] rounded-full px-2.5 py-1">
          Last 7 days
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 px-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(15,15,15,0.06)] transition-all duration-700"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(10px)",
              transitionDelay: `${i * 130}ms`,
            }}
          >
            <p className="text-[9.5px] font-medium uppercase tracking-wide text-[#6b7573] leading-tight">
              {s.label}
            </p>
            <p className="mt-1 text-[17px] font-semibold text-[#2d3737] leading-none">{s.value}</p>
            {s.delta ? (
              <p className="mt-1.5 text-[10px] font-semibold text-[#00665A]">{s.delta}</p>
            ) : null}
          </div>
        ))}
      </div>

      {chart ? (
        <div
          className="mx-4 mt-3 rounded-lg bg-white p-3 shadow-[0_1px_2px_rgba(15,15,15,0.06)] transition-opacity duration-700"
          style={{ opacity: entered ? 1 : 0, transitionDelay: "380ms" }}
        >
          <svg viewBox="0 0 320 84" className="w-full" aria-hidden>
            <defs>
              <linearGradient id="fmArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#007f68" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#007f68" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[21, 42, 63].map((y) => (
              <line key={y} x1="8" y1={y} x2="312" y2={y} stroke="rgba(45,55,55,0.07)" strokeWidth="1" />
            ))}
            <path
              d="M8 64 C48 60 72 52 104 50 C140 48 156 40 196 34 C232 29 264 24 312 14 L312 80 L8 80 Z"
              fill="url(#fmArea)"
              style={{
                opacity: entered ? 1 : 0,
                transition: "opacity 0.9s ease 0.8s",
              }}
            />
            <path
              d="M8 64 C48 60 72 52 104 50 C140 48 156 40 196 34 C232 29 264 24 312 14"
              fill="none"
              stroke="#007f68"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={100}
              style={{
                strokeDashoffset: entered ? 0 : 100,
                transition: "stroke-dashoffset 1.4s cubic-bezier(0.65,0,0.35,1) 0.5s",
              }}
            />
            <circle
              cx="312"
              cy="14"
              r="4"
              fill="#007f68"
              style={{ opacity: entered ? 1 : 0, transition: "opacity 0.4s ease 1.9s" }}
            />
          </svg>
        </div>
      ) : null}

      {rows && rows.length > 0 ? (
        <div
          className="mx-4 mt-3 rounded-lg bg-white p-3.5 shadow-[0_1px_2px_rgba(15,15,15,0.06)] transition-opacity duration-700"
          style={{ opacity: entered ? 1 : 0, transitionDelay: "520ms" }}
        >
          {rowsHeading ? (
            <p className="mb-2.5 text-[9.5px] font-semibold uppercase tracking-wide text-[#6b7573]">
              {rowsHeading}
            </p>
          ) : null}
          <div className="space-y-2.5">
            {rows.map((r, i) => (
              <div key={r.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-[12px] text-[#2d3737]">{r.label}</span>
                  <span className="text-[11px] font-semibold text-[#2d3737]/70">{r.value}</span>
                </div>
                <div className="mt-1 h-[4px] overflow-hidden rounded-full bg-[#2d3737]/8">
                  <div
                    className="h-full rounded-full bg-[#007f68]"
                    style={{
                      width: entered ? `${r.pct}%` : "0%",
                      transition: `width 1s cubic-bezier(0.65,0,0.35,1) ${700 + i * 150}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="px-4 pb-4 pt-3">
        <div className="chat-demo-powered-by" style={{ padding: 0 }}>
          <img src="/images/aurevia-logo-mark.webp" alt="" />
          <span>Powered by Aurevia.io</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- code variant (API page) ---------- */

export function FeatureCodeDemo({
  fileName,
  lines,
  responseChip,
}: {
  fileName: string;
  lines: string[];
  responseChip: string;
}) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showChip, setShowChip] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setVisibleLines(0);
    setShowChip(false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 500 + i * 340));
    });
    timers.push(setTimeout(() => setShowChip(true), 500 + lines.length * 340 + 500));
    timers.push(setTimeout(() => setCycle((c) => c + 1), 500 + lines.length * 340 + 7000));
    return () => timers.forEach(clearTimeout);
  }, [cycle, lines]);

  return (
    <div
      className="w-full max-w-[440px] overflow-hidden rounded-xl bg-[#101514]"
      style={{
        boxShadow:
          "0 24px 48px rgba(15, 15, 15, 0.22), 0 8px 16px rgba(15, 15, 15, 0.1)",
      }}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span
          className="ml-2 text-[11px] text-white/50"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
        >
          {fileName}
        </span>
      </div>
      <div
        className="px-5 py-4 text-[12px] leading-[1.75]"
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", minHeight: 230 }}
      >
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="chat-demo-pop whitespace-pre text-white/85">
            {line === "" ? " " : line}
          </div>
        ))}
        {showChip && (
          <div className="chat-demo-pop mt-3 inline-flex items-center gap-2 rounded-full border border-[#00a888]/35 bg-[#00a888]/10 px-3 py-1.5 text-[11px] font-semibold text-[#00a888]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00a888]" />
            {responseChip}
          </div>
        )}
      </div>
    </div>
  );
}
