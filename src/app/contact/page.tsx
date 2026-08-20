import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import ContactSalesForm from "@/components/ContactSalesForm";

const title = "Talk to Sales | Aurevia";
const desc =
  "Tell us about your Shopify store and book a 30-minute call with our team to see if Aurevia's AI sales co-pilot is the right fit.";

export const metadata: Metadata = {
  title,
  description: desc,
  openGraph: { title, description: desc, type: "website" },
};

export default function ContactPage() {
  return (
    <PageLayout>
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-10 sm:py-14">
          <Link
            href="/home"
            className="text-muted-foreground hover:text-[#00CC99] text-sm mb-8 inline-block transition-colors"
          >
            ← Back to home
          </Link>

          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-foreground leading-tight mb-4">
              Let&apos;s talk about <span className="green-highlight">your store</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A couple of quick questions, then grab 30 minutes with Ritwik on our team — no scripted demo,
              just a straight answer on whether Aurevia fits.
            </p>
          </div>

          <ContactSalesForm />
        </div>
      </section>
    </PageLayout>
  );
}
