"use client";

import { Calendar, TrendingUp, Users, Star } from "lucide-react";

export function ControlScene() {
  return (
    <div className="min-h-screen w-full flex items-center bg-gradient-to-br from-sand-200 to-sand-400 relative overflow-hidden text-charcoal-body">
      {/* Container */}
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row items-center justify-between gap-12 z-10">
        
        {/* Left: Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="scene-control-label text-sm font-semibold tracking-widest text-[#C69A4B] mb-6">
            04 — CONTROL
          </div>
          <h2 className="scene-control-headline text-5xl md:text-6xl font-bold leading-tight text-charcoal-heading mb-6">
            EVERYTHING HAPPENING.<br />ONE PLACE.
          </h2>
          <p className="scene-control-subline text-lg text-charcoal-body/80 max-w-md">
            Bookings, revenue, customer growth, service performance, and payment analytics — unified command.
          </p>
        </div>

        {/* Right: Panel */}
        <div className="scene-control-panel w-full md:w-1/2 bg-white/80 backdrop-blur-lg border border-white/50 rounded-3xl p-8 shadow-2xl relative">
          
          {/* Top Row: Metric Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="scene-control-stagger bg-white rounded-xl p-5 shadow-sm border border-sand-200 flex flex-col">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-charcoal-heading">248</div>
              <div className="text-sm text-charcoal-body/70">Bookings</div>
            </div>
            <div className="scene-control-stagger bg-white rounded-xl p-5 shadow-sm border border-sand-200 flex flex-col">
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-3">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-charcoal-heading">₹1,24,500</div>
              <div className="text-sm text-charcoal-body/70">Revenue</div>
            </div>
            <div className="scene-control-stagger bg-white rounded-xl p-5 shadow-sm border border-sand-200 flex flex-col">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-charcoal-heading">86</div>
              <div className="text-sm text-charcoal-body/70">New Customers</div>
            </div>
            <div className="scene-control-stagger bg-white rounded-xl p-5 shadow-sm border border-sand-200 flex flex-col">
              <div className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center mb-3">
                <Star className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold text-charcoal-heading">4.8</div>
              <div className="text-sm text-charcoal-body/70">Rating</div>
            </div>
          </div>

          {/* Revenue Chart Placeholder */}
          <div className="scene-control-stagger bg-white rounded-xl p-6 shadow-sm border border-sand-200 mb-6">
            <div className="text-sm font-semibold mb-4 text-charcoal-heading">Weekly Revenue</div>
            <div className="h-32 w-full flex items-end justify-between gap-2 relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="w-full border-t border-sand-200/50 h-0"></div>
                <div className="w-full border-t border-sand-200/50 h-0"></div>
                <div className="w-full border-t border-sand-200/50 h-0"></div>
                <div className="w-full border-t border-sand-200/50 h-0"></div>
              </div>
              {/* Bars */}
              <div className="w-full bg-gradient-to-t from-[#C69A4B] to-[#E3BE79] rounded-t-sm h-[40%] z-10"></div>
              <div className="w-full bg-gradient-to-t from-[#C69A4B] to-[#E3BE79] rounded-t-sm h-[60%] z-10"></div>
              <div className="w-full bg-gradient-to-t from-[#C69A4B] to-[#E3BE79] rounded-t-sm h-[30%] z-10"></div>
              <div className="w-full bg-gradient-to-t from-[#C69A4B] to-[#E3BE79] rounded-t-sm h-[80%] z-10"></div>
              <div className="w-full bg-gradient-to-t from-[#C69A4B] to-[#E3BE79] rounded-t-sm h-[50%] z-10"></div>
              <div className="w-full bg-gradient-to-t from-[#C69A4B] to-[#E3BE79] rounded-t-sm h-[90%] z-10"></div>
              <div className="w-full bg-gradient-to-t from-[#C69A4B] to-[#E3BE79] rounded-t-sm h-[100%] z-10"></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-charcoal-body/50 px-1">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
          </div>

          {/* Top Services Mini-List */}
          <div className="scene-control-stagger">
            <div className="text-sm font-semibold mb-3 text-charcoal-heading">Top Services</div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm border-b border-sand-200 pb-2">
                <span>Premium Consultation</span>
                <span className="font-semibold">₹45,000</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-sand-200 pb-2">
                <span>Standard Review</span>
                <span className="font-semibold">₹32,000</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Initial Assessment</span>
                <span className="font-semibold">₹18,500</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
