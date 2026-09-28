"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#DDD6C9] dark:border-[#27314A] bg-[#F2EFE6] dark:bg-[#0F1422] text-[#2A2927] dark:text-[#F8F7F3] pt-16 pb-12 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#C69A4B] text-white flex items-center justify-center shadow-gold-btn">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#2A2927] dark:text-[#F8F7F3]">
                Business<span className="gold-text">Flow</span>
              </span>
            </Link>
            <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] max-w-sm leading-relaxed">
              The premier business website, automated appointment management engine, and no-code CMS designed with a warm, luxury-crafted visual identity.
            </p>
          </div>

          {/* Nav Links Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#8B857D] dark:text-[#A0A8B8] uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/book" className="text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#C69A4B] transition-colors font-medium">
                  Booking Engine
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#C69A4B] transition-colors font-medium">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#C69A4B] transition-colors font-medium">
                  Services Catalog
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#C69A4B] transition-colors font-medium">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links Col 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#8B857D] dark:text-[#A0A8B8] uppercase tracking-wider">Industries</h4>
            <ul className="space-y-2 text-xs font-medium text-[#5D5A56] dark:text-[#A0A8B8]">
              <li>Advisory & Consulting</li>
              <li>Luxury Salons & Spas</li>
              <li>Fitness Studios & Gyms</li>
              <li>Medical Practices</li>
            </ul>
          </div>

          {/* Nav Links Col 3 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#8B857D] dark:text-[#A0A8B8] uppercase tracking-wider">Security & Legal</h4>
            <ul className="space-y-2 text-xs font-medium text-[#5D5A56] dark:text-[#A0A8B8]">
              <li>Stripe PCI-DSS Level 1 Security</li>
              <li>RFC 5545 iCalendar (.ics) Sync</li>
              <li>NextAuth Enterprise RBAC</li>
              <li>Terms of Service & Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#DDD6C9] dark:border-[#27314A] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8B857D] dark:text-[#A0A8B8] gap-4">
          <p>© {new Date().getFullYear()} BusinessFlow Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1 font-medium">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#C69A4B] fill-[#C69A4B]" /> for premium enterprises.
          </p>
        </div>
      </div>
    </footer>
  );
}
