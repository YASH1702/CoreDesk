"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES } from "@/constants/motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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
    if (!container || !stage) return;

    const layers = sceneLayersRef.current.filter(Boolean) as HTMLDivElement[];
    if (layers.length < 6) return;

    const ctx = gsap.context(() => {
      // Set initial positions for all scenes
      // Scene 0 is visible and settled
      gsap.set(layers[0], { opacity: 1, pointerEvents: "auto", zIndex: 10 });
      gsap.set(layers[0].querySelectorAll(".scene-business-headline, .scene-business-label, .scene-business-subline, .scene-business-cta"), {
        x: 0,
        opacity: 1,
      });
      gsap.set(layers[0].querySelectorAll(".scene-business-panel"), {
        x: 0,
        scale: 1,
        opacity: 1,
      });

      // Scenes 1 through 5 start hidden with entrance offsets
      for (let i = 1; i < layers.length; i++) {
        const sceneId = SCENES[i].id;
        gsap.set(layers[i], { opacity: 0, pointerEvents: "none", zIndex: i + 10 });
        gsap.set(layers[i].querySelectorAll(`.scene-${sceneId}-headline, .scene-${sceneId}-label, .scene-${sceneId}-subline, .scene-${sceneId}-cta`), {
          x: -120,
          opacity: 0,
        });
        gsap.set(layers[i].querySelectorAll(`.scene-${sceneId}-panel`), {
          x: 220,
          scale: 0.92,
          opacity: 0,
        });
        gsap.set(layers[i].querySelectorAll(`.scene-${sceneId}-stagger`), {
          y: 30,
          opacity: 0,
        });
      }

      // Master Timeline linked to ScrollTrigger with scrub
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            // Map progress to active scene index (0 to 5)
            // Each scene has roughly 1/6th of the track
            const currentIdx = Math.min(5, Math.floor(p * 5.99));
            onSceneChange(currentIdx, p);
          },
        },
      });

      // Total timeline length = 15 units
      // Each transition takes 1.6 units, each hold takes 1.4 units
      // 5 transitions: 0->1, 1->2, 2->3, 3->4, 4->5

      const sceneTransitions = [
        { from: 0, to: 1, fromId: "business", toId: "customer" },
        { from: 1, to: 2, fromId: "customer", toId: "staff" },
        { from: 2, to: 3, fromId: "staff", toId: "control" },
        { from: 3, to: 4, fromId: "control", toId: "system" },
        { from: 4, to: 5, fromId: "system", toId: "platform" },
      ];

      let timeCursor = 1.0; // Initial hold for Scene 0

      sceneTransitions.forEach(({ from, to, fromId, toId }) => {
        const fromLayer = layers[from];
        const toLayer = layers[to];
        const dur = 1.6;

        // 1. OUTGOING SCENE DISASSEMBLY (Horizontal Split)
        masterTl.to(
          fromLayer.querySelectorAll(`.scene-${fromId}-headline, .scene-${fromId}-label, .scene-${fromId}-subline, .scene-${fromId}-cta`),
          {
            x: -140,
            opacity: 0,
            duration: dur * 0.8,
            ease: "power2.in",
          },
          timeCursor
        );

        masterTl.to(
          fromLayer.querySelectorAll(`.scene-${fromId}-panel`),
          {
            x: 240,
            scale: 0.88,
            opacity: 0,
            duration: dur * 0.8,
            ease: "power2.in",
          },
          timeCursor
        );

        masterTl.to(
          fromLayer,
          {
            opacity: 0,
            duration: dur * 0.5,
            ease: "power1.inOut",
            onComplete: () => {
              fromLayer.style.pointerEvents = "none";
            },
            onReverseComplete: () => {
              fromLayer.style.pointerEvents = "auto";
            },
          },
          timeCursor + dur * 0.3
        );

        // 2. INCOMING SCENE ASSEMBLY
        masterTl.set(
          toLayer,
          {
            pointerEvents: "auto",
          },
          timeCursor + dur * 0.2
        );

        masterTl.to(
          toLayer,
          {
            opacity: 1,
            duration: dur * 0.6,
            ease: "power1.inOut",
          },
          timeCursor + dur * 0.2
        );

        masterTl.to(
          toLayer.querySelectorAll(`.scene-${toId}-label`),
          {
            x: 0,
            opacity: 1,
            duration: dur * 0.7,
            ease: "power3.out",
          },
          timeCursor + dur * 0.3
        );

        masterTl.to(
          toLayer.querySelectorAll(`.scene-${toId}-headline`),
          {
            x: 0,
            opacity: 1,
            duration: dur * 0.8,
            ease: "power3.out",
          },
          timeCursor + dur * 0.35
        );

        masterTl.to(
          toLayer.querySelectorAll(`.scene-${toId}-subline`),
          {
            x: 0,
            opacity: 1,
            duration: dur * 0.8,
            ease: "power3.out",
          },
          timeCursor + dur * 0.4
        );

        masterTl.to(
          toLayer.querySelectorAll(`.scene-${toId}-cta`),
          {
            x: 0,
            opacity: 1,
            duration: dur * 0.7,
            ease: "power3.out",
          },
          timeCursor + dur * 0.45
        );

        masterTl.to(
          toLayer.querySelectorAll(`.scene-${toId}-panel`),
          {
            x: 0,
            scale: 1,
            opacity: 1,
            duration: dur * 0.85,
            ease: "power3.out",
          },
          timeCursor + dur * 0.35
        );

        masterTl.to(
          toLayer.querySelectorAll(`.scene-${toId}-stagger`),
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: dur * 0.7,
            ease: "power2.out",
          },
          timeCursor + dur * 0.45
        );

        // Advance cursor: transition duration + hold duration for this scene
        timeCursor += dur + 1.2;
      });
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

  // Full Cinematic Scroll Experience: Sticky Viewport Stage inside 600vh Track
  return (
    <div
      ref={containerRef}
      id="experience-container"
      className="relative w-full h-[600vh]"
    >
      {/* Pinned Viewport Stage */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#F8F7F3]"
      >
        {React.Children.map(children, (child, index) => {
          return (
            <div
              key={index}
              ref={(el) => {
                sceneLayersRef.current[index] = el;
              }}
              data-scene-layer={index}
              className="absolute inset-0 w-full h-full flex items-center justify-center transition-opacity"
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
