"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Check,
  Copy,
  Download,
  History,
  Home,
  Inbox,
  Infinity as InfinityIcon,
  Loader2,
  Menu,
  MessageSquare,
  Network,
  Plus,
  Settings,
  ShoppingCart,
  Square,
  SquarePen,
  Users,
} from "lucide-react";
import d from "./dashboard.module.css";

/**
 * A replica of the merchant dashboard's Home page in Chat mode (app-frontend DashboardPage + AskAureviaChat +
 * AskAureviaBar + ActionCards + Sidebar), drawn with the app's own classes translated to CSS: same tokens,
 * sizes, spacing, copy and states. It is rendered at the app's real pixel size (1024 wide with the sidebar, or
 * 390 wide as the phone layout) and zoomed to fit its frame, so it is the real layout scaled, not a redraw.
 *
 * `scene` is a plain description of what is on screen at this moment; AskAureviaShowcase drives it on a
 * timeline. Demo store: Linden & Wren (the fashion store from the scenarios section), all numbers illustrative.
 */

export type ThreadPart =
  | { kind: "text"; html: ReactNode }
  | { kind: "chart" }
  | { kind: "productCard"; status: "pending" | "pressing" | "applying" | "done" }
  | { kind: "imageGenerating" }
  | { kind: "generatedImage"; src: string; status: "pending" | "pressing" | "applying" | "done" };

export type Scene = {
  /** Text typed into the empty-state input so far. */
  typed: string;
  sendPressed: boolean;
  /** Once true the thread replaces the analytics board, as in the app. */
  active: boolean;
  question: string;
  thinking: string | null;
  streaming: boolean;
  parts: ThreadPart[];
};

export const EMPTY_SCENE: Scene = { typed: "", sendPressed: false, active: false, question: "", thinking: null, streaming: false, parts: [] };

const OWNER = "Maya";

/* ---------- small pieces ---------- */

function Arc({ size, animated = false, busy = false }: { size: number; animated?: boolean; busy?: boolean }) {
  return (
    <span className={`${d.arc} ${animated || busy ? d.arcAnimated : ""} ${busy ? d.arcBusy : ""}`} style={{ width: size, height: size }} aria-hidden="true">
      <span className={d.arcBreathe}>
        <img className={d.arcOuter} src="/images/app-ui/outer_circle.png" alt="" />
      </span>
    </span>
  );
}

/* The sidebar as the app draws it collapsed (sidebarStyles collapsed + lg): a 4.5rem icon rail, labels,
   captions and the ⌘K hint hidden, each row a centred 36px-high icon. */
function NavRow({ icon, label, active = false }: { icon: ReactNode; label: string; active?: boolean }) {
  return (
    <li>
      <span className={`${d.navRow} ${active ? d.navRowActive : ""}`} title={label}>
        {icon}
      </span>
    </li>
  );
}

function Sidebar() {
  const ic = (Icon: typeof Home, active = false) => <Icon className={`${d.navIcon} ${active ? d.navIconActive : ""}`} strokeWidth={1.75} />;
  return (
    <aside className={d.sidebar}>
      <div className={d.brand}>
        <img src="/images/app-ui/logo.png" alt="" className={d.brandLogo} />
      </div>
      <nav className={d.nav}>
        {[
          { caption: "Daily", rows: [{ icon: ic(Home, true), label: "Home", active: true }, { icon: ic(Inbox), label: "Inbox" }, { icon: ic(Users), label: "Leads" }] },
          { caption: "Store", rows: [{ icon: ic(ShoppingCart), label: "Products" }, { icon: ic(BookOpen), label: "Knowledge" }] },
          { caption: "AI", rows: [{ icon: ic(Network), label: "Agent" }, { icon: ic(InfinityIcon), label: "Aurevia" }] },
        ].map((group, gi) => (
          <ul key={group.caption} className={`${d.navGroup} ${gi > 0 ? d.navGroupGap : ""}`}>
            {group.rows.map((r) => <NavRow key={r.label} icon={r.icon} label={r.label} active={r.active} />)}
          </ul>
        ))}
      </nav>
      <div className={d.sideFoot}>
        <ul className={d.navGroup}>
          <NavRow icon={ic(Bell)} label="Notifications" />
          <NavRow icon={<Arc size={18} animated />} label="Ask Aurevia" />
          <NavRow icon={ic(Settings)} label="Settings" />
        </ul>
        <div className={d.account}>
          <span className={d.avatar}>M</span>
        </div>
      </div>
    </aside>
  );
}

