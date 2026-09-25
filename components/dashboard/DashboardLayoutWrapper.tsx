"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "../shared/ThemeProvider";
import {
  LayoutDashboard,
  Calendar,
  Layers,
  Users,
  CreditCard,
  UserCheck,
  Layout,
  LogOut,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Home,
  Sun,
  Moon,
} from "lucide-react";

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const role = (session?.user as any)?.role || "BUSINESS_OWNER";

  const adminNavItems = [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Appointments", href: "/dashboard/admin/appointments", icon: Calendar },
    { label: "Services Catalog", href: "/dashboard/admin/services", icon: Layers },
    { label: "CRM Customers", href: "/dashboard/admin/customers", icon: UserCheck },
    { label: "Billing & Invoices", href: "/dashboard/admin/invoices", icon: CreditCard },
    { label: "Team Specialists", href: "/dashboard/admin/team", icon: Users },
    { label: "No-Code CMS", href: "/dashboard/admin/cms", icon: Layout },
  ];

  const staffNavItems = [
    { label: "My Agenda", href: "/dashboard/staff", icon: Calendar },
  ];

  const customerNavItems = [
    { label: "My Bookings", href: "/dashboard/customer", icon: Calendar },
  ];

  const navItems =
    role === "STAFF"
      ? staffNavItems
      : role === "CUSTOMER"
      ? customerNavItems
      : adminNavItems;

  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#0B0E17] text-[#2A2927] dark:text-[#F8F7F3] flex overflow-x-hidden transition-colors duration-300">
      {/* Desktop Warm / Dark Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#F3EFE7] dark:bg-[#0F1422] border-r border-[#DDD6C9] dark:border-[#27314A] shrink-0 min-h-screen p-6 justify-between transition-colors duration-300">
        <div className="space-y-8">
          {/* Brand Logo - OnClick Redirect to Homepage */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer" title="Return to CoreDesk Homepage">
            <div className="w-9 h-9 rounded-2xl bg-[#C69A4B] text-white flex items-center justify-center shadow-gold-btn group-hover:scale-105 transition-transform">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#2A2927] dark:text-[#F8F7F3]">
              Core<span className="gold-text">Desk</span>
            </span>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B857D] dark:text-[#A0A8B8] px-3 mb-2">
              {role} Navigation
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#C69A4B] text-white shadow-gold-btn"
                      : "text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#2A2927] dark:hover:text-[#F8F7F3] hover:bg-white dark:hover:bg-[#1B2238]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#8B857D] dark:text-[#A0A8B8]"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile Footer & Theme Switcher */}
        <div className="pt-6 border-t border-[#DDD6C9] dark:border-[#27314A] space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-2xl bg-[#FFF8ED] dark:bg-[#1B2238] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A] flex items-center justify-center font-bold text-xs shrink-0">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] truncate">{session?.user?.name || "User Account"}</p>
                <p className="text-[10px] text-[#8B857D] dark:text-[#A0A8B8] truncate">{session?.user?.email}</p>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] hover:border-[#C69A4B] transition-all shadow-warm-sm shrink-0"
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
            >
              {theme === "light" ? <Moon className="w-3.5 h-3.5 text-[#2A2927]" /> : <Sun className="w-3.5 h-3.5 text-[#C69A4B]" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/"
              className="py-2 rounded-xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[11px] font-bold text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#C69A4B] dark:hover:text-[#E8D7B2] flex items-center justify-center gap-1 shadow-warm-sm transition-all cursor-pointer"
              title="Return to Homepage"
            >
              <Home className="w-3.5 h-3.5 text-[#C69A4B]" /> Homepage
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="py-2 rounded-xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center justify-center gap-1 shadow-warm-sm transition-all"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#F3EFE7] dark:bg-[#0F1422] border-b border-[#DDD6C9] dark:border-[#27314A]">
          <Link href="/" className="flex items-center gap-2 cursor-pointer" title="Return to Homepage">
            <div className="w-7 h-7 rounded-xl bg-[#C69A4B] text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-[#2A2927] dark:text-[#F8F7F3]">CoreDesk</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3]"
            >
              {theme === "light" ? <Moon className="w-4 h-4 text-[#2A2927]" /> : <Sun className="w-4 h-4 text-[#C69A4B]" />}
            </button>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-2 rounded-xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3]"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Main Children */}
        <main className="flex-1 bg-[#F8F7F3] dark:bg-[#0B0E17] transition-colors duration-300">{children}</main>
      </div>
    </div>
  );
}
