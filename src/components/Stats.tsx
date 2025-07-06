"use client";

import { Badge } from "@/components/ui/badge";
import { useStaggeredScrollFade } from "./ScrollAnimations";

const stats = [
  {
    number: "67%",
    label: "Sales Boost",
    description: "E-commerce sites see dramatic sales increases with AI recommendations"
  },
  {
    number: "35%",
    label: "Consumer Buying",
    description: "Of consumers actively buy based on chatbot suggestions and recommendations"
  },
  {
    number: "8×",
    label: "ROI Return",
    description: "Top performing companies earn up to 8× return on every dollar spent on AI customer service"
  },
  {
    number: "80%",
    label: "Issues Resolved",
    description: "AI chatbots handle customer queries independently, reducing support costs dramatically"
  }
];

export default function Stats() {
  const containerRef = useStaggeredScrollFade(100);

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 sm:top-10 left-8 sm:left-20 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div 
          className="absolute bottom-4 sm:bottom-10 right-8 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-l from-primary/5 to-transparent rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '1.5s' }}
        ></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors">
            Proven Results
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-inter font-normal mb-4 sm:mb-6 text-white">
            The Numbers Don't Lie: <span className="green-highlight">AI Delivers Real ROI</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful Shopify stores already seeing measurable results from AI-powered customer engagement.
          </p>
        </div>

        {/* Stats Grid */}
        <div 
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="scroll-fade text-center group px-2 sm:px-0"
            >
              {/* Big Number */}
              <div className="mb-3 sm:mb-4">
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold gradient-text group-hover:scale-110 transition-transform duration-300 inline-block">
                  {stat.number}
                </span>
              </div>
              
              {/* Label */}
              <h3 className="gradient-text text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-300">
                {stat.label}
              </h3>
              
              {/* Description Line */}
              <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 mx-auto mb-3 sm:mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
              </div>
              
              {/* Description */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xs mx-auto px-2 sm:px-0">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}