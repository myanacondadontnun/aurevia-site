import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroWatermark from "@/components/home/HeroWatermark";
import h from "@/components/home/hero.module.css";
import n from "./notFound.module.css";

/**
 * 404, on the home hero's canvas: the headline and the two pill buttons on the left; on the right the agent, as a
 * small glass conversation, answers "where did this page go?" with real pages to try.
 */

const PAGES = [
  { href: "/why-aurevia/", label: "Why Aurevia" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/channels/store/", label: "Channels" },
  { href: "/help/", label: "Documentation" },
  { href: "/resources/blogs/", label: "Blog" },
];

export default function NotFound() {
  return (
    <div className={n.page}>
      <Navbar />
      <main id="main-content">
        <section className={h.hero}>
          <div className={h.grain} aria-hidden="true" />
          <HeroWatermark />
          <div className={`container mx-auto max-w-6xl px-4 sm:px-6 ${h.inner} ${n.inner}`}>
            <div className={h.copy}>
              <p className={`${n.code} ${h.fade}`}>Error 404</p>
              <h1 className={`${h.title} ${h.fade} ${n.title}`}>
                This page doesn&rsquo;t exist.
                <span className={`${h.accentLine} ${h.accent}`}>Let&rsquo;s get you back.</span>
              </h1>
              <p className={`${h.lede} ${h.fade}`} style={{ animationDelay: "120ms" }}>
                It may have moved, or the link has a typo.
              </p>
              <div className={`${h.ctas} ${h.fade}`} style={{ animationDelay: "180ms" }}>
                <Link href="/" className={h.primary}>
                  Back to home <ArrowRight aria-hidden="true" />
                </Link>
                <Link href="/contact/" className={h.secondary}>
                  Talk to us
                </Link>
              </div>
            </div>

            <div className={`${h.demo} ${h.fadeLate}`}>
              <div className={n.chat}>
                <p className={n.me}>Where did this page go?</p>
                <div className={n.agentRow}>
                  <img src="/images/site/mark-ring.webp" alt="" className={n.mark} />
                  <div className={n.agent}>
                    <p>I couldn&rsquo;t find it. These pages are all live:</p>
                    <ul className={n.links}>
                      {PAGES.map((p) => (
                        <li key={p.href}>
                          <Link href={p.href} className={n.link}>
                            {p.label} <ArrowRight aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
