import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/shared/Providers";

export const metadata: Metadata = {
  title: "BusinessFlow — Premium Business Operating System",
  description: "The complete operating system for service-based businesses. Bookings, services, staff, customers, payments, and analytics — beautifully connected.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-[#F8F7F3] dark:bg-[#0B0E17] text-[#2A2927] dark:text-[#F8F7F3] transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
