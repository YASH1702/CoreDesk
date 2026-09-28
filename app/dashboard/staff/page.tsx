import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import { prisma } from "@/lib/prisma";
import { Calendar, Clock, User, CheckCircle2, Shield } from "lucide-react";

export const revalidate = 0;

export default async function StaffAgendaPage() {
  const staff = await prisma.staff.findFirst({
    include: {
      user: true,
      appointments: {
        include: {
          service: true,
          customer: true,
          payment: true,
        },
        orderBy: { startTime: "asc" },
      },
    },
  });

  return (
    <DashboardLayoutWrapper>
        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD6C9] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-widest">
                <Shield className="w-4 h-4 text-purple-700" /> Specialist Workspace
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#2A2927] mt-1">
                Welcome back, {staff?.user.name || "Specialist"}
              </h1>
              <p className="text-xs text-[#5D5A56] mt-1">Your daily agenda, client notes, and assigned appointments timeline.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Agenda Timeline */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-base font-bold text-[#2A2927] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C69A4B]" /> Assigned Appointments Schedule
              </h3>

              <div className="space-y-3">
                {staff?.appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="p-5 rounded-3xl glass-panel border border-[#DDD6C9] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-warm-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8ED] text-[#C69A4B] border border-[#E8D7B2]">
                          {appt.service.title}
                        </span>
                        <span className="text-xs text-[#8B857D] flex items-center gap-1 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-[#C69A4B]" /> {new Date(appt.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ({appt.service.duration}m)
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#2A2927] mt-1">{appt.customer?.name || "Client"}</h4>
                      <p className="text-xs text-[#5D5A56]">{appt.customer?.email} • {appt.customer?.phone || "No phone"}</p>
                      {appt.notes && (
                        <p className="text-xs text-[#5D5A56] italic mt-2 p-2.5 rounded-xl bg-[#F8F7F3] border border-[#DDD6C9]">
                          "{appt.notes}"
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#5C9E6E]/15 text-[#5C9E6E] border border-[#5C9E6E]/30">
                        {appt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Profile */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] bg-white space-y-4 shadow-warm-sm">
                <h3 className="text-sm font-bold text-[#2A2927]">Specialist Profile</h3>
                <div className="flex items-center gap-3">
                  <img
                    src={staff?.user.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"}
                    alt={staff?.user.name || "Staff"}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#C69A4B]/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#2A2927]">{staff?.user.name}</h4>
                    <p className="text-xs text-[#C69A4B] font-semibold">{staff?.title}</p>
                  </div>
                </div>
                <p className="text-xs text-[#5D5A56] leading-relaxed">{staff?.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayoutWrapper>
  );
}
