import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fitness & Supplements | Aurevia Solutions",
  description: "24/7 product guidance for fitness and supplement stores.",
};

export default function FitnessPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Fitness & Supplements
        </h1>
        <p className="text-lg text-muted-foreground">
          24/7 product guidance. Help fitness shoppers find the right supplements and equipment for their goals.
        </p>
      </div>
    </PageLayout>
  );
}
