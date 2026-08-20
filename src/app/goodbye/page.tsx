import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import GoodbyeFeedbackForm from "@/components/GoodbyeFeedbackForm";
import { SHOPIFY_APP_URL } from "@/lib/utils";

const title = "Sorry to See You Go | Aurevia";
const desc = "Your Aurevia app has been uninstalled. Tell us why, and know the door's always open.";

export const metadata: Metadata = {
  title,
  description: desc,
  robots: { index: false, follow: true },
};

export default function GoodbyePage() {
  return (
    <PageLayout>
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl py-14 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-fraunces font-normal text-foreground leading-tight mb-4">
            Sorry to see you <span className="green-highlight">go</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            Aurevia&apos;s been removed from your store — no lingering charges, no fine print. If something
            didn&apos;t work for you, we&apos;d genuinely like to know.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 max-w-2xl pb-16">
        <GoodbyeFeedbackForm />

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-6 sm:p-8">
          <div className="text-center sm:text-left">
            <p className="text-foreground font-medium">Changed your mind?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Reinstall in a click — your settings are kept for a while after uninstall.
            </p>
          </div>
          <a
            href={SHOPIFY_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-foreground border-0 shrink-0 w-full sm:w-auto"
          >
            Reinstall Aurevia
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Questions about your data or billing?{" "}
          <Link href="/contact" className="text-[#00CC99] hover:underline">
            Contact us
          </Link>{" "}
          or see our{" "}
          <Link href="/privacy-policy" className="text-[#00CC99] hover:underline">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </PageLayout>
  );
}
