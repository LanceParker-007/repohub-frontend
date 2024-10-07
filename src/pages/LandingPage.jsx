import React from "react";
import FlipNavWrapper from "../components/flip-nav.jsx/FlipNav";
import { NeuHero } from "../components/neu-hero/NeuHero";
import { EmailCapture } from "@/components/email-capture/EmailCapture";
import { FeatureToggles } from "@/components/feature-toggles/FeatureToggles";
import { BenefitsGrid } from "@/components/benefits-grid/BenefitsGrid";
import { font } from "@/fonts";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Pricing } from "@/components/pricing/Pricing";
import Footer from "../components/footer/Footer";

const LandingPage = () => {
  return (
    <main className={`${font.className} overflow-hidden`}>
      <FlipNavWrapper>
        <NeuHero />
      </FlipNavWrapper>
      <section
        id="features"
        className="space-y-36 bg-zinc-50 pb-24 pt-24 md:pt-32"
      >
        <FeatureToggles />
        <BenefitsGrid />
        <Pricing />
      </section>
      <EmailCapture />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default LandingPage;
