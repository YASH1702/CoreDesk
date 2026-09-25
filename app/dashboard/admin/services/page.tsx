import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import Providers from "@/components/shared/Providers";
import { getServicesCatalog } from "@/actions/services";
import { Layers, Clock, DollarSign, CheckCircle2, Plus } from "lucide-react";

export const revalidate = 0;

export default async function ServicesManagementPage() {
  const res = await getServicesCatalog();
  const services = res.services || [];

  return (
    <Providers>
      <DashboardLayoutWrapper>
        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD6C9] dark:border-[#27314A] pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2A2927] dark:text-[#F8F7F3]">
                Services Catalog Management
              </h1>
              <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
                Configure appointment packages, durations, prices, and buffer times.
              </p>
            </div>
            <button className="px-5 py-2.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-gold-btn transition-all flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Add New Service Package
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc: any) => (
              <div
                key={svc.id}
                className="glass-panel p-6 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-4 shadow-warm-sm dark:shadow-dark-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF8ED] dark:bg-[#1B2238] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A]">
                      {svc.category || "Service"}
                    </span>
                    <span className="text-xs font-bold text-[#5C9E6E] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#2A2927] dark:text-[#F8F7F3] mt-3">{svc.title}</h3>
                  <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1 leading-relaxed">{svc.description}</p>
                </div>

                <div className="pt-4 border-t border-[#ECE6D8] dark:border-[#27314A] flex items-center justify-between">
                  <span className="text-xs text-[#8B857D] dark:text-[#A0A8B8] flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#C69A4B]" /> {svc.duration} mins session
                  </span>
                  <span className="text-lg font-extrabold text-[#2A2927] dark:text-[#F8F7F3] gold-text">${svc.price}.00</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayoutWrapper>
    </Providers>
  );
}
