"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { SCENES } from "@/constants/motion";

export function StaffScene() {
  const sceneData = SCENES.find((s) => s.id === "staff");

  const staffMembers = [
    {
      initials: "AM",
      name: "Aarav Mehta",
      title: "Senior Specialist · Advisory",
      slots: "4 booked today",
      color: "bg-[#F1EACD] text-[#441417] border-[#DED6B8]",
      active: true,
    },
    {
      initials: "MK",
      name: "Maya Kapoor",
      title: "Lead Consultant · Strategy",
      slots: "3 booked today",
      color: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
      active: true,
    },
    {
      initials: "RD",
      name: "Rohan Desai",
      title: "Junior Specialist · Diagnostics",
      slots: "5 booked today",
      color: "bg-[#EFF6FF] text-[#2F4364] border-[#BFDBFE]",
      active: true,
    },
  ];

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-between px-6 sm:px-10 lg:px-14 xl:px-20 py-20 relative overflow-hidden">
      {/* Subtle Architectural Grid Hairlines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 opacity-20">
        <div className="border-r border-[#DED6B8]/50 h-full" />
        <div className="border-r border-[#DED6B8]/50 h-full" />
        <div className="border-r border-[#DED6B8]/50 h-full" />
        <div className="h-full" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 z-10 pointer-events-none">
        {/* Left Editorial Typography (Strictly bound to left flank, never occluding center 3D) */}
        <div className="w-full lg:w-[420px] xl:w-[460px] flex flex-col items-start text-left flex-shrink-0 pointer-events-auto">
          {/* Category Label */}
          <div className="scene-staff-label flex items-center gap-3.5 mb-6 sm:mb-8 will-change-transform">
            <div className="w-9 h-[1.5px] bg-[#441417]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-extrabold text-[#441417]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Kinetic Headline with Masked Line Wrappers */}
          <h1 className="scene-staff-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#2F4364] leading-[1.06] mb-6 sm:mb-8 max-w-xl">
            <span className="block overflow-hidden pb-1">
              <span className="scene-staff-head-line-1 inline-block will-change-transform">
                YOUR TEAM
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="scene-staff-head-line-2 inline-block will-change-transform">
                SEES THE
              </span>
            </span>
            <span className="block overflow-hidden pt-1">
              <span className="scene-staff-head-line-3 inline-block will-change-transform text-[#441417]">
                OPERATION.
              </span>
            </span>
          </h1>

          {/* Supporting Subline */}
          <p className="scene-staff-subline text-base sm:text-lg text-[#5C6E88] max-w-md mb-6 sm:mb-8 leading-relaxed font-normal will-change-transform">
            {sceneData?.subline}
          </p>

          {/* Editorial Meta Tags */}
          <div className="scene-staff-meta flex items-center gap-3.5 text-[11px] font-mono tracking-wider uppercase text-[#5C6E88] mb-8 sm:mb-10 will-change-transform">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              Live Sync
            </span>
            <span className="text-[#DED6B8]">·</span>
            <span>Zero Double Booking</span>
            <span className="text-[#DED6B8]">·</span>
            <span>Buffer Enforced</span>
          </div>

          {/* Interactive CTA */}
          <div className="scene-staff-cta will-change-transform">
            <Link
              href="/dashboard/staff"
              className="px-7 py-3.5 rounded-full bg-[#441417] hover:bg-[#561B1F] text-[#F1EACD] font-semibold text-sm shadow-[0_8px_25px_rgba(68,20,23,0.28)] transition-all duration-300 inline-flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Explore Staff Agenda</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Center 3D Spatial Stage Clearing */}
        <div className="hidden lg:block flex-1 min-w-[200px] pointer-events-none" />

        {/* Right Product UI Composition: Operational Workspace (Strictly bound to right flank) */}
        <div className="w-full lg:w-[360px] xl:w-[390px] relative flex-shrink-0 pointer-events-auto" style={{ perspective: 1200 }}>
          <div className="scene-staff-panel-wrapper relative will-change-transform">
            {/* Ambient Wine & Eighties Glow */}
            <div className="scene-staff-glow absolute -inset-5 bg-gradient-to-tr from-[#441417]/20 via-[#2F4364]/15 to-transparent rounded-[36px] blur-2xl -z-10 will-change-transform" />

            {/* Main Operational Glass Card */}
            <div className="scene-staff-panel bg-[#FAF6EB]/92 backdrop-blur-2xl border border-[#DED6B8] rounded-[24px] p-6 shadow-[0_25px_60px_rgba(47,67,100,0.12)] will-change-transform">
              {/* Header */}
              <div className="scene-staff-card-header flex items-center justify-between pb-3.5 mb-4 border-b border-[#DED6B8]/60 will-change-transform">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F1EACD] border border-[#DED6B8] flex items-center justify-center text-[#441417]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#2F4364]">Specialist Duty Schedule</h3>
                    <p className="text-[11px] text-[#5C6E88] font-medium">Real-time capacity & workload sync</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#5C9E6E] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Live
                </div>
              </div>

              {/* Staff Cards List */}
              <div className="space-y-2.5 mb-4">
                {staffMembers.map((staff, idx) => (
                  <div
                    key={staff.name}
                    className={`scene-staff-item-${idx + 1} bg-white/95 rounded-xl p-3 border border-[#DED6B8]/70 shadow-sm flex items-center justify-between gap-3 will-change-transform`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-[11px] ${staff.color}`}>
                        {staff.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#2F4364]">{staff.name}</h4>
                        <p className="text-[10px] text-[#5C6E88]">{staff.title}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-[#441417] bg-[#F1EACD] border border-[#DED6B8] px-2 py-0.5 rounded-full whitespace-nowrap">
                      {staff.slots}
                    </span>
                  </div>
                ))}
              </div>

              {/* Operational Schedule Timeline Bar */}
              <div className="scene-staff-timeline bg-white/95 rounded-xl p-3 border border-[#DED6B8]/70 shadow-sm will-change-transform">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#2F4364] mb-2">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#441417]" /> Shift Hours (09:00 - 17:00)
                  </span>
                  <span className="text-[#5C9E6E]">88% Booked</span>
                </div>

                <div className="w-full h-3 bg-[#FAF6EB] rounded-full overflow-hidden flex p-0.5 gap-1 border border-[#DED6B8]/50">
                  <div className="h-full bg-[#441417] rounded-full w-[25%]" title="Morning Block (Booked)" />
                  <div className="h-full bg-[#561B1F] rounded-full w-[35%]" title="Midday Block (Booked)" />
                  <div className="h-full bg-white rounded-full w-[12%]" title="Buffer Gap" />
                  <div className="h-full bg-[#2F4364] rounded-full w-[28%]" title="Afternoon Block (Booked)" />
                </div>

                <div className="flex justify-between items-center text-[9px] text-[#5C6E88] font-medium mt-1.5 px-0.5">
                  <span>09:00 AM</span>
                  <span>12:00 PM (Lunch)</span>
                  <span>05:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
