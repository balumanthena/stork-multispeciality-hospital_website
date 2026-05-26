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
      <head>
        {/* Preconnect to third-party analytics origins — saves ~400ms DNS+TLS per origin */}
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        {/* Preload hero images — fixes LCP discovery delay (91% of 11.9s LCP was load delay) */}
        <link rel="preload" href="/images/final-mobile.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/final-desktop.webp" as="image" type="image/webp" media="(min-width: 1024px)" />
      </head>
      <body
        className={cn(
          "min-h-[100dvh] bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* Instant iPhone Safari GPU guardrail — runs before first paint */}
        <script
          dangerouslySetInnerHTML={{ __html: `if(/iPhone/.test(navigator.userAgent)&&/Safari/.test(navigator.userAgent)&&!/CriOS/.test(navigator.userAgent)&&!/FxiOS/.test(navigator.userAgent)){document.documentElement.classList.add('is-iphone-safari')}` }}
        />
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
            strategy="lazyOnload"
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
