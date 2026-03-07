/**
 * Aurevia pricing: AI messages = visitors × 0.5
 * Tiers: 0-5k free; 5k-50k $49 + $15/1k; 50k-150k $99 + $13/1k; >150k contact us
 */
export interface PricingResult {
  aiMessages: number;
  planName: string;
  monthlyCost: number | null; // null = "Contact us"
  costPerVisitor: number | null;
}

export function getPricing(visitors: number): PricingResult {
  const clamped = Math.max(0, Math.floor(Number(visitors) || 0));
  const aiMessages = clamped * 0.5;

  if (clamped < 5000) {
    return {
      aiMessages,
      planName: "Free",
      monthlyCost: 0,
      costPerVisitor: clamped > 0 ? 0 : null,
    };
  }

  if (clamped < 50000) {
    const base = 49;
    const messageCost = (aiMessages / 1000) * 15;
    const monthlyCost = Math.round((base + messageCost) * 100) / 100;
    return {
      aiMessages,
      planName: "Growth",
      monthlyCost,
      costPerVisitor: clamped > 0 ? Math.round((monthlyCost / clamped) * 10000) / 10000 : null,
    };
  }

  if (clamped <= 150000) {
    // 50,000–150,000: Scale
    const base = 99;
    const messageCost = (aiMessages / 1000) * 13;
    const monthlyCost = Math.round((base + messageCost) * 100) / 100;
    return {
      aiMessages,
      planName: "Scale",
      monthlyCost,
      costPerVisitor: clamped > 0 ? Math.round((monthlyCost / clamped) * 10000) / 10000 : null,
    };
  }

  return {
    aiMessages,
    planName: "Contact us",
    monthlyCost: null,
    costPerVisitor: null,
  };
}
