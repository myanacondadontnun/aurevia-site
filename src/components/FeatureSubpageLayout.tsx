import Link from "next/link";
import { ArrowRight, CheckCircle2, Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import type { MediaPlaceholderAspect } from "@/components/MediaPlaceholder";
import { buildShopifyInstallUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface FeatureBlock {
  title: string;
  body: string;
}

export interface HowStep {
  title: string;
  body: string;
}

export interface ProofItem {
  label: string;
  text: string;
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TestimonialQuote {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface FeatureSubpageLayoutProps {
  backHref: string;
  backLabel: string;
  /** Small uppercase label above the H1, e.g. "Cart recovery" */
  eyebrow?: string;
  /** Main H1 content — use <span className="green-highlight"> for accents */
  headline: React.ReactNode;
  subtitle: string;
  /** Optional long intro under subtitle */
  lede?: string;
  /** Short checkmark bullets under the hero CTAs */
  heroBullets?: string[];
  /** Live product demo rendered beside the hero copy (chat / metrics / code mockup) */
  demo?: React.ReactNode;
  proofStrip?: ProofItem[];
  featureBlocks: FeatureBlock[];
  howItWorks?: HowStep[];
  media?: {
    ariaLabel: string;
    caption: string;
    suggestedAsset: string;
    aspect?: MediaPlaceholderAspect;
    kind?: "video" | "image";
    imageSrc?: string;
    imageAlt?: string;
  };
  relatedLinks: RelatedLink[];
  faqs?: FaqItem[];
  testimonial?: TestimonialQuote;
  /** Optional right column or full-width image above fold */
  heroVisual?: {
    src: string;
    alt: string;
    className?: string;
  };
}

export default function FeatureSubpageLayout({
  backHref,
  backLabel,
  eyebrow,
  headline,
  subtitle,
  lede,
  heroBullets,
  demo,
  proofStrip,
  featureBlocks,
  howItWorks,
  relatedLinks,
  faqs,
  testimonial,
  heroVisual,
}: FeatureSubpageLayoutProps) {
  const installUrl = buildShopifyInstallUrl();
  const hasHeroAside = Boolean(demo || heroVisual);

  return (
    <PageLayout>
      {/* ─── Hero ─── */}
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-6 sm:pt-10 pb-14 sm:pb-20">
          <Link
            href={backHref}
            className="text-muted-foreground hover:text-[#00CC99] text-sm inline-block transition-colors"
          >
            {backLabel}
          </Link>

          <div
            className={cn(
              "mt-8",
              hasHeroAside &&
                "grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10"
            )}
          >
            <div className={cn(!hasHeroAside && "max-w-3xl")}>
              {eyebrow ? (
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#00795c]">
                  {eyebrow}
                </p>
              ) : null}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.3rem] font-fraunces font-normal text-foreground leading-[1.08] mb-6">
                {headline}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {subtitle}
              </p>
              {lede ? (
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {lede}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={installUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-medium text-foreground border-0"
                >
                  Start free on Shopify
                  <ArrowRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
                </a>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border-border/60 px-6 py-3 h-auto text-base"
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>

              {heroBullets && heroBullets.length > 0 ? (
                <ul className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
                  {heroBullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-[#00CC99]" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {demo ? (
              <div className="flex justify-center lg:justify-end">{demo}</div>
            ) : heroVisual ? (
              <div
                className={cn(
                  "relative rounded-2xl overflow-hidden border border-border/30 shadow-xl",
                  heroVisual.className
                )}
              >
                <img
                  src={heroVisual.src}
                  alt={heroVisual.alt}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ─── Proof band ─── */}
      {proofStrip && proofStrip.length > 0 ? (
        <section className="border-y border-border/60 bg-card/30">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid divide-y divide-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {proofStrip.map((item) => (
                <div key={item.label} className="px-6 py-8 text-center sm:py-10">
                  <p className="font-fraunces text-xl sm:text-2xl text-foreground mb-2">
                    {item.label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[34ch] mx-auto">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* ─── What you get ─── */}
        {featureBlocks.length > 0 ? (
          <section className="py-14 sm:py-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-fraunces font-normal text-foreground text-center mb-10 sm:mb-12">
              What you <span className="green-highlight">get</span>
            </h2>
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 max-w-4xl mx-auto">
              {featureBlocks.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border/30 bg-card/50 p-6 sm:p-7 backdrop-blur-sm transition-colors hover:border-primary/30"
                >
                  <span
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/15"
                    aria-hidden
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="mb-2 font-medium text-foreground text-base sm:text-lg">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* ─── How it works ─── */}
        {howItWorks && howItWorks.length > 0 ? (
          <section className="pb-14 sm:pb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-fraunces font-normal text-foreground text-center mb-10 sm:mb-12">
              How it <span className="green-highlight">works</span>
            </h2>
            <ol className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              {howItWorks.map((step, i) => (
                <li key={step.title} className="relative">
                  <span
                    className="font-fraunces text-5xl text-primary/25 leading-none"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 mb-2 font-medium text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {/* ─── Testimonial ─── */}
        {testimonial ? (
          <section className="pb-14 sm:pb-20">
            <figure className="mx-auto max-w-3xl text-center">
              <blockquote>
                <p className="font-fraunces italic text-xl sm:text-2xl md:text-[1.7rem] text-foreground leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-7 flex items-center justify-center gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-[#00795c]"
                  aria-hidden="true"
                >
                  {testimonial.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="text-left">
                  <span className="block text-sm font-medium text-foreground">
                    {testimonial.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </section>
        ) : null}

        {/* ─── FAQ ─── */}
        {faqs && faqs.length > 0 ? (
          <section className="pb-14 sm:pb-20">
            <h2 className="text-2xl sm:text-3xl font-fraunces font-normal text-foreground text-center mb-8 sm:mb-10">
              Questions, <span className="green-highlight">answered</span>
            </h2>
            <div className="mx-auto max-w-3xl space-y-2">
              {faqs.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-border/40 bg-card/20 px-5 py-4 open:bg-card/40"
                >
                  <summary className="relative cursor-pointer list-none pr-6 text-sm sm:text-[15px] font-medium text-foreground">
                    {item.q}
                    <span
                      className="absolute right-0 top-0.5 text-lg leading-none text-muted-foreground transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 border-t border-border/30 pt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {/* ─── Related ─── */}
        {relatedLinks.length > 0 ? (
          <section className="pb-14 sm:pb-16">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="mr-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Related
              </span>
              {relatedLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/30 px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-[#00CC99]"
                >
                  {l.label}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* ─── CTA banner ─── */}
        <section className="pb-6" id="get-started">
          <div className="relative overflow-hidden rounded-3xl border border-[#00CC99]/15 bg-gradient-to-br from-[#00CC99]/[0.08] via-[#089357]/[0.05] to-[#0b3c2f]/[0.1] px-6 py-14 text-center sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(0,204,153,0.06)_0%,transparent_70%)]"
              aria-hidden
            />
            <div className="relative z-10">
              <h2 className="font-fraunces text-2xl sm:text-3xl md:text-4xl font-normal text-foreground mb-4 leading-tight">
                See it live on <span className="green-highlight">your store</span>
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                Install from the Shopify App Store, sync your catalog, and watch the first
                conversations come in — most merchants are live within the hour.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={installUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-medium text-foreground border-0"
                >
                  Start free on Shopify
                  <ArrowRight className="w-4 h-4 cta-arrow" aria-hidden="true" />
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-xl border border-border/60 px-8 py-3.5 text-base text-foreground transition-colors hover:border-primary/40 hover:text-[#00CC99]"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
