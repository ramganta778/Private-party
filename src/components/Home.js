import React from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";
import OccasionCards from "./OccasionCards";
import ServicesSection from "./ServicesSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";

function Home() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Occasion Cards Section */}
      <OccasionCards />

      <ServicesSection />

      <TestimonialsSection />

      <ContactSection />
    </div>
  );
}

export default Home;
