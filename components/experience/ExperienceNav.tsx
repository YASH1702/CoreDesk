"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ExperienceNav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -50px",
        end: 99999,
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current, {
              backgroundColor: "rgba(241, 234, 205, 0.96)",
              borderColor: "rgba(222, 214, 184, 0.8)",
              boxShadow: "0 10px 30px rgba(47, 67, 100, 0.06)",
              duration: 0.3,
            });
          } else {
            gsap.to(navRef.current, {
              backgroundColor: "rgba(241, 234, 205, 0.82)",
              borderColor: "rgba(222, 214, 184, 0.4)",
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
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 h-16 border-b border-[#DED6B8]/40 bg-[#F1EACD]/80 backdrop-blur-xl transition-all duration-300"
    >
      {/* Brand Mark */}
      <Link href="/" className="flex items-center gap-2.5 group cursor-pointer" title="BusinessFlow">
        <div className="w-8 h-8 rounded-xl bg-[#441417] text-[#F1EACD] flex items-center justify-center shadow-[0_4px_12px_rgba(68,20,23,0.3)] group-hover:scale-105 transition-transform duration-200">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-base font-extrabold tracking-tight text-[#2F4364]">
          Business<span className="text-[#441417]">Flow</span>
        </span>
        <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF6EB] text-[#441417] border border-[#DED6B8]">
          OS v2.0
        </span>
      </Link>

      {/* Primary Navigation Shortcuts */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/book"
          className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#5C6E88] hover:text-[#441417] px-3 py-2 rounded-xl transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-[#441417]" />
          <span>Live Booking</span>
        </Link>

        <Link
          href="/dashboard/admin"
          className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#5C6E88] hover:text-[#441417] px-3 py-2 rounded-xl transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#5C6E88]" />
          <span>Admin Console</span>
        </Link>

        <Link
          href="/login"
          className="px-4 py-2 rounded-full text-xs font-bold text-[#2F4364] border border-[#DED6B8] hover:bg-[#FAF6EB] hover:border-[#441417] transition-all duration-200"
        >
          Sign In
        </Link>

        <Link
          href="/book"
          className="px-4 sm:px-5 py-2 rounded-full bg-[#441417] hover:bg-[#561B1F] text-[#F1EACD] text-xs font-bold shadow-[0_4px_15px_rgba(68,20,23,0.25)] transition-all duration-200 flex items-center gap-1.5 group cursor-pointer"
        >
          <span>Book Demo</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </header>
  );
}
