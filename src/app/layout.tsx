import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stork Multispecialty Hospital",
  description: "World-class healthcare with a compassionate touch.",
};

import { SettingsProvider } from "@/providers/SettingsProvider";



import { MobileNav } from "@/components/layout/mobile-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SettingsProvider>
          {children}
        </SettingsProvider>
        <MobileNav />
        <Toaster />
      </body>
    </html>
  );
}
