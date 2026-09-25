import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CalendarDownloadButton from "@/components/booking/CalendarDownloadButton";
import { CheckCircle2, Sparkles, Calendar as CalendarIcon, Clock, User, ArrowRight, ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function BookingConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      service: true,
      staff: { include: { user: true } },
      customer: true,
      payment: true,
      invoice: true,
      business: true,
    },
  });

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-3xl border border-[#DDD6C9] max-w-md text-center bg-white space-y-4">
          <h2 className="text-xl font-bold text-[#2A2927]">Appointment Not Found</h2>
          <p className="text-xs text-[#5D5A56]">The requested booking confirmation record could not be found.</p>
          <Link href="/book" className="inline-block px-5 py-2.5 rounded-2xl bg-[#C69A4B] text-white text-xs font-bold shadow-gold-btn">
            Return to Booking Portal
          </Link>
        </div>
      </div>
    );
  }

  const start = new Date(appointment.startTime);
  const end = new Date(appointment.endTime);

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#2A2927] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Warm Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#F2DFC0]/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10 space-y-8">
        {/* Top Header Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#DDD6C9] shadow-warm-lg text-center bg-[#FFFCF7]/95 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#5C9E6E]/15 text-[#5C9E6E] border border-[#5C9E6E]/30 flex items-center justify-center mx-auto shadow-warm-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="px-3 py-1 rounded-full bg-[#FFF8ED] text-[#C69A4B] border border-[#E8D7B2] text-xs font-bold inline-block">
            BOOKING CONFIRMED & PAID
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A2927] tracking-tight">
            You're All Set for Your Session!
          </h1>
          <p className="text-xs text-[#5D5A56] max-w-lg mx-auto">
            A confirmation receipt and calendar invitation have been dispatched to{" "}
            <strong className="text-[#2A2927]">{appointment.customer?.email}</strong>.
          </p>

          {/* Download ICS Component */}
          <div className="pt-3 flex justify-center">
            <CalendarDownloadButton
              title={`${appointment.service.title} - ${appointment.business.name}`}
              description={`Session with ${appointment.staff.user.name}. ${appointment.notes || ""}`}
              location={appointment.business.address || "Online Video Consultation"}
              startTime={appointment.startTime.toISOString()}
              endTime={appointment.endTime.toISOString()}
              filename={`booking-${appointment.id.substring(0, 8)}.ics`}
            />
          </div>
        </div>

        {/* Appointment Details Box */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#DDD6C9] shadow-warm-md bg-white space-y-4">
          <h3 className="text-sm font-bold text-[#8B857D] uppercase tracking-wider border-b border-[#ECE6D8] pb-3">
            Appointment Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[#8B857D] block">Service Package</span>
              <span className="font-bold text-[#2A2927] text-sm">{appointment.service.title}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8B857D] block">Assigned Specialist</span>
              <span className="font-bold text-[#2A2927] text-sm">{appointment.staff.user.name}</span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8B857D] block">Date & Time</span>
              <span className="font-bold text-[#C69A4B] text-sm">
                {start.toLocaleDateString()} at {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#8B857D] block">Total Amount Paid</span>
              <span className="font-extrabold text-[#2A2927] text-sm gold-text">
                ${appointment.payment?.amount || appointment.service.price}.00 USD
              </span>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href={`/book/reschedule/${appointment.id}`}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white border border-[#DDD6C9] text-[#2A2927] hover:bg-[#F6F2EA] text-xs font-semibold shadow-warm-sm transition-all text-center"
          >
            Reschedule or Cancel Session
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-[#C69A4B] hover:bg-[#B7863D] text-white text-xs font-semibold shadow-gold-btn transition-all text-center flex items-center justify-center gap-1.5"
          >
            Return to Homepage <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
