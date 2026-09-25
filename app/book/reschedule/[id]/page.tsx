"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { rescheduleBooking, cancelBooking } from "@/actions/booking";
import { Calendar, Clock, AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ReschedulePage() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.id as string;

  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReschedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newTime) {
      setError("Please select a new date and time.");
      return;
    }
    setSubmitting(true);
    setError("");

    const res = await rescheduleBooking(appointmentId, newDate, newTime);

    setSubmitting(false);

    if (res.success) {
      setMessage("Appointment successfully rescheduled!");
      setTimeout(() => {
        router.push(`/book/confirmation/${appointmentId}`);
      }, 1500);
    } else {
      setError(res.error || "Failed to reschedule appointment.");
    }
  };

  const handleCancel = async () => {
    if (!confirm("Are you sure you wish to cancel this appointment?")) return;
    setSubmitting(true);
    setError("");

    const res = await cancelBooking({
      appointmentId,
      reason: reason || "Client requested cancellation",
    });

    setSubmitting(false);

    if (res.success) {
      setMessage("Appointment successfully cancelled.");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      setError(res.error || "Failed to cancel appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#2A2927] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-xl mx-auto space-y-8 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xs text-[#5D5A56] hover:text-[#2A2927] flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to website
          </Link>
          <span className="text-xs font-bold text-[#C69A4B] font-mono">Ref #{appointmentId.substring(0, 8)}</span>
        </div>

        <div className="glass-panel p-8 rounded-3xl border border-[#DDD6C9] bg-[#FFFCF7]/95 shadow-warm-lg space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#2A2927]">Manage Booking</h1>
            <p className="text-xs text-[#5D5A56] mt-1">Reschedule your session date/time or request cancellation.</p>
          </div>

          {message && (
            <div className="p-3.5 rounded-2xl bg-[#5C9E6E]/15 border border-[#5C9E6E]/30 text-[#5C9E6E] text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleReschedule} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#2A2927] mb-1.5">New Session Date</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2A2927] mb-1.5">New Start Time</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-2xl glass-input text-xs text-[#2A2927]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-gold-btn transition-all flex items-center justify-center gap-2"
            >
              {submitting ? "Processing..." : "Confirm Reschedule"}
            </button>
          </form>

          <div className="pt-6 border-t border-[#ECE6D8] space-y-3">
            <h4 className="text-xs font-bold text-rose-600">Need to cancel entirely?</h4>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for cancellation (optional)..."
              className="w-full px-3.5 py-2 rounded-2xl glass-input text-xs text-[#2A2927] placeholder-[#B8B2A8]"
            />
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="w-full py-2.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 border border-rose-500/20 text-xs font-bold transition-all"
            >
              Cancel Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
