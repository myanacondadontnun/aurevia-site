"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Menu,
  X,
  ShoppingCart,
  Headphones,
  BarChart3,
  Briefcase,
  Store,
  TrendingUp,
  FileText,
  MessageSquare,
  Percent,
  Globe,
  Package,
  Filter,
  Monitor,
  Code2,
  BookOpen,
  GitCompare,
  Calculator,
  BookMarked,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import CTASwarmBackdrop from "@/components/CTASwarmBackdrop";

const solutionsByIndustry = [
  { title: "Fashion & Apparel", desc: "AI-powered style picks", href: "/solutions/fashion" },
  { title: "Health & Beauty", desc: "Personalized beauty tips", href: "/solutions/beauty" },
  { title: "Fitness & Supplements", desc: "24/7 product guidance", href: "/solutions/fitness" },
  { title: "Electronics", desc: "Smart gadget guidance", href: "/solutions/electronics" },
  { title: "Home & Garden", desc: "Make it beautiful with AI", href: "/solutions/home-garden" },
];

const solutionsByUseCase = [
  { icon: ShoppingCart, label: "Increase Sales Conversion", href: "/solutions/conversion" },
  { icon: Headphones, label: "Automate Customer Support", href: "/solutions/support" },
  { icon: BarChart3, label: "Gain Customer Insights", href: "/solutions/insights" },
];

const solutionsBySize = [
  { icon: Store, label: "Small Business", href: "/solutions/small-business" },
  { icon: TrendingUp, label: "Growing Business", href: "/solutions/growing-business" },
  { icon: Briefcase, label: "Enterprise", href: "/solutions/enterprise" },
];

