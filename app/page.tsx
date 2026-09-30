"use client";

import React, { useState, useCallback } from "react";
import { SceneSection } from "@/components/experience/SceneSection";
import { SCENES } from "@/constants/motion";
import ScrollExperience from "@/components/experience/ScrollExperience";
import { ExperienceNav } from "@/components/experience/ExperienceNav";
import { SceneNav } from "@/components/experience/SceneNav";
import BusinessScene from "@/components/experience/scenes/BusinessScene";
import CustomerScene from "@/components/experience/scenes/CustomerScene";
import { StaffScene } from "@/components/experience/scenes/StaffScene";
import { ControlScene } from "@/components/experience/scenes/ControlScene";
import { SystemScene } from "@/components/experience/scenes/SystemScene";
import { PlatformScene } from "@/components/experience/scenes/PlatformScene";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function HomePage() {
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleSceneChange = useCallback((sceneIndex: number, progress: number) => {
    setActiveScene(sceneIndex);
    setScrollProgress(progress);
  }, []);

  const handleSelectScene = useCallback((index: number) => {
    const st = ScrollTrigger.getById("experience-trigger");
    if (st) {
      // Settled timeline coordinates for Milestone 1 (0: Business, 1: Customer)
      const targetProgress = index === 0 ? 0.0 : 1.0;
      const targetY = st.start + targetProgress * (st.end - st.start);
      gsap.to(window, {
        scrollTo: { y: targetY, autoKill: false },
        duration: 0.8,
        ease: "power2.inOut",
      });
    } else {
      const container = document.getElementById("experience-container");
      if (!container) return;
      const targetProgress = index / 5;
      const targetY = container.offsetTop + targetProgress * (container.offsetHeight - window.innerHeight);
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="relative bg-[#F8F7F3] text-[#2A2927] selection:bg-[#C69A4B] selection:text-white overflow-x-clip">
      {/* Persistent Navigation */}
      <ExperienceNav />
      <SceneNav
        activeScene={activeScene}
        progress={scrollProgress}
        onSelectScene={handleSelectScene}
      />

      {/* Cinematic Pinned Scroll Experience */}
      <ScrollExperience
        activeScene={activeScene}
        onSceneChange={handleSceneChange}
      >
        {/* PAGE 01 — THE BUSINESS */}
        <SceneSection id={SCENES[0].id} index={0}>
          <BusinessScene />
        </SceneSection>

        {/* PAGE 02 — CUSTOMER EXPERIENCE */}
        <SceneSection id={SCENES[1].id} index={1}>
          <CustomerScene />
        </SceneSection>

        {/* PAGE 03 — STAFF OPERATIONS */}
        <SceneSection id={SCENES[2].id} index={2}>
          <StaffScene />
        </SceneSection>

        {/* PAGE 04 — BUSINESS CONTROL */}
        <SceneSection id={SCENES[3].id} index={3}>
          <ControlScene />
        </SceneSection>

        {/* PAGE 05 — THE OPERATING SYSTEM */}
        <SceneSection id={SCENES[4].id} index={4}>
          <SystemScene />
        </SceneSection>

        {/* PAGE 06 — FINAL PLATFORM / CTA */}
        <SceneSection id={SCENES[5].id} index={5}>
          <PlatformScene />
        </SceneSection>
      </ScrollExperience>

      {/* Minimal Editorial Footer */}
      <footer className="py-12 px-6 sm:px-12 bg-[#F8F7F3] border-t border-[#ECE6D8] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold tracking-tight text-[#2A2927]">
              Business<span className="text-[#C69A4B]">Flow</span>
            </span>
            <span className="text-xs text-[#8B857D] font-mono">· OS Platform</span>
          </div>
          <p className="text-xs text-[#8B857D]">
            &copy; {new Date().getFullYear()} BusinessFlow Technologies. Warm Sand & Executive Suite.
          </p>
        </div>
      </footer>
    </div>
  );
}
