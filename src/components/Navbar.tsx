"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  Menu,
  Store,
  X,
} from "lucide-react";
import { GmailLogo, ShopifyMark } from "@/components/BrandLogos";
import { ChannelBadge, InstagramGlyph, WhatsAppGlyph, type ChannelKind } from "@/components/ChannelIcons";
import { CHANNELS } from "@/lib/channels";
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHOPIFY_APP_URL } from "@/lib/utils";

// One consolidated Solutions mega-menu: By goal · By industry. (Capabilities live under Platform.)
const solutionsByGoal = [
  { label: "Increase sales", href: "/solutions/conversion", desc: "Turn browsing into orders." },
  { label: "Reduce cart abandonment", href: "/products/cart-recovery", desc: "Win carts back in the chat and by email." },
  { label: "Automate support", href: "/solutions/support", desc: "Answer the routine, hand over the rest." },
  { label: "Increase AOV", href: "/products/recommendations", desc: "Add-ons and bundles that fit the cart." },
  { label: "Customer insights", href: "/products/roi-tracking", desc: "See what shoppers ask and what sells." },
  { label: "Qualify leads", href: "/products/lead-qualification", desc: "Capture buying intent from every chat." },
];

const solutionsByIndustry = [
  { label: "Fashion & apparel", href: "/solutions/fashion", img: "/images/fashion-apparel.webp", desc: "Fit and style before the return label." },
  { label: "Health & beauty", href: "/solutions/beauty", img: "/images/health-beauty.webp", desc: "Skin type and routine first." },
  { label: "Fitness & supplements", href: "/solutions/fitness", img: "/images/fitness.webp", desc: "Goals, sizing and the right stack." },
  { label: "Electronics", href: "/solutions/electronics", img: "/images/electronics.webp", desc: "Specs in plain words, no wrong ports." },
  { label: "Home & garden", href: "/solutions/home-garden", img: "/images/home-garden.webp", desc: "Size, space and style in one answer." },
];

// Platform: what the agent does, one plain line each (the mobile menu lists the same rows).
const platformPillars: {
  title: string;
  desc: string;
  href: string;
  badge?: string;
}[] = [
  { title: "AI sales agent", desc: "Finds the right products and adds them to the cart in the chat.", href: "/products/recommendations" },
  { title: "Support answers", desc: "Shipping, returns and product questions, answered from your policies.", href: "/products/automated-responses" },
  { title: "Cart recovery", desc: "A nudge in the chat, then a follow-up email once they leave.", href: "/products/cart-recovery" },
  { title: "Live takeover & tickets", desc: "Step into any chat. Handoffs arrive as tickets with the cart attached.", href: "/products/ticket-management" },
  { title: "Dashboard & ROI", desc: "Revenue the agent influenced, and Ask Aurevia for everything else.", href: "/products/roi-tracking" },
];

const resourcesItems = [
  { label: "Blogs", href: "/resources/blogs", desc: "Guides on selling more on Shopify." },
  { label: "ROI calculator", href: "/resources/roi-calculator", desc: "Estimate what the agent could earn you." },
  { label: "Documentation", href: "/help", desc: "Setup and how-to guides." },
  { label: "Partners", href: "/partners", desc: "For agencies and referrers." },
];

const navigationLinks: { label: string; href: string }[] = [
  { label: "Pricing", href: "/pricing" },
];

/** A channel as a small flat app icon: the brand's own fill and glyph (Shopify's bag for the store, Gmail's logo on
    white for email). */
function ChannelTile({ kind, small = false }: { kind: ChannelKind; small?: boolean }) {
  return (
    <span className={`nav-channel-tile nav-channel-tile-${kind} ${small ? "nav-channel-tile-sm" : ""}`} aria-hidden="true">
      {kind === "whatsapp" ? <WhatsAppGlyph /> : kind === "instagram" ? <InstagramGlyph /> : kind === "email" ? <GmailLogo /> : <ShopifyMark />}
    </span>
  );
}

// Runs before paint in the browser (so the nav's over-hero colour is right on the first frame) and
// falls back to useEffect during server rendering, where useLayoutEffect would warn.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function isHomePath(pathname: string | null) {
  if (!pathname) return false;
  return pathname === "/home" || pathname === "/home/" || pathname === "/";
}

