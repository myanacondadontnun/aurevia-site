"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageSquare, Headphones, ChevronLeft, ChevronRight, SquarePen, ArrowUp, Image as ImageIcon } from "lucide-react";

export interface DemoProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  variants?: string[];
  /** Used for scripted “add to cart” highlight */
  primaryPick?: boolean;
}

interface Message {
  sender: "aurevia" | "customer";
  text: string;
  delay: number;
  typingDuration: number;
  /** Shown inline under this message when it appears (sales) */
  products?: DemoProduct[];
  /** Shown inline under this message when it appears (support) */
  supportWidget?: "order-lookup" | "tracking";
  /** When this assistant message is visible, play cart + checkout demo (sales) */
  triggerCheckoutDemo?: boolean;
}

const svg = (raw: string) =>
  `data:image/svg+xml,${encodeURIComponent(raw.replace(/\n\s*/g, ""))}`;

const salesConversation: Message[] = [
  {
    sender: "aurevia",
    text: "Hey Camille 👋 Shopping for yourself today, or hunting for a gift?",
    delay: 550,
    typingDuration: 1000,
  },
  {
    sender: "customer",
    text: "Me. Gallery opening on Friday.\nSharp, but I don't want to look like I'm going to a board meeting.",
    delay: 2200,
    typingDuration: 1200,
  },
  {
    sender: "aurevia",
    text: "Got it. Polished, not corporate.\nAre you thinking one statement piece, or a full look?",
    delay: 1300,
    typingDuration: 900,
  },
  {
    sender: "customer",
    text: "Full look ideally. And I run cold, galleries are always freezing.",
    delay: 2400,
    typingDuration: 1100,
  },
  {
    sender: "aurevia",
    text: "Then a layer that reads as elegant rather than warm.\n\nThe cashmere blazer does exactly that: satin lapel, cut close through the waist, and it's properly warm.\n\nUnder it, the silk draped blouse. Asymmetric hem, so it still shows when the blazer is open.",
    delay: 1000,
    typingDuration: 1500,
  },
  {
    sender: "customer",
    text: "Okay that sounds good. Shoes?",
    delay: 2600,
    typingDuration: 700,
  },
  {
    sender: "aurevia",
    text: "Patent ankle boots. Sculpted heel, mirror finish, and the height is an evening height without being a standing-for-three-hours problem.\n\nHere's the look:",
    delay: 900,
    typingDuration: 1400,
    products: [
      {
        id: "blazer",
        name: "Tailored Cashmere Blazer",
        price: "$1,590.00",
        image: "/images/demo/lv/cashmere-blazer.webp",
        variants: ["Noir", "Ivory"],
        primaryPick: true,
      },
      {
        id: "blouse",
        name: "Silk Draped Blouse",
        price: "$520.00",
        image: "/images/demo/lv/silk-blouse.webp",
        variants: ["Champagne", "Noir"],
      },
      {
        id: "boots",
        name: "Patent Ankle Boots",
        price: "$970.00",
        image: "/images/demo/lv/patent-boots.webp",
        variants: ["37", "38", "39", "40"],
      },
    ],
  },
  {
    sender: "customer",
    text: "Add the blouse in champagne.",
    delay: 2800,
    typingDuration: 600,
  },
  {
    sender: "aurevia",
    text: "Done ✔️ Silk Draped Blouse, champagne, is in your cart.\n\nYou're over $300, so shipping's on us. Want me to hold the blazer too?",
    delay: 700,
    typingDuration: 1000,
    triggerCheckoutDemo: true,
  },
];

