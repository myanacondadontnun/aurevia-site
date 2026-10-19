export const SITE_URL = "https://aurevia.io";

/** Absolute, trailing-slash URL for an internal path ("/products" -> "https://aurevia.io/products/"). */
export function absoluteUrl(path: string) {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean.endsWith("/") ? clean : `${clean}/`}`;
}

export interface Crumb {
  name: string;
  /** Internal path, e.g. "/products". */
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Only pass questions that are visible on the page, with the same answer text. */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Aurevia",
  legalName: "Aurevia Artificial Intelligence Ltd",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  sameAs: [
    "https://www.linkedin.com/company/aurevia-ai/",
    "https://www.instagram.com/aurevia_io",
    "https://www.facebook.com/profile.php?id=61571429595824",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Aurevia",
  url: `${SITE_URL}/`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en",
};
