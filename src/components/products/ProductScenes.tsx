"use client";

/**
 * Animated replicas of the Aurevia dashboard for the product pages, in place of static screenshots. Each scene is
 * one short timeline (ms) drawn from the real screen it stands for, on the demo store Lucien Vallière. Scenes play
 * while on screen, hold the finished state, then loop; reduced motion shows the finished state only.
 * Big scenes fill the "In your dashboard" frame; mini scenes fill a setup card's media slot.
 */

import { ArrowUp, BookOpen, Bot, Check, Download, House, Plus, RefreshCw, ShoppingCart, TrendingUp, UserPlus, Users } from "lucide-react";
import s from "./productScenes.module.css";
import { span, typed, useScene } from "@/components/sceneClock";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");
const fade = (on: boolean) => cx(s.fade, on && s.fadeOn);
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

const IMG = {
  blazer: "/images/demo/lv/cashmere-blazer.webp",
  blouse: "/images/demo/lv/silk-blouse.webp",
  boots: "/images/demo/lv/patent-boots.webp",
  necklace: "/images/demo/lv/gilded-necklace.webp",
  hoodie: "/images/demo/lv/metro-hoodie.webp",
  joggers: "/images/demo/lv/blue-joggers.webp",
  jacket: "/images/demo/lv/pop-pink-jacket.webp",
};

function Thumb({ src }: { src: string }) {
  return (
    <span className={s.thumb}>
      <img src={src} alt="" loading="lazy" />
    </span>
  );
}

function Switch({ on }: { on: boolean }) {
  return <span className={cx(s.switch, on && s.switchOn)} />;
}

function Caret({ show }: { show: boolean }) {
  return show ? <span className={s.caret} /> : null;
}

function Stage({ label, children, sceneRef }: { label: string; children: React.ReactNode; sceneRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div ref={sceneRef} className={s.stage} role="img" aria-label={label}>
      {children}
    </div>
  );
}

function Mini({ label, children, sceneRef }: { label: string; children: React.ReactNode; sceneRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div ref={sceneRef} className={s.mini} role="img" aria-label={label}>
      <div className={s.miniPanel}>{children}</div>
    </div>
  );
}

/* ═════════════════════════ Big scenes ═════════════════════════ */

