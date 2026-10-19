import type { ReactNode } from "react";
import s from "./widget.module.css";

/** Building blocks that reproduce the real storefront widget's default look for the home page demos. */

export function Mark({ large = false }: { large?: boolean }) {
  return (
    <span className={`${s.mark} ${large ? s.markLg : ""}`} aria-hidden="true">
      <img src="/images/site/mark-ring.webp" alt="" />
    </span>
  );
}

function Feedback() {
  return (
    <span className={s.feedback} aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 7v6H3V7h2zm0 0l3-5c1 0 1.6.7 1.4 1.6L9 6h3.6c.8 0 1.4.8 1.2 1.6l-1.1 4.2c-.2.7-.8 1.2-1.5 1.2H5" /></svg>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 9V3H3v6h2zm0 0l3 5c1 0 1.6-.7 1.4-1.6L9 10h3.6c.8 0 1.4-.8 1.2-1.6l-1.1-4.2C12.5 3.5 11.9 3 11.2 3H5" /></svg>
    </span>
  );
}

export function Bot({ children, feedback = true, className = "" }: { children: ReactNode; feedback?: boolean; className?: string }) {
  return (
    <div className={`${s.botRow} ${className}`}>
      <Mark />
      <div className={s.botCol}>
        <div className={s.bot}>{children}</div>
        {feedback && <Feedback />}
      </div>
    </div>
  );
}

export function User({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`${s.user} ${className}`}>{children}</div>;
}

export function Agent({ initials, children }: { initials: string; children: ReactNode }) {
  return (
    <div className={s.agentRow}>
      <span className={s.agentAvatar} aria-hidden="true">{initials}</span>
      <div className={s.agent}>{children}</div>
    </div>
  );
}

export function Divider({ children }: { children: ReactNode }) {
  return <div className={s.divider}>{children}</div>;
}

export type CardProduct = { title: string; price: string; image: string | null; badge?: string; cta?: string; ctaState?: "pressed" | "busy" };

export function Cards({
  products,
  eager = false,
  glass = false,
  fill = false,
}: {
  products: CardProduct[];
  eager?: boolean;
  glass?: boolean;
  /** Cards share the row's full width instead of stopping at 150px each. */
  fill?: boolean;
}) {
  return (
    <div className={`${s.cards} ${fill ? s.cardsFill : ""}`}>
      {products.map((p) => (
        <div key={p.title} className={`${s.card} ${glass ? s.cardGlass : ""}`}>
          <div className={s.cardImgWrap}>
            {p.badge && <span className={s.cartBadge}>{p.badge}</span>}
            {p.image ? (
              <img className={s.cardImg} src={p.image} alt={p.title} loading={eager ? "eager" : "lazy"} />
            ) : (
              <span className={`${s.cardImg} ${s.placeholder}`} aria-hidden="true" />
            )}
          </div>
          <div className={s.cardBody}>
            <span className={s.cardTitle}>{p.title}</span>
            <span className={s.cardPrice}>{p.price}</span>
            <span className={`${s.cardCta} ${p.ctaState === "pressed" ? s.cardCtaPressed : ""} ${p.ctaState === "busy" ? s.cardCtaBusy : ""}`}>
              {p.cta ?? "Add to cart"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Compare({ a, b, rows }: { a: string; b: string; rows: [string, string, string][] }) {
  return (
    <div className={s.panel}>
      <div className={s.compareRow}><span /><span>{a}</span><span>{b}</span></div>
      {rows.map(([label, x, y]) => (
        <div key={label} className={s.compareRow}><span>{label}</span><span>{x}</span><span>{y}</span></div>
      ))}
    </div>
  );
}

export function Tracking({ order, status, carrier, eta, step }: { order: string; status: string; carrier: string; eta: string; step: number }) {
  return (
    <div className={`${s.panel} ${s.track}`}>
      <div className={s.trackTop}><span>{order}</span><span>{status}</span></div>
      <div className={s.trackSteps}>
        {[0, 1, 2, 3].map((i) => <i key={i} className={i < step ? s.on : ""} />)}
      </div>
      <div className={s.trackMeta}><span>{carrier}</span><span>{eta}</span></div>
    </div>
  );
}

/** The "1 item in cart · VIEW CART" strip the widget docks between the messages and the input once
    something is in the cart (widget.js .aurevia-cart-sticky-bar). Not a message: it sits on the input. */
export function CartBar({ count }: { count: number }) {
  return (
    <div className={s.cartBar} aria-hidden="true">
      <div className={s.cartBarInner}>
        <span className={s.cartBarSummary}>{count === 1 ? "1 item in cart" : `${count} items in cart`}</span>
        <span className={s.cartBarView}>VIEW CART</span>
      </div>
    </div>
  );
}

export function InputPill({ placeholder = "Shop with AI…" }: { placeholder?: string }) {
  // Same icons as the widget: its image-upload glyph and its send.png, inverted to white.
  return (
    <div className={s.input} aria-hidden="true">
      <svg className={s.attach} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="1.5" />
        <path d="M3 16l5-5a2 2 0 0 1 2.8 0L21 20" />
      </svg>
      <span>{placeholder}</span>
      <span className={s.send}>
        <img src="/images/site/widget-send.png" alt="" />
      </span>
    </div>
  );
}

/** The full chat window: header, messages, input and the two footer lines. */
export function WidgetWindow({
  title = "Aurevia AI",
  subtitle,
  avatar,
  children,
  className = "",
  bodyClassName = "",
  footer = true,
  cartCount = 0,
}: {
  title?: string;
  subtitle?: string;
  avatar?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  /** The "AI can make mistakes" / "Powered by" lines under the input. */
  footer?: boolean;
  /** Items in the cart; above zero the cart strip docks on top of the input, as in the widget. */
  cartCount?: number;
}) {
  return (
    <div className={`${s.window} ${className}`}>
      <div className={s.header}>
        {avatar ?? <Mark large />}
        <div style={{ minWidth: 0 }}>
          <div className={s.title}>{title}</div>
          {subtitle && <span className={s.subtitle}>{subtitle}</span>}
        </div>
        <span className={s.headerIcons} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><rect x="2" y="2.5" width="12" height="9" rx="1.5" /><path d="M8 5v4M6 7h4M5 11.5L3.5 14" /></svg>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 4L4 8l4 4M12 4L8 8l4 4" /></svg>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3.5 8h9" /></svg>
        </span>
      </div>
      <div className={`${s.body} ${bodyClassName}`}>{children}</div>
      {cartCount > 0 && <CartBar count={cartCount} />}
      <div className={s.inputWrap}><InputPill /></div>
      {footer && (
        <div className={s.foot}>
          <span>AI can make mistakes. Check anything important.</span>
          <span className={s.powered}><img src="/images/aurevia-logo-mark.webp" alt="" />Powered by Aurevia.io</span>
        </div>
      )}
    </div>
  );
}

export const widgetStyles = s;
