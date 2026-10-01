import React, { Suspense } from "react";
import BookingWizard from "@/components/booking/BookingWizard";

export const metadata = {
  title: "Book an Appointment | BusinessFlow",
  description: "Schedule your appointment with real-time specialist availability and instant confirmation.",
};

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#DED9D0] dark:bg-[#141414] flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-[#37261A] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BookingWizard />
    </Suspense>
  );
}
