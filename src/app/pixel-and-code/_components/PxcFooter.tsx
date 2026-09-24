import PcMark from "./PcMark";

interface FooterLink {
  href: string;
  label: string;
}

// A proper sitemap footer, shared by every /pixel-and-code/* page:
//  - brand column: who we are, email, the two founders on LinkedIn
//  - Services / Work / Studio columns (Studio takes the caller's per-page links,
//    since the home page uses in-page anchors and sub-pages use absolute ones)
//  - Aurevia column: back-links into the parent site, which is the studio's
//    own credential and the domain this section lives under
//  - bottom bar: copyright, legal, and the one-line positioning
// Plain <a> tags throughout — see layout.tsx for why.
const services: FooterLink[] = [
  { href: "/pixel-and-code/shopify-brand-building/", label: "Shopify brand building" },
  { href: "/pixel-and-code/web-app-development/", label: "Websites & web apps" },
  { href: "/pixel-and-code/ai-automation/", label: "AI & automation" },
  { href: "/pixel-and-code/saas-development/", label: "SaaS product development" },
  { href: "/pixel-and-code/recruitment-platform-development/", label: "Recruitment platforms" },
  { href: "/pixel-and-code/development-partners/", label: "For agencies (white-label)" },
];

const work: (FooterLink & { external?: boolean })[] = [
  { href: "https://sreyacreates.com/", label: "Sreya Creates", external: true },
  { href: "/pixel-and-code/aurevia-io/", label: "Aurevia — how we built it" },
  { href: "/pixel-and-code/jcrpharma-co-uk/", label: "JCR Pharma — case study" },
  { href: "https://www.mastersinminds.com/", label: "Masters in Minds", external: true },
  { href: "https://www.expeditecommerce.com/cpq-software/", label: "AI CPQ Agent", external: true },
];

const aurevia: (FooterLink & { external?: boolean })[] = [
  { href: "/home/", label: "Aurevia.io" },
  { href: "/products/", label: "AI sales agent for Shopify" },
  { href: "/solutions/", label: "Solutions" },
  { href: "/pricing/", label: "Aurevia pricing" },
  { href: "/resources/", label: "Resources & blog" },
  { href: "https://apps.shopify.com/aurevia-io", label: "Aurevia on the Shopify App Store", external: true },
];

export default function PxcFooter({ links }: { links: FooterLink[] }) {
  const studio: FooterLink[] = [
    { href: "/pixel-and-code/about/", label: "About the studio" },
    ...links.filter((l) => l.label.toLowerCase() !== "about"),
  ];
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <PcMark size="md" />
            <span className="footer__wordmark">
              <span className="logo-pixel">Pixel</span><span className="logo-amp">&amp;</span><span className="logo-code">Code</span>
            </span>
          </div>
          <p className="footer__blurb">
            A Shopify brand and store studio run by two founders. Logo, colour, packaging,
            custom storefronts, websites, web apps and AI automation. Powered by <a href="/home/">Aurevia.io</a>.
          </p>
          <a href="mailto:sales@aurevia.io" className="footer__email" data-track="email_click">sales@aurevia.io</a>
          <div className="footer__people">
            <a href="https://www.linkedin.com/in/ritwik-mandal-gtm/" target="_blank" rel="noopener">Ritwik on LinkedIn &#8599;</a>
            <a href="https://www.linkedin.com/in/kishal/" target="_blank" rel="noopener">Kishal on LinkedIn &#8599;</a>
          </div>
        </div>

        <nav className="footer__col" aria-label="Services">
          <span className="footer__label">Services</span>
          {services.map((l) => <a key={l.label} href={l.href} data-link>{l.label}</a>)}
        </nav>

        <nav className="footer__col" aria-label="Work">
          <span className="footer__label">Work</span>
          {work.map((l) => (
            <a key={l.label} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener" : undefined} data-link>
              {l.label}{l.external ? " ↗" : ""}
            </a>
          ))}
        </nav>

        <nav className="footer__col" aria-label="Studio">
          <span className="footer__label">Studio</span>
          {studio.map((l) => <a key={l.label} href={l.href} data-link>{l.label}</a>)}
        </nav>

        <nav className="footer__col" aria-label="Aurevia">
          <span className="footer__label">Aurevia</span>
          {aurevia.map((l) => (
            <a key={l.label} href={l.href} target={l.external ? "_blank" : undefined} rel={l.external ? "noopener" : undefined} data-link>
              {l.label}{l.external ? " ↗" : ""}
            </a>
          ))}
        </nav>
      </div>

      <div className="footer__bottom">
        <span>&copy; <span data-year>2026</span> Pixel &amp; Code &middot; a studio by <a href="/home/">Aurevia.io</a></span>
        <span className="footer__legal">
          <a href="/privacy-policy/">Privacy</a>
          <a href="/terms/">Terms</a>
          <a href="/gdpr/">GDPR</a>
          <a href="/pixel-and-code/#top">Back to top &#8593;</a>
        </span>
        <span>Shopify brands, websites and AI automation.</span>
      </div>
    </footer>
  );
}
