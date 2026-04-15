"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const TOOLTIP_LABELS: Record<string, string> = {
  proactive: "Proactive engagement",
  autonomous: "Autonomous sales resolution",
  catalog: "Catalog & Shopify depth",
  pricing: "Pricing value / predictability",
  analytics: "Revenue analytics & attribution",
  checkout: "Guided checkout & funnel",
};

type RadarRow = {
  axis: string;
  key: keyof typeof TOOLTIP_LABELS;
  Aurevia: number;
  Zipchat: number;
  Tidio: number;
  Gorgias: number;
};

const TOP_FOUR_DATA: RadarRow[] = [
  { axis: "Proactive", key: "proactive", Aurevia: 98, Zipchat: 88, Tidio: 32, Gorgias: 22 },
  { axis: "Autonomous", key: "autonomous", Aurevia: 96, Zipchat: 90, Tidio: 38, Gorgias: 35 },
  { axis: "Catalog", key: "catalog", Aurevia: 95, Zipchat: 82, Tidio: 45, Gorgias: 78 },
  { axis: "Pricing", key: "pricing", Aurevia: 98, Zipchat: 42, Tidio: 48, Gorgias: 40 },
  { axis: "Analytics", key: "analytics", Aurevia: 94, Zipchat: 62, Tidio: 52, Gorgias: 68 },
  { axis: "Checkout", key: "checkout", Aurevia: 98, Zipchat: 58, Tidio: 18, Gorgias: 12 },
];

type BroadRow = {
  axis: string;
  key: keyof typeof TOOLTIP_LABELS;
  Aurevia: number;
  Zipchat: number;
  Meetanshi: number;
  Tidio: number;
  Gorgias: number;
};

/** Spectrum: niche engine → helpdesk → hybrid → sales vanguard → Aurevia */
const BROAD_MARKET_DATA: BroadRow[] = [
  { axis: "Proactive", key: "proactive", Aurevia: 98, Zipchat: 88, Meetanshi: 28, Tidio: 32, Gorgias: 22 },
  { axis: "Autonomous", key: "autonomous", Aurevia: 96, Zipchat: 90, Meetanshi: 35, Tidio: 38, Gorgias: 35 },
  { axis: "Catalog", key: "catalog", Aurevia: 95, Zipchat: 82, Meetanshi: 72, Tidio: 45, Gorgias: 78 },
  { axis: "Pricing", key: "pricing", Aurevia: 98, Zipchat: 42, Meetanshi: 70, Tidio: 48, Gorgias: 40 },
  { axis: "Analytics", key: "analytics", Aurevia: 94, Zipchat: 62, Meetanshi: 38, Tidio: 52, Gorgias: 68 },
  { axis: "Checkout", key: "checkout", Aurevia: 98, Zipchat: 58, Meetanshi: 25, Tidio: 18, Gorgias: 12 },
];

const COLORS = {
  Aurevia: "#02DFA6",
  Zipchat: "#38bdf8",
  Tidio: "#fbbf24",
  Gorgias: "#c084fc",
  Meetanshi: "#fb923c",
} as const;

type TooltipPayloadItem = {
  name?: string;
  value?: number;
  dataKey?: string | number;
  payload?: { key?: string };
};

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload as { key?: string } | undefined;
  const key = row?.key;
  const full = key && key in TOOLTIP_LABELS ? TOOLTIP_LABELS[key as keyof typeof TOOLTIP_LABELS] : label;
  return (
    <div className="rounded-lg border border-white/10 bg-[#0d1717]/95 px-3 py-2 text-xs shadow-xl backdrop-blur-sm">
      <p className="mb-1.5 font-medium text-white">{full}</p>
      <ul className="space-y-0.5 text-muted-foreground">
        {payload
          .filter((p): p is TooltipPayloadItem & { value: number; name: string } =>
            typeof p.value === "number" && typeof p.name === "string",
          )
          .sort((a, b) => b.value - a.value)
          .map((p) => (
            <li key={p.name} className="flex justify-between gap-4">
              <span style={{ color: COLORS[p.name as keyof typeof COLORS] ?? "#fff" }}>{p.name}</span>
              <span className="font-mono text-white/90">{p.value}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

function SpiderBlock({
  title,
  subtitle,
  data,
  keys,
}: {
  title: string;
  subtitle: string;
  data: Record<string, string | number>[];
  keys: { key: string; color: string }[];
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/40 p-4 sm:p-6 backdrop-blur-sm">
      <div className="mb-4">
        <h3 className="text-lg font-normal text-white sm:text-xl">{title}</h3>
        <p className="mt-1 text-sm font-light text-muted-foreground">{subtitle}</p>
      </div>
      <div className="h-[320px] w-full min-h-[280px] min-w-0 sm:h-[380px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          initialDimension={{ width: 360, height: 320 }}
        >
          <RadarChart cx="50%" cy="50%" outerRadius="72%" data={data}>
            <PolarGrid stroke="hsl(0 0% 20%)" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: "hsl(0 0% 64%)", fontSize: 11 }}
              tickLine={false}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "hsl(0 0% 45%)", fontSize: 9 }}
              tickCount={5}
            />
            {keys.map(({ key, color }) => (
              <Radar
                key={key}
                name={key}
                dataKey={key}
                stroke={color}
                fill={color}
                fillOpacity={key === "Aurevia" ? 0.22 : 0.08}
                strokeWidth={key === "Aurevia" ? 2 : 1.2}
                dot={{ r: 2, fill: color, strokeWidth: 0 }}
              />
            ))}
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 16, fontSize: 12 }}
              formatter={(value) => (
                <span className="text-muted-foreground" style={{ color: COLORS[value as keyof typeof COLORS] }}>
                  {value}
                </span>
              )}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function AIRadarChart() {
  const topKeys = [
    { key: "Aurevia", color: COLORS.Aurevia },
    { key: "Zipchat", color: COLORS.Zipchat },
    { key: "Tidio", color: COLORS.Tidio },
    { key: "Gorgias", color: COLORS.Gorgias },
  ];

  const broadKeys = [
    { key: "Aurevia", color: COLORS.Aurevia },
    { key: "Zipchat", color: COLORS.Zipchat },
    { key: "Meetanshi", color: COLORS.Meetanshi },
    { key: "Tidio", color: COLORS.Tidio },
    { key: "Gorgias", color: COLORS.Gorgias },
  ];

  return (
    <section id="spider-charts" className="scroll-mt-28 scroll-fade visible" aria-labelledby="radar-heading">
      <h2 id="radar-heading" className="mb-2 text-2xl font-normal text-white sm:text-3xl">
        Spider diagrams: capability profiles
      </h2>
      <p className="mb-8 max-w-3xl text-base font-light text-muted-foreground">
        Scores are editorial summaries based on architecture (proactive vs reactive), depth of Shopify
        integration, checkout orchestration, analytics, and total cost of ownership — not third-party
        benchmarks.
      </p>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SpiderBlock
          title="Top contenders"
          subtitle="Aurevia vs Zipchat vs Tidio (Lyro) vs Gorgias — where each wins on paper."
          data={TOP_FOUR_DATA}
          keys={topKeys}
        />
        <SpiderBlock
          title="Full market spectrum"
          subtitle="From helpdesk titan to niche recommendation engine to sales vanguard — same six axes."
          data={BROAD_MARKET_DATA}
          keys={broadKeys}
        />
      </div>
    </section>
  );
}
