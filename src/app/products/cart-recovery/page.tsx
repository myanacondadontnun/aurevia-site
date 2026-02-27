import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cart Recovery | Aurevia Products",
  description: "Recover abandoned carts with AI that detects exit intent and sends one-click checkout links.",
};

export default function CartRecoveryPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Cart Recovery
        </h1>
        <p className="text-lg text-muted-foreground">
          Aurevia spots exit intent, answers last-minute questions, and drops a one-click checkout link—rescuing lost revenue.
        </p>
      </div>
    </PageLayout>
  );
}
