"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AmbientSpatialCanvas from "./AmbientSpatialCanvas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface ScrollExperienceProps {
  activeScene: number;
  onSceneChange: (sceneIndex: number, progress: number) => void;
  children: React.ReactNode[];
}

export default function ScrollExperience({
  activeScene,
  onSceneChange,
  children,
}: ScrollExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageBgRef = useRef<HTMLDivElement>(null);
  const stageAtmosphereRef = useRef<HTMLDivElement>(null);
  const sceneLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    const container = containerRef.current;
    const stage = stageRef.current;
    const stageBg = stageBgRef.current;
    const stageAtmosphere = stageAtmosphereRef.current;
    if (!container || !stage) return;

    const layers = sceneLayersRef.current.filter(Boolean) as HTMLDivElement[];
    if (layers.length < 2) return;

    // Safe selector helper preventing missing selector warnings
    const q = (el: HTMLElement, selector: string) => {
      const found = el.querySelectorAll(selector);
      return found.length > 0 ? found : null;
    };

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. INITIAL RESTING STATE CONFIGURATION
      // -------------------------------------------------------------

      // Layer 0: THE BUSINESS — Settled, illuminated, interactive
      gsap.set(layers[0], { opacity: 1, pointerEvents: "auto", zIndex: 20 });

      // Typography Initial State
      const bLabel = q(layers[0], ".scene-business-label");
      if (bLabel) gsap.set(bLabel, { x: 0, opacity: 1 });

      const bLine1 = q(layers[0], ".scene-business-head-line-1");
      if (bLine1) gsap.set(bLine1, { x: 0, y: 0, letterSpacing: "normal", opacity: 1 });

      const bLine2 = q(layers[0], ".scene-business-head-line-2");
      if (bLine2) gsap.set(bLine2, { x: 0, y: 0, opacity: 1 });

      const bSubline = q(layers[0], ".scene-business-subline");
      if (bSubline) gsap.set(bSubline, { x: 0, y: 0, opacity: 1 });

      const bMeta = q(layers[0], ".scene-business-meta");
      if (bMeta) gsap.set(bMeta, { x: 0, opacity: 1 });

      const bCta = q(layers[0], ".scene-business-cta");
      if (bCta) gsap.set(bCta, { x: 0, scale: 1, opacity: 1 });

      const bScroll = q(layers[0], ".scene-business-scroll");
      if (bScroll) gsap.set(bScroll, { y: 0, opacity: 1 });

      // Product UI Initial State
      const bWrapper = q(layers[0], ".scene-business-panel-wrapper");
      if (bWrapper) gsap.set(bWrapper, { x: 0, y: 0, scale: 1, opacity: 1 });

      const bGlow = q(layers[0], ".scene-business-glow");
      if (bGlow) gsap.set(bGlow, { scale: 1, opacity: 1 });

      const bCardHeader = q(layers[0], ".scene-business-card-header");
      if (bCardHeader) gsap.set(bCardHeader, { y: 0, opacity: 1 });

      const bMetricPrimary = q(layers[0], ".scene-business-metric-primary");
      if (bMetricPrimary) gsap.set(bMetricPrimary, { x: 0, y: 0, opacity: 1 });

      const bMetricSlot = q(layers[0], ".scene-business-metric-slot");
      if (bMetricSlot) gsap.set(bMetricSlot, { x: 0, y: 0, opacity: 1 });

      const bMetricStaff = q(layers[0], ".scene-business-metric-staff");
      if (bMetricStaff) gsap.set(bMetricStaff, { x: 0, y: 0, opacity: 1 });

      const bCardFooter = q(layers[0], ".scene-business-card-footer");
      if (bCardFooter) gsap.set(bCardFooter, { y: 0, opacity: 1 });

      // Layer 1: CUSTOMER EXPERIENCE — Concealed with refined entrance offsets
      gsap.set(layers[1], { opacity: 0, pointerEvents: "none", zIndex: 10 });

      // Typography Entrance Pre-conditions
      const cLabel = q(layers[1], ".scene-customer-label");
      if (cLabel) gsap.set(cLabel, { y: -15, opacity: 0 });

      const cLine1 = q(layers[1], ".scene-customer-head-line-1");
      if (cLine1) gsap.set(cLine1, { y: 40, opacity: 0 });

      const cLine2 = q(layers[1], ".scene-customer-head-line-2");
      if (cLine2) gsap.set(cLine2, { y: 40, opacity: 0 });

      const cLine3 = q(layers[1], ".scene-customer-head-line-3");
      if (cLine3) gsap.set(cLine3, { y: 40, opacity: 0 });

      const cSubline = q(layers[1], ".scene-customer-subline");
      if (cSubline) gsap.set(cSubline, { y: 20, opacity: 0 });

      const cMeta = q(layers[1], ".scene-customer-meta");
      if (cMeta) gsap.set(cMeta, { y: 15, opacity: 0 });

      const cCta = q(layers[1], ".scene-customer-cta");
      if (cCta) gsap.set(cCta, { y: 15, scale: 0.96, opacity: 0 });

      // Product UI Entrance Pre-conditions
      const cWrapper = q(layers[1], ".scene-customer-panel-wrapper");
      if (cWrapper) {
        gsap.set(cWrapper, {
          y: 25,
          scale: 0.95,
          opacity: 0,
        });
      }

      const cGlow = q(layers[1], ".scene-customer-glow");
      if (cGlow) gsap.set(cGlow, { scale: 0.85, opacity: 0 });

      const cCardHeader = q(layers[1], ".scene-customer-card-header");
      if (cCardHeader) gsap.set(cCardHeader, { y: -12, opacity: 0 });

      const cStep1 = q(layers[1], ".scene-customer-step-1");
      if (cStep1) gsap.set(cStep1, { x: 25, opacity: 0 });

      const cStep2 = q(layers[1], ".scene-customer-step-2");
      if (cStep2) gsap.set(cStep2, { x: 25, opacity: 0 });

      const cStep3 = q(layers[1], ".scene-customer-step-3");
      if (cStep3) gsap.set(cStep3, { x: 25, opacity: 0 });

      const cStep4 = q(layers[1], ".scene-customer-step-4");
      if (cStep4) gsap.set(cStep4, { x: 25, opacity: 0 });

      const cCardFooter = q(layers[1], ".scene-customer-card-footer");
      if (cCardFooter) gsap.set(cCardFooter, { y: 15, opacity: 0 });

      // Park scenes 2-5 dormant for Milestone 1
      for (let i = 2; i < layers.length; i++) {
        gsap.set(layers[i], { display: "none", opacity: 0, pointerEvents: "none" });
      }

      // -------------------------------------------------------------
      // 2. MASTER GSAP SCROLLTRIGGER SCRUBBED TIMELINE
      // -------------------------------------------------------------
      const masterTl = gsap.timeline({
        scrollTrigger: {
          id: "experience-trigger",
          trigger: container,
          pin: stage,
          start: "top top",
          end: "+=1800",
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            const currentIdx = p < 0.4 ? 0 : 1;
            onSceneChange(currentIdx, p);
          },
        },
      });

      // -------------------------------------------------------------
      // PHASE A: ENVIRONMENT & BACKGROUND HARMONY
      // -------------------------------------------------------------
      if (stageBg) {
        masterTl.to(
          stageBg,
          {
            backgroundColor: "#FFFDF8",
            duration: 0.8,
            ease: "power1.inOut",
          },
          0.1
        );
      }

      if (stageAtmosphere) {
        masterTl.to(
          stageAtmosphere,
          {
            opacity: 0.9,
            scale: 1.1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.1
        );
      }

      // -------------------------------------------------------------
      // PHASE B: OUTGOING BUSINESS SCENE CLEAN DISASSEMBLY (0.00 -> 0.36)
      // -------------------------------------------------------------
      // Scroll cue disappears first
      if (bScroll) {
        masterTl.to(bScroll, { opacity: 0, y: 15, duration: 0.12, ease: "power2.in" }, 0.0);
      }

      // Kinetic Typography Disassembly on Left Flank (Clean, focused retreat)
      if (bLine1) {
        masterTl.to(
          bLine1,
          {
            x: -45,
            letterSpacing: "0.03em",
            opacity: 0,
            duration: 0.24,
            ease: "power2.in",
          },
          0.05
        );
      }

      if (bLine2) {
        masterTl.to(
          bLine2,
          {
            x: -35,
            y: 10,
            opacity: 0,
            duration: 0.24,
            ease: "power2.in",
          },
          0.08
        );
      }

      if (bSubline) {
        masterTl.to(
          bSubline,
          {
            x: -25,
            opacity: 0,
            duration: 0.22,
            ease: "power2.in",
          },
          0.10
        );
      }

      if (bMeta) {
        masterTl.to(
          bMeta,
          {
            x: -20,
            opacity: 0,
            duration: 0.20,
            ease: "power2.in",
          },
          0.12
        );
      }

      if (bLabel) {
        masterTl.to(
          bLabel,
          {
            x: -20,
            opacity: 0,
            duration: 0.18,
            ease: "power2.in",
          },
          0.06
        );
      }

      if (bCta) {
        masterTl.to(
          bCta,
          {
            x: -25,
            scale: 0.96,
            opacity: 0,
            duration: 0.20,
            ease: "power2.in",
          },
          0.12
        );
      }

      // Product UI Telemetry Panel Disassembly on Right Flank
      if (bMetricPrimary) {
        masterTl.to(bMetricPrimary, { y: -15, opacity: 0, duration: 0.18, ease: "power2.in" }, 0.08);
      }
      if (bMetricSlot) {
        masterTl.to(bMetricSlot, { y: 15, opacity: 0, duration: 0.18, ease: "power2.in" }, 0.10);
      }
      if (bMetricStaff) {
        masterTl.to(bMetricStaff, { y: 15, opacity: 0, duration: 0.18, ease: "power2.in" }, 0.12);
      }
      if (bCardHeader) {
        masterTl.to(bCardHeader, { y: -10, opacity: 0, duration: 0.18, ease: "power2.in" }, 0.08);
      }
      if (bCardFooter) {
        masterTl.to(bCardFooter, { y: 10, opacity: 0, duration: 0.16, ease: "power2.in" }, 0.12);
      }

      if (bWrapper) {
        masterTl.to(
          bWrapper,
          {
            y: -20,
            scale: 0.94,
            opacity: 0,
            duration: 0.26,
            ease: "power2.in",
          },
          0.08
        );
      }

      if (bGlow) {
        masterTl.to(
          bGlow,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.24,
            ease: "power2.in",
          },
          0.08
        );
      }

      // Clean Layer Hand-Off (Outgoing completely fades before Incoming enters)
      masterTl.to(layers[0], { opacity: 0, duration: 0.06, ease: "power1.in" }, 0.34);
      masterTl.set(layers[0], { pointerEvents: "none", zIndex: 10 }, 0.36);

      // -------------------------------------------------------------
      // PHASE C: INCOMING CUSTOMER SCENE CLEAN ASSEMBLY (0.36 -> 0.78)
      // -------------------------------------------------------------
      masterTl.set(layers[1], { pointerEvents: "auto", zIndex: 20 }, 0.36);
      masterTl.to(layers[1], { opacity: 1, duration: 0.08, ease: "power1.out" }, 0.36);

      // Left Flank Kinetic Typography Staggered Entry
      if (cLabel) {
        masterTl.to(
          cLabel,
          {
            y: 0,
            opacity: 1,
            duration: 0.22,
            ease: "power3.out",
          },
          0.38
        );
      }

      if (cLine1) {
        masterTl.to(
          cLine1,
          {
            y: 0,
            opacity: 1,
            duration: 0.25,
            ease: "power3.out",
          },
          0.42
        );
      }

      if (cLine2) {
        masterTl.to(
          cLine2,
          {
            y: 0,
            opacity: 1,
            duration: 0.25,
            ease: "power3.out",
          },
          0.46
        );
      }

      if (cLine3) {
        masterTl.to(
          cLine3,
          {
            y: 0,
            opacity: 1,
            duration: 0.25,
            ease: "power3.out",
          },
          0.50
        );
      }

      if (cSubline) {
        masterTl.to(
          cSubline,
          {
            y: 0,
            opacity: 1,
            duration: 0.22,
            ease: "power3.out",
          },
          0.54
        );
      }

      if (cMeta) {
        masterTl.to(
          cMeta,
          {
            y: 0,
            opacity: 1,
            duration: 0.20,
            ease: "power3.out",
          },
          0.58
        );
      }

      if (cCta) {
        masterTl.to(
          cCta,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.22,
            ease: "power3.out",
          },
          0.62
        );
      }

      // Right Flank Customer Step Progression Card Entry
      if (cGlow) {
        masterTl.to(
          cGlow,
          {
            scale: 1,
            opacity: 1,
            duration: 0.28,
            ease: "power2.out",
          },
          0.40
        );
      }

      if (cWrapper) {
        masterTl.to(
          cWrapper,
          {
            y: 0,
            scale: 1.0,
            opacity: 1,
            duration: 0.28,
            ease: "power3.out",
          },
          0.40
        );
      }

      if (cCardHeader) {
        masterTl.to(
          cCardHeader,
          {
            y: 0,
            opacity: 1,
            duration: 0.18,
            ease: "power3.out",
          },
          0.44
        );
      }

      if (cStep1) {
        masterTl.to(cStep1, { x: 0, opacity: 1, duration: 0.16, ease: "power2.out" }, 0.48);
      }

      if (cStep2) {
        masterTl.to(cStep2, { x: 0, opacity: 1, duration: 0.16, ease: "power2.out" }, 0.52);
      }

      if (cStep3) {
        masterTl.to(cStep3, { x: 0, opacity: 1, duration: 0.16, ease: "power2.out" }, 0.56);
      }

      if (cStep4) {
        masterTl.to(cStep4, { x: 0, opacity: 1, duration: 0.16, ease: "power2.out" }, 0.60);
      }

      if (cCardFooter) {
        masterTl.to(cCardFooter, { y: 0, opacity: 1, duration: 0.18, ease: "power3.out" }, 0.64);
      }

      // -------------------------------------------------------------
      // PHASE D: ROCK-SOLID SETTLED PLATEAU HOLD (0.75 -> 1.15)
      // -------------------------------------------------------------
      masterTl.to({}, { duration: 0.4 }, 0.75);

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        clearTimeout(refreshTimeout);
      };
    }, container);

    return () => ctx.revert();
  }, [reducedMotion, onSceneChange]);

  // Reduced motion fallback
  if (reducedMotion) {
    return (
      <div className="relative w-full">
        {React.Children.map(children, (child, index) => (
          <div key={index} className="min-h-screen w-full relative">
            {child}
          </div>
        ))}
      </div>
    );
  }

  // Full Cinematic Scroll Experience
  return (
    <div
      ref={containerRef}
      id="experience-container"
      className="relative w-full min-h-screen"
    >
      {/* Viewport Stage pinned dynamically by ScrollTrigger */}
      <div
        ref={stageRef}
        className="w-full h-screen overflow-hidden relative"
      >
        {/* Dynamic Warm Sand Stage Background */}
        <div
          ref={stageBgRef}
          className="absolute inset-0 w-full h-full bg-[#F8F7F3] -z-30 transition-colors duration-500"
        />

        {/* Dynamic Ambient Lighting Gradient Atmosphere */}
        <div
          ref={stageAtmosphereRef}
          className="absolute inset-0 w-full h-full pointer-events-none -z-20 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 70% 45%, rgba(198,154,75,0.18) 0%, rgba(232,215,178,0.10) 35%, rgba(248,247,243,0) 70%)",
          }}
        />

        {/* Persistent 3D Ambient Spatial Canvas responding to scroll progress */}
        <AmbientSpatialCanvas className="z-0" scrollProgress={scrollProgress} />

        {/* Scene Composition Layers */}
        {React.Children.map(children, (child, index) => {
          return (
            <div
              key={index}
              ref={(el) => {
                sceneLayersRef.current[index] = el;
              }}
              data-scene-layer={index}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10"
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
