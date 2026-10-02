"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * CustomCursor
 * Luxury editorial cursor with a zero-latency Dark Chocolate precision core
 * and an organic frosted-glass spring follower ring with tactile hover states.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch / coarse pointer devices
    const isCoarse = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isCoarse) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Immediate zero-latency positioning for the inner precision dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      if (!isVisible) {
        setIsVisible(true);
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      // Check if cursor is over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], select, label, [data-cursor="pointer"], .cursor-pointer, Link'
        );
        setIsHovered(Boolean(interactive));
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Fluid spring physics loop for the frosted glass follower ring
    const animate = () => {
      const lerp = 0.18; // Crisp, snappy spring factor
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none"
    >
      {/* Precision Core Dot (Zero lag, Dark Chocolate) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-[#37261A] transition-[width,height,opacity,background-color] duration-150 pointer-events-none will-change-transform ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "w-2 h-2 bg-[#37261A]" : isClicked ? "w-2.5 h-2.5 bg-[#493323]" : "w-1.5 h-1.5"}`}
        style={{
          boxShadow: "0 0 3px rgba(55, 38, 26, 0.5)",
        }}
      />

      {/* Outer Frosted Glass Spring Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none will-change-transform backdrop-blur-[2px] transition-[width,height,border-color,background-color,opacity,box-shadow] duration-200 ease-out flex items-center justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? "w-12 h-12 border-2 border-[#37261A] bg-[#FAF8F5]/40 shadow-[0_4px_20px_rgba(55,38,26,0.18)]"
            : isClicked
            ? "w-7 h-7 border-2 border-[#37261A]/80 bg-[#37261A]/10"
            : "w-9 h-9 border border-[#37261A]/40 bg-[#FAF8F5]/20 shadow-[0_2px_10px_rgba(55,38,26,0.06)]"
        }`}
      />
    </div>
  );
}

export default CustomCursor;
