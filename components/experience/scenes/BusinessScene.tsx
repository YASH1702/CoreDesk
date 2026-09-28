"use client";

import React from "react";
import { SCENES } from "../../../constants/motion";

export default function BusinessScene() {
  const sceneData = SCENES.find((s) => s.id === "business");

  return (
    <section className="w-full h-screen relative bg-scene-business flex items-center justify-center overflow-hidden z-scene-bg">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-scene-content">
        {/* Left Content */}
        <div className="flex flex-col relative z-scene-typography">
          {/* Label */}
          <div 
            className="scene-business-label flex items-center gap-3 mb-8"
            style={{ opacity: 0, transform: "translateX(-40px)" }}
          >
            <div className="w-8 h-[1px] bg-gold-primary"></div>
            <span className="text-label-sm uppercase text-gold-primary tracking-widest font-bold">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Headline */}
          <h1 className="scene-business-headline text-display-xl text-charcoal-heading flex flex-wrap gap-x-4 gap-y-2 mb-6">
            <span style={{ opacity: 0, transform: "translateX(-80px)", display: "inline-block" }} className="scene-business-word">YOUR</span>
            <span style={{ opacity: 0, transform: "translateX(-80px)", display: "inline-block" }} className="scene-business-word">BUSINESS,</span>
            <span style={{ opacity: 0, transform: "translateX(-80px)", display: "inline-block" }} className="scene-business-word text-gold-primary">BEAUTIFULLY</span>
            <span style={{ opacity: 0, transform: "translateX(-80px)", display: "inline-block" }} className="scene-business-word">CONNECTED.</span>
          </h1>

          {/* Subline */}
          <p 
            className="scene-business-subline text-charcoal-body text-lg md:text-xl max-w-md mb-10 leading-relaxed"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            {sceneData?.subline}
          </p>

          {/* CTA */}
          <div 
            className="scene-business-cta"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <button className="bg-gold-primary hover:bg-gold-hover text-white px-8 py-4 rounded-full font-semibold shadow-gold-btn transition-colors">
              Explore the Platform
            </button>
          </div>
        </div>

        {/* Right Content - Product Panel */}
        <div 
          className="scene-business-panel relative z-scene-ui"
          style={{ opacity: 0, transform: "translateX(200px)" }}
        >
          <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-28 shadow-glass-card p-6 md:p-8">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-primary/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold-primary rounded-16 flex items-center justify-center text-white font-bold text-xl">
                  B
                </div>
                <div>
                  <h3 className="text-charcoal-heading font-bold text-lg">Luxe Studio</h3>
                  <p className="text-charcoal-secondary text-sm">Dashboard Overview</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-status-success"></div>
                <div className="w-3 h-3 rounded-full bg-status-warning"></div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/80 rounded-16 p-5 border border-border-secondary shadow-warm-sm flex justify-between items-center">
                <div>
                  <p className="text-charcoal-secondary text-sm font-medium mb-1">Today's Revenue</p>
                  <p className="text-charcoal-heading font-bold text-2xl">₹12,400</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold-cream flex items-center justify-center text-gold-primary">
                  ↑
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 rounded-16 p-5 border border-border-secondary shadow-warm-sm">
                  <p className="text-charcoal-secondary text-sm font-medium mb-1">Confirmed</p>
                  <p className="text-charcoal-heading font-bold text-xl">18 Bookings</p>
                </div>
                <div className="bg-white/80 rounded-16 p-5 border border-border-secondary shadow-warm-sm">
                  <p className="text-charcoal-secondary text-sm font-medium mb-1">Active Staff</p>
                  <p className="text-charcoal-heading font-bold text-xl">8 Online</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative element behind panel */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
