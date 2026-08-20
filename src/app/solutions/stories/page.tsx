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
    company: "Marlowe & Vine",
    name: "Chloe Bergström",
    role: "Ecommerce Director",
    initials: "CB",
    quote:
      "We saw fewer wrong-size returns once shoppers could ask fit questions before checkout, and the AI upsold complete looks in the same thread instead of losing them to a second tab.",
    metric: "17% lift in CVR · 12% higher AOV",
  },
  {
    id: "2",
    vertical: "Health & Beauty",
    company: "Almond & Oat",
    name: "Naomi Fitzgerald",
    role: "CX Lead",
    initials: "NF",
    quote:
      "Discovery went from “search the whole catalog” to a short regimen in three turns, and support tickets about usage and ingredient conflicts dropped as a result.",
    metric: "34% deflection on usage questions · 21% repeat purchase rate",
  },
  {
    id: "3",
    vertical: "Home & Garden",
    company: "Hollow & Bramble",
    name: "Desmond Okoye",
    role: "Operations Director",
    initials: "DO",
    quote:
      "We finally explain bulky shipping and lead times in chat before people abandon over a surprise cost at checkout. That one change paid for the app in the first month.",
    metric: "28% lower WISMO tickets · 9% higher basket size",
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
              A few merchants across our core verticals on what changed once Aurevia was live on their storefront—the
              quote, the number, and who said it.
            </p>
          </header>

          <div className="space-y-16 mb-16">
            {caseStudies.map((c) => (
              <article
                key={c.id}
                className="rounded-2xl border border-border/40 bg-card/30 p-6 sm:p-8 backdrop-blur-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-primary">{c.vertical}</span>
                  <span className="text-xs text-muted-foreground">{c.company}</span>
                </div>
                <blockquote className="font-fraunces italic text-foreground/95 text-lg leading-relaxed mb-5 border-l-2 border-primary/40 pl-4">
                  &ldquo;{c.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-[#00795c]"
                      aria-hidden="true"
                    >
                      {c.initials}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.role}, {c.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[#00CC99]">{c.metric}</p>
                </div>
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
