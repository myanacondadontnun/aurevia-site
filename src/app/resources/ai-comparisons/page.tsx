import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Bot,
  Check,
  CheckCircle2,
  Headphones,
  LineChart,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { Fragment } from "react";
import PageLayout from "@/components/PageLayout";
import AIRadarChart from "@/components/AIRadarChart";
import AIComparisonListicleLayout from "@/components/ai-comparison/AIComparisonListicleLayout";
import DetailedReviews from "@/components/ai-comparison/DetailedReviews";
import {
  InfographicBenefits,
  InfographicCapabilities,
  InfographicMethodology,
  ListicleHeroVisual,
} from "@/components/ai-comparison/ListicleInfographics";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FEATURE_MATRIX,
  QUICK_COMPARISON,
  TABLE_HELPDESK,
  TABLE_HYBRIDS,
  TABLE_VANGUARD,
  TIER_SECTIONS,
  type AgentMetrics,
  type FeatureMatrixRow,
  type ListicleAgent,
} from "@/lib/ai-comparison-content";
import { SHOPIFY_APP_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shopify AI Sales Agents Compared (2026) | Aurevia",
  description:
    "Listicle-style comparison of Shopify AI chatbots: helpdesk titans, chat hybrids, niche tools, and proactive sales agents — with spider diagrams, tables, and internal guides.",
};

const articleLink =
  "font-medium text-sky-400 underline decoration-sky-400/40 underline-offset-[3px] hover:text-[#00CC99] hover:decoration-[#00CC99]";

function MiniMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] uppercase tracking-wide text-muted-foreground/80 sm:text-[11px]">
        <span>{label}</span>
        <span className="font-mono text-foreground/70">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#00CC99]/70 to-[#00CC99]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MetricBars({ m }: { m: AgentMetrics }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <MiniMetric label="Proactive" value={m.proactive} />
      <MiniMetric label="Autonomous" value={m.autonomous} />
      <MiniMetric label="Sales focus" value={m.salesFocus} />
    </div>
  );
}

