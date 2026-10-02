"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { MagneticWrapper } from "./MagneticWrapper";

/**
 * ThemeToggle
 * Architectural Lighting Mode Switcher (Day Khadi vs Espresso Noir).
 * Smoothly toggles between the sunlit Khadi canvas and midnight Espresso Noir.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-24 h-8 rounded-full bg-[#FAF8F5]/50 border border-[#C8C1B4]/60 opacity-0" />
    );
  }

  const isDark = theme === "dark";

  return (
    <MagneticWrapper strength={0.35} radius={30}>
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "Khadi Day" : "Espresso Noir"} mode`}
        className={`px-3 py-1.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest backdrop-blur-2xl transition-all duration-300 flex items-center gap-1.5 cursor-pointer select-none ${
          isDark
            ? "bg-[#251D16]/80 hover:bg-[#37261A] text-[#F5F2EB] border-2 border-[#8AA2BA]/50 shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
            : "bg-[#FAF8F5]/70 hover:bg-[#FAF8F5]/95 text-[#37261A] border-2 border-[#37261A]/35 shadow-sm"
        }`}
      >
        {isDark ? (
          <>
            <Moon className="w-3 h-3 text-[#8AA2BA] animate-pulse" />
            <span>NOIR</span>
          </>
        ) : (
          <>
            <Sun className="w-3 h-3 text-[#37261A]" />
            <span>DAY</span>
          </>
        )}
      </button>
    </MagneticWrapper>
  );
}

export default ThemeToggle;
