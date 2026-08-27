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
