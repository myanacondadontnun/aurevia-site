"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, CircleCheck, Info, Lock } from "lucide-react";
import TrustStrip from "@/components/TrustStrip";
import { REVIEW_LOGOS, reviews } from "@/lib/reviews";
import { trackEvent } from "@/lib/analytics";
import b from "./bookDemo.module.css";

/**
 * Book a demo: real merchant reviews on the left, booking on the right, each one screen tall on desktop. The
 * reviews are quoted verbatim from the Shopify App Store listing and rotate one at a time.
 */

/** Ritwik's booking calendar. Name, email and the store domain are prefilled from the form. */
const CALENDLY_URL = "https://calendly.com/ritwik-mandal-aurevia/30min";
const LEAD_ENDPOINT =
  "https://script.google.com/macros/s/AKfycby2Um5z2N6m9X1WzbNACYogzZf60qtXeoMYaZEg0zIKwCyZQ6CL_53HUcAibwzx92fKlw/exec";

/** The bare host from whatever was typed ("https://Shop.com/collections/x" -> "shop.com"), or null if it isn't one. */
function storeHost(input: string): string | null {
  const host = input.trim().toLowerCase().replace(/^https?:\/\//, "").split(/[/?#]/)[0].replace(/\.$/, "");
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host) ? host : null;
}

type StoreCheck =
  | { status: "idle" | "checking" | "unknown" }
  | { status: "found"; host: string; name?: string; myshopify?: string };

/**
 * Is this a Shopify store? Every Shopify storefront serves /meta.json (name, myshopify domain) with
 * access-control-allow-origin: *, so the browser can ask it directly. If that fails (password page, headless
 * front end, network), fall back to DNS over HTTPS: Shopify custom domains point at shops.myshopify.com /
 * 23.227.38.x. Never blocks the form; it only confirms or gently warns.
 */
