"use client";

import { Badge } from "@/components/ui/badge";
import { useDashboardReveal } from "./ScrollAnimations";

export default function DashboardReveal() {
  const dashboardRef = useDashboardReveal();

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 -mt-16 sm:-mt-20">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div
            ref={dashboardRef as React.RefObject<HTMLDivElement>}
            className="dashboard-reveal"
          >
            {/* Clean Dashboard Container */}
            <div className="relative bg-gradient-to-br from-card via-secondary/20 to-accent/20 rounded-xl sm:rounded-2xl shadow-2xl border border-border/20 overflow-hidden">
              <div className="aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] w-full flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="text-center text-muted-foreground w-full h-full">
                  {/* Dashboard Preview Content */}
                  <div className="flex flex-col h-full max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-4 sm:mb-6 md:mb-8">
                      <div className="h-6 sm:h-8 bg-primary/40 rounded w-full mb-2 sm:mb-3"></div>
                      <div className="h-3 sm:h-4 bg-muted rounded w-2/3 mx-auto"></div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-primary/30">
                      <div className="w-full h-full flex items-center justify-center">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://imagekit.io/player/embed/i3gsjfgp9/videos/dashboard-video-1751715147712.mp4?updatedAt=1751928662895&thumbnail=https%3A%2F%2Fik.imagekit.io%2Fi3gsjfgp9%2Fvideos%2Fdashboard-video-1751715147712.mp4%2Fik-thumbnail.jpg%3FupdatedAt%3D1751928662895&updatedAt=1751928662895"
                          title="ImageKit video player"
                          frameBorder="0"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                          allowFullScreen
                          style={{ aspectRatio: '16/9', maxWidth: '100%', borderRadius: '0.75rem', minHeight: '200px', background: 'black' }}
                        ></iframe>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-4 sm:mt-6 md:mt-8 space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="h-3 sm:h-4 md:h-5 bg-muted rounded w-full"></div>
                      <div className="h-3 sm:h-4 md:h-5 bg-muted rounded w-3/4 mx-auto"></div>
                      <div className="h-2 sm:h-3 md:h-4 bg-primary/30 rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2">
                    <p className="text-xs sm:text-sm text-primary font-medium">Aurevia Dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
