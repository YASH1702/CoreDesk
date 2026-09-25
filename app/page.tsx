import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AuroraBackground from "@/components/landing/AuroraBackground";
import HeroSection from "@/components/landing/HeroSection";
import IndustrySelectorSection from "@/components/landing/IndustrySelectorSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Providers from "@/components/shared/Providers";
import { getCMSData } from "@/actions/cms";

export const revalidate = 0; // Dynamic server component

export default async function HomePage() {
  const cmsRes = await getCMSData();
  const cmsSettings = cmsRes.data?.cmsSettings;

  return (
    <Providers>
      <div className="min-h-screen bg-[#F8F7F3] text-[#2A2927] relative selection:bg-[#C69A4B] selection:text-white overflow-x-hidden">
        {/* Warm Ambient Lighting Background */}
        <AuroraBackground />

        {/* Header Navigation */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection
          title={cmsSettings?.heroTitle}
          subtitle={cmsSettings?.heroSubtitle}
        />

        {/* Configurable Industry Archetypes */}
        <div id="services">
          <IndustrySelectorSection />
        </div>

        {/* Automated Workflow Engine */}
        <WorkflowSection />

        {/* Transparent Pricing Plans */}
        <PricingSection />

        {/* Customer Reviews & Testimonials */}
        <TestimonialsSection testimonials={cmsRes.data?.testimonials} />

        {/* Frequently Asked Questions */}
        <FAQSection faqs={cmsRes.data?.faqs} />

        {/* Conversion CTA Banner */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </Providers>
  );
}
