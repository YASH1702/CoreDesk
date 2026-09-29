"use client";

import React from "react";
import Link from "next/link";
import { Check, Clock, Calendar as CalendarIcon, User, ShieldCheck, ArrowRight } from "lucide-react";
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
    },
    {
      num: "02",
      title: "Specialist",
      detail: "Dr. Marcus Chen · Principal Lead",
      price: "Selected",
      icon: User,
      done: true,
    },
    {
      num: "03",
      title: "Selected Slot",
      detail: "Thursday, Oct 15 · 10:30 AM",
      price: "Confirmed",
      icon: CalendarIcon,
      done: true,
    },
    {
      num: "04",
      title: "Instant Checkout",
      detail: "Stripe Secured · Deposit Verified",
      price: "Ready",
      icon: ShieldCheck,
      done: false,
      active: true,
    },
  ];

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-16 py-20 relative overflow-hidden">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center z-10 lg:pr-20">
        {/* Left Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Category Label */}
          <div className="scene-customer-label flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-[1.5px] bg-[#C69A4B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-[#C69A4B]">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="scene-customer-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#2A2927] leading-[1.08] mb-6 sm:mb-8 max-w-2xl">
            BOOKING <br className="hidden sm:inline" />
            SHOULDN'T FEEL <br className="hidden sm:inline" />
            <span className="text-[#C69A4B]">LIKE WORK.</span>
          </h1>

          {/* Supporting Subline */}
          <p className="scene-customer-subline text-base sm:text-lg lg:text-xl text-[#5D5A56] max-w-lg mb-8 sm:mb-10 leading-relaxed font-normal">
            {sceneData?.subline}
          </p>

          {/* Interactive CTA */}
          <div className="scene-customer-cta">
            <Link
              href="/book"
              className="px-8 py-4 rounded-full bg-[#C69A4B] hover:bg-[#B7863D] text-white font-semibold text-sm shadow-[0_8px_25px_rgba(198,154,75,0.28)] transition-all duration-300 inline-flex items-center gap-2 group cursor-pointer"
            >
              <span>Test Customer Wizard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Product UI Composition: Step Progression Journey */}
        <div className="lg:col-span-6 relative w-full">
          <div className="scene-customer-panel relative">
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#E8D7B2]/20 via-[#FFF8ED]/30 to-transparent rounded-[36px] blur-2xl -z-10" />

            {/* Stacked Interactive Booking Flow Container */}
            <div className="bg-[#FFFCF7]/95 backdrop-blur-2xl border border-[#DDD6C9] rounded-[28px] p-6 sm:p-8 shadow-[0_25px_70px_rgba(80,65,45,0.12)]">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#ECE6D8]">
                <div>
                  <h3 className="text-base font-bold text-[#2A2927]">Client Self-Booking Portal</h3>
                  <p className="text-xs text-[#8B857D] font-medium">Deterministic availability · No overlaps</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#FFF8ED] border border-[#E8D7B2] text-[#C69A4B] text-[11px] font-bold">
                  Step 4 of 4
                </div>
              </div>

              {/* Step Sequence Cards */}
              <div className="space-y-3.5">
                {steps.map((st, i) => {
                  const IconComp = st.icon;
                  return (
                    <div
                      key={st.num}
                      className={`scene-customer-stagger p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                        st.active
                          ? "bg-white border-[#C69A4B] shadow-md ring-1 ring-[#C69A4B]/20"
                          : "bg-white/80 border-[#ECE6D8] shadow-sm hover:border-[#DDD6C9]"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            st.done
                              ? "bg-[#5C9E6E]/15 text-[#5C9E6E]"
                              : st.active
                              ? "bg-[#C69A4B] text-white shadow-sm"
                              : "bg-[#F2EFE6] text-[#8B857D]"
                          }`}
                        >
                          {st.done ? <Check className="w-4 h-4" /> : <IconComp className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-[11px] font-extrabold uppercase tracking-wider text-[#8B857D]">
                            {st.num} / {st.title}
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-[#2A2927] mt-0.5">
                            {st.detail}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                          st.active
                            ? "bg-[#FFF8ED] text-[#C69A4B] border border-[#E8D7B2]"
                            : "text-[#5D5A56] bg-[#F8F7F3]"
                        }`}
                      >
                        {st.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Confirmation Footer */}
              <div className="scene-customer-stagger mt-6 pt-5 border-t border-[#ECE6D8] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#5D5A56]">
                  <Check className="w-4 h-4 text-[#5C9E6E]" />
                  <span>Calendar invite + SMS reminder queued</span>
                </div>
                <span className="text-xs font-bold text-[#C69A4B]">100% Automated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
