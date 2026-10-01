import type { Metadata, Viewport } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import AureviaWidgetLoader from "@/components/AureviaWidgetLoader";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/schema";

// Site-wide type system is two families — Fraunces (display) and Montserrat
// (everything else). Both are self-hosted by next/font: downloaded at build time
// and served from /_next/static, so there is no render-blocking request to
// fonts.googleapis.com, and the size-adjusted fallbacks keep text from shifting
// when the web fonts swap in. Exposed as CSS variables for Tailwind and globals.css.
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-fraunces",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Aurevia | Shopify AI Sales Agent — Convert Visitors 24/7",
  description:
    "Aurevia is an official Shopify Partner AI sales agent: instant shopper answers, on-brand product recommendations, and 24/7 abandoned-cart recovery—no scripts or coding required.",
  keywords: [
    "Shopify AI sales agent",
    "Shopify chatbot",
    "AI shopping assistant",
    "Shopify cart recovery",
    "ecommerce conversion AI",
    "Shopify product recommendations",
    "24/7 sales assistant",
    "Shopify automation",
    "official Shopify Partner",
    "AI customer support Shopify",
  ],
  authors: [{ name: "Aurevia", url: "https://aurevia.io" }],
  creator: "Aurevia",
  publisher: "Aurevia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aurevia.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aurevia.io",
    title: "Aurevia | Shopify AI Sales Agent — Convert Visitors 24/7",
    description:
      "Turn traffic into revenue with an official Shopify Partner AI that sells like your best associate: Q&A, guided buying, and always-on cart recovery trained on your brand.",
    siteName: "Aurevia",
    images: [
      {
        url: "/images/twitter_card.png",
        width: 1200,
        height: 600,
        alt: "Aurevia — AI sales agent for Shopify stores, official Shopify Partner",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurevia | Shopify AI Sales Agent — Convert Visitors 24/7",
    description:
      "Official Shopify Partner AI: answer shoppers, recommend products, and recover carts 24/7—trained on your store without code.",
    site: "@crazystupidceo",
    images: ["/images/twitter_card.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${fraunces.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" sizes="any" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FS8M4682ZZ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FS8M4682ZZ', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />

        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '927791903720450');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Apollo Script */}
        <Script
          id="apollo-tracking"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
              o.onload=function(){window.trackingFunctions.onLoad({appId:"688dcc1738810500199d67cb"})},
              document.head.appendChild(o)}initApollo();
            `,
          }}
        />

      </head>
      <body suppressHydrationWarning className="antialiased">
        {/* Meta Pixel (noscript fallback) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=927791903720450&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <ClientBody>{children}</ClientBody>
        <AureviaWidgetLoader />
      </body>
    </html>
  );
}
