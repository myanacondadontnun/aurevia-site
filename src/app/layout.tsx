import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import AureviaWidgetLoader from "@/components/AureviaWidgetLoader";

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
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" sizes="any" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Non-blocking font loading: only weights actually used.
            Site-wide type system is just two families — Fraunces (display) and
            Montserrat (everything else, including body copy and testimonials). */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700&display=swap"
        />
        {/* Fraunces — editorial display serif shared with the Aurevia app */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500;1,9..144,600&display=swap"
        />
        {/* Press Start 2P + JetBrains Mono — only used by the small Pixel & Code
            brand badge in the navbar, kept out of the site-wide type system above */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@700&display=swap"
        />

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
        <ClientBody>{children}</ClientBody>
        <AureviaWidgetLoader />
      </body>
    </html>
  );
}
