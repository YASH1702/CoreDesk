import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/shared/Providers";

export const metadata: Metadata = {
  title: "CoreDesk — Warm Sand & Executive Dark Business & Appointment Platform",
  description: "Enterprise appointment management and website engine styled with an executive, luxury-inspired design system.",
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
