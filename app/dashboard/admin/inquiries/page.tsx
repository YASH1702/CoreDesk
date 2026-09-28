import React from "react";
import DashboardLayoutWrapper from "@/components/dashboard/DashboardLayoutWrapper";
import { getInquiriesAction, updateInquiryStatus } from "@/actions/dashboard";
import { MessageSquareQuote, Mail, Phone, Calendar, Clock, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function AdminInquiriesPage() {
  const res = await getInquiriesAction();
  const inquiries = res.inquiries || [];

  return (
    <DashboardLayoutWrapper>
      <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight">
              Client Inquiries & Consultation Requests
            </h1>
            <p className="text-xs sm:text-sm text-[#5D5A56] dark:text-[#A0A8B8] mt-1">
              Prospective client leads submitted through your public business portal.
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-[#FFF8ED] dark:bg-[#1B2238] border border-[#E8D7B2] dark:border-[#27314A] text-xs font-bold text-[#C69A4B] self-start sm:self-auto">
            {inquiries.length} Inquiries Total
          </div>
        </div>

        {/* Inquiries List */}
        {inquiries.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#111625] border border-[#DDD6C9] dark:border-[#27314A] space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF8ED] text-[#C69A4B] flex items-center justify-center mx-auto">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#2A2927] dark:text-[#F8F7F3]">No Inquiries Yet</h3>
            <p className="text-xs text-[#8B857D] max-w-sm mx-auto">
              Client inquiries submitted via your public portal will appear here in real time.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {inquiries.map((inq: any) => (
              <div
                key={inq.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#111625] border border-[#DDD6C9] dark:border-[#27314A] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-[#2A2927] dark:text-[#F8F7F3]">{inq.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        inq.status === "UNREAD"
                          ? "bg-rose-100 text-rose-700 border border-rose-200"
                          : inq.status === "CONTACTED"
                          ? "bg-amber-100 text-amber-700 border border-amber-200"
                          : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8] max-w-2xl leading-relaxed">
                    "{inq.message}"
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#8B857D] pt-1">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#C69A4B]" /> {inq.email}</span>
                    {inq.phone && (
                      <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#C69A4B]" /> {inq.phone}</span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#8B857D]" />
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <form
                    action={async () => {
                      "use server";
                      await updateInquiryStatus(inq.id, inq.status === "UNREAD" ? "CONTACTED" : "CLOSED");
                    }}
                  >
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#FFF8ED] dark:bg-[#1B2238] hover:bg-[#C69A4B] hover:text-white border border-[#E8D7B2] dark:border-[#27314A] text-xs font-bold text-[#C69A4B] transition-all cursor-pointer"
                    >
                      {inq.status === "UNREAD" ? "Mark Contacted" : "Close Inquiry"}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayoutWrapper>
  );
}
