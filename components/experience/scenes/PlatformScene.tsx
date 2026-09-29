"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { SCENES } from "@/constants/motion";

export function PlatformScene() {
  const sceneData = SCENES.find((s) => s.id === "platform");

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-20 py-24 relative overflow-hidden text-center bg-transparent">
      {/* Subtle Atmospheric Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#C69A4B]/10 via-[#E8D7B2]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Minimal Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-b from-[#C69A4B]/40 to-transparent" />

      {/* Main Centered Content */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center z-10">
        {/* Category Label */}
        <div className="scene-platform-label flex items-center gap-3 mb-8">
          <div className="w-8 h-[1.5px] bg-[#C69A4B]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#C69A4B]">
            {sceneData?.number} — {sceneData?.label}
          </span>
          <div className="w-8 h-[1.5px] bg-[#C69A4B]" />
        </div>

        {/* Primary Editorial Headline */}
        <h2 className="scene-platform-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2A2927] leading-[1.08] mb-8 max-w-3xl">
          MORE THAN A WEBSITE. <br />
          <span className="text-[#C69A4B]">A BUSINESS THAT RUNS.</span>
        </h2>

        {/* Supporting Subline */}
        <p className="scene-platform-subline text-base sm:text-xl text-[#5D5A56] max-w-2xl mb-12 tracking-wide font-normal leading-relaxed">
          Bookings · Services · Staff · Customers · Payments · Analytics
        </p>

        {/* Dual Primary Actions */}
        <div className="scene-platform-cta flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md">
          <Link
            href="/book"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#C69A4B] hover:bg-[#B7863D] text-white font-semibold text-sm shadow-[0_10px_30px_rgba(198,154,75,0.32)] transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FFF8ED]" />
            <span>Launch Live Experience</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-white hover:bg-[#FDFBF7] text-[#2A2927] border border-[#DDD6C9] font-semibold text-sm shadow-sm hover:border-[#C69A4B] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#8B857D]" />
            <span>Sign In to Admin</span>
          </Link>
        </div>

        {/* Bottom Metadata Badges */}
        <div className="mt-16 pt-8 border-t border-[#ECE6D8] w-full max-w-xl flex items-center justify-between text-xs text-[#8B857D]">
          <span>Production Ready · Next.js 15</span>
          <span>•</span>
          <span>Enterprise Cloud Architecture</span>
          <span>•</span>
          <span>Vercel + Supabase Active</span>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-28 bg-gradient-to-t from-[#C69A4B]/40 to-transparent" />
    </div>
  );
}
