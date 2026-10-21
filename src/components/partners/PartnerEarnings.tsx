"use client";

/**
 * Partners hero demo: what one client store earns a partner, worked out from the real Pro price ($89 a month) and
 * the program terms (agency up to 30% for as long as the store stays, referral 20% for 18 months). The store is the
 * fictional Linden & Wren. Rows arrive one at a time the first time it comes on screen, then stay (design.md: loops
 * are for product demos only); reduced motion shows them all.
 */

import { useEffect, useRef, useState } from "react";
import p from "./partners.module.css";

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

const T = { store: 300, plan: 1000, agency: 1900, referral: 2600 };

export default function PartnerEarnings() {
  const ref = useRef<HTMLDivElement>(null);
  const [ms, setMs] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setMs(T.referral);
    const timers: number[] = [];
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      for (const t of Object.values(T)) timers.push(window.setTimeout(() => setMs((m) => Math.max(m, t)), t));
    });
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);
  const on = (t: number) => cx(p.earnRow, ms >= t && p.earnRowOn);
  return (
    <div ref={ref} className={p.earn} role="img" aria-label="Example: a client store on the Pro plan at $89 a month earns an agency partner up to $26.70 a month, or a referral partner $17.80 a month for 18 months">
      <span className={p.earnEyebrow}>One client store</span>

      <div className={cx(on(T.store), p.earnStore)}>
        <span className={p.earnMono} aria-hidden="true">L</span>
        <span className={p.earnStoreText}>
          <b>Linden &amp; Wren</b>
          <small>Installs Aurevia from the Shopify App Store</small>
        </span>
      </div>

      <div className={cx(on(T.plan), p.earnPlan)}>
        <span>Pro plan</span>
        <b>$89.00<small> / month</small></b>
      </div>

      <div className={p.earnSplit}>
        <div className={on(T.agency)}>
          <span className={p.earnWho}>Agency partner <em>up to 30%</em></span>
          <b className={p.earnFig}>$26.70<small> a month</small></b>
          <span className={p.earnFor}>For as long as the store stays</span>
        </div>
        <div className={on(T.referral)}>
          <span className={p.earnWho}>Referral partner <em>20%</em></span>
          <b className={p.earnFig}>$17.80<small> a month</small></b>
          <span className={p.earnFor}>For 18 months</span>
        </div>
      </div>

      <p className={p.earnNote}>Example on the Pro plan, billed monthly. You earn on every store you bring.</p>
    </div>
  );
}
