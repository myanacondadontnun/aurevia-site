"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollFade } from "./ScrollAnimations";
import { openShopifyInstall } from "@/lib/utils";
import CTASwarmBackdrop from "@/components/CTASwarmBackdrop";
import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    question: "How do I add an AI chatbot to my Shopify store?",
    answer:
      "Installing Aurevia is simple - just one click from the Shopify App Store. No coding, no theme modifications required. The chatbot automatically syncs with your products, discounts, and branding, and you can customize the tone, colors, and business rules through our intuitive interface.",
  },
  {
    question: "Can a chatbot help reduce abandoned carts on Shopify?",
    answer:
      "Absolutely! Aurevia's AI specifically targets cart abandonment by detecting exit intent, answering last-minute questions, and providing one-click checkout links. Our beta stores have seen significant improvements in cart recovery rates through real-time engagement.",
  },
  {
    question: "How can I use an AI chatbot to upsell and cross-sell on Shopify?",
    answer:
      "Aurevia analyzes live shopper context and your entire product catalog to suggest perfect complementary products. It creates personalized bundles and recommendations in real-time conversations, significantly boosting average order value without relying on discounts.",
  },
  {
    question: "How do I install Aurevia's AI chatbot on my Shopify store?",
    answer:
      "Installation takes just one click from the Shopify App Store. Once installed, Aurevia automatically integrates with your store, syncing products, discounts, and branding. You can then customize settings, upload brand guidelines, and set your preferred tone of voice through our dashboard.",
  },
  {
    question: "How much does Aurevia's AI sales co-pilot cost?",
    answer:
      "We offer a free trial with all features unlocked. Beta testers get 60 days free. Contact us for current plan options and pricing.",
  },
  {
    question: "Is Aurevia's AI chatbot secure, and how does it handle customer data?",
    answer:
      "Yes, Aurevia is fully GDPR-compliant and Shopify-Partner verified. We follow enterprise-grade security protocols to protect customer data. All conversations are encrypted, and we provide detailed privacy controls so you can manage data according to your policies.",
  },
  {
    question: "Can a live agent take over a conversation from Aurevia's chatbot?",
    answer:
      "Absolutely! Aurevia seamlessly hands off conversations to live agents when needed. The AI recognizes when human intervention is required and notifies your team, providing full conversation context so agents can continue naturally without repeating information.",
  },
  {
    question: "What sets Aurevia's Shopify chatbot apart from other chatbots?",
    answer:
      "Aurevia is specifically built for Shopify sales, not just support. It's trained on your brand, handles complex product recommendations, recovers carts in real-time, and provides actionable sales analytics. Unlike generic chatbots, Aurevia acts as a true AI sales representative that understands your business goals.",
  },
];

const ANSWER_DELAY_MS = 420;

function FaqChatTurn({
  faq,
  index,
  forceRevealAll,
}: {
  faq: (typeof faqs)[number];
  index: number;
  forceRevealAll: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);

  useEffect(() => {
    if (forceRevealAll) {
      setQuestionVisible(true);
      setAnswerVisible(true);
      return;
    }

    const el = wrapRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let answerTimer: number | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reducedMotion) {
          setQuestionVisible(true);
          setAnswerVisible(true);
          return;
        }
        setQuestionVisible(true);
        answerTimer = window.setTimeout(() => setAnswerVisible(true), ANSWER_DELAY_MS);
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (answerTimer) clearTimeout(answerTimer);
    };
  }, [forceRevealAll]);

  const qId = `faq-q-${index}`;
  const aId = `faq-a-${index}`;

  return (
    <div ref={wrapRef} className="space-y-3 sm:space-y-4" role="group" aria-labelledby={qId}>
      <div className="flex justify-end">
        <div
          id={qId}
          className={[
            "max-w-[min(100%,36rem)] rounded-2xl rounded-tr-md border px-4 py-3 sm:px-5 sm:py-4 font-inter text-[0.95rem] sm:text-base leading-snug",
            "border-white/25 bg-white/[0.09] text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
            "transition-all duration-500 ease-out",
            questionVisible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0 sm:translate-x-10",
          ].join(" ")}
        >
          <span className="sr-only">Question {index + 1}. </span>
          {faq.question}
        </div>
      </div>
      <div className="flex justify-start">
        <div
          id={aId}
          role="region"
          aria-labelledby={qId}
          className={[
            "max-w-[min(100%,36rem)] rounded-2xl rounded-tl-md border px-4 py-3 sm:px-5 sm:py-4 font-inter font-normal text-[0.95rem] sm:text-base leading-relaxed",
            "border-emerald-400/35 bg-[#062a22]/90 text-zinc-50 shadow-[0_8px_28px_rgba(0,0,0,0.28)]",
            "transition-all duration-500 ease-out",
            answerVisible ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-6 opacity-0 sm:-translate-x-10",
          ].join(" ")}
        >
          <p className="mb-1.5 text-[0.7rem] font-medium uppercase tracking-wide text-emerald-300/95">
            Aurevia
          </p>
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const headerRef = useScrollFade();
  const ctaRef = useScrollFade();
  const [showAllAtOnce, setShowAllAtOnce] = useState(false);

  return (
    <section
      id="faq"
      className="faq-gradient py-16 sm:py-20 md:py-24 px-4 sm:px-6"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-10 sm:mb-12 md:mb-14 scroll-fade"
        >
          <h2 id="faq-heading" className="text-3xl sm:text-4xl md:text-5xl font-inter font-normal mb-4 sm:mb-6 text-white">
            You&apos;ve Got Questions.{" "}
            <span className="green-highlight">We&apos;ve Already Answered Them</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-light text-zinc-200">
            Merchants ask us these all the time — scroll the conversation below, or open everything at once.
          </p>
          {showAllAtOnce ? (
            <p className="mt-5 text-sm text-zinc-300">All answers are visible — you can still scroll the transcript.</p>
          ) : (
            <button
              type="button"
              onClick={() => setShowAllAtOnce(true)}
              className="mt-5 text-sm font-medium text-emerald-300 underline-offset-4 hover:text-emerald-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
            >
              Show all questions and answers at once
            </button>
          )}
        </div>

        <ol
          className="m-0 list-none space-y-8 sm:space-y-10 rounded-2xl border border-white/10 bg-black/55 p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          aria-label="Frequently asked questions shown as a chat conversation"
        >
          {faqs.map((faq, index) => (
            <li key={index} className="list-none">
              <FaqChatTurn faq={faq} index={index} forceRevealAll={showAllAtOnce} />
            </li>
          ))}
        </ol>

        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className="text-center mt-12 scroll-fade flex justify-center"
        >
          <Button
            size="lg"
            className="cta-button cta-button--has-swarm relative overflow-hidden text-white font-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 border-0 w-full sm:w-auto"
            onClick={() => openShopifyInstall()}
            aria-label="Try Aurevia for free on Shopify"
          >
            <CTASwarmBackdrop roundedClassName="rounded-lg" />
            <span className="relative z-[3] flex items-center gap-2">
              Try for free on Shopify
              <ArrowRight className="w-5 h-5 cta-arrow" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
