import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Growing Business | Aurevia Solutions",
  description: "Scale your sales with AI as your business grows.",
};

export default function GrowingBusinessPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/solutions" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Solutions
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Growing Business
        </h1>
        <p className="text-lg text-muted-foreground">
          AI that grows with you. Handle more traffic and conversations without scaling your support team.
        </p>
      </div>
    </PageLayout>
  );
}
