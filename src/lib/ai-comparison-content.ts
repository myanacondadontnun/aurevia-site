/** Editorial 0–100 scores for mini progress bars on listicle cards */
export type AgentMetrics = {
  proactive: number;
  autonomous: number;
  salesFocus: number;
};

export type ListicleAgent = {
  rank: number;
  name: string;
  philosophy: string;
  strength: string;
  limitation: string;
  price: string;
  metrics: AgentMetrics;
  winner?: boolean;
};

export type TierSection = {
  id: string;
  tierLabel: string;
  title: string;
  blurb: string;
  agents: ListicleAgent[];
};

export const TIER_SECTIONS: TierSection[] = [
  {
    id: "tier-helpdesk",
    tierLabel: "Tier 1",
    title: "Omnichannel helpdesk titans",
    blurb:
      "Enterprise-grade inboxes built for tickets, SLAs, and post-purchase logistics — AI skews toward drafting and deflection, not closing carts.",
    agents: [
      {
        rank: 1,
        name: "Gorgias",
        philosophy: "High-volume unified helpdesk for Shopify power users.",
        strength: "Deep order actions inside chat (refunds, discounts, shipping edits).",
        limitation: "Support-first DNA; steep learning curve; AI ~60% automation vs specialized bots.",
        price: "From $10/mo (scales fast)",
        metrics: { proactive: 22, autonomous: 35, salesFocus: 28 },
      },
      {
        rank: 2,
        name: "Zendesk",
        philosophy: "Industry-agnostic enterprise CRM + AI answers.",
        strength: "Global scale, analytics, knowledge-base automations.",
        limitation: "Not native e-commerce sales; pricing climbs at scale.",
        price: "From $19–$25/mo",
        metrics: { proactive: 25, autonomous: 38, salesFocus: 30 },
      },
      {
        rank: 3,
        name: "Intercom",
        philosophy: "Conversational support + unified customer data.",
        strength: "Strong enterprise messaging and CDP story.",
        limitation: "Custom pricing; support-heavy; weak out-of-the-box Shopify sales plays.",
        price: "Custom quote",
        metrics: { proactive: 30, autonomous: 40, salesFocus: 32 },
      },
      {
        rank: 4,
        name: "Re:amaze",
        philosophy: "Middle-ground inbox + workflows + Shopify sync.",
        strength: "Unified inbox, respectable 4.6/5 ratings, automation.",
        limitation: "Still helpdesk-first; limited autonomous sales AI.",
        price: "From $26.10/mo",
        metrics: { proactive: 35, autonomous: 42, salesFocus: 38 },
      },
    ],
  },
  {
    id: "tier-hybrids",
    tierLabel: "Tier 2",
    title: "Mass-market chat hybrids",
    blurb:
      "Friendly UIs and quick deploys — but many lean reactive, scripted, or pay-per-conversation as you scale.",
    agents: [
      {
        rank: 5,
        name: "Tidio (Lyro)",
        philosophy: "Popular live chat + Lyro AI for FAQs and policies.",
        strength: "4.7/5 on Shopify; multilingual; Lyro Guidance for brand tone.",
        limitation: "Reactive; hybrid handoffs; usage spikes = surprise bills.",
        price: "From $24.17/mo + ~$0.50/conv",
        metrics: { proactive: 32, autonomous: 40, salesFocus: 36 },
      },
      {
        rank: 6,
        name: "Formilla",
        philosophy: "Live chat + light AI for small stores.",
        strength: "Free tier; visitor monitoring; simple setup.",
        limitation: "No deep catalog ingestion for autonomous selling.",
        price: "From $13.99/mo",
        metrics: { proactive: 25, autonomous: 28, salesFocus: 30 },
      },
      {
        rank: 7,
        name: "ChatBot.com",
        philosophy: "No-code flows with e-commerce templates.",
        strength: "Multichannel + LiveChat integration.",
        limitation: "Decision trees over dynamic generative product matching.",
        price: "From $52/mo",
        metrics: { proactive: 28, autonomous: 35, salesFocus: 34 },
      },
      {
        rank: 8,
        name: "Chatra",
        philosophy: "Small-team live chat + offline capture.",
        strength: "Affordable communication layer.",
        limitation: "Minimal modern LLM / intent depth.",
        price: "From $25/mo",
        metrics: { proactive: 20, autonomous: 22, salesFocus: 25 },
      },
      {
        rank: 9,
        name: "ProProfs Chat",
        philosophy: "Knowledge-base-first support automation.",
        strength: "KB in chat, canned replies, ticketing hooks.",
        limitation: "No revenue features; enterprise pricing is extreme.",
        price: "From $499/mo (paid tiers)",
        metrics: { proactive: 24, autonomous: 32, salesFocus: 18 },
      },
    ],
  },
  {
    id: "tier-niche",
    tierLabel: "Tier 3",
    title: "Specialized niche & emerging tools",
    blurb:
      "Useful wedges — quizzes, social commerce, GPT wrappers — rarely one autonomous revenue stack end-to-end.",
    agents: [
      {
        rank: 10,
        name: "HeyDay",
        philosophy: "Omnichannel + product finder (Hootsuite ecosystem).",
        strength: "Product recommendations; social commerce angle.",
        limitation: "Not a full checkout co-pilot for every SKU workflow.",
        price: "From $30/mo",
        metrics: { proactive: 45, autonomous: 48, salesFocus: 55 },
      },
      {
        rank: 11,
        name: "Gobot",
        philosophy: "Guided quizzes → product picks.",
        strength: "Great for consultative SKUs (beauty, nutrition).",
        limitation: "Quiz friction; limited open-ended generative chat.",
        price: "Custom pricing",
        metrics: { proactive: 40, autonomous: 42, salesFocus: 52 },
      },
      {
        rank: 12,
        name: "Zowie",
        philosophy: "Enterprise deflection from store data.",
        strength: "Instant answers at scale for support centers.",
        limitation: "Quote-based; overkill for typical Shopify SMBs.",
        price: "Custom quote",
        metrics: { proactive: 38, autonomous: 55, salesFocus: 40 },
      },
      {
        rank: 13,
        name: "Jasper Chat",
        philosophy: "Content & workflow AI — not a storefront bot.",
        strength: "Marketing copy and ops automation.",
        limitation: "No native real-time inventory / cart orchestration.",
        price: "From $59/mo",
        metrics: { proactive: 30, autonomous: 35, salesFocus: 28 },
      },
      {
        rank: 14,
        name: "Meetanshi (MIT AI)",
        philosophy: "Recommendations from real-time understanding.",
        strength: "Solid product suggestions for Shopify.",
        limitation: "Lacks apex analytics, A/B infra, proactive triggers.",
        price: "Varies",
        metrics: { proactive: 28, autonomous: 40, salesFocus: 58 },
      },
      {
        rank: 15,
        name: "SmartBot",
        philosophy: "GPT support trained on catalog + order tracking.",
        strength: "24/7 assistance; personalized picks.",
        limitation: "Reported stock hallucinations — trust risk at checkout.",
        price: "Free tier available",
        metrics: { proactive: 42, autonomous: 62, salesFocus: 50 },
      },
      {
        rank: 16,
        name: "VanChat",
        philosophy: "AI shopping assistant around buyer intent.",
        strength: "Intent-aware suggestions; pushes toward unassisted closes.",
        limitation: "Weaker vs leaders on upsell customization / omnichannel.",
        price: "Free tier available",
        metrics: { proactive: 55, autonomous: 70, salesFocus: 62 },
      },
      {
        rank: 17,
        name: "Moose",
        philosophy: "Free-leaning helpdesk + inbox.",
        strength: "Generous free plan; unified inbox.",
        limitation: "Multi-device gaps; fewer enterprise features.",
        price: "Free tier",
        metrics: { proactive: 30, autonomous: 38, salesFocus: 35 },
      },
      {
        rank: 18,
        name: "Willdesk",
        philosophy: "Budget AI + live chat for small catalogs.",
        strength: "Low cost; simple AI assist.",
        limitation: "Heavy catalogs = long training; occasional overage fees.",
        price: "Budget tiers",
        metrics: { proactive: 32, autonomous: 45, salesFocus: 40 },
      },
      {
        rank: 19,
        name: "Wizybot",
        philosophy: "ChatGPT-4 quick-install conversations.",
        strength: "Natural tone; fast onboarding.",
        limitation: "Light sales widgets / CRM; hallucination risk if untrained.",
        price: "Varies",
        metrics: { proactive: 40, autonomous: 50, salesFocus: 48 },
      },
      {
        rank: 20,
        name: "Relish.ai",
        philosophy: "GPT shopping assistant + Klaviyo/Recharge hooks.",
        strength: "Support + sales automations in one lane.",
        limitation: "$29–$599/mo spread hurts predictability.",
        price: "$29–$599/mo",
        metrics: { proactive: 52, autonomous: 65, salesFocus: 60 },
      },
    ],
  },
  {
    id: "tier-vanguard",
    tierLabel: "Tier 4",
    title: "Proactive sales vanguard",
    blurb:
      "Built to turn traffic into revenue — behavioral triggers, autonomous threads, and fewer human bottlenecks.",
    agents: [
      {
        rank: 21,
        name: "Zipchat AI",
        philosophy: "Dedicated revenue AI — proactive nudges on hesitation signals.",
        strength: "4.8/5 buzz; behavioral triggers; WhatsApp; catalog sync.",
        limitation: "$49/mo floor, no permanent free tier; 'final mile' checkout gap vs guided flow.",
        price: "From $49/mo",
        metrics: { proactive: 88, autonomous: 90, salesFocus: 92 },
      },
      {
        rank: 22,
        name: "Aurevia.io",
        philosophy: "24/7 AI sales co-pilot — flip paid traffic into measurable revenue.",
        strength:
          "Guided checkout flow, cart/checkout/thank-you upsells, attribution + A/B, aggressive flat/free entry.",
        limitation: "Newer brand vs incumbents — win on product, not legacy logo.",
        price: "Free pilot (200 msgs) · Pro ~$9.99/mo",
        metrics: { proactive: 98, autonomous: 96, salesFocus: 98 },
        winner: true,
      },
    ],
  },
];

