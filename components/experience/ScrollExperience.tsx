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

    // Safe selector helper
    const q = (el: HTMLElement, selector: string) => {
      const found = el.querySelectorAll(selector);
      return found.length > 0 ? found : null;
    };

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. INITIAL RESTING STATE CONFIGURATION FOR ALL 6 SCENES
      // -------------------------------------------------------------

      // Layer 0: Active & Visible
      gsap.set(layers[0], { opacity: 1, pointerEvents: "auto", zIndex: 20 });

      // Layers 1-5: Dormant initial state
      for (let i = 1; i < layers.length; i++) {
        gsap.set(layers[i], { opacity: 0, pointerEvents: "none", zIndex: 10 });
      }

      // Pre-set offsets for initial entry of dormant scenes
      for (let i = 1; i < layers.length; i++) {
        const layer = layers[i];
        const labels = q(layer, "[class*='-label']");
        if (labels) gsap.set(labels, { y: -15, opacity: 0 });

        const headlines = q(layer, "[class*='-head-line-']");
        if (headlines) gsap.set(headlines, { y: 40, opacity: 0 });

        const sublines = q(layer, "[class*='-subline']");
        if (sublines) gsap.set(sublines, { y: 20, opacity: 0 });

        const metas = q(layer, "[class*='-meta']");
        if (metas) gsap.set(metas, { y: 15, opacity: 0 });

        const ctas = q(layer, "[class*='-cta']");
        if (ctas) gsap.set(ctas, { y: 15, scale: 0.96, opacity: 0 });

        const wrappers = q(layer, "[class*='-panel-wrapper']");
        if (wrappers) gsap.set(wrappers, { y: 25, scale: 0.95, opacity: 0 });

        const glows = q(layer, "[class*='-glow']");
        if (glows) gsap.set(glows, { scale: 0.85, opacity: 0 });
      }

      // -------------------------------------------------------------
      // 2. MASTER GSAP SCROLLTRIGGER SCRUBBED TIMELINE (6500px track)
      // -------------------------------------------------------------
      // 6500px provides ample physical scroll length so all 6 scene transitions
      // feel luxurious and the walking character movement speed is calm and natural.
      const masterTl = gsap.timeline({
        scrollTrigger: {
          id: "experience-trigger",
          trigger: container,
          pin: stage,
          start: "top top",
          end: "+=6500",
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            // Scene index tracking across 6 scenes:
            // 0: Business, 1: Customer, 2: Staff, 3: Control, 4: System, 5: Platform
            const idx =
              p < 0.17 ? 0 :
              p < 0.35 ? 1 :
              p < 0.53 ? 2 :
              p < 0.71 ? 3 :
              p < 0.89 ? 4 : 5;
            onSceneChange(idx, p);
          },
        },
      });

      // Background atmospheric lighting shifts
      if (stageBg) {
        masterTl.to(stageBg, { backgroundColor: "#FFFDF8", duration: 1.0, ease: "power1.inOut" }, 0.2);
        masterTl.to(stageBg, { backgroundColor: "#F9F6EE", duration: 1.0, ease: "power1.inOut" }, 0.55);
        masterTl.to(stageBg, { backgroundColor: "#F8F7F3", duration: 1.0, ease: "power1.inOut" }, 0.85);
      }

      // =============================================================
      // TRANSITION 1: SCENE 0 (BUSINESS) -> SCENE 1 (CUSTOMER)
      // Active: 0.00 -> 0.14 | Transition: 0.10 -> 0.22 | Settle: 0.22 -> 0.32
      // =============================================================
      const bScroll = q(layers[0], ".scene-business-scroll");
      if (bScroll) masterTl.to(bScroll, { opacity: 0, y: 15, duration: 0.04 }, 0.0);

      const bHead = q(layers[0], "[class*='scene-business-head-line-']");
      if (bHead) masterTl.to(bHead, { x: -40, opacity: 0, duration: 0.08, ease: "power2.in", stagger: 0.02 }, 0.08);

      const bCopy = q(layers[0], ".scene-business-subline, .scene-business-meta, .scene-business-cta");
      if (bCopy) masterTl.to(bCopy, { x: -30, opacity: 0, duration: 0.07, ease: "power2.in", stagger: 0.01 }, 0.09);

      const bPanel = q(layers[0], ".scene-business-panel-wrapper, .scene-business-glow");
      if (bPanel) masterTl.to(bPanel, { y: -20, scale: 0.94, opacity: 0, duration: 0.08, ease: "power2.in" }, 0.09);

      masterTl.to(layers[0], { opacity: 0, duration: 0.03 }, 0.14);
      masterTl.set(layers[0], { pointerEvents: "none", zIndex: 10 }, 0.15);

      if (layers[1]) {
        masterTl.set(layers[1], { pointerEvents: "auto", zIndex: 20 }, 0.15);
        masterTl.to(layers[1], { opacity: 1, duration: 0.04 }, 0.15);

        const cHead = q(layers[1], "[class*='scene-customer-head-line-']");
        if (cHead) masterTl.to(cHead, { y: 0, opacity: 1, duration: 0.08, ease: "power3.out", stagger: 0.02 }, 0.16);

        const cCopy = q(layers[1], ".scene-customer-label, .scene-customer-subline, .scene-customer-meta, .scene-customer-cta");
        if (cCopy) masterTl.to(cCopy, { y: 0, opacity: 1, scale: 1, duration: 0.07, ease: "power3.out", stagger: 0.015 }, 0.16);

        const cPanel = q(layers[1], ".scene-customer-panel-wrapper, .scene-customer-glow");
        if (cPanel) masterTl.to(cPanel, { y: 0, scale: 1.0, opacity: 1, duration: 0.08, ease: "power3.out" }, 0.16);

        const cSteps = q(layers[1], "[class*='scene-customer-step-']");
        if (cSteps) masterTl.to(cSteps, { x: 0, opacity: 1, duration: 0.05, ease: "power2.out", stagger: 0.015 }, 0.18);
      }

      // =============================================================
      // TRANSITION 2: SCENE 1 (CUSTOMER) -> SCENE 2 (STAFF)
      // Active: 0.22 -> 0.32 | Transition: 0.28 -> 0.40 | Settle: 0.40 -> 0.50
      // =============================================================
      if (layers[1]) {
        const cExitHead = q(layers[1], "[class*='scene-customer-head-line-']");
        if (cExitHead) masterTl.to(cExitHead, { x: -40, opacity: 0, duration: 0.08, ease: "power2.in", stagger: 0.02 }, 0.28);

        const cExitCopy = q(layers[1], ".scene-customer-subline, .scene-customer-meta, .scene-customer-cta");
        if (cExitCopy) masterTl.to(cExitCopy, { x: -30, opacity: 0, duration: 0.07, ease: "power2.in" }, 0.29);

        const cExitPanel = q(layers[1], ".scene-customer-panel-wrapper, .scene-customer-glow");
        if (cExitPanel) masterTl.to(cExitPanel, { y: -20, scale: 0.94, opacity: 0, duration: 0.08, ease: "power2.in" }, 0.29);

        masterTl.to(layers[1], { opacity: 0, duration: 0.03 }, 0.33);
        masterTl.set(layers[1], { pointerEvents: "none", zIndex: 10 }, 0.34);
      }

      if (layers[2]) {
        masterTl.set(layers[2], { pointerEvents: "auto", zIndex: 20 }, 0.34);
        masterTl.to(layers[2], { opacity: 1, duration: 0.04 }, 0.34);

        const sHead = q(layers[2], "[class*='scene-staff-head-line-']");
        if (sHead) masterTl.to(sHead, { y: 0, opacity: 1, duration: 0.08, ease: "power3.out", stagger: 0.02 }, 0.35);

        const sCopy = q(layers[2], ".scene-staff-label, .scene-staff-subline, .scene-staff-meta, .scene-staff-cta");
        if (sCopy) masterTl.to(sCopy, { y: 0, opacity: 1, scale: 1, duration: 0.07, ease: "power3.out", stagger: 0.015 }, 0.35);

        const sPanel = q(layers[2], ".scene-staff-panel-wrapper, .scene-staff-glow");
        if (sPanel) masterTl.to(sPanel, { y: 0, scale: 1.0, opacity: 1, duration: 0.08, ease: "power3.out" }, 0.35);

        const sItems = q(layers[2], "[class*='scene-staff-item-'], .scene-staff-timeline");
        if (sItems) masterTl.to(sItems, { x: 0, opacity: 1, duration: 0.05, ease: "power2.out", stagger: 0.015 }, 0.37);
      }

      // =============================================================
      // TRANSITION 3: SCENE 2 (STAFF) -> SCENE 3 (CONTROL)
      // Active: 0.40 -> 0.50 | Transition: 0.46 -> 0.58 | Settle: 0.58 -> 0.68
      // =============================================================
      if (layers[2]) {
        const sExitHead = q(layers[2], "[class*='scene-staff-head-line-']");
        if (sExitHead) masterTl.to(sExitHead, { x: -40, opacity: 0, duration: 0.08, ease: "power2.in", stagger: 0.02 }, 0.46);

        const sExitCopy = q(layers[2], ".scene-staff-subline, .scene-staff-meta, .scene-staff-cta");
        if (sExitCopy) masterTl.to(sExitCopy, { x: -30, opacity: 0, duration: 0.07, ease: "power2.in" }, 0.47);

        const sExitPanel = q(layers[2], ".scene-staff-panel-wrapper, .scene-staff-glow");
        if (sExitPanel) masterTl.to(sExitPanel, { y: -20, scale: 0.94, opacity: 0, duration: 0.08, ease: "power2.in" }, 0.47);

        masterTl.to(layers[2], { opacity: 0, duration: 0.03 }, 0.51);
        masterTl.set(layers[2], { pointerEvents: "none", zIndex: 10 }, 0.52);
      }

      if (layers[3]) {
        masterTl.set(layers[3], { pointerEvents: "auto", zIndex: 20 }, 0.52);
        masterTl.to(layers[3], { opacity: 1, duration: 0.04 }, 0.52);

        const ctHead = q(layers[3], "[class*='scene-control-head-line-']");
        if (ctHead) masterTl.to(ctHead, { y: 0, opacity: 1, duration: 0.08, ease: "power3.out", stagger: 0.02 }, 0.53);

        const ctCopy = q(layers[3], ".scene-control-label, .scene-control-subline, .scene-control-meta, .scene-control-cta");
        if (ctCopy) masterTl.to(ctCopy, { y: 0, opacity: 1, scale: 1, duration: 0.07, ease: "power3.out", stagger: 0.015 }, 0.53);

        const ctPanel = q(layers[3], ".scene-control-panel-wrapper, .scene-control-glow");
        if (ctPanel) masterTl.to(ctPanel, { y: 0, scale: 1.0, opacity: 1, duration: 0.08, ease: "power3.out" }, 0.53);

        const ctMetrics = q(layers[3], "[class*='scene-control-metric-'], .scene-control-chart");
        if (ctMetrics) masterTl.to(ctMetrics, { y: 0, opacity: 1, duration: 0.05, ease: "power2.out", stagger: 0.015 }, 0.55);
      }

      // =============================================================
      // TRANSITION 4: SCENE 3 (CONTROL) -> SCENE 4 (SYSTEM)
      // Active: 0.58 -> 0.68 | Transition: 0.64 -> 0.76 | Settle: 0.76 -> 0.86
      // =============================================================
      if (layers[3]) {
        const ctExitHead = q(layers[3], "[class*='scene-control-head-line-']");
        if (ctExitHead) masterTl.to(ctExitHead, { x: -40, opacity: 0, duration: 0.08, ease: "power2.in", stagger: 0.02 }, 0.64);

        const ctExitCopy = q(layers[3], ".scene-control-subline, .scene-control-meta, .scene-control-cta");
        if (ctExitCopy) masterTl.to(ctExitCopy, { x: -30, opacity: 0, duration: 0.07, ease: "power2.in" }, 0.65);

        const ctExitPanel = q(layers[3], ".scene-control-panel-wrapper, .scene-control-glow");
        if (ctExitPanel) masterTl.to(ctExitPanel, { y: -20, scale: 0.94, opacity: 0, duration: 0.08, ease: "power2.in" }, 0.65);

        masterTl.to(layers[3], { opacity: 0, duration: 0.03 }, 0.69);
        masterTl.set(layers[3], { pointerEvents: "none", zIndex: 10 }, 0.70);
      }

      if (layers[4]) {
        masterTl.set(layers[4], { pointerEvents: "auto", zIndex: 20 }, 0.70);
        masterTl.to(layers[4], { opacity: 1, duration: 0.04 }, 0.70);

        const syHead = q(layers[4], "[class*='scene-system-head-line-']");
        if (syHead) masterTl.to(syHead, { y: 0, opacity: 1, duration: 0.08, ease: "power3.out", stagger: 0.02 }, 0.71);

        const syCopy = q(layers[4], ".scene-system-label, .scene-system-subline, .scene-system-meta, .scene-system-cta");
        if (syCopy) masterTl.to(syCopy, { y: 0, opacity: 1, scale: 1, duration: 0.07, ease: "power3.out", stagger: 0.015 }, 0.71);

        const syPanel = q(layers[4], ".scene-system-panel-wrapper, .scene-system-glow");
        if (syPanel) masterTl.to(syPanel, { y: 0, scale: 1.0, opacity: 1, duration: 0.08, ease: "power3.out" }, 0.71);

        const syMods = q(layers[4], "[class*='scene-system-mod-']");
        if (syMods) masterTl.to(syMods, { scale: 1, opacity: 1, duration: 0.05, ease: "power2.out", stagger: 0.01 }, 0.73);
      }

      // =============================================================
      // TRANSITION 5: SCENE 4 (SYSTEM) -> SCENE 5 (PLATFORM FINALE)
      // Active: 0.76 -> 0.86 | Transition: 0.84 -> 0.94 | Settle: 0.94 -> 1.00
      // =============================================================
      if (layers[4]) {
        const syExitHead = q(layers[4], "[class*='scene-system-head-line-']");
        if (syExitHead) masterTl.to(syExitHead, { x: -40, opacity: 0, duration: 0.08, ease: "power2.in", stagger: 0.02 }, 0.84);

        const syExitCopy = q(layers[4], ".scene-system-subline, .scene-system-meta, .scene-system-cta");
        if (syExitCopy) masterTl.to(syExitCopy, { x: -30, opacity: 0, duration: 0.07, ease: "power2.in" }, 0.85);

        const syExitPanel = q(layers[4], ".scene-system-panel-wrapper, .scene-system-glow");
        if (syExitPanel) masterTl.to(syExitPanel, { y: -20, scale: 0.94, opacity: 0, duration: 0.08, ease: "power2.in" }, 0.85);

        masterTl.to(layers[4], { opacity: 0, duration: 0.03 }, 0.89);
        masterTl.set(layers[4], { pointerEvents: "none", zIndex: 10 }, 0.90);
      }

      if (layers[5]) {
        masterTl.set(layers[5], { pointerEvents: "auto", zIndex: 20 }, 0.90);
        masterTl.to(layers[5], { opacity: 1, duration: 0.04 }, 0.90);

        const pHead = q(layers[5], "[class*='scene-platform-head-line-']");
        if (pHead) masterTl.to(pHead, { y: 0, opacity: 1, duration: 0.08, ease: "power3.out", stagger: 0.02 }, 0.91);

        const pCopy = q(layers[5], ".scene-platform-label, .scene-platform-subline, .scene-platform-cta, .scene-platform-meta");
        if (pCopy) masterTl.to(pCopy, { y: 0, opacity: 1, scale: 1, duration: 0.07, ease: "power3.out", stagger: 0.015 }, 0.91);
      }

      // Settled Hold Plateau at the very end
      masterTl.to({}, { duration: 0.1 }, 0.96);

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
