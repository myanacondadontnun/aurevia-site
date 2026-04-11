"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageSquare, Headphones, ChevronLeft, ChevronRight, ShoppingBag, Check } from "lucide-react";

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

const IMG_DUFFEL_BLACK = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient>
    <linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a3f42"/><stop offset="100%" stop-color="#1e2224"/></linearGradient>
  </defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <path d="M108 88 Q140 60 172 88" stroke="#4a4f52" stroke-width="5" fill="none" stroke-linecap="round"/>
  <rect x="60" y="100" width="160" height="95" rx="24" fill="url(#d)"/>
  <rect x="60" y="102" width="160" height="14" rx="7" fill="#4a5054"/>
  <line x1="78" y1="138" x2="202" y2="138" stroke="#4a5054" stroke-width="1.5"/>
  <rect x="98" y="148" width="84" height="36" rx="8" fill="#32383b" stroke="#4a5054" stroke-width="1"/>
  <circle cx="140" cy="138" r="3.5" fill="#6c7378"/>
  <rect x="62" y="195" width="156" height="6" rx="3" fill="rgba(0,0,0,0.08)"/>
</svg>`);

const IMG_TOWEL = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient>
    <linearGradient id="t" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stop-color="#c4e8df"/><stop offset="100%" stop-color="#7ec8b8"/></linearGradient>
  </defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <rect x="65" y="82" width="150" height="32" rx="6" fill="url(#t)"/>
  <rect x="65" y="114" width="150" height="28" rx="0" fill="#9ed6c8"/>
  <rect x="65" y="142" width="150" height="24" rx="0" fill="#b4dfd5"/>
  <rect x="65" y="166" width="150" height="20" rx="0" fill="#c4e8df"/>
  <path d="M65 186 L65 194 Q140 210 215 194 L215 186 Z" fill="#d0ede5"/>
  <line x1="65" y1="96" x2="215" y2="96" stroke="#a2d4c8" stroke-width="1"/>
  <line x1="65" y1="128" x2="215" y2="128" stroke="#8bcabc" stroke-width="1"/>
  <rect x="62" y="200" width="156" height="5" rx="2.5" fill="rgba(0,0,0,0.06)"/>
</svg>`);

const IMG_DUFFEL_OLIVE = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280">
  <defs>
    <linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#eef1f0"/><stop offset="100%" stop-color="#dde2e0"/></linearGradient>
    <linearGradient id="o" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#5a6340"/><stop offset="100%" stop-color="#3d4430"/></linearGradient>
  </defs>
  <rect width="280" height="280" fill="url(#b)"/>
  <path d="M108 88 Q140 60 172 88" stroke="#6b7550" stroke-width="5" fill="none" stroke-linecap="round"/>
  <rect x="60" y="100" width="160" height="95" rx="24" fill="url(#o)"/>
  <rect x="60" y="102" width="160" height="14" rx="7" fill="#6b7550"/>
  <line x1="78" y1="138" x2="202" y2="138" stroke="#6b7550" stroke-width="1.5"/>
  <rect x="98" y="148" width="84" height="36" rx="8" fill="#4c5438" stroke="#6b7550" stroke-width="1"/>
  <circle cx="140" cy="138" r="3.5" fill="#8a956e"/>
  <rect x="62" y="195" width="156" height="6" rx="3" fill="rgba(0,0,0,0.08)"/>
