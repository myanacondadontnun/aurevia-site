import {
  ArrowRight,
  BarChart3,
  Check,
  Download,
  EyeOff,
  Mail,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { ChannelBadge, InstagramGlyph, WhatsAppGlyph } from "@/components/ChannelIcons";
import v from "./featureVisuals.module.css";

/**
 * Still picture cues for the "What you get" cards: one small, static slice of the product showing what that card
 * says (a chat exchange, a product card, a hidden comment, a dashboard tile). Server-rendered, no motion. Demo store
 * Lucien Vallière unless a page passes its own words or products.
 */

type Item = { name: string; price: string; img?: string };

export type FeatureVisual = {
  kind:
    | "ask" | "answer" | "products" | "cart" | "checkoutLink" | "knowledge" | "voice" | "handoff" | "ticket" | "live"
    | "phone" | "email" | "emailReply" | "rules" | "discount" | "kpis" | "funnel" | "attribution" | "leads" | "export"
    | "compare" | "order" | "nudge" | "dm" | "story" | "commentReply" | "commentHidden" | "install" | "brand" | "inbox"
    | "team" | "allowance" | "correction" | "guardrail" | "upsell" | "forward" | "context" | "history";
  /** Shopper's line, for chat-like visuals */
  q?: string;
  /** Agent's line, for chat-like visuals */
  a?: string;
  /** Small source cue under the answer */
  source?: string;
  /** Products, for "products" and "upsell" */
  items?: Item[];
  /** Rule text, for "guardrail" */
  rule?: string;
  /** [label, figure] tiles, for "kpis" */
  stats?: [string, string][];
};

const IMG = {
  blouse: "/images/demo/lv/silk-blouse.webp",
  boots: "/images/demo/lv/patent-boots.webp",
  blazer: "/images/demo/lv/cashmere-blazer.webp",
  necklace: "/images/demo/lv/gilded-necklace.webp",
  jacket: "/images/demo/lv/pop-pink-jacket.webp",
  hoodie: "/images/demo/lv/metro-hoodie.webp",
};

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

function Thumb({ src, name }: { src?: string; name: string }) {
  return src ? <img className={v.thumb} src={src} alt="" loading="lazy" /> : <span className={cx(v.thumb, v.thumbBlank)}>{name[0]}</span>;
}
function Me({ children }: { children: React.ReactNode }) {
  return <span className={cx(v.bubble, v.me)}>{children}</span>;
}
function Agent({ children }: { children: React.ReactNode }) {
  return <span className={cx(v.bubble, v.agent)}>{children}</span>;
}
function Cue({ children }: { children: React.ReactNode }) {
  return <span className={v.cue}><img src="/images/site/mark-ring.webp" alt="" />{children}</span>;
}
function Tick() {
  return <span className={v.tick}><Check aria-hidden="true" /></span>;
}
function Switch({ on = true }: { on?: boolean }) {
  return <span className={cx(v.switch, on && v.switchOn)} />;
}
function Pill({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "ink" | "muted" }) {
  return <span className={cx(v.pill, v[`pill_${tone}`])}>{children}</span>;
}

function render(vis: FeatureVisual) {
  switch (vis.kind) {
    case "ask":
      return (
        <div className={v.chat}>
          <Me>{vis.q ?? "Something for a summer wedding?"}</Me>
          <Agent>{vis.a ?? "Lovely! Outdoors or indoors, and midi or maxi?"}</Agent>
          <Cue>{vis.source ?? "Asks before it suggests"}</Cue>
        </div>
      );
    case "answer":
      return (
        <div className={v.chat}>
          <Me>{vis.q ?? "Do the boots run small?"}</Me>
          <Agent>{vis.a ?? "True to size, so your usual 38 is right."}</Agent>
          <Cue>{vis.source ?? "From your size guide"}</Cue>
        </div>
      );
    case "products": {
      const items = vis.items ?? [
        { name: "Silk Draped Blouse", price: "$520", img: IMG.blouse },
        { name: "Patent Ankle Boots", price: "$970", img: IMG.boots },
      ];
      return (
        <div className={v.cards}>
          {items.slice(0, 2).map((it) => (
            <span key={it.name} className={v.card}>
              {it.img ? <img src={it.img} alt="" loading="lazy" /> : <span className={v.cardBlank}>{it.name[0]}</span>}
              <b>{it.name}</b>
              <small>{it.price}</small>
              <span className={v.cardBtn}>Add to cart</span>
            </span>
          ))}
        </div>
      );
    }
    case "cart":
      return (
        <div className={v.stack}>
          <span className={v.row}><Thumb src={IMG.blouse} name="Blouse" /><span className={v.rowText}><b>Silk Draped Blouse</b><small>Size M</small></span><b>$520</b></span>
          <span className={v.strip}><ShoppingBag aria-hidden="true" /> Added to cart · 1 item <b>Checkout</b></span>
        </div>
      );
    case "checkoutLink":
      return (
        <div className={v.chat}>
          <Agent>Done. Your cart is ready:</Agent>
          <span className={v.link}><Thumb src={IMG.blouse} name="Blouse" /><span className={v.rowText}><b>Checkout · 1 item · $520</b><small>lucienvalliere.com</small></span></span>
        </div>
      );
    case "knowledge":
      return (
        <div className={v.panel}>
          {["Size guide", "Returns & exchanges", "Shipping & delivery"].map((n) => (
            <span key={n} className={v.line}><span>{n}</span><Pill>Synced</Pill></span>
          ))}
        </div>
      );
    case "voice":
      return (
        <div className={v.stack}>
          <span className={v.pills}><Pill tone="muted">Friendly</Pill><Pill tone="ink">Professional</Pill><Pill tone="muted">Luxury</Pill></span>
          <Agent>&ldquo;Yes, we ship to Canada. Delivery takes 5 to 7 business days.&rdquo;</Agent>
        </div>
      );
    case "handoff":
      return (
        <div className={v.chat}>
          <Me>Can I talk to a person?</Me>
          <span className={v.system}><UserRound aria-hidden="true" /> Grace joined the chat</span>
          <Agent>Hi, Grace here. Let me sort that for you.</Agent>
        </div>
      );
    case "ticket":
      return (
        <div className={v.panel}>
          <span className={v.line}><span className={v.rowText}><b>Zoe Hall</b><small>Swap a jacket for a larger size</small></span><Pill tone="ink">Open</Pill></span>
          <span className={v.line}><span className={v.rowText}><b>Ethan Parker</b><small>Hasn&rsquo;t received tracking</small></span><Pill>In progress</Pill></span>
        </div>
      );
    case "live":
      return (
        <div className={v.panel}>
          <span className={v.panelHead}><span className={v.dot} /> 3 live chats</span>
          {[["Camille M.", "Browsing blouses · cart $520"], ["Oliver R.", "Asking about delivery"], ["Juliette B.", "Comparing two jackets"]].map(([n, t]) => (
            <span key={n} className={v.line}><span className={v.rowText}><b>{n}</b><small>{t}</small></span><span className={v.dot} /></span>
          ))}
        </div>
      );
    case "phone":
      return (
        <div className={v.notif}>
          <img src="/images/aurevia-logo-mark.webp" alt="" />
          <span className={v.rowText}><small>Aurevia · now</small><b>Camille asked for a person</b></span>
          <span className={v.btnInk}>Take over</span>
        </div>
      );
    case "email":
      return (
        <div className={v.mail}>
          <span className={v.mailBrand}>Lucien Vallière</span>
          <b className={v.mailTitle}>Still thinking it over, Camille?</b>
          <span className={v.row}><Thumb src={IMG.blouse} name="Blouse" /><span className={v.rowText}><b>Silk Draped Blouse</b><small>Qty 1</small></span><b>$520</b></span>
          <span className={v.btnInk}>Return to your cart</span>
        </div>
      );
    case "emailReply":
      return (
        <div className={v.panel}>
          <span className={v.mailRow}><Mail aria-hidden="true" /><span className={v.rowText}><b>Camille Martin</b><small>Do the boots run small?</small></span></span>
          <span className={v.mailRow}><img src="/images/site/mark-ring.webp" alt="" /><span className={v.rowText}><b>Lucien Vallière</b><small>True to size. Your cart is saved.</small></span><Pill>Replied</Pill></span>
        </div>
      );
    case "rules":
      return (
        <div className={v.panel}>
          {[["Quiet hours", "21:00 to 08:00"], ["Frequency cap", "Once a week"], ["Minimum cart", "$50"]].map(([n, t]) => (
            <span key={n} className={v.line}><span className={v.rowText}><b>{n}</b><small>{t}</small></span><Switch /></span>
          ))}
        </div>
      );
    case "discount":
      return (
        <div className={v.stack}>
          <span className={v.line}><span className={v.rowText}><b>Second email</b><small>24 hours after the first</small></span><Switch /></span>
          <span className={v.code}>WELCOME10 · 10% off</span>
        </div>
      );
    case "kpis":
      return (
        <div className={v.kpis}>
          {(vis.stats ?? [["Revenue influenced", "$2,311"], ["Orders influenced", "27"], ["Conversations", "163"]]).map(([l, n]) => (
            <span key={l} className={v.kpi}><small>{l}</small><b>{n}</b></span>
          ))}
        </div>
      );
    case "funnel":
      return (
        <div className={v.panel}>
          <span className={v.panelHead}>Patent Ankle Boots</span>
          {[["Shown", 64, 100], ["Added", 6, 34], ["Bought", 1, 12]].map(([l, n, w]) => (
            <span key={l} className={v.bar}><small>{l}</small><i style={{ width: `${w}%` }} /><b>{n}</b></span>
          ))}
        </div>
      );
    case "attribution":
      return (
        <div className={v.stack}>
          <span className={v.row}><Thumb src={IMG.blouse} name="Blouse" /><span className={v.rowText}><b>Order #1042 · $520</b><small>Tag: aurevia-chat</small></span></span>
          <span className={v.arrow}><ArrowRight aria-hidden="true" /></span>
          <span className={v.row}><span className={v.rowText}><b>Chat with Ava T.</b><small>Recommended, then added to cart</small></span><Pill>Credited</Pill></span>
        </div>
      );
    case "leads":
      return (
        <div className={v.panel}>
          <span className={v.line}><span className={v.rowText}><b>Tom · tom@northarc.co</b><small>200 units · next month</small></span><Pill>High intent</Pill></span>
          <span className={v.line}><span className={v.rowText}><b>Ava Thomas</b><small>Asked about sizing</small></span><Pill tone="muted">Browsing</Pill></span>
        </div>
      );
    case "export":
      return (
        <div className={v.stack}>
          <span className={v.line}><span className={v.rowText}><b>63 leads</b><small>Name, email, phone, transcript</small></span><span className={v.btnGreen}><Download aria-hidden="true" /> Export CSV</span></span>
          <span className={v.code}>leads.csv</span>
        </div>
      );
    case "compare":
      return (
        <div className={v.compare}>
          <span />
          <b>Linen Midi</b>
          <b>Silk Slip</b>
          <small>Feel</small><span>Light, breathable</span><span>Fluid, dressy</span>
          <small>Best for</small><span>Outdoor day</span><span>Evening</span>
          <span className={v.verdict}>For an outdoor wedding: the Linen Midi</span>
        </div>
      );
    case "order":
      return (
        <div className={v.panel}>
          <span className={v.line}><span className={v.rowText}><b>Order #1042</b><small>UPS Ground · due Thursday</small></span><Pill>Shipped</Pill></span>
          <span className={v.steps}><i className={v.stepOn} /><i className={v.stepOn} /><i /></span>
        </div>
      );
    case "nudge":
      return (
        <div className={cx(v.chat, v.wa)}>
          <span className={v.waHead}><WhatsAppGlyph className={v.glyph} /> Lucien Vallière</span>
          <span className={cx(v.bubble, v.waIn)}>Hi Camille, you left the Silk Draped Blouse in your cart. Any questions before you decide?<u>Return to your cart</u></span>
        </div>
      );
    case "dm":
      return (
        <div className={cx(v.chat, v.ig)}>
          <span className={v.igHead}><InstagramGlyph className={v.glyph} /> lucienvalliere</span>
          <span className={cx(v.bubble, v.igMe)}>{vis.q ?? "Do you ship to Canada?"}</span>
          <span className={cx(v.bubble, v.igThem)}>{vis.a ?? "We do, in 5 to 8 days."}</span>
        </div>
      );
    case "story":
      return (
        <div className={cx(v.chat, v.ig)}>
          <span className={v.storyRow}>
            <img src={IMG.jacket} alt="" className={v.story} />
            <span className={cx(v.bubble, v.igMe)}>Is this available?</span>
          </span>
          <span className={cx(v.bubble, v.igThem)}>It is! Added an M to your cart. Check out here.</span>
        </div>
      );
    case "commentReply":
      return (
        <div className={v.comments}>
          <span className={v.comment}><span className={v.cAvatar}>M</span><span><b>maya.k</b> Love this! Price?</span></span>
          <span className={cx(v.comment, v.commentReply)}><span className={cx(v.cAvatar, v.cStore)}>LV</span><span><b>lucienvalliere</b> It&rsquo;s $148. Link sent to your DMs. <Pill>Auto-reply</Pill></span></span>
        </div>
      );
    case "commentHidden":
      return (
        <div className={v.comments}>
          <span className={v.hidden}><EyeOff aria-hidden="true" /> Hidden: spam comment</span>
          <span className={v.hidden}><EyeOff aria-hidden="true" /> Hidden: abusive comment</span>
          <span className={v.comment}><span className={v.cAvatar}>S</span><span><b>sophie.ln</b> Does it come in navy?</span></span>
        </div>
      );
    case "install":
      return (
        <div className={v.stack}>
          <span className={v.line}><span className={v.app}><img src="/images/aurevia-logo-mark.webp" alt="" /></span><span className={v.rowText}><b>Aurevia</b><small>Shopify App Store</small></span><Pill>Installed</Pill></span>
          <span className={v.pills}>{["Products", "Collections", "Policies"].map((c) => <Pill key={c}><Check aria-hidden="true" /> {c}</Pill>)}</span>
        </div>
      );
    case "brand":
      return (
        <div className={v.stack}>
          <span className={v.swatches}>{["#17201e", "#007f68", "#b5835a", "#6b4c9a"].map((c, i) => <i key={c} style={{ background: c }} className={i === 0 ? v.swatchOn : undefined} />)}</span>
          <span className={v.widget}><img src="/images/site/mark-ring.webp" alt="" /> Hi! Looking for something special?</span>
        </div>
      );
    case "inbox":
      return (
        <div className={v.panel}>
          {(["store", "whatsapp", "instagram", "email"] as const).map((k) => (
            <span key={k} className={v.line}><span className={v.rowLead}><ChannelBadge kind={k} className="h-6 w-6 rounded-[7px]" />{k === "store" ? "Store chat" : k === "whatsapp" ? "WhatsApp" : k === "instagram" ? "Instagram" : "Email"}</span><Tick /></span>
          ))}
        </div>
      );
    case "team":
      return (
        <div className={v.panel}>
          {[["Oliver Reed", "Owner"], ["Grace Hill", "Admin"], ["Sam Lee", "Member"]].map(([n, r]) => (
            <span key={n} className={v.line}><span className={v.rowLead}><span className={v.avatar}>{n[0]}</span>{n}</span><small className={v.muted}>{r}</small></span>
          ))}
        </div>
      );
    case "allowance":
      return (
        <div className={v.panel}>
          <span className={v.panelHead}>Messages this month</span>
          <span className={v.meter}><i style={{ width: "62%" }} /></span>
          <span className={v.pills}><Pill>Custom allowance</Pill><Pill tone="muted">Add more any time</Pill></span>
        </div>
      );
    case "correction":
      return (
        <div className={v.chat}>
          <Agent><s>Two to three days.</s> Three to five working days.</Agent>
          <Cue>Corrected once, used from now on</Cue>
        </div>
      );
    case "guardrail":
      return (
        <div className={v.panel}>
          <span className={v.line}><span className={v.rowText}><small>Never</small><b>{vis.rule ?? "Promise a delivery date"}</b></span><Switch /></span>
          <span className={v.line}><span className={v.rowText}><small>Always</small><b>Offer the size guide when sizing comes up</b></span><Switch /></span>
        </div>
      );
    case "upsell": {
      const [main, add] = vis.items ?? [
        { name: "Silk Draped Blouse", price: "$520", img: IMG.blouse },
        { name: "Gilded Necklace", price: "$780", img: IMG.necklace },
      ];
      return (
        <div className={v.stack}>
          <span className={v.row}><Thumb src={main.img} name={main.name} /><span className={v.rowText}><b>{main.name}</b><small>In your cart</small></span><b>{main.price}</b></span>
          <span className={v.row}><Thumb src={add.img} name={add.name} /><span className={v.rowText}><b>{add.name}</b><small>Pairs well with it</small></span><span className={v.btnGreen}>Add</span></span>
        </div>
      );
    }
    case "forward":
      return (
        <div className={v.forward}>
          <span className={v.chip}><img src="/images/site/mark-ring.webp" alt="" /> Your Aurevia address</span>
          <ArrowRight aria-hidden="true" />
          <span className={v.chip}><Mail aria-hidden="true" /> Your mailbox</span>
        </div>
      );
    case "context":
      return (
        <div className={v.panel}>
          <span className={v.panelHead}><BarChart3 aria-hidden="true" /> Revenue influenced</span>
          <span className={v.chart}>
            {[30, 42, 38, 55, 48, 82, 90, 64, 58].map((h, i) => <i key={i} style={{ height: `${h}%` }} className={i === 5 || i === 6 ? v.chartHot : undefined} />)}
            <span className={v.note}>Spring sale</span>
          </span>
        </div>
      );
    case "history":
      return (
        <div className={v.panel}>
          {[["Camille M.", "Asked about sizing, bought the blouse"], ["Oliver R.", "Tracked order #1042"], ["Tom", "Bulk order, passed to sales"]].map(([n, t]) => (
            <span key={n} className={v.line}><span className={v.rowLead}><span className={v.avatar}>{n[0]}</span><span className={v.rowText}><b>{n}</b><small>{t}</small></span></span></span>
          ))}
        </div>
      );
  }
}

export default function FeatureVisualView({ visual }: { visual: FeatureVisual }) {
  return (
    <div className={v.frame} aria-hidden="true">
      {render(visual)}
    </div>
  );
}
