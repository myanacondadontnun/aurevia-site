"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Headphones } from "lucide-react";

interface Message {
  sender: "aurevia" | "customer";
  text: string;
  delay: number;
  typingDuration: number;
}

const salesConversation: Message[] = [
  {
    sender: "aurevia",
    text: "Hey Jenny 👋 What are you feeling today? Something practical, something fun, or a bit of both?",
    delay: 800,
    typingDuration: 1400,
  },
  {
    sender: "customer",
    text: "Heyy. Need a gym bag. Mine's falling apart 😭\nBut I don't want something bulky.",
    delay: 3000,
    typingDuration: 0,
  },
  {
    sender: "aurevia",
    text: "Got it. Compact but still fits everything.\nDo you carry shoes inside or separately?",
    delay: 1800,
    typingDuration: 1200,
  },
  {
    sender: "customer",
    text: "Inside. That's the problem. My bag ends up smelling lol.\nDoes yours have proper ventilation or is it just \"marketing ventilation\"?",
    delay: 3200,
    typingDuration: 0,
  },
  {
    sender: "aurevia",
    text: "Fair question. Ours has a separate zip shoe compartment with mesh airflow panels.\n\nIt's physically separated from the main section, so sweat doesn't transfer.\n\nIt's also water-resistant inside, so you can wipe it down.",
    delay: 1400,
    typingDuration: 2000,
  },
  {
    sender: "customer",
    text: "Okay that sounds decent.\nWill it actually fit trainers + change of clothes + bottle?",
    delay: 4000,
    typingDuration: 0,
  },
  {
    sender: "aurevia",
    text: "Yes. It fits:\n• 1 pair trainers (up to UK 10)\n• Full change of clothes\n• 1L bottle\n• Small toiletry pouch\n\nIf you pack light, you'll still have room left.\n\nHow many gym days a week?",
    delay: 1200,
    typingDuration: 1800,
  },
  {
    sender: "customer",
    text: "Like 4-5 😅",
    delay: 3800,
    typingDuration: 0,
  },
  {
    sender: "aurevia",
    text: "Then I'd suggest:\n• 1 × Core Gym Duffel (for daily use)\n• Optional: 1 × Quick-dry towel add-on\n\nFrequent users usually grab two so one can air out. But one is fine to start.\n\nWant me to add the Core Duffel in black to your cart?",
    delay: 1200,
    typingDuration: 2200,
  },
  {
    sender: "customer",
    text: "Yeah add the black one.",
    delay: 4000,
    typingDuration: 0,
  },
  {
    sender: "aurevia",
    text: "Done ✔️ Black Core Duffel is in your cart.\n\nYou can still switch colours before checkout.",
    delay: 1000,
    typingDuration: 1200,
  },
];

const supportConversation: Message[] = [
  {
    sender: "aurevia",
    text: "Hi David. How can I help you today?",
    delay: 800,
    typingDuration: 1200,
  },
  {
    sender: "customer",
    text: "Hey. I placed an order 5 days ago and haven't had a shipping update. Order #48291.",
    delay: 2800,
    typingDuration: 0,
  },
  {
    sender: "aurevia",
    text: "Thanks for sharing the order number.\nGive me a moment while I check that for you.",
    delay: 1400,
    typingDuration: 1400,
  },
  {
    sender: "aurevia",
    text: "Alright, I can see your order was placed on the 22nd and dispatched on the 24th via Royal Mail Tracked 48.\n\nTracking shows it's currently at the regional sorting centre and in transit. Estimated delivery is within 1–2 working days.\n\nWould you like the tracking link resent to your email?",
    delay: 2800,
    typingDuration: 2000,
  },
  {
    sender: "customer",
    text: "Yeah I never got that email.",
    delay: 3500,
    typingDuration: 0,
  },
  {
    sender: "aurevia",
    text: "Understood. I've just resent the tracking confirmation to the email ending in @gmail.com.\n\nPlease check your inbox and spam folder as well.\n\nIf it hasn't arrived in 10 minutes, let me know and I'll escalate it.",
    delay: 1200,
    typingDuration: 1800,
  },
  {
    sender: "customer",
    text: "Got it now. Thanks.\nIf it doesn't arrive by tomorrow what happens?",
    delay: 3800,
    typingDuration: 0,
  },
  {
    sender: "aurevia",
    text: "If it hasn't been delivered by end of day tomorrow, we'll open a courier investigation immediately.\n\nIf Royal Mail confirms it's delayed or lost, we can either:\n\n1. Send a replacement with priority shipping\n2. Issue a full refund\n\nYou won't be left waiting without resolution.",
    delay: 1400,
    typingDuration: 2200,
  },
  {
    sender: "customer",
    text: "Okay that's fair. Appreciate it.",
    delay: 4200,
    typingDuration: 0,
  },
  {
    sender: "aurevia",
    text: "You're welcome. I'll keep the order monitored on our side as well.\n\nIf anything changes, we'll notify you proactively.",
    delay: 1200,
    typingDuration: 1400,
  },
];

