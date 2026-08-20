import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import ProductsGrid from "@/components/ProductsGrid";
import ProductsPageCTACard from "@/components/ProductsPageCTACard";
import { buildShopifyInstallUrl } from "@/lib/utils";
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
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Products | Aurevia - Shopify AI Sales Co-Pilot",
  description:
    "Shopify AI chatbot for sales: consultative product recommendations, in-chat checkout, AOV and conversion analytics, lead capture, and support automation—in one app.",
  openGraph: {
    title: "Products | Aurevia - Shopify AI Sales Co-Pilot",
    description:
      "Conversational commerce, revenue attribution, and merchant-controlled AI. Explore every capability.",
    type: "website",
  },
};

const products = [
  {
    title: "Automated Responses",
    slug: "automated-responses",
    href: "/products/automated-responses",
    icon: FileText,
    description:
      "Catalog-grounded answers for pre-sales, shipping, and policy—so shoppers get instant clarity while your AI keeps selling, not stalling.",
  },
  {
    title: "Ticket Management",
    slug: "ticket-management",
    href: "/products/ticket-management",
    icon: Percent,
    description:
      "Escalate with full context: triage complex threads, see cart and history, and hand off to humans when it truly matters.",
  },
  {
    title: "Multilingual Support",
    slug: "multilingual",
    href: "/products/multilingual",
    icon: Globe,
    description:
      "One widget, every market: the same products, brand voice, and selling rules in the languages your customers use.",
  },
  {
    title: "Product Recommendations",
    slug: "recommendations",
    href: "/products/recommendations",
    icon: Package,
    description:
      "Consultative discovery and curated picks with add-to-cart in chat—built to lift conversion and average order value.",
  },
  {
    title: "Cart Recovery",
    slug: "cart-recovery",
    href: "/products/cart-recovery",
    icon: ShoppingCart,
    description:
      "In-session nudges, free-shipping prompts, and checkout links the moment someone hesitates—before they bounce.",
  },
  {
    title: "Lead Qualification",
    slug: "lead-qualification",
    href: "/products/lead-qualification",
    icon: Filter,
    description:
      "Capture emails and high-intent signals from paid traffic, export leads, and follow up on real opportunities.",
  },
  {
    title: "Performance Dashboard",
    slug: "dashboard",
    href: "/products/dashboard",
    icon: Monitor,
    description:
      "A merchant view of what matters: conversations, revenue signals, and AI health at a glance—no vanity metrics.",
  },
  {
    title: "Conversation Analytics",
    slug: "analytics",
    href: "/products/analytics",
    icon: MessageSquare,
    description:
      "Why shoppers ask, where they drop off, and which flows win. Improve playbooks with conversation intelligence.",
  },
  {
    title: "ROI Tracking",
    slug: "roi-tracking",
    href: "/products/roi-tracking",
    icon: BarChart3,
    description:
      "Attribute revenue to the AI: assisted purchases, upsells, and recommendations in dollars—not just message counts.",
  },
  {
    title: "Shopify Integration",
    slug: "shopify",
    href: "/products/shopify",
    icon: Store,
    description:
      "Native Shopify app: quick install, product sync, cart and checkout in context, store as the system of record.",
  },
  {
    title: "Custom API",
    slug: "api",
    href: "/products/api",
    icon: Code2,
    description:
      "Webhooks, REST, and custom stacks for dev teams—connect Aurevia to the rest of your operations.",
  },
];

const cardClasses =
  "h-full bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:bg-card/70 hover:shadow-xl hover:shadow-primary/[0.07] hover:-translate-y-1";
const iconBoxClasses =
  "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/15 text-primary mb-4 group-hover:bg-primary/20 transition-colors";
const linkFooterClasses =
  "mt-6 flex items-center gap-1.5 text-sm font-medium text-[#00CC99] group-hover:gap-2.5 transition-all duration-200";

export default function ProductsPage() {
  return (
    <PageLayout>
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <div className="scroll-fade text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-fraunces font-normal text-foreground text-center mb-4">
              All <span className="green-highlight">capabilities</span>
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              A consultative AI sales co-pilot for Shopify: same chat runs discovery, nudges AOV, answers post-purchase
              questions, and shows revenue impact—so you are not paying for a support bot that never closes.
            </p>
          </div>

          <ProductsGrid>
            {products.map((product, index) => {
              const row = Math.floor(index / 3);
              const fromRight = row % 2 === 0;
              return (
              <div
                key={product.slug}
                className={fromRight ? "scroll-fade-rl" : "scroll-fade-lr"}
              >
                <Link href={product.href} className="group block h-full">
                  <div className={cardClasses}>
                    <div>
                      <div className={iconBoxClasses} aria-hidden="true">
                        <product.icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-medium text-foreground mb-2 group-hover:text-[#00CC99] transition-colors">
                        {product.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <span className={linkFooterClasses}>
                      Learn more
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </div>
            );
            })}
            <div className="scroll-fade-lr">
              <ProductsPageCTACard installUrl={buildShopifyInstallUrl()} />
            </div>
          </ProductsGrid>

          <div className="scroll-fade mt-14 sm:mt-16 max-w-2xl mx-auto rounded-2xl border border-border/30 bg-card/20 p-6 sm:p-8">
            <p className="font-fraunces italic text-lg sm:text-xl text-foreground leading-relaxed mb-5">
              &ldquo;We looked at three different AI tools before Aurevia. The others felt bolted on—this one actually
              understands our catalog and sells the way our best rep would.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-[#00795c]"
                aria-hidden="true"
              >
                EM
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">Elena Martins</p>
                <p className="text-xs text-muted-foreground">Founder, Salt & Stone Supply</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/home"
              className="text-muted-foreground hover:text-[#00CC99] text-sm transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
