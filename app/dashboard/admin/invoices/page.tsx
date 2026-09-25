import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import Providers from "@/components/shared/Providers";
import { prisma } from "@/lib/prisma";
import { CreditCard, DollarSign } from "lucide-react";

export const revalidate = 0;

export default async function InvoicesAdminPage() {
  const invoices = await prisma.invoice.findMany({
    include: {
      appointment: {
        include: {
          service: true,
          customer: true,
          payment: true,
        },
      },
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Providers>
      <DashboardLayoutWrapper>
        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD6C9] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5C9E6E] uppercase tracking-widest">
                <CreditCard className="w-4 h-4 text-[#5C9E6E]" /> Billing & Revenue Records
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#2A2927] mt-1">Invoices & Settlement Ledger</h1>
              <p className="text-xs text-[#5D5A56] mt-1">Itemized billing records and Stripe transaction histories.</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] bg-white shadow-warm-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#ECE6D8] text-[#8B857D] uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Invoice #</th>
                    <th className="pb-3 font-semibold">Billed Client</th>
                    <th className="pb-3 font-semibold">Service Description</th>
                    <th className="pb-3 font-semibold">Date Dispatched</th>
                    <th className="pb-3 font-semibold">Stripe Payment Status</th>
                    <th className="pb-3 font-semibold text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECE6D8]">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-[#F8F7F3]">
                      <td className="py-3 font-mono font-bold text-[#C69A4B]">{inv.invoiceNumber}</td>
                      <td className="py-3 font-semibold text-[#2A2927]">
                        {inv.appointment?.customer?.name || "Client"}
                        <span className="block text-[10px] text-[#8B857D] font-normal">{inv.appointment?.customer?.email}</span>
                      </td>
                      <td className="py-3 text-[#5D5A56]">{inv.appointment?.service?.title}</td>
                      <td className="py-3 text-[#8B857D]">{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#5C9E6E]/15 text-[#5C9E6E] border border-[#5C9E6E]/30">
                          {inv.appointment?.payment?.status || "PAID"}
                        </span>
                      </td>
                      <td className="py-3 text-right font-extrabold text-[#2A2927] gold-text">${inv.total}.00</td>
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
