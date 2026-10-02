"use client";

import React from "react";

/**
 * ArchitecturalCadGrid
 * Swiss architectural blueprint grid with corner viewfinder brackets,
 * quadrant registration crosshairs (+), and CAD technical datum labels.
 */
export function ArchitecturalCadGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[3] overflow-hidden select-none"
    >
      {/* Viewfinder Corner Brackets framing the viewport */}
      <div className="absolute top-20 left-6 sm:left-10 w-4 h-4 border-t border-l border-[#37261A]/35" />
      <div className="absolute top-20 right-6 sm:right-10 w-4 h-4 border-t border-r border-[#37261A]/35" />
      <div className="absolute bottom-12 left-6 sm:left-10 w-4 h-4 border-b border-l border-[#37261A]/35" />
      <div className="absolute bottom-12 right-6 sm:right-10 w-4 h-4 border-b border-r border-[#37261A]/35" />

      {/* Quadrant Hairline Registration Crosshairs (+) */}
      <div className="hidden md:flex absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-30">
        <div className="w-3 h-px bg-[#37261A]" />
        <div className="h-3 w-px bg-[#37261A] absolute" />
      </div>

      <div className="hidden md:flex absolute right-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-30">
        <div className="w-3 h-px bg-[#37261A]" />
        <div className="h-3 w-px bg-[#37261A] absolute" />
      </div>

      <div className="hidden md:flex absolute left-1/4 bottom-1/3 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-30">
        <div className="w-3 h-px bg-[#37261A]" />
        <div className="h-3 w-px bg-[#37261A] absolute" />
      </div>

      <div className="hidden md:flex absolute right-1/4 bottom-1/3 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-30">
        <div className="w-3 h-px bg-[#37261A]" />
        <div className="h-3 w-px bg-[#37261A] absolute" />
      </div>

      {/* Center Axis Micro Crosshair */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-25">
        <div className="w-4 h-px bg-[#37261A]" />
        <div className="h-4 w-px bg-[#37261A] absolute" />
      </div>

      {/* Subtle Structural Axis Lines */}
      <div className="hidden lg:block absolute left-10 right-10 top-1/2 h-px bg-gradient-to-r from-transparent via-[#37261A]/[0.05] to-transparent -translate-y-1/2" />
      <div className="hidden lg:block absolute top-20 bottom-12 left-1/2 w-px bg-gradient-to-b from-transparent via-[#37261A]/[0.05] to-transparent -translate-x-1/2" />

      {/* Technical CAD Datum Callouts */}
      <div className="hidden xl:flex absolute top-24 left-10 text-[9px] font-mono tracking-[0.25em] uppercase text-[#37261A]/35 items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#37261A]/40" />
        <span>DATUM // 00° 00' 00" REF</span>
      </div>

      <div className="hidden xl:flex absolute top-24 right-12 text-[9px] font-mono tracking-[0.25em] uppercase text-[#37261A]/35 items-center gap-2">
        <span>ISO PROJECTION · 60°</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#37261A]/40" />
      </div>

      <div className="hidden xl:flex absolute bottom-14 left-10 text-[9px] font-mono tracking-[0.25em] uppercase text-[#37261A]/35 items-center gap-2">
        <span>SCALE: 1:1</span>
        <span>·</span>
        <span>GRID MATRIX // 24PX</span>
      </div>

      <div className="hidden xl:flex absolute bottom-14 right-12 text-[9px] font-mono tracking-[0.25em] uppercase text-[#37261A]/35 items-center gap-2">
        <span>SYSTEM KINETICS // ACTIVE</span>
      </div>
    </div>
  );
}

export default ArchitecturalCadGrid;
