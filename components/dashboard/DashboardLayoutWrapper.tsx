"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Building2,
  PlusCircle,
  ExternalLink,
  MessageSquareQuote,
  Check,
} from "lucide-react";
import { getUserBusinesses, createNewBusiness } from "@/actions/dashboard";

export default function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Multi-business state
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [activeBusiness, setActiveBusiness] = useState<any>(null);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newBizName, setNewBizName] = useState("");
  const [newBizIndustry, setNewBizIndustry] = useState("CONSULTING");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const role = (session?.user as any)?.role || "BUSINESS_OWNER";
  const userId = (session?.user as any)?.id;

  useEffect(() => {
    async function loadBusinesses() {
      const res = await getUserBusinesses(userId);
      if (res.success && res.businesses.length > 0) {
        setBusinesses(res.businesses);
        setActiveBusiness(res.businesses[0]);
      }
    }
    loadBusinesses();
  }, [userId]);

  const handleCreateBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBizName.trim() || !userId) return;
    setIsSubmitting(true);
    try {
      const res = await createNewBusiness({
        userId,
        name: newBizName,
        industry: newBizIndustry,
      });
      if (res.success && res.business) {
        setBusinesses((prev) => [res.business, ...prev]);
        setActiveBusiness(res.business);
        setCreateModalOpen(false);
        setNewBizName("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const adminNavItems = [
    { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Appointments", href: "/dashboard/admin/appointments", icon: Calendar },
    { label: "Services Catalog", href: "/dashboard/admin/services", icon: Layers },
    { label: "CRM Customers", href: "/dashboard/admin/customers", icon: UserCheck },
    { label: "Billing & Invoices", href: "/dashboard/admin/invoices", icon: CreditCard },
    { label: "Team Specialists", href: "/dashboard/admin/team", icon: Users },
    { label: "Client Inquiries", href: "/dashboard/admin/inquiries", icon: MessageSquareQuote },
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
      {/* Desktop Warm Executive Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-[#F3EFE7] dark:bg-[#0F1422] border-r border-[#DDD6C9] dark:border-[#27314A] shrink-0 min-h-screen p-6 justify-between transition-colors duration-300 z-30">
        <div className="space-y-6">
          {/* Brand Mark */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer" title="Return to BusinessFlow">
            <div className="w-9 h-9 rounded-2xl bg-[#C69A4B] text-white flex items-center justify-center shadow-gold-btn group-hover:scale-105 transition-transform">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#2A2927] dark:text-[#F8F7F3]">
              Business<span className="gold-text">Flow</span>
            </span>
            <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8ED] dark:bg-[#1B2238] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A]">
              OS
            </span>
          </Link>

          {/* Multi-Business Switcher (Admin/Owner) */}
          {(role === "BUSINESS_OWNER" || role === "ADMIN") && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
                className="w-full p-3 rounded-2xl bg-white/80 dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] flex items-center justify-between text-left hover:border-[#C69A4B] transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF8ED] text-[#C69A4B] border border-[#E8D7B2] flex items-center justify-center font-bold text-xs shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] truncate">
                      {activeBusiness?.name || "Select Business"}
                    </div>
                    <div className="text-[10px] text-[#8B857D] dark:text-[#A0A8B8] truncate uppercase tracking-wider">
                      {activeBusiness?.industry || "Enterprise"}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-[#8B857D] transition-transform ${businessDropdownOpen ? "rotate-90" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {businessDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-white dark:bg-[#161C2E] border border-[#DDD6C9] dark:border-[#27314A] rounded-2xl shadow-xl z-50 space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B857D] px-2 py-1">
                    Your Businesses
                  </div>
                  {businesses.map((biz) => (
                    <button
                      key={biz.id}
                      onClick={() => {
                        setActiveBusiness(biz);
                        setBusinessDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold hover:bg-[#F8F7F3] dark:hover:bg-[#1B2238] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="truncate">{biz.name}</span>
                      {activeBusiness?.id === biz.id && <Check className="w-3.5 h-3.5 text-[#C69A4B]" />}
                    </button>
                  ))}

                  <div className="pt-2 border-t border-[#ECE6D8] dark:border-[#27314A]">
                    <button
                      onClick={() => {
                        setBusinessDropdownOpen(false);
                        setCreateModalOpen(true);
                      }}
                      className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-[#C69A4B] hover:bg-[#FFF8ED] dark:hover:bg-[#1B2238] flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Create New Business</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B857D] dark:text-[#A0A8B8] px-3 mb-2">
              Workspace Navigation
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
          {activeBusiness?.slug && (
            <Link
              href={`/business/${activeBusiness.slug}`}
              target="_blank"
              className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-xs font-bold text-[#5D5A56] hover:text-[#C69A4B] flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C69A4B]" />
              <span>View Public Portal</span>
            </Link>
          )}

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-2xl bg-[#FFF8ED] dark:bg-[#1B2238] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A] flex items-center justify-center font-bold text-xs shrink-0">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] truncate">
                  {session?.user?.name || "Administrator"}
                </p>
                <p className="text-[10px] text-[#8B857D] dark:text-[#A0A8B8] truncate">{session?.user?.email}</p>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] hover:border-[#C69A4B] transition-all shadow-sm shrink-0 cursor-pointer"
              title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
            >
              {theme === "light" ? <Moon className="w-3.5 h-3.5 text-[#2A2927]" /> : <Sun className="w-3.5 h-3.5 text-[#C69A4B]" />}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/"
              className="py-2 rounded-xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[11px] font-bold text-[#5D5A56] dark:text-[#A0A8B8] hover:text-[#C69A4B] flex items-center justify-center gap-1 shadow-sm transition-all"
            >
              <Home className="w-3.5 h-3.5 text-[#C69A4B]" /> Home
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="py-2 rounded-xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[11px] font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#F3EFE6] dark:bg-[#0F1422] border-b border-[#DDD6C9] dark:border-[#27314A]">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 rounded-xl bg-[#C69A4B] text-white flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-[#2A2927] dark:text-[#F8F7F3]">BusinessFlow</span>
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
        <main className="flex-1 bg-[#F8F7F3] dark:bg-[#0B0E17] transition-colors duration-300">
          {children}
        </main>
      </div>

      {/* Create New Business Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-[#FFFCF7] dark:bg-[#161C2E] border border-[#DDD6C9] dark:border-[#27314A] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#2A2927] dark:text-[#F8F7F3] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#C69A4B]" /> Provision New Business
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-lg hover:bg-[#F2EFE6] dark:hover:bg-[#1B2238] text-[#8B857D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBusiness} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">
                  Business Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zenith Global Advisory"
                  value={newBizName}
                  onChange={(e) => setNewBizName(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-1.5">
                  Industry Archetype
                </label>
                <select
                  value={newBizIndustry}
                  onChange={(e) => setNewBizIndustry(e.target.value)}
                  className="w-full p-3 rounded-xl glass-input text-xs font-medium bg-white dark:bg-[#111625]"
                >
                  <option value="CONSULTING">Consulting & Strategy</option>
                  <option value="SALON">Luxury Salon & Spa</option>
                  <option value="GYM">High-Performance Fitness</option>
                  <option value="MEDICAL">Concierge Medical Clinic</option>
                  <option value="AGENCY">Creative & Digital Agency</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#DDD6C9] dark:border-[#27314A] text-xs font-bold text-[#5D5A56]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-gold-btn transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Business"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
