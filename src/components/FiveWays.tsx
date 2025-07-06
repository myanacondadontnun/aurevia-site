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
    <section id="features" className="py-24 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-8 scroll-fade">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            How Aurevia Helps
          </Badge>
        </div>
        
        <div className="text-center mb-16 scroll-fade">
          <h2 className="text-4xl md:text-5xl font-inter font-normal mb-6 text-white">
            5 Ways <span className="green-highlight">Aurevia Grows</span> Your Shopify Store
          </h2>
          <p className="text-xl font-light text-muted-foreground max-w-3xl mx-auto">
            Automate chats, lift AOV and recover carts, live in minutes, no code.
          </p>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="space-y-24"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`scroll-fade flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-12`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <h3 className="text-2xl md:text-3xl font-inter font-normal text-white">
                  {feature.title}
                </h3>
                <p className="text-lg font-light text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-secondary/30 border border-border/30 text-foreground/80 text-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Image Placeholder */}
              <div className="flex-1">
                <Card className="bg-card border-border overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[3/2] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center relative">
                      {feature.iframe ? (
                        <div className="video-wrapper">
                          <iframe
                            src={feature.iframe.src}
                            title={feature.iframe.title}
                            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 bg-primary/40 rounded" />
                          </div>
                          <p className="text-sm">Feature Demo Placeholder</p>
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
