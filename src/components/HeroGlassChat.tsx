"use client";

/**
 * A short conversation laid over an industry hero photo as frosted glass, like the home hero's chat: the shopper
 * asks, the agent asks one question back, recommends a product, and it goes in the cart. Each industry page passes
 * its own lines and product. Loops while on screen; reduced motion shows the finished conversation.
 */

import { Check, ShoppingBag } from "lucide-react";
import { useScene } from "@/components/sceneClock";
import g from "./heroGlassChat.module.css";

export interface HeroChat {
  ask: string;
  question: string;
  answer: string;
  pitch: string;
  product: { name: string; price: string; img?: string };
  cue?: string;
}

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");
const T = { ask: 400, typing1: 1100, question: 1800, answer: 3000, typing2: 3700, pitch: 4400, added: 5900, end: 6600 };

function Mark() {
  return <img src="/images/site/mark-ring.webp" alt="" className={g.mark} />;
}
function Typing() {
  return <span className={cx(g.bubble, g.agent, g.typing)}><i /><i /><i /></span>;
}

export default function HeroGlassChat({ chat }: { chat: HeroChat }) {
  const { ref, ms } = useScene(T.end, { fromStart: true });
  const at = (t: number) => ms >= t;
  const between = (a: number, b: number) => ms >= a && ms < b;
  return (
    <div ref={ref} className={g.chat} aria-hidden="true">
      {at(T.ask) && <span className={cx(g.bubble, g.me)}>{chat.ask}</span>}
      {between(T.typing1, T.question) && <Typing />}
      {at(T.question) && (
        <span className={g.agentRow}>
          <Mark />
          <span className={cx(g.bubble, g.agent)}>
            {chat.question}
            <span className={g.cue}><Mark /> {chat.cue ?? "Asks before it suggests"}</span>
          </span>
        </span>
      )}
      {at(T.answer) && <span className={cx(g.bubble, g.me)}>{chat.answer}</span>}
      {between(T.typing2, T.pitch) && <Typing />}
      {at(T.pitch) && (
        <span className={g.agentRow}>
          <Mark />
          <span className={cx(g.bubble, g.agent)}>
            {chat.pitch}
            <span className={g.product}>
              {chat.product.img ? <img src={chat.product.img} alt="" /> : <span className={g.productBlank}>{chat.product.name[0]}</span>}
              <span className={g.productText}><b>{chat.product.name}</b><small>{chat.product.price}</small></span>
              <span className={cx(g.add, at(T.added) && g.addDone)}>{at(T.added) ? <><Check /> Added</> : "Add to cart"}</span>
            </span>
          </span>
        </span>
      )}
      {at(T.added) && (
        <span className={g.cart}>
          <ShoppingBag /> 1 item · {chat.product.price} <b>Checkout</b>
        </span>
      )}
    </div>
  );
}
