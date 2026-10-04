"use client";

import React from "react";
import UniversalCalendarSyncButton from "./UniversalCalendarSyncButton";

interface CalendarDownloadButtonProps {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  filename?: string;
  variant?: "primary" | "secondary" | "compact";
  className?: string;
}

export default function CalendarDownloadButton({
  title,
  description,
  location,
  startTime,
  endTime,
  filename,
  variant = "secondary",
  className = "",
}: CalendarDownloadButtonProps) {
  return (
    <UniversalCalendarSyncButton
      title={title}
      description={description}
      location={location}
      startTime={startTime}
      endTime={endTime}
      filename={filename}
      variant={variant}
      className={className}
    />
  );
}
