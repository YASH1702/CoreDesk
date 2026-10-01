"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { SCENES } from "@/constants/motion";

export function PlatformScene() {
  const sceneData = SCENES.find((s) => s.id === "platform");

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-between px-6 sm:px-10 lg:px-14 xl:px-20 py-20 relative overflow-hidden bg-transparent">
      {/* Subtle Atmospheric Radial Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#C69A4B]/10 via-[#E8D7B2]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Minimal Line */}
      <div className="absolute top-0 right-1/3 w-px h-28 bg-gradient-to-b from-[#C69A4B]/40 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8 z-10 pointer-events-none">
        {/* Left 3D Spatial Corridor (Strictly clear for the shifted 3D hero characters pointing right) */}
        <div className="hidden lg:block w-full lg:w-[500px] xl:w-[560px] flex-shrink-0 pointer-events-none" />

        {/* Right Flank: Dedicated Live Launch & Admin Access Console Card */}
        <div className="w-full lg:w-[460px] xl:w-[520px] flex flex-col items-start text-left flex-shrink-0 pointer-events-auto">
          {/* Category Label */}
          <div className="scene-platform-label flex items-center gap-3.5 mb-6 sm:mb-8 will-change-transform">
            <div className="w-9 h-[1.5px] bg-[#C69A4B]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-extrabold text-[#C69A4B]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Kinetic Headline with Masked Line Wrappers */}
          <h2 className="scene-platform-headline text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#2A2927] leading-[1.08] mb-6">
            <span className="block overflow-hidden pb-1">
              <span className="scene-platform-head-line-1 inline-block will-change-transform">
                MORE THAN A WEBSITE.
              </span>
            </span>
            <span className="block overflow-hidden pt-1">
              <span className="scene-platform-head-line-2 inline-block will-change-transform text-[#C69A4B]">
                A BUSINESS THAT RUNS.
              </span>
            </span>
          </h2>

          {/* Supporting Subline */}
          <p className="scene-platform-subline text-base sm:text-lg text-[#5D5A56] mb-8 font-normal leading-relaxed will-change-transform max-w-lg">
            {sceneData?.subline}
          </p>

          {/* Dual Action Live Console Card */}
          <div className="scene-platform-panel-wrapper relative w-full will-change-transform">
            {/* Ambient Warm Glow */}
            <div className="scene-platform-glow absolute -inset-5 bg-gradient-to-tr from-[#C69A4B]/20 via-[#E8D7B2]/25 to-transparent rounded-[36px] blur-2xl -z-10 will-change-transform" />

            <div className="scene-platform-panel scene-platform-cta w-full bg-[#FFFCF7]/92 backdrop-blur-2xl border border-[#DDD6C9] rounded-[24px] p-6 sm:p-7 shadow-[0_25px_60px_rgba(80,65,45,0.12)] flex flex-col gap-4 will-change-transform">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#ECE6D8]">
                <span className="text-xs uppercase tracking-wider font-extrabold text-[#C69A4B]">
                  Live Ecosystem Launch
                </span>
                <span className="text-[10px] font-bold text-[#5C9E6E] bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                  Live Cloud Deployed
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                <Link
                  href="/book"
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#C69A4B] to-[#B7863D] hover:from-[#B7863D] hover:to-[#9F722D] text-white font-bold text-sm shadow-[0_10px_25px_rgba(198,154,75,0.32)] transition-all duration-300 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#FFF8ED]" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold">Launch Live Experience</div>
                      <div className="text-[10px] text-[#FFF8ED]/80 font-normal">Customer booking & slot checkout</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  href="/login"
                  className="w-full px-6 py-3.5 rounded-xl bg-white hover:bg-[#FDFBF7] text-[#2A2927] border border-[#DDD6C9] hover:border-[#C69A4B] font-semibold text-sm shadow-sm transition-all duration-300 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F8F7F3] border border-[#ECE6D8] flex items-center justify-center text-[#8B857D] group-hover:text-[#C69A4B]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-[#2A2927]">Sign In to Admin</div>
                      <div className="text-[10px] text-[#8B857D]">Command center, analytics & team</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8B857D] group-hover:text-[#C69A4B] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Ecosystem Badges */}
          <div className="scene-platform-meta mt-6 pt-4 border-t border-[#ECE6D8] w-full flex items-center justify-between text-xs text-[#8B857D] will-change-transform">
            <span>Next.js 15 Active</span>
            <span>•</span>
            <span>Enterprise Cloud Architecture</span>
            <span>•</span>
            <span>Zero Configuration</span>
          </div>
        </div>
      </div>
    </div>
  );
}