type ChatMode = "sales" | "support";

function ChatPanel({ conversation }: { conversation: Message[] }) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [cycle, setCycle] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleMessages([]);
    setIsTyping(false);

    if (conversation.length === 0) return;

    let elapsed = 0;

    conversation.forEach((msg, index) => {
      elapsed += msg.delay;

      if (msg.sender === "aurevia" && msg.typingDuration > 0) {
        const typingStart = elapsed;
        const typingEnd = elapsed + msg.typingDuration;
        elapsed = typingEnd;

        const t1 = setTimeout(() => setIsTyping(true), typingStart);
        const t2 = setTimeout(() => {
          setIsTyping(false);
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

    const totalDuration = elapsed + 5000;
    const loopTimeout = setTimeout(() => {
      setCycle((c) => c + 1);
    }, totalDuration);
    timeoutsRef.current.push(loopTimeout);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [cycle, conversation]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  return (
    <div className="chat-demo-messages" ref={scrollRef}>
      {visibleMessages.map((msgIndex) => {
        const msg = conversation[msgIndex];
        return (
          <div
            key={msgIndex}
            className={`chat-demo-bubble ${msg.sender === "aurevia" ? "chat-demo-left" : "chat-demo-right"} chat-demo-pop`}
          >
            {msg.text.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < msg.text.split("\n").length - 1 && <br />}
              </span>
            ))}
          </div>
        );
      })}

      {isTyping && (
        <div className="chat-demo-bubble chat-demo-left chat-demo-typing-bubble">
          <span className="chat-demo-dot" />
          <span className="chat-demo-dot" />
          <span className="chat-demo-dot" />
        </div>
      )}
    </div>
  );
}

export default function ChatDemo() {
  const [activeMode, setActiveMode] = useState<ChatMode>("sales");

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Mode selector */}
      <div className="chat-demo-switcher">
        <button
          onClick={() => setActiveMode("sales")}
          className={`chat-demo-switch-btn ${activeMode === "sales" ? "chat-demo-switch-active" : ""}`}
        >
          <MessageSquare className="w-4 h-4" />
          Sales Agent
        </button>
        <button
          onClick={() => setActiveMode("support")}
          className={`chat-demo-switch-btn ${activeMode === "support" ? "chat-demo-switch-active" : ""}`}
        >
          <Headphones className="w-4 h-4" />
          Support Agent
        </button>
      </div>

      {/* Chat container */}
      <div className="chat-demo-container">
        {/* Header */}
        <div className="chat-demo-header">
          <div className="chat-demo-avatar">
            <img
              src="/images/Logo_wo_bg.png"
              alt="Aurevia"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="chat-demo-name">
              {activeMode === "sales" ? "Sales Agent" : "Support Agent"}
            </div>
            <div className="chat-demo-status">
              <span className="chat-demo-status-dot" />
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        {activeMode === "sales" ? (
          <ChatPanel key="sales" conversation={salesConversation} />
        ) : (
          <ChatPanel key="support" conversation={supportConversation} />
        )}
      </div>
    </div>
  );
}
