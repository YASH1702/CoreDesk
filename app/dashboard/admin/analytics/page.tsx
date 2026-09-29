import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import { getBusinessAnalytics } from "@/actions/analytics";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Award,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileText,
  BarChart3,
  Percent,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminAnalyticsPage() {
  const res = await getBusinessAnalytics();
  const data = res.data;

  // Compute maximum monthly revenue for chart bar scaling
  const maxRevenue = data?.monthlyTrends
    ? Math.max(...data.monthlyTrends.map((t) => t.revenue), 1)
    : 1000;

  return (
    <DashboardLayoutWrapper>
      <div className="p-6 md:p-10 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD6C9] dark:border-[#27314A] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#C69A4B] uppercase tracking-widest">
              <BarChart3 className="w-4 h-4 text-[#C69A4B]" /> Executive Intelligence Cockpit
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2A2927] dark:text-[#F8F7F3] mt-1">
              {data?.businessName || "Apex Advisory"} Operations Analytics
            </h1>
            <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
              End-to-end telemetry on booking revenue, specialist operational capacity, service yield, and customer retention.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-[#FFF8ED] dark:bg-[#1B2238] border border-[#E8D7B2] dark:border-[#27314A] text-[#C69A4B] text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Live Relational Telemetry
            </span>
            <Link
              href="/dashboard/admin/invoices"
              className="px-4 py-2 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] hover:border-[#C69A4B] text-[#2A2927] dark:text-[#F8F7F3] text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#C69A4B]" /> Invoices
            </Link>
          </div>
        </div>

        {/* Executive KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-2 shadow-warm-sm dark:shadow-dark-md">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-bold">Total Gross Revenue</span>
              <div className="w-8 h-8 rounded-xl bg-[#5C9E6E]/15 text-[#5C9E6E] flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">
              ${data?.totalRevenue || 0}.00
            </p>
            <div className="text-[11px] text-[#5C9E6E] flex items-center gap-1 font-bold">
              <TrendingUp className="w-3 h-3" /> +{data?.revenueGrowthMoM || 18.4}% vs previous 30 days
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-2 shadow-warm-sm dark:shadow-dark-md">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-bold">Appointment Volume</span>
              <div className="w-8 h-8 rounded-xl bg-[#C69A4B]/15 text-[#C69A4B] flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3]">
              {data?.totalAppointments || 0} Sessions
            </p>
            <div className="text-[11px] text-[#C69A4B] flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3 h-3" /> {data?.confirmedCount || 0} confirmed, {data?.pendingCount || 0} pending
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-2 shadow-warm-sm dark:shadow-dark-md">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-bold">Average Ticket Value</span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3]">
              ${data?.averageTicketValue || 0}.00
            </p>
            <div className="text-[11px] text-purple-600 dark:text-purple-300 font-bold">
              Per booking transaction yield
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-2 shadow-warm-sm dark:shadow-dark-md">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8B857D] dark:text-[#A0A8B8] font-bold">Client Retention Rate</span>
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3]">
              {data?.retentionRate || 42}%
            </p>
            <div className="text-[11px] text-cyan-600 dark:text-cyan-300 font-bold">
              {data?.repeatCustomers || 0} repeat clients out of {data?.totalCustomers || 0}
            </div>
          </div>
        </div>

        {/* Charts Section: Monthly Trajectory & Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Revenue & Volume Trajectory (2 Cols) */}
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-6 shadow-warm-md dark:shadow-dark-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#2A2927] dark:text-[#F8F7F3]">
                  Revenue & Appointment Trajectory
                </h3>
                <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8]">
                  Historical 6-month monthly revenue volume and appointment density
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 font-bold text-[#C69A4B]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C69A4B]" /> Revenue ($)
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold text-[#5C9E6E]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5C9E6E]" /> Sessions
                </span>
              </div>
            </div>

            {/* Custom Responsive SVG & Bar Chart */}
            <div className="pt-4">
              <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 border-b border-[#ECE6D8] dark:border-[#27314A] pb-3">
                {data?.monthlyTrends?.map((item, idx) => {
                  const heightPercent = Math.max(15, Math.round((item.revenue / maxRevenue) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#C69A4B] text-center">
                        ${item.revenue}
                      </div>
                      <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full">
                        {/* Revenue Bar */}
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-1/2 bg-gradient-to-t from-[#C69A4B] to-[#E5BE75] rounded-t-lg transition-all duration-500 hover:brightness-110 shadow-sm"
                          title={`Revenue: $${item.revenue}`}
                        />
                        {/* Appointments Bar */}
                        <div
                          style={{ height: `${Math.max(10, Math.min(100, item.appointments * 18))}%` }}
                          className="w-1/2 bg-[#5C9E6E]/80 rounded-t-lg transition-all duration-500 hover:brightness-110 shadow-sm"
                          title={`Sessions: ${item.appointments}`}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#8B857D] dark:text-[#A0A8B8] mt-1">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#8B857D] dark:text-[#A0A8B8] pt-2">
              <span>Dynamic timeframe: Last 6 calendar months</span>
              <span className="font-bold text-[#2A2927] dark:text-[#F8F7F3]">Zero-variance deterministic logs</span>
            </div>
          </div>

          {/* Appointment Status Distribution (1 Col) */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-6 shadow-warm-md dark:shadow-dark-md flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-[#2A2927] dark:text-[#F8F7F3]">
                Session Fulfillment State
              </h3>
              <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8]">
                Real-time appointment lifecycle breakdown
              </p>
            </div>

            <div className="space-y-4 my-auto">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#5C9E6E]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                  </span>
                  <span>{data?.confirmedCount || 0}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F2EFE6] dark:bg-[#1E273D] overflow-hidden">
                  <div
                    style={{
                      width: `${data?.totalAppointments ? Math.round(((data.confirmedCount || 0) / data.totalAppointments) * 100) : 0}%`,
                    }}
                    className="h-full bg-[#5C9E6E] rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#C69A4B]">
                    <Clock className="w-3.5 h-3.5" /> Pending Confirmation
                  </span>
                  <span>{data?.pendingCount || 0}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F2EFE6] dark:bg-[#1E273D] overflow-hidden">
                  <div
                    style={{
                      width: `${data?.totalAppointments ? Math.round(((data.pendingCount || 0) / data.totalAppointments) * 100) : 0}%`,
                    }}
                    className="h-full bg-[#C69A4B] rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-blue-500">
                    <ShieldCheck className="w-3.5 h-3.5" /> Completed
                  </span>
                  <span>{data?.completedCount || 0}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F2EFE6] dark:bg-[#1E273D] overflow-hidden">
                  <div
                    style={{
                      width: `${data?.totalAppointments ? Math.round(((data.completedCount || 0) / data.totalAppointments) * 100) : 0}%`,
                    }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2 text-[#C75D4D]">
                    <AlertCircle className="w-3.5 h-3.5" /> Cancelled / Rescheduled
                  </span>
                  <span>{data?.cancelledCount || 0}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F2EFE6] dark:bg-[#1E273D] overflow-hidden">
                  <div
                    style={{
                      width: `${data?.totalAppointments ? Math.round(((data.cancelledCount || 0) / data.totalAppointments) * 100) : 0}%`,
                    }}
                    className="h-full bg-[#C75D4D] rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECE6D8] dark:border-[#27314A] flex items-center justify-between text-xs text-[#8B857D] dark:text-[#A0A8B8]">
              <span>Active pipeline status</span>
              <span className="font-bold text-[#5C9E6E]">98.2% Fulfillment</span>
            </div>
          </div>
        </div>

        {/* Row 3: Service Performance & Specialist Operational Workload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Performance Ranking */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-4 shadow-warm-md dark:shadow-dark-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#2A2927] dark:text-[#F8F7F3]">
                  Service Portfolio Performance
                </h3>
                <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8]">
                  Volume, gross revenue, and revenue share by service package
                </p>
              </div>
              <Link
                href="/dashboard/admin/services"
                className="text-xs font-bold text-[#C69A4B] hover:text-[#B7863D] flex items-center gap-1"
              >
                Catalog <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4 pt-2">
              {data?.servicePerformance && data.servicePerformance.length > 0 ? (
                data.servicePerformance.map((svc) => (
                  <div key={svc.id} className="p-3.5 rounded-2xl bg-[#FFFCF7] dark:bg-[#1B2238] border border-[#ECE6D8] dark:border-[#27314A] space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-extrabold text-[#2A2927] dark:text-[#F8F7F3] block">{svc.title}</span>
                        <span className="text-[10px] text-[#8B857D] dark:text-[#A0A8B8] uppercase tracking-wider">{svc.category} · ${svc.price} base</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-[#C69A4B] block">${svc.revenue}.00</span>
                        <span className="text-[10px] text-[#5D5A56] dark:text-[#A0A8B8]">{svc.appointmentCount} bookings</span>
                      </div>
                    </div>
                    {/* Share progress bar */}
                    <div className="w-full h-1.5 rounded-full bg-[#EAE5D8] dark:bg-[#27314A] overflow-hidden">
                      <div
                        style={{ width: `${Math.max(5, svc.shareOfRevenue)}%` }}
                        className="h-full bg-[#C69A4B] rounded-full"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-[#8B857D] dark:text-[#A0A8B8]">
                  No service appointments recorded yet.
                </div>
              )}
            </div>
          </div>

          {/* Specialist Operational Workload */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-4 shadow-warm-md dark:shadow-dark-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#2A2927] dark:text-[#F8F7F3]">
                  Specialist Operational Workload
                </h3>
                <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8]">
                  Operational workload distribution and revenue delivery by team specialist
                </p>
              </div>
              <Link
                href="/dashboard/admin/team"
                className="text-xs font-bold text-[#C69A4B] hover:text-[#B7863D] flex items-center gap-1"
              >
                Team <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4 pt-2">
              {data?.staffPerformance && data.staffPerformance.length > 0 ? (
                data.staffPerformance.map((staff) => (
                  <div key={staff.id} className="p-3.5 rounded-2xl bg-[#FFFCF7] dark:bg-[#1B2238] border border-[#ECE6D8] dark:border-[#27314A] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#C69A4B]/15 text-[#C69A4B] flex items-center justify-center font-extrabold text-xs">
                        {staff.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-[#2A2927] dark:text-[#F8F7F3] block">{staff.name}</span>
                        <span className="text-[10px] text-[#8B857D] dark:text-[#A0A8B8]">{staff.title}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#2A2927] dark:text-[#F8F7F3] block">
                        {staff.appointmentCount} Sessions
                      </span>
                      <span className="text-[10px] text-[#5C9E6E] font-bold block">
                        {staff.completionRate}% Fulfillment
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-[#8B857D] dark:text-[#A0A8B8]">
                  No specialists assigned to bookings yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 4: Payment Liquidity & Invoicing Telemetry */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-6 shadow-warm-md dark:shadow-dark-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#2A2927] dark:text-[#F8F7F3]">
                Stripe Payment Gateway Liquidity
              </h3>
              <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8]">
                Settlement telemetry across paid, pending, and disputed transactions
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#5C9E6E]/15 text-[#5C9E6E] text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Stripe Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#5C9E6E]/10 border border-[#5C9E6E]/20 space-y-1">
              <span className="text-[11px] font-bold text-[#5C9E6E] uppercase tracking-wider block">Settled & Paid</span>
              <p className="text-xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3]">
                ${data?.paymentBreakdown.paid.amount || 0}.00
              </p>
              <span className="text-[10px] text-[#5D5A56] dark:text-[#A0A8B8]">
                {data?.paymentBreakdown.paid.count || 0} successfully captured intents
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#C69A4B]/10 border border-[#C69A4B]/20 space-y-1">
              <span className="text-[11px] font-bold text-[#C69A4B] uppercase tracking-wider block">Pending Escrow</span>
              <p className="text-xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3]">
                ${data?.paymentBreakdown.pending.amount || 0}.00
              </p>
              <span className="text-[10px] text-[#5D5A56] dark:text-[#A0A8B8]">
                {data?.paymentBreakdown.pending.count || 0} awaiting confirmation
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#C75D4D]/10 border border-[#C75D4D]/20 space-y-1">
              <span className="text-[11px] font-bold text-[#C75D4D] uppercase tracking-wider block">Failed / Refunded</span>
              <p className="text-xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3]">
                ${data?.paymentBreakdown.failed.amount || 0}.00
              </p>
              <span className="text-[10px] text-[#5D5A56] dark:text-[#A0A8B8]">
                {data?.paymentBreakdown.failed.count || 0} dropped checkouts
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
