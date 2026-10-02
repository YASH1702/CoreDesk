"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { SCENES } from "@/constants/motion";
import { MagneticWrapper } from "@/components/shared/MagneticWrapper";

export function PlatformScene() {
  const sceneData = SCENES.find((s) => s.id === "platform");

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-between px-6 sm:px-10 lg:px-14 xl:px-20 pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-20 lg:pb-8 relative overflow-hidden bg-transparent">
      {/* Decorative Minimal Line */}
      <div className="absolute top-0 right-1/3 w-px h-28 bg-gradient-to-b from-[#37261A]/40 to-transparent pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8 z-10 pointer-events-none">
        {/* Left 3D Spatial Corridor (Strictly clear for the shifted 3D hero characters pointing right) */}
        <div className="hidden lg:block w-full lg:w-[500px] xl:w-[560px] flex-shrink-0 pointer-events-none" />

        {/* Right Flank: Dedicated Live Launch & Admin Access Console Card */}
        <div className="w-full lg:w-[460px] xl:w-[500px] flex flex-col items-start text-left flex-shrink-0 pointer-events-auto">
          {/* Category Label */}
          <div className="scene-platform-label flex items-center gap-3.5 mb-2.5 sm:mb-3 will-change-transform">
            <div className="w-9 h-[1.5px] bg-[#37261A]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-extrabold text-[#37261A]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Kinetic Headline with Masked Line Wrappers */}
          <h2 className="scene-platform-headline text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold tracking-tight text-[#1E1E1E] leading-[1.12] mb-2.5 sm:mb-3">
            <span className="block overflow-hidden pb-1">
              <span className="scene-platform-head-line-1 inline-block will-change-transform">
                MORE THAN A WEBSITE.
              </span>
            </span>
            <span className="block overflow-hidden pt-1">
              <span className="scene-platform-head-line-2 inline-block will-change-transform text-[#37261A]">
                A BUSINESS THAT RUNS.
              </span>
            </span>
          </h2>

          {/* Supporting Subline */}
          <p className="scene-platform-subline text-sm sm:text-base text-[#5D554A] mb-4 sm:mb-5 font-normal leading-relaxed will-change-transform max-w-lg">
            {sceneData?.subline}
          </p>

          {/* Dual Action Live Console Card */}
          <div className="scene-platform-panel-wrapper relative w-full will-change-transform">
            {/* Ambient Dark Chocolate & Marlborough Blue Glow */}
            <div className="scene-platform-glow absolute -inset-5 bg-gradient-to-tr from-[#37261A]/20 via-[#8AA2BA]/18 to-transparent rounded-[36px] blur-2xl -z-10 will-change-transform" />

            <div className="scene-platform-panel scene-platform-cta w-full bg-[#F5F2EB]/94 backdrop-blur-2xl border border-[#C8C1B4] rounded-[24px] p-5 sm:p-6 shadow-[0_25px_60px_rgba(55,38,26,0.12)] flex flex-col gap-3.5 will-change-transform">
              <div className="flex items-center justify-between pb-3 border-b border-[#C8C1B4]/60">
                <span className="text-xs uppercase tracking-wider font-extrabold text-[#37261A]">
                  Live Ecosystem Launch
                </span>
                <span className="text-[10px] font-bold text-[#5C9E6E] bg-[#5C9E6E]/10 backdrop-blur-md border border-[#5C9E6E]/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5C9E6E] animate-pulse" />
                  Live Cloud Deployed
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <MagneticWrapper strength={0.2} radius={40} className="w-full">
                  <Link
                    href="/book"
                    className="w-full px-5 sm:px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#37261A]/90 to-[#493323]/90 hover:from-[#37261A] hover:to-[#493323] backdrop-blur-2xl border-2 border-[#37261A]/70 hover:border-[#37261A] text-[#F5F2EB] font-bold text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_25px_rgba(55,38,26,0.30)] transition-all duration-300 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-[#F5F2EB]" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold">Launch Live Experience</div>
                        <div className="text-[10px] text-[#F5F2EB]/80 font-normal">Customer booking & slot checkout</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </MagneticWrapper>

                <MagneticWrapper strength={0.2} radius={40} className="w-full">
                  <Link
                    href="/login"
                    className="w-full px-5 sm:px-6 py-3 rounded-xl bg-[#FAF8F5]/70 hover:bg-[#FAF8F5]/95 backdrop-blur-2xl text-[#1E1E1E] border-2 border-[#37261A]/35 hover:border-[#37261A] font-semibold text-sm shadow-xs transition-all duration-300 flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#DED9D0]/60 backdrop-blur-md border border-[#C8C1B4] flex items-center justify-center text-[#5D554A] group-hover:text-[#37261A]">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-[#1E1E1E]">Sign In to Admin</div>
                        <div className="text-[10px] text-[#5D554A]">Command center, analytics & team</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#5D554A] group-hover:text-[#37261A] group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticWrapper>
              </div>
            </div>
          </div>

          {/* Bottom Ecosystem Badges */}
          <div className="scene-platform-meta mt-3.5 pt-3 border-t border-[#C8C1B4]/60 w-full flex items-center justify-between text-xs text-[#5D554A] will-change-transform">
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
