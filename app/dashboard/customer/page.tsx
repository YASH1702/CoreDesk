import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, Clock, DollarSign, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function CustomerDashboardPage() {
  const customerUser = await prisma.user.findFirst({
    where: { role: "CUSTOMER" },
    include: {
      appointments: {
        include: {
          service: true,
          staff: { include: { user: true } },
          payment: true,
          invoice: true,
        },
        orderBy: { startTime: "desc" },
      },
      invoices: true,
    },
  });

  const appointments = customerUser?.appointments || [];

  return (
    <DashboardLayoutWrapper>
        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD6C9] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5C9E6E] uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-[#5C9E6E]" /> Client Portal
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#2A2927] mt-1">
                My Bookings & Invoices
              </h1>
              <p className="text-xs text-[#5D5A56] mt-1">View upcoming appointments, download calendar invites, and manage schedules.</p>
            </div>

            <Link
              href="/book"
              className="px-4 py-2.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-gold-btn transition-all flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" /> Book New Appointment
            </Link>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-[#2A2927]">Your Scheduled Sessions</h3>

            {appointments.length === 0 ? (
              <div className="p-8 text-center glass-panel rounded-3xl border border-[#DDD6C9] bg-white space-y-3 shadow-warm-sm">
                <p className="text-xs text-[#5D5A56]">You have no active appointments booked yet.</p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#C69A4B] text-white text-xs font-bold shadow-gold-btn"
                >
                  Book First Session <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-6 rounded-3xl glass-panel border border-[#DDD6C9] bg-white flex flex-col justify-between space-y-4 shadow-warm-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8ED] text-[#C69A4B] border border-[#E8D7B2]">
                          {appt.service.category}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#5C9E6E]/15 text-[#5C9E6E] border border-[#5C9E6E]/30">
                          {appt.status}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#2A2927]">{appt.service.title}</h4>
                      <p className="text-xs text-[#5D5A56]">With {appt.staff.user.name}</p>
                    </div>

                    <div className="pt-3 border-t border-[#ECE6D8] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-[#8B857D] block">Date & Time</span>
                        <span className="font-semibold text-[#2A2927]">
                          {new Date(appt.startTime).toLocaleDateString()} at{" "}
                          {new Date(appt.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <Link
                        href={`/book/reschedule/${appt.id}`}
                        className="px-3 py-1.5 rounded-xl bg-white border border-[#DDD6C9] text-xs text-[#C69A4B] font-semibold transition-all hover:bg-[#F6F2EA]"
                      >
                        Reschedule
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardLayoutWrapper>
  );
}
