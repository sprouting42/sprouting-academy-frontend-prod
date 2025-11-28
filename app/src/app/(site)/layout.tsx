import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Prompt } from "next/font/google";
import Image from "next/image";
import Script from "next/script";
import { type ReactNode, Suspense } from "react";
import { Toaster } from "sonner";

import { DarkVeilClient } from "@/components/layout/darkVeilClient";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { FB_PIXEL_ID, GA_ID, IS_ANALYTICS_ENV } from "@/lib/analytics";
import { AnalyticsPageViewTracker } from "@/lib/analyticsPageViewTracker";
import { QueryProvider } from "@/providers/query-provider";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  description: "by Sprouting Tech",
  title: "Sprouting Tech Academy",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${prompt.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* GA4 */}
        {IS_ANALYTICS_ENV && GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {IS_ANALYTICS_ENV && FB_PIXEL_ID && (
          <>
            <Script id="fb-pixel-init" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');

                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              <Image
                alt=""
                height={1}
                width={1}
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                unoptimized
              />
            </noscript>
          </>
        )}

        <QueryProvider>
          <div className="min-h-screen overflow-hidden relative">
            <Suspense fallback={null}>
              <AnalyticsPageViewTracker />
            </Suspense>
            <div className="darkveil-container fixed inset-0 pointer-events-none w-full">
              <DarkVeilClient hueShift={52} />
            </div>
            <div className="origin-top relative z-10" style={{ zoom: 0.85 }}>
              <LayoutWrapper>{children}</LayoutWrapper>
            </div>
          </div>
          <Toaster position="top-center" expand={true} richColors={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