</svg>`);

const salesConversation: Message[] = [
  {
    sender: "aurevia",
    text: "Hey Jenny 👋 What are you feeling today? Something practical, something fun, or a bit of both?",
    delay: 550,
    typingDuration: 1000,
  },
  {
    sender: "customer",
    text: "Heyy. Need a gym bag. Mine's falling apart 😭\nBut I don't want something bulky.",
    delay: 2200,
    typingDuration: 1100,
  },
  {
    sender: "aurevia",
    text: "Got it. Compact but still fits everything.\nDo you carry shoes inside or separately?",
    delay: 1300,
    typingDuration: 900,
  },
  {
    sender: "customer",
    text: "Inside. That's the problem. My bag ends up smelling lol.\nDoes yours have proper ventilation or is it just \"marketing ventilation\"?",
    delay: 2400,
    typingDuration: 1300,
  },
  {
    sender: "aurevia",
    text: "Fair question. Ours has a separate zip shoe compartment with mesh airflow panels.\n\nIt's physically separated from the main section, so sweat doesn't transfer.\n\nIt's also water-resistant inside, so you can wipe it down.",
    delay: 1000,
    typingDuration: 1450,
  },
  {
    sender: "customer",
    text: "Okay that sounds decent.\nWill it actually fit trainers + change of clothes + bottle?",
    delay: 2800,
    typingDuration: 1000,
  },
  {
    sender: "aurevia",
    text: "Yes. It fits:\n• 1 pair trainers (up to UK 10)\n• Full change of clothes\n• 1L bottle\n• Small toiletry pouch\n\nIf you pack light, you'll still have room left.\n\nHow many gym days a week?",
    delay: 900,
    typingDuration: 1300,
  },
  {
    sender: "customer",
    text: "Like 4-5 😅",
    delay: 2600,
    typingDuration: 550,
  },
  {
    sender: "aurevia",
    text: "Then I'd suggest:\n• 1 × Core Gym Duffel (for daily use)\n• Optional: 1 × Quick-dry towel add-on\n\nFrequent users usually grab two so one can air out. But one is fine to start.\n\nWant me to add the Core Duffel in black to your cart?",
    delay: 900,
    typingDuration: 1650,
    products: [
      {
        id: "core-black",
        name: "Core Gym Duffel",
        price: "£58.00",
        image: IMG_DUFFEL_BLACK,
        variants: ["Black", "Slate", "Olive"],
        primaryPick: true,
      },
      {
        id: "towel",
        name: "Quick-dry Towel",
        price: "£12.00",
        image: IMG_TOWEL,
        variants: ["Small", "Large"],
      },
      {
        id: "core-olive",
        name: "Core Gym Duffel",
        price: "£58.00",
        image: IMG_DUFFEL_OLIVE,
        variants: ["Olive", "Black", "Slate"],
      },
    ],
  },
  {
    sender: "customer",
    text: "Yeah add the black one.",
    delay: 2800,
    typingDuration: 500,
  },
  {
    sender: "aurevia",
    text: "Done ✔️ Black Core Duffel is in your cart.\n\nYou can still switch colours before checkout.",
    delay: 700,
    typingDuration: 900,
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
    text: "Alright, I can see your order was placed on the 22nd and dispatched on the 24th via Royal Mail Tracked 48.\n\nTracking shows it's currently at the regional sorting centre and in transit. Estimated delivery is within 1–2 working days.\n\nWould you like the tracking link resent to your email?",
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
    text: "If it hasn't been delivered by end of day tomorrow, we'll open a courier investigation immediately.\n\nIf Royal Mail confirms it's delayed or lost, we can either:\n\n1. Send a replacement with priority shipping\n2. Issue a full refund\n\nYou won't be left waiting without resolution.",
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
              <img src={p.image} alt="" className="chat-demo-product-img" loading="lazy" />
            </div>
            <div className="chat-demo-product-body">
              <h4 className="chat-demo-product-name">{p.name}</h4>
              <p className="chat-demo-product-price">{p.price}</p>
              <label className="chat-demo-product-select-wrap">
                <span className="sr-only">Variant</span>
                <select className="chat-demo-product-select" disabled defaultValue={p.variants?.[0] ?? "Default"}>
                  {(p.variants ?? ["One size"]).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
              <div className="chat-demo-qty-row">
                <span className="chat-demo-qty-label">Qty:</span>
                <div className="chat-demo-qty-stepper" aria-hidden>
                  <span>−</span>
                  <span>1</span>
                  <span>+</span>
                </div>
              </div>
              <button type="button" className={`chat-demo-add-cart ${p.primaryPick ? "chat-demo-add-cart-primary" : ""}`}>
                Add to Cart
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
        <p className="chat-demo-support-strong">Royal Mail Tracked 48</p>
        <p className="chat-demo-support-muted">Regional sorting centre · In transit</p>
        <div className="chat-demo-support-track-visual" aria-hidden>
          <div className="chat-demo-support-track-fill" />
        </div>
        <p className="chat-demo-support-eta">Est. delivery 1–2 working days</p>
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
    }, 1400);
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
          return (
            <div key={msgIndex} className="chat-demo-msg-block">
              <div
                className={`chat-demo-bubble ${msg.sender === "aurevia" ? "chat-demo-left" : "chat-demo-right"} chat-demo-pop`}
              >
                {msg.text.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.text.split("\n").length - 1 && <br />}
                  </span>
                ))}
              </div>
              {msg.products && msg.products.length > 0 && <ProductCarousel products={msg.products} />}
              {msg.supportWidget === "order-lookup" && <SupportOrderCard />}
              {msg.supportWidget === "tracking" && <SupportTrackingCard />}
            </div>
          );
        })}

        {typingFrom === "aurevia" && (
          <div className="chat-demo-bubble chat-demo-left chat-demo-typing-bubble">
            <span className="chat-demo-dot" />
            <span className="chat-demo-dot" />
            <span className="chat-demo-dot" />
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

      {mode === "sales" && (cartPhase === "adding" || cartPhase === "bar" || cartPhase === "checkout") && (
        <div className={`chat-demo-cart-dock ${cartPhase !== "adding" ? "chat-demo-cart-dock-visible" : ""}`}>
          <div className="chat-demo-cart-fly" aria-hidden={cartPhase !== "adding"}>
            <span className="chat-demo-cart-fly-dot" />
          </div>
          <div className={`chat-demo-cart-bar ${cartPhase === "bar" || cartPhase === "checkout" ? "chat-demo-cart-bar-in" : ""}`}>
            <div className="chat-demo-cart-bar-icon">
              {cartPhase === "checkout" ? <Check className="w-4 h-4 text-[#063028]" strokeWidth={3} /> : <ShoppingBag className="w-4 h-4 text-[#063028]" />}
            </div>
            <div className="chat-demo-cart-bar-text">
              <span className="chat-demo-cart-bar-title">Black Core Duffel</span>
              <span className="chat-demo-cart-bar-sub">Added to cart</span>
            </div>
          </div>
          {cartPhase === "checkout" && (
            <div className="chat-demo-checkout-row chat-demo-checkout-reveal">
              <span className="chat-demo-checkout-link">🔗 Your checkout link</span>
            </div>
          )}
        </div>
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

      <div className="chat-demo-container">
        <div className="chat-demo-header">
          <div className="chat-demo-avatar">
            <img src="/images/Logo_wo_bg.png" alt="Aurevia" className="w-full h-full object-contain" />
          </div>
          <div className="chat-demo-header-text">
            <div className="chat-demo-name">{activeMode === "sales" ? "Sales Agent" : "Support Agent"}</div>
            <div className="chat-demo-status">
              <span className="chat-demo-status-dot" />
              Online
            </div>
          </div>
        </div>

        {activeMode === "sales" ? (
          <ChatPanel key="sales" mode="sales" conversation={salesConversation} />
        ) : (
          <ChatPanel key="support" mode="support" conversation={supportConversation} />
        )}
      </div>
    </div>
  );
}
