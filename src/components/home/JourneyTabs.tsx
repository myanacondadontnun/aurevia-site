"use client";

import { useRef, useState, type ReactNode } from "react";
import { Check } from "lucide-react";
import { Agent, Bot, Compare, Divider, Tracking, User, WidgetWindow } from "./Widget";

type Scene = { id: string; label: string; title: string; body: string; points: string[]; demo: ReactNode };

function RecoveryEmail() {
  return (
    <div className="w-full max-w-[400px] overflow-hidden rounded-xl bg-white text-left shadow-[0_24px_48px_rgba(15,15,15,0.18),0_8px_16px_rgba(15,15,15,0.08)]">
      <div className="border-b border-border px-5 py-4 text-xs text-muted-foreground">
        <p className="text-sm font-semibold text-foreground">You left something at Lucien Vallière</p>
        <p className="mt-0.5">From Lucien Vallière</p>
      </div>
      <div className="grid gap-4 px-5 py-5 text-sm text-foreground">
        <p>Hi Camille, your silk blouse is still in your cart. We&rsquo;ve saved it for you.</p>
        <div className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 border-y border-border py-3">
          <img src="/images/demo/lv/silk-blouse.webp" alt="" className="h-14 w-14 rounded-lg object-cover" />
          <span>
            Silk Draped Blouse
            <small className="block text-xs text-muted-foreground">Champagne · Qty 1</small>
          </span>
          <strong>$520.00</strong>
        </div>
        <span className="justify-self-start rounded-lg bg-[#00665A] px-4 py-2.5 font-semibold text-white">Return to your cart</span>
        <p className="text-xs text-muted-foreground">Questions about fit? Just reply to this email.</p>
      </div>
    </div>
  );
}

const SCENES: Scene[] = [
  {
    id: "compare",
    label: "Compare",
    title: "Weighs the options, then makes a call",
    body: "When a shopper is torn between two products, Aurevia lays them side by side on what matters to that shopper and recommends one.",
    points: ["Comparisons built from your product data", "A clear recommendation, not “it depends”", "Either one goes to the cart without leaving the chat"],
    demo: (
      <WidgetWindow>
        <User>Blazer or leather jacket for spring evenings?</User>
        <Compare
          a="Cashmere Blazer"
          b="Leather Jacket"
          rows={[["Look", "Sharp, dressy", "Relaxed"], ["Warmth", "Light", "Wind-proof"], ["Rain", "Avoid", "Fine"]]}
        />
        <Bot>For evenings that might turn wet, the leather jacket. Want me to add it to your cart?</Bot>
      </WidgetWindow>
    ),
  },
  {
    id: "checkout",
    label: "Checkout questions",
    title: "Answers the question that stops the checkout",
    body: "Shipping, returns, sizing, stock. Aurevia answers from your own policies and live inventory, so the last doubt doesn’t turn into a closed tab.",
    points: ["Answers from your store policies and pages", "Live stock for every variant", "The cart stays one tap away"],
    demo: (
      <WidgetWindow>
        <User>Do you ship to Canada? And can I return it if it doesn&rsquo;t fit?</User>
        <Bot>Yes to both. Canada takes 4 to 6 business days, and you have 30 days to return anything unworn.</Bot>
        <User>Is the silk blouse in stock in small?</User>
        <Bot>Champagne in S is in stock, with 3 left.</Bot>
      </WidgetWindow>
    ),
  },
  {
    id: "tracking",
    label: "Order tracking",
    title: "Handles “where’s my order?” on its own",
    body: "Order status and tracking come straight from Shopify, so the most common support question stops landing in your inbox.",
    points: ["Finds the order from the number and email", "Carrier, status and expected delivery", "Brings in your team when something is wrong"],
    demo: (
      <WidgetWindow>
        <User>Where&rsquo;s order #48291? It&rsquo;s been 5 days.</User>
        <Tracking order="Order #48291" status="In transit" carrier="UPS Ground" eta="Arrives in 1–2 days" step={3} />
        <Bot>It shipped on the 24th and is at the regional sorting centre. Want me to resend the tracking link?</Bot>
      </WidgetWindow>
    ),
  },
  {
    id: "handoff",
    label: "Hand off to your team",
    title: "Knows when a person should take it",
    body: "You decide when the AI steps back. Your team sees the whole conversation, takes over from the dashboard or a phone, and hands it back when they’re done.",
    points: ["Handoff rules written in plain words", "Full context, so nobody repeats themselves", "Take over and hand back in one tap"],
    demo: (
      <WidgetWindow>
        <User>I need 40 of these for a corporate event. Can you do a discount?</User>
        <Bot>That&rsquo;s a big order. Let me bring in someone from the team who can price it.</Bot>
        <Divider>Maya joined the chat</Divider>
        <Agent initials="MR">Hi, Maya here. For 40 pieces I can do 15% off. What date do you need them by?</Agent>
      </WidgetWindow>
    ),
  },
  {
    id: "recovery",
    label: "Win back the cart",
    title: "Brings the cart back, and answers the reply",
    body: "When a shopper leaves with items in their cart, Aurevia follows up. If they reply with a question, the same agent answers it.",
    points: ["Follow-up emails in your brand’s voice", "Replies answered by the agent, not a no-reply inbox", "WhatsApp nudges for shoppers who opt in"],
    demo: <RecoveryEmail />,
  },
];

export default function JourneyTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus = false) => {
    setActive(i);
    if (focus) tabs.current[i]?.focus();
  };

  return (
    <section className="bg-white py-20 sm:py-28 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-fraunces font-normal text-foreground text-3xl sm:text-5xl leading-[1.1]">
            One shopper, from first question to paid order
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            The same agent handles every moment that decides a sale, and steps aside when a person should take over.
          </p>
        </div>

        <div role="tablist" aria-label="Shopping journey" className="mt-10 flex flex-wrap gap-2">
          {SCENES.map((scene, i) => (
            <button
              key={scene.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`tab-${scene.id}`}
              aria-controls={`panel-${scene.id}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") select((i + 1) % SCENES.length, true);
                if (e.key === "ArrowLeft") select((i + SCENES.length - 1) % SCENES.length, true);
              }}
              className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00665A] ${
                active === i
                  ? "border-[#2d3737] bg-[#2d3737] text-white"
                  : "border-border bg-card text-foreground/75 hover:border-[#00665A]/40 hover:text-foreground"
              }`}
            >
              {scene.label}
            </button>
          ))}
        </div>

        {SCENES.map((scene, i) => (
          <div
            key={scene.id}
            role="tabpanel"
            id={`panel-${scene.id}`}
            aria-labelledby={`tab-${scene.id}`}
            hidden={active !== i}
            className={`${active === i ? "grid" : "hidden"} mt-10 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16`}
          >
            <div>
              <h3 className="font-fraunces font-normal text-foreground text-2xl sm:text-3xl">{scene.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{scene.body}</p>
              <ul className="mt-6 grid gap-3">
                {scene.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00665A]" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center rounded-[28px] bg-[#e8eeec] px-4 py-10 sm:px-10">{scene.demo}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
