"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Menu,
  X,
  ShoppingCart,
  Headphones,
  BarChart3,
  Store,
  TrendingUp,
  FileText,
  MessageSquare,
  Globe,
  Package,
  Filter,
  BookOpen,
  GitCompare,
  Calculator,
  BookMarked,
  ChevronDown,
  Shirt,
  Sparkles,
  Dumbbell,
  Smartphone,
  Home,
  DollarSign,
  Bot,
  LineChart,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import CTASwarmBackdrop from "@/components/CTASwarmBackdrop";

// One consolidated Solutions mega-menu: By goal · By industry · By capability.
const solutionsByGoal = [
  { icon: TrendingUp, label: "Increase sales", href: "/solutions/conversion" },
  { icon: ShoppingCart, label: "Reduce cart abandonment", href: "/products/cart-recovery" },
  { icon: Headphones, label: "Automate support", href: "/solutions/support" },
  { icon: DollarSign, label: "Increase AOV", href: "/products/recommendations" },
  { icon: BarChart3, label: "Customer insights", href: "/solutions/insights" },
  { icon: Filter, label: "Qualify leads", href: "/products/lead-qualification" },
];

const solutionsByIndustry = [
  { icon: Shirt, label: "Fashion & apparel", href: "/solutions/fashion" },
  { icon: Sparkles, label: "Health & beauty", href: "/solutions/beauty" },
  { icon: Dumbbell, label: "Fitness & supplements", href: "/solutions/fitness" },
  { icon: Smartphone, label: "Electronics", href: "/solutions/electronics" },
  { icon: Home, label: "Home & garden", href: "/solutions/home-garden" },
];

const solutionsByCapability = [
  { icon: Package, label: "AI product recommendations", href: "/products/recommendations" },
  { icon: MessageSquare, label: "AI product questions", href: "/products/automated-responses" },
  { icon: FileText, label: "Ticket management", href: "/products/ticket-management" },
  { icon: Globe, label: "Multilingual support", href: "/products/multilingual" },
  { icon: ShoppingCart, label: "Cart recovery", href: "/products/cart-recovery" },
  { icon: BarChart3, label: "ROI tracking", href: "/products/roi-tracking" },
];

// Platform overview — the product's core pillars, shown as a card grid.
const platformPillars: {
  icon: typeof Bot;
  title: string;
  desc: string;
  href: string;
  badge?: string;
}[] = [
  {
    icon: Bot,
    title: "AI Sales Agent",
    desc: "A consultative agent that runs discovery, recommends products, and closes in the chat.",
    href: "/products/recommendations",
  },
  {
    icon: Headphones,
    title: "AI Support Agent",
    desc: "Catalog-grounded answers and smart escalation—support that never stalls a sale.",
    href: "/products/automated-responses",
  },
  {
    icon: ShoppingCart,
    title: "Cart Recovery",
    desc: "Live, in-session rescue with checkout links the moment a shopper hesitates.",
    href: "/products/cart-recovery",
  },
  {
    icon: LineChart,
    title: "Insights & ROI",
    desc: "Attribute revenue to the AI: assisted sales, AOV lift, and conversation intelligence.",
    href: "/products/roi-tracking",
    badge: "New",
  },
];

const resourcesItems = [
  { icon: BookOpen, label: "Blogs", href: "/resources/blogs", desc: "Latest insights and tips" },
  { icon: GitCompare, label: "AI Agent Comparisons", href: "/resources/ai-comparisons", desc: "Compare AI chatbots for e-commerce" },
  { icon: Calculator, label: "ROI Calculator", href: "/resources/roi-calculator", desc: "Calculate your potential return" },
  { icon: Store, label: "Review My Shopify", href: "/resources/review-my-shopify", desc: "Free professional store audit" },
  { icon: BookMarked, label: "Documentations", href: "/resources/docs", desc: "API guides and setup docs" },
];

const navigationLinks: { label: string; href: string }[] = [
  { label: "Pricing", href: "/pricing" },
];

function isHomePath(pathname: string | null) {
  if (!pathname) return false;
  return pathname === "/home" || pathname === "/home/" || pathname === "/";
}

