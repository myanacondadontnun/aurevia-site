"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import s from "./painpoints.module.css";

/**
 * "What merchants are tired of": the complaints that come up again and again in 1★ and 2★ reviews of AI chat
 * apps on the Shopify App Store (researched October 2026 across Tidio, Gorgias, Shopify Inbox, Chatty, Zipchat
 * and others), paraphrased and never attributed, each next to how Aurevia handles it. Every answer is checked
 * against the product: Shopify billing with a visible usage meter and a pause (not an overage) at the limit,
 * answers grounded in the synced store, an app-embed install with no script tags, no shopper sign-in with leads
 * still collected, and the ten-minute setup.
 */

const ROWS: { stars: 1 | 2; complaint: string; answer: string }[] = [
  {
    stars: 1,
    complaint: "The bill jumped the month the chat limit ran out.",
    answer:
      "One plan, billed through Shopify. Your usage is always on screen, and at the limit replies pause instead of running up a bill.",
  },
  {
    stars: 2,
    complaint: "It made up answers about my products.",
    answer: "Answers come from your synced catalogue, policies and store pages. Correct one once and the agent uses it from then on.",
  },
  {
    stars: 1,
    complaint: "It broke my theme and left code behind when I uninstalled.",
    answer: "It installs as a theme app embed, with no edits to your theme code. Uninstall it and it’s gone.",
  },
  {
    stars: 1,
    complaint: "Shoppers had to sign in just to ask a question.",
    answer: "Shoppers open the chat and type. When they share an email, it lands in your Leads for follow-up.",
  },
  {
    stars: 2,
    complaint: "Setup took weeks, and it still wasn’t right.",
    answer: "Live in about ten minutes. Products, prices, stock and policies sync from Shopify on their own.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span className={s.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={i < count ? s.starOn : s.starOff} aria-hidden="true" />
      ))}
    </span>
  );
}

function Row({ row }: { row: (typeof ROWS)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <li ref={ref} className={`${s.row} ${seen ? s.seen : ""}`}>
      <p className={s.quote}>
        <span className={s.strike}>&ldquo;{row.complaint}&rdquo;</span>
        <span className={s.srOnly}> ({row.stars}-star review theme)</span>
      </p>
      <p className={s.answerText}>{row.answer}</p>
    </li>
  );
}

export default function PainPoints() {
  return (
    <section className={s.section}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className={s.head}>
          <h2 className={s.title}>What merchants are tired of</h2>
          <p className={s.lede}>
            The same complaints come up again and again in one- and two-star reviews of AI chat apps. Here&rsquo;s how
            Aurevia handles each one.
          </p>
        </div>

        {/* The two labels appear once, as column heads, instead of on every row. */}
        <div className={s.cols} aria-hidden="true">
          <span className={s.colHead}>
            <Stars count={1} />
            What merchants wrote · 1★–2★ reviews
          </span>
          <span className={`${s.colHead} ${s.colHeadAccent}`}>What Aurevia does</span>
        </div>

        <ol className={s.rows}>
          {ROWS.map((row) => (
            <Row key={row.complaint} row={row} />
          ))}
        </ol>

        <div className={s.foot}>
          <div className={s.ctas}>
            <a href={SHOPIFY_APP_URL} target="_blank" rel="noopener noreferrer" className={s.cta}>
              Start free trial
              <ArrowRight aria-hidden="true" />
            </a>
            <a href="/book-demo/" className={s.ctaSecondary}>
              Book a demo
            </a>
          </div>
          <p className={s.note}>
            Paraphrased from recurring themes in 1★ and 2★ reviews of AI chat apps on the Shopify App Store, October 2026.
            No app is named.
          </p>
        </div>
      </div>
    </section>
  );
}
