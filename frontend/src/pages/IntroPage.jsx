// src/pages/IntroPage.jsx
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import IntroNavbar from "../components/intro/IntroNavbar";
import IntroHero from "../components/intro/IntroHero";
import BenefitsSection from "../components/intro/BenefitsSection";
import FeaturedProducts from "../components/intro/FeaturedProducts";
import ContactSection from "../components/intro/ContactSection";

function IntroPage() {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <CssBaseline />
      <IntroNavbar />
      <IntroHero />
      <BenefitsSection />
      <FeaturedProducts />
      <ContactSection />
    </Box>
  );
}

export default IntroPage;



