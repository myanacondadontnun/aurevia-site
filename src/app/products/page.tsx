import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import {
  FileText,
  Percent,
  Globe,
  Package,
  ShoppingCart,
  Filter,
  Monitor,
  MessageSquare,
  BarChart3,
  Store,
  Code2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Products | Aurevia - Shopify AI Sales Co-Pilot",
  description: "Explore Aurevia's AI-powered product features: automated responses, cart recovery, product recommendations, analytics, and Shopify integration.",
};

const products = [
  {
    title: "Automated Responses",
    slug: "automated-responses",
    href: "/products/automated-responses",
    icon: FileText,
    description: "AI delivers instant, context-aware responses to customer queries—24/7. No more waiting for support hours.",
  },
  {
    title: "Ticket Management",
    slug: "ticket-management",
    href: "/products/ticket-management",
    icon: Percent,
    description: "Triage and resolve support tickets automatically. Route complex cases to your team when needed.",
  },
  {
    title: "Multilingual Support",
    slug: "multilingual",
    href: "/products/multilingual",
    icon: Globe,
    description: "Reach global customers with AI that speaks their language. Support multiple languages in one chatbot.",
  },
  {
    title: "Product Recommendations",
    slug: "recommendations",
    href: "/products/recommendations",
    icon: Package,
    description: "Analyze live shopper context to suggest the perfect products—increasing AOV and conversion.",
  },
  {
    title: "Cart Recovery",
    slug: "cart-recovery",
    href: "/products/cart-recovery",
    icon: ShoppingCart,
    description: "Spot exit intent, answer last-minute questions, and drop one-click checkout links—rescuing lost revenue.",
  },
  {
    title: "Lead Qualification",
    slug: "lead-qualification",
    href: "/products/lead-qualification",
    icon: Filter,
    description: "Identify high-intent visitors in real-time and surface them for your sales team.",
  },
  {
    title: "Performance Dashboard",
    slug: "dashboard",
    href: "/products/dashboard",
    icon: Monitor,
    description: "Monitor conversions, revenue attribution, and engagement metrics in one clear view.",
  },
  {
    title: "Conversation Analytics",
    slug: "analytics",
    href: "/products/analytics",
    icon: MessageSquare,
    description: "Understand what customers ask, where they drop off, and how to improve. Full conversation history.",
  },
  {
    title: "ROI Tracking",
    slug: "roi-tracking",
    href: "/products/roi-tracking",
    icon: BarChart3,
    description: "See exactly how much revenue Aurevia drives. Track attributed sales, cart recoveries, and upsells.",
  },
  {
    title: "Shopify Integration",
    slug: "shopify",
    href: "/products/shopify",
    icon: Store,
    description: "One-click install from the App Store, automatic product sync, and native checkout links.",
  },
  {
    title: "Custom API",
    slug: "api",
    href: "/products/api",
    icon: Code2,
    description: "Connect Aurevia to your existing tools with our REST API. Custom integrations and webhooks.",
  },
];

export default function ProductsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white text-center mb-4">
          All products
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          AI customer support, sales conversion tools, analytics, and platform integrations for your Shopify store.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={product.href}
              className="group block"
            >
              <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  <product.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-medium text-white mb-2 group-hover:text-[#02DFA6] transition-colors">
                  {product.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#02DFA6] group-hover:gap-2 transition-all">
                  Learn more
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
