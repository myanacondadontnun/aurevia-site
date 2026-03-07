"use client";

import { trackButtonClick } from "@/lib/analytics";

interface SolutionsCTAButtonProps {
  installUrl: string;
}

export default function SolutionsCTAButton({ installUrl }: SolutionsCTAButtonProps) {
  const handleClick = () => {
    trackButtonClick("Start for free", "solutions_page_cta");
  };

  return (
    <a
      href={installUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="inline-flex items-center justify-center cta-button text-white font-normal px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg rounded-xl min-h-[48px] border-0 shadow-lg hover:shadow-primary/20 transition-all font-roi no-underline"
      aria-label="Start for free on Shopify App Store"
    >
      Start for free
    </a>
  );
}
