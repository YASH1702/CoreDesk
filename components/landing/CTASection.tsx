"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-10 md:p-14 glass-panel border border-[#DDD6C9] dark:border-[#27314A] overflow-hidden shadow-warm-lg dark:shadow-dark-lg text-center bg-gradient-to-r from-[#FFFCF7] via-[#F2EFE6] to-[#ECE6D8] dark:from-[#1B2238] dark:via-[#111625] dark:to-[#0B0E17]"
        >
          {/* Background Warm Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#F2DFC0]/30 dark:bg-[#C69A4B]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#161C2E] border border-[#DDD6C9] dark:border-[#27314A] text-[#C69A4B] text-xs font-bold shadow-warm-sm">
              <Sparkles className="w-4 h-4 text-[#C69A4B]" /> Transform Your Appointment Pipeline
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight leading-tight">
              Ready to Upgrade to <br />
              <span className="gold-text">BusinessFlow</span> Today?
            </h2>

            <p className="text-sm text-[#5D5A56] dark:text-[#A0A8B8] leading-relaxed">
              Join thousands of gyms, salons, medical clinics, and executive consultants managing appointments effortlessly with automated scheduling and instant Stripe checkout.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white font-bold text-sm shadow-gold-btn transition-all flex items-center justify-center gap-2 group"
              >
                Launch Your Business Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/book"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-[#161C2E] hover:bg-[#F6F2EA] dark:hover:bg-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] font-bold text-sm border border-[#DDD6C9] dark:border-[#27314A] transition-all flex items-center justify-center gap-2 shadow-warm-sm"
              >
                <Calendar className="w-4.5 h-4.5 text-[#C69A4B]" /> Test Live Booking Demo
              </Link>
            </div>

            <p className="text-xs text-[#8B857D] dark:text-[#A0A8B8] flex items-center justify-center gap-1.5 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#5C9E6E]" /> 14-day free trial • No credit card required • Instant setup
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
