"use client";

import React from "react";

interface SceneSectionProps {
  id: string;
  index: number;
  className?: string;
  background?: string;
  children: React.ReactNode;
}

export function SceneSection({
  id,
  index,
  className = "",
  background = "bg-[#F8F7F3]",
  children,
}: SceneSectionProps) {
  return (
    <div
      data-scene-id={id}
      data-scene-index={index}
      className={`w-full h-full min-h-screen flex items-center justify-center relative overflow-hidden ${background} ${className}`}
    >
      {children}
    </div>
  );
}
