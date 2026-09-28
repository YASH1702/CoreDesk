"use client";

import React, { useState } from "react";
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

/* Scene background gradients mapped to scene IDs */
const SCENE_BACKGROUNDS: Record<string, string> = {
  business: "bg-gradient-to-br from-[#F8F7F3] via-[#F2EFE6] to-[#ECE6D8]",
  customer: "bg-gradient-to-br from-[#FFFCF7] via-[#FFF8ED] to-[#F2EFE6]",
  staff: "bg-gradient-to-br from-[#F2EFE6] via-[#ECE6D8] to-[#E8D7B2]",
  control: "bg-gradient-to-br from-[#ECE6D8] via-[#E8D7B2] to-[#D9C7A0]",
  system: "bg-gradient-to-br from-[#F8F7F3] via-[#ECE6D8] to-[#E8D7B2]",
  platform: "bg-gradient-to-b from-[#F8F7F3] to-[#FFFCF7]",
};

export default function HomePage() {
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <div className="relative bg-[#F8F7F3] text-[#2A2927] selection:bg-[#C69A4B] selection:text-white">
      {/* Persistent Navigation */}
      <ExperienceNav />
      <SceneNav activeScene={activeScene} progress={scrollProgress} />

      {/* Cinematic Scroll Experience */}
      <ScrollExperience>
        {/* PAGE 01 — THE BUSINESS */}
        <SceneSection
          id={SCENES[0].id}
          index={0}
          background={SCENE_BACKGROUNDS.business}
        >
          <BusinessScene />
        </SceneSection>

        {/* PAGE 02 — CUSTOMER EXPERIENCE */}
        <SceneSection
          id={SCENES[1].id}
          index={1}
          background={SCENE_BACKGROUNDS.customer}
        >
          <CustomerScene />
        </SceneSection>

        {/* PAGE 03 — STAFF OPERATIONS */}
        <SceneSection
          id={SCENES[2].id}
          index={2}
          background={SCENE_BACKGROUNDS.staff}
        >
          <StaffScene />
        </SceneSection>

        {/* PAGE 04 — BUSINESS CONTROL */}
        <SceneSection
          id={SCENES[3].id}
          index={3}
          background={SCENE_BACKGROUNDS.control}
        >
          <ControlScene />
        </SceneSection>

        {/* PAGE 05 — THE OPERATING SYSTEM */}
        <SceneSection
          id={SCENES[4].id}
          index={4}
          background={SCENE_BACKGROUNDS.system}
        >
          <SystemScene />
        </SceneSection>

        {/* PAGE 06 — FINAL PLATFORM / CTA */}
        <SceneSection
          id={SCENES[5].id}
          index={5}
          background={SCENE_BACKGROUNDS.platform}
        >
          <PlatformScene />
        </SceneSection>
      </ScrollExperience>

      {/* Minimal Footer */}
      <footer className="py-12 px-8 bg-[#F8F7F3] border-t border-[#ECE6D8]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs uppercase text-[#8B857D] tracking-widest font-bold">
            BusinessFlow
          </p>
          <p className="text-xs text-[#B8B2A8]">
            &copy; {new Date().getFullYear()} BusinessFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
