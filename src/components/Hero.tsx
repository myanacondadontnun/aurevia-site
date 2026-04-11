"use client";

import { CreditCard, X } from "lucide-react";
import { useEffect, useState } from "react";
import { trackButtonClick } from "@/lib/analytics";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import ChatDemo from "./ChatDemo";
import CTASwarmBackdrop from "./CTASwarmBackdrop";

export default function Hero() {
  const [pillClass, setPillClass] = useState("pill-wrapper hidden");

  useEffect(() => {
    requestAnimationFrame(() => {
      setPillClass("pill-wrapper reveal");
    });
  }, []);

  return (
    <section
      id="hero"
      role="banner"
      className="min-h-0 lg:min-h-[100dvh] flex items-center justify-center pt-24 sm:pt-28 pb-8 sm:pb-12 lg:pt-24 lg:pb-8 gradient-bg overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-0">
          <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-in lg:pl-8 xl:pl-16">
            <div className="flex justify-center lg:justify-start mb-5 sm:mb-6">
              <div className={pillClass}>
                <div className="pill-left">New</div>
                <div className="pill-right">Personal AI Agent for your onboarding and support</div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl font-inter font-normal mb-3 sm:mb-5 leading-tight text-white">
              Shopify AI Sales Co-Pilot{" "}
              <span className="green-highlight">Revenue on Autopilot</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl font-light text-muted-foreground mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Answer questions, recommend products and recover carts in real time.
              No scripts, no coding, fully trained on your brand.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 justify-center lg:justify-start max-w-xl mx-auto lg:mx-0">
              <a
                href={SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackButtonClick("Try Aurevia free on Shopify", "hero_section")
                }
                className="block no-underline"
              >
                <span className="relative block pb-1.5">
                  <span
                    className="absolute left-2 right-2 bottom-0 h-2 sm:h-2.5 rounded-b-lg bg-gradient-to-r from-[#024d3f] via-[#02DFA6] to-[#024d3f] shadow-[0_0_12px_rgba(2,223,166,0.35)]"
                    aria-hidden
                  />
                  <span className="relative flex min-h-[48px] items-center justify-center overflow-hidden rounded-xl border border-[#02DFA6]/25 bg-[#0d1717]/92 px-6 py-3 text-sm font-semibold text-[#fffffc] shadow-[0_0_0_1px_rgba(2,223,166,0.08),0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-[2px] sm:px-8 sm:py-3.5 sm:text-base">
                    <CTASwarmBackdrop roundedClassName="rounded-xl" />
                    <span className="relative z-[3]">Try Aurevia free on Shopify</span>
                  </span>
                </span>
              </a>

              <div className="flex items-center justify-center sm:justify-start gap-2.5 text-muted-foreground text-xs sm:text-sm">
                <span className="relative inline-flex shrink-0" aria-hidden>
                  <CreditCard className="w-5 h-5 opacity-70" />
                  <X
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-muted-foreground bg-background rounded-full p-[1px]"
                    strokeWidth={2.5}
                  />
                </span>
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          <div className="flex w-full lg:w-1/2 items-center justify-center">
            <ChatDemo />
          </div>
        </div>
      </div>

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
          height: 29px;
          max-width: 40px;
          opacity: 1;
          transform: scale(0.96);
          transition:
            max-width 1.2s cubic-bezier(0.77,0,0.175,1),
            opacity 0.6s cubic-bezier(0.77,0,0.175,1),
            transform 0.7s cubic-bezier(0.77,0,0.175,1);
        }

        @media (min-width: 640px) {
          .pill-wrapper {
            height: 35px;
            max-width: 48px;
          }
        }

        .pill-wrapper.hidden {
          opacity: 0;
          transform: scale(0.92);
        }

        .pill-wrapper.reveal {
          max-width: 290px;
          opacity: 1;
          transform: scale(1);
          transition-delay:
            max-width 0.05s,
            opacity 0.1s,
            transform 0.1s;
        }

        @media (min-width: 640px) {
          .pill-wrapper.reveal {
            max-width: 450px;
          }
        }

        .pill-left {
          background: linear-gradient(135deg, #000000 0%, #7f5af0 100%);
          padding: 0.3rem 0.6rem;
          font-size: 0.6rem;
          font-weight: 400;
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
            padding: 0.4rem 0.8rem;
            font-size: 0.7rem;
          }
        }

        .pill-wrapper.reveal .pill-left {
          opacity: 1;
          transform: translateY(0);
        }

        .pill-right {
          font-size: 0.6rem;
          color: white;
          padding: 0 0.6rem 0 0.4rem;
          white-space: nowrap;
          transform: translateX(-24%) scale(0.98);
          opacity: 0;
          transition:
            opacity 0.8s cubic-bezier(0.77,0,0.175,1) 0.45s,
            transform 0.8s cubic-bezier(0.77,0,0.175,1) 0.45s;
        }

        @media (min-width: 640px) {
          .pill-right {
            font-size: 0.7rem;
            padding: 0 0.8rem 0 0.6rem;
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
