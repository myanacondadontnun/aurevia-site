/**
 * Verified Shopify App Store reviews for Aurevia (apps.shopify.com/aurevia-io), quoted verbatim.
 * Re-check the listing before adding to this list; never paraphrase a review.
 */

export const SHOPIFY_LISTING_URL = "https://apps.shopify.com/aurevia-io";
export const SHOPIFY_RATING = 5.0;
export const SHOPIFY_REVIEW_COUNT = 6;

export interface Review {
  id: string;
  store: string;
  country: string;
  date: string;
  quote: string;
}

export const reviews: Review[] = [
  {
    id: "purebronze",
    store: "PUREBRONZE_TANNING",
    country: "United Kingdom",
    date: "2026-05-15",
    quote:
      "Instead of answering the same questions over and over about products, shipping, and availability, the AI handles many of them for us. It saves time so I can focus on running the business.",
  },
  {
    id: "masks-capes",
    store: "Masks & Capes",
    country: "United States",
    date: "2026-06-04",
    quote:
      "The biggest thing Aurevia changed for us is how quickly customers get guided to the right product. People don't have to dig around or wait for a reply, and that has made the shopping experience feel much smoother.",
  },
  {
    id: "chawla",
    store: "Chawla Fabrics",
    country: "Pakistan",
    date: "2026-06-04",
    quote:
      "I only spent a short time testing the app, but I was impressed by how easy everything was to understand. The interface is clean, setup was quick, and getting the AI running took very little effort.",
  },
  {
    id: "fresh-famous",
    store: "Fresh And Famous",
    country: "Canada",
    date: "2026-08-25",
    quote:
      "The setup was surprisingly simple, and i was able to get Aurevia running on my store with much technical work. The interface is clean and easy to understand. Definitely worth testing if you want to add AI assistance to your store",
  },
  {
    id: "l1nk",
    store: "L1NK",
    country: "United Kingdom",
    date: "2026-09-14",
    quote:
      "The thing i like most is not even what I installed it for. Customers ask questions completely different to how we write our product pages. Seeing those conversations has helped us understand what people are really looking for",
  },
  {
    id: "littleangel",
    store: "LittleAngelDreams",
    country: "United States",
    date: "2026-08-25",
    quote:
      "Aurevia has been a nice time-saver for my store. Having an AI agent handle routine questions means I can spend more time focusing on other parts of the business.",
  },
];

export function getReview(id: string): Review {
  const r = reviews.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown review id: ${id}`);
  return r;
}
