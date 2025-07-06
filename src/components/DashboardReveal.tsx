"use client";

import { Badge } from "@/components/ui/badge";
import { useDashboardReveal } from "./ScrollAnimations";

export default function DashboardReveal() {
  const dashboardRef = useDashboardReveal();

  return (
    <section className="py-8 px-6 -mt-20">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <div
            ref={dashboardRef as React.RefObject<HTMLDivElement>}
            className="dashboard-reveal"
          >
            {/* Clean Dashboard Container */}
            <div className="relative bg-gradient-to-br from-card via-secondary/20 to-accent/20 rounded-2xl shadow-2xl border border-border/20 overflow-hidden">
              <div className="aspect-[16/9] w-full flex items-center justify-center p-8">
                <div className="text-center text-muted-foreground w-full h-full">
                  {/* Dashboard Preview Content */}
                  <div className="flex flex-col h-full max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                      <div className="h-8 bg-primary/40 rounded w-full mb-3"></div>
                      <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center border border-primary/30">
                      <div className="text-2xl text-primary font-medium">Dashboard Content Area</div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-8 space-y-4">
                      <div className="h-5 bg-muted rounded w-full"></div>
                      <div className="h-5 bg-muted rounded w-3/4 mx-auto"></div>
                      <div className="h-4 bg-primary/30 rounded w-1/2 mx-auto"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <p className="text-sm text-primary font-medium">Aurevia Dashboard</p>
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
