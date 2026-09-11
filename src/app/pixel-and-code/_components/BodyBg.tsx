"use client";

import { useEffect } from "react";

// script.js reads document.body.dataset.bg directly (it's a plain vanilla script,
// not React-aware), so pages that want the "code tokens only, no pixel field"
// background variant need the real <body> tag — owned by the root layout, shared
// across the whole site — to carry data-bg="code" while they're mounted.
// Safe because every /pixel-and-code/* navigation is a full page reload (see
// layout.tsx), so this always runs fresh before script.js's afterInteractive tag.
export default function BodyBg({ mode }: { mode?: "code" }) {
  useEffect(() => {
    if (!mode) return;
    document.body.dataset.bg = mode;
    return () => {
      delete document.body.dataset.bg;
    };
  }, [mode]);

  return null;
}
