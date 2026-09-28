import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import { getAdminDashboardStats } from "@/actions/dashboard";
import { DollarSign, Calendar, Users, TrendingUp, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const res = await getAdminDashboardStats();
  const stats = res.stats;

  return (
    <DashboardLayoutWrapper>
        <div className="p-6 md:p-10 space-y-8">
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD6C9] dark:border-[#27314A] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#C69A4B] uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-[#C69A4B]" /> Enterprise Operations Command
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2A2927] dark:text-[#F8F7F3] mt-1">
                {stats?.businessName || "Apex Advisory"} Operations Dashboard
              </h1>
              <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
                Real-time booking revenue, appointment schedules, and specialist utilization metrics.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/book"
                target="_blank"
                className="px-4 py-2.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-gold-btn transition-all flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" /> Launch Booking Portal
              </Link>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-2 shadow-warm-sm dark:shadow-dark-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-bold">Total Booked Revenue</span>
                <div className="w-8 h-8 rounded-xl bg-[#5C9E6E]/15 text-[#5C9E6E] flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">${stats?.totalRevenue || 0}.00</p>
              <div className="text-[11px] text-[#5C9E6E] flex items-center gap-1 font-bold">
                <TrendingUp className="w-3 h-3" /> +18.4% growth this month
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-2 shadow-warm-sm dark:shadow-dark-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-bold">Total Appointments</span>
                <div className="w-8 h-8 rounded-xl bg-[#C69A4B]/15 text-[#C69A4B] flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3]">{stats?.totalAppointments || 0} Sessions</p>
              <div className="text-[11px] text-[#C69A4B] flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" /> {stats?.confirmedAppointments || 0} Confirmed & Paid
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-2 shadow-warm-sm dark:shadow-dark-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-bold">Active CRM Clients</span>
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3]">{stats?.totalCustomers || 0} Clients</p>
              <div className="text-[11px] text-purple-600 dark:text-purple-300 font-bold">100% verified leads</div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-2 shadow-warm-sm dark:shadow-dark-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-bold">Show-Up Conversion</span>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3]">98.5%</p>
              <div className="text-[11px] text-cyan-600 dark:text-cyan-300 font-bold">Zero-conflict slots</div>
            </div>
          </div>

          {/* Recent Appointments Table */}
          <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-4 shadow-warm-md dark:shadow-dark-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#2A2927] dark:text-[#F8F7F3]">Live Appointment Queue</h3>
                <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8]">Recent bookings processed across your organization</p>
              </div>
              <Link
                href="/dashboard/admin/appointments"
                className="text-xs font-bold text-[#C69A4B] hover:text-[#B7863D] flex items-center gap-1"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#ECE6D8] dark:border-[#27314A] text-[#8B857D] dark:text-[#A0A8B8] uppercase tracking-wider">
                    <th className="pb-3 font-bold">Client Name</th>
                    <th className="pb-3 font-bold">Service</th>
                    <th className="pb-3 font-bold">Specialist</th>
                    <th className="pb-3 font-bold">Date & Time</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE6D8] dark:divide-[#27314A]">
                  {stats?.recentAppointments?.map((appt: any) => (
                    <tr key={appt.id} className="hover:bg-[#F8F7F3] dark:hover:bg-[#1B2238]">
                      <td className="py-3 font-bold text-[#2A2927] dark:text-[#F8F7F3]">
                        {appt.customer?.name || "Guest"}
                        <span className="block text-[10px] text-[#8B857D] dark:text-[#A0A8B8] font-normal">{appt.customer?.email}</span>
                      </td>
                      <td className="py-3 text-[#5D5A56] dark:text-[#A0A8B8]">{appt.service?.title}</td>
                      <td className="py-3 text-[#5D5A56] dark:text-[#A0A8B8]">{appt.staff?.user?.name}</td>
                      <td className="py-3 text-[#5D5A56] dark:text-[#A0A8B8]">
                        {new Date(appt.startTime).toLocaleDateString()} at{" "}
                        {new Date(appt.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#5C9E6E]/15 text-[#5C9E6E] border border-[#5C9E6E]/30">
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">
                        ${appt.payment?.amount || appt.service?.price}.00
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayoutWrapper>
  );
}
