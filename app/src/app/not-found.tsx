import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/common/button";
import { DarkVeilClient } from "@/components/layout/darkVeilClient";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { PagePath } from "@/enum/menu";
import { AnalyticsPageViewTracker } from "@/lib/analyticsPageViewTracker";
import { QueryProvider } from "@/providers/query-provider";

export default function NotFound() {
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
          <LayoutWrapper>
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16">
              <div className="flex flex-col gap-6 items-center max-w-2xl text-center w-full">
                <h1 className="bg-clip-text bg-linear-to-r font-bold from-primary lg:text-8xl text-6xl text-transparent to-secondary">
                  404
                </h1>
                <h2 className="font-medium font-prompt lg:text-3xl text-2xl text-foreground">
                  ไม่พบหน้าที่คุณกำลังมองหา
                </h2>
                <p className="font-normal font-prompt leading-6 lg:leading-7 lg:text-lg text-base text-foreground/70">
                  หน้าที่คุณกำลังมองหาอาจถูกลบ ย้าย หรือไม่มีอยู่แล้ว
                </p>
                <Link href={PagePath.HOME}>
                  <Button
                    text="กลับไปหน้าหลัก"
                    variant="primaryGradientBorder"
                    size="md"
                    shape="rounded"
                  />
                </Link>
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </div>
    </QueryProvider>
  );
}
