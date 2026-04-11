import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import BlogListing from "@/components/BlogListing";

export const metadata: Metadata = {
  title: "Blog | Aurevia Resources",
  description:
    "Research-backed guides on AI sales, Shopify optimization, checkout abandonment, and e-commerce growth strategies.",
  alternates: {
    canonical: "/resources/blogs",
  },
  openGraph: {
    title: "Blog | Aurevia",
    description:
      "Research-backed guides on AI sales, Shopify optimization, and e-commerce growth.",
    url: "https://aurevia.io/resources/blogs",
  },
};

export default function BlogsPage() {
  return (
    <PageLayout>
      <BlogListing />
    </PageLayout>
  );
}
