import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DashboardReveal from "@/components/DashboardReveal";
import FiveWays from "@/components/FiveWays";
import BetaTester from "@/components/BetaTester";
import FourSteps from "@/components/FourSteps";
import Industries from "@/components/Industries";
import Stats from "@/components/Stats";
import Challenges from "@/components/Challenges";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import ScrollAnimationsInit from "@/components/ScrollAnimationsInit";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollAnimationsInit />
      <Navbar />
      <main>
        <Hero />
        <DashboardReveal />
        <FiveWays />
        <BetaTester />
        <FourSteps />
        <Industries />
        <Stats />
        <Challenges />
        <Pricing />
        <FAQ />
        <ContactUs />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
