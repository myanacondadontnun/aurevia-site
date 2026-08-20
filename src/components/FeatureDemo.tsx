"use client";

/**
 * Feature-page product demos — the same widget chrome as the hero ChatDemo
 * (chat-demo-* classes in globals.css), driven by a per-page script so every
 * Platform page shows the AI doing that page's exact job. Two extra variants
 * cover the non-chat products: an animated dashboard panel (metrics) and a
 * webhook/terminal panel (code).
 */

import { useState, useEffect, useRef } from "react";
import { ArrowUp, Image as ImageIcon, SquarePen } from "lucide-react";

/* ---------- shared product art (inline SVG data URIs, no assets) ---------- */

const svg = (raw: string) =>
  `data:image/svg+xml,${encodeURIComponent(raw.replace(/\n\s*/g, ""))}`;

const DEMO_IMAGES: Record<string, string> = {
  serum: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#d8ede7"/><stop offset="100%" stop-color="#a8d5c8"/></linearGradient>
  </defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <rect x="118" y="52" width="44" height="26" rx="5" fill="#2d3737"/>
  <rect x="126" y="40" width="28" height="16" rx="4" fill="#4a5552"/>
  <rect x="104" y="78" width="72" height="140" rx="14" fill="url(#g)"/>
  <rect x="104" y="78" width="72" height="140" rx="14" fill="none" stroke="#8fbfb2" stroke-width="1.5"/>
  <rect x="116" y="118" width="48" height="52" rx="4" fill="#ffffff" opacity="0.85"/>
  <rect x="122" y="128" width="36" height="5" rx="2.5" fill="#2d3737" opacity="0.7"/>
  <rect x="122" y="140" width="26" height="4" rx="2" fill="#2d3737" opacity="0.4"/>
  <rect x="100" y="222" width="80" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
  cream: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient>
    <linearGradient id="j" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fdfdfc"/><stop offset="100%" stop-color="#e4e2da"/></linearGradient>
  </defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <rect x="88" y="108" width="104" height="86" rx="18" fill="url(#j)" stroke="#cfccc2" stroke-width="1.5"/>
  <rect x="82" y="86" width="116" height="30" rx="10" fill="#c9b896"/>
  <rect x="82" y="86" width="116" height="12" rx="6" fill="#d8caac"/>
  <rect x="106" y="138" width="68" height="30" rx="4" fill="#ffffff" opacity="0.9"/>
  <rect x="114" y="147" width="52" height="5" rx="2.5" fill="#2d3737" opacity="0.65"/>
  <rect x="114" y="157" width="34" height="4" rx="2" fill="#2d3737" opacity="0.35"/>
  <rect x="84" y="198" width="112" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
  spf: svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient>
    <linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff4d6"/><stop offset="100%" stop-color="#f5d98b"/></linearGradient>
  </defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <rect x="112" y="60" width="56" height="18" rx="6" fill="#2d3737"/>
  <path d="M108 84 h64 l6 118 a12 12 0 0 1 -12 12 h-52 a12 12 0 0 1 -12 -12 Z" fill="url(#t)" stroke="#e2c46e" stroke-width="1.5"/>
  <rect x="118" y="122" width="44" height="56" rx="5" fill="#ffffff" opacity="0.9"/>
  <rect x="124" y="132" width="32" height="6" rx="3" fill="#2d3737" opacity="0.75"/>
  <rect x="124" y="144" width="22" height="4" rx="2" fill="#2d3737" opacity="0.4"/>
  <circle cx="140" cy="164" r="8" fill="#f0b429" opacity="0.8"/>
  <rect x="104" y="216" width="72" height="6" rx="3" fill="rgba(0,0,0,0.07)"/>
</svg>`),
};

/* ---------- chat variant ---------- */

export interface DemoProductItem {
  name: string;
  price: string;
  /** key into the built-in demo image set */
  img: keyof typeof DEMO_IMAGES | string;
}

export type ChatStep =
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
  | { type: "cartbar"; summary: string; delay?: number };

function AureviaMark({ size, animate = false }: { size: number; animate?: boolean }) {
  return (
    <span
      className={`chat-demo-mark ${animate ? "chat-demo-mark-animate" : ""}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="chat-demo-mark-breathe">
        <img src="/images/widget-mark-outer.png" alt="" className="chat-demo-mark-outer" />
      </span>
    </span>
  );
}

