import type { Metadata } from "next";
import { ArrowRight, Check, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import HeroWatermark from "@/components/home/HeroWatermark";
import { FeatureCta } from "@/components/FeatureSubpageLayout";
import { ImageGenDemo, WhyDuel, WhyScorecard } from "@/components/why/WhyDemos";
import ChannelInbox from "@/components/channels/ChannelInbox";
import { breadcrumbJsonLd } from "@/lib/schema";
import { getReview, SHOPIFY_LISTING_URL, SHOPIFY_RATING, SHOPIFY_REVIEW_COUNT } from "@/lib/reviews";
import { sitePhoto } from "@/lib/sitePhoto";
import { buildShopifyInstallUrl } from "@/lib/utils";
import h from "@/components/home/hero.module.css";
import w from "@/components/why/why.module.css";

const title = "Why Aurevia | An AI Sales Agent, Not Another Chatbot";
const description =
  "Most chatbots answer questions. Aurevia sells: it asks what the shopper needs, recommends from your live Shopify catalogue, builds the cart in the chat and follows up when they leave.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/why-aurevia" },
  openGraph: { title, description, type: "website", url: "https://aurevia.io/why-aurevia/" },
};

/* What a typical FAQ bot and a typical general-purpose AI chatbot do at each moment of a sale, against Aurevia.
   Typical behaviour, not any named product; individual tools vary (the footnote says so). */
const MOMENTS: { moment: string; faq: string; ai: string; us: string }[] = [
  {
    moment: "The shopper isn't sure what to buy",
    faq: "Shows a menu or a link to the catalogue.",
    ai: "Lists products that match the words they typed.",
    us: "Asks what it's for, then picks two or three with a reason for each.",
  },
  {
    moment: "A question about sizing, materials or stock",
    faq: "Only what's in the script.",
    ai: "Reads your web pages. Can't see live stock, and may guess.",
    us: "Answers from your synced catalogue, stock and knowledge base.",
  },
  {
    moment: "They're ready to buy",
    faq: "Sends them to the product page.",
    ai: "Sends a link.",
    us: "Adds it to the cart inside the chat and opens checkout.",
  },
  {
    moment: "The cart is left behind",
    faq: "Usually nothing.",
    ai: "Usually nothing.",
    us: "A nudge in the chat, then a follow-up by email in your voice and on WhatsApp.",
  },
  {
    moment: "They need a person",
    faq: "Takes a message.",
    ai: "Hands over a transcript.",
    us: "Your team takes over live, with the chat and the cart on screen.",
  },
  {
    moment: "You check whether it worked",
    faq: "Chats handled.",
    ai: "Messages and resolution rate.",
    us: "Revenue and orders it influenced, from real Shopify orders.",
  },
  {
    moment: "Where it talks to shoppers",
    faq: "Your website.",
    ai: "Your website.",
    us: "Store chat, email, WhatsApp and Instagram DMs and comments.",
  },
  {
    moment: "You need images for a launch",
    faq: "Not its job.",
    ai: "Not its job.",
    us: "Ask Aurevia makes them from a prompt, using your own product photos.",
  },
];

const REVIEWS = ["masks-capes", "lotus-beauty", "l1nk"].map(getReview);

