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
    { label: "Verified Rating", value: "4.8", icon: Star, change: "★ 98 reviews", color: "text-[#D89A2B] bg-[#FEFCE8]" },
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
    <div className="w-full h-full min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-20 py-20 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        {/* Left Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Category Label */}
          <div className="scene-control-label flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-[1.5px] bg-[#C69A4B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#C69A4B]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="scene-control-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2A2927] leading-[1.08] mb-6 sm:mb-8 max-w-2xl">
            EVERYTHING <br className="hidden sm:inline" />
            HAPPENING. <br className="hidden sm:inline" />
            <span className="text-[#C69A4B]">ONE PLACE.</span>
          </h1>

          {/* Supporting Subline */}
          <p className="scene-control-subline text-base sm:text-lg lg:text-xl text-[#5D5A56] max-w-lg mb-8 sm:mb-10 leading-relaxed font-normal">
            {sceneData?.subline}
          </p>

          {/* Interactive CTA */}
          <div className="scene-control-cta">
            <Link
              href="/dashboard/admin"
              className="px-8 py-4 rounded-full bg-[#C69A4B] hover:bg-[#B7863D] text-white font-semibold text-sm shadow-[0_8px_25px_rgba(198,154,75,0.28)] transition-all duration-300 inline-flex items-center gap-2 group cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Open Executive Console</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Product UI Composition: Executive Analytics Suite */}
        <div className="lg:col-span-6 relative w-full">
          <div className="scene-control-panel relative">
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#D9C7A0]/20 via-[#ECE6D8]/30 to-transparent rounded-[36px] blur-2xl -z-10" />

            {/* Main Glass Control Center Card */}
            <div className="bg-[#FFFCF7]/95 backdrop-blur-2xl border border-[#DDD6C9] rounded-[28px] p-6 sm:p-8 shadow-[0_25px_70px_rgba(80,65,45,0.12)]">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#ECE6D8]">
                <div>
                  <h3 className="text-base font-bold text-[#2A2927]">Executive Revenue & Flow Analytics</h3>
                  <p className="text-xs text-[#8B857D] font-medium">Real-time enterprise metrics & CRM telemetry</p>
                </div>
                <span className="text-xs font-bold text-[#C69A4B] bg-[#FFF8ED] border border-[#E8D7B2] px-3 py-1 rounded-full">
                  Live Feed
                </span>
              </div>

              {/* 4 Metric Cards Grid */}
              <div className="grid grid-cols-2 gap-3.5 mb-6">
                {metrics.map((m) => {
                  const IconComp = m.icon;
                  return (
                    <div
                      key={m.label}
                      className="scene-control-stagger bg-white rounded-2xl p-4 border border-[#ECE6D8] shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${m.color}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-[#5C9E6E]">{m.change}</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#2A2927]">{m.value}</div>
                      <div className="text-xs text-[#8B857D] font-medium mt-0.5">{m.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Weekly Performance Bar Chart */}
              <div className="scene-control-stagger bg-white rounded-2xl p-5 border border-[#ECE6D8] shadow-sm mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-[#2A2927]">Weekly Booking Volume</span>
                  <span className="text-xs text-[#C69A4B] font-semibold">Peak: Sat (₹24.8k)</span>
                </div>

                <div className="h-28 w-full flex items-end justify-between gap-3 px-2 pt-2 border-b border-[#ECE6D8]">
                  {days.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <div
                        style={{ height: d.height }}
                        className="w-full max-w-[28px] bg-gradient-to-t from-[#B7863D] to-[#C69A4B] rounded-t-lg transition-all duration-300 group-hover:from-[#C69A4B] group-hover:to-[#E8D7B2]"
                      />
                      <span className="text-[10px] font-bold text-[#8B857D]">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Services Breakdown */}
              <div className="scene-control-stagger flex items-center justify-between text-xs text-[#5D5A56] px-1 pt-1">
                <span className="font-semibold">Top Performing:</span>
                <span className="text-[#2A2927] font-bold">Executive Audit (42%)</span>
                <span>·</span>
                <span className="text-[#2A2927] font-bold">Tech Blueprint (35%)</span>
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
