"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SCENES } from "@/constants/motion";

interface SceneNavProps {
  activeScene: number;
  progress: number;
  onSelectScene?: (index: number) => void;
}

export function SceneNav({ activeScene, progress, onSelectScene }: SceneNavProps) {
  const currentScene = SCENES[activeScene] ?? SCENES[0];

  const handlePrev = () => {
    if (activeScene > 0 && onSelectScene) {
      onSelectScene(activeScene - 1);
    }
  };

  const handleNext = () => {
    if (activeScene < SCENES.length - 1 && onSelectScene) {
      onSelectScene(activeScene + 1);
    }
  };

  return (
    <>
      {/* Desktop Vertical Scene Navigator */}
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

      {/* Mobile Floating Scene Navigation Pill */}
      <nav
        aria-label="Scene pagination"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] flex md:hidden items-center gap-2 bg-[#FFFCF7]/95 backdrop-blur-xl border border-[#DDD6C9] rounded-full px-3.5 py-2 shadow-[0_10px_30px_rgba(80,65,45,0.12)] select-none"
      >
        <button
          onClick={handlePrev}
          disabled={activeScene === 0}
          aria-label="Previous scene"
          className="w-7 h-7 rounded-full flex items-center justify-center text-[#2A2927] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F2EFE6] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 px-1.5">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSelectScene?.(scene.index)}
              aria-label={`Jump to scene ${scene.number}`}
              className={`transition-all duration-300 rounded-full ${
                activeScene === scene.index
                  ? "w-5 h-2 bg-[#C69A4B]"
                  : "w-2 h-2 bg-[#DDD6C9] hover:bg-[#C69A4B]/60"
              }`}
            />
          ))}
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-[#C69A4B] min-w-[70px] text-center">
          {currentScene.number} {currentScene.label}
        </span>

        <button
          onClick={handleNext}
          disabled={activeScene === SCENES.length - 1}
          aria-label="Next scene"
          className="w-7 h-7 rounded-full flex items-center justify-center text-[#2A2927] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F2EFE6] transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </>
  );
}
