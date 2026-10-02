"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, TrendingUp, Users, Star, ArrowRight, ShieldCheck } from "lucide-react";
import { SCENES } from "@/constants/motion";
import { MagneticWrapper } from "@/components/shared/MagneticWrapper";

export function ControlScene() {
  const sceneData = SCENES.find((s) => s.id === "control");
  const [selectedDay, setSelectedDay] = useState("Sat");

  const dayStats: Record<string, { rev: string; count: number }> = {
    Mon: { rev: "₹14.2k", count: 18 },
    Tue: { rev: "₹18.6k", count: 24 },
    Wed: { rev: "₹12.1k", count: 16 },
    Thu: { rev: "₹22.4k", count: 28 },
    Fri: { rev: "₹17.8k", count: 22 },
    Sat: { rev: "₹24.8k", count: 32 },
    Sun: { rev: "₹19.5k", count: 25 },
  };

  const metrics = [
    { label: "Total Bookings", value: "248", icon: Calendar, change: "+18%", color: "text-[#37261A] bg-[#DED9D0]" },
    { label: "Total Revenue", value: "₹1,24,500", icon: TrendingUp, change: "+32%", color: "text-[#5C9E6E] bg-[#F0FDF4]" },
    { label: "New Customers", value: "86", icon: Users, change: "+14%", color: "text-[#8AA2BA] bg-[#EAF0F6]" },
    { label: "Verified Rating", value: "4.8", icon: Star, change: "★ 98 rev", color: "text-[#37261A] bg-[#FAF8F5]" },
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
        <div className="border-r border-[#C8C1B4]/50 h-full" />
        <div className="border-r border-[#C8C1B4]/50 h-full" />
        <div className="border-r border-[#C8C1B4]/50 h-full" />
        <div className="h-full" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 z-10 pointer-events-none">
        {/* Left Editorial Typography (Strictly bound to left flank, never occluding center 3D) */}
        <div className="w-full lg:w-[420px] xl:w-[460px] flex flex-col items-start text-left flex-shrink-0 pointer-events-auto">
          {/* Category Label */}
          <div className="scene-control-label flex items-center gap-3.5 mb-6 sm:mb-8 will-change-transform">
            <div className="w-9 h-[1.5px] bg-[#37261A]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-extrabold text-[#37261A]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Kinetic Headline with Masked Line Wrappers */}
          <h1 className="scene-control-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#1E1E1E] leading-[1.06] mb-6 sm:mb-8 max-w-xl">
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
              <span className="scene-control-head-line-3 inline-block will-change-transform text-[#37261A]">
                ONE PLACE.
              </span>
            </span>
          </h1>

          {/* Supporting Subline */}
          <p className="scene-control-subline text-base sm:text-lg text-[#5D554A] max-w-md mb-6 sm:mb-8 leading-relaxed font-normal will-change-transform">
            {sceneData?.subline}
          </p>

          {/* Editorial Meta Tags */}
          <div className="scene-control-meta flex items-center gap-3.5 text-[11px] font-mono tracking-wider uppercase text-[#5D554A] mb-8 sm:mb-10 will-change-transform">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#37261A]" />
              Multi-Tenant
            </span>
            <span className="text-[#C8C1B4]">·</span>
            <span>Real-time Telemetry</span>
            <span className="text-[#C8C1B4]">·</span>
            <span>Zero Blindspots</span>
          </div>

          {/* Interactive CTA */}
          <div className="scene-control-cta will-change-transform">
            <MagneticWrapper strength={0.3} radius={40}>
              <Link
                href="/dashboard/admin"
                className="px-7 py-3.5 rounded-full bg-[#37261A]/85 hover:bg-[#37261A] backdrop-blur-2xl border-2 border-[#37261A]/70 hover:border-[#37261A] text-[#F5F2EB] font-semibold text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_25px_rgba(55,38,26,0.28)] transition-all duration-300 inline-flex items-center gap-2 group cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Open Executive Console</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticWrapper>
          </div>
        </div>

        {/* Center 3D Spatial Stage Clearing */}
        <div className="hidden lg:block flex-1 min-w-[200px] pointer-events-none" />

        {/* Right Product UI Composition: Executive Analytics Suite */}
        <div className="w-full lg:w-[360px] xl:w-[390px] relative flex-shrink-0 pointer-events-auto" style={{ perspective: 1200 }}>
          <div className="scene-control-panel-wrapper relative will-change-transform">
            {/* Ambient Dark Chocolate & Marlborough Blue Glow */}
            <div className="scene-control-glow absolute -inset-5 bg-gradient-to-tr from-[#37261A]/20 via-[#8AA2BA]/18 to-transparent rounded-[36px] blur-2xl -z-10 will-change-transform" />

            {/* Main Glass Control Center Card */}
            <div className="scene-control-panel bg-[#F5F2EB]/94 backdrop-blur-2xl border border-[#C8C1B4] rounded-[24px] p-6 shadow-[0_25px_60px_rgba(55,38,26,0.12)] will-change-transform">
              {/* Header */}
              <div className="scene-control-card-header flex items-center justify-between pb-3.5 mb-4 border-b border-[#C8C1B4]/60 will-change-transform">
                <div>
                  <h3 className="text-sm font-bold text-[#1E1E1E]">Revenue & Flow Analytics</h3>
                  <p className="text-[11px] text-[#5D554A] font-medium">Real-time enterprise metrics & CRM</p>
                </div>
                <span className="text-[10px] font-bold text-[#37261A] bg-[#DED9D0]/70 backdrop-blur-md border border-[#C8C1B4]/70 px-2.5 py-0.5 rounded-full">
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
                      className={`scene-control-metric-${idx + 1} bg-white/70 backdrop-blur-xl rounded-xl p-3 border border-[#C8C1B4]/60 shadow-xs will-change-transform`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${m.color}`}>
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-[#5C9E6E]">{m.change}</span>
                      </div>
                      <div className="text-lg font-extrabold text-[#1E1E1E]">{m.value}</div>
                      <div className="text-[10px] text-[#5D554A] font-medium">{m.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Weekly Performance Bar Chart */}
              <div className="scene-control-chart bg-white/70 backdrop-blur-xl rounded-xl p-3.5 border border-[#C8C1B4]/60 shadow-xs mb-3.5 will-change-transform">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold text-[#1E1E1E]">Weekly Booking Volume</span>
                  <span className="text-[10px] text-[#37261A] font-semibold bg-[#DED9D0]/60 px-2 py-0.5 rounded-full border border-[#C8C1B4]/60 transition-all">
                    {selectedDay === "Sat"
                      ? "Peak: Sat (₹24.8k)"
                      : `${selectedDay}: ${dayStats[selectedDay]?.rev} (${dayStats[selectedDay]?.count} slots)`}
                  </span>
                </div>

                <div className="h-20 w-full flex items-end justify-between gap-2 px-1 pt-1 border-b border-[#C8C1B4]/60">
                  {days.map((d) => {
                    const isSelected = selectedDay === d.day;
                    return (
                      <button
                        key={d.day}
                        type="button"
                        onClick={() => setSelectedDay(d.day)}
                        onMouseEnter={() => setSelectedDay(d.day)}
                        className="flex-1 flex flex-col items-center gap-1 h-full justify-end cursor-pointer group focus:outline-hidden"
                      >
                        <div
                          style={{ height: d.height }}
                          className={`w-full max-w-[22px] rounded-t-md transition-all duration-300 ${
                            isSelected
                              ? "bg-gradient-to-t from-[#37261A] to-[#493323] shadow-md scale-y-105 ring-1 ring-[#37261A]/50"
                              : "bg-gradient-to-t from-[#8AA2BA]/70 to-[#37261A]/60 group-hover:from-[#8AA2BA] group-hover:to-[#37261A]"
                          }`}
                        />
                        <span
                          className={`text-[9px] font-bold transition-colors ${
                            isSelected ? "text-[#37261A] font-extrabold" : "text-[#5D554A] group-hover:text-[#1E1E1E]"
                          }`}
                        >
                          {d.day}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Top Services Breakdown */}
              <div className="scene-control-card-footer flex items-center justify-between text-[10px] text-[#5D554A] px-1 pt-1 will-change-transform">
                <span className="font-semibold text-[#5D554A]">Top:</span>
                <span className="text-[#1E1E1E] font-bold">Audit (42%)</span>
                <span>·</span>
                <span className="text-[#1E1E1E] font-bold">Blueprint (35%)</span>
                <span>·</span>
                <span className="text-[#1E1E1E] font-bold">Consult (23%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
