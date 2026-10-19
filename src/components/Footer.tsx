"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { openShopifyInstall } from "@/lib/utils";
import { FacebookMark, InstagramMark, LinkedInMark } from "@/components/BrandLogos";

/**
 * Site footer: the hero's warm paper and emerald, with the Aurevia ring large and still in the bottom-right corner.
 * Left, the brand, one line and the two pill buttons; right, four link columns; under a hairline, the legal line,
 * the socials and the studio credit.
 */

type FooterLink = { label: string; href: string };

const COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "Channels", href: "/channels/" },
      { label: "Book a demo", href: "/book-demo/" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blogs", href: "/resources/blogs/" },
      { label: "Review My Shopify", href: "/resources/review-my-shopify/" },
      { label: "Help center", href: "/help/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Partners", href: "/partners/" },
      { label: "Contact us", href: "/contact/" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Terms", href: "/terms/" },
      { label: "GDPR", href: "/gdpr/" },
    ],
  },
];

const SOCIALS: (FooterLink & { Mark: typeof InstagramMark })[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/aurevia-ai/", Mark: LinkedInMark },
  { label: "Instagram", href: "https://www.instagram.com/aurevia_io", Mark: InstagramMark },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61571429595824#", Mark: FacebookMark },
];

export default function Footer() {
  return (
    <footer className="ft-footer" aria-label="Footer navigation">
      <span className="ft-watermark" aria-hidden="true" />

      <div className={`container mx-auto px-4 sm:px-6 ft-inner`}>
        <div className="ft-top">
          <div>
            <Link href="/" className="ft-brand" aria-label="Aurevia.io home">
              <img src="/images/aurevia-logo-mark.webp" alt="" />
              <span className="ft-brand-name">Aurevia.io</span>
            </Link>
            <p className="ft-pitch">
              The AI sales agent for <strong>Shopify</strong>.
            </p>
            <div className="ft-ctas">
              <button type="button" onClick={() => openShopifyInstall()} className="ft-primary">
                Start free trial
                <ArrowRight aria-hidden="true" />
              </button>
              <a href="/book-demo/" className="ft-secondary">
                Book a demo
              </a>
            </div>
          </div>

          <nav className="ft-cols" aria-label="Footer">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h2 className="ft-col-head">{col.heading}</h2>
                <ul className="ft-list">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="ft-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="ft-bottom">
          {/* Company number and registered office: required by platform reviewers (Meta access verification asks
              for "details of the business providing the service") and by UK company disclosure rules. */}
          <div className="ft-legal">
            <p>© {new Date().getFullYear()} Aurevia Artificial Intelligence Ltd. All rights reserved.</p>
            <p>Registered in England &amp; Wales, company no. 16622049 · 2 North Road, Cardiff, CF10 3DY</p>
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
