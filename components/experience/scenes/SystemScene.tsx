"use client";

import React from "react";
import Link from "next/link";
import { Building2, Layers, Users, UserCheck, Calendar, CreditCard, Bell, BarChart3, ArrowRight } from "lucide-react";
import { SCENES } from "@/constants/motion";

export function SystemScene() {
  const sceneData = SCENES.find((s) => s.id === "system");

  const modules = [
    { id: "business", icon: Building2, label: "Business Entity", status: "Multi-tenant", color: "text-[#37261A] bg-[#DED9D0]" },
    { id: "services", icon: Layers, label: "Services Catalog", status: "Pricing rules", color: "text-[#8AA2BA] bg-[#EAF0F6]" },
    { id: "customers", icon: Users, label: "Customer CRM", status: "Profiles & history", color: "text-[#8AA2BA] bg-[#EAF0F6]" },
    { id: "staff", icon: UserCheck, label: "Team & Staff", status: "Calendar sync", color: "text-[#16A34A] bg-[#F0FDF4]" },
    { id: "bookings", icon: Calendar, label: "Booking Engine", status: "Deterministic slots", color: "text-[#37261A] bg-[#DED9D0]" },
    { id: "payments", icon: CreditCard, label: "Stripe & Invoices", status: "Automatic ledger", color: "text-[#5C9E6E] bg-[#F0FDF4]" },
    { id: "notifications", icon: Bell, label: "Workflows & Alerts", status: "Inngest async queue", color: "text-[#8AA2BA] bg-[#EAF0F6]" },
    { id: "analytics", icon: BarChart3, label: "Live Telemetry", status: "Real-time metrics", color: "text-[#37261A] bg-[#DED9D0]" },
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
          <div className="scene-system-label flex items-center gap-3.5 mb-6 sm:mb-8 will-change-transform">
            <div className="w-9 h-[1.5px] bg-[#37261A]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-extrabold text-[#37261A]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Kinetic Headline with Masked Line Wrappers */}
          <h1 className="scene-system-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#1E1E1E] leading-[1.06] mb-6 sm:mb-8 max-w-xl">
            <span className="block overflow-hidden pb-1">
              <span className="scene-system-head-line-1 inline-block will-change-transform">
                ONE SYSTEM.
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="scene-system-head-line-2 inline-block will-change-transform">
                EVERY MOVING
              </span>
            </span>
            <span className="block overflow-hidden pt-1">
              <span className="scene-system-head-line-3 inline-block will-change-transform text-[#37261A]">
                PART.
              </span>
            </span>
          </h1>

          {/* Supporting Subline */}
          <p className="scene-system-subline text-base sm:text-lg text-[#5D554A] max-w-md mb-6 sm:mb-8 leading-relaxed font-normal will-change-transform">
            {sceneData?.subline}
          </p>

          {/* Editorial Meta Tags */}
          <div className="scene-system-meta flex items-center gap-3.5 text-[11px] font-mono tracking-wider uppercase text-[#5D554A] mb-8 sm:mb-10 will-change-transform">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#37261A]" />
              Event-Driven Bus
            </span>
            <span className="text-[#C8C1B4]">·</span>
            <span>Prisma + PostgreSQL</span>
            <span className="text-[#C8C1B4]">·</span>
            <span>Inngest Workflows</span>
          </div>

          {/* Action CTA */}
          <div className="scene-system-cta will-change-transform">
            <Link
              href="/dashboard/admin/services"
              className="px-7 py-3.5 rounded-full bg-[#37261A] hover:bg-[#493323] text-[#F5F2EB] font-semibold text-sm shadow-[0_8px_25px_rgba(55,38,26,0.28)] transition-all duration-300 inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Architecture Modules</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Center 3D Spatial Stage Clearing */}
        <div className="hidden lg:block flex-1 min-w-[200px] pointer-events-none" />

        {/* Right Product UI Composition: 8 Interconnected System Modules */}
        <div className="w-full lg:w-[380px] xl:w-[410px] relative flex-shrink-0 pointer-events-auto" style={{ perspective: 1200 }}>
          <div className="scene-system-panel-wrapper relative will-change-transform">
            {/* Ambient Dark Chocolate & Marlborough Blue Glow */}
            <div className="scene-system-glow absolute -inset-5 bg-gradient-to-tr from-[#37261A]/20 via-[#8AA2BA]/18 to-transparent rounded-[36px] blur-2xl -z-10 will-change-transform" />

            {/* Main Connected Glass Container */}
            <div className="scene-system-panel bg-[#F5F2EB]/94 backdrop-blur-2xl border border-[#C8C1B4] rounded-[24px] p-5 shadow-[0_25px_60px_rgba(55,38,26,0.12)] will-change-transform">
              {/* Header */}
              <div className="scene-system-card-header flex items-center justify-between pb-3 mb-3.5 border-b border-[#C8C1B4]/60 will-change-transform">
                <div>
                  <h3 className="text-sm font-bold text-[#1E1E1E]">Core Synchronization</h3>
                  <p className="text-[10px] text-[#5D554A] font-medium">8 unified state modules via event bus</p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#5C9E6E] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5C9E6E] animate-ping" />
                  <span>Synced</span>
                </div>
              </div>

              {/* 8 Module Nodes Grid */}
              <div className="grid grid-cols-4 gap-2 relative mb-3.5">
                {modules.map((mod, idx) => {
                  const IconComp = mod.icon;
                  return (
                    <div
                      key={mod.id}
                      className={`scene-system-mod-${idx + 1} bg-white/95 rounded-xl p-2.5 border border-[#C8C1B4]/70 shadow-xs flex flex-col items-center text-center will-change-transform`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 ${mod.color}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-[10px] text-[#1E1E1E] leading-tight truncate w-full">{mod.label}</h4>
                      <p className="text-[8px] text-[#5D554A] font-medium mt-0.5 truncate w-full">{mod.status}</p>
                    </div>
                  );
                })}
              </div>

              {/* Data Flow Legend Bar */}
              <div className="scene-system-card-footer pt-2.5 border-t border-[#C8C1B4]/60 flex items-center justify-between text-[10px] text-[#5D554A] will-change-transform">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#37261A]" /> Single Source of Truth
                </span>
                <span className="font-bold text-[#37261A]">PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
