/**
 * Aurevia pricing model for the ROI calculator.
 * AI messages ≈ visitors × 0.5 (a shopper who opens the chat sends a few messages; most visitors never open it).
 * Plans (monthly, billed through Shopify): Starter $19 / 500 msgs · Growth $49 / 1,500 · Pro $89 / 3,000 · Scale $149 / 6,000.
 * Beyond Scale: top-ups at $10 per 250 messages. Above ~20k messages we quote a custom plan.
 */

export interface PricingResult {
  aiMessages: number;
  planName: string;
  monthlyCost: number | null; // null = "Contact us"
  costPerVisitor: number | null;
}

const PLANS = [
  { name: "Starter", monthly: 19, messages: 500 },
  { name: "Growth", monthly: 49, messages: 1500 },
  { name: "Pro", monthly: 89, messages: 3000 },
  { name: "Scale", monthly: 149, messages: 6000 },
] as const;

const TOPUP_PRICE = 10;
const TOPUP_MESSAGES = 250;
const CUSTOM_ABOVE = 20000;

export function getPricing(visitors: number): PricingResult {
  const clamped = Math.max(0, Math.floor(Number(visitors) || 0));
  const aiMessages = Math.round(clamped * 0.5);
  const perVisitor = (cost: number) => (clamped > 0 ? Math.round((cost / clamped) * 10000) / 10000 : null);

  if (aiMessages > CUSTOM_ABOVE) {
    return { aiMessages, planName: "Custom", monthlyCost: null, costPerVisitor: null };
  }

  const plan = PLANS.find((p) => aiMessages <= p.messages);
  if (plan) {
    return { aiMessages, planName: plan.name, monthlyCost: plan.monthly, costPerVisitor: perVisitor(plan.monthly) };
  }

  // Scale plus top-ups for the overage
  const scale = PLANS[PLANS.length - 1];
  const topups = Math.ceil((aiMessages - scale.messages) / TOPUP_MESSAGES);
  const monthlyCost = scale.monthly + topups * TOPUP_PRICE;
  return { aiMessages, planName: "Scale + top-ups", monthlyCost, costPerVisitor: perVisitor(monthlyCost) };
}
