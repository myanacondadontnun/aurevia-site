"use client";

/**
 * ROI calculator board (design.md): three numbers from the merchant's Shopify admin on the left, the estimate on the
 * right, recalculated as they type. The model and the plan it picks are in lib/roi.ts and lib/pricing.ts.
 */

import { useMemo, useState } from "react";
import { calculateROI } from "@/lib/roi";
import r from "@/components/roi/roi.module.css";

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

const FIELDS = [
  { id: "roi-visitors", key: "visitors", label: "Store visitors a month", hint: "Sessions in Shopify Analytics, last 30 days.", placeholder: "50,000 for example", prefix: null },
  { id: "roi-orders", key: "orders", label: "Orders a month", hint: "Orders in the same 30 days.", placeholder: "200 for example", prefix: null },
  { id: "roi-aov", key: "aov", label: "Average order value", hint: "In US dollars.", placeholder: "50 for example", prefix: "$" },
] as const;

type Key = (typeof FIELDS)[number]["key"];

export default function ROICalculator() {
  const [values, setValues] = useState<Record<Key, string>>({ visitors: "", orders: "", aov: "" });

  // Same inputs and rounding as before: whole visitors and orders, AOV to the cent. Recalculated on every change.
  const result = useMemo(() => {
    const nums = [values.visitors, values.orders, values.aov].map((s) => s.trim());
    if (nums.some((s) => s === "")) return null;
    const [v, o, a] = nums.map(Number);
    if (![v, o, a].every((n) => Number.isFinite(n) && n >= 0)) return null;
    return calculateROI(Math.floor(v), Math.floor(o), Math.round(a * 100) / 100);
  }, [values]);

  const roiFigure =
    result === null
      ? "·"
      : result.monthlyROIPercent !== null
        ? `${result.monthlyROIPercent.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}%`
        : result.subscriptionCost === 0
          ? "N/A"
          : "·";
  const roiNote =
    result === null
      ? "Fill in all three numbers to see your estimate."
      : result.subscriptionCost === 0
        ? "No monthly cost on the Free plan."
        : result.subscriptionCost === null
          ? "Your volume needs a custom plan. Talk to us for pricing."
          : "Estimated monthly return after the subscription.";

  return (
    <section className={r.board} aria-label="ROI calculator">
      <div className={r.inputs}>
        <h2 className={r.boardHead}>Your store</h2>
        {FIELDS.map((f) => (
          <div key={f.id} className={r.field}>
            <label htmlFor={f.id} className={r.label}>{f.label}</label>
            <span className={r.inputWrap}>
              {f.prefix ? <span className={r.prefix} aria-hidden="true">{f.prefix}</span> : null}
              <input
                id={f.id}
                type="number"
                inputMode="decimal"
                min={0}
                step={f.key === "aov" ? 0.01 : 1}
                value={values[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => setValues((prev) => ({ ...prev, [f.key]: e.target.value }))}
                className={`${r.input} ${f.prefix ? r.withPrefix : ""}`}
                aria-describedby={`${f.id}-hint`}
              />
            </span>
            <span id={`${f.id}-hint`} className={r.hint}>{f.hint}</span>
          </div>
        ))}
      </div>

      <div className={r.results} aria-live="polite">
        <div className={r.roi}>
          <span className={r.eyebrow}>Monthly ROI</span>
          <span className={`${r.roiFig} ${result?.monthlyROIPercent != null ? r.roiFigOn : ""}`}>{roiFigure}</span>
          <span className={r.roiNote}>{roiNote}</span>
        </div>

        <ul className={r.rows}>
          <li>
            Conversations a month <b>{result === null ? "·" : formatNumber(result.conversationsPerMonth)}</b>
          </li>
          <li>
            Possible extra orders <b>{result === null ? "·" : result.potentialAdditionalSales.toLocaleString()}</b>
          </li>
          <li>
            Order value on those orders <b>{result === null ? "·" : money(result.potentialAOVFromAurevia)}</b>
          </li>
          <li>
            Possible extra revenue <b>{result === null ? "·" : money(result.additionalUnlockSales)}</b>
          </li>
        </ul>

        <div className={r.plan}>
          <span>
            {result === null ? "Your plan" : <>On the <b>{result.planName}</b> plan</>}
          </span>
          <b>
            {result === null
              ? "·"
              : result.subscriptionCost !== null
                ? `${money(result.subscriptionCost)} a month`
                : "Contact us"}
          </b>
        </div>
      </div>
    </section>
  );
}
