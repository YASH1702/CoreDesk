"use client";

import React from "react";
import Link from "next/link";
import { Building2, Layers, Users, UserCheck, Calendar, CreditCard, Bell, BarChart3, ArrowRight } from "lucide-react";
import { SCENES } from "@/constants/motion";

export function SystemScene() {
  const sceneData = SCENES.find((s) => s.id === "system");

  const modules = [
    { id: "business", icon: Building2, label: "Business Entity", status: "Multi-tenant", color: "text-[#8F6B2F] bg-[#FFF8ED]" },
    { id: "services", icon: Layers, label: "Services Catalog", status: "Duration & pricing", color: "text-[#C69A4B] bg-[#FFF8ED]" },
    { id: "customers", icon: Users, label: "Customer CRM", status: "Profiles & history", color: "text-[#2563EB] bg-[#EFF6FF]" },
    { id: "staff", icon: UserCheck, label: "Team & Staff", status: "Availability sync", color: "text-[#16A34A] bg-[#F0FDF4]" },
    { id: "bookings", icon: Calendar, label: "Booking Engine", status: "Deterministic slots", color: "text-[#EA580C] bg-[#FFF7ED]" },
    { id: "payments", icon: CreditCard, label: "Stripe & Invoices", status: "Automatic ledger", color: "text-[#5C9E6E] bg-[#F0FDF4]" },
    { id: "notifications", icon: Bell, label: "Workflows & Alerts", status: "Inngest async queue", color: "text-[#9333EA] bg-[#FAF5FF]" },
    { id: "analytics", icon: BarChart3, label: "Live Telemetry", status: "Real-time metrics", color: "text-[#C69A4B] bg-[#FFF8ED]" },
  ];

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-20 py-20 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        {/* Left Editorial Typography */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          {/* Category Label */}
          <div className="scene-system-label flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-[1.5px] bg-[#C69A4B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#C69A4B]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="scene-system-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2A2927] leading-[1.08] mb-6 sm:mb-8 max-w-2xl">
            ONE SYSTEM. <br className="hidden sm:inline" />
            EVERY MOVING <br className="hidden sm:inline" />
            <span className="text-[#C69A4B]">PART.</span>
          </h1>

          {/* Supporting Subline */}
          <p className="scene-system-subline text-base sm:text-lg lg:text-xl text-[#5D5A56] max-w-lg mb-8 sm:mb-10 leading-relaxed font-normal">
            {sceneData?.subline}
          </p>

          {/* Action CTA */}
          <div className="scene-system-cta">
            <Link
              href="/dashboard/admin/services"
              className="px-8 py-4 rounded-full bg-[#C69A4B] hover:bg-[#B7863D] text-white font-semibold text-sm shadow-[0_8px_25px_rgba(198,154,75,0.28)] transition-all duration-300 inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Architecture Modules</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Product UI Composition: 8 Interconnected System Modules */}
        <div className="lg:col-span-7 relative w-full">
          <div className="scene-system-panel relative">
            {/* Ambient Background Radial Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#E8D7B2]/20 via-[#D9C7A0]/20 to-transparent rounded-[36px] blur-2xl -z-10" />

            {/* Main Connected Glass Container */}
            <div className="bg-[#FFFCF7]/95 backdrop-blur-2xl border border-[#DDD6C9] rounded-[28px] p-6 sm:p-8 shadow-[0_25px_70px_rgba(80,65,45,0.12)]">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#ECE6D8]">
                <div>
                  <h3 className="text-base font-bold text-[#2A2927]">Autonomous Core Synchronization</h3>
                  <p className="text-xs text-[#8B857D] font-medium">8 interdependent modules exchanging state via unified event bus</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#5C9E6E] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#5C9E6E] animate-ping" />
                  <span>Synchronized</span>
                </div>
              </div>

              {/* 8 Module Nodes Grid with Gold Relational Conduit Borders */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 relative">
                {modules.map((mod) => {
                  const IconComp = mod.icon;
                  return (
                    <div
                      key={mod.id}
                      className="scene-system-stagger bg-white rounded-2xl p-4 border border-[#ECE6D8] shadow-sm hover:border-[#C69A4B] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${mod.color}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#2A2927] mb-1">{mod.label}</h4>
                      <p className="text-[10px] text-[#8B857D] font-medium">{mod.status}</p>
                    </div>
                  );
                })}
              </div>

              {/* Data Flow Legend Bar */}
              <div className="scene-system-stagger mt-6 pt-4 border-t border-[#ECE6D8] flex flex-wrap items-center justify-between text-xs text-[#8B857D] gap-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#C69A4B]" /> Single Source of Truth
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#5C9E6E]" /> Zero Data Redundancy
                </span>
                <span className="font-bold text-[#C69A4B]">PostgreSQL · Prisma ORM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
