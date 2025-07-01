"use client";

import { useEffect } from "react";

export default function ScrollAnimationsInit() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe all scroll-fade elements
    const scrollElements = document.querySelectorAll(".scroll-fade");
    scrollElements.forEach((el) => observer.observe(el));

    // Badge animation
    const badge = document.querySelector(".pill-badge");
    if (badge) {
      setTimeout(() => {
        badge.classList.add("visible");
      }, 500);
    }

    return () => {
      scrollElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null;
}
