"use client";

import React from "react";

/**
 * TopographicContourWaves
 * Faint mathematical elevation contour curves inspired by Swiss watch guilloché
 * and cartographic contours. Provides fluid organic depth behind the stage.
 */
export function TopographicContourWaves() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden select-none"
    >
      <svg
        className="w-full h-full object-cover opacity-100"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Harmonic Topographic Wave Contours */}
        <path
          d="M-100 220 C 300 120, 600 320, 1000 180 C 1250 80, 1400 240, 1600 190"
          stroke="#37261A"
          strokeWidth="1.2"
          strokeOpacity="0.035"
        />
        <path
          d="M-100 280 C 280 190, 620 380, 980 240 C 1220 150, 1380 300, 1600 250"
          stroke="#37261A"
          strokeWidth="1.2"
          strokeOpacity="0.032"
        />
        <path
          d="M-100 340 C 260 260, 640 440, 960 300 C 1200 210, 1360 360, 1600 310"
          stroke="#37261A"
          strokeWidth="1.2"
          strokeOpacity="0.030"
        />
        <path
          d="M-100 520 C 250 640, 650 420, 1020 590 C 1240 680, 1420 510, 1600 580"
          stroke="#37261A"
          strokeWidth="1.2"
          strokeOpacity="0.028"
        />
        <path
          d="M-100 580 C 270 700, 630 480, 1000 650 C 1220 740, 1400 570, 1600 640"
          stroke="#37261A"
          strokeWidth="1.2"
          strokeOpacity="0.032"
        />
        <path
          d="M-100 640 C 290 760, 610 540, 980 710 C 1200 800, 1380 630, 1600 700"
          stroke="#37261A"
          strokeWidth="1.2"
          strokeOpacity="0.035"
        />

        {/* Diagonal Geometric Rays */}
        <line
          x1="0"
          y1="900"
          x2="900"
          y2="0"
          stroke="#37261A"
          strokeWidth="0.8"
          strokeOpacity="0.022"
          strokeDasharray="4 8"
        />
        <line
          x1="540"
          y1="900"
          x2="1440"
          y2="0"
          stroke="#37261A"
          strokeWidth="0.8"
          strokeOpacity="0.022"
          strokeDasharray="4 8"
        />
      </svg>
    </div>
  );
}

export default TopographicContourWaves;
