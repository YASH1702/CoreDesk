"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Calendar, ShieldCheck, ArrowRight, Star, Clock, CheckCircle2, TrendingUp } from "lucide-react";

interface HeroSectionProps {
  title?: string | null;
  subtitle?: string | null;
}

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-hero-gradient dark:bg-hero-gradient-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Titanium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFCF7]/80 dark:bg-[#1B2238]/80 border border-[#DDD6C9] dark:border-[#27314A] backdrop-blur-xl mb-8 shadow-warm-sm"
        >
          <div className="w-2 h-2 rounded-full bg-[#C69A4B] animate-pulse" />
          <span className="text-xs font-semibold text-[#5D5A56] dark:text-[#A0A8B8]">
            Next-Gen Business Website & Appointment Scheduling Engine
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8ED] dark:bg-[#111625] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A]">
            v2.5
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#2A2927] dark:text-[#F8F7F3] max-w-4xl mx-auto leading-[1.1]"
        >
          {title || (
            <>
              Elevate Your Business with <br className="hidden sm:block" />
              <span className="gold-text">Precision Booking</span> & Management
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-[#5D5A56] dark:text-[#A0A8B8] max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle ||
            "Turn site visitors into high-value clients effortlessly. Automated availability scheduling, multi-staff calendar sync, Stripe deposits, and dynamic CRM content in one warm, luxury-crafted workspace."}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/book"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white font-semibold text-sm shadow-gold-btn transition-all flex items-center justify-center gap-2.5 group"
          >
            <Calendar className="w-4.5 h-4.5 text-[#FFF8ED]" />
            Try Customer Booking Portal
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-[#1B2238] hover:bg-[#F6F2EA] dark:hover:bg-[#27314A] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-warm-sm"
          >
            <ShieldCheck className="w-4.5 h-4.5 text-[#8B857D] dark:text-[#A0A8B8]" />
            Explore Admin Dashboard
          </Link>
        </motion.div>

        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto"
        >
          <div className="glass-panel p-5 rounded-3xl text-center bg-white/75 dark:bg-[#1B2238]/80 border border-[#DDD6C9] dark:border-[#27314A]">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">$12.4M+</p>
            <p className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-medium mt-1">Booked Revenue</p>
          </div>
          <div className="glass-panel p-5 rounded-3xl text-center bg-white/75 dark:bg-[#1B2238]/80 border border-[#DDD6C9] dark:border-[#27314A]">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">99.8%</p>
            <p className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-medium mt-1">Show-Up Rate</p>
          </div>
          <div className="glass-panel p-5 rounded-3xl text-center bg-white/75 dark:bg-[#1B2238]/80 border border-[#DDD6C9] dark:border-[#27314A]">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">4.9 / 5.0</p>
            <p className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-medium mt-1 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#C69A4B] fill-[#C69A4B]" /> Verified Rating
            </p>
          </div>
          <div className="glass-panel p-5 rounded-3xl text-center bg-white/75 dark:bg-[#1B2238]/80 border border-[#DDD6C9] dark:border-[#27314A]">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">&lt; 30s</p>
            <p className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-medium mt-1">Checkout Time</p>
          </div>
        </motion.div>

        {/* 3D Titanium Silver Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="relative glass-panel p-4 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] shadow-warm-lg dark:shadow-dark-lg overflow-hidden bg-gradient-to-b from-[#E8E6E2] via-[#FFFCF7] to-[#F8F7F3] dark:from-[#1B2238] dark:via-[#161C2E] dark:to-[#0B0E17]">
            {/* Top Window Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#DDD6C9] dark:border-[#27314A] mb-4 bg-white/60 dark:bg-[#1B2238]/60 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#B8B2A8]" />
                <div className="w-3 h-3 rounded-full bg-[#D9C7A0]" />
                <div className="w-3 h-3 rounded-full bg-[#C69A4B]" />
              </div>
              <span className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] font-mono font-medium">coredesk.app/apex-advisory/dashboard</span>
              <div className="flex items-center gap-2 text-xs text-[#5C9E6E] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#5C9E6E] animate-ping" /> Live Operations
              </div>
            </div>

            {/* Dashboard Interface Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left p-2">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#161C2E] border border-[#DDD6C9] dark:border-[#27314A] shadow-warm-sm">
                <p className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-medium">Today's Revenue</p>
                <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] mt-1">$4,850.00</p>
                <div className="mt-2 text-xs text-[#5C9E6E] flex items-center gap-1 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" /> +24% from yesterday
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#161C2E] border border-[#DDD6C9] dark:border-[#27314A] shadow-warm-sm">
                <p className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-medium">Confirmed Appointments</p>
                <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] mt-1">18 Sessions</p>
                <div className="mt-2 text-xs text-[#C69A4B] flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> 4 upcoming today
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#161C2E] border border-[#DDD6C9] dark:border-[#27314A] shadow-warm-sm">
                <p className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-medium">Active Specialists</p>
                <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] mt-1">8 Specialists</p>
                <div className="mt-2 text-xs text-[#B7863D] dark:text-[#E8D7B2] flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Calendar Sync
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
