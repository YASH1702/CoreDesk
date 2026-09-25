"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ServiceSelectorStep from "@/components/booking/ServiceSelectorStep";
import StaffPickerStep from "@/components/booking/StaffPickerStep";
import DateTimeStep from "@/components/booking/DateTimeStep";
import CustomerDetailsStep from "@/components/booking/CustomerDetailsStep";
import PaymentStep from "@/components/booking/PaymentStep";
import { getServicesAction, getStaffAction } from "@/actions/booking";
import { Sparkles, Calendar, Check, Layers, Users, Clock, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingWizardPage() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [bookingData, setBookingData] = useState({
    serviceId: "",
    serviceTitle: "",
    servicePrice: 0,
    serviceDuration: 30,
    staffId: "",
    staffName: "",
    date: "",
    timeSlot: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    notes: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesRes, staffRes] = await Promise.all([
          getServicesAction(),
          getStaffAction(),
        ]);
        if (servicesRes.success && servicesRes.services) setServices(servicesRes.services);
        if (staffRes.success && staffRes.staff) setStaffList(staffRes.staff);
      } catch (err) {
        console.error("Failed to load booking data:", err);
      } finally {
        setLoadingData(false);
      }
    }
    loadData();
  }, []);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const stepsList = [
    { num: 1, title: "Service Package", icon: Layers },
    { num: 2, title: "Specialist", icon: Users },
    { num: 3, title: "Date & Time", icon: Clock },
    { num: 4, title: "Client Info", icon: Sparkles },
    { num: 5, title: "Stripe Checkout", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#0B0E17] text-[#2A2927] dark:text-[#F8F7F3] relative selection:bg-[#C69A4B] selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Wizard Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3.5 py-1.5 rounded-full bg-[#FFF8ED] dark:bg-[#1B2238] border border-[#E8D7B2] dark:border-[#27314A] text-[#C69A4B] text-xs font-bold inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Instant Live Booking Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2A2927] dark:text-[#F8F7F3] tracking-tight mt-3">
            Schedule Your Appointment
          </h1>
          <p className="text-xs sm:text-sm text-[#5D5A56] dark:text-[#A0A8B8] mt-2">
            Select a service package, specialist, and preferred time slot for instant confirmation.
          </p>
        </div>

        {/* Wizard Step Progress Tracker */}
        <div className="mb-10 p-4 rounded-3xl glass-panel border border-[#DDD6C9] dark:border-[#27314A] bg-white/80 dark:bg-[#161C2E]/90 shadow-warm-sm dark:shadow-dark-md">
          <div className="grid grid-cols-5 gap-2 text-center">
            {stepsList.map((s) => {
              const IconComp = s.icon;
              const isActive = step === s.num;
              const isDone = step > s.num;
              return (
                <button
                  key={s.num}
                  disabled={s.num > step}
                  onClick={() => setStep(s.num)}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    isActive
                      ? "bg-[#C69A4B] text-white shadow-gold-btn"
                      : isDone
                      ? "bg-[#FFF8ED] dark:bg-[#1B2238] text-[#C69A4B] border border-[#E8D7B2] dark:border-[#27314A]"
                      : "text-[#8B857D] dark:text-[#A0A8B8] bg-transparent opacity-60"
                  }`}
                >
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs mb-1">
                    {isDone ? <Check className="w-4 h-4" /> : <IconComp className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-bold tracking-tight hidden sm:block">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Container */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-[#DDD6C9] dark:border-[#27314A] bg-white dark:bg-[#161C2E] shadow-warm-lg dark:shadow-dark-lg">
          {loadingData ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-8 h-8 border-3 border-[#C69A4B] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-[#5D5A56] dark:text-[#A0A8B8]">Loading live services & staff availability...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {step === 1 && (
                <ServiceSelectorStep
                  key="step1"
                  services={services}
                  selectedServiceId={bookingData.serviceId}
                  onSelect={(svc) => {
                    setBookingData((prev) => ({
                      ...prev,
                      serviceId: svc.id,
                      serviceTitle: svc.title,
                      servicePrice: svc.price,
                      serviceDuration: svc.duration,
                    }));
                  }}
                  onNext={nextStep}
                />
              )}

              {step === 2 && (
                <StaffPickerStep
                  key="step2"
                  staffList={staffList}
                  selectedStaffId={bookingData.staffId}
                  onSelect={(st) => {
                    setBookingData((prev) => ({
                      ...prev,
                      staffId: st.id,
                      staffName: st.user?.name || "Specialist",
                    }));
                  }}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {step === 3 && (
                <DateTimeStep
                  key="step3"
                  staffId={bookingData.staffId}
                  serviceDuration={bookingData.serviceDuration}
                  selectedDate={bookingData.date}
                  selectedTimeSlot={bookingData.timeSlot}
                  onSelect={(dateStr, slotStr) => {
                    setBookingData((prev) => ({
                      ...prev,
                      date: dateStr,
                      timeSlot: slotStr,
                    }));
                  }}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {step === 4 && (
                <CustomerDetailsStep
                  key="step4"
                  data={bookingData}
                  onChange={(field, val) => setBookingData((prev) => ({ ...prev, [field]: val }))}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}

              {step === 5 && (
                <PaymentStep
                  key="step5"
                  data={bookingData}
                  onPrev={prevStep}
                />
              )}
            </AnimatePresence>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