/** Table 1 — Helpdesk titans */
export const TABLE_HELPDESK = {
  headers: ["Platform", "Primary architecture", "Core strength", "Key limitation", "Starting price"],
  rows: [
    ["Gorgias", "Unified helpdesk", "Deep Shopify order actions", "Steep curve; expensive at scale", "$10/mo"],
    ["Zendesk", "Enterprise CRM", "Global analytics", "High cost; not sales-native", "$19–$25/mo"],
    ["Intercom", "Conversational support", "Unified customer data", "Custom pricing; support-heavy", "Custom quote"],
    ["Re:amaze", "Hybrid helpdesk", "Workflow automation", "Limited autonomous sales AI", "$26.10/mo"],
  ],
};

/** Table 2 — Chat hybrids */
export const TABLE_HYBRIDS = {
  headers: ["Platform", "AI application", "Engagement style", "Key limitation", "Starting price"],
  rows: [
    ["Tidio (Lyro)", "Generative support", "Reactive", "Pay-per-conversation; reactive", "$24.17/mo"],
    ["Formilla", "Basic automation", "Reactive", "Shallow catalog ingestion", "$13.99/mo"],
    ["ChatBot.com", "Decision trees", "Reactive / scripted", "Manual flow building", "$52/mo"],
    ["Chatra", "Live chat focus", "Reactive", "Minimal AI", "$25/mo"],
    ["ProProfs", "Knowledge-base sync", "Reactive", "No sales features; very high cost", "$499/mo"],
  ],
};

