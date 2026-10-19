"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, Search, ShoppingBag, Star, type LucideIcon } from "lucide-react";
import { SHOPIFY_LISTING_URL, SHOPIFY_RATING, SHOPIFY_REVIEW_COUNT } from "@/lib/reviews";
import { trackButtonClick } from "@/lib/analytics";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import g from "./glass.module.css";
import h from "./hero.module.css";
import { Cards, InputPill } from "./Widget";

/**
 * Home hero, no photo (Hallmark redesign, atmospheric): a warm paper canvas with two soft emerald blooms and fine grain;
 * the Aurevia ring (outer weave only) sits cropped by the right edge as a watermark, turning very slowly, a little
 * faster while the page scrolls, with a light parallax. Left, the Fraunces headline fades
 * in word by word, then the line, the two pill buttons and the proof row.
 * Right, a Linden & Wren (fictional fashion store) chat as free-floating frosted white glass: a size question answered
 * with the size guide as a table, two dresses, then the Add to cart press, each agent step tagged with a small cue
 * (knowledge base, product discovery, added to cart).
 */

export type HeroPhotos = {
  dress: string | null;
  silk: string | null;
};

/** A small source card beside an Aurevia message: what it drew on, and the specifics. */
type Cue = { icon: LucideIcon; eyebrow: string; title: string };

type Step =
  | { who: "user"; text: string }
  | { who: "agent"; text: string; after?: string; table?: boolean; products?: boolean; system?: boolean; cue?: Cue };

// The demo store is Linden & Wren (fictional, as in the scenarios section); same dresses and prices.
const SCRIPT: Step[] = [
  { who: "user", text: "Do your linen dresses run small? I'm usually a UK 10." },
  {
    who: "agent",
    text: "Here's our size guide:",
    table: true,
    after: "They run true to size, so a UK 10 is right.",
    cue: { icon: BookOpen, eyebrow: "Knowledge base", title: "From the size guide" },
  },
  { who: "user", text: "Perfect. Something for a summer wedding?" },
  {
    who: "agent",
    text: "The linen midi is light for an outdoor day; the silk slip is dressier.",
    products: true,
    cue: { icon: Search, eyebrow: "Product discovery", title: "“Summer wedding dress”" },
  },
  // What the real widget posts after the card's own button adds the item.
  {
    who: "agent",
    text: "Successfully added Linen Midi Dress, UK 10.",
    system: true,
    cue: { icon: ShoppingBag, eyebrow: "Added to cart", title: "Linen Midi Dress · UK 10" },
  },
];

/** The size guide the agent quotes, in cm (the widget renders the agent's markdown tables like this). */
const SIZE_ROWS = [
  { size: "UK 8", bust: 84, waist: 66, hip: 91 },
  { size: "UK 10", bust: 89, waist: 71, hip: 96 },
  { size: "UK 12", bust: 94, waist: 76, hip: 101 },
];

/** The card's Add to cart button: idle → pressed (the click) → "Adding…" → added (badge + cart strip). */
type CartPhase = "idle" | "pressed" | "adding" | "added";

