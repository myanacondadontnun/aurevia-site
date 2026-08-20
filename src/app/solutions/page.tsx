import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import IndustriesShowcase from "@/components/IndustriesShowcase";
import ROICalculatorCTACard from "@/components/ROICalculatorCTACard";
import Link from "next/link";
import {
  Shirt,
  Sparkles,
  Dumbbell,
  Monitor,
  Leaf,
  ShoppingCart,
  Headphones,
  BarChart3,
  Store,
  TrendingUp,
  Briefcase,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions | Aurevia - Shopify AI Sales Co-Pilot",
  description:
    "Industry playbooks, conversion and support use cases, and business-size programs—Shopify AI that sells, deflects tickets, and proves ROI.",
  openGraph: {
    title: "Solutions | Aurevia - Shopify AI Sales Co-Pilot",
    description: "Ecommerce AI for fashion, beauty, fitness, and more. Match your ICP in minutes.",
    type: "website",
  },
};

const useCases = [
  {
    href: "/solutions/conversion",
    label: "Increase sales conversion",
    blurb: "Move stalled browsers to checkout with guided discovery, cart nudges, and bundle logic.",
    icon: ShoppingCart,
  },
  {
    href: "/solutions/support",
    label: "Automate customer support",
    blurb: "Deflect WISMO and returns questions with order-aware answers that still feel on-brand.",
    icon: Headphones,
  },
  {
    href: "/solutions/insights",
    label: "Gain customer insights",
    blurb: "Turn every chat into data: what people ask, where they drop, what to test next.",
    icon: BarChart3,
  },
];

const businessSizes = [
  {
    href: "/solutions/small-business",
    label: "Small business",
    blurb: "One lean tool for sales and support, live in a single sitting.",
    icon: Store,
  },
  {
    href: "/solutions/growing-business",
    label: "Growing business",
    blurb: "Rules, brand voice, and revenue attribution that scale with ad spend.",
    icon: TrendingUp,
  },
  {
    href: "/solutions/enterprise",
    label: "Enterprise",
    blurb: "Volume, process, and integrations for teams that need a secure path to rollout.",
    icon: Briefcase,
  },
];

const industries = [
  {
    title: "Fashion & Apparel",
    slug: "fashion",
    href: "/solutions/fashion",
    icon: Shirt,
    description: "Recognize your visitors' style and preferences to recommend the latest trends and outfits that fit their fashion sense, while helping them choose the right size.",
    subheader: "Shoppers bounce when they can't find their style or size. Recommend trends and fits they'll love, cut returns, and turn browsers into buyers—without the guesswork.",
    image: "/images/fashion-apparel.jpg",
    titleHighlight: "Apparel",
  },
  {
    title: "Health & Beauty",
    slug: "beauty",
    href: "/solutions/beauty",
    icon: Sparkles,
    description: "Chat about your visitors' skincare concerns to suggest the best beauty products that enhance their natural glow.",
    subheader: "Beauty and skincare shoppers are overwhelmed by choice. Help them find the right products for their concerns and skin type so they buy with confidence and come back.",
    image: "/images/health-beauty.jpg",
    titleHighlight: "Beauty",
  },
  {
    title: "Fitness & Supplements",
    slug: "fitness",
    href: "/solutions/fitness",
    icon: Dumbbell,
    description: "Recognize your visitors' health goals to recommend supplements and wellness products that support their well-being.",
    subheader: "Your visitors have goals—build muscle, lose weight, stay energized. Recommend the supplements and gear that match their journey so every click leads closer to a sale.",
    image: "/images/fitness.jpg",
    titleHighlight: "Supplements",
  },
  {
    title: "Electronics",
    slug: "electronics",
    href: "/solutions/electronics",
    icon: Monitor,
    description: "Understand your visitors' tech needs to recommend the right gadgets and devices that enhance their digital lifestyle.",
    subheader: "Tech shoppers spend hours comparing specs and reviews. Surface the right gadgets for their needs and budget so they stop searching and start checking out.",
    image: "/images/electronics.jpg",
    titleHighlight: "Electronics",
  },
  {
    title: "Home & Garden",
    slug: "home-garden",
    href: "/solutions/home-garden",
    icon: Leaf,
    description: "Identify your visitors' home and garden needs to suggest products that beautify their living spaces and outdoor areas.",
    subheader: "From first apartment to dream garden, shoppers want their space to feel right. Suggest decor, plants, and finds that match their style and turn inspiration into orders.",
    image: "/images/home-garden.jpg",
    titleHighlight: "Garden",
  },
];

export default function SolutionsPage() {
  return (
    <PageLayout>
      <section className="gradient-bg">
        <div className="container mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <header className="scroll-fade text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-fraunces font-normal text-foreground text-center mb-4">
              All <span className="green-highlight">solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto page-subheader">
              Pick a use case, your stage, or your vertical—Aurevia maps consultative sales to the way you already run
              the store. Same Shopify-native AI, tuned to the outcome you care about first.
            </p>
          </header>

          <div className="max-w-5xl mx-auto mb-16">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground text-center mb-6">
              By use case
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {useCases.map((u) => (
                <Link
                  key={u.href}
                  href={u.href}
                  className="group rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/35 hover:-translate-y-0.5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <u.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-medium text-foreground group-hover:text-[#00CC99] transition-colors mb-2">
                    {u.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{u.blurb}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#00CC99]">
                    Learn more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground text-center mb-6">
              By business size
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {businessSizes.map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="group rounded-2xl border border-border/40 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/35 hover:-translate-y-0.5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <b.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-medium text-foreground group-hover:text-[#00CC99] transition-colors mb-2">
                    {b.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{b.blurb}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#00CC99]">
                    Learn more
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-fraunces font-normal text-center text-foreground mb-2">
            By <span className="green-highlight">industry</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10 text-sm sm:text-base">
            Verticals where discovery, returns, and specs make or break the sale. Choose yours for tailored messaging.
          </p>

          <IndustriesShowcase
            industries={industries.map(({ title, slug, subheader, href, image, titleHighlight }) => ({
              title,
              slug,
              subheader,
              href,
              ...(image && { image }),
              ...(titleHighlight && { titleHighlight }),
            }))}
          />

          <div className="scroll-fade mt-16 mb-16 max-w-2xl mx-auto rounded-2xl border border-border/30 bg-card/20 p-6 sm:p-8">
            <p className="font-fraunces italic text-lg sm:text-xl text-foreground leading-relaxed mb-5">
              &ldquo;We didn't have to pick one use case—Aurevia handles discovery, support, and recovery in the same
              chat. It just quietly took over the jobs we kept meaning to hire for.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-[#00795c]"
                aria-hidden="true"
              >
                RH
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">Ryan Hollis</p>
                <p className="text-xs text-muted-foreground">Operations Lead, Marrow & Co.</p>
              </div>
            </div>
          </div>

          <ROICalculatorCTACard />
        </div>
      </section>
    </PageLayout>
  );
}