/** Table 3 — Proactive tier */
export const TABLE_VANGUARD = {
  headers: [
    "Platform",
    "Core philosophy",
    "Proactive engagement",
    "Autonomous resolution",
    "Starting price",
    "Major drawback",
  ],
  rows: [
    ["Meetanshi", "Recommendation engine", "Low", "Partial", "Varies", "Lacks advanced analytics"],
    ["SmartBot", "24/7 AI support", "Moderate", "High", "Free tier", "Stock hallucinations reported"],
    ["VanChat", "Buyer intent analysis", "Moderate", "High", "Free tier", "Limited upsell customization"],
    ["Zipchat AI", "Revenue generation", "High (behavioral)", "Full", "$49/mo", "No free tier; high base cost"],
  ],
};

export type FeatureMatrixRow = {
  feature: string;
  aurevia: string | boolean;
  zipchat: string | boolean;
  tidio: string | boolean;
  gorgias: string | boolean;
};

/** eesel-style “at a glance” table — six tools readers care about first */
export const QUICK_COMPARISON = {
  headers: ["Tool", "Best for", "Starting price", "Key differentiator"],
  rows: [
    [
      "Aurevia.io",
      "Autonomous Shopify sales + guided checkout + flat pricing",
      "Free pilot (200 AI msgs) · Pro from ~$9.99/mo",
      "Full-funnel upsells (cart, checkout, post-purchase) with revenue attribution & A/B tests",
    ],
    [
      "Zipchat AI",
      "Stores that want proactive behavioral nudges without a helpdesk migration",
      "From $49/mo (no permanent free tier)",
      "Strong behavioral triggers + WhatsApp; conversation-first, lighter on checkout orchestration",
    ],
    [
      "Tidio (Lyro)",
      "SMBs wanting live chat + AI deflection in one dashboard",
      "From $24.17/mo + usage (e.g. Lyro per-conversation)",
      "Lyro Guidance + flows; watch for reactive posture and billing spikes on promos",
    ],
    [
      "Gorgias",
      "High-volume brands optimizing tickets, SLAs, and order edits",
      "From $10/mo (ramps quickly with tickets/AI add-ons)",
      "Best-in-class helpdesk + deep Shopify order actions — not a native front-end sales engine",
    ],
    [
      "Re:amaze",
      "Teams wanting a straightforward multi-channel inbox on Shopify",
      "From $26.10/mo",
      "Unified inbox + workflows; still skews support over autonomous GMV",
    ],
    [
      "VanChat",
      "Merchants testing AI shopping assistants with buyer-intent scoring",
      "Free tier available (paid tiers vary)",
      "Promising intent analysis; less depth than leaders on upsell customization & stack consolidation",
    ],
  ],
};

