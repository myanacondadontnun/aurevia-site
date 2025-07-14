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

    // Add mobile-friendly attributes
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x-webkit-airplay', 'allow');
    
    // Create play button overlay for mobile fallback
    const createPlayButton = () => {
      const playButton = document.createElement('div');
      playButton.innerHTML = `
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          backdrop-filter: blur(4px);
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V19L19 12L8 5Z" fill="white"/>
          </svg>
        </div>
      `;
      
      playButton.onclick = () => {
        video.currentTime = 0;
        video.play();
        playButton.remove();
      };
      
      if (video.parentElement) {
        video.parentElement.style.position = 'relative';
        video.parentElement.appendChild(playButton);
      }
      
      return playButton;
    };
    
    // Mobile-optimized intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset video to beginning and attempt to play
            video.currentTime = 0;
            
            // For mobile compatibility, try multiple play strategies
            const playVideo = async () => {
              try {
                await video.play();
              } catch {
                // Video autoplay prevented, showing play button
                
                // Show play button overlay for mobile
                createPlayButton();
              }
            };
            
            playVideo();
          } else {
            // Pause video when it goes out of view
            video.pause();
            // Remove any existing play buttons
            const playButtons = video.parentElement?.querySelectorAll('div[style*="position: absolute"]');
            playButtons?.forEach(btn => btn.remove());
          }
        });
      },
      {
        threshold: [0.1, 0.25], // Lower threshold for mobile, multiple thresholds for better detection
        rootMargin: "0px 0px -50px 0px", // More conservative margin for mobile
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return videoRef;
}
