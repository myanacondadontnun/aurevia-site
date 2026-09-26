import type { Metadata } from "next";

const title = "Pricing | Aurevia — Shopify AI Sales Agent";
const desc =
  "Starter, Growth, Pro and Scale plans from $19/month, billed through Shopify. 14-day free trial, no card required. Message top-ups that never expire.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/pricing" },
  openGraph: { title, description: desc, url: "https://aurevia.io/pricing/" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
