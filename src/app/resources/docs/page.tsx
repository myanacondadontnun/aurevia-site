import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildShopifyInstallUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Documentations | Aurevia Resources",
  description: "API guides, setup docs, and integration documentation.",
};

export default function DocsPage() {
  const installUrl = buildShopifyInstallUrl();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/resources" className="text-muted-foreground hover:text-[#00CC99] text-sm mb-6 inline-block">
          ← Back to Resources
        </Link>
        <h1 className="text-4xl md:text-5xl font-fraunces font-normal text-foreground mb-6">
          Documentations
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          API guides, setup docs, and integration documentation for developers and store owners.
        </p>

        <div className="mb-12 rounded-2xl border border-border/30 bg-card/20 p-6 sm:p-8">
          <p className="font-fraunces italic text-lg sm:text-xl text-foreground leading-relaxed mb-5">
            &ldquo;I skimmed the docs expecting the usual half-finished vendor reference page. Instead I found actual
            request and response examples for every webhook we needed, so our custom order-sync job worked on the
            first deploy.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-[#00795c]"
              aria-hidden="true"
            >
              PK
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">Priyanka Kapoor</p>
              <p className="text-xs text-muted-foreground">Platform Engineer, Ashgrove Trading Co.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-6 sm:p-8">
          <div>
            <p className="text-foreground font-medium">Ready to see it on your store?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Install from the Shopify App Store and go live in minutes.
            </p>
          </div>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl w-full sm:w-auto">
            <a href={installUrl} target="_blank" rel="noopener noreferrer">
              Start free on Shopify
            </a>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
