"use client";

import { Badge } from "@/components/ui/badge";
import { useDashboardReveal, useVideoIntersection } from "./ScrollAnimations";

export default function DashboardReveal() {
  const dashboardRef = useDashboardReveal();
  const videoRef = useVideoIntersection();

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 -mt-16 sm:-mt-20">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div
            ref={dashboardRef as React.RefObject<HTMLDivElement>}
            className="dashboard-reveal"
          >
            {/* Dashboard Reveal Video Container */}
            <div className="relative bg-gradient-to-br from-card via-secondary/20 to-accent/20 rounded-xl sm:rounded-2xl shadow-2xl border border-border/20 overflow-hidden">
              <div className="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] w-full">
                {/* Dashboard Reveal Demo Video */}
                <video
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  controls={false}
                  webkit-playsinline="true"
                  x-webkit-airplay="allow"
                  style={{ 
                    borderRadius: '12px',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <source src="/videos/dashboard-reveal(1)-1751928464634.webm" type="video/webm" />
                  <source src="/videos/dashboard-reveal(1)-1751928464634_compressed.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2">
                <p className="text-xs sm:text-sm text-primary font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
