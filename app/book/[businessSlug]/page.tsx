import React, { Suspense } from "react";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BookingWizard from "@/components/booking/BookingWizard";

interface BookBusinessPageProps {
  params: Promise<{
    businessSlug: string;
  }>;
}

export async function generateMetadata({ params }: BookBusinessPageProps): Promise<Metadata> {
  const { businessSlug } = await params;
  const business = await prisma.business.findUnique({
    where: { slug: businessSlug },
  });

  if (!business) {
    return { title: "Book Appointment | CoreDesk" };
  }

  return {
    title: `Book with ${business.name} | CoreDesk`,
    description: `Schedule a verified appointment directly with ${business.name}. Instant availability and confirmation.`,
  };
}

export default async function BookBusinessPage({ params }: BookBusinessPageProps) {
  const { businessSlug } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F7F3] dark:bg-[#0B0E17] flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-[#C69A4B] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BookingWizard initialBusinessSlug={businessSlug} />
    </Suspense>
  );
}
