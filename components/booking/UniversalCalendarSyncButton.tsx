"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  Download,
  ExternalLink,
  Check,
} from "lucide-react";
import {
  getGoogleCalendarUrl,
  getOutlookWebUrl,
  getOffice365Url,
  downloadICSFile,
  CalendarEventParams,
} from "@/utils/calendar";

interface UniversalCalendarSyncButtonProps {
  title: string;
  description: string;
  location?: string;
  startTime: string | Date;
  endTime: string | Date;
  filename?: string;
  variant?: "primary" | "secondary" | "compact";
  className?: string;
}

export default function UniversalCalendarSyncButton({
  title,
  description,
  location = "Online Executive Consultation",
  startTime,
  endTime,
  filename,
  variant = "primary",
  className = "",
}: UniversalCalendarSyncButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const start = startTime instanceof Date ? startTime : new Date(startTime);
  const end = endTime instanceof Date ? endTime : new Date(endTime);

  const eventParams: CalendarEventParams = {
    title,
    description,
    location,
    startTime: start,
    endTime: end,
  };

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleDownloadICS = () => {
    downloadICSFile({
      ...eventParams,
      filename: filename || `coredesk-appointment-${start.toISOString().split("T")[0]}.ics`,
    });
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setIsOpen(false);
    }, 1500);
  };

  const handleOpenWebUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const buttonStyles = {
    primary:
      "px-5 py-2.5 rounded-2xl bg-[#37261A] hover:bg-[#493323] text-[#F5F2EB] border border-[#37261A]/80 shadow-[0_8px_20px_rgba(55,38,26,0.22)] font-semibold text-xs transition-all duration-200 flex items-center gap-2.5 active:scale-98",
    secondary:
      "px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-[#1E1E1E]/80 hover:bg-white dark:hover:bg-[#1E1E1E] text-[#1E1E1E] dark:text-[#F5F2EB] border border-[#C8C1B4] dark:border-[#37261A] shadow-xs font-semibold text-xs backdrop-blur-xl transition-all duration-200 flex items-center gap-2.5 active:scale-98",
    compact:
      "px-3 py-1.5 rounded-xl bg-white/70 dark:bg-[#1E1E1E]/70 hover:bg-white dark:hover:bg-[#1E1E1E] text-[#1E1E1E] dark:text-[#F5F2EB] border border-[#C8C1B4]/70 dark:border-[#37261A]/70 text-[11px] font-medium backdrop-blur-md transition-all duration-200 flex items-center gap-1.5",
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={buttonStyles[variant]}
      >
        <CalendarIcon className="w-3.5 h-3.5 text-[#C69A4B] shrink-0" />
        <span>Add to Calendar</span>
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-64 rounded-2xl bg-[#FAF8F5]/95 dark:bg-[#18120D]/95 backdrop-blur-2xl border border-[#C8C1B4] dark:border-[#37261A]/80 shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-[#C8C1B4]/40 dark:border-[#37261A]/50 mb-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#5D554A] dark:text-[#AAA194]">
              Select Calendar Provider
            </p>
          </div>

          <div className="space-y-1">
            {/* Google Calendar */}
            <button
              type="button"
              onClick={() => handleOpenWebUrl(getGoogleCalendarUrl(eventParams))}
              className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-[#1E1E1E] dark:text-[#F5F2EB] hover:bg-[#37261A]/10 dark:hover:bg-[#37261A]/40 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#4285F4]/15 text-[#4285F4] flex items-center justify-center font-bold text-[11px]">
                  G
                </span>
                <span>Google Calendar</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#5D554A] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Apple Calendar / iCal */}
            <button
              type="button"
              onClick={handleDownloadICS}
              className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-[#1E1E1E] dark:text-[#F5F2EB] hover:bg-[#37261A]/10 dark:hover:bg-[#37261A]/40 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 text-[#1E1E1E] dark:text-[#F5F2EB] flex items-center justify-center font-bold text-[11px]">
                  
                </span>
                <span>Apple Calendar (iCal)</span>
              </div>
              {downloadSuccess ? (
                <Check className="w-3.5 h-3.5 text-[#5C9E6E]" />
              ) : (
                <Download className="w-3.5 h-3.5 text-[#5D554A] opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>

            {/* Outlook Web */}
            <button
              type="button"
              onClick={() => handleOpenWebUrl(getOutlookWebUrl(eventParams))}
              className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-[#1E1E1E] dark:text-[#F5F2EB] hover:bg-[#37261A]/10 dark:hover:bg-[#37261A]/40 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#0078D4]/15 text-[#0078D4] flex items-center justify-center font-bold text-[11px]">
                  O
                </span>
                <span>Outlook.com Web</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#5D554A] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Microsoft 365 */}
            <button
              type="button"
              onClick={() => handleOpenWebUrl(getOffice365Url(eventParams))}
              className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold text-[#1E1E1E] dark:text-[#F5F2EB] hover:bg-[#37261A]/10 dark:hover:bg-[#37261A]/40 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-[#D83B01]/15 text-[#D83B01] flex items-center justify-center font-bold text-[11px]">
                  M
                </span>
                <span>Microsoft 365</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#5D554A] opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Download universal .ICS */}
            <div className="pt-1 mt-1 border-t border-[#C8C1B4]/30 dark:border-[#37261A]/40">
              <button
                type="button"
                onClick={handleDownloadICS}
                className="w-full px-3 py-2 rounded-xl text-left text-[11px] font-medium text-[#5D554A] dark:text-[#AAA194] hover:bg-[#37261A]/10 dark:hover:bg-[#37261A]/40 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-[#C69A4B]" />
                  <span>Download .ICS File</span>
                </div>
                {downloadSuccess && <span className="text-[10px] text-[#5C9E6E] font-bold">Downloaded</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
