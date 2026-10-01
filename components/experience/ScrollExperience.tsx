"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import AmbientSpatialCanvas from "./AmbientSpatialCanvas";

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

  const currentSceneRef = useRef(0);
  const isLockedRef = useRef(false);
  const animatorRef = useRef({ time: 0 });
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, []);

  // Safe selector helper
  const q = (el: HTMLElement, selector: string) => {
    const found = el.querySelectorAll(selector);
    return found.length > 0 ? found : null;
  };

  // -----------------------------------------------------------------
  // CALIBRATED CINEMATIC STEPPER ENGINE:
  // Decoupled from raw scroll speed. Takes an intentional, fixed 1.4s
  // with a luxurious easing curve to completely finish the animation.
  // -----------------------------------------------------------------
  const goToScene = useCallback(
    (targetIndex: number, customDuration = 1.4) => {
      const target = Math.max(0, Math.min(5, targetIndex));
      if (target === currentSceneRef.current && isLockedRef.current) return;

      const masterTl = masterTlRef.current;
      if (!masterTl) return;

      isLockedRef.current = true;
      const targetTime = target * 1.0;

      gsap.killTweensOf(animatorRef.current);
      gsap.to(animatorRef.current, {
        time: targetTime,
        duration: customDuration,
        ease: "power2.inOut",
        onUpdate: () => {
          const t = animatorRef.current.time;
          masterTl.time(t);
          const p = t / 5.0;
          setScrollProgress(p);
          onSceneChange(target, p);
        },
        onComplete: () => {
          currentSceneRef.current = target;
          setTimeout(() => {
            isLockedRef.current = false;
          }, 120);
        },
      });
    },
    [onSceneChange]
  );

  // Sync external activeScene prop (e.g. from SceneNav click)
  useEffect(() => {
    if (activeScene !== currentSceneRef.current && !isLockedRef.current) {
      goToScene(activeScene, 1.4);
    }
  }, [activeScene, goToScene]);

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    const container = containerRef.current;
    const stage = stageRef.current;
    const stageBg = stageBgRef.current;
    const stageAtmosphere = stageAtmosphereRef.current;
    if (!container || !stage) return;

    const layers = sceneLayersRef.current.filter(Boolean) as HTMLDivElement[];
    if (layers.length < 2) return;

    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. INITIAL RESTING STATE CONFIGURATION FOR ALL 6 SCENES
      // -------------------------------------------------------------
      gsap.set(layers[0], { opacity: 1, pointerEvents: "auto", zIndex: 20 });

      for (let i = 1; i < layers.length; i++) {
        gsap.set(layers[i], { opacity: 0, pointerEvents: "none", zIndex: 10 });
      }

      // Pre-set offsets for dormant scenes
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
      // 2. PAUSED MASTER GSAP TIMELINE (5.0s Total Duration)
      // 0.0 -> 1.0: Scene 0 -> 1
      // 1.0 -> 2.0: Scene 1 -> 2
      // 2.0 -> 3.0: Scene 2 -> 3
      // 3.0 -> 4.0: Scene 3 -> 4
      // 4.0 -> 5.0: Scene 4 -> 5
      // -------------------------------------------------------------
      const masterTl = gsap.timeline({ paused: true });
      masterTlRef.current = masterTl;

      // Atmospheric background color transitions (Harmonious Lemonade tones)
      if (stageBg) {
        masterTl.to(stageBg, { backgroundColor: "#F4EED8", duration: 1.0, ease: "power1.inOut" }, 0.5);
        masterTl.to(stageBg, { backgroundColor: "#ECE4C2", duration: 1.0, ease: "power1.inOut" }, 2.5);
        masterTl.to(stageBg, { backgroundColor: "#F1EACD", duration: 1.0, ease: "power1.inOut" }, 4.0);
      }

      // =============================================================
      // TRANSITION 1: SCENE 0 (BUSINESS) -> SCENE 1 (CUSTOMER) [0.0 -> 1.0]
      // =============================================================
      const bScroll = q(layers[0], ".scene-business-scroll");
      if (bScroll) masterTl.to(bScroll, { opacity: 0, y: 15, duration: 0.15 }, 0.0);

      const bHead = q(layers[0], "[class*='scene-business-head-line-']");
      if (bHead) masterTl.to(bHead, { x: -40, opacity: 0, duration: 0.32, ease: "power2.in", stagger: 0.05 }, 0.05);

      const bCopy = q(layers[0], ".scene-business-subline, .scene-business-meta, .scene-business-cta");
      if (bCopy) masterTl.to(bCopy, { x: -30, opacity: 0, duration: 0.28, ease: "power2.in", stagger: 0.04 }, 0.08);

      const bPanel = q(layers[0], ".scene-business-panel-wrapper, .scene-business-glow");
      if (bPanel) masterTl.to(bPanel, { y: -20, scale: 0.94, opacity: 0, duration: 0.32, ease: "power2.in" }, 0.06);

      masterTl.to(layers[0], { opacity: 0, duration: 0.1 }, 0.36);
      masterTl.set(layers[0], { pointerEvents: "none", zIndex: 10 }, 0.40);

      if (layers[1]) {
        masterTl.set(layers[1], { pointerEvents: "auto", zIndex: 20 }, 0.40);
        masterTl.to(layers[1], { opacity: 1, duration: 0.12 }, 0.40);

        const cHead = q(layers[1], "[class*='scene-customer-head-line-']");
        if (cHead) masterTl.to(cHead, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.06 }, 0.44);

        const cCopy = q(layers[1], ".scene-customer-label, .scene-customer-subline, .scene-customer-meta, .scene-customer-cta");
        if (cCopy) masterTl.to(cCopy, { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: "power3.out", stagger: 0.05 }, 0.44);

        const cPanel = q(layers[1], ".scene-customer-panel-wrapper, .scene-customer-glow");
        if (cPanel) masterTl.to(cPanel, { y: 0, scale: 1.0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0.44);

        const cSteps = q(layers[1], "[class*='scene-customer-step-']");
        if (cSteps) masterTl.to(cSteps, { x: 0, opacity: 1, duration: 0.20, ease: "power2.out", stagger: 0.05 }, 0.55);
      }

      // =============================================================
      // TRANSITION 2: SCENE 1 (CUSTOMER) -> SCENE 2 (STAFF) [1.0 -> 2.0]
      // =============================================================
      if (layers[1]) {
        const cExitHead = q(layers[1], "[class*='scene-customer-head-line-']");
        if (cExitHead) masterTl.to(cExitHead, { x: -40, opacity: 0, duration: 0.32, ease: "power2.in", stagger: 0.05 }, 1.05);

        const cExitCopy = q(layers[1], ".scene-customer-subline, .scene-customer-meta, .scene-customer-cta");
        if (cExitCopy) masterTl.to(cExitCopy, { x: -30, opacity: 0, duration: 0.28, ease: "power2.in" }, 1.08);

        const cExitPanel = q(layers[1], ".scene-customer-panel-wrapper, .scene-customer-glow");
        if (cExitPanel) masterTl.to(cExitPanel, { y: -20, scale: 0.94, opacity: 0, duration: 0.32, ease: "power2.in" }, 1.06);

        masterTl.to(layers[1], { opacity: 0, duration: 0.1 }, 1.36);
        masterTl.set(layers[1], { pointerEvents: "none", zIndex: 10 }, 1.40);
      }

      if (layers[2]) {
        masterTl.set(layers[2], { pointerEvents: "auto", zIndex: 20 }, 1.40);
        masterTl.to(layers[2], { opacity: 1, duration: 0.12 }, 1.40);

        const sHead = q(layers[2], "[class*='scene-staff-head-line-']");
        if (sHead) masterTl.to(sHead, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.06 }, 1.44);

        const sCopy = q(layers[2], ".scene-staff-label, .scene-staff-subline, .scene-staff-meta, .scene-staff-cta");
        if (sCopy) masterTl.to(sCopy, { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: "power3.out", stagger: 0.05 }, 1.44);

        const sPanel = q(layers[2], ".scene-staff-panel-wrapper, .scene-staff-glow");
        if (sPanel) masterTl.to(sPanel, { y: 0, scale: 1.0, opacity: 1, duration: 0.35, ease: "power3.out" }, 1.44);

        const sItems = q(layers[2], "[class*='scene-staff-item-'], .scene-staff-timeline");
        if (sItems) masterTl.to(sItems, { x: 0, opacity: 1, duration: 0.20, ease: "power2.out", stagger: 0.05 }, 1.55);
      }

      // =============================================================
      // TRANSITION 3: SCENE 2 (STAFF) -> SCENE 3 (CONTROL) [2.0 -> 3.0]
      // =============================================================
      if (layers[2]) {
        const sExitHead = q(layers[2], "[class*='scene-staff-head-line-']");
        if (sExitHead) masterTl.to(sExitHead, { x: -40, opacity: 0, duration: 0.32, ease: "power2.in", stagger: 0.05 }, 2.05);

        const sExitCopy = q(layers[2], ".scene-staff-subline, .scene-staff-meta, .scene-staff-cta");
        if (sExitCopy) masterTl.to(sExitCopy, { x: -30, opacity: 0, duration: 0.28, ease: "power2.in" }, 2.08);

        const sExitPanel = q(layers[2], ".scene-staff-panel-wrapper, .scene-staff-glow");
        if (sExitPanel) masterTl.to(sExitPanel, { y: -20, scale: 0.94, opacity: 0, duration: 0.32, ease: "power2.in" }, 2.06);

        masterTl.to(layers[2], { opacity: 0, duration: 0.1 }, 2.36);
        masterTl.set(layers[2], { pointerEvents: "none", zIndex: 10 }, 2.40);
      }

      if (layers[3]) {
        masterTl.set(layers[3], { pointerEvents: "auto", zIndex: 20 }, 2.40);
        masterTl.to(layers[3], { opacity: 1, duration: 0.12 }, 2.40);

        const ctHead = q(layers[3], "[class*='scene-control-head-line-']");
        if (ctHead) masterTl.to(ctHead, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.06 }, 2.44);

        const ctCopy = q(layers[3], ".scene-control-label, .scene-control-subline, .scene-control-meta, .scene-control-cta");
        if (ctCopy) masterTl.to(ctCopy, { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: "power3.out", stagger: 0.05 }, 2.44);

        const ctPanel = q(layers[3], ".scene-control-panel-wrapper, .scene-control-glow");
        if (ctPanel) masterTl.to(ctPanel, { y: 0, scale: 1.0, opacity: 1, duration: 0.35, ease: "power3.out" }, 2.44);

        const ctMetrics = q(layers[3], "[class*='scene-control-metric-'], .scene-control-chart");
        if (ctMetrics) masterTl.to(ctMetrics, { y: 0, opacity: 1, duration: 0.20, ease: "power2.out", stagger: 0.05 }, 2.55);
      }

      // =============================================================
      // TRANSITION 4: SCENE 3 (CONTROL) -> SCENE 4 (SYSTEM) [3.0 -> 4.0]
      // =============================================================
      if (layers[3]) {
        const ctExitHead = q(layers[3], "[class*='scene-control-head-line-']");
        if (ctExitHead) masterTl.to(ctExitHead, { x: -40, opacity: 0, duration: 0.32, ease: "power2.in", stagger: 0.05 }, 3.05);

        const ctExitCopy = q(layers[3], ".scene-control-subline, .scene-control-meta, .scene-control-cta");
        if (ctExitCopy) masterTl.to(ctExitCopy, { x: -30, opacity: 0, duration: 0.28, ease: "power2.in" }, 3.08);

        const ctExitPanel = q(layers[3], ".scene-control-panel-wrapper, .scene-control-glow");
        if (ctExitPanel) masterTl.to(ctExitPanel, { y: -20, scale: 0.94, opacity: 0, duration: 0.32, ease: "power2.in" }, 3.06);

        masterTl.to(layers[3], { opacity: 0, duration: 0.1 }, 3.36);
        masterTl.set(layers[3], { pointerEvents: "none", zIndex: 10 }, 3.40);
      }

      if (layers[4]) {
        masterTl.set(layers[4], { pointerEvents: "auto", zIndex: 20 }, 3.40);
        masterTl.to(layers[4], { opacity: 1, duration: 0.12 }, 3.40);

        const syHead = q(layers[4], "[class*='scene-system-head-line-']");
        if (syHead) masterTl.to(syHead, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.06 }, 3.44);

        const syCopy = q(layers[4], ".scene-system-label, .scene-system-subline, .scene-system-meta, .scene-system-cta");
        if (syCopy) masterTl.to(syCopy, { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: "power3.out", stagger: 0.05 }, 3.44);

        const syPanel = q(layers[4], ".scene-system-panel-wrapper, .scene-system-glow");
        if (syPanel) masterTl.to(syPanel, { y: 0, scale: 1.0, opacity: 1, duration: 0.35, ease: "power3.out" }, 3.44);

        const syMods = q(layers[4], "[class*='scene-system-mod-']");
        if (syMods) masterTl.to(syMods, { scale: 1, opacity: 1, duration: 0.15, ease: "power2.out", stagger: 0.03 }, 3.55);
      }

      // =============================================================
      // TRANSITION 5: SCENE 4 (SYSTEM) -> SCENE 5 (PLATFORM) [4.0 -> 5.0]
      // =============================================================
      if (layers[4]) {
        const syExitHead = q(layers[4], "[class*='scene-system-head-line-']");
        if (syExitHead) masterTl.to(syExitHead, { x: -40, opacity: 0, duration: 0.32, ease: "power2.in", stagger: 0.05 }, 4.05);

        const syExitCopy = q(layers[4], ".scene-system-subline, .scene-system-meta, .scene-system-cta");
        if (syExitCopy) masterTl.to(syExitCopy, { x: -30, opacity: 0, duration: 0.28, ease: "power2.in" }, 4.08);

        const syExitPanel = q(layers[4], ".scene-system-panel-wrapper, .scene-system-glow");
        if (syExitPanel) masterTl.to(syExitPanel, { y: -20, scale: 0.94, opacity: 0, duration: 0.32, ease: "power2.in" }, 4.06);

        masterTl.to(layers[4], { opacity: 0, duration: 0.1 }, 4.36);
        masterTl.set(layers[4], { pointerEvents: "none", zIndex: 10 }, 4.40);
      }

      if (layers[5]) {
        masterTl.set(layers[5], { pointerEvents: "auto", zIndex: 20 }, 4.40);
        masterTl.to(layers[5], { opacity: 1, duration: 0.12 }, 4.40);

        const pHead = q(layers[5], "[class*='scene-platform-head-line-']");
        if (pHead) masterTl.to(pHead, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out", stagger: 0.06 }, 4.44);

        const pCopy = q(layers[5], ".scene-platform-label, .scene-platform-subline, .scene-platform-cta, .scene-platform-meta");
        if (pCopy) masterTl.to(pCopy, { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: "power3.out", stagger: 0.05 }, 4.44);

        const pPanel = q(layers[5], ".scene-platform-panel-wrapper, .scene-platform-glow");
        if (pPanel) masterTl.to(pPanel, { y: 0, scale: 1.0, opacity: 1, duration: 0.35, ease: "power3.out" }, 4.44);
      }
    }, container);

    // -------------------------------------------------------------
    // 3. INTENTIONAL GESTURE LISTENERS (WHEEL, TOUCH, KEYBOARD)
    // Decoupled from scroll speed: each gesture initiates an intentional
    // 1.4-second transition that finishes completely on its own timeline.
    // -------------------------------------------------------------
    const handleWheel = (e: WheelEvent) => {
      // Prevent browser native jump
      e.preventDefault();

      if (isLockedRef.current) return;
      if (Math.abs(e.deltaY) < 16) return;

      if (e.deltaY > 0) {
        // Advance to next scene
        if (currentSceneRef.current < 5) {
          goToScene(currentSceneRef.current + 1, 1.4);
        }
      } else {
        // Return to previous scene
        if (currentSceneRef.current > 0) {
          goToScene(currentSceneRef.current - 1, 1.4);
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isLockedRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 35) {
        if (diff > 0 && currentSceneRef.current < 5) {
          goToScene(currentSceneRef.current + 1, 1.4);
        } else if (diff < 0 && currentSceneRef.current > 0) {
          goToScene(currentSceneRef.current - 1, 1.4);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLockedRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        if (currentSceneRef.current < 5) goToScene(currentSceneRef.current + 1, 1.4);
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        if (currentSceneRef.current > 0) goToScene(currentSceneRef.current - 1, 1.4);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [reducedMotion, goToScene]);

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

  // Full Cinematic Decoupled Operating System Stage
  return (
    <div
      ref={containerRef}
      id="experience-container"
      className="relative w-full h-screen overflow-hidden select-none"
    >
      {/* Viewport Stage */}
      <div
        ref={stageRef}
        className="w-full h-full overflow-hidden relative"
      >
        {/* Dynamic Lemonade Stage Background */}
        <div
          ref={stageBgRef}
          className="absolute inset-0 w-full h-full bg-[#F1EACD] -z-30 transition-colors duration-700"
        />

        {/* Dynamic Ambient Lighting Gradient Atmosphere */}
        <div
          ref={stageAtmosphereRef}
          className="absolute inset-0 w-full h-full pointer-events-none -z-20 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 70% 45%, rgba(68,20,23,0.18) 0%, rgba(47,67,100,0.12) 35%, rgba(241,234,205,0) 70%)",
          }}
        />

        {/* Persistent 3D Living Architectural Diorama Canvas */}
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
