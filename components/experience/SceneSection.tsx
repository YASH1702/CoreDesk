"use client";

import React from "react";

interface SceneSectionProps {
  id: string;
  index: number;
  className?: string;
  background?: string;
  children: React.ReactNode;
}

/**
 * SceneSection — A simple wrapper for each scene in the cinematic experience.
 * 
 * Provides:
 * - data-scene-id attribute for GSAP ScrollTrigger targeting
 * - Full viewport height
 * - Background gradient
 * - Overflow hidden to prevent element leaks
 * 
 * Animation is handled entirely by the parent ScrollExperience component.
 */
export function SceneSection({
  id,
  index,
  className = "",
  background = "bg-[#F8F7F3]",
  children,
}: SceneSectionProps) {
  return (
    <section
      data-scene-id={id}
      data-scene-index={index}
      className={`relative min-h-screen w-full overflow-hidden ${background} ${className}`}
    >
      {children}
    </section>
  );
}
