import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FacebookMark, InstagramMark, LinkedInMark } from "@/components/BrandLogos";

/**
 * Site footer, a statement footer (design.md): one Fraunces line that offers a person to talk to (the pages above
 * already end on the free trial), the email and Book a demo, then a single row of links and one quiet legal line
 * with the socials and the studio credit. The still Aurevia ring sits in the bottom-right corner.
 */

type FooterLink = { label: string; href: string };

const LINKS: FooterLink[] = [
  { label: "Why Aurevia", href: "/why-aurevia/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Channels", href: "/channels/store/" },
  { label: "Documentation", href: "/help/" },
  { label: "Blogs", href: "/resources/blogs/" },
  { label: "Review My Shopify", href: "/resources/review-my-shopify/" },
  { label: "Partners", href: "/partners/" },
  { label: "Contact", href: "/contact/" },
];

const LEGAL: FooterLink[] = [
  { label: "Privacy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
  { label: "GDPR", href: "/gdpr/" },
];

const SOCIALS: (FooterLink & { Mark: typeof InstagramMark })[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/aurevia-ai/", Mark: LinkedInMark },
  { label: "Instagram", href: "https://www.instagram.com/aurevia_io", Mark: InstagramMark },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61571429595824#", Mark: FacebookMark },
];

export default function Footer() {
  return (
    <footer className="ft-footer" aria-label="Footer">
      <span className="ft-watermark" aria-hidden="true" />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 ft-inner">
        <div className="ft-statement">
          <p className="ft-line">Questions first? Talk to the people who build Aurevia.</p>
          <div className="ft-actions">
            <a href="mailto:sales@aurevia.io" className="ft-email">sales@aurevia.io</a>
            <a href="/book-demo/" className="ft-demo">
              Book a demo <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav className="ft-nav" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="ft-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ft-base">
          {/* Company number and registered office: required by platform reviewers (Meta access verification asks
              for "details of the business providing the service") and by UK company disclosure rules. */}
          <div className="ft-legal">
            <Link href="/" className="ft-brand" aria-label="Aurevia.io home">
              <img src="/images/aurevia-logo-mark.webp" alt="" />
              Aurevia.io
            </Link>
            <span>© {new Date().getFullYear()} Aurevia Artificial Intelligence Ltd</span>
            <span>Registered in England &amp; Wales, no. 16622049 · 2 North Road, Cardiff, CF10 3DY</span>
            {LEGAL.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
          {/* Plain <a> for the studio credit, not <Link>: /pixel-and-code is a self-contained section whose vanilla
              script re-initialises on a real navigation, which a Next client-side transition would skip. */}
          <div className="ft-meta">
            <span className="ft-socials">
              {SOCIALS.map(({ label, href, Mark }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Aurevia on ${label}`} className="ft-social">
                  <Mark />
                </a>
              ))}
            </span>
            <span>
              Built by <a href="/pixel-and-code/" className="ft-studio">Pixel &amp; Code</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
