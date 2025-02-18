//src/pages/LandingPage.tsx

import React from "react";
import { Helmet } from "react-helmet";
import CustomNavbar from "../components/LandingPageComponents/Navbar";
import HeroSection from "../components/LandingPageComponents/HeroSection";
import FeaturesSection from "../components/LandingPageComponents/FeaturesSection";
import TestimonialsSection from "../components/LandingPageComponents/TestimonialsSection";
import AboutSection from "../components/LandingPageComponents/AboutSection";
import Footer from "../components/LandingPageComponents/Footer";

const LandingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>TaskTogether - Elevate Your Project Management</title>
      </Helmet>
      <CustomNavbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <AboutSection />
      <Footer />
    </>
  );
};

export default LandingPage;
