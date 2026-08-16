import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { buildShopifyInstallUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const title = "Customer Stories & Case Studies | Aurevia Solutions";
const desc =
  "See how Shopify brands use consultative AI to lift conversion, AOV, and deflection. Case studies, metrics placeholders, and video testimonials coming as we publish real names.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "website" },
};

const caseStudies = [
  {
    id: "1",
    vertical: "Fashion & Apparel",
    placeholderQuote:
      "Placeholder quote: We saw fewer wrong-size returns once shoppers could ask fit questions before checkout, and the AI upsold complete looks in-thread.",
    placeholderMetric: "—% lift in CVR (placeholder) · —% AOV (placeholder)",
    videoCaption: "Customer video testimonial (placeholder slot)",
    videoHint: "Drop in: 30–60s talking-head with founder or CX lead + b-roll of storefront and widget.",
  },
  {
    id: "2",
    vertical: "Health & Beauty",
    placeholderQuote:
      "Placeholder quote: Discovery went from ‘search the whole catalog’ to a short regimen in three turns; support tickets on usage dropped as a result.",
    placeholderMetric: "—% deflection (placeholder) · —% repeat purchase (placeholder)",
    videoCaption: "Brand video or Loom walkthrough (placeholder slot)",
    videoHint: "Screen recording: skincare quiz in chat to three curated products + refill nudge.",
  },
  {
    id: "3",
    vertical: "Home & Garden",
    placeholderQuote:
      "Placeholder quote: We finally explained bulky shipping and lead times in chat before people abandoned over surprise costs at checkout.",
    placeholderMetric: "—% lower WISMO (placeholder) · —% higher basket (placeholder)",
    videoCaption: "Before/after or campaign story (placeholder slot)",
    videoHint: "Side-by-side: old FAQ-only vs Aurevia with room context and bundle in chat.",
  },
];

export default function StoriesPage() {
  const installUrl = buildShopifyInstallUrl();
  return (
    <PageLayout>
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl py-10 sm:py-14">
          <Link
            href="/solutions"
            className="text-muted-foreground hover:text-[#00CC99] text-sm mb-8 inline-block"
          >
            ← Back to Solutions
          </Link>
          <header className="mb-12 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-foreground mb-4">
              Customer <span className="green-highlight">stories</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              These cards are ready for your real logos, named metrics, and video files. The structure is what enterprise buyers expect on a Gorgias- or
              Zendesk-style proof page: the quote, the number, the vertical, and a face or product shot they can trust. Swap assets in when your marketing
              team signs off—no re-layout required.
            </p>
          </header>

          <div className="space-y-16 mb-16">
            {caseStudies.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-border/40 bg-card/30 p-6 sm:p-8 backdrop-blur-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">{c.vertical}</span>
                  <span className="text-xs text-muted-foreground">Logo + brand name (placeholder)</span>
                </div>
                <div className="h-10 w-32 rounded-md bg-muted/40 border border-dashed border-border/50 mb-6 flex items-center justify-center text-[10px] text-muted-foreground">
                  Logo area
                </div>
                <blockquote className="text-foreground/95 leading-relaxed mb-4 border-l-2 border-primary/40 pl-4">
                  {c.placeholderQuote}
                </blockquote>
                <p className="text-sm font-medium text-[#00CC99]">{c.placeholderMetric}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-6 sm:p-8">
            <p className="text-sm text-muted-foreground max-w-xl">
              Want to be featured? We are looking for partners who are willing to share before/after metrics and a short recorded interview. Reach out and we
              will slot you into the next publish batch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-primary text-primary-foreground rounded-xl">
                <a href={installUrl} target="_blank" rel="noopener noreferrer">
                  Start on Shopify
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-xl border-border/60">
                <Link href="/home#contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
