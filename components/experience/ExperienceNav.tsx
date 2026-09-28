"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ExperienceNav() {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -100%",
        end: 99999,
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current, {
              backgroundColor: "rgba(248, 247, 243, 0.95)",
              backdropFilter: "blur(12px)",
              duration: 0.3,
            });
          } else {
            gsap.to(navRef.current, {
              backgroundColor: "rgba(248, 247, 243, 0.8)",
              backdropFilter: "blur(8px)",
              duration: 0.3,
            });
          }
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 h-[56px] border-b border-black/5 bg-[#F8F7F3]/80 backdrop-blur-md"
    >
      <Link href="/" className="text-sm font-medium tracking-wide">
        Business<span className="text-[#C69A4B]">Flow</span>
      </Link>
      
      <div className="flex items-center">
        <Link 
          href="/case-study"
          className="text-xs uppercase tracking-widest font-medium text-[#C69A4B] hover:text-[#C69A4B]/80 transition-colors"
        >
          Case Study
        </Link>
      </div>
    </header>
  );
}
