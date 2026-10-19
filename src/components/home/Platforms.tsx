import type { ComponentType } from "react";
import { ArrowRight } from "lucide-react";
import { AnthropicMark, AwsMark, OpenAIMark, ShopifyMark } from "@/components/BrandLogos";
import s from "./platforms.module.css";

/**
 * "Built on the best": the four platforms Aurevia runs on, each with what it actually does for Aurevia (checked
 * against the backend, October 2026). Worded as "built on", never "backed by" or "partner": Aurevia has no
 * investment or partnership with these companies, and doesn't hold the "Built for Shopify" badge. Replaces the
 * old data-handling band; its GDPR and company facts live in the AWS card and the footer line.
 */

const PLATFORMS: { name: string; Mark: ComponentType<{ className?: string }>; title: string; body: string }[] = [
  {
    name: "Shopify",
    Mark: ShopifyMark,
    title: "Made for Shopify",
    body: "A Shopify App Store app. It installs as a theme app embed, bills through Shopify, and keeps your products, prices, stock and policies in sync on its own.",
  },
  {
    name: "Anthropic",
    Mark: AnthropicMark,
    title: "Answers by Claude",
    body: "Every shopper conversation is answered by Anthropic’s Claude models, and Ask Aurevia runs on them too.",
  },
  {
    name: "OpenAI",
    Mark: OpenAIMark,
    title: "Search and images by OpenAI",
    body: "OpenAI’s embedding models match shoppers to the right products and policies, and its image model creates product photos on request.",
  },
  {
    name: "AWS",
    Mark: AwsMark,
    title: "Hosted on AWS in London",
    body: "Chats, leads and tickets are stored on AWS in London (eu-west-2), encrypted in transit and at rest.",
  },
];

export default function Platforms() {
  return (
    <section className={s.section}>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className={s.head}>
          <h2 className={s.title}>Built on the best</h2>
          <p className={s.lede}>The platforms behind every Aurevia conversation, and what each one does.</p>
        </div>

        <ul className={s.grid}>
          {PLATFORMS.map(({ name, Mark, title, body }) => (
            <li key={name} className={s.card}>
              <Mark className={s.watermark} />
              <span className={s.brand}>
                <Mark className={s.brandMark} />
                <span className={s.brandName}>{name}</span>
              </span>
              <span className={s.cardText}>
                <span className={s.cardTitle}>{title}</span>
                <span className={s.cardBody}>{body}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className={s.foot}>
          <p className={s.note}>
            GDPR access and deletion requests arrive through Shopify&rsquo;s GDPR webhooks. Aurevia Artificial Intelligence
            Ltd is a UK registered company, no. 16622049. Names and logos belong to their owners. Aurevia isn&rsquo;t
            affiliated with or endorsed by them.
          </p>
          <div className={s.links}>
            <a href="/gdpr/" className={s.link}>
              How we handle GDPR <ArrowRight aria-hidden="true" />
            </a>
            <a href="/privacy-policy/" className={s.link}>
              Privacy policy <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
