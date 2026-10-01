"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp, Calendar, Users, ShieldCheck, Activity } from "lucide-react";
import { SCENES } from "@/constants/motion";

export default function BusinessScene() {
  const sceneData = SCENES.find((s) => s.id === "business");

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-between px-6 sm:px-10 lg:px-14 xl:px-20 py-20 relative overflow-hidden">
      {/* Subtle Architectural Grid Hairlines (Editorial Reference) */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 opacity-20">
        <div className="border-r border-[#C8C1B4]/50 h-full" />
        <div className="border-r border-[#C8C1B4]/50 h-full" />
        <div className="border-r border-[#C8C1B4]/50 h-full" />
        <div className="h-full" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 z-10 pointer-events-none">
        {/* Left Editorial Typography Column (Strictly bound to left flank, never occluding center 3D) */}
        <div className="w-full lg:w-[420px] xl:w-[460px] flex flex-col items-start text-left flex-shrink-0 pointer-events-auto">
          {/* Category Label */}
          <div className="scene-business-label flex items-center gap-3.5 mb-6 sm:mb-8 will-change-transform">
            <div className="w-9 h-[1.5px] bg-[#37261A]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-extrabold text-[#37261A]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Kinetic Headline with Masked Line Wrappers */}
          <h1 className="scene-business-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#1E1E1E] leading-[1.06] mb-6 sm:mb-8 max-w-xl">
            <span className="block overflow-hidden pb-1">
              <span className="scene-business-head-line-1 inline-block will-change-transform">
                YOUR BUSINESS,
              </span>
            </span>
            <span className="block overflow-hidden pt-1">
              <span className="scene-business-head-line-2 inline-block will-change-transform">
                <span className="text-[#37261A] relative inline-block">
                  BEAUTIFULLY
                </span>{" "}
                CONNECTED.
              </span>
            </span>
          </h1>

          {/* Supporting Editorial Subline */}
          <p className="scene-business-subline text-base sm:text-lg text-[#5D554A] max-w-md mb-6 sm:mb-8 leading-relaxed font-normal will-change-transform">
            {sceneData?.subline}
          </p>

          {/* Editorial Architectural Meta Tags */}
          <div className="scene-business-meta flex items-center gap-3.5 text-[11px] font-mono tracking-wider uppercase text-[#5D554A] mb-8 sm:mb-10 will-change-transform">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#37261A]" />
              Deterministic Engine
            </span>
            <span className="text-[#C8C1B4]">·</span>
            <span>Real-Time Sync</span>
            <span className="text-[#C8C1B4]">·</span>
            <span>Zero Bottlenecks</span>
          </div>

          {/* Action CTAs */}
          <div className="scene-business-cta flex flex-wrap items-center gap-4 will-change-transform">
            <Link
              href="/book"
              className="px-7 py-3.5 rounded-full bg-[#37261A] hover:bg-[#493323] text-[#F5F2EB] font-semibold text-sm shadow-[0_8px_25px_rgba(55,38,26,0.28)] transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Explore Live Booking</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="px-7 py-3.5 rounded-full bg-[#FAF8F5]/85 hover:bg-[#FAF8F5] text-[#1E1E1E] border border-[#C8C1B4] font-semibold text-sm shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#5D554A]" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>

        {/* Center 3D Spatial Stage Clearing (Guarantees 3D diorama stays completely visible & unobstructed) */}
        <div className="hidden lg:block flex-1 min-w-[200px] pointer-events-none" />

        {/* Right Product UI Composition (Strictly bound to right flank) */}
        <div className="w-full lg:w-[360px] xl:w-[390px] relative flex-shrink-0 pointer-events-auto" style={{ perspective: 1200 }}>
          <div className="scene-business-panel-wrapper relative will-change-transform">
            {/* Ambient Dark Chocolate & Marlborough Blue Glow */}
            <div className="scene-business-glow absolute -inset-5 bg-gradient-to-tr from-[#37261A]/20 via-[#8AA2BA]/18 to-transparent rounded-[36px] blur-2xl -z-10 will-change-transform" />

            {/* Main Glass Workspace Card */}
            <div className="scene-business-panel bg-[#F5F2EB]/94 backdrop-blur-2xl border border-[#C8C1B4] rounded-[24px] p-6 shadow-[0_25px_60px_rgba(55,38,26,0.12)] will-change-transform">
              {/* Window Header */}
              <div className="scene-business-card-header flex items-center justify-between pb-4 mb-5 border-b border-[#C8C1B4]/60 will-change-transform">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#37261A] to-[#1E1E1E] text-[#F5F2EB] flex items-center justify-center font-bold text-base shadow-sm">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#1E1E1E] tracking-tight">Apex Executive Suite</h3>
                    <p className="text-[11px] text-[#5D554A] font-medium">Business Operations · Live Sync</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5C9E6E]/10 border border-[#5C9E6E]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5C9E6E] animate-pulse" />
                  <span className="text-[10px] font-bold text-[#5C9E6E]">Active</span>
                </div>
              </div>

              {/* Primary Metric Panel */}
              <div className="scene-business-metric-primary bg-white/95 rounded-xl p-4 border border-[#C8C1B4]/70 shadow-sm mb-3.5 will-change-transform">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-[#5D554A] uppercase tracking-wider">Today's Revenue</span>
                  <span className="text-[10px] font-bold text-[#5C9E6E] bg-[#5C9E6E]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-2.5 h-2.5" /> +24% vs yesterday
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-[#1E1E1E] tracking-tight">
                  ₹1,24,500<span className="text-sm font-normal text-[#5D554A]">.00</span>
                </div>
              </div>

              {/* Sub Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3.5">
                <div className="scene-business-metric-slot bg-white/95 rounded-xl p-3 border border-[#C8C1B4]/70 shadow-sm will-change-transform">
                  <div className="flex items-center gap-1.5 text-[#37261A] mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold text-[#5D554A]">Confirmed</span>
                  </div>
                  <div className="text-xl font-bold text-[#1E1E1E]">18 <span className="text-[10px] font-normal text-[#5D554A]">Slots</span></div>
                  <p className="text-[10px] text-[#5C9E6E] mt-0.5 font-medium">100% capacity</p>
                </div>

                <div className="scene-business-metric-staff bg-white/95 rounded-xl p-3 border border-[#C8C1B4]/70 shadow-sm will-change-transform">
                  <div className="flex items-center gap-1.5 text-[#37261A] mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold text-[#5D554A]">Staff Online</span>
                  </div>
                  <div className="text-xl font-bold text-[#1E1E1E]">8 <span className="text-[10px] font-normal text-[#5D554A]">Specialists</span></div>
                  <p className="text-[10px] text-[#37261A] mt-0.5 font-medium">All calendars synced</p>
                </div>
              </div>

              {/* Live Status Telemetry Footer */}
              <div className="scene-business-card-footer pt-2.5 border-t border-[#C8C1B4]/60 flex items-center justify-between text-[11px] text-[#5D554A] will-change-transform">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#37261A]" />
                  <span>Real-time webhook sync</span>
                </span>
                <span className="font-mono text-[10px] text-[#5C9E6E]">0ms lag</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="scene-business-scroll absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#5D554A] pointer-events-auto select-none z-10 will-change-transform">
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5D554A]">
          Scroll to explore OS
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-[#C8C1B4] flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#37261A] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
