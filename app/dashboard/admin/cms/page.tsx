import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import Providers from "@/components/shared/Providers";
import { getCMSData } from "@/actions/cms";
import { Layout, Save, Sparkles } from "lucide-react";

export const revalidate = 0;

export default async function CMSManagementPage() {
  const res = await getCMSData();
  const settings = res.data?.cmsSettings;

  return (
    <Providers>
      <DashboardLayoutWrapper>
        <div className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DDD6C9] dark:border-[#27314A] pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#2A2927] dark:text-[#F8F7F3]">
                No-Code Website CMS & SEO Editor
              </h1>
              <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
                Dynamically modify marketing copy, hero headlines, and SEO metadata without editing source code.
              </p>
            </div>
            <button className="px-5 py-2.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-bold shadow-gold-btn transition-all flex items-center gap-1.5">
              <Save className="w-4 h-4" /> Save CMS Changes
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-6 shadow-warm-md dark:shadow-dark-md">
              <div>
                <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-2">Homepage Hero Headline</label>
                <input
                  type="text"
                  defaultValue={settings?.heroTitle || "Elevate Your Business with Precision Booking & Management"}
                  className="w-full p-3 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3] font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-2">Homepage Hero Subtitle Copy</label>
                <textarea
                  rows={4}
                  defaultValue={
                    settings?.heroSubtitle ||
                    "Turn site visitors into high-value clients effortlessly. Automated availability scheduling, multi-staff calendar sync, Stripe deposits, and dynamic CRM content in one warm, luxury-crafted workspace."
                  }
                  className="w-full p-3 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-2">About Practice Description</label>
                <textarea
                  rows={4}
                  defaultValue={settings?.aboutText || "Premier consulting and appointment management firm."}
                  className="w-full p-3 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3]"
                />
              </div>
            </div>

            <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] space-y-6 shadow-warm-md dark:shadow-dark-md">
              <h3 className="text-sm font-bold text-[#2A2927] dark:text-[#F8F7F3] border-b border-[#ECE6D8] dark:border-[#27314A] pb-3">
                SEO Search Preview
              </h3>

              <div>
                <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-2">SEO Title Tag</label>
                <input
                  type="text"
                  defaultValue={settings?.seoTitle || "CoreDesk — Warm Sand & Executive Dark Business Platform"}
                  className="w-full p-3 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A2927] dark:text-[#F8F7F3] mb-2">Meta Description</label>
                <textarea
                  rows={3}
                  defaultValue={settings?.seoDescription || "Enterprise appointment management and website engine."}
                  className="w-full p-3 rounded-2xl glass-input text-xs text-[#2A2927] dark:text-[#F8F7F3]"
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayoutWrapper>
    </Providers>
  );
}
