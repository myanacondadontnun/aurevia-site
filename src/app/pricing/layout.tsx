import type { Metadata } from "next";

const title = "Pricing | Aurevia: Shopify AI Sales Agent";
const desc =
  "A free plan, then Starter at $19, Pro at $89 and Scale at $149 a month, billed through Shopify. 14-day free trial on every paid plan, and extra messages at $10 per 250.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/pricing" },
  openGraph: { title, description: desc, url: "https://aurevia.io/pricing/" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
