"use client";

import { Calendar } from "lucide-react";

export function StaffScene() {
  return (
    <div className="min-h-screen w-full flex items-center bg-gradient-to-br from-sand-100 to-sand-300 relative overflow-hidden text-charcoal-body">
      {/* Container */}
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between gap-12 z-10">
        
        {/* Left: Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="scene-staff-label text-sm font-semibold tracking-widest text-[#C69A4B] mb-6">
            03 — TEAM
          </div>
          <h2 className="scene-staff-headline text-5xl md:text-6xl font-bold leading-tight text-charcoal-heading mb-6">
            YOUR TEAM SEES<br />THE OPERATION.
          </h2>
          <p className="scene-staff-subline text-lg text-charcoal-body/80 max-w-md">
            Staff schedules, appointment timelines, availability management, and daily workload — at a glance.
          </p>
        </div>

        {/* Right: Panel */}
        <div className="scene-staff-panel w-full md:w-1/2 bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-2xl relative">
          
          <div className="flex flex-col gap-6">
            {/* Staff Card 1 */}
            <div className="scene-staff-stagger bg-white rounded-2xl p-4 shadow-sm border border-sand-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-lg">AM</div>
              <div className="flex-1">
                <h4 className="font-semibold text-charcoal-heading">Aarav Mehta</h4>
                <p className="text-sm text-charcoal-body/70">Senior Specialist</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-[#C69A4B] bg-[#C69A4B]/10 px-2 py-1 rounded-full">
                  4 appointments today
                </div>
              </div>
            </div>

            {/* Staff Card 2 */}
            <div className="scene-staff-stagger bg-white rounded-2xl p-4 shadow-sm border border-sand-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">MK</div>
              <div className="flex-1">
                <h4 className="font-semibold text-charcoal-heading">Maya Kapoor</h4>
                <p className="text-sm text-charcoal-body/70">Lead Consultant</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-[#C69A4B] bg-[#C69A4B]/10 px-2 py-1 rounded-full">
                  3 appointments today
                </div>
              </div>
            </div>

            {/* Staff Card 3 */}
            <div className="scene-staff-stagger bg-white rounded-2xl p-4 shadow-sm border border-sand-200 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">RD</div>
              <div className="flex-1">
                <h4 className="font-semibold text-charcoal-heading">Rohan Desai</h4>
                <p className="text-sm text-charcoal-body/70">Junior Specialist</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium text-[#C69A4B] bg-[#C69A4B]/10 px-2 py-1 rounded-full">
                  5 appointments today
                </div>
              </div>
            </div>

            {/* Today's Schedule Mini-Timeline */}
            <div className="scene-staff-stagger mt-2">
              <div className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C69A4B]" />
                <span>Today's Schedule</span>
              </div>
              <div className="w-full h-8 bg-sand-200 rounded-md relative flex items-center px-1 gap-1">
                <div className="absolute -top-5 left-0 text-[10px] text-charcoal-body/50">9 AM</div>
                <div className="absolute -top-5 right-0 text-[10px] text-charcoal-body/50">5 PM</div>
                
                <div className="h-6 w-1/4 bg-[#C69A4B]/80 rounded-sm ml-2"></div>
                <div className="h-6 w-1/6 bg-[#C69A4B]/80 rounded-sm ml-4"></div>
                <div className="h-6 w-1/3 bg-[#C69A4B]/80 rounded-sm ml-8"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