const supportConversation: Message[] = [
  {
    sender: "aurevia",
    text: "Hi David. How can I help you today?",
    delay: 450,
    typingDuration: 650,
  },
  {
    sender: "customer",
    text: "Hey. I placed an order 5 days ago and haven't had a shipping update. Order #48291.",
    delay: 1300,
    typingDuration: 1100,
  },
  {
    sender: "aurevia",
    text: "Thanks for sharing the order number.\nGive me a moment while I check that for you.",
    delay: 750,
    typingDuration: 750,
    supportWidget: "order-lookup",
  },
  {
    sender: "aurevia",
    text: "Alright, I can see your order was placed on the 22nd and dispatched on the 24th via UPS Ground.\n\nTracking shows it's currently at the regional sorting centre and in transit. Estimated delivery is within 1–2 working days.\n\nWould you like the tracking link resent to your email?",
    delay: 1300,
    typingDuration: 1050,
    supportWidget: "tracking",
  },
  {
    sender: "customer",
    text: "Yeah I never got that email.",
    delay: 1600,
    typingDuration: 550,
  },
  {
    sender: "aurevia",
    text: "Understood. I've just resent the tracking confirmation to the email ending in @gmail.com.\n\nPlease check your inbox and spam folder as well.\n\nIf it hasn't arrived in 10 minutes, let me know and I'll escalate it.",
    delay: 650,
    typingDuration: 900,
  },
  {
    sender: "customer",
    text: "Got it now. Thanks.\nIf it doesn't arrive by tomorrow what happens?",
    delay: 1700,
    typingDuration: 900,
  },
  {
    sender: "aurevia",
    text: "If it hasn't been delivered by end of day tomorrow, we'll open a courier investigation immediately.\n\nIf UPS confirms it's delayed or lost, we can either:\n\n1. Send a replacement with priority shipping\n2. Issue a full refund\n\nYou won't be left waiting without resolution.",
    delay: 650,
    typingDuration: 1050,
  },
  {
    sender: "customer",
    text: "Okay that's fair. Appreciate it.",
    delay: 1600,
    typingDuration: 600,
  },
  {
    sender: "aurevia",
    text: "You're welcome. I'll keep the order monitored on our side as well.\n\nIf anything changes, we'll notify you proactively.",
    delay: 600,
    typingDuration: 750,
  },
];

type ChatMode = "sales" | "support";
type TypingFrom = "none" | "aurevia" | "customer";

/* Aurevia mark, same as the real website widget: the spinning/breathing knot ring
   alone — no inner glyph. */
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

