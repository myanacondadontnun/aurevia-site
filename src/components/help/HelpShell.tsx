import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HelpSidebar from "./HelpSidebar";
import d from "./docs.module.css";

/** Documentation frame: contents rail, the guide, and an optional "On this page" rail, on paper. */
export default function HelpShell({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className={d.page}>
      <Navbar />
      <main id="main-content" className={d.main}>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className={d.frame}>
            <HelpSidebar />
            <div className={d.body}>{children}</div>
            {aside ?? <div />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
