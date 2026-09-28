"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ExperienceNav() {
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -50px",
        end: 99999,
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current, {
              backgroundColor: "rgba(248, 247, 243, 0.95)",
              borderColor: "rgba(221, 214, 201, 0.8)",
              boxShadow: "0 10px 30px rgba(80, 65, 45, 0.05)",
              duration: 0.3,
            });
          } else {
            gsap.to(navRef.current, {
              backgroundColor: "rgba(248, 247, 243, 0.75)",
              borderColor: "rgba(221, 214, 201, 0.4)",
              boxShadow: "none",
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
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 h-16 border-b border-[#DDD6C9]/40 bg-[#F8F7F3]/75 backdrop-blur-xl transition-all duration-300"
    >
      {/* Brand Mark */}
      <Link href="/" className="flex items-center gap-2.5 group cursor-pointer" title="BusinessFlow">
        <div className="w-8 h-8 rounded-xl bg-[#C69A4B] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(198,154,75,0.3)] group-hover:scale-105 transition-transform duration-200">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-base font-extrabold tracking-tight text-[#2A2927]">
          Business<span className="text-[#C69A4B]">Flow</span>
        </span>
        <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8ED] text-[#C69A4B] border border-[#E8D7B2]">
          OS v2.0
        </span>
      </Link>

      {/* Primary Navigation Shortcuts */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/book"
          className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#5D5A56] hover:text-[#C69A4B] px-3 py-2 rounded-xl transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C69A4B]" />
          <span>Live Booking</span>
        </Link>

        <Link
          href="/dashboard/admin"
          className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#5D5A56] hover:text-[#C69A4B] px-3 py-2 rounded-xl transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#8B857D]" />
          <span>Admin Console</span>
        </Link>

        <Link
          href="/login"
          className="px-4 py-2 rounded-full text-xs font-bold text-[#2A2927] border border-[#DDD6C9] hover:bg-white hover:border-[#C69A4B] transition-all duration-200"
        >
          Sign In
        </Link>

        <Link
          href="/book"
          className="px-4 sm:px-5 py-2 rounded-full bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-[0_4px_15px_rgba(198,154,75,0.25)] transition-all duration-200 flex items-center gap-1.5 group cursor-pointer"
        >
          <span>Book Demo</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </header>
  );
}
