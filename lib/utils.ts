import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

export function getStatusBadgeClass(status: string): string {
  switch (status.toUpperCase()) {
    case "CONFIRMED":
    case "PAID":
    case "COMPLETED":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "PENDING":
    case "UNPAID":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "CANCELLED":
    case "FAILED":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    case "IN_PROGRESS":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}
