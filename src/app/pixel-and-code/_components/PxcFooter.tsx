import PcMark from "./PcMark";

interface FooterLink {
  href: string;
  label: string;
}

// The top link row (footer__links) genuinely differs per page in the source
// site (e.g. home shows "Services", other pages swap it for "Process") — callers
// pass their own exact set. The solutions row and bottom bar are identical everywhere.
export default function PxcFooter({ links }: { links: FooterLink[] }) {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__logo">
          <PcMark size="md" />
          <span className="footer__wordmark">
            <span className="logo-pixel">Pixel</span><span className="logo-amp">&amp;</span><span className="logo-code">Code</span>
          </span>
          <a href="/home/" className="footer__by">by Aurevia</a>
        </div>
        <div className="footer__links">
          <a href="mailto:sales@aurevia.io">sales@aurevia.io</a>
          {links.map((link) => (
            <a key={link.label} href={link.href} data-link>{link.label}</a>
          ))}
        </div>
      </div>
      <div className="footer__solutions">
        <span className="footer__solutions-label">Solutions</span>
        <a href="/pixel-and-code/shopify-brand-building/" data-link>Shopify Brand Building</a>
        <a href="/pixel-and-code/web-app-development/" data-link>Websites &amp; Web Apps</a>
        <a href="/pixel-and-code/ai-automation/" data-link>AI &amp; Automation</a>
        <a href="/pixel-and-code/saas-development/" data-link>SaaS Product Development</a>
        <a href="/pixel-and-code/recruitment-platform-development/" data-link>Recruitment Platforms</a>
        <a href="/pixel-and-code/development-partners/" data-link>For Agencies</a>
      </div>
      <div className="footer__bottom">
        <span>© <span data-year>2026</span> Pixel &amp; Code</span>
        <span>Shopify brands, websites and AI automation.</span>
      </div>
    </footer>
  );
}
