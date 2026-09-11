"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// Aurevia's own live chat widget (dogfooded on the marketing site) — self-hosted,
// talks to the Django backend at api.aurevia.io (see Widget/website-widget.js;
// the public/ copy is the served build). The widget key is publishable (rotatable
// from the admin dashboard).
//
// Skipped on /pixel-and-code/*: that section has its own floating chat launcher
// in the same corner — showing both would stack two chat bubbles on top of each other.
export default function AureviaWidgetLoader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/pixel-and-code")) return null;

  return (
    <>
      <Script
        id="aurevia-widget-env"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.__AUREVIA_SITE_WIDGET__ = { apiKey: ${JSON.stringify(
            process.env.NEXT_PUBLIC_AUREVIA_WIDGET_KEY || ""
          )} };`,
        }}
      />
      <Script src="/website-widget.js" strategy="afterInteractive" />
    </>
  );
}
