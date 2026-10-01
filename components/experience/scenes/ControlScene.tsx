"use client";

import React from "react";
import Link from "next/link";
import { Calendar, TrendingUp, Users, Star, ArrowRight, ShieldCheck } from "lucide-react";
import { SCENES } from "@/constants/motion";

export function ControlScene() {
  const sceneData = SCENES.find((s) => s.id === "control");

  const metrics = [
    { label: "Total Bookings", value: "248", icon: Calendar, change: "+18%", color: "text-[#C69A4B] bg-[#FFF8ED]" },
    { label: "Total Revenue", value: "₹1,24,500", icon: TrendingUp, change: "+32%", color: "text-[#5C9E6E] bg-[#F0FDF4]" },
    { label: "New Customers", value: "86", icon: Users, change: "+14%", color: "text-[#2563EB] bg-[#EFF6FF]" },
    { label: "Verified Rating", value: "4.8", icon: Star, change: "★ 98 rev", color: "text-[#D89A2B] bg-[#FEFCE8]" },
  ];

  const days = [
    { day: "Mon", height: "45%" },
    { day: "Tue", height: "65%" },
    { day: "Wed", height: "40%" },
    { day: "Thu", height: "85%" },
    { day: "Fri", height: "60%" },
    { day: "Sat", height: "95%" },
    { day: "Sun", height: "75%" },
  ];

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-between px-6 sm:px-10 lg:px-14 xl:px-20 py-20 relative overflow-hidden">
      {/* Subtle Architectural Grid Hairlines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 opacity-20">
        <div className="border-r border-[#DDD6C9]/50 h-full" />
        <div className="border-r border-[#DDD6C9]/50 h-full" />
        <div className="border-r border-[#DDD6C9]/50 h-full" />
        <div className="h-full" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 z-10 pointer-events-none">
        {/* Left Editorial Typography (Strictly bound to left flank, never occluding center 3D) */}
        <div className="w-full lg:w-[420px] xl:w-[460px] flex flex-col items-start text-left flex-shrink-0 pointer-events-auto">
          {/* Category Label */}
          <div className="scene-control-label flex items-center gap-3.5 mb-6 sm:mb-8 will-change-transform">
            <div className="w-9 h-[1.5px] bg-[#C69A4B]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-extrabold text-[#C69A4B]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Kinetic Headline with Masked Line Wrappers */}
          <h1 className="scene-control-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#2A2927] leading-[1.06] mb-6 sm:mb-8 max-w-xl">
            <span className="block overflow-hidden pb-1">
              <span className="scene-control-head-line-1 inline-block will-change-transform">
                EVERYTHING
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="scene-control-head-line-2 inline-block will-change-transform">
                HAPPENING.
              </span>
            </span>
            <span className="block overflow-hidden pt-1">
              <span className="scene-control-head-line-3 inline-block will-change-transform text-[#C69A4B]">
                ONE PLACE.
              </span>
            </span>
          </h1>

          {/* Supporting Subline */}
          <p className="scene-control-subline text-base sm:text-lg text-[#5D5A56] max-w-md mb-6 sm:mb-8 leading-relaxed font-normal will-change-transform">
            {sceneData?.subline}
          </p>

          {/* Editorial Meta Tags */}
          <div className="scene-control-meta flex items-center gap-3.5 text-[11px] font-mono tracking-wider uppercase text-[#8B857D] mb-8 sm:mb-10 will-change-transform">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C69A4B]" />
              Multi-Tenant
            </span>
            <span className="text-[#DDD6C9]">·</span>
            <span>Real-time Telemetry</span>
            <span className="text-[#DDD6C9]">·</span>
            <span>Zero Blindspots</span>
          </div>

          {/* Interactive CTA */}
          <div className="scene-control-cta will-change-transform">
            <Link
              href="/dashboard/admin"
              className="px-7 py-3.5 rounded-full bg-[#C69A4B] hover:bg-[#B7863D] text-white font-semibold text-sm shadow-[0_8px_25px_rgba(198,154,75,0.28)] transition-all duration-300 inline-flex items-center gap-2 group cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Open Executive Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Center 3D Spatial Stage Clearing */}
        <div className="hidden lg:block flex-1 min-w-[200px] pointer-events-none" />

        {/* Right Product UI Composition: Executive Analytics Suite */}
        <div className="w-full lg:w-[360px] xl:w-[390px] relative flex-shrink-0 pointer-events-auto" style={{ perspective: 1200 }}>
          <div className="scene-control-panel-wrapper relative will-change-transform">
            {/* Ambient Glow */}
            <div className="scene-control-glow absolute -inset-5 bg-gradient-to-br from-[#D9C7A0]/20 via-[#ECE6D8]/30 to-transparent rounded-[36px] blur-2xl -z-10 will-change-transform" />

            {/* Main Glass Control Center Card */}
            <div className="scene-control-panel bg-[#FFFCF7]/80 backdrop-blur-2xl border border-[#DDD6C9]/80 rounded-[24px] p-6 shadow-[0_25px_60px_rgba(80,65,45,0.12)] ring-1 ring-white/50 will-change-transform">
              {/* Header */}
              <div className="scene-control-card-header flex items-center justify-between pb-3.5 mb-4 border-b border-[#ECE6D8]/70 will-change-transform">
                <div>
                  <h3 className="text-sm font-bold text-[#2A2927]">Revenue & Flow Analytics</h3>
                  <p className="text-[11px] text-[#8B857D] font-medium">Real-time enterprise metrics & CRM</p>
                </div>
                <span className="text-[10px] font-bold text-[#C69A4B] bg-[#FFF8ED] border border-[#E8D7B2] px-2.5 py-0.5 rounded-full">
                  Live Feed
                </span>
              </div>

              {/* 4 Metric Cards Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {metrics.map((m, idx) => {
                  const IconComp = m.icon;
                  return (
                    <div
                      key={m.label}
                      className={`scene-control-metric-${idx + 1} bg-white/70 backdrop-blur-md rounded-xl p-3 border border-[#ECE6D8]/80 shadow-xs will-change-transform`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${m.color}`}>
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-[#5C9E6E]">{m.change}</span>
                      </div>
                      <div className="text-lg font-extrabold text-[#2A2927]">{m.value}</div>
                      <div className="text-[10px] text-[#8B857D] font-medium">{m.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Weekly Performance Bar Chart */}
              <div className="scene-control-chart bg-white/70 backdrop-blur-md rounded-xl p-3.5 border border-[#ECE6D8]/80 shadow-xs mb-3.5 will-change-transform">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-[#2A2927]">Weekly Booking Volume</span>
                  <span className="text-[10px] text-[#C69A4B] font-semibold">Peak: Sat (₹24.8k)</span>
                </div>

                <div className="h-20 w-full flex items-end justify-between gap-2 px-1 pt-1 border-b border-[#ECE6D8]">
                  {days.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                      <div
                        style={{ height: d.height }}
                        className="w-full max-w-[22px] bg-gradient-to-t from-[#B7863D] to-[#C69A4B] rounded-t-md transition-all duration-300 group-hover:from-[#C69A4B] group-hover:to-[#E8D7B2]"
                      />
                      <span className="text-[9px] font-bold text-[#8B857D]">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Services Breakdown */}
              <div className="scene-control-card-footer flex items-center justify-between text-[10px] text-[#5D5A56] px-1 pt-1 will-change-transform">
                <span className="font-semibold text-[#8B857D]">Top:</span>
                <span className="text-[#2A2927] font-bold">Audit (42%)</span>
                <span>·</span>
                <span className="text-[#2A2927] font-bold">Blueprint (35%)</span>
                <span>·</span>
                <span className="text-[#2A2927] font-bold">Consult (23%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
