import type { ReactNode } from "react";
import PageLayout from "@/components/PageLayout";
import HelpSidebar from "./HelpSidebar";

/** Three-column docs frame: contents rail, document, optional on-this-page rail. */
export default function HelpShell({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <PageLayout>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_200px] lg:gap-10 xl:gap-12">
          <HelpSidebar />
          <div className="min-w-0">{children}</div>
          {aside ? <div className="min-w-0">{aside}</div> : <div className="hidden xl:block" />}
        </div>
      </div>
    </PageLayout>
  );
}
