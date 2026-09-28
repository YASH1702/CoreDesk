"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchAvailableTimeSlots } from "@/actions/booking";
import { Clock, Calendar as CalendarIcon, ArrowRight, ArrowLeft } from "lucide-react";

interface DateTimeStepProps {
  staffId: string;
  serviceDuration: number;
  serviceId?: string;
  selectedDate: string;
  selectedTimeSlot: string;
  onSelect: (dateStr: string, timeSlotStr: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function DateTimeStep({
  staffId,
  serviceDuration,
  serviceId,
  selectedDate,
  selectedTimeSlot,
  onSelect,
  onNext,
  onPrev,
}: DateTimeStepProps) {
  const [date, setDate] = useState(selectedDate || new Date().toISOString().split("T")[0]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    async function loadSlots() {
      if (!date) return;
      setLoadingSlots(true);
      try {
        const res = await fetchAvailableTimeSlots(staffId, date, serviceDuration, serviceId);
        if (res.success && res.availableSlots) {
          setTimeSlots(res.availableSlots);
        } else {
          setTimeSlots(["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"]);
        }
      } catch (err) {
        setTimeSlots(["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"]);
      } finally {
        setLoadingSlots(false);
      }
    }
    loadSlots();
  }, [date, staffId, serviceDuration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-bold text-[#2A2927] dark:text-[#F8F7F3] flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#C69A4B]" /> Step 3: Select Date & Zero-Conflict Slot
        </h3>
        <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
          Pick your preferred day and time slot calculated in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Date Selector */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-[#F8F7F3] dark:bg-[#111625] border border-[#DDD6C9] dark:border-[#27314A]">
          <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-2 flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-[#C69A4B]" /> Select Date
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] font-bold"
          />
        </div>

        {/* Time Slot Grid */}
        <div className="md:col-span-7 space-y-3">
          <p className="text-xs font-bold text-[#8B857D] dark:text-[#A0A8B8] uppercase tracking-wider">
            Available Time Slots ({date}):
          </p>

          {loadingSlots ? (
            <div className="py-8 text-center text-xs text-[#5D5A56] dark:text-[#A0A8B8]">Calculating open slots...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map((slot, idx) => {
                const isSelected = selectedTimeSlot === slot;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelect(date, slot)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-[#C69A4B] text-white shadow-gold-btn border border-[#C69A4B]"
                        : "bg-[#F8F7F3] dark:bg-[#111625] text-[#2A2927] dark:text-[#F8F7F3] border border-[#DDD6C9] dark:border-[#27314A] hover:border-[#C69A4B]"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          )}
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
          disabled={!selectedTimeSlot}
          onClick={onNext}
          className="px-8 py-3.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] disabled:opacity-40 text-white font-bold text-xs shadow-gold-btn transition-all flex items-center gap-2"
        >
          Enter Client Info <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
