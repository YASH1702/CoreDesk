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
      if (bWrapper) gsap.set(bWrapper, { x: 0, y: 0, rotateY: 0, rotateX: 0, scale: 1, opacity: 1 });

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

      // Layer 1: CUSTOMER EXPERIENCE — Concealed with entrance offsets
      gsap.set(layers[1], { opacity: 0, pointerEvents: "none", zIndex: 10 });

      // Typography Entrance Pre-conditions
      const cLabel = q(layers[1], ".scene-customer-label");
      if (cLabel) gsap.set(cLabel, { y: -25, opacity: 0 });

      const cLine1 = q(layers[1], ".scene-customer-head-line-1");
      if (cLine1) gsap.set(cLine1, { y: 75, x: -35, opacity: 0 });

      const cLine2 = q(layers[1], ".scene-customer-head-line-2");
      if (cLine2) gsap.set(cLine2, { y: 75, x: -25, opacity: 0 });

      const cLine3 = q(layers[1], ".scene-customer-head-line-3");
      if (cLine3) gsap.set(cLine3, { y: 75, letterSpacing: "0.04em", opacity: 0 });

      const cSubline = q(layers[1], ".scene-customer-subline");
      if (cSubline) gsap.set(cSubline, { y: 35, opacity: 0 });

      const cMeta = q(layers[1], ".scene-customer-meta");
      if (cMeta) gsap.set(cMeta, { y: 25, opacity: 0 });

      const cCta = q(layers[1], ".scene-customer-cta");
      if (cCta) gsap.set(cCta, { y: 20, scale: 0.94, opacity: 0 });

      // Product UI Entrance Pre-conditions
      const cWrapper = q(layers[1], ".scene-customer-panel-wrapper");
      if (cWrapper) {
        gsap.set(cWrapper, {
          x: 160,
          rotateY: 10,
          rotateX: -4,
          scale: 0.90,
          opacity: 0,
        });
      }

      const cGlow = q(layers[1], ".scene-customer-glow");
      if (cGlow) gsap.set(cGlow, { scale: 0.75, opacity: 0 });

      const cCardHeader = q(layers[1], ".scene-customer-card-header");
      if (cCardHeader) gsap.set(cCardHeader, { y: -20, opacity: 0 });

      const cStep1 = q(layers[1], ".scene-customer-step-1");
      if (cStep1) gsap.set(cStep1, { x: 60, opacity: 0 });

      const cStep2 = q(layers[1], ".scene-customer-step-2");
      if (cStep2) gsap.set(cStep2, { x: 60, opacity: 0 });

      const cStep3 = q(layers[1], ".scene-customer-step-3");
      if (cStep3) gsap.set(cStep3, { x: 60, opacity: 0 });

      const cStep4 = q(layers[1], ".scene-customer-step-4");
      if (cStep4) gsap.set(cStep4, { x: 60, opacity: 0 });

      const cCardFooter = q(layers[1], ".scene-customer-card-footer");
      if (cCardFooter) gsap.set(cCardFooter, { y: 20, opacity: 0 });

      // Park scenes 2-5 dormant for Milestone 1
      for (let i = 2; i < layers.length; i++) {
        gsap.set(layers[i], { display: "none", opacity: 0, pointerEvents: "none" });
      }

      // -------------------------------------------------------------
      // 2. MASTER GSAP SCROLLTRIGGER SCRUBBED TIMELINE
      // -------------------------------------------------------------
      // Responsive 1800px scrub track for immediate tactile engagement
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
            const currentIdx = p < 0.5 ? 0 : 1;
            onSceneChange(currentIdx, p);
          },
        },
      });

      // -------------------------------------------------------------
      // PHASE A: ENVIRONMENT & BACKGROUND MORPHING
      // -------------------------------------------------------------
      // Smooth color transition from Warm Sand Ivory (#F8F7F3) to Luminous Champagne (#FFFDF8)
      if (stageBg) {
        masterTl.to(
          stageBg,
          {
            backgroundColor: "#FFFDF8",
            duration: 1.4,
            ease: "power1.inOut",
          },
          0.1
        );
      }

      // Dynamic ambient lighting gradient sweep
      if (stageAtmosphere) {
        masterTl.to(
          stageAtmosphere,
          {
            opacity: 1,
            scale: 1.15,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0.1
        );
      }

      // -------------------------------------------------------------
      // PHASE B: OUTGOING BUSINESS SCENE KINETIC DISASSEMBLY
      // -------------------------------------------------------------
      // Scroll cue vanishes immediately
      if (bScroll) {
        masterTl.to(bScroll, { opacity: 0, y: 25, duration: 0.25, ease: "power2.in" }, 0.0);
      }

      // Kinetic Typography Disassembly (Staggered line velocity & tracking expansion)
      if (bLine1) {
        masterTl.to(
          bLine1,
          {
            x: -180,
            letterSpacing: "0.06em",
            opacity: 0,
            duration: 0.7,
            ease: "power2.in",
          },
          0.1
        );
      }

      if (bLine2) {
        masterTl.to(
          bLine2,
          {
            x: -140,
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power2.in",
          },
          0.16
        );
      }

      if (bSubline) {
        masterTl.to(
          bSubline,
          {
            x: -90,
            y: -15,
            opacity: 0,
            duration: 0.65,
            ease: "power2.in",
          },
          0.14
        );
      }

      if (bMeta) {
        masterTl.to(
          bMeta,
          {
            x: -70,
            opacity: 0,
            duration: 0.55,
            ease: "power2.in",
          },
          0.12
        );
      }

      if (bLabel) {
        masterTl.to(
          bLabel,
          {
            x: -60,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          0.1
        );
      }

      if (bCta) {
        masterTl.to(
          bCta,
          {
            x: -100,
            scale: 0.94,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          0.18
        );
      }

      // Product UI 3D Spatial Disassembly
      if (bCardHeader) {
        masterTl.to(
          bCardHeader,
          {
            y: -25,
            x: 40,
            opacity: 0,
            duration: 0.55,
            ease: "power2.in",
          },
          0.12
        );
      }

      if (bMetricPrimary) {
        masterTl.to(
          bMetricPrimary,
          {
            y: -30,
            x: 80,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          0.14
        );
      }

      if (bMetricSlot) {
        masterTl.to(
          bMetricSlot,
          {
            x: 100,
            y: 30,
            opacity: 0,
            duration: 0.55,
            ease: "power2.in",
          },
          0.18
        );
      }

      if (bMetricStaff) {
        masterTl.to(
          bMetricStaff,
          {
            x: 120,
            y: 35,
            opacity: 0,
            duration: 0.55,
            ease: "power2.in",
          },
          0.22
        );
      }

      if (bCardFooter) {
        masterTl.to(
          bCardFooter,
          {
            y: 20,
            opacity: 0,
            duration: 0.45,
            ease: "power2.in",
          },
          0.16
        );
      }

      if (bWrapper) {
        masterTl.to(
          bWrapper,
          {
            x: 160,
            rotateY: -9,
            rotateX: 3,
            scale: 0.91,
            opacity: 0,
            duration: 0.75,
            ease: "power2.in",
          },
          0.15
        );
      }

      if (bGlow) {
        masterTl.to(
          bGlow,
          {
            scale: 0.7,
            opacity: 0,
            duration: 0.6,
            ease: "power2.in",
          },
          0.15
        );
      }

      // Layer 1 Activate (Overlapped choreography so 3D astrolabe bridges the scenes)
      masterTl.set(layers[1], { pointerEvents: "auto", zIndex: 20 }, 0.45);
      masterTl.to(
        layers[1],
        {
          opacity: 1,
          duration: 0.35,
          ease: "power1.inOut",
        },
        0.45
      );

      // Layer 0 Exit Hand-off
      masterTl.to(
        layers[0],
        {
          opacity: 0,
          duration: 0.35,
          ease: "power1.inOut",
        },
        0.55
      );
      masterTl.set(layers[0], { pointerEvents: "none", zIndex: 10 }, 0.75);

      // Kinetic Typography Masked Staggered Entry (Left Column)
      if (cLabel) {
        masterTl.to(
          cLabel,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          0.75
        );
      }

      if (cLine1) {
        masterTl.to(
          cLine1,
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.68,
            ease: "power3.out",
          },
          0.8
        );
      }

      if (cLine2) {
        masterTl.to(
          cLine2,
          {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 0.68,
            ease: "power3.out",
          },
          0.88
        );
      }

      if (cLine3) {
        masterTl.to(
          cLine3,
          {
            y: 0,
            letterSpacing: "normal",
            opacity: 1,
            duration: 0.68,
            ease: "power3.out",
          },
          0.96
        );
      }

      if (cSubline) {
        masterTl.to(
          cSubline,
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
          },
          1.02
        );
      }

      if (cMeta) {
        masterTl.to(
          cMeta,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          1.08
        );
      }

      if (cCta) {
        masterTl.to(
          cCta,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          1.14
        );
      }

      // Product UI 3D Spatial Assembly (Right Column)
      if (cGlow) {
        masterTl.to(
          cGlow,
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          0.8
        );
      }

      if (cWrapper) {
        masterTl.to(
          cWrapper,
          {
            x: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1.0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
          },
          0.8
        );
      }

      if (cCardHeader) {
        masterTl.to(
          cCardHeader,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          0.92
        );
      }

      // Cascading Step Cards Sequence with Independent Timing
      if (cStep1) {
        masterTl.to(
          cStep1,
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
          },
          0.98
        );
      }

      if (cStep2) {
        masterTl.to(
          cStep2,
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
          },
          1.06
        );
      }

      if (cStep3) {
        masterTl.to(
          cStep3,
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
          },
          1.14
        );
      }

      if (cStep4) {
        masterTl.to(
          cStep4,
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
          },
          1.22
        );
      }

      if (cCardFooter) {
        masterTl.to(
          cCardFooter,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
          },
          1.28
        );
      }

      // -------------------------------------------------------------
      // PHASE D: SETTLED STATE HOLD PLATEAU
      // -------------------------------------------------------------
      // Hold cushion to provide stable, rock-solid settlement at progress 1.0
      masterTl.to({}, { duration: 0.5 }, 1.5);

      // Force recalculation of ScrollTrigger coordinates
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        clearTimeout(refreshTimeout);
      };
    }, container);

    return () => ctx.revert();
  }, [reducedMotion, onSceneChange]);

  // Reduced motion fallback: sequential standard sections
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

  // Full Cinematic Scroll Experience: Stage pinned by GSAP ScrollTrigger
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
