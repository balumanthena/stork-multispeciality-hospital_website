"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Declare global properties for tracking libraries
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: any;
  }
}

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || "G-STORK2026";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-STORK2026";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "PIXEL-STORK2026";

/**
 * Unified event tracking helper.
 * Safely dispatches attribution metrics to GA4, GTM, and Meta Pixel simultaneously.
 */
export function trackEvent(name: string, params: Record<string, any> = {}) {
  try {
    if (typeof window === "undefined") return;

    const cleanParams = {
      ...params,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      path: window.location.pathname
    };

    // 1. Google Analytics 4 Dispatch
    if (window.gtag) {
      window.gtag("event", name, cleanParams);
    }

    // 2. Google Tag Manager Dispatch
    if (window.dataLayer) {
      window.dataLayer.push({
        event: name,
        ...cleanParams
      });
    }

    // 3. Meta Pixel Dispatch
    if (window.fbq) {
      // Map standard GA4 events to standard Meta Pixel types
      if (name === "lead" || name === "submit_lead" || name === "exit_popup_submit") {
        window.fbq("track", "Lead", {
          content_name: params.type || "Callback Request",
          status: "Success",
          ...cleanParams
        });
      } else if (name === "book_appointment" || name === "complete_booking") {
        window.fbq("track", "Schedule", {
          content_name: params.department || "Consultation",
          value: 0.00,
          currency: "INR",
          ...cleanParams
        });
      } else if (name === "whatsapp_click") {
        window.fbq("track", "Contact", {
          content_name: params.location || "Floating CTA",
          ...cleanParams
        });
      } else {
        window.fbq("trackCustom", name, cleanParams);
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.log(`[Attribution Analytics] Event: ${name}`, cleanParams);
    }
  } catch (err) {
    console.error("Attribution event dispatch failed:", err);
  }
}

/**
 * Unified Analytics Provider.
 * Safely injects tracking scripts asynchronously.
 * Utilizes Next.js "lazyOnload" to completely eliminate main-thread parsing locks during initial paint.
 */
export function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Trigger dynamic pageview tracking on client route transitions
  useEffect(() => {
    if (typeof window === "undefined") return;

    // GA4 dynamic page view
    if (window.gtag) {
      window.gtag("config", GA4_ID, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
      });
    }

    // Meta Pixel dynamic page view
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* 1. Google Tag Manager (GTM) */}
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
      >
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      {/* 2. Google Analytics 4 (GA4) Global Site Tag */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="lazyOnload"
      />
      <Script
        id="ga4-initializer"
        strategy="lazyOnload"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', {
            send_page_view: false // Avoid duplicate initial hits during hydration
          });
        `}
      </Script>

      {/* 3. Meta Pixel (Facebook Pixel) */}
      <Script
        id="meta-pixel-initializer"
        strategy="lazyOnload"
      >
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${PIXEL_ID}');
        `}
      </Script>
    </>
  );
}
