import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SettingsProvider } from "@/providers/SettingsProvider";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { AuthErrorHandler } from "@/components/auth/auth-error-handler";
import { LazyMotion, domAnimation } from "framer-motion";
import Script from "next/script";
import { AnalyticsProvider } from "@/components/shared/analytics-provider";
const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://storkhospital.com"), // Update this with your actual production domain
  title: "Stork Multispecialty Hospital",
  description: "World-class healthcare with a compassionate touch.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    images: ["/favicon.ico"],
  },
  twitter: {
    images: ["/favicon.ico"],
  },
};


import { getSiteSettings } from "@/lib/data/settings-server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-[100dvh] bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <LazyMotion features={domAnimation}>
          <SettingsProvider initialData={settings}>
            {children}
          </SettingsProvider>
        </LazyMotion>
        <MobileBottomNav />
        <Toaster />
        <AuthErrorHandler />
        <AnalyticsProvider />

        {process.env.NODE_ENV === "production" && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
          >
            {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wfkzldnae5");
            `}
          </Script>
        )}
      </body>

    </html>
  );
}
