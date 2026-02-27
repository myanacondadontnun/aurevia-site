"use client";

import { useEffect } from "react";

function startCtaShineLoop() {
  let running = true;

  function scheduleNext() {
    if (!running) return;
    const delay = 2000 + Math.random() * 4000;
    setTimeout(() => {
      if (!running) return;
      const buttons = document.querySelectorAll<HTMLElement>('.cta-button');
      if (buttons.length === 0) { scheduleNext(); return; }
      const btn = buttons[Math.floor(Math.random() * buttons.length)];
      btn.classList.add('shine');
      btn.addEventListener('animationend', function handler() {
        btn.removeEventListener('animationend', handler);
        btn.classList.remove('shine');
        scheduleNext();
      }, { once: true });
    }, delay);
  }

  scheduleNext();
  return () => { running = false; };
}

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.className = "antialiased";
  }, []);

  useEffect(() => {
    return startCtaShineLoop();
  }, []);

  return (
    <div className="antialiased">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {children}
    </div>
  );
}
