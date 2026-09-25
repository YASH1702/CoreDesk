"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, ArrowRight, Layers } from "lucide-react";

interface ServiceSelectorStepProps {
  services: any[];
  selectedServiceId: string;
  onSelect: (service: any) => void;
  onNext: () => void;
}

export default function ServiceSelectorStep({
  services,
  selectedServiceId,
  onSelect,
  onNext,
}: ServiceSelectorStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-bold text-[#2A2927] dark:text-[#F8F7F3] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#C69A4B]" /> Step 1: Choose Your Service Package
        </h3>
        <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
          Select an appointment duration and service session to proceed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((svc) => {
          const isSelected = selectedServiceId === svc.id;
          return (
            <div
              key={svc.id}
              onClick={() => onSelect(svc)}
              className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                isSelected
                  ? "border-[#C69A4B] bg-[#FFF8ED] dark:bg-[#1B2238] shadow-warm-sm"
                  : "border-[#DDD6C9] dark:border-[#27314A] bg-[#F8F7F3] dark:bg-[#111625] hover:border-[#C69A4B]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-[#161C2E] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A]">
                    {svc.category || "General Session"}
                  </span>
                  <h4 className="text-base font-bold text-[#2A2927] dark:text-[#F8F7F3] mt-2">{svc.title}</h4>
                  <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1 leading-relaxed">{svc.description}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="text-lg font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">${svc.price}</span>
                  <span className="block text-[10px] text-[#8B857D] dark:text-[#A0A8B8] mt-0.5 flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3" /> {svc.duration} mins
                  </span>
                </div>
              </div>

              {isSelected && (
                <div className="mt-4 pt-3 border-t border-[#E8D7B2] dark:border-[#27314A] flex items-center justify-between text-xs font-bold text-[#C69A4B]">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#5C9E6E]" /> Package Selected
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-4">
        <button
          disabled={!selectedServiceId}
          onClick={onNext}
          className="px-8 py-3.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] disabled:opacity-40 text-white font-bold text-xs shadow-gold-btn transition-all flex items-center gap-2"
        >
          Continue to Specialist Selection <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
