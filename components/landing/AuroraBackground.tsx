"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Warm White / Dark Gold Ambient Orb */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.1, 0.15, 0.1],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[950px] h-[500px] bg-gradient-to-tr from-[#FFF6E7] via-[#F2DFC0] to-[#E6C98F] dark:from-[#C69A4B]/20 dark:via-[#B7863D]/15 dark:to-[#8F6B2F]/20 rounded-full blur-[140px]"
      />

      {/* Side Soft Champagne Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 -left-40 w-[550px] h-[550px] bg-[#F2DFC0] dark:bg-[#C69A4B]/10 rounded-full blur-[160px]"
      />

      {/* Side Soft Gold Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 -right-40 w-[550px] h-[550px] bg-[#E6C98F] dark:bg-[#8F6B2F]/10 rounded-full blur-[170px]"
      />

      {/* Elegant Radial Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,199,160,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(198,154,75,0.15),rgba(0,0,0,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#DDD6C915_1px,transparent_1px),linear-gradient(to_bottom,#DDD6C915_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#27314A25_1px,transparent_1px),linear-gradient(to_bottom,#27314A25_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