function AgentCard({ agent }: { agent: ListicleAgent }) {
  return (
    <Card
      className={`overflow-hidden border transition-all duration-300 ${
        agent.winner
          ? "border-[#00CC99]/50 bg-gradient-to-br from-[#00CC99]/10 via-card/80 to-card shadow-[0_0_40px_-12px_rgba(0,204,153,0.35)]"
          : "border-border/50 bg-card/30 hover:border-[#00CC99]/25"
      }`}
    >
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                agent.winner
                  ? "bg-[#00CC99] text-black"
                  : "border border-border/60 bg-white text-muted-foreground"
              }`}
            >
              {agent.rank}
            </span>
            <div>
              <h3 className="text-lg font-normal text-foreground sm:text-xl">{agent.name}</h3>
              <p className="mt-1 max-w-prose text-sm font-light leading-relaxed text-muted-foreground">
                {agent.philosophy}
              </p>
            </div>
          </div>
          <span className="rounded-full border border-[#00CC99]/25 bg-[#00CC99]/10 px-3 py-1 text-xs font-medium text-[#00CC99]">
            {agent.price}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-md border border-black/10 bg-white px-2.5 py-1 text-xs text-foreground/90">
            <span className="text-[#00CC99]">+ </span>
            {agent.strength}
          </span>
          <span className="rounded-md border border-black/10 bg-white px-2.5 py-1 text-xs text-muted-foreground">
            <span className="text-amber-400/90">− </span>
            {agent.limitation}
          </span>
        </div>
        <MetricBars m={agent.metrics} />
      </CardContent>
    </Card>
  );
}

function ComparisonTable({
  title,
  caption,
  headers,
  rows,
}: {
  title: string;
  caption: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-xl font-normal text-foreground">{title}</h3>
        <p className="mt-1 text-sm font-light text-muted-foreground">{caption}</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border/50 bg-card/20 shadow-inner">
        <table className="min-w-[720px] w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#00CC99]/20 bg-[#00CC99]/[0.07]">
              {headers.map((h, i) => (
                <th
                  key={h}
                  className={`px-4 py-3 font-medium text-foreground/95 ${
                    i === 0 ? "sticky left-0 z-10 bg-[#0a1210]/95 backdrop-blur-sm" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isAurevia = row[0].toLowerCase().includes("aurevia");
              return (
                <tr
                  key={row[0]}
                  className={`border-b border-border/30 transition-colors hover:bg-white ${
                    isAurevia ? "bg-[#00CC99]/[0.06]" : ""
                  }`}
                >
                  {row.map((cell, i) => (
                    <td
                      key={`${row[0]}-${i}`}
                      className={`px-4 py-3 font-light text-muted-foreground ${
                        i === 0
                          ? `sticky left-0 z-10 font-normal text-foreground backdrop-blur-sm ${
                              isAurevia ? "bg-[#061a16]/98" : "bg-background/95"
                            }`
                          : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuickComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/40 bg-background/40">
      <table className="min-w-[640px] w-full border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b border-border/50">
            {QUICK_COMPARISON.headers.map((h) => (
              <th key={h} className="px-4 py-3.5 text-sm font-semibold text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {QUICK_COMPARISON.rows.map((row) => {
            const isAurevia = row[0].toLowerCase().includes("aurevia");
            return (
              <tr
                key={row[0]}
                className={`border-b border-border/30 last:border-0 ${
                  isAurevia ? "bg-[#00CC99]/[0.06]" : "hover:bg-white"
                }`}
              >
                {row.map((cell, i) => (
                  <td
                    key={`${row[0]}-${i}`}
                    className={`px-4 py-3.5 align-top font-light leading-relaxed text-muted-foreground ${
                      i === 0 ? "font-medium text-foreground" : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FeatureCell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center rounded-full bg-[#00CC99]/15 p-1 text-[#00CC99]">
        <Check className="h-4 w-4" aria-hidden />
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center rounded-full bg-white p-1 text-muted-foreground">
        <X className="h-4 w-4" aria-hidden />
        <span className="sr-only">No</span>
      </span>
    );
  }
  return <span className="text-[13px] font-light leading-snug text-muted-foreground">{value}</span>;
}

function FeatureMatrixTable({ rows }: { rows: FeatureMatrixRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#00CC99]/20 bg-card/25">
      <table className="min-w-[800px] w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border/40">
            <th className="sticky left-0 z-20 bg-background/98 px-4 py-4 font-medium text-foreground backdrop-blur-sm">
              Feature / capability
            </th>
            <th className="border-l-2 border-[#00CC99] bg-[#00CC99]/[0.08] px-4 py-4 font-medium text-[#00CC99]">
              Aurevia.io
            </th>
            <th className="px-4 py-4 font-medium text-foreground/90">Zipchat AI</th>
            <th className="px-4 py-4 font-medium text-foreground/90">Tidio (Lyro)</th>
            <th className="px-4 py-4 font-medium text-foreground/90">Gorgias</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-border/25 hover:bg-white">
              <td className="sticky left-0 z-10 bg-background/95 px-4 py-3.5 font-normal text-foreground backdrop-blur-sm">
                {row.feature}
              </td>
              <td className="border-l-2 border-[#00CC99]/60 bg-[#00CC99]/[0.04] px-4 py-3.5">
                <FeatureCell value={row.aurevia} />
              </td>
              <td className="px-4 py-3.5">
                <FeatureCell value={row.zipchat} />
              </td>
              <td className="px-4 py-3.5">
                <FeatureCell value={row.tidio} />
              </td>
              <td className="px-4 py-3.5">
                <FeatureCell value={row.gorgias} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AIComparisonsPage() {
  const agentCount = TIER_SECTIONS.reduce((n, t) => n + t.agents.length, 0);

  return (
    <PageLayout>
      <div className="container mx-auto max-w-[1320px] px-4 sm:px-6">
        <Link
          href="/resources/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-[#00CC99]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Resources
        </Link>

        <AIComparisonListicleLayout>
          <Fragment>
            {/* Hero: no framed box — sits in article column so TOC + CTA stay sticky for full scroll */}
            <header className="mb-10 sm:mb-12">
              <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 text-foreground/90">
                  <span className="font-medium text-foreground">Aurevia Research</span>
                  <span className="text-muted-foreground/60">·</span>
                  Written for merchants
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00CC99]" aria-hidden />
                  Expert verified
                </span>
                <span>Last updated April 2026</span>
              </div>
              <h1 className="max-w-4xl text-3xl font-normal leading-tight text-foreground sm:text-4xl md:text-[2.65rem]">
                The best AI sales agents for Shopify in 2026 (ranked &amp; compared)
              </h1>
              <p className="mt-5 max-w-3xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
                If your inbox is mostly WISMO tickets, a helpdesk-first bot can help. But if your problem is{" "}
                <strong className="font-medium text-foreground/90">paid traffic that does not convert</strong>, you need a
                different species of AI — one that closes the{" "}
                <Link href="/resources/blogs/reduce-checkout-abandonment-shopify/" className={articleLink}>
                  hesitation window
                </Link>{" "}
                before shoppers leave. This guide follows a classic listicle layout: methodology, quick table,
                charts, deep reviews, then the full vendor landscape.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Tools in landscape", value: String(agentCount) },
                  { label: "Deep-dive reviews", value: "6" },
                  { label: "Spider charts", value: "2" },
                  { label: "Internal guides linked", value: "12+" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-black/10 bg-black/20 px-3 py-3 text-center sm:text-left"
                  >
                    <p className="text-xl font-normal text-foreground sm:text-2xl">{s.value}</p>
                    <p className="text-[11px] font-light text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <ListicleHeroVisual />
            </header>

            {/* 1 */}
            <section id="what-makes-great" className="scroll-mt-28">
            <h2 className="text-2xl font-normal text-foreground sm:text-3xl">
              What makes a great AI sales agent for Shopify?
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
              A modern Shopify AI is not a floating script. It should read store context, respect inventory, and
              advance the purchase — the same bar we use when evaluating{" "}
              <Link href="/products/automated-responses/" className={articleLink}>
                automated responses
              </Link>{" "}
              and{" "}
              <Link href="/products/lead-qualification/" className={articleLink}>
                lead qualification
              </Link>{" "}
              products inside Aurevia.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-base font-light leading-relaxed text-muted-foreground">
              <li>Answer product, policy, and compatibility questions with catalog-grounded specificity.</li>
              <li>Recommend bundles and upsells that respect price rules and stock.</li>
              <li>Detect hesitation and respond in-session — not only after someone opens chat.</li>
              <li>Hand off cleanly to humans when the ticket needs empathy or policy exceptions.</li>
            </ul>
            <InfographicCapabilities />
            <h3 className="mt-12 text-lg font-normal text-foreground sm:text-xl">Three architectures you will see</h3>
            <p className="mt-2 max-w-3xl text-sm font-light text-muted-foreground">
              Almost every vendor file into one of these buckets — use it as a shorthand while you scan the tables
              below.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="border-border/50 bg-card/40 transition-all hover:border-[#00CC99]/30">
                <CardContent className="p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00CC99]/10 text-[#00CC99]">
                    <Headphones className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-normal text-foreground">Support-centric</h4>
                  <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                    Tickets, SLAs, refunds — brilliant ops, limited proactive GMV.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/40 transition-all hover:border-[#00CC99]/30">
                <CardContent className="p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00CC99]/10 text-[#00CC99]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-normal text-foreground">Chat hybrids</h4>
                  <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                    Live chat + AI modules — fast deploys, often reactive or operator-heavy.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/40 transition-all hover:border-[#00CC99]/30">
                <CardContent className="p-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00CC99]/10 text-[#00CC99]">
                    <Target className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-normal text-foreground">Proactive sales agents</h4>
                  <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                    Behavioral triggers + autonomous threads — built for conversion and AOV.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <Separator className="my-14 bg-border/30" />

          {/* 2 */}
          <section id="why-you-need" className="scroll-mt-28">
            <h2 className="text-2xl font-normal text-foreground sm:text-3xl">
              Why you need an AI sales layer on Shopify (not only support)
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
              Support automation is table stakes. The upside case is revenue protection: every paid click that
              bounces silently is budget burned. Pair this section with our{" "}
              <Link href="/resources/review-my-shopify/" className={articleLink}>
                store review
              </Link>{" "}
              if you are unsure where friction lives today.
            </p>
            <InfographicBenefits />
            <ul className="mt-6 list-disc space-y-3 pl-5 text-base font-light leading-relaxed text-muted-foreground">
              <li>
                <strong className="font-medium text-foreground">Always-on revenue defense:</strong> shoppers on mobile,
                international time zones, and promo spikes still get guided answers.
              </li>
              <li>
                <strong className="font-medium text-foreground">Higher conversion without more headcount:</strong>{" "}
                compress the gap between intent and checkout — related reading:{" "}
                <Link href="/solutions/conversion/" className={articleLink}>
                  conversion solutions
                </Link>
                .
              </li>
              <li>
                <strong className="font-medium text-foreground">Cleaner ops:</strong> move repetitive product Q&amp;A out
                of email and DMs so humans handle exceptions.
              </li>
            </ul>
          </section>

          <Separator className="my-14 bg-border/30" />

          {/* 3 */}
          <section id="how-we-compared" className="scroll-mt-28">
            <h2 className="text-2xl font-normal text-foreground sm:text-3xl">How we compared these tools</h2>
            <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
              We merged editorial research (pricing models, architecture, merchant sentiment) with product
              mechanics from our own Shopify-native stack. No paid placement —{" "}
              <Link href="/resources/blogs/" className={articleLink}>
                browse all research posts
              </Link>
              .
            </p>
            <InfographicMethodology />
            <ul className="mt-6 list-disc space-y-2 pl-5 text-base font-light leading-relaxed text-muted-foreground">
              <li>Shopify integration depth (read/write surfaces, not just a widget).</li>
              <li>Whether AI can run autonomously or depends on operators and scripts.</li>
              <li>Pricing predictability at traffic spikes (esp. BFCM).</li>
              <li>Analytics honesty: can you attribute revenue vs noise?</li>
            </ul>
          </section>

          <Separator className="my-14 bg-border/30" />

          {/* 4 */}
          <section id="quick-comparison" className="scroll-mt-28">
            <h2 className="text-2xl font-normal text-foreground sm:text-3xl">
              A quick comparison of the top AI tools for Shopify sales
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
              Start here if you want the &quot;elevator row&quot; for each vendor before the charts and long-form
              reviews. For ROI framing, jump to the{" "}
              <Link href="/resources/roi-calculator/" className={articleLink}>
                ROI calculator
              </Link>{" "}
              after you shortlist two options.
            </p>
            <div className="mt-8">
              <QuickComparisonTable />
            </div>
            <p className="mt-3 text-center text-xs font-light text-muted-foreground">
              Rows summarize positioning; confirm live pricing on each vendor&apos;s site before purchase.
            </p>
          </section>

          <Separator className="my-14 bg-border/30" />

          <AIRadarChart />

          <Separator className="my-14 bg-border/30" />

          {/* Detailed reviews */}
          <section id="detailed-reviews" className="scroll-mt-28">
            <h2 className="text-2xl font-normal text-foreground sm:text-3xl">
              A detailed review of the six AI tools we recommend evaluating first
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-muted-foreground">
              Each entry mirrors the long-read listicle pattern: visual, verdict, pros, caveats, and pricing. When
              you are ready to implement, start from{" "}
              <Link href="/products/shopify/" className={articleLink}>
                Aurevia for Shopify
              </Link>{" "}
              or bring this rubric to procurement.
            </p>
            <DetailedReviews />
          </section>

          <Separator className="my-14 bg-border/30" />

          {/* Full landscape */}
          <section id="full-landscape" className="scroll-mt-28">
            <h2 className="text-2xl font-normal text-foreground sm:text-3xl">The full vendor landscape (all tiers)</h2>
            <p className="mt-4 max-w-3xl text-base font-light leading-relaxed text-muted-foreground">
              Power readers: here is every platform from our research memo — helpdesk titans, hybrids, niche tools,
              and proactive sales vanguards — with the same score bars for quick scanning.
            </p>
            <div className="mt-10 space-y-16">
              {TIER_SECTIONS.map((tier) => (
                <div key={tier.id}>
                  <div className="mb-5">
                    <span className="text-xs font-medium uppercase tracking-widest text-[#00CC99]">
                      {tier.tierLabel}
                    </span>
                    <h3 className="mt-1 text-xl font-normal text-foreground sm:text-2xl">{tier.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm font-light text-muted-foreground">{tier.blurb}</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {tier.agents.map((agent) => (
                      <AgentCard key={agent.name} agent={agent} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-14 bg-border/30" />

          <section id="deep-tables" className="scroll-mt-28 space-y-14">
            <h2 className="text-2xl font-normal text-foreground sm:text-3xl">Category deep-dives (tabular)</h2>
            <p className="max-w-3xl text-base font-light text-muted-foreground">
              Same data as our research tables — useful when you are comparing apples-to-apples inside a single
              segment.
            </p>
            <ComparisonTable
              title="Omnichannel helpdesk titans"
              caption="Consolidated inbox power — AI is mostly augmentation, not autonomous GMV."
              headers={TABLE_HELPDESK.headers}
              rows={TABLE_HELPDESK.rows}
            />
            <ComparisonTable
              title="Mass-market chat hybrids"
              caption="Broad adoption and accessible pricing — watch for reactive UX and usage-based billing."
              headers={TABLE_HYBRIDS.headers}
              rows={TABLE_HYBRIDS.rows}
            />
            <ComparisonTable
              title="Proactive & niche spectrum"
              caption="From recommendation engines to behavioral sales AI — same columns, sharper tradeoffs."
              headers={TABLE_VANGUARD.headers}
              rows={TABLE_VANGUARD.rows}
            />
          </section>

          <Separator className="my-14 bg-border/30" />

          <section id="feature-matrix" className="scroll-mt-28">
            <h2 className="text-2xl font-normal text-foreground sm:text-3xl">Feature matrix: Aurevia vs alternatives</h2>
            <p className="mt-4 max-w-3xl text-base font-light text-muted-foreground">
              Boolean cells use icons; nuanced capabilities stay as text. This is the fastest way to explain why
              Aurevia is architected as a sales co-pilot first.
            </p>
            <div className="mt-8">
              <FeatureMatrixTable rows={FEATURE_MATRIX} />
            </div>
          </section>

          <Separator className="my-14 bg-border/30" />

          <section
            id="verdict"
            className="scroll-mt-28 rounded-2xl border border-[#00CC99]/25 bg-gradient-to-br from-[#00CC99]/10 via-transparent to-transparent p-6 sm:p-10"
            aria-labelledby="verdict-heading"
          >
            <h2 id="verdict-heading" className="text-2xl font-normal text-foreground sm:text-3xl">
              Verdict: why Aurevia wins the revenue use case
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card className="border-border/40 bg-black/25">
                <CardContent className="p-5">
                  <Zap className="mb-3 h-8 w-8 text-[#00CC99]" />
                  <h3 className="text-lg font-normal text-foreground">Guided checkout flow</h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground">
                    Maintain momentum through offers, bundles, and payment — not just PDP links.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/40 bg-black/25">
                <CardContent className="p-5">
                  <TrendingUp className="mb-3 h-8 w-8 text-[#00CC99]" />
                  <h3 className="text-lg font-normal text-foreground">Upsell architecture</h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground">
                    Cart, checkout, and thank-you surfaces without stacking single-purpose apps.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/40 bg-black/25">
                <CardContent className="p-5">
                  <LineChart className="mb-3 h-8 w-8 text-[#00CC99]" />
                  <h3 className="text-lg font-normal text-foreground">Disruptive economics</h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground">
                    Free pilot + aggressive Pro vs punitive usage models elsewhere.
                  </p>
                </CardContent>
              </Card>
            </div>
            <blockquote className="mt-8 border-l-2 border-[#00CC99] pl-5 text-base font-light italic leading-relaxed text-muted-foreground sm:text-lg">
              Helpdesk AI minimizes complaints. Sales AI maximizes yield from the traffic you already bought. Pick
              the toolchain that matches your bottleneck — and if the bottleneck is checkout hesitation, bias
              toward agents that own the full funnel.
            </blockquote>
          </section>

          <div className="mt-12 rounded-xl border border-[#00CC99]/20 bg-gradient-to-br from-[#00CC99]/5 to-transparent p-6 sm:p-8">
            <h3 className="text-lg font-normal text-foreground sm:text-xl">Ready to ship your AI sales co-pilot?</h3>
            <p className="mb-5 mt-2 max-w-lg text-sm font-light text-muted-foreground sm:text-base">
              Install Aurevia on Shopify in minutes — guided checkout, upsells, and revenue reporting without wiring
              a dozen point solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#00cc99] px-5 py-2.5 text-sm font-medium text-black transition-colors duration-200 hover:bg-[#00cc99]/90"
              >
                Try Aurevia Free
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/resources/blogs/"
                className="inline-flex items-center gap-2 rounded-full border border-border/50 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-[#00CC99]/30 hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                More guides
              </Link>
            </div>
          </div>
          </Fragment>
        </AIComparisonListicleLayout>
      </div>
    </PageLayout>
  );
}