export default function Navbar() {
  const pathname = usePathname();
  const showHomeCtaSwarm = isHomePath(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"platform" | "channels" | "solutions" | "resources" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<"platform" | "channels" | "solutions" | "resources" | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // The grey capsule that glides under the hovered link.
  const linksRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState({ x: 0, w: 0, on: false });
  const moveIndicator = (el: HTMLElement) => {
    const box = linksRef.current?.getBoundingClientRect();
    if (!box) return;
    const r = el.getBoundingClientRect();
    setHover({ x: r.left - box.left, w: r.width, on: true });
  };
  const scrollYRef = useRef(0);
  const wasMenuOpenRef = useRef(false);

  const handleDropdownEnter = (name: "platform" | "channels" | "solutions" | "resources") => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(name);
  };

  const handleDropdownLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 80);
  };

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setMobileExpanded(null);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    if (isMobileMenuOpen) {
      setMobileExpanded(null);
    }
  }, [isMobileMenuOpen]);

  const toggleMobileExpanded = (name: "platform" | "channels" | "solutions" | "resources") => {
    setMobileExpanded(prev => prev === name ? null : name);
  };

  useIsoLayoutEffect(() => {
    const update = () => {
      setIsScrolled(window.scrollY > 100);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);


  useEffect(() => {
    if (isMobileMenuOpen) {
      wasMenuOpenRef.current = true;
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Only after the menu was open (not on first load). Instant, not smooth: html has
      // scroll-behavior: smooth, which made closing the menu visibly scroll the page back from the top.
      if (wasMenuOpenRef.current) {
        wasMenuOpenRef.current = false;
        window.scrollTo({ top: scrollYRef.current, behavior: "instant" });
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const navbar = document.getElementById("navbar");
        if (navbar && !navbar.contains(event.target as Node)) {
          closeMobileMenu();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <nav
      className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-2 sm:px-4 md:px-6"
      id="navbar"
      aria-label="Main navigation"
    >
      <div
        className={`nav-pill ${isMobileMenuOpen ? "nav-pill-open" : ""} transition-all duration-500 ease-in-out mx-auto relative`}
        style={{
          width: isScrolled ? "90%" : "100%",
          maxWidth: isScrolled ? "1200px" : "100%",
          // Open, the pill becomes a solid panel holding the menu, so header and drawer read as one surface.
          borderRadius: isMobileMenuOpen ? "28px" : "9999px",
        }}
      >
        <div className={`flex items-center justify-between w-full transition-all duration-500 ${isScrolled ? "px-2 py-1.5 sm:pl-4 sm:pr-1.5" : "px-2.5 py-1.5 sm:pl-5 sm:pr-2"}`}>
          <Link href="/" className="flex items-center flex-shrink-0 lg:w-48" aria-label="Aurevia.io home">
            <img
              src="/images/aurevia-logo-mark.webp"
              alt="Aurevia Logo"
              className="h-6 w-6 sm:h-7 sm:w-7 object-contain"
            />
            <span className={`logo-text font-fraunces font-medium text-foreground text-lg sm:text-xl whitespace-nowrap overflow-hidden transition-all duration-500 ${isScrolled ? "lg:max-w-0 lg:ml-0 lg:opacity-0" : "lg:max-w-sm ml-2.5 lg:opacity-100"} hidden lg:block`}>
              Aurevia.io
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div
              ref={linksRef}
              className="nav-links"
              onMouseLeave={() => setHover((h) => ({ ...h, on: false }))}
            >
              <span
                className={`nav-indicator ${hover.on ? "nav-indicator-on" : ""}`}
                style={{ width: hover.w, transform: `translateX(${hover.x}px)` }}
                aria-hidden="true"
              />
              {/* Platform with dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("platform")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "platform"}
                  onClick={() => handleDropdownEnter("platform")}
                  onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                  onFocus={(e) => moveIndicator(e.currentTarget)}
                  className="nav-link"
                >
                  Platform
                  <ChevronDown aria-hidden="true" />
                </button>
                {openDropdown === "platform" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3" role="menu" aria-label="Platform menu">
                    <div className="nav-panel nav-menu nav-platform">
                      <div className="nav-platform-main">
                        <div className="nav-platform-list">
                          {platformPillars.map(({ title, desc, href, badge }) => (
                            <Link key={title} href={href} role="menuitem" className="nav-item nav-plain">
                              <span className="nav-channel-text">
                                <span className="nav-item-title">
                                  {title}
                                  {badge && <span className="nav-new">{badge}</span>}
                                </span>
                                <span className="nav-item-desc">{desc}</span>
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="nav-platform-links">
                          <Link href="/why-aurevia" role="menuitem" className="nav-more">
                            Why Aurevia <ArrowRight aria-hidden="true" />
                          </Link>
                          <Link href="/pricing" role="menuitem" className="nav-more">
                            Pricing <ArrowRight aria-hidden="true" />
                          </Link>
                        </div>
                      </div>

                      {/* Trial card with a real dashboard capture bleeding off its corner. */}
                      <a href={SHOPIFY_APP_URL} target="_blank" rel="noopener noreferrer" role="menuitem" className="nav-promo">
                        <span className="nav-promo-eyebrow">Free for 14 days</span>
                        <span className="nav-promo-title">See Aurevia on your own store</span>
                        <span className="nav-promo-text">Install from the Shopify App Store, sync your catalogue and watch the first chats come in.</span>
                        <span className="nav-promo-cta">
                          Start free trial <ArrowRight aria-hidden="true" />
                        </span>
                        <img src="/images/app/dashboard-desktop.webp" alt="" className="nav-promo-shot" />
                      </a>

                      <div className="nav-platform-strip">
                        <span className="nav-strip-label">Works with</span>
                        <span className="nav-strip-item"><ShopifyMark /> Shopify</span>
                        <span className="nav-strip-rule" aria-hidden="true" />
                        <span className="nav-strip-label">Answers on</span>
                        <span className="nav-strip-item"><Store aria-hidden="true" /> Store chat</span>
                        <span className="nav-strip-item"><Mail aria-hidden="true" /> Email</span>
                        <span className="nav-strip-item"><WhatsAppGlyph /> WhatsApp</span>
                        <span className="nav-strip-item"><InstagramGlyph /> Instagram</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Channels with dropdown: each channel has its own page */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("channels")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "channels"}
                  onClick={() => handleDropdownEnter("channels")}
                  onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                  onFocus={(e) => moveIndicator(e.currentTarget)}
                  className="nav-link"
                >
                  Channels
                  <ChevronDown aria-hidden="true" />
                </button>
                {openDropdown === "channels" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3" role="menu" aria-label="Channels menu">
                    <div className="nav-panel nav-menu nav-channels">
                      <div className="nav-channels-list">
                        {CHANNELS.map((ch) => (
                          <Link key={ch.kind} href={ch.href} role="menuitem" className="nav-item nav-channel">
                            <ChannelTile kind={ch.kind} />
                            <span className="nav-channel-text">
                              <span className="nav-item-title">
                                {ch.name}
                                {ch.isNew && <span className="nav-new">New</span>}
                              </span>
                              <span className="nav-item-desc">{ch.menu}</span>
                            </span>
                          </Link>
                        ))}
                      </div>

                      {/* One agent across all four: a still inbox with a message from each channel. */}
                      <Link href="/why-aurevia" role="menuitem" className="nav-channels-card">
                        <span className="nav-promo-eyebrow">One agent, every channel</span>
                        <span className="nav-promo-title">Same answers wherever they ask</span>
                        <span className="nav-mini-inbox" aria-hidden="true">
                          {(
                            [
                              ["whatsapp", "Where's my order #1042?"],
                              ["instagram", "Is this available in M?"],
                              ["email", "Do the boots run small?"],
                            ] as const
                          ).map(([kind, text]) => (
                            <span key={kind} className="nav-mini-row">
                              <ChannelTile kind={kind} small />
                              <span className="nav-mini-text">{text}</span>
                              <span className="nav-mini-tick"><Check /></span>
                            </span>
                          ))}
                        </span>
                        <span className="nav-more nav-channels-more">
                          See why Aurevia <ArrowRight aria-hidden="true" />
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions with dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("solutions")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "solutions"}
                  onClick={() => handleDropdownEnter("solutions")}
                  onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                  onFocus={(e) => moveIndicator(e.currentTarget)}
                  className="nav-link"
                >
                  Solutions
                  <ChevronDown aria-hidden="true" />
                </button>
                {openDropdown === "solutions" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3" role="menu" aria-label="Solutions menu">
                    <div className="nav-panel nav-menu nav-solutions">
                      <div className="nav-solutions-col">
                        <p className="nav-menu-head">By goal</p>
                        {solutionsByGoal.map(({ label, href, desc }) => (
                          <Link key={label} href={href} role="menuitem" className="nav-item nav-plain">
                            <span className="nav-channel-text">
                              <span className="nav-item-title">{label}</span>
                              <span className="nav-item-desc">{desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="nav-solutions-col">
                        <p className="nav-menu-head">By industry</p>
                        {solutionsByIndustry.map((item) => (
                          <Link key={item.label} href={item.href} role="menuitem" className="nav-item nav-industry">
                            <img src={item.img} alt="" className="nav-industry-img" />
                            <span className="nav-channel-text">
                              <span className="nav-item-title">{item.label}</span>
                              <span className="nav-item-desc">{item.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="nav-menu-foot">
                        <Link href="/solutions" role="menuitem" className="nav-more">
                          See all use cases <ArrowRight aria-hidden="true" />
                        </Link>
                        <Link href="/solutions#industries" role="menuitem" className="nav-more">
                          See all industries <ArrowRight aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources with dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("resources")}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "resources"}
                  onClick={() => handleDropdownEnter("resources")}
                  onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                  onFocus={(e) => moveIndicator(e.currentTarget)}
                  className="nav-link"
                >
                  Resources
                  <ChevronDown aria-hidden="true" />
                </button>
                {openDropdown === "resources" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3" role="menu" aria-label="Resources menu">
                    <div className="nav-panel nav-menu nav-resources">
                      <div className="nav-resources-list">
                        {resourcesItems.map(({ label, href, desc }) => (
                          <Link key={label} href={href} role="menuitem" className="nav-item nav-plain">
                            <span className="nav-channel-text">
                              <span className="nav-item-title">{label}</span>
                              <span className="nav-item-desc">{desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>

                      {/* The free store audit, the one resource with a person behind it. */}
                      <Link href="/resources/review-my-shopify" role="menuitem" className="nav-channels-card nav-audit">
                        <span className="nav-promo-eyebrow">Free store audit</span>
                        <span className="nav-promo-title">Review My Shopify</span>
                        <span className="nav-promo-text">Send us your store and get a prioritised action plan from our team within 24 hours.</span>
                        <span className="nav-audit-list" aria-hidden="true">
                          {["Product pages and collections", "Trust and credibility", "SEO and mobile"].map((t) => (
                            <span key={t} className="nav-mini-row">
                              <span className="nav-mini-tick"><Check /></span>
                              <span className="nav-mini-text">{t}</span>
                            </span>
                          ))}
                        </span>
                        <span className="nav-more nav-channels-more">
                          Get my audit <ArrowRight aria-hidden="true" />
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {navigationLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                    onFocus={(e) => moveIndicator(e.currentTarget)}
                    className="nav-link"
                  >
                    {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA + Mobile Menu */}
          <div className="flex items-center gap-2">
            <a href="https://app.aurevia.io" className={`hidden lg:inline-flex nav-login`}>
              Log in
            </a>
            <span className={`hidden lg:block nav-divider`} aria-hidden="true" />
            {showHomeCtaSwarm ? (
              <Button
                asChild
                className={`nav-cta bg-[var(--au-green)] text-white hover:bg-[var(--au-green-hover)] font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2 border-0 flex-shrink-0 h-[42px] ${isScrolled ? "px-4" : "px-5"} text-sm xl:text-[15px]`}
              >
                <a
                  href={SHOPIFY_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Start your free Aurevia trial on Shopify"
                  className="flex items-center justify-center gap-2"
                >
                  <span className="relative z-[3] flex items-center gap-2">
                    <span className="hidden sm:inline">Start free trial</span>
                    <span className="sm:hidden">Start trial</span>
                    <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4 cta-arrow" aria-hidden="true" />
                  </span>
                </a>
              </Button>
            ) : (
              <Button
                asChild
                className={`nav-cta bg-[var(--au-green)] text-white hover:bg-[var(--au-green-hover)] font-semibold rounded-full transition-all duration-200 flex items-center gap-2 border-0 flex-shrink-0 h-[42px] ${isScrolled ? "px-4" : "px-5"} text-sm xl:text-[15px]`}
              >
                <a
                  href={SHOPIFY_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Start your free Aurevia trial on Shopify"
                  className="flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Start free trial</span>
                  <span className="sm:hidden">Start trial</span>
                  <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4 cta-arrow" aria-hidden="true" />
                </a>
              </Button>
            )}
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden text-foreground hover:text-[#00665A] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            role="menu"
            className={`nav-mobile-menu lg:hidden border-t border-border/30 bg-white rounded-b-[28px] max-h-[75vh] overflow-y-auto overscroll-contain`}
          >
            <div className="px-4 py-4 space-y-1">
              {/* Platform expandable */}
              <div>
                <button
                  onClick={() => toggleMobileExpanded("platform")}
                  aria-expanded={mobileExpanded === "platform"}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-foreground hover:text-[#00665A] hover:bg-[rgb(0_127_104/0.08)] transition-all duration-200 rounded-lg text-sm font-medium"
                >
                  <span className="flex-1 text-left">Platform</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === "platform" ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {mobileExpanded === "platform" && (
                  <div className="pl-4 pb-2 space-y-1">
                    {platformPillars.map((pillar) => (
                      <Link
                        key={pillar.title}
                        href={pillar.href}
                        onClick={closeMobileMenu}
                        role="menuitem"
                        className="flex items-start gap-3 w-full text-left pl-6 pr-3 py-2 text-muted-foreground hover:text-[#00665A] hover:bg-[rgb(0_127_104/0.08)] transition-all duration-200 rounded-lg text-sm font-medium"
                      >
                        <span>
                          <span className="font-medium text-foreground">{pillar.title}</span>
                          {pillar.badge && (
                            <span className="nav-badge ml-2">
                              {pillar.badge}
                            </span>
                          )}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Channels expandable */}
              <div>
                <button
                  onClick={() => toggleMobileExpanded("channels")}
                  aria-expanded={mobileExpanded === "channels"}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-foreground hover:text-[#00665A] hover:bg-[rgb(0_127_104/0.08)] transition-all duration-200 rounded-lg text-sm font-medium"
                >
                  <span className="flex-1 text-left">Channels</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === "channels" ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {mobileExpanded === "channels" && (
                  <div className="pl-4 pb-2 space-y-1">
                    {CHANNELS.map((ch) => (
                      <Link
                        key={ch.kind}
                        href={ch.href}
                        onClick={closeMobileMenu}
                        role="menuitem"
                        className="flex items-center gap-3 w-full text-left pl-3 pr-3 py-2 hover:bg-[rgb(0_127_104/0.08)] transition-all duration-200 rounded-lg text-sm font-medium"
                      >
                        <ChannelBadge kind={ch.kind} className="h-7 w-7 rounded-[9px]" />
                        <span className="font-medium text-foreground">{ch.name}</span>
                        {ch.isNew && <span className="nav-badge">New</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Solutions expandable */}
              <div>
                <button
                  onClick={() => toggleMobileExpanded("solutions")}
                  aria-expanded={mobileExpanded === "solutions"}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-foreground hover:text-[#00665A] hover:bg-[rgb(0_127_104/0.08)] transition-all duration-200 rounded-lg text-sm font-medium"
                >
                  <span className="flex-1 text-left">Solutions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === "solutions" ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {mobileExpanded === "solutions" && (
                  <div className="pl-4 pb-2 space-y-1">
                    {[
                      { heading: "By goal", items: solutionsByGoal, seeAll: { href: "/solutions", label: "See all use cases" } },
                      { heading: "By industry", items: solutionsByIndustry, seeAll: { href: "/solutions#industries", label: "View all industries" } },
                    ].map((col) => (
                      <div key={col.heading} className="py-1">
                        <span className="block px-3 py-1 text-[13px] font-semibold text-[color:var(--au-ink-3)]">
                          {col.heading}
                        </span>
                        {col.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={closeMobileMenu}
                            role="menuitem"
                            className="flex items-center gap-2.5 w-full text-left pl-6 pr-3 py-2 text-muted-foreground hover:text-[#00665A] hover:bg-[rgb(0_127_104/0.08)] transition-all duration-200 rounded-lg text-sm font-medium"
                          >
                            {item.label}
                          </Link>
                        ))}
                        <Link
                          href={col.seeAll.href}
                          onClick={closeMobileMenu}
                          className="block pl-6 pr-3 py-2 text-sm font-medium text-[#00665A] hover:underline"
                        >
                          {col.seeAll.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources expandable */}
              <div>
                <button
                  onClick={() => toggleMobileExpanded("resources")}
                  aria-expanded={mobileExpanded === "resources"}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-foreground hover:text-[#00665A] hover:bg-[rgb(0_127_104/0.08)] transition-all duration-200 rounded-lg text-sm font-medium"
                >
                  <span className="flex-1 text-left">Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === "resources" ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {mobileExpanded === "resources" && (
                  <div className="pl-4 pb-2 space-y-1">
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        role="menuitem"
                        className="flex items-center gap-2.5 w-full text-left pl-6 pr-3 py-2 text-muted-foreground hover:text-[#00665A] hover:bg-[rgb(0_127_104/0.08)] transition-all duration-200 rounded-lg text-sm font-medium"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navigationLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    role="menuitem"
                    className="block w-full text-left px-3 py-2.5 text-foreground hover:text-[#00665A] hover:bg-[rgb(0_127_104/0.08)] transition-all duration-200 rounded-lg text-sm font-medium"
                  >
                    {item.label}
                </Link>
              ))}
              <a
                href="https://app.aurevia.io"
                onClick={closeMobileMenu}
                role="menuitem"
                className="block w-full text-left px-3 py-2.5 text-foreground hover:text-[#00665A] hover:bg-[rgb(0_127_104/0.08)] transition-all duration-200 rounded-lg text-sm font-medium"
              >
                Log in
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
