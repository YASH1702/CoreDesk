"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, FileText, ArrowRight, ArrowLeft } from "lucide-react";

interface CustomerDetailsStepProps {
  data: any;
  onChange: (field: string, val: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CustomerDetailsStep({
  data,
  onChange,
  onNext,
  onPrev,
}: CustomerDetailsStepProps) {
  const isValid = data.customerName && data.customerEmail && data.customerPhone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-bold text-[#2A2927] dark:text-[#F8F7F3] flex items-center gap-2">
          <User className="w-5 h-5 text-[#C69A4B]" /> Step 4: Client Contact Information
        </h3>
        <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
          Provide your details to receive instant calendar invitations (.ics) and receipts.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">Full Name</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B857D] dark:text-[#A0A8B8]" />
            <input
              type="text"
              value={data.customerName}
              onChange={(e) => onChange("customerName", e.target.value)}
              placeholder="Eleanor Vance"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] placeholder-[#B8B2A8] dark:placeholder-[#717C94]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">Email address</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B857D] dark:text-[#A0A8B8]" />
            <input
              type="email"
              value={data.customerEmail}
              onChange={(e) => onChange("customerEmail", e.target.value)}
              placeholder="eleanor@company.com"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] placeholder-[#B8B2A8] dark:placeholder-[#717C94]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">Phone Number</label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B857D] dark:text-[#A0A8B8]" />
            <input
              type="tel"
              value={data.customerPhone}
              onChange={(e) => onChange("customerPhone", e.target.value)}
              placeholder="+1 (555) 234-5678"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] placeholder-[#B8B2A8] dark:placeholder-[#717C94]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">Appointment Notes (Optional)</label>
          <div className="relative">
            <FileText className="w-4 h-4 absolute left-3.5 top-3 text-[#8B857D] dark:text-[#A0A8B8]" />
            <textarea
              rows={3}
              value={data.notes}
              onChange={(e) => onChange("notes", e.target.value)}
              placeholder="Any specific requests or preparation details..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] placeholder-[#B8B2A8] dark:placeholder-[#717C94]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onPrev}
          className="px-6 py-3 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] font-bold text-xs flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous Step
        </button>
        <button
          disabled={!isValid}
          onClick={onNext}
          className="px-8 py-3.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] disabled:opacity-40 text-white font-bold text-xs shadow-gold-btn transition-all flex items-center gap-2"
        >
          Proceed to Stripe Checkout <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
