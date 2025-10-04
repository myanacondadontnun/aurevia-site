"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { trackButtonClick } from "@/lib/analytics";
import { openShopifyInstall } from "@/lib/utils";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show CTA after scrolling down 300px
      setIsVisible(currentScrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    // Track sticky CTA click
    trackButtonClick('Install on Shopify', 'sticky_cta');
    openShopifyInstall();
  };

  return (
    <div className={`sticky-cta ${isVisible ? "visible" : ""}`}>
      <Button
        className="cta-button bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary/25"
        onClick={handleClick}
      >
        Install on Shopify
        <ArrowRight className="w-4 h-4 cta-arrow" />
      </Button>
    </div>
  );
}
