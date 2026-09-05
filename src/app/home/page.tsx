import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CustomerLogos from "@/components/CustomerLogos";
import FiveWays from "@/components/FiveWays";
import DashboardShowcase from "@/components/DashboardShowcase";
import Industries from "@/components/Industries";
import Stats from "@/components/Stats";
import Challenges from "@/components/Challenges";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import ScrollAnimationsInit from "@/components/ScrollAnimationsInit";

export const metadata: Metadata = {
  alternates: {
    canonical: "/home",
  },
  openGraph: {
    url: "https://aurevia.io/home",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollAnimationsInit />
      <Navbar />
      <main id="main-content" className="home-seasons">
        <Hero />
        <div className="flex flex-wrap items-center justify-center gap-4 py-6 sm:py-8">
          <a href="https://fazier.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=neutral"
              width={120}
              alt="Fazier badge"
            />
          </a>
          <a
            href="https://launchigniter.com/product/aurevia?ref=badge-aurevia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://launchigniter.com/api/badge/aurevia?theme=neutral"
              alt="Featured on LaunchIgniter"
              width={212}
              height={55}
            />
          </a>
        </div>
        <CustomerLogos />
        <FiveWays />
        <Industries />
        <Challenges />
        <Stats />
        <Testimonials />
        <DashboardShowcase />
        <FAQ />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}
