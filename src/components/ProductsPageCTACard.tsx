"use client";

import { trackButtonClick } from "@/lib/analytics";

interface ProductsPageCTACardProps {
  installUrl: string;
}

export default function ProductsPageCTACard({ installUrl }: ProductsPageCTACardProps) {
  const handleClick = () => {
    trackButtonClick("Start for free", "products_page_cta");
  };

  return (
    <a
      href={installUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group block h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        boxShadow:
          "0 20px 60px -15px rgba(2, 223, 166, 0.12), 0 0 0 1px rgba(2, 223, 166, 0.06)",
      }}
      aria-label="Try Aurevia for free on Shopify App Store"
    >
      <div
        className="cta-card-shine relative h-full min-h-[280px] rounded-2xl overflow-hidden px-6 py-7 sm:px-7 sm:py-8 flex flex-col justify-between"
        style={{
          background:
            "linear-gradient(135deg, #0b3c2f 0%, rgba(2, 223, 166, 0.18) 50%, rgba(11, 60, 47, 0.4) 100%)",
        }}
      >
        {/* Clouds: layered soft green blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 5% 15%, rgba(2, 223, 166, 0.14) 0%, transparent 55%), radial-gradient(ellipse 85% 65% at 92% 85%, rgba(2, 223, 166, 0.1) 0%, transparent 50%), radial-gradient(ellipse 70% 90% at 50% 55%, rgba(255,255,255,0.05) 0%, transparent 60%)",
          }}
        />
        {/* Waves: soft horizontal bands */}
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(2, 223, 166, 0.04) 25%, transparent 50%, rgba(11, 60, 47, 0.06) 75%, transparent 100%)",
          }}
        />
        {/* Thin wavy white vertical lines – abstract background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.14]"
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <path d="M 60 0 Q 90 75 60 150 Q 30 225 60 300" stroke="white" strokeWidth="0.5" fill="none" />
          <path d="M 120 0 Q 150 75 120 150 Q 90 225 120 300" stroke="white" strokeWidth="0.45" fill="none" />
          <path d="M 200 0 Q 230 75 200 150 Q 170 225 200 300" stroke="white" strokeWidth="0.5" fill="none" />
          <path d="M 280 0 Q 310 75 280 150 Q 250 225 280 300" stroke="white" strokeWidth="0.45" fill="none" />
          <path d="M 340 0 Q 370 75 340 150 Q 310 225 340 300" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full gap-6">
          <h2 className="font-roi text-xl font-medium text-white group-hover:text-[#02DFA6] transition-colors">
            Try Aurevia.io for Free
          </h2>
          <span className="font-roi inline-flex items-center justify-center cta-button text-white font-medium px-5 py-2.5 text-sm rounded-xl min-h-[44px] border-0">
            Start for free
          </span>
        </div>
      </div>
    </a>
  );
}
