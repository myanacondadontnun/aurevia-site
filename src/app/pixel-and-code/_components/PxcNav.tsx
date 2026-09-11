import PcMark from "./PcMark";

interface NavLink {
  href: string;
  label: string;
}

// Nav chrome is shared, but the exact link targets differ between the home page
// (in-page anchors like #services) and every other page (absolute anchors back to
// home, like /pixel-and-code/#services) — callers pass their own exact set rather
// than this component guessing a "home vs. sub" variant.
export default function PxcNav({
  logoHref,
  links,
  ctaHref,
  ctaLabel = "Start a project",
  ctaExternal = false,
}: {
  logoHref: string;
  links: NavLink[];
  ctaHref: string;
  ctaLabel?: string;
  ctaExternal?: boolean;
}) {
  return (
    <header className="nav" data-nav>
      <div className="nav__brand">
        <a href={logoHref} className="nav__logo" aria-label="Pixel & Code — home">
          <PcMark />
          <span className="nav__wordmark">
            <span className="logo-pixel">Pixel</span><span className="logo-amp">&amp;</span><span className="logo-code">Code</span>
          </span>
        </a>
        <a href="/home/" className="nav__by">by Aurevia</a>
      </div>
      <nav className="nav__links">
        {links.map((link) => (
          <a key={link.label} href={link.href} data-link>{link.label}</a>
        ))}
        <a href={ctaHref} className="nav__cta" data-track={ctaExternal ? "book_call" : undefined} target={ctaExternal ? "_blank" : undefined} rel={ctaExternal ? "noopener" : undefined}>{ctaLabel}</a>
      </nav>
      <button className="nav__burger" data-burger aria-label="Menu"><span></span><span></span></button>
    </header>
  );
}
