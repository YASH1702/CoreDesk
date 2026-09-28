"use client";

import React from "react";
import { SCENES } from "@/constants/motion";

interface SceneNavProps {
  activeScene: number;
  progress: number;
  onSelectScene?: (index: number) => void;
}

export function SceneNav({ activeScene, progress, onSelectScene }: SceneNavProps) {
  return (
    <nav className="fixed right-6 sm:right-10 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col select-none">
      <div className="relative flex flex-col justify-between h-[360px] py-2">
        {/* Track Line */}
        <div className="absolute left-[9px] top-4 bottom-4 w-[1px] bg-[#DDD6C9] dark:bg-[#27314A] -z-10" />

        {/* Progress Line */}
        <div
          className="absolute left-[9px] top-4 w-[1.5px] bg-[#C69A4B] -z-10 origin-top transition-transform duration-100 ease-out"
          style={{
            height: "calc(100% - 32px)",
            transform: `scaleY(${Math.max(0, Math.min(1, progress))})`,
          }}
        />

        {SCENES.map((scene) => {
          const isActive = activeScene === scene.index;
          return (
            <button
              key={scene.id}
              onClick={() => {
                if (onSelectScene) {
                  onSelectScene(scene.index);
                } else {
                  const element = document.querySelector(`[data-scene-id="${scene.id}"]`);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="group flex items-center gap-3.5 text-left py-1 cursor-pointer transition-transform duration-200 hover:translate-x-[-2px]"
              aria-label={`Jump to ${scene.label} (${scene.number})`}
            >
              {/* Category Number Indicator Dot / Badge */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#C69A4B] text-white shadow-[0_2px_8px_rgba(198,154,75,0.4)] scale-110"
                    : "bg-white text-[#8B857D] border border-[#DDD6C9] group-hover:border-[#C69A4B] group-hover:text-[#C69A4B]"
                }`}
              >
                {scene.number}
              </div>

              {/* Category Name Label */}
              <div
                className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? "text-[#C69A4B] opacity-100 translate-x-0"
                    : "text-[#8B857D] opacity-40 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {scene.label}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
