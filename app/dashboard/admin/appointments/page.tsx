import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import Providers from "@/components/shared/Providers";
import { getAppointmentsQueue } from "@/actions/appointments";
import UniversalCalendarSyncButton from "@/components/booking/UniversalCalendarSyncButton";
import { Calendar, Filter, Download } from "lucide-react";

export const revalidate = 0;

export default async function AppointmentsQueuePage() {
  const res = await getAppointmentsQueue();
  const appointments = res.appointments || [];

  return (
    <Providers>
      <DashboardLayoutWrapper>
        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD6C9] dark:border-[#27314A] pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2A2927] dark:text-[#F8F7F3]">
                Live Appointments Queue
              </h1>
              <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
                View, reschedule, or cancel customer reservations across all specialist agendas.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-2xl bg-white dark:bg-[#1B2238] border border-[#DDD6C9] dark:border-[#27314A] text-[#2A2927] dark:text-[#F8F7F3] text-xs font-bold flex items-center gap-1.5 shadow-warm-sm">
                <Filter className="w-3.5 h-3.5" /> Filter Queue
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] shadow-warm-md dark:shadow-dark-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#ECE6D8] dark:border-[#27314A] text-[#8B857D] dark:text-[#A0A8B8] uppercase tracking-wider">
                    <th className="pb-3 font-bold">Booking Ref</th>
                    <th className="pb-3 font-bold">Client Name</th>
                    <th className="pb-3 font-bold">Service Package</th>
                    <th className="pb-3 font-bold">Specialist</th>
                    <th className="pb-3 font-bold">Date & Time</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-center">Sync</th>
                    <th className="pb-3 font-bold text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE6D8] dark:divide-[#27314A]">
                  {appointments.map((appt: any) => (
                    <tr key={appt.id} className="hover:bg-[#F8F7F3] dark:hover:bg-[#1B2238]">
                      <td className="py-3.5 font-mono text-[11px] text-[#8B857D] dark:text-[#A0A8B8]">#{appt.id.slice(0, 8)}</td>
                      <td className="py-3.5 font-bold text-[#2A2927] dark:text-[#F8F7F3]">
                        {appt.customer?.name || "Guest"}
                        <span className="block text-[10px] text-[#8B857D] dark:text-[#A0A8B8] font-normal">{appt.customer?.email}</span>
                      </td>
                      <td className="py-3.5 text-[#5D5A56] dark:text-[#A0A8B8]">{appt.service?.title}</td>
                      <td className="py-3.5 text-[#5D5A56] dark:text-[#A0A8B8]">{appt.staff?.user?.name}</td>
                      <td className="py-3.5 text-[#5D5A56] dark:text-[#A0A8B8]">
                        {new Date(appt.startTime).toLocaleDateString()} at{" "}
                        {new Date(appt.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#5C9E6E]/15 text-[#5C9E6E] border border-[#5C9E6E]/30">
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-center">
                        <UniversalCalendarSyncButton
                          title={`${appt.service?.title || "Session"} - ${appt.customer?.name || "Client"}`}
                          description={`Booking #${appt.id.slice(0, 8)} with ${appt.staff?.user?.name || "Specialist"}.`}
                          location="CoreDesk Executive Suite"
                          startTime={appt.startTime}
                          endTime={appt.endTime}
                          variant="compact"
                        />
                      </td>
                      <td className="py-3.5 text-right font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">
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
    </Providers>
  );
}
