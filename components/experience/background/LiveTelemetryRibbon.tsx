"use client";

import React, { useEffect, useState } from "react";
import { SCENES } from "@/constants/motion";

interface LiveTelemetryRibbonProps {
  activeScene: number;
}

/**
 * LiveTelemetryRibbon
 * Architectural viewport-bottom telemetry strip showing real-time UTC clock,
 * live mouse coordinates, and system synchronization health status.
 */
export function LiveTelemetryRibbon({ activeScene }: LiveTelemetryRibbonProps) {
  const [utcTime, setUtcTime] = useState("");
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const currentScene = SCENES[activeScene] ?? SCENES[0];

  useEffect(() => {
    // Live ticking UTC clock
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Live mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      aria-label="System Telemetry"
      className="fixed bottom-0 left-0 right-0 h-7 z-[60] px-4 sm:px-8 lg:px-12 flex items-center justify-between bg-[#DED9D0]/70 dark:bg-[#18120D]/85 backdrop-blur-xl border-t border-[#C8C1B4]/50 dark:border-[#37261A]/80 select-none text-[9px] sm:text-[10px] font-mono tracking-wider text-[#5D554A] dark:text-[#AAA194] pointer-events-none transition-colors duration-500"
    >
      {/* Left: Engine Health Status */}
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5C9E6E] animate-pulse" />
        <span className="font-bold text-[#37261A] dark:text-[#F5F2EB]">CORE ENGINE</span>
        <span className="hidden md:inline text-[#AAA194]">·</span>
        <span className="hidden md:inline">POSTGRESQL SYNCHRONIZED (0ms)</span>
      </div>

      {/* Center: Active Scene Category Telemetry */}
      <div className="hidden sm:flex items-center gap-2 text-[#37261A] dark:text-[#8AA2BA] font-semibold">
        <span>COREDESK OS v2.0</span>
        <span className="text-[#AAA194]">/</span>
        <span className="uppercase">{currentScene.number} {currentScene.label}</span>
      </div>

      {/* Right: Live Mouse Coordinates + Live Clock */}
      <div className="flex items-center gap-3 sm:gap-4 font-mono">
        <div className="hidden lg:flex items-center gap-1.5 text-[#5D554A] dark:text-[#AAA194]">
          <span>X:</span>
          <span className="text-[#1E1E1E] dark:text-[#F5F2EB] font-bold w-7 text-right">{mouseCoords.x}</span>
          <span>Y:</span>
          <span className="text-[#1E1E1E] dark:text-[#F5F2EB] font-bold w-7 text-right">{mouseCoords.y}</span>
        </div>
        <span className="hidden sm:inline text-[#AAA194]">·</span>
        <span className="font-bold text-[#1E1E1E] dark:text-[#F5F2EB] tabular-nums">{utcTime || "00:00:00 UTC"}</span>
      </div>
    </div>
  );
}

export default LiveTelemetryRibbon;