const productSections = [
  {
    heading: "AI Customer Support",
    items: [
      { icon: FileText, label: "Automated Responses", href: "/products/automated-responses" },
      { icon: Percent, label: "Ticket Management", href: "/products/ticket-management" },
      { icon: Globe, label: "Multilingual Support", href: "/products/multilingual" },
    ],
  },
  {
    heading: "Sales Conversion",
    items: [
      { icon: Package, label: "Product Recommendations", href: "/products/recommendations" },
      { icon: ShoppingCart, label: "Cart Recovery", href: "/products/cart-recovery" },
      { icon: Filter, label: "Lead Qualification", href: "/products/lead-qualification" },
    ],
  },
  {
    heading: "Analytics & Insights",
    items: [
      { icon: Monitor, label: "Performance Dashboard", href: "/products/dashboard" },
      { icon: MessageSquare, label: "Conversation Analytics", href: "/products/analytics" },
      { icon: BarChart3, label: "ROI Tracking", href: "/products/roi-tracking" },
    ],
  },
  {
    heading: "Platform Integrations",
    items: [
      { icon: Store, label: "Shopify Integration", href: "/products/shopify" },
      { icon: Code2, label: "Custom API", href: "/products/api" },
    ],
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
  const [openDropdown, setOpenDropdown] = useState<"products" | "solutions" | "resources" | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<"products" | "solutions" | "resources" | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollYRef = useRef(0);

  const handleDropdownEnter = (name: "products" | "solutions" | "resources") => {
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

  const toggleMobileExpanded = (name: "products" | "solutions" | "resources") => {
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
              src="/images/Logo_wo_bg.png"
              alt="Aurevia Logo"
              className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
            />
            <span className={`logo-text text-white text-lg sm:text-xl whitespace-nowrap overflow-hidden transition-all duration-500 ${isScrolled ? "lg:max-w-0 lg:ml-0 lg:opacity-0" : "lg:max-w-sm ml-2.5 lg:opacity-100"} hidden lg:block`}>
              Aurevia.io
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-4 xl:space-x-6">
              {/* Products with dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter("products")}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href="/products"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "products"}
                  className={`inline-flex items-center text-sm xl:text-base whitespace-nowrap transition-colors duration-200 ${openDropdown === "products" ? "text-[#02DFA6]" : "text-foreground hover:text-[#02DFA6]"}`}
                >
                  Products
                </Link>
                {openDropdown === "products" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 -mt-px" role="menu" aria-label="Products menu">
                    <div className="bg-card border border-border rounded-xl shadow-xl p-8 min-w-[672px] grid grid-cols-2 gap-x-10 gap-y-8">
                      {productSections.map((section) => (
                        <div key={section.heading}>
                          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                            {section.heading}
                          </h4>
                          <ul className="space-y-3">
                            {section.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-[#02DFA6] transition-colors"
                                >
                                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted" aria-hidden="true">
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                  </span>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
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
                <Link
                  href="/solutions"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "solutions"}
                  className={`inline-flex items-center text-sm xl:text-base whitespace-nowrap transition-colors duration-200 ${openDropdown === "solutions" ? "text-[#02DFA6]" : "text-foreground hover:text-[#02DFA6]"}`}
                >
                  Solutions
                </Link>
                {openDropdown === "solutions" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 -mt-px" role="menu" aria-label="Solutions menu">
                    <div className="bg-card border border-border rounded-xl shadow-xl p-8 min-w-[768px] grid grid-cols-3 gap-8">
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                          By industry
                        </h4>
                        <ul className="space-y-3">
                          {solutionsByIndustry.map((item) => (
                            <li key={item.title}>
                              <Link href={item.href} role="menuitem" className="block group">
                                <span className="font-medium text-foreground group-hover:text-[#02DFA6] transition-colors block">
                                  {item.title}
                                </span>
                                <span className="text-xs text-muted-foreground">{item.desc}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/solutions"
                          className="mt-3 inline-block text-xs text-[#02DFA6] hover:underline font-medium"
                        >
                          View all Industries →
                        </Link>
                      </div>
                      <div className="space-y-8">
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                            By use case
                          </h4>
                          <ul className="space-y-3">
                            {solutionsByUseCase.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-[#02DFA6] transition-colors"
                                >
                                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted" aria-hidden="true">
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                  </span>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                            By business size
                          </h4>
                          <ul className="space-y-3">
                            {solutionsBySize.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  role="menuitem"
                                  className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-[#02DFA6] transition-colors"
                                >
                                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted" aria-hidden="true">
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                  </span>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="pl-6 border-l border-border">
                        <h4 className="font-medium text-foreground mb-3">Customer stories</h4>
                        <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                          See how Shopify merchants are using Aurevia and the benefits it&apos;s bringing to their businesses!
                        </p>
                        <Link
                          href="/solutions/stories"
                          role="menuitem"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#02DFA6] hover:underline"
                        >
                          Read success stories
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
                <Link
                  href="/resources"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === "resources"}
                  className={`inline-flex items-center text-sm xl:text-base whitespace-nowrap transition-colors duration-200 ${openDropdown === "resources" ? "text-[#02DFA6]" : "text-foreground hover:text-[#02DFA6]"}`}
                >
                  Resources
                </Link>
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
                                <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-[#02DFA6] transition-colors" />
                              </span>
                              <div>
                                <span className="block text-sm font-medium text-foreground group-hover:text-[#02DFA6] transition-colors">
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
                  className="text-foreground hover:text-[#02DFA6] transition-all duration-300 text-sm xl:text-base whitespace-nowrap"
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
                className={`cta-button cta-button--has-swarm relative overflow-hidden text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border-0 flex-shrink-0 ${isScrolled ? "px-3 py-1.5 sm:px-4 sm:py-2" : "px-4 py-2"} text-sm xl:text-base`}
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
                className={`cta-button text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 border-0 flex-shrink-0 ${isScrolled ? "px-3 py-1.5 sm:px-4 sm:py-2" : "px-4 py-2"} text-sm xl:text-base`}
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
              className="lg:hidden text-white hover:text-[#02DFA6] transition-colors duration-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
              {/* Products expandable */}
              <div>
                <button
                  onClick={() => toggleMobileExpanded("products")}
                  aria-expanded={mobileExpanded === "products"}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                >
                  <Link href="/products" onClick={closeMobileMenu} className="flex-1 text-left">
                    Products
                  </Link>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === "products" ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {mobileExpanded === "products" && (
                  <div className="pl-4 pb-2 space-y-1">
                    {productSections.map((section) => (
                      <div key={section.heading} className="py-1">
                        <span className="block px-3 py-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                          {section.heading}
                        </span>
                        {section.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={closeMobileMenu}
                            role="menuitem"
                            className="flex items-center gap-2.5 w-full text-left pl-6 pr-3 py-2 text-muted-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                          >
                            <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Solutions expandable */}
              <div>
                <button
                  onClick={() => toggleMobileExpanded("solutions")}
                  aria-expanded={mobileExpanded === "solutions"}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                >
                  <Link href="/solutions" onClick={closeMobileMenu} className="flex-1 text-left">
                    Solutions
                  </Link>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === "solutions" ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {mobileExpanded === "solutions" && (
                  <div className="pl-4 pb-2 space-y-1">
                    <span className="block px-3 py-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                      By industry
                    </span>
                    {solutionsByIndustry.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={closeMobileMenu}
                        role="menuitem"
                        className="block w-full text-left pl-6 pr-3 py-2 text-muted-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                      >
                        {item.title}
                      </Link>
                    ))}
                    <span className="block px-3 py-1 mt-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                      By use case
                    </span>
                    {solutionsByUseCase.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeMobileMenu}
                        role="menuitem"
                        className="flex items-center gap-2.5 w-full text-left pl-6 pr-3 py-2 text-muted-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources expandable */}
              <div>
                <button
                  onClick={() => toggleMobileExpanded("resources")}
                  aria-expanded={mobileExpanded === "resources"}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                >
                  <Link href="/resources" onClick={closeMobileMenu} className="flex-1 text-left">
                    Resources
                  </Link>
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
                        className="flex items-center gap-2.5 w-full text-left pl-6 pr-3 py-2 text-muted-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
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
                  className="block w-full text-left px-3 py-2.5 text-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
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