export default function Navbar() {
  const pathname = usePathname();
  const showHomeCtaSwarm = isHomePath(pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"platform" | "solutions" | "resources" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<"platform" | "solutions" | "resources" | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollYRef = useRef(0);

  const handleDropdownEnter = (name: "platform" | "solutions" | "resources") => {
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

  const toggleMobileExpanded = (name: "platform" | "solutions" | "resources") => {
    setMobileExpanded(prev => prev === name ? null : name);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
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
      window.scrollTo(0, scrollYRef.current);
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
        className="glass-nav shadow-lg transition-all duration-500 ease-in-out mx-auto relative"
        style={{
          width: isScrolled ? "90%" : "100%",
          maxWidth: isScrolled ? "1200px" : "100%",
          borderRadius: "1.5rem",
        }}
      >
        <div className={`flex items-center justify-between w-full transition-all duration-500 ${isScrolled ? "px-2.5 py-2 sm:px-4 sm:py-3" : "px-3 py-2.5 sm:px-6 sm:py-4"}`}>
          <Link href="/home" className="flex items-center flex-shrink-0 lg:w-48" aria-label="Aurevia.io home">
            <img
              src="/images/aurevia-logo-mark.png"
              alt="Aurevia Logo"
              className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
            />
            <span className={`logo-text font-fraunces font-medium text-foreground text-lg sm:text-xl whitespace-nowrap overflow-hidden transition-all duration-500 ${isScrolled ? "lg:max-w-0 lg:ml-0 lg:opacity-0" : "lg:max-w-sm ml-2.5 lg:opacity-100"} hidden lg:block`}>
              Aurevia.io
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-4 xl:space-x-6">
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
                  className={`inline-flex items-center gap-1 text-sm xl:text-base whitespace-nowrap transition-colors duration-200 cursor-default ${openDropdown === "platform" ? "text-[#00CC99]" : "text-foreground hover:text-[#00CC99]"}`}
                >
                  Platform
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === "platform" ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {openDropdown === "platform" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 -mt-px" role="menu" aria-label="Platform menu">
                    <div className="bg-card border border-border rounded-2xl shadow-xl p-4 min-w-[720px] grid grid-cols-2 gap-3">
                      {platformPillars.map((pillar) => (
                        <Link
                          key={pillar.title}
                          href={pillar.href}
                          role="menuitem"
                          className="group flex items-start gap-4 rounded-xl p-4 hover:bg-muted/60 transition-colors"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted group-hover:bg-primary/10 transition-colors" aria-hidden="true">
                            <pillar.icon className="h-5 w-5 text-foreground group-hover:text-[#00CC99] transition-colors" />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2">
                              <span className="text-base font-medium text-foreground group-hover:text-[#00CC99] transition-colors">
                                {pillar.title}
                              </span>
                              {pillar.badge && (
                                <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#00795c]">
                                  {pillar.badge}
                                </span>
                              )}
                              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true" />
                            </span>
                            <span className="mt-1 block text-sm font-light leading-relaxed text-muted-foreground">
                              {pillar.desc}
                            </span>
                          </span>
                        </Link>
                      ))}
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
                  className={`inline-flex items-center gap-1 text-sm xl:text-base whitespace-nowrap transition-colors duration-200 cursor-default ${openDropdown === "solutions" ? "text-[#00CC99]" : "text-foreground hover:text-[#00CC99]"}`}
                >
                  Solutions
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === "solutions" ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {openDropdown === "solutions" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 -mt-px" role="menu" aria-label="Solutions menu">
                    <div className="bg-card border border-border rounded-2xl shadow-xl p-8 min-w-[860px] grid grid-cols-3 gap-x-12 gap-y-6">
                      {[
                        { heading: "By goal", items: solutionsByGoal, seeAll: { href: "/solutions", label: "See all use cases" } },
                        { heading: "By industry", items: solutionsByIndustry, seeAll: { href: "/solutions/industries", label: "View all industries" } },
                        { heading: "By capability", items: solutionsByCapability, seeAll: { href: "/products", label: "See all capabilities" } },
                      ].map((col) => (
                        <div key={col.heading} className="flex flex-col">
                          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                            {col.heading}
                          </h4>
                          <ul className="space-y-2.5">
                            {col.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-[#00CC99] transition-colors group"
                                >
                                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors" aria-hidden="true">
                                    <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-[#00CC99] transition-colors" />
                                  </span>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={col.seeAll.href}
                            className="mt-4 inline-block text-xs font-medium text-[#00CC99] underline underline-offset-4 hover:no-underline"
                          >
                            {col.seeAll.label} →
                          </Link>
                        </div>
                      ))}
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
                  className={`inline-flex items-center gap-1 text-sm xl:text-base whitespace-nowrap transition-colors duration-200 cursor-default ${openDropdown === "resources" ? "text-[#00CC99]" : "text-foreground hover:text-[#00CC99]"}`}
                >
                  Resources
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${openDropdown === "resources" ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {openDropdown === "resources" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 -mt-px" role="menu" aria-label="Resources menu">
                    <div className="bg-card border border-border rounded-xl shadow-xl p-8 min-w-[384px]">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-5">
                        Resources
                      </h4>
                      <ul className="space-y-2">
                        {resourcesItems.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              role="menuitem"
                              className="flex items-center gap-3.5 p-3 rounded-lg group hover:bg-muted/50 transition-colors"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted" aria-hidden="true">
                                <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-[#00CC99] transition-colors" />
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-foreground group-hover:text-[#00CC99] transition-colors">
                                  {item.label}
                                </span>
                                <span className="block text-xs text-muted-foreground">{item.desc}</span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {navigationLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-[#00CC99] transition-all duration-300 text-sm xl:text-base whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA + Mobile Menu */}
          <div className="flex items-center gap-2">
            {showHomeCtaSwarm ? (
              <Button
                asChild
                className={`cta-button cta-button--has-swarm relative overflow-hidden text-primary-foreground font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border-0 flex-shrink-0 ${isScrolled ? "px-3 py-1.5 sm:px-4 sm:py-2" : "px-4 py-2"} text-sm xl:text-base`}
              >
                <a
                  href={SHOPIFY_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Try Aurevia for free on Shopify"
                  className="flex items-center justify-center gap-2"
                >
                  <CTASwarmBackdrop roundedClassName="rounded-lg" />
                  <span className="relative z-[3] flex items-center gap-2">
                    <span className="hidden sm:inline">Try for free on Shopify</span>
                    <span className="sm:hidden">Try free</span>
                    <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4 cta-arrow" aria-hidden="true" />
                  </span>
                </a>
              </Button>
            ) : (
              <Button
                asChild
                className={`cta-button text-primary-foreground font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 border-0 flex-shrink-0 ${isScrolled ? "px-3 py-1.5 sm:px-4 sm:py-2" : "px-4 py-2"} text-sm xl:text-base`}
              >
                <a
                  href={SHOPIFY_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Try Aurevia for free on Shopify"
                  className="flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Try for free on Shopify</span>
                  <span className="sm:hidden">Try free</span>
                  <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4 cta-arrow" aria-hidden="true" />
                </a>
              </Button>
            )}
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden text-foreground hover:text-[#00CC99] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
            className="lg:hidden border-t border-border/30 bg-background/95 backdrop-blur-md rounded-b-2xl max-h-[75vh] overflow-y-auto overscroll-contain"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Platform expandable */}
              <div>
                <button
                  onClick={() => toggleMobileExpanded("platform")}
                  aria-expanded={mobileExpanded === "platform"}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-foreground hover:text-[#00CC99] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
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
                        className="flex items-start gap-3 w-full text-left pl-6 pr-3 py-2 text-muted-foreground hover:text-[#00CC99] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                      >
                        <pillar.icon className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>
                          <span className="font-medium text-foreground">{pillar.title}</span>
                          {pillar.badge && (
                            <span className="ml-2 rounded-full bg-primary/12 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#00795c]">
                              {pillar.badge}
                            </span>
                          )}
                        </span>
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
                  className="flex w-full items-center justify-between px-3 py-2.5 text-foreground hover:text-[#00CC99] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                >
                  <span className="flex-1 text-left">Solutions</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === "solutions" ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {mobileExpanded === "solutions" && (
                  <div className="pl-4 pb-2 space-y-1">
                    {[
                      { heading: "By goal", items: solutionsByGoal, seeAll: { href: "/solutions", label: "See all use cases" } },
                      { heading: "By industry", items: solutionsByIndustry, seeAll: { href: "/solutions/industries", label: "View all industries" } },
                      { heading: "By capability", items: solutionsByCapability, seeAll: { href: "/products", label: "See all capabilities" } },
                    ].map((col) => (
                      <div key={col.heading} className="py-1">
                        <span className="block px-3 py-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                          {col.heading}
                        </span>
                        {col.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={closeMobileMenu}
                            role="menuitem"
                            className="flex items-center gap-2.5 w-full text-left pl-6 pr-3 py-2 text-muted-foreground hover:text-[#00CC99] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                          >
                            <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                            {item.label}
                          </Link>
                        ))}
                        <Link
                          href={col.seeAll.href}
                          onClick={closeMobileMenu}
                          className="block pl-6 pr-3 py-2 text-sm font-medium text-[#00CC99] hover:underline"
                        >
                          {col.seeAll.label} →
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
                  className="flex w-full items-center justify-between px-3 py-2.5 text-foreground hover:text-[#00CC99] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
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
                        className="flex items-center gap-2.5 w-full text-left pl-6 pr-3 py-2 text-muted-foreground hover:text-[#00CC99] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
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
                  className="block w-full text-left px-3 py-2.5 text-foreground hover:text-[#00CC99] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
