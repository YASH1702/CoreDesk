"use client";

import React from "react";
import { SCENES } from "../../../constants/motion";

export default function CustomerScene() {
  const sceneData = SCENES.find((s) => s.id === "customer");

  return (
    <section className="w-full h-screen relative bg-scene-customer flex items-center justify-center overflow-hidden z-scene-bg">
      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-scene-content">
        {/* Left Content */}
        <div className="flex flex-col relative z-scene-typography">
          {/* Label */}
          <div 
            className="scene-customer-label flex items-center gap-3 mb-8"
            style={{ opacity: 0, transform: "translateX(-40px)" }}
          >
            <div className="w-8 h-[1px] bg-gold-primary"></div>
            <span className="text-label-sm uppercase text-gold-primary tracking-widest font-bold">
              {sceneData?.number} — {sceneData?.label}
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="scene-customer-headline text-display-xl text-charcoal-heading mb-6"
            style={{ opacity: 0, transform: "translateX(-80px)" }}
          >
            BOOKING SHOULDN'T<br/>FEEL LIKE WORK.
          </h1>

          {/* Subline */}
          <p 
            className="scene-customer-subline text-charcoal-body text-lg md:text-xl max-w-md leading-relaxed"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            {sceneData?.subline}
          </p>
        </div>

        {/* Right Content - Booking Flow */}
        <div 
          className="scene-customer-flow relative z-scene-ui h-[600px] flex items-center justify-center"
          style={{ opacity: 0, transform: "translateX(200px)" }}
        >
          {/* Connection Line */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-[2px] bg-gold-primary/20 -z-10 hidden md:block"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full max-h-[500px] w-[2px] bg-gold-primary/20 -z-10 md:hidden"></div>

          <div className="flex flex-col md:flex-row gap-6 relative">
            {/* Step 1: Service */}
            <div 
              className="scene-customer-step-1 bg-white/80 backdrop-blur-xl border border-white/60 rounded-16 shadow-glass-card p-4 w-48 relative md:translate-y-12"
              style={{ opacity: 0, transform: "translateX(50px)" }}
            >
              <div className="text-xs text-gold-primary font-bold mb-2">01 / SERVICE</div>
              <div className="font-bold text-charcoal-heading text-sm mb-1">Signature Haircut</div>
              <div className="flex justify-between text-xs text-charcoal-secondary">
                <span>45 min</span>
                <span>₹1,200</span>
              </div>
            </div>

            {/* Step 2: Date */}
            <div 
              className="scene-customer-step-2 bg-white/80 backdrop-blur-xl border border-white/60 rounded-16 shadow-glass-card p-4 w-48 relative md:-translate-y-4"
              style={{ opacity: 0, transform: "translateX(50px)" }}
            >
              <div className="text-xs text-gold-primary font-bold mb-2">02 / DATE</div>
              <div className="grid grid-cols-4 gap-1 mb-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`h-6 rounded flex items-center justify-center text-xs ${i === 4 ? 'bg-gold-primary text-white shadow-gold-btn' : 'bg-warm-sec text-charcoal-secondary'}`}>
                    {12 + i}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Staff */}
            <div 
              className="scene-customer-step-3 bg-white/80 backdrop-blur-xl border border-white/60 rounded-16 shadow-glass-card p-4 w-48 relative md:translate-y-8"
              style={{ opacity: 0, transform: "translateX(50px)" }}
            >
              <div className="text-xs text-gold-primary font-bold mb-2">03 / STAFF</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-cream border border-gold-primary/30 flex items-center justify-center text-gold-primary font-bold">
                  S
                </div>
                <div>
                  <div className="font-bold text-charcoal-heading text-sm">Sarah M.</div>
                  <div className="text-xs text-charcoal-secondary">Senior Stylist</div>
                </div>
              </div>
            </div>

            {/* Step 4: Time */}
            <div 
              className="scene-customer-step-4 bg-white/80 backdrop-blur-xl border border-white/60 rounded-16 shadow-glass-card p-4 w-48 relative md:-translate-y-8"
              style={{ opacity: 0, transform: "translateX(50px)" }}
            >
              <div className="text-xs text-gold-primary font-bold mb-2">04 / TIME</div>
              <div className="flex flex-wrap gap-2">
                <div className="px-3 py-1.5 rounded-full bg-warm-sec text-xs text-charcoal-secondary">10:00 AM</div>
                <div className="px-3 py-1.5 rounded-full bg-gold-primary text-white text-xs shadow-gold-btn">11:30 AM</div>
                <div className="px-3 py-1.5 rounded-full bg-warm-sec text-xs text-charcoal-secondary">02:00 PM</div>
              </div>
            </div>

            {/* Step 5: Confirm */}
            <div 
              className="scene-customer-step-5 bg-white/90 backdrop-blur-xl border border-gold-primary/30 rounded-16 shadow-warm-md p-4 w-48 relative md:translate-y-4"
              style={{ opacity: 0, transform: "translateX(50px)" }}
            >
              <div className="w-8 h-8 rounded-full bg-status-success/20 text-status-success flex items-center justify-center mb-2">
                ✓
              </div>
              <div className="font-bold text-charcoal-heading text-sm mb-1">Confirmed!</div>
              <div className="text-xs text-charcoal-secondary">See you on Oct 12</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
