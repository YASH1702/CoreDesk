"use client";

import { Building, Layers, Users, UserCheck, Calendar, CreditCard, Bell, BarChart } from "lucide-react";

export function SystemScene() {
  const modules = [
    { id: "business", icon: Building, label: "Business", status: "Active", color: "text-slate-600 bg-slate-100" },
    { id: "services", icon: Layers, label: "Services", status: "12 listed", color: "text-blue-600 bg-blue-100" },
    { id: "customers", icon: Users, label: "Customers", status: "4.2k total", color: "text-purple-600 bg-purple-100" },
    { id: "staff", icon: UserCheck, label: "Staff", status: "8 online", color: "text-emerald-600 bg-emerald-100" },
    { id: "bookings", icon: Calendar, label: "Bookings", status: "24 today", color: "text-orange-600 bg-orange-100" },
    { id: "payments", icon: CreditCard, label: "Payments", status: "Verified", color: "text-green-600 bg-green-100" },
    { id: "notifications", icon: Bell, label: "Notifications", status: "Real-time", color: "text-red-600 bg-red-100" },
    { id: "analytics", icon: BarChart, label: "Analytics", status: "Live", color: "text-[#C69A4B] bg-[#C69A4B]/10" },
  ];

  return (
    <div className="min-h-screen w-full flex items-center bg-gradient-to-br from-sand-100 via-white to-sand-200 relative overflow-hidden text-charcoal-body">
      {/* Container */}
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row items-center justify-between gap-16 z-10">
        
        {/* Left: Text */}
        <div className="w-full lg:w-5/12 flex flex-col items-start">
          <div className="scene-system-label text-sm font-semibold tracking-widest text-[#C69A4B] mb-6">
            05 — SYSTEM
          </div>
          <h2 className="scene-system-headline text-5xl md:text-6xl font-bold leading-tight text-charcoal-heading mb-6">
            ONE SYSTEM.<br />EVERY MOVING PART.
          </h2>
          <p className="scene-system-subline text-lg text-charcoal-body/80 max-w-md">
            Business · Services · Customers · Staff · Bookings · Payments · Notifications · Analytics
          </p>
        </div>

        {/* Right: Panel (Grid visualization) */}
        <div className="scene-system-panel w-full lg:w-7/12 relative">
          {/* Connecting lines background */}
          <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
             <div className="absolute top-[25%] left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#C69A4B]/30 to-transparent"></div>
             <div className="absolute top-[75%] left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#C69A4B]/30 to-transparent"></div>
             <div className="absolute left-[33%] top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-[#C69A4B]/30 to-transparent"></div>
             <div className="absolute left-[66%] top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-[#C69A4B]/30 to-transparent"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
            {modules.map((mod, i) => (
              <div 
                key={mod.id} 
                className="scene-system-stagger bg-white/70 backdrop-blur-md border border-white rounded-2xl p-5 shadow-lg flex flex-col items-center text-center transform transition-transform hover:scale-105"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${mod.color}`}>
                  <mod.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-charcoal-heading text-sm mb-1">{mod.label}</h4>
                <p className="text-xs text-charcoal-body/60 font-medium">{mod.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
