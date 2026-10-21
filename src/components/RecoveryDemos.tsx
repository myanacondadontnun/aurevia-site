"use client";

/**
 * Cart recovery, played end to end on the Lucien Vallière demo store: the recovery message arrives, the shopper
 * opens it, taps back to the cart and pays. InboxRecoveryDemo is the email in Gmail (a notification, the inbox, then
 * the thread with the real template's copy, as in AbandonedCartEmail); WhatsAppRecoveryDemo is the WhatsApp nudge (the real template from WhatsAppNudge). A pointer
 * shows each tap. Loops while on screen; reduced motion shows the confirmed order. The pointer, checkout and
 * confirmation are exported for the home hero, whose store chat ends in the same checkout.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Archive, ArrowLeft, Camera, Check, ChevronDown, EyeOff, Heart, Image as ImageIcon, Lock, Mail, Menu, Mic, MoreVertical, Paperclip, Pencil, Reply, Smile, Star, Trash2 } from "lucide-react";
import { GmailLogo } from "@/components/BrandLogos";
import { WA_NUDGE } from "@/components/WhatsAppNudge";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/ChannelIcons";
import { useScene } from "@/components/sceneClock";
import r from "./recoveryDemos.module.css";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

export type Line = { name: string; price: string; img: string };
const CART: Line[] = [
  { name: "Silk Draped Blouse", price: "$520.00", img: "/images/demo/lv/silk-blouse.webp" },
  { name: "Gilded Statement Necklace", price: "$780.00", img: "/images/demo/lv/gilded-necklace.webp" },
  { name: "Patent Leather Ankle Boots", price: "$970.00", img: "/images/demo/lv/patent-boots.webp" },
];

/** Moves the pointer to the target's sweet spot whenever the step changes; parks it bottom right with no target. */
export function usePointer(frame: React.RefObject<HTMLDivElement>, step: string, target: () => Element | null | undefined) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useLayoutEffect(() => {
    const f = frame.current;
    if (!f) return;
    const fr = f.getBoundingClientRect();
    const el = target();
    if (!el) {
      setPos({ x: fr.width * 0.8, y: fr.height * 0.9 });
      return;
    }
    const t = el.getBoundingClientRect();
    setPos({ x: t.left - fr.left + Math.min(t.width * 0.55, 150), y: t.top - fr.top + t.height * 0.6 });
    // The step is the only thing that moves the pointer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
  return pos;
}

export function Pointer({ pos, ms, clicks, hidden }: { pos: { x: number; y: number }; ms: number; clicks: number[]; hidden: boolean }) {
  const click = clicks.find((t) => ms >= t && ms < t + 520);
  return (
    <span className={r.cursor} style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, opacity: hidden ? 0 : 1 }} aria-hidden="true">
      {click !== undefined ? <span key={click} className={r.ring} /> : null}
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M5 3l14 8-6.2 1.6L10 19z" fill="#17201e" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** The store's checkout, opened from the message with the cart restored (Shopify one-page layout). */
export function Checkout({
  store = "Lucien Vallière",
  open,
  lines,
  total,
  paying,
  pressed,
  payRef,
}: {
  store?: string;
  open: boolean;
  lines: Line[];
  total: string;
  paying: boolean;
  pressed: boolean;
  payRef: React.RefObject<HTMLSpanElement>;
}) {
  return (
    <div className={cx(r.sheet, r.fromBottom, open && r.sheetOn)}>
      <div className={r.coHead}>{store}</div>
      <div className={r.coSummary}>
        <span className={r.coSummaryLabel}>Order summary <ChevronDown aria-hidden="true" /></span>
        <span className={r.coThumbs}>
          {lines.map((l) => (
            <img key={l.name} src={l.img} alt="" />
          ))}
        </span>
        <b>{total}</b>
      </div>
      <div className={r.coBody}>
        <span className={r.coLabel}>Contact</span>
        <span className={r.coField}>camille.martin@example.com</span>
        <span className={r.coLabel}>Delivery</span>
        <span className={r.coField}>Camille Martin, 14 Rue des Lilas, Lyon</span>
        <span className={r.coShip}>
          <span className={r.coRadio} />
          <span>Standard shipping</span>
          <b>Free</b>
        </span>
        <span className={r.coTotals}>
          <span><span>Subtotal</span><span>{total}</span></span>
          <span><span>Shipping</span><span>Free</span></span>
          <span className={r.coGrand}><span>Total</span><span><small>USD</small> {total}</span></span>
        </span>
        <span ref={payRef} className={cx(r.pay, pressed && r.press)}>
          {paying ? <span className={r.spin} /> : <Lock width={15} height={15} aria-hidden="true" />}
          {paying ? "Processing…" : "Pay now"}
        </span>
        <span className={r.coNote}>Your cart was saved from your last visit.</span>
      </div>
    </div>
  );
}

export function Confirmed({ on, order, total, how }: { on: boolean; order: string; total: string; how: string }) {
  return (
    <div className={cx(r.done, on && r.doneOn)}>
      <span className={r.tick}><Check aria-hidden="true" /></span>
      <span className={r.doneTitle}>Thank you, Camille!</span>
      <span className={r.doneText}>Order {order} is confirmed · {total}</span>
      <span className={r.recovered}>{how}</span>
    </div>
  );
}

/* ═════════════════════════ Email, in Gmail ═════════════════════════ */

const INBOX = [
  { i: "N", tone: "#1a73e8", from: "Northwind Rail", subject: "Your e-ticket for Saturday", preview: "Seat 42A, coach C. Show this at the gate.", time: "09:15" },
  { i: "R", tone: "#a142f4", from: "Ruth Adams", subject: "Lunch on Friday?", preview: "There's a new place near the gallery we should try.", time: "Yesterday" },
  { i: "T", tone: "#e37400", from: "The Weekly Edit", subject: "Ten pieces for the new season", preview: "Layering is back, and so are long coats.", time: "Mon" },
];

// Timeline (ms)
const E = { notify: 500, arrive: 800, unnotify: 2100, toRow: 2200, clickRow: 2900, open: 3100, scroll: 3900, toBtn: 4700, clickBtn: 5400, checkout: 5600, toPay: 6400, clickPay: 7100, done: 7700 };

export function InboxRecoveryDemo() {
  const { ref, ms } = useScene(E.done + 200, { fromStart: true });
  const rowRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLSpanElement>(null);
  const payRef = useRef<HTMLSpanElement>(null);
  const step = ms < E.toRow ? "rest" : ms < E.toBtn ? "row" : ms < E.toPay ? "btn" : "pay";
  const pos = usePointer(ref, step, () => (step === "row" ? rowRef.current : step === "btn" ? btnRef.current : step === "pay" ? payRef.current : null));
  const arrived = ms >= E.arrive;

  return (
    <div ref={ref} className={cx(r.frame, r.gmail)} role="img" aria-label="A cart recovery email arrives in Gmail; the shopper opens it, returns to the cart and pays">
      {/* Push notification */}
      <div className={cx(r.notif, ms >= E.notify && ms < E.unnotify && r.notifOn)}>
        <GmailLogo className={r.notifIcon} />
        <span className={r.notifText}>
          <span className={r.notifApp}>Gmail · now</span>
          <b>Lucien Vallière</b>
          <span>Still thinking it over, Camille?</span>
        </span>
      </div>

      {/* Inbox */}
      <div className={r.gmTop}>
        <Menu aria-hidden="true" />
        <span className={r.gmBrand}><GmailLogo className={r.gmLogo} /> Gmail</span>
        <span className={r.gmMe}>C</span>
      </div>
      <div className={r.gmSearch}>Search in mail</div>
      <div className={r.gmLabel}>Primary</div>
      <div className={r.list}>
        <div className={cx(r.arrive, arrived && r.arriveOn)}>
          <div>
            <div ref={rowRef} className={cx(r.gmRow, r.gmUnread, ms >= E.clickRow && ms < E.open + 300 && r.gmPress)}>
              <span className={r.gmAvatar} style={{ background: "#17201e" }}>L</span>
              <span className={r.gmMain}>
                <span className={r.gmLine}><span className={r.gmFrom}>Lucien Vallière</span><span className={r.gmTime}>10:42</span></span>
                <span className={r.gmSubject}>Still thinking it over, Camille?</span>
                <span className={r.gmLine}><span className={r.gmSnippet}>Just wanted to check in. You&rsquo;ve got the Silk Draped Blouse…</span><Star aria-hidden="true" /></span>
              </span>
            </div>
          </div>
        </div>
        {INBOX.map((m) => (
          <div key={m.from} className={r.gmRow}>
            <span className={r.gmAvatar} style={{ background: m.tone }}>{m.i}</span>
            <span className={r.gmMain}>
              <span className={r.gmLine}><span className={r.gmFrom}>{m.from}</span><span className={r.gmTime}>{m.time}</span></span>
              <span className={r.gmSubject}>{m.subject}</span>
              <span className={r.gmLine}><span className={r.gmSnippet}>{m.preview}</span><Star aria-hidden="true" /></span>
            </span>
          </div>
        ))}
      </div>
      <span className={r.compose}><Pencil aria-hidden="true" /> Compose</span>

      {/* The thread: Gmail chrome around the store's email (same copy as the real template) */}
      <div className={cx(r.sheet, r.fromRight, ms >= E.open && r.sheetOn)}>
        <div className={r.gmBar}>
          <ArrowLeft aria-hidden="true" />
          <span className={r.gmBarIcons}><Archive aria-hidden="true" /><Trash2 aria-hidden="true" /><Mail aria-hidden="true" /><MoreVertical aria-hidden="true" /></span>
        </div>
        <div className={r.scroller}>
          <div className={r.scrolled} style={{ transform: `translateY(${ms >= E.scroll ? -220 : 0}px)` }}>
            <div className={r.gmThreadSubject}>Still thinking it over, Camille? <span className={r.gmChip}>Inbox</span></div>
            <div className={r.gmSender}>
              <span className={r.gmAvatar} style={{ background: "#17201e" }}>L</span>
              <span className={r.gmMain}>
                <span className={r.gmLine}><b>Lucien Vallière</b><span className={r.gmTime}>10:42</span></span>
                <span className={r.gmTo}>to me <ChevronDown aria-hidden="true" /></span>
              </span>
              <span className={r.gmSenderIcons}><Reply aria-hidden="true" /><MoreVertical aria-hidden="true" /></span>
            </div>
            <div className={r.mail}>
              <div className={r.mailBrand}>Lucien Vallière</div>
              <p className={r.mailHi}>Hi Camille,</p>
              <p className={r.mailText}>
                Just wanted to check in. You&rsquo;ve got the Silk Draped Blouse, Gilded Statement Necklace and Patent Ankle Boots
                sitting in your cart. If you have any questions about them or need help deciding, just reply here and I&rsquo;ll
                get back to you.
              </p>
              <div className={r.mailItems}>
                {CART.map((l) => (
                  <div key={l.name} className={r.mailItem}>
                    <img src={l.img} alt="" />
                    <span className={r.mailItemText}><b>{l.name}</b><span>Qty 1</span></span>
                    <span>{l.price}</span>
                  </div>
                ))}
              </div>
              <div className={r.mailTotal}><span>Total</span><b>$2,270.00</b></div>
              <span ref={btnRef} className={cx(r.mailBtn, ms >= E.clickBtn && ms < E.checkout + 200 && r.press)}>Return to your cart</span>
              <p className={r.mailSmall}>Reply to this email if you have any questions.</p>
              <p className={r.mailSmall}>Lucien Vallière</p>
            </div>
          </div>
        </div>
      </div>

      <Checkout open={ms >= E.checkout} lines={CART} total="$2,270.00" paying={ms >= E.clickPay} pressed={ms >= E.clickPay && ms < E.clickPay + 200} payRef={payRef} />
      <Confirmed on={ms >= E.done} order="#1043" total="$2,270.00" how="Recovered from the follow-up email" />
      <Pointer pos={pos} ms={ms} clicks={[E.clickRow, E.clickBtn, E.clickPay]} hidden={ms >= E.done} />
    </div>
  );
}

/* ═════════════════════════ Message bars ═════════════════════════ */

/** WhatsApp's compose bar: the rounded field with emoji, attach and camera, and the green mic. */
function WaInputBar() {
  return (
    <div className={r.waInputBar} aria-hidden="true">
      <span className={r.waField}>
        <Smile />
        <span className={r.waPlaceholder}>Message</span>
        <Paperclip />
        <Camera />
      </span>
      <span className={r.waMic}><Mic /></span>
    </div>
  );
}

/** Instagram's compose bar: the blue camera, "Message...", then mic and gallery. */
function IgInputBar() {
  return (
    <div className={r.igInputBar} aria-hidden="true">
      <span className={r.igField}>
        <span className={r.igCam}><Camera /></span>
        <span className={r.igPlaceholder}>Message...</span>
        <Mic />
        <ImageIcon />
      </span>
    </div>
  );
}

/* ═════════════════════════ WhatsApp ═════════════════════════ */

export const W = { nudge: 600, ask: 1700, typing: 2500, answer: 3300, toCta: 4200, clickCta: 4900, checkout: 5100, toPay: 5900, clickPay: 6600, done: 7200 };

/** Reports the scene's clock to a parent that times things around the demo (the home hero's margin cues). */
function useReportMs(ms: number, onMs?: (ms: number) => void) {
  useEffect(() => onMs?.(ms), [ms, onMs]);
}

export function WhatsAppRecoveryDemo({ onMs }: { onMs?: (ms: number) => void } = {}) {
  const { ref, ms } = useScene(W.done + 200, { fromStart: true });
  useReportMs(ms, onMs);
  const ctaRef = useRef<HTMLSpanElement>(null);
  const payRef = useRef<HTMLSpanElement>(null);
  const step = ms < W.toCta ? "rest" : ms < W.toPay ? "cta" : "pay";
  const pos = usePointer(ref, step, () => (step === "cta" ? ctaRef.current : step === "pay" ? payRef.current : null));
  const shown = (t: number) => cx(r.waIn, ms >= t && r.waInOn);

  return (
    <div ref={ref} className={cx(r.frame, r.frameWa)} role="img" aria-label="A cart recovery message arrives on WhatsApp; the agent answers a question, then the shopper returns to the cart and pays">
      <div className="demo-wa" style={{ display: "flex", flexDirection: "column", maxWidth: "none", height: "100%", border: 0, borderRadius: 0, boxShadow: "none" }}>
        <div className="demo-wa-head">
          <span className="demo-wa-avatar">LV</span>
          <span className="demo-wa-head-text">
            <strong>Lucien Vallière</strong>
            <span>Business account</span>
          </span>
          <WhatsAppGlyph className="demo-wa-mark" />
        </div>
        <div className={r.waBody}>
          <span className="demo-wa-day">Today</span>
          <div className={cx("demo-wa-msg demo-wa-in", shown(W.nudge))}>
            <p>{WA_NUDGE.text}</p>
            <span className="demo-wa-foot">{WA_NUDGE.footer}</span>
            <span className="demo-wa-time">10:42</span>
            <span ref={ctaRef} className={cx("demo-wa-cta", ms >= W.clickCta && ms < W.checkout + 300 && r.ctaPress)}>{WA_NUDGE.button}</span>
          </div>
          <div className={cx("demo-wa-msg demo-wa-out", shown(W.ask))}>
            <p>Will it arrive before Friday?</p>
            <span className="demo-wa-time">10:47 ✓✓</span>
          </div>
          {ms >= W.typing && ms < W.answer ? (
            <div className="demo-wa-msg demo-wa-in">
              <span className={r.waTyping}><i /><i /><i /></span>
            </div>
          ) : (
            <div className={cx("demo-wa-msg demo-wa-in", shown(W.answer))}>
              <p>Yes. Order today and express lands Wednesday, standard Thursday.</p>
              <span className="demo-wa-time">10:47</span>
            </div>
          )}
        </div>
        <WaInputBar />
      </div>

      <Checkout open={ms >= W.checkout} lines={CART.slice(0, 1)} total="$520.00" paying={ms >= W.clickPay} pressed={ms >= W.clickPay && ms < W.clickPay + 200} payRef={payRef} />
      <Confirmed on={ms >= W.done} order="#1044" total="$520.00" how="Recovered on WhatsApp" />
      <Pointer pos={pos} ms={ms} clicks={[W.clickCta, W.clickPay]} hidden={ms >= W.done} />
    </div>
  );
}

/* ═════════════════════════ Shopping in a chat app ═════════════════════════ */

const JACKET: Line = { name: "Pop Pink Zip-Up Jacket", price: "$148.00", img: "/images/demo/lv/pop-pink-jacket.webp" };

export const S = { ask: 500, typing: 1300, product: 2100, yes: 3200, typing2: 3700, link: 4300, toLink: 5000, clickLink: 5700, checkout: 5900, toPay: 6700, clickPay: 7400, done: 8000 };

/** A shopper buying inside WhatsApp or Instagram, seen on their phone: a question (on Instagram, a reply to a
    story), the product, a cart the agent builds, then the checkout link, checkout and the order. */
export function ShopChatDemo({ theme, onMs }: { theme: "whatsapp" | "instagram"; onMs?: (ms: number) => void }) {
  const { ref, ms } = useScene(S.done + 200, { fromStart: true });
  useReportMs(ms, onMs);
  const linkRef = useRef<HTMLSpanElement>(null);
  const payRef = useRef<HTMLSpanElement>(null);
  const step = ms < S.toLink ? "rest" : ms < S.toPay ? "link" : "pay";
  const pos = usePointer(ref, step, () => (step === "link" ? linkRef.current : step === "pay" ? payRef.current : null));
  const at = (t: number) => ms >= t;
  const wa = theme === "whatsapp";
  const item = wa ? CART[0] : JACKET;
  const size = "M";
  const msg = (from: "me" | "store", t: number, children: React.ReactNode, extra?: string) =>
    at(t) ? <div className={cx(r.cm, from === "me" ? r.cmMe : r.cmStore, wa ? r.waTheme : r.igTheme, extra)}>{children}</div> : null;

  return (
    <div ref={ref} className={cx(r.frame, wa ? r.frameWa : r.frameIg)} role="img" aria-label={wa ? "A shopper asks on WhatsApp, the agent shows the product, builds the cart and sends a checkout link, and the shopper pays" : "A shopper replies to an Instagram story asking if it's available; the agent builds the cart, sends a checkout link and the shopper pays"}>
      {wa ? (
        <div className="demo-wa-head">
          <span className="demo-wa-avatar">LV</span>
          <span className="demo-wa-head-text"><strong>Lucien Vallière</strong><span>Business account</span></span>
          <WhatsAppGlyph className="demo-wa-mark" />
        </div>
      ) : (
        <div className={r.igHead}>
          <ArrowLeft aria-hidden="true" />
          <span className={r.igAvatar}>LV</span>
          <span className={r.igHeadText}><b>lucienvalliere</b><small>Business chat</small></span>
          <InstagramGlyph className={r.igMark} />
        </div>
      )}
      <div className={r.chatBody}>
        {wa ? (
          msg("me", S.ask, <p>Hi, do you have the silk blouse in a medium?</p>)
        ) : at(S.ask) ? (
          <div className={r.story}>
            <span className={r.storyLabel}>You replied to their story</span>
            <img src={JACKET.img} alt="" className={r.storyThumb} />
            <div className={cx(r.cm, r.cmMe, r.igTheme)}><p>Is this available?</p></div>
          </div>
        ) : null}
        {ms >= S.typing && ms < S.product ? <div className={cx(r.cm, r.cmStore, wa ? r.waTheme : r.igTheme)}><span className={r.waTyping}><i /><i /><i /></span></div> : null}
        {msg(
          "store",
          S.product,
          <>
            <span className={r.cmItem}>
              <img src={item.img} alt="" />
              <span><b>{item.name}</b><small>Size {size} · {item.price}</small></span>
            </span>
            <p>{wa ? "Yes, the medium is in stock. Want me to put it in a cart for you?" : `It is, in every size. Want me to put a ${size} in a cart for you?`}</p>
          </>
        )}
        {msg("me", S.yes, <p>{wa ? "Yes please!" : `Yes, ${size} please`}</p>)}
        {ms >= S.typing2 && ms < S.link ? <div className={cx(r.cm, r.cmStore, wa ? r.waTheme : r.igTheme)}><span className={r.waTyping}><i /><i /><i /></span></div> : null}
        {msg(
          "store",
          S.link,
          <>
            <p>Done. Your cart is ready:</p>
            <span ref={linkRef} className={cx(r.linkCard, ms >= S.clickLink && ms < S.checkout + 300 && r.linkPress)}>
              <img src={item.img} alt="" />
              <span><b>Checkout · 1 item · {item.price}</b><small>lucienvalliere.com</small></span>
            </span>
          </>
        )}
      </div>
      {wa ? <WaInputBar /> : <IgInputBar />}
      <Checkout open={ms >= S.checkout} lines={[{ ...item, name: `${item.name} · ${size}` }]} total={item.price} paying={ms >= S.clickPay} pressed={ms >= S.clickPay && ms < S.clickPay + 200} payRef={payRef} />
      <Confirmed on={ms >= S.done} order={wa ? "#1045" : "#1046"} total={item.price} how={wa ? "Sold on WhatsApp" : "Sold from a story reply"} />
      <Pointer pos={pos} ms={ms} clicks={[S.clickLink, S.clickPay]} hidden={ms >= S.done} />
    </div>
  );
}

/* ═════════════════════════ Instagram comments ═════════════════════════ */

type Comment = { at: number; user: string; text: string; outcome: "reply" | "spam" | "abusive"; reply?: string };
const COMMENTS: Comment[] = [
  { at: 600, user: "maya.k", text: "Love this! What's the price? 😍", outcome: "reply", reply: "It's $148, in every size. We've sent you the link in DMs." },
  { at: 2600, user: "gr0wth.boost", text: "Get 10k followers fast 👉 check my bio", outcome: "spam" },
  { at: 4200, user: "anon.7731", text: "worst brand ever, total scam", outcome: "abusive" },
  { at: 5600, user: "sophie.ln", text: "Does it come in navy?", outcome: "reply", reply: "It does, XS to XL. Link's in your DMs." },
];
const ACT = 900;

/** Comments on a post, moderated as they arrive: questions get an automatic reply, spam and abuse are hidden. */
export function CommentModerationDemo() {
  const { ref, ms } = useScene(5600 + ACT + 800, { fromStart: true });
  return (
    <div ref={ref} className={cx(r.frame, r.frameIg)} role="img" aria-label="Comments on an Instagram post: questions get an automatic reply, spam and abusive comments are hidden">
      <div className={r.igHead}>
        <span className={r.igAvatar}>LV</span>
        <span className={r.igHeadText}><b>lucienvalliere</b><small>Original audio</small></span>
        <MoreVertical aria-hidden="true" />
      </div>
      <img src={JACKET.img} alt="" className={r.post} />
      <div className={r.postBar}>
        <Heart aria-hidden="true" />
        <span><b>lucienvalliere</b> The Pop Pink zip-up is back.</span>
      </div>
      <div className={r.commentsHead}>
        <span>Comments</span>
        <span className={r.moderating}><img src="/images/site/mark-ring.webp" alt="" /> Aurevia is moderating</span>
      </div>
      <ul className={r.comments}>
        {COMMENTS.map((c) => {
          const shown = ms >= c.at;
          const acted = ms >= c.at + ACT;
          const hidden = acted && c.outcome !== "reply";
          return (
            <li key={c.user} className={cx(r.arrive, shown && r.arriveOn)}>
              <div>
                {hidden ? (
                  <div className={r.hiddenComment}>
                    <EyeOff aria-hidden="true" /> Hidden: {c.outcome === "spam" ? "spam" : "abusive"} comment from {c.user}
                  </div>
                ) : (
                  <div className={r.comment}>
                    <span className={r.cAvatar}>{c.user[0].toUpperCase()}</span>
                    <span className={r.cText}><b>{c.user}</b> {c.text}</span>
                  </div>
                )}
                {c.reply ? (
                  <div className={cx(r.arrive, acted && r.arriveOn)}>
                    <div>
                      <div className={cx(r.comment, r.commentReply)}>
                        <span className={cx(r.cAvatar, r.cAvatarStore)}>LV</span>
                        <span className={r.cText}><b>lucienvalliere</b> {c.reply} <span className={r.autoTag}>Auto-reply</span></span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ═════════════════════════ Email: a question answered in the thread ═════════════════════════ */

/** The shopper replies to the recovery email with a question; the agent answers in the same Gmail thread with the
    cart still one click away. */
export function EmailReplyDemo() {
  const { ref, ms } = useScene(4200, { fromStart: true });
  const at = (t: number) => ms >= t;
  return (
    <div ref={ref} className={cx(r.frame, r.gmail)} role="img" aria-label="A shopper replies to a cart email with a sizing question and the agent answers in the same Gmail thread, with a link back to the cart">
      <div className={r.gmBar}>
        <ArrowLeft aria-hidden="true" />
        <span className={r.gmBarIcons}><Archive aria-hidden="true" /><Trash2 aria-hidden="true" /><Mail aria-hidden="true" /><MoreVertical aria-hidden="true" /></span>
      </div>
      <div className={r.gmThreadSubject}>Still thinking it over, Camille? <span className={r.gmChip}>Inbox</span></div>
      <div className={r.thread}>
        <div className={r.collapsed}>
          <span className={r.gmAvatar} style={{ background: "#17201e" }}>L</span>
          <span className={r.gmMain}>
            <span className={r.gmLine}><b>Lucien Vallière</b><span className={r.gmTime}>Mon</span></span>
            <span className={r.gmSnippet}>Just wanted to check in. You&rsquo;ve got the Silk Draped Blouse…</span>
          </span>
        </div>
        <div className={cx(r.arrive, at(600) && r.arriveOn)}>
          <div>
            <div className={r.message}>
              <div className={r.gmSender}>
                <span className={r.gmAvatar} style={{ background: "#0b8043" }}>C</span>
                <span className={r.gmMain}>
                  <span className={r.gmLine}><b>Camille Martin</b><span className={r.gmTime}>10:14</span></span>
                  <span className={r.gmTo}>to Lucien <ChevronDown aria-hidden="true" /></span>
                </span>
                <span />
              </div>
              <p className={r.messageText}>Do the patent boots run small? I&rsquo;m usually a 38.</p>
            </div>
          </div>
        </div>
        <div className={cx(r.arrive, at(2000) && r.arriveOn)}>
          <div>
            <div className={r.message}>
              <div className={r.gmSender}>
                <span className={r.gmAvatar} style={{ background: "#17201e" }}>L</span>
                <span className={r.gmMain}>
                  <span className={r.gmLine}><b>Lucien Vallière</b><span className={r.gmTime}>10:15</span></span>
                  <span className={r.gmTo}>to me <ChevronDown aria-hidden="true" /></span>
                </span>
                <span className={r.answered}><img src="/images/site/mark-ring.webp" alt="" /> Aurevia</span>
              </div>
              <p className={r.messageText}>
                Hi Camille, they run true to size, so a 38 is right. Your cart is saved with the boots in a 38, ready
                when you are.
              </p>
              <span className={cx(r.mailBtn, r.threadBtn, at(3000) && r.threadBtnOn)}>Return to your cart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════ Email: a question answered, then the sale ═════════════════════════ */

export const M = { ask: 600, answer: 2000, btn: 3000, toBtn: 3700, clickBtn: 4400, checkout: 4600, toPay: 5400, clickPay: 6100, done: 6700 };
const BOOTS: Line = { name: "Patent Leather Ankle Boots · 38", price: "$970.00", img: "/images/demo/lv/patent-boots.webp" };

/** The shopper emails a sizing question; the agent answers in the same Gmail thread with the cart one tap away, and
    the shopper goes straight to checkout and pays. */
export function EmailSaleDemo({ onMs }: { onMs?: (ms: number) => void } = {}) {
  const { ref, ms } = useScene(M.done + 200, { fromStart: true });
  useReportMs(ms, onMs);
  const at = (t: number) => ms >= t;
  const btnRef = useRef<HTMLSpanElement>(null);
  const payRef = useRef<HTMLSpanElement>(null);
  const step = ms < M.toBtn ? "rest" : ms < M.toPay ? "btn" : "pay";
  const pos = usePointer(ref, step, () => (step === "btn" ? btnRef.current : step === "pay" ? payRef.current : null));
  return (
    <div ref={ref} className={cx(r.frame, r.gmail)} role="img" aria-label="A shopper emails a sizing question, the agent answers in the Gmail thread with a link to the cart, and the shopper pays at checkout">
      <div className={r.gmBar}>
        <ArrowLeft aria-hidden="true" />
        <span className={r.gmBarIcons}><Archive aria-hidden="true" /><Trash2 aria-hidden="true" /><Mail aria-hidden="true" /><MoreVertical aria-hidden="true" /></span>
      </div>
      <div className={r.gmThreadSubject}>Patent ankle boots, sizing <span className={r.gmChip}>Inbox</span></div>
      <div className={r.thread}>
        <div className={cx(r.arrive, at(M.ask) && r.arriveOn)}>
          <div>
            <div className={r.message}>
              <div className={r.gmSender}>
                <span className={r.gmAvatar} style={{ background: "#0b8043" }}>C</span>
                <span className={r.gmMain}>
                  <span className={r.gmLine}><b>Camille Martin</b><span className={r.gmTime}>10:14</span></span>
                  <span className={r.gmTo}>to Lucien <ChevronDown aria-hidden="true" /></span>
                </span>
                <span />
              </div>
              <p className={r.messageText}>Hi! Do the patent ankle boots run small? I&rsquo;m usually a 38.</p>
            </div>
          </div>
        </div>
        <div className={cx(r.arrive, at(M.answer) && r.arriveOn)}>
          <div>
            <div className={r.message}>
              <div className={r.gmSender}>
                <span className={r.gmAvatar} style={{ background: "#17201e" }}>L</span>
                <span className={r.gmMain}>
                  <span className={r.gmLine}><b>Lucien Vallière</b><span className={r.gmTime}>10:15</span></span>
                  <span className={r.gmTo}>to me <ChevronDown aria-hidden="true" /></span>
                </span>
                <span className={r.answered}><img src="/images/site/mark-ring.webp" alt="" /> Aurevia</span>
              </div>
              <p className={r.messageText}>
                Hi Camille, they run true to size, so a 38 is right. I&rsquo;ve put a pair in your cart, ready when you are.
              </p>
              <span ref={btnRef} className={cx(r.mailBtn, r.threadBtn, at(M.btn) && r.threadBtnOn, at(M.clickBtn) && !at(M.checkout + 200) && r.press)}>Check out · {BOOTS.price}</span>
            </div>
          </div>
        </div>
      </div>
      <Checkout open={at(M.checkout)} lines={[BOOTS]} total={BOOTS.price} paying={at(M.clickPay)} pressed={at(M.clickPay) && !at(M.clickPay + 200)} payRef={payRef} />
      <Confirmed on={at(M.done)} order="#1048" total={BOOTS.price} how="Sold over email" />
      <Pointer pos={pos} ms={ms} clicks={[M.clickBtn, M.clickPay]} hidden={!at(M.toBtn) || at(M.done)} />
    </div>
  );
}
