import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentations | Aurevia Resources",
  description: "API guides, setup docs, and integration documentation.",
};

export default function DocsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/resources" className="text-muted-foreground hover:text-[#00CC99] text-sm mb-6 inline-block">
          ← Back to Resources
        </Link>
        <h1 className="text-4xl md:text-5xl font-fraunces font-normal text-foreground mb-6">
          Documentations
        </h1>
        <p className="text-lg text-muted-foreground">
          API guides, setup docs, and integration documentation for developers and store owners.
        </p>
      </div>
    </PageLayout>
  );
}
