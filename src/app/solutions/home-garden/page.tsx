import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home & Garden | Aurevia Solutions",
  description: "Make it beautiful with AI for home and garden stores.",
};

export default function HomeGardenPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Home & Garden
        </h1>
        <p className="text-lg text-muted-foreground">
          Make it beautiful with AI. Help customers discover the perfect home and garden products.
        </p>
      </div>
    </PageLayout>
  );
}
