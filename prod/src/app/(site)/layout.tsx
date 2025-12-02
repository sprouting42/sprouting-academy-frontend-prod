import "./globals.css";

import { type ReactNode, Suspense } from "react";

import { DarkVeilClient } from "@/components/layout/darkVeilClient";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { AnalyticsPageViewTracker } from "@/lib/analyticsPageViewTracker";
import { QueryProvider } from "@/providers/query-provider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
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
    </QueryProvider>
  );
}
