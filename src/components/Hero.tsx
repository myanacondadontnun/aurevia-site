"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { trackButtonClick } from "@/lib/analytics";
import { openShopifyInstall, buildShopifyInstallUrl } from "@/lib/utils";
import ChatDemo from "./ChatDemo";

export default function Hero() {
  const [pillClass, setPillClass] = useState("pill-wrapper hidden");
  const [shopInput, setShopInput] = useState("");

  const handleInstall = () => {
    trackButtonClick('Try for free on Shopify', 'hero_section');
    openShopifyInstall(shopInput);
  };

  const handleBrowse = () => {
    window.open(buildShopifyInstallUrl(), '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      setPillClass("pill-wrapper reveal");
    });
  }, []);

  return (
    <section
      id="hero"
      className="h-screen flex items-center justify-center pt-20 sm:pt-24 pb-4 sm:pb-8 gradient-bg overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center">
          {/* Text content — left half */}
          <div className="w-full lg:w-1/2 text-left animate-fade-in lg:pl-8 xl:pl-16">
            {/* Connected Pill */}
            <div className="flex justify-start mb-5 sm:mb-6">
              <div className={pillClass}>
                <div className="pill-left">New</div>
                <div className="pill-right">Personal AI Agent for your support</div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-inter font-normal mb-3 sm:mb-5 leading-tight text-white">
              Shopify AI Sales Co-Pilot{" "}
              <span className="green-highlight">Revenue on Autopilot</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl font-light text-muted-foreground mb-6 sm:mb-8 max-w-lg leading-relaxed">
              Answer questions, recommend products and recover carts in real time.
              No scripts, no coding, fully trained on your brand.
            </p>

            {/* Install Flow */}
            <div className="flex flex-col items-start gap-3">
              <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                <input
                  type="text"
                  inputMode="url"
                  placeholder="yourstore.myshopify.com"
                  value={shopInput}
                  onChange={(e) => setShopInput(e.target.value)}
                  className="w-full sm:w-[280px] rounded-lg border border-border bg-card/80 text-white placeholder:text-muted-foreground/70 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <Button
                  size="default"
                  className="cta-button text-white font-medium px-5 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center gap-2 border-0"
                  onClick={handleInstall}
                >
                  Try for free on Shopify
                  <ArrowRight className="w-4 h-4 cta-arrow" />
                </Button>
              </div>
              <button
                onClick={handleBrowse}
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                or browse on Shopify App Store
              </button>
            </div>
          </div>

          {/* Chat demo — right half */}
          <div className="hidden lg:flex w-1/2 items-center justify-center">
            <ChatDemo />
          </div>
        </div>
      </div>

      {/* Premium pill styles */}
      <style jsx>{`
        .pill-wrapper {
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          background: radial-gradient(ellipse at bottom, #024d3f 0%, #000000 100%);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
          height: 36px;
          max-width: 50px;
          opacity: 1;
          transform: scale(0.96);
          transition:
            max-width 1.2s cubic-bezier(0.77,0,0.175,1),
            opacity 0.6s cubic-bezier(0.77,0,0.175,1),
            transform 0.7s cubic-bezier(0.77,0,0.175,1);
        }

        @media (min-width: 640px) {
          .pill-wrapper {
            height: 44px;
            max-width: 60px;
          }
        }

        .pill-wrapper.hidden {
          opacity: 0;
          transform: scale(0.92);
        }

        .pill-wrapper.reveal {
          max-width: 360px;
          opacity: 1;
          transform: scale(1);
          transition-delay:
            max-width 0.05s,
            opacity 0.1s,
            transform 0.1s;
        }

        @media (min-width: 640px) {
          .pill-wrapper.reveal {
            max-width: 560px;
          }
        }

        .pill-left {
          background: linear-gradient(135deg, #000000 0%, #7f5af0 100%);
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          border-radius: 9999px;
          position: relative;
          z-index: 10;
          white-space: nowrap;
          transform: translateY(10%);
          opacity: 0;
          transition:
            opacity 0.7s cubic-bezier(0.77,0,0.175,1) 0.25s,
            transform 0.7s cubic-bezier(0.77,0,0.175,1) 0.25s;
        }

        @media (min-width: 640px) {
          .pill-left {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }

        .pill-wrapper.reveal .pill-left {
          opacity: 1;
          transform: translateY(0);
        }

        .pill-right {
          font-size: 0.75rem;
          color: white;
          padding: 0 0.75rem 0 0.5rem;
          white-space: nowrap;
          transform: translateX(-24%) scale(0.98);
          opacity: 0;
          transition:
            opacity 0.8s cubic-bezier(0.77,0,0.175,1) 0.45s,
            transform 0.8s cubic-bezier(0.77,0,0.175,1) 0.45s;
        }

        @media (min-width: 640px) {
          .pill-right {
            font-size: 0.875rem;
            padding: 0 1rem 0 0.75rem;
          }
        }

        .pill-wrapper.reveal .pill-right {
          transform: translateX(0) scale(1);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
