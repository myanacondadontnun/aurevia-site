"use client";

import { useState } from "react";

// The one place on the page that books a call with Ritwik. A three-field lead
// form (name, email, store website) that, once sent, opens Ritwik's Calendly
// inline — embedded right here, prefilled with what they typed — instead of
// bouncing them to calendly.com. The lead is emailed via /pixel-and-code/api/lead
// (same pipeline as the brief form) before the calendar appears, so a booking
// that never completes still lands in the inbox.
const CALENDLY = "https://calendly.com/ritwik-mandal-aurevia/30min";

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

declare global {
  interface Window { pcTrack?: (name: string, params?: Record<string, unknown>) => void; }
}

function normaliseStore(v: string) {
  const s = v.trim();
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
}

export default function FoundersCall() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [store, setStore] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const storeUrl = normaliseStore(store);
    if (!name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim()) || !storeUrl) {
      setError("Add your name, a working email and your store's web address.");
      return;
    }
    setBusy(true);
    try {
      await fetch("/pixel-and-code/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          store: storeUrl,
          project: `Booked a call with Ritwik from the founders section. Store: ${storeUrl}`,
          source: "founders call",
          page: typeof location !== "undefined" ? location.pathname + location.search : "",
        }),
      }).catch(() => null);
    } finally {
      setBusy(false);
    }
    try { window.pcTrack?.("lead_submit", { source: "founders call" }); window.pcTrack?.("book_call"); } catch {}

    const q = new URLSearchParams({
      hide_gdpr_banner: "1",
      embed_type: "Inline",
      embed_domain: typeof location !== "undefined" ? location.hostname : "aurevia.io",
      name: name.trim(),
      email: email.trim(),
      a1: storeUrl,
      background_color: "ffffff",
      text_color: "082b22",
      primary_color: "00cc99",
    });
    setEmbedUrl(`${CALENDLY}?${q.toString()}`);
  }

  if (embedUrl) {
    return (
      <div className="call call--open" id="book">
        <div className="call__head">
          <span className="section__label"><span className="px"></span> Book a call with Ritwik</span>
          <p className="call__lead">Pick a time that suits you, {name.trim().split(" ")[0]}. Thirty minutes, no pitch.</p>
        </div>
        <div className="call__embed">
          <iframe
            src={embedUrl}
            title="Book a 30-minute call with Ritwik"
            loading="eager"
            allow="payment"
          />
        </div>
        <p className="call__alt">
          Calendar not loading? <a href={embedUrl} target="_blank" rel="noopener">Open it in a new tab</a> or email <a href="mailto:sales@aurevia.io">sales@aurevia.io</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="call" id="book" onSubmit={submit} noValidate>
      <div className="call__head">
        <span className="section__label"><span className="px"></span> Book a call with Ritwik</span>
        <p className="call__lead">Thirty minutes with the co-founder who scopes every project. Tell us who you are and where your store lives, and the calendar opens right here.</p>
      </div>
      <div className="call__fields">
        <div className="field">
          <input type="text" id="call-name" placeholder=" " autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label htmlFor="call-name">Your name</label>
        </div>
        <div className="field">
          <input type="email" id="call-email" placeholder=" " autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="call-email">Email address</label>
        </div>
        <div className="field">
          <input type="text" id="call-store" placeholder=" " autoComplete="url" inputMode="url" value={store} onChange={(e) => setStore(e.target.value)} required />
          <label htmlFor="call-store">Store website</label>
        </div>
        <button type="submit" className="btn btn--primary call__btn" disabled={busy}>
          <span>{busy ? "One moment…" : "Book a call with Ritwik"}</span>
          <Arrow />
        </button>
      </div>
      <p className={`call__note${error ? " is-error" : ""}`} aria-live="polite">
        {error || "Free, no obligation. You get a written scope and a fixed number within one business day of the call."}
      </p>
    </form>
  );
}
