"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Trigger pill badge animation after mount
    const badge = document.querySelector(".pill-badge");
    if (badge) {
      setTimeout(() => {
        badge.classList.add("visible");
      }, 300);
    }
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-32 pb-16 gradient-bg">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="pill-badge mb-8 text-sm px-4 py-2 bg-secondary/50 border border-border/50 text-foreground"
          >
            New — Personal AI Agent for your support
          </Badge>

          {/* Headline */}
          <h1 className="gradient-text text-5xl md:text-6xl lg:text-7xl font-inter font-normal mb-6 leading-tight">
            Shopify AI Sales Chatbot 24/7 —{" "}
            <span className="gradient-text">Revenue on Autopilot</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl font-light text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Answer questions, recommend products and recover carts in real time.
            No scripts, no coding, fully trained on your brand.
          </p>

          {/* CTA */}
          <Button
            size="lg"
            className="cta-button text-white font-medium px-8 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto border-0"
            onClick={() => scrollToSection("beta")}
          >
            Apply for Beta Access!
            <ArrowRight className="w-5 h-5 cta-arrow" />
          </Button>
        </div>
      </div>
    </section>
  );
}
