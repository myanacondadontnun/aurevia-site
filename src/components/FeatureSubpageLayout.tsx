import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import MediaPlaceholder, { type MediaPlaceholderAspect } from "@/components/MediaPlaceholder";
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

export interface FeatureSubpageLayoutProps {
  backHref: string;
  backLabel: string;
  /** Main H1 content — use <span className="green-highlight"> for accents */
  headline: React.ReactNode;
  subtitle: string;
  /** Optional long intro under subtitle */
  lede?: string;
  proofStrip?: ProofItem[];
  featureBlocks: FeatureBlock[];
  howItWorks?: HowStep[];
  media: {
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
  /** Optional right column or full-width image above fold */
  heroVisual?: {
    src: string;
    alt: string;
    className?: string;
  };
}

const cardClass =
  "rounded-2xl border border-border/40 bg-card/40 p-6 sm:p-7 backdrop-blur-sm";

export default function FeatureSubpageLayout({
  backHref,
  backLabel,
  headline,
  subtitle,
  lede,
  proofStrip,
  featureBlocks,
  howItWorks,
  media,
  relatedLinks,
  faqs,
  heroVisual,
}: FeatureSubpageLayoutProps) {
  const installUrl = buildShopifyInstallUrl();

  return (
    <PageLayout>
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl lg:max-w-6xl py-10 sm:py-14">
          <Link
            href={backHref}
            className="text-muted-foreground hover:text-[#00CC99] text-sm mb-8 inline-block transition-colors"
          >
            {backLabel}
          </Link>

          <div
            className={cn(
              "mb-10 lg:mb-12",
              heroVisual && "grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12"
            )}
          >
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-foreground leading-tight mb-5">
                {headline}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {subtitle}
              </p>
              {lede ? (
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">{lede}</p>
              ) : null}
            </div>
            {heroVisual ? (
              <div className={cn("relative rounded-2xl overflow-hidden border border-border/30 shadow-xl", heroVisual.className)}>
                <img
                  src={heroVisual.src}
                  alt={heroVisual.alt}
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : null}
          </div>

          {proofStrip && proofStrip.length > 0 ? (
            <div className="grid sm:grid-cols-3 gap-4 mb-12 scroll-fade">
              {proofStrip.map((item) => (
                <div key={item.label} className={cardClass}>
                  <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
                    {item.label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          ) : null}

          {featureBlocks.length > 0 ? (
            <div className="space-y-5 mb-12">
              <h2 className="text-xl font-medium text-foreground">What you get</h2>
              <ul className="space-y-4">
                {featureBlocks.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <CheckCircle2
                      className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {howItWorks && howItWorks.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-xl font-medium text-foreground mb-6">How it works</h2>
              <ol className="space-y-4">
                {howItWorks.map((step, i) => (
                  <li
                    key={step.title}
                    className="flex gap-4 rounded-2xl border border-border/30 bg-card/20 p-5 sm:p-6"
                  >
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-[#00CC99]"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}

          <div className="mb-12 scroll-fade">
            <h2 className="text-xl font-medium text-foreground mb-4">See it in action</h2>
            <MediaPlaceholder
              ariaLabel={media.ariaLabel}
              caption={media.caption}
              suggestedAsset={media.suggestedAsset}
              aspect={media.aspect}
              kind={media.kind}
              imageSrc={media.imageSrc}
              imageAlt={media.imageAlt}
            />
          </div>

          {relatedLinks.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">
                Related
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/30 px-4 py-2 text-sm text-foreground hover:border-primary/40 hover:text-[#00CC99] transition-colors"
                  >
                    {l.label}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {faqs && faqs.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-xl font-medium text-foreground mb-6">FAQ</h2>
              <div className="space-y-2">
                {faqs.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl border border-border/40 bg-card/20 px-4 py-3 open:bg-card/35"
                  >
                    <summary className="cursor-pointer list-none text-sm font-medium text-foreground pr-6 relative">
                      {item.q}
                      <span
                        className="absolute right-0 top-0.5 text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform"
                        aria-hidden
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-3">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}

          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-6 sm:p-8"
            id="get-started"
          >
            <div>
              <p className="text-foreground font-medium">Ready to see it on your store?</p>
              <p className="text-sm text-muted-foreground mt-1">
                Install from the Shopify App Store and go live in minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-full sm:w-auto"
              >
                <a href={installUrl} target="_blank" rel="noopener noreferrer">
                  Start free on Shopify
                </a>
              </Button>
              <Button asChild variant="outline" className="border-border/60 w-full sm:w-auto rounded-xl">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
