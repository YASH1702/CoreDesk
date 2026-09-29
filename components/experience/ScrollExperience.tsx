"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SCENES } from "@/constants/motion";
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
  const sceneLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

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
    if (!container || !stage) return;

    const layers = sceneLayersRef.current.filter(Boolean) as HTMLDivElement[];
    if (layers.length < 6) return;

    // Safe selector helper to prevent empty NodeList warnings in GSAP
    const q = (el: HTMLElement, selector: string) => {
      const found = el.querySelectorAll(selector);
      return found.length > 0 ? found : null;
    };

    const ctx = gsap.context(() => {
      // Background colors representing the Warm Sand identity progression
      const bgColors = [
        "#F8F7F3", // 0: Business (Ivory Sand)
        "#FFFDF8", // 1: Customer (Luminous Champagne)
        "#F5EFE3", // 2: Staff (Focused Studio Sand)
        "#EFE7D8", // 3: Control (Executive Rich Sand)
        "#F5EFE5", // 4: System (Relational Cream)
        "#F8F7F3", // 5: Platform (Expansive Warm White)
      ];

      // 1. Initial State: Scene 0 settled and interactive
      gsap.set(layers[0], { opacity: 1, pointerEvents: "auto", zIndex: 20 });
      const s0Head = q(layers[0], ".scene-business-headline, .scene-business-label, .scene-business-subline, .scene-business-cta");
      if (s0Head) gsap.set(s0Head, { x: 0, opacity: 1 });
      const s0Panel = q(layers[0], ".scene-business-panel");
      if (s0Panel) gsap.set(s0Panel, { x: 0, scale: 1, opacity: 1 });
      const s0Scroll = q(layers[0], ".scene-business-scroll");
      if (s0Scroll) gsap.set(s0Scroll, { opacity: 1, y: 0 });

      // 2. Initial State: Scenes 1 through 5 hidden with entrance offsets
      for (let i = 1; i < layers.length; i++) {
        const sceneId = SCENES[i].id;
        gsap.set(layers[i], { opacity: 0, pointerEvents: "none", zIndex: 10 });

        const incomingHead = q(layers[i], `.scene-${sceneId}-headline, .scene-${sceneId}-label, .scene-${sceneId}-subline, .scene-${sceneId}-cta`);
        if (incomingHead) {
          gsap.set(incomingHead, {
            x: sceneId === "platform" ? 0 : -140,
            y: sceneId === "platform" ? 50 : 0,
            opacity: 0,
          });
        }

        const incomingPanel = q(layers[i], `.scene-${sceneId}-panel`);
        if (incomingPanel) {
          gsap.set(incomingPanel, { x: 180, scale: 0.92, opacity: 0 });
        }

        const incomingStagger = q(layers[i], `.scene-${sceneId}-stagger`);
        if (incomingStagger) {
          gsap.set(incomingStagger, { y: 25, opacity: 0 });
        }
      }

      // 3. Master Timeline with ScrollTrigger Pinning
      // Responsive 2800px scrub track for immediate, tactile responsiveness
      const masterTl = gsap.timeline({
        scrollTrigger: {
          id: "experience-trigger",
          trigger: container,
          pin: stage,
          start: "top top",
          end: "+=2800",
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const currentIdx = Math.min(5, Math.floor(p * 5.99));
            onSceneChange(currentIdx, p);
          },
        },
      });

      const sceneTransitions = [
        { from: 0, to: 1, fromId: "business", toId: "customer" },
        { from: 1, to: 2, fromId: "customer", toId: "staff" },
        { from: 2, to: 3, fromId: "staff", toId: "control" },
        { from: 3, to: 4, fromId: "control", toId: "system" },
        { from: 4, to: 5, fromId: "system", toId: "platform" },
      ];

      // Quick start: animation begins within first 40px of scrolling
      let timeCursor = 0.2;
      const dur = 1.3;

      sceneTransitions.forEach(({ from, to, fromId, toId }) => {
        const fromLayer = layers[from];
        const toLayer = layers[to];

        // Background color transition
        if (stageBg) {
          masterTl.to(
            stageBg,
            {
              backgroundColor: bgColors[to],
              duration: dur * 0.9,
              ease: "power1.inOut",
            },
            timeCursor
          );
        }

        // OUTGOING SCENE DISASSEMBLY (Horizontal Split)
        const fromHead = q(fromLayer, `.scene-${fromId}-headline, .scene-${fromId}-label, .scene-${fromId}-subline, .scene-${fromId}-cta`);
        if (fromHead) {
          masterTl.to(
            fromHead,
            {
              x: fromId === "platform" ? 0 : -150,
              y: fromId === "platform" ? -50 : 0,
              opacity: 0,
              duration: dur * 0.75,
              ease: "power2.in",
            },
            timeCursor
          );
        }

        const fromScroll = q(fromLayer, `.scene-${fromId}-scroll`);
        if (fromScroll) {
          masterTl.to(fromScroll, { opacity: 0, duration: dur * 0.4 }, timeCursor);
        }

        const fromPanel = q(fromLayer, `.scene-${fromId}-panel`);
        if (fromPanel) {
          masterTl.to(
            fromPanel,
            {
              x: 180,
              scale: 0.90,
              opacity: 0,
              duration: dur * 0.75,
              ease: "power2.in",
            },
            timeCursor
          );
        }

        // Cross-fade opacity between layers
        masterTl.to(
          fromLayer,
          {
            opacity: 0,
            duration: dur * 0.5,
            ease: "power1.inOut",
          },
          timeCursor + dur * 0.25
        );

        masterTl.set(fromLayer, { pointerEvents: "none", zIndex: 10 }, timeCursor + dur * 0.5);

        // INCOMING SCENE ASSEMBLY (Horizontal Convergence)
        masterTl.set(toLayer, { pointerEvents: "auto", zIndex: 20 }, timeCursor + dur * 0.2);

        masterTl.to(
          toLayer,
          {
            opacity: 1,
            duration: dur * 0.55,
            ease: "power1.inOut",
          },
          timeCursor + dur * 0.2
        );

        const toLabel = q(toLayer, `.scene-${toId}-label`);
        if (toLabel) {
          masterTl.to(
            toLabel,
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: dur * 0.6,
              ease: "power3.out",
            },
            timeCursor + dur * 0.3
          );
        }

        const toHeadline = q(toLayer, `.scene-${toId}-headline`);
        if (toHeadline) {
          masterTl.to(
            toHeadline,
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: dur * 0.7,
              ease: "power3.out",
            },
            timeCursor + dur * 0.35
          );
        }

        const toSubline = q(toLayer, `.scene-${toId}-subline`);
        if (toSubline) {
          masterTl.to(
            toSubline,
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: dur * 0.7,
              ease: "power3.out",
            },
            timeCursor + dur * 0.4
          );
        }

        const toCta = q(toLayer, `.scene-${toId}-cta`);
        if (toCta) {
          masterTl.to(
            toCta,
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: dur * 0.65,
              ease: "power3.out",
            },
            timeCursor + dur * 0.45
          );
        }

        const toPanel = q(toLayer, `.scene-${toId}-panel`);
        if (toPanel) {
          masterTl.to(
            toPanel,
            {
              x: 0,
              scale: 1,
              opacity: 1,
              duration: dur * 0.75,
              ease: "power3.out",
            },
            timeCursor + dur * 0.35
          );
        }

        const toStagger = q(toLayer, `.scene-${toId}-stagger`);
        if (toStagger) {
          masterTl.to(
            toStagger,
            {
              y: 0,
              opacity: 1,
              stagger: 0.06,
              duration: dur * 0.6,
              ease: "power2.out",
            },
            timeCursor + dur * 0.4
          );
        }

        // Hold pause on this settled scene before next transition starts
        timeCursor += dur + 0.65;
      });

      // Refresh ScrollTrigger to calculate accurate pin metrics
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);

      return () => {
        clearTimeout(refreshTimeout);
      };
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

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
          className="absolute inset-0 w-full h-full bg-[#F8F7F3] -z-20 transition-colors duration-500"
        />

        {/* Persistent 3D Ambient Spatial Canvas across all 6 scenes */}
        <AmbientSpatialCanvas className="z-0" />

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
