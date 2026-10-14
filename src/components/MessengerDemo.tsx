"use client";

/**
 * A WhatsApp or Instagram DM thread seen from the shopper's phone, played
 * message by message and looped. Used on /channels.
 */

import { useEffect, useState } from "react";
import { InstagramGlyph, WhatsAppGlyph } from "./ChannelIcons";

export interface MessengerStep {
  from: "shopper" | "store";
  text: string;
  /** Product link preview attached above the text */
  product?: { name: string; meta: string; img: string };
}

export default function MessengerDemo({
  theme,
  storeName,
  subtitle,
  steps,
}: {
  theme: "whatsapp" | "instagram";
  storeName: string;
  subtitle: string;
  steps: MessengerStep[];
}) {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(steps.length);
      return;
    }
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setShown(0);
      let at = 500;
      steps.forEach((step, index) => {
        if (step.from === "store") {
          timers.push(setTimeout(() => !cancelled && setTyping(true), at));
          at += 900;
        }
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setTyping(false);
            setShown(index + 1);
          }, at)
        );
        at += 1300;
      });
      timers.push(setTimeout(() => !cancelled && run(), at + 4000));
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [steps]);

  const initials = storeName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={`demo-wa demo-msgr ${theme === "instagram" ? "demo-ig" : ""}`} aria-hidden>
      <div className="demo-wa-head">
        <span className="demo-wa-avatar">{initials}</span>
        <span className="demo-wa-head-text">
          <strong>{storeName}</strong>
          <span>{subtitle}</span>
        </span>
        {theme === "instagram" ? <InstagramGlyph className="demo-wa-mark" /> : <WhatsAppGlyph className="demo-wa-mark" />}
      </div>
      <div className="demo-wa-body">
        {steps.slice(0, shown).map((step, index) => (
          <div key={index} className={`demo-wa-msg demo-msg-pop ${step.from === "shopper" ? "demo-wa-out" : "demo-wa-in"}`}>
            {step.product ? (
              <div className="demo-wa-item">
                <img src={step.product.img} alt="" loading="lazy" />
                <span>
                  <strong>{step.product.name}</strong>
                  {step.product.meta}
                </span>
              </div>
            ) : null}
            <p>{step.text}</p>
          </div>
        ))}
        {typing ? (
          <div className="demo-wa-msg demo-wa-in demo-msgr-typing">
            <span />
            <span />
            <span />
          </div>
        ) : null}
      </div>
    </div>
  );
}
