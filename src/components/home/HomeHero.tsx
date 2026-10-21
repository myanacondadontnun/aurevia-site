"use client";

import { ArrowRight, Star } from "lucide-react";
import { SHOPIFY_LISTING_URL, SHOPIFY_RATING, SHOPIFY_REVIEW_COUNT } from "@/lib/reviews";
import { trackButtonClick } from "@/lib/analytics";
import { SHOPIFY_APP_URL } from "@/lib/utils";
import h from "./hero.module.css";
import HeroChannels from "./HeroChannels";
import HeroWatermark from "./HeroWatermark";

/**
 * Home hero, no photo (Hallmark redesign, atmospheric): a warm paper canvas with two soft emerald blooms and fine grain;
 * the Aurevia ring (outer weave only) sits cropped by the right edge as a watermark, turning very slowly, a little
 * faster while the page scrolls, with a light parallax. Left, the Fraunces headline fades in word by word, then the
 * line, the two pill buttons and the proof row. Right, HeroChannels: four channel tabs, each playing one sale on the
 * Lucien Vallière demo store, starting with the store chat widget.
 */

const HEADLINE = ["One", "AI", "sales", "agent."];
const ACCENT = ["Every", "channel."];

export default function HomeHero() {
  return (
    <section id="hero" className={h.hero}>
      <div className={h.grain} aria-hidden="true" />
      <HeroWatermark />

      <div className={`container mx-auto px-4 sm:px-6 ${h.inner}`}>
        <div className={h.copy}>
          <h1 className={h.title}>
            {HEADLINE.map((w, i) => (
              <span key={w} className={h.word} style={{ animationDelay: `${40 + i * 25}ms` }}>
                {w}{" "}
              </span>
            ))}
            {/* The accent line always starts on its own line. */}
            <span className={h.accentLine}>
              {ACCENT.map((w, i) => (
                <span
                  key={w}
                  className={`${h.word} ${h.accent}`}
                  style={{ animationDelay: `${40 + (HEADLINE.length + i) * 25}ms` }}
                >
                  {w}{i < ACCENT.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </h1>

          <p className={`${h.lede} ${h.fade}`} style={{ animationDelay: "190ms" }}>
            Store chat, email, WhatsApp and Instagram DMs. It finds shoppers the right
            products, answers their buying questions and guides them to checkout, 24/7.
          </p>

          <div className={`${h.ctas} ${h.fade}`} style={{ animationDelay: "230ms" }}>
            <a
              href={SHOPIFY_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("Start free trial", "hero_section")}
              className={h.primary}
            >
              Start free trial
              <ArrowRight aria-hidden="true" />
            </a>
            <a href="/book-demo/" onClick={() => trackButtonClick("Book a demo", "hero_section")} className={h.secondary}>
              Book a demo
            </a>
          </div>

          {/* Proof as three set figures with hairline rules between them. 50+ is the live install count from the
              stores table (Oct 2026). */}
          <ul className={`${h.stats} ${h.fade}`} style={{ animationDelay: "270ms" }}>
            <li className={h.stat}>
              <a
                href={SHOPIFY_LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={h.statLink}
                aria-label={`Rated ${SHOPIFY_RATING.toFixed(1)} out of 5 on the Shopify App Store from ${SHOPIFY_REVIEW_COUNT} reviews`}
              >
                <span className={h.statFig}>
                  {SHOPIFY_RATING.toFixed(1)}
                  <span className={h.stars} aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}
                  </span>
                </span>
                <span className={h.statLabel}>
                  {SHOPIFY_REVIEW_COUNT} reviews<span className={h.wideOnly}> on Shopify</span>
                </span>
              </a>
            </li>
            <li className={h.stat}>
              <span className={h.statFig}>50+</span>
              <span className={h.statLabel}>Shopify stores</span>
            </li>
            <li className={h.stat}>
              <span className={h.statFig}>14 days</span>
              <span className={h.statLabel}>free trial</span>
            </li>
          </ul>
        </div>

        <div className={`${h.demo} ${h.fadeLate}`}>
          <HeroChannels />
        </div>
      </div>
    </section>
  );
}
