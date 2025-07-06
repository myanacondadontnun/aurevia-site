"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStaggeredScrollFade } from "./ScrollAnimations";

const features = [
  {
    title: "Recover Abandoned Carts in Seconds",
    description:
      "Aurevia's Shopify-native AI spots exit intent, answers last-minute questions, and drops a one-click checkout link — rescuing lost revenue.",
    tags: ["Revenue Automation", "Cart Recovery", "1-Click Checkout", "AI Nudge System"],
    imagePlaceholder: "/api/placeholder/600/400",
  },
  {
    title: "Recommend the Perfect Product, Every Time",
    description:
      "Our LLM reads live shopper context and your catalogue to suggest perfect products, lifting average order value on beta stores.",
    tags: ["Personalized Selling", "Smart Upsell", "Bundles", "Auto-Scraping"],
    imagePlaceholder: "/api/placeholder/600/400",
    iframe: {
      src: "https://imagekit.io/player/embed/i3gsjfgp9/videos/product-recomm-1751720775340.mp4?updatedAt=1751762459507&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fi3gsjfgp9%2Fvideos%2Fproduct-recomm-1751720775340.mp4%2Fik-thumbnail.jpg",
      title: "Aurevia AI Product Recommender Demo"
    },
  },
  {
    title: "Sell While You Sleep, Worldwide",
    description:
      "Aurevia handles product & shipping queries in under 2s — freeing you for high-touch tickets and capturing global traffic you're normally missing.",
    tags: ["24/7 Live AI Sales Rep", "Always-On", "Live Chat Takeover", "Notifies Urgency"],
    imagePlaceholder: "/api/placeholder/600/400",
  },
  {
    title: "Match Your Brand, Voice & Style",
    description:
      "From colours, avatars, to tone of voice — everything is customisable. Ask Co-pilot to \"create Ferrari F1 style chatbot\" or \"speak like James Bond.\" Agent auto-adapts. No code. No design work.",
    tags: ["On-Brand Control", "Fully Customizable", "Custom AI", "Full Brand Control"],
    imagePlaceholder: "/api/placeholder/600/400",
    iframe: {
      src: "https://imagekit.io/player/embed/i3gsjfgp9/videos/customising-chat-1751679156624.mp4?updatedAt=1751762457940&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fi3gsjfgp9%2Fvideos%2Fcustomising-chat-1751679156624.mp4%2Fik-thumbnail.jpg",
      title: "Aurevia Chatbot Customization Demo"
    },
  },
  {
    title: "See What Sells, and Why",
    description:
      "Visual dashboards reveal conversation sentiment, drop-offs, and top-selling SKUs. Export collected leads or correct past mistakes in seconds to keep conversions climbing.",
    tags: ["Actionable Analytics", "Lead Generation", "Data Visualization", "Sales Analytics"],
    imagePlaceholder: "/api/placeholder/600/400",
    iframe: {
      src: "https://imagekit.io/player/embed/i3gsjfgp9/videos/dashboard-video-1751715147712.mp4?updatedAt=1751762457660&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fi3gsjfgp9%2Fvideos%2Fdashboard-video-1751715147712.mp4%2Fik-thumbnail.jpg",
      title: "Aurevia Dashboard & Analytics Demo"
    },
  },
];

export default function FiveWays() {
  const containerRef = useStaggeredScrollFade(100);

  return (
    <section id="features" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-6 sm:mb-8 scroll-fade">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            How Aurevia Helps
          </Badge>
        </div>
        
        <div className="text-center mb-12 sm:mb-16 scroll-fade">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-inter font-normal mb-4 sm:mb-6 text-white">
            5 Ways <span className="green-highlight">Aurevia Grows</span> Your Shopify Store
          </h2>
          <p className="text-lg sm:text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            Automate chats, lift AOV and recover carts, live in minutes, no code.
          </p>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="space-y-16 sm:space-y-20 md:space-y-24"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`scroll-fade flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 sm:gap-10 md:gap-12`}
            >
              {/* Content */}
              <div className="flex-1 space-y-4 sm:space-y-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-inter font-normal text-white">
                  {feature.title}
                </h3>
                <p className="text-base sm:text-lg font-light text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-secondary/30 border border-border/30 text-foreground/80 text-xs sm:text-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Media Content */}
              <div className="flex-1 w-full">
                <Card className="bg-card border-border overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[16/10] sm:aspect-[3/2] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center relative">
                      {feature.iframe ? (
                        <div className="absolute inset-0 w-full h-full">
                          <iframe
                            src={feature.iframe.src}
                            title={feature.iframe.title}
                            className="w-full h-full border-0 rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%'
                            }}
                          />
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground p-4">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-primary/20 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/40 rounded" />
                          </div>
                          <p className="text-sm sm:text-base font-medium text-white mb-2">
                            {feature.title} Demo
                          </p>
                          <p className="text-xs sm:text-sm opacity-70">
                            Interactive feature demo will be available here
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