function ProductCarousel({ products }: { products: DemoProduct[] }) {
  const stripRef = useRef<HTMLDivElement>(null);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(280, el.clientWidth * 0.85), behavior: "smooth" });
  }, []);

  return (
    <div className="chat-demo-carousel-wrap chat-demo-pop">
      <button type="button" className="chat-demo-carousel-nav chat-demo-carousel-nav-left" aria-label="Previous products" onClick={() => scrollByDir(-1)}>
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
      </button>
      <div className="chat-demo-carousel-strip" ref={stripRef}>
        {products.map((p) => (
          <article key={p.id} className="chat-demo-product-card">
            <div className="chat-demo-product-img-wrap">
              <div className="chat-demo-product-img-frame">
                <img src={p.image} alt="" className="chat-demo-product-img" loading="lazy" />
              </div>
            </div>
            <div className="chat-demo-product-body">
              <h4 className="chat-demo-product-name">{p.name}</h4>
              <p className="chat-demo-product-price">{p.price}</p>
              <button type="button" className="chat-demo-product-cta">
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
      <button type="button" className="chat-demo-carousel-nav chat-demo-carousel-nav-right" aria-label="Next products" onClick={() => scrollByDir(1)}>
        <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}

function SupportOrderCard() {
  return (
    <div className="chat-demo-support-card chat-demo-pop">
      <div className="chat-demo-support-card-head">Order lookup</div>
      <div className="chat-demo-support-card-body">
        <p className="chat-demo-support-muted">Pulling details for</p>
        <p className="chat-demo-support-strong">#48291</p>
        <div className="chat-demo-support-progress">
          <span className="chat-demo-support-dot chat-demo-support-dot-active" />
          <span className="chat-demo-support-line" />
          <span className="chat-demo-support-dot" />
        </div>
      </div>
    </div>
  );
}

function SupportTrackingCard() {
  return (
    <div className="chat-demo-support-card chat-demo-pop">
      <div className="chat-demo-support-card-head">Shipment status</div>
      <div className="chat-demo-support-card-body">
        <p className="chat-demo-support-strong">UPS Ground</p>
        <p className="chat-demo-support-muted">Regional hub · In transit</p>
        <div className="chat-demo-support-track-visual" aria-hidden>
          <div className="chat-demo-support-track-fill" />
        </div>
        <p className="chat-demo-support-eta">Est. delivery 1–2 business days</p>
      </div>
    </div>
  );
}

function ChatPanel({
  conversation,
  mode,
}: {
  conversation: Message[];
  mode: ChatMode;
}) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [typingFrom, setTypingFrom] = useState<TypingFrom>("none");
  const [cycle, setCycle] = useState(0);
  const [cartPhase, setCartPhase] = useState<"idle" | "adding" | "bar" | "checkout">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleMessages([]);
    setTypingFrom("none");
    setCartPhase("idle");

    if (conversation.length === 0) return;

    let elapsed = 0;

    conversation.forEach((msg, index) => {
      elapsed += msg.delay;

      if (msg.typingDuration > 0) {
        const typingStart = elapsed;
        const typingEnd = elapsed + msg.typingDuration;
        elapsed = typingEnd;
        const side = msg.sender === "aurevia" ? "aurevia" : "customer";

        const t1 = setTimeout(() => setTypingFrom(side), typingStart);
        const t2 = setTimeout(() => {
          setTypingFrom("none");
          setVisibleMessages((prev) => [...prev, index]);
        }, typingEnd);
        timeoutsRef.current.push(t1, t2);
      } else {
        const showAt = elapsed;
        const t = setTimeout(() => {
          setVisibleMessages((prev) => [...prev, index]);
        }, showAt);
        timeoutsRef.current.push(t);
      }
    });

    const totalDuration = elapsed + 5200;
    const loopTimeout = setTimeout(() => {
      setCycle((c) => c + 1);
    }, totalDuration);
    timeoutsRef.current.push(loopTimeout);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [cycle, conversation]);

  const checkoutIdx = conversation.findIndex((m) => m.triggerCheckoutDemo);
  const checkoutVisible = checkoutIdx >= 0 && visibleMessages.includes(checkoutIdx);

  useEffect(() => {
    if (mode !== "sales") {
      setCartPhase("idle");
      return;
    }
    if (!checkoutVisible) {
      setCartPhase("idle");
      return;
    }

    let cancelled = false;
    setCartPhase("adding");
    const t1 = setTimeout(() => {
      if (!cancelled) setCartPhase("bar");
    }, 520);
    const t2 = setTimeout(() => {
      if (!cancelled) setCartPhase("checkout");
    }, 2100);
    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [checkoutVisible, mode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, typingFrom, cartPhase]);

  return (
    <>
      <div className="chat-demo-messages" ref={scrollRef}>
        {visibleMessages.map((msgIndex) => {
          const msg = conversation[msgIndex];
          const bubbleText = msg.text.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < msg.text.split("\n").length - 1 && <br />}
            </span>
          ));
          return (
            <div key={msgIndex} className="chat-demo-msg-block">
              {msg.sender === "aurevia" ? (
                <div className="chat-demo-bot-row">
                  <AureviaMark size={26} />
                  <div className="chat-demo-bubble chat-demo-left chat-demo-pop">{bubbleText}</div>
                </div>
              ) : (
                <div className="chat-demo-bubble chat-demo-right chat-demo-pop">{bubbleText}</div>
              )}
              {msg.products && msg.products.length > 0 && <ProductCarousel products={msg.products} />}
              {msg.supportWidget === "order-lookup" && <SupportOrderCard />}
              {msg.supportWidget === "tracking" && <SupportTrackingCard />}
            </div>
          );
        })}

        {typingFrom === "aurevia" && (
          <div className="chat-demo-bot-row">
            <AureviaMark size={26} />
            <div className="chat-demo-bubble chat-demo-left chat-demo-typing-bubble">
              <span className="chat-demo-dot" />
              <span className="chat-demo-dot" />
              <span className="chat-demo-dot" />
            </div>
          </div>
        )}
        {typingFrom === "customer" && (
          <div className="chat-demo-bubble chat-demo-right chat-demo-typing-bubble">
            <span className="chat-demo-dot chat-demo-dot-customer" />
            <span className="chat-demo-dot chat-demo-dot-customer" />
            <span className="chat-demo-dot chat-demo-dot-customer" />
          </div>
        )}
      </div>

      {mode === "sales" && (cartPhase === "bar" || cartPhase === "checkout") && (
        <div className="chat-demo-cart-sticky">
          <div className="chat-demo-cart-sticky-inner chat-demo-cart-bar-in">
            <span className="chat-demo-cart-summary">1 item · $520.00</span>
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

      {mode === "sales" && (
        <>
          <div className={`chat-demo-minicart-backdrop ${cartPhase === "checkout" ? "chat-demo-minicart-open" : ""}`} aria-hidden />
          <div className={`chat-demo-minicart ${cartPhase === "checkout" ? "chat-demo-minicart-open" : ""}`} aria-hidden={cartPhase !== "checkout"}>
            <div className="chat-demo-minicart-head">
              <span className="chat-demo-minicart-title">Your cart</span>
              <span className="chat-demo-minicart-close">×</span>
            </div>
            <div className="chat-demo-minicart-line">
              <div className="chat-demo-minicart-thumb">
                <img src="/images/demo/lv/silk-blouse.webp" alt="" />
              </div>
              <div className="chat-demo-minicart-main">
                <span className="chat-demo-minicart-item-title">Silk Draped Blouse</span>
                <span className="chat-demo-minicart-variant">Champagne</span>
                <div className="chat-demo-minicart-meta">
                  <span className="chat-demo-minicart-price">$520.00</span>
                  <span className="chat-demo-minicart-qty">
                    <span className="chat-demo-minicart-qty-btn">−</span>
                    <span className="chat-demo-minicart-qty-val">1</span>
                    <span className="chat-demo-minicart-qty-btn">+</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="chat-demo-minicart-footer">
              <div className="chat-demo-minicart-total">
                <span>Total</span>
                <strong>$520.00</strong>
              </div>
              <span className="chat-demo-minicart-checkout">Checkout</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function ChatDemo() {
  const [activeMode, setActiveMode] = useState<ChatMode>("sales");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="chat-demo-switcher">
        <button
          type="button"
          onClick={() => setActiveMode("sales")}
          className={`chat-demo-switch-btn ${activeMode === "sales" ? "chat-demo-switch-active" : ""}`}
        >
          <MessageSquare className="w-4 h-4" />
          Sales Agent
        </button>
        <button
          type="button"
          onClick={() => setActiveMode("support")}
          className={`chat-demo-switch-btn ${activeMode === "support" ? "chat-demo-switch-active" : ""}`}
        >
          <Headphones className="w-4 h-4" />
          Support Agent
        </button>
      </div>

      <div className="chat-demo-scale-wrap">
        <div className="chat-demo-container">
        <div className="chat-demo-header">
          <div className="chat-demo-avatar">
            <AureviaMark size={32} animate />
          </div>
          <div className="chat-demo-header-text">
            <div className="chat-demo-name font-fraunces">{activeMode === "sales" ? "Sales Agent" : "Support Agent"}</div>
            <div className="chat-demo-status">
              <span className="chat-demo-status-dot" />
              Online
            </div>
          </div>
          <button type="button" className="chat-demo-new-chat-btn" aria-label="Start new chat" tabIndex={-1}>
            <SquarePen className="w-[15px] h-[15px]" strokeWidth={2} />
          </button>
        </div>

        {activeMode === "sales" ? (
          <ChatPanel key="sales" mode="sales" conversation={salesConversation} />
        ) : (
          <ChatPanel key="support" mode="support" conversation={supportConversation} />
        )}
        </div>
      </div>
    </div>
  );
}
