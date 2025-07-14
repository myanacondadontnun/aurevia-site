import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Aurevia.io - Shopify AI Sales Chatbot 24/7",
  description: "Answer questions, recommend products and recover carts in real time. No scripts, no coding, fully trained on your brand.",
  keywords: ["Shopify AI", "Sales Chatbot", "E-commerce", "Cart Recovery", "Product Recommendations", "AI Sales Assistant"],
  authors: [{ name: "Aurevia.io" }],
  creator: "Aurevia.io",
  publisher: "Aurevia.io",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aurevia.io'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aurevia.io', // Replace with your actual domain
    title: 'Aurevia.io - Shopify AI Sales Chatbot 24/7',
    description: 'Answer questions, recommend products and recover carts in real time. No scripts, no coding, fully trained on your brand.',
    siteName: 'Aurevia.io',
    images: [
      {
        url: '/og-hero.svg',
        width: 1200,
        height: 630,
        alt: 'Aurevia.io - Shopify AI Sales Chatbot Hero Section',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurevia.io - Shopify AI Sales Chatbot 24/7',
    description: 'Answer questions, recommend products and recover carts in real time. No scripts, no coding, fully trained on your brand.',
    creator: '@crazystupidceo', // Your personal Twitter handle
    images: ['/og-hero.svg'],
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
    <html lang="en" className="dark">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
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
        
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
