import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import {
  Shirt,
  Sparkles,
  Dumbbell,
  Monitor,
  Leaf,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions | Aurevia - Shopify AI Sales Co-Pilot",
  description: "AI solutions for every industry. Fashion, beauty, fitness, electronics, home & garden — see how Aurevia helps Shopify merchants in your vertical.",
};

const industries = [
  {
    title: "Fashion & Apparel",
    slug: "fashion",
    href: "/solutions/fashion",
    icon: Shirt,
    description: "Recognize your visitors' style and preferences to recommend the latest trends and outfits that fit their fashion sense, while helping them choose the right size.",
  },
  {
    title: "Health & Beauty",
    slug: "beauty",
    href: "/solutions/beauty",
    icon: Sparkles,
    description: "Chat about your visitors' skincare concerns to suggest the best beauty products that enhance their natural glow.",
  },
  {
    title: "Fitness & Supplements",
    slug: "fitness",
    href: "/solutions/fitness",
    icon: Dumbbell,
    description: "Recognize your visitors' health goals to recommend supplements and wellness products that support their well-being.",
  },
  {
    title: "Electronics",
    slug: "electronics",
    href: "/solutions/electronics",
    icon: Monitor,
    description: "Understand your visitors' tech needs to recommend the right gadgets and devices that enhance their digital lifestyle.",
  },
  {
    title: "Home & Garden",
    slug: "home-garden",
    href: "/solutions/home-garden",
    icon: Leaf,
    description: "Identify your visitors' home and garden needs to suggest products that beautify their living spaces and outdoor areas.",
  },
];

export default function SolutionsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-inter font-normal text-white text-center mb-4">
          All industries
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          AI solutions tailored to your industry. See how Aurevia helps Shopify merchants in every vertical.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={industry.href}
              className="group block"
            >
              <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  <industry.icon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-medium text-white mb-2 group-hover:text-[#02DFA6] transition-colors">
                  {industry.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {industry.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#02DFA6] group-hover:gap-2 transition-all">
                  Learn more
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/home"
            className="text-muted-foreground hover:text-[#02DFA6] text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
