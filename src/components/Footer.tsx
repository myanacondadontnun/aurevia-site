"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { openShopifyInstall } from "@/lib/utils";

const footerLinks = {
  main: [
    { label: "Home", href: "/home" },
    { label: "Pricing", href: "/pricing" },
    { label: "Try for free on Shopify", href: "shopify", isAction: true },
  ],
  secondary: [
    { label: "Blogs", href: "#" },
    { label: "Docs & API", href: "#" },
    { label: "Privacy Policy", href: "https://www.notion.so/AUREVIA-PRIVACY-POLICY-202fc3fea0bc81cf84f5e1aeb691a9cd?source=copy_link" },
    { label: "Terms and Conditions", href: "#" },
  ],
};

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61571429595824#" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/aurevia-ai/" },
  { label: "X", href: "https://x.com/crazystupidceo" },
  { label: "Reddit", href: "https://www.reddit.com/user/crackandcoke/" },
];

export default function Footer() {
  const handleLinkClick = (href: string, isAction?: boolean) => {
    if (isAction || href === 'shopify') {
      openShopifyInstall();
      return;
    }
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-border/50">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
          {/* Company Info & CTA */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              {/* Logo and Company Name */}
              <Link href="/home" className="flex items-center gap-2.5 mb-4">
                <img 
                  src="/images/Logo_wo_bg.png" 
                  alt="Aurevia Logo" 
                  className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                />
                <h3 className="text-xl sm:text-2xl font-inter font-semibold text-white logo-text">
                  Aurevia.io
                </h3>
              </Link>
              <p className="text-sm sm:text-base font-light text-muted-foreground leading-relaxed mb-2">
                Shopify AI Sales Co-Pilot that recovers carts, upsells bundles, and sells 24/7.
                GDPR-compliant & Shopify-Partner verified.
              </p>
              <p className="text-xs text-primary">Now live on the Shopify App Store</p>
            </div>

            <div>
              <h4 className="text-base sm:text-lg font-inter font-normal text-white mb-4">
                Get Started
              </h4>
              <p className="text-xs sm:text-sm font-light text-muted-foreground mb-4">
                Install the app directly from the Shopify App Store.
              </p>
              <Button
                className="cta-button text-white font-medium px-4 sm:px-6 py-2 rounded-lg transition-all duration-200 border-0 text-sm sm:text-base w-full sm:w-auto"
                onClick={() => openShopifyInstall()}
              >
                Try for free on Shopify
              </Button>
            </div>
          </div>

          {/* Main Links */}
          <div className="lg:col-span-1">
            <h4 className="text-base sm:text-lg font-inter font-normal text-white mb-4 sm:mb-6">
              Quick Links
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {footerLinks.main.map((link) => (
                link.href === "shopify" || link.isAction ? (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href, link.isAction)}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-light text-left"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-light"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Secondary Links */}
          <div className="lg:col-span-1">
            <h4 className="text-base sm:text-lg font-inter font-normal text-white mb-4 sm:mb-6">
              Resources
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {footerLinks.secondary.map((link) => (
                link.href.startsWith('http') ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-light"
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-light"
                  >
                    {link.label}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-border/50 mb-6 sm:mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-start">
            {socialLinks.map((social) => (
              social.href.startsWith('http') ? (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-light"
                >
                  {social.label}
                </a>
              ) : (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-light"
                >
                  {social.label}
                </a>
              )
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right">
            <p className="text-xs sm:text-sm font-light text-muted-foreground">
              © 2025 Aurevia Artificial Intelligence Ltd – All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
