"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, TrendingUp, Calendar, Users, ShieldCheck, Activity } from "lucide-react";
import { SCENES } from "@/constants/motion";

export default function BusinessScene() {
  const sceneData = SCENES.find((s) => s.id === "business");

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-16 py-20 relative overflow-hidden">
      {/* Subtle Architectural Grid Hairlines (Editorial Reference) */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 opacity-25">
        <div className="border-r border-[#DDD6C9]/50 h-full" />
        <div className="border-r border-[#DDD6C9]/50 h-full" />
        <div className="border-r border-[#DDD6C9]/50 h-full" />
        <div className="h-full" />
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center z-10 lg:pr-20">
        {/* Left Editorial Typography Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Category Label */}
          <div className="scene-business-label flex items-center gap-3.5 mb-6 sm:mb-8 will-change-transform">
            <div className="w-9 h-[1.5px] bg-[#C69A4B]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-extrabold text-[#C69A4B]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Kinetic Headline with Masked Line Wrappers */}
          <h1 className="scene-business-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2A2927] leading-[1.06] mb-6 sm:mb-8 max-w-2xl">
            <span className="block overflow-hidden pb-1">
              <span className="scene-business-head-line-1 inline-block will-change-transform">
                YOUR BUSINESS,
              </span>
            </span>
            <span className="block overflow-hidden pt-1">
              <span className="scene-business-head-line-2 inline-block will-change-transform">
                <span className="text-[#C69A4B] relative inline-block">
                  BEAUTIFULLY
                </span>{" "}
                CONNECTED.
              </span>
            </span>
          </h1>

          {/* Supporting Editorial Subline */}
          <p className="scene-business-subline text-base sm:text-lg lg:text-xl text-[#5D5A56] max-w-xl mb-6 sm:mb-8 leading-relaxed font-normal will-change-transform">
            {sceneData?.subline}
          </p>

          {/* Editorial Architectural Meta Tags */}
          <div className="scene-business-meta flex items-center gap-4 text-[11px] font-mono tracking-wider uppercase text-[#8B857D] mb-8 sm:mb-10 will-change-transform">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C69A4B]" />
              Deterministic Engine
            </span>
            <span className="text-[#DDD6C9]">·</span>
            <span>Real-Time Sync</span>
            <span className="text-[#DDD6C9]">·</span>
            <span>Zero Bottlenecks</span>
          </div>

          {/* Action CTAs */}
          <div className="scene-business-cta flex flex-wrap items-center gap-4 will-change-transform">
            <Link
              href="/book"
              className="px-8 py-4 rounded-full bg-[#C69A4B] hover:bg-[#B7863D] text-white font-semibold text-sm shadow-[0_8px_25px_rgba(198,154,75,0.28)] transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Explore Live Booking</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-full bg-white/85 hover:bg-white text-[#2A2927] border border-[#DDD6C9] font-semibold text-sm shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#8B857D]" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>

        {/* Right Product UI Composition */}
        <div className="lg:col-span-5 relative w-full" style={{ perspective: 1200 }}>
          <div className="scene-business-panel-wrapper relative will-change-transform">
            {/* Ambient Warm Glow */}
            <div className="scene-business-glow absolute -inset-5 bg-gradient-to-tr from-[#C69A4B]/20 via-[#E8D7B2]/25 to-transparent rounded-[40px] blur-2xl -z-10 will-change-transform" />

            {/* Main Glass Workspace Card */}
            <div className="scene-business-panel bg-[#FFFCF7]/92 backdrop-blur-2xl border border-[#DDD6C9] rounded-[28px] p-6 sm:p-8 shadow-[0_30px_80px_rgba(80,65,45,0.14)] will-change-transform">
              {/* Window Header */}
              <div className="scene-business-card-header flex items-center justify-between pb-5 mb-6 border-b border-[#ECE6D8] will-change-transform">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#C69A4B] to-[#8F6B2F] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#2A2927] tracking-tight">Apex Executive Suite</h3>
                    <p className="text-xs text-[#8B857D] font-medium">Business Operations · Live Sync</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#5C9E6E]/10 border border-[#5C9E6E]/20">
                  <span className="w-2 h-2 rounded-full bg-[#5C9E6E] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#5C9E6E]">Active</span>
                </div>
              </div>

              {/* Primary Metric Panel */}
              <div className="scene-business-metric-primary bg-white rounded-2xl p-5 border border-[#ECE6D8] shadow-sm mb-4 will-change-transform">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#8B857D] uppercase tracking-wider">Today's Revenue</span>
                  <span className="text-[11px] font-bold text-[#5C9E6E] bg-[#5C9E6E]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +24% vs yesterday
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-[#2A2927] tracking-tight">
                  ₹1,24,500<span className="text-lg font-normal text-[#8B857D]">.00</span>
                </div>
              </div>

              {/* Sub Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="scene-business-metric-slot bg-white rounded-2xl p-4 border border-[#ECE6D8] shadow-sm will-change-transform">
                  <div className="flex items-center gap-2 text-[#C69A4B] mb-1.5">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-semibold text-[#8B857D]">Confirmed</span>
                  </div>
                  <div className="text-2xl font-bold text-[#2A2927]">18 <span className="text-xs font-normal text-[#8B857D]">Slots</span></div>
                  <p className="text-[11px] text-[#5C9E6E] mt-1 font-medium">100% capacity</p>
                </div>

                <div className="scene-business-metric-staff bg-white rounded-2xl p-4 border border-[#ECE6D8] shadow-sm will-change-transform">
                  <div className="flex items-center gap-2 text-[#C69A4B] mb-1.5">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-semibold text-[#8B857D]">Staff Online</span>
                  </div>
                  <div className="text-2xl font-bold text-[#2A2927]">8 <span className="text-xs font-normal text-[#8B857D]">Specialists</span></div>
                  <p className="text-[11px] text-[#C69A4B] mt-1 font-medium">All calendars synced</p>
                </div>
              </div>

              {/* Live Status Telemetry Footer */}
              <div className="scene-business-card-footer pt-3 border-t border-[#ECE6D8]/60 flex items-center justify-between text-xs text-[#8B857D] will-change-transform">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#C69A4B]" />
                  <span>Real-time webhook sync</span>
                </span>
                <span className="font-mono text-[11px] text-[#5C9E6E]">0ms lag</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div className="scene-business-scroll absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8B857D] pointer-events-auto select-none z-10 will-change-transform">
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8B857D]">
          Scroll to explore OS
        </span>
        <div className="w-5 h-8 rounded-full border-2 border-[#DDD6C9] flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-[#C69A4B] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