export const FEATURE_MATRIX: FeatureMatrixRow[] = [
  {
    feature: "Primary core function",
    aurevia: "Autonomous sales & guided checkout",
    zipchat: "Proactive sales engagement",
    tidio: "Reactive ticket deflection",
    gorgias: "High-volume helpdesk",
  },
  {
    feature: "Catalog digestion",
    aurevia: "Full, automated in minutes",
    zipchat: "Real-time catalog sync",
    tidio: "Manual training required",
    gorgias: "Limited / rule-based",
  },
  {
    feature: "Guided checkout flow",
    aurevia: true,
    zipchat: "Partial (recommendations)",
    tidio: false,
    gorgias: false,
  },
  {
    feature: "Intelligent upsell architecture",
    aurevia: "Cart, checkout & post-purchase",
    zipchat: "Conversational cross-sell",
    tidio: false,
    gorgias: false,
  },
  {
    feature: "Entry pricing model",
    aurevia: "Free tier (200 msgs) / ~$9.99 Pro",
    zipchat: "$49 / month",
    tidio: "$24.17 / month (plus limits)",
    gorgias: "$10 / month (scales rapidly)",
  },
  {
    feature: "Analytics & attribution",
    aurevia: "Revenue attribution & A/B testing",
    zipchat: "Basic ROI tracking",
    tidio: "Resolution-rate focus",
    gorgias: "SLA & ticket metrics focus",
  },
];
