"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function StickyCTA() {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`sticky-cta ${isScrollingUp ? "scroll-up" : ""}`}>
      <Button
        className="cta-button bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary/25"
        onClick={() => scrollToSection("beta")}
      >
        Join Our Beta Program
        <ArrowRight className="w-4 h-4 cta-arrow" />
      </Button>
    </div>
  );
}
