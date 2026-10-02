"use client";

import React from "react";
import { SCENES } from "@/constants/motion";

interface GhostWatermarkNumeralsProps {
  activeScene: number;
}

/**
 * GhostWatermarkNumerals
 * Monumental architectural display numerals drifting in the deep background.
 * Creates monumental spatial depth behind the 3D diorama.
 */
export function GhostWatermarkNumerals({ activeScene }: GhostWatermarkNumeralsProps) {
  const currentScene = SCENES[activeScene] ?? SCENES[0];
  const numeral = currentScene.number ?? `0${activeScene + 1}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden select-none flex items-center justify-center"
    >
      {/* Monumental Architectural Watermark Numeral */}
      <div
        key={numeral}
        className="font-serif font-black text-[36vw] leading-none select-none tracking-tighter text-[#37261A]/[0.038] transition-all duration-700 ease-out will-change-transform translate-y-2 sm:translate-y-0"
        style={{
          fontFeatureSettings: '"tnum" 1',
        }}
      >
        {numeral}
      </div>
    </div>
  );
}

export default GhostWatermarkNumerals;
