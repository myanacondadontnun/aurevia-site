import type { Metadata } from "next";
import BookDemo from "@/components/BookDemo";

const title = "Book a free 30-minute demo | Aurevia";
const desc = "See the Aurevia AI sales agent running on a Shopify store like yours, then pick a time that suits you.";

export const metadata: Metadata = {
  title,
  description: desc,
  alternates: { canonical: "/book-demo" },
  openGraph: { title, description: desc, url: "https://aurevia.io/book-demo/" },
};

export default function BookDemoPage() {
  return <BookDemo />;
}
