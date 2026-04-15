/**
 * ROI calculation model:
 * - Conversations = visitors × 1.5%
 * - Baseline conversion rate = orders ÷ visitors, bounded to a sensible range
 * - AI-assisted conversion rate = max(baseline, benchmark) × uplift, capped
 * - Potential additional sales = conversations × AI-assisted conversion rate
 * - AOV uplift = current AOV × 1.1
 * - Additional unlock sales = additional sales × uplifted AOV
 * - Monthly ROI % = (additional unlock sales - subscription cost) / subscription cost × 100
 */
import { getPricing } from "./pricing";

const CONVERSATIONS_RATE = 0.015; // 1.5% of visitors become AI-assisted conversations
const BENCHMARK_CONVERSION_RATE = 0.02; // Use a modest ecommerce benchmark when baseline is sparse
const AI_ASSISTED_CONVERSION_UPLIFT = 1.5; // Engaged shoppers should convert better than baseline
const MIN_ASSISTED_CONVERSION_RATE = 0.01;
const MAX_ASSISTED_CONVERSION_RATE = 0.06;
const AOV_UPLIFT = 1.1; // AI-assisted sales often have higher AOV (50 → 55)

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

export interface ROIResult {
  conversationsPerMonth: number;
  potentialAdditionalSales: number;
  potentialAOVFromAurevia: number;
  additionalUnlockSales: number;
  subscriptionCost: number | null;
  monthlyROIPercent: number | null; // null when there is no meaningful paid-plan ROI %
  aiMessages: number;
  planName: string;
}

export function calculateROI(
  visitors: number,
  ordersPerMonth: number,
  aov: number
): ROIResult {
  const v = Math.max(0, Math.floor(Number(visitors) || 0));
  const monthlyOrders = Math.max(0, Math.floor(Number(ordersPerMonth) || 0));
  const storeAOV = Math.max(0, Number(aov) || 0);

  const pricing = getPricing(v);
  const conversationsPerMonth = Math.min(v, Math.round(v * CONVERSATIONS_RATE));
  const baselineConversionRate =
    v > 0 ? clamp(monthlyOrders / v, 0, 1) : 0;
  const assistedConversionRate = clamp(
    Math.max(baselineConversionRate, BENCHMARK_CONVERSION_RATE) *
      AI_ASSISTED_CONVERSION_UPLIFT,
    MIN_ASSISTED_CONVERSION_RATE,
    MAX_ASSISTED_CONVERSION_RATE
  );
  const potentialAdditionalSales = Math.min(
    conversationsPerMonth,
    Math.round(conversationsPerMonth * assistedConversionRate)
  );
  const potentialAOVFromAurevia = roundCurrency(storeAOV * AOV_UPLIFT);
  const additionalUnlockSales = roundCurrency(
    potentialAdditionalSales * potentialAOVFromAurevia
  );

  const subscriptionCost = pricing.monthlyCost;

  let monthlyROIPercent: number | null = null;
  if (
    subscriptionCost !== null &&
    subscriptionCost > 0 &&
    Number.isFinite(additionalUnlockSales)
  ) {
    monthlyROIPercent = roundCurrency(
      ((additionalUnlockSales - subscriptionCost) / subscriptionCost) * 100
    );
  }
  // Free-plan and contact-us states do not have a meaningful ROI percentage to display.

  return {
    conversationsPerMonth,
    potentialAdditionalSales,
    potentialAOVFromAurevia,
    additionalUnlockSales,
    subscriptionCost,
    monthlyROIPercent,
    aiMessages: pricing.aiMessages,
    planName: pricing.planName,
  };
}
