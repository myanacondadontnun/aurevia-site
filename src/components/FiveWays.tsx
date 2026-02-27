"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Package,
  MessageSquare,
  ShoppingCart,
  BarChart3,
  Globe,
  Filter,
} from "lucide-react";
import { useGridStaggerFade, useScrollFade } from "./ScrollAnimations";

const products = [
  {
    icon: Package,
    categories: ["Sales", "Pre-Sale"],
    title: "AI Product Recommendations",
    description:
      "Let the AI Agent recommend products through natural, personalized conversations that increase AOV.",
    href: "/products/recommendations",
  },
  {
    icon: MessageSquare,
    categories: ["AI Support", "Pre-Sale", "Post-Sale"],
    title: "Automated Responses",
    description:
      "Deliver instant, context-aware responses to customer queries — 24/7. No more waiting for support hours.",
    href: "/products/automated-responses",
  },
  {
    icon: ShoppingCart,
    categories: ["Sales", "Pre-Sale"],
    title: "Cart Recovery",
    description:
      "Spot exit intent, answer last-minute questions, and drop a one-click checkout link — rescuing lost revenue.",
    href: "/products/cart-recovery",
  },
  {
    icon: BarChart3,
    categories: ["Analytics", "Post-Sale"],
    title: "Conversation Analytics",
    description:
      "Understand what customers ask, where they drop off, and how to improve with full conversation insights.",
    href: "/products/analytics",
  },
  {
    icon: Globe,
    categories: ["AI Support", "Pre-Sale", "Post-Sale"],
    title: "Multilingual Support",
    description:
      "Engage customers worldwide in their preferred language with real-time AI translation across 95+ languages.",
    href: "/products/multilingual",
  },
  {
    icon: Filter,
    categories: ["Sales", "Pre-Sale"],
    title: "Lead Qualification",
    description:
      "Qualify leads in real-time. Identify high-intent visitors and surface them for your sales team automatically.",
    href: "/products/lead-qualification",
  },
];

export default function FiveWays() {
  const containerRef = useGridStaggerFade(3, 120, 200);
  const ctaRef = useScrollFade();

  return (
    <section id="features" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-14 sm:mb-20 scroll-fade">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-inter font-normal mb-4 sm:mb-6 text-white">
            You Shouldn't Have to Choose Between{" "}
            <span className="green-highlight">Selling and Sleeping</span>
          </h2>
          <p className="text-lg sm:text-xl font-light text-muted-foreground max-w-2xl mx-auto">
            Every feature below was built because a merchant like you asked for it.
          </p>
        </div>

        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {products.map((product) => (
            <Link
              key={product.title}
              href={product.href}
              className="scroll-fade-lr group relative bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-xl hover:shadow-primary/[0.07] hover:-translate-y-1"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-5" aria-hidden="true">
                  <product.icon className="w-5 h-5 text-primary" />
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[11px] font-medium tracking-wide uppercase text-muted-foreground/70 bg-muted/30 px-2.5 py-0.5 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg sm:text-xl font-normal text-white mb-3 leading-snug">
                  {product.title}
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-200">
                Learn more
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Card — standalone with its own scroll trigger */}
        <Link
          ref={ctaRef as React.Ref<HTMLAnchorElement>}
          href="/products"
          className="scroll-fade-scale max-w-[1100px] mx-auto mt-5 sm:mt-6 group relative rounded-2xl p-7 sm:p-8 flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-primary/25"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, rgba(8,147,87,0.2) 0%, rgba(2,223,166,0.06) 40%, transparent 70%)",
          }}
        >
          <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center mb-1" aria-hidden="true">
            <Sparkles className="w-5.5 h-5.5 text-primary" />
          </div>
          <h3 className="text-xl font-normal text-white">
            Explore more capabilities
          </h3>
          <p className="text-[15px] text-muted-foreground max-w-md">
            Discover our full suite of AI-powered products built for Shopify
          </p>
          <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium bg-primary/90 hover:bg-primary text-white px-5 py-2.5 rounded-lg transition-colors">
            View all products
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
