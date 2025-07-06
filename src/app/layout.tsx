import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Aurevia.io - Shopify AI Sales Chatbot 24/7",
  description: "Answer questions, recommend products and recover carts in real time. No scripts, no coding, fully trained on your brand.",
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
        
        {/* JSON-LD Structured Data */}
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aurevia Technologies Ltd",
              "url": "https://www.aurevia.io/",
              "logo": "https://www.aurevia.io/android-chrome-512x512.png",
              "email": "general@aurevia.io",
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "+44-7733-207396",
                "contactType": "sales",
                "areaServed": ["GB", "US", "CA", "AU"],
                "availableLanguage": ["en"]
              }],
              "sameAs": [
                "https://www.linkedin.com/company/aurevia-ai/",
                "https://x.com/crazystupidceo",
                "https://www.instagram.com/aurevia_io",
                "https://www.facebook.com/profile.php?id=61571429595824#",
                "https://www.reddit.com/user/crackandcoke/"
              ]
            })
          }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Aurevia.io – Shopify AI Sales Chatbot 24/7",
              "url": "https://www.aurevia.io/"
            })
          }}
        />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do I add an AI chatbot to my Shopify store?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Installing Aurevia is simple - just one click from the Shopify App Store. No coding, no theme modifications required. The chatbot automatically syncs with your products, discounts, and branding, and you can customize the tone, colors, and business rules through our intuitive interface."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can a chatbot help reduce abandoned carts on Shopify?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Aurevia's AI specifically targets cart abandonment by detecting exit intent, answering last-minute questions, and providing one-click checkout links. Our beta stores have seen significant improvements in cart recovery rates through real-time engagement."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can I use an AI chatbot to upsell and cross-sell on Shopify?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Aurevia analyzes live shopper context and your entire product catalog to suggest perfect complementary products. It creates personalized bundles and recommendations in real-time conversations, significantly boosting average order value without relying on discounts."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I install Aurevia's AI chatbot on my Shopify store?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Installation takes just one click from the Shopify App Store. Once installed, Aurevia automatically integrates with your store, syncing products, discounts, and branding. You can then customize settings, upload brand guidelines, and set your preferred tone of voice through our dashboard."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much does Aurevia's AI sales chatbot cost?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer three plans: Starter Kit at $39/seat/month, Revenue Suite at $79/seat/month, and custom Commerce OS pricing. All plans include a free trial, and we offer annual discounts of approximately 30%. Beta testers get 60 days free with all features unlocked."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can a live agent take over a conversation from Aurevia's chatbot?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! Aurevia seamlessly hands off conversations to live agents when needed. The AI recognizes when human intervention is required and notifies your team, providing full conversation context so agents can continue naturally without repeating information."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What sets Aurevia's Shopify chatbot apart from other chatbots?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Aurevia is specifically built for Shopify sales, not just support. It's trained on your brand, handles complex product recommendations, recovers carts in real-time, and provides actionable sales analytics. Unlike generic chatbots, Aurevia acts as a true AI sales representative that understands your business goals."
                  }
                }
              ]
            })
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
