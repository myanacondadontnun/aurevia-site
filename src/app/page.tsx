import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import CustomerLogos from "@/components/CustomerLogos";
import Channels from "@/components/Channels";
import Footer from "@/components/Footer";
import ScrollAnimationsInit from "@/components/ScrollAnimationsInit";
import HomeHero from "@/components/home/HomeHero";
import { sitePhoto } from "@/lib/sitePhoto";
import Scenarios from "@/components/home/Scenarios";
import PainPoints from "@/components/home/PainPoints";
import ReviewsShowcase from "@/components/home/ReviewsShowcase";
import Platforms from "@/components/home/Platforms";
import AskAureviaShowcase from "@/components/home/AskAureviaShowcase";
import { SCENARIO_PHOTO_NAMES, type ScenarioPhotos } from "@/components/home/scenarioPhotoNames";
import SetupSteps from "@/components/home/SetupSteps";
import {
  FinalCTA,
  HomeFAQ,
} from "@/components/home/HomeSections";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "https://aurevia.io/",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollAnimationsInit />
      <Navbar />
      <main id="main-content">
        <HomeHero photos={{ dress: sitePhoto("fashion-linen-dress"), silk: sitePhoto("fashion-silk-dress") }} />
        <CustomerLogos />
        <Scenarios
          photos={Object.fromEntries(SCENARIO_PHOTO_NAMES.map((name) => [name, sitePhoto(name)])) as ScenarioPhotos}
        />
        <Channels />
        <PainPoints />
        <ReviewsShowcase />
        <AskAureviaShowcase />
        <SetupSteps />
        <Platforms />
        <HomeFAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
