"use client";

import { ArrowRight } from "lucide-react";

export function PlatformScene() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden text-charcoal-body">
      
      {/* Decorative minimalistic line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-[#C69A4B]/20"></div>

      {/* Container */}
      <div className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center text-center z-10">
        
        <div className="scene-platform-label text-sm font-semibold tracking-widest text-[#C69A4B] mb-8">
          06 — PLATFORM
        </div>
        
        <h2 className="scene-platform-headline text-5xl md:text-7xl font-bold leading-tight text-charcoal-heading mb-8 max-w-3xl mx-auto">
          MORE THAN A WEBSITE.<br />A BUSINESS THAT RUNS.
        </h2>
        
        <p className="scene-platform-subline text-lg text-charcoal-body/70 max-w-2xl mb-12 tracking-wide">
          Bookings · Services · Staff · Customers · Payments · Analytics
        </p>
        
        <div className="scene-platform-cta flex flex-col sm:flex-row items-center gap-4">
          <button className="bg-[#C69A4B] text-white px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-[#b0873e] transition-colors flex items-center gap-2">
            VIEW CASE STUDY <ArrowRight className="w-4 h-4" />
          </button>
          
          <button className="bg-transparent border border-charcoal-heading/20 text-charcoal-heading px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-sand-100 transition-colors">
            BUILD WITH BUSINESSFLOW
          </button>
        </div>

      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-t from-transparent to-[#C69A4B]/20"></div>
    </div>
  );
}
