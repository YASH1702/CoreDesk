"use client";

import React, { useEffect, useRef, useLayoutEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES, MOTION } from "@/constants/motion";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollExperienceProps {
  children: React.ReactNode;
}

export default function ScrollExperience({ children }: ScrollExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Create a master timeline for the entire experience
      const sections = gsap.utils.toArray<HTMLElement>("[data-scene-id]");
      if (sections.length === 0) return;

      sections.forEach((section, index) => {
        const sceneId = section.dataset.sceneId;

        // --- ENTER ANIMATION ---
        // Elements that enter when this scene comes into view
        const enterTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            onEnter: () => setActiveScene(index),
            onEnterBack: () => setActiveScene(index),
          },
        });

        // Animate headline from left
        const headline = section.querySelector(`.scene-${sceneId}-headline`);
        if (headline) {
          enterTl.fromTo(
            headline,
            { x: -MOTION.distance.typographySlide, opacity: 0 },
            { x: 0, opacity: 1, duration: MOTION.duration.premium, ease: MOTION.ease.premium },
            0
          );
        }

        // Animate subline
        const subline = section.querySelector(`.scene-${sceneId}-subline`);
        if (subline) {
          enterTl.fromTo(
            subline,
            { x: -MOTION.distance.typographySlide * 0.5, opacity: 0 },
            { x: 0, opacity: 1, duration: MOTION.duration.slow, ease: MOTION.ease.premium },
            0.15
          );
        }

        // Animate label
        const label = section.querySelector(`.scene-${sceneId}-label`);
        if (label) {
          enterTl.fromTo(
            label,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: MOTION.duration.medium, ease: MOTION.ease.enter },
            0.05
          );
        }

        // Animate panel from right
        const panel = section.querySelector(`.scene-${sceneId}-panel`);
        if (panel) {
          enterTl.fromTo(
            panel,
            { x: MOTION.distance.uiSlide, opacity: 0, scale: MOTION.distance.scaleFrom },
            { x: 0, opacity: 1, scale: MOTION.distance.scaleTo, duration: MOTION.duration.premium, ease: MOTION.ease.premium },
            0.1
          );
        }

        // Animate CTA
        const cta = section.querySelector(`.scene-${sceneId}-cta`);
        if (cta) {
          enterTl.fromTo(
            cta,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: MOTION.duration.medium, ease: MOTION.ease.enter },
            0.3
          );
        }

        // Animate staggered elements (e.g., step cards, metric cards)
        const staggerElements = section.querySelectorAll(`.scene-${sceneId}-stagger`);
        if (staggerElements.length > 0) {
          enterTl.fromTo(
            staggerElements,
            { x: MOTION.distance.elementSlide, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: MOTION.duration.slow,
              ease: MOTION.ease.premium,
              stagger: MOTION.stagger.elements,
            },
            0.2
          );
        }

        // --- EXIT ANIMATION (for all scenes except the last) ---
        if (index < sections.length - 1) {
          const exitTl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "bottom 60%",
              end: "bottom 10%",
              scrub: 1,
            },
          });

          // Headline exits left
          if (headline) {
            exitTl.to(headline, {
              x: -MOTION.distance.typographySlide * 1.5,
              opacity: 0,
              duration: MOTION.duration.slow,
              ease: MOTION.ease.exit,
            }, 0);
          }

          // Panel exits right
          if (panel) {
            exitTl.to(panel, {
              x: MOTION.distance.uiSlide * 1.2,
              opacity: 0,
              scale: 0.9,
              duration: MOTION.duration.slow,
              ease: MOTION.ease.exit,
            }, 0);
          }

          // Subline exits
          if (subline) {
            exitTl.to(subline, {
              x: -MOTION.distance.typographySlide,
              opacity: 0,
              duration: MOTION.duration.medium,
              ease: MOTION.ease.exit,
            }, 0.05);
          }

          // Label exits
          if (label) {
            exitTl.to(label, {
              x: -60,
              opacity: 0,
              duration: MOTION.duration.medium,
              ease: MOTION.ease.exit,
            }, 0);
          }

          // CTA exits
          if (cta) {
            exitTl.to(cta, {
              y: 40,
              opacity: 0,
              duration: MOTION.duration.medium,
              ease: MOTION.ease.exit,
            }, 0);
          }

          // Stagger elements exit
          if (staggerElements.length > 0) {
            exitTl.to(staggerElements, {
              x: MOTION.distance.elementSlide * 1.5,
              opacity: 0,
              duration: MOTION.duration.medium,
              ease: MOTION.ease.exit,
              stagger: MOTION.stagger.fast,
            }, 0);
          }
        }
      });

      // Master progress tracker
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Pass activeScene and progress to children via CSS custom properties */}
      <div
        style={{
          "--active-scene": activeScene,
          "--scroll-progress": scrollProgress,
        } as React.CSSProperties}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              activeScene,
              scrollProgress,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}