export default function WhyAureviaPage() {
  const installUrl = buildShopifyInstallUrl();
  return (
    <div className={w.page}>
      <Navbar />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Why Aurevia", path: "/why-aurevia" }])} />
      <main>
        {/* ─── Hero: the shared hero, with the scorecard as its demo ─── */}
        <section className={h.hero}>
          <div className={h.grain} aria-hidden="true" />
          <HeroWatermark />
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${h.inner}`}>
            <div className={h.copy}>
              <h1 className={`${h.title} ${h.fade} ${w.title}`}>
                Most chatbots answer. <em>Aurevia sells.</em>
              </h1>
              <p className={`${h.lede} ${h.fade}`} style={{ animationDelay: "120ms" }}>
                A chatbot waits for a question and points to a help page. Aurevia asks what the shopper needs, recommends
                from your live catalogue, puts it in the cart and follows up when they leave. Same chat bubble. A different
                job.
              </p>
              <div className={`${h.ctas} ${h.fade}`} style={{ animationDelay: "180ms" }}>
                <a href={installUrl} target="_blank" rel="noopener noreferrer" className={h.primary}>
                  Start free trial <ArrowRight aria-hidden="true" />
                </a>
                <a href="/book-demo/" className={h.secondary}>
                  Book a demo
                </a>
              </div>
              {/* The same three proof figures as the home hero. 50+ is the live install count (Oct 2026). */}
              <ul className={`${h.stats} ${h.fade}`} style={{ animationDelay: "220ms" }}>
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
            <div className={`${h.fadeLate}`} style={{ display: "flex", justifyContent: "center" }}>
              <WhyScorecard />
            </div>
          </div>
        </section>

        {/* ─── The duel (night) ─── */}
        <section className={w.night}>
          <span className={w.nightRing} aria-hidden="true" />
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className={w.duelHead}>
              <h2 className={w.h2}>
                Same shopper. Same question. <em>Only one makes the sale.</em>
              </h2>
              <p className={w.lede}>
                A shopper on Linden &amp; Wren, a demo fashion store, asks for a wedding dress. Watch what a typical chatbot
                does with it, and what Aurevia does.
              </p>
            </div>
            <WhyDuel
              dress={sitePhoto("fashion-linen-dress") ?? "/images/site/fashion-linen-dress.png"}
              silk={sitePhoto("fashion-silk-dress") ?? "/images/site/fashion-silk-dress.webp"}
            />
          </div>
        </section>

        {/* ─── Line by line ─── */}
        <section className={w.section}>
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className={w.h2}>
              Every moment of the sale, <em>side by side.</em>
            </h2>
            <div className={w.table} role="table" aria-label="How a typical FAQ bot, a typical AI chatbot and Aurevia handle each moment of a sale">
              <div className={`${w.tr} ${w.th}`} role="row">
                <span role="columnheader">The moment</span>
                <span role="columnheader">Typical FAQ bot</span>
                <span role="columnheader">Typical AI chatbot</span>
                <span role="columnheader" className={w.thUs}>
                  <img src="/images/site/mark-ring.webp" alt="" /> Aurevia
                </span>
              </div>
              {MOMENTS.map((m) => (
                <div key={m.moment} className={w.tr} role="row">
                  <span className={w.moment} role="rowheader">{m.moment}</span>
                  <span className={w.cell} data-col="Typical FAQ bot" role="cell">{m.faq}</span>
                  <span className={w.cell} data-col="Typical AI chatbot" role="cell">{m.ai}</span>
                  <span className={`${w.cell} ${w.cellUs}`} data-col="Aurevia" role="cell">
                    <span className={w.usTick} aria-hidden="true"><Check /></span>
                    {m.us}
                  </span>
                </div>
              ))}
            </div>
            <p className={w.footnote}>
              Typical behaviour of FAQ bots and general-purpose AI chatbots on Shopify stores. Individual tools vary.
            </p>
          </div>
        </section>

        {/* ─── More than a chat window: every channel, and images on request ─── */}
        <section className={w.section}>
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className={w.h2}>
              More than a chat window, <em>in one place.</em>
            </h2>
            <div className={w.more}>
              <article className={w.moreCard}>
                <div className={w.moreCopy}>
                  <span className={w.moreKind}>Omnichannel</span>
                  <h3 className={w.moreTitle}>One agent on every channel</h3>
                  <p className={w.moreBody}>
                    The same agent answers in your store chat, by email, on WhatsApp and in Instagram DMs and comments.
                    One catalogue, one knowledge base and one inbox, so a shopper gets the same answer wherever they ask.
                  </p>
                  <a href="/channels/whatsapp/" className={w.moreLink}>
                    See every channel <ArrowRight aria-hidden="true" />
                  </a>
                </div>
                <div className={w.moreVisual}>
                  <ChannelInbox />
                </div>
              </article>
              <article className={w.moreCard}>
                <div className={w.moreCopy}>
                  <span className={w.moreKind}>Image generation</span>
                  <h3 className={w.moreTitle}>Campaign images on request</h3>
                  <p className={w.moreBody}>
                    Ask Aurevia makes product and campaign images from a prompt, using your own product photo as the
                    reference. Download it, or add it to the product. Each image uses 5 messages.
                  </p>
                  <a href="/products/dashboard/" className={w.moreLink}>
                    Meet Ask Aurevia <ArrowRight aria-hidden="true" />
                  </a>
                </div>
                <div className={w.moreVisual}>
                  <ImageGenDemo />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ─── Real reviews, verbatim ─── */}
        <section className={w.section}>
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className={w.h2}>
              Store owners, <em>in their own words.</em>
            </h2>
            <ul className={w.reviews}>
              {REVIEWS.map((r) => (
                <li key={r.id} className={w.review}>
                  <span className={w.stars} aria-label="Rated 5 out of 5">
                    {[0, 1, 2, 3, 4].map((i) => <Star key={i} aria-hidden="true" />)}
                  </span>
                  <blockquote className={w.quote}>&ldquo;{r.quote}&rdquo;</blockquote>
                  <span className={w.by}>
                    <b>{r.store}</b> · {r.country}
                  </span>
                </li>
              ))}
            </ul>
            <a href={SHOPIFY_LISTING_URL} target="_blank" rel="noopener noreferrer" className={w.allReviews}>
              Read all {SHOPIFY_REVIEW_COUNT} reviews on the Shopify App Store <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <FeatureCta installUrl={installUrl} />
      </main>
      <Footer />
    </div>
  );
}