/** Ask Aurevia proposes a product edit; Confirm writes it to Shopify and the row updates. */
export function AskEditScene() {
  const { ref, ms } = useScene(6200);
  const ask = "Rewrite the Silk Draped Blouse title so it converts better.";
  const confirmed = ms >= 5000;
  const rows = [
    { img: IMG.blazer, name: "Tailored Cashmere Blazer", price: "$1,590.00" },
    { img: IMG.blouse, name: confirmed ? "Silk Draped Blouse, Asymmetric Hem" : "Silk Draped Blouse with Asymmetric Cut", price: "$520.00" },
    { img: IMG.boots, name: "Patent Leather Ankle Boots", price: "$970.00" },
    { img: IMG.necklace, name: "Gilded Statement Necklace", price: "$780.00" },
  ];
  return (
    <Stage sceneRef={ref} label="Ask Aurevia proposes a new product title, and confirming it updates the product in Shopify">
      <div className={s.askGrid}>
        <div className={cx(s.panel, s.hideSm)}>
          <div className={s.head}>
            <span className={s.tabs}>
              <span className={cx(s.tab, s.tabOn)}>All Products</span>
              <span className={s.tab}>Discounts</span>
              <span className={s.tab}>Collections</span>
            </span>
          </div>
          <div className={s.rows}>
            {rows.map((r, i) => (
              <div key={r.img} className={cx(s.row, i === 1 && confirmed && ms < 6000 && s.flash)} style={{ "--cols": "34px minmax(0,1fr) auto auto" } as React.CSSProperties}>
                <Thumb src={r.img} />
                <span className={s.cellMain}>{r.name}</span>
                <span className={s.muted}>{r.price}</span>
                <Switch on />
              </div>
            ))}
          </div>
        </div>

        <div className={s.panel}>
          <div className={s.head}>
            <span className={s.who}>
              <span className={s.ringMark} />
              <span className={s.headTitle}>Ask Aurevia</span>
            </span>
          </div>
          <div className={s.askBody}>
            <span className={cx(s.bubble, s.bubbleMe)}>
              {ms < 400 ? <span className={s.placeholder}>Ask Aurevia about your store…</span> : typed(ask, ms, 400, 2000)}
              <Caret show={ms >= 400 && ms < 2000} />
            </span>
            <p className={cx(s.agentText, fade(ms >= 2500))}>I&rsquo;ll lead with the cut and keep your brand voice. Here&rsquo;s the edit:</p>
            <div className={cx(s.editCard, fade(ms >= 3100))}>
              <div className={s.editHead}>Update product</div>
              <div><b>Product:</b> Silk Draped Blouse with Asymmetric Cut</div>
              <div><b>New title:</b> Silk Draped Blouse, Asymmetric Hem</div>
              <div className={s.editActions}>
                {confirmed ? (
                  <span className={s.toast}><Check aria-hidden="true" /> Saved to Shopify</span>
                ) : (
                  <>
                    <span className={cx(s.btn, ms >= 4500 && s.btnPress)}>Confirm</span>
                    <span className={s.muted}>Cancel</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/** Knowledge Base: paste a link, the new source syncs. */
export function KnowledgeScene() {
  const { ref, ms } = useScene(5800);
  const url = "lucienvalliere.com/pages/about";
  const adding = ms >= 1300 && ms < 3700;
  const added = ms >= 3700;
  const synced = ms >= 5000;
  const rows = ["Size Guide", "Returns & Exchanges", "Shipping & Delivery"];
  const cols = { "--cols": "minmax(0,1fr) 96px 64px", "--cols-sm": "minmax(0,1fr) auto" } as React.CSSProperties;
  return (
    <Stage sceneRef={ref} label="Adding a page link to the Knowledge Base, which then syncs">
      <div className={s.panel}>
        <div className={s.head}>
          <span className={s.tabs}>
            <span className={cx(s.tab, s.tabOn)}>Knowledge Base</span>
            <span className={s.tab}>Corrections</span>
          </span>
          <span className={cx(s.btn, ms >= 900 && ms < 1300 && s.btnPress)}><Plus aria-hidden="true" /> Add source</span>
        </div>
        <div className={s.head}>
          <span>{added ? 4 : 3} sources</span>
        </div>
        <div className={cx(s.arrive, adding && s.arriveOn)}>
          <div>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--au-rule)" }}>
              <div className={s.input}>
                <span className={s.inputText}>
                  {typed(url, ms, 1600, 3100) || <span className={s.placeholder}>Paste a link</span>}
                  <Caret show={ms >= 1600 && ms < 3300} />
                </span>
                <span className={cx(s.btn, ms >= 3300 && s.btnPress)}>Add</span>
              </div>
            </div>
          </div>
        </div>
        <div className={s.rows}>
          <div className={cx(s.row, s.colHead)} style={cols}>
            <span>Name</span><span>Status</span><span className={s.hideSm}>Format</span>
          </div>
          {rows.map((name) => (
            <div key={name} className={s.row} style={cols}>
              <span className={s.cellMain}>{name}</span>
              <span className={cx(s.pill, s.pillDone)}><span className={s.dot} /> Synced</span>
              <span className={cx(s.pill, s.pillInk, s.hideSm)}>Text</span>
            </div>
          ))}
          <div className={cx(s.arrive, added && s.arriveOn)}>
            <div>
              <div className={cx(s.row, added && !synced && s.flash)} style={cols}>
                <span className={s.cellMain}>About Lucien Vallière</span>
                {synced ? (
                  <span className={cx(s.pill, s.pillDone)}><span className={s.dot} /> Synced</span>
                ) : (
                  <span className={cx(s.pill, s.pillInk)}><span className={s.spin} /> Syncing</span>
                )}
                <span className={cx(s.pill, s.pillInk, s.hideSm)}>Web</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/** Lead Collection: a new lead arrives from a chat, then the list exports. */
export function LeadsScene() {
  const { ref, ms } = useScene(5200);
  const arrived = ms >= 1200;
  const exported = ms >= 4000;
  const cols = { "--cols": "minmax(0,1fr) 64px 110px", "--cols-sm": "minmax(0,1fr) auto" } as React.CSSProperties;
  const leads = [
    { i: "AT", name: "Ava Thomas", email: "ava.thomas@gmail.com", chats: "1 chat", last: "Sep 20" },
    { i: "EP", name: "Ethan Parker", email: "ethan.parker@icloud.com", chats: "1 chat", last: "Sep 20" },
    { i: "PW", name: "Priya Wright", email: "priya.wright@outlook.com", chats: "2 chats", last: "Sep 20" },
    { i: "JM", name: "Julian Moore", email: "julian.moore45@icloud.com", chats: "1 chat", last: "Sep 19" },
  ];
  return (
    <Stage sceneRef={ref} label="A new lead appears in Lead Collection, then the list is exported as a CSV">
      <div className={s.panel}>
        <div className={s.head}>
          <span className={s.hideSm}>
            <span className={s.tabs}>
              <span className={s.tab}>Live Activity</span>
              <span className={cx(s.tab, s.tabOn)}>Lead Collection</span>
              <span className={s.tab}>Support Tickets</span>
            </span>
          </span>
          <span>{arrived ? 63 : 62} leads</span>
          {exported ? (
            <span className={s.toast}><Check aria-hidden="true" /> leads.csv ready</span>
          ) : (
            <span className={cx(s.btn, ms >= 3500 && s.btnPress)}><Download aria-hidden="true" /> Export CSV</span>
          )}
        </div>
        <div className={s.rows}>
          <div className={cx(s.row, s.colHead)} style={cols}>
            <span>Shopper</span><span className={s.hideSm}>Chats</span><span>Last chat</span>
          </div>
          <div className={cx(s.arrive, arrived && s.arriveOn)}>
            <div>
              <div className={cx(s.row, arrived && ms < 3000 && s.flash)} style={cols}>
                <span className={s.who}>
                  <span className={s.avatar}>BJ</span>
                  <span style={{ minWidth: 0 }}>
                    <span className={s.cellMain} style={{ display: "block" }}>Benjamin Jones <span className={cx(s.pill, s.pillGreen)}>New</span></span>
                    <span className={s.cellSub}>benjamin.jones46@outlook.com</span>
                  </span>
                </span>
                <span className={cx(s.muted, s.hideSm)}>1 chat</span>
                <span className={s.muted}>Just now</span>
              </div>
            </div>
          </div>
          {leads.map((l) => (
            <div key={l.i} className={s.row} style={cols}>
              <span className={s.who}>
                <span className={cx(s.avatar, s.avatarSoft)}>{l.i}</span>
                <span style={{ minWidth: 0 }}>
                  <span className={s.cellMain} style={{ display: "block" }}>{l.name}</span>
                  <span className={s.cellSub}>{l.email}</span>
                </span>
              </span>
              <span className={cx(s.muted, s.hideSm)}>{l.chats}</span>
              <span className={s.muted}>{l.last}</span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/** Products: Sync from Shopify fills the catalogue, every product on for the agent. */
export function ProductsScene() {
  const { ref, ms } = useScene(5000);
  const p = span(ms, 1200, 4200);
  const count = Math.round(p * 195);
  const items = [
    { img: IMG.blazer, name: "Tailored Cashmere Blazer", price: "$1,590.00" },
    { img: IMG.blouse, name: "Silk Draped Blouse", price: "$520.00" },
    { img: IMG.boots, name: "Patent Leather Ankle Boots", price: "$970.00" },
    { img: IMG.hoodie, name: "Metro Yellow Hoodie", price: "$129.00" },
    { img: IMG.joggers, name: "Blue Line Athletic Joggers", price: "$98.00" },
  ];
  const cols = { "--cols": "34px minmax(0,1fr) auto auto" } as React.CSSProperties;
  return (
    <Stage sceneRef={ref} label="Syncing products from Shopify fills the product list">
      <div className={s.panel}>
        <div className={s.head}>
          <span>{count} products · {p >= 1 ? "Synced just now" : p > 0 ? "Syncing…" : "Not synced"}</span>
          <span className={cx(s.btn, ms >= 700 && ms < 1100 && s.btnPress)}>
            {p > 0 && p < 1 ? <span className={s.spin} style={{ borderColor: "rgb(255 255 255 / 0.4)", borderTopColor: "#fff" }} /> : <RefreshCw aria-hidden="true" />} Sync from Shopify
          </span>
        </div>
        <div className={s.rows}>
          <div className={cx(s.row, s.colHead)} style={cols}>
            <span /><span>Product</span><span>Price</span><span>Assistant</span>
          </div>
          {items.map((it, i) => {
            const on = p > (i + 0.5) / items.length;
            return (
              <div key={it.img} className={cx(s.arrive, on && s.arriveOn)}>
                <div>
                  <div className={s.row} style={cols}>
                    <Thumb src={it.img} />
                    <span className={s.cellMain}>{it.name}</span>
                    <span className={s.muted}>{it.price}</span>
                    <Switch on={on} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
}

/** Home, dashboard view: the headline numbers count up and the sales split fills. */
export function DashboardScene({ focus }: { focus?: "recommendations" }) {
  const { ref, ms } = useScene(4400);
  const c = span(ms, 400, 2400);
  const e = 1 - Math.pow(1 - c, 3);
  const bar = span(ms, 2600, 3600);
  const kpis = [
    { label: "Revenue Influenced", value: money(2311 * e) },
    { label: "Orders Influenced", value: String(Math.round(27 * e)) },
    { label: "Shoppers Assisted", value: String(Math.round(114 * e)) },
    { label: "Recommendation Conversion", value: `${(23.7 * e).toFixed(1)}%`, key: "recommendations" },
    { label: "Revenue / Conversation", value: money(14 * e) },
    { label: "AI-Assisted Conversion Rate", value: `${(16.6 * e).toFixed(1)}%` },
  ];
  return (
    <Stage sceneRef={ref} label="The Aurevia dashboard: revenue and orders influenced, conversion rates and the sales split">
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, marginBottom: 14 }}>
          <span className={s.tabs}>
            <span className={s.tab}>Chat</span>
            <span className={cx(s.tab, s.tabOn)}>Dashboard</span>
          </span>
          <span className={s.tabs}>
            <span className={s.tab}>7 Days</span>
            <span className={s.tab}>30 Days</span>
            <span className={cx(s.tab, s.tabOn)}>90 Days</span>
          </span>
        </div>
        <div className={cx(s.kpis, s.kpis3)}>
          {kpis.map((k) => (
            <div key={k.label} className={cx(s.kpi, focus && k.key === focus && ms >= 2400 && s.kpiFocus)}>
              <span className={s.kpiLabel}>{k.label}</span>
              <span className={s.kpiValue}>{k.value}</span>
            </div>
          ))}
        </div>
        <div className={s.split}>
          Sales Distribution
          <div className={s.splitBar}>
            <span className={s.splitFill} style={{ width: `${35.4 * bar}%` }} />
          </div>
          <div className={s.splitKey}>
            <span className={s.key}><span className={s.keyDot} /> AI Assisted: <b>$2,311 (35.4%)</b></span>
            <span className={s.key}><span className={cx(s.keyDot, s.keyDotOther)} /> Other Sources: <b>$4,218 (64.6%)</b></span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/** Support Tickets: a handoff arrives, gets assigned, worked and resolved. */
export function TicketsScene() {
  const { ref, ms } = useScene(5400);
  const arrived = ms >= 1000;
  const assigned = ms >= 2700;
  const resolved = ms >= 4400;
  const cols = { "--cols": "minmax(0,0.9fr) minmax(0,1.3fr) 104px", "--cols-sm": "minmax(0,1fr) auto" } as React.CSSProperties;
  const status = (kind: "open" | "progress" | "waiting" | "resolved") =>
    kind === "resolved" ? (
      <span className={cx(s.pill, s.pillDone)}><Check aria-hidden="true" /> Resolved</span>
    ) : kind === "progress" ? (
      <span className={cx(s.pill, s.pillGreen)}><span className={s.dot} /> In progress</span>
    ) : kind === "waiting" ? (
      <span className={cx(s.pill, s.pillInk)}><span className={s.dot} /> Waiting</span>
    ) : (
      <span className={cx(s.pill, s.pillInk)} style={{ color: "var(--au-ink)" }}><span className={s.dot} /> Open</span>
    );
  const open = 2 + (arrived && !resolved ? 1 : 0);
  return (
    <Stage sceneRef={ref} label="A new support ticket arrives with the chat attached, is assigned and then resolved">
      <div className={s.panel}>
        <div className={s.head}>
          <span>{open} open · {arrived ? 11 : 10} total</span>
          <span className={cx(s.tabs, s.hideSm)}>
            <span className={cx(s.tab, s.tabOn)}>All</span>
            <span className={s.tab}>Open</span>
            <span className={s.tab}>In progress</span>
            <span className={s.tab}>Resolved</span>
          </span>
        </div>
        <div className={s.rows}>
          <div className={cx(s.row, s.colHead)} style={cols}>
            <span>Shopper</span><span className={s.hideSm}>Request</span><span>Status</span>
          </div>
          <div className={cx(s.arrive, arrived && s.arriveOn)}>
            <div>
              <div className={cx(s.row, arrived && ms < 2400 && s.flash)} style={cols}>
                <span className={s.who}>
                  <span className={s.avatar}>ZH</span>
                  <span style={{ minWidth: 0 }}>
                    <span className={s.cellMain} style={{ display: "block" }}>Zoe Hall</span>
                    <span className={s.cellSub}>{assigned ? "Assigned to you" : "Unassigned"}</span>
                  </span>
                </span>
                <span className={s.hideSm}>
                  <span className={s.cellMain} style={{ display: "block" }}>Wants to swap a jacket for a larger size</span>
                  <span className={s.cellSub}>Chat and cart attached</span>
                </span>
                {status(resolved ? "resolved" : assigned ? "progress" : "open")}
              </div>
            </div>
          </div>
          {[
            { i: "EP", name: "Ethan Parker", req: "Hasn't received a tracking number", st: "waiting" as const },
            { i: "PW", name: "Priya Wright", req: "Asked to speak with a person", st: "progress" as const },
            { i: "AU", name: "Anonymous", req: "Hoodie zip failed after two washes", st: "open" as const },
          ].map((t) => (
            <div key={t.i} className={s.row} style={cols}>
              <span className={s.who}>
                <span className={cx(s.avatar, s.avatarSoft)}>{t.i}</span>
                <span className={s.cellMain}>{t.name}</span>
              </span>
              <span className={cx(s.cellMain, s.hideSm)} style={{ color: "var(--au-ink-2)" }}>{t.req}</span>
              {status(t.st)}
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ═════════════════════════ Mini scenes ═════════════════════════ */

/** Home, chat view: headline numbers, then a question to Ask Aurevia. */
export function ChatHomeMini() {
  const { ref, ms } = useScene(3000);
  const q = "Analyse this week's sales";
  return (
    <Mini sceneRef={ref} label="Home in chat view: active chats, resolution rate, sold by AI and the Ask Aurevia box">
      <div className={s.kpis} style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 6 }}>
        {[
          ["Active chats", "4"],
          ["Resolution", "93.9%"],
          ["Sold by AI", "$2,311"],
        ].map(([l, v], i) => (
          <div key={l} className={cx(s.kpi, fade(ms >= 200 + i * 250))} style={{ padding: "8px 9px" }}>
            <span className={s.kpiLabel}>{l}</span>
            <span className={cx(s.kpiValue, s.kpiValueSm)}>{v}</span>
          </div>
        ))}
      </div>
      <p className={s.center} style={{ margin: "12px 0 8px", fontFamily: "var(--au-display)", fontSize: "1rem" }}>How can I help?</p>
      <div className={s.input}>
        <span className={s.inputText}>
          {typed(q, ms, 1200, 2500) || <span className={s.placeholder}>Ask Aurevia about your store…</span>}
          <Caret show={ms >= 1200 && ms < 2600} />
        </span>
        <span className={s.send}><ArrowUp aria-hidden="true" /></span>
      </div>
    </Mini>
  );
}

/** Home, dashboard view: four numbers count up. */
export function DashboardMini() {
  const { ref, ms } = useScene(2400);
  const e = 1 - Math.pow(1 - span(ms, 200, 2000), 3);
  return (
    <Mini sceneRef={ref} label="Home in dashboard view: revenue and orders influenced, shoppers assisted and recommendation conversion">
      <div className={s.kpis} style={{ gap: 6 }}>
        {[
          ["Revenue influenced", money(2311 * e)],
          ["Orders influenced", String(Math.round(27 * e))],
          ["Shoppers assisted", String(Math.round(114 * e))],
          ["Rec. conversion", `${(23.7 * e).toFixed(1)}%`],
        ].map(([l, v]) => (
          <div key={l} className={s.kpi} style={{ padding: "8px 10px" }}>
            <span className={s.kpiLabel}>{l}</span>
            <span className={cx(s.kpiValue, s.kpiValueSm)}>{v}</span>
          </div>
        ))}
      </div>
    </Mini>
  );
}

/** Live Activity: the conversation and the shopper's cart beside it. With `tagged`, the cart shows the chat tag. */
export function LiveActivityMini({ tagged = false }: { tagged?: boolean }) {
  const { ref, ms } = useScene(3000);
  const inCart = ms >= 2200;
  return (
    <Mini sceneRef={ref} label={tagged ? "The agent adds an item to the cart, and the cart is tagged with the chat" : "Live Activity: a conversation with the shopper's cart beside it"}>
      <div className={s.chat}>
        <span className={cx(s.bubble, s.bubbleShopper, fade(ms >= 300))}>Do the joggers come in navy?</span>
        <span className={cx(s.bubble, s.bubbleAgent, fade(ms >= 1300))}>They do. I&rsquo;ve added the navy pair in M.</span>
      </div>
      <span className={s.fieldLabel} style={{ marginTop: 12 }}>Current cart</span>
      <div className={s.field} style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {inCart ? (
          <>
            <Thumb src={IMG.joggers} />
            <span style={{ flex: 1, minWidth: 0 }} className={s.cellMain}>Blue Line joggers · $98</span>
            {tagged ? <span className={cx(s.pill, s.pillGreen)}>Aurevia chat</span> : null}
          </>
        ) : (
          <span className={s.placeholder}>Cart is empty</span>
        )}
      </div>
    </Mini>
  );
}

/** Suggested Shopify policy pages, added in one click. */
export function SourcesMini() {
  const { ref, ms } = useScene(2800);
  const pages = ["Shipping policy", "Refund policy", "Terms of service"];
  return (
    <Mini sceneRef={ref} label="Adding the store's Shopify policy pages to the Knowledge Base in one click">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className={s.miniTitle}>Suggested from Shopify</span>
        <span className={cx(s.btn, ms >= 600 && ms < 1000 && s.btnPress)}>Add all</span>
      </div>
      <div className={s.miniRows}>
        {pages.map((p, i) => {
          const on = ms >= 1200 + i * 450;
          return (
            <div key={p} className={s.miniRow}>
              <span>{p}</span>
              <span className={cx(s.check, on && s.checkOn)}><Check aria-hidden="true" /></span>
            </div>
          );
        })}
      </div>
    </Mini>
  );
}

/** Always and Never rules. */
export function RulesMini() {
  const { ref, ms } = useScene(2800);
  const never = "Never promise a delivery date.";
  return (
    <Mini sceneRef={ref} label="Writing an Always rule and a Never rule for the agent">
      <span className={s.fieldLabel}>Always</span>
      <div className={s.field}>Offer the size guide when sizing comes up.</div>
      <span className={s.fieldLabel}>Never</span>
      <div className={s.field}>
        {typed(never, ms, 400, 2000) || <span className={s.placeholder}>One rule per line</span>}
        <Caret show={ms >= 400 && ms < 2200} />
      </div>
      <p className={cx(s.cue, fade(ms >= 2300))} style={{ marginTop: 8 }}><Check aria-hidden="true" /> Saved</p>
    </Mini>
  );
}

/** Correct an answer once; the agent uses your version from then on. */
export function CorrectionMini() {
  const { ref, ms } = useScene(3000);
  const corrected = ms >= 1800;
  return (
    <Mini sceneRef={ref} label="Correcting one of the agent's answers inline">
      <div className={s.chat}>
        <span className={cx(s.bubble, s.bubbleShopper)}>How long does UK delivery take?</span>
        <span className={cx(s.bubble, s.bubbleAgent)}>
          {ms >= 900 ? <span className={s.strike}>Two to three days.</span> : "Two to three days."}
          {corrected ? <> Three to five working days.</> : null}
        </span>
      </div>
      <p className={cx(s.cue, fade(ms >= 2200))} style={{ marginTop: 10 }}><Check aria-hidden="true" /> Corrected. Used from now on.</p>
    </Mini>
  );
}

/** Install and sync: one ring, three things synced. */
export function SyncMini() {
  const { ref, ms } = useScene(3200);
  const p = span(ms, 300, 2800);
  const R = 2 * Math.PI * 34;
  const chips = ["Products", "Collections", "Discounts"];
  return (
    <Mini sceneRef={ref} label="The store's products, collections and discounts syncing from Shopify">
      <div className={s.ringWrap}>
        <svg viewBox="0 0 84 84">
          <circle cx="42" cy="42" r="34" className={s.ringTrack} />
          <circle cx="42" cy="42" r="34" className={s.ringFill} style={{ strokeDasharray: R, strokeDashoffset: R * (1 - p) }} />
        </svg>
        <span className={s.ringPct}>{Math.round(p * 100)}%</span>
      </div>
      <div className={s.chips}>
        {chips.map((c, i) => (
          <span key={c} className={cx(s.chip, p >= (i + 1) / chips.length - 0.001 && s.chipOn)}><Check aria-hidden="true" />{c}</span>
        ))}
      </div>
    </Mini>
  );
}

/** Theme editor: the app embed goes on and the widget is live. */
export function EmbedMini() {
  const { ref, ms } = useScene(2600);
  const on = ms >= 900;
  return (
    <Mini sceneRef={ref} label="Turning on the Aurevia app embed in the Shopify theme editor">
      <span className={s.miniTitle}>App embeds</span>
      <div className={s.miniRow} style={{ marginTop: 10 }}>
        <span className={s.who}>
          <img src="/images/aurevia-logo-mark.webp" alt="" style={{ width: 22, height: 22 }} />
          Aurevia chat
        </span>
        <Switch on={on} />
      </div>
      <p className={cx(s.cue, fade(ms >= 1700))} style={{ marginTop: 12 }}><Check aria-hidden="true" /> Widget is live on your theme</p>
    </Mini>
  );
}

/** The order webhook carries the chat tag and is credited to that conversation. */
export function OrderMatchMini() {
  const { ref, ms } = useScene(3000);
  return (
    <Mini sceneRef={ref} label="A Shopify order carrying the chat tag is matched and credited to the conversation">
      <div className={cx(s.field, fade(ms >= 200))} style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
        <Thumb src={IMG.blouse} />
        <span style={{ flex: 1, minWidth: 0 }}>
          <span className={s.cellMain} style={{ display: "block" }}>Order #1042 · $520.00</span>
          <span className={s.cellSub}>Tag: aurevia-chat</span>
        </span>
      </div>
      <div className={s.link}>
        <span className={cx(s.linkLine, ms >= 1100 && s.linkLineOn)} />
        {ms >= 1100 ? "matched" : "matching…"}
        <span className={cx(s.linkLine, ms >= 1100 && s.linkLineOn)} />
      </div>
      <div className={cx(s.field, fade(ms >= 1500))} style={{ marginTop: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span className={s.cellMain}>Chat with Ava T.</span>
        <span className={cx(s.pill, s.pillGreen)}><Check aria-hidden="true" /> Credited</span>
      </div>
    </Mini>
  );
}

/** Real numbers only: what isn't tracked says so. */
export function NotTrackedMini() {
  const { ref, ms } = useScene(2400);
  const e = 1 - Math.pow(1 - span(ms, 200, 1800), 3);
  return (
    <Mini sceneRef={ref} label="Dashboard cards with real figures, and one card that says Not tracked">
      <div className={s.kpis} style={{ gap: 6 }}>
        <div className={s.kpi} style={{ padding: "8px 10px" }}>
          <span className={s.kpiLabel}>Revenue influenced</span>
          <span className={cx(s.kpiValue, s.kpiValueSm)}>{money(2311 * e)}</span>
        </div>
        <div className={s.kpi} style={{ padding: "8px 10px" }}>
          <span className={s.kpiLabel}>Orders influenced</span>
          <span className={cx(s.kpiValue, s.kpiValueSm)}>{Math.round(27 * e)}</span>
        </div>
        <div className={cx(s.kpi, fade(ms >= 1200))} style={{ padding: "8px 10px", gridColumn: "1 / -1" }}>
          <span className={s.kpiLabel}>Shoppers assisted</span>
          <span className={cx(s.kpiValue, s.kpiOff)}>Not tracked</span>
        </div>
      </div>
    </Mini>
  );
}

/** The Assistant switch: hide a product from recommendations. */
export function CatalogueSwitchMini() {
  const { ref, ms } = useScene(2600);
  const hidden = ms >= 1300;
  const rows = [
    { img: IMG.blazer, name: "Cashmere Blazer" },
    { img: IMG.hoodie, name: "Metro Hoodie" },
    { img: IMG.jacket, name: "Pink Zip Jacket" },
  ];
  return (
    <Mini sceneRef={ref} label="Turning off the Assistant switch hides a product from the agent's suggestions">
      <span className={s.miniTitle}>Assistant</span>
      <div className={s.miniRows}>
        {rows.map((r, i) => (
          <div key={r.img} className={cx(s.miniRow, i === 2 && hidden && s.miniRowDim)}>
            <span className={s.who}><Thumb src={r.img} />{r.name}</span>
            <Switch on={!(i === 2 && hidden)} />
          </div>
        ))}
      </div>
      <p className={cx(s.cue, fade(ms >= 1700))} style={{ marginTop: 8 }}>Hidden from suggestions</p>
    </Mini>
  );
}

/** Upsell strength: the slider moves and the agent's line changes with it. */
export function SellStrengthMini() {
  const { ref, ms } = useScene(3200);
  const level = ms < 1000 ? 0 : ms < 2000 ? 1 : 2;
  const pos = [8, 50, 92][level];
  const lines = [
    "The blazer pairs well with this, if you'd like it.",
    "The matching blazer finishes the look. Want to see it?",
    "The matching blazer completes the look. Shall I add it?",
  ];
  return (
    <Mini sceneRef={ref} label="Setting how strongly the agent upsells, with a sample line for each level">
      <span className={s.miniTitle}>Upsell strength</span>
      <div className={s.slider}>
        <span className={s.sliderFill} style={{ width: `${pos}%`, transition: "width 400ms var(--au-ease)" }} />
        <span className={s.sliderKnob} style={{ left: `${pos}%`, transition: "left 400ms var(--au-ease)" }} />
      </div>
      <div className={s.sliderTicks}>
        {["Gentle", "Balanced", "Strong"].map((t, i) => (
          <span key={t} className={i === level ? s.tickOn : undefined}>{t}</span>
        ))}
      </div>
      <div className={s.chat} style={{ marginTop: 10 }}>
        <span className={cx(s.bubble, s.bubbleAgent)} key={level}>{lines[level]}</span>
      </div>
    </Mini>
  );
}

/** A size guide in the Knowledge Base gives the recommendation its reason. */
export function SizeGuideMini() {
  const { ref, ms } = useScene(3000);
  return (
    <Mini sceneRef={ref} label="A size guide added to the Knowledge Base, then used in the agent's answer">
      <div className={s.miniRow}>
        <span>Size guide</span>
        {ms >= 700 ? (
          <span className={cx(s.pill, s.pillDone)}><span className={s.dot} /> Synced</span>
        ) : (
          <span className={cx(s.pill, s.pillInk)}><span className={s.spin} /> Syncing</span>
        )}
      </div>
      <div className={s.chat} style={{ marginTop: 10 }}>
        <span className={cx(s.bubble, s.bubbleShopper, fade(ms >= 1100))}>I&rsquo;m usually a 10. Which blazer size?</span>
        <span className={cx(s.bubble, s.bubbleAgent, fade(ms >= 1900))}>This one runs small, so take a 12.</span>
      </div>
      <p className={cx(s.cue, fade(ms >= 2300))} style={{ marginTop: 6, justifyContent: "flex-end", display: "flex" }}>From your Size guide</p>
    </Mini>
  );
}

/** Team hours: switch on, then the week fills in. */
export function TeamHoursMini() {
  const { ref, ms } = useScene(2800);
  const on = ms >= 400;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <Mini sceneRef={ref} label="Turning on team hours and setting the hours for each day">
      <div className={s.miniRow}>
        <span>Use team hours</span>
        <Switch on={on} />
      </div>
      <div className={s.week}>
        {days.map((d, i) => {
          const set = ms >= 800 + i * 220;
          const weekend = i > 4;
          return (
            <div key={d} className={s.day}>
              <span>{d}</span>
              <span className={s.dayTrack}>
                <span className={s.dayFill} style={{ width: set && !weekend ? "35%" : "0%" }} />
              </span>
              <span className={s.dayHours}>{set ? (weekend ? "Off" : "09:00–17:30") : ""}</span>
            </div>
          );
        })}
      </div>
    </Mini>
  );
}

/** Handoff rules switch on one by one. */
export function HandoffMini() {
  const { ref, ms } = useScene(2600);
  const rules = ["Shopper asks for a person", "Mentions a refund or return", "Cart is worth over $500", "Wants a complex order change"];
  return (
    <Mini sceneRef={ref} label="Turning on the rules for when the agent hands a chat to a person">
      <span className={s.miniTitle}>Hand off to a human when…</span>
      <div className={s.miniRows}>
        {rules.map((r, i) => (
          <div key={r} className={s.miniRow}>
            <span>{r}</span>
            <Switch on={ms >= 400 + i * 450} />
          </div>
        ))}
      </div>
    </Mini>
  );
}

/** Invite a teammate as a member. */
export function InviteMini() {
  const { ref, ms } = useScene(3000);
  const email = "grace@lucienvalliere.com";
  const invited = ms >= 2200;
  return (
    <Mini sceneRef={ref} label="Inviting a teammate to the Aurevia dashboard as a member">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className={s.miniTitle}>Team · {invited ? 2 : 1} members</span>
        <span className={cx(s.btn, ms >= 1900 && ms < 2200 && s.btnPress)}><UserPlus aria-hidden="true" /> Invite</span>
      </div>
      <div className={s.miniRows}>
        <div className={s.miniRow}>
          <span className={s.who}><span className={s.avatar}>OR</span>Oliver Reed</span>
          <span className={s.muted}>Owner</span>
        </div>
        <div className={cx(s.arrive, invited && s.arriveOn)}>
          <div>
            <div className={s.miniRow}>
              <span className={s.who}><span className={cx(s.avatar, s.avatarSoft)}>GH</span>Grace Hill</span>
              <span className={cx(s.pill, s.pillGreen)}>Member · Invited</span>
            </div>
          </div>
        </div>
      </div>
      <div className={cx(s.input, invited && s.gone)} style={{ marginTop: 10 }}>
        <span className={s.inputText}>
          {typed(email, ms, 300, 1700) || <span className={s.placeholder}>Email address</span>}
          <Caret show={ms >= 300 && ms < 1900} />
        </span>
      </div>
    </Mini>
  );
}

/* ═════════════════════════ The app, for heroes ═════════════════════════ */

const SPARK = [2, 3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9];

function Spark({ p }: { p: number }) {
  return (
    <span className={s.spark} aria-hidden="true">
      {SPARK.map((h, i) => (
        <i key={i} style={{ height: `${Math.max(8, h * 11 * Math.min(1, Math.max(0, p * 1.6 - i * 0.04)))}%` }} />
      ))}
    </span>
  );
}

/** The merchant app (app.aurevia.io) as the hero visual: its sidebar and Home in dashboard view. "week" counts up
    the headline numbers, then the run-rate projection and the chat split; "revenue" leads with what the agent sold,
    the sales split, and an order being credited to its chat. Figures are the Lucien Vallière demo store's. */
export function AppHeroDemo({ variant = "week" }: { variant?: "week" | "revenue" }) {
  const { ref, ms } = useScene(variant === "week" ? 4200 : 4600);
  const e = 1 - Math.pow(1 - span(ms, 300, 1900), 3);
  const week = [
    { label: "Revenue Influenced", value: money(2311 * e), spark: true },
    { label: "Orders Influenced", value: String(Math.round(27 * e)), spark: true },
    { label: "Shoppers Assisted", value: String(Math.round(114 * e)) },
    { label: "Recommendation Conversion", value: `${(23.7 * e).toFixed(1)}%` },
    { label: "Revenue / Conversation", value: money(14 * e) },
    { label: "AI-Assisted Conversion Rate", value: `${(16.6 * e).toFixed(1)}%` },
  ];
  const revenue = [
    { label: "Revenue Influenced", value: money(2311 * e), spark: true },
    { label: "Orders Influenced", value: String(Math.round(27 * e)), spark: true },
    { label: "Revenue / Conversation", value: money(14 * e) },
  ];
  const kpis = variant === "week" ? week : revenue;
  const nav = [
    { icon: House, label: "Home", on: true },
    { icon: BookOpen, label: "Knowledge" },
    { icon: Bot, label: "AI Behaviour" },
    { icon: ShoppingCart, label: "Products" },
    { icon: Users, label: "Leads", badge: "3" },
  ];
  const bar = span(ms, 2300, 3300);
  return (
    <div ref={ref} className={s.app} role="img" aria-label={variant === "week" ? "The Aurevia dashboard: the week's headline numbers, the run-rate projection and the chat split" : "The Aurevia dashboard: revenue the agent influenced, the sales split and an order credited to its chat"}>
      <aside className={s.appSide}>
        <span className={s.appBrand}>
          <img src="/images/aurevia-logo-mark.webp" alt="" />
          <span>
            <b>Aurevia.io</b>
            <small>Lucien Vallière</small>
          </span>
        </span>
        <nav className={s.appNav}>
          {nav.map((n) => (
            <span key={n.label} className={cx(s.appNavItem, n.on && s.appNavOn)}>
              <n.icon aria-hidden="true" />
              {n.label}
              {n.badge ? <span className={s.appNavBadge}>{n.badge}</span> : null}
            </span>
          ))}
          <span className={cx(s.appNavItem, s.appNavAsk)}>
            <span className={s.ringMark} />
            Ask Aurevia
            <kbd>⌘K</kbd>
          </span>
        </nav>
      </aside>
      <div className={s.appMain}>
        <div className={s.appTop}>
          <span className={s.tabs}>
            <span className={s.tab}>Chat</span>
            <span className={cx(s.tab, s.tabOn)}>Dashboard</span>
          </span>
          <span className={cx(s.tabs, s.hideSm)}>
            <span className={s.tab}>7 Days</span>
            <span className={s.tab}>30 Days</span>
            <span className={cx(s.tab, s.tabOn)}>90 Days</span>
          </span>
        </div>
        <div className={s.appKpis}>
          {kpis.map((k, i) => (
            <div key={k.label} className={cx(s.kpi, variant === "revenue" && i === 0 && s.appKpiLead)}>
              <span className={s.kpiLabel}>{k.label}</span>
              <span className={s.appKpiRow}>
                <span className={s.kpiValue}>{k.value}</span>
                {k.spark ? <Spark p={span(ms, 300, 2100)} /> : null}
              </span>
            </div>
          ))}
        </div>
        {variant === "week" ? (
          <>
            <div className={cx(s.appBanner, fade(ms >= 2000))}>
              <span className={s.appBannerIcon}><TrendingUp aria-hidden="true" /></span>
              <span>
                <span className={s.appBannerLabel}>Projected AI-assisted revenue this month <i>(run-rate estimate, not a guarantee)</i></span>
                <b>$762</b> <small>based on $25/day avg × 30 days</small>
              </span>
            </div>
            <div className={cx(s.split, fade(ms >= 2300))}>
              Chat Distribution
              <div className={s.splitBar}><span className={s.splitFill} style={{ width: `${89.6 * bar}%` }} /></div>
              <div className={s.splitKey}>
                <span className={s.key}><span className={s.keyDot} /> AI Attended: <b>146 (89.6%)</b></span>
                <span className={s.key}><span className={cx(s.keyDot, s.keyDotOther)} /> Human Attended: <b>17 (10.4%)</b></span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={cx(s.split, fade(ms >= 2100))}>
              Sales Distribution
              <div className={s.splitBar}><span className={s.splitFill} style={{ width: `${35.4 * bar}%` }} /></div>
              <div className={s.splitKey}>
                <span className={s.key}><span className={s.keyDot} /> AI Assisted: <b>$2,311 (35.4%)</b></span>
                <span className={s.key}><span className={cx(s.keyDot, s.keyDotOther)} /> Other Sources: <b>$4,218 (64.6%)</b></span>
              </div>
            </div>
            <div className={cx(s.appToast, fade(ms >= 3600))}>
              <Thumb src={IMG.blouse} />
              <span style={{ minWidth: 0 }}>
                <span className={s.cellMain} style={{ display: "block" }}>Order #1042 · $520.00</span>
                <span className={s.cellSub}>Credited to the chat with Ava T.</span>
              </span>
              <span className={cx(s.pill, s.pillGreen)}><Check aria-hidden="true" /> Attributed</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Influenced revenue, product by product: the two headline numbers, then each recommended product's shown →
    added → bought funnel and the revenue it brought in. */
export function ProductAttributionScene() {
  const { ref, ms } = useScene(4600);
  const e = 1 - Math.pow(1 - span(ms, 300, 1700), 3);
  const rows = [
    // Bought × price; together they stay inside the $2,311 total (the rest came from other products).
    { img: IMG.boots, name: "Patent Leather Ankle Boots", shown: 64, added: 6, bought: 1, revenue: 970 },
    { img: IMG.blouse, name: "Silk Draped Blouse", shown: 58, added: 7, bought: 1, revenue: 520 },
    { img: IMG.hoodie, name: "Metro Yellow Hoodie", shown: 41, added: 8, bought: 3, revenue: 387 },
    { img: IMG.joggers, name: "Blue Line Athletic Joggers", shown: 37, added: 5, bought: 2, revenue: 196 },
  ];
  // Each bar is scaled to the largest value in its column, so the columns compare products.
  const top = { shown: Math.max(...rows.map((x) => x.shown)), added: Math.max(...rows.map((x) => x.added)), bought: Math.max(...rows.map((x) => x.bought)) };
  const cols = { "--cols": "minmax(0,1.6fr) 1fr 1fr 1fr 90px", "--cols-sm": "minmax(0,1fr) 54px 76px" } as React.CSSProperties;
  return (
    <Stage sceneRef={ref} label="Recommended products, each with how often the agent showed it, how often it was added to the cart and bought, and the revenue it brought in">
      <div>
        <div className={s.kpis} style={{ marginBottom: 14 }}>
          <div className={s.kpi}>
            <span className={s.kpiLabel}>Revenue Influenced</span>
            <span className={s.kpiValue}>{money(2311 * e)}</span>
          </div>
          <div className={s.kpi}>
            <span className={s.kpiLabel}>Orders Influenced</span>
            <span className={s.kpiValue}>{Math.round(27 * e)}</span>
          </div>
        </div>
        <div className={s.panel}>
          <div className={s.head}>
            <span className={s.headTitle}>Recommended products</span>
            <span className={s.hideSm}>Last 90 days</span>
          </div>
          <div className={s.rows}>
            <div className={cx(s.row, s.colHead)} style={cols}>
              <span>Product</span>
              <span className={s.hideSm}>Shown</span>
              <span className={s.hideSm}>Added</span>
              <span>Bought</span>
              <span>Revenue</span>
            </div>
            {rows.map((row, i) => {
              const p = span(ms, 1700 + i * 450, 2500 + i * 450);
              return (
                <div key={row.img} className={cx(s.row, i === 0 && ms >= 4000 && s.flash)} style={cols}>
                  <span className={s.who}><Thumb src={row.img} /><span className={s.cellMain}>{row.name}</span></span>
                  <span className={cx(s.funnel, s.hideSm)}><i style={{ width: `${(row.shown / top.shown) * 100 * p}%` }} />{Math.round(row.shown * p)}</span>
                  <span className={cx(s.funnel, s.hideSm)}><i style={{ width: `${(row.added / top.added) * 100 * p}%` }} />{Math.round(row.added * p)}</span>
                  <span className={s.funnel}><i style={{ width: `${(row.bought / top.bought) * 100 * p}%` }} />{Math.round(row.bought * p)}</span>
                  <span className={s.cellMain} style={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{money(row.revenue * p)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Stage>
  );
}
