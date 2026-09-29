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
      color: "bg-[#FFF8ED] text-[#C69A4B] border-[#E8D7B2]",
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
      color: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
      active: true,
    },
  ];

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-16 py-20 relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center z-10 lg:pr-20">
        {/* Left Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Category Label */}
          <div className="scene-staff-label flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-[1.5px] bg-[#C69A4B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#C69A4B]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="scene-staff-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2A2927] leading-[1.08] mb-6 sm:mb-8 max-w-2xl">
            YOUR TEAM <br className="hidden sm:inline" />
            SEES THE <br className="hidden sm:inline" />
            <span className="text-[#C69A4B]">OPERATION.</span>
          </h1>

          {/* Supporting Subline */}
          <p className="scene-staff-subline text-base sm:text-lg lg:text-xl text-[#5D5A56] max-w-lg mb-8 sm:mb-10 leading-relaxed font-normal">
            {sceneData?.subline}
          </p>

          {/* Interactive CTA */}
          <div className="scene-staff-cta">
            <Link
              href="/dashboard/staff"
              className="px-8 py-4 rounded-full bg-[#C69A4B] hover:bg-[#B7863D] text-white font-semibold text-sm shadow-[0_8px_25px_rgba(198,154,75,0.28)] transition-all duration-300 inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Staff Agenda</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Product UI Composition: Operational Workspace */}
        <div className="lg:col-span-6 relative w-full">
          <div className="scene-staff-panel relative">
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#E8D7B2]/20 via-[#D9C7A0]/20 to-transparent rounded-[36px] blur-2xl -z-10" />

            {/* Main Operational Glass Card */}
            <div className="bg-[#FFFCF7]/95 backdrop-blur-2xl border border-[#DDD6C9] rounded-[28px] p-6 sm:p-8 shadow-[0_25px_70px_rgba(80,65,45,0.12)]">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#ECE6D8]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF8ED] border border-[#E8D7B2] flex items-center justify-center text-[#C69A4B]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#2A2927]">Specialist Duty Schedule</h3>
                    <p className="text-xs text-[#8B857D] font-medium">Real-time capacity & workload sync</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#5C9E6E] font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Live
                </div>
              </div>

              {/* Staff Cards List */}
              <div className="space-y-3.5 mb-6">
                {staffMembers.map((staff) => (
                  <div
                    key={staff.name}
                    className="scene-staff-stagger bg-white rounded-2xl p-4 border border-[#ECE6D8] shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-xs ${staff.color}`}>
                        {staff.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#2A2927]">{staff.name}</h4>
                        <p className="text-xs text-[#8B857D]">{staff.title}</p>
                      </div>
                    </div>

                    <span className="text-[11px] font-bold text-[#C69A4B] bg-[#FFF8ED] border border-[#E8D7B2] px-3 py-1 rounded-full whitespace-nowrap">
                      {staff.slots}
                    </span>
                  </div>
                ))}
              </div>

              {/* Operational Schedule Timeline Bar */}
              <div className="scene-staff-stagger bg-white rounded-2xl p-4 border border-[#ECE6D8] shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-[#2A2927] mb-2.5">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C69A4B]" /> Working Shift Timeline (09:00 - 17:00)
                  </span>
                  <span className="text-[#5C9E6E]">88% Booked</span>
                </div>

                <div className="w-full h-4 bg-[#F2EFE6] rounded-full overflow-hidden flex p-0.5 gap-1">
                  <div className="h-full bg-[#C69A4B] rounded-full w-[25%]" title="Morning Block (Booked)" />
                  <div className="h-full bg-[#B7863D] rounded-full w-[35%]" title="Midday Block (Booked)" />
                  <div className="h-full bg-white rounded-full w-[12%]" title="Buffer Gap" />
                  <div className="h-full bg-[#8F6B2F] rounded-full w-[28%]" title="Afternoon Block (Booked)" />
                </div>

                <div className="flex justify-between items-center text-[10px] text-[#8B857D] font-medium mt-2 px-1">
                  <span>09:00 AM</span>
                  <span>12:00 PM (Lunch Gap)</span>
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
