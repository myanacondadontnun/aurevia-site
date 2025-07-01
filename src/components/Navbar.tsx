"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-6">
      <div className={`glass-nav shadow-lg ${isScrolled ? "shrunk" : ""}`}>
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo - Clickable */}
          <div
            className="text-2xl font-inter font-semibold text-white cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            Aurevia.io
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: "Features", id: "features" },
              { label: "Industries", id: "industries" },
              { label: "Benefits", id: "benefits" },
              { label: "Pricing", id: "pricing" },
              { label: "FAQs", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-[#095F48] transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            className="cta-button text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 border-0"
            onClick={() => scrollToSection("beta")}
          >
            Join Free Beta!
            <ArrowRight className="w-4 h-4 cta-arrow" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
