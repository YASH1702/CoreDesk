import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/shared/Providers";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { CoreDeskConcierge } from "@/components/ai/CoreDeskConcierge";

export const metadata: Metadata = {
  title: "CoreDesk — Executive Business Operating System",
  description: "The complete operating system for service-based businesses. Bookings, services, staff, customers, payments, and analytics — beautifully connected.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#DED9D0] dark:bg-[#18120D] text-[#1E1E1E] dark:text-[#F5F2EB] transition-colors duration-300">
        <CustomCursor />
        <Providers>
          {children}
          <CoreDeskConcierge />
        </Providers>
      </body>
    </html>
  );
}
