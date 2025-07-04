"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { useScrollFade } from "./ScrollAnimations";

const faqs = [
  {
    question: "How do I add an AI chatbot to my Shopify store?",
    answer: "Installing Aurevia is simple - just one click from the Shopify App Store. No coding, no theme modifications required. The chatbot automatically syncs with your products, discounts, and branding, and you can customize the tone, colors, and business rules through our intuitive interface.",
  },
  {
    question: "Can a chatbot help reduce abandoned carts on Shopify?",
    answer: "Absolutely! Aurevia's AI specifically targets cart abandonment by detecting exit intent, answering last-minute questions, and providing one-click checkout links. Our beta stores have seen significant improvements in cart recovery rates through real-time engagement.",
  },
  {
    question: "How can I use an AI chatbot to upsell and cross-sell on Shopify?",
    answer: "Aurevia analyzes live shopper context and your entire product catalog to suggest perfect complementary products. It creates personalized bundles and recommendations in real-time conversations, significantly boosting average order value without relying on discounts.",
  },
  {
    question: "How do I install Aurevia's AI chatbot on my Shopify store?",
    answer: "Installation takes just one click from the Shopify App Store. Once installed, Aurevia automatically integrates with your store, syncing products, discounts, and branding. You can then customize settings, upload brand guidelines, and set your preferred tone of voice through our dashboard.",
  },
  {
    question: "How much does Aurevia's AI sales chatbot cost?",
    answer: "We offer three plans: Starter Kit at $39/seat/month, Revenue Suite at $79/seat/month, and custom Commerce OS pricing. All plans include a free trial, and we offer annual discounts of approximately 30%. Beta testers get 60 days free with all features unlocked.",
  },
  {
    question: "Is Aurevia's AI chatbot secure, and how does it handle customer data?",
    answer: "Yes, Aurevia is fully GDPR-compliant and Shopify-Partner verified. We follow enterprise-grade security protocols to protect customer data. All conversations are encrypted, and we provide detailed privacy controls so you can manage data according to your policies.",
  },
  {
    question: "Can a live agent take over a conversation from Aurevia's chatbot?",
    answer: "Absolutely! Aurevia seamlessly hands off conversations to live agents when needed. The AI recognizes when human intervention is required and notifies your team, providing full conversation context so agents can continue naturally without repeating information.",
  },
  {
    question: "What sets Aurevia's Shopify chatbot apart from other chatbots?",
    answer: "Aurevia is specifically built for Shopify sales, not just support. It's trained on your brand, handles complex product recommendations, recovers carts in real-time, and provides actionable sales analytics. Unlike generic chatbots, Aurevia acts as a true AI sales representative that understands your business goals.",
  },
];

export default function FAQ() {
  const sectionRef = useScrollFade();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="faq" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 scroll-fade">
          <h2 className="gradient-text text-4xl md:text-5xl font-inter font-normal mb-6">
            We've Got the Answers You're Looking For
          </h2>
          <p className="text-xl font-light text-muted-foreground">
            Quick answers to your "Shopify AI Sales Chatbot" questions.
          </p>
        </div>

        <div
          ref={sectionRef as React.RefObject<HTMLDivElement>}
          className="scroll-fade faq-gradient p-8 rounded-2xl"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-inter font-normal text-white hover:text-[#095C46] transition-colors duration-200 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12 scroll-fade">
          <Button
            size="lg"
            className="cta-button text-white font-medium px-8 py-4 text-lg rounded-lg transition-all duration-200 transform hover:scale-105 hover:bg-[#095C46] flex items-center gap-2 mx-auto border-0"
            onClick={() => scrollToSection("beta")}
          >
            Get the Beta Access!
            <ArrowRight className="w-5 h-5 cta-arrow" />
          </Button>
        </div>
      </div>
    </section>
  );
}
