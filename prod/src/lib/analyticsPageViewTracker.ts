"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackPageView } from "@/lib/analytics";

export function AnalyticsPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams?.toString() ?? "";
  const hasTrackedInitialPageViewRef = useRef(false);

  useEffect(() => {
    if (!pathname) return;
    if (!hasTrackedInitialPageViewRef.current) {
      hasTrackedInitialPageViewRef.current = true;
      return;
    }

    const url = searchParamsString
      ? `${pathname}?${searchParamsString}`
      : pathname;
    trackPageView(url);
  }, [pathname, searchParamsString]);

  return null;
}
