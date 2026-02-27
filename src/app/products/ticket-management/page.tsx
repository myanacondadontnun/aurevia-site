import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ticket Management | Aurevia Products",
  description: "Streamline support tickets with AI-powered triage and resolution.",
};

export default function TicketManagementPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <Link href="/products" className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white mb-6">
          Ticket Management
        </h1>
        <p className="text-lg text-muted-foreground">
          Let Aurevia triage and resolve support tickets automatically. Route complex cases to your team when needed.
        </p>
      </div>
    </PageLayout>
  );
}