async function checkShopifyStore(host: string): Promise<StoreCheck> {
  const timeout = (ms: number) => {
    const c = new AbortController();
    window.setTimeout(() => c.abort(), ms);
    return c.signal;
  };
  try {
    const res = await fetch(`https://${host}/meta.json`, { signal: timeout(6000), credentials: "omit" });
    if (res.ok) {
      const meta = await res.json();
      if (meta && typeof meta.myshopify_domain === "string") {
        return { status: "found", host, name: meta.name || undefined, myshopify: meta.myshopify_domain };
      }
    }
  } catch {
    /* CORS, network or timeout: try DNS */
  }
  if (host.endsWith(".myshopify.com")) return { status: "found", host, myshopify: host };
  try {
    const dns = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(host)}&type=A`, {
      headers: { accept: "application/dns-json" },
      signal: timeout(5000),
    });
    const data = await dns.json();
    const answers: string[] = (data?.Answer || []).map((a: { data?: string }) => String(a.data || ""));
    if (answers.some((a) => a.startsWith("shops.myshopify.com") || a.startsWith("23.227.38."))) {
      return { status: "found", host };
    }
  } catch {
    /* fall through */
  }
  return { status: "unknown" };
}

/** Short real reviews (verbatim from the Shopify App Store listing); logos where the site has them. */
const REVIEW_IDS = ["masks-capes", "lotus-beauty", "purebronze", "l1nk", "littleangel"].map((id) => ({ id, logo: REVIEW_LOGOS[id] }));

function Reviews() {
  const items = REVIEW_IDS.map((r) => ({ ...r, review: reviews.find((x) => x.id === r.id) })).filter((r) => r.review);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % items.length), 8000);
    return () => window.clearTimeout(id);
  }, [active, paused, items.length]);

  return (
    <div className={b.reviews} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {items.map(({ id, logo, review }, i) => (
        <figure key={id} className={`${b.review} ${i === active ? b.reviewOn : ""}`} aria-hidden={i !== active}>
          <span className={b.openMark} aria-hidden="true">&ldquo;</span>
          <blockquote className={b.quote}>{review!.quote}</blockquote>
          <figcaption className={b.by}>
            {logo && (
              <span
                className={b.byLogo}
                aria-hidden="true"
                style={{ width: 32 * logo.ratio, WebkitMaskImage: `url(${logo.src})`, maskImage: `url(${logo.src})` }}
              />
            )}
            <span>
              <span className={b.byStore}>{review!.store}</span> · Shopify App Store review
            </span>
          </figcaption>
        </figure>
      ))}
      <div className={b.dots} aria-hidden="true">
        {items.map((r, i) => <span key={r.id} className={`${b.dot} ${i === active ? b.dotOn : ""}`} />)}
      </div>
    </div>
  );
}

export default function BookDemo() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", storeUrl: "" });
  const [store, setStore] = useState<StoreCheck>({ status: "idle" });

  const onStoreBlur = async () => {
    const host = storeHost(form.storeUrl);
    if (!host) return setStore({ status: "idle" });
    if (store.status === "found" && store.host === host) return;
    setStore({ status: "checking" });
    const result = await checkShopifyStore(host);
    // Ignore a late answer for a domain the visitor has since changed.
    setStore((current) => (current.status === "checking" && storeHost(form.storeUrl) === host ? result : current));
  };
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "storeUrl" && store.status !== "idle") setStore({ status: "idle" });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const storeUrl = form.storeUrl.trim().replace(/^https?:\/\//i, "").replace(/\/$/, "");
    const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
    // What the store check found, for the lead sheet and the calendar ("" when unconfirmed).
    const confirmed = store.status === "found" ? store : null;
    const shopifyNote = confirmed
      ? ` Shopify store confirmed${confirmed.name ? `: ${confirmed.name}` : ""}${confirmed.myshopify ? ` (${confirmed.myshopify})` : ""}.`
      : store.status === "unknown"
        ? " Could not confirm it is a Shopify store."
        : "";

    // Record the lead first (fire-and-forget), then hand off to the calendar.
    try {
      const body = new URLSearchParams({
        name: fullName,
        email: form.email.trim(),
        company: storeUrl,
        subject: "Demo request",
        message: `Demo booking started by ${fullName} for ${storeUrl}.${shopifyNote}`,
      });
      void fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        keepalive: true,
      }).catch(() => undefined);
      trackEvent("demo_booking_started", { form_name: "book_demo", company: storeUrl });
    } catch {
      /* never block the booking on analytics or the sheet */
    }

    const calendarStore =
      confirmed?.myshopify && confirmed.myshopify !== storeUrl ? `${storeUrl} (${confirmed.myshopify})` : storeUrl;
    const params = new URLSearchParams({ name: fullName, email: form.email.trim(), a1: calendarStore });
    window.location.href = `${CALENDLY_URL}?${params.toString()}`;
  };

  return (
    <div className={b.page}>
      {/* Close: back to the page they came from on this site, or the home page if they arrived from elsewhere. */}
      <button
        type="button"
        className={b.close}
        aria-label="Close and go back"
        onClick={() => {
          const fromHere = document.referrer.startsWith(window.location.origin);
          if (fromHere && window.history.length > 1) window.history.back();
          else window.location.href = "/";
        }}
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M4 4l12 12M16 4 4 16" />
        </svg>
      </button>
      {/* Left: what merchants say */}
      <aside className={b.aside}>
        <span className={b.ring} aria-hidden="true" />
        <div className={b.topBar}>
          <Link href="/" className={b.brand} aria-label="Aurevia home">
            <img src="/images/aurevia-logo-mark.webp" alt="" />
            <span className={b.brandName}>Aurevia.io</span>
          </Link>
        </div>
        <Reviews />
      </aside>

      {/* Right: the booking */}
      <main className={b.main}>
        <div className={b.panel}>
          <ul className={b.trust}>
            <li className={b.trustItem}><TrustStrip /></li>
            <li className={b.trustItem}><Lock className={b.lock} aria-hidden="true" /> GDPR-ready data handling</li>
          </ul>

          <h1 className={b.title}>
            Book a free <span className={b.accent}>30-minute demo</span>
          </h1>
          <p className={b.lede}>
            See Aurevia running on a store like yours and get your questions answered by the people who built it.
          </p>

          <form onSubmit={onSubmit} className={b.form} aria-label="Book a demo">
            <div className={b.row}>
              <input type="text" name="firstName" value={form.firstName} onChange={onChange} required autoComplete="given-name" placeholder="First name *" aria-label="First name" className={b.input} />
              <input type="text" name="lastName" value={form.lastName} onChange={onChange} required autoComplete="family-name" placeholder="Last name *" aria-label="Last name" className={b.input} />
            </div>
            <div className={b.row}>
              <input type="email" name="email" value={form.email} onChange={onChange} required autoComplete="email" placeholder="Work email *" aria-label="Work email" className={b.input} />
              <input
                type="text"
                name="storeUrl"
                value={form.storeUrl}
                onChange={onChange}
                onBlur={onStoreBlur}
                aria-describedby="store-check"
                required
                inputMode="url"
                pattern="^(https?://)?[A-Za-z0-9.\-]+\.[A-Za-z]{2,}(/.*)?$"
                title="Your store domain, for example yourstore.myshopify.com"
                placeholder="Store URL *"
                aria-label="Store URL"
                className={b.input}
              />
            </div>
            {/* Store check result: confirms a Shopify store, or gently says it couldn't. Never blocks booking. */}
            <p id="store-check" className={b.storeCheck} aria-live="polite">
              {store.status === "checking" && <span className={b.checking}>Checking your store…</span>}
              {store.status === "found" && (
                <span className={b.found}>
                  <CircleCheck aria-hidden="true" />
                  Shopify store found{store.name ? `: ${store.name}` : ""}
                </span>
              )}
              {store.status === "unknown" && (
                <span className={b.unknown}>
                  <Info aria-hidden="true" />
                  We couldn&rsquo;t confirm this is a Shopify store. You can still book.
                </span>
              )}
            </p>
            <p className={b.small}>
              We respect your privacy. By continuing you agree to be contacted about Aurevia, in line with our{" "}
              <Link href="/privacy-policy">privacy policy</Link>.
            </p>
            <button type="submit" disabled={submitting} className={b.submit}>
              <CalendarDays aria-hidden="true" />
              {submitting ? "Opening the calendar…" : "Choose a date and time"}
            </button>
          </form>

          <p className={`${b.small} ${b.after}`}>
            Prefer to try it yourself first?{" "}
            <a href="https://apps.shopify.com/aurevia-io" target="_blank" rel="noopener noreferrer">
              Start the 14-day free trial
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