function ModeTabs() {
  return (
    <div className={d.modeTabs}>
      <span className={`${d.modeTab} ${d.modeTabOn}`}>Chat</span>
      <span className={d.modeTab}>Dashboard</span>
    </div>
  );
}

function Toolbar({ active }: { active: boolean }) {
  return (
    <div className={d.toolbar}>
      <span className={d.toolBtn}><History strokeWidth={1.75} /></span>
      {active && <span className={d.toolBtn}><SquarePen strokeWidth={1.75} /></span>}
    </div>
  );
}

/* The board on its 90 Days range. */
const STATS: { label: string; value: string; sub?: string; live?: boolean }[] = [
  { label: "Active chats", value: "3", live: true },
  { label: "Total conversations", value: "1,236" },
  { label: "AI messages", value: "8,870" },
  { label: "Resolution rate", value: "86%" },
  { label: "Handed to a person", value: "52" },
  { label: "Sold by AI", value: "$13,940.00", sub: "178 orders" },
];

function StatGrid({ cols }: { cols: 2 | 3 }) {
  return (
    <div className={`${d.statGrid} ${cols === 3 ? d.cols3 : d.cols2}`}>
      {STATS.map((s) => (
        <div key={s.label} className={d.stat}>
          <div className={d.statLabel}>
            {s.live && (
              <span className={d.liveDot}>
                <span className={d.livePing} />
                <span className={d.liveCore} />
              </span>
            )}
            {s.label}
          </div>
          <div className={d.statValueRow}>
            <div className={d.statValue}>{s.value}</div>
            {s.sub && <div className={d.statSub}>{s.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function RangeTabs() {
  return (
    <div className={d.range}>
      {["7 Days", "30 Days", "90 Days"].map((r) => (
        <span key={r} className={`${d.rangeTab} ${r === "90 Days" ? d.rangeTabOn : ""}`}>{r}</span>
      ))}
    </div>
  );
}

/* 90 days of conversations, starting on a Tuesday (two leading blanks), summing to the board's 1,236. */
const DAILY = [9, 8, 13, 7, 16, 14, 8, 11, 7, 11, 7, 11, 15, 16, 8, 9, 13, 17, 16, 15, 18, 7, 15, 10, 9, 12, 14, 16, 9, 13, 14, 12, 17, 12, 9, 9, 14, 12, 12, 17, 16, 12, 16, 15, 10, 15, 17, 21, 16, 11, 18, 9, 13, 20, 14, 14, 9, 15, 16, 15, 21, 16, 16, 14, 14, 13, 18, 22, 17, 16, 9, 16, 15, 20, 21, 16, 14, 16, 9, 14, 12, 14, 14, 18, 11, 12, 13, 19, 14, 18];
function Heatmap() {
  const max = Math.max(...DAILY);
  const padded: (number | null)[] = [null, null, ...DAILY];
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  const tone = (c: number) => {
    const r = c / max;
    return r > 0.75 ? d.h4 : r > 0.5 ? d.h3 : r > 0.25 ? d.h2 : d.h1;
  };
  return (
    <div className={d.heatmap}>
      <div className={d.weeks}>
        {weeks.map((w, wi) => (
          <div key={wi} className={d.week}>
            {w.map((c, di) => (c === null ? <span key={di} className={d.cellBlank} /> : <span key={di} className={`${d.cell} ${tone(c)}`} />))}
          </div>
        ))}
      </div>
      <p className={d.heatCaption}>{DAILY.reduce((a, b) => a + b, 0)} conversations over the last {DAILY.length} days</p>
    </div>
  );
}

const SUGGESTIONS = ["Analyse this week's sales", "Find opportunities to improve conversion", "Summarise product insights"];

function InputBar({ value, pressed, streaming, compact }: { value: string; pressed: boolean; streaming: boolean; compact: boolean }) {
  return (
    <form className={d.inputForm} onSubmit={(e) => e.preventDefault()}>
      {streaming ? (
        <span className={d.inputSlot}><Arc size={22} busy /></span>
      ) : (
        <span className={`${d.inputSlot} ${d.inputPlus}`}><Plus /></span>
      )}
      <span className={`${d.inputText} ${value ? "" : d.inputPlaceholder} ${streaming ? d.inputDisabled : ""}`}>
        {value || (streaming ? "Aurevia is replying..." : "Ask Aurevia about your store...")}
        {!compact && value && <span className={d.caret} />}
      </span>
      {streaming ? (
        <span className={d.send}><Square className={d.stopIcon} fill="currentColor" /></span>
      ) : (
        <span className={`${d.send} ${value ? "" : d.sendDisabled} ${pressed ? d.pressed : ""}`}><ArrowRight /></span>
      )}
    </form>
  );
}

function EmptyBar({ scene, mobile }: { scene: Scene; mobile: boolean }) {
  return (
    <div className={d.bar}>
      <h1 className={`${d.greeting} ${mobile ? d.greetingSm : ""}`}>
        <Arc size={34} animated />
        <span>
          How can I help, <span className={d.accentText}>{OWNER}</span>?
        </span>
      </h1>
      <div className={d.barInner}>
        <InputBar value={scene.typed} pressed={scene.sendPressed} streaming={false} compact={false} />
      </div>
      <div className={d.suggestions}>
        {SUGGESTIONS.map((s) => (
          <span key={s} className={d.suggestion}>
            <MessageSquare />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- thread parts (ActionCards / HtmlChart / ChatMessageRow) ---------- */

const CHART = [
  { label: "Sep 22", value: 820 },
  { label: "Sep 29", value: 1040 },
  { label: "Oct 6", value: 1310 },
  { label: "Oct 13", value: 1650 },
];

function Chart() {
  const max = 1800;
  return (
    <figure className={d.figure}>
      <figcaption className={d.figcaption}>Revenue sold by AI, by week · last 30 days</figcaption>
      <div className={d.chart}>
        {CHART.map((b, i) => (
          <div key={b.label} className={d.barCol}>
            <span className={d.barValue}>${b.value.toLocaleString()}</span>
            <span className={d.barTrack}>
              <span className={d.barFill} style={{ height: `${(b.value / max) * 100}%`, animationDelay: `${i * 90}ms` }} />
            </span>
            <span className={d.barLabel}>{b.label}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

function ProductCard({ status }: { status: "pending" | "pressing" | "applying" | "done" }) {
  return (
    <div className={d.card}>
      <div className={d.cardEntity}>Update product</div>
      <div className={d.cardHeading}>Linen Midi Dress</div>
      <div className={d.cardDetails}>
        <div>
          <div className={d.fieldHead}>
            <span className={d.fieldLabel}>Description</span>
            <span className={d.chip}>Changed</span>
          </div>
          <div className={d.fieldValue}>
            Breathable washed linen in a relaxed midi length, with a smocked back and side pockets.
            {"\n"}Fit: runs true to size. Between sizes? Size down for a closer fit.
          </div>
          <div className={d.fieldPrev}>Currently: Breathable washed linen in a relaxed midi length, with a smocked back and side pockets.</div>
        </div>
      </div>
      {(status === "pending" || status === "pressing") && (
        <div className={d.cardActions}>
          <span className={`${d.confirm} ${status === "pressing" ? d.pressed : ""}`}>Confirm</span>
          <span className={d.cancel}>Cancel</span>
        </div>
      )}
      {status === "applying" && (
        <div className={d.applying}>
          <Loader2 className={d.spin} strokeWidth={2} />
          Applying...
        </div>
      )}
      {status === "done" && (
        <div className={d.done}>
          <Check strokeWidth={2.5} />
          Updated -- Linen Midi Dress
        </div>
      )}
    </div>
  );
}

function ImageGenerating() {
  return (
    <div className={`${d.imgGenerating} ${d.square}`}>
      <Loader2 className={d.spin} strokeWidth={1.75} />
      <span className={d.genTitle}>Generating image...</span>
      <span className={d.genSub}>This can take up to a minute</span>
    </div>
  );
}

function GeneratedImage({ src, status }: { src: string; status: "pending" | "pressing" | "applying" | "done" }) {
  return (
    <div className={d.genWrap}>
      <div className={`${d.genFrame} ${d.square}`}>
        <img src={src} alt="A generated lifestyle photo of the Silk Slip Dress" className={d.genImg} />
      </div>
      <div className={d.genButtons}>
        {status !== "done" && (
          <span className={`${d.addBtn} ${status === "pressing" ? d.pressed : ""}`}>
            {status === "applying" ? <Loader2 className={d.spin} strokeWidth={2} /> : <Plus strokeWidth={2.25} />}
            <span className={d.truncate}>{status === "applying" ? "Adding to Silk Slip Dress..." : "Add to Silk Slip Dress"}</span>
          </span>
        )}
        <span className={d.downloadBtn}>
          <Download strokeWidth={2} />
          Download
        </span>
      </div>
      <p className={d.genCaption}>
        {status === "done" && (
          <>
            <Check className={d.genCheck} strokeWidth={2.5} />
            Added to Silk Slip Dress ·{" "}
          </>
        )}
        Used 5 messages
      </p>
    </div>
  );
}

function Thread({ scene }: { scene: Scene }) {
  const hasText = scene.parts.some((p) => p.kind === "text");
  return (
    <div className={d.threadScroll}>
      <div className={d.threadCol}>
        <div className={d.userRow}>
          <div className={d.userBubble}>{scene.question}</div>
        </div>
        {scene.thinking ? (
          <div className={d.thinking}>
            <Arc size={22} busy />
            <span key={scene.thinking} className={d.fadeIn}>{scene.thinking}</span>
          </div>
        ) : (
          <div>
            {scene.parts.map((p, i) => {
              if (p.kind === "text") return <div key={i} className={d.md}>{p.html}</div>;
              if (p.kind === "chart") return <Chart key={i} />;
              if (p.kind === "productCard") return <ProductCard key={i} status={p.status} />;
              if (p.kind === "imageGenerating") return <ImageGenerating key={i} />;
              return <GeneratedImage key={i} src={p.src} status={p.status} />;
            })}
            {hasText && (
              <div className={d.msgTools}>
                <Arc size={scene.streaming ? 15 : 21} />
                <span className={d.copyBtn}><Copy /></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- the page ---------- */

export default function DashboardHome({ scene, mobile }: { scene: Scene; mobile: boolean }) {
  return (
    <div className={`${d.app} ${mobile ? d.appMobile : ""}`}>
      {!mobile && <Sidebar />}
      <main className={d.main}>
        {mobile && (
          <span className={d.menuBtn}>
            <Menu strokeWidth={1.75} />
          </span>
        )}
        <div className={d.page}>
          <div className={d.topNav}>
            {!mobile && (
              <div className={d.toolbarSlot}>
                <Toolbar active={scene.active} />
              </div>
            )}
            <ModeTabs />
          </div>

          <div className={`${d.chatTab} ${scene.active ? d.chatTabActive : ""}`}>
            {(!scene.active || mobile) && (
              <div className={d.analytics}>
                <div className={`${d.rangeRow} ${scene.active ? "" : d.rangeRowGap}`}>
                  {mobile && (
                    <div className={d.mobileToolbar}>
                      <Toolbar active={scene.active} />
                    </div>
                  )}
                  {!scene.active && <RangeTabs />}
                </div>
                {!scene.active && <StatGrid cols={mobile ? 2 : 3} />}
              </div>
            )}

            {scene.active ? (
              <div className={d.threadWrap}>
                <Thread scene={scene} />
                <div className={d.compactBar}>
                  <div className={d.barCompact}>
                    <InputBar value="" pressed={false} streaming={scene.streaming || scene.thinking !== null} compact />
                  </div>
                </div>
              </div>
            ) : (
              <EmptyBar scene={scene} mobile={mobile} />
            )}

            {!scene.active && <Heatmap />}
          </div>
        </div>
      </main>
    </div>
  );
}

/** Fits the app (rendered at its real size) into the frame: 1024 wide with the sidebar when the frame is wide
 *  enough, else the app's own 390-wide phone layout. */
export function DashboardFrame({ scene, label }: { scene: Scene; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ zoom: number; mobile: boolean } | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const mobile = w < 600;
      setFit({ zoom: w / (mobile ? 390 : 1024), mobile });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={`${d.frame} ${fit?.mobile ? d.frameMobile : ""}`} role="img" aria-label={label}>
      {fit && (
        <div className={d.zoom} style={{ zoom: fit.zoom }}>
          <DashboardHome scene={scene} mobile={fit.mobile} />
        </div>
      )}
    </div>
  );
}
