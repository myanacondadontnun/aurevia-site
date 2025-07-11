"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL with hash
      router.push(`#${sectionId}`, { scroll: false });
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const observeSection = () => {
      const sections = [
        "features",
        "how-it-works",
        "industries",
        "benefits",
        "pricing",
        "faq",
        "contact"
      ];

      // Update active section during scroll
      const handleScroll = () => {
        // Find which section is most in view
        const mostVisible = sections.reduce((acc, sectionId) => {
          const section = document.getElementById(sectionId);
          if (!section) {
            return acc;
          }

          const rect = section.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          // Give preference to sections that are closer to the center of the viewport
          const sectionCenter = rect.top + rect.height / 2;
          const viewportCenter = viewportHeight / 2;
          const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
          
          // Score based on visible height and distance from center
          const score = visibleHeight - (distanceFromCenter * 0.1);
          
          if (score > (acc.score || 0)) {
            return { id: sectionId, score, visibleHeight };
          }
          return acc;
        }, { id: "", score: 0, visibleHeight: 0 });
        
        if (mostVisible.id && mostVisible.id !== activeSection) {
          setActiveSection(mostVisible.id);
          // Update URL without triggering navigation
          if (mostVisible.id) {
            window.history.replaceState(null, '', `#${mostVisible.id}`);
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };

    window.addEventListener("scroll", handleScroll);
    const cleanup = observeSection();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cleanup();
    };
  }, [activeSection]);

  // Handle initial hash on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }, [scrollToSection]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const navbar = document.getElementById('navbar');
        if (navbar && !navbar.contains(event.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { label: "Features", id: "features" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Industries", id: "industries" },
    { label: "Benefits", id: "benefits" },
    { label: "Pricing", id: "pricing" },
    { label: "FAQs", id: "faq" },
    { label: "Contact Us", id: "contact" },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-2 sm:px-4 md:px-6" id="navbar">
      <div
        className={`glass-nav shadow-lg transition-all duration-500 ease-in-out mx-auto`}
        style={{
          width: isScrolled ? "90%" : "100%",
          maxWidth: isScrolled ? "1200px" : "100%",
          borderRadius: "1.5rem",
        }}
      >
        <div className={`flex items-center justify-between w-full transition-all duration-500 ${isScrolled ? 'px-3 py-2.5 sm:px-4 sm:py-3' : 'px-4 py-3 sm:px-6 sm:py-4'}`}>
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => scrollToSection("hero")}
          >
            <img 
              src="/images/Logo_wo_bg.png" 
              alt="Aurevia Logo" 
              className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
            />
            <span className={`logo-text text-white text-lg sm:text-xl whitespace-nowrap overflow-hidden transition-all duration-500 ${isScrolled ? 'lg:max-w-0 lg:ml-0 lg:opacity-0' : 'lg:max-w-sm ml-2.5 lg:opacity-100'} hidden lg:block`}>
              Aurevia.io
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center transition-all duration-500 ${isScrolled ? 'gap-3' : 'gap-4 xl:gap-6'}`}>
            {/* Navigation Links */}
            <div className={`flex items-center transition-all duration-500 ${isScrolled ? 'space-x-3' : 'space-x-4 xl:space-x-6'}`}>
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    text-foreground 
                    hover:text-[#02DFA6] 
                    transition-all
                    duration-300
                    relative
                    group
                    whitespace-nowrap
                    text-sm xl:text-base
                    ${activeSection === item.id ? '!text-[#02DFA6]' : ''}
                  `}
                >
                  {item.label}
                  <span className={`
                    absolute 
                    -bottom-1 
                    left-0 
                    h-[2px] 
                    bg-[#02DFA6] 
                    transition-all 
                    duration-300
                    group-hover:w-full
                    ${activeSection === item.id ? '!w-full' : 'w-0'}
                  `} />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              className={`cta-button text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 border-0 flex-shrink-0 ${isScrolled ? 'px-3 py-1.5' : 'px-4 py-2'} text-sm xl:text-base`}
              onClick={() => scrollToSection("beta")}
            >
              Get Free Access!
              <ArrowRight className="w-3 h-3 xl:w-4 xl:h-4 cta-arrow" />
            </Button>
          </div>

          {/* Mobile Menu Button & CTA */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              className={`cta-button text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-1 border-0 flex-shrink-0 ${isScrolled ? 'px-2 py-1.5' : 'px-3 py-2'} text-sm`}
              onClick={() => scrollToSection("beta")}
            >
              Get Access
              <ArrowRight className="w-3 h-3 cta-arrow" />
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#02DFA6] transition-colors duration-200 p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/30 bg-background/95 backdrop-blur-md rounded-b-2xl">
            <div className="px-4 py-4 space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    block w-full text-left px-3 py-2 text-foreground 
                    hover:text-[#02DFA6] hover:bg-primary/10 
                    transition-all duration-200 rounded-lg
                    ${activeSection === item.id ? 'text-[#02DFA6] bg-primary/10' : ''}
                  `}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
