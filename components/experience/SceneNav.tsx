"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SCENES } from "@/constants/motion";

interface SceneNavProps {
  activeScene: number;
  progress: number;
  onSelectScene?: (index: number) => void;
}

export function SceneNav({ activeScene, progress, onSelectScene }: SceneNavProps) {
  const currentScene = SCENES[activeScene] ?? SCENES[0];
  const [hoveredScene, setHoveredScene] = useState<number | null>(null);

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
      {/* Desktop Minimal Vertical Scene Navigator (Non-intrusive luxury rail) */}
      <nav
        aria-label="Scene Navigator"
        className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-[80] hidden md:flex flex-col items-end select-none pointer-events-auto"
      >
        <div className="relative flex flex-col items-center justify-between h-[280px] py-2">
          {/* Vertical Hairline Track */}
          <div className="absolute right-[11px] top-2 bottom-2 w-[1.5px] bg-[#C8C1B4]/70 dark:bg-[#2A2A2A] -z-10 rounded-full" />

          {/* Dark Chocolate Progress Fill */}
          <div
            className="absolute right-[11px] top-2 w-[2px] bg-[#37261A] -z-10 origin-top rounded-full transition-transform duration-75 ease-out"
            style={{
              height: "calc(100% - 16px)",
              transform: `scaleY(${Math.max(0, Math.min(1, progress))})`,
            }}
          />

          {SCENES.map((scene) => {
            const isActive = activeScene === scene.index;
            const isHovered = hoveredScene === scene.index;

            return (
              <div
                key={scene.id}
                className="relative flex items-center justify-end group py-2"
                onMouseEnter={() => setHoveredScene(scene.index)}
                onMouseLeave={() => setHoveredScene(null)}
              >
                {/* Floating Category Pill on Active or Hover */}
                {(isActive || isHovered) && (
                  <div
                    className={`absolute right-8 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap shadow-sm pointer-events-none backdrop-blur-2xl transition-all duration-200 ${
                      isActive
                        ? "bg-[#37261A]/90 text-[#F5F2EB] border-2 border-[#37261A]/60 shadow-[0_4px_12px_rgba(55,38,26,0.35)]"
                        : "bg-[#F5F2EB]/80 dark:bg-[#1E1E1E]/80 text-[#1E1E1E] dark:text-[#F5F2EB] border-2 border-[#37261A]/30 shadow-sm"
                    }`}
                  >
                    {scene.number} · {scene.label}
                  </div>
                )}

                {/* Dot / Pill Button */}
                <button
                  onClick={() => onSelectScene?.(scene.index)}
                  className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 rounded-full backdrop-blur-2xl ${
                    isActive
                      ? "w-6 h-6 bg-[#37261A]/90 text-[#F5F2EB] border-2 border-[#37261A]/70 shadow-[0_2px_8px_rgba(55,38,26,0.4)]"
                      : "w-5 h-5 bg-[#F5F2EB]/75 dark:bg-[#1E1E1E]/75 border-2 border-[#37261A]/25 dark:border-[#3A3A3A]/70 hover:border-[#37261A] hover:scale-110 shadow-xs"
                  }`}
                  aria-label={`Jump to scene ${scene.number} - ${scene.label}`}
                >
                  {isActive ? (
                    <span className="text-[10px] font-mono font-bold">{scene.number}</span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#AAA194] group-hover:bg-[#37261A] transition-colors" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile Floating Scene Navigation Pill (Docked bottom) */}
      <nav
        aria-label="Scene pagination"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] flex md:hidden items-center gap-2 bg-[#F5F2EB]/80 dark:bg-[#1E1E1E]/80 backdrop-blur-2xl border border-[#C8C1B4]/70 dark:border-[#3A3A3A]/70 rounded-full px-3 py-1.5 shadow-[0_10px_30px_rgba(55,38,26,0.12)] select-none"
      >
        <button
          onClick={handlePrev}
          disabled={activeScene === 0}
          aria-label="Previous scene"
          className="w-6 h-6 rounded-full flex items-center justify-center text-[#1E1E1E] dark:text-[#F5F2EB] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#DED9D0] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-1.5 px-1">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => onSelectScene?.(scene.index)}
              aria-label={`Jump to scene ${scene.number}`}
              className={`transition-all duration-300 rounded-full ${
                activeScene === scene.index
                  ? "w-4 h-1.5 bg-[#37261A]"
                  : "w-1.5 h-1.5 bg-[#C8C1B4] dark:bg-[#3A3A3A]"
              }`}
            />
          ))}
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-[#37261A] min-w-[70px] text-center">
          {currentScene.number} {currentScene.label}
        </span>

        <button
          onClick={handleNext}
          disabled={activeScene === SCENES.length - 1}
          aria-label="Next scene"
          className="w-6 h-6 rounded-full flex items-center justify-center text-[#1E1E1E] dark:text-[#F5F2EB] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#DED9D0] dark:hover:bg-[#2A2A2A] transition-colors"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </nav>
    </>
  );
}
