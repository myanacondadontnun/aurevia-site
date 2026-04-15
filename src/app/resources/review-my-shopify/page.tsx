import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import Link from "next/link";
import ReviewHeroForm from "@/components/ReviewHeroForm";
import FloatingParticles from "@/components/FloatingParticles";
import CTASwarmParticles from "@/components/CTASwarmParticles";
import {
  Eye,
  ShieldCheck,
  ShoppingCart,
  ClipboardCheck,
  MessageSquareWarning,
  DollarSign,
  Users,
  Search,
  LayoutDashboard,
} from "lucide-react";

export const metadata: Metadata = {
  title:
    "Review My Shopify Store — Free Professional Store Audit | Aurevia",
  description:
    "Get a free, professional Shopify store review. We audit your UI/UX, trust signals, checkout flow, and conversion psychology — the same analysis CRO agencies charge $1,200+ for.",
  keywords: [
    "review my shopify",
    "shopify store review",
    "shopify store audit",
    "free shopify review",
    "shopify conversion rate optimization",
    "shopify CRO audit",
    "shopify store feedback",
    "shopify store critique",
    "ecommerce store review",
    "shopify UX audit",
  ],
  alternates: {
    canonical: "https://aurevia.io/resources/review-my-shopify",
  },
  openGraph: {
    title:
      "Review My Shopify Store — Free Professional Audit | Aurevia",
    description:
      "Stop guessing why your store isn't converting. Get a free comprehensive audit covering homepage, product pages, UX, trust signals, SEO, mobile experience, and a prioritized action plan.",
    url: "https://aurevia.io/resources/review-my-shopify",
    type: "website",
    siteName: "Aurevia.io",
    images: [
      {
        url: "/images/twitter_card.png",
        width: 1200,
        height: 600,
        alt: "Free Shopify Store Audit by Aurevia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Review My Shopify Store — Free Professional Audit | Aurevia",
    description:
      "Get a free professional Shopify store review. UI/UX, trust signals, checkout flow, and a custom action plan — no agency price tag.",
    images: ["/images/twitter_card.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Review My Shopify Store — Free Professional Audit",
  description:
    "Get a free, professional Shopify store review covering UI/UX, trust signals, checkout flow, and conversion psychology.",
  url: "https://aurevia.io/resources/review-my-shopify",
  publisher: {
    "@type": "Organization",
    name: "Aurevia.io",
    url: "https://aurevia.io",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description:
      "Free professional Shopify store audit — equivalent to a $1,200 CRO agency review",
    availability: "https://schema.org/InStock",
  },
};

const auditItems = [
  {
    icon: LayoutDashboard,
    title: "Homepage & Customer Journey",
    description:
      "We walk your store as a first-time visitor would — from the moment they land to the moment they leave. We map every drop-off point in the journey and tell you exactly where people are getting lost or losing interest.",
  },
  {
    icon: ShoppingCart,
    title: "Product Page & Collection Audit",
    description:
      "Your product pages are where buying decisions happen. We audit your images, descriptions, pricing layout, variant selectors, and add-to-cart flow to find the friction that's costing you sales.",
  },
  {
    icon: Eye,
    title: "Design / UI / UX Audit",
    description:
      "We look at visual hierarchy, navigation, mobile responsiveness, and page load. If a visitor has to think about where to click or what to do next, you're losing money.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Credibility Analysis",
    description:
      "Missing trust badges? Buried return policy? No reviews above the fold? We check every element that makes hesitant buyers feel safe — or makes them close the tab.",
  },
  {
    icon: Search,
    title: "SEO & Mobile Experience",
    description:
      "We audit your meta titles, descriptions, page speed, and how your store actually looks on a phone. Over 70% of Shopify traffic is mobile — if it's broken there, nothing else matters.",
  },
  {
    icon: ClipboardCheck,
    title: "Prioritized Action Plan",
    description:
      "No fluff, no vague advice. You get a ranked list of exactly what to fix first, ordered by impact. The changes that move the needle most go to the top.",
  },
];

const painPoints = [
  {
    icon: Users,
    label: "The Free Route",
    description:
      "Vague, subjective opinions from beginners on message boards. You'll get your logo roasted but nobody will tell you why your add-to-cart rate is 0.3%.",
  },
  {
    icon: DollarSign,
    label: "The Expensive Route",
    description:
      "Booking a specialized UX consultant or CRO agency that charges $1,200+ just to look at your site — before they even suggest a single fix.",
  },
  {
    icon: MessageSquareWarning,
    label: "The Guessing Route",
    description:
      "Changing random things on your store every week, hoping something sticks. Meanwhile, you're burning ad budget sending traffic into a broken funnel.",
  },
];

export default function ReviewMyShopifyPage() {
  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── Hero Section ─── */}
      <section
        id="review-hero"
        className="relative overflow-hidden min-h-[85vh] flex items-center scroll-mt-28"
      >
        <div className="absolute inset-0 gradient-bg pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
        <FloatingParticles />

        <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10 pt-4 pb-14 sm:pb-20">
          <Link
            href="/resources"
            className="text-muted-foreground hover:text-[#02DFA6] text-sm mb-10 inline-block transition-colors"
          >
            ← Back to Resources
          </Link>

          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-inter font-normal text-white mb-6 tracking-tight leading-[1.1]">
              Stop Guessing.{" "}
              <span className="block sm:inline">
                Get a{" "}
                <span className="green-highlight">Professional</span>{" "}
                Shopify Store Review.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-3">
              Asking forums gets your logo roasted by amateurs.
              Hiring a CRO agency costs upwards of{" "}
              <span className="text-white font-normal">$1,200</span>.
            </p>
            <p className="text-lg sm:text-xl text-[#02DFA6] font-normal leading-relaxed">
              Our team will tell you exactly where your funnel is leaking — for
              free.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ReviewHeroForm />
          </div>
        </div>
      </section>

      {/* ─── Pain Point Agitator ─── */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-inter font-normal text-white mb-4">
            Why isn&apos;t your Shopify store getting sales?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12">
            If you&apos;re like most store owners, you&apos;ve spent weeks
            building your site and money on ads, only to see visitors bounce.
            When you search for feedback online, your options usually suck:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((point) => (
              <div
                key={point.label}
                className="group relative rounded-xl border border-white/10 bg-card/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[#02DFA6]/30"
              >
                <div className="card-hover-gradient rounded-xl" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                    <point.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-inter font-normal text-white mb-2">
                    {point.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-[#02DFA6]/20 bg-[#02DFA6]/5 p-6 sm:p-8">
            <p className="text-base sm:text-lg text-white leading-relaxed">
              At <span className="text-[#02DFA6] font-normal">Aurevia</span>,
              our team bridges that gap. We don&apos;t just look at
              aesthetics — we look at{" "}
              <span className="text-white font-normal">friction</span>,{" "}
              <span className="text-white font-normal">trust signals</span>,
              and{" "}
              <span className="text-white font-normal">
                conversion psychology
              </span>
              . And we do it without the agency price tag.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Value Breakdown ─── */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 phlato-gradient pointer-events-none opacity-40" />
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
          <div className="mb-12">
            <p className="text-sm text-[#02DFA6] font-medium tracking-wide uppercase mb-3">
              The $1,200 audit — on us
            </p>
            <h2 className="text-3xl sm:text-4xl font-inter font-normal text-white mb-4">
              What&apos;s included in your free store audit?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Every audit is a comprehensive, multi-section analysis done by
              our team — the same framework CRO consultants use, covering
              everything from first impression to checkout. Here are some of
              the key areas we dig into:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditItems.map((item, i) => (
              <div
                key={item.title}
                className="group relative rounded-xl border border-white/10 bg-card/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-[#02DFA6]/30"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="card-hover-gradient rounded-xl" />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-lg bg-[#02DFA6]/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-[#02DFA6]" />
                  </div>
                  <h3 className="text-lg font-inter font-normal text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mt-8 text-center">
            …plus copywriting, merchandising, competitor research, and more.
            Every audit typically runs <span className="text-white font-normal">15+ pages</span>.
          </p>
        </div>
      </section>

      {/* ─── FAQ / Objection Handlers ─── */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-inter font-normal text-white mb-12">
            Common questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-inter font-normal text-white mb-2">
                Is this actually free? What&apos;s the catch?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, 100% free. We build tools for Shopify merchants and
                when our team audits your store, we sometimes spot places
                where our product could help — but there&apos;s zero
                obligation. The audit stands on its own regardless of
                whether you ever use Aurevia.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-lg font-inter font-normal text-white mb-2">
                How is this different from posting on r/reviewmyshopify?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Reddit feedback is well-intentioned but subjective. You&apos;ll
                get opinions on your color scheme from people who aren&apos;t
                your customers. Our team uses a structured CRO framework that
                looks at data-backed conversion principles — friction points,
                trust psychology, checkout UX, and mobile responsiveness — not
                personal taste.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-lg font-inter font-normal text-white mb-2">
                What do I need to provide?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Just your email and store URL. That&apos;s it. We don&apos;t
                need admin access, analytics passwords, or any sensitive
                information. We review your store as a customer would.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-lg font-inter font-normal text-white mb-2">
                How long does the audit take?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our team typically delivers within 24 hours. You&apos;ll receive
                a comprehensive, multi-section report via email covering
                everything from your homepage to checkout — with specific,
                actionable recommendations you can start implementing the same day.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <h3 className="text-lg font-inter font-normal text-white mb-2">
                My store is brand new — is it too early for an audit?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                It&apos;s actually the best time. Fixing conversion issues
                before you scale your ad spend means every dollar you put
                into traffic works harder. Most store owners wish they&apos;d
                gotten a professional review before burning through their
                first $500 on ads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-[#02DFA6]/[0.08] via-[#089357]/[0.05] to-[#0b3c2f]/[0.1] border border-[#02DFA6]/15 py-16 sm:py-20 px-6 sm:px-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 z-0 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(2,223,166,0.06)_0%,transparent_70%)] pointer-events-none" />
          <CTASwarmParticles />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-dmserif font-normal text-white mb-5 leading-[1.15] tracking-tight">
              Your competitors are optimizing.
              <br />
              <span className="green-highlight">Are you?</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
              Every day without a proper audit is another day of leaking
              revenue. The form takes 10 seconds. The insights last forever.
            </p>
            <a
              href="#review-hero"
              className="cta-button inline-flex items-center justify-center gap-2.5 text-white font-medium px-10 py-4 rounded-xl text-base sm:text-lg transition-all duration-200 shadow-[0_8px_30px_rgba(8,147,87,0.3)]"
            >
              Get my free audit now
              <span className="cta-arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
