import React from "react";
import FlipNavWrapper from "../components/flip-nav.jsx/FlipNav";
import { NeuHero } from "../components/neu-hero/NeuHero";
import { EmailCapture } from "@/components/email-capture/EmailCapture";
import { FeatureToggles } from "@/components/feature-toggles/FeatureToggles";
import { Supports } from "@/components/supports/Supports";
import { Stats } from "@/components/stats/Stats";
import { BenefitsGrid } from "@/components/benefits-grid/BenefitsGrid";
import { font } from "@/fonts";
import { BlogCarousel } from "@/components/blog/BlogCarousel";
import { FinalCTA } from "@/components/final-cta/FinalCTA";
import { Pricing } from "@/components/pricing/Pricing";
import Footer from "../components/footer/Footer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { setRepoHubAccessToken } from "../redux/slices/userSlice";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const repo_hub_access_token = Cookies.get("repo_hub_access_token");
    console.log(repo_hub_access_token);

    if (repo_hub_access_token) {
      dispatch(setRepoHubAccessToken(repo_hub_access_token));
      navigate("/home");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <main className={`${font.className} overflow-hidden`}>
      <FlipNavWrapper>
        <NeuHero />
      </FlipNavWrapper>

      <div className="space-y-36 bg-zinc-50 pb-24 pt-24 md:pt-32">
        <FeatureToggles />
        <Stats />
        <Supports />
        <BenefitsGrid />
        <Pricing />
        <BlogCarousel />
      </div>
      <EmailCapture />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default LandingPage;
