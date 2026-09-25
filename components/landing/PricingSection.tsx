"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, Shield } from "lucide-react";

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);

  const tiers = [
    {
      name: "Starter Practice",
      priceMonthly: 29,
      priceAnnual: 24,
      description: "Perfect for independent consultants, solo stylists, and single-location practices.",
      features: [
        "Up to 3 Staff Members",
        "Unlimited Services & Appointments",
        "Real-Time Availability Calculation",
        "Stripe Payments & Invoicing",
        "Email Booking Confirmations",
        "Warm Sand Web Booking Portal",
      ],
      ctaText: "Start Starter Plan",
      highlighted: false,
    },
    {
      name: "Growth Enterprise",
      priceMonthly: 79,
      priceAnnual: 65,
      description: "Designed for scaling practices, multi-specialist clinics, centers, and agencies.",
      features: [
        "Up to 15 Staff Members",
        "Multi-Staff Service Mapping",
        "No-Code Dynamic CMS Editor",
        "SMS & WhatsApp Booking Reminders",
        "Custom Business Branding & Subdomain",
        "Stripe Refunds & Partial Deposits",
        "Advanced Analytics & Export Reports",
        "Priority 24/7 Enterprise Support",
      ],
      ctaText: "Start 14-Day Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise Network",
      priceMonthly: 199,
      priceAnnual: 165,
      description: "For corporate chains, franchise operations, and multi-location enterprise networks.",
      features: [
        "Unlimited Staff Members & Locations",
        "Dedicated Database & SLA Guarantees",
        "Custom API & Webhook Integrations",
        "White-label Custom Domain Setup",
        "HIPAA & SOC-2 Compliance Security",
        "Dedicated Account Executive",
      ],
      ctaText: "Contact Enterprise Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative z-10 border-t border-[#DDD6C9] dark:border-[#27314A] bg-[#F2EFE6]/50 dark:bg-[#111625]/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold text-[#C69A4B] uppercase tracking-widest mb-3">
            Transparent Pricing Plans
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight">
            Predictable Costs for High-Growth Businesses
          </p>
          <p className="text-sm text-[#5D5A56] dark:text-[#A0A8B8] mt-3">
            Zero hidden fees. Full access to appointment booking, staff management, and custom CMS.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl glass-panel border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#1B2238]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                !annual
                  ? "bg-[#2A2927] dark:bg-[#F8F7F3] text-white dark:text-[#2A2927] shadow-warm-sm"
                  : "text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#2A2927] dark:hover:text-[#F8F7F3]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                annual ? "bg-[#C69A4B] text-white shadow-gold-btn" : "text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#2A2927] dark:hover:text-[#F8F7F3]"
              }`}
            >
              Annual Billing
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8ED] dark:bg-[#111625] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`rounded-3xl p-8 md:p-10 flex flex-col justify-between relative transition-all ${
                tier.highlighted
                  ? "glass-panel border-2 border-[#C69A4B] shadow-warm-lg dark:shadow-dark-lg bg-white dark:bg-[#1B2238] scale-105"
                  : "glass-panel border border-[#DDD6C9] dark:border-[#27314A] bg-[#FFFCF7] dark:bg-[#161C2E] hover:border-[#C69A4B]"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#C69A4B] text-white text-[11px] font-bold uppercase tracking-wider shadow-gold-btn">
                  Most Popular Choice
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-2">{tier.name}</h3>
                <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] leading-relaxed mb-6">{tier.description}</p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">
                    ${annual ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  <span className="text-xs text-[#8B857D] dark:text-[#A0A8B8]">/ month {annual ? "(billed annually)" : ""}</span>
                </div>

                <div className="space-y-3.5 pt-6 border-t border-[#ECE6D8] dark:border-[#27314A] mb-8">
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-xs text-[#5D5A56] dark:text-[#A0A8B8]">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#FFF8ED] dark:bg-[#111625] border border-[#E8D7B2] dark:border-[#27314A] text-[#C69A4B] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/signup"
                className={`w-full py-3.5 px-4 rounded-2xl text-xs font-bold text-center transition-all ${
                  tier.highlighted
                    ? "bg-[#C69A4B] hover:bg-[#B7863D] text-white shadow-gold-btn"
                    : "bg-white dark:bg-[#1B2238] hover:bg-[#F6F2EA] dark:hover:bg-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] border border-[#DDD6C9] dark:border-[#27314A]"
                }`}
              >
                {tier.ctaText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
