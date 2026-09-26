"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollFade } from "./ScrollAnimations";
import { openShopifyInstall } from "@/lib/utils";
import { AureviaMark } from "@/components/FeatureDemo";
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
      "Absolutely! Aurevia's AI specifically targets cart abandonment by detecting exit intent, answering last-minute questions, and providing one-click checkout links. Merchants using Aurevia have seen significant improvements in cart recovery rates through real-time engagement.",
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
    answer: (
      <>
        Every plan starts with a 14-day free trial, no credit card required.
        After that, plans start at $19/month based on your traffic — see our{" "}
        <Link
          href="/pricing"
          className="font-medium underline underline-offset-2 hover:text-[#00CC99]"
        >
          Pricing page
        </Link>{" "}
        for full details.
      </>
    ),
  },
  {
    question: "Is Aurevia's AI chatbot secure, and how does it handle customer data?",
    answer:
      "Aurevia is a Shopify app and follows Shopify's data and privacy requirements. Chats, leads and tickets are stored in AWS EU-West with encryption in transit and at rest, shopper data requests and deletions come through Shopify's standard GDPR webhooks, and our GDPR page lists exactly what we hold and for how long.",
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
    <div ref={wrapRef} className="space-y-2.5 sm:space-y-4" role="group" aria-labelledby={qId}>
      <div className="flex justify-end">
        <div
          id={qId}
          className={[
            "chat-demo-bubble chat-demo-right max-w-[min(92%,36rem)] sm:max-w-[min(100%,36rem)] !text-[0.9rem] sm:!text-base !leading-snug",
            "transition-all duration-500 ease-out",
            questionVisible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-4 opacity-0 sm:translate-x-10",
          ].join(" ")}
        >
          <span className="sr-only">Question {index + 1}. </span>
          {faq.question}
        </div>
      </div>
      <div
        className={[
          "chat-demo-bot-row transition-all duration-500 ease-out",
          answerVisible ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-4 opacity-0 sm:-translate-x-10",
        ].join(" ")}
      >
        <AureviaMark size={28} />
        <div
          id={aId}
          role="region"
          aria-labelledby={qId}
          className="chat-demo-bubble chat-demo-left max-w-[min(100%,36rem)] !text-[0.9rem] sm:!text-base !leading-relaxed"
        >
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
      className="faq-gradient py-12 sm:py-20 md:py-24 px-4 sm:px-6"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-10 sm:mb-12 md:mb-14 scroll-fade"
        >
          <h2 id="faq-heading" className="text-2xl sm:text-4xl md:text-5xl font-fraunces font-normal mb-3 sm:mb-6 text-foreground">
            You&apos;ve Got Questions.{" "}
            <span className="green-highlight">We&apos;ve Already Answered Them</span>
          </h2>
          <p className="text-sm sm:text-lg md:text-xl font-light text-muted-foreground">
            Merchants ask us these all the time — scroll the conversation below, or open everything at once.
          </p>
          {showAllAtOnce ? (
            <p className="mt-5 text-sm text-muted-foreground">All answers are visible — you can still scroll the transcript.</p>
          ) : (
            <button
              type="button"
              onClick={() => setShowAllAtOnce(true)}
              className="mt-5 text-sm font-medium text-[#00795c] underline-offset-4 hover:text-[#00CC99] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
            >
              Show all questions and answers at once
            </button>
          )}
        </div>

        <ol
          className="m-0 list-none space-y-6 sm:space-y-10 rounded-xl sm:rounded-2xl border border-black/5 bg-[#f3f6f5] p-3 sm:p-6 md:p-8 shadow-[0_10px_40px_rgba(45,55,55,0.06)]"
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
            className="cta-button font-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 border-0 w-full sm:w-auto"
            onClick={() => openShopifyInstall()}
            aria-label="Start your free Aurevia trial on Shopify"
          >
            <span className="flex items-center gap-2">
              Start free trial
              <ArrowRight className="w-5 h-5 cta-arrow" aria-hidden="true" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
