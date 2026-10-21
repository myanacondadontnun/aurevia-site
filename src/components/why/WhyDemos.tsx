"use client";

/**
 * Why Aurevia: the two animated pieces. WhyScorecard is the hero's verdict (nine jobs of a sales agent, a typical AI
 * chatbot against Aurevia); WhyDuel plays the same shopper question to both, side by side, until one of them sells
 * the dress. "Typical chatbot" is a generic FAQ / AI chatbot, never a named product. The store is Linden & Wren,
 * the fictional fashion store of the home hero, with the same dresses and prices.
 */

import { Bot, Check, Download, Minus, ShoppingBag, X } from "lucide-react";
import { span, typed, useScene } from "@/components/sceneClock";
import w from "./why.module.css";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/* ═════════════════════════ Scorecard ═════════════════════════ */

type Mark = "yes" | "part" | "no";
export const JOBS: { job: string; bot: Mark }[] = [
  { job: "Answers questions around the clock", bot: "yes" },
  { job: "Answers only from your policies", bot: "part" },
  { job: "Knows live stock and prices", bot: "part" },
  { job: "Asks what the shopper needs", bot: "no" },
  { job: "Recommends with a reason", bot: "no" },
  { job: "Adds to the cart in the chat", bot: "no" },
  { job: "Follows up carts left behind", bot: "no" },
  { job: "Hands over with the cart attached", bot: "part" },
  { job: "Reports revenue from real orders", bot: "no" },
];

function MarkIcon({ mark, on, ours = false }: { mark: Mark; on: boolean; ours?: boolean }) {
  return (
    <span className={cx(w.mark, w[`mark_${mark}`], ours && w.markOurs, on && w.markOn)} aria-label={mark === "yes" ? "Yes" : mark === "part" ? "Partly" : "No"}>
      {mark === "yes" ? <Check aria-hidden="true" /> : mark === "part" ? <span className={w.half} /> : <Minus aria-hidden="true" />}
    </span>
  );
}

