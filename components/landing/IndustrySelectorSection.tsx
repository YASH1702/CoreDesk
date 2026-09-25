"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INDUSTRY_ARCHETYPES } from "@/constants/business-types";
import { Scissors, Dumbbell, Stethoscope, Briefcase, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const INDUSTRY_ICONS: Record<string, any> = {
  CONSULTING: Briefcase,
  SALON: Scissors,
  GYM: Dumbbell,
  MEDICAL: Stethoscope,
  AGENCY: Sparkles,
};

export default function IndustrySelectorSection() {
  const [selectedId, setSelectedId] = useState("CONSULTING");
  const activeIndustry = INDUSTRY_ARCHETYPES[selectedId];
  const Icon = INDUSTRY_ICONS[selectedId] || Briefcase;

  return (
    <section className="py-24 relative z-10 border-t border-[#DDD6C9] dark:border-[#27314A] bg-[#F2EFE6]/60 dark:bg-[#111625]/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-[#C69A4B] uppercase tracking-widest mb-3">
            Configurable Industry Archetypes
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight">
            Tailored Workflows for Any Business Type
          </p>
          <p className="text-sm text-[#5D5A56] dark:text-[#A0A8B8] mt-3">
            One platform that intelligently adapts terminology, staff roles, and booking slots whether you operate a medical clinic, luxury salon, or executive consultancy.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {Object.values(INDUSTRY_ARCHETYPES).map((ind) => {
            const IndIcon = INDUSTRY_ICONS[ind.id] || Briefcase;
            const isSelected = selectedId === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedId(ind.id)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 transition-all ${
                  isSelected
                    ? "bg-[#C69A4B] text-white shadow-gold-btn border border-[#C69A4B]"
                    : "glass-panel text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#2A2927] dark:hover:text-[#F8F7F3] bg-white/70 dark:bg-[#1B2238]/70 border-[#DDD6C9] dark:border-[#27314A]"
                }`}
              >
                <IndIcon className={`w-4 h-4 ${isSelected ? "text-white" : "text-[#8B857D] dark:text-[#A0A8B8]"}`} />
                {ind.name}
              </button>
            );
          })}
        </div>

        {/* Display Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-8 md:p-10 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] relative overflow-hidden bg-white/80 dark:bg-[#1B2238]/90"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8ED] dark:bg-[#111625] border border-[#E8D7B2] dark:border-[#27314A] text-[#C69A4B] text-xs font-bold">
                  <Icon className="w-4 h-4" /> {activeIndustry.name} Mode
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] leading-tight">
                  {activeIndustry.tagline}
                </h3>
                <p className="text-sm text-[#5D5A56] dark:text-[#A0A8B8] leading-relaxed">
                  {activeIndustry.heroCopy}
                </p>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#111625] border border-[#DDD6C9] dark:border-[#27314A]">
                    <p className="text-[10px] text-[#8B857D] dark:text-[#A0A8B8] uppercase font-bold">Service Unit</p>
                    <p className="text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mt-1">{activeIndustry.serviceNoun}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#111625] border border-[#DDD6C9] dark:border-[#27314A]">
                    <p className="text-[10px] text-[#8B857D] dark:text-[#A0A8B8] uppercase font-bold">Staff Role</p>
                    <p className="text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mt-1">{activeIndustry.staffNoun}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#F8F7F3] dark:bg-[#111625] border border-[#DDD6C9] dark:border-[#27314A]">
                    <p className="text-[10px] text-[#8B857D] dark:text-[#A0A8B8] uppercase font-bold">Client Type</p>
                    <p className="text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mt-1">{activeIndustry.clientNoun}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold transition-all shadow-gold-btn"
                  >
                    Test {activeIndustry.name} Booking Flow <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Services */}
              <div className="lg:col-span-5 space-y-3.5">
                <p className="text-xs font-bold text-[#8B857D] dark:text-[#A0A8B8] uppercase tracking-wider mb-2">
                  Sample Configured Services:
                </p>
                {activeIndustry.sampleServices.map((svc, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#111625] border border-[#DDD6C9] dark:border-[#27314A] hover:border-[#C69A4B] transition-all flex items-center justify-between shadow-warm-sm"
                  >
                    <div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFF8ED] dark:bg-[#1B2238] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A] font-bold">
                        {svc.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#2A2927] dark:text-[#F8F7F3] mt-1.5">{svc.title}</h4>
                      <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-0.5">{svc.duration} minutes session</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">${svc.price}</span>
                      <span className="block text-[10px] text-[#5C9E6E] flex items-center gap-1 font-bold mt-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
