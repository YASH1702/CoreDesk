"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./ThemeProvider";
import { Sparkles, Calendar, LogOut, LayoutDashboard, Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (!session?.user) return "/login";
    const role = (session.user as any).role;
    if (role === "BUSINESS_OWNER" || role === "ADMIN") return "/dashboard/admin";
    if (role === "STAFF") return "/dashboard/staff";
    return "/dashboard/customer";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8F7F3]/90 dark:bg-[#0B0E17]/90 backdrop-blur-2xl border-b border-[#DDD6C9] dark:border-[#27314A] shadow-warm-sm dark:shadow-dark-md py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer" title="Return to BusinessFlow Homepage">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C69A4B] via-[#B7863D] to-[#8F6B2F] flex items-center justify-center shadow-gold-btn group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#2A2927] dark:text-[#F8F7F3]">
            Business<span className="gold-text">Flow</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
          <Link href="/#services" className="text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#2A2927] dark:hover:text-[#F8F7F3] transition-colors">
            Services
          </Link>
          <Link href="/#workflow" className="text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#2A2927] dark:hover:text-[#F8F7F3] transition-colors">
            Workflow
          </Link>
          <Link href="/#pricing" className="text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#2A2927] dark:hover:text-[#F8F7F3] transition-colors">
            Pricing
          </Link>
          <Link href="/#faq" className="text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#2A2927] dark:hover:text-[#F8F7F3] transition-colors">
            FAQ
          </Link>
          <Link href="/book" className="text-[#B7863D] dark:text-[#E8D7B2] hover:text-[#C69A4B] font-bold transition-colors flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> Live Booking Demo
          </Link>
        </nav>

        {/* Right Action Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] hover:border-[#C69A4B] transition-all shadow-warm-sm"
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
          >
            {theme === "light" ? <Moon className="w-4 h-4 text-[#2A2927]" /> : <Sun className="w-4 h-4 text-[#C69A4B]" />}
          </button>

          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href={getDashboardLink()}
                className="px-5 py-2.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-gold-btn transition-all flex items-center gap-2"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2.5 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#5D5A56] dark:text-[#A0A8B8] hover:text-rose-600 transition-all"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2.5 rounded-2xl text-[#2A2927] dark:text-[#F8F7F3] hover:text-[#C69A4B] text-xs font-bold transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-gold-btn transition-all"
              >
                Start Free Trial
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3]"
          >
            {theme === "light" ? <Moon className="w-5 h-5 text-[#2A2927]" /> : <Sun className="w-5 h-5 text-[#C69A4B]" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-[#DDD6C9] dark:border-[#27314A] px-4 py-6 space-y-4 bg-[#FFFCF7]/95 dark:bg-[#0B0E17]/95"
          >
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-[#2A2927] dark:text-[#F8F7F3]"
            >
              Services
            </Link>
            <Link
              href="/#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-[#2A2927] dark:text-[#F8F7F3]"
            >
              Workflow
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold uppercase tracking-wider text-[#2A2927] dark:text-[#F8F7F3]"
            >
              Pricing
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold text-[#C69A4B]"
            >
              Live Booking Portal
            </Link>
            <div className="pt-4 border-t border-[#DDD6C9] dark:border-[#27314A] flex flex-col gap-2">
              {session?.user ? (
                <Link
                  href={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-2xl bg-[#C69A4B] text-white text-center text-xs font-bold shadow-gold-btn"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] text-center text-xs font-bold"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-2xl bg-[#C69A4B] text-white text-center text-xs font-bold shadow-gold-btn"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
