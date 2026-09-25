"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

interface StaffPickerStepProps {
  staffList: any[];
  selectedStaffId: string;
  onSelect: (staff: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StaffPickerStep({
  staffList,
  selectedStaffId,
  onSelect,
  onNext,
  onPrev,
}: StaffPickerStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-bold text-[#2A2927] dark:text-[#F8F7F3] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#C69A4B]" /> Step 2: Choose Your Specialist
        </h3>
        <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
          Select an available team member or choose "Any Available Specialist".
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {staffList.map((st) => {
          const isSelected = selectedStaffId === st.id;
          return (
            <div
              key={st.id}
              onClick={() => onSelect(st)}
              className={`p-5 rounded-2xl cursor-pointer border text-center transition-all ${
                isSelected
                  ? "border-[#C69A4B] bg-[#FFF8ED] dark:bg-[#1B2238] shadow-warm-sm"
                  : "border-[#DDD6C9] dark:border-[#27314A] bg-[#F8F7F3] dark:bg-[#111625] hover:border-[#C69A4B]"
              }`}
            >
              {st.avatar ? (
                <img
                  src={st.avatar}
                  alt={st.user?.name}
                  className="w-16 h-16 rounded-2xl mx-auto object-cover border-2 border-[#C69A4B]/40 mb-3"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-[#FFF8ED] dark:bg-[#1B2238] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A] flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {st.user?.name?.charAt(0) || "S"}
                </div>
              )}

              <h4 className="text-sm font-bold text-[#2A2927] dark:text-[#F8F7F3]">{st.user?.name}</h4>
              <p className="text-xs text-[#8B857D] dark:text-[#A0A8B8] mt-0.5">{st.title || "Specialist"}</p>

              {isSelected && (
                <div className="mt-3 text-xs font-bold text-[#C69A4B] flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#5C9E6E]" /> Selected
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onPrev}
          className="px-6 py-3 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] font-bold text-xs flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous Step
        </button>
        <button
          disabled={!selectedStaffId}
          onClick={onNext}
          className="px-8 py-3.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] disabled:opacity-40 text-white font-bold text-xs shadow-gold-btn transition-all flex items-center gap-2"
        >
          Select Date & Time <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
