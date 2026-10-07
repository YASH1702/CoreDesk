"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Calendar, ShieldCheck, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticWrapper } from "@/components/shared/MagneticWrapper";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

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
          const isDark = document.documentElement.classList.contains("dark");
          if (self.isActive) {
            gsap.to(navRef.current, {
              backgroundColor: isDark ? "rgba(24, 18, 13, 0.94)" : "rgba(222, 217, 208, 0.92)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              duration: 0.3,
            });
          } else {
            gsap.to(navRef.current, {
              backgroundColor: isDark ? "rgba(24, 18, 13, 0.80)" : "rgba(222, 217, 208, 0.75)",
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
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 sm:px-10 h-16 bg-[#DED9D0]/75 dark:bg-[#18120D]/80 backdrop-blur-xl transition-all duration-300"
    >
      {/* Brand Mark */}
      <Link href="/" className="flex items-center gap-2.5 group cursor-pointer" title="CoreDesk">
        <div className="w-8 h-8 rounded-xl bg-[#37261A] dark:bg-[#F5F2EB] text-[#F5F2EB] dark:text-[#18120D] flex items-center justify-center shadow-[0_4px_12px_rgba(55,38,26,0.3)] group-hover:scale-105 transition-transform duration-200">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="text-base font-extrabold tracking-tight text-[#1E1E1E] dark:text-[#F5F2EB]">
          Core<span className="text-[#37261A] dark:text-[#8AA2BA]">Desk</span>
        </span>
        <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F5F2EB]/70 dark:bg-[#251D16]/80 backdrop-blur-md text-[#37261A] dark:text-[#8AA2BA] border border-[#C8C1B4]/70 dark:border-[#37261A]/80">
          OS v2.0
        </span>
      </Link>

      {/* Primary Navigation Shortcuts */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link
          href="/book"
          className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#5D554A] dark:text-[#AAA194] hover:text-[#37261A] dark:hover:text-[#F5F2EB] px-3 py-2 rounded-xl transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-[#37261A] dark:text-[#8AA2BA]" />
          <span>Live Booking</span>
        </Link>

        <Link
          href="/dashboard/admin"
          className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#5D554A] dark:text-[#AAA194] hover:text-[#37261A] dark:hover:text-[#F5F2EB] px-3 py-2 rounded-xl transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#5D554A]" />
          <span>Admin Console</span>
        </Link>

        {/* Lighting Mode Switcher (Day Khadi vs Espresso Noir) */}
        <ThemeToggle />

        <MagneticWrapper strength={0.3} radius={35}>
          <Link
            href="/login"
            className="px-4 py-2 rounded-full text-xs font-bold text-[#1E1E1E] bg-[#FAF8F5]/70 hover:bg-[#FAF8F5]/95 backdrop-blur-2xl border-2 border-[#37261A]/35 hover:border-[#37261A] shadow-sm transition-all duration-200 cursor-pointer block"
          >
            Sign In
          </Link>
        </MagneticWrapper>

        <MagneticWrapper strength={0.3} radius={35}>
          <Link
            href="/book"
            className="px-4 sm:px-5 py-2 rounded-full bg-[#37261A]/85 hover:bg-[#37261A] backdrop-blur-2xl border-2 border-[#37261A]/70 hover:border-[#37261A] text-[#F5F2EB] text-xs font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_4px_15px_rgba(55,38,26,0.25)] transition-all duration-200 flex items-center gap-1.5 group cursor-pointer"
          >
            <span>Book Demo</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </MagneticWrapper>
      </div>
    </header>
  );
}
