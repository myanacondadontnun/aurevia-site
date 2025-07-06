"use client";

import { Badge } from "@/components/ui/badge";
import { useDashboardReveal } from "./ScrollAnimations";

export default function DashboardReveal() {
  const dashboardRef = useDashboardReveal();

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div
            ref={dashboardRef as React.RefObject<HTMLDivElement>}
            className="dashboard-reveal"
          >
            {/* Laptop Frame */}
            <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-xl p-4 shadow-2xl">
              {/* Laptop Screen Bezel */}
              <div className="bg-black rounded-lg p-3">
                {/* Dashboard Content */}
                <div className="aspect-[16/10] bg-gradient-to-br from-card via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center border border-border/20">
                  <div className="text-center text-muted-foreground">
                    {/* Dashboard Preview */}
                    <div className="grid grid-cols-3 gap-4 p-8">
                      {/* Left Panel */}
                      <div className="space-y-3">
                        <div className="h-4 bg-primary/30 rounded w-full"></div>
                        <div className="h-2 bg-muted rounded w-3/4"></div>
                        <div className="h-2 bg-muted rounded w-1/2"></div>
                        <div className="space-y-2 mt-4">
                          <div className="h-8 bg-primary/20 rounded"></div>
                          <div className="h-8 bg-secondary/30 rounded"></div>
                          <div className="h-8 bg-secondary/30 rounded"></div>
                        </div>
                      </div>

                      {/* Center Panel */}
                      <div className="space-y-3">
                        <div className="h-6 bg-primary/40 rounded w-full"></div>
                        <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 rounded flex items-center justify-center">
                          <div className="text-xs text-primary">Chat Interface</div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded w-full"></div>
                          <div className="h-3 bg-muted rounded w-2/3"></div>
                        </div>
                      </div>

                      {/* Right Panel */}
                      <div className="space-y-3">
                        <div className="h-4 bg-accent rounded w-full"></div>
                        <div className="space-y-2">
                          <div className="h-12 bg-primary/10 rounded border border-primary/20"></div>
                          <div className="h-12 bg-secondary/20 rounded"></div>
                          <div className="h-12 bg-secondary/20 rounded"></div>
                        </div>
                        <div className="h-3 bg-primary/30 rounded w-1/2 mt-4"></div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <p className="text-xs text-primary font-medium">Aurevia Dashboard Preview</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Base */}
              <div className="h-6 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-xl -mx-4 -mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
