import type { Metadata } from "next";
import { Geist, Geist_Mono, Prompt } from "next/font/google";
import { headers } from "next/headers";
import Image from "next/image";
import Script from "next/script";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { FB_PIXEL_ID, GA_ID, IS_ANALYTICS_ENV } from "@/lib/analytics";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return children;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${prompt.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'light';
                  const validTheme = theme === 'dark' || theme === 'light' ? theme : 'light';
                  document.documentElement.setAttribute('data-theme', validTheme);
                } catch (e) {}
              })();
            `,
          }}
        />

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

        {/* Omise.js */}
        <Script
          src="https://cdn.omise.co/omise.js"
          strategy="afterInteractive"
        />

        {children}
        <Toaster position="top-center" expand={true} richColors={false} />
      </body>
    </html>
  );
}
