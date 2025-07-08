"use client";

import { useEffect, useRef } from "react";

export function useScrollFade() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useStaggeredScrollFade(delay = 100) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("visible");
              }, index * delay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [delay]);

  return containerRef;
}

export function useDashboardReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let hasTriggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, 300);
            hasTriggered = true;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useVideoIntersection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset video to beginning and play when it comes into view
            video.currentTime = 0;
            video.play().catch((error) => {
              console.log("Video autoplay prevented:", error);
            });
          } else {
            // Pause video when it goes out of view
            video.pause();
          }
        });
      },
      {
        threshold: 0.3, // Play when 30% of the video is visible
        rootMargin: "0px 0px -100px 0px", // Start playing a bit before fully in view
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return videoRef;
}
