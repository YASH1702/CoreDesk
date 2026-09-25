"use client";

import React from "react";
import { downloadICSFile } from "@/utils/calendar";
import { Calendar, Download } from "lucide-react";

interface CalendarDownloadButtonProps {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  filename?: string;
}

export default function CalendarDownloadButton({
  title,
  description,
  location,
  startTime,
  endTime,
  filename,
}: CalendarDownloadButtonProps) {
  const handleDownload = () => {
    downloadICSFile({
      title,
      description,
      location,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      filename,
    });
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="px-5 py-2.5 rounded-2xl bg-white hover:bg-[#F6F2EA] border border-[#DDD6C9] text-[#2A2927] text-xs font-semibold shadow-warm-sm transition-all flex items-center gap-2"
    >
      <Download className="w-4 h-4 text-[#C69A4B]" />
      Download Calendar Invite (.ics)
    </button>
  );
}
