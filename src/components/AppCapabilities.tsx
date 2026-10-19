"use client";

/**
 * Home: "In your dashboard" — four capabilities on one pinned stage, copy
 * beside a dashboard screenshot in a browser frame with a phone overlay of the same page at mobile width.
 * Screenshots come from the Lucien Vallière demo store; a row with no capture
 * yet renders a labelled placeholder rather than a stand-in image.
 */

import PinnedShowcase from "./PinnedShowcase";
import { BrowserFrame } from "./DeviceFrames";

const rows: {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  url: string;
  desktop?: string;
  mobile?: string;
}[] = [
  {
    eyebrow: "01 · Dashboard",
    title: "Every dollar the AI touched, on one screen",
    body: "Sold by AI, resolution rate, escalations, and what shoppers ask most. Not vanity counts — the numbers that tell you whether the agent is paying for itself, plus a copilot to ask about any of them.",
    points: ["Revenue sold by AI", "Resolution and escalation rates", "Most asked questions, clustered"],
    url: "app.aurevia.io/dashboard",
    desktop: "/images/app/dashboard-desktop.webp",
    mobile: "/images/app/dashboard-mobile.webp",
  },
  {
    eyebrow: "02 · Live activity",
    title: "Watch every chat. Take over from your phone.",
    body: "See what shoppers are asking and what's in their cart as it happens. Get the notification, step in, share a product or a cart link, then hand it back to the AI.",
    points: ["One-click takeover", "Share products and cart links", "Team roles and seats"],
    url: "app.aurevia.io/lead-management",
    desktop: "/images/app/live-activity-desktop.webp",
    mobile: "/images/app/live-activity-mobile.webp",
  },
  {
    eyebrow: "03 · Ask Aurevia",
    title: "A copilot that fixes your catalog, with your say-so",
    body: "Ask it what sold this week or which listings are hurting conversion. It answers with charts and citations, then proposes the edit. Nothing changes until you confirm.",
    points: ["Answers with charts and sources", "Proposes product and collection edits", "You confirm, it writes to Shopify"],
    url: "app.aurevia.io/product-management",
    desktop: "/images/app/ask-aurevia-desktop.webp",
    mobile: "/images/app/ask-aurevia-mobile.webp",
  },
  {
    eyebrow: "04 · Knowledge",
    title: "Feed it your docs. Correct it once.",
    body: "Drop in a link, a PDF or plain text and the agent stops guessing on shipping, returns and sizing. Didn't like an answer? Correct it from the chat and it never repeats the mistake.",
    points: ["Links, files, text", "Auto-detected store policies", "Corrections from any conversation"],
    url: "app.aurevia.io/knowledge",
    desktop: "/images/app/knowledge-desktop.webp",
    mobile: "/images/app/knowledge-mobile.webp",
  },
];

export default function AppCapabilities() {
  return (
    <section id="dashboard" className="py-14 sm:py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 sm:mb-20 scroll-fade">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#00665A] mb-3">In your dashboard</p>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-fraunces font-normal mb-3 sm:mb-4 text-foreground">
            Your side of <span className="green-highlight">Aurevia</span>
          </h2>
          <p className="text-sm sm:text-xl font-normal text-muted-foreground max-w-2xl mx-auto">
            Everything the agent does is visible, measurable and yours to step into.
          </p>
        </div>

        <PinnedShowcase
          items={rows}
          wideVisual
          renderVisual={(index) => (
            <BrowserFrame
              desktop={rows[index].desktop}
              mobile={rows[index].mobile}
              url={rows[index].url}
              alt={rows[index].title}
              phoneSide="left"
            />
          )}
        />
      </div>
    </section>
  );
}
