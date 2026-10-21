import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogListing from "@/components/BlogListing";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import b from "@/components/blog/blog.module.css";

export const metadata: Metadata = {
  title: "Blog | Aurevia Resources",
  description:
    "Research-backed guides on AI sales, Shopify optimisation, checkout abandonment, and e-commerce growth strategies.",
  alternates: {
    canonical: "/resources/blogs",
  },
  openGraph: {
    title: "Blog | Aurevia",
    description:
      "Research-backed guides on AI sales, Shopify optimisation, and e-commerce growth.",
    url: "https://aurevia.io/resources/blogs",
  },
};

export default function BlogsPage() {
  return (
    <div className={b.page}>
      <Navbar />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }, { name: "Blog", path: "/resources/blogs" }])} />
      <main id="main-content" className={b.main}>
        <BlogListing />
      </main>
      <Footer />
    </div>
  );
}
