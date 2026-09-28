"use client";

import React from "react";
import { SCENES } from "@/constants/motion";

interface SceneNavProps {
  activeScene: number;
  progress: number;
}

export function SceneNav({ activeScene, progress }: SceneNavProps) {
  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-[90] hidden lg:flex flex-col">
      <div className="relative flex flex-col justify-between h-[400px]">
        {/* Track Line */}
        <div className="absolute left-[9px] top-3 bottom-3 w-[1px] bg-[#8B857D]/30 -z-10" />
        
        {/* Progress Line */}
        <div 
          className="absolute left-[9px] top-3 w-[1px] bg-[#C69A4B] -z-10 origin-top"
          style={{
            height: 'calc(100% - 24px)',
            transform: `scaleY(${Math.max(0, Math.min(1, progress))})`
          }}
        />

        {SCENES.map((scene) => {
          const isActive = activeScene === scene.index;
          return (
            <button
              key={scene.id}
              onClick={() => {
                const element = document.querySelector(`[data-scene-id="${scene.id}"]`);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="group flex items-center gap-4 text-left"
              aria-label={`Scroll to ${scene.label} scene`}
            >
              <div className={`w-[19px] text-[10px] leading-none tracking-widest font-medium transition-colors duration-300 ${
                isActive ? "text-[#C69A4B]" : "text-[#8B857D] group-hover:text-[#8B857D]/80"
              }`}>
                {scene.number}
              </div>
              <div className={`text-[10px] uppercase leading-none tracking-widest transition-all duration-300 whitespace-nowrap ${
                isActive ? "text-[#C69A4B] opacity-100 translate-x-0" : "text-[#8B857D] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}>
                {scene.label}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