function useConversation() {
  // Opens on the shopper's first line so the widget is never empty; the rest plays at a real chat's pace.
  const [shown, setShown] = useState(1);
  const [cart, setCart] = useState<CartPhase>("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(SCRIPT.length);
      setCart("added");
      return;
    }
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));

    (async () => {
      await wait(900);
      while (!cancelled) {
        for (let i = 1; i < SCRIPT.length - 1 && !cancelled; i++) {
          await wait(2400);
          setShown(i + 1);
        }
        // The shopper reads the recommendation, then taps Add to cart on the serving set.
        await wait(2400);
        if (cancelled) break;
        setCart("pressed");
        await wait(180);
        setCart("adding");
        await wait(900);
        setCart("added");
        setShown(SCRIPT.length);
        await wait(7000);
        if (!cancelled) {
          setCart("idle");
          setShown(1);
          await wait(900);
        }
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return { shown, cart, added: cart === "added" };
}

function AgentMark() {
  return (
    <span className={g.mark} aria-hidden="true">
      <img src="/images/site/mark-ring.webp" alt="" />
    </span>
  );
}

/** Small name line at the top of each Aurevia reply, so it's clear whose message it is. */
function BubbleName() {
  return <span className={g.bubbleName}>Aurevia · AI sales agent</span>;
}

function CueChip({ cue }: { cue: Cue }) {
  const Icon = cue.icon;
  return (
    <span className={g.cue}>
      <span className={g.cueCard}>
        <span className={g.cueIcon}><Icon aria-hidden="true" /></span>
        <span className={g.cueText}>
          <span className={g.cueEyebrow}>{cue.eyebrow}</span>
          <span className={g.cueTitle}>{cue.title}</span>
        </span>
      </span>
      <span className={g.cueLine} />
      <span className={g.cueNode} />
    </span>
  );
}

function SizeTable() {
  return (
    <table className={g.sizeTable}>
      <thead>
        <tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th></tr>
      </thead>
      <tbody>
        {SIZE_ROWS.map((r) => (
          <tr key={r.size} className={r.size === "UK 10" ? g.sizeMatch : undefined}>
            <td>{r.size}</td><td>{r.bust}</td><td>{r.waist}</td><td>{r.hip}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** The conversation as free-floating glass: grows upward from the input bar; only what reaches the top fades. */
function ChatStack({
  photos,
  shown,
  cart,
  added,
}: {
  photos: HeroPhotos;
  shown: number;
  cart: CartPhase;
  added: boolean;
}) {
  return (
    <div className={`${g.chat} ${g.free}`} aria-hidden="true">
      {SCRIPT.slice(0, shown).map((step, i) =>
        step.who === "agent" && step.products ? (
          <div key={i} className={`${g.enter} ${g.cardsGroup} ${g.step}`}>
            <div className={g.agent}>
              <AgentMark />
              <div className={g.aiBubble}><BubbleName />{step.text}</div>
            </div>
            <div className={g.cardsRow}>
              <Cards
                glass
                fill
                eager
                products={[
                  {
                    title: "Linen Midi Dress",
                    price: "$168.00",
                    image: photos.dress,
                    badge: added ? "In Cart: 1" : undefined,
                    cta: cart === "adding" ? "Adding…" : "Add to cart",
                    ctaState: cart === "pressed" ? "pressed" : cart === "adding" ? "busy" : undefined,
                  },
                  { title: "Silk Slip Dress", price: "$189.00", image: photos.silk },
                ]}
              />
            </div>
            {step.cue && <CueChip cue={step.cue} />}
          </div>
        ) : step.who === "user" ? (
          <div key={i} className={`${g.glass} ${g.user} ${g.enter}`}>{step.text}</div>
        ) : (
          <div key={i} className={`${g.cardsGroup} ${g.enter} ${g.step}`}>
            <div className={g.agent}>
              <AgentMark />
              <div className={g.aiBubble}>
                {!step.system && <BubbleName />}
                {step.text}
                {step.table && <SizeTable />}
                {step.after && <span className={g.after}>{step.after}</span>}
              </div>
            </div>
            {step.cue && <CueChip cue={step.cue} />}
          </div>
        ),
      )}
      <div className={g.inputRow}>
        <InputPill />
      </div>
    </div>
  );
}

/** Turns the watermark very slowly, a little faster while the page scrolls (easing back after), and lets it
    drift with a light parallax: it moves up at a quarter of the scroll speed, so it reads as further back.
    Paused while the hero is off screen; still under reduced motion. */
function useSpin<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const BASE = 3; // degrees per second: one turn every two minutes
    const MAX_BOOST = 9; // scrolling at most quadruples it
    const PARALLAX = 0.25;
    let angle = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let last = 0;
    let raf = 0;
    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(boost + Math.abs(y - lastY) * 0.05, MAX_BOOST);
      lastY = y;
    };
    const tick = (t: number) => {
      const dt = last ? Math.min(t - last, 64) / 1000 : 0;
      last = t;
      angle = (angle + (BASE + boost) * dt) % 360;
      boost *= Math.exp(-1.6 * dt);
      el.style.transform = `translateY(${-window.scrollY * PARALLAX}px) rotate(${angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      last = 0;
      if (entry.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return ref;
}

const HEADLINE = ["Turn", "more", "shoppers", "into"];

export default function HomeHero({ photos }: { photos: HeroPhotos }) {
  const { shown, cart, added } = useConversation();
  const spinRef = useSpin<HTMLSpanElement>();

  return (
    <section id="hero" className={h.hero}>
      <div className={h.grain} aria-hidden="true" />
      <span className={h.watermark} aria-hidden="true">
        <span ref={spinRef} className={h.watermarkSpin} />
      </span>

      <div className={`container mx-auto px-4 sm:px-6 ${h.inner}`}>
        <div className={h.copy}>
          <h1 className={h.title}>
            {HEADLINE.map((w, i) => (
              <span key={w} className={h.word} style={{ animationDelay: `${120 + i * 70}ms` }}>
                {w}{" "}
              </span>
            ))}
            <span className={`${h.word} ${h.accent}`} style={{ animationDelay: `${120 + HEADLINE.length * 70}ms` }}>
              customers.
            </span>
          </h1>

          <p className={`${h.lede} ${h.fade}`} style={{ animationDelay: "560ms" }}>
            Your AI sales agent helps shoppers discover the right products, answers their buying questions and guides
            them to checkout. 24/7.
          </p>

          <div className={`${h.ctas} ${h.fade}`} style={{ animationDelay: "680ms" }}>
            <a
              href={SHOPIFY_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("Start free trial", "hero_section")}
              className={h.primary}
            >
              Start free trial
              <ArrowRight aria-hidden="true" />
            </a>
            <a href="/book-demo/" onClick={() => trackButtonClick("Book a demo", "hero_section")} className={h.secondary}>
              Book a demo
            </a>
          </div>

          {/* Proof as three set figures with hairline rules between them. 50+ is the live install count from the
              stores table (Oct 2026). */}
          <ul className={`${h.stats} ${h.fade}`} style={{ animationDelay: "800ms" }}>
            <li className={h.stat}>
              <a
                href={SHOPIFY_LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={h.statLink}
                aria-label={`Rated ${SHOPIFY_RATING.toFixed(1)} out of 5 on the Shopify App Store from ${SHOPIFY_REVIEW_COUNT} reviews`}
              >
                <span className={h.statFig}>
                  {SHOPIFY_RATING.toFixed(1)}
                  <span className={h.stars} aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
                  </span>
                </span>
                <span className={h.statLabel}>
                  {SHOPIFY_REVIEW_COUNT} reviews<span className={h.wideOnly}> on Shopify</span>
                </span>
              </a>
            </li>
            <li className={h.stat}>
              <span className={h.statFig}>50+</span>
              <span className={h.statLabel}>Shopify stores</span>
            </li>
            <li className={h.stat}>
              <span className={h.statFig}>14 days</span>
              <span className={h.statLabel}>free trial</span>
            </li>
          </ul>
        </div>

        <div className={`${h.demo} ${h.fadeLate}`}>
          <ChatStack photos={photos} shown={shown} cart={cart} added={added} />
        </div>
      </div>
    </section>
  );
}
