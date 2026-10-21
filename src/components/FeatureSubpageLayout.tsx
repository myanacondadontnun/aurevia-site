import Link from "next/link";
import { ArrowRight, Check, Minus, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildShopifyInstallUrl } from "@/lib/utils";
import { REVIEW_LOGOS, SHOPIFY_LISTING_URL, SHOPIFY_RATING, SHOPIFY_REVIEW_COUNT, type Review } from "@/lib/reviews";
import HeroWatermark from "@/components/home/HeroWatermark";
import h from "@/components/home/hero.module.css";
import JsonLd from "@/components/JsonLd";
import FeatureVisualView, { type FeatureVisual } from "@/components/FeatureVisuals";
import HeroGlassChat, { type HeroChat } from "@/components/HeroGlassChat";
import CustomerLogos from "@/components/CustomerLogos";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";
import f from "./featurePage.module.css";

export interface FeatureBlock {
  title: string;
  body: string;
  /** A small still picture of what this card describes */
  visual?: FeatureVisual;
}

export interface HowStep {
  title: string;
  body: string;
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FeatureSubpageLayoutProps {
  backHref: string;
  backLabel: string;
  /** This page's own path, e.g. "/products/cart-recovery". Turns the back link into a breadcrumb trail (with BreadcrumbList schema). */
  path?: string;
  /** Name of this page in the breadcrumb schema. Defaults to the eyebrow. */
  breadcrumbLabel?: string;
  /** Short page name, e.g. "Cart recovery"; names the page in the breadcrumb schema (not shown) */
  eyebrow?: string;
  /** Main H1 content; <span className="green-highlight"> marks the green words, set on their own line */
  headline: React.ReactNode;
  subtitle: string;
  /** Optional long intro under subtitle */
  lede?: string;
  /** Short points about the page (no longer shown in the hero, which carries the shared proof row) */
  heroBullets?: string[];
  /** Live product demo rendered beside the hero copy (chat / metrics / code mockup) */
  demo?: React.ReactNode;
  featureBlocks: FeatureBlock[];
  /** Show "What you get" as frosted cards across a wide photo, like the home channels band */
  featureBand?: { src: string; alt: string; position?: string };
  howItWorks?: HowStep[];
  relatedLinks: RelatedLink[];
  faqs?: FaqItem[];
  /** A second scripted scene, shown mid-page beside its own copy */
  secondDemo?: { eyebrow: string; title: string; body: string; demo: React.ReactNode; points?: string[] };
  /** The dashboard screen this page is about, as an animated scene (or a capture via src), with a caption */
  screenshot?: { scene?: React.ReactNode; src?: string; mobile?: string; title: string; caption: string };
  /** How merchants configure this, each step with a small animated scene (or a capture via src) */
  setup?: { title: string; steps: { scene?: React.ReactNode; src?: string; title: string; body: string }[] };
  /** A verbatim App Store review that matches this page */
  review?: Review;
  /** Common problems in this kind of store, each with how Aurevia handles it */
  challenges?: { title: string; problem: string; fix: string }[];
  /** A store without Aurevia against one with it, row by row */
  beforeAfter?: { without: string; with: string }[];
  /** Who it suits and who it may not suit yet */
  fit?: { good: string[]; notYet: string[] };
  /** Extra content placed after the FAQ (e.g. how a channel handles customer data) */
  extra?: React.ReactNode;
  /** Adjacent capabilities worth a click */
  alsoSee?: { href: string; title: string; body: string }[];
  /** Optional right column or full-width image above fold */
  heroVisual?: {
    src: string;
    alt: string;
    className?: string;
    /** A glass conversation played over the photo */
    chat?: HeroChat;
  };
}

function kindOf(href: string) {
  if (href.startsWith("/help")) return "Documentation";
  if (href.startsWith("/products")) return "Product";
  if (href.startsWith("/solutions")) return "Solution";
  if (href.startsWith("/channels")) return "Channel";
  if (href.startsWith("/resources")) return "Resources";
  return "Aurevia";
}

/** The night call to action with the still ring, shared by every product and solution page and the products index. */
export function FeatureCta({ installUrl }: { installUrl: string }) {
  return (
    <section className={f.ctaSection} id="get-started">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className={f.cta}>
          <span className={f.ctaMark} aria-hidden="true" />
          <h2 className={f.ctaTitle}>See it live on your store</h2>
          <p className={f.ctaLede}>
            Install from the Shopify App Store, sync your catalogue and watch the first conversations come in. Free for
            14 days.
          </p>
          <div className={f.ctaButtons}>
            <a href={installUrl} target="_blank" rel="noopener noreferrer" className={f.primary}>
              Start free trial <ArrowRight aria-hidden="true" />
            </a>
            <Link href="/book-demo/" className={f.ctaSecondary}>
              Book a demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Product and solution pages (design.md): a left-aligned hero with the page's live demo, then only the sections the
 * page fills in, each on the paper page with the shared section rhythm, ending on the night call to action.
 */
export default function FeatureSubpageLayout({
  backHref,
  backLabel,
  path,
  breadcrumbLabel,
  eyebrow,
  headline,
  subtitle,
  lede,
  demo,
  featureBlocks,
  featureBand,
  howItWorks,
  relatedLinks,
  faqs,
  heroVisual,
  secondDemo,
  screenshot,
  setup,
  review,
  alsoSee,
  extra,
  challenges,
  beforeAfter,
  fit,
}: FeatureSubpageLayoutProps) {
  const installUrl = buildShopifyInstallUrl();
  const crumbName = breadcrumbLabel ?? eyebrow;
  const parentName = backLabel.replace(/^←\s*Back to\s*/, "");
  // Product and channel pages sit directly under Home: /products and /channels only redirect.
  const crumbs = [
    { name: "Home", path: "/" },
    ...(backHref === "/products" || backHref === "/channels" ? [] : [{ name: parentName, path: backHref }]),
    ...(path && crumbName ? [{ name: crumbName, path }] : []),
  ];
  const logo = review ? REVIEW_LOGOS[review.id] : undefined;
  // "Also see" first, then any related link it doesn't already cover; a help link drops its "Help:" prefix.
  const explore = [
    ...(alsoSee ?? []).map((a) => ({ href: a.href, title: a.title, body: a.body })),
    ...relatedLinks.filter((l) => !alsoSee?.some((a) => a.href === l.href)).map((l) => ({ href: l.href, title: l.label, body: "" })),
  ]
    .slice(0, 5)
    .map((item) => ({ ...item, kind: kindOf(item.href), title: item.title.replace(/^Help:\s*(\w)/i, (_, c: string) => c.toUpperCase()) }));

  return (
    <div className={f.page}>
      <Navbar />
      {path && crumbName ? <JsonLd data={breadcrumbJsonLd(crumbs)} /> : null}
      {faqs && faqs.length > 0 ? (
        <JsonLd data={faqJsonLd(faqs.map((item) => ({ question: item.q, answer: item.a })))} />
      ) : null}

      <main>
        {/* ─── Hero: the home hero's moves (blooms, grain, the turning ring, proof row), with this page's demo ─── */}
        <section className={h.hero}>
          <div className={h.grain} aria-hidden="true" />
          <HeroWatermark />
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${h.inner} ${f.heroInner}`}>
            <div className={h.copy}>
              <h1 className={`${h.title} ${h.fade} ${f.heroTitle}`}>{headline}</h1>
              <p className={`${h.lede} ${h.fade}`} style={{ animationDelay: "120ms" }}>{subtitle}</p>
              {lede ? <p className={`${f.ledeMore} ${h.fade}`} style={{ animationDelay: "150ms" }}>{lede}</p> : null}

              <div className={`${h.ctas} ${h.fade}`} style={{ animationDelay: "180ms" }}>
                <a href={installUrl} target="_blank" rel="noopener noreferrer" className={h.primary}>
                  Start free trial <ArrowRight aria-hidden="true" />
                </a>
                <Link href="/book-demo/" className={h.secondary}>
                  Book a demo
                </Link>
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

            {demo ? (
              <div className={`${f.heroDemo} ${h.fadeLate}`}>{demo}</div>
            ) : heroVisual ? (
              <div className={`${f.heroImage} ${heroVisual.chat ? f.heroImageChat : ""} ${h.fadeLate}`}>
                <img src={heroVisual.src} alt={heroVisual.alt} />
                {heroVisual.chat ? <HeroGlassChat chat={heroVisual.chat} /> : null}
              </div>
            ) : null}
          </div>
        </section>

        {/* ─── Common problems (night): each column moves from the problem to the fix ─── */}
        {challenges && challenges.length > 0 ? <CustomerLogos /> : null}
        {challenges && challenges.length > 0 ? (
          <section className={f.nightBand}>
            <span className={f.nightRing} aria-hidden="true" />
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className={f.h2}>Common problems, solved</h2>
              <ol className={f.problems}>
                {challenges.map((c, i) => (
                  <li key={c.title} className={f.problem}>
                    <span className={f.problemNo}>{String(i + 1).padStart(2, "0")}</span>
                    <h3 className={f.problemTitle}>{c.title}</h3>
                    <p className={f.problemWithout}>{c.problem}</p>
                    <span className={f.problemRule}>
                      <img src="/images/site/mark-ring.webp" alt="" /> With Aurevia
                    </span>
                    <p className={f.problemWith}>{c.fix}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        {/* ─── What you get: cards, each with a still picture of what it describes ─── */}
        {featureBlocks.length > 0 ? (
          <section className={f.section}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className={f.h2}>What you get</h2>
              {featureBand ? (
                <div className={f.band}>
                  <div className={f.bandPhoto}>
                    <img src={featureBand.src} alt={featureBand.alt} loading="lazy" style={{ objectPosition: featureBand.position }} />
                  </div>
                  <ul className={f.bandCards}>
                    {featureBlocks.map((item) => (
                      <li key={item.title} className={f.bandCard}>
                        {item.visual ? (
                          <div className={f.bandMedia}>
                            <FeatureVisualView visual={item.visual} />
                          </div>
                        ) : null}
                        <div className={f.bandBody}>
                          <h3 className={f.featTitle}>{item.title}</h3>
                          <p className={f.featText}>{item.body}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className={featureBlocks.length % 3 === 0 ? `${f.featGrid} ${f.featGrid3}` : f.featGrid}>
                  {featureBlocks.map((item) => (
                    <li key={item.title} className={f.featCard}>
                      {item.visual ? (
                        <div className={f.featMedia}>
                          <FeatureVisualView visual={item.visual} />
                        </div>
                      ) : null}
                      <div className={f.featBody}>
                        <h3 className={f.featTitle}>{item.title}</h3>
                        <p className={f.featText}>{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ) : null}

        {/* ─── Without / with: a muted panel, and the Aurevia card raised over it ─── */}
        {beforeAfter && beforeAfter.length > 0 ? (
          <section className={f.section}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className={f.h2}>Your store, without and with Aurevia</h2>
              <div className={f.vs}>
                <div className={f.vsCard}>
                  <h3 className={f.vsTitle}>Without Aurevia</h3>
                  <ul className={f.vsList}>
                    {beforeAfter.map((r) => (
                      <li key={r.without}><span className={f.vsDot} aria-hidden="true" />{r.without}</li>
                    ))}
                  </ul>
                </div>
                <div className={`${f.vsCard} ${f.vsUs}`}>
                  <h3 className={f.vsTitle}><img src="/images/site/mark-ring.webp" alt="" /> With Aurevia</h3>
                  <ul className={f.vsList}>
                    {beforeAfter.map((r) => (
                      <li key={r.with}><span className={f.vsTick} aria-hidden="true"><Check /></span>{r.with}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* ─── How it works ─── */}
        {howItWorks && howItWorks.length > 0 ? (
          <section className={f.section}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className={f.h2}>How it works</h2>
              <ol className={f.steps}>
                {howItWorks.map((step, i) => (
                  <li key={step.title} className={f.step}>
                    <span className={f.stepNo} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className={f.stepTitle}>{step.title}</h3>
                    <p className={f.stepText}>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        {/* ─── Second scene ─── */}
        {secondDemo ? (
          <section className={f.section}>
            <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${f.scene}`}>
              <div className={f.sceneCopy}>
                <p className={f.eyebrow}>{secondDemo.eyebrow}</p>
                <h2 className={f.h2}>{secondDemo.title}</h2>
                <p className={f.sectionLede}>{secondDemo.body}</p>
                {secondDemo.points ? (
                  <ul className={f.pills}>
                    {secondDemo.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className={f.sceneDemo}>{secondDemo.demo}</div>
            </div>
          </section>
        ) : null}

        {/* ─── Real dashboard capture ─── */}
        {screenshot ? (
          <section className={f.section}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <p className={f.eyebrow}>In your dashboard</p>
              <h2 className={f.h2}>{screenshot.title}</h2>
              <p className={f.sectionLede}>{screenshot.caption}</p>
              <figure className={screenshot.mobile && !screenshot.scene ? `${f.shot} ${f.shotHasPhone}` : f.shot}>
                <div className={f.shotFrame}>
                  {screenshot.scene ? (
                    screenshot.scene
                  ) : screenshot.src ? (
                    <img src={screenshot.src} alt={screenshot.title} loading="lazy" />
                  ) : (
                    <div className={f.shotPending}>Screenshot pending</div>
                  )}
                </div>
                {screenshot.mobile && !screenshot.scene ? (
                  <div className={f.shotPhone} aria-hidden="true">
                    <img src={screenshot.mobile} alt="" loading="lazy" />
                  </div>
                ) : null}
              </figure>
            </div>
          </section>
        ) : null}

        {/* ─── Setup ─── */}
        {setup ? (
          <section className={f.section}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className={f.h2}>{setup.title}</h2>
              <ol className={f.cards}>
                {setup.steps.map((st, i) => (
                  <li key={st.title} className={f.card}>
                    <div className={st.scene ? `${f.cardMedia} ${f.cardMediaScene}` : f.cardMedia}>
                      {st.scene ? (
                        st.scene
                      ) : st.src ? (
                        <img src={st.src} alt={st.title} loading="lazy" />
                      ) : (
                        <div className={f.shotPending}>Screenshot pending</div>
                      )}
                    </div>
                    <div className={f.cardBody}>
                      <p className={f.cardLabel}>Step {i + 1}</p>
                      <h3 className={f.cardTitle}>{st.title}</h3>
                      <p className={f.cardText}>{st.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        {/* ─── Review (verbatim) ─── */}
        {review ? (
          <section className={f.section}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <figure className={f.review}>
                <blockquote className={f.quote}>&ldquo;{review.quote}&rdquo;</blockquote>
                <figcaption className={f.by}>
                  {logo ? (
                    <span
                      className={f.byLogo}
                      aria-hidden="true"
                      style={{ width: 36 * logo.ratio, WebkitMaskImage: `url(${logo.src})`, maskImage: `url(${logo.src})` }}
                    />
                  ) : null}
                  <span>
                    <span className={f.byStore}>{review.store}</span>
                    <span className={f.byWhere}>
                      {review.country} ·{" "}
                      <a href={SHOPIFY_LISTING_URL} target="_blank" rel="noopener noreferrer">
                        Shopify App Store review
                      </a>
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </section>
        ) : null}

        {/* ─── Is it a fit? ─── */}
        {fit ? (
          <section className={f.section}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className={f.h2}>Is Aurevia right for your store?</h2>
              <div className={f.fit}>
                <div className={f.fitCol}>
                  <h3 className={f.fitTitle}>A good fit if you</h3>
                  <ul>
                    {fit.good.map((g) => (
                      <li key={g}><span className={f.markYes} aria-hidden="true"><Check /></span>{g}</li>
                    ))}
                  </ul>
                </div>
                <div className={`${f.fitCol} ${f.fitColMuted}`}>
                  <h3 className={f.fitTitle}>Maybe not yet if you</h3>
                  <ul>
                    {fit.notYet.map((g) => (
                      <li key={g}><span className={f.markNo} aria-hidden="true"><Minus /></span>{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* ─── FAQ ─── */}
        {faqs && faqs.length > 0 ? (
          <section className={f.section}>
            <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${f.split}`}>
              <h2 className={f.h2}>Questions, answered</h2>
              <div className={f.list}>
                {faqs.map((item) => (
                  <details key={item.q} className={f.faqItem}>
                    <summary className={f.faqQ}>
                      {item.q}
                      <span className={f.faqIcon} aria-hidden="true" />
                    </summary>
                    <p className={f.faqA}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {extra}

        {/* ─── Keep exploring: the page's "also see" and related links, side by side ─── */}
        {explore.length > 0 ? (
          <section className={f.section}>
            <div className="container mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className={f.h2}>Keep exploring</h2>
              <ul className={f.explore} style={{ "--explore-cols": explore.length } as React.CSSProperties}>
                {explore.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={f.exploreLink}>
                      <span className={f.exploreKind}>{item.kind}</span>
                      <span className={f.exploreText}>
                        <span className={f.exploreTitle}>{item.title}</span>
                        {item.body ? <span className={f.exploreBody}>{item.body}</span> : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <FeatureCta installUrl={installUrl} />
      </main>
      <Footer />
    </div>
  );
}
