/**
 * Device frames for the capability showcase.
 * PhoneFrame: a 375×775 screen scaled into a fixed box, with a storefront
 * header strip so the widget reads as "on your store", not floating.
 * BrowserFrame: dashboard screenshot in a browser chrome, optional phone
 * overlay showing the same page at mobile width.
 */

import type { ReactNode } from "react";

export function PhoneFrame({ children, storeName = "LUCIEN VALLIÈRE" }: { children: ReactNode; storeName?: string }) {
  return (
    <div className="demo-phone" aria-hidden>
      <div className="demo-phone-shell">
        <div className="demo-phone-screen">
          <span className="demo-phone-notch" />
          <div className="demo-store-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <span>{storeName}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8h12l1 13H5L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
          </div>
          <div className="demo-phone-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function BrowserFrame({
  desktop,
  mobile,
  url,
  alt,
  phoneSide = "right",
}: {
  desktop?: string;
  mobile?: string;
  url: string;
  alt: string;
  /** Which bottom corner the phone overlay hangs off; use the inner side so it never overflows the page */
  phoneSide?: "left" | "right";
}) {
  return (
    <div className="demo-browser">
      <div className="demo-browser-bar">
        <div className="demo-browser-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="demo-browser-url">{url}</div>
      </div>
      <div className="demo-browser-body">
        {desktop ? (
          <img src={desktop} alt={alt} loading="lazy" />
        ) : (
          <div className="demo-browser-pending">Screenshot pending</div>
        )}
      </div>
      {mobile ? (
        <div className={`demo-browser-phone ${phoneSide === "left" ? "demo-browser-phone-left" : ""}`} aria-hidden>
          <div className="demo-browser-phone-screen">
            <img src={mobile} alt="" loading="lazy" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
