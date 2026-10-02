"use client";

import React from "react";
import Link from "next/link";
import { Check, Clock, Calendar as CalendarIcon, User, ShieldCheck, ArrowRight, Zap } from "lucide-react";
import { SCENES } from "@/constants/motion";

export default function CustomerScene() {
  const sceneData = SCENES.find((s) => s.id === "customer");

  const steps = [
    {
      num: "01",
      title: "Service Package",
      detail: "Executive Strategy Audit · 60m",
      price: "₹1,500",
      icon: Clock,
      done: true,
      selector: "scene-customer-step-1",
    },
    {
      num: "02",
      title: "Specialist",
      detail: "Dr. Marcus Chen · Principal Lead",
      price: "Selected",
      icon: User,
      done: true,
      selector: "scene-customer-step-2",
    },
    {
      num: "03",
      title: "Selected Slot",
      detail: "Thursday, Oct 15 · 10:30 AM",
      price: "Confirmed",
      icon: CalendarIcon,
      done: true,
      selector: "scene-customer-step-3",
    },
    {
      num: "04",
      title: "Instant Checkout",
      detail: "Stripe Secured · Deposit Verified",
      price: "Ready",
      icon: ShieldCheck,
      done: false,
      active: true,
      selector: "scene-customer-step-4",
    },
  ];

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
          <div className="scene-customer-label flex items-center gap-3.5 mb-6 sm:mb-8 will-change-transform">
            <div className="w-9 h-[1.5px] bg-[#37261A]" />
            <span className="text-[11px] uppercase tracking-[0.28em] font-extrabold text-[#37261A]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Kinetic Headline with Masked Line Wrappers */}
          <h1 className="scene-customer-headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#1E1E1E] leading-[1.06] mb-6 sm:mb-8 max-w-xl">
            <span className="block overflow-hidden pb-1">
              <span className="scene-customer-head-line-1 inline-block will-change-transform">
                BOOKING
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="scene-customer-head-line-2 inline-block will-change-transform">
                SHOULDN'T FEEL
              </span>
            </span>
            <span className="block overflow-hidden pt-1">
              <span className="scene-customer-head-line-3 inline-block will-change-transform text-[#37261A]">
                LIKE WORK.
              </span>
            </span>
          </h1>

          {/* Supporting Editorial Subline */}
          <p className="scene-customer-subline text-base sm:text-lg text-[#5D554A] max-w-md mb-6 sm:mb-8 leading-relaxed font-normal will-change-transform">
            {sceneData?.subline}
          </p>

          {/* Architectural Meta Indicators */}
          <div className="scene-customer-meta flex items-center gap-3.5 text-[11px] font-mono tracking-wider uppercase text-[#5D554A] mb-8 sm:mb-10 will-change-transform">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#37261A]" />
              Self-Serve Wizard
            </span>
            <span className="text-[#C8C1B4]">·</span>
            <span>Stripe Integrated</span>
            <span className="text-[#C8C1B4]">·</span>
            <span>Zero Conflicts</span>
          </div>

          {/* Interactive CTA */}
          <div className="scene-customer-cta will-change-transform">
            <Link
              href="/book"
              className="px-7 py-3.5 rounded-full bg-[#37261A]/90 hover:bg-[#37261A] backdrop-blur-xl border border-[#37261A]/30 text-[#F5F2EB] font-semibold text-sm shadow-[0_8px_25px_rgba(55,38,26,0.28)] transition-all duration-300 inline-flex items-center gap-2.5 group cursor-pointer"
            >
              <span>Test Customer Wizard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Center 3D Spatial Stage Clearing (Guarantees customer walking & check-in podium stay completely unobstructed) */}
        <div className="hidden lg:block flex-1 min-w-[200px] pointer-events-none" />

        {/* Right Product UI Composition: Step Progression Journey (Strictly bound to right flank) */}
        <div className="w-full lg:w-[360px] xl:w-[390px] relative flex-shrink-0 pointer-events-auto" style={{ perspective: 1200 }}>
          <div className="scene-customer-panel-wrapper relative will-change-transform">
            {/* Ambient Dark Chocolate & Marlborough Blue Glow */}
            <div className="scene-customer-glow absolute -inset-5 bg-gradient-to-tr from-[#37261A]/20 via-[#8AA2BA]/18 to-transparent rounded-[36px] blur-2xl -z-10 will-change-transform" />

            {/* Stacked Interactive Booking Flow Container */}
            <div className="scene-customer-panel bg-[#F5F2EB]/94 backdrop-blur-2xl border border-[#C8C1B4] rounded-[24px] p-6 shadow-[0_25px_60px_rgba(55,38,26,0.12)] will-change-transform">
              {/* Header */}
              <div className="scene-customer-card-header flex items-center justify-between pb-3.5 mb-4 border-b border-[#C8C1B4]/60 will-change-transform">
                <div>
                  <h3 className="text-sm font-bold text-[#1E1E1E]">Client Self-Booking Portal</h3>
                  <p className="text-[11px] text-[#5D554A] font-medium">Deterministic availability · No overlaps</p>
                </div>
                <div className="px-2.5 py-0.5 rounded-full bg-[#DED9D0]/70 backdrop-blur-md border border-[#C8C1B4]/70 text-[#37261A] text-[10px] font-bold">
                  Step 4 of 4
                </div>
              </div>

              {/* Step Sequence Cards */}
              <div className="space-y-2.5">
                {steps.map((st) => {
                  const IconComp = st.icon;
                  return (
                    <div
                      key={st.num}
                      className={`${st.selector} p-3 rounded-xl border backdrop-blur-xl transition-colors duration-300 flex items-center justify-between gap-3 will-change-transform shadow-xs ${
                        st.active
                          ? "bg-white/85 border-[#37261A] ring-1 ring-[#37261A]/20"
                          : "bg-white/70 border-[#C8C1B4]/60 hover:border-[#C8C1B4]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                            st.done
                              ? "bg-[#5C9E6E]/15 text-[#5C9E6E]"
                              : st.active
                              ? "bg-[#37261A] text-[#F5F2EB] shadow-sm"
                              : "bg-[#DED9D0] text-[#5D554A]"
                          }`}
                        >
                          {st.done ? <Check className="w-3.5 h-3.5" /> : <IconComp className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#5D554A]">
                            {st.num} / {st.title}
                          </div>
                          <div className="text-xs font-bold text-[#1E1E1E] mt-0.5">
                            {st.detail}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          st.active
                            ? "bg-[#DED9D0] text-[#37261A] border border-[#C8C1B4]"
                            : "text-[#5D554A] bg-[#DED9D0]/60"
                        }`}
                      >
                        {st.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Confirmation Footer */}
              <div className="scene-customer-card-footer mt-4 pt-3.5 border-t border-[#C8C1B4]/60 flex items-center justify-between text-[11px] will-change-transform">
                <div className="flex items-center gap-1.5 text-[#5D554A]">
                  <Check className="w-3.5 h-3.5 text-[#5C9E6E]" />
                  <span>Calendar invite queued</span>
                </div>
                <span className="font-bold text-[#37261A]">100% Automated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
