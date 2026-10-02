"use client";

import React, { useRef, useState, useEffect } from "react";

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0.1 to 0.5 (default 0.28)
  radius?: number; // pixel activation radius outside element bounds (default 40)
}

/**
 * MagneticWrapper
 * Adds a physical magnetic attraction effect to buttons and interactive elements.
 * As the user's cursor approaches within `radius`, the element attracts towards the cursor.
 */
export function MagneticWrapper({
  children,
  className = "",
  strength = 0.28,
  radius = 45,
}: MagneticWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (prefersReducedMotion || isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      const maxDistance = Math.max(rect.width, rect.height) / 2 + radius;

      if (distance < maxDistance) {
        setIsHovered(true);
        // Magnetic pull toward cursor
        const pull = 1 - distance / maxDistance;
        setOffset({
          x: deltaX * strength * pull,
          y: deltaY * strength * pull,
        });
      } else if (isHovered) {
        setIsHovered(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, radius, strength]);

  return (
    <div
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovered
          ? "transform 140ms cubic-bezier(0.2, 0.9, 0.3, 1)"
          : "transform 450ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
    >
      {children}
    </div>
  );
}

export default MagneticWrapper;
