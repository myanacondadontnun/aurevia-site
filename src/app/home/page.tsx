import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FiveWays from "@/components/FiveWays";
import BetaTester from "@/components/BetaTester";
import FourSteps from "@/components/FourSteps";
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
      <main>
        <Hero />
        <FiveWays />
        <FourSteps />
        <Industries />
        <Challenges />
        <Stats />
        <Testimonials />
        <BetaTester />
        <FAQ />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}