export function WhyScorecard() {
  const { ref, ms } = useScene(4200, { fromStart: true });
  const step = 260;
  const shown = (i: number) => ms >= 300 + i * step;
  const meter = span(ms, 300 + JOBS.length * step, 300 + JOBS.length * step + 900);
  const full = JOBS.filter((j) => j.bot === "yes").length;
  const part = JOBS.filter((j) => j.bot === "part").length;
  return (
    <div ref={ref} className={w.score}>
      <div className={w.scoreHead}>
        <span>
          <span className={w.scoreTitle}>Nine jobs of a sales agent</span>
          <span className={w.scoreSub}>On a Shopify store</span>
        </span>
        <span className={w.scoreCols} aria-hidden="true">
          <span>Chatbot</span>
          <span className={w.scoreUs}>Aurevia</span>
        </span>
      </div>
      <ul className={w.scoreRows}>
        {JOBS.map((j, i) => (
          <li key={j.job} className={cx(w.scoreRow, shown(i) && w.scoreRowOn)}>
            <span className={w.scoreJob}>{j.job}</span>
            <span className={w.scoreMarks}>
              <MarkIcon mark={j.bot} on={shown(i)} />
              <MarkIcon mark="yes" on={shown(i)} ours />
            </span>
          </li>
        ))}
      </ul>
      <div className={w.meters}>
        <div className={w.meter}>
          <span className={w.meterLabel}>Typical AI chatbot</span>
          <span className={w.meterBar}>
            <i style={{ width: `${(full / JOBS.length) * 100 * meter}%` }} />
            <i className={w.meterPart} style={{ width: `${(part / JOBS.length) * 100 * meter}%` }} />
          </span>
          <span className={w.meterFig}>{full} of 9 <small>+{part} partly</small></span>
        </div>
        <div className={cx(w.meter, w.meterUs)}>
          <span className={w.meterLabel}>Aurevia</span>
          <span className={w.meterBar}><i style={{ width: `${100 * meter}%` }} /></span>
          <span className={w.meterFig}>9 of 9</span>
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════ Duel ═════════════════════════ */

const QUESTION = "I need a dress for a summer wedding, under $200.";

// Timeline (ms), one clock for both sides so they move together.
const T = {
  ask: 500,
  botTyping: 1100, botLinks: 1900, botAsk2: 3600, botTyping2: 4100, botSorry: 4800, botLeft: 6800,
  usTyping: 1100, usAsk: 1800, usReply: 3000, usTyping2: 3500, usCards: 4200, usAdd: 5600, usOrder: 6800,
  end: 7600,
};

function Typing() {
  return <span className={w.typing}><i /><i /><i /></span>;
}

export function WhyDuel({ dress, silk }: { dress: string; silk: string }) {
  const { ref, ms } = useScene(T.end, { fromStart: true });
  const at = (t: number) => ms >= t;
  const between = (a: number, b: number) => ms >= a && ms < b;
  return (
    <div ref={ref} className={w.duel}>
      {/* The typical chatbot */}
      <figure className={w.side}>
        <figcaption className={w.sideLabel}>A typical chatbot</figcaption>
        <div className={cx(w.chat, w.chatBot)} role="img" aria-label="A typical chatbot answers with help links, then fails to understand, and the shopper leaves">
          <div className={w.chatHead}>
            <span className={w.botAvatar}><Bot aria-hidden="true" /></span>
            <span><b>Chat support</b><small>Typically replies instantly</small></span>
          </div>
          <div className={w.chatBody}>
            {at(T.ask) && <span className={cx(w.msg, w.msgUserGrey)}>{QUESTION}</span>}
            {between(T.botTyping, T.botLinks) && <span className={cx(w.msg, w.msgBotGrey)}><Typing /></span>}
            {at(T.botLinks) && (
              <span className={cx(w.msg, w.msgBotGrey)}>
                Thanks for reaching out! Here are some links that might help:
                <span className={w.links}>
                  <u>Dresses</u>
                  <u>Shipping &amp; returns</u>
                  <u>FAQs</u>
                </span>
              </span>
            )}
            {at(T.botAsk2) && <span className={cx(w.msg, w.msgUserGrey)}>Which one works for an outdoor wedding?</span>}
            {between(T.botTyping2, T.botSorry) && <span className={cx(w.msg, w.msgBotGrey)}><Typing /></span>}
            {at(T.botSorry) && (
              <span className={cx(w.msg, w.msgBotGrey)}>
                Sorry, I didn&rsquo;t understand that. Would you like to contact our support team?
                <span className={w.choices}><span>Yes</span><span>No</span></span>
              </span>
            )}
            {at(T.botLeft) && <span className={w.system}>The shopper left the chat</span>}
          </div>
          <div className={cx(w.outcome, w.outcomeLost, at(T.botLeft) && w.outcomeOn)}>
            <X aria-hidden="true" /> No sale
          </div>
        </div>
      </figure>

      <span className={w.vs} aria-hidden="true">vs</span>

      {/* Aurevia */}
      <figure className={w.side}>
        <figcaption className={cx(w.sideLabel, w.sideLabelUs)}>
          <img src="/images/site/mark-ring.webp" alt="" /> Aurevia
        </figcaption>
        <div className={cx(w.chat, w.chatUs)} role="img" aria-label="Aurevia asks what the shopper needs, recommends two dresses, adds one to the cart and the shopper places the order">
          <div className={w.chatHead}>
            <span className={w.usAvatar}><img src="/images/site/mark-ring.webp" alt="" /></span>
            <span><b>Linden &amp; Wren</b><small>Aurevia · AI sales agent</small></span>
          </div>
          <div className={w.chatBody}>
            {at(T.ask) && <span className={cx(w.msg, w.msgUser)}>{QUESTION}</span>}
            {between(T.usTyping, T.usAsk) && <span className={cx(w.msg, w.msgUs)}><Typing /></span>}
            {at(T.usAsk) && (
              <span className={cx(w.msg, w.msgUs)}>
                Lovely! Will it be outdoors, and do you prefer midi or maxi?
                <span className={w.cue}>Asks before it suggests</span>
              </span>
            )}
            {at(T.usReply) && <span className={cx(w.msg, w.msgUser)}>Outdoors, midi please.</span>}
            {between(T.usTyping2, T.usCards) && <span className={cx(w.msg, w.msgUs)}><Typing /></span>}
            {at(T.usCards) && (
              <span className={cx(w.msg, w.msgUs, w.msgWide)}>
                The Linen Midi is light enough for an outdoor day. The Silk Slip if you&rsquo;d like it dressier:
                <span className={w.cards}>
                  <span className={w.card}>
                    <img src={dress} alt="" />
                    <b>Linen Midi Dress</b>
                    <span>$168.00</span>
                    <span className={cx(w.cardBtn, at(T.usAdd) && w.cardBtnDone)}>{at(T.usAdd) ? <><Check aria-hidden="true" /> Added</> : "Add to cart"}</span>
                  </span>
                  <span className={w.card}>
                    <img src={silk} alt="" />
                    <b>Silk Slip Dress</b>
                    <span>$189.00</span>
                    <span className={w.cardBtn}>Add to cart</span>
                  </span>
                </span>
              </span>
            )}
            {at(T.usAdd) && (
              <span className={w.cartStrip}>
                <ShoppingBag aria-hidden="true" /> 1 item · $168.00 <b>Checkout</b>
              </span>
            )}
          </div>
          <div className={cx(w.outcome, w.outcomeWon, at(T.usOrder) && w.outcomeOn)}>
            <Check aria-hidden="true" /> Order placed · $168.00
          </div>
        </div>
      </figure>
    </div>
  );
}

/* ═════════════════════════ Image generation (Ask Aurevia) ═════════════════════════ */

const PROMPT = "A campaign shot for these trousers: shopping bags, warm evening light.";
const G = { type: 400, typed: 2200, think: 2500, gen: 3100, image: 5600, actions: 6100, end: 6600 };

/** Ask Aurevia making a campaign image from a product reference: the request with its @ product, the render, then
    the result card's own buttons (ink "Add to <product>", outline "Download") and the 5-message charge. */
export function ImageGenDemo() {
  const { ref, ms } = useScene(G.end, { fromStart: true });
  const at = (t: number) => ms >= t;
  return (
    <div ref={ref} className={w.ask} role="img" aria-label="Ask Aurevia generates a campaign image from a prompt and a product photo, then offers to add it to the product or download it">
      <div className={w.askHead}>
        <img src="/images/site/mark-ring.webp" alt="" />
        <b>Ask Aurevia</b>
      </div>
      <div className={w.askBody}>
        <span className={w.askMe}>
          <span className={w.mention}>@Wide-Leg Linen Trousers</span>{" "}
          {typed(PROMPT, ms, G.type, G.typed)}
          {ms >= G.type && ms < G.typed ? <span className={w.caret} /> : null}
        </span>
        {at(G.think) && <span className={w.askText}>On it. Using the trousers&rsquo; product photo as the reference.</span>}
        {at(G.gen) && (
          <span className={w.askImageWrap}>
            <span className={cx(w.askShimmer, at(G.image) && w.askShimmerDone)}>{at(G.image) ? "" : "Generating image…"}</span>
            <img src={encodeURI("/images/site/Emerald Trousers and Shopping Bags.png")} alt="" className={cx(w.askImage, at(G.image) && w.askImageOn)} />
          </span>
        )}
        <span className={cx(w.askActions, at(G.actions) && w.askActionsOn)}>
          <span className={w.askAdd}>Add to Wide-Leg Linen Trousers</span>
          <span className={w.askDownload}><Download aria-hidden="true" /> Download</span>
        </span>
        <span className={cx(w.askCost, at(G.actions) && w.askActionsOn)}>Used 5 messages</span>
      </div>
    </div>
  );
}