function DemoProducts({ items }: { items: DemoProductItem[] }) {
  return (
    <div className="chat-demo-carousel-wrap chat-demo-pop">
      <div className="chat-demo-carousel-strip" style={{ padding: "4px 2px 5px" }}>
        {items.map((p) => (
          <article key={p.name} className="chat-demo-product-card">
            <div className="chat-demo-product-img-wrap">
              <div className="chat-demo-product-img-frame">
                <img
                  src={DEMO_IMAGES[p.img] ?? p.img}
                  alt=""
                  className="chat-demo-product-img"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="chat-demo-product-body">
              <h4 className="chat-demo-product-name">{p.name}</h4>
              <p className="chat-demo-product-price">{p.price}</p>
              <button type="button" className="chat-demo-product-cta" tabIndex={-1}>
                Add to cart
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

export function FeatureChatDemo({
  agentName = "Sales Agent",
  script,
}: {
  agentName?: string;
  script: ChatStep[];
}) {
  const [visible, setVisible] = useState<number[]>([]);
  const [typingFrom, setTypingFrom] = useState<"none" | "bot" | "user">("none");
  const [cartBar, setCartBar] = useState<string | null>(null);
  const [cycle, setCycle] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisible([]);
    setTypingFrom("none");
    setCartBar(null);

    let elapsed = 600;

    script.forEach((step, index) => {
      elapsed += step.delay ?? (step.type === "user" ? 1900 : 1100);

      if (step.type === "bot" || step.type === "user") {
        const typing = step.typing ?? Math.min(1600, 500 + step.text.length * 14);
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
      } else {
        const t = setTimeout(() => setVisible((prev) => [...prev, index]), elapsed);
        timersRef.current.push(t);
      }
    });

    const loop = setTimeout(() => setCycle((c) => c + 1), elapsed + 6000);
    timersRef.current.push(loop);

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [cycle, script]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visible, typingFrom, cartBar]);

  return (
    <div className="chat-demo-scale-wrap">
      <div className="chat-demo-container">
        <div className="chat-demo-header">
          <div className="chat-demo-avatar">
            <AureviaMark size={32} animate />
          </div>
          <div className="chat-demo-header-text">
            <div className="chat-demo-name font-fraunces">{agentName}</div>
            <div className="chat-demo-status">
              <span className="chat-demo-status-dot" />
              Online
            </div>
          </div>
          <button type="button" className="chat-demo-new-chat-btn" aria-label="Start new chat" tabIndex={-1}>
            <SquarePen className="w-[15px] h-[15px]" strokeWidth={2} />
          </button>
        </div>

        <div className="chat-demo-messages" ref={scrollRef}>
          {visible.map((i) => {
            const step = script[i];
            if (step.type === "products") {
              return <DemoProducts key={i} items={step.items} />;
            }
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
            return step.type === "bot" ? (
              <div key={i} className="chat-demo-bot-row">
                <AureviaMark size={26} />
                <div className="chat-demo-bubble chat-demo-left chat-demo-pop">{bubble}</div>
              </div>
            ) : (
              <div key={i} className="chat-demo-bubble chat-demo-right chat-demo-pop">
                {bubble}
              </div>
            );
          })}

          {typingFrom === "bot" && (
            <div className="chat-demo-bot-row">
              <AureviaMark size={26} />
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
            <img src="/images/aurevia-logo-mark.png" alt="" />
            <span>Powered by Aurevia.io</span>
          </div>
        </div>
      </div>
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
          <p className="font-fraunces text-[15px] font-semibold text-[#2d3737] leading-tight">{title}</p>
          <p className="text-[11px] font-light text-[#2d3737]/70 leading-tight mt-px">Aurevia dashboard</p>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#00795c] bg-[#00CC99]/10 rounded-full px-2.5 py-1">
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
              <p className="mt-1.5 text-[10px] font-semibold text-[#00795c]">{s.delta}</p>
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
                <stop offset="0%" stopColor="#00CC99" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#00CC99" stopOpacity="0" />
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
              stroke="#00CC99"
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
              fill="#00CC99"
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
                    className="h-full rounded-full bg-gradient-to-r from-[#00CC99] to-[#009973]"
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
          <img src="/images/aurevia-logo-mark.png" alt="" />
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
          <div className="chat-demo-pop mt-3 inline-flex items-center gap-2 rounded-full border border-[#00CC99]/35 bg-[#00CC99]/10 px-3 py-1.5 text-[11px] font-semibold text-[#00CC99]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00CC99]" />
            {responseChip}
          </div>
        )}
      </div>
    </div>
  );
}
