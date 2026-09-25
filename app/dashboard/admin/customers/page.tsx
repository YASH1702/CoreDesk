import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import Providers from "@/components/shared/Providers";
import { prisma } from "@/lib/prisma";
import { UserCheck, Mail, Phone, Calendar } from "lucide-react";

export const revalidate = 0;

export default async function CustomersAdminPage() {
  const business = await prisma.business.findFirst();
  const customers = await prisma.customer.findMany({
    where: { businessId: business?.id },
    include: {
      appointments: {
        include: { service: true, payment: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Providers>
      <DashboardLayoutWrapper>
        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD6C9] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-widest">
                <UserCheck className="w-4 h-4 text-purple-700" /> CRM Client Database
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#2A2927] mt-1">Customer CRM & Lead Records</h1>
              <p className="text-xs text-[#5D5A56] mt-1">Client relationship database with booking histories and notes.</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] bg-white shadow-warm-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#ECE6D8] text-[#8B857D] uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Client Name</th>
                    <th className="pb-3 font-semibold">Contact Email</th>
                    <th className="pb-3 font-semibold">Phone</th>
                    <th className="pb-3 font-semibold">Total Bookings</th>
                    <th className="pb-3 font-semibold">Notes</th>
                    <th className="pb-3 font-semibold text-right">Lifetime Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE6D8]">
                  {customers.map((c) => {
                    const ltv = c.appointments.reduce((sum, appt) => sum + (appt.payment?.amount || appt.service?.price || 0), 0);
                    return (
                      <tr key={c.id} className="hover:bg-[#F8F7F3]">
                        <td className="py-3 font-bold text-[#2A2927]">{c.name}</td>
                        <td className="py-3 text-[#5D5A56]">{c.email}</td>
                        <td className="py-3 text-[#5D5A56]">{c.phone || "—"}</td>
                        <td className="py-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8ED] text-[#C69A4B] border border-[#E8D7B2]">
                            {c.appointments.length} Sessions
                          </span>
                        </td>
                        <td className="py-3 text-[#8B857D] italic max-w-xs truncate">{c.notes || "—"}</td>
                        <td className="py-3 text-right font-extrabold text-[#2A2927] gold-text">${ltv}.00</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayoutWrapper>
    </Providers>
  );
}
