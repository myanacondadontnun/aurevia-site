import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pixel & Code",
  description:
    "Pixel & Code is a two-founder brand and product studio. Shopify brands built from scratch — logo, colour, packaging, product design and a custom storefront — plus websites, web apps and AI automation.",
  openGraph: {
    type: "website",
    siteName: "Pixel & Code",
    title: "Pixel & Code — Shopify brand building, websites and AI automation",
    description: "Logo, colour, packaging, product design and a custom Shopify storefront — built by the two people you talk to. Live in about six weeks. Free scoping call.",
    url: "https://aurevia.io/pixel-and-code/",
    images: [{ url: "https://aurevia.io/pixel-and-code/assets/brand/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixel & Code — Shopify brand building, websites and AI automation",
    description: "Logo, colour, packaging, product design and a custom Shopify storefront. Live in about six weeks.",
    images: ["https://aurevia.io/pixel-and-code/assets/brand/og.png"],
  },
};

// Pixel & Code is a self-contained section: its own dark/mono visual identity,
// its own vanilla-JS interactions (GSAP reveals, lead form, chat widget),
// loaded only here via a plain <link>/<script> so they never touch the rest of
// aurevia.io's Tailwind build. Every page under here is reached by a full browser
// navigation (plain <a> tags, never next/link — see PxcNav/PxcFooter and the
// Aurevia navbar's own link into this section) so script.js's one-shot
// initialization logic runs fresh on every single page view, exactly like it did
// as a standalone multi-page site.
export default function PixelAndCodeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pxc">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Press+Start+2P&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/pixel-and-code/styles.css" />

      {children}

      {/* Ad tracking config read by script.js. aurevia.io already loads GA4 site-wide
          (root layout), so pcTrack() events reach that property with ga4 left empty.
          Paste a Meta Pixel ID to enable fbq PageView + Lead events on this section. */}
      <Script id="pc-analytics" strategy="beforeInteractive">{`window.PC_ANALYTICS = { ga4: "", meta: "" };`}</Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="/pixel-and-code/script.js" strategy="afterInteractive" />
    </div>
  );
}
