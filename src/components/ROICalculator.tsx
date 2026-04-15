"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { calculateROI, type ROIResult } from "@/lib/roi";
import {
  TrendingUp,
  DollarSign,
  Receipt,
  CreditCard,
  Calculator,
  RefreshCw,
} from "lucide-react";

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

export default function ROICalculator() {
  const [visitors, setVisitors] = useState("");
  const [orders, setOrders] = useState("");
  const [aov, setAov] = useState("");
  const [result, setResult] = useState<ROIResult | null>(null);

  const canCalculate = useMemo(() => {
    const vStr = visitors.trim();
    const oStr = orders.trim();
    const aStr = aov.trim();
    if (vStr === "" || oStr === "" || aStr === "") return false;
    const v = Number(vStr);
    const o = Number(oStr);
    const a = Number(aStr);
    return (
      Number.isFinite(v) &&
      v >= 0 &&
      Number.isFinite(o) &&
      o >= 0 &&
      Number.isFinite(a) &&
      a >= 0
    );
  }, [visitors, orders, aov]);

  const monthlyROIDisplay =
    result === null
      ? "—"
      : result.monthlyROIPercent !== null
        ? `${result.monthlyROIPercent.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}%`
        : result.subscriptionCost === 0
          ? "N/A"
          : "—";
  const monthlyROISubtext =
    result === null
      ? "Fill in all fields and click Calculate"
      : result.subscriptionCost === 0
        ? "No monthly cost on the Free plan"
        : result.subscriptionCost === null
          ? "Talk to sales for enterprise pricing"
          : "Unlock Additional Sales Now";

  const handleCalculate = () => {
    if (!canCalculate) return;
    const v = Math.floor(Number(visitors.trim()));
    const o = Math.floor(Number(orders.trim()));
    const a = Math.round(Number(aov.trim()) * 100) / 100;
    setVisitors(String(v));
    setOrders(String(o));
    setAov(String(a));
    setResult(calculateROI(v, o, a));
  };

  return (
    <section
      className="roi-calculator-bg w-full min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 overflow-x-hidden"
      aria-label="ROI Calculator"
    >
      {/* Zipchat-style: single full-width block with greenish glass background */}
      <div
        className="container mx-auto px-4 sm:px-6 rounded-2xl sm:rounded-3xl border border-white/10 py-8 sm:py-10 lg:py-12 backdrop-blur-md"
        style={{
          background: "rgba(11, 60, 47, 0.12)",
          boxShadow: "0 4px 24px -4px rgba(2, 223, 166, 0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16 items-stretch lg:items-start">
          {/* Left: Inputs (Zipchat-style) */}
          <div className="w-full lg:max-w-md flex flex-col justify-center">
            <label
              htmlFor="roi-visitors"
              className="text-sm font-normal text-muted-foreground mb-1.5 block"
            >
              Enter the number of store visitors per month:
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-primary/40">
              <RefreshCw className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden />
              <input
                id="roi-visitors"
                type="number"
                min={0}
                step={1000}
                value={visitors}
                placeholder="e.g. 50000"
                onChange={(e) => {
                  setVisitors(e.target.value);
                  setResult(null);
                }}
                className="w-full min-h-[44px] bg-transparent text-foreground placeholder:text-muted-foreground/60 px-2 py-2 text-base focus:outline-none"
              />
            </div>

            <label
              htmlFor="roi-orders"
              className="text-sm font-normal text-muted-foreground mb-1.5 block"
            >
              Enter the number of orders you generate per month:
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2 mb-4 focus-within:ring-2 focus-within:ring-primary/40">
              <Receipt className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden />
              <input
                id="roi-orders"
                type="number"
                min={0}
                step={1}
                value={orders}
                placeholder="e.g. 200"
                onChange={(e) => {
                  setOrders(e.target.value);
                  setResult(null);
                }}
                className="w-full min-h-[44px] bg-transparent text-foreground placeholder:text-muted-foreground/60 px-2 py-2 text-base focus:outline-none"
              />
            </div>

            <label
              htmlFor="roi-aov"
              className="text-sm font-normal text-muted-foreground mb-1.5 block"
            >
              What is your store&apos;s Average Order Value (AOV)?
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2 mb-6 focus-within:ring-2 focus-within:ring-primary/40">
              <DollarSign className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden />
              <input
                id="roi-aov"
                type="number"
                min={0}
                step={1}
                value={aov}
                placeholder="e.g. 50"
                onChange={(e) => {
                  setAov(e.target.value);
                  setResult(null);
                }}
                className="w-full min-h-[44px] bg-transparent text-foreground placeholder:text-muted-foreground/60 px-2 py-2 text-base focus:outline-none"
              />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCalculate();
              }}
              className="sm:inline"
            >
              <Button
                type="submit"
                disabled={!canCalculate}
                className="cta-button min-h-[44px] rounded-xl px-6 py-3 text-base font-normal w-full sm:w-auto"
                aria-label="Calculate ROI"
              >
              <Calculator className="w-5 h-5 mr-2" aria-hidden />
              Calculate
              </Button>
            </form>
          </div>

          {/* Right: Results cards (Zipchat-style) */}
          <div className="w-full lg:flex-1 flex flex-col gap-4 max-w-xl lg:max-w-none">
            {/* Card 1: Metrics */}
            <div
              className="rounded-2xl lg:rounded-3xl border border-border p-6 sm:p-8 shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, rgba(11, 60, 47, 0.25) 0%, rgba(2, 223, 166, 0.08) 100%)",
              }}
            >
              <ul className="space-y-4">
                <li className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-muted-foreground text-sm flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-primary" aria-hidden />
                    Conversations per month:
                  </span>
                  <span className="text-lg font-normal text-foreground tabular-nums">
                    {result === null
                      ? "—"
                      : formatNumber(result.conversationsPerMonth)}
                  </span>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-muted-foreground text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" aria-hidden />
                    Potential additional sales:
                  </span>
                  <span className="text-lg font-normal text-foreground tabular-nums">
                    {result === null ? "—" : result.potentialAdditionalSales}
                  </span>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-muted-foreground text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" aria-hidden />
                    Potential AOV from Aurevia sales:
                  </span>
                  <span className="text-lg font-normal text-foreground tabular-nums">
                    {result === null
                      ? "—"
                      : `$${result.potentialAOVFromAurevia.toFixed(2)}`}
                  </span>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-muted-foreground text-sm flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-primary" aria-hidden />
                    Additional unlock sales from Aurevia:
                  </span>
                  <span className="text-lg font-normal text-foreground tabular-nums">
                    {result === null
                      ? "—"
                      : `$${result.additionalUnlockSales.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`}
                  </span>
                </li>
                <li className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-muted-foreground text-sm flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" aria-hidden />
                    Subscription cost:
                  </span>
                  <span className="text-lg font-normal text-primary tabular-nums">
                    {result === null
                      ? "—"
                      : result.subscriptionCost !== null
                        ? `$${result.subscriptionCost.toFixed(2)}`
                        : "Contact us"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Card 2: Monthly ROI (Zipchat-style) */}
            <div
              className="rounded-2xl lg:rounded-3xl border border-border p-6 sm:p-8 shadow-lg flex flex-col items-center text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(11, 60, 47, 0.2) 0%, rgba(2, 223, 166, 0.06) 100%)",
              }}
            >
              <p className="text-base font-normal text-foreground mb-2">
                Monthly ROI:
              </p>
              <p className="text-4xl sm:text-5xl font-normal text-foreground tabular-nums mb-2">
                {monthlyROIDisplay}
              </p>
              <p className="text-sm text-muted-foreground">
                {monthlyROISubtext}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
