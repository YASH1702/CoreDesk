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

export default function HomePage() {
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleSceneChange = useCallback((sceneIndex: number, progress: number) => {
    setActiveScene(sceneIndex);
    setScrollProgress(progress);
  }, []);

  const handleSelectScene = useCallback((index: number) => {
    setActiveScene(index);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#F8F7F3] text-[#2A2927] selection:bg-[#C69A4B] selection:text-white">
      {/* Persistent Navigation */}
      <ExperienceNav />
      <SceneNav
        activeScene={activeScene}
        progress={scrollProgress}
        onSelectScene={handleSelectScene}
      />

      {/* Cinematic Stepped Operating System Stage Across All 6 Scenes */}
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
    </div>
  );
}
