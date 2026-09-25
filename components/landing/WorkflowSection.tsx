"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings, CalendarCheck, CreditCard, ShieldCheck, Zap } from "lucide-react";

export default function WorkflowSection() {
  const steps = [
    {
      number: "01",
      icon: Settings,
      title: "Configure Services & Specialist Shifts",
      description:
        "Define your service packages, prices, durations, buffer times, and assign specialists with individual working hours and break schedules.",
    },
    {
      number: "02",
      icon: CalendarCheck,
      title: "Share Translucent Booking Link",
      description:
        "Embed the booking widget directly on your site or share your custom URL. Clients select specialists and open slots in real time.",
    },
    {
      number: "03",
      icon: CreditCard,
      title: "Accept Stripe Deposits & Auto Sync",
      description:
        "Collect instant online payments or deposits via Stripe Checkout. Calendar invites (.ics), SMS reminders, and invoices are generated automatically.",
    },
  ];

  return (
    <section id="workflow" className="py-24 relative z-10 border-t border-[#DDD6C9] dark:border-[#27314A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold text-[#C69A4B] uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#C69A4B]" /> Automated Operations Engine
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight">
            From First Click to Paid Booking in 3 Steps
          </p>
          <p className="text-sm text-[#5D5A56] dark:text-[#A0A8B8] mt-3">
            Eliminate back-and-forth emails and missed appointments with automated availability calculations and instant online payment collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-panel-interactive p-8 rounded-3xl relative border border-[#DDD6C9] dark:border-[#27314A] flex flex-col justify-between bg-white dark:bg-[#1B2238]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF8ED] dark:bg-[#111625] border border-[#E8D7B2] dark:border-[#27314A] flex items-center justify-center text-[#C69A4B]">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-[#DDD6C9] dark:text-[#27314A] font-mono">{step.number}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#ECE6D8] dark:border-[#27314A] flex items-center text-xs font-bold text-[#B7863D] dark:text-[#E8D7B2] gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#5C9E6E]" /> Fully Automated Protocol
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
