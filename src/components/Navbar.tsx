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
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { openShopifyInstall } from "@/lib/utils";

// Solutions dropdown data (Aurevia-adapted)
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

// Products dropdown data (Aurevia-adapted)
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

// Resources dropdown data
const resourcesItems = [
  { icon: BookOpen, label: "Blogs", href: "/resources/blogs", desc: "Latest insights and tips" },
  { icon: GitCompare, label: "AI Agent Comparisons", href: "/resources/ai-comparisons", desc: "Compare AI chatbots for e-commerce" },
  { icon: Calculator, label: "ROI Calculator", href: "/resources/roi-calculator", desc: "Calculate your potential return" },
  { icon: BookMarked, label: "Documentations", href: "/resources/docs", desc: "API guides and setup docs" },
];

const navigationLinks = [
  { label: "About Us", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"products" | "solutions" | "resources" | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const navbar = document.getElementById("navbar");
        if (navbar && !navbar.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-2 sm:px-4 md:px-6" id="navbar">
      <div
        className={`glass-nav shadow-lg transition-all duration-500 ease-in-out mx-auto relative`}
        style={{
          width: isScrolled ? "90%" : "100%",
          maxWidth: isScrolled ? "1200px" : "100%",
          borderRadius: "1.5rem",
        }}
      >
        <div className={`flex items-center justify-between w-full transition-all duration-500 ${isScrolled ? "px-3 py-2.5 sm:px-4 sm:py-3" : "px-4 py-3 sm:px-6 sm:py-4"}`}>
          {/* Logo */}
          <Link href="/home" className="flex items-center flex-shrink-0 lg:w-48">
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
                  className={`inline-flex items-center text-sm xl:text-base whitespace-nowrap transition-colors duration-200 ${openDropdown === "products" ? "text-[#02DFA6]" : "text-foreground hover:text-[#02DFA6]"}`}
                >
                  Products
                </Link>
                {openDropdown === "products" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 -mt-px">
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
                                  className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-[#02DFA6] transition-colors"
                                >
                                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
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
                  className={`inline-flex items-center text-sm xl:text-base whitespace-nowrap transition-colors duration-200 ${openDropdown === "solutions" ? "text-[#02DFA6]" : "text-foreground hover:text-[#02DFA6]"}`}
                >
                  Solutions
                </Link>
                {openDropdown === "solutions" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 -mt-px">
                    <div className="bg-card border border-border rounded-xl shadow-xl p-8 min-w-[768px] grid grid-cols-3 gap-8">
                      {/* By industry */}
                      <div>
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                          By industry
                        </h4>
                        <ul className="space-y-3">
                          {solutionsByIndustry.map((item) => (
                            <li key={item.title}>
                              <Link
                                href={item.href}
                                className="block group"
                              >
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
                      {/* By use case + By business size */}
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
                                  className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-[#02DFA6] transition-colors"
                                >
                                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
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
                                  className="flex items-center gap-2.5 text-sm font-medium text-foreground hover:text-[#02DFA6] transition-colors"
                                >
                                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                  </span>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* Customer stories */}
                      <div className="pl-6 border-l border-border">
                        <h4 className="font-medium text-foreground mb-3">Customer stories</h4>
                        <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                          See how Shopify merchants are using Aurevia and the benefits it&apos;s bringing to their businesses!
                        </p>
                        <Link
                          href="/solutions/stories"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#02DFA6] hover:underline"
                        >
                          Read success stories
                          <ArrowRight className="h-4 w-4" />
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
                  className={`inline-flex items-center text-sm xl:text-base whitespace-nowrap transition-colors duration-200 ${openDropdown === "resources" ? "text-[#02DFA6]" : "text-foreground hover:text-[#02DFA6]"}`}
                >
                  Resources
                </Link>
                {openDropdown === "resources" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-1 -mt-px">
                    <div className="bg-card border border-border rounded-xl shadow-xl p-8 min-w-[384px]">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-5">
                        Resources
                      </h4>
                      <ul className="space-y-2">
                        {resourcesItems.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              className="flex items-center gap-3.5 p-3 rounded-lg group hover:bg-muted/50 transition-colors"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
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

              {/* Regular links */}
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
            <Button
              className={`cta-button text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 border-0 flex-shrink-0 ${isScrolled ? "px-3 py-1.5 sm:px-4 sm:py-2" : "px-4 py-2"} text-sm xl:text-base`}
              onClick={() => openShopifyInstall()}
            >
              <span className="hidden sm:inline">Try for free on Shopify</span>
              <span className="sm:hidden">Try free</span>
              <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4 cta-arrow" />
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-[#02DFA6] transition-colors duration-200 p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/30 bg-background/95 backdrop-blur-md rounded-b-2xl">
            <div className="px-4 py-4 space-y-1">
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2.5 text-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
              >
                Products
              </Link>
              <Link
                href="/solutions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2.5 text-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
              >
                Solutions
              </Link>
              <Link
                href="/resources"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-3 py-2.5 text-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
              >
                Resources
              </Link>
              {resourcesItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left pl-8 pr-3 py-2 text-muted-foreground hover:text-[#02DFA6] hover:bg-primary/10 transition-all duration-200 rounded-lg text-sm"
                >
                  {item.label}
                </Link>
              ))}
              {navigationLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
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
