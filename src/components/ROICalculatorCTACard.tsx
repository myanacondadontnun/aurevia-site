"use client";

/**
 * The closing call to action (design.md): a night card with the still Aurevia ring cropped in its corner, as on
 * pricing. Used under the ROI calculator and on /solutions; it fills the width of the container it sits in.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackButtonClick } from "@/lib/analytics";
import { buildShopifyInstallUrl } from "@/lib/utils";
import r from "@/components/roi/roi.module.css";

export default function ROICalculatorCTACard() {
  return (
    <section className={r.ctaSection} aria-label="Try Aurevia for free">
      <div className={r.cta}>
        <span className={r.ctaMark} aria-hidden="true" />
        <h2 className={r.ctaTitle}>See the real numbers on your store</h2>
        <p className={r.ctaLede}>Try any paid plan free for 14 days, billed through Shopify. Cancel any time.</p>
        <div className={r.ctaButtons}>
          <a
            href={buildShopifyInstallUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackButtonClick("Start free trial", "roi_calculator_cta")}
            className={r.primary}
          >
            Start free trial <ArrowRight aria-hidden="true" />
          </a>
          <Link href="/book-demo/" className={r.ctaSecondary}>
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  );
}
