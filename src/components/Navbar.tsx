"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();

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
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL with hash
      router.push(`#${sectionId}`, { scroll: false });
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-6">
      <div
        className={`glass-nav shadow-lg transition-all duration-500 ease-in-out`}
        style={{
          width: isScrolled ? "60%" : "100%",
          margin: "0 auto",
          transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
          borderRadius: "1.5rem",
          minWidth: 320,
          maxWidth: "100vw",
        }}
      >
        <div className="flex items-center justify-between w-full px-6 py-4">
          {/* Logo */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <img 
              src="/images/Logo_wo_bg.png" 
              alt="Aurevia Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl logo-text text-white">
              Aurevia.io
            </span>
          </div>

          {/* Navigation Links + CTA Button */}
          <div className="flex items-center gap-6">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { label: "Features", id: "features" },
                { label: "How It Works", id: "how-it-works" },
                { label: "Industries", id: "industries" },
                { label: "Benefits", id: "benefits" },
                { label: "Pricing", id: "pricing" },
                { label: "FAQs", id: "faq" },
                { label: "Contact Us", id: "contact" },
              ].map((item) => (
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
              className="cta-button text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 border-0"
              onClick={() => scrollToSection("beta")}
            >
              Get Free Access!
              <ArrowRight className="w-4 h-4 cta-arrow" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
