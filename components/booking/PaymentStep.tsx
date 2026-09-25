"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createBookingAction } from "@/actions/booking";
import { CreditCard, ShieldCheck, CheckCircle2, Lock, ArrowLeft } from "lucide-react";

interface PaymentStepProps {
  data: any;
  onPrev: () => void;
}

export default function PaymentStep({ data, onPrev }: PaymentStepProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSimulatedPayment = async () => {
    setSubmitting(true);
    setError("");

    try {
      const res = await createBookingAction({
        serviceId: data.serviceId,
        staffId: data.staffId,
        date: data.date,
        timeSlot: data.timeSlot,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        notes: data.notes,
      });

      if (res.success && res.appointmentId) {
        router.push(`/book/confirmation/${res.appointmentId}`);
      } else {
        setError(res.error || "Failed to finalize booking.");
      }
    } catch (err) {
      setError("An unexpected server error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-bold text-[#2A2927] dark:text-[#F8F7F3] flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-[#C69A4B]" /> Step 5: Order Summary & Stripe Payment
        </h3>
        <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
          Review your appointment details and complete payment settlement.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-xs">
          {error}
        </div>
      )}

      {/* Summary Card */}
      <div className="p-6 rounded-2xl bg-[#F8F7F3] dark:bg-[#111625] border border-[#DDD6C9] dark:border-[#27314A] space-y-4">
        <h4 className="text-sm font-bold text-[#2A2927] dark:text-[#F8F7F3] border-b border-[#ECE6D8] dark:border-[#27314A] pb-3">
          Appointment Reservation Breakdown
        </h4>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[#8B857D] dark:text-[#A0A8B8]">Service Package</span>
            <p className="font-bold text-[#2A2927] dark:text-[#F8F7F3]">{data.serviceTitle}</p>
          </div>
          <div>
            <span className="text-[#8B857D] dark:text-[#A0A8B8]">Specialist</span>
            <p className="font-bold text-[#2A2927] dark:text-[#F8F7F3]">{data.staffName}</p>
          </div>
          <div>
            <span className="text-[#8B857D] dark:text-[#A0A8B8]">Scheduled Date</span>
            <p className="font-bold text-[#2A2927] dark:text-[#F8F7F3]">{data.date}</p>
          </div>
          <div>
            <span className="text-[#8B857D] dark:text-[#A0A8B8]">Time Slot</span>
            <p className="font-bold text-[#2A2927] dark:text-[#F8F7F3]">{data.timeSlot}</p>
          </div>
          <div>
            <span className="text-[#8B857D] dark:text-[#A0A8B8]">Client Name</span>
            <p className="font-bold text-[#2A2927] dark:text-[#F8F7F3]">{data.customerName}</p>
          </div>
          <div>
            <span className="text-[#8B857D] dark:text-[#A0A8B8]">Contact Email</span>
            <p className="font-bold text-[#2A2927] dark:text-[#F8F7F3]">{data.customerEmail}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#ECE6D8] dark:border-[#27314A] flex items-center justify-between">
          <span className="text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3]">Total Amount Due:</span>
          <span className="text-xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">${data.servicePrice}.00</span>
        </div>
      </div>

      {/* Simulated Stripe Checkout Input */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3]">
          <span className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#5C9E6E]" /> 256-bit Encrypted Card Payment
          </span>
          <span className="text-[#C69A4B]">Stripe Direct</span>
        </div>

        <input
          type="text"
          disabled
          value="•••• •••• •••• 4242 (Stripe Sandbox Demo)"
          className="w-full p-3 rounded-xl glass-input text-xs font-mono text-[#8B857D] dark:text-[#A0A8B8] bg-[#F8F7F3] dark:bg-[#111625]"
        />
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onPrev}
          className="px-6 py-3 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] font-bold text-xs flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Edit Contact Info
        </button>
        <button
          disabled={submitting}
          onClick={handleSimulatedPayment}
          className="px-8 py-3.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white font-bold text-xs shadow-gold-btn transition-all flex items-center gap-2"
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" /> Confirm & Pay ${data.servicePrice}.00
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
