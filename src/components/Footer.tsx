"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  main: [
    { label: "Features & Benefits", href: "#features" },
    { label: "Join Beta!", href: "#beta" },
    { label: "Set-Up in 4 Steps", href: "#steps" },
    { label: "Industries", href: "#industries" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faq" },
  ],
  secondary: [
    { label: "Home", href: "#hero" },
    { label: "Blogs", href: "#" },
    { label: "Docs & API", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms and Conditions", href: "#" },
  ],
};

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-24 px-6 border-t border-border/50">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Company Info & CTA */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-inter font-semibold text-white mb-4">
                Aurevia.io
              </h3>
              <p className="text-base font-light text-muted-foreground leading-relaxed mb-6">
                Shopify AI Sales Chatbot that recovers carts, upsells bundles, and sells 24/7.
                GDPR-compliant & Shopify-Partner verified.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-inter font-normal text-white mb-4">
                Get Early Access
              </h4>
              <p className="text-sm font-light text-muted-foreground mb-4">
                Be first to try Aurevia and unlock launch-day discounts.
              </p>
              <Button
                className="cta-button text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 border-0"
                onClick={() => scrollToSection("beta")}
              >
                Get Early Access
              </Button>
            </div>
          </div>

          {/* Main Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-inter font-normal text-white mb-6">
              Quick Links
            </h4>
            <div className="space-y-3">
              {footerLinks.main.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-light text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-inter font-normal text-white mb-6">
              Resources
            </h4>
            <div className="space-y-3">
              {footerLinks.secondary.map((link) => (
                <button
                  key={link.label}
                  onClick={() => link.href.startsWith('#') ? scrollToSection(link.href) : null}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-light text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-border/50 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm font-light"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm font-light text-muted-foreground">
              © 2025 Aurevia Ltd – All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
