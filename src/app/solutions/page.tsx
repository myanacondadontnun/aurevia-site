import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import IndustriesShowcase from "@/components/IndustriesShowcase";
import ROICalculatorCTACard from "@/components/ROICalculatorCTACard";
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
            <h1 className="text-4xl md:text-5xl font-inter font-normal text-white text-center mb-4">
              All <span className="green-highlight">industries</span>
            </h1>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto page-subheader">
              AI solutions tailored to your industry. See how Aurevia helps Shopify merchants in every vertical.
            </p>
          </header>

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

          <ROICalculatorCTACard />
        </div>
      </section>
    </PageLayout>
  );
}
