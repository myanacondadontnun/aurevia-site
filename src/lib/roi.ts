/**
 * ROI calculation model matching Zipchat-style:
 * - Conversations = visitors × 1.5% (e.g. 50k → 750)
 * - Potential additional sales = conversations × ~4.27% (e.g. 750 → 32)
 * - AOV uplift 1.1x for AI-assisted sales (e.g. $50 → $55)
 * - Additional unlock sales = additional sales × uplifted AOV
 * - Monthly ROI % = (additional unlock sales - subscription cost) / subscription cost × 100
 */
import { getPricing } from "./pricing";

const CONVERSIONS_RATE = 0.015; // 1.5% of visitors become conversations (50k → 750)
const CONVERSION_TO_SALE_RATE = 32 / 750; // ~4.27% of conversations convert to additional sales
const AOV_UPLIFT = 1.1; // AI-assisted sales often have higher AOV (50 → 55)

export interface ROIResult {
  conversationsPerMonth: number;
  potentialAdditionalSales: number;
  potentialAOVFromAurevia: number;
  additionalUnlockSales: number;
  subscriptionCost: number | null;
  monthlyROIPercent: number | null; // null when no cost or contact us
  aiMessages: number;
  planName: string;
}

export function calculateROI(
  visitors: number,
  _ordersPerMonth: number,
  aov: number
): ROIResult {
  const v = Math.max(0, Math.floor(Number(visitors) || 0));
  const storeAOV = Math.max(0, Number(aov) || 0);

  const pricing = getPricing(v);
  const conversationsPerMonth = Math.round(v * CONVERSIONS_RATE);
  const potentialAdditionalSales = Math.round(
    conversationsPerMonth * CONVERSION_TO_SALE_RATE
  );
  const potentialAOVFromAurevia = Math.round(storeAOV * AOV_UPLIFT * 100) / 100;
  const additionalUnlockSales =
    Math.round(
      potentialAdditionalSales * potentialAOVFromAurevia * 100
    ) / 100;

  const subscriptionCost = pricing.monthlyCost;

  let monthlyROIPercent: number | null = null;
  if (
    subscriptionCost !== null &&
    subscriptionCost > 0 &&
    Number.isFinite(additionalUnlockSales)
  ) {
    monthlyROIPercent =
      Math.round(
        ((additionalUnlockSales - subscriptionCost) / subscriptionCost) * 10000
      ) / 100;
  }
  // When cost is 0 (free plan), ROI is infinite — UI can show "Infinite" or "—"

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
