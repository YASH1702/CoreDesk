import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import Providers from "@/components/shared/Providers";
import { prisma } from "@/lib/prisma";
import { Users, Clock, CheckCircle2, Shield } from "lucide-react";

export const revalidate = 0;

export default async function TeamAdminPage() {
  const staffMembers = await prisma.staff.findMany({
    include: {
      user: true,
      services: { include: { service: true } },
      availability: true,
      _count: { select: { appointments: true } },
    },
  });

  return (
    <Providers>
      <DashboardLayoutWrapper>
        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD6C9] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C69A4B] uppercase tracking-widest">
                <Users className="w-4 h-4 text-[#C69A4B]" /> Team Roster & Schedules
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#2A2927] mt-1">Specialists & Staff Roster</h1>
              <p className="text-xs text-[#5D5A56] mt-1">Manage team members, assigned services, working hours, and capacity.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffMembers.map((staff) => (
              <div key={staff.id} className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] bg-white space-y-4 shadow-warm-sm">
                <div className="flex items-center gap-3.5">
                  {staff.avatar ? (
                    <img
                      src={staff.avatar}
                      alt={staff.user.name || "Staff"}
                      className="w-12 h-12 rounded-2xl object-cover border border-[#C69A4B]/30 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF8ED] text-[#C69A4B] border border-[#E8D7B2] flex items-center justify-center font-bold text-base shrink-0">
                      {staff.user.name?.charAt(0) || "S"}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-[#2A2927]">{staff.user.name}</h3>
                    <p className="text-xs text-[#C69A4B] font-semibold">{staff.title || "Specialist"}</p>
                  </div>
                </div>

                <p className="text-xs text-[#5D5A56] line-clamp-2 leading-relaxed">{staff.bio || "Experienced team member"}</p>

                <div className="pt-3 border-t border-[#ECE6D8] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8B857D]">Assigned Services</span>
                    <span className="font-semibold text-[#2A2927]">{staff.services.length} Packages</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8B857D]">Total Bookings</span>
                    <span className="font-semibold text-[#5C9E6E]">{staff._count.appointments} Sessions</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8B857D]">Working Shifts</span>
                    <span className="font-semibold text-[#C69A4B]">Mon - Fri (09:00 - 17:00)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayoutWrapper>
    </Providers>
  );
}
