"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * AmbientCursorSpotlight
 * Interactive Cursor Ambient Spotlight (Luminous Refraction Follower)
 * Tracks cursor with smooth inertia and shines dynamically through
 * frosted glass buttons and panels using backdrop-blur.
 */
export function AmbientCursorSpotlight() {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Check for touch-only device
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      // Gentle stationary ambient glow for touch devices
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${window.innerWidth / 2}px, ${window.innerHeight / 2}px, 0)`;
        setIsVisible(true);
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) {
        setIsVisible(true);
        // Initialize position on first movement
        if (currentPos.current.x === -1000) {
          currentPos.current = { x: e.clientX, y: e.clientY };
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth Lerp Animation Loop
    const animate = () => {
      const lerp = 0.085; // Luxurious physics spring factor
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden select-none"
    >
      <div
        ref={glowRef}
        className="absolute top-0 left-0 rounded-full will-change-transform transition-opacity duration-700 pointer-events-none"
        style={{
          width: "680px",
          height: "680px",
          opacity: isVisible ? 1 : 0,
          background:
            "radial-gradient(circle closest-side, rgba(138, 162, 186, 0.22) 0%, rgba(245, 242, 235, 0.16) 28%, rgba(55, 38, 26, 0.05) 52%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}

export default AmbientCursorSpotlight;
